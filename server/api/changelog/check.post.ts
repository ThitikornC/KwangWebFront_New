import { requireEditor } from '~/server/utils/changelog'

/* POST /api/changelog/check — ตรวจรหัสตอนกด "แก้ไข" (header x-changelog-key) · ถูก = { ok: true } · ผิด = 401 */
export default defineEventHandler((event) => {
  requireEditor(event)
  return { ok: true }
})
