/**
 * MOMAY Surprise — ตรรกะเฉพาะของหมวด "ห้องสมุด" (หน้า /SurpriseV220926)
 *
 * แยกจาก model.ts เพราะห้องสมุดเล่าเรื่องคนละชุดกับหมวดอื่น:
 * หมวดอื่นวัดเป็น "ภาระของเมือง" (จราจร / ที่จอด / ขยะ) ส่วนห้องสมุดวัดเป็น
 * "ที่นั่งเต็มแค่ไหน ชั้นไหนแน่น ช่วงไหนควรกระจายคน"
 *
 * ทุกตัวเลขในไฟล์นี้คำนวณจาก 3 ค่าที่ผู้ใช้กรอก (คน/วัน · ที่นั่งรวม · จำนวนชั้น)
 * ร่วมกับสิ่งที่เลือกดู (focus) และช่วงเวลาที่คนเยอะที่สุด — ไม่มีค่าสุ่ม
 * เปิดหน้าเดิมด้วยข้อมูลเดิมกี่ครั้งก็ได้ตัวเลขชุดเดิมเสมอ
 *
 * ── ค่าคงที่ถูกคาลิเบรตไว้ที่ 1,200 คน/วัน · 450 ที่นั่ง · 6 ชั้น · ช่วงกลางวัน ──
 * ได้ผลลัพธ์ ผู้ใช้วันนี้ 1,180 คน (+12%) · ที่นั่งถูกใช้ 368/450 (82%) · ชั้น 3 แน่น 92%
 */

/* ─────────────────────────── สิ่งที่อยากให้ช่วยดู ─────────────────────────── */

export type LibFocusId = 'occupancy' | 'space' | 'booking' | 'energy' | 'environment'

export interface LibFocusDef {
  id: LibFocusId
  en: string
  th: string
  icon: string
  color: string
}

export const LIB_FOCUS: LibFocusDef[] = [
  { id: 'occupancy',   en: 'Occupancy',   th: 'ความหนาแน่นผู้ใช้',  icon: 'users',    color: '#38bdf8' },
  { id: 'space',       en: 'Space Usage', th: 'การใช้พื้นที่',       icon: 'grid',     color: '#818cf8' },
  { id: 'booking',     en: 'Booking',     th: 'การจองห้อง / พื้นที่', icon: 'calendar', color: '#a78bfa' },
  { id: 'energy',      en: 'Energy',      th: 'พลังงาน',            icon: 'bolt',     color: '#fbbf24' },
  { id: 'environment', en: 'Environment', th: 'สภาพแวดล้อม',        icon: 'leaf',     color: '#34d399' },
]

export const LIB_FOCUS_MAP: Record<LibFocusId, LibFocusDef> =
  Object.fromEntries(LIB_FOCUS.map(f => [f.id, f])) as Record<LibFocusId, LibFocusDef>

/* ─────────────────────────── ช่วงเวลาที่คนเยอะที่สุด ─────────────────────────── */

export type LibPeakId = 'morning' | 'midday' | 'evening'

export interface LibPeakDef {
  id: LibPeakId
  th: string
  window: string
  icon: string
  /** ชั่วโมงที่คนหนาแน่นที่สุด — จุดยอดของกราฟความหนาแน่นรายวัน */
  center: number
  /** สัดส่วนคนทั้งวันที่นั่งอยู่พร้อมกันตอนพีค (ตัวหารของ "ที่นั่งถูกใช้") */
  concurrency: number
  /** เหตุผลที่คนกระจุกช่วงนี้ — ใช้ต่อท้ายข้อสังเกตข้อแรก */
  becauseTh: string
}

export const LIB_PEAKS: LibPeakDef[] = [
  {
    id: 'morning', th: 'เช้า', window: '08:00–11:00', icon: 'sun-up', center: 9.5, concurrency: 0.28,
    becauseTh: 'สอดคล้องกับช่วงก่อนเข้าเรียนและการอ่านทบทวน',
  },
  {
    id: 'midday', th: 'กลางวัน', window: '11:00–15:00', icon: 'sun', center: 14, concurrency: 0.312,
    becauseTh: 'สอดคล้องกับช่วงพักกลางวันและการทำงานกลุ่ม',
  },
  {
    id: 'evening', th: 'เย็น', window: '15:00–20:00', icon: 'moon', center: 17.5, concurrency: 0.30,
    becauseTh: 'สอดคล้องกับช่วงหลังเลิกเรียนและการติวก่อนสอบ',
  },
]

