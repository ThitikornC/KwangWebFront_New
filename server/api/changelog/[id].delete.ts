import mongoose from 'mongoose'
import { connectToDatabase } from '~/server/utils/mongo'
import { ChangelogEntry, bucket, requireEditor } from '~/server/utils/changelog'

/* DELETE /api/changelog/:id — ลบรายการพร้อมไฟล์แนบทั้งหมด · ต้องใส่รหัส */
export default defineEventHandler(async (event) => {
  requireEditor(event)
  const id = getRouterParam(event, 'id') || ''
  if (!mongoose.isValidObjectId(id)) throw createError({ statusCode: 400, statusMessage: 'id ไม่ถูกต้อง' })
  await connectToDatabase()
  const old: any = await ChangelogEntry.findByIdAndDelete(id).lean()
  if (!old) throw createError({ statusCode: 404, statusMessage: 'ไม่พบรายการ' })
  const bk = await bucket()
  for (const a of old.attachments || []) await bk.delete(new mongoose.Types.ObjectId(a.fileId)).catch(() => {})
  return { ok: true }
})
