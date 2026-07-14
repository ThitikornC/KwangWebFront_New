import mongoose from 'mongoose';

// MongoDB connection string for Espresso
const ESPRESSO_MONGO_URI = 'mongodb+srv://nippit62:ohm0966477158@testing.hgxbz.mongodb.net/?retryWrites=true&w=majority';

// Define schema for daily_page_users (flexible fields)
const dailyPageSchema = new mongoose.Schema({
  client_id: String,
  clientId: String,
  page: String,
  day: String,
  created_at: String,
  createdAt: String,
  timestamp: String,
}, { collection: 'daily_page_users' });

// Database configurations for each center
const databases = [
  { name: 'Huroa2', label: 'ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ' },
  { name: 'Huroa3', label: 'ศูนย์พัฒนาเด็กเล็กบ้านสระโคล่' },
  { name: 'Huroa4', label: 'ศูนย์พัฒนาเด็กเล็กมหาวนาราม' },
  { name: 'Huroa5', label: 'ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ 2' },
  { name: 'Huroa6', label: 'ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ 3' },
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
    console.log('Fetching page-level data from multiple databases...');
    const q = getQuery(event) || {}
    const requestedDb = (q.db || '').toString()
    const targetDbs = requestedDb ? databases.filter(d => normalizeDbName(d.name) === normalizeDbName(requestedDb)) : databases

    const results = await Promise.all(
      targetDbs.map(async (db) => {
        try {
          const connection = await getConnection(db.name);
          const DailyPage = connection.models.DailyPage || connection.model('DailyPage', dailyPageSchema);

          // Get records from daily_page_users, group by client and take last created_at
          const agg = await DailyPage.aggregate([
            {
              $project: {
                clientId: { $ifNull: ['$client_id', '$clientId', '$client'] },
                createdAt: { $ifNull: ['$created_at', '$createdAt', '$timestamp', '$time', null] },
                page: 1
              }
            },
            { $match: { clientId: { $ne: null } } },
            {
              $group: {
                _id: '$clientId',
                lastCreatedAt: { $max: { $toDate: '$createdAt' } }
              }
            }
          ]).allowDiskUse(true);

          const now = new Date();
          const ONLINE_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes

          const clients = agg.map((row: any) => {
            let lastSeen: Date | null = null;
            try {
              lastSeen = row.lastCreatedAt ? new Date(row.lastCreatedAt) : null;
            } catch (_) {
              lastSeen = null;
            }

            const isOnline = lastSeen ? (now.getTime() - lastSeen.getTime() <= ONLINE_THRESHOLD_MS) : false;

            return {
              client_id: row._id,
              lastSeen: lastSeen ? lastSeen.toISOString() : null,
              status: isOnline ? 'online' : 'offline'
            };
          });

          const onlineCount = clients.filter(c => c.status === 'online').length;

          console.log(`${db.name}: ${onlineCount} online`);

          return {
            dbName: db.name,
            label: db.label,
            onlineCount,
            clients
          };
        } catch (err: any) {
          console.error(`Error fetching from ${db.name}:`, err.message);
          return {
            dbName: db.name,
            label: db.label,
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
    console.error('Error fetching daily page users:', error);
    return {
      success: false,
      error: error.message
    };
  }
});

function normalizeDbName(s: string) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '')
}
