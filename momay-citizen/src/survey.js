// อ่านคำตอบที่ผู้ใช้กรอกมาจากหน้า /MomaySurpriseOrganize (ส่งมาทาง query string)
// แล้วแปลงเป็นตัวเลขของแดชบอร์ดประชาชน
//
// การคำนวณใช้โมเดลตัวเดียวกับหน้า Surprise (utils/momaySurpriseOrganize/model.ts)
// ตรง ๆ เพื่อให้ตัวเลขสองหน้าตรงกันเสมอ ไม่ต้องไล่แก้สองที่
import {
  ORG_MAP,
  PEAKS,
  PEAK_MAP,
  SIGNALS,
  computeBaseline,
} from '../../utils/momaySurpriseOrganize/model.ts'

/** หมวดที่ไม่แปลผลต่อ — ห้องสมุดกับโซลาร์เป็นพื้นที่เฉพาะทาง ตัวชี้วัดของแดชบอร์ด
 *  ประชาชน (ความหนาแน่นย่าน จราจร ที่จอดรถเมือง) อ่านจากสองหมวดนี้ไม่ได้
 *  ต้องตรงกับ CITIZEN_EXCLUDED ในหน้า MomaySurpriseOrganize */
const EXCLUDED_ORGS = ['library', 'solar']

const SIGNAL_IDS = SIGNALS.map((s) => s.id)
const clamp = (n, min, max) => Math.min(max, Math.max(min, n))
const num = (raw, fallback) => {
  const n = Number(raw)
  return Number.isFinite(n) && n > 0 ? n : fallback
}

/** ระดับความหนาแน่น ใช้ id ชุดเดียวกับ mapLegend ใน mock.js */
export function crowdLevel(pct) {
  if (pct >= 85) return { id: 'very-high', label: 'หนาแน่นมาก', color: '#f43f5e' }
  if (pct >= 65) return { id: 'high', label: 'ค่อนข้างหนาแน่น', color: '#f59e0b' }
  if (pct >= 35) return { id: 'normal', label: 'ปกติ', color: '#84cc16' }
  return { id: 'low', label: 'ไม่หนาแน่น', color: '#10b981' }
}

function trafficLevel(pct) {
  if (pct >= 90) return { label: 'ติดขัด', tone: 'rose' }
  if (pct >= 65) return { label: 'เริ่มหนาแน่น', tone: 'amber' }
  return { label: 'คล่องตัว', tone: 'blue' }
}

/** PM2.5 ประมาณจากภาระจราจร — ยิ่งรถเยอะฝุ่นยิ่งขึ้น
 *  เป็นการประมาณเพื่อการสาธิต ไม่ใช่ค่าวัดจริงจากสถานี */
function airFrom(trafficPct) {
  const pm = Math.round(11 + trafficPct * 0.22)
  if (pm <= 15) return { pm, label: 'ดีมาก', level: 'very-good' }
  if (pm <= 25) return { pm, label: 'ดี', level: 'good' }
  if (pm <= 37) return { pm, label: 'ปานกลาง', level: 'moderate' }
  return { pm, label: 'เริ่มมีผลต่อสุขภาพ', level: 'unhealthy' }
}

/**
 * แกะ query string เป็น Inputs ของโมเดล
 * คืน null เมื่อไม่มีข้อมูลส่งมา หรือเป็นหมวดที่ไม่แปลผล → หน้าใช้ข้อมูลตัวอย่างตามเดิม
 */
export function readSurvey(search = '') {
  const q = new URLSearchParams(search)
  const org = q.get('o')

  if (!org || !ORG_MAP[org] || EXCLUDED_ORGS.includes(org)) return null

  const fields = ORG_MAP[org].fields
  const peak = PEAK_MAP[q.get('k')] ? q.get('k') : 'midday'
  const signals = (q.get('s') ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => SIGNAL_IDS.includes(s))

  const inputs = {
    org,
    people: num(q.get('p'), fields.people.default),
    capacity: num(q.get('c'), fields.capacity.default),
    energy: num(q.get('e'), fields.energy.default),
    signals: signals.length ? signals : ['people'],
    peak,
  }

  return { inputs, org: ORG_MAP[org], peak: PEAK_MAP[peak], baseline: computeBaseline(inputs) }
}

/**
 * แปลง baseline ของโมเดลเป็นชุดค่าที่หน้านี้ใช้แสดงผล
 * ทุกอย่างเป็นฟังก์ชันบริสุทธิ์ จะได้เทสและอ่านซ้ำได้ง่าย
 */
export function deriveDashboard(survey) {
  const { inputs, org, peak, baseline } = survey
  const m = baseline.metrics
  const has = (id) => inputs.signals.includes(id)

  const crowd = crowdLevel(m.people)
  const traffic = trafficLevel(m.traffic)
  const air = airFrom(m.traffic)
  // ที่จอดรถเต็มเกิน 100% ได้ในโมเดล แต่ "ว่างติดลบ" ไม่มีความหมายกับผู้ใช้
  const parkingFree = clamp(Math.round(100 - m.parking), 0, 100)

  return {
    org,
    peak,
    signals: inputs.signals,
    people: inputs.people,
    peakPeople: baseline.peakPeople,
    peakVehicles: baseline.peakVehicles,
    metrics: m,
    crowd,
    traffic,
    air,
    parkingFree,
    /** ความหนาแน่นแต่ละช่วงเวลา เรียงช่วงที่คนน้อยที่สุดขึ้นก่อน */
    windows: PEAKS.map((p) => {
      // คนในช่วงนั้นเทียบกับช่วงพีคที่ผู้ใช้เลือก → แปลงเป็น % ความหนาแน่น
      const pct = (m.people * p.share) / peak.share
      return {
        id: p.id,
        th: p.th,
        window: p.window,
        pct: Math.round(pct),
        level: crowdLevel(pct),
        isPeak: p.id === peak.id,
      }
    }).sort((a, b) => a.pct - b.pct),
    has,
  }
}

/** ค่าที่หน้าใช้ตอนไม่มีข้อมูลส่งมา — ตรงกับตัวเลขตัวอย่างเดิมใน mock.js */
export const NO_SURVEY = null
