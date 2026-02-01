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
  
  // Check Referer header to see if request comes from an Espresso page
  const referer = request.headers.get('Referer') || '';
  const espressoRefererMatch = referer.match(/\/espresso\/(\d{1,})/);
  
  // If this is an API/status request AND comes from an Espresso page, proxy to Espresso site
  if (espressoRefererMatch && (pathname.startsWith('/api/') || pathname.startsWith('/status/') || pathname.startsWith('/socket.io/'))) {
    const runNoRaw = espressoRefererMatch[1];
    const runNo = runNoRaw.padStart(3, '0');
    
    // Look up the Espresso site URL for this runNo
    const lead = await lookupLead(runNo, runNoRaw);
    if (lead) {
      const targetBase = (lead.deployedUrl && lead.deployedUrl.length > 0) ? lead.deployedUrl : lead.url;
      if (targetBase) {
        const target = `${String(targetBase).replace(/\/$/, '')}${pathname}${url.search}`;
        const headers = new Headers(request.headers);
        headers.delete('host');
        const proxyReq = new Request(target, {
          method: request.method,
          headers,
          body: request.body,
          redirect: 'follow'
        });
        return fetch(proxyReq);
      }
    }
  }

  // If this is an API request (not from Espresso), forward to backend API
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

  const lead = await lookupLead(runNo, runNoRaw, isDebug);
  
  if (!lead) {
    if (isDebug) {
      return new Response(JSON.stringify({ error: 'Lead not found', runNo, runNoRaw }), { status: 404, headers: { 'Content-Type': 'application/json' } });
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

// Helper function to lookup lead by runNo
async function lookupLead(runNo, runNoRaw, isDebug = false) {
  const cacheKey = `espresso-lead-${runNo}`;
  let lead = null;

  try {
    const cache = caches.default;
    const cacheReq = new Request(`${BACKEND_BASE}/__cache__/${cacheKey}`);
    const cached = await cache.match(cacheReq);
    if (cached) {
      lead = await cached.json();
      return lead;
    }
    
    // Fetch list of leads and find the one with matching runNumber
    const backendLookup = (typeof BACKEND_API !== 'undefined' && BACKEND_API) ? BACKEND_API : BACKEND_BASE;
    const lookupUrl = `${backendLookup.replace(/\/$/, '')}/api/espresso`;
    const res = await fetch(lookupUrl, { method: 'GET' });
    const dataText = await res.text();
    let data = null;
    try { data = JSON.parse(dataText); } catch(e) { data = null; }
    if (!res.ok) {
      return null;
    }
    const list = data && data.list ? data.list : [];
    lead = list.find((l) => String(l.runNumber).padStart(3,'0') === runNo || String(l.runNumber) === runNoRaw) || null;
    if (lead) {
      // store in cache
      const body = new Response(JSON.stringify(lead), { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': `max-age=${CACHE_TTL}` } });
      await cache.put(cacheReq, body.clone());
    }
    return lead;
  } catch (e) {
    console.warn('Worker lookup error', e);
    return null;
  }
}
