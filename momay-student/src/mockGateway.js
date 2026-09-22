/**
 * Gateway จำลองสำหรับหน้า Student ที่ยกมาจากโปรเจกต์ BUU
 *
 * หน้า BuuStudent8bitV2.jsx ถูกคัดลอกมาทั้งไฟล์โดยไม่แก้แม้แต่บรรทัดเดียว เพื่อให้
 * "ผิว" ของมันเหมือนต้นฉบับเป๊ะ และตามไปแก้ต้นทางทีหลังได้ง่าย ไฟล์นี้จึงดักที่
 * window.fetch แทนการไปแก้โค้ดหน้า — หน้าเรียก /api/... เหมือนเดิมทุกอย่าง
 *
 * ตัวเลขไม่ได้สุ่มลอย ๆ แต่แปรผันจากคำตอบที่ผู้ใช้กรอกไว้ในหน้า /MomaySurpriseOrganize
 * (ส่งต่อมาทาง query string) โดยคำนวณด้วยโมเดลตัวเดียวกับหน้านั้น ตัวเลขสองหน้า
 * จึงเล่าเรื่องเดียวกัน
 */
import { ORG_MAP, PEAK_MAP, computeBaseline } from '../../utils/momaySurpriseOrganize/model.ts'

const SLOTS = 48
const HISTORY_DAYS = 7

/** กุญแจที่หน้า /SurpriseV220926 เขียนผังห้องสมุดไว้ — ต้องตรงกันทั้งสองฝั่ง */
const SETUP_KEY = 'momay:library-setup'

/* ── ผังห้องสมุด — ชุดเดียวกับที่หน้าขาย MomayforSaleV2 ใช้เล่าเรื่องแอป STUDENT ── */
const KIND_TO_ZONE = {
  'SOCIAL / LEARN': 'social',
  FOCUS: 'focus',
  COLLABORATE: 'collaboration',
  READ: 'research',
  'CREATE / PRESENT': 'digital',
  'CREATE WITH TECHNOLOGY': 'digital',
}

const FLOORS = [
  {
    floor: '1',
    zones: [
      { name: '24-Hr Learning Commons', kind: 'SOCIAL / LEARN', hours: '24', used: 37, total: 131, zoneType: 'h24' },
      { name: 'ห้อง 101', kind: 'FOCUS', hours: '24', used: 0, total: 20, bookable: true },
      { name: 'ห้อง 102', kind: 'COLLABORATE', hours: '24', used: 0, total: 40, bookable: true },
    ],
  },
  {
    floor: '2',
    zones: [
      { name: 'Reading Zone', kind: 'READ', hours: '08:00-20:00', used: 24, total: 60 },
      { name: 'Co-Working', kind: 'COLLABORATE', hours: '08:00-20:00', used: 18, total: 50 },
      { name: 'ห้อง 201', kind: 'FOCUS', hours: '08:00-20:00', used: 0, total: 40, bookable: true },
      { name: 'ห้อง 202', kind: 'CREATE / PRESENT', hours: '08:00-20:00', used: 6, total: 30, bookable: true },
    ],
  },
  {
    floor: '3',
    zones: [
      { name: 'Silent Zone', kind: 'FOCUS', hours: '08:00-20:00', used: 19, total: 45 },
      { name: 'Research Zone', kind: 'READ', hours: '08:00-20:00', used: 11, total: 32 },
      { name: 'ห้อง 301', kind: 'COLLABORATE', hours: '08:00-20:00', used: 0, total: 20, bookable: true },
      { name: 'ห้อง 302', kind: 'CREATE WITH TECHNOLOGY', hours: '08:00-20:00', used: 4, total: 20, bookable: true },
    ],
  },
  {
    floor: '4',
    zones: [
      { name: 'Focus Floor', kind: 'FOCUS', hours: '08:00-20:00', used: 28, total: 50 },
      { name: 'Collaboration Zone', kind: 'COLLABORATE', hours: '08:00-20:00', used: 22, total: 40 },
      { name: 'ห้อง 401', kind: 'CREATE / PRESENT', hours: '08:00-20:00', used: 5, total: 15, bookable: true },
      { name: 'ห้อง 402', kind: 'READ', hours: '08:00-20:00', used: 0, total: 15, bookable: true },
    ],
  },
  {
    floor: '5',
    zones: [
      { name: 'Innovation Lab', kind: 'CREATE WITH TECHNOLOGY', hours: '09:00-18:00', used: 16, total: 40 },
      { name: 'Media Zone', kind: 'CREATE / PRESENT', hours: '09:00-18:00', used: 9, total: 30 },
      { name: 'Studio', kind: 'CREATE WITH TECHNOLOGY', hours: '09:00-18:00', used: 4, total: 20, bookable: true },
      { name: 'ห้อง 501', kind: 'COLLABORATE', hours: '09:00-18:00', used: 0, total: 20, bookable: true },
      { name: 'ห้อง 502', kind: 'SOCIAL / LEARN', hours: '09:00-18:00', used: 7, total: 20, bookable: true },
    ],
  },
]

