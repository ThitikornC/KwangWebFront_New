/*
  พื้นที่ในคณะ · เจตนาของนักศึกษา · ตรรกะการแนะนำ

  หัวใจของหน้านี้คือ "ข้อมูลชุดเดียวกับหน้า ORGANIZE แต่คนละประสบการณ์"
  ความหนาแน่นของทุกพื้นที่ที่นี่จึงไม่ได้สุ่มขึ้นมาใหม่ แต่ดึงมาจาก facultyReport
  ตัวเดียวกับที่หน้า ORGANIZE ใช้วาดผัง — พื้นที่แต่ละแห่งผูกกับ "ย่าน" บนผังนั้น
  ย่านไหนแดงบนผังของคณบดี นักศึกษาก็จะเห็นว่าพื้นที่แถวนั้นคนแน่น ตรงกันเสมอ
*/

/** ตารางย่านของผังคณะ — ต้องตรงกับ BLOCK_KIND ใน utils/momaySurpriseOrganize/faculty.ts
    ค่าคือดัชนีของ SPACE_KINDS: 0 ห้องเรียน · 1 ทำงานกลุ่ม · 2 กิจกรรม · 3 พักผ่อน */
export const DISTRICT_KIND = [0, 1, 3, 2, 0, 1, 3, 0, 2]

/** ขนาดบล็อกบนผัง (ช่องกริด) — ตรงกับ BLOCK ใน faculty.ts */
const BLOCK = 4

/** จุดกึ่งกลางย่านบนกริด */
export const districtCenter = i => ({
  gx: (i % 3) * BLOCK + 1.5,
  gy: Math.floor(i / 3) * BLOCK + 1.5,
})

/** ช่วงเวลาที่ engine มีข้อมูล — อ่านจากรีพอร์ต ไม่ฮาร์ดโค้ด
    ถ้า OPEN_FROM/OPEN_TO ใน faculty.ts เปลี่ยน แถบเลือกเวลาที่นี่จะตามไปเอง */
export function hourRange(report) {
  const at = report.hours.map(h => h.at)
  return { min: Math.ceil(Math.min(...at)), max: Math.floor(Math.max(...at)) }
}

/** ตำแหน่งที่นักศึกษายืนอยู่ตอนเปิดหน้านี้ — ปากทางเข้าคณะ ด้านหน้าของผัง */
export const YOU_AT = { gx: 5.5, gy: 10.5 }

/* หนึ่งช่องกริดยาวราว 45 เมตร และคนเดินราว 80 เมตร/นาที
   สองค่านี้ทำให้ "5 นาที (400 เมตร)" บนการ์ดตรงกับระยะที่เห็นบนผังจริง
   ถ้าใส่เลขนาทีมือ ผู้ใช้จะจับได้ทันทีว่าหมุดที่อยู่ไกลกว่ากลับใช้เวลาน้อยกว่า */
const METERS_PER_CELL = 45
const METERS_PER_MIN = 80

export function walkFrom(from, to) {
  // เดินตามถนน ไม่ได้ลัดทแยง จึงวัดแบบ manhattan
  const cells = Math.abs(to.gx - from.gx) + Math.abs(to.gy - from.gy)
  const meters = Math.round((cells * METERS_PER_CELL) / 10) * 10
  return { meters, minutes: Math.max(1, Math.round(meters / METERS_PER_MIN)) }
}

/* ─────────────────────────── เจตนา ─────────────────────────── */

export const INTENTS = [
  {
    id: 'learn',
    en: 'LEARN',
    th: 'ไปเรียน',
    icon: 'cap',
    askTh: 'คุณมีคาบเรียนช่วงนี้ใช่ไหม',
    leadTh: 'คุณกำลังจะไปเรียน',
  },
  {
    id: 'study',
    en: 'STUDY',
    th: 'หาที่อ่าน/ทำงาน',
    icon: 'book',
    askTh: 'อยากได้ที่เงียบ ๆ นั่งได้ยาว ๆ',
    leadTh: 'คุณต้องการหาที่ STUDY',
  },
  {
    id: 'collab',
    en: 'COLLABORATE',
    th: 'ทำงานกลุ่ม',
    icon: 'users',
    askTh: 'มากันหลายคน ต้องคุยกันได้',
    leadTh: 'คุณต้องการที่ทำงานกลุ่ม',
  },
  {
    id: 'meet',
    en: 'MEET',
    th: 'พบอาจารย์/บริการ',
    icon: 'chat',
    askTh: 'ติดต่ออาจารย์หรืองานธุรการ',
    leadTh: 'คุณต้องการพบอาจารย์หรือใช้บริการ',
  },
  {
    id: 'activity',
    en: 'ACTIVITY',
    th: 'กิจกรรมคณะ',
    icon: 'star',
    askTh: 'มาร่วมกิจกรรมหรือหาที่จัดงาน',
    leadTh: 'คุณกำลังมองหากิจกรรม',
  },
  {
    id: 'explore',
    en: 'EXPLORE',
    th: 'ดูสิ่งที่เกิดขึ้นในคณะ',
    icon: 'compass',
    askTh: 'ยังไม่มีอะไรเจาะจง ขอดูรอบ ๆ ก่อน',
    leadTh: 'คุณกำลังสำรวจคณะ',
  },
]

