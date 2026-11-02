/**
 * MOMAY Surprise — โมเดลคำนวณของหน้า /MomayDemoV2
 *
 * ทุกตัวเลขบนหน้า 05–08 คำนวณจาก 3 ค่าที่ผู้ใช้กรอกในหน้า 02
 * (จำนวนคน / ความจุ / ค่าไฟ) ร่วมกับ signal ที่เลือก และช่วงเวลาที่หนาแน่น
 *
 * ── จะเปลี่ยนสมการต่อองค์กร แก้ที่ ORG_TYPES[x].model ได้เลย ──
 * ค่าใน DEFAULT_MODEL ถูกคาลิเบรตให้เทศบาล (2,500 / 180 / 120,000 / กลางวัน)
 * ได้ผลลัพธ์ People 92% · Parking 86% · Energy 78% · Traffic 73% · Waste 69%
 */

export type OrgId = 'municipality' | 'university' | 'hotel' | 'business' | 'library' | 'other'
export type SignalId = 'people' | 'traffic' | 'parking' | 'energy' | 'waste' | 'events'
export type PeakId = 'morning' | 'midday' | 'evening' | 'event'
export type ScenarioId = 'normal' | 'weekend' | 'event'
export type InputKey = 'people' | 'capacity' | 'energy'

/* ─────────────────────────── signals ─────────────────────────── */

export interface SignalDef {
  id: SignalId
  en: string
  th: string
  icon: string
  color: string
  /** metric นี้แสดงเป็น % (people แสดงเป็นจำนวนคนบนการ์ดสรุป) */
  unit: '%' | 'count'
  metricTh: string
}

export const SIGNALS: SignalDef[] = [
  { id: 'people',  en: 'People',  th: 'จำนวนคน',        icon: 'user',     color: '#34d399', unit: 'count', metricTh: 'คนที่ใช้พื้นที่ต่อวัน' },
  { id: 'traffic', en: 'Traffic', th: 'การจราจร',       icon: 'car',      color: '#38bdf8', unit: '%',     metricTh: 'รถบนถนนเทียบที่รับได้' },
  { id: 'parking', en: 'Parking', th: 'ที่จอดรถ',        icon: 'parking',  color: '#3b82f6', unit: '%',     metricTh: 'ที่จอดรถที่ถูกใช้ไป' },
  { id: 'energy',  en: 'Energy',  th: 'พลังงาน / ค่าไฟ', icon: 'bolt',     color: '#fbbf24', unit: '%',     metricTh: 'ไฟที่ใช้เทียบกำลังที่มี' },
  { id: 'waste',   en: 'Waste',   th: 'ขยะ',            icon: 'trash',    color: '#2dd4bf', unit: '%',     metricTh: 'ขยะเทียบกำลังที่เก็บไหว' },
  { id: 'events',  en: 'Events',  th: 'กิจกรรม / งาน',   icon: 'calendar', color: '#a78bfa', unit: '%',     metricTh: 'ภาระในวันที่มีงาน' },
]

export const SIGNAL_MAP: Record<SignalId, SignalDef> =
  Object.fromEntries(SIGNALS.map(s => [s.id, s])) as Record<SignalId, SignalDef>

/* ─────────────────────────── peak windows ─────────────────────────── */

export interface PeakDef {
  id: PeakId
  th: string
  /** สัดส่วนคนทั้งวันที่กระจุกอยู่ในช่วงพีค */
  share: number
  window: string
}

export const PEAKS: PeakDef[] = [
  { id: 'morning', th: 'เช้า',       share: 0.30, window: '07:00 - 10:00' },
  { id: 'midday',  th: 'กลางวัน',    share: 0.34, window: '10:00 - 14:00' },
  { id: 'evening', th: 'เย็น',       share: 0.32, window: '16:00 - 19:00' },
  { id: 'event',   th: 'ช่วงจัดงาน', share: 0.42, window: '17:00 - 21:00' },
]

export const PEAK_MAP: Record<PeakId, PeakDef> =
  Object.fromEntries(PEAKS.map(p => [p.id, p])) as Record<PeakId, PeakDef>

/* ─────────────────────────── scenarios ─────────────────────────── */

export interface ScenarioFactors {
  people: number
  traffic: number
  energy: number
  waste: number
}

export interface ScenarioDef {
  id: ScenarioId
  en: string
  th: string
}