const HOURS = { 24: ['', ''], '08:00-20:00': ['08:00', '20:00'], '09:00-18:00': ['09:00', '18:00'] }

/* ── ผังที่ผู้ใช้กรอกเองจากหน้า MOMAY Surprise (V2) ── */

/** คืนผังที่กรอกไว้ หรือ null ถ้ายังไม่เคยกรอก/ข้อมูลเสีย */
function readSetup() {
  try {
    const raw = localStorage.getItem(SETUP_KEY)
    if (!raw) return null
    const s = JSON.parse(raw)
    if (!s || s.version !== 1 || !Array.isArray(s.floors) || !s.floors.length) return null
    return s
  } catch {
    return null
  }
}

/* ── คำตอบจากหน้า MOMAY Surprise ── */

/** อ่านพารามิเตอร์แล้วคืนตัวคูณความหนาแน่น — ไม่มีข้อมูลส่งมา = 1 (ใช้ตัวเลขตั้งต้น) */
function readSurvey(search) {
  const q = new URLSearchParams(search)
  const org = q.get('o')
  // หน้านี้ผูกกับห้องสมุดเท่านั้น หมวดอื่นส่งมาก็ไม่แปลผล
  if (org !== 'library') return null

  const fields = ORG_MAP.library.fields
  const n = (raw, dflt) => {
    const v = Number(raw)
    return Number.isFinite(v) && v > 0 ? v : dflt
  }
  const peak = PEAK_MAP[q.get('k')] ? q.get('k') : 'midday'

  const inputs = {
    org: 'library',
    people: n(q.get('p'), fields.people.default),
    capacity: n(q.get('c'), fields.capacity.default),
    energy: n(q.get('e'), fields.energy.default),
    signals: (q.get('s') ?? 'people').split(',').filter(Boolean),
    peak,
  }
  const baseline = computeBaseline(inputs)

  // ผังตั้งต้นเฉลี่ยราว 38% ของความจุ — เทียบกับภาระที่โมเดลคำนวณได้
  const factor = baseline.metrics.people / 38
  return { inputs, baseline, peak: PEAK_MAP[peak], factor }
}

/* ── สร้างข้อมูลจากผัง ── */

const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

/** ผังตั้งต้น แปลงให้อยู่ในรูปเดียวกับผังที่ผู้ใช้กรอกเอง */
function defaultLayout() {
  return FLOORS.map((f, i) => ({
    floor: i + 1,
    zones: f.zones.map((z) => {
      const [openFrom, openTo] = HOURS[z.hours] ?? ['', '']
      return {
        name: z.name,
        zoneType: z.zoneType ?? KIND_TO_ZONE[z.kind] ?? 'social',
        seats: z.total,
        openFrom,
        openTo,
        image: '',
        bookable: !!z.bookable,
        _seed: z.used,
      }
    }),
  }))
}

/**
 * รวมผัง + ตัวเลขให้เป็นชุดเดียว
 *   ผังที่ผู้ใช้กรอกเอง (localStorage) มาก่อน → รองลงมาคือพารามิเตอร์ใน URL → ผังตั้งต้น
 */