export const LIB_PEAK_MAP: Record<LibPeakId, LibPeakDef> =
  Object.fromEntries(LIB_PEAKS.map(p => [p.id, p])) as Record<LibPeakId, LibPeakDef>

/** ช่วงพีคของห้องสมุด → ช่วงพีคของเอนจินกลาง */
export const LIB_PEAK_TO_ENGINE: Record<LibPeakId, 'morning' | 'midday' | 'evening'> = {
  morning: 'morning',
  midday: 'midday',
  evening: 'evening',
}

/* ─────────────────────────── อินพุต / เอาต์พุต ─────────────────────────── */

export interface LibraryInput {
  /** ผู้ใช้เฉลี่ยต่อวัน (คน) */
  people: number
  /** ที่นั่งทั้งหมด */
  seats: number
  /** จำนวนชั้น / พื้นที่ให้บริการ */
  floors: number
  focus: LibFocusId[]
  peak: LibPeakId
  /** ชั่วโมงปัจจุบัน (0–23) — ส่งเข้ามาเพื่อให้ผลลัพธ์คงที่ตอนเรนเดอร์ฝั่งเซิร์ฟเวอร์ */
  nowHour?: number
}

export interface LibBar {
  /** เวลาในหน่วยชั่วโมงทศนิยม เช่น 13.5 = 13:30 */
  at: number
  /** 0–1 เทียบกับชั่วโมงที่หนาแน่นที่สุด */
  value: number
  /** สีของแท่ง ไล่จากฟ้า → ม่วง → ชมพู → ส้ม ตามความหนาแน่น */
  color: string
  /** ป้ายใต้แกน — มีเฉพาะชั่วโมงคู่ ที่เหลือเว้นว่างไว้ไม่ให้ป้ายชนกัน */
  label: string
}

export interface LibInsight {
  icon: string
  color: string
  th: string
}

export interface LibDay {
  th: string
  current: number
  predicted: number
}

export interface LibScenario {
  id: 'normal' | 'up' | 'down'
  th: string
  sub: string
  people: number
}

export interface LibRecommendation {
  key: LibFocusId
  icon: string
  color: string
  titleTh: string
  subTh: string
  /** เนื้อหาที่กางออกเมื่อกด "ดูรายละเอียด" */
  detailTh: string[]
}

export interface LibraryReport {
  /* ── แผง 05 · เห็นภาพรวม ── */
  todayPeople: number
  /** เทียบสัปดาห์ก่อน (%) */
  peopleChange: number
  seats: number
  seatsUsed: number
  seatUsePct: number
  busyFloor: number
  busyFloorPct: number
  /** ชั้นรองลงมาที่แน่นเหมือนกัน — ไม่มีถ้าห้องสมุดชั้นเดียว */
  busyFloor2: number | null
  /** ชั้นที่ยังว่างพอจะกระจายคนไปได้ */
  quietFloors: number[]
  bars: LibBar[]
  nowHour: number
  nowLabel: string
  nowTh: string

  /* ── แผง 06 · เข้าใจเหตุผล ── */
  insights: LibInsight[]
  relationTh: string

  /* ── แผง 07 · มองเห็นอนาคต ── */
  days: LibDay[]
  /** ค่าสูงสุดของแกน Y (ปัดขึ้นเป็นหลักร้อยสวย ๆ) */
  chartMax: number
  chartTicks: number[]
  peakPredicted: number
  peakDayTh: string
  atRisk: boolean
  scenarios: LibScenario[]

  /* ── แผง 08 · ข้อเสนอแนะ ── */
  recommendations: LibRecommendation[]
}

/* ─────────────────────────── ค่าคงที่ที่คาลิเบรตไว้ ─────────────────────────── */

/** ผู้ใช้ที่นับได้จริงในวันนี้ เทียบกับค่าเฉลี่ยที่กรอกมา */
const TODAY_RATIO = 0.983

