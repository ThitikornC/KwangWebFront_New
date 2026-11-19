import { Readable } from 'node:stream'
import { CHANGELOG_MAX_BYTES, bucket, requireEditor } from '~/server/utils/changelog'

/* POST /api/changelog/upload — multipart ทีละไฟล์ (field "file") → GridFS · ต้องใส่รหัส · ไม่เกิน 50MB
   คืน { fileId, name, type, size } ให้หน้าเว็บแนบเข้ารายการตอนกดบันทึก */
export default defineEventHandler(async (event) => {
  requireEditor(event)
  const len = Number(getHeader(event, 'content-length') || 0)
  if (len > CHANGELOG_MAX_BYTES + 1024 * 1024) {
    throw createError({ statusCode: 413, statusMessage: 'ไฟล์ใหญ่เกิน 50MB' })
  }
  const parts = await readMultipartFormData(event)
  const f = parts?.find(p => p.name === 'file' && p.filename)
  if (!f) throw createError({ statusCode: 400, statusMessage: 'ไม่พบไฟล์' })
  if (f.data.length > CHANGELOG_MAX_BYTES) throw createError({ statusCode: 413, statusMessage: 'ไฟล์ใหญ่เกิน 50MB' })
  const name = String(f.filename).slice(0, 200)
  const type = f.type || 'application/octet-stream'
  const bk = await bucket()
  const up = bk.openUploadStream(name, { metadata: { type } })
  await new Promise<void>((resolve, reject) => {
    Readable.from(f.data).pipe(up).on('finish', () => resolve()).on('error', reject)
  })
  return { ok: true, fileId: String(up.id), name, type, size: f.data.length }
})