export const SCENARIOS: ScenarioDef[] = [
  { id: 'normal',  en: 'Normal Day', th: 'วันปกติ' },
  { id: 'weekend', en: 'Weekend',    th: 'วันหยุด' },
  { id: 'event',   en: 'Event Day',  th: 'วันมีงาน' },
]

/* ─────────────────────────── equation block ─────────────────────────── */

export interface MomayModel {
  /** คันรถต่อผู้ใช้พื้นที่ 1 คนในช่วงพีค */
  vehiclesPerPerson: number
  /** รอบการใช้ช่องจอด 1 ช่องตลอดช่วงพีค */
  parkingTurnover: number
  /** การจราจรผูกกับปริมาณรถเข้าพื้นที่ */
  trafficCoupling: number
  /** คนที่พื้นที่รองรับได้ต่อ 1 หน่วยความจุ ในช่วงพีค */
  peopleCapacityPerUnit: number
  /** เกณฑ์อ้างอิงค่าไฟ บาท/คน/เดือน */
  energyBenchmarkPerPerson: number
  /** peak share ที่ใช้เป็นฐานของเกณฑ์ค่าไฟ */
  energyPeakReference: number
  /** สัดส่วน base load ที่ไม่ผันตามจำนวนคน */
  energyBaseLoadShare: number
  /** ปริมาณขยะผูกกับความหนาแน่นของคน */
  wasteCoupling: number
  /** แรงกดดันจากกิจกรรมผูกกับความหนาแน่นของคน */
  eventsCoupling: number
  /** ตัวคูณรายสถานการณ์ (หน้า 07) */
  scenarios: Record<ScenarioId, ScenarioFactors>
}

export const DEFAULT_MODEL: MomayModel = {
  vehiclesPerPerson: 0.40,
  parkingTurnover: 2.2,
  trafficCoupling: 0.85,
  peopleCapacityPerUnit: 5.13,
  energyBenchmarkPerPerson: 60,
  energyPeakReference: 0.35,
  energyBaseLoadShare: 0.17,
  wasteCoupling: 0.75,
  eventsCoupling: 0.62,
  scenarios: {
    normal:  { people: 1.00, traffic: 1.00, energy: 1.00, waste: 1.00 },
    weekend: { people: 0.80, traffic: 0.90, energy: 0.92, waste: 0.95 },
    event:   { people: 1.35, traffic: 1.15, energy: 1.05, waste: 1.20 },
  },
}

/* ─────────────────────────── org types ─────────────────────────── */

export interface FieldDef {
  key: InputKey
  icon: string
  label: string
  note: string
  unit: string
  hint: string
  default: number
}

export interface OrgDef {
  id: OrgId
  en: string
  th: string
  icon: string
  /** ภาพพื้นหลังหน้า 01 ของหมวดนี้ */
  photo: string
  /** หัวข้อหน้า 02: "about your ___" */
  subject: string
  fields: Record<InputKey, FieldDef>
  model: MomayModel
}

const baseFields = (): Record<InputKey, FieldDef> => ({
  people: {
    key: 'people', icon: 'user',
    label: 'จำนวนคนใช้พื้นที่ต่อวัน', note: '(ประมาณการ)',
    unit: 'คน / วัน', hint: 'เช่น ประชาชน นักท่องเที่ยว เจ้าหน้าที่', default: 2500,
  },
  capacity: {
    key: 'capacity', icon: 'car',
    label: 'จำนวนที่จอดรถ', note: '(ทั้งหมด)',
    unit: 'ช่องจอด', hint: 'รวมที่จอดรถทั้งหมดในพื้นที่', default: 180,
  },
  energy: {
    key: 'energy', icon: 'bolt',
    label: 'ค่าไฟเฉลี่ยต่อเดือน', note: '(ประมาณการ)',
    unit: 'บาท / เดือน', hint: 'ค่าไฟรวมของอาคารและระบบสาธารณะ', default: 120000,
  },
})

/** ผสมสมการ: เริ่มจาก DEFAULT_MODEL แล้ว override เฉพาะตัวที่ต่าง */
const model = (over: Partial<MomayModel> = {}): MomayModel => ({
  ...DEFAULT_MODEL,
  ...over,
  scenarios: { ...DEFAULT_MODEL.scenarios, ...(over.scenarios ?? {}) },
})

