import { sendLineNotification } from '~/server/utils/line';
import { Lead } from '~/server/utils/models';
import { connectToDatabase } from '~/server/utils/mongo';

export default defineEventHandler(async (event) => {
  // Receive LINE webhook events and handle approve actions
  const config = useRuntimeConfig();
  const channelSecret = config.lineChannelSecret || process.env.LINE_CHANNEL_SECRET || '';

  // Read raw body for signature verification if needed
  let body: any = null;
  try {
    body = await readBody(event)
  } catch (e) {
    console.warn('Failed to read body in LINE webhook', e);
    return { success: false }
  }

  // Simple handling: accept postback events with data like "action=approve&leadId=..."
  try {
    const events = body.events || [];
    for (const ev of events) {
      if (ev.type === 'postback' && ev.postback && ev.postback.data) {
        const params = new URLSearchParams(ev.postback.data);
        const action = params.get('action');
        const leadId = params.get('leadId');
        if (action === 'approve' && leadId) {
          // Call internal approve endpoint to start deployment
          try {
            await $fetch(`/api/deploy/approve?leadId=${encodeURIComponent(leadId)}`);
            // Acknowledge to the user who pressed the button (optional)
            await sendLineNotification({ type: 'text', text: `Deployment started for lead ${leadId}` });
          } catch (err) {
            console.error('Error calling approve endpoint from webhook:', err);
            await sendLineNotification({ type: 'text', text: `Failed to start deployment for lead ${leadId}` });
          }
        }
      }

      // Accept plain text messages like "approve <leadId>"
      if (ev.type === 'message' && ev.message && ev.message.type === 'text') {
        const txt = (ev.message.text || '').trim();
        const m = txt.match(/approve\s+([0-9a-fA-F]{24})/);
        if (m) {
          const leadId = m[1];
          try {
            await $fetch(`/api/deploy/approve?leadId=${encodeURIComponent(leadId)}`);
            await sendLineNotification({ type: 'text', text: `Deployment started for lead ${leadId}` });
          } catch (err) {
            console.error('Error calling approve endpoint from webhook (text):', err);
            await sendLineNotification({ type: 'text', text: `Failed to start deployment for lead ${leadId}` });
          }
        }
      }
    }
  } catch (e) {
    console.error('LINE webhook handler error', e);
  }

  return { success: true };
});
