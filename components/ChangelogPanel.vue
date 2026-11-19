<template>
  <!-- ปุ่มเปิดประวัติการปรับปรุง (ผู้ใช้สั่ง 2026-11-10) — วางที่หัวห้อง · ทุกคนกดดูได้ -->
  <button type="button" class="cl-trigger font-thai" @click="openPanel">
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4M12 7v5l3 2" /></svg>
    ประวัติการปรับปรุง
    <span v-if="count" class="cl-trigger__n">{{ count }}</span>
  </button>

  <Teleport to="body">
    <div v-if="open" class="cl-overlay" @click.self="close">
      <div class="cl-modal font-thai" role="dialog" aria-modal="true" :aria-label="`ประวัติการปรับปรุง ${room}`">
        <button type="button" class="cl-x" aria-label="ปิด" @click="close">&times;</button>

        <div class="cl-head">
          <div>
            <div class="cl-kicker">CHANGELOG · {{ room }}</div>
            <h2 class="cl-title">ประวัติการปรับปรุง</h2>
          </div>
          <!-- โหมดดูอย่างเดียวเป็นค่าตั้งต้น · ปุ่มแก้ไขเล็ก ๆ มีรูปกุญแจ = รู้ว่าต้องใช้รหัส -->
          <div class="cl-head__act">
            <template v-if="editing">
              <span class="cl-badge">โหมดแก้ไข</span>
              <button type="button" class="cl-btn cl-btn--red" @click="startNew">+ เพิ่มรายการ</button>
              <button type="button" class="cl-btn cl-btn--ghost" @click="lock">ออกจากโหมดแก้ไข</button>
            </template>
            <button v-else-if="editable" type="button" class="cl-btn cl-btn--ghost" @click="askKey = !askKey">
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2" /></svg>
              แก้ไข
            </button>
          </div>
        </div>

        <form v-if="askKey && !editing" class="cl-key" @submit.prevent="unlock">
          <input v-model="keyInput" type="password" autocomplete="current-password" placeholder="รหัสผู้แก้ไข" class="cl-input" />
          <button type="submit" class="cl-btn cl-btn--red" :disabled="busy">ยืนยัน</button>
          <span v-if="keyErr" class="cl-err">{{ keyErr }}</span>
        </form>

        <!-- ฟอร์มเพิ่ม/แก้รายการ -->
        <form v-if="form" class="cl-form" @submit.prevent="save">
          <div class="cl-form__row">
            <label class="cl-field"><span>วันเวลา</span><input v-model="form.date" type="datetime-local" class="cl-input" required /></label>
            <label class="cl-field"><span>ผู้บันทึก</span><input v-model="form.author" class="cl-input" placeholder="เช่น ไอซ์" /></label>
          </div>
          <label class="cl-field"><span>หัวข้อ</span><input v-model="form.title" class="cl-input" placeholder="เช่น รายงานการปรับเปลี่ยน" /></label>
          <label class="cl-field"><span>รายละเอียด</span>
            <textarea v-model="form.body" rows="10" class="cl-input cl-textarea" placeholder="1. ...&#10;2. ..." />
          </label>
          <div class="cl-field">
            <span>ไฟล์แนบ (รูป · วิดีโอ · ไฟล์ — ไม่เกิน 50MB ต่อไฟล์)</span>
            <label class="cl-drop">
              <input type="file" multiple hidden @change="pickFiles" />
              + เลือกไฟล์
            </label>
            <ul class="cl-up">
              <li v-for="(a, i) in form.attachments" :key="a.fileId">
                <span class="cl-up__name">{{ a.name }}</span><span class="cl-up__size">{{ fmtSize(a.size) }}</span>
                <button type="button" class="cl-up__x" aria-label="เอาออก" @click="form.attachments.splice(i, 1)">&times;</button>
              </li>
              <li v-for="u in uploads" :key="u.key" :class="{ 'cl-up--err': u.err }">
                <span class="cl-up__name">{{ u.name }}</span>
                <span class="cl-up__size">{{ u.err || `${u.pct}%` }}</span>
              </li>
            </ul>
          </div>
          <div class="cl-form__foot">
            <span v-if="formErr" class="cl-err">{{ formErr }}</span>
            <button type="button" class="cl-btn cl-btn--ghost" @click="form = null">ยกเลิก</button>
            <button type="submit" class="cl-btn cl-btn--red" :disabled="busy || uploads.some(u => !u.err)">บันทึก</button>
          </div>
        </form>

        <div v-if="loading" class="cl-dim">กำลังโหลด…</div>
        <div v-else-if="loadErr" class="cl-err">{{ loadErr }}</div>
        <div v-else-if="!entries.length" class="cl-dim">ยังไม่มีบันทึก</div>

        <!-- ไทม์ไลน์ ใหม่ไปเก่า -->
        <ol class="cl-list">
          <li v-for="e in entries" :key="e.id" class="cl-item">
            <div class="cl-item__date">{{ fmtDate(e.date) }}</div>
            <div class="cl-card">
              <div class="cl-card__top">
                <h3 v-if="e.title" class="cl-card__title">{{ e.title }}</h3>
                <div v-if="editing" class="cl-card__act">
                  <button type="button" class="cl-link" @click="startEdit(e)">แก้ไข</button>
                  <button type="button" class="cl-link cl-link--red" @click="remove(e)">ลบ</button>
                </div>
              </div>
              <p v-if="e.body" class="cl-card__body">{{ e.body }}</p>
              <div v-if="imgs(e).length" class="cl-imgs">
                <a v-for="a in imgs(e)" :key="a.fileId" :href="fileUrl(a)" target="_blank" rel="noopener">
                  <img :src="fileUrl(a)" :alt="a.name" loading="lazy" />
                </a>
              </div>
              <video v-for="a in vids(e)" :key="a.fileId" class="cl-video" :src="fileUrl(a)" controls preload="metadata" playsinline />
              <div v-if="docs(e).length" class="cl-docs">
                <a v-for="a in docs(e)" :key="a.fileId" class="cl-doc" :href="`${fileUrl(a)}?dl=1`">
                  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
                  {{ a.name }} <span>{{ fmtSize(a.size) }}</span>
                </a>
              </div>
              <div v-if="e.author" class="cl-card__author">— {{ e.author }}</div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
