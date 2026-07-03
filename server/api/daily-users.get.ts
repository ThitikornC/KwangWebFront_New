import mongoose from 'mongoose';

// MongoDB connection string for Espresso
const ESPRESSO_MONGO_URI = 'mongodb+srv://nippit62:ohm0966477158@testing.hgxbz.mongodb.net/?retryWrites=true&w=majority';

// Define schema for daily_users (flexible fields)
const dailyUserSchema = new mongoose.Schema({
  client_id: String,
  clientId: String,
  day: String,
  created_at: String,
  createdAt: String,
  timestamp: String,
  visits: Number,
}, { collection: 'daily_users' });

// Database configurations for each center
const databases = [
  { name: 'Huroa2', label: 'ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ' },
  { name: 'Huroa3', label: 'ศูนย์พัฒนาเด็กเล็กบ้านสระโคล่' },
  { name: 'Huroa4', label: 'ศูนย์พัฒนาเด็กเล็กมหาวนาราม' },
  { name: 'Huroa5', label: 'ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ 2' },
  { name: 'Huroa6', label: 'ศูนย์พัฒนาเด็กเล็กบ้านสระโคล่ 2' },
  { name: 'Espresso_template', label: 'โรงเรียนเทศบาล3 แม่ฮ่องสอน' },
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

export default defineEventHandler(async (event) => {
  try {
    console.log('Fetching data from multiple databases...');
    const q = getQuery(event) || {}
    const requestedDb = (q.db || '').toString()
    const targetDbs = requestedDb ? databases.filter(d => normalizeDbName(d.name) === normalizeDbName(requestedDb)) : databases

    const results = await Promise.all(
      targetDbs.map(async (db) => {
        try {
          const connection = await getConnection(db.name);
          const DailyUser = connection.models.DailyUser || connection.model('DailyUser', dailyUserSchema);

          // total visits and unique clients from `daily_users` collection
          const totalVisits = await DailyUser.countDocuments();
          const uniqueClients = await DailyUser.distinct('client_id');

          console.log(`${db.name}: ${totalVisits} visits`);

          return {
            dbName: db.name,
            label: db.label,
            totalVisits,
            uniqueUserCount: uniqueClients.length
          };
        } catch (err: any) {
          console.error(`Error fetching from ${db.name}:`, err.message);
          return {
            dbName: db.name,
            label: db.label,
            totalVisits: 0,
            uniqueUserCount: 0,
            onlineCount: 0,
            clients: []
          };
        }
      })
    );

    if (requestedDb && results.length === 1) {
      return { success: true, data: results[0] }
    }

    return { success: true, data: results }
  } catch (error: any) {
    console.error('Error fetching daily users:', error);
    return {
      success: false,
      error: error.message
    };
  }
});

function normalizeDbName(s: string) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '')
}
