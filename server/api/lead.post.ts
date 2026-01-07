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
    const requestUrl = getRequestURL(event);
    const config = useRuntimeConfig();
    const configuredBase = (config.public && config.public.baseUrl) || config.baseUrl || process.env.PUBLIC_BASE_URL || process.env.BASE_URL;
    let baseUrl = '';
    if (configuredBase) {
      baseUrl = configuredBase.toString().trim().replace(/\/$/, '');
      if (!/^https?:\/\//i.test(baseUrl)) baseUrl = `https://${baseUrl}`;
    } else {
      baseUrl = `${requestUrl.protocol}//${requestUrl.host}`;
    }
    if (/^http:/i.test(baseUrl)) baseUrl = baseUrl.replace(/^http:/i, 'https:');
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(baseUrl)) {
      console.warn('Base URL resolves to localhost; LINE cannot access header images. Set PUBLIC_BASE_URL to a public HTTPS URL or use ngrok.');
    }
    const approvalLink = `${baseUrl}/api/deploy/approve?leadId=${lead._id}`;

    // Attach timestamp (localized to Bangkok/Thailand)
    const timestamp = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });

    console.log('---------------------------------------------------');
    console.log('🚀 APPROVAL LINK (Click to Deploy):');
    console.log(approvalLink);
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
            {
              type: "image",
              url: `${baseUrl}/ESPRESSO_logo.png`,
              size: "xxs",
              align: "start",
              aspectMode: "fit",
              margin: "none"
            },
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
                uri: approvalLink
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
