#!/usr/bin/env node
import fs from 'fs';
const path = require('path');

// Select an environment file based on CUSTOMER_ENV (set in Railway environment variables)
const customer = process.env.CUSTOMER_ENV || process.env.RAILWAY_CUSTOMER_ENV;
const root = process.cwd();

if (!customer) {
  console.log('No CUSTOMER_ENV set — skipping env selection.');
  process.exit(0);
}

const candidates = [
  path.join(root, `.env.${customer}`),
  path.join(root, 'envs', `.env.${customer}`),
  path.join(root, customer)
];

let found = null;
for (const p of candidates) {
  if (fs.existsSync(p)) { found = p; break; }
}

if (!found) {
  console.error('Could not find env file for CUSTOMER_ENV. Tried:\n' + candidates.join('\n'));
  process.exit(1);
}

const dest = path.join(root, '.env');
try {
  fs.copyFileSync(found, dest);
  console.log(`Selected env \"${path.basename(found)}\" -> .env`);
} catch (err) {
  console.error('Failed to copy env file:', err);
  process.exit(2);
}
