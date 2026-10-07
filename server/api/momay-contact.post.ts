import { connectToDatabase } from '~/server/utils/mongo';
import { MomayContact } from '~/server/utils/models';

/** รับคำขอติดต่อจากหน้า MOMAY Surprise แล้วเก็บลง MongoDB
    ไม่มี side effect อื่น (ไม่สร้างโปรเจกต์ ไม่ deploy) */
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const name = String(body?.name ?? '').trim();
  const org = String(body?.org ?? '').trim();
  const phone = String(body?.phone ?? '').trim();

  if (!name || !org || !phone) {
    throw createError({
      statusCode: 400,
      statusMessage: 'กรุณากรอกชื่อ หน่วยงาน และเบอร์โทรให้ครบถ้วน',
    });
  }

  // ตัวคั่นที่คนไทยพิมพ์กันบ่อย (เว้นวรรค ขีด) ไม่ถือเป็นความผิด ตัดทิ้งก่อนตรวจ
  const digits = phone.replace(/[\s-]/g, '');
  if (!/^\+?\d{9,15}$/.test(digits)) {
    throw createError({ statusCode: 400, statusMessage: 'รูปแบบเบอร์โทรไม่ถูกต้อง' });
  }

  await connectToDatabase();

  const contact = await MomayContact.create({
    name,
    org,
    phone: digits,
    source: String(body?.source ?? '').slice(0, 40),
    sourceLabel: String(body?.sourceLabel ?? '').slice(0, 120),
    orgType: String(body?.orgType ?? '').slice(0, 40),
  });

  return { success: true, id: contact._id };
});
