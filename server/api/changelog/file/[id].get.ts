import mongoose from 'mongoose'
import { bucket } from '~/server/utils/changelog'

/* GET /api/changelog/file/:id — ส่งไฟล์แนบ (ดูได้ทุกคน) · รองรับ Range ให้วิดีโอเลื่อนดูได้ (Safari/iPhone ต้องมี)
   ?dl=1 = บังคับดาวน์โหลด (ปุ่มดาวน์โหลดไฟล์) */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || ''
  if (!mongoose.isValidObjectId(id)) throw createError({ statusCode: 400, statusMessage: 'id ไม่ถูกต้อง' })
  const bk = await bucket()
  const oid = new mongoose.Types.ObjectId(id)
  const [file]: any[] = await bk.find({ _id: oid }).limit(1).toArray()
  if (!file) throw createError({ statusCode: 404, statusMessage: 'ไม่พบไฟล์' })
  const size = Number(file.length) || 0
  const type = file.metadata?.type || 'application/octet-stream'
  const dl = getQuery(event).dl != null
  setResponseHeaders(event, {
    'Content-Type': type,
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Content-Disposition': `${dl ? 'attachment' : 'inline'}; filename*=UTF-8''${encodeURIComponent(file.filename || 'file')}`,
  })
  const range = String(getHeader(event, 'range') || '')
  const m = /^bytes=(\d*)-(\d*)$/.exec(range)
  if (m && size > 0) {
    let start = m[1] === '' ? Math.max(0, size - Number(m[2])) : Number(m[1])
    let end = m[1] !== '' && m[2] !== '' ? Number(m[2]) : size - 1
    end = Math.min(end, size - 1)
    if (start > end || start >= size) {
      setResponseStatus(event, 416)
      setResponseHeader(event, 'Content-Range', `bytes */${size}`)
      return ''
    }
    setResponseStatus(event, 206)
    setResponseHeaders(event, { 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': String(end - start + 1) })
    return sendStream(event, bk.openDownloadStream(oid, { start, end: end + 1 }))
  }
  setResponseHeader(event, 'Content-Length', String(size))
  return sendStream(event, bk.openDownloadStream(oid))
})
