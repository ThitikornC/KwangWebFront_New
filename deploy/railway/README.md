Railway deploy helpers for per-customer trial envs

Files:
- `select-env.js` — copies an env file into `.env` at deploy time. It looks for the file in this order:
  1. `.env.$CUSTOMER_ENV` in the repo root
  2. `envs/.env.$CUSTOMER_ENV`
  3. A literal path matching `$CUSTOMER_ENV`
- `Procfile` — `web: npm run start` (Railway will run `npm run start`).

How to use
1. Add per-customer env files to the repo (for example: `.env.Espresso`) or create an `envs/` folder.
2. In Railway project settings set an environment variable named `CUSTOMER_ENV` to the customer identifier (for example `Espresso`).
3. Railway will run `web: npm run start`. The start script runs `select-env.js` which will copy the chosen env file to `.env`, then `server.js` is started.

Notes
- If `CUSTOMER_ENV` is not set the script exits without changing `.env` (safe fallback).
- You can also store secrets in Railway environment variables instead of committing env files.
