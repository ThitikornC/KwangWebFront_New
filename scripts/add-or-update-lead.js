#!/usr/bin/env node
/**
 * scripts/add-or-update-lead.js
 *
 * Upsert a lead document into the project's MongoDB so `/espresso/Huaroa`
 * works as a standalone slug URL. The script will set `runNumber` if
 * missing and mark the lead as `deployed`.
 *
 * Usage (example):
 *   MONGODB_URI="mongodb://..." node scripts/add-or-update-lead.js \
 *     --name "Huaroa" --phone "0000000000" --url "/espresso/Huaroa" --deployedUrl "https://espresso-huaroa-production..."
 */

import mongoose from 'mongoose';
import minimist from 'minimist';
const argv = minimist(process.argv.slice(2));

const MONGODB_URI = process.env.MONGODB_URI || argv.mongodbUri || argv.mongodb || argv.m;
if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI. Set env MONGODB_URI or pass --mongodbUri');
  process.exit(1);
}

const name = argv.name || 'Huaroa';
const phone = argv.phone || '0000000000';
const url = argv.url || `/espresso/${name}`;
const deployedUrl = argv.deployedUrl || argv.deployed || '';
const runNumberArg = argv.runNumber ? Number(argv.runNumber) : undefined;

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
}, { strict: false });

const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // Prefer matching by exact url first, then case-insensitive name
  const filter = url ? { url } : { name: new RegExp(`^${name}$`, 'i') };

  const update = {
    name,
    phone,
    url,
    deployedUrl,
    status: 'deployed',
  };
  if (runNumberArg) update.runNumber = runNumberArg;

  const opts = { new: true, upsert: true, setDefaultsOnInsert: true };
  const lead = await Lead.findOneAndUpdate(filter, update, opts).exec();

  // Ensure runNumber exists: compute next if missing
  if (!lead.runNumber) {
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
