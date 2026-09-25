import { connectToDatabase } from '~/server/utils/mongo';
import { Lead } from '~/server/utils/models';

export default defineEventHandler(async (event) => {
  await connectToDatabase();
  try {
    // Return recent leads, sorted by runNumber desc
    const leads = await Lead.find().sort({ runNumber: -1 }).lean();
    const list = leads.map((l: any) => ({
      id: l._id,
      name: l.name,
      runNumber: l.runNumber,
      contactno: l.contactno || l.phone || '',
      createdAt: l.createdAt,
      status: l.status,
      url: l.url,
      deployedUrl: l.deployedUrl || '',
      contractNumber: l.contractNumber,
      contractImage: l.contractImage,
      type: l.type || ''
    }));
    return { success: true, list };
  } catch (e: any) {
    console.error('espresso.get error', e);
    return { success: false, error: e.message || String(e) };
  }
});