/* ประวัติการปรับปรุงของแอปในห้องนั้น (ผู้ใช้สั่ง 2026-11-10)
   ดูได้ทุกคน · กด "แก้ไข" แล้วใส่รหัส (เช็กที่เซิร์ฟเวอร์ — ตัวแปร CHANGELOG_PASSWORD บน Railway)
   รหัสที่ผ่านแล้วจำไว้ในแท็บนี้ (sessionStorage) ปิดแท็บ = ต้องใส่ใหม่ */
import { ref, onMounted } from 'vue'

const props = defineProps<{ room: string }>()
const room = props.room
const KEY_STORE = 'kw-changelog-key'
const MAX = 50 * 1024 * 1024

type Att = { fileId: string; name: string; type: string; size: number }
type Entry = { id: string; date: string; title: string; body: string; author: string; attachments: Att[] }

const open = ref(false)
const entries = ref<Entry[]>([])
const count = ref(0)
const editable = ref(false)
const loading = ref(false)
const loadErr = ref('')
const editing = ref(false)
const askKey = ref(false)
const keyInput = ref('')
const keyErr = ref('')
const busy = ref(false)
const form = ref<null | { id?: string; date: string; title: string; body: string; author: string; attachments: Att[] }>(null)
const formErr = ref('')
const uploads = ref<{ key: number; name: string; pct: number; err: string }[]>([])