export const INTENT_MAP = Object.fromEntries(INTENTS.map(i => [i.id, i]))

/* ─────────────────────────── พื้นที่ ─────────────────────────── */

/* ── อาคาร ──
   หน่วยของ "แผนที่" หนึ่งหมุดหนึ่งอาคาร หนึ่งย่านบนผังหนึ่งอาคาร */
export const BUILDINGS = [
  { id: 'lecture3', shortTh: 'อาคารเรียน 3', th: 'อาคารเรียนรวม 3', district: 0 },
  { id: 'student', shortTh: 'อาคารกิจกรรม', th: 'อาคารกิจกรรมนักศึกษา', district: 1 },
  { id: 'garden', shortTh: 'สวนพักผ่อน', th: 'พื้นที่สีเขียวด้านข้างคณะ', district: 2 },
  { id: 'plaza', shortTh: 'ลานกิจกรรม', th: 'ลานกิจกรรมคณะ', district: 3 },
  { id: 'social', shortTh: 'อาคารคณะ', th: 'อาคารคณะสังคมศาสตร์', district: 4 },
  { id: 'library', shortTh: 'หอสมุด', th: 'หอสมุด มน.', district: 5 },
  { id: 'research', shortTh: 'อาคารวิจัย', th: 'อาคารวิจัยและบัณฑิตศึกษา', district: 6 },
  { id: 'lab', shortTh: 'อาคารปฏิบัติการ', th: 'อาคารปฏิบัติการ', district: 7 },
  { id: 'canteen', shortTh: 'ศูนย์อาหาร', th: 'ศูนย์อาหารคณะ', district: 8 },
]
export const BUILDING_MAP = Object.fromEntries(BUILDINGS.map(b => [b.id, b]))

/* ── โซน ──
   หน่วยของ "คำแนะนำ" — คนไม่ได้ไปนั่งที่ "อาคาร" เขาไปนั่งที่โซนใดโซนหนึ่งในอาคารนั้น
   อาคารหนึ่งหลังมีได้หลายโซน และแต่ละโซนคนละประเภทกันได้

   kind คือประเภทพื้นที่ตาม SPACE_KINDS ของ engine
   (0 ห้องเรียน · 1 ทำงานกลุ่ม · 2 กิจกรรม · 3 พักผ่อน)
   ไม่ใช่ "ชั้น" ที่แต่งขึ้นเอง เพราะฟอร์มคณะไม่ได้ถามชั้น มันถามจำนวนพื้นที่
   และ engine แบ่งพื้นที่เป็นสี่ประเภทนี้อยู่แล้ว ความหนาแน่นของโซนจึงมาจาก
   เส้นรายชั่วโมงของประเภทนั้นตรง ๆ ไม่ได้ประมาณเอา

   building = อาคารที่โซนนี้อยู่ ใช้หาตำแหน่งบนแผนที่และระยะเดิน
   photo    = ชื่อไฟล์ใน public/zones (ไม่ต้องใส่นามสกุล) เว้นว่างได้
              เว้นไว้ดีกว่าใส่รูปที่ไม่ตรง เพราะรูปคือสิ่งแรกที่ผู้ใช้เชื่อ */
