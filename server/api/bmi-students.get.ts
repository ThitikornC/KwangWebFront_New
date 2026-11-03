import mongoose from 'mongoose';

// MongoDB connection string for Espresso (cluster เดียวกับ bmi-summary)
const ESPRESSO_MONGO_URI = 'mongodb+srv://nippit62:ohm0966477158@testing.hgxbz.mongodb.net/?retryWrites=true&w=majority';

// Schema for bmi_records (flexible fields — เขียนโดยแอป BMI.html ฝั่ง Railway)
const bmiRecordSchema = new mongoose.Schema({
  id: Number,
  date: String,
  name: String,
  classroom: String,
  ageY: Number,
  ageM_Input: Number,
  ageTotalM: Number,
  w: Number,
  h: Number,
  gender: String,
  photo: String,
  photoBase64: String,
  photoMime: String,
  statWA: String,
  statHA: String,
  statWH: String,
  colorWA: String,
  colorHA: String,
  colorWH: String,
  created_at: String,
}, { collection: 'bmi_records' });

// Database whitelist
const databases = [
  { name: 'BMI', label: 'เทศบาลตำบลหัวรอ' },
  { name: 'BMI_center1', label: 'ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ 1' },
  { name: 'BMI_center2', label: 'ศูนย์พัฒนาเด็กเล็กบ้านสระโคล่ 1' },
  { name: 'BMI_center3', label: 'ศูนย์พัฒนาเด็กเล็กมหาวนาราม' },
  { name: 'BMI_center4', label: 'ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ 2' },
  { name: 'BMI_center5', label: 'ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ 3' },
  { name: 'BMI_templatedemo', label: 'Espresso demo' },
];

const connections: Map<string, mongoose.Connection> = new Map();

const getConnection = async (dbName: string) => {
  if (connections.has(dbName) && connections.get(dbName)!.readyState === 1) {
    return connections.get(dbName)!;
  }
  const connection = mongoose.createConnection(ESPRESSO_MONGO_URI, { dbName });
  await connection.asPromise();
  connections.set(dbName, connection);
  return connection;
};

// คีย์จัดกลุ่มเด็กคนเดียวกัน — ชื่อใน DB สะกดคำนำหน้าไม่คงที่
// ("เด็กชายภาคิน", "ดช.ภาคิน", "ด.ช. ภาคิน" คือคนเดียวกัน) จึงตัดคำนำหน้า + ยุบช่องว่างก่อนเทียบ
const studentKey = (name: string) => {
  return String(name || '')
    .trim()
    .replace(/^(เด็กชาย|เด็กหญิง|ด\.ช\.|ด\.ญ\.|ดช\.|ดญ\.)\s*/, '')
    .replace(/\s+/g, ' ')
    .toLowerCase();
};

// แก้คำที่สะกดตกใน DB ให้แสดงผลถูก (เหมือน bmi-summary)
const fixLabel = (label: string) => {
  const s = String(label || '').trim();
  if (s === 'น้ำหนักตามเกณ') return 'น้ำหนักตามเกณฑ์';
  return s;
};

// รูปเด็กจากแอปสมาร์ทแทรค — เก็บเป็น data URL ใน photo หรือแยกเป็น photoBase64 + photoMime
const photoOf = (r: any): string | null => {
  if (typeof r?.photo === 'string' && r.photo.startsWith('data:')) return r.photo;
  if (typeof r?.photoBase64 === 'string' && r.photoBase64) {
    return `data:${r.photoMime || 'image/jpeg'};base64,${r.photoBase64}`;
  }
  return null;
};

export default defineEventHandler(async (event) => {
  try {
    const q = getQuery(event) || {};
    const requestedDb = (q.db || 'BMI').toString();
    const target = databases.find(d => d.name.toLowerCase() === requestedDb.toLowerCase()) || databases[0];

    const connection = await getConnection(target.name);
    const BmiRecord = connection.models.BmiRecord || connection.model('BmiRecord', bmiRecordSchema);

    const records = await BmiRecord.find({}).lean();

    // จัดกลุ่มประวัติการชั่ง-วัดของเด็กแต่ละคน เรียงตามวันที่ (เก่า → ใหม่)
    const byStudent = new Map<string, any[]>();
    for (const r of records) {
      const key = studentKey((r as any).name) || String((r as any)._id);
      const list = byStudent.get(key) || [];
      list.push(r);
      byStudent.set(key, list);
    }

    const students = [...byStudent.entries()].map(([key, list]) => {
      list.sort((a, b) =>
        new Date(a.date || a.created_at || 0).getTime() - new Date(b.date || b.created_at || 0).getTime()
      );
      const latest = list[list.length - 1];
      // รูปล่าสุดที่มี (บาง record ไม่ได้ถ่ายรูป) — ส่งครั้งเดียวต่อเด็ก ไม่แนบทุก record กัน payload บวม
      let photo: string | null = null;
      for (let i = list.length - 1; i >= 0 && !photo; i--) photo = photoOf(list[i]);
      return {
        key,
        name: String(latest.name || '').trim(),
        classroom: String(latest.classroom || '').trim(),
        gender: String(latest.gender || '').trim(),
        photo,
        records: list.map(r => ({
          date: r.date || r.created_at || null,
          ageY: r.ageY ?? null,
          ageM: r.ageM_Input ?? null,
          ageTotalM: r.ageTotalM ?? null,
          w: r.w ?? null,
          h: r.h ?? null,
          statWA: fixLabel(r.statWA),
          statHA: fixLabel(r.statHA),
          statWH: fixLabel(r.statWH),
          colorWA: r.colorWA || '',
          colorHA: r.colorHA || '',
          colorWH: r.colorWH || '',
        })),
      };
    }).sort((a, b) => a.name.localeCompare(b.name, 'th'));

    return {
      success: true,
      data: {
        dbName: target.name,
        label: target.label,
        total: students.length,
        students,
      },
    };
  } catch (error: any) {
    console.error('Error fetching bmi students:', error);
    return { success: false, error: error.message };
  }
});
