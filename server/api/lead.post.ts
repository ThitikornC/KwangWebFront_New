import { connectToDatabase } from '~/server/utils/mongo';
import { Lead } from '~/server/utils/models';
import { sendLineNotification } from '~/server/utils/line';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import JSZip from 'jszip';

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

    const newLead = new Lead({
      name: body.name,
      phone: body.phone,
      runNumber: nextRunNumber,
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

  console.log(`Starting project creation (CLI) for ${lead.name} (No. ${lead.runNumber})`);

  try {
    // 1. Download and Extract Repo (Avoid git clone if git is missing)
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    
    // Use JSZip to download and extract
    await downloadAndExtractRepo('https://github.com/ThitikornC/EspressoHuaroa/archive/refs/heads/main.zip', tempDir);
    
    // 2. Railway Init
    const projectRunNumber = String(lead.runNumber || '0').padStart(3, '0');
    // Clean name
    const safeName = lead.name.replace(/[^a-zA-Z0-9]/g, '');
    const projectName = `Client-${projectRunNumber}-${safeName}`;
    
    // Init project from the template repo directly
    // Using --repo to link it immediately
    await runCommand('railway', ['init', '--name', projectName, '--repo', 'ThitikornC/EspressoHuaroa'], { cwd: tempDir, env });

    // 3. Get Project ID from generated config
    let projectId = '';
    try {
        const projectJsonPath = path.join(tempDir, '.railway', 'project.json');
        if (fs.existsSync(projectJsonPath)) {
            const projectData = JSON.parse(fs.readFileSync(projectJsonPath, 'utf-8'));
            console.log('Railway Project Data:', projectData);
            // Structure is usually { "project": "PROJECT_ID", ... } or { "projectId": "..." }
            projectId = projectData.project || projectData.projectId;
        } else {
             console.warn('Could not find .railway/project.json');
        }
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
    const requestUrl = getRequestURL(event);
    const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`;
    const approvalLink = `${baseUrl}/api/deploy/approve?leadId=${lead._id}`;

    console.log('---------------------------------------------------');
    console.log('🚀 APPROVAL LINK (Click to Deploy):');
    console.log(approvalLink);
    console.log('---------------------------------------------------');

    const message = `
New Lead Received! (No. ${lead.runNumber})
Name: ${lead.name}
Phone: ${lead.phone}
Project: ${projectName}

Click to Approve & Deploy: ${approvalLink}
    `.trim();

    await sendLineNotification(message);

  } catch (error) {
    console.error('Project creation error:', error);
    await sendLineNotification(`Failed to create project for ${lead.name}. Check logs.`);
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