function resolveLayout(setup, survey) {
  if (setup) {
    // ในโมเดล capacity ของห้องสมุดคือ "ที่นั่งอ่าน" ไม่ใช่ช่องจอด — ใช้ที่นั่งรวมจากผัง
    const seatsFromPlan = (setup.floors || []).reduce(
      (n, f) => n + (f.zones || []).reduce((m, z) => m + (Number(z.seats) || 0), 0),
      0,
    )
    const inputs = {
      org: 'library',
      people: setup.people || ORG_MAP.library.fields.people.default,
      capacity: setup.seats || seatsFromPlan || ORG_MAP.library.fields.capacity.default,
      energy: setup.energy || ORG_MAP.library.fields.energy.default,
      signals: ['people', 'parking', 'energy'],
      peak: PEAK_MAP[setup.peak] ? setup.peak : 'midday',
    }
    const baseline = computeBaseline(inputs)
    const floors = setup.floors.map((f, i) => ({
      floor: f.floor ?? i + 1,
      zones: (f.zones || []).map((z) => ({
        name: z.name || 'พื้นที่ไม่มีชื่อ',
        zoneType: z.kind || 'social',
        seats: Number(z.seats) || 0,
        openFrom: z.openFrom || '',
        openTo: z.openTo || '',
        image: z.image || '',
        bookable: false,
      })),
    }))
    return {
      floors,
      inputs,
      baseline,
      peak: inputs.peak,
      parking: setup.parking || 0,
      // ชื่อเดิมคือ autoLight — ผังที่เก็บไว้ก่อนเปลี่ยนชื่อยังอ่านได้
      autoPower: setup.autoPower ?? setup.autoLight !== false,
      savedAt: setup.savedAt || '',
      fromSetup: true,
    }
  }

  return {
    floors: defaultLayout(),
    inputs: survey?.inputs ?? null,
    baseline: survey?.baseline ?? null,
    peak: survey?.inputs.peak ?? 'midday',
    parking: survey?.inputs.capacity ?? 0,
    autoPower: false,
    factor: survey?.factor ?? 1,
    fromSetup: false,
  }
}

/** คนที่อยู่ในอาคาร "พร้อมกัน" ไม่เท่ากับคนที่เข้ามาทั้งช่วงพีค
 *  ห้องสมุดคนเข้า-ออกตลอด นั่งเฉลี่ยราวครึ่งหนึ่งของความยาวช่วงพีค */
const CONCURRENCY = 0.45

/** คนไม่ได้กระจายเท่ากันทุกประเภทพื้นที่ — โซนนั่งเล่นแน่นกว่าห้องเงียบเสมอ
 *  ความต่างตรงนี้คือสิ่งที่ทำให้ "ไฟตามจำนวนคน" มีอะไรให้ดู ไม่ใช่เลขเดียวกันทุกชั้น */
const ZONE_BUSY = {
  h24: 0.75,
  social: 1.15,
  research: 1.0,
  collaboration: 0.95,
  focus: 0.7,
  digital: 0.85,
}

/** โซนนี้เปิดอยู่ไหมตอนนี้ — ไม่กรอกเวลา = เปิดตลอด · from > to = คร่อมเที่ยงคืน */
function isOpenNow(z, now = new Date()) {
  const [f, t] = [z.openFrom, z.openTo]
  if (!f || !t || f === t) return true
  const min = (hhmm) => {
    const [h, m] = String(hhmm).split(':').map(Number)
    return (h || 0) * 60 + (m || 0)
  }
  const cur = now.getHours() * 60 + now.getMinutes()
  const a = min(f), b = min(t)
  return a < b ? cur >= a && cur < b : cur >= a || cur < b
}

/** กระจายคนลงแต่ละโซนตามที่นั่งและประเภทพื้นที่
 *  โซนที่ปิดอยู่ตอนนี้ = ไม่มีคน (0) ไม่ใช่แค่ขึ้นป้ายว่าปิด — คนเข้าไปไม่ได้จริง ๆ
 *  และนี่คือจุดที่ระบบตัดไฟทั้งจุดได้ ถ้าไม่ทำ แผงควบคุมเครื่องใช้ไฟฟ้าจะไม่มีอะไรให้ตัดเลย */
function occupancyOf(layout) {
  const zones = layout.floors.flatMap((f) => f.zones)
  const now = new Date()

  if (!layout.fromSetup) {
    // ผังตั้งต้น: ใช้ตัวเลขที่ตั้งไว้ในผัง แล้วคูณด้วยภาระที่โมเดลคำนวณได้
    return new Map(zones.map((z) => [
      z,
      isOpenNow(z, now) ? clamp(Math.round((z._seed ?? 0) * layout.factor), 0, z.seats) : 0,
    ]))
  }

  const totalSeats = zones.reduce((n, z) => n + z.seats, 0)
  const concurrent = (layout.baseline?.peakPeople ?? 0) * CONCURRENCY
  // อัตราการใช้ที่นั่งโดยรวม — เกิน 100 ได้ถ้าคนเยอะกว่าที่นั่งจริง ๆ
  const load = totalSeats ? (concurrent / totalSeats) * 100 : 0

  return new Map(
    zones.map((z) => {
      if (!isOpenNow(z, now)) return [z, 0]
      const w = ZONE_BUSY[z.zoneType] ?? 1
      return [z, clamp(Math.round((z.seats * load * w) / 100), 0, z.seats)]
    }),
  )
}

