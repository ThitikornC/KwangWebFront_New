/**
 * MOMAY Surprise — ตรรกะเฉพาะของหมวด "คณะ" (หน้า /SurpriseV220926)
 *
 * แยกจาก model.ts ด้วยเหตุผลเดียวกับ library.ts: คณะเล่าเรื่องคนละชุดกับหมวดอื่น
 * หมวดอื่นวัดเป็น "ภาระของเมือง" (จราจร / ที่จอด / ขยะ) ห้องสมุดวัดเป็น "ที่นั่งเต็มแค่ไหน"
 * ส่วนคณะวัดเป็น "ตารางเรียนดันคนไปกระจุกที่ไหน ช่วงไหน และพื้นที่ประเภทไหนรับไม่ไหวก่อน"
 *
 * ทุกตัวเลขคำนวณจาก 3 ค่าที่ผู้ใช้กรอก (นักศึกษา/วัน · ห้องเรียนหรือพื้นที่ · รายวิชาต่อวัน)
 * ร่วมกับหัวข้อที่เลือก (focus) และช่วงเวลาที่เน้น — ไม่มีค่าสุ่ม เปิดหน้าเดิมด้วยข้อมูลเดิม
 * กี่ครั้งก็ได้ตัวเลขชุดเดิมเสมอ
 *
 * ── ค่าคงที่ถูกคาลิเบรตไว้ที่ 2,500 คน · 35 พื้นที่ · 80 รายวิชา/วัน · ช่วงกลางวัน ──
 * ได้ผลลัพธ์ ช่วงพีค 10:00–14:00 · ความต้องการพื้นที่ตอนพีค +28% เมื่อนักศึกษาเพิ่ม 15%
 */

/* ─────────────────────────── หัวข้อที่ต้องการวิเคราะห์ ─────────────────────────── */

export type FacFocusId =
  | 'learning' | 'space' | 'activity' | 'resources' | 'environment' | 'energy'

export interface FacFocusDef {
  id: FacFocusId
  en: string
  th: string
  icon: string
  color: string
}

export const FAC_FOCUS: FacFocusDef[] = [
  { id: 'learning',    en: 'Learning',        th: 'การเรียนการสอน',  icon: 'book',     color: '#a78bfa' },
  { id: 'space',       en: 'Space Usage',     th: 'การใช้พื้นที่',     icon: 'grid',     color: '#818cf8' },
  { id: 'activity',    en: 'Student Activity', th: 'กิจกรรมนักศึกษา', icon: 'users',    color: '#c084fc' },
  { id: 'resources',   en: 'Resources',       th: 'ทรัพยากร / บริการ', icon: 'layers',   color: '#38bdf8' },
  { id: 'environment', en: 'Environment',     th: 'สภาพแวดล้อม',     icon: 'leaf',     color: '#34d399' },
  { id: 'energy',      en: 'Energy',          th: 'พลังงาน',          icon: 'bolt',     color: '#fbbf24' },
]

export const FAC_FOCUS_MAP: Record<FacFocusId, FacFocusDef> =
  Object.fromEntries(FAC_FOCUS.map(f => [f.id, f])) as Record<FacFocusId, FacFocusDef>

/* ─────────────────────────── ช่วงเวลาที่ต้องการเน้น ─────────────────────────── */

/** "ไม่แน่ใจ" เป็นคำตอบที่ยอมรับได้ — คณะส่วนใหญ่ยังไม่เคยวัด จึงให้ MOMAY เลือกช่วง
    ที่ตารางสอนหนาที่สุดให้แทน (= กลางวัน) แต่ติดธงไว้ว่าเป็นค่าที่ระบบเดาให้ */
export type FacPeakId = 'morning' | 'midday' | 'evening' | 'event'

export interface FacPeakDef {
  id: FacPeakId
  th: string
  en: string
  icon: string
  /** ชั่วโมงที่ความต้องการพื้นที่สูงที่สุด — จุดยอดของเส้นจำลอง */
  center: number
  /** ครึ่งความกว้างของช่วงพีคที่เอาไปเขียนเป็นกรอบเวลา (ชม.) */
  half: number
  /** สัดส่วนนักศึกษาทั้งวันที่อยู่ในคณะพร้อมกันตอนพีค */
  concurrency: number
  /** เหตุผลที่คนกระจุกช่วงนี้ — ใช้ต่อท้ายข้อสังเกตข้อแรก */
  becauseTh: string
}

export const FAC_PEAKS: FacPeakDef[] = [
  {
    id: 'morning', th: 'เช้า', en: 'Morning', icon: 'sun-up',
    center: 9.5, half: 1.5, concurrency: 0.34,
    becauseTh: 'สอดคล้องกับคาบเรียนแรกและช่วงที่นักศึกษาทยอยเข้าคณะ',
  },
  {
    id: 'midday', th: 'กลางวัน', en: 'Day', icon: 'sun',
    center: 12, half: 2, concurrency: 0.38,
    becauseTh: 'สอดคล้องกับช่วงพักกลางวันและการเปลี่ยนคาบเรียนติดกัน',
  },
  {
    id: 'evening', th: 'เย็น', en: 'Evening', icon: 'moon',
    center: 16.5, half: 1.5, concurrency: 0.32,
    becauseTh: 'สอดคล้องกับคาบบ่ายท้ายวันและการรวมกลุ่มทำงานส่ง',
  },
  {
    id: 'event', th: 'ช่วงกิจกรรมพิเศษ', en: 'Event', icon: 'calendar',
    center: 14, half: 2.5, concurrency: 0.46,
    becauseTh: 'สอดคล้องกับวันที่มีกิจกรรมคณะซ้อนกับตารางเรียนปกติ',
  },
]

export const FAC_PEAK_MAP: Record<FacPeakId, FacPeakDef> =
  Object.fromEntries(FAC_PEAKS.map(p => [p.id, p])) as Record<FacPeakId, FacPeakDef>

/** ช่วงพีคของคณะ → ช่วงพีคของเอนจินกลาง (ใช้ตอนแชร์ลิงก์ไปหน้า CITIZEN) */
export const FAC_PEAK_TO_ENGINE: Record<FacPeakId, 'morning' | 'midday' | 'evening' | 'event'> = {
  morning: 'morning',
  midday: 'midday',
  evening: 'evening',
  event: 'event',
}

/* ─────────────────────────── สถานการณ์จำลอง ─────────────────────────── */

export type FacScenarioId = 'students' | 'activity' | 'closed' | 'event' | 'custom'

export interface FacScenarioDef {
  id: FacScenarioId
  th: string
  icon: string
  /** ตัวคูณจำนวนคนที่อยู่พร้อมกันตอนพีค */
  people: number
  /** ตัวคูณจำนวนกิจกรรมที่ต้องหาพื้นที่ลง */
  activity: number
  /** สัดส่วนพื้นที่ที่ใช้งานได้ (1 = ครบทุกพื้นที่) */
  usable: number
}

export const FAC_SCENARIOS: FacScenarioDef[] = [
  { id: 'students', th: 'จำนวนนักศึกษา +15%',     icon: 'users',    people: 1.15, activity: 1.00, usable: 1.00 },
  { id: 'activity', th: 'กิจกรรม +20%',            icon: 'calendar', people: 1.00, activity: 1.20, usable: 1.00 },
  { id: 'closed',   th: 'พื้นที่บางส่วนใช้งานไม่ได้', icon: 'alert',    people: 1.00, activity: 1.00, usable: 0.85 },
  { id: 'event',    th: 'วันจัดกิจกรรมพิเศษ',        icon: 'star',     people: 1.12, activity: 1.15, usable: 1.00 },
  // ค่าของ "กำหนดเอง" ถูกแทนที่ด้วยตัวเลขจากสไลเดอร์ (ดู FacultyInput.custom)
  { id: 'custom',   th: 'กำหนดเอง',                 icon: 'grid',     people: 1.10, activity: 1.10, usable: 1.00 },
]