export const ZONES = [
  {
    id: 'read',
    th: 'โซนพื้นที่อ่าน',
    building: 'social',
    kind: 1,
    seats: 120,
    quiet: 0.85,
    outdoor: false,
    tone: 'warm',
    amenities: ['seat', 'plug', 'wifi', 'light', 'silent', 'wc'],
    photo: 'library-open',
    fits: { study: 1, learn: 0.3, collab: 0.45, meet: 0.35, activity: 0.1, explore: 0.6 },
    suitTh: ['อ่านหนังสือ', 'ทำงานเดี่ยว', 'ทำงานกลุ่มเล็ก'],
    noteTh: 'เงียบ เหมาะสำหรับทำงาน',
  },
  {
    id: 'facclass',
    th: 'ห้องเรียนคณะ',
    building: 'social',
    kind: 0,
    seats: 90,
    quiet: 0.4,
    outdoor: false,
    tone: 'cool',
    amenities: ['seat', 'plug', 'wifi', 'screen', 'wc'],
    fits: { learn: 0.9, meet: 0.5, study: 0.3, collab: 0.3, activity: 0.2, explore: 0.35 },
    suitTh: ['เข้าเรียน', 'ติวกลุ่ม'],
    noteTh: 'ว่างช่วงพักคาบ',
  },
  {
    id: 'cowork',
    th: 'Co-Working Zone',
    building: 'student',
    kind: 1,
    seats: 90,
    quiet: 0.45,
    outdoor: false,
    tone: 'cool',
    amenities: ['seat', 'plug', 'wifi', 'board'],
    photo: 'meeting',
    fits: { collab: 1, study: 0.65, learn: 0.2, meet: 0.35, activity: 0.45, explore: 0.7 },
    suitTh: ['ทำงานกลุ่ม', 'ระดมความคิด', 'ประชุมย่อย'],
    noteTh: 'มีปลั๊กไฟ คุยกันได้',
  },
  {
    id: 'club',
    th: 'ห้องชมรม',
    building: 'student',
    kind: 2,
    seats: 70,
    quiet: 0.3,
    outdoor: false,
    tone: 'violet',
    amenities: ['seat', 'wifi', 'board'],
    photo: 'meeting',
    fits: { activity: 0.9, collab: 0.6, explore: 0.65, meet: 0.3, study: 0.15, learn: 0.1 },
    suitTh: ['กิจกรรมชมรม', 'ซ้อมงาน'],
    noteTh: 'ใช้จัดกิจกรรมชมรม',
  },
  {
    id: 'outdoor',
    th: 'พื้นที่ Outdoor',
    building: 'garden',
    kind: 3,
    seats: 60,
    quiet: 0.5,
    outdoor: true,
    tone: 'green',
    amenities: ['seat', 'wifi', 'green'],
    photo: 'garden',
    fits: { study: 0.55, collab: 0.7, explore: 0.9, activity: 0.5, learn: 0.1, meet: 0.15 },
    suitTh: ['นั่งพัก', 'ทำงานกลุ่ม', 'คุยเล่น'],
    noteTh: 'อากาศดี บรรยากาศธรรมชาติ',
  },
  {
    id: 'plazamain',
    th: 'ลานกิจกรรมกลาง',
    building: 'plaza',
    kind: 2,
    seats: 300,
    quiet: 0.15,
    outdoor: true,
    tone: 'green',
    amenities: ['seat', 'wifi', 'green', 'stage'],
    photo: 'garden',
    fits: { activity: 1, explore: 0.85, collab: 0.4, study: 0.15, learn: 0.1, meet: 0.2 },
    suitTh: ['ร่วมกิจกรรม', 'ชมงาน'],
    noteTh: 'มีงานกิจกรรม',
  },
  {
    id: 'hall',
    th: 'ห้องบรรยายรวม',
    building: 'lecture3',
    kind: 0,
    seats: 180,
    quiet: 0.35,
    outdoor: false,
    tone: 'cool',
    amenities: ['seat', 'plug', 'wifi', 'screen', 'wc'],
    fits: { learn: 1, meet: 0.45, study: 0.3, collab: 0.25, activity: 0.3, explore: 0.4 },
    suitTh: ['เข้าเรียน', 'ฟังบรรยาย'],
    noteTh: 'ห้องเรียนหลักของคณะ',
  },
  {
    id: 'libquiet',
    th: 'โซนอ่านเงียบ',
    building: 'library',
    kind: 1,
    seats: 240,
    quiet: 0.95,
    outdoor: false,
    tone: 'warm',
    amenities: ['seat', 'plug', 'wifi', 'silent', 'book', 'wc'],
    photo: 'library-read',
    fits: { study: 0.95, learn: 0.35, collab: 0.2, meet: 0.15, activity: 0.05, explore: 0.5 },
    suitTh: ['อ่านหนังสือ', 'ค้นคว้า'],
    noteTh: 'มีที่นั่งเพียงพอ',
  },
  {
    id: 'libgroup',
    th: 'โซนค้นคว้ากลุ่ม',
    building: 'library',
    kind: 1,
    seats: 60,
    quiet: 0.55,
    outdoor: false,
    tone: 'warm',
    amenities: ['seat', 'plug', 'wifi', 'board', 'book'],
    photo: 'meeting',
    fits: { collab: 0.85, study: 0.7, learn: 0.3, meet: 0.35, activity: 0.1, explore: 0.45 },
    suitTh: ['ทำงานกลุ่ม', 'ค้นคว้า'],
    noteTh: 'จองล่วงหน้าได้',
  },
  {
    id: 'quiet',
    th: 'Quiet Zone',
    building: 'research',
    kind: 1,
    seats: 48,
    quiet: 1,
    outdoor: false,
    tone: 'violet',
    amenities: ['seat', 'plug', 'wifi', 'silent'],
    photo: 'library-open',
    fits: { study: 1, learn: 0.15, collab: 0.1, meet: 0.2, activity: 0.05, explore: 0.35 },
    suitTh: ['อ่านหนังสือ', 'ทำงานเดี่ยว'],
    noteTh: 'คนน้อย เหมาะสำหรับอ่าน',
  },
  {
    id: 'computer',
    th: 'ห้องคอมพิวเตอร์',
    building: 'lab',
    kind: 0,
    seats: 110,
    quiet: 0.6,
    outdoor: false,
    tone: 'violet',
    amenities: ['seat', 'plug', 'wifi', 'screen'],
    fits: { learn: 0.7, study: 0.7, collab: 0.55, meet: 0.2, activity: 0.1, explore: 0.4 },
    suitTh: ['ใช้คอมพิวเตอร์', 'ทำงานเดี่ยว'],
    noteTh: 'มีเครื่องคอมพิวเตอร์ให้ใช้',
  },
  {
    id: 'office',
    th: 'สำนักงานคณะ',
    building: 'social',
    kind: 0,
    seats: 24,
    quiet: 0.7,
    outdoor: false,
    tone: 'violet',
    photo: 'office',
    amenities: ['seat', 'wifi', 'desk', 'wc'],
    suitTh: ['ติดต่องานทะเบียน', 'นัดพบอาจารย์', 'ยื่นเอกสาร'],
    fits: { meet: 1, learn: 0.15, study: 0.2, collab: 0.15, activity: 0.1, explore: 0.35 },
    noteTh: 'งานทะเบียนและธุรการ เปิดถึง 16:30 น.',
  },
  {
    id: 'canteenmain',
    th: 'โซนนั่งรับประทาน',
    building: 'canteen',
    kind: 3,
    seats: 200,
    quiet: 0.2,
    outdoor: false,
    tone: 'warm',
    amenities: ['seat', 'wifi', 'plug', 'wc'],
    fits: { explore: 0.8, collab: 0.6, activity: 0.65, study: 0.3, meet: 0.35, learn: 0.1 },
    suitTh: ['พักกินข้าว', 'นั่งคุย'],
    noteTh: 'ช่วงพักเที่ยงคนแน่นที่สุด',
  },
]