const withFields = (over: Partial<Record<InputKey, Partial<FieldDef>>>): Record<InputKey, FieldDef> => {
  const f = baseFields()
  for (const k of Object.keys(over) as InputKey[]) Object.assign(f[k], over[k])
  return f
}

export const ORG_TYPES: OrgDef[] = [
  {
    id: 'municipality', en: 'Municipality', th: 'เทศบาล / องค์กรปกครองส่วนท้องถิ่น',
    icon: 'landmark', photo: '/momay/org-municipality.webp', subject: 'municipality',
    fields: baseFields(),
    model: model(),
  },
  {
    id: 'university', en: 'University / Faculty', th: 'มหาวิทยาลัย / คณะ',
    icon: 'cap', photo: '/momay/org-university.webp', subject: 'campus',
    fields: withFields({
      people: { label: 'จำนวนนิสิต / บุคลากรต่อวัน', hint: 'นิสิต อาจารย์ บุคลากร ผู้มาติดต่อ', default: 4000 },
      capacity: { default: 260 },
      energy: { hint: 'ค่าไฟรวมของอาคารเรียนและส่วนกลาง', default: 210000 },
    }),
    model: model({
      vehiclesPerPerson: 0.32,
      parkingTurnover: 1.8,
      peopleCapacityPerUnit: 7.5,
      energyBenchmarkPerPerson: 52,
      scenarios: {
        normal:  { people: 1.00, traffic: 1.00, energy: 1.00, waste: 1.00 },
        weekend: { people: 0.35, traffic: 0.40, energy: 0.65, waste: 0.45 },
        event:   { people: 1.55, traffic: 1.25, energy: 1.10, waste: 1.35 },
      },
    }),
  },
  {
    id: 'hotel', en: 'Hotel', th: 'โรงแรม / รีสอร์ท',
    icon: 'bed', photo: '/momay/org-hotel.webp', subject: 'property',
    fields: withFields({
      people: { label: 'จำนวนผู้เข้าพัก / ผู้ใช้บริการต่อวัน', hint: 'ผู้เข้าพัก ผู้ใช้ห้องประชุม พนักงาน', default: 320 },
      capacity: { icon: 'bed', label: 'จำนวนห้องพัก', note: '(ทั้งหมด)', unit: 'ห้อง', hint: 'ห้องพักทั้งหมดที่เปิดให้บริการ', default: 120 },
      energy: { hint: 'ค่าไฟรวมของอาคารและระบบปรับอากาศ', default: 260000 },
    }),
    model: model({
      vehiclesPerPerson: 0.45,
      parkingTurnover: 1.1,
      peopleCapacityPerUnit: 2.4,
      energyBenchmarkPerPerson: 780,
      energyBaseLoadShare: 0.35,
      wasteCoupling: 0.82,
      scenarios: {
        normal:  { people: 1.00, traffic: 1.00, energy: 1.00, waste: 1.00 },
        weekend: { people: 1.25, traffic: 1.15, energy: 1.10, waste: 1.20 },
        event:   { people: 1.40, traffic: 1.20, energy: 1.12, waste: 1.30 },
      },
    }),
  },
  {
    id: 'business', en: 'Business / Office', th: 'ธุรกิจ / สำนักงาน',
    icon: 'building', photo: '/momay/org-business.webp', subject: 'office',
    fields: withFields({
      people: { label: 'จำนวนพนักงาน / ผู้มาติดต่อต่อวัน', hint: 'พนักงานประจำ ผู้มาติดต่อ ผู้รับเหมา', default: 800 },
      capacity: { default: 150 },
      energy: { hint: 'ค่าไฟรวมของสำนักงานและระบบส่วนกลาง', default: 95000 },
    }),
    model: model({
      vehiclesPerPerson: 0.52,
      parkingTurnover: 1.3,
      peopleCapacityPerUnit: 4.2,
      energyBenchmarkPerPerson: 150,
      energyBaseLoadShare: 0.28,
      scenarios: {
        normal:  { people: 1.00, traffic: 1.00, energy: 1.00, waste: 1.00 },
        weekend: { people: 0.22, traffic: 0.25, energy: 0.55, waste: 0.30 },
        event:   { people: 1.30, traffic: 1.20, energy: 1.08, waste: 1.25 },
      },
    }),
  },
  {
    id: 'library', en: 'Library', th: 'ห้องสมุด',
    icon: 'book', photo: '/momay/org-library.webp', subject: 'library',
    fields: withFields({
      people: { label: 'จำนวนผู้เข้าใช้บริการต่อวัน', hint: 'ผู้อ่าน ผู้ใช้ห้องกลุ่ม เจ้าหน้าที่', default: 1200 },
      capacity: { icon: 'book', label: 'จำนวนที่นั่งอ่าน', note: '(ทั้งหมด)', unit: 'ที่นั่ง', hint: 'ที่นั่งอ่านและห้องศึกษากลุ่มรวมกัน', default: 300 },
      energy: { hint: 'ค่าไฟรวมของอาคารห้องสมุด', default: 78000 },
    }),
    model: model({
      vehiclesPerPerson: 0.28,
      parkingTurnover: 1.6,
      peopleCapacityPerUnit: 1.35,
      energyBenchmarkPerPerson: 78,
      energyBaseLoadShare: 0.30,
      wasteCoupling: 0.55,
      scenarios: {
        normal:  { people: 1.00, traffic: 1.00, energy: 1.00, waste: 1.00 },
        weekend: { people: 0.70, traffic: 0.70, energy: 0.85, waste: 0.75 },
        event:   { people: 1.45, traffic: 1.20, energy: 1.08, waste: 1.30 },
      },
    }),
  },
  {
    id: 'other', en: 'Other', th: 'อื่น ๆ',
    icon: 'hexagon', photo: '/momay/org-other.webp', subject: 'organization',
    fields: withFields({
      people: { label: 'จำนวนคนใช้พื้นที่ต่อวัน', hint: 'ผู้ใช้พื้นที่ทั้งหมดในหนึ่งวัน', default: 1000 },
      capacity: { label: 'ความจุหลักของพื้นที่', note: '(ช่องจอด / ที่นั่ง / ห้อง)', unit: 'หน่วย', hint: 'ความจุที่เป็นคอขวดของพื้นที่คุณ', default: 150 },
      energy: { default: 90000 },
    }),
    model: model(),
  },
]