export const FAC_SCENARIO_MAP: Record<FacScenarioId, FacScenarioDef> =
  Object.fromEntries(FAC_SCENARIOS.map(s => [s.id, s])) as Record<FacScenarioId, FacScenarioDef>

/* ─────────────────────────── ประเภทพื้นที่ ─────────────────────────── */

/** พื้นที่สี่ประเภทที่คณะต้องจัดสรร — สัดส่วนรวมกันได้ 1
    demandShare = ส่วนแบ่งของความต้องการ · capacityShare = ส่วนแบ่งของพื้นที่ที่มี
    ประเภทที่ demand มากกว่า capacity คือประเภทที่จะตึงก่อนเสมอ */
interface SpaceKind {
  id: string
  th: string
  color: string
  demandShare: number
  capacityShare: number
  /** ความเหลื่อมของจุดยอดเทียบกับช่วงพีคหลัก (ชม.) */
  offset: number
}

const SPACE_KINDS: SpaceKind[] = [
  { id: 'class',  th: 'ห้องเรียน',          color: '#60a5fa', demandShare: 0.42, capacityShare: 0.52, offset: -0.5 },
  { id: 'group',  th: 'พื้นที่ทำงานกลุ่ม',   color: '#34d399', demandShare: 0.26, capacityShare: 0.18, offset: 0.8 },
  { id: 'event',  th: 'พื้นที่กิจกรรม',      color: '#fbbf24', demandShare: 0.18, capacityShare: 0.17, offset: 1.6 },
  { id: 'lounge', th: 'พื้นที่พักผ่อน',      color: '#f472b6', demandShare: 0.14, capacityShare: 0.13, offset: 0.2 },
]

/* ─────────────────────────── อินพุต / เอาต์พุต ─────────────────────────── */

export interface FacultyInput {
  /** จำนวนนักศึกษาโดยประมาณ (คน) */
  students: number
  /** จำนวนห้องเรียน / พื้นที่ที่ใช้งาน */
  rooms: number
  /** จำนวนรายวิชา / กิจกรรมที่ใช้พื้นที่ต่อวัน */
  activities: number
  focus: FacFocusId[]
  peak: FacPeakId
  /** สถานการณ์ที่กำลังดูอยู่ในแผง 07 */
  scenario: FacScenarioId
  /** ตัวเลขของสถานการณ์ "กำหนดเอง" เป็น % ที่เพิ่มขึ้น (0 = เท่าเดิม) */
  custom?: { people: number; activity: number }
  /** ชั่วโมงปัจจุบัน (0–23) — ส่งเข้ามาเพื่อให้ผลลัพธ์คงที่ตอนเรนเดอร์ฝั่งเซิร์ฟเวอร์ */
  nowHour?: number
}

export interface FacZone {
  th: string
  /** 0–1 เทียบกับพื้นที่ที่แน่นที่สุด */
  load: number
  /** สีประจำประเภท — ใช้กับเส้นจำลองในแผง 07 */
  color: string
  /** สีตามความหนาแน่น — ชุดเดียวกับก้อนบนผังไอโซเมตริก จึงใช้เป็นคำอธิบายผังได้ */
  heatColor: string
  /** จำนวนพื้นที่ในกลุ่มนี้ */
  rooms: number
}

/** ก้อนอาคารหนึ่งก้อนบนผังไอโซเมตริกของแผง 05 และหน้าวิเคราะห์
    พิกัดคิดมาแล้วเป็นหน่วย viewBox เทมเพลตแค่เอาไปวาด ไม่ต้องคิดเลขเอง */
/** อาคารหนึ่งหลังบนผัง — จุดของรูปหลายเหลี่ยมพร้อมส่งให้ <polygon points> ตรง ๆ */
export interface FacBuilding {
  t: 'b'
  /** ลำดับความลึกแบบไอโซเมตริก ยิ่งน้อยยิ่งอยู่ลึก ใช้เรียงลำดับวาด */
  d: number
  /** จำนวนชั้น */
  lv: number
  /** เฉดสีอาคาร 0–3 — ให้ย่านไม่เป็นสีเดียวกันหมด */
  tone: number
  /** ย่านที่อาคารนี้ตั้งอยู่ (0–8) — หน้าอื่นใช้ย้อมสีอาคารตามสถานะของย่าน */
  district: number
  /** พิกัดและขนาดบนกริด (ไม่ใช่พิกัดจอ) — ให้หน้าที่เรนเดอร์สามมิติเอาไปวางกล่องเองได้
      faceTop/faceLeft/faceRight เป็นผลของการฉายแบบไอโซเมตริกไปแล้ว ย้อนกลับไม่ได้ */
  gx: number
  gy: number
  gw: number
  gd: number
  /** ความหนาแน่นของย่านที่อาคารนี้ตั้งอยู่ 0–1 */
  heat: number
  /** ประเภทพื้นที่ของย่านนี้ */
  kindTh: string
  faceTop: string
  faceLeft: string
  faceRight: string
  /** ขอบดาดฟ้า — หลังคาที่ร่นเข้ามา ทำให้เห็นเป็นขอบกันตกรอบหลังคา */
  roofIn: string
  /** หน้าต่างสองหน้า แยกลิสต์เพราะต้องระบายคนละความสว่างตามทิศแสง
      ถ้าใช้สีเดียวกันทั้งสองหน้า มุมตึกจะแบนหายไป */
  winLeft: string[]
  winRight: string[]
  /** กล่องบนดาดฟ้า — null ถ้าตึกหลังนี้ไม่มี */
  roofBox: { top: string; left: string; right: string } | null
}

/** ต้นไม้หนึ่งต้น — พุ่มเป็นก้อนวงกลมซ้อนกัน เรียงมาแล้วตามลำดับที่ต้องวาด */
export interface FacGrove {
  t: 'g'
  /** พิกัดบนกริดและรัศมีเป็นหน่วยกริด — ใช้ตอนเรนเดอร์สามมิติ */
  gx: number
  gy: number
  gr: number
  d: number
  /** ชุดสีเขียว 0–2 */
  tone: number
  x: number
  y: number
  r: number
  /** ความสูงลำต้น 0 = พุ่มเตี้ยที่ไม่มีลำต้นให้เห็น */
  trunk: number
  /** จุดของลำต้น พร้อมส่งให้ <polygon points> — ว่างถ้าเป็นพุ่มเตี้ย */
  trunkPts: string
  puffs: { cx: number; cy: number; r: number; l: number }[]
}

export type FacItem = FacBuilding | FacGrove

/** ดวงความหนาแน่นหนึ่งดวง — ดวงที่ทับกันจะรวมเป็นปื้นรูปร่างไม่สม่ำเสมอ */
export interface FacHeatBlob {
  x: number
  y: number
  rx: number
  ry: number
  opacity: number
}

/** ความหนาแน่นของหนึ่งย่าน
    ต้องจัดเป็นกลุ่มไม่ใช่ลิสต์แบน เพราะดวงในย่านเดียวกันซ้อนกันเป็นปื้นเดียว
    ถ้าปล่อยให้แต่ละดวงกระพริบคนละจังหวะ ปื้นจะบิดเบี้ยวแทนที่จะเต้นทั้งก้อน
    และการใส่ animation ที่ระดับกลุ่มยังทำให้ opacity ของกลุ่มไปคูณกับของแต่ละดวง
    ค่าความจางรายดวงที่คำนวณไว้จึงไม่ถูกทับ */