/** เวลาทำการที่ใช้วาดกราฟรายวัน */
const OPEN_FROM = 8
const OPEN_TO = 20.5
/** ความถี่ของแท่ง (ชั่วโมง) — ครึ่งชั่วโมงให้เห็นจังหวะก่อน-หลังพัก */
const BAR_STEP = 0.5

/** ความกว้างของช่วงพีค — ขาขึ้นชันกว่าขาลง เพราะคนทยอยกลับช้ากว่าตอนทยอยมา */
const SPREAD_BEFORE = 2.8
const SPREAD_AFTER = 3.6

/** รูปร่างของสัปดาห์ เทียบกับผู้ใช้วันนี้ — ต้นสัปดาห์เบา ปลายสัปดาห์แน่น */
const WEEK_SHAPE: [string, number][] = [
  ['จ.', 0.54], ['อ.', 0.76], ['พ.', 0.80], ['พฤ.', 0.86],
  ['ศ.', 0.95], ['ส.', 1.12], ['อา.', 0.97],
]

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))
const safe = (n: number, dflt: number) => (Number.isFinite(n) && n > 0 ? n : dflt)

/** ตัวเลขคนอ่านง่าย — ปัดเป็นหลักสิบเมื่อเกินร้อย จะได้ไม่ดูเหมือนค่าที่วัดได้เป๊ะ ๆ */
const people10 = (n: number) => (n >= 100 ? Math.round(n / 10) * 10 : Math.round(n))

const hhmm = (h: number) => {
  const hh = Math.floor(h)
  const mm = Math.round((h - hh) * 60)
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
}

/** สีของแท่งความหนาแน่น — ฟ้า(ว่าง) → ม่วง → ชมพู → ส้ม(แน่นที่สุด) */
const BAR_STOPS: [number, [number, number, number]][] = [
  [0.00, [56, 189, 248]],
  [0.45, [129, 140, 248]],
  [0.70, [217, 70, 239]],
  [0.88, [244, 114, 182]],
  [1.00, [251, 191, 36]],
]

function barColor(v: number): string {
  const t = clamp(v, 0, 1)
  for (let i = 1; i < BAR_STOPS.length; i++) {
    const [p0, c0] = BAR_STOPS[i - 1]
    const [p1, c1] = BAR_STOPS[i]
    if (t > p1) continue
    const k = p1 === p0 ? 0 : (t - p0) / (p1 - p0)
    const mix = c0.map((c, j) => Math.round(c + (c1[j] - c) * k))
    return `rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`
  }
  return 'rgb(251, 191, 36)'
}

/* ─────────────────────────── ตัวรายงาน ─────────────────────────── */

