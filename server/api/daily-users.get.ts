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
            uniqueUserCount: 0
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
