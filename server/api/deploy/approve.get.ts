import { connectToDatabase } from '~/server/utils/mongo';
import { Lead } from '~/server/utils/models';
import { sendLineNotification } from '~/server/utils/line';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import JSZip from 'jszip';
import { getEffectiveRequestURL } from '~/server/utils/request';

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
  // Use RAILWAY_API_TOKEN for Account Tokens (required for 'railway init' / 'railway link')
  const env = { 
    ...process.env, 
    RAILWAY_API_TOKEN: config.railwayApiKey || process.env.RAILWAY_API_KEY 
  };

  console.log(`Starting deployment for ${lead.name} in ${tempDir}`);

  try {
    // 1. Download and Extract Repo (Avoid git clone)
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    
    // Use JSZip to download and extract
    await downloadAndExtractRepo('https://github.com/ThitikornC/EspressoHuaroa/archive/refs/heads/main.zip', tempDir);
    
    // 2. Railway Link or Init
    // If we have a project ID, link to it. Otherwise, fallback to init (safety net).
    if (lead.railwayProjectId) {
      console.log(`Linking to existing project ID: ${lead.railwayProjectId}`);
      try {
        await runCommand('npx', ['-y', '-p', '@railway/cli', 'railway', 'link', '--project', lead.railwayProjectId], { cwd: tempDir, env });
      } catch (err) {
        console.warn('railway link with --project failed, retrying positional arg:', err);
        await runCommand('npx', ['-y', '-p', '@railway/cli', 'railway', 'link', lead.railwayProjectId], { cwd: tempDir, env });
      }
    } else {
        console.warn('No Project ID found. Falling back to Railway Init.');
        const projectRunNumber = String(lead.runNumber || '0').padStart(3, '0');
        const projectName = `Espresso-${projectRunNumber}`;
        await runCommand('npx', ['-y', '-p', '@railway/cli', 'railway', 'init', '--name', projectName], { cwd: tempDir, env });
    }

    // 3. Railway Up
    // Since it's an empty project initially, we need to make sure we are deploying the code we cloned.
    // 'railway up' inside the cloned directory should do this.
    // However, if the project on Railway is empty, 'railway up' will upload the local code.
    await runCommand('npx', ['-y', '-p', '@railway/cli', 'railway', 'up', '--detach'], { cwd: tempDir, env });

    // 4. Generate Domain
    // Try to get the domain. If it fails, we might need to wait or use 'railway domain' to generate one.
    let deployedUrl = 'URL not found';
    try {
        const domainOutput = await runCommandWithOutput('npx', ['-y', '-p', '@railway/cli', 'railway', 'domain'], { cwd: tempDir, env });
        const urlMatch = domainOutput.match(/(https?:\/\/[^\s]+)|([a-zA-Z0-9-]+\.up\.railway\.app)/);
        deployedUrl = urlMatch ? (urlMatch[0].startsWith('http') ? urlMatch[0] : `https://${urlMatch[0]}`) : 'URL not found';
    } catch (e) {
        console.warn('Could not fetch domain immediately:', e);
        deployedUrl = 'Deployment successful, but domain generation pending. Check Railway Dashboard.';
    }

    // 5. Update DB
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

    // 6a. Set Railway project variables from current process.env when available
    // Priority: ENV_FILE_CONTENT (raw .env text) > ENV_KEYS (comma list) > defaultKeys
    async function setRailwayProjectVariables(projectId: string, envObj: any) {
      if (!projectId) return;
      // Parse ENV_FILE_CONTENT if present
      const vars: Record<string,string> = {};
      const raw = envObj.ENV_FILE_CONTENT || envObj.RAW_ENV_CONTENT || '';
      if (raw && raw.length > 0) {
        raw.split(/\r?\n/).forEach((ln: string) => {
          const line = ln.trim();
          if (!line || line.startsWith('#')) return;
          const idx = line.indexOf('=');
          if (idx === -1) return;
          const k = line.slice(0, idx).trim();
          const v = line.slice(idx+1).trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '');
          if (k) vars[k] = v;
        });
      } else if (envObj.ENV_KEYS) {
        const keys = String(envObj.ENV_KEYS).split(',').map((s:any)=>String(s).trim()).filter(Boolean);
        keys.forEach((k:any) => { if (Object.prototype.hasOwnProperty.call(envObj, k)) vars[k] = String(envObj[k]); });
      } else {
        const defaultKeys = [
          'MONGODB_URI','PORT','NODE_ENV','MONGODB_DB','MONGODB_BMI_DB',
          'BACKEND_API','API_BASE_URL','RAILWAY_API_TOKEN','RAILWAY_PROJECT_ID','RAILWAY_TEMPLATE_ENV_ID','RAILWAY_PROJECT_NAME',
          // Customer/client config keys
          'CUSTOMER_NAME','CLIENT_RUN_NUMBER','CLIENT_CONTRACT_NO','CLIENT_INSTALL_DATE','CLIENT_EXPIRY_DATE'
        ];
        defaultKeys.forEach((k) => { if (Object.prototype.hasOwnProperty.call(envObj, k)) vars[k] = String(envObj[k]); });
      }

      // If no vars found, nothing to do
      const keys = Object.keys(vars);
      if (!keys.length) {
        console.log('No variables found to set for Railway project');
        return;
      }

      console.log(`Setting ${keys.length} Railway variables for project ${projectId} (keys: ${keys.join(',')})`);
      for (const k of keys) {
        try {
          // use CLI to set variable for the project
          // Prefer capture output so we can log errors for debugging
          const envFlag = envObj.RAILWAY_TEMPLATE_ENV_ID || envObj.RAILWAY_ENVIRONMENT_ID || process.env.RAILWAY_TEMPLATE_ENV_ID || process.env.RAILWAY_ENVIRONMENT_ID || '';
          const args = ['-y','-p','@railway/cli','railway','variables','set', `${k}=${vars[k]}`, '--project', projectId];
          if (envFlag) args.push('--environment', String(envFlag));
          try {
            const out = await runCommandWithOutput('npx', args, { cwd: tempDir, env: envObj });
            console.log(`railway variables set ${k}:`, out);
          } catch (err:any) {
            console.warn(`railway variables set ${k} failed:`, err && err.message ? err.message : err);
            // retry without environment flag if it failed with env
            if (envFlag) {
              try {
                const out2 = await runCommandWithOutput('npx', ['-y','-p','@railway/cli','railway','variables','set', `${k}=${vars[k]}`, '--project', projectId], { cwd: tempDir, env: envObj });
                console.log(`railway variables set ${k} (retry w/o env):`, out2);
              } catch (err2:any) {
                console.error(`railway variables set ${k} retry failed:`, err2 && err2.message ? err2.message : err2);
              }
            }
          }
        } catch (e) {
          console.warn(`Failed to set variable ${k} on project ${projectId}:`, e);
        }
      }
    }

    try {
      const projectIdToUse = lead.railwayProjectId || '';
      if (projectIdToUse) {
        // Build per-customer env overrides so DB names and client info are unique per deploy
        const runNoPart = String(lead.runNumber || 0).padStart(3, '0');
        const perCustomerEnv: Record<string,string> = {
          // preserve provided environment values but override DB names per-customer
          MONGODB_DB: process.env.MONGODB_DB ? process.env.MONGODB_DB.replace(/_template$/i, `_${runNoPart}`) : `Espresso_${runNoPart}`,
          MONGODB_BMI_DB: process.env.MONGODB_BMI_DB ? process.env.MONGODB_BMI_DB.replace(/_template$/i, `_${runNoPart}`) : `BMI_${runNoPart}`,
          CUSTOMER_NAME: String(lead.name || ''),
          CLIENT_RUN_NUMBER: runNoPart,
          CLIENT_CONTRACT_NO: String(lead.contactno || '-'),
          CLIENT_INSTALL_DATE: (lead.startDate ? new Date(lead.startDate).toISOString() : ''),
          CLIENT_EXPIRY_DATE: (lead.expiryDate ? new Date(lead.expiryDate).toISOString() : ''),
          RAILWAY_PROJECT_NAME: process.env.RAILWAY_PROJECT_NAME || 'espresso',
          RAILWAY_PROJECT_ID: process.env.RAILWAY_PROJECT_ID || '',
          RAILWAY_TEMPLATE_ENV_ID: process.env.RAILWAY_TEMPLATE_ENV_ID || ''
        };

        const envToSet = { ...env, ...perCustomerEnv };
        await setRailwayProjectVariables(projectIdToUse, envToSet);
      } else {
        console.warn('No projectId available to set Railway variables');
      }
    } catch (e) {
      console.warn('Failed to set Railway project variables:', e);
    }

    // 6a. Generate contract image now that deployment is done, upload to public storage
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

      // Fallback: write into this backend public dir and expose via API_BASE_URL or BACKEND_API
      if (!contractImageUrl) {
        const svgFilename = `contract-${contractNumber}.svg`;
        const pngFilename = `contract-${contractNumber}.png`;
        const possiblePublicDirs = [path.join(process.cwd(), '.output', 'public'), path.join(process.cwd(), 'public')];
        const publicDir = possiblePublicDirs.find((d) => fs.existsSync(d)) || possiblePublicDirs[1];
        try {
          if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
          if (pngBuffer) {
            const pngPath = path.join(publicDir, pngFilename);
            fs.writeFileSync(pngPath, pngBuffer);
            const backendBase = (config.public && config.public.apiURL) || process.env.API_BASE_URL || process.env.BACKEND_API || process.env.APP_URL || '';
            if (backendBase) contractImageUrl = `${String(backendBase).replace(/\/$/, '')}/${pngFilename}`;
            lead.contractImage = `/${pngFilename}`;
          } else {
            const svgPath = path.join(publicDir, svgFilename);
            fs.writeFileSync(svgPath, svg, 'utf-8');
            const backendBase = (config.public && config.public.apiURL) || process.env.API_BASE_URL || process.env.BACKEND_API || process.env.APP_URL || '';
            if (backendBase) contractImageUrl = `${String(backendBase).replace(/\/$/, '')}/${svgFilename}`;
            lead.contractImage = `/${svgFilename}`;
          }
          lead.contractNumber = contractNumber;
          await lead.save();
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
                // Show proxy/public URL first (if available) and the direct deployed URL below
                [{ type: "text", text: publicProxyUrl, wrap: true, color: "#007bff", size: "sm", action: { type: "uri", uri: publicProxyUrl } }],
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
            // Primary proxy button (if available)
            [{ type: "button", style: "primary", height: "sm", action: { type: "uri", label: "Open (Proxy)", uri: publicProxyUrl }, color: "#1DB446" }],
            // Secondary direct button (deployed URL)
            ...(deployedUrl ? [{ type: "button", style: "secondary", height: "sm", action: { type: "uri", label: "Open (Direct)", uri: String(deployedUrl) }, color: "#4b2f2a" }] : [])
          ],
          flex: 0
        }
      }
    };

    await sendLineNotification(flexMessage);
    console.log(`Deployment finished. URL: ${deployedUrl}`);

  } catch (error) {
    console.error('Deployment error:', error);
    await sendLineNotification(`Deployment Failed for ${lead.name}. Check server logs.`);
  }
}