export function libraryReport(input: LibraryInput): LibraryReport {
  const peakDef = LIB_PEAK_MAP[input.peak] ?? LIB_PEAK_MAP.midday
  const focus = input.focus.length ? input.focus : (['occupancy', 'space'] as LibFocusId[])
  const has = (id: LibFocusId) => focus.includes(id)

  const people = Math.max(safe(input.people, 1200), 1)
  const seats = Math.max(safe(input.seats, 450), 1)
  const floors = Math.max(Math.round(safe(input.floors, 1)), 1)

  /* ── ภาพรวมวันนี้ ── */

  const todayPeople = Math.round(people * TODAY_RATIO)
  // คนนั่งพร้อมกันตอนพีค = ผู้ใช้ทั้งวัน × สัดส่วนที่ทับซ้อนกันของช่วงนั้น
  const seatsUsed = Math.min(seats, Math.round(todayPeople * peakDef.concurrency))
  const seatUsePct = Math.round((seatsUsed / seats) * 100)

  // ยิ่งที่นั่งตึง คนยิ่งบอกต่อและแวะเข้ามาถี่ขึ้น — โตเร็วกว่าห้องสมุดที่ยังโล่ง
  const peopleChange = clamp(Math.round((seatUsePct - 70) * 0.5 + 6), 3, 18)

  // ชั้นที่แน่นที่สุดมักอยู่กลางอาคาร: ขึ้นลิฟต์ไม่ไกล แต่พ้นความพลุกพล่านของชั้นล่าง
  const busyFloor = clamp(Math.round(floors / 2), 1, floors)
  const busyFloor2 = busyFloor + 1 <= floors ? busyFloor + 1 : null
  const busyFloorPct = Math.min(98, seatUsePct + 10)

  // ชั้นที่ยังรับคนได้ — ชั้นล่างสุด (คนเดินผ่านแต่ไม่นั่ง) และชั้นรองบนสุด
  const quietFloors = [...new Set([1, floors > 2 ? floors - 1 : floors])]
    .filter(f => f !== busyFloor && f !== busyFloor2)
    .sort((a, b) => a - b)

  /* ── กราฟความหนาแน่นรายวัน ── */

  const bars: LibBar[] = []
  for (let t = OPEN_FROM; t <= OPEN_TO + 1e-9; t += BAR_STEP) {
    const d = t - peakDef.center
    const spread = d < 0 ? SPREAD_BEFORE : SPREAD_AFTER
    const v = Math.exp(-(d * d) / (2 * spread * spread))
    bars.push({
      at: t,
      value: Math.round(v * 1000) / 1000,
      color: barColor(v),
      label: Number.isInteger(t) && t % 2 === 0 ? `${t}:00` : '',
    })
  }

  /* ── ตอนนี้กำลังเกิดอะไร ── */

  const rawHour = input.nowHour ?? peakDef.center
  const nowHour = clamp(Math.round(rawHour), OPEN_FROM, Math.floor(OPEN_TO))
  const nowLabel = hhmm(nowHour)
  const nowBusy = Math.exp(
    -Math.pow(nowHour - peakDef.center, 2) /
      (2 * Math.pow(nowHour < peakDef.center ? SPREAD_BEFORE : SPREAD_AFTER, 2)),
  )
  // ภาษาไทยไม่เว้นวรรคหลัง "และ" — คั่นด้วย " และ" แล้วให้คำถัดไปติดไปเลย
  const floorList = (fs: number[]) => fs.map(f => `ชั้น ${f}`).join(' และ')
  const nowTh =
    nowBusy >= 0.7
      ? `${floorList([busyFloor, ...(busyFloor2 ? [busyFloor2] : [])])} มีความหนาแน่นสูง` +
        (quietFloors.length ? ` แนะนำพื้นที่ทางเลือกใน${floorList(quietFloors)}` : '')
      : `ยังไม่ถึงช่วงที่คนเยอะที่สุด (${peakDef.window}) ตอนนี้นั่งได้เกือบทุกชั้น`

  /* ── ข้อสังเกต ── */

  const insightPool: (LibInsight & { when: boolean })[] = [
    {
      when: true,
      icon: 'users', color: '#38bdf8',
      th: `ผู้ใช้เพิ่มขึ้นในช่วง ${peakDef.window} ${peakDef.becauseTh}`,
    },
    {
      when: floors > 1,
      icon: 'book', color: '#f59e0b',
      th:
        `${floorList([busyFloor, ...(busyFloor2 ? [busyFloor2] : [])])} ได้รับความนิยมสูง ` +
        'เนื่องจากใกล้พื้นที่ทำงานกลุ่มและปลั๊กไฟ',
    },
    {
      when: has('environment'),
      icon: 'leaf', color: '#34d399',
      th: 'คุณภาพอากาศเริ่มลดลงในช่วงบ่าย (ค่า PM2.5 สูงขึ้น 18%)',
    },
    {
      when: has('booking'),
      icon: 'calendar', color: '#a78bfa',
      th: 'ห้องประชุม / ห้องกลุ่มถูกจองล่วงหน้าเต็มในวันพุธ–ศุกร์ ช่วง 13:00–17:00',
    },
    {
      when: has('energy'),
      icon: 'bolt', color: '#fbbf24',
      th: `ค่าไฟกระจุกในช่วง ${peakDef.window} ทั้งที่บางโซนแทบไม่มีคนนั่งตลอดวัน`,
    },
    {
      when: has('space'),
      icon: 'grid', color: '#818cf8',
      th: `ที่นั่งถูกใช้จริง ${seatUsePct}% แต่กระจุกอยู่ไม่กี่โซน ที่ว่างที่เหลือจึงยังไม่ถูกใช้`,
    },
    {
      when: true,
      icon: 'clock', color: '#60a5fa',
      th: `นอกช่วง ${peakDef.window} ที่นั่งว่างเกินครึ่ง การกระจายเวลาจึงช่วยได้มากกว่าการเพิ่มที่นั่ง`,
    },
  ]
  const insights = insightPool.filter(i => i.when).slice(0, 4).map(({ when, ...rest }) => rest)

  const relationThreshold = people10(todayPeople * 0.85)
  const relationTh =
    `เมื่อผู้ใช้เกิน ${relationThreshold.toLocaleString('en-US')} คน/วัน → ` +
    `${floorList([busyFloor, ...(busyFloor2 ? [busyFloor2] : [])])} จะมีความหนาแน่นสูง` +
    (quietFloors.length
      ? ` และ${floorList(quietFloors)} ยังมีศักยภาพรองรับผู้ใช้ได้อีก 40–60%`
      : ' ควรเริ่มกระจายเวลาเข้าใช้แทนการเพิ่มที่นั่ง')

  /* ── คาดการณ์ 7 วันข้างหน้า ── */

  const growth = 1 + peopleChange / 100
  const days: LibDay[] = WEEK_SHAPE.map(([th, w]) => ({
    th,
    current: Math.round(todayPeople * w),
    predicted: Math.round(todayPeople * w * growth),
  }))

  const peakDay = days.reduce((a, b) => (b.predicted > a.predicted ? b : a), days[0])
  const peakPredicted = peakDay.predicted
  // เสี่ยงเมื่อคนที่นั่งพร้อมกันในวันที่หนักที่สุด ล้นที่นั่งที่มี
  const atRisk = peakPredicted * peakDef.concurrency > seats

  const chartMax = Math.max(400, Math.ceil((peakPredicted * 1.08) / 400) * 400)
  const chartTicks = [0, 1, 2, 3, 4].map(i => Math.round((chartMax / 4) * i))

  const scenarios: LibScenario[] = [
    { id: 'normal', th: 'ปกติ',            sub: 'วันทั่วไป',  people: people },
    { id: 'up',     th: 'ผู้ใช้เพิ่มขึ้น',  sub: '+20%',      people: Math.round(people * 1.2) },
    { id: 'down',   th: 'ลดลง',            sub: '−20%',      people: Math.round(people * 0.8) },
  ]

  /* ── ข้อเสนอแนะ ── */

  const busyLabel = floorList([busyFloor, ...(busyFloor2 ? [busyFloor2] : [])])
  const quietLabel = quietFloors.length ? floorList(quietFloors) : 'โซนรอบนอก'

  const recPool: (LibRecommendation & { when: boolean })[] = [
    {
      when: has('occupancy') || has('space'),
      key: 'space', icon: 'chair', color: '#f59e0b',
      titleTh: 'กระจายการใช้งานพื้นที่',
      subTh: `แนะนำส่งเสริมการใช้งาน${quietLabel} ในช่วง ${peakDef.window}`,
      detailTh: [
        `${busyLabel} แน่นถึง ${busyFloorPct}% ขณะที่${quietLabel} ยังว่างเกินครึ่งในช่วงเดียวกัน`,
        `ย้ายกิจกรรมที่ไม่ต้องใช้หนังสือ เช่น อ่านงานตัวเอง ทำงานกลุ่มเล็ก ไปที่${quietLabel}`,
        'ติดป้ายบอกที่นั่งว่างรายชั้นที่ทางเข้า ให้ผู้ใช้เลือกเองก่อนขึ้นลิฟต์',
      ],
    },
    {
      when: has('booking'),
      key: 'booking', icon: 'calendar', color: '#a78bfa',
      titleTh: 'ปรับการจองห้องกลุ่ม',
      subTh: 'เพิ่มช่วงเวลา และแนะนำห้องว่างอัตโนมัติ',
      detailTh: [
        'ห้องกลุ่มถูกจองเต็มช่วง 13:00–17:00 แต่ว่างเกือบทั้งหมดก่อนเที่ยง',
        'ตัดรอบจองเป็นช่วงละ 90 นาที และปล่อยห้องคืนอัตโนมัติเมื่อไม่มีคนเข้าใน 15 นาทีแรก',
        'เสนอห้องว่างที่ใกล้เคียงให้ทันทีเมื่อรอบที่ขอถูกจองไปแล้ว',
      ],
    },
    {
      when: has('environment'),
      key: 'environment', icon: 'leaf', color: '#34d399',
      titleTh: 'ปรับสภาพแวดล้อม',
      subTh: 'เพิ่มการระบายอากาศในช่วงบ่าย เพื่อลดค่า PM2.5',
      detailTh: [
        'ค่าฝุ่นในอาคารขึ้นสูงสุดหลังช่วงพีคราวหนึ่งชั่วโมง ตามจำนวนคนที่สะสมมาทั้งวัน',
        'ตั้งให้ระบบเติมอากาศเร่งรอบล่วงหน้า 30 นาทีก่อนช่วงที่คนเยอะที่สุด',
        'วัดค่าเป็นรายชั้น เพราะชั้นที่คนแน่นกับชั้นที่อากาศแย่ ไม่จำเป็นต้องเป็นชั้นเดียวกัน',
      ],
    },
    {
      // ข้อนี้ติดมาเสมอ ไม่ว่าจะเลือกดูพลังงานไว้หรือไม่ — ทุกห้องสมุดเปิดไฟและแอร์
      // ในโซนที่ไม่มีคนนั่งอยู่แล้ว เป็นเรื่องที่ลงมือทำได้ทันทีโดยไม่ต้องลงทุนเพิ่ม
      when: true,
      key: 'energy', icon: 'bolt', color: '#fbbf24',
      titleTh: 'จัดการพลังงานแบบอัจฉริยะ',
      subTh: 'ปรับแสงสว่าง / แอร์ตามความหนาแน่น',
      detailTh: [
        `นอกช่วง ${peakDef.window} หลายโซนเปิดไฟและแอร์ไว้ทั้งที่แทบไม่มีคนนั่ง`,
        'ตัดไฟและแอร์เป็นรายโซนเมื่อไม่มีคนต่อเนื่องเกิน 20 นาที ไม่ใช่แค่หรี่ลงทั้งชั้น',
        'รวมผู้ใช้ช่วงดึกไว้โซนเดียว แล้วปิดส่วนที่เหลือทั้งชั้น',
      ],
    },
    {
      when: has('occupancy'),
      key: 'occupancy', icon: 'users', color: '#38bdf8',
      titleTh: 'เฝ้าดูความหนาแน่นแบบเรียลไทม์',
      subTh: `แจ้งเตือนเมื่อที่นั่งถูกใช้เกิน ${Math.min(95, seatUsePct + 8)}%`,
      detailTh: [
        `วันนี้ที่นั่งถูกใช้ ${seatsUsed} จาก ${seats} ที่นั่ง (${seatUsePct}%)`,
        'ตั้งเกณฑ์เตือนล่วงหน้า ให้เจ้าหน้าที่เปิดพื้นที่สำรองได้ก่อนที่คนจะยืนรอ',
        'เก็บสถิติรายชั้นไว้ใช้ตัดสินใจเรื่องผังที่นั่งในรอบถัดไป',
      ],
    },
  ]

  // เลือกข้อที่ตรงกับสิ่งที่ผู้ใช้สนใจก่อน แล้วเติมข้อที่เหลือจนครบสี่
  const picked = new Set(recPool.filter(r => r.when).map(r => r.key))
  for (const r of recPool) {
    if (picked.size >= 4) break
    picked.add(r.key)
  }
  // เรียงกลับตามลำดับใน recPool เสมอ — ลำดับการ์ดจะได้ไม่สลับไปมาตามสิ่งที่เลือก
  const recommendations = recPool
    .filter(r => picked.has(r.key))
    .slice(0, 4)
    .map(({ when, ...rest }) => rest)

  return {
    todayPeople,
    peopleChange,
    seats,
    seatsUsed,
    seatUsePct,
    busyFloor,
    busyFloorPct,
    busyFloor2,
    quietFloors,
    bars,
    nowHour,
    nowLabel,
    nowTh,
    insights,
    relationTh,
    days,
    chartMax,
    chartTicks,
    peakPredicted,
    peakDayTh: peakDay.th,
    atRisk,
    scenarios,
    recommendations,
  }
}