/** อาคารที่โซนนี้อยู่ */
export const buildingOf = z => BUILDING_MAP[z.building]

/** ชื่อประเภทพื้นที่ — ชุดเดียวกับที่หน้า ORGANIZE ใช้ในตารางแผง 07 */
export const KIND_TH = ['ห้องเรียน', 'พื้นที่ทำงานกลุ่ม', 'พื้นที่กิจกรรม', 'พื้นที่พักผ่อน']

/** ชื่อเดิม — โค้ดส่วนอื่นยังอ้าง SPACES อยู่หลายที่ */
export const SPACES = ZONES

/* ─────────────────────────── สิ่งอำนวยความสะดวก ─────────────────────────── */

export const AMENITY = {
  seat: { th: 'ที่นั่ง', icon: 'seat' },
  wc: { th: 'ห้องน้ำใกล้เคียง', icon: 'wc' },
  plug: { th: 'ปลั๊กไฟ', icon: 'plug' },
  wifi: { th: 'Wi-Fi', icon: 'wifi' },
  light: { th: 'แสงสว่างเหมาะสม', icon: 'sun' },
  silent: { th: 'โซนเงียบ', icon: 'silent' },
  board: { th: 'ไวท์บอร์ด', icon: 'board' },
  green: { th: 'พื้นที่สีเขียว', icon: 'leaf' },
  book: { th: 'หนังสืออ้างอิง', icon: 'book' },
  screen: { th: 'จอฉายภาพ', icon: 'screen' },
  stage: { th: 'เวทีกิจกรรม', icon: 'star' },
  desk: { th: 'เคาน์เตอร์บริการ', icon: 'desk' },
}

/* ─────────────────────────── ความหนาแน่นรายพื้นที่ ─────────────────────────── */

/**
 * ความหนาแน่นของพื้นที่ ณ ชั่วโมงหนึ่ง (0–1)
 * ดึงจาก report.series ซึ่งเป็นเส้นเดียวกับที่หน้า ORGANIZE วาดในแผง 07
 * แล้วปรับตามย่านที่พื้นที่นั้นตั้งอยู่ ย่านกลางคณะจึงแน่นกว่าย่านริม
 */
