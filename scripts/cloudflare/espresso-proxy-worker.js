/**
 * Cloudflare Worker
 * Proxy requests to /espresso/:runNo/* to the corresponding lead.url stored in your backend.
 *
 * Configuration:
 * - Set `BACKEND_BASE` environment variable in Cloudflare to the public URL of your backend (e.g. https://www.kwangunlimit.com)
 * - Optionally set `CACHE_TTL` (seconds) for lead lookup caching (default 60)
 */

const BACKEND_BASE = (typeof BACKEND_BASE !== 'undefined') ? BACKEND_BASE : 'https://www.kwangunlimit.com';
const CACHE_TTL = (typeof CACHE_TTL !== 'undefined') ? Number(CACHE_TTL) : 60;

addEventListener('fetch', (event) => {
  event.respondWith(handle(event.request));
});

async function handle(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Match /espresso/:runNo and optional trailing path
  const m = pathname.match(/^\/espresso\/(\d{1,})\/?(.*)$/);
  if (!m) return new Response('Not Found', { status: 404 });

  const runNoRaw = m[1];
  const suffix = m[2] || '';
  const runNo = runNoRaw.padStart(3, '0');

  // Cache lead mapping per runNo
  const cacheKey = `espresso-lead-${runNo}`;
  let lead = null;

  try {
    const cache = caches.default;
    const cached = await cache.match(cacheKey);
    if (cached) {
      lead = await cached.json();
    } else {
      // Fetch list of leads and find the one with matching runNumber
      const res = await fetch(`${BACKEND_BASE}/api/espresso` , { method: 'GET' });
      if (!res.ok) return new Response('Backend lookup failed', { status: 502 });
      const data = await res.json();
      const list = data.list || [];
      lead = list.find((l) => String(l.runNumber).padStart(3,'0') === runNo || String(l.runNumber) === runNoRaw) || null;
      if (lead) {
        // store in cache
        const body = new Response(JSON.stringify(lead), { status: 200, headers: { 'Content-Type': 'application/json' } });
        // caches.default.put requires a Request; create a synthetic one
        const req = new Request(`${BACKEND_BASE}/__cache__/${cacheKey}`);
        await cache.put(req, body.clone());
      }
    }
  } catch (e) {
    console.warn('Worker lookup error', e);
  }

  if (!lead) return new Response('Lead not found', { status: 404 });

  // Prefer the real deployed URL (Railway). Fallback to lead.url if deployedUrl missing.
  const preferred = lead.deployedUrl && lead.deployedUrl.length > 0 ? lead.deployedUrl : lead.url;
  if (!preferred) return new Response('Lead has no target URL', { status: 404 });

  const targetBase = String(preferred).replace(/\/$/, '');
  const targetUrl = suffix ? `${targetBase}/${suffix}` : targetBase;

  // Proxy the request to targetUrl
  const headers = new Headers(request.headers);
  // Remove host header to avoid CORS issues
  headers.delete('host');

  const proxyReq = new Request(targetUrl, {
    method: request.method,
    headers,
    body: request.body,
    redirect: 'follow'
  });

  const resp = await fetch(proxyReq);
  // Return response directly (streaming)
  return resp;
}
