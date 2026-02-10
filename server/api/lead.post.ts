import { connectToDatabase } from '~/server/utils/mongo';
import { Lead } from '~/server/utils/models';
import { sendLineNotification } from '~/server/utils/line';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { getEffectiveRequestURL } from '~/server/utils/request';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    
    if (!body.name || !body.phone) {
      throw createError({
        statusCode: 400,
        statusMessage: 'กรุณากรอกชื่อและเบอร์โทรศัพท์ให้ครบถ้วน',
      });
    }

    await connectToDatabase();

    // Find the last runNumber
    const lastLead = await Lead.findOne().sort({ runNumber: -1 });
    const nextRunNumber = (lastLead && lastLead.runNumber) ? lastLead.runNumber + 1 : 1;

    // compute start and expiry dates
    const createdAt = new Date();
    const startDate = createdAt;
    // expiry = +1 month (preserve day; handle month overflow)
    const expiryDate = new Date(startDate.getTime());
    expiryDate.setMonth(expiryDate.getMonth() + 1);

    // compute contactno from Buddhist year (last 2 digits), month, day, and runNumber
    const buddhistYear = startDate.getFullYear() + 543;
    const yy = String(buddhistYear % 100).padStart(2, '0');
    const mm = String(startDate.getMonth() + 1).padStart(2, '0');
    const dd = String(startDate.getDate()).padStart(2, '0');
    const contactNoGenerated = `${yy}${mm}${dd}${String(nextRunNumber).padStart(3, '0')}`;

    const newLead = new Lead({
      name: body.name,
      phone: body.phone,
      contactno: body.contactno || contactNoGenerated,
      company: body.company || body.org || '',
      type: body.type || '',
      runNumber: nextRunNumber,
      startDate,
      expiryDate,
      status: 'creating_project'
    });

    await newLead.save();

    // Start background project creation via CLI
    createRailwayProject(newLead, event).catch(err => console.error('Background project creation failed:', err));

    return { success: true, leadId: newLead._id, message: 'กำลังสร้างโปรเจกต์ กรุณารอสักครู่...' };
  } catch (error: any) {
    console.error('Lead creation error:', error);
    if (error.name === 'ValidationError') {
      throw createError({
        statusCode: 400,
        statusMessage: 'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง',
      });
    }
    throw error;
  }
});