export function loadAt(report, space, hour) {
  /* ใช้ประเภทของ "โซน" ไม่ใช่ประเภทของย่าน
     โซนอ่านหนังสือที่อยู่ในอาคารเรียนต้องวิ่งตามรูปแบบของพื้นที่อ่าน
     ไม่ใช่พุ่งขึ้นลงตามรอบคาบเรียนของอาคารที่มันบังเอิญตั้งอยู่ */
  const kind = space.kind
  const line = report.series[kind]
  if (!line || !line.points.length) return 0
  /* หาจุดที่ใกล้ชั่วโมงนี้ที่สุด ไม่เทียบเท่ากันตรง ๆ
     เพราะ engine เดินทีละครึ่งชั่วโมงและเปิดถึงแค่ 18:00
     ถ้าเทียบตรง ๆ แล้วไม่เจอจะได้ 0 ซึ่งอ่านว่า "ว่างสนิท" ทั้งที่แปลว่า "ไม่มีข้อมูล" */
  const pt = line.points.reduce((best, p) =>
    Math.abs(p.at - hour) < Math.abs(best.at - hour) ? p : best, line.points[0])
  const base = pt.value
  // ย่านกลางผังคนเดินผ่านมากกว่าย่านริม ใช้ตัวคูณเดียวกับที่ faculty.ts ใช้กับผัง
  const c = districtCenter(buildingOf(space).district)
  const mid = 5.5
  const near = 1 - (Math.abs(c.gx - mid) + Math.abs(c.gy - mid)) / 13.2
  // พื้นที่เงียบมีกติกาคุมคนเข้าอยู่แล้ว จึงไม่แน่นตามคณะไปทั้งหมด
  const damped = base * (0.82 + 0.18 * near) * (1 - space.quiet * 0.3)
  return Math.min(1, Math.max(0, damped))
}

/** จำนวนที่นั่งที่ยังว่าง */
export const freeSeats = (space, load) => Math.max(0, Math.round(space.seats * (1 - load)))

/** คำอธิบายความหนาแน่นเป็นคำพูด */
export function crowdWord(load) {
  if (load < 0.35) return { th: 'ไม่หนาแน่น', tone: 'ok' }
  if (load < 0.7) return { th: 'ปานกลาง', tone: 'mid' }
  return { th: 'หนาแน่น', tone: 'hot' }
}

/* ─────────────────────────── การแนะนำ ─────────────────────────── */

/**
 * จัดอันดับพื้นที่ตามเจตนา เวลา และความหนาแน่น
 *
 * คะแนนประกอบจากสี่ส่วน ถ่วงกันไว้ตั้งใจ:
 *  - fit      เหมาะกับสิ่งที่ผู้ใช้จะไปทำ (หนักสุด เพราะผิดข้อนี้แล้วที่เหลือไม่มีความหมาย)
 *  - ว่าง     คนน้อยกว่าย่อมดีกว่า ยกเว้นเจตนา "กิจกรรม" ที่คนเยอะคือสิ่งที่มาหา
 *  - ใกล้     เดินน้อยกว่าดีกว่า แต่ถ่วงเบา ไม่ให้ที่ใกล้แต่เต็มชนะที่ไกลแต่ว่าง
 *  - เงียบ    นับเฉพาะตอนเจตนาเป็น study
 */
export function rankSpaces(report, intentId, hour) {
  const wantCrowd = intentId === 'activity' || intentId === 'explore'

  return SPACES.map(space => {
    const load = loadAt(report, space, hour)
    const walk = walkFrom(YOU_AT, districtCenter(buildingOf(space).district))
    const fit = space.fits[intentId] ?? 0

    const roomScore = wantCrowd ? load : 1 - load
    const nearScore = 1 - Math.min(1, walk.minutes / 12)
    const quietScore = intentId === 'study' ? space.quiet : 0

    const score = fit * 1 + roomScore * 0.55 + nearScore * 0.3 + quietScore * 0.25

    return { space, load, walk, fit, score, free: freeSeats(space, load), crowd: crowdWord(load) }
  })
    .filter(r => r.fit > 0.12)
    .sort((a, b) => b.score - a.score)
}

/**
 * เหตุผลที่แนะนำพื้นที่นี้ — เป็นข้อความสั้นพร้อมสถานะผ่าน/ไม่ผ่าน
 * ต้องสะท้อนตัวเลขจริง ไม่ใช่คำโฆษณา เพราะผู้ใช้จะเห็นตัวเลขเดียวกันในส่วน EXPLORE
 */
