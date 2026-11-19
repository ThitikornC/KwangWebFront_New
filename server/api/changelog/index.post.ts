import mongoose from 'mongoose'
import { connectToDatabase } from '~/server/utils/mongo'
import { ChangelogEntry, bucket, cleanRoom, requireEditor } from '~/server/utils/changelog'

/* POST /api/changelog — เพิ่ม (ไม่มี id) หรือแก้ (มี id) หนึ่งรายการ · ต้องใส่รหัส (header x-changelog-key)
   body: { id?, room, date, title, body, author, attachments: [{ fileId, name, type, size }] }
   ไฟล์แนบอัปโหลดก่อนผ่าน /api/changelog/upload แล้วส่ง fileId มาที่นี่ · ไฟล์ที่ถูกเอาออกตอนแก้ = ลบจริงด้วย */
export default defineEventHandler(async (event) => {
  requireEditor(event)
  const b = await readBody(event)
  const room = cleanRoom(b?.room)
  const title = String(b?.title ?? '').trim().slice(0, 200)
  const body = String(b?.body ?? '').slice(0, 20000)
  const author = String(b?.author ?? '').trim().slice(0, 80)
  const date = new Date(b?.date || Date.now())
  if (!room) throw createError({ statusCode: 400, statusMessage: 'room required' })
  if (!title && !body.trim()) throw createError({ statusCode: 400, statusMessage: 'กรุณาใส่หัวข้อหรือรายละเอียด' })
  if (Number.isNaN(date.getTime())) throw createError({ statusCode: 400, statusMessage: 'วันที่ไม่ถูกต้อง' })
  const attachments = (Array.isArray(b?.attachments) ? b.attachments : [])
    .filter((a: any) => a && mongoose.isValidObjectId(a.fileId))
    .slice(0, 30)
    .map((a: any) => ({ fileId: String(a.fileId), name: String(a.name ?? '').slice(0, 200), type: String(a.type ?? ''), size: Number(a.size) || 0 }))

  await connectToDatabase()
  const doc = { room, date, title, body, author, attachments }
  if (b?.id) {
    if (!mongoose.isValidObjectId(b.id)) throw createError({ statusCode: 400, statusMessage: 'id ไม่ถูกต้อง' })
    const old: any = await ChangelogEntry.findById(b.id).lean()
    if (!old) throw createError({ statusCode: 404, statusMessage: 'ไม่พบรายการ' })
    await ChangelogEntry.updateOne({ _id: b.id }, doc)
    const keep = new Set(attachments.map((a: any) => a.fileId))
    const gone = (old.attachments || []).filter((a: any) => !keep.has(a.fileId))
    if (gone.length) {
      const bk = await bucket()
      for (const a of gone) await bk.delete(new mongoose.Types.ObjectId(a.fileId)).catch(() => {})
    }
    return { ok: true, id: String(b.id) }
  }
  const created: any = await ChangelogEntry.create(doc)
  return { ok: true, id: String(created._id) }
})