export interface FacHeatZone {
  /** ระดับความร้อน เลือกชุดไล่สีที่ใช้ — Hot แดงจัด / Warm ส้ม / Mild เหลือง */
  tier: 'Hot' | 'Warm' | 'Mild'
  /** หน่วงจังหวะกระพริบ (วินาที ค่าติดลบ = เริ่มกลางคาบ)
      ให้แต่ละย่านเหลื่อมกัน ไม่งั้นทั้งผังกระพริบพร้อมกันเป็นไฟสัญญาณ */
  delay: number
  blobs: FacHeatBlob[]
}

export interface FacRelation {
  icon: string
  th: string
  en: string
  color: string
}

export interface FacSeries {
  th: string
  color: string
  /** จุดบนเส้น — x เป็นชั่วโมง, y เป็น 0–1 เทียบกับ capacity ของประเภทนั้น */
  points: { at: number; value: number }[]
}

export interface FacultyReport {
  /* ── แผง 05 · เห็นภาพรวม ── */
  students: number
  rooms: number
  activities: number
  peakWindow: string
  /** ธงว่าช่วงพีคมาจากการเดาของระบบ ไม่ใช่คำตอบของผู้ใช้ */
  insightTh: string
  /** คนที่อยู่ในคณะพร้อมกันตอนพีค */
  peakConcurrent: number
  /** ความต้องการพื้นที่ตอนพีค เทียบ capacity ที่มี (%) */
  spaceLoadPct: number
  zones: FacZone[]
  /** ผังคณะไอโซเมตริก — ก้อนอาคารพร้อมระดับความหนาแน่น (แท็บ "ภาพรวมการใช้พื้นที่") */
  campusItems: FacItem[]
  /** พื้นผังและแนวถนน เป็นจุดของรูปหลายเหลี่ยมพร้อมใช้ */
  campusGround: string
  campusStreets: string[]
  /** ผิวถนน · เส้นแบ่งเลนแบบประ · ทางม้าลาย — วาดซ้อนบนทางเท้าตามลำดับนี้ */
  campusRoads: string[]
  campusLanes: string[]
  campusCrossings: string[]
  /** จุดกลางย่านที่แน่นที่สุด ใช้ปักวงแหวน */
  campusRing: { x: number; y: number }
  /** กรอบของผัง ใช้เป็น viewBox */
  campusBox: { w: number; h: number }
  /** ตำแหน่งก้อนที่ร้อนที่สุด เป็น % ของกรอบ — ใช้วางป้ายที่ลอยทับผัง */
  campusHot: { x: number; y: number }
  /* ── ดวงความหนาแน่นที่แปะทับผัง ──
     เดิมระบายสีความหนาแน่นลงที่ตัวอาคารทุกก้อน ทั้งผังจึงเป็นสีจัดหมด ไม่มีพื้นเย็น
     ให้จุดร้อนเด้งออกมา ซ้ำสียังทำงานสองหน้าที่พร้อมกัน (บอกทั้งประเภทพื้นที่และ
     ความหนาแน่น) คนอ่านเลยแยกไม่ออกว่าสีส้มแปลว่าอะไร
     ตอนนี้อาคารเป็นสีกลางทั้งผัง ความหนาแน่นมาเป็นดวงเรืองเฉพาะจุดแทน */
  campusHeat: FacHeatZone[]
  /** ความหนาแน่นรายครึ่งชั่วโมงของทั้งคณะ (แท็บ "ตามช่วงเวลา") */
  hours: { at: number; value: number; label: string }[]
  nowHour: number
  nowLabel: string
  nowTh: string

  /* ── แผง 06 · เข้าใจเหตุผล ── */
  relations: FacRelation[]
  mayHappenTh: string

  /* ── แผง 07 · มองเห็นอนาคต ── */
  /** ความต้องการพื้นที่ตอนพีคเพิ่มขึ้นกี่ % จากสถานการณ์ที่เลือก */
  simDeltaPct: number
  series: FacSeries[]
  /** กรอบเวลาที่เกิดแรงกดดัน */
  pressureFrom: number
  pressureTo: number
  pressureTh: string
  /** ประเภทพื้นที่ที่ตึงก่อนเพื่อน */
  tightKindTh: string

  /* ── แผง 08 · ข้อเสนอแนะ ── */
  recTitleTh: string
  whyTh: string
  actionTh: string
  impactTh: string
}

/* ─────────────────────────── ค่าคงที่ที่คาลิเบรตไว้ ─────────────────────────── */

/** เวลาทำการของคณะที่ใช้วาดเส้น */
const OPEN_FROM = 8
const OPEN_TO = 18
/** ความถี่ของจุดบนเส้น (ชั่วโมง) */
const STEP = 0.5

/** ความกว้างของช่วงพีค — ขาขึ้นชันกว่าขาลง เพราะคนทยอยกลับช้ากว่าตอนทยอยมา */
const SPREAD_BEFORE = 2.2
const SPREAD_AFTER = 2.9

/** คนที่หนึ่งพื้นที่รองรับได้พร้อมกัน (ห้องเรียนคละขนาด เฉลี่ยทั้งคณะ) */
const SEATS_PER_ROOM = 32

/** จำนวนรายวิชา/กิจกรรมต่อพื้นที่ต่อวันที่ถือว่าตารางแน่นพอดี
    เกินกว่านี้ = ตารางถูกอัดจนไม่มีช่องว่างให้สลับห้อง */
const SLOTS_PER_ROOM = 2.3

/* ── ความยืดหยุ่นของความต้องการพื้นที่ต่อจำนวนคน ──
   จุดสำคัญของแผง 07: นักศึกษาเพิ่ม 15% ไม่ได้แปลว่าพื้นที่ต้องการเพิ่ม 15%
   เพราะคนที่เพิ่มมาก็เรียนตามตารางเดิม จึงไปกองอยู่ในช่วงพีคเดิมที่แน่นอยู่แล้ว
   ยิ่งตารางแน่น (scheduleTension สูง) ยิ่งไม่มีช่องให้กระจาย ตัวเลขยิ่งพุ่ง

   คาลิเบรต: ที่ 2,500 คน · 35 พื้นที่ · 80 รายวิชา/วัน (tension ≈ 1.0)
   นักศึกษา +15% → ความต้องการพื้นที่ตอนพีค +28% */
const PEOPLE_ELASTICITY = 0.77

/* ── สีของความหนาแน่น: ฟ้า(ต่ำ) → เขียวอมฟ้า → เหลือง → ส้ม → แดง(สูง) ──
   ชุดเดียวกับแถบ ต่ำ–สูง ที่อยู่ใต้ผัง จะได้อ่านผังโดยไม่ต้องเทียบตัวเลข */
const HEAT_STOPS: [number, [number, number, number]][] = [
  [0.00, [56, 132, 248]],
  [0.35, [45, 212, 191]],
  [0.60, [250, 204, 21]],
  [0.80, [249, 115, 22]],
  [1.00, [239, 68, 68]],
]

export function heatColor(v: number): string {
  const t = Math.min(1, Math.max(0, v))
  for (let i = 1; i < HEAT_STOPS.length; i++) {
    const [p0, c0] = HEAT_STOPS[i - 1]
    const [p1, c1] = HEAT_STOPS[i]
    if (t > p1) continue
    const k = p1 === p0 ? 0 : (t - p0) / (p1 - p0)
    const mix = c0.map((c, j) => Math.round(c + (c1[j] - c) * k))
    return `rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`
  }
  return 'rgb(239, 68, 68)'
}

