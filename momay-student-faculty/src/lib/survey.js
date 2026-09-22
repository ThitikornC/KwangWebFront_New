/*
  อ่านคำตอบที่ MomaySurpriseOrganizeV2 ส่งมาทาง query string

  หน้า ORGANIZE สร้างลิงก์มาด้วย surveyQuery ของมัน (ดู citizenHref ในไฟล์นั้น)
  ชื่อพารามิเตอร์สั้นมากเพราะลิงก์ถูกออกแบบให้เอาไปแชร์ต่อได้ จึงต้องแปลชื่อที่นี่
  ถ้าเปลี่ยนชื่อพารามิเตอร์ฝั่งโน้น ต้องตามมาแก้ตารางนี้ด้วย

  ไม่มี query (เปิดหน้านี้ตรง ๆ) ก็ต้องทำงานได้ ใช้ค่าตั้งต้นชุดเดียวกับหน้า ORGANIZE
*/

/** ค่าตั้งต้น — ชุดเดียวกับที่หน้า ORGANIZE ใช้ตอนเลือกโหมดคณะ */
export const FALLBACK = {
  students: 2500,
  rooms: 35,
  activities: 80,
  focus: ['learning', 'space'],
  peak: 'midday',
  scenario: 'today',
}

const num = (v, fallback) => {
  const n = Number(v)
  return Number.isFinite(n) && n > 0 ? n : fallback
}

const list = (v, fallback) => {
  if (!v) return fallback
  const ids = String(v).split(',').filter(Boolean)
  return ids.length ? ids : fallback
}

/**
 * แปลง query string เป็นอินพุตของ facultyReport
 * @param {string} search — เช่น window.location.search
 */
export function readSurvey(search) {
  const q = new URLSearchParams(search || '')
  const cameFromOrganize = [...q.keys()].length > 0

  return {
    cameFromOrganize,
    /** โหมดที่ผู้ใช้เลือกไว้ที่หน้า ORGANIZE — หน้านี้ทำมาเพื่อคณะโดยเฉพาะ */
    org: q.get('o') || 'faculty',
    input: {
      students: num(q.get('p'), FALLBACK.students),
      rooms: num(q.get('c'), FALLBACK.rooms),
      activities: num(q.get('ac'), FALLBACK.activities),
      focus: list(q.get('ff'), FALLBACK.focus),
      peak: q.get('fk') || FALLBACK.peak,
      scenario: q.get('fs') || FALLBACK.scenario,
    },
  }
}

/** ลิงก์กลับไปหน้า ORGANIZE พร้อมคำตอบชุดเดิม เปิดที่หน้าผลลัพธ์เลย */
export function backToOrganize(search) {
  const q = new URLSearchParams(search || '')
  q.set('step', '3')
  if (!q.get('o')) q.set('o', 'faculty')
  return `/MomaySurpriseOrganizeV2?${q}`
}
