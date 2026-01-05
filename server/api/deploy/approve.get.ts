import { connectToDatabase } from '~/server/utils/mongo';
import { Lead } from '~/server/utils/models';
import { sendLineNotification } from '~/server/utils/line';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import JSZip from 'jszip';

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

  // Generate a PNG summary image from lead data and send to LINE upon approval
  try {
    const requestUrl = getRequestURL(event);
    const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`;

    function escapeXml(unsafe: string) {
      return (unsafe || '').toString().replace(/[<>&'\"]/g, (c) => ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        "'": '&apos;',
        '"': '&quot;'
      } as any)[c]);
    }

    const startDateObj = new Date();
    // Display dates without time (Thai locale, Bangkok timezone)
    const startDisplay = startDateObj.toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok' });
    const expiryObj = new Date(startDateObj);
    expiryObj.setMonth(expiryObj.getMonth() + 1);
    const expiryDisplay = expiryObj.toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok' });

    // Build contract number: YYYYMMDD + padded runNumber
    const y = startDateObj.getFullYear();
    const m = String(startDateObj.getMonth() + 1).padStart(2, '0');
    const d = String(startDateObj.getDate()).padStart(2, '0');
    const datePart = `${y}${m}${d}`;
    const runNoPart = String(lead.runNumber || 0).padStart(3, '0');
    const contractNumber = `${datePart}${runNoPart}`;

    // Read kwang logo from public and encode as base64 to embed in SVG
    let logoBase64 = '';
    try {
      const logoPath = path.join(process.cwd(), 'public', 'kwang_logo.png');
      if (fs.existsSync(logoPath)) {
        const buf = fs.readFileSync(logoPath);
        logoBase64 = buf.toString('base64');
      }
    } catch (e) {
      console.warn('Failed to read kwang logo for SVG embed:', e);
    }

    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="720">\n` +
  `  <rect width="100%" height="100%" fill="#fff" rx="16"/>\n` +
  `  <rect x="24" y="24" width="552" height="112" rx="12" fill="#4b2f2a"/>\n` +
  `  <image x="36" y="36" width="56" height="56" href="data:image/png;base64,${logoBase64}" />\n` +
  `  <text x="300" y="84" font-family="'Helvetica Neue', Arial" font-size="24" fill="#fff" text-anchor="middle" font-weight="700">ESPRESSO Contract</text>\n` +
  `  <g transform="translate(40,160)">\n` +
  `    <style> .label { fill: #a89993; font-size: 14px; font-family: 'Helvetica Neue', Arial; } .value { fill: #3b2b28; font-size: 18px; font-family: 'Helvetica Neue', Arial; font-weight:700; } .contract { fill: #3b2b28; font-size:18px; font-family: 'Helvetica Neue', Arial; font-weight:700; } </style>\n` +
  `    <!-- Layout: label at x=0, value at x=220; vertical spacing 56px -->\n` +
  `    <text x="0" y="0" class="label">NAME</text>\n` +
  `    <text x="220" y="0" class="value">${escapeXml(lead.name || '')}</text>\n\n` +
  `    <text x="0" y="56" class="label">CONTRACT NO.</text>\n` +
  `    <text x="220" y="56" class="contract">${escapeXml(contractNumber)}</text>\n\n` +
  `    <text x="0" y="112" class="label">START</text>\n` +
  `    <text x="220" y="112" class="value">${escapeXml(startDisplay)}</text>\n\n` +
  `    <text x="0" y="168" class="label">EXPIRY</text>\n` +
  `    <text x="220" y="168" class="value">${escapeXml(expiryDisplay)}</text>\n` +
  `  </g>\n` +
  `  <!-- Signature area (moved lower for spacing) -->\n` +
  `  <g transform="translate(40,260)">\n` +
  `    <rect x="0" y="0" width="520" height="140" rx="8" fill="#fff" stroke="#e6e2df" stroke-width="1"/>\n` +
  `    <text x="12" y="22" class="label">Signature</text>\n` +
  `    <line x1="12" y1="104" x2="508" y2="104" stroke="#3b2b28" stroke-width="1" stroke-linecap="round"/>\n` +
     `    <text x="12" y="128" class="label"></text>\n` +
  `  </g>\n` +
  `</svg>`;

    const svgFilename = `contract-${contractNumber}.svg`;
    const pngFilename = `contract-${contractNumber}.png`;
    const svgPath = path.join(process.cwd(), 'public', svgFilename);
    const pngPath = path.join(process.cwd(), 'public', pngFilename);

    try {
      fs.writeFileSync(svgPath, svg, 'utf-8');

      try {
        const sharpModule = await import('sharp');
        const sharp = (sharpModule && (sharpModule.default || sharpModule)) as any;
        await sharp(Buffer.from(svg)).png({ quality: 90 }).toFile(pngPath);
        const imageUrl = encodeURI(`${baseUrl}/${pngFilename}`);
        // Save contract info to DB
        try {
          lead.contractNumber = contractNumber;
          lead.contractImage = `/${pngFilename}`;
          await lead.save();
        } catch (dbErr) {
          console.warn('Failed to save contract info to DB:', dbErr);
        }
        await sendLineNotification({ type: 'image', originalContentUrl: imageUrl, previewImageUrl: imageUrl });
      } catch (convErr) {
        console.warn('sharp not available or conversion failed, sending SVG instead:', convErr);
        const imageUrl = encodeURI(`${baseUrl}/${svgFilename}`);
        // Save contract info to DB (SVG fallback)
        try {
          lead.contractNumber = contractNumber;
          lead.contractImage = `/${svgFilename}`;
          await lead.save();
        } catch (dbErr) {
          console.warn('Failed to save contract info to DB:', dbErr);
        }
        await sendLineNotification({ type: 'image', originalContentUrl: imageUrl, previewImageUrl: imageUrl });
      }
    } catch (e) {
      console.warn('Failed to write/send lead image:', e);
    }
  } catch (e) {
    console.warn('Could not send contract image on approve:', e);
  }

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
    lead.url = deployedUrl;
    await lead.save();

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
                {
                  type: "text",
                  text: deployedUrl,
                  wrap: true,
                  color: "#007bff",
                  size: "sm",
                  action: {
                    type: "uri",
                    uri: deployedUrl
                  }
                }
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
                label: "Open Website",
                uri: deployedUrl
              },
              color: "#1DB446"
            }
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
