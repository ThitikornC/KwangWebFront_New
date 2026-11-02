import { H3Event } from 'h3';

export function getEffectiveRequestURL(event: any) {
  // Use Nitro/h3 helpers when available
  // Fallback to simple getRequestURL(event)
  let nativeUrl: any = null;
  try {
    nativeUrl = getRequestURL(event);
  } catch (e) {
    nativeUrl = null;
  }

  const headers = (event && (event.node?.req || event.req) && (event.node?.req.headers || event.req.headers)) || getHeaders(event);

  const forwardedProto = headers['x-forwarded-proto'] || headers['X-Forwarded-Proto'];
  const forwardedHost = headers['x-forwarded-host'] || headers['X-Forwarded-Host'];

  const protocol = forwardedProto ? String(forwardedProto).split(',')[0].trim() : (nativeUrl?.protocol || 'http:');
  let host = forwardedHost ? String(forwardedHost).split(',')[0].trim() : (nativeUrl?.host || headers.host || 'localhost');

  // Normalize protocol to include trailing ':' like URL.protocol
  const protoNormalized = protocol.endsWith(':') ? protocol : `${protocol}:`;

  return { protocol: protoNormalized, host };
}

export default getEffectiveRequestURL;