async function createRailwayProject(lead: any, event: any) {
  const tempDir = path.join(os.tmpdir(), `init-${lead._id}`);
  const config = useRuntimeConfig();
  const apiKey = config.railwayApiKey || process.env.RAILWAY_API_KEY;
  
  // FIX: Use RAILWAY_API_TOKEN for Account Tokens (required for 'railway init')
  const env = { 
    ...process.env, 
    RAILWAY_API_TOKEN: apiKey 
  };

  // Try using Railway HTTP/GraphQL API first (if configured). If it fails or not configured,
  // fall back to the existing CLI-based init below.
  // Official Railway public API GraphQL endpoint from docs
  const railwayApiEndpoint = config.railwayApiEndpoint || process.env.RAILWAY_API_ENDPOINT || 'https://backboard.railway.com/graphql/v2';
  const useRailwayApi = Boolean(apiKey && railwayApiEndpoint);
  if (useRailwayApi) {
    try {
      console.log('Attempting to create Railway project via API...');
      // Basic GraphQL mutation to create a project. Depending on Railway's schema this
      // mutation name/shape may need to be updated to match the current Railway API.
      const projectRunNumber = String(lead.runNumber || '0').padStart(3, '0');
      const projectName = `Espresso-${projectRunNumber}`;

      const graphqlQuery = {
        query: `mutation CreateProject($name: String!) { createProject(input: { name: $name }) { id name } }`,
        variables: { name: projectName }
      };

      const resp = await fetch(railwayApiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(graphqlQuery)
      });

      // Protect against non-JSON responses (404/Not Found etc.)
      if (!resp.ok) {
        const text = await resp.text();
        console.warn(`Railway API HTTP ${resp.status}:`, text);
        throw new Error(`Railway API returned HTTP ${resp.status}`);
      }

      const result = await resp.json();
      if (result && result.data) {
        // Attempt several common shapes for the response
        const created = result.data.createProject || result.data.project || null;
        const projectId = created && (created.id || created.projectId || created._id);
        if (projectId) {
          lead.railwayProjectId = projectId;
          lead.status = 'project_created';
          await lead.save();
          console.log(`Project created via API with ID: ${projectId}`);
          // Send notification and return early to avoid CLI path
          const timestamp = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });
          const requestUrl = getEffectiveRequestURL(event);
          const conf = useRuntimeConfig();
          const backendApi = (conf.public && conf.public.apiURL) || process.env.API_BASE_URL || null;
          const publicAppUrl = (conf.public && conf.public.appURL) || conf.baseUrl || process.env.APP_URL || `${requestUrl.protocol}//${requestUrl.host}`;
          const baseUrl = String(publicAppUrl).replace(/\/$/, '');
          const apiBase = backendApi ? String(backendApi).replace(/\/$/, '') : baseUrl;
          const approvalLink = `${apiBase}/api/deploy/approve?leadId=${lead._id}`;
          const logoUrl = baseUrl.replace(/^http:/i, 'https:') + '/ESPRESSO_logo.png';
          const flexMessage = {
            type: "flex",
            altText: `New Lead: ${lead.name}`,
            contents: {
              type: "bubble",
              header: { type: "box", layout: "vertical", contents: [ { type: "text", text: "ลูกค้าส่งคำขอมาใหม่", weight: "bold", color: "#1DB446", size: "lg" } ] },
              body: { type: "box", layout: "vertical", contents: [ { type: "box", layout: "baseline", margin: "md", contents: [ { type: "text", text: "No.", color: "#a89993", size: "sm", flex: 2 }, { type: "text", text: `${lead.runNumber}`, wrap: true, color: "#3b2b28", size: "sm", flex: 5, weight: "bold" } ] }, { type: "box", layout: "baseline", margin: "md", contents: [ { type: "text", text: "NAME", color: "#a89993", size: "sm", flex: 2 }, { type: "text", text: lead.name, wrap: true, color: "#3b2b28", size: "sm", flex: 5, weight: "bold" } ] }, { type: "box", layout: "baseline", margin: "md", contents: [ { type: "text", text: "PROJECT", color: "#a89993", size: "sm", flex: 2 }, { type: "text", text: projectName, wrap: true, color: "#3b2b28", size: "sm", flex: 5 } ] }, { type: "box", layout: "baseline", margin: "md", contents: [ { type: "text", text: "DATE", color: "#a89993", size: "sm", flex: 2 }, { type: "text", text: timestamp, wrap: true, color: "#3b2b28", size: "sm", flex: 5 } ] } ] },
              footer: { type: "box", layout: "vertical", spacing: "sm", contents: [ { type: "button", style: "primary", height: "sm", action: { type: "uri", label: "Approve & Deploy", uri: approvalLink }, color: "#4b2f2a" } ], flex: 0 }
            }
          };
          await sendLineNotification(flexMessage);
          return;
        }
      }
      console.warn('Railway API responded but no project ID found; falling back to CLI. Response:', result);
    } catch (apiErr) {
      console.warn('Railway API project creation failed, falling back to CLI:', apiErr);
    }
  }

  console.log(`Starting project creation (CLI) for ${lead.name} (No. ${lead.runNumber})`);
  // Prepare timestamp early so it's available in the catch block too
  const timestamp = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });

  try {
    // 1. Prepare Empty Directory (Do NOT download code here to prevent auto-deploy)
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    fs.mkdirSync(tempDir, { recursive: true });
    
    // 2. Railway Init
    const projectRunNumber = String(lead.runNumber || '0').padStart(3, '0');
    // Clean name
    // const safeName = lead.name.replace(/[^a-zA-Z0-9]/g, '');
    const projectName = `Espresso-${projectRunNumber}`;
    
    // Init project in empty folder
    // Use -p @railway/cli to ensure we use the new CLI
    // Capture output to see if we can parse ID from it
    console.log('Running railway init...');
    const initOutput = await runCommandWithOutput('npx', ['-y', '-p', '@railway/cli', 'railway', 'init', '--name', projectName], { cwd: tempDir, env });
    console.log('Init Output:', initOutput);

    // 3. Get Project ID from generated config
    let projectId = '';
    try {
        // Method 1: Try reading .railway/project.json or any json in .railway
        const railwayDir = path.join(tempDir, '.railway');
        if (fs.existsSync(railwayDir)) {
            const files = fs.readdirSync(railwayDir);
            console.log('Files in .railway:', files);
            
            for (const file of files) {
                if (file.endsWith('.json')) {
                    try {
                        const data = JSON.parse(fs.readFileSync(path.join(railwayDir, file), 'utf-8'));
                        console.log(`Content of ${file}:`, data);
                        if (data.project) projectId = data.project;
                        if (data.projectId) projectId = data.projectId;
                    } catch (err) {
                        console.warn(`Error reading ${file}:`, err);
                    }
                }
            }
        } else {
             console.warn('.railway directory not found');
        }

        // Method 2: Parse from init output (if available)
        // Example init output sometimes contains a project URL like:
        // https://railway.com/project/50a6744b-f5ba-4c67-9bf7-d3e2e07522da
        // Try to extract a project UUID from the init output as a fallback.
        try {
          const projectUrlRegex = /https?:\/\/(?:www\.)?(?:railway\.com|railway\.app)\/project\/([0-9a-fA-F-]{36})/i;
          const urlMatch = initOutput && initOutput.match ? initOutput.match(projectUrlRegex) : null;
          if (urlMatch && urlMatch[1]) {
            projectId = urlMatch[1];
            console.log('Parsed projectId from init output:', projectId);
          }
        } catch (parseErr) {
          console.warn('Failed parsing project ID from init output:', parseErr);
        }
        
        // REMOVED: Method 3 (railway run printenv) because it triggers auto-deploy/build.
        
    } catch (e) {
        console.warn('Failed to extract Project ID:', e);
    }

    if (projectId) {
        lead.railwayProjectId = projectId;
        lead.status = 'project_created';
        await lead.save();
        console.log(`Project created with ID: ${projectId}`);
    } else {
        console.warn('Project created but ID not found.');
        lead.status = 'project_created_no_id';
        await lead.save();
    }

    // 4. Send Notification
    const requestUrl = getEffectiveRequestURL(event);
    const config = useRuntimeConfig();
    // Build approval link using configured backend API URL when available (ensures /api routes resolve)
    const backendApi = (config.public && config.public.apiURL) || process.env.API_BASE_URL || null;
    const publicAppUrl = (config.public && config.public.appURL) || config.baseUrl || process.env.APP_URL || `${requestUrl.protocol}//${requestUrl.host}`;
    const baseUrl = String(publicAppUrl).replace(/\/$/, '');
    const apiBase = backendApi ? String(backendApi).replace(/\/$/, '') : baseUrl;
    // Build approval link using proxy domain so LINE shows a friendly proxied URL
    // Format: https://www.kwangunlimit.com/espresso/<NO>
    const proxyBase = process.env.PROXY_BASE_URL || 'https://www.kwangunlimit.com';
    const proxyPrefix = process.env.PROXY_PREFIX || 'espresso';
    const noForPath = String(lead.runNumber || '').padStart(3, '0');
    // include leadId as query parameter so the proxy/target can identify the lead
    const proxyApprovalLink = `${String(proxyBase).replace(/\/$/, '')}/${proxyPrefix}/${noForPath}?leadId=${lead._id}`;
    // API approval link must call our backend so the approve action triggers deployment
    const approvalApiLink = `${apiBase}/api/deploy/approve?leadId=${lead._id}`;

    // Prepare logo URL for LINE: must be https and not localhost
    let logoUrl = `${baseUrl}/ESPRESSO_logo.png`;
    if (/^https?:\/\/(localhost|127\.0\.0\.1)/i.test(logoUrl)) {
      // Do not use localhost URLs in LINE payload (invalid scheme for LINE). Remove image.
      logoUrl = '';
    } else {
      logoUrl = logoUrl.replace(/^http:/i, 'https:');
    }

    // Attach timestamp (localized to Bangkok/Thailand)
    const timestamp = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });

    console.log('---------------------------------------------------');
    console.log('🚀 APPROVAL LINK (API) (Click to Deploy):');
    console.log(approvalApiLink);
    console.log('🚀 APPROVAL LINK (Public Proxy) (preview):');
    console.log(proxyApprovalLink);
    console.log('---------------------------------------------------');

    const flexMessage = {
      type: "flex",
      altText: `New Lead: ${lead.name}`,
      contents: {
        type: "bubble",
        header: {
          type: "box",
          layout: "vertical",
          contents: [
            // include image only when logoUrl is valid (non-empty)
            ...(logoUrl ? [{ type: 'image', url: logoUrl, size: 'xxs', align: 'start', aspectMode: 'fit', margin: 'none' }] : []),
            {
              type: "text",
              text: "ลูกค้าส่งคำขอมาใหม่",
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
                { type: "text", text: "No.", color: "#a89993", size: "sm", flex: 2 },
                { type: "text", text: `${lead.runNumber}`, wrap: true, color: "#3b2b28", size: "sm", flex: 5, weight: "bold" }
              ]
            },
            {
              type: "box",
              layout: "baseline",
              margin: "md",
              contents: [
                { type: "text", text: "NAME", color: "#a89993", size: "sm", flex: 2 },
                { type: "text", text: lead.name, wrap: true, color: "#3b2b28", size: "sm", flex: 5, weight: "bold" }
              ]
            },
            {
              type: "box",
              layout: "baseline",
              margin: "md",
              contents: [
                { type: "text", text: "PHONE", color: "#a89993", size: "sm", flex: 2 },
                { type: "text", text: lead.phone, wrap: true, color: "#3b2b28", size: "sm", flex: 5 }
              ]
            },
            {
              type: "box",
              layout: "baseline",
              margin: "md",
              contents: [
                { type: "text", text: "PROJECT", color: "#a89993", size: "sm", flex: 2 },
                { type: "text", text: projectName, wrap: true, color: "#3b2b28", size: "sm", flex: 5 }
              ]
            },
            {
              type: "box",
              layout: "baseline",
              margin: "md",
              contents: [
                { type: "text", text: "DATE", color: "#a89993", size: "sm", flex: 2 },
                { type: "text", text: timestamp, wrap: true, color: "#3b2b28", size: "sm", flex: 5 }
              ]
            }
          ]
        },
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "button",
              style: "primary",
              height: "sm",
                action: {
                type: "uri",
                label: "Approve & Deploy",
                uri: approvalApiLink
              },
              color: "#4b2f2a"
            }
          ],
          flex: 0
        }
      }
    };

    await sendLineNotification(flexMessage);

  } catch (error) {
    console.error('Project creation error:', error);
    await sendLineNotification(`Failed to create project for ${lead.name} at ${timestamp}. Check logs.`);
  }
}