export const ORG_MAP: Record<OrgId, OrgDef> =
  Object.fromEntries(ORG_TYPES.map(o => [o.id, o])) as Record<OrgId, OrgDef>

/* ─────────────────────────── engine ─────────────────────────── */

export interface Inputs {
  org: OrgId
  people: number
  capacity: number
  energy: number
  signals: SignalId[]
  peak: PeakId
}

export interface Metrics {
  /** ความหนาแน่นของคนช่วงพีค (%) */
  people: number
  traffic: number
  parking: number
  energy: number
  waste: number
  events: number
}

export interface Baseline {
  metrics: Metrics
  /** จำนวนคนช่วงพีค */
  peakPeople: number
  /** คันรถที่เข้าพื้นที่ช่วงพีค */
  peakVehicles: number
  peakWindow: string
  /** ค่าไฟต่อคนต่อเดือน */
  energyPerPerson: number
}

const round1 = (n: number) => Math.round(n * 10) / 10
const safe = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0)

export function computeBaseline(input: Inputs): Baseline {
  const org = ORG_MAP[input.org] ?? ORG_MAP.municipality
  const m = org.model
  const peakDef = PEAK_MAP[input.peak] ?? PEAK_MAP.midday
  const peak = peakDef.share

  const people = Math.max(safe(input.people), 1)
  const capacity = Math.max(safe(input.capacity), 1)
  const energy = Math.max(safe(input.energy), 0)

  const peakPeople = people * peak
  const peakVehicles = peakPeople * m.vehiclesPerPerson
  const parkingSupply = capacity * m.parkingTurnover

  const parking = (peakVehicles / parkingSupply) * 100
  const traffic = parking * m.trafficCoupling
  const peopleLoad = (peakPeople / (capacity * m.peopleCapacityPerUnit)) * 100
  const energyPerPerson = energy / people
  const energyLoad =
    (energyPerPerson / m.energyBenchmarkPerPerson) * (peak / m.energyPeakReference) * 100

  return {
    metrics: {
      people: round1(peopleLoad),
      traffic: round1(traffic),
      parking: round1(parking),
      energy: round1(energyLoad),
      waste: round1(peopleLoad * m.wasteCoupling),
      events: round1(peopleLoad * m.eventsCoupling),
    },
    peakPeople: Math.round(peakPeople),
    peakVehicles: Math.round(peakVehicles),
    peakWindow: peakDef.window,
    energyPerPerson: round1(energyPerPerson),
  }
}

