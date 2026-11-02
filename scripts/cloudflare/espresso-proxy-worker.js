/**
 * Cloudflare Worker
 * Proxy requests to /espresso/:runNo/* to the corresponding lead's deployed site.
 * 
 * URL Format: /espresso/:runNo/:path
 * Example: /espresso/001/catagoly -> proxy to Espresso-001's /catagoly
 *
 * Configuration:
 * - Set `BACKEND_API` to your backend API server for lead lookup
 * - Optionally set `CACHE_TTL` (seconds) for lead lookup caching (default 60)
 */

const BACKEND_BASE = (typeof BACKEND_BASE !== 'undefined') ? BACKEND_BASE : 'https://www.kwangunlimit.com';
const BACKEND_API = (typeof BACKEND_API !== 'undefined') ? BACKEND_API : (typeof BACKEND_BASE !== 'undefined' ? BACKEND_BASE : '');
const CACHE_TTL = (typeof CACHE_TTL !== 'undefined') ? Number(CACHE_TTL) : 60;

addEventListener('fetch', (event) => {
  event.respondWith(handle(event.request));
});

async function handle(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Match /espresso/:runNo and optional trailing path
  const m = pathname.match(/^\/espresso\/(\d{1,})\/?(.*)$/);
  
  // If not /espresso/* path, pass through to origin
  if (!m) {
    return fetch(request);
  }

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
  // Proxy to target with the suffix path (e.g., /espresso/001/catagoly -> targetBase/catagoly)
  const targetUrl = suffix ? `${targetBase}/${suffix}${url.search}` : `${targetBase}${url.search}`;

  // Proxy the request to targetUrl
  const headers = new Headers(request.headers);
  headers.delete('host');

  const proxyReq = new Request(targetUrl, {
    method: request.method,
    headers,
    body: request.body,
    redirect: 'follow'
  });

  const resp = await fetch(proxyReq);
  
  const contentType = resp.headers.get('Content-Type') || '';
  const prefix = `/espresso/${runNoRaw}`;
  
  // Rewrite HTML to fix relative links (add /espresso/:runNo prefix)
  if (contentType.includes('text/html')) {
    let html = await resp.text();
    // Rewrite absolute paths to include /espresso/:runNo prefix
    // e.g., href="/catagoly" -> href="/espresso/001/catagoly"
    // e.g., src="/js/app.js" -> src="/espresso/001/js/app.js"
    
    // Rewrite href, src, action attributes - preserve original quote type
    html = html.replace(/(href|src|action)=(["'])\/(?!espresso\/|https?:\/\/|\/\/)/gi, `$1=$2${prefix}/`);
    html = html.replace(/(href|src|action)=(["'])(?!\/|https?:\/\/|\/\/|#|javascript:)([^"']+)\2/gi, `$1=$2${prefix}/$3$2`);
    
    // Rewrite fetch/axios calls - preserve original quote type
    html = html.replace(/fetch\((["'])\/(?!espresso\/)/gi, `fetch($1${prefix}/`);
    
    // Rewrite string literals for API paths - preserve quote type
    html = html.replace(/(["'])\/api\//gi, `$1${prefix}/api/`);
    html = html.replace(/(["'])\/status\//gi, `$1${prefix}/status/`);
    html = html.replace(/(["'])\/socket\.io\//gi, `$1${prefix}/socket.io/`);
    
    return new Response(html, {
      status: resp.status,
      headers: resp.headers
    });
  }
  
  // Rewrite JavaScript files to fix API paths
  if (contentType.includes('javascript') || contentType.includes('application/js') || suffix.endsWith('.js')) {
    let js = await resp.text();
    
    // Rewrite fetch calls
    js = js.replace(/fetch\((["'])\/(?!espresso\/|https?:\/\/)/gi, `fetch($1${prefix}/`);
    
    // Rewrite API paths
    js = js.replace(/(["'])\/api\//gi, `$1${prefix}/api/`);
    js = js.replace(/(["'])\/status\//gi, `$1${prefix}/status/`);
    js = js.replace(/(["'])\/socket\.io\//gi, `$1${prefix}/socket.io/`);
    
    // Clone headers and set correct content-type
    const newHeaders = new Headers(resp.headers);
    newHeaders.set('Content-Type', 'application/javascript; charset=utf-8');
    
    return new Response(js, {
      status: resp.status,
      headers: newHeaders
    });
  }
  
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