/* ── ผังคณะแบบไอโซเมตริก ──
   สร้างเป็น "ย่าน" แทนก้อนใหญ่ไม่กี่ก้อน: ตารางถนนตัดพื้นที่เป็นบล็อก
   แต่ละบล็อกมีอาคารเล็กหลายหลังคละความสูงและมีต้นไม้แทรก

   ที่ต้องละเอียดขนาดนี้เพราะดวงความหนาแน่นต้องพาดคร่อมอาคารหลายหลังได้
   จึงจะอ่านว่า "ย่านนี้แน่น" ซึ่งเป็นสิ่งที่ผังควรบอก ถ้าผังมีแค่ก้อนใหญ่ไม่กี่ก้อน
   หนึ่งดวงจะกินหนึ่งก้อนพอดี กลายเป็นอ่านได้แค่ "ก้อนนี้แน่น" ซึ่งดูจากตารางก็รู้

   ผังไม่ได้อิงอาคารจริงของคณะไหน ใช้อ่านการกระจุกตัวเท่านั้น */

/** ครึ่งความกว้าง/ความสูงของหนึ่งช่องกริดหลังฉายเป็นไอโซเมตริก */
const TW = 11
const TH = 5.5
/** ความสูงต่อหนึ่งชั้นของอาคาร
    ต้องเตี้ยกว่าครึ่งความกว้างช่องมาก ๆ ไม่งั้นได้ตึกระฟ้าแทนที่จะเป็นอาคารคณะ
    และตึกสูงจะบังถนนกับอาคารแถวหลังจนผังอ่านไม่ออก */
const LEVEL = 3
/** ขนาดตาราง และคาบของถนน (ปลูกสร้าง 3 ช่อง + ถนน 1 ช่อง) */
const GRID_N = 12
const BLOCK = 4
/** ร่นขอบอาคารเข้าจากเส้นช่อง ให้เห็นช่องว่างระหว่างหลัง */
const INSET = 0.12
/** จำนวนชั้นมากสุด — ใช้เว้นหัวกรอบให้พอดีตึกที่สูงที่สุด */
const MAX_LV = 4

/** ประเภทพื้นที่ประจำแต่ละบล็อก (ตาราง 3x3) — ดัชนีใน SPACE_KINDS
    จัดให้ประเภทเดียวกันไม่ติดกัน ดวงความหนาแน่นจะได้กระจายทั่วผังไม่กองมุมเดียว */
const BLOCK_KIND = [0, 1, 3, 2, 0, 1, 3, 0, 2]

const isStreet = (g: number) => g % BLOCK === BLOCK - 1
const blockOf = (g: number) => Math.floor(g / BLOCK)

/** สุ่มแบบมีเมล็ดคงที่ — ผังต้องออกมาหน้าตาเดิมทุกครั้ง ทั้งฝั่งเซิร์ฟเวอร์และเบราว์เซอร์
    ถ้าใช้ Math.random ผังจะขยับทุกรอบที่เรนเดอร์ และ SSR กับ client จะไม่ตรงกัน */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Lot {
  gx: number; gy: number; w: number; d: number; lv: number; tone: number
  /** มีกล่องบนดาดฟ้าไหม (ห้องบันได/เครื่องปรับอากาศ) และวางไว้ตรงไหนของหลังคา 0–1 */
  cap: boolean; capX: number; capY: number
}
/** ก้อนพุ่มใบหนึ่งก้อน — l คือชั้นที่วาด 0 เนื้อพุ่ม / 1 เงาล่างขวา / 2 ไฮไลต์บนซ้าย
    ต้องวาดเรียงตามนี้เท่านั้น ถ้าวาดเงาก่อนเนื้อพุ่ม เนื้อพุ่มจะทับจนเงาหายหมด */
interface Puff { dx: number; dy: number; r: number; l: 0 | 1 | 2 }
interface Grove { gx: number; gy: number; r: number; tone: number; trunk: number; puffs: Puff[] }

/* ── ทรงพุ่มของต้นไม้ ──
   พุ่มเดียวเป็นวงรีจะอ่านเป็นลูกอมเสียบไม้ ต้องซ้อนหลายก้อนให้ขอบขรุขระ
   แล้วแต้มเงาที่ล่างขวากับไฮไลต์ที่บนซ้าย (ทิศแสงเดียวกับที่ใช้ไล่สีผนังอาคาร)
   ทรงพุ่มจึงจะนูนขึ้นมาแทนที่จะแบน

   สามทรง: 0 พุ่มกลมแผ่กว้าง · 1 ทรงสูงชะลูด · 2 พุ่มเตี้ยติดดิน */
function canopy(kind: number, r: number, rnd: () => number): { trunk: number; puffs: Puff[] } {
  const puffs: Puff[] = []
  const add = (dx: number, dy: number, pr: number, l: 0 | 1 | 2) => puffs.push({ dx, dy, r: pr, l })

  if (kind === 2) {
    // พุ่มเตี้ย ไม่มีลำต้นให้เห็น ใช้แทรกตามมุมอาคารและริมถนน
    const cy = -r * 0.42
    for (let i = 0; i < 3; i++) {
      add((i - 1) * r * 0.46 + (rnd() - 0.5) * r * 0.16, cy + (rnd() - 0.5) * r * 0.2, r * (0.5 + rnd() * 0.12), 0)
    }
    add(r * 0.3, cy + r * 0.2, r * 0.42, 1)
    add(-r * 0.32, cy - r * 0.22, r * 0.3, 2)
    return { trunk: 0, puffs }
  }

  const tall = kind === 1
  const trunk = tall ? r * 0.85 : r * 0.55
  const cy = -(trunk + r * (tall ? 0.95 : 0.72))
  const spreadX = tall ? r * 0.3 : r * 0.52
  const spreadY = tall ? r * 0.62 : r * 0.3
  const n = tall ? 5 : 7

  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rnd() * 0.5
    add(
      Math.cos(a) * spreadX * (0.6 + rnd() * 0.5),
      Math.sin(a) * spreadY * (0.6 + rnd() * 0.5),
      r * (tall ? 0.52 : 0.6) * (0.85 + rnd() * 0.3),
      0,
    )
  }
  // ก้อนกลางเชื่อมพุ่มรอบ ๆ ให้เป็นมวลเดียว ไม่ใช่วงกลมหลายวงกองกัน
  add(0, 0, r * (tall ? 0.6 : 0.68), 0)
  add(r * 0.34, r * (tall ? 0.42 : 0.3), r * (tall ? 0.42 : 0.5), 1)
  add(-r * 0.3, -r * (tall ? 0.5 : 0.36), r * (tall ? 0.34 : 0.42), 2)
  add(-r * 0.05, -r * (tall ? 0.78 : 0.56), r * 0.26, 2)

  return { trunk, puffs: puffs.map(q => ({ ...q, dy: q.dy + cy })) }
}