function runCommand(command: string, args: string[], options: any = {}) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command} ${args.join(' ')}`);
    const proc = spawn(command, args, { stdio: 'pipe', shell: true, ...options });
    
    let stdout = '';
    let stderr = '';

    if (proc.stdout) {
      proc.stdout.on('data', (data) => {
        const chunk = data.toString();
        stdout += chunk;
        process.stdout.write(chunk); // Pipe to main console
      });
    }

    if (proc.stderr) {
      proc.stderr.on('data', (data) => {
        const chunk = data.toString();
        stderr += chunk;
        process.stderr.write(chunk); // Pipe to main console
      });
    }
    
    proc.on('close', (code) => {
      if (code === 0) resolve(true);
      else reject(new Error(`Command failed with code ${code}\nStderr: ${stderr}`));
    });
    
    proc.on('error', (err) => reject(err));
  });
}

function runCommandWithOutput(command: string, args: string[], options: any = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log(`Running (capture): ${command} ${args.join(' ')}`);
    const proc = spawn(command, args, { ...options, shell: true });
    let stdout = '';
    let stderr = '';

    proc.stdout?.on('data', (data) => stdout += data.toString());
    proc.stderr?.on('data', (data) => stderr += data.toString());

    proc.on('close', (code) => {
      if (code === 0) resolve(stdout.trim());
      else reject(new Error(`Command failed with code ${code}: ${stderr}`));
    });
    
    proc.on('error', (err) => reject(err));
  });
}
