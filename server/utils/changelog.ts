/* ประวัติการเปลี่ยนแปลงของแอป (ผู้ใช้สั่ง 2026-11-10) — ดูได้ทุกคน · เพิ่ม/แก้/ลบต้องใส่รหัส
   ข้อความเก็บใน MongoDB (collection changelog_entries) · ไฟล์แนบ (รูป/วิดีโอ/ไฟล์) เก็บใน GridFS bucket "changelog"
   รหัสอยู่ที่ตัวแปร CHANGELOG_PASSWORD บน Railway เท่านั้น — ไม่มีในโค้ดหน้าเว็บ · ยังไม่ตั้ง = แก้ไม่ได้ (ดูได้อย่างเดียว) */
import mongoose from 'mongoose'
import { timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'
import { connectToDatabase } from './mongo'

export const CHANGELOG_MAX_BYTES = 50 * 1024 * 1024   // 50MB ต่อไฟล์ (ผู้ใช้เลือก)

const attachmentSchema = new mongoose.Schema({
  fileId: { type: String, required: true },
  name: { type: String, default: '' },
  type: { type: String, default: 'application/octet-stream' },
  size: { type: Number, default: 0 },
}, { _id: false })

const entrySchema = new mongoose.Schema({
  room: { type: String, required: true, index: true },        // เช่น 'BUU'
  date: { type: Date, required: true },                       // วันเวลาที่ปรับ (ที่แสดงบนรายการ)
  title: { type: String, default: '' },
  body: { type: String, default: '' },                        // ข้อความรายงาน ขึ้นบรรทัดใหม่ได้
  author: { type: String, default: '' },
  attachments: { type: [attachmentSchema], default: [] },
}, { timestamps: true, collection: 'changelog_entries' })

export const ChangelogEntry =
  mongoose.models.ChangelogEntry || mongoose.model('ChangelogEntry', entrySchema)

export async function bucket() {
  await connectToDatabase()
  return new mongoose.mongo.GridFSBucket(mongoose.connection.db!, { bucketName: 'changelog' })
}

/* ตรวจรหัสจาก header x-changelog-key — เทียบแบบเวลาคงที่ ไม่ให้เดารหัสจากเวลาตอบ */
export function requireEditor(event: H3Event) {
  const want = process.env.CHANGELOG_PASSWORD || ''
  if (!want) throw createError({ statusCode: 503, statusMessage: 'ยังไม่ได้ตั้งรหัสผู้แก้ไข (CHANGELOG_PASSWORD)' })
  const got = String(getHeader(event, 'x-changelog-key') || '')
  const a = Buffer.from(got), b = Buffer.from(want)
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    throw createError({ statusCode: 401, statusMessage: 'รหัสไม่ถูกต้อง' })
  }
}

export const cleanRoom = (v: unknown) => String(v ?? '').trim().slice(0, 40)