/** ผังคงที่ ไม่ขึ้นกับตัวเลขที่ผู้ใช้กรอก จึงสร้างครั้งเดียวตอนโหลดโมดูล */
const { LOTS, GROVES } = (() => {
  const rnd = seeded(20260921)
  const taken = new Set<string>()
  const lots: Lot[] = []
  const groves: Grove[] = []
  const key = (x: number, y: number) => x + ':' + y
  const free = (x: number, y: number) =>
    x < GRID_N && y < GRID_N && !isStreet(x) && !isStreet(y) && !taken.has(key(x, y))

  for (let gy = 0; gy < GRID_N; gy++) {
    for (let gx = 0; gx < GRID_N; gx++) {
      if (isStreet(gx) || isStreet(gy)) {
        // ต้นไม้ริมถนน ปลูกห่าง ๆ ไม่ให้บังอาคารแถวหลัง
        // แนวต้นไม้ริมถนนปลูกถี่ ให้ย่านดูร่มรื่นเหมือนผังคณะจริง
        if (rnd() < 0.26) {
          const r = 3.8 + rnd() * 1.5
          // พุ่มเตี้ยไว้แค่แซม ถ้ามีเยอะจะโผล่หลังตึกเป็นเสี้ยวเขียวดูเหมือนรอยเปื้อน
          const kind = rnd() < 0.28 ? 1 : rnd() < 0.2 ? 2 : 0
          groves.push({ gx: gx + 0.5, gy: gy + 0.5, r, tone: (rnd() * 3) | 0, ...canopy(kind, r, rnd) })
        }
        continue
      }
      if (taken.has(key(gx, gy))) continue
      const roll = rnd()
      if (roll < 0.64) {
        let w = 1
        let d = 1
        // บางหลังยาวสองช่อง ผังจะได้ไม่เป็นลูกเต๋าขนาดเท่ากันเรียงทั้งแผง
        if (rnd() < 0.3 && free(gx + 1, gy)) { w = 2; taken.add(key(gx + 1, gy)) }
        else if (rnd() < 0.3 && free(gx, gy + 1)) { d = 2; taken.add(key(gx, gy + 1)) }
        const lv = 1 + Math.floor(rnd() * MAX_LV)
        lots.push({
          gx, gy, w, d, lv,
          tone: (rnd() * 4) | 0,
          // ตึกชั้นเดียวไม่ค่อยมีห้องบันไดโผล่บนหลังคา ใส่เฉพาะตึกที่สูงพอ
          cap: lv >= 2 && rnd() < 0.55,
          capX: rnd(),
          capY: rnd(),
        })
      } else if (roll < 0.77) {
        const r = 4.4 + rnd() * 2
        const kind = rnd() < 0.32 ? 1 : rnd() < 0.18 ? 2 : 0
        groves.push({ gx: gx + 0.5, gy: gy + 0.5, r, tone: (rnd() * 3) | 0, ...canopy(kind, r, rnd) })
      }
      taken.add(key(gx, gy))
    }
  }
  return { LOTS: lots, GROVES: groves }
})()

/** ความต้องการกี่เท่าของความจุถึงถือว่า "แดงเต็มที่"
    1.5 = ต้องการมากกว่าที่มีครึ่งหนึ่ง ซึ่งถือว่าวิกฤตแล้วสำหรับผังคณะ */
const HEAT_FULL = 1.5

const HEAT_BLOB_ABS = 0.34
const HEAT_BLOB_REL = 0.5

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))
const safe = (n: number, dflt: number) => (Number.isFinite(n) && n > 0 ? n : dflt)

const hhmm = (h: number) => {
  const hh = Math.floor(h)
  const mm = Math.round((h - hh) * 60)
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
}

/** ระฆังคว่ำรอบจุดยอด — ใช้ทั้งเส้นรวมและเส้นรายประเภท */
const bell = (t: number, center: number) => {
  const d = t - center
  const spread = d < 0 ? SPREAD_BEFORE : SPREAD_AFTER
  return Math.exp(-(d * d) / (2 * spread * spread))
}

/* ─────────────────────────── ตัวรายงาน ─────────────────────────── */

