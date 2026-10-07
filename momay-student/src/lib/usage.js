/**
 * นับการเข้าใช้งานหน้าเว็บ + การกดปุ่ม → ส่งให้ gateway (POST /api/usage)
 *
 * นับสามอย่าง
 *   view   เปิดหน้า (นับทุกครั้งที่เข้ามา ไม่ใช่ครั้งเดียวต่อคน) พร้อมเวลาที่เข้า
 *   click  กดปุ่มอะไร — ชื่อปุ่มมาจาก data-track ของปุ่มนั้น
 *   leave  ออกจากหน้า/สลับแท็บ พร้อมจำนวนวินาทีที่อยู่บนหน้า
 *
 * ทำไมดักที่ตัวครอบหน้าแทนที่จะไปแก้ onClick ทุกปุ่ม: หน้า dashboard มีปุ่มเกือบร้อยปุ่ม
 * และเพิ่มใหม่เรื่อย ๆ ถ้าต้องเรียกฟังก์ชันนับในทุก onClick จะมีปุ่มที่ลืมใส่แน่นอน
 * วิธีนี้ปุ่มใหม่ถูกนับเองอัตโนมัติ แค่ใส่ data-track ให้มันเพื่อตั้งชื่อที่อ่านรู้เรื่อง
 *
 * ตัวตนของผู้ใช้ = id ที่เบราว์เซอร์สุ่มเอง (momay_vid ตัวเดียวกับที่หน้านักศึกษาใช้กัน
 * ให้ดาวซ้ำ) ฝั่ง gateway เก็บแค่ hash — ย้อนกลับไปหาคนไม่ได้
 *
 * ปิดทั้งระบบได้ด้วย VITE_USAGE_OFF=1 ตอน build
 */
const LAN_HOST  = typeof window !== 'undefined' ? window.location.hostname : 'localhost'
const P_GATEWAY = import.meta.env.VITE_GATEWAY_PORT || '8002'
const API = (import.meta.env.VITE_DEVICES_API || `http://${LAN_HOST}:${P_GATEWAY}`).replace(/\/$/, '')
const OFF = String(import.meta.env.VITE_USAGE_OFF || '') === '1'

const rnd = () => Math.random().toString(36).slice(2) + Date.now().toString(36)

// เครื่อง (อยู่ข้ามรอบการเปิด) — ใช้นับ "กี่คน"
const visitorId = () => {
  try {
    let v = localStorage.getItem('momay_vid')
    if (!v) { v = rnd(); localStorage.setItem('momay_vid', v) }
    return v
  } catch { return '' }   // ปิด storage ไว้ = นับเป็นครั้งได้ แต่นับคนไม่ได้
}
// รอบการเปิด (หายเมื่อปิดแท็บ) — ใช้นับ "กี่ครั้ง" และดูว่าคนหนึ่งคนไล่ดูอะไรต่อกันบ้าง
const sessionId = () => {
  try {
    let v = sessionStorage.getItem('momay_sid')
    if (!v) { v = rnd(); sessionStorage.setItem('momay_sid', v) }
    return v
  } catch { return '' }
}

// ── คิวส่ง ───────────────────────────────────────────────────────────
// ส่งทีละชุด ไม่ใช่ทีละคลิก — คนกดปุ่มรัว ๆ ไม่ควรกลายเป็น request รัว ๆ ตามไปด้วย
const FLUSH_MS = 5000
const MAX_QUEUE = 25
let queue = []
let timer = null

