import mongoose from 'mongoose';

// MongoDB connection string for Espresso
const ESPRESSO_MONGO_URI = 'mongodb+srv://nippit62:ohm0966477158@testing.hgxbz.mongodb.net/?retryWrites=true&w=majority';

// Define schema for daily_page_views (counts EVERY entry — exit & re-enter counts again).
// This is the true "จำนวนการเข้าใช้/ครั้ง" (increments on every /api/usage/start in the
// Espresso app). daily_page_counts only counts unique users/day, so it undercounts.
const dailyPageSchema = new mongoose.Schema({
  page: String,
  day: String,
  count: Number,
  created_at: String,
  createdAt: String,
}, { collection: 'daily_page_views' });

// Database configurations for each center
const databases = [
  { name: 'Huroa2', label: 'ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ' },
  { name: 'Huroa3', label: 'ศูนย์พัฒนาเด็กเล็กบ้านสระโคล่' },
  { name: 'Huroa4', label: 'ศูนย์พัฒนาเด็กเล็กมหาวนาราม' },
];

// Store connections
const connections: Map<string, mongoose.Connection> = new Map();

const getConnection = async (dbName: string) => {
  if (connections.has(dbName) && connections.get(dbName)!.readyState === 1) {
    return connections.get(dbName)!;
  }

  const connection = mongoose.createConnection(ESPRESSO_MONGO_URI, {
    dbName: dbName
  });

  await connection.asPromise();
  connections.set(dbName, connection);
  return connection;
};

// Sum the pre-aggregated `count` grouped by `page` for a single DB
const countPagesForDb = async (dbName: string) => {
  const connection = await getConnection(dbName);
  const DailyPage = connection.models.DailyPage || connection.model('DailyPage', dailyPageSchema);

  const agg = await DailyPage.aggregate([
    { $match: { page: { $ne: null } } },
    { $group: { _id: '$page', count: { $sum: '$count' } } }
  ]).allowDiskUse(true);

  const pageCounts: Record<string, number> = {};
  let total = 0;
  for (const row of agg) {
    const key = String(row._id ?? '').trim();
    if (!key) continue;
    const c = Number(row.count || 0);
    pageCounts[key] = (pageCounts[key] || 0) + c;
    total += c;
  }
  return { pageCounts, total };
};

export default defineEventHandler(async (event) => {
  try {
    const q = getQuery(event) || {};
    const requestedDb = (q.db || '').toString();
    const targetDbs = requestedDb
      ? databases.filter(d => normalizeDbName(d.name) === normalizeDbName(requestedDb))
      : databases;

    const results = await Promise.all(
      targetDbs.map(async (db) => {
        try {
          const { pageCounts, total } = await countPagesForDb(db.name);
          return { dbName: db.name, label: db.label, pageCounts, total };
        } catch (err: any) {
          console.error(`Error fetching page modes from ${db.name}:`, err.message);
          return { dbName: db.name, label: db.label, pageCounts: {}, total: 0 };
        }
      })
    );

    if (requestedDb && results.length === 1) {
      return { success: true, data: results[0] };
    }
    return { success: true, data: results };
  } catch (error: any) {
    console.error('Error fetching daily page modes:', error);
    return { success: false, error: error.message };
  }
});

function normalizeDbName(s: string) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}