export function facultyReport(input: FacultyInput): FacultyReport {
  const peakDef = FAC_PEAK_MAP[input.peak] ?? FAC_PEAK_MAP.midday
  const focus = input.focus.length ? input.focus : (['learning', 'space'] as FacFocusId[])
  const has = (id: FacFocusId) => focus.includes(id)

  const students = Math.max(safe(input.students, 2500), 1)
  const rooms = Math.max(Math.round(safe(input.rooms, 35)), 1)
  const activities = Math.max(Math.round(safe(input.activities, 80)), 1)

  const scDef = FAC_SCENARIO_MAP[input.scenario] ?? FAC_SCENARIOS[0]

  /* ── ภาพรวมตอนพีค ── */

  const peakWindow = `${hhmm(peakDef.center - peakDef.half)} – ${hhmm(peakDef.center + peakDef.half)}`
  const peakConcurrent = Math.round(students * peakDef.concurrency)

  // พื้นที่รองรับได้พร้อมกันกี่คน — ห้องเรียนคละขนาด เฉลี่ยทั้งคณะ
  const capacity = rooms * SEATS_PER_ROOM
  // ตารางแน่นขึ้น = พื้นที่ว่างให้สลับน้อยลง ความต้องการจริงจึงสูงกว่าจำนวนคนดิบ
  const scheduleTension = clamp(activities / (rooms * SLOTS_PER_ROOM), 0.6, 1.8)
  const spaceLoadPct = Math.round((peakConcurrent / capacity) * scheduleTension * 100)

  /* ── ความหนาแน่นรายพื้นที่ ──
     จัดพื้นที่เป็นกลุ่มตามประเภท แล้วให้แต่ละกลุ่มแบ่งความต้องการกับความจุตามสัดส่วนของมัน
     กลุ่มที่ได้ความต้องการมากกว่าความจุ = กลุ่มที่ขึ้นสีแดงก่อน */
  const kindLoad = SPACE_KINDS.map(k => ({
    k,
    load: (spaceLoadPct / 100) * (k.demandShare / k.capacityShare),
  }))
  const maxLoad = Math.max(...kindLoad.map(x => x.load), 0.01)

  const zones: FacZone[] = kindLoad.map(({ k, load }) => {
    const rel = clamp(load / maxLoad, 0.12, 1)
    return {
      th: k.th,
      load: rel,
      color: k.color,
      heatColor: heatColor(rel),
      rooms: Math.max(1, Math.round(rooms * k.capacityShare)),
    }
  })

  const tightest = kindLoad.reduce((a, b) => (b.load > a.load ? b : a))
  const tightKindTh = tightest.k.th

  /* ── ผังคณะไอโซเมตริก ──
     ความร้อนของก้อน = ความหนาแน่นของประเภทที่ก้อนนั้นเป็นตัวแทน
     บวกความต่างเล็กน้อยตามตำแหน่ง ให้ผังไม่ดูเป็นบล็อกสีเดียวกันทั้งแถว

     ใช้ load ดิบ ไม่หารด้วย maxLoad เหมือนตาราง 07 เพราะผังต้องตอบว่า
     "แน่นจริงไหม" ไม่ใช่ "แน่นกว่าใคร" — ถ้าหารด้วยตัวมากสุด ประเภทที่ร้อนที่สุด
     จะได้ 1.0 ทุกครั้งแม้ทั้งคณะจะโล่ง ผังก็จะหน้าตาเหมือนเดิมไม่ว่ากรอกเลขอะไร
     load = 1 คือความต้องการเท่าความจุพอดี

     ที่ต้องหารด้วย HEAT_FULL ก่อน เพราะถ้า clamp ที่ load = 1 ตรง ๆ สีจะชนเพดาน
     ทันทีที่ความต้องการเกินความจุนิดเดียว คณะที่ยุ่งตามปกติกับคณะที่ล้นจริง ๆ
     จะได้สีแดงเท่ากันหมด แล้วไล่สีสามระดับก็เหลือใช้จริงระดับเดียว */
  const heatOf = (kind: number) => clamp(kindLoad[kind].load / HEAT_FULL, 0.05, 1)

  /* ── เรขาคณิตของผัง ── */
  const originX = GRID_N * TW
  // เว้นหัวกรอบเท่าตึกที่สูงที่สุด ไม่งั้นยอดตึกแถวบนโผล่พ้นกรอบ
  const padTop = MAX_LV * LEVEL + TH
  const campusBox = {
    w: Math.round(2 * GRID_N * TW),
    h: Math.round(padTop + 2 * GRID_N * TH),
  }
  /** ฉายพิกัดกริดเป็นพิกัดจอ — lift คือความสูงเหนือพื้น */
  const px = (gx: number, gy: number) => Math.round((originX + (gx - gy) * TW) * 10) / 10
  const py = (gx: number, gy: number, lift = 0) => Math.round((padTop + (gx + gy) * TH - lift) * 10) / 10
  const P = (gx: number, gy: number, lift = 0) => `${px(gx, gy)},${py(gx, gy, lift)}`

  const campusGround = [P(0, 0), P(GRID_N, 0), P(GRID_N, GRID_N), P(0, GRID_N)].join(' ')
  /* ── ถนน ──
     ช่องถนนหนึ่งช่องแบ่งเป็นทางเท้าสองฝั่งกับผิวถนนตรงกลาง แล้วค่อยตีเส้น
     ที่ต้องแยกทางเท้ากับผิวถนน เพราะถ้าเป็นแถบสีเดียวทั้งช่อง มันจะอ่านเป็น
     "ช่องว่างระหว่างบล็อก" ไม่ใช่ถนน พอมีขอบทางเท้าคั่น สมองถึงเห็นเป็นถนน */
  const STREETS: number[] = []
  for (let st = BLOCK - 1; st < GRID_N; st += BLOCK) STREETS.push(st)
  /** ความกว้างทางเท้าแต่ละฝั่ง (หน่วยช่องกริด) */
  const CURB = 0.2
  /** v อยู่ในแนวถนนอีกทางไหม — ใช้เว้นไม่ให้ตีเส้นแบ่งเลนผ่านกลางสี่แยก */
  const atCross = (v: number) => STREETS.some(t => v >= t - 0.05 && v <= t + 1.05)

  const campusStreets: string[] = []
  const campusRoads: string[] = []
  const campusLanes: string[] = []
  const campusCrossings: string[] = []

  for (const st of STREETS) {
    campusStreets.push([P(st, 0), P(st + 1, 0), P(st + 1, GRID_N), P(st, GRID_N)].join(' '))
    campusStreets.push([P(0, st), P(GRID_N, st), P(GRID_N, st + 1), P(0, st + 1)].join(' '))
    const a = st + CURB
    const b = st + 1 - CURB
    campusRoads.push([P(a, 0), P(b, 0), P(b, GRID_N), P(a, GRID_N)].join(' '))
    campusRoads.push([P(0, a), P(GRID_N, a), P(GRID_N, b), P(0, b)].join(' '))

    // เส้นแบ่งเลนแบบประ เว้นช่วงที่ตัดผ่านสี่แยก
    const c0 = st + 0.5 - 0.035
    const c1 = st + 0.5 + 0.035
    for (let v = 0; v < GRID_N; v += 0.7) {
      const v2 = Math.min(v + 0.34, GRID_N)
      if (atCross(v) || atCross(v2)) continue
      campusLanes.push([P(c0, v), P(c1, v), P(c1, v2), P(c0, v2)].join(' '))
      campusLanes.push([P(v, c0), P(v, c1), P(v2, c1), P(v2, c0)].join(' '))
    }
  }

  // ทางม้าลายวางก่อนถึงสี่แยก ฝั่งละหนึ่งเส้น
  const CW = 4
  const lane = (k: number, base: number) => {
    const w = 1 - CURB * 2
    return [base + CURB + (w * (k + 0.18)) / CW, base + CURB + (w * (k + 0.72)) / CW]
  }
  for (const sx of STREETS) {
    for (const sy of STREETS) {
      if (sy - 0.42 > 0) {
        for (let k = 0; k < CW; k++) {
          const [u0, u1] = lane(k, sx)
          campusCrossings.push([P(u0, sy - 0.42), P(u1, sy - 0.42), P(u1, sy - 0.16), P(u0, sy - 0.16)].join(' '))
        }
      }
      if (sx - 0.42 > 0) {
        for (let k = 0; k < CW; k++) {
          const [v0, v1] = lane(k, sy)
          campusCrossings.push([P(sx - 0.42, v0), P(sx - 0.42, v1), P(sx - 0.16, v1), P(sx - 0.16, v0)].join(' '))
        }
      }
    }
  }

  const kindAt = (gx: number, gy: number) => BLOCK_KIND[blockOf(gy) * 3 + blockOf(gx)] ?? 0
  const heatAt = (gx: number, gy: number) => {
    // ใจกลางคณะร้อนกว่าขอบเล็กน้อย คนเดินผ่านลานกลางมากกว่าริมรั้ว
    const mid = (GRID_N - 1) / 2
    const near = 1 - (Math.abs(gx - mid) + Math.abs(gy - mid)) / (GRID_N * 1.1)
    return clamp(heatOf(kindAt(gx, gy)) * (0.82 + 0.18 * near), 0.05, 1)
  }

  /* อาคารกับต้นไม้อยู่ลิสต์เดียวกัน เพราะต้องวาดเรียงตามระยะลึกสลับกันไป
     ถ้าแยกวาดทีละชนิด ต้นไม้แถวหลังจะไปทับตึกแถวหน้า */
  const campusItems: FacItem[] = []
  /** กล่องไอโซเมตริกหนึ่งใบ — base คือความสูงของฐานกล่องเหนือพื้น */
  const box = (gx0: number, gy0: number, gx1: number, gy1: number, base: number, h: number) => ({
    top: [P(gx0, gy0, base + h), P(gx1, gy0, base + h), P(gx1, gy1, base + h), P(gx0, gy1, base + h)].join(' '),
    right: [P(gx1, gy0, base + h), P(gx1, gy1, base + h), P(gx1, gy1, base), P(gx1, gy0, base)].join(' '),
    left: [P(gx1, gy1, base + h), P(gx0, gy1, base + h), P(gx0, gy1, base), P(gx1, gy1, base)].join(' '),
  })

  for (const l of LOTS) {
    const x0 = l.gx + INSET
    const y0 = l.gy + INSET
    const x1 = l.gx + l.w - INSET
    const y1 = l.gy + l.d - INSET
    const h = l.lv * LEVEL

    /* ── หน้าต่าง ──
       หนึ่งแถวต่อหนึ่งชั้น กว้างตามหน้าตึก ตึกยาวสองช่องจึงได้หน้าต่างมากกว่า
       หน้าต่างอยู่ในระนาบเดียวกับผนัง จึงฉายออกมาเป็นสี่เหลี่ยมด้านขนาน ไม่ใช่สี่เหลี่ยมมุมฉาก */
    const winAt = (span: number, mk: (u0: number, u1: number, v0: number, v1: number) => string) => {
      const out: string[] = []
      const n = Math.max(1, Math.round(span * 2.4))
      const step = span / n
      for (let lv = 0; lv < l.lv; lv++) {
        const v0 = lv * LEVEL + LEVEL * 0.32
        const v1 = lv * LEVEL + LEVEL * 0.74
        for (let c = 0; c < n; c++) {
          out.push(mk(step * (c + 0.26), step * (c + 0.74), v0, v1))
        }
      }
      return out
    }

    const cap = l.cap ? 0.26 : 0
    const capX = x0 + (x1 - x0 - cap) * l.capX
    const capY = y0 + (y1 - y0 - cap) * l.capY
    const ri = 0.07

    campusItems.push({
      t: 'b',
      d: l.gx + l.gy,
      lv: l.lv,
      tone: l.tone,
      district: blockOf(l.gy) * 3 + blockOf(l.gx),
      gx: x0,
      gy: y0,
      gw: x1 - x0,
      gd: y1 - y0,
      heat: Math.round(heatAt(l.gx, l.gy) * 100) / 100,
      kindTh: SPACE_KINDS[kindAt(l.gx, l.gy)].th,
      faceTop: [P(x0, y0, h), P(x1, y0, h), P(x1, y1, h), P(x0, y1, h)].join(' '),
      faceRight: [P(x1, y0, h), P(x1, y1, h), P(x1, y1), P(x1, y0)].join(' '),
      faceLeft: [P(x1, y1, h), P(x0, y1, h), P(x0, y1), P(x1, y1)].join(' '),
      roofIn: [P(x0 + ri, y0 + ri, h), P(x1 - ri, y0 + ri, h), P(x1 - ri, y1 - ri, h), P(x0 + ri, y1 - ri, h)].join(' '),
      // หน้าซ้ายอยู่ที่ gy = y1 ไล่ไปตามแกน gx · หน้าขวาอยู่ที่ gx = x1 ไล่ไปตามแกน gy
      winLeft: winAt(x1 - x0, (u0, u1, v0, v1) =>
        [P(x0 + u0, y1, v1), P(x0 + u1, y1, v1), P(x0 + u1, y1, v0), P(x0 + u0, y1, v0)].join(' ')),
      winRight: winAt(y1 - y0, (u0, u1, v0, v1) =>
        [P(x1, y0 + u0, v1), P(x1, y0 + u1, v1), P(x1, y0 + u1, v0), P(x1, y0 + u0, v0)].join(' ')),
      roofBox: l.cap ? box(capX, capY, capX + cap, capY + cap, h, LEVEL * 0.6) : null,
    })
  }
  for (const g of GROVES) {
    const x = px(g.gx, g.gy)
    const y = py(g.gx, g.gy)
    const r1 = (n: number) => Math.round(n * 10) / 10
    // ลำต้นเป็นทรงสอบขึ้น ถ้าเป็นสี่เหลี่ยมตรง ๆ จะดูเป็นเสาไม้ ไม่ใช่ต้นไม้
    const tw = g.r * 0.17
    campusItems.push({
      t: 'g',
      d: g.gx + g.gy,
      gx: g.gx,
      gy: g.gy,
      gr: Math.round((g.r / TW) * 1000) / 1000,
      tone: g.tone,
      x,
      y,
      r: r1(g.r),
      trunk: r1(g.trunk),
      trunkPts: g.trunk
        ? [
            `${r1(x - tw)},${r1(y)}`,
            `${r1(x + tw)},${r1(y)}`,
            `${r1(x + tw * 0.62)},${r1(y - g.trunk)}`,
            `${r1(x - tw * 0.62)},${r1(y - g.trunk)}`,
          ].join(' ')
        : '',
      puffs: g.puffs.map(q => ({ cx: r1(x + q.dx), cy: r1(y + q.dy), r: r1(q.r), l: q.l })),
    })
  }
  campusItems.sort((m, n) => m.d - n.d)

  /* ── ดวงความหนาแน่น ──
     ดวงใหญ่หนึ่งดวงกลางบล็อกที่ร้อนพอ แล้วแต้มดวงเล็กเยื้องออกไปอีกสองจุด
     ที่ต้องมีดวงเล็กเพราะดวงเดียวจะออกมาเป็นวงรีเรียบ ดูเป็นสติกเกอร์แปะ
     พอซ้อนกันหลายดวงขอบจะขรุขระ อ่านเป็นความร้อนที่แผ่จากย่าน */
  const blockHeat = BLOCK_KIND.map((_, i) =>
    heatAt((i % 3) * BLOCK + 1, ((i / 3) | 0) * BLOCK + 1))
  const heatLo = Math.min(...blockHeat)
  const heatHi = Math.max(...blockHeat)
  // ผังที่ร้อนเท่ากันหมดไม่มี "จุด" ให้ชี้ ปล่อยให้ด่านสัมบูรณ์ตัดสินอย่างเดียว
  const relGate = heatHi - heatLo < 0.02 ? 0 : heatLo + HEAT_BLOB_REL * (heatHi - heatLo)
  const gate = Math.max(HEAT_BLOB_ABS, relGate)
  const tierOf = (h: number): FacHeatZone['tier'] => (h >= 0.78 ? 'Hot' : h >= 0.52 ? 'Warm' : 'Mild')

  const campusHeat: FacHeatZone[] = []
  const brnd = seeded(4127)
  blockHeat.forEach((h, i) => {
    if (h < gate) return
    const t = clamp((h - HEAT_BLOB_ABS) / (1 - HEAT_BLOB_ABS), 0, 1)
    const cx = (i % 3) * BLOCK + 1
    const cy = ((i / 3) | 0) * BLOCK + 1
    const blobs: FacHeatBlob[] = []
    const puff = (gx: number, gy: number, cells: number, op: number) => {
      const rx = Math.round(cells * TW * 10) / 10
      blobs.push({
        x: px(gx, gy),
        // ยกแค่พอพ้นพื้นถนน ถ้ายกสูงเท่าตึก ดวงจะลอยเหนือหลังคาจนดูหลุดจากย่าน
        y: py(gx, gy, LEVEL * 0.9),
        rx,
        ry: Math.round(rx * 0.58 * 10) / 10,
        opacity: Math.round(op * 100) / 100,
      })
    }
    // ดวงหลักทึบเกือบเต็ม ปล่อยให้ชั้นอัลฟาในตัวไล่สีเป็นคนคุมความจางเอง
    // ถ้าหรี่ opacity ของดวงด้วย แกนแดงจะโดนหรี่ซ้ำสองชั้นจนกลายเป็นส้มจาง
    puff(cx, cy, 1.5 + t * 0.5, 0.94 + t * 0.06)
    /* ดวงบริวารคละขนาด ทำให้ขอบรวมเป็นก้อนเบี้ยว ไม่ใช่วงรีสมมาตร
       แต่ต้องเกาะใกล้ดวงหลัก ถ้าเหวี่ยงออกไกล ย่านที่ติดกันจะลามมาเชื่อมกันเอง
       จนผังกลายเป็นปื้นเดียวทั้งแผ่น แล้วก็อ่านไม่ออกอีกว่าตรงไหนแน่นกว่าตรงไหน */
    for (let k = 0; k < 4; k++) {
      const ang = (k / 4) * Math.PI * 2 + brnd() * 1.4
      const dist = 0.5 + brnd() * 0.75
      puff(
        cx + Math.cos(ang) * dist,
        cy + Math.sin(ang) * dist,
        0.6 + brnd() * 0.5,
        0.62 + t * 0.3,
      )
    }
    campusHeat.push({
      tier: tierOf(h),
      // ค่าติดลบทำให้แต่ละย่านเริ่มที่คนละจุดของคาบตั้งแต่เฟรมแรก
      // ถ้าเริ่มที่ 0 เหมือนกันหมด จังหวะแรกจะเห็นทั้งผังวาบพร้อมกัน
      delay: -Math.round(i * 0.53 * 100) / 100,
      blobs,
    })
  })

  const hotB = blockHeat.reduce((best, v, i) => (v > blockHeat[best] ? i : best), 0)
  const campusRing = {
    x: px((hotB % 3) * BLOCK + 1, ((hotB / 3) | 0) * BLOCK + 1),
    y: py((hotB % 3) * BLOCK + 1, ((hotB / 3) | 0) * BLOCK + 1, LEVEL * 0.9),
  }
  const campusHot = {
    x: Math.round((campusRing.x / campusBox.w) * 1000) / 10,
    y: Math.round((campusRing.y / campusBox.h) * 1000) / 10,
  }

  const hours: { at: number; value: number; label: string }[] = []
  for (let t = OPEN_FROM; t <= OPEN_TO + 1e-9; t += STEP) {
    hours.push({
      at: Math.round(t * 10) / 10,
      value: Math.round(bell(t, peakDef.center) * 1000) / 1000,
      label: Number.isInteger(t) && t % 2 === 0 ? `${t}:00` : '',
    })
  }

  /* ── ตอนนี้กำลังเกิดอะไร ── */

  const rawHour = input.nowHour ?? peakDef.center
  const nowHour = clamp(Math.round(rawHour), OPEN_FROM, Math.floor(OPEN_TO))
  const nowLabel = hhmm(nowHour)
  const nowBusy = bell(nowHour, peakDef.center)
  const nowTh =
    nowBusy >= 0.7
      ? `${tightKindTh}กำลังถูกใช้หนักที่สุด ${peakDef.becauseTh} ขณะที่พื้นที่ประเภทอื่นยังรับได้อีก`
      : `ยังไม่ถึงช่วงที่ความต้องการสูงที่สุด (${peakWindow}) ตอนนี้ยังจัดพื้นที่ได้คล่อง`

  /* ── ข้อความเปิดแผง 05 ── */

  const insightTh =
    spaceLoadPct >= 85
      ? `ความต้องการพื้นที่กำลังสูงเกินสิ่งที่คณะมี โดยกระจุกที่${tightKindTh}ในช่วง ${peakWindow}`
      : `ความต้องการพื้นที่ที่ไม่ได้สูงทั้งคณะ แต่กำลังกระจุกตัวในบางพื้นที่และบางช่วงเวลา`

  /* ── ความสัมพันธ์ที่พบ (แผง 06) ──
     สี่โหนดนี้คือห่วงโซ่ที่คณะควบคุมได้จริง: ตารางเรียนเป็นต้นทาง
     ส่วนการใช้ทรัพยากรเป็นปลายทางที่เห็นเป็นบิลค่าไฟและคิวบริการ */
  const relations: FacRelation[] = [
    { icon: 'calendar', th: 'ตารางเรียน',           en: 'Class Schedule',   color: '#a78bfa' },
    { icon: 'users',    th: 'การเคลื่อนย้ายนักศึกษา', en: 'Student Movement', color: '#c084fc' },
    { icon: 'building', th: 'ความต้องการพื้นที่',     en: 'Space Demand',     color: '#818cf8' },
    { icon: 'layers',   th: 'การใช้ทรัพยากร',        en: 'Resource Usage',   color: '#38bdf8' },
  ]

  const mayHappenTh =
    `ช่วงเปลี่ยนคาบเรียนทำให้ความต้องการพื้นที่กระจุกตัวในบางพื้นที่ ` +
    `และประเภทกิจกรรมมากกว่า Capacity โดยรวมของคณะ` +
    (has('resources') ? ' ทรัพยากรและบริการจึงถูกเรียกใช้พร้อมกันในเวลาเดียว' : '') +
    (has('energy') ? ' และดันค่าไฟให้ขึ้นเป็นยอดแหลมแทนที่จะเรียบทั้งวัน' : '')

  /* ── จำลองสถานการณ์ (แผง 07) ── */

  // "กำหนดเอง" ใช้ตัวเลขจากสไลเดอร์แทนค่าคงที่ของการ์ด
  const cs = input.custom
  const scPeople = scDef.id === 'custom' && cs ? 1 + cs.people / 100 : scDef.people
  const scActivity = scDef.id === 'custom' && cs ? 1 + cs.activity / 100 : scDef.activity

  // ความต้องการตอนพีคหลังปรับ = คนเพิ่ม (แบบไม่เชิงเส้น) × กิจกรรมเพิ่ม ÷ พื้นที่ที่ยังใช้ได้
  const elasticity = 1 + PEOPLE_ELASTICITY * scheduleTension
  const simFactor = (Math.pow(scPeople, elasticity) * scActivity) / scDef.usable
  const simDeltaPct = Math.round((simFactor - 1) * 100)

  const series: FacSeries[] = SPACE_KINDS.map(k => {
    const headroom = k.demandShare / k.capacityShare
    return {
      th: k.th,
      color: k.color,
      points: hours.map(h => ({
        at: h.at,
        // เพดาน 3 เท่าของความจุเป็นแค่กันค่าหลุดตอนลากสไลเดอร์สุดทาง
        // ไม่ใช่เพดานของกราฟ — แกน Y ยืดตามค่าจริง (ดู facChart) ยอดเส้นจึงไม่ถูกตัดแบน
        value:
          Math.round(
            clamp(
              bell(h.at, peakDef.center + k.offset) * (spaceLoadPct / 100) * headroom * simFactor,
              0,
              3,
            ) * 1000,
          ) / 1000,
      })),
    }
  })

  // แรงกดดันเริ่มตรงที่เส้นของประเภทที่ตึงที่สุดแตะ 100% ของความจุประเภทนั้น
  const tightSeries = series[SPACE_KINDS.indexOf(tightest.k)]
  const over = tightSeries.points.filter(p => p.value >= 1)
  const pressureFrom = over.length ? over[0].at : peakDef.center - peakDef.half
  const pressureTo = over.length ? over[over.length - 1].at : peakDef.center + peakDef.half
  const pressureTh = `เกิด Pressure ก่อนใน${tightKindTh} (${hhmm(pressureFrom)} – ${hhmm(pressureTo)})`

  /* ── ข้อเสนอแนะ (แผง 08) ── */

  const recTitleTh = 'กระจายความต้องการใช้พื้นที่ ก่อนการเพิ่ม Capacity'

  const whyTh =
    `ความต้องการใช้พื้นที่เชื่อมโยงกับช่วงเวลาเรียนและประเภทกิจกรรม ` +
    `มากกว่า Capacity โดยรวม — ${tightKindTh}เต็มก่อนทั้งที่พื้นที่รวมของคณะยังเหลือ`

  const actionTh =
    `ปรับตาราง การใช้พื้นที่ และการจัดกิจกรรมให้กระจายตัวมากขึ้น` +
    (has('activity') ? ' โดยเลื่อนกิจกรรมนักศึกษาออกจากช่วงเปลี่ยนคาบ' : '') +
    (has('learning') ? ' และสลับคาบที่ใช้พื้นที่ประเภทเดียวกันให้ไม่ชนกัน' : '')

  const impactTh =
    `ลดความหนาแน่นในช่วง Peak ทำให้พื้นที่ที่มีอยู่มีประสิทธิภาพ ` +
    `รองรับกิจกรรมได้มากขึ้น โดยยังไม่ต้องเพิ่มพื้นที่ทันที`

  return {
    students,
    rooms,
    activities,
    peakWindow,
    insightTh,
    peakConcurrent,
    spaceLoadPct,
    zones,
    campusItems,
    campusGround,
    campusStreets,
    campusRoads,
    campusLanes,
    campusCrossings,
    campusRing,
    campusBox,
    campusHot,
    campusHeat,
    hours,
    nowHour,
    nowLabel,
    nowTh,

    relations,
    mayHappenTh,

    simDeltaPct,
    series,
    pressureFrom,
    pressureTo,
    pressureTh,
    tightKindTh,

    recTitleTh,
    whyTh,
    actionTh,
    impactTh,
  }
}