function buildRooms(layout, assets = {}) {
  const used = occupancyOf(layout)
  const rooms = []
  let order = 0

  for (const f of layout.floors) {
    for (const z of f.zones) {
      const camId = `cam-${f.floor}-${++order}`
      /* รูปที่ผู้ใช้อัปโหลด: หน้า STUDENT อ่านจาก heroImgs ซึ่งเป็น "คีย์" ของไฟล์ในคลัง
         ไม่ใช่ตัว URL — เราจึงตั้งคีย์เองแล้วเก็บ data URL ไว้คู่กันใน assets
         (installAssetShim เอาไปสลับตอน <img> โหลดจริง) */
      const assetKey = z.image ? `momay-zone-${f.floor}-${order}` : ''
      if (assetKey) assets[assetKey] = z.image
      rooms.push({
        heroImgs: assetKey ? [assetKey] : [],
        updatedAt: layout.savedAt || '',
        roomId: `${z.name} (ชั้น ${f.floor})`,
        label: z.name,
        zoneType: z.zoneType,
        floor: Number(f.floor),
        order,
        openFrom: z.openFrom,
        openTo: z.openTo,
        bookable: z.bookable,
        seats: z.seats,
        quietRating: z.zoneType === 'focus' ? 5 : z.zoneType === 'research' ? 4 : 3,
        devices: [{ category: 'camera', meta: { camId, capacity: z.seats } }],
        _used: used.get(z) ?? 0,
        _total: z.seats,
      })
    }
  }

  // ที่จอดรถเป็นพื้นที่แยก กล้องนับรถ ไม่ใช่นับคน
  if (layout.parking > 0) {
    const vcount = clamp(Math.round(layout.parking * ((layout.baseline?.metrics.parking ?? 45) / 100)), 0, layout.parking)
    rooms.push({
      roomId: 'ที่จอดรถ',
      label: 'ที่จอดรถ',
      zoneType: 'parking',
      floor: 0,
      order: ++order,
      openFrom: '',
      openTo: '',
      seats: 0,
      devices: [{
        category: 'camera',
        meta: { camId: 'cam-park', detectTarget: 'vehicle', capacityVehicle: layout.parking },
      }],
      _used: 0,
      _total: 0,
      _vcount: vcount,
    })
  }

  return rooms
}

function buildCounts(rooms) {
  const counts = {}
  for (const r of rooms) {
    const camId = r.devices[0].meta.camId
    counts[camId] = {
      count: r._used,
      vcount: r._vcount ?? 0,
      pct: r._total ? Math.round((r._used / r._total) * 100) : 0,
      stale: false,
      snapTs: null,
    }
  }
  return counts
}

/** รูปทรงของวัน — คนเข้าห้องสมุดน้อยตอนเช้ามืด พีคตามช่วงที่ผู้ใช้ระบุ แล้วค่อย ๆ ลดลง
 *  เส้นนี้คือสิ่งที่หน้า STUDENT เอาไปทำ "ปกติของช่วงเวลานี้" และคาดการณ์ */
function dayCurve(slot, peakSlot) {
  const d = Math.abs(slot - peakSlot)
  const wrapped = Math.min(d, SLOTS - d)
  return Math.max(0.12, 1 - (wrapped / 16) ** 1.6)
}

const PEAK_HOUR = { morning: 8.5, midday: 12, evening: 17.5, event: 19 }