export interface Simulation {
  /** ตัวคูณจำนวนคนรวม (slider × scenario) */
  growth: number
  peopleCount: number
  metrics: Metrics
}

/**
 * หน้า 07 — ปรับจำนวนผู้ใช้พื้นที่ ±% แล้วขยายผลจากค่าฐาน
 * พลังงานเป็นแบบ base load + variable load จึงโตช้ากว่าตัวอื่น
 */
export function simulate(
  input: Inputs,
  base: Baseline,
  deltaPct: number,
  scenario: ScenarioId,
): Simulation {
  const org = ORG_MAP[input.org] ?? ORG_MAP.municipality
  const m = org.model
  const f = m.scenarios[scenario] ?? m.scenarios.normal

  const growth = (1 + deltaPct / 100) * f.people
  const b = base.metrics
  const eBase = m.energyBaseLoadShare

  return {
    growth,
    peopleCount: Math.round(Math.max(safe(input.people), 1) * growth),
    metrics: {
      people: round1(b.people * growth),
      traffic: round1(b.traffic * growth * f.traffic),
      parking: round1(b.parking * growth),
      energy: round1(b.energy * (eBase + (1 - eBase) * growth) * f.energy),
      waste: round1(b.waste * growth * f.waste),
      events: round1(b.events * growth),
    },
  }
}

/* ─────────────────────────── narrative ─────────────────────────── */

/** metric ที่แสดงผลเป็น % (ไม่รวม people ที่โชว์เป็นจำนวนคน) */
export const LOAD_KEYS: SignalId[] = ['parking', 'energy', 'traffic', 'waste', 'events']

export interface RankedMetric {
  id: SignalId
  value: number
  def: SignalDef
}

/** เรียง signal ที่ผู้ใช้เลือก จากตึงตัวมากไปน้อย */
export function rankMetrics(metrics: Metrics, signals: SignalId[]): RankedMetric[] {
  return LOAD_KEYS
    .filter(id => signals.includes(id))
    .map(id => ({ id, value: metrics[id], def: SIGNAL_MAP[id] }))
    .sort((a, b) => b.value - a.value)
}

/** signal ที่นำไปวาดวงความสัมพันธ์หน้า 06 (People เป็นศูนย์กลางเสมอ) */
export function ringMetrics(metrics: Metrics, signals: SignalId[]): RankedMetric[] {
  return LOAD_KEYS
    .filter(id => signals.includes(id))
    .map(id => ({ id, value: metrics[id], def: SIGNAL_MAP[id] }))
}

export interface Insight { en: string; th: string }

export function headlineAlert(ranked: RankedMetric[]): Insight | null {
  if (!ranked.length) return null
  const a = ranked[0]
  const b = ranked[1]
  if (!b) {
    return {
      en: `Your busiest period is also when ${a.def.en.toLowerCase()} pressure is highest.`,
      th: `${a.def.th}หนักที่สุด ในช่วงเดียวกับตอนที่คนเยอะที่สุดพอดี`,
    }
  }
  return {
    en: `Your busiest period is also when ${a.def.en.toLowerCase()} pressure and ${b.def.en.toLowerCase()} demand are highest.`,
    th: `${a.def.th}และ${b.def.th}หนักที่สุด ในช่วงเดียวกับตอนที่คนเยอะที่สุดพอดี`,
  }
}

export function keyUnderstandings(signals: SignalId[]): Insight[] {
  const out: Insight[] = []
  if (signals.includes('parking'))
    out.push({ en: 'More people increase parking demand', th: 'คนเยอะขึ้น รถก็ต้องการที่จอดมากขึ้น' })
  if (signals.includes('energy'))
    out.push({ en: 'High activity leads to higher energy use', th: 'คนใช้พื้นที่มากขึ้น ค่าไฟก็ขึ้นตาม' })
  if (signals.includes('events') || signals.includes('waste'))
    out.push({ en: 'Events can significantly impact traffic and waste', th: 'วันที่มีงาน รถจะติดและขยะจะเยอะกว่าปกติมาก' })
  out.push({ en: 'These factors are connected and affect each other', th: 'ทุกเรื่องนี้โยงกันหมด ขยับเรื่องหนึ่ง อีกเรื่องก็ขยับตาม' })
  return out.slice(0, 4)
}