export function reasonsFor(pick, intentId) {
  const { space, load, walk } = pick
  const out = []

  out.push({
    ok: load < 0.7,
    th: load < 0.35 ? 'คนไม่หนาแน่น' : load < 0.7 ? 'คนปานกลาง ยังหาที่นั่งได้' : 'ตอนนี้คนค่อนข้างแน่น',
  })
  out.push({
    ok: pick.free > 8,
    th: pick.free > 8 ? `มีที่นั่งเพียงพอ (ว่างราว ${pick.free} ที่)` : `ที่นั่งเหลือน้อย (ราว ${pick.free} ที่)`,
  })

  if (intentId === 'study') {
    out.push({ ok: space.quiet >= 0.7, th: space.quiet >= 0.7 ? 'เงียบ เหมาะสำหรับทำงาน' : 'มีเสียงรบกวนบ้าง' })
  } else if (intentId === 'collab') {
    out.push({ ok: space.quiet < 0.7, th: space.quiet < 0.7 ? 'คุยกันได้ ไม่รบกวนใคร' : 'เป็นโซนเงียบ คุยกันไม่สะดวก' })
  } else if (intentId === 'activity') {
    out.push({ ok: load > 0.4, th: load > 0.4 ? 'มีคนร่วมกิจกรรมอยู่แล้ว' : 'ตอนนี้ยังเงียบ กิจกรรมน่าจะยังไม่เริ่ม' })
  } else {
    out.push({ ok: true, th: space.noteTh })
  }

  out.push({
    ok: walk.minutes <= 7,
    th: walk.minutes <= 7 ? `เดินถึงใน ${walk.minutes} นาที` : `ต้องเดิน ${walk.minutes} นาที (${walk.meters} เมตร)`,
  })

  return out
}

/* ─────────────────────────── เส้นทาง ─────────────────────────── */

/** แนวถนนบนกริด — ต้องตรงกับที่ faculty.ts วาด (ถนนอยู่ช่องสุดท้ายของทุกคาบ BLOCK) */
const STREET_LINES = [3.5, 7.5, 11.5]

/** ถนนที่ใกล้ค่าที่ให้มาที่สุด */
const nearestStreet = v =>
  STREET_LINES.reduce((best, t) => (Math.abs(t - v) < Math.abs(best - v) ? t : best), STREET_LINES[0])

/**
 * ลากเส้นทางจากจุดหนึ่งไปอีกจุดตาม "แนวถนน"
 *
 * คนเดินในคณะเดินตามทางเดิน ไม่ได้เดินทะลุตึกเป็นเส้นตรง
 * เส้นที่ตัดทแยงผ่านอาคารทำให้ระยะที่บอกไม่ตรงกับที่เดินจริง
 * และผู้ใช้ที่ดูแผนที่ตามจะงงว่าให้เดินเข้าไปในตึกหรือ
 *
 * โครงเส้นทางมีสามท่อน:
 *   1. ช่วงต่อออก  เดินตั้งฉากจากจุดเริ่มไปขึ้นถนนที่ใกล้ที่สุด (ช่วงเดียวที่ไม่อยู่บนถนน)
 *   2. ช่วงกลาง    วิ่งบนถนนล้วน ๆ
 *   3. ช่วงต่อเข้า  ลงจากถนนเข้าจุดหมาย
 *
 * ลองทุกคู่ของ "ทางขึ้นถนน" ทั้งสองแบบ (ขึ้นแนวตั้ง/แนวนอน) แล้วเอาที่สั้นที่สุด
 * เลือกจากระยะรวม ไม่ใช่เลือกถนนที่ใกล้จุดเริ่ม เพราะถนนที่ใกล้ที่สุดอาจอยู่คนละทาง
 * กับปลายทาง แล้วเส้นจะอ้อมไปกลับ
 */
