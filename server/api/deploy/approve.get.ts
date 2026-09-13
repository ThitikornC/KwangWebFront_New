import { connectToDatabase } from '~/server/utils/mongo';
import { Lead } from '~/server/utils/models';
import { sendLineNotification } from '~/server/utils/line';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { getEffectiveRequestURL } from '~/server/utils/request';
import * as RailwayAPI from '~/server/utils/railway-api';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const leadId = query.leadId as string;

  if (!leadId) {
    return createError({ statusCode: 400, statusMessage: 'Missing leadId' });
  }

  await connectToDatabase();
  const lead = await Lead.findById(leadId);

  if (!lead) {
    return createError({ statusCode: 404, statusMessage: 'Lead not found' });
  }

  if (lead.status === 'deployed') {
    return 'Already deployed!';
  }

  // Contract image generation moved to after deployment (so the image is served from
  // a stable, public location). See code in deployProject() which will generate and
  // upload the image after the project is deployed and deployedUrl is known.

  // Start Deployment Process
  deployProject(lead).catch(err => console.error('Deployment failed:', err));

  return `Deployment started for ${lead.name}. You will receive a notification when complete.`;
});

async function deployProject(lead: any) {
  const tempDir = path.join(os.tmpdir(), `deploy-${lead._id}`);
  const config = useRuntimeConfig();
  const apiToken = config.railwayApiKey || process.env.RAILWAY_API_TOKEN || process.env.RAILWAY_API_KEY;

  console.log(`Starting deployment for ${lead.name} (using Railway API)`);

  try {
    // =====================================================
    // DEPLOYMENT USING RAILWAY API (NO CLI REQUIRED)
    // =====================================================
    
    const projectRunNumber = String(lead.runNumber || '0').padStart(3, '0');
    const projectName = `Espresso-${projectRunNumber}`;
    
    let projectId = lead.railwayProjectId;
    let serviceId = '';
    let environmentId = '';
    let deployedUrl = 'URL not found';

    // 1. Create project if not exists
    if (!projectId) {
      console.log(`[Railway API] Creating new project: ${projectName}`);
      const project = await RailwayAPI.createProject(projectName, apiToken);
      projectId = project.id;
      lead.railwayProjectId = projectId;
      await lead.save();
      console.log(`[Railway API] Project created: ${projectId}`);
    }

    // 2. Get production environment ID
    environmentId = await RailwayAPI.getEnvironmentId(projectId, 'production', apiToken) || '';
    if (!environmentId) {
      throw new Error('Failed to get production environment ID');
    }
    console.log(`[Railway API] Environment ID: ${environmentId}`);

    // 3. Create service from GitHub repo (or get existing)
    const repoFullName = 'ThitikornC/EspressoTemplate';
    
    // Check if service already exists
    serviceId = await RailwayAPI.getServiceId(projectId, projectName, apiToken) || '';
    
    if (!serviceId) {
      console.log(`[Railway API] Creating service from repo: ${repoFullName}`);
      const service = await RailwayAPI.createServiceFromRepo(projectId, projectName, repoFullName, 'main', apiToken);
      serviceId = service.id;
      console.log(`[Railway API] Service created: ${serviceId}`);
      
      // 3.5 Connect environment to branch (auto-deploy on push)
      console.log(`[Railway API] Connecting branch main for auto-deploy...`);
      try {
        await RailwayAPI.connectEnvironmentToBranch(serviceId, environmentId, 'main', repoFullName, apiToken);
        console.log(`[Railway API] Branch main connected to service`);
      } catch (branchErr) {
        console.warn('[Railway API] Could not connect branch to environment:', branchErr);
      }
    } else {
      console.log(`[Railway API] Using existing service: ${serviceId}`);
      // Trigger redeploy for existing service
      await RailwayAPI.redeploy(environmentId, serviceId, apiToken);
    }

    // 4. Set environment variables (ครบตาม template .env ของ repo)
    const runNoPart = String(lead.runNumber || 0).padStart(3, '0');
    
    // Format dates for .env
    const now = new Date();
    const installDate = lead.startDate ? new Date(lead.startDate) : now;
    const expiryDateCalc = lead.expiryDate ? new Date(lead.expiryDate) : new Date(now.getTime());
    if (!lead.expiryDate) expiryDateCalc.setMonth(expiryDateCalc.getMonth() + 1);
    
    // Format as Thai locale string
    const installDateStr = installDate.toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok' });
    const expiryDateStr = expiryDateCalc.toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok' });

    const envVars: Record<string, string> = {
      // Database config
      MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://nippit62:ohm0966477158@testing.hgxbz.mongodb.net/?retryWrites=true&w=majority',
      PORT: '3000',
      NODE_ENV: 'production',
      MONGODB_DB: `Espresso_${runNoPart}`,
      MONGODB_BMI_DB: `BMI_${runNoPart}`,
      
      // Railway API config (สำหรับระบบสร้างเว็บอัตโนมัติ)
      RAILWAY_API_TOKEN: apiToken || '',
      RAILWAY_PROJECT_ID: projectId,
      RAILWAY_TEMPLATE_ENV_ID: environmentId,
      RAILWAY_PROJECT_NAME: projectName,
      
      // Customer / client configuration
      CUSTOMER_NAME: String(lead.name || ''),
      CLIENT_RUN_NUMBER: runNoPart,
      CLIENT_CONTRACT_NO: String(lead.contactno || ''),
      CLIENT_INSTALL_DATE: installDateStr,
      CLIENT_EXPIRY_DATE: expiryDateStr
    };

    // Add optional env vars if available from main server
    if (process.env.BACKEND_API) envVars.BACKEND_API = process.env.BACKEND_API;
    if (process.env.API_BASE_URL) envVars.API_BASE_URL = process.env.API_BASE_URL;

    console.log(`[Railway API] Setting ${Object.keys(envVars).length} environment variables`);
    console.log(`[Railway API] Customer: ${envVars.CUSTOMER_NAME}, DB: ${envVars.MONGODB_DB}`);
    await RailwayAPI.setVariables(projectId, environmentId, serviceId, envVars, apiToken);

    // 5. Create domain if not exists
    try {
      const domains = await RailwayAPI.getDomains(projectId, environmentId, serviceId, apiToken);
      if (domains.serviceDomains && domains.serviceDomains.length > 0) {
        deployedUrl = `https://${domains.serviceDomains[0].domain}`;
        console.log(`[Railway API] Using existing domain: ${deployedUrl}`);
      } else {
        console.log(`[Railway API] Creating new domain...`);
        const domainResult = await RailwayAPI.createServiceDomain(environmentId, serviceId, apiToken);
        deployedUrl = `https://${domainResult.domain}`;
        console.log(`[Railway API] Domain created: ${deployedUrl}`);
      }
    } catch (e) {
      console.warn('[Railway API] Could not get/create domain:', e);
      deployedUrl = 'Deployment successful, check Railway Dashboard for URL';
    }

    // 6. Wait for deployment to complete (optional, with timeout)
    console.log(`[Railway API] Waiting for deployment...`);
    const deployResult = await RailwayAPI.waitForDeployment(
      projectId, serviceId, environmentId, 
      180000, // 3 minutes timeout
      10000,  // poll every 10 seconds
      apiToken
    );
    console.log(`[Railway API] Deployment status: ${deployResult.status}`);

    // Only fail if deployment explicitly failed (not timeout - deployment may still be in progress)
    if (!deployResult.success && !['TIMEOUT', 'BUILDING', 'DEPLOYING'].includes(deployResult.status)) {
      throw new Error(`Deployment failed with status: ${deployResult.status}`);
    }
    
    // If timeout or still building, deployment is in progress - continue with success flow
    if (deployResult.status === 'TIMEOUT') {
      console.log(`[Railway API] Deployment still in progress after timeout - continuing with success flow`);
    }
    // 7. Update DB
    lead.status = 'deployed';
    // Save both the public canonical URL and the actual deployed target URL
    try {
      const runNoPart = String(lead.runNumber || 0).padStart(3, '0');
      // Ensure lead.url is set to the public proxy path; if it's already set keep it
      if (!lead.url || String(lead.url).trim() === '') {
        lead.url = `https://www.kwangunlimit.com/espresso/${runNoPart}`; // public path
      }
    } catch (e) {
      lead.url = lead.url || '';
    }
    // Always store the real deployed URL returned by Railway
    try {
      lead.deployedUrl = deployedUrl;
    } catch (e) {
      console.warn('Failed to set deployedUrl on lead:', e);
    }
    // Set start/expiry/installer info
    try {
      const now = new Date();
      const expiry = new Date(now);
      // default expiry: +1 month (can be adjusted)
      expiry.setMonth(expiry.getMonth() + 1);
      lead.startDate = now;
      lead.expiryDate = expiry;
      lead.installer = process.env.INSTALLER_NAME || 'Installer';
    } catch (e) {
      console.warn('Failed to set start/expiry/installer:', e);
    }
    await lead.save();

    // 6. Notify Admin
    // Build a public proxy URL to show as primary link
    const runNoPartForMsg = String(lead.runNumber || 0).padStart(3, '0');
    const proxyBaseForMsg = process.env.PROXY_BASE_URL || 'https://www.kwangunlimit.com';
    const proxyPrefixForMsg = process.env.PROXY_PREFIX || 'espresso';
    const publicProxyUrl = `${String(proxyBaseForMsg).replace(/\/$/, '')}/${proxyPrefixForMsg}/${runNoPartForMsg}`;
    
    // Format dates for display
    const startDateDisplay = lead.startDate ? new Date(lead.startDate).toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok' }) : '-';
    const expiryDateDisplay = lead.expiryDate ? new Date(lead.expiryDate).toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok' }) : '-';

    const flexMessage = {
      type: "flex",
      altText: `Deployment Success: ${lead.name}`,
      contents: {
        type: "bubble",
        header: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "Deployment Successful!",
              weight: "bold",
              color: "#1DB446",
              size: "lg"
            }
          ]
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "box",
              layout: "baseline",
              margin: "md",
              contents: [
                { type: "text", text: "NAME", color: "#a89993", size: "sm", flex: 2 },
                { type: "text", text: String(lead.name || '-'), wrap: true, color: "#3b2b28", size: "sm", flex: 5, weight: "bold" }
              ]
            },
            {
              type: "box",
              layout: "baseline",
              margin: "md",
              contents: [
                { type: "text", text: "No.", color: "#a89993", size: "sm", flex: 2 },
                { type: "text", text: runNoPartForMsg, wrap: true, color: "#3b2b28", size: "sm", flex: 5, weight: "bold" }
              ]
            },
            {
              type: "box",
              layout: "baseline",
              margin: "md",
              contents: [
                { type: "text", text: "CONTRACT", color: "#a89993", size: "sm", flex: 2 },
                { type: "text", text: String(lead.contactno || '-'), wrap: true, color: "#3b2b28", size: "sm", flex: 5 }
              ]
            },
            {
              type: "box",
              layout: "baseline",
              margin: "md",
              contents: [
                { type: "text", text: "START", color: "#a89993", size: "sm", flex: 2 },
                { type: "text", text: startDateDisplay, wrap: true, color: "#3b2b28", size: "sm", flex: 5 }
              ]
            },
            {
              type: "box",
              layout: "baseline",
              margin: "md",
              contents: [
                { type: "text", text: "EXPIRY", color: "#a89993", size: "sm", flex: 2 },
                { type: "text", text: expiryDateDisplay, wrap: true, color: "#3b2b28", size: "sm", flex: 5 }
              ]
            },
            {
              type: "separator",
              margin: "lg"
            },
            {
              type: "text",
              text: publicProxyUrl,
              wrap: true,
              color: "#007bff",
              size: "sm",
              margin: "md",
              action: { type: "uri", uri: publicProxyUrl }
            }
          ]
        },
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            { type: "button", style: "primary", height: "sm", action: { type: "uri", label: "Open", uri: publicProxyUrl }, color: "#1DB446" }
          ],
          flex: 0
        }
      }
    };

    await sendLineNotification(flexMessage);
    console.log(`Deployment finished. URL: ${publicProxyUrl}`);

  } catch (error: any) {
    console.error('Deployment error:', error);
    console.error('Deployment error stack:', error?.stack);
    console.error('Deployment error message:', error?.message);
    
    // Update lead status to failed
    try {
      lead.status = 'deploy_failed';
      lead.deployError = error?.message || String(error);
      await lead.save();
    } catch (e) {
      console.error('Failed to update lead status:', e);
    }
    
    await sendLineNotification(`Deployment Failed for ${lead.name}. Error: ${error?.message || 'Unknown error'}. Check server logs.`);
  }
}