const key = () => { try { return sessionStorage.getItem(KEY_STORE) || '' } catch { return '' } }
const fileUrl = (a: Att) => `/api/changelog/file/${a.fileId}`
const imgs = (e: Entry) => e.attachments.filter(a => a.type.startsWith('image/'))
const vids = (e: Entry) => e.attachments.filter(a => a.type.startsWith('video/'))
const docs = (e: Entry) => e.attachments.filter(a => !a.type.startsWith('image/') && !a.type.startsWith('video/'))
const fmtSize = (n: number) => (n >= 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`)
const pad = (n: number) => String(n).padStart(2, '0')
const fmtDate = (d: string) => { const t = new Date(d); return `${pad(t.getDate())}/${pad(t.getMonth() + 1)}/${t.getFullYear()} · ${pad(t.getHours())}.${pad(t.getMinutes())} น.` }
const toLocalInput = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
const errMsg = (e: any) => e?.data?.statusMessage || e?.statusMessage || e?.message || 'เกิดข้อผิดพลาด'

async function load() {
  loading.value = true; loadErr.value = ''
  try {
    const r: any = await $fetch('/api/changelog', { query: { room } })
    entries.value = r.entries || []; count.value = entries.value.length; editable.value = !!r.editable
  } catch (e) { loadErr.value = `โหลดไม่ได้: ${errMsg(e)}` }
  loading.value = false
}
onMounted(load)   // โหลดตั้งแต่ต้นเพื่อโชว์จำนวนรายการบนปุ่ม

function openPanel() {
  open.value = true; load()
  if (key()) editing.value = true
}
function close() { open.value = false; form.value = null; askKey.value = false }

async function unlock() {
  keyErr.value = ''; busy.value = true
  try {
    await $fetch('/api/changelog/check', { method: 'POST', headers: { 'x-changelog-key': keyInput.value } })
    try { sessionStorage.setItem(KEY_STORE, keyInput.value) } catch { /* แท็บส่วนตัว — ใช้ได้เฉพาะรอบนี้ */ }
    editing.value = true; askKey.value = false; keyInput.value = ''
  } catch (e) { keyErr.value = errMsg(e) }
  busy.value = false
}
function lock() { try { sessionStorage.removeItem(KEY_STORE) } catch { /* ignore */ } editing.value = false; form.value = null }

function startNew() { formErr.value = ''; uploads.value = []; form.value = { date: toLocalInput(new Date()), title: '', body: '', author: '', attachments: [] } }
function startEdit(e: Entry) {
  formErr.value = ''; uploads.value = []
  form.value = { id: e.id, date: toLocalInput(new Date(e.date)), title: e.title, body: e.body, author: e.author, attachments: [...e.attachments] }
  if (typeof window !== 'undefined') document.querySelector('.cl-modal')?.scrollTo({ top: 0, behavior: 'smooth' })
}

let seq = 0
function pickFiles(ev: Event) {
  const input = ev.target as HTMLInputElement
  for (const f of Array.from(input.files || [])) {
    const u = { key: ++seq, name: f.name, pct: 0, err: '' }
    uploads.value.push(u)
    if (f.size > MAX) { u.err = 'ใหญ่เกิน 50MB'; continue }
    // XHR แทน fetch — ต้องการแถบความคืบหน้าตอนอัปวิดีโอ
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/changelog/upload')
    xhr.setRequestHeader('x-changelog-key', key())
    xhr.upload.onprogress = p => { if (p.lengthComputable) { u.pct = Math.round((p.loaded / p.total) * 100); uploads.value = [...uploads.value] } }
    xhr.onload = () => {
      let r: any = null
      try { r = JSON.parse(xhr.responseText) } catch { /* ignore */ }
      if (xhr.status === 200 && r?.fileId) {
        form.value?.attachments.push({ fileId: r.fileId, name: r.name, type: r.type, size: r.size })
        uploads.value = uploads.value.filter(x => x.key !== u.key)
      } else { u.err = r?.statusMessage || `อัปโหลดไม่ได้ (${xhr.status})`; uploads.value = [...uploads.value] }
    }
    xhr.onerror = () => { u.err = 'อัปโหลดไม่ได้'; uploads.value = [...uploads.value] }
    const fd = new FormData(); fd.append('file', f)
    xhr.send(fd)
  }
  input.value = ''
}

async function save() {
  if (!form.value) return
  formErr.value = ''; busy.value = true
  try {
    await $fetch('/api/changelog', {
      method: 'POST', headers: { 'x-changelog-key': key() },
      body: { ...form.value, room, date: new Date(form.value.date).toISOString() },
    })
    form.value = null; uploads.value = []
    await load()
  } catch (e: any) {
    formErr.value = errMsg(e)
    if (e?.statusCode === 401 || e?.response?.status === 401) lock()
  }
  busy.value = false
}

async function remove(e: Entry) {
  if (!confirm(`ลบรายการ "${e.title || fmtDate(e.date)}" พร้อมไฟล์แนบ?`)) return
  try {
    await $fetch(`/api/changelog/${e.id}`, { method: 'DELETE', headers: { 'x-changelog-key': key() } })
    await load()
  } catch (err) { alert(errMsg(err)) }
}
</script>

<style scoped>
.cl-trigger {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 7px 14px; border-radius: 999px; cursor: pointer;
  border: 1px solid rgba(160, 28, 36, 0.45); background: #fff; color: #a01c24;
  font-size: 13.5px; font-weight: 700; letter-spacing: 0.02em;
  box-shadow: 0 2px 8px rgba(160, 28, 36, 0.1); transition: background .15s, color .15s;
}
.cl-trigger:hover { background: #a01c24; color: #fff; }
.cl-trigger__n { min-width: 20px; height: 20px; padding: 0 6px; border-radius: 999px; background: #a01c24; color: #fff; font-size: 11.5px; display: grid; place-items: center; }
.cl-trigger:hover .cl-trigger__n { background: #fff; color: #a01c24; }

.cl-overlay { position: fixed; inset: 0; z-index: 95; display: grid; place-items: center; padding: 16px; background: rgba(24, 20, 16, 0.55); backdrop-filter: blur(3px); }
.cl-modal {
  position: relative; width: min(860px, 100%); max-height: 90vh; overflow-y: auto;
  padding: 26px clamp(14px, 3vw, 32px) 30px; background: #faf6ef; color: #1d1b19;
  border: 1px solid rgba(29, 27, 25, 0.14); box-shadow: 0 30px 70px rgba(24, 20, 16, 0.34);
}
.cl-x { position: absolute; top: 8px; right: 14px; font-size: 30px; line-height: 1; color: #7a7267; background: none; border: 0; cursor: pointer; }
.cl-x:hover { color: #a01c24; }
.cl-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding-right: 28px; border-bottom: 2px solid #a01c24; padding-bottom: 12px; }
.cl-kicker { font-size: 11px; letter-spacing: 0.28em; color: #7a7267; font-weight: 600; }
.cl-title { margin: 2px 0 0; font-size: 24px; font-weight: 800; }
.cl-head__act { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.cl-badge { font-size: 12px; font-weight: 700; color: #a01c24; background: rgba(160, 28, 36, 0.1); padding: 4px 10px; border-radius: 4px; }

.cl-btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 6px; font-size: 13.5px; font-weight: 700; cursor: pointer; border: 1px solid transparent; }
.cl-btn:disabled { opacity: 0.5; cursor: default; }
.cl-btn--red { background: #a01c24; color: #fff; }
.cl-btn--red:hover:not(:disabled) { background: #c22a30; }
.cl-btn--ghost { background: transparent; color: #4a443d; border-color: rgba(29, 27, 25, 0.22); }
.cl-btn--ghost:hover { border-color: #a01c24; color: #a01c24; }

.cl-key { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-top: 14px; }
.cl-input { box-sizing: border-box; width: 100%; padding: 8px 11px; border: 1px solid rgba(29, 27, 25, 0.22); border-radius: 6px; background: #fff; font: inherit; font-size: 14px; color: inherit; }
.cl-key .cl-input { width: 220px; }
.cl-input:focus { outline: 2px solid rgba(160, 28, 36, 0.35); border-color: #a01c24; }
.cl-textarea { resize: vertical; line-height: 1.6; }
.cl-err { color: #c22a30; font-size: 13px; }
.cl-dim { color: #7a7267; padding: 24px 0; text-align: center; }

.cl-form { margin-top: 16px; padding: 16px; background: #fff; border: 1px solid rgba(160, 28, 36, 0.3); border-radius: 8px; display: grid; gap: 12px; }
.cl-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
@media (max-width: 560px) { .cl-form__row { grid-template-columns: 1fr; } }
.cl-field { display: grid; gap: 5px; font-size: 13px; font-weight: 700; color: #4a443d; }
.cl-drop { display: inline-flex; width: fit-content; padding: 8px 14px; border: 1.5px dashed rgba(160, 28, 36, 0.5); border-radius: 6px; color: #a01c24; cursor: pointer; font-weight: 700; }
.cl-drop:hover { background: rgba(160, 28, 36, 0.06); }
.cl-up { list-style: none; margin: 4px 0 0; padding: 0; display: grid; gap: 4px; font-weight: 400; }
.cl-up li { display: flex; align-items: center; gap: 8px; font-size: 13px; padding: 5px 8px; background: #faf6ef; border-radius: 4px; }
.cl-up__name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cl-up__size { color: #7a7267; font-size: 12px; }
.cl-up__x { border: 0; background: none; font-size: 18px; color: #7a7267; cursor: pointer; }
.cl-up--err .cl-up__size { color: #c22a30; }
.cl-form__foot { display: flex; justify-content: flex-end; align-items: center; gap: 8px; flex-wrap: wrap; }

.cl-list { list-style: none; margin: 18px 0 0; padding: 0 0 0 18px; border-left: 2px solid rgba(160, 28, 36, 0.25); display: grid; gap: 22px; }
.cl-item { position: relative; }
.cl-item::before { content: ''; position: absolute; left: -25px; top: 4px; width: 12px; height: 12px; border-radius: 50%; background: #a01c24; box-shadow: 0 0 0 3px #faf6ef; }
.cl-item__date { font-size: 13px; font-weight: 700; color: #a01c24; margin-bottom: 6px; }
.cl-card { background: #fff; border: 1px solid rgba(29, 27, 25, 0.12); border-radius: 8px; padding: 14px 16px; }
.cl-card__top { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
.cl-card__title { margin: 0 0 6px; font-size: 16.5px; font-weight: 800; }
.cl-card__act { display: flex; gap: 12px; flex-shrink: 0; }
.cl-link { background: none; border: 0; padding: 0; font-size: 13px; font-weight: 700; color: #4a443d; cursor: pointer; text-decoration: underline; }
.cl-link--red { color: #c22a30; }
.cl-card__body { margin: 0; white-space: pre-line; line-height: 1.75; font-size: 14.5px; color: #2b2723; }
.cl-imgs { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 8px; margin-top: 12px; }
.cl-imgs img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 6px; border: 1px solid rgba(29, 27, 25, 0.12); display: block; }
.cl-video { display: block; width: 100%; max-height: 420px; margin-top: 12px; border-radius: 6px; background: #000; }
.cl-docs { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.cl-doc { display: inline-flex; align-items: center; gap: 6px; padding: 6px 11px; border-radius: 6px; border: 1px solid rgba(29, 27, 25, 0.18); color: #1d1b19; text-decoration: none; font-size: 13px; }
.cl-doc span { color: #7a7267; font-size: 12px; }
.cl-doc:hover { border-color: #a01c24; color: #a01c24; }
.cl-card__author { margin-top: 10px; text-align: right; font-size: 13.5px; color: #4a443d; font-weight: 700; }
</style>
