import mongoose from 'mongoose';

// MongoDB connection string for Espresso
const ESPRESSO_MONGO_URI = 'mongodb+srv://nippit62:ohm0966477158@testing.hgxbz.mongodb.net/?retryWrites=true&w=majority';

// Define schema for daily_users
const dailyUserSchema = new mongoose.Schema({
  client_id: String,
  day: String,
  created_at: String,
}, { collection: 'daily_users' });

// Database configurations for each center
const databases = [
  { name: 'Huroa2', label: 'ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ' },
  { name: 'Huaroa3', label: 'ศูนย์พัฒนาเด็กเล็กบ้านสระโคล่' },
  { name: 'Huaroa4', label: 'ศูนย์พัฒนาเด็กเล็กมหาวนาราม' },
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

    const results = await Promise.all(
      databases.map(async (db) => {
        try {
          const connection = await getConnection(db.name);
          const DailyUser = connection.models.DailyUser || connection.model('DailyUser', dailyUserSchema);

          // total visits and unique clients
          const totalVisits = await DailyUser.countDocuments();
          const uniqueClients = await DailyUser.distinct('client_id');

          // Aggregate to get last seen per client (attempt to convert created_at to date)
          const agg = await DailyUser.aggregate([
            {
              $group: {
                _id: '$client_id',
                lastCreatedAt: { $max: { $toDate: '$created_at' } }
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

          console.log(`${db.name}: ${totalVisits} visits, ${onlineCount} online`);

          return {
            dbName: db.name,
            label: db.label,
            totalVisits,
            uniqueUserCount: uniqueClients.length,
            onlineCount,
            clients
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

    return {
      success: true,
      data: results
    };
  } catch (error: any) {
    console.error('Error fetching daily users:', error);
    return {
      success: false,
      error: error.message
    };
  }
});
