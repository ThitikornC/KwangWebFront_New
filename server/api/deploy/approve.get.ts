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

    // 8. Generate contract image now that deployment is done, upload to public storage
    // Prefer Cloudinary unsigned upload using CLOUDINARY_CLOUD_NAME + CLOUDINARY_UPLOAD_PRESET.
    let contractImageUrl: string | null = null;
    try {
      // Build display dates and contract number
      const now = new Date();
      const startDisplay = (lead.startDate ? new Date(lead.startDate) : now).toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok' });
      const expiryDate = lead.expiryDate ? new Date(lead.expiryDate) : new Date(now.getTime());
      if (!lead.expiryDate) expiryDate.setMonth(expiryDate.getMonth() + 1);
      const expiryDisplay = expiryDate.toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok' });
      const y = (lead.startDate ? new Date(lead.startDate).getFullYear() : now.getFullYear());
      const buddhistYear = y + 543;
      const m = String((lead.startDate ? new Date(lead.startDate).getMonth() + 1 : now.getMonth() + 1)).padStart(2, '0');
      const d = String((lead.startDate ? new Date(lead.startDate).getDate() : now.getDate())).padStart(2, '0');
      const datePart = `${buddhistYear}${m}${d}`;
      const runNoPart2 = String(lead.runNumber || 0).padStart(3, '0');
      const contractNumber = `${datePart}${runNoPart2}`;

      // Read logo if available
      let logoBase64 = '';
      try {
        const logoPath = path.join(process.cwd(), 'public', 'kwang_logo.png');
        if (fs.existsSync(logoPath)) {
          const buf = fs.readFileSync(logoPath);
          logoBase64 = buf.toString('base64');
        }
      } catch (e) { /* ignore */ }

      const svg = `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="720">\n` +
        `  <rect width="100%" height="100%" fill="#fff" rx="16"/>\n` +
        `  <rect x="24" y="24" width="552" height="112" rx="12" fill="#4b2f2a"/>\n` +
        `  <image x="36" y="36" width="56" height="56" href="data:image/png;base64,${logoBase64}" />\n` +
        `  <text x="300" y="84" font-family="'Helvetica Neue', Arial" font-size="24" fill="#fff" text-anchor="middle" font-weight="700">ESPRESSO Contract</text>\n` +
        `  <g transform="translate(40,160)">\n` +
        `    <style> .label { fill: #a89993; font-size: 14px; font-family: 'Helvetica Neue', Arial; } .value { fill: #3b2b28; font-size: 18px; font-family: 'Helvetica Neue', Arial; font-weight:700; } .contract { fill: #3b2b28; font-size:18px; font-family: 'Helvetica Neue', Arial; font-weight:700; } </style>\n` +
        `    <text x="0" y="0" class="label">NAME</text>\n` +
        `    <text x="220" y="0" class="value">${escapeXml(lead.name || '')}</text>\n` +
        `    <text x="0" y="56" class="label">CONTRACT NO.</text>\n` +
        `    <text x="220" y="56" class="contract">${escapeXml(contractNumber)}</text>\n` +
        `    <text x="0" y="112" class="label">START</text>\n` +
        `    <text x="220" y="112" class="value">${escapeXml(startDisplay)}</text>\n` +
        `    <text x="0" y="168" class="label">EXPIRY</text>\n` +
        `    <text x="220" y="168" class="value">${escapeXml(expiryDisplay)}</text>\n` +
        `  </g>\n` +
        `  <g transform="translate(40,260)">\n` +
        `    <rect x="0" y="0" width="520" height="140" rx="8" fill="#fff" stroke="#e6e2df" stroke-width="1"/>\n` +
        `    <text x="12" y="22" class="label">Signature</text>\n` +
        `    <line x1="12" y1="104" x2="508" y2="104" stroke="#3b2b28" stroke-width="1" stroke-linecap="round"/>\n` +
        `  </g>\n` +
        `</svg>`;

      let pngBuffer: Buffer | null = null;
      try {
        const sharpModule = await import('sharp');
        const sharp = (sharpModule && (sharpModule.default || sharpModule)) as any;
        pngBuffer = await sharp(Buffer.from(svg)).png({ quality: 90 }).toBuffer();
      } catch (e) {
        // sharp not available; keep svg as fallback
        pngBuffer = null;
      }

      // Attempt Cloudinary unsigned upload if configured
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
      if (cloudName && uploadPreset) {
        try {
          const formData = new FormData();
          if (pngBuffer) {
            // upload binary as data URI
            formData.append('file', `data:image/png;base64,${pngBuffer.toString('base64')}`);
          } else {
            formData.append('file', `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`);
          }
          formData.append('upload_preset', uploadPreset);
          const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: formData as any });
          if (res.ok) {
            const jd = await res.json();
            contractImageUrl = jd.secure_url || jd.url || null;
          } else {
            console.warn('Cloudinary upload failed', await res.text());
          }
        } catch (e) {
          console.warn('Cloudinary upload error', e);
        }
      }

      // Fallback: write into this backend public dir and expose via FRONTEND_URL
      if (!contractImageUrl) {
        const svgFilename = `contract-${contractNumber}.svg`;
        const pngFilename = `contract-${contractNumber}.png`;
        const possiblePublicDirs = [path.join(process.cwd(), '.output', 'public'), path.join(process.cwd(), 'public')];
        const publicDir = possiblePublicDirs.find((d) => fs.existsSync(d)) || possiblePublicDirs[1];
        try {
          if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
          // Use FRONTEND_URL for public accessible URL (Railway deployed URL)
          const frontendBase = process.env.FRONTEND_URL || (config.public && config.public.appURL) || process.env.APP_URL || '';
          if (pngBuffer) {
            const pngPath = path.join(publicDir, pngFilename);
            fs.writeFileSync(pngPath, pngBuffer);
            if (frontendBase) contractImageUrl = `${String(frontendBase).replace(/\/$/, '')}/${pngFilename}`;
            lead.contractImage = `/${pngFilename}`;
          } else {
            const svgPath = path.join(publicDir, svgFilename);
            fs.writeFileSync(svgPath, svg, 'utf-8');
            if (frontendBase) contractImageUrl = `${String(frontendBase).replace(/\/$/, '')}/${svgFilename}`;
            lead.contractImage = `/${svgFilename}`;
          }
          lead.contractNumber = contractNumber;
          await lead.save();
          console.log(`[Contract] Image saved: ${contractImageUrl}`);
        } catch (e) {
          console.warn('Failed to write contract image to public dir fallback', e);
        }
      }

      // If contractImageUrl is ready and is an https URL, send as image message first
      try {
        if (contractImageUrl && String(contractImageUrl).startsWith('http')) {
          await sendLineNotification({ type: 'image', originalContentUrl: String(contractImageUrl), previewImageUrl: String(contractImageUrl) });
        }
      } catch (e) {
        console.warn('Failed to send contract image to LINE', e);
      }
    } catch (e) {
      console.warn('Contract image generation/upload failed:', e);
    }

    // 6. Notify Admin
    // helper to escape XML text in SVG
    function escapeXml(unsafe: string) {
      return unsafe.replace(/[<>&'\"]+/g, (c) => ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        "'": '&apos;',
        '"': '&quot;'
      } as any)[c]);
    }

    // Build a public proxy URL to show as primary link (use lead.url if set, otherwise construct)
    const runNoPartForMsg = String(lead.runNumber || 0).padStart(3, '0');
    const proxyBaseForMsg = process.env.PROXY_BASE_URL || 'https://www.kwangunlimit.com';
    const proxyPrefixForMsg = process.env.PROXY_PREFIX || 'espresso';
    const publicProxyUrl = (lead.url && String(lead.url).trim()) ? String(lead.url) : `${String(proxyBaseForMsg).replace(/\/$/, '')}/${proxyPrefixForMsg}/${runNoPartForMsg}`;

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
              type: "text",
              text: `Project for ${lead.name} is now live.`,
              wrap: true,
              color: "#666666",
              size: "md"
            },
            {
              type: "separator",
              margin: "md"
            },
            {
              type: "box",
              layout: "vertical",
              margin: "md",
              contents: [
                { type: "text", text: publicProxyUrl, wrap: true, color: "#007bff", size: "sm", action: { type: "uri", uri: publicProxyUrl } },
                ...(deployedUrl ? [{ type: "text", text: String(deployedUrl), wrap: true, color: "#555555", size: "xs", margin: "sm", action: { type: "uri", uri: String(deployedUrl) } }] : [])
              ]
            }
          ]
        },
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            { type: "button", style: "primary", height: "sm", action: { type: "uri", label: "Open (Proxy)", uri: publicProxyUrl }, color: "#1DB446" },
            ...(deployedUrl ? [{ type: "button", style: "secondary", height: "sm", action: { type: "uri", label: "Open (Direct)", uri: String(deployedUrl) } }] : [])
          ],
          flex: 0
        }
      }
    };

    await sendLineNotification(flexMessage);
    console.log(`Deployment finished. URL: ${deployedUrl}`);

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

