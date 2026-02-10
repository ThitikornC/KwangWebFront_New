/**
 * Cloudflare Worker
 * Proxy requests to /espresso/:runNo/* to the corresponding lead.url stored in your backend.
 *
 * Configuration:
 * - Set `BACKEND_BASE` environment variable in Cloudflare to the public URL of your backend (e.g. https://www.kwangunlimit.com)
 * - Optionally set `CACHE_TTL` (seconds) for lead lookup caching (default 60)
 */

const BACKEND_BASE = (typeof BACKEND_BASE !== 'undefined') ? BACKEND_BASE : 'https://www.kwangunlimit.com';
// BACKEND_API should point to your backend API server (e.g. https://kwangwebbacknew-production.up.railway.app)
const BACKEND_API = (typeof BACKEND_API !== 'undefined') ? BACKEND_API : (typeof BACKEND_BASE !== 'undefined' ? BACKEND_BASE : '');
const CACHE_TTL = (typeof CACHE_TTL !== 'undefined') ? Number(CACHE_TTL) : 60;

addEventListener('fetch', (event) => {
  event.respondWith(handle(event.request));
});

async function handle(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // If this is an API request, forward to backend API
  if (pathname.startsWith('/api/')) {
    // Build target API URL
    const target = `${BACKEND_API.replace(/\/$/, '')}${pathname}${url.search}`;
    const headers = new Headers(request.headers);
    headers.delete('host');
    const proxyReq = new Request(target, {
      method: request.method,
      headers,
      body: request.body,
      redirect: 'follow'
    });
    const resp = await fetch(proxyReq);
    return resp;
  }

  // Match /espresso/:runNo and optional trailing path
  const m = pathname.match(/^\/espresso\/(\d{1,})\/?(.*)$/);
  if (!m) return new Response('Not Found', { status: 404 });

  const runNoRaw = m[1];
  const suffix = m[2] || '';
  const runNo = runNoRaw.padStart(3, '0');

  // Debug mode (query param ?debug=1 or header X-Debug: 1)
  const isDebug = url.searchParams.get('debug') === '1' || request.headers.get('X-Debug') === '1';

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
      // Use BACKEND_API for backend API calls (may be different from public site)
      const backendLookup = (typeof BACKEND_API !== 'undefined' && BACKEND_API) ? BACKEND_API : BACKEND_BASE;
      const lookupUrl = `${backendLookup.replace(/\/$/, '')}/api/espresso`;
      const res = await fetch(lookupUrl, { method: 'GET' });
      const dataText = await res.text();
      let data = null;
      try { data = JSON.parse(dataText); } catch(e) { data = null; }
      if (!res.ok) {
        if (isDebug) {
          return new Response(JSON.stringify({ error: 'Backend lookup failed', status: res.status, body: dataText, lookupUrl }), { status: 502, headers: { 'Content-Type': 'application/json' } });
        }
        return new Response('Backend lookup failed', { status: 502 });
      }
      const list = data && data.list ? data.list : [];
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

    if (!lead) {
      if (isDebug) {
        return new Response(JSON.stringify({ error: 'Lead not found', runNo, runNoRaw, lookupUrl: `${BACKEND_API.replace(/\/$/, '')}/api/espresso`, listLength: Array.isArray(data && data.list) ? data.list.length : undefined, sample: (data && data.list && data.list.slice && data.list.slice(0,5)) || null }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response('Lead not found', { status: 404 });
    }

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
