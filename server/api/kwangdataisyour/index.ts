import { defineEventHandler, proxyRequest } from 'h3'

export default defineEventHandler((event) => {
  event.node.res.setHeader('Content-Type', 'text/html; charset=UTF-8')
  const targetUrl = 'https://kwangdataisyourspace.space/'
  return proxyRequest(event, targetUrl)
})
