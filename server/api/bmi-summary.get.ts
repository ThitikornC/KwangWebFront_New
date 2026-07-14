import mongoose from 'mongoose';

// MongoDB connection string for Espresso (cluster เดียวกับ daily-users)
const ESPRESSO_MONGO_URI = 'mongodb+srv://nippit62:ohm0966477158@testing.hgxbz.mongodb.net/?retryWrites=true&w=majority';

// Schema for bmi_records (flexible fields — เขียนโดยแอป BMI.html ฝั่ง Railway)
const bmiRecordSchema = new mongoose.Schema({
  id: Number,
  date: String,
  name: String,
  classroom: String,
  ageTotalM: Number,
  w: Number,
  h: Number,
  gender: String,
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

// severity จากคลาสสีที่แอป BMI บันทึกไว้ (status-green / status-orange / status-red)
// บาง record สีหาย/ไม่ครบ → คืน null แล้วไป fallback ตามความหมายของ label แทน
const severityOf = (colorClass: string): string | null => {
  const s = String(colorClass || '');
  if (s.includes('green')) return 'green';
  if (s.includes('orange')) return 'orange';
  if (s.includes('red')) return 'red';
  return null;
};

// fallback: ตีความระดับจากข้อความผลประเมิน (ตามเกณฑ์กรมอนามัย)
const severityFromLabel = (label: string) => {
  const s = String(label || '');
  if (s.includes('ค่อนข้าง') || s === 'ท้วม' || s === 'เริ่มอ้วน') return 'orange';
  if (s.includes('ตามเกณฑ์') || s.includes('ตามเกณ') || s === 'สมส่วน' || s === 'สูง') return 'green';
  return 'red'; // มาก / น้อย / อ้วน / ผอม / เตี้ย
};

// แก้คำที่สะกดตกใน DB ให้แสดงผลถูก
const fixLabel = (label: string) => {
  const s = String(label || '').trim();
  if (s === 'น้ำหนักตามเกณ') return 'น้ำหนักตามเกณฑ์';
  return s;
};

export default defineEventHandler(async (event) => {
  try {
    const q = getQuery(event) || {};
    const requestedDb = (q.db || 'BMI').toString();
    const target = databases.find(d => d.name.toLowerCase() === requestedDb.toLowerCase()) || databases[0];

    const connection = await getConnection(target.name);
    const BmiRecord = connection.models.BmiRecord || connection.model('BmiRecord', bmiRecordSchema);

    const records = await BmiRecord.find({}).lean();

    // ใช้ผลวัด "ครั้งล่าสุดของเด็กแต่ละคน" (กันนับซ้ำเมื่อชั่งหลายครั้ง)
    const latestByStudent = new Map<string, any>();
    for (const r of records) {
      const key = String(r.name || '').trim() || String(r._id);
      const prev = latestByStudent.get(key);
      const t = new Date(r.date || r.created_at || 0).getTime();
      const tPrev = prev ? new Date(prev.date || prev.created_at || 0).getTime() : -1;
      if (!prev || t >= tPrev) latestByStudent.set(key, r);
    }
    const students = [...latestByStudent.values()];

    // รวมนับ 3 ตัวชี้วัด: label -> { count, severity }
    const defs = [
      { key: 'wa', title: 'น้ำหนักตามเกณฑ์อายุ', stat: 'statWA', color: 'colorWA' },
      { key: 'ha', title: 'ส่วนสูงตามเกณฑ์อายุ', stat: 'statHA', color: 'colorHA' },
      { key: 'wh', title: 'น้ำหนักตามส่วนสูง', stat: 'statWH', color: 'colorWH' },
    ];
    const sevOrder: Record<string, number> = { green: 0, orange: 1, red: 2 };

    const indicators = defs.map((d) => {
      // นับจำนวน + โหวตสีจากทุก record ของ label นั้น (กัน record ที่สีหาย/ผิดตัวเดียวลากทั้งกลุ่ม)
      const buckets = new Map<string, { label: string; count: number; votes: Record<string, number> }>();
      for (const s of students) {
        const label = fixLabel((s as any)[d.stat]);
        if (!label) continue;
        const b = buckets.get(label) || { label, count: 0, votes: {} };
        b.count++;
        const sev = severityOf((s as any)[d.color]);
        if (sev) b.votes[sev] = (b.votes[sev] || 0) + 1;
        buckets.set(label, b);
      }
      const items = [...buckets.values()]
        .map((b) => {
          const voted = Object.entries(b.votes).sort((a, c) => c[1] - a[1])[0]?.[0];
          return { label: b.label, count: b.count, severity: voted || severityFromLabel(b.label) };
        })
        .sort((a, b) => (sevOrder[a.severity] - sevOrder[b.severity]) || (b.count - a.count));
      return { key: d.key, title: d.title, items };
    });

    return {
      success: true,
      data: {
        dbName: target.name,
        label: target.label,
        total: students.length,
        totalRecords: records.length,
        indicators,
      },
    };
  } catch (error: any) {
    console.error('Error fetching bmi summary:', error);
    return { success: false, error: error.message };
  }
});