async function downloadAndExtractRepo(url: string, dest: string) {
  console.log(`Downloading repo from ${url}...`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download repo: ${response.statusText}`);
  
  const arrayBuffer = await response.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);
  
  console.log(`Extracting to ${dest}...`);
  fs.mkdirSync(dest, { recursive: true });

  for (const filename of Object.keys(zip.files)) {
      // Skip node_modules and .git to avoid issues and save time
      if (filename.includes('node_modules/') || filename.includes('.git/')) continue;

      const file = zip.files[filename];
      if (file.dir) continue;

      const destPath = path.join(dest, filename);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      const content = await file.async('nodebuffer');
      fs.writeFileSync(destPath, content);
  }
  
  // Handle root folder if exists (e.g. EspressoHuaroa-main/)
  const items = fs.readdirSync(dest);
  if (items.length === 1 && fs.statSync(path.join(dest, items[0])).isDirectory()) {
      const rootDir = path.join(dest, items[0]);
      const files = fs.readdirSync(rootDir);
      for (const f of files) {
          fs.renameSync(path.join(rootDir, f), path.join(dest, f));
      }
      fs.rmdirSync(rootDir);
  }
}

function runCommand(command: string, args: string[], options: any = {}) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command} ${args.join(' ')}`);
    const proc = spawn(command, args, { stdio: 'inherit', shell: true, ...options });
    
    proc.on('close', (code) => {
      if (code === 0) resolve(true);
      else reject(new Error(`Command failed with code ${code}`));
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