function buildDensity(rooms, layout) {
  const peakSlot = (PEAK_HOUR[layout.peak] ?? 12) * 2
  const rows = []
  const now = new Date()

  for (let day = 0; day < HISTORY_DAYS; day++) {
    const d = new Date(now)
    d.setDate(d.getDate() - day)
    // เสาร์-อาทิตย์คนน้อยกว่าวันธรรมดาชัดเจน อย่ายุบรวมเป็นเส้นเดียว
    const dayWeight = d.getDay() === 0 || d.getDay() === 6 ? 0.55 : 1

    for (const r of rooms) {
      if (r.zoneType === 'parking') continue
      const camId = r.devices[0].meta.camId
      for (let s = 0; s < SLOTS; s++) {
        const bucket = new Date(d)
        bucket.setHours(Math.floor(s / 2), s % 2 ? 30 : 0, 0, 0)
        if (bucket > now) continue

        const p50 = Math.round(r._used * dayCurve(s, peakSlot) * dayWeight)
        rows.push({ bucket: bucket.toISOString(), camId, count: { p50 } })
      }
    }
  }
  return rows
}

/**
 * รูปประจำโซน — หน้า STUDENT โหลดผ่าน <img src="{API}/api/assets/<คีย์>?v=...">
 * ซึ่งเบราว์เซอร์ยิงเอง ไม่ผ่าน window.fetch จะดักแบบเดียวกับ API อื่นไม่ได้
 * รูปของเราอยู่ใน localStorage เป็น data URL อยู่แล้ว จึงดักตอน src ถูกเซ็ต
 * แล้วสลับเป็น data URL ตรง ๆ — ไม่ต้องแตะไฟล์ที่ลอกมาเหมือนส่วนอื่น
 *
 * ดักสองทางเพราะ React ตั้งค่า src ผ่าน setAttribute ส่วนโค้ดอื่นอาจตั้งผ่าน .src
 */
function installAssetShim(assets) {
  if (!Object.keys(assets).length) return

  const KEY_RE = /\/api\/assets\/([^/?#]+)/
  const swap = (v) => {
    const m = KEY_RE.exec(String(v ?? ''))
    if (!m) return v
    try {
      return assets[decodeURIComponent(m[1])] ?? v
    } catch {
      return assets[m[1]] ?? v
    }
  }

  const desc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src')
  if (desc?.set) {
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
      ...desc,
      set(v) { desc.set.call(this, swap(v)) },
    })
  }

  const realSetAttr = Element.prototype.setAttribute
  Element.prototype.setAttribute = function (name, value) {
    return realSetAttr.call(this, name, this.tagName === 'IMG' && name === 'src' ? swap(value) : value)
  }
}

/* ── ดักที่ fetch ── */

export function installMockGateway() {
  if (typeof window === 'undefined' || window.__momayMockGateway) return
  window.__momayMockGateway = true

  const survey = readSurvey(window.location.search)
  const setup = readSetup()
  const layout = resolveLayout(setup, survey)
  const assets = {}
  const rooms = buildRooms(layout, assets)
  installAssetShim(assets)
  const counts = buildCounts(rooms)
  const rows = buildDensity(rooms, layout)

  // เปิดไว้ให้ส่วนอื่นของหน้าอ่านได้ว่ากำลังแปลผลจากข้อมูลจริงของผู้ใช้อยู่หรือไม่
  window.__momaySurvey = survey
  // แผงควบคุมเครื่องใช้ไฟฟ้า (AutoPowerPanel) อ่านจากตรงนี้ ไม่ต้องยิง API ซ้ำ
  window.__momayLayout = layout
  window.__momayRooms = rooms

  const json = (body) => new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })

  const routes = [
    [/\/api\/config$/, () => json({ ok: true, rooms })],
    [/\/api\/camera-counts/, () => json({ ok: true, counts })],
    [/\/api\/camera-density/, () => json({ ok: true, rows })],
    [/\/api\/bookings/, () => json({ ok: true, bookings: [] })],
    [/\/api\/ratings/, () => json({ ok: true, ratings: {} })],
    [/\/api\/usage/, () => json({ ok: true })],
  ]

  // usePageUsage ส่งสถิติผ่าน sendBeacon ไม่ผ่าน fetch — ดักไว้ด้วย ไม่งั้นขึ้น error ทุกครั้ง
  if (navigator.sendBeacon) {
    const realBeacon = navigator.sendBeacon.bind(navigator)
    navigator.sendBeacon = (url, data) =>
      /\/api\//.test(String(url)) ? true : realBeacon(url, data)
  }

  const realFetch = window.fetch.bind(window)
  window.fetch = (input, init) => {
    const url = typeof input === 'string' ? input : input?.url ?? ''
    const hit = routes.find(([re]) => re.test(url))
    return hit ? Promise.resolve(hit[1]()) : realFetch(input, init)
  }
}
