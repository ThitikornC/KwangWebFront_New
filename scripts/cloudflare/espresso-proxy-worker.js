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

  // Match /espresso/:id (numeric runNo or slug) and optional trailing path
  const m = pathname.match(/^\/espresso\/([^\/]+)\/?(.*)$/);
  if (!m) {
    // If the path doesn't match /espresso/:id, fall back to serving the
    // site's SPA index so client-side routing can handle it (avoids 404
    // when user opens URL directly).
    try {
      const indexResp = await fetch(String(BACKEND_BASE).replace(/\/$/, '') + '/');
      return indexResp;
    } catch (err) {
      return new Response('Not Found', { status: 404 });
    }
  }

  const idRaw = m[1];
  const suffix = m[2] || '';
  const idLower = String(idRaw).toLowerCase();
  // If idRaw is numeric, normalize to padded runNo for legacy matching
  const isNumeric = /^\d+$/.test(idRaw);
  const runNo = isNumeric ? idRaw.padStart(3, '0') : null;

  // Debug mode (query param ?debug=1 or header X-Debug: 1)
  const isDebug = url.searchParams.get('debug') === '1' || request.headers.get('X-Debug') === '1';

   // Cache lead mapping per runNo
  const cacheKey = `espresso-lead-${runNo}`;
  let lead = null;
  let data = null;
  let lookupUrl = null;

  try {
    const cache = caches.default;
    // Use a synthetic URL for cache keys to avoid Invalid URL errors
    const cacheReqUrl = `${BACKEND_API || BACKEND_BASE}/__cache__/${cacheKey}`;
    const cacheReq = new Request(cacheReqUrl);
    const cached = await cache.match(cacheReq);
    if (cached) {
      try {
        lead = await cached.json();
      } catch (err) {
        console.warn('Failed to parse cached lead JSON', err);
        lead = null;
      }
    }

    if (!lead) {
      // Fetch list of leads and find the one with matching runNumber
      const backendLookup = (typeof BACKEND_API !== 'undefined' && BACKEND_API) ? BACKEND_API : null;
      if (!backendLookup) {
        if (isDebug) {
          return new Response(JSON.stringify({ error: 'BACKEND_API not configured in Worker runtime', runNo }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }
        return new Response('Server misconfiguration', { status: 500 });
      }

      lookupUrl = `${backendLookup.replace(/\/$/, '')}/api/espresso`;
      const res = await fetch(lookupUrl, { method: 'GET' });
      const dataText = await res.text();
      try { data = JSON.parse(dataText); } catch(e) { data = null; }
      if (!res.ok) {
        if (isDebug) {
          return new Response(JSON.stringify({ error: 'Backend lookup failed', status: res.status, body: dataText, lookupUrl }), { status: 502, headers: { 'Content-Type': 'application/json' } });
        }
        return new Response('Backend lookup failed', { status: 502 });
      }

      const list = data && data.list ? data.list : [];
      lead = list.find((l) => {
        // match by numeric runNumber (padded or raw)
        if (isNumeric) {
          if (String(l.runNumber).padStart(3,'0') === runNo) return true;
          if (String(l.runNumber) === idRaw) return true;
        }
        // match by common slug/name fields (case-insensitive)
        const slug = (l.slug || '').toString().toLowerCase();
        const dbSlug = (l.dbSlug || '').toString().toLowerCase();
        const name = (l.name || '').toString().toLowerCase();
        const deployed = (l.deployedUrl || '').toString().toLowerCase();
        return slug === idLower || dbSlug === idLower || name === idLower || deployed.endsWith('/' + idLower);
      }) || null;
      if (lead) {
        // store in cache using same request key
        const body = new Response(JSON.stringify(lead), { status: 200, headers: { 'Content-Type': 'application/json' } });
        await cache.put(cacheReq, body.clone());
      }
    }
  } catch (e) {
    console.error('Worker lookup error', e);
    if (isDebug) {
      return new Response(JSON.stringify({ error: 'Worker lookup exception', message: (e && e.message) || String(e), stack: (e && e.stack) || null, lookupUrl, runNo }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response('Internal Worker error', { status: 500 });
  }

    if (!lead) {
      if (isDebug) {
        return new Response(JSON.stringify({ error: 'Lead not found', idRaw, runNo, lookupUrl, listLength: Array.isArray(data && data.list) ? data.list.length : undefined, sample: (data && data.list && data.list.slice && data.list.slice(0,5)) || null }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      }

      // Fallback: return the SPA index HTML so the app can handle the route
      // client-side (this restores previous behavior where opening the
      // URL directly shows the app instead of a 404).
      try {
        const indexResp = await fetch(String(BACKEND_BASE).replace(/\/$/, '') + '/');
        return indexResp;
      } catch (err) {
        return new Response('Lead not found', { status: 404 });
      }
    }

  // Prefer the real deployed URL (Railway). Fallback to lead.url if deployedUrl missing.
  let preferred = lead.deployedUrl && lead.deployedUrl.length > 0 ? lead.deployedUrl : lead.url;

  // Small override map for known slugs to ensure reliable redirects when
  // backend data or DNS is stale. Add entries here as needed.
  const OVERRIDES = {
    'huaroa': 'https://espressohuaroa-production.up.railway.app/'
  };
  if (OVERRIDES[idLower]) {
    preferred = OVERRIDES[idLower];
  }
  if (!preferred) return new Response('Lead has no target URL', { status: 404 });

  const targetBase = String(preferred).replace(/\/$/, '');
  const targetUrl = suffix ? `${targetBase}/${suffix}` : targetBase;

  // Redirect to the deployed app URL so clients open the external app directly.
  // This avoids proxying errors (530/1016) when Cloudflare cannot reach the origin.
  try {
    return Response.redirect(targetUrl, 302);
  } catch (e) {
    // Fallback: attempt to proxy if redirect fails
    const headers = new Headers(request.headers);
    headers.delete('host');
    const proxyReq = new Request(targetUrl, {
      method: request.method,
      headers,
      body: request.body,
      redirect: 'follow'
    });
    const resp = await fetch(proxyReq);
    return resp;
  }
}
