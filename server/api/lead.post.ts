import { connectToDatabase } from '~/server/utils/mongo';
import { Lead } from '~/server/utils/models';
import { sendLineNotification } from '~/server/utils/line';
import { getEffectiveRequestURL } from '~/server/utils/request';
import * as RailwayAPI from '~/server/utils/railway-api';

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
  const config = useRuntimeConfig();
  const apiToken = config.railwayApiKey || process.env.RAILWAY_API_TOKEN || process.env.RAILWAY_API_KEY;

  // Prepare timestamp early
  const timestamp = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });
  const projectRunNumber = String(lead.runNumber || '0').padStart(3, '0');
  const projectName = `Espresso-${projectRunNumber}`;

  console.log(`Starting project creation for ${lead.name} (No. ${lead.runNumber}) using Railway API`);

  try {
    // =====================================================
    // CREATE PROJECT USING RAILWAY API (NO CLI REQUIRED)
    // =====================================================
    
    console.log(`[Railway API] Creating project: ${projectName}`);
    const project = await RailwayAPI.createProject(projectName, apiToken);
    const projectId = project.id;
    
    lead.railwayProjectId = projectId;
    lead.status = 'project_created';
    await lead.save();
    console.log(`[Railway API] Project created with ID: ${projectId}`);

    // Build notification links
    const requestUrl = getEffectiveRequestURL(event);
    // Use FRONTEND_URL for approve link since /api/deploy/approve is on Nuxt server
    const frontendUrl = process.env.FRONTEND_URL || (config.public && config.public.appURL) || config.baseUrl || process.env.APP_URL || `${requestUrl.protocol}//${requestUrl.host}`;
    const baseUrl = String(frontendUrl).replace(/\/$/, '');
    // apiBase should point to frontend where /api/deploy/approve lives
    const apiBase = baseUrl;
    
    const proxyBase = process.env.PROXY_BASE_URL || 'https://www.kwangunlimit.com';
    const proxyPrefix = process.env.PROXY_PREFIX || 'espresso';
    const noForPath = String(lead.runNumber || '').padStart(3, '0');
    const proxyApprovalLink = `${String(proxyBase).replace(/\/$/, '')}/${proxyPrefix}/${noForPath}?leadId=${lead._id}`;
    const approvalApiLink = `${apiBase}/api/deploy/approve?leadId=${lead._id}`;

    // Prepare logo URL
    let logoUrl = `${baseUrl}/ESPRESSO_logo.png`;
    if (/^https?:\/\/(localhost|127\.0\.0\.1)/i.test(logoUrl)) {
      logoUrl = '';
    } else {
      logoUrl = logoUrl.replace(/^http:/i, 'https:');
    }

    console.log('---------------------------------------------------');
    console.log('🚀 APPROVAL LINK (API) (Click to Deploy):');
    console.log(approvalApiLink);
    console.log('🚀 APPROVAL LINK (Public Proxy) (preview):');
    console.log(proxyApprovalLink);
    console.log('---------------------------------------------------');

    // Send LINE notification
    const flexMessage = {
      type: "flex",
      altText: `New Lead: ${lead.name}`,
      contents: {
        type: "bubble",
        header: {
          type: "box",
          layout: "vertical",
          contents: [
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
    const timestamp = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });
    await sendLineNotification(`Failed to create project for ${lead.name} at ${timestamp}. Check logs.`);
  }
}
