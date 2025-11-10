import { defineEventHandler, proxyRequest } from 'h3'

export default defineEventHandler(async (event) => {
  const rawPath = event.context.params?.path || []
  const joinedPath = Array.isArray(rawPath) ? rawPath.join('/') : rawPath

  const targetUrl = `https://kwangdataisyourspace.space/${joinedPath}`
  return proxyRequest(event, targetUrl)
})