function roadPath(from, to) {
  const dedupe = pts => {
    const out = []
    for (const p of pts) {
      const last = out[out.length - 1]
      if (!last || Math.abs(last.gx - p.gx) > 0.02 || Math.abs(last.gy - p.gy) > 0.02) out.push(p)
    }
    return out
  }
  const len = pts =>
    pts.slice(1).reduce((n, p, i) => n + Math.abs(p.gx - pts[i].gx) + Math.abs(p.gy - pts[i].gy), 0)

  const isRoad = v => STREET_LINES.some(t => Math.abs(t - v) < 0.02)

  /* ต้นทุนสำหรับ "เลือก" เส้นทาง ไม่ใช่ระยะจริงที่เอาไปบอกผู้ใช้
     ช่วงที่ไม่ได้อยู่บนถนนคิดแพงกว่าหกเท่า เพราะมันคือการเดินตัดผ่านพื้นที่อาคาร
     ถ้าคิดเท่ากัน เส้นที่ลากตรงทะลุบล็อกจะชนะเสมอ แล้วก็จะได้เส้นที่เดินจริงไม่ได้
     (เคสที่เจอ: จุดเริ่มกับปลายทางอยู่บนแนวนอกถนนเส้นเดียวกัน เส้นจะขึ้นไปแตะถนนแล้ววกกลับ) */
  const cost = pts =>
    pts.slice(1).reduce((n, p, i) => {
      const a2 = pts[i]
      const dx = Math.abs(p.gx - a2.gx)
      const dy = Math.abs(p.gy - a2.gy)
      const onRoad = (dx < 0.02 && isRoad(a2.gx)) || (dy < 0.02 && isRoad(a2.gy))
      return n + (dx + dy) * (onRoad ? 1 : 6)
    }, 0)

  /** ทางขึ้นถนนของจุดหนึ่ง — ขึ้นแนวตั้ง หรือ ขึ้นแนวนอน */
  const ramps = pt =>
    STREET_LINES.flatMap(st => [
      { axis: 'x', at: { gx: st, gy: pt.gy } }, // เดินตามแกน x ไปขึ้นถนนแนวตั้ง
      { axis: 'y', at: { gx: pt.gx, gy: st } }, // เดินตามแกน y ไปขึ้นถนนแนวนอน
    ])

  /* ต่อสองจุดที่อยู่บนถนนแล้ว ให้ยังวิ่งบนถนนตลอด
     ถ้าคนละแกน หักมุมเดียวที่สี่แยกก็ถึง
     ถ้าแกนเดียวกัน ต้องยืมถนนอีกแนวมาเชื่อม จึงหักสองมุม */
  const onRoads = (a2, b2, axA, axB) => {
    if (axA !== axB) {
      // ขึ้นแนวตั้งแล้วลงแนวนอน (หรือกลับกัน) — จุดหักคือสี่แยกของถนนสองเส้นนั้น
      return axA === 'x' ? [{ gx: a2.gx, gy: b2.gy }] : [{ gx: b2.gx, gy: a2.gy }]
    }
    /* ขึ้นถนนเส้นเดียวกันทั้งสองฝั่ง วิ่งตรงไปได้เลย ไม่ต้องยืมถนนอื่น
       ถ้าไม่ดักไว้ มันจะวิ่งออกไปแตะถนนอีกเส้นแล้ววกกลับ เป็นซิกแซ็กที่ไม่มีเหตุผล */
    if (axA === 'x' && Math.abs(a2.gx - b2.gx) < 0.02) return []
    if (axA === 'y' && Math.abs(a2.gy - b2.gy) < 0.02) return []

    // คนละเส้นแต่แกนเดียวกัน ยืมถนนอีกแนวที่ใกล้กึ่งกลางที่สุดมาเชื่อม
    if (axA === 'x') {
      const mid = nearestStreet((a2.gy + b2.gy) / 2)
      return [
        { gx: a2.gx, gy: mid },
        { gx: b2.gx, gy: mid },
      ]
    }
    const mid = nearestStreet((a2.gx + b2.gx) / 2)
    return [
      { gx: mid, gy: a2.gy },
      { gx: mid, gy: b2.gy },
    ]
  }

  /* ตัวเลือก "เดินตรงไปเลย" ต้องมีด้วย
     สองจุดที่อยู่ติดกันไม่มีใครเดินอ้อมไปขึ้นถนนแล้ววกกลับ เขาเดินข้ามลานไปเลย
     ตัวคูณค่าเดินนอกถนนจัดการเองว่าระยะแค่ไหนถึงคุ้มที่จะอ้อม
     ระยะสั้นเดินตรงชนะ ระยะยาวเส้นที่ใช้ถนนชนะ */
  let best = [from, to]
  for (const ra of ramps(from)) {
    for (const rb of ramps(to)) {
      const pts = dedupe([from, ra.at, ...onRoads(ra.at, rb.at, ra.axis, rb.axis), rb.at, to])
      if (cost(pts) < cost(best)) best = pts
    }
  }
  return best
}

/** ความยาวรวมของเส้นทางเป็นหน่วยช่องกริด */
const pathCells = pts =>
  pts.slice(1).reduce((n, p, i) => n + Math.abs(p.gx - pts[i].gx) + Math.abs(p.gy - pts[i].gy), 0)

/**
 * แตกเส้นทางเป็นช่วง ๆ พร้อมเวลาแต่ละช่วง
 * เวลาของแต่ละช่วงคิดตามระยะจริงของช่วงนั้น ไม่ใช่หารเท่า ๆ กัน
 * ช่วงที่เดินไกลกว่าจึงกินเวลามากกว่า และรวมแล้วเท่ากับเวลาเดินทั้งหมดเสมอ
 */
