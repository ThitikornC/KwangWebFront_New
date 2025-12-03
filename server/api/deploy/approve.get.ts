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

  // Start Deployment Process
  deployProject(lead).catch(err => console.error('Deployment failed:', err));

  return `Deployment started for ${lead.name}. You will receive a notification when complete.`;
});

async function deployProject(lead: any) {
  const tempDir = path.join(os.tmpdir(), `deploy-${lead._id}`);
  const config = useRuntimeConfig();
  // Use RAILWAY_API_KEY as RAILWAY_TOKEN for the CLI
  const env = { 
    ...process.env, 
    RAILWAY_TOKEN: config.railwayApiKey || process.env.RAILWAY_API_KEY 
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
        await runCommand('railway', ['link', lead.railwayProjectId], { cwd: tempDir, env });
    } else {
        console.warn('No Project ID found. Falling back to Railway Init.');
        const projectRunNumber = String(lead.runNumber || '0').padStart(3, '0');
        const projectName = `Client-${projectRunNumber}-${lead.name.replace(/[^a-zA-Z0-9]/g, '')}`;
        await runCommand('railway', ['init', '--name', projectName], { cwd: tempDir, env });
    }

    // 3. Railway Up
    // Since it's an empty project initially, we need to make sure we are deploying the code we cloned.
    // 'railway up' inside the cloned directory should do this.
    // However, if the project on Railway is empty, 'railway up' will upload the local code.
    await runCommand('railway', ['up', '--detach'], { cwd: tempDir, env });

    // 4. Generate Domain
    // Try to get the domain. If it fails, we might need to wait or use 'railway domain' to generate one.
    let deployedUrl = 'URL not found';
    try {
        const domainOutput = await runCommandWithOutput('railway', ['domain'], { cwd: tempDir, env });
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
    await sendLineNotification(`Deployment Successful for ${lead.name}!\nURL: ${deployedUrl}`);
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
