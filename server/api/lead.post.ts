import { connectToDatabase } from '~/server/utils/mongo';
import { Lead } from '~/server/utils/models';
import { sendLineNotification } from '~/server/utils/line';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

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
    await runCommand('npx', ['-y', '-p', '@railway/cli', 'railway', 'init', '--name', projectName], { cwd: tempDir, env });

    // 3. Get Project ID from generated config
    let projectId = '';
    try {
        // Method 1: Try reading .railway/project.json
        const projectJsonPath = path.join(tempDir, '.railway', 'project.json');
        if (fs.existsSync(projectJsonPath)) {
            const projectData = JSON.parse(fs.readFileSync(projectJsonPath, 'utf-8'));
            projectId = projectData.project || projectData.projectId;
        }

        // Method 2: If file not found, ask CLI directly via 'railway run printenv'
        if (!projectId) {
            console.log('Project ID file not found, trying CLI printenv...');
            const output = await runCommandWithOutput('npx', ['-y', '-p', '@railway/cli', 'railway', 'run', 'printenv', 'RAILWAY_PROJECT_ID'], { cwd: tempDir, env });
            projectId = output.trim();
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