export function routeSteps(space) {
  const to = districtCenter(buildingOf(space).district)
  const pts = roadPath(YOU_AT, to)
  const cells = pathCells(pts)
  const meters = Math.round((cells * METERS_PER_CELL) / 10) * 10
  const minutes = Math.max(1, Math.round(meters / METERS_PER_MIN))

  const label = [
    'ออกจากทางออกปัจจุบัน เดินไปทางถนนหน้าคณะ',
    'เดินตามถนนไปทางอาคารคณะ',
    'เลี้ยวที่สี่แยกกลางคณะ',
    `เดินตามถนนไปทาง${buildingOf(space).th}`,
    `เข้า${buildingOf(space).th}`,
    `ถึง${space.th}`,
  ]

  const legs = pts.slice(1).map((p, i) => {
    const prev = pts[i]
    const d = Math.abs(p.gx - prev.gx) + Math.abs(p.gy - prev.gy)
    return { at: p, d, th: label[Math.min(i, label.length - 1)] }
  })

  // กระจายเวลาตามสัดส่วนระยะ แล้วโยนเศษที่ปัดทิ้งไปไว้ช่วงสุดท้าย ผลรวมจะได้ตรงเป๊ะ
  let used = 0
  legs.forEach((l, i) => {
    l.min = i === legs.length - 1 ? Math.max(1, minutes - used) : Math.max(1, Math.round((l.d / cells) * minutes))
    used += l.min
  })

  return {
    total: { meters, minutes },
    /** ทุกจุดของเส้นทางรวมจุดเริ่ม — ใช้วาดเส้นบนผัง */
    points: pts,
    legs,
  }
}

/* ─────────────────────────── กิจกรรมและเคล็ดลับ ─────────────────────────── */

export function eventsToday(report) {
  return [
    {
      th: 'เสวนา: สังคมและเมืองน่าอยู่',
      whenTh: '13:00 – 15:00',
      whereTh: 'ห้องประชุมคณะ ชั้น 1',
      district: 3,
    },
    {
      th: 'ชมรม Debate',
      whenTh: '16:00 – 18:00',
      whereTh: 'ลานกิจกรรมหน้าอาคาร',
      district: 3,
    },
    {
      th: `ช่วงพีคของคณะ ${report.peakWindow}`,
      whenTh: report.peakWindow,
      whereTh: 'ทั้งคณะ — เผื่อเวลาเดินทางเพิ่ม',
      district: 4,
    },
  ]
}

/**
 * เคล็ดลับจาก MOMAY — อิงตัวเลขจริงของคณะ ไม่ใช่คำแนะนำทั่วไป
 * ช่วงที่ว่างที่สุดคำนวณจาก report.hours ซึ่งเป็นเส้นเดียวกับที่หน้า ORGANIZE ใช้
 */
export function tipsFrom(report, hour) {
  const after = report.hours.filter(h => h.at > hour)
  const calm = after.length
    ? after.reduce((best, h) => (h.value < best.value ? h : best), after[0])
    : null

  const tips = []
  if (calm) {
    tips.push({
      icon: 'clock',
      tone: 'time',
      th: `ช่วง ${calm.label} มักจะเป็นช่วงที่พื้นที่ว่างขึ้น`,
    })
  }
  tips.push({
    icon: 'users',
    tone: 'plan',
    th: 'ถ้ามีการทำงานกลุ่ม แนะนำจองห้องล่วงหน้าผ่านงานธุรการคณะ',
  })
  tips.push({
    icon: 'leaf',
    tone: 'green',
    th: 'ต้องการบรรยากาศธรรมชาติ ลองพื้นที่ Outdoor ด้านหน้าอาคาร',
  })
  return tips
}

/** สภาพแวดล้อมตอนนี้ — ผูกกับความหนาแน่นรวมของคณะ ไม่ใช่เลขนิ่ง */
export function conditions(report, hour) {
  const now = report.hours.find(h => h.at === hour)
  const load = now ? now.value : 0.4
  return {
    crowd: crowdWord(Math.min(1, load)),
    /* อุณหภูมิกับฝุ่นเป็นข้อมูลจำลอง หน้านี้ยังไม่ได้ต่อเซ็นเซอร์จริง
       แกว่างตามชั่วโมงเพื่อให้เห็นว่าค่าพวกนี้ "มีชีวิต" ไม่ใช่เลขค้าง */
    tempC: Math.round(28 + Math.sin(((hour - 6) / 12) * Math.PI) * 5),
    pm25: Math.round(14 + Math.cos(((hour - 4) / 14) * Math.PI) * 6),
    mock: true,
  }
}


/** พาธรูปของโซน — คืน null ถ้าโซนนั้นยังไม่มีรูปตรง หน้าจะได้ใช้พื้นไล่สีแทน */
export const photoOf = z => (z.photo ? `./zones/${z.photo}.jpg` : null)
