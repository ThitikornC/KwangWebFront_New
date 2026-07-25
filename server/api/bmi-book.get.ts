import mongoose from 'mongoose';

// MongoDB connection string for Espresso (cluster เดียวกับ bmi-students / bmi-summary)
const ESPRESSO_MONGO_URI = 'mongodb+srv://nippit62:ohm0966477158@testing.hgxbz.mongodb.net/?retryWrites=true&w=majority';

// Schema for bmi_books — เขียนโดยแอปฝั่งครู (bmi-dashboard.html → POST /api/bmi-book)
// dev: { 'ข้อประเมิน': '3' | '2' | '1' }  ·  comments: { '1': { 'ด้านร่างกาย': '...' }, '2': {...} }
const bmiBookSchema = new mongoose.Schema({
  studentKey: String,
  name: String,
  classroom: String,
  dev: { type: mongoose.Schema.Types.Mixed, default: {} },
  comments: { type: mongoose.Schema.Types.Mixed, default: {} },
  teacher: String,
  created_at: String,
  updated_at: String,
}, { collection: 'bmi_books' });

// Database whitelist (ชุดเดียวกับ bmi-students)
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

export default defineEventHandler(async (event) => {
  try {
    const q = getQuery(event) || {};
    const requestedDb = (q.db || 'BMI').toString();
    const target = databases.find(d => d.name.toLowerCase() === requestedDb.toLowerCase()) || databases[0];

    const connection = await getConnection(target.name);
    const BmiBook = connection.models.BmiBook || connection.model('BmiBook', bmiBookSchema);

    const docs = await BmiBook.find({}).lean();

    // ส่งเป็น map ตาม studentKey — หน้า Clientbook จับคู่กับ students[].key ได้ตรง
    const books: Record<string, any> = {};
    for (const d of docs as any[]) {
      if (!d.studentKey) continue;
      books[d.studentKey] = {
        name: d.name || '',
        classroom: d.classroom || '',
        dev: d.dev || {},
        comments: d.comments || {},
        teacher: d.teacher || '',
        updated_at: d.updated_at || null,
      };
    }

    return {
      success: true,
      data: {
        dbName: target.name,
        label: target.label,
        total: Object.keys(books).length,
        books,
      },
    };
  } catch (error: any) {
    console.error('Error fetching bmi books:', error);
    return { success: false, error: error.message };
  }
});
