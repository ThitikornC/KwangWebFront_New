import { connectToDatabase } from '~/server/utils/mongo';
import { Lead } from '~/server/utils/models';
import { sendLineNotification } from '~/server/utils/line';

export default defineEventHandler(async (event) => {
  await connectToDatabase();

  const body = await readBody(event).catch(() => ({} as any));
  const q = getQuery(event) as any;
  const leadId = body.leadId || q.leadId;

  if (!leadId) {
    return createError({ statusCode: 400, statusMessage: 'leadId required' });
  }

  const lead = await Lead.findById(leadId).lean();
  if (!lead) return createError({ statusCode: 404, statusMessage: 'Lead not found' });

  // Build notification similar to deploy success but do NOT trigger deploy
  const deployedUrl = lead.deployedUrl || '';
  const publicUrl = lead.url || '';
  const displayUrl = publicUrl || deployedUrl || '';

  const flexMessage = {
    type: 'flex',
    altText: `Deployment Notification: ${lead.name}`,
    contents: {
      type: 'bubble',
      header: { type: 'box', layout: 'vertical', contents: [{ type: 'text', text: 'Deployment Notification', weight: 'bold', color: '#1DB446', size: 'lg' }] },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          { type: 'text', text: `Project for ${lead.name} (${String(lead.runNumber).padStart(3,'0')})`, wrap: true, color: '#666666', size: 'md' },
          { type: 'separator', margin: 'md' },
          { type: 'box', layout: 'vertical', margin: 'md', contents: [ { type: 'text', text: displayUrl, wrap: true, color: '#007bff', size: 'sm', action: { type: 'uri', uri: displayUrl } } ] }
        ]
      },
      footer: { type: 'box', layout: 'vertical', spacing: 'sm', contents: [ { type: 'button', style: 'primary', height: 'sm', action: { type: 'uri', label: 'Open Website', uri: displayUrl }, color: '#1DB446' } ], flex: 0 }
    }
  };

  try {
    await sendLineNotification(flexMessage);
    return { success: true, message: 'LINE notification sent', url: displayUrl };
  } catch (e: any) {
    console.error('Failed to send notify:', e);
    return { success: false, error: e?.message || String(e) };
  }
});
