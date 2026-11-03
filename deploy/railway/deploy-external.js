#!/usr/bin/env node
const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const repo = process.env.EXTERNAL_REPO || 'https://github.com/ThitikornC/EspressoTemplate.git';
const branch = process.env.EXTERNAL_REPO_BRANCH || 'main';
const root = process.cwd();
const workdir = path.join(root, 'external_repo');

function safeRmRf(p) {
  try { execSync(`rm -rf ${p}`, { stdio: 'inherit', shell: true }); } catch (e) { /* ignore */ }
}

async function main(){
  console.log('External deploy script starting');
  console.log('Repo:', repo, 'branch:', branch);

  if (fs.existsSync(workdir)) {
    console.log('Removing previous external repo');
    safeRmRf(workdir);
  }

  console.log('Cloning external repo...');
  execSync(`git clone --depth 1 --branch ${branch} ${repo} ${workdir}`, { stdio: 'inherit', shell: true });

  // pick env file from caller repo (root)
  const customer = process.env.CUSTOMER_ENV || process.env.RAILWAY_CUSTOMER_ENV;
  const candidates = [
    path.join(root, `.env.${customer}`),
    path.join(root, 'envs', `.env.${customer}`),
    path.join(root, customer)
  ];

  let found = null;
  for (const p of candidates) { if (p && fs.existsSync(p)) { found = p; break; } }
  if (!found && fs.existsSync(path.join(root, '.env'))) found = path.join(root, '.env');

  if (found) {
    console.log('Copying env file to external repo:', found);
    fs.copyFileSync(found, path.join(workdir, '.env'));
  } else {
    // If no env file found in this repo, attempt to generate .env in the external repo
    // from environment variables. Useful for CI/platforms where secrets are set
    // in environment rather than committed files.
    const destEnv = path.join(workdir, '.env');
    const envBlob = process.env.ENV_FILE_CONTENT || process.env.RAW_ENV_CONTENT;
    if (envBlob && envBlob.length > 0) {
      try {
        fs.writeFileSync(destEnv, envBlob, { encoding: 'utf8' });
        console.log('Wrote .env in external repo from ENV_FILE_CONTENT');
      } catch (e) {
        console.warn('Failed writing ENV_FILE_CONTENT to .env:', e);
      }
    } else if (process.env.ENV_KEYS) {
      // ENV_KEYS is a comma-separated list of keys to export into .env
      const keys = process.env.ENV_KEYS.split(',').map(k => k.trim()).filter(Boolean);
      let content = '';
      keys.forEach((k) => {
        if (Object.prototype.hasOwnProperty.call(process.env, k)) {
          content += `${k}=${process.env[k]}\n`;
        }
      });
      if (content.length > 0) {
        try {
          fs.writeFileSync(destEnv, content, { encoding: 'utf8' });
          console.log('Wrote .env in external repo from ENV_KEYS');
        } catch (e) {
          console.warn('Failed writing ENV_KEYS to .env:', e);
        }
      } else {
        console.log('ENV_KEYS set but no matching environment variables found');
      }
    } else {
      // Fallback: pick a small set of common env keys if present
      const defaultKeys = ['MONGODB_URI','PORT','NODE_ENV','MONGODB_DB','BACKEND_API','API_BASE_URL','RAILWAY_API_TOKEN','RAILWAY_PROJECT_ID','RAILWAY_TEMPLATE_ENV_ID'];
      let content = '';
      defaultKeys.forEach((k) => {
        if (Object.prototype.hasOwnProperty.call(process.env, k)) {
          content += `${k}=${process.env[k]}\n`;
        }
      });
      if (content.length > 0) {
        try {
          fs.writeFileSync(destEnv, content, { encoding: 'utf8' });
          console.log('Wrote .env in external repo from default env keys');
        } catch (e) {
          console.warn('Failed writing default env keys to .env:', e);
        }
      } else {
        console.log('No env file found and no environment variables available to generate .env; continuing without .env');
      }
    }
  }

  // install deps
  console.log('Installing dependencies in external repo');
  try {
    execSync('npm ci --prefer-offline --no-audit --progress=false', { cwd: workdir, stdio: 'inherit', shell: true });
  } catch (e) {
    console.log('npm ci failed, falling back to npm install');
    execSync('npm install --no-audit --no-fund', { cwd: workdir, stdio: 'inherit', shell: true });
  }

  // start the external app via npm run start (recommended) or node server.js
  console.log('Starting external app (npm run start)');
  const child = spawn('npm', ['run', 'start'], { cwd: workdir, stdio: 'inherit', shell: true });

  const forward = sig => { try { child.kill(sig); } catch(e){} };
  process.on('SIGTERM', () => forward('SIGTERM'));
  process.on('SIGINT', () => forward('SIGINT'));

  child.on('exit', code => process.exit(code));
}

main().catch(err => { console.error(err); process.exit(1); });