export interface ImpactTile { dir: 'up' | 'down'; tone: 'good' | 'warn'; th: string }

export interface Recommendation {
  key: SignalId | 'balanced'
  badge: string
  titleEn: string
  titleTh: string
  whyEn: string
  whyTh: string
  impacts: ImpactTile[]
}

const RECOMMENDATIONS: Record<SignalId | 'balanced', Omit<Recommendation, 'key' | 'badge'>> = {
  parking: {
    titleEn: 'Prioritize parking-flow management before adding infrastructure.',
    titleTh: 'จัดระบบที่จอดรถให้คล่องขึ้นก่อน ยังไม่ต้องรีบสร้างเพิ่ม',
    whyEn: 'Parking reaches capacity before energy or waste operations become critical.',
    whyTh: 'ที่จอดรถจะเต็มก่อนเรื่องอื่น ส่วนค่าไฟกับขยะยังพอรับไหว',
    impacts: [
      { dir: 'down', tone: 'good', th: 'รถแออัดน้อยลง' },
      { dir: 'up',   tone: 'good', th: 'รถเข้าออกคล่องขึ้น' },
      { dir: 'down', tone: 'warn', th: 'ยังไม่ต้องลงทุนเพิ่ม' },
    ],
  },
  energy: {
    titleEn: 'Shift and shave peak energy demand before expanding capacity.',
    titleTh: 'เกลี่ยการใช้ไฟไม่ให้กระจุกช่วงคนเยอะก่อน ยังไม่ต้องเพิ่มกำลังไฟ',
    whyEn: 'Energy demand is the first factor to reach its limit under higher activity.',
    whyTh: 'พอคนใช้พื้นที่มากขึ้น ไฟฟ้าจะตันเป็นเรื่องแรก',
    impacts: [
      { dir: 'down', tone: 'good', th: 'ค่าไฟช่วงพีคลดลง' },
      { dir: 'up',   tone: 'good', th: 'ใช้ไฟได้คุ้มขึ้น' },
      { dir: 'down', tone: 'warn', th: 'ยังไม่ต้องเพิ่มกำลังไฟ' },
    ],
  },
  traffic: {
    titleEn: 'Manage arrival flow and access routes before widening roads.',
    titleTh: 'จัดจังหวะรถเข้า-ออกและเส้นทางก่อน ยังไม่ต้องขยายถนน',
    whyEn: 'Traffic becomes constrained before the other operations do.',
    whyTh: 'รถจะติดก่อนเรื่องอื่นในพื้นที่ของคุณ',
    impacts: [
      { dir: 'down', tone: 'good', th: 'รถติดน้อยลง' },
      { dir: 'up',   tone: 'good', th: 'รถเคลื่อนตัวคล่องขึ้น' },
      { dir: 'down', tone: 'warn', th: 'ยังไม่ต้องขยายถนน' },
    ],
  },
  waste: {
    titleEn: 'Match collection schedule to the real peak before adding bins.',
    titleTh: 'ปรับเวลาเก็บขยะให้ตรงกับช่วงคนเยอะก่อน ยังไม่ต้องเพิ่มถัง',
    whyEn: 'Waste handling saturates earlier than parking or energy at this activity level.',
    whyTh: 'ที่จำนวนคนเท่านี้ ขยะจะล้นก่อนที่จอดรถและค่าไฟ',
    impacts: [
      { dir: 'down', tone: 'good', th: 'ขยะตกค้างน้อยลง' },
      { dir: 'up',   tone: 'good', th: 'เก็บขยะตรงช่วงที่ต้องเก็บ' },
      { dir: 'down', tone: 'warn', th: 'ยังไม่ต้องซื้ออุปกรณ์เพิ่ม' },
    ],
  },
  events: {
    titleEn: 'Plan event days separately before scaling everyday capacity.',
    titleTh: 'วางแผนรับมือเฉพาะวันที่มีงานก่อน ยังไม่ต้องขยายของวันปกติ',
    whyEn: 'Pressure is driven by event peaks rather than by everyday demand.',
    whyTh: 'ปัญหาเกิดเฉพาะวันที่มีงาน ไม่ใช่วันธรรมดา',
    impacts: [
      { dir: 'down', tone: 'good', th: 'วันมีงานแออัดน้อยลง' },
      { dir: 'up',   tone: 'good', th: 'เตรียมงานได้ล่วงหน้า' },
      { dir: 'down', tone: 'warn', th: 'ยังไม่ต้องลงทุนเพิ่ม' },
    ],
  },
  people: {
    titleEn: 'Spread activity across the day before expanding the space.',
    titleTh: 'กระจายให้คนมาไม่พร้อมกันก่อน ยังไม่ต้องขยายพื้นที่',
    whyEn: 'The space itself is the binding constraint at peak hours.',
    whyTh: 'ช่วงคนเยอะ พื้นที่เองนี่แหละที่ไม่พอ',
    impacts: [
      { dir: 'down', tone: 'good', th: 'คนแออัดน้อยลง' },
      { dir: 'up',   tone: 'good', th: 'ใช้พื้นที่ช่วงคนน้อยได้คุ้มขึ้น' },
      { dir: 'down', tone: 'warn', th: 'ยังไม่ต้องขยายพื้นที่' },
    ],
  },
  balanced: {
    titleEn: 'Keep monitoring — no single factor is constrained yet.',
    titleTh: 'ตอนนี้ยังไม่มีเรื่องไหนตึง เก็บข้อมูลต่อไปเพื่อรู้ก่อนเกิดปัญหา',
    whyEn: 'All tracked factors stay within a comfortable range in this scenario.',
    whyTh: 'ทุกเรื่องยังอยู่ในระดับที่รับไหวในสถานการณ์นี้',
    impacts: [
      { dir: 'up',   tone: 'good', th: 'ข้อมูลแม่นขึ้น' },
      { dir: 'up',   tone: 'good', th: 'รู้ปัญหาได้เร็วขึ้น' },
      { dir: 'down', tone: 'warn', th: 'ยังไม่ต้องลงทุนเพิ่ม' },
    ],
  },
}