function send(useBeacon) {
  if (timer) { clearTimeout(timer); timer = null }
  if (!queue.length) return
  const body = JSON.stringify({ vid: visitorId(), sid: sessionId(), events: queue })
  queue = []
  try {
    // ตอนปิดแท็บ fetch ปกติถูกยกเลิกกลางคัน — beacon เท่านั้นที่ระบบส่งให้จนจบ
    // ใส่ text/plain เพื่อให้เป็น request แบบง่าย ไม่ต้องรอ preflight (มักไม่ทัน)
    if (useBeacon && navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'text/plain;charset=UTF-8' })
      if (navigator.sendBeacon(`${API}/api/usage`, blob)) return
    }
    fetch(`${API}/api/usage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => { /* นับพลาดหนึ่งครั้งไม่ใช่เรื่องที่ต้องรบกวนผู้ใช้ */ })
  } catch { /* เดียวกัน */ }
}

function push(ev) {
  if (OFF || typeof window === 'undefined') return
  queue.push({ ...ev, t: Date.now() })
  if (queue.length >= MAX_QUEUE) send()
  else if (!timer) timer = setTimeout(send, FLUSH_MS)
}

export const trackView  = (page, extra) => push({ page, kind: 'view', path: location.pathname, ...extra })
export const trackClick = (page, action, label, extra) => push({ page, kind: 'click', action, label, ...extra })
export const trackLeave = (page, sec) => push({ page, kind: 'leave', sec })
export const flushUsage = () => send(true)

// ── ชื่อของปุ่มที่ถูกกด ───────────────────────────────────────────────
const TEXT_MAX = 48
const textOf = el => (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, TEXT_MAX)

// ปุ่มในหน้านี้มีทั้ง <button> จริง และ <div onClick> ที่ทำหน้าที่เป็นปุ่ม
// ตัวหลังดูจาก cursor:pointer ซึ่งทุกอันตั้งไว้อยู่แล้ว (ไม่งั้นผู้ใช้จะไม่รู้ว่ากดได้)
//
// แต่ cursor ตกทอดลงไปถึงลูกทุกตัว — ไอคอน <svg> หรือ <span> ในปุ่มก็เป็น pointer ตามไปด้วย
// ถ้านับตัวไหนก็ได้ที่เป็น pointer ชื่อปุ่มจะกลายเป็น "(svg)" หรือข้อความชิ้นเดียวในปุ่ม
// จึงนับเฉพาะตัวที่ "เริ่ม" pointer เอง (แม่ยังไม่ pointer) = ตัวปุ่มจริง ไม่ใช่ไส้ใน
const cursorOf = el => { try { return getComputedStyle(el).cursor } catch { return '' } }
const isClickable = el => {
  const tag = el.tagName
  if (tag === 'BUTTON' || tag === 'A' || tag === 'SUMMARY') return true
  if (el.getAttribute?.('role') === 'button') return true
  if (cursorOf(el) !== 'pointer') return false
  return !el.parentElement || cursorOf(el.parentElement) !== 'pointer'
}

// "ปุ่มนี้อยู่ตรงไหนของหน้า" — เอามาเติมหน้าชื่อปุ่มเป็น `layer1/cam:ทางเข้าทิศเหนือ`
// เพราะชื่อปุ่มล้วน ๆ อ่านแล้วไม่รู้ว่ามาจากส่วนไหน (ปุ่ม ‹ › ✕ มีอยู่ทั่วหน้า)
// ใส่ที่ตัวครอบของแต่ละส่วน/ป๊อปอัปด้วย data-track-scope="ชื่อโหมด"
// เอาแค่สองชั้นที่ใกล้ปุ่มที่สุดพอ ลึกกว่านั้นชื่อยาวจนอ่านยาก
const scopeOf = (el, root) => {
  const out = []
  for (let n = el; n && out.length < 2; n = n.parentElement) {
    const s = n.dataset?.trackScope
    if (s) out.unshift(s)
    if (root && n === root) break
  }
  return out.join('/')
}

// เดินขึ้นจากจุดที่กด หา "ปุ่ม" ที่ใกล้ที่สุด — data-track ชนะเสมอเพราะเป็นชื่อที่ตั้งไว้เอง
// ถ้าไม่มี ใช้ aria-label / title / ข้อความบนปุ่ม ตามลำดับ ปุ่มที่เป็นไอคอนล้วนจะได้ชื่อ
// ที่อ่านไม่รู้เรื่อง — ปุ่มพวกนั้นควรใส่ data-track ไว้
export function actionOf(target, root) {
  let el = target instanceof Element ? target : null
  let fallback = null              // ปุ่มที่เจอแล้วแต่ยังไม่มีชื่อ — เผื่อชั้นบนมีชื่อให้ใช้
  for (let i = 0; el && i < 8; el = el.parentElement, i++) {
    if (root && el === root) break
    // ไอคอนเป็น <svg> ที่มี <path>/<g> ซ้อนอยู่ข้างใน — พวกนี้ไม่เคยเป็น "ปุ่ม"
    // ต้องข้ามเสมอ ไม่งั้นชื่อปุ่มกลายเป็น (svg)/(path) ตามชิ้นที่นิ้วไปโดน
    if (el.namespaceURI === 'http://www.w3.org/2000/svg') continue
    const named = el.dataset?.track
    if (!named && !isClickable(el)) continue
    const label = textOf(el)
    const name = named || el.getAttribute('aria-label') || el.getAttribute('title') || label
    if (!name) {                   // ปุ่มไอคอนล้วนที่ไม่ได้ตั้งชื่อไว้ — เก็บไว้ก่อน แล้วมองหาชั้นบนต่อ
      fallback = fallback || { action: `${sc(el, root)}(${el.tagName.toLowerCase()})`, label }
      continue
    }
    return { action: `${sc(el, root)}${name}`.slice(0, 60), label }
  }
  return fallback
}
const sc = (el, root) => { const s = scopeOf(el, root); return s ? `${s}/` : '' }
