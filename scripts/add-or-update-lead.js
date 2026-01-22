// scripts/add-or-update-lead.js
// Usage example:
// MONGODB_URI="<uri>" node scripts/add-or-update-lead.js --name "Huaroa" --phone "0000000000" --url "/espresso/Huaroa" --deployedUrl "https://espresso-huaroa-production..."

const mongoose = require('mongoose');

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const val = args[i+1] && !args[i+1].startsWith('--') ? args[++i] : 'true';
    out[key] = val;
  }
  return out;
}

const args = parseArgs();
const MONGODB_URI = process.env.MONGODB_URI || args.mongodbUri || args.mongoUri;
if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI. Set env or pass --mongodbUri');
  process.exit(1);
}

const name = args.name || 'Huaroa';
const phone = args.phone || '0000000000';
const url = args.url || `/espresso/${name}`;
const deployedUrl = args.deployedUrl || '';
const runNumber = args.runNumber ? Number(args.runNumber) : undefined;

// Minimal Lead schema matching server/utils/models.ts
const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  contactno: { type: String },
  company: String,
  installer: String,
  message: String,
  url: String,
  deployedUrl: String,
  runNumber: { type: Number },
  type: { type: String },
  contractNumber: String,
  contractImage: String,
  startDate: Date,
  expiryDate: Date,
  status: { type: String, default: 'pending_approval' },
  createdAt: { type: Date, default: Date.now },
  railwayProjectId: String,
  railwayServiceId: String,
  railwayEnvironmentId: String,
}, { strict: false }); // allow fields if schema evolves

const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);

async function main() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  // Prefer matching by exact url first, then by name
  const filter = url ? { url } : { name };

  const update = {
    name,
    phone,
    url,
    deployedUrl,
  };
  if (runNumber) update.runNumber = runNumber;

  // Upsert the lead
  const opts = { new: true, upsert: true, setDefaultsOnInsert: true };
  const lead = await Lead.findOneAndUpdate(filter, update, opts).exec();

  // If runNumber not provided and lead had none, compute a safe runNumber if missing
  if (!lead.runNumber) {
    // find max runNumber and set next
    const max = await Lead.findOne().sort({ runNumber: -1 }).select('runNumber').lean();
    const next = (max && max.runNumber) ? max.runNumber + 1 : 1;
    lead.runNumber = next;
    await lead.save();
  }

  console.log('Upserted lead:');
  console.log({ id: lead._id.toString(), name: lead.name, runNumber: lead.runNumber, url: lead.url, deployedUrl: lead.deployedUrl });

  await mongoose.disconnect();
  process.exit(0);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