export function recommend(scenarioMetrics: Metrics, signals: SignalId[]): Recommendation {
  const ranked = rankMetrics(scenarioMetrics, signals)
  const top = ranked[0]
  const key: SignalId | 'balanced' = !top || top.value < 70 ? 'balanced' : top.id
  const badge = !top ? 'WATCH' : badgeOf(top.value)
  return { key, badge, ...RECOMMENDATIONS[key] }
}

/** เกณฑ์ที่ถือว่าปัจจัยนั้น "ล้น" ขีดความสามารถแล้ว (ตรงกับตัวเลขสีแดงในตาราง) */
export const OVER_CAPACITY = 100

/** ป้ายระดับความเร่งด่วน — ใช้เกณฑ์เดียวกับตัวเลขสีแดงในตาราง (ล้น 100% = วิกฤต) */
function badgeOf(value: number): string {
  return value >= OVER_CAPACITY ? 'CRITICAL' : value >= 85 ? 'PRIORITY' : 'WATCH'
}

/**
 * ข้อเสนอแนะของทุกปัจจัยที่ล้นขีดความสามารถพร้อมกัน เรียงจากหนักสุดไปเบาสุด
 * (recommend() ให้แค่ตัวที่หนักที่สุดตัวเดียว ซึ่งไม่พอเมื่อหลายปัจจัยวิกฤตพร้อมกัน)
 * ถ้าล้นตัวเดียวหรือไม่ล้นเลย จะได้ข้อเสนอแนะหลักตัวเดียวตามเดิม
 */
export function recommendAll(scenarioMetrics: Metrics, signals: SignalId[]): Recommendation[] {
  const over = rankMetrics(scenarioMetrics, signals).filter(r => r.value >= OVER_CAPACITY)
  if (over.length < 2) return [recommend(scenarioMetrics, signals)]
  return over.map(r => ({ key: r.id, badge: badgeOf(r.value), ...RECOMMENDATIONS[r.id] }))
}

/** ข้อความเตือนใต้ตารางหน้า 07 */
export function constraintWarning(scenarioMetrics: Metrics, signals: SignalId[]): Insight | null {
  const ranked = rankMetrics(scenarioMetrics, signals)
  const top = ranked[0]
  if (!top || top.value < 95) return null
  return {
    en: `${top.def.en} becomes constrained first.`,
    th: `${top.def.th}จะถึงขีดจำกัดก่อนเรื่องอื่น`,
  }
}
