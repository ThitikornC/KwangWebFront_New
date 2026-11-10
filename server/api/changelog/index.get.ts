import { connectToDatabase } from '~/server/utils/mongo'
import { ChangelogEntry, cleanRoom } from '~/server/utils/changelog'

/* GET /api/changelog?room=BUU — รายการทั้งหมดของห้อง ใหม่ไปเก่า · ดูได้ทุกคน ไม่ต้องใส่รหัส */
export default defineEventHandler(async (event) => {
  const room = cleanRoom(getQuery(event).room)
  if (!room) throw createError({ statusCode: 400, statusMessage: 'room required' })
  await connectToDatabase()
  const entries = await ChangelogEntry.find({ room }).sort({ date: -1, createdAt: -1 }).lean()
  return {
    ok: true,
    editable: !!process.env.CHANGELOG_PASSWORD,   // ยังไม่ตั้งรหัสบนเซิร์ฟเวอร์ = หน้าเว็บซ่อนปุ่มแก้ไข
    entries: entries.map((e: any) => ({
      id: String(e._id), room: e.room, date: e.date, title: e.title, body: e.body,
      author: e.author, attachments: e.attachments || [], updatedAt: e.updatedAt,
    })),
  }
})
