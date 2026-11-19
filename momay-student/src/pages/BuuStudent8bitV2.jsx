/**
 * BUU Student 8-bit (/buustudent8bit) — หน้านักศึกษาหน้าตาเกมยุค NES
 *
 * ข้อมูล ตรรกะ และการจัดหน้า = ชุดเดียวกับ /buustudent ทุกอย่าง ต่างกันแค่ "ผิว"
 * เอาไว้ใช้ตอนออกบูธ/งานเปิดตัว ที่หน้าจอต้องดึงคนให้เดินเข้ามาดูก่อนจะได้อธิบาย
 *
 * ธีมนี้ทำจากของ 5 อย่าง — จะแก้ธีมให้ดูที่นี่ก่อน
 *   1. จานสี C + S      สีจัด คอนทราสต์สูง ไม่มีเทากลาง ๆ แบบหน้าเดิม
 *   2. กรอบเหลี่ยม      มุมโค้งถูกบังคับเป็น 0 ทั้งหน้าด้วย CSS ใน .eb8 (ดูบล็อก <style>)
 *                       ไม่ต้องไล่ลบ borderRadius ทีละจุดในไฟล์
 *   3. เงาแข็ง          box-shadow ไม่เบลอ เยื้อง 4px เหมือนสไปรต์วางบนพื้น
 *   4. ไอคอนพิกเซล     ICONS = บิตแมป 8x8 เขียนเป็นสตริง วาดด้วย <rect> ต่อพิกเซล
 *   5. ฟอนต์พิกเซล     Press Start 2P เฉพาะป้ายอังกฤษของประดับ (S.pix) — ตัวเลขที่เป็น
 *                      ข้อมูลใช้ฟอนต์ปกติหนา ๆ (S.num) เพราะต้องอ่านให้ออกก่อนสวย
 *                       ฟอนต์นี้ไม่มีสระไทย ข้อความเนื้อหาจึงยังเป็น Sarabun เหมือนเดิม
 *                       ถ้าเอาไปครอบทั้งหน้า ชื่อห้องภาษาอังกฤษจะกว้างจนล้นการ์ด
 *
 * ไฟล์นี้ยกมาจาก BuuStudent.jsx ทั้งไฟล์ ไม่ได้ import ต่อกัน — แก้ตรรกะที่นั่นแล้ว
 * ต้องตามมาแก้ที่นี่ด้วย (จงใจแลกความซ้ำกับอิสระในการรื้อหน้าตาโดยไม่กระทบตัวจริง)
 *
 * ── ที่มาของข้อมูล (เหมือน /buustudent) ──
 *   /api/config         → ห้อง + กล้อง + ความจุ (meta.capacity) + ประเภทพื้นที่ (zoneType) + ผังชั้น (img)
 *   /api/camera-counts  → คน (count) และรถ (vcount) สด ๆ ราย-กล้อง
 *   /api/camera-density → ประวัติ 7 วัน ราย 30 นาที → "ปกติของช่วงเวลานี้" + คาดการณ์
 *
 * ส่วนที่ยังไม่มีข้อมูลจริงรองรับ จะขึ้นสถานะว่าง พร้อมบอกว่าต้องไปตั้งค่าตรงไหน
 */
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { roomCams } from '../lib/rooms'
import { usePageUsage } from '../lib/usePageUsage'

const LAN_HOST  = typeof window !== 'undefined' ? window.location.hostname : 'localhost'
const P_GATEWAY = import.meta.env.VITE_GATEWAY_PORT || '8002'
const API = (import.meta.env.VITE_DEVICES_API || `http://${LAN_HOST}:${P_GATEWAY}`).replace(/\/$/, '')

const HISTORY_DAYS = 7
// จำนวน "ทางเลือกอื่น" ที่โชว์พร้อมกัน — ที่เหลือวนสลับเข้ามาแทน
const OTHER_SHOWN = 3
// "ทางเลือกอื่น" ซ่อนไว้ก่อน — ตอนนี้หน้าหมวดเห็นทุกพื้นที่ครบอยู่แล้ว กลับไปกดเอาได้
// เปลี่ยนเป็น true เมื่อไหร่ก็กลับมาเหมือนเดิม
const SHOW_OTHERS = false
// แถว "คำแนะนำสำหรับคุณ" บนหน้าแรก ซ่อนไว้ก่อน — หน้าหมวดมีคำแนะนำของตัวเองอยู่แล้ว
// เปลี่ยนเป็น true เมื่อไหร่ก็กลับมา (หน้า rec ยังอยู่ครบ)
const SHOW_PLAN = false
const SLOTS = 48
const slotOf = d => d.getHours() * 2 + (d.getMinutes() >= 30 ? 1 : 0)
const dayKey = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const slotLabel = s => `${String(Math.floor(s / 2) % 24).padStart(2, '0')}:${s % 2 ? '30' : '00'}`

/* สีของ "แถวที่เลือก/กางอยู่" — แยกออกมาจากจานสีหลัก เพราะมันบอกสถานะ ไม่ใช่ประเภทของข้อมูล */
const SEL = '#ffffff'
const C = { purple: '#b06cff', green: '#35f58a', orange: '#ff8a3d', yellow: '#ffd84d', blue: '#3ad0ff', cyan: '#22e8ff', pink: '#ff4fd8', dim: '#b7a6e8' }

/* หมวดหมู่บนหน้าแรก = "จะมาทำอะไร" ไม่ใช่ "พื้นที่ประเภทไหน"
   นักศึกษาเปิดแอปมาพร้อมความตั้งใจ (จะอ่านหนังสือ/จะทำงานกลุ่ม) ไม่ได้มาพร้อมชื่อประเภทพื้นที่

   หนึ่งพื้นที่อยู่ได้หมวดเดียว ไม่งั้นใบเดิมโผล่ซ้ำหลายหมวดจนดูเหมือนข้อมูลซ้ำ
   ใครได้ไปขึ้นกับลำดับ: ใบที่ระบุชื่อไว้เฉพาะ (re) ชนะการจับด้วยประเภทพื้นที่ (types)
   เช่น Multimedia Room เป็น digital แต่ถูกระบุชื่อไว้ใน "สร้าง/นำเสนอ" จึงไปอยู่หมวดนั้น
   ชื่อพื้นที่มาจาก /settings ถ้าห้องสมุดเปลี่ยนชื่อห้อง ต้องตามแก้ re ด้วย

   "พื้นที่นั่งอ่านหน้าห้อง Cyberzone" เป็นที่นั่งอ่าน ไม่ใช่ห้อง Cyberzone จึงอยู่หมวดอ่านหนังสือ
   (ตัวห้อง Cyberzone เองยังไม่ได้ตั้งเป็นพื้นที่ในระบบ) */
const ACTIVITIES = [
  { key: 'read',   title: 'อ่านหนังสือ',    en: 'Reading',          sub: 'Quiet / Focus',                 subEn: 'Quiet / Focus',
    head: 'พื้นที่แนะนำสำหรับอ่านหนังสือ', headEn: 'Recommended to read',       color: C.purple, icon: 'book',   metric: 'dense', types: ['research', 'h24'] },
  { key: 'group',  title: 'ทำงานกลุ่ม',     en: 'Group Study',      sub: 'Group Study',                   subEn: 'Group Study',
    head: 'ห้องแนะนำสำหรับกลุ่มของคุณ',   headEn: 'Recommended for your group', color: C.green,  icon: 'group',  metric: 'dense', types: ['collaboration'] },
  { key: 'quiet',  title: 'ทำงานเงียบ ๆ',   en: 'Deep Work',        sub: 'Quiet Zone',                    subEn: 'Quiet Zone',
    head: 'โซนที่เงียบที่สุดตอนนี้',       headEn: 'Quietest zones now',        color: C.blue,   icon: 'brain',  metric: 'quiet', types: ['focus'] },
  { key: 'tech',   title: 'ใช้เทคโนโลยี',   en: 'Technology',       sub: 'iPad / Cyberzone / Multimedia', subEn: 'iPad / Cyberzone / Multimedia',
    head: 'พื้นที่ที่มีอุปกรณ์ให้ใช้',     headEn: 'Zones with devices',        color: C.pink,   icon: 'tablet', metric: 'dense', types: ['digital'] },
  { key: 'create', title: 'สร้าง / นำเสนอ', en: 'Create & Present', sub: 'Multimedia / Mini Theater',     subEn: 'Multimedia / Mini Theater',
    head: 'ห้องสำหรับงานสร้างสรรค์',      headEn: 'Rooms to create & present',  color: C.orange, icon: 'screen', metric: 'dense', re: /multimedia|mini theater/i },
  { key: 'social', title: 'พัก / พบปะ',     en: 'Social',           sub: 'Social / Learning Space',       subEn: 'Social / Learning Space',
    head: 'พื้นที่แนะนำสำหรับพักผ่อน',    headEn: 'Recommended to relax',       color: C.yellow, icon: 'cup',    metric: 'dense', types: ['social'] },
]
const ACT = Object.fromEntries(ACTIVITIES.map(a => [a.key, a]))
const named = z => `${z.label} ${z.labelEn || ''}`
const actOf = z =>
  ACTIVITIES.find(a => a.re && a.re.test(named(z))) ||
  ACTIVITIES.find(a => a.types?.includes(z.zoneType)) || null
const inAct = (a, z) => actOf(z)?.key === a.key

/* บางพื้นที่มีไอคอนเฉพาะของตัวเอง ที่บอกได้ตรงกวาไอคอนของหมวด
   ห้องคาราโอเกะอยู่หมวด "สร้าง/นำเสนอ" ซึ่งไอคอนเป็นกระดานนำเสนอ — ไม่ใช่สิ่งที่ไปทำที่นั่น
   จับจากชื่อพื้นที่ที่ผู้ดูแลตั้งไว้ที่ /settings ถ้าห้องสมุดเปลี่ยนชื่อห้อง ต้องตามแก้ที่นี่ */
const ZONE_ICON = [
  [/libraoke|karaoke|คาราโอเกะ|ร้องเพลง/i, 'mic'],
  /* ห้ามใส่ cyberzone: ชั้น 6 มี "พื้นที่นั่งอ่านหน้าห้อง Cyberzone" ซึ่งเป็นที่นั่งอ่าน
     ไม่ใช่โซนเกม แต่ชื่อห้องข้าง ๆ ติดมาในชื่อตัวเอง — กฎที่จับชื่อต้องแคบไว้ก่อน
     ผิดพลาดแล้วคนอ่านหน้าเว็บเชื่อไปเลยว่าชั้นนั้นมีโซนเกม */
  [/เกม|game ?zone|e-?sport/i, 'game'],
]
// fb = ไอคอนสำรองเมื่อพื้นที่นั้นยังไม่เข้าหมวดไหนเลย (แต่ละที่ใช้คนละใบตามบริบท)
const iconOf = (z, fb = 'grid') => ZONE_ICON.find(([re]) => re.test(named(z)))?.[1] || actOf(z)?.icon || fb


// ── ภาษา ──────────────────────────────────────────────────────────────
// เก็บข้อความไว้ที่เดียวเป็นคู่ [ไทย, อังกฤษ] — เพิ่มภาษาใหม่คือเพิ่ม index
// ไม่ต้องไล่แก้ทั้งไฟล์ · ค่าที่ผู้ใช้เลือกจำไว้ใน localStorage
const TXT = {
  hello:        ['สวัสดีครับ 👋', 'Hello 👋'],
  helloSub:     ['วันนี้จะไปชั้นไหน?', 'Which floor are you heading to?'],
  actSub:       ['วันนี้คุณต้องการทำอะไร?', 'What would you like to do today?'],
  notSet:       ['ยังไม่ได้ตั้งพื้นที่', 'Not configured yet'],
  planTitle:    ['คำแนะนำสำหรับคุณ', 'For you'],
  planSub:      ['วางแผนเวลาเข้าใช้บริการ', 'Plan your visit'],
  overview:     ['ภาพรวมวันนี้', 'Today at a glance'],
  normalDay:    ['วันเดียวกันสัปดาห์ก่อน', 'Same weekday'],
  normalYest:   ['เมื่อวาน', 'Yesterday'],
  todayLine:    ['วันนี้', 'Today'],
  inBuilding:   ['คนในอาคารตอนนี้', 'People in the building'],
  peakHours:    ['ช่วงเวลาคนหนาแน่น', 'Peak hours'],
  people:       ['คน', ''],
  aboveNormal:  ['มากกว่าปกติ', 'above normal'],
  belowNormal:  ['น้อยกว่าปกติ', 'below normal'],
  sameNormal:   ['พอ ๆ กับปกติ', 'about normal'],
  loadingHist:  ['กำลังโหลดสถิติย้อนหลัง…', 'Loading history…'],
  loading:      ['กำลังโหลด…', 'Loading…'],
  quietScore:   ['ความเงียบ', 'Quietness'],
  density:      ['ความหนาแน่นปัจจุบัน', 'Current density'],
  peopleNow:    ['คนปัจจุบัน', 'People now'],
  nextHour:     ['คาดการณ์อีก 1 ชม.', 'Next hour'],
  fewer:        ['คนน้อยลง', 'Fewer people'],
  more:         ['คนเยอะขึ้น', 'More people'],
  same:         ['พอ ๆ กับตอนนี้', 'About the same'],
  noStats:      ['ไม่มีสถิติพอ', 'Not enough data'],
  noStatsLong:  ['ยังไม่มีสถิติย้อนหลังพอ', 'Not enough history yet'],
  goZone:       ['นำทางไปพื้นที่', 'Go to this zone'],
  otherOptions: ['ทางเลือกอื่น', 'Other options'],
  bestLeftQ:    ['ช่วงที่เงียบที่สุดที่เหลือของวันนี้', 'Quietest time left today'],
  bestLeftF:    ['ช่วงที่ว่างที่สุดที่เหลือของวันนี้', 'Least crowded time left today'],
  basisSame:    ['เทียบกับวันเดียวกันของสัปดาห์ก่อน', 'Compared with the same weekday'],
  basisYest:    ['เทียบกับเมื่อวาน (ยังมีข้อมูลไม่ถึง 1 สัปดาห์)', 'Compared with yesterday (less than a week of data)'],
  basisNone:    ['ยังไม่มีข้อมูลวันก่อนหน้าให้เทียบ', 'No past data to compare with yet'],
  nowLbl:       ['ตอนนี้', 'Now'],
  unitPpl:      ['คน', 'ppl'],
  rateAsk:      ['ให้คะแนนพื้นที่นี้', 'Rate this zone'],
  rateMine:     ['คะแนนของคุณ', 'Your rating'],
  rateFrom:     ['จากผู้ให้คะแนน', 'from'],
  rateVoters:   ['คน', 'people'],
  rateNone:     ['ยังไม่มีใครให้คะแนน', 'No ratings yet'],
  rateFail:     ['ส่งคะแนนไม่สำเร็จ ลองใหม่อีกครั้ง', 'Could not save your rating — please try again'],
  rateOnce:     ['กดดาวเพื่อให้คะแนน', 'Tap a star to rate'],
  rateSaved:    ['บันทึกคะแนนของคุณแล้ว', 'Your rating is saved'],
  rateAvg:      ['เฉลี่ย', 'average'],
  rateClose:    ['ปิด', 'Close'],
  rateSend:     ['ส่งคะแนน', 'Submit rating'],
  ratePick:     ['เลือกจำนวนดาวก่อน', 'Pick a rating first'],
  bookTitle:    ['ห้องว่างสำหรับวันนี้', 'Rooms available today'],
  bookFree:     ['ว่าง', 'Free'],
  bookBusy:     ['ไม่ว่าง', 'In use'],
  bookNow:      ['จองเลย', 'Book'],
  bookSee:      ['ดูห้องว่าง', 'See free rooms'],
  bookUntil:    ['ถึง', 'until'],
  bookNext:     ['มีคิว', 'Next'],
  bookSeats:    ['ที่นั่ง', 'seats'],
  bookRooms:    ['ห้อง', 'rooms'],
  roomsFree:    ['ห้องว่างตอนนี้', 'Rooms free now'],
  roomsFreeShort: ['ห้องว่าง', 'rooms free'],
  seatsFreeShort: ['ที่นั่งว่าง', 'seats free'],
  seatsUsedShort: ['จำนวนที่ใช้งานอยู่', 'seats in use'],
  roomsUsedShort: ['ห้องที่ใช้งาน', 'rooms in use'],
  noDataShort:  ['ยังไม่มีข้อมูล', 'no data yet'],
  nudge:        ['แนะนำ', 'Suggested'],
  nudgeFree:    ['ยังมีที่ว่างมากที่สุดตอนนี้', 'has the most space right now'],
  nudgeQuiet:   ['เงียบที่สุดตอนนี้', 'is the quietest right now'],
  nudgeRoomFree: ['ยังว่าง จองได้เลยตอนนี้', 'is free to book right now'],
  freeNow:      ['ว่าง จองได้', 'Free to book'],
  notFree:      ['ไม่ว่าง', 'Busy'],
  until:        ['ถึง', 'until'],
  nudgeOpen:    ['เปิดอยู่และคนยังไม่แน่นตอนนี้', 'is open and not crowded right now'],
  bookName:     ['ชื่อผู้จอง', 'Your name'],
  bookPurpose:  ['ใช้ทำอะไร (ไม่บังคับ)', 'Purpose (optional)'],
  bookFrom:     ['เริ่ม', 'From'],
  bookTo:       ['ถึง', 'To'],
  bookConfirm:  ['ยืนยันการจอง', 'Confirm booking'],
  bookDone:     ['จองเรียบร้อย', 'Booked'],
  bookFail:     ['จองไม่สำเร็จ', 'Could not book'],
  bookNeedName: ['กรอกชื่อผู้จองก่อน', 'Please enter your name'],
  bookOverlap:  ['ช่วงเวลานี้มีคนจองแล้ว', 'That time is already booked'],
  bookBadTime:  ['เวลาสิ้นสุดต้องหลังเวลาเริ่ม', 'End time must be after start'],
  bookTaken:    ['ช่วงที่มีคนจองแล้ววันนี้', 'Already booked today'],
  bookNoRooms:  ['ยังไม่มีห้องในโหมดนี้', 'No rooms in this mode'],
  bookAuto:     ['ระบบจะเปิดไฟ/แอร์ให้เมื่อถึงเวลาที่จองไว้', 'Lights and AC turn on automatically at your booked time'],
  closedNow:    ['ปิดอยู่ตอนนี้', 'Closed now'],
  openHours:    ['เปิด', 'Open'],
  allZoneStats: ['สถิติรายพื้นที่', 'All zones'],
  seats:        ['ที่', 'seats'],
  latestPhoto:  ['ภาพล่าสุด', 'Latest photo'],
  justNow:      ['เมื่อครู่', 'just now'],
  minsAgo:      ['นาทีที่แล้ว', 'min ago'],
  bestForYou:   ['สิ่งที่เหมาะกับคุณวันนี้', 'Best for you today'],
  bestFor:      ['ดีที่สุดสำหรับ', 'Best for'],
  why:          ['เหตุผลที่แนะนำ', 'Why we recommend it'],
  freerThan:    ['ว่างกว่าปกติ', 'Freer than usual'],
  freerSub:     ['เมื่อเทียบกับค่าเฉลี่ยช่วงเวลานี้', 'vs. the average for this time'],
  fewerThan:    ['คนน้อยกว่าช่วงเวลาเดียวกัน', 'Fewer people than usual'],
  fewerSub:     ['เทียบกับวันเดียวกันของสัปดาห์ก่อน', 'vs. the same weekday'],
  seatsFree:    ['ที่นั่งว่างตอนนี้', 'Seats free now'],
  seatsOf:      ['จากทั้งหมด', 'out of'],
  noReason:     ['ยังไม่มีสถิติย้อนหลังพอจะเทียบ — แสดงจากค่าสดอย่างเดียว', 'Not enough history to compare — showing live values only'],
  bestTime:     ['ช่วงเวลาที่แนะนำให้เข้าใช้', 'Best time to visit'],
  bestTimeSubQ: ['จะเงียบและไม่แออัดที่สุด', 'Quietest and least crowded'],
  bestTimeSubF: ['จะว่างและไม่แออัดที่สุด', 'Most free and least crowded'],
  notPersonal:  ['คำแนะนำนี้คำนวณจากข้อมูลของอาคารทั้งหมด ยังไม่ได้อิงพฤติกรรมรายบุคคล (ต้องมีระบบล็อกอินก่อน จึงจะเรียนรู้ช่วงเวลาที่คุณใช้ประจำได้)',
                 'These suggestions are based on building-wide data, not your personal history — that needs sign-in first.'],
  recTitle:     ['คำแนะนำสำหรับคุณ', 'For you'],
  recSub:       ['วันนี้ Momay แนะนำให้คุณ', 'Momay recommends today'],
  recNone:      ['ยังแนะนำไม่ได้ — ต้องมีพื้นที่ที่ตั้งประเภทพื้นที่ไว้ และมีกล้องส่งข้อมูลเข้ามาอย่างน้อย 1 ตัว',
                 'Nothing to recommend yet — at least one zone needs a zone type and a camera reporting data.'],
  parkTitle:    ['ที่จอดรถ', 'Parking'],
  parkSub:      ['เช็คที่จอดว่างแบบเรียลไทม์', 'Live availability'],
  parked:       ['รถที่จอดอยู่', 'Cars parked'],
  free:         ['ว่าง', 'Free'],
  slots:        ['ช่อง', 'slots'],
  cars:         ['คัน', 'cars'],
  unknown:      ['ไม่ทราบ', 'Unknown'],
  noParkCam:    ['ยังไม่มีกล้องตัวไหนตั้งเป็นตรวจจับรถ — ตั้งได้ที่ /settings → แก้ไขกล้อง → เป้าหมายตรวจจับ = รถ',
                 'No camera is set to detect vehicles yet — set it in /settings → edit camera → detection target = vehicle.'],
  noCapacity:   ['ยังไม่ได้ตั้ง "จำนวนช่องจอด" ที่ /settings จึงบอกได้แค่จำนวนรถ',
                 'Parking capacity is not set in /settings, so only the car count is available.'],
  mapTitle:     ['แผนที่', 'Map'],
  mapSub:       ['ผังพื้นที่และความหนาแน่นตอนนี้', 'Floor plan & current density'],
  noPlan:       ['ห้องนี้ยังไม่ได้ตั้งรูปผัง (ตั้งที่ /settings)', 'No floor plan set for this zone (set it in /settings)'],
  noZone:       ['ยังไม่มีพื้นที่', 'No zones yet'],
  floorPick:    ['บริการตามชั้น', 'Pick a floor'],
  share:        ['แชร์ลิงก์หน้านี้', 'Share this page'],
  viewsAll:     ['ยอดเข้าชมเว็บสะสม', 'Total site views'],
  visitorUnit:  ['visitor', 'visitor'],
  shareCopied:  ['คัดลอกลิงก์แล้ว', 'Link copied'],
  shareCopy:    ['คัดลอกลิงก์', 'Copy link'],
  shareApp:     ['แชร์ผ่านแอปอื่น…', 'Share via another app…'],
  pickTitle:    ['หนังสือแนะนำ', 'Book picks'],
  sampleData:   ['ข้อมูลตัวอย่าง', 'Sample data'],
  zonesUnit:    ['พื้นที่', 'zones'],
  fitScreen:    ['พอดี', 'Fit'],
  sheetOpen:    ['ลากขึ้นดูรายการ', 'Swipe for list'],
  sheetClose:   ['ปิดรายการ', 'Close list'],
  momayFinds:   ['Momay ช่วยหา', 'Momay will find it'],
  open24:       ['เปิด 24 ชม.', 'Open 24 hrs'],
  all24:        ['พื้นที่ให้บริการ 24 ชม.', '24-hour service area'],
  openWord:     ['เปิดอยู่', 'Open now'],
  closedWord:   ['ปิดแล้ว', 'Closed'],
  spots:        ['จุด', 'spots'],
  notiTitle:    ['ยังไม่มีการแจ้งเตือน', 'No notifications'],
  meTitle:      ['โปรไฟล์', 'Profile'],
  errConn:      ['เชื่อมต่อระบบไม่ได้ — ลองรีเฟรชอีกครั้ง', 'Cannot reach the system — please refresh'],
  navHome:      ['หน้าหลัก', 'Home'],
  navZones:     ['พื้นที่', 'Zones'],
  navMap:       ['แผนที่', 'Map'],
  navNoti:      ['แจ้งเตือน', 'Alerts'],
  navMe:        ['โปรไฟล์', 'Profile'],
  floorWord:    ['ชั้น', 'Floor'],
  recommended:  ['แนะนำ', 'Recommended'],
  noZoneOfType: ['ยังไม่มีพื้นที่ไหนถูกตั้งเป็น', 'No zone is set as'],
}
// ── ขนาดจอ ───────────────────────────────────────────────────────────
// iPad mini 744 · Air 820 · Pro 1024 (แนวตั้ง) กว้างกว่าคอลัมน์มือถือ 430 ทั้งหมด
// ถ้าไม่ทำอะไร หน้าจะเป็นแถบผอมกลางจอ เหลือพื้นที่ดำสองข้างเปล่า ๆ
// จึงขยายคอลัมน์ + แตกลิสต์การ์ดเป็น 2 คอลัมน์เมื่อจอกว้างพอ
const UICtx = createContext({ wide: false, cols: 1, maxW: 430 })
const useUI = () => useContext(UICtx)
const PHONE_W = 430
// จอตัวตั้งของดีไซน์ = iPhone 12/13/14 (390) · จอที่แคบกว่านี้ย่อลงตามสัดส่วน
const NARROW_BASE = 390
function useViewport() {
  const [w, setW] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 430))
  useEffect(() => {
    const on = () => setW(window.innerWidth)
    window.addEventListener('resize', on)
    window.addEventListener('orientationchange', on)
    return () => { window.removeEventListener('resize', on); window.removeEventListener('orientationchange', on) }
  }, [])
  /* แท็บเล็ตใช้ "ผังเดียวกับมือถือ" แล้วขยายทั้งหน้าให้เต็มจอ ไม่ใช่แตกเป็นหลายคอลัมน์
     แตกคอลัมน์แล้วการ์ดจะยืดกว้างขึ้นแต่ตัวหนังสือเท่าเดิม สัดส่วนเลยเพี้ยน
     zoom ขยายทั้งขนาดตัวอักษรและระยะห่างพร้อมกัน หน้าตาจึงเหมือนมือถือเป๊ะ แค่ใหญ่ขึ้น
     จำกัดที่ 2.2 เท่า เกินกว่านั้นบนจอแนวนอนจะใหญ่จนดูเทอะทะ */
  /* จอที่แคบกว่าจอตัวตั้ง (S8+ = 360 · iPhone 12/13/14 = 390) ก็ย่อทั้งหน้าลงด้วยวิธี
     เดียวกัน ไม่ใช่ปล่อยให้ตัวหนังสือขนาดเท่าเดิมแต่ที่ว่างหายไป 30px — ชื่อพื้นที่ยาว ๆ
     จะตกบรรทัดเพิ่มทีละใบจนสัดส่วนทั้งการ์ดเพี้ยนไปคนละแบบกับที่ออกแบบไว้ */
  return useMemo(() => {
    const wideScreen = w >= 600
    const zoom = wideScreen ? Math.min(2.2, w / PHONE_W) : Math.min(1, w / NARROW_BASE)
    // ย่อ/ขยายแล้วต้องกว้างพอดีจอ จึงต้องกางความกว้างตามฐานที่ใช้คิด zoom
    // (ปล่อย 100% ไว้ตอน zoom ไม่เท่า 1 จะเหลือแถบว่างข้างหนึ่งเท่ากับส่วนที่ย่อไป)
    const base = zoom === 1 ? null : wideScreen ? PHONE_W : NARROW_BASE
    return { wide: false, cols: 1, maxW: PHONE_W, zoom, base }
  }, [w])
}

const LangCtx = createContext('th')
function useT() {
  const lang = useContext(LangCtx)
  const i = lang === 'en' ? 1 : 0
  const t = k => (TXT[k] ? TXT[k][i] : k)
  t.i = i; t.lang = lang
  return t
}
// ข้อความของกิจกรรมเก็บอยู่ใน ACTIVITIES อยู่แล้ว — หยิบตามภาษาที่เลือก
const actT = (a, i) => ({ title: i ? a.en : a.title, sub: i ? a.subEn : a.sub, head: i ? a.headEn : a.head })

// ชื่อกลุ่มพื้นที่ — ใช้เป็นป้ายกำกับ และเป็นชื่อสำรองตอนผู้ดูแลยังไม่ได้ตั้งชื่อพื้นที่
const ZONE_NAME = {
  h24: '24H Access', focus: 'Focus Mode', collaboration: 'Collaboration Room',
  social: 'Social Learning', digital: 'Digital Zone', research: 'Explore & Research',
}
// ข้อความที่ผู้ดูแลกรอก: ใช้ EN เมื่อเลือกอังกฤษ ถ้าไม่ได้กรอกก็ถอยไปไทย
const zLabel = (z, i) => (i && z.labelEn) || z.label
const zTags  = (z, i) => (i && z.tagsEn?.length) ? z.tagsEn : z.tags
const zNote  = (z, i) => (i && z.noteEn) || z.note

/* ชื่อพื้นที่ที่นักศึกษาเห็น = ชื่อจริงของพื้นที่ + ชั้น ("Quiet Zone (ชั้น 3)")

   เดิมตั้งชื่อจากประเภท+ชั้น ("Focus Floor (ชั้น 3)") ซึ่งกลืนชื่อจริงทิ้งไปหมด
   แต่ห้องสมุดตั้งชื่อพื้นที่ไว้แล้วและป้ายหน้าประตูก็เขียนตามนั้น (Quiet Zone /
   Libraoke / Books Showroom) ถ้าเว็บเรียกอีกชื่อ นักศึกษาเดินหาห้องไม่เจอ
   ชั้นยังต้องต่อท้าย เพราะชื่อซ้ำกันหลายชั้น (Quiet Zone มีทั้งชั้น 3/4/5) */
const zoneName = (z, i = 0) => {
  const base = zLabel(z, i) || ZONE_NAME[z.zoneType] || ''
  if (z.floor == null) return base                            // ยังไม่ตั้งชั้น → ไม่ต้องเดา
  // บางพื้นที่ตั้งชื่อโดยมีชั้นอยู่ในชื่อแล้ว ("ชั้น1") ต่อท้ายอีกจะได้ "ชั้น1 (ชั้น 1)"
  if (new RegExp(`(ชั้น|floor)\s*${z.floor}(?!\d)`, 'i').test(base)) return base
  return `${base} (${i ? 'Floor' : 'ชั้น'} ${z.floor})`
}

// ── ไอคอน: อาร์ตพิกเซลวาดเป็นตาราง ────────────────────────────────────
/* ไอคอนทุกตัวคือตารางพิกเซลที่เขียนเป็นสตริง — แก้รูปคือแก้ตัวอักษร ไม่ต้องเปิดโปรแกรมวาด
   ตัวอักษรแต่ละตัวคือสีหนึ่งสีในจานสีของไอคอนนั้น · '.' คือพิกเซลโปร่งใส
   '@' เป็นตัวพิเศษ = "ใช้สีที่คนเรียกส่งมา" ไอคอนที่ต้องเปลี่ยนสีตามบริบท
   (ลูกศร นาฬิกา ไอคอนแท็บล่างที่เปลี่ยนสีตอนถูกเลือก) จึงวาดด้วย '@' ล้วน

   ไอคอนที่ผู้ใช้เห็นบ่อยวาดบนตาราง 12x12 เพราะ 8x8 ละเอียดไม่พอจะแยก
   "แก้วกาแฟ" ออกจาก "ถ้วยรางวัล" ได้ · ที่เหลือใช้ 8x8 สีเดียวก็พอ
   ขนาดตารางเก็บไว้ที่ n ของแต่ละใบ ไม่ได้บังคับให้เท่ากันทุกใบ

   วาดโดยรวมพิกเซลสีเดียวกันที่ติดกันในแถวเดียวกันเป็นแท่งเดียว จำนวน node จึงน้อยกว่า
   วาดทีละพิกเซลมาก · shapeRendering=crispEdges กันเบราว์เซอร์ลบรอยหยักให้
   ซึ่งเป็นสาเหตุเดียวที่ทำให้ภาพพิกเซลดูเบลอตอนขยาย */

/* อาร์ต 24x24 ของไอคอนกิจกรรม — วาดตามภาพต้นแบบที่ผู้ใช้ส่งมา
   '@' = สีที่คนเรียกส่งมา (ตรงกับสีในภาพต้นแบบอยู่แล้ว: อ่านหนังสือ=ม่วง ·
   ทำงานกลุ่ม=เขียว · ทำงานเงียบ=ฟ้า · เทคโนโลยี=ชมพู · สร้าง/นำเสนอ=ส้ม · พัก=เหลือง)
   'd' = สีเดียวกันแต่เข้มลง ใช้ทำเงา/รายละเอียดชั้นใน · '.' = โปร่งใส

   24x24 เพราะรูปพวกนี้เป็นฉากทั้งนั้น (คนนั่งโซฟา / คนล้อมโต๊ะ / คนนำเสนอหน้ากระดาน)
   16x16 ที่ลองก่อนหน้านี้ละเอียดไม่พอ แยกแก้วกาแฟกับถ้วยรางวัลยังไม่ออกเลย

   ไฟล์ที่วาดต้นฉบับอยู่นอก repo — ที่นี่เก็บผลลัพธ์เป็นสตริง แก้รูปคือแก้ตัวอักษร */
const ART24 = {
  tablet: [
    '........................', '...@@@@@@@@@@@@@@.......', '...@....@@@@....@.......', '...@............@.......',
    '...@.@@@@@@@@@@.@.......', '...@.@........@.@.......', '...@.@........@.@.......', '...@.@........@.@.......',
    '...@.@........@.@.......', '...@.@..................', '...@.@..................', '...@.@.........@@@@@@@@.',
    '...@.@.........@..@@..@.', '...@.@.........@......@.', '...@.@.........@.@@@@.@.', '...@.@.........@.@..@.@.',
    '...@.@.........@.@..@.@.', '...@.@@@@@@@@..@.@..@.@.', '...@......@....@.@..@.@.', '...@.....@@@...@.@@@@.@.',
    '...@@@@@@@@@@..@......@.', '...............@..@...@.', '...............@@@@@@@@.', '........................'],
  mic: [
    '....................@@@.', '...................@@@@.', '...................@....', '...................@....',
    '...............@@@.@...@', '.............@@@@@@@...@', '.............@@@@@@@...@', '............@@@@@@@@d..@',
    '............@@@@d@@d@..@', '...........d@@@d@@d@@@@@', '..........ddd@d@@d@@.@@.', '.........ddddd@@d@@@....',
    '........@ddddddd@@......', '.......@@ddddd..........', '......@@@dddd...........', '.....@@@@.@@............',
    '....@@@@.@@.............', '....@@@@@@..............', '.@@@@@@@@...............', '.@@@@@@@................',
    '.@@@....................', '..@@@...................', '...@@...................', '........................'],
  cup: [
    '........................', '........................', '........................', '........................',
    '........................', '.....@@@@@@@@@@@@@@.....', '....@@@@@@@@@@@@@@@@....', '....@@@@@@@@@@@@@@@@....',
    '.@@@@@@@@@@@@@@@@@@@@@@.', '.@@@@@@@@@@@@@@@@@@@@@@.', '.@@@@@@@@@@@@@@@@@@@@@@.', '.@@@@@@@@@@@@@@@@@@@@@@.',
    '.@@@@..............@@@@.', '.@@@@@@@@@@.@@@@@@@@@@@.', '.@@@@@@@@@@.@@@@@@@@@@@.', '.@@@@@@@@@@.@@@@@@@@@@@.',
    '.@@@@@@@@@@@@@@@@@@@@@@.', '.@@@@@@@@@@@@@@@@@@@@@@.', '..@@@..............@@@..', '..@@@..............@@@..',
    '..@@@..............@@@..', '........................', '........................', '........................'],
  game: [
    '........................', '........................', '........................', '........................',
    '........................', '........................', '........................', '.....@@@@@@@@@@@@@@.....',
    '.....@@@@@@@@@@@.@@.....', '..@@@@@@@.@@@@....@@@@..', '..@@@@....@@@..@.@@.@@..', '..@@@.....@@...@@@...@..',
    '..@@@.....@@@..@@@@.@@..', '..@@@@....@@@@.@.@@@@@..', '..@@@@@@@.@@@@....@@@@..', '..@@@@@@@.@@@@.@.@@@@@..',
    '..@@@@@@@......@@@@@@@..', '..@@@@@@@......@@@@@@@..', '..@@@@@@@......@@@@@@@..', '....@@@@@......@@@@@....',
    '........................', '........................', '........................', '........................'],
  group: [
    '........................', '..........@@@...........', '........@@@@@@@.........', '........@@...@@.........',
    '.......@@.....@@........', '.......@@.....@@........', '.......@@.....@@........', '...@@@..@@...@@...@@@...',
    '..@@@@@..........@@@@@..', '.@@@.@@@@.....@@@@@.@@@.', '.@@...@@@@@@@@@@@@...@@.', '.@@@.@@@@@@@@@@@@@@.@@@.',
    '........@@@@@@@@........', '.@@@@@@@@@@@@@@@@@@@@@@.', '.@@@@@@@........@@@@@@@.', '.@@@@@@@d......d@@@@@@@.',
    '.@@@@@@@d......d@@@@@@@.', '.@@@@..............@@@@.', '.@@@@@@@@@@@@@@@@@@@@@@.', '.@@@@@@@@@@@@@@@@@@@@@@.',
    '.......@@@@@@@@@@.......', '..........@@@@..........', '..........@@@@..........', '........................'],
  book: [
    '........................', '........................', '........................', '........................',
    '..........@@@@..........', '.......@@@@@@@@@@.......', '....@@@@...@@...@@@@....', '...@@......@@......@@...',
    '..@........@@........@..', '..@........@@........@..', '..@........@@........@..', '..@........@@........@..',
    '..@........@@........@..', '..@........@@........@..', '..@........@@........@..', '..@........@@........@..',
    '..@........@@........@..', '..@........@@........@..', '..@@ddd....@@....ddd@@..', '....@@dddd.@@.dddd@@....',
    '.......@@dddddd@@.......', '..........@@@@..........', '........................', '........................'],
  screen: [
    '.....................dd.', '....................dddd', '.....................dd.', '.........@@@@@@@@@@@@@@@',
    '.........@@@@@@@@@@@@@@@', '...@@@....@...........@.', '..@@@@@...@...........@.', '..@@@@@...@........@@.@.',
    '..@@@@@...@........@@.@.', '..........@....d@@.@@.@.', '..@@@@@...@...d.@@.@@.@.', '..@@@@@@@.@..d@.@@.@@.@.',
    '..@@@@@@@.@.d@@.@@.@@.@.', '..@@@@@...@...........@.', '..@@@@@..@@@@@@@@@@@@@@@', '..@@@@@..@@@@@@@@@@@@@@@',
    '..@@@@@........@@.......', '..@@@@@........@@.......', '..@@.@@........@@.......', '..@@.@@.....@@@@@@@@....',
    '..@@.@@.....@@@@@@@@....', '..@@.@@.................', '..@@.@@.................', '........................'],
  brain: [
    '........................', '........................', '........@@@.............', '.......@@@@@............',
    '......@@@@@@@...........', '......@@@@@@@...........', '......@@@@@@@...........', '.......@@@@@............',
    '......@@@@@@............', '........................', '..@@..@@@@@@............', '..@@..@@@@@@..ddddddd...',
    '..@@..@@@@@@@@ddddddd...', '..@@..@@@@@@@@@@........', '..@@..@@@@@..@@@@@@@@@@@', '..@@..@@@@@@.@@@@@@@@@@@',
    '..@.......@@.........@@.', '..@@@@@@@@@@.........@@.', '..@@@@@@@@@@@@.......@@.', '....@@..@@@@@@.......@@.',
    '....@@..@@..@@@@.....@@.', '....@@..@@..@@@@.....@@.', '....@@..@@...........@@.', '........................'],
}

// อาร์ตหลายสี 12x12// อาร์ตหลายสี 12x12 — ชุดที่โผล่ในแถวชั้นและหัวข้อบนหน้าแรก
const ART12 = {
  // แชร์: สามจุดโยงกันด้วยเส้น — 8x8 แคบไปจนจุดกับเส้นติดกันเป็นก้อน
  share: { p: { '@': '@' }, rows: [
    '........@@@.', '........@@@.', '........@@@.', '.......@@...',
    '.@@@..@@....', '.@@@.@......', '.@@@.@......', '......@@....',
    '.......@@...', '........@@@.', '........@@@.', '............'] },
  // ดวงตา: ทรงเมล็ดข้าว ขอบบาง ตาดำอยู่กลาง — 8x8 เดิมกลายเป็นวงกลมมีจุด ดูเป็นปุ่มอัดเสียง
  eye: { p: { '@': '@' }, rows: [
    '............', '...@@@@@@...', '.@@......@@.', '@@...@@...@@',
    '@...@@@@...@', '@...@@@@...@', '@@...@@...@@', '.@@......@@.',
    '...@@@@@@...', '............', '............', '............'] },
  // รถมองจากหน้า: ตัวถังฟ้า กระจกมืด ไฟหน้าเหลือง ล้อมืด
  car: { p: { c: '#22e8ff', w: '#bff6ff', d: '#12102a', y: '#ffd84d' }, rows: [
    '............', '...cccccc...', '..cwwwwwwc..', '..cwddddwc..',
    '.cccccccccc.', '.cccccccccc.', '.cyc....cyc.', '.cccccccccc.',
    '..dd....dd..', '..dd....dd..', '............', '............'] },
  // คนเดียว (ใช้ในการ์ดสรุปจำนวนคน)
  users: { p: { w: '#ffffff' }, rows: [
    '............', '....wwww....', '...wwwwww...', '...wwwwww...',
    '...wwwwww...', '....wwww....', '............', '...wwwwww...',
    '..wwwwwwww..', '.wwwwwwwwww.', '.wwwwwwwwww.', '.wwwwwwwwww.'] },
  // กราฟแท่ง (หัวข้อ "ภาพรวมวันนี้")
  trend: { p: { b: '#38b6ff', g: '#35f58a', y: '#ffd84d', w: '#8b6fd0' }, rows: [
    '............', '.........yy.', '.........yy.', '......gg.yy.',
    '......gg.yy.', '...bb.gg.yy.', '...bb.gg.yy.', '...bb.gg.yy.',
    '...bb.gg.yy.', '.wwwwwwwwww.', '............', '............'] },
  // นาฬิกา — ใช้ '@' ทั้งใบ เพราะต้องเปลี่ยนสีตามที่ที่เอาไปวาง
  clock: { p: { '@': '@' }, rows: [
    '....@@@@....', '..@@....@@..', '.@........@.', '.@...@....@.',
    '@....@.....@', '@....@.....@', '@....@@@...@', '@..........@',
    '.@........@.', '.@........@.', '..@@....@@..', '....@@@@....'] },
}


// อาร์ตสีเดียว 8x8 — ไอคอนที่เป็นสัญลักษณ์ล้วน ไม่ต้องมีรายละเอียดสี
const ART8 = {
  home:    ['...@@...', '..@@@@..', '.@@@@@@.', '@@@@@@@@', '.@....@.', '.@.@@.@.', '.@.@@.@.', '........'],
  grid:    ['@@@..@@@', '@@@..@@@', '@@@..@@@', '........', '@@@..@@@', '@@@..@@@', '@@@..@@@', '........'],
  map:     ['..@@@@..', '.@@@@@@.', '@@....@@', '@@....@@', '.@@@@@@.', '..@@@@..', '...@@...', '...@@...'],
  bell:    ['...@@...', '..@@@@..', '..@@@@..', '.@@@@@@.', '.@@@@@@.', '@@@@@@@@', '........', '...@@...'],
  user:    ['..@@@@..', '.@@@@@@.', '.@@@@@@.', '..@@@@..', '........', '.@@@@@@.', '@@@@@@@@', '@@....@@'],
  search:  ['..@@@@..', '.@....@.', '@......@', '@......@', '.@....@.', '..@@@@..', '....@@@.', '.....@@@'],
  cal:     ['.@....@.', '@@@@@@@@', '@@@@@@@@', '@......@', '@.@.@..@', '@......@', '@.@.@..@', '@@@@@@@@'],
  moon:    ['...@@@..', '..@@@...', '.@@@....', '.@@.....', '.@@.....', '.@@@....', '..@@@...', '...@@@..'],
  sunmoon: ['.....@@.', '....@@..', '....@@..', '.....@@.', '..@.....', '.@@@....', '@@@@@...', '.@@@....'],
  pin:     ['..@@@@..', '.@@@@@@.', '@@....@@', '@@....@@', '.@@@@@@.', '..@@@@..', '...@@...', '...@@...'],
  back:    ['....@...', '...@@...', '..@@....', '.@@.....', '.@@.....', '..@@....', '...@@...', '....@...'],
  right:   ['...@....', '...@@...', '....@@..', '.....@@.', '.....@@.', '....@@..', '...@@...', '...@....'],
  info:    ['..@@@@..', '.@....@.', '@..@@..@', '@......@', '@..@@..@', '@..@@..@', '.@....@.', '..@@@@..'],
  chat:    ['@@@@@@@@', '@......@', '@.@@@@.@', '@......@', '@.@@@@.@', '@......@', '@@@@@@@@', '..@@....'],
  star:    ['...@@...', '...@@...', '..@@@@..', '@@@@@@@@', '.@@@@@@.', '..@@@@..', '.@@..@@.', '@@....@@'],
  // จุดสามจุดโยงกันด้วยเส้น — สัญลักษณ์แชร์แบบที่คนคุ้นอยู่แล้ว

}

// รวมพิกเซลสีเดียวกันที่ติดกันในแถวเดียวกัน → [x, y, กว้าง, ตัวอักษรสี]
const runsOf = rows => {
  const out = []
  rows.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      const ch = row[x]
      if (ch === '.') { x++; continue }
      let w = 0
      while (row[x + w] === ch) w++
      out.push([x, y, w, ch]); x += w
    }
  })
  return out
}
const ART = {}
for (const [k, v] of Object.entries(ART12)) ART[k] = { n: 12, p: v.p, runs: runsOf(v.rows) }
for (const [k, v] of Object.entries(ART8))  ART[k] = { n: 8,  p: { '@': '@' }, runs: runsOf(v) }
for (const [k, v] of Object.entries(ART24)) ART[k] = { n: 24, p: { '@': '@', d: 'd' }, runs: runsOf(v) }
// ไอคอนที่ยังไม่มีอาร์ตของตัวเอง ยืมของใบที่สื่อความหมายเดียวกันไปก่อน
ART.users = ART.users || ART.group

/* หรี่สีลงตามอัตราส่วน — ใช้ทำพิกเซล 'd' (เงา/รายละเอียดชั้นใน) ของไอคอน
   คิดจากสีที่คนเรียกส่งมา ไม่ได้ระบุสีเข้มไว้ในอาร์ต ไอคอนใบเดียวจึงใช้ได้ทุกหมวด */
const shade = (hex, f = 0.55) => {
  const h = hex.replace('#', '')
  const n = h.length === 3 ? h.split('').map(c => c + c).join('') : h
  const v = parseInt(n.slice(0, 6), 16)
  const p = i => Math.round(((v >> (16 - i * 8)) & 255) * f)
  return `rgb(${p(0)},${p(1)},${p(2)})`
}

/* ไอคอนกิจกรรม = ไฟล์ต้นฉบับที่ผู้ใช้วาดเอง (public/icons/*.png ย่อไว้แล้วที่ 96px)
   ย่อจากไฟล์จริงตอนแสดงผล ไม่ได้ไล่ลงตารางพิกเซลใหม่ — รูปจึงเหมือนต้นฉบับทุกใบ
   สีในไฟล์ตรงกับสีประจำหมวดอยู่แล้ว (หนังสือม่วง · กลุ่มเขียว · เงียบฟ้า · นำเสนอส้ม ฯลฯ)
   ไฟล์หายค่อยถอยไปใช้อาร์ตพิกเซลในไฟล์นี้ (ART24) ที่วาดตามภาพเดียวกัน */
const IMG_ICON = {
  book: 'book', group: 'group', brain: 'solo', screen: 'present',
  tablet: 'tablet', cup: 'relax', mic: 'karaoke', game: 'game',
}

// sw รับไว้เฉย ๆ ให้เรียกได้เหมือนไอคอนของหน้าเดิม — ภาพพิกเซลไม่มีความหนาเส้น
const Icon = ({ name, color = '#fff', size = 22, sw = 1.7 }) => {
  const [imgDead, setImgDead] = useState(false)
  const file = IMG_ICON[name]
  if (file && !imgDead) {
    // imageRendering: auto — ธีมนี้ตั้ง pixelated ไว้ทั้งหน้า ซึ่งตอน "ย่อ" รูปจะทำให้
    // เส้นบาง ๆ หายไปทั้งเส้น (nearest neighbour ทิ้งพิกเซลที่ไม่ตรงจุดสุ่ม)
    return <img src={`/icons/${file}.png`} alt="" width={size} height={size}
      onError={() => setImgDead(true)}
      style={{ display: 'block', flexShrink: 0, imageRendering: 'auto' }} />
  }
  const a = ART[name]
  if (!a) return null
  const dark = shade(color)
  return (
    <svg width={size} height={size} viewBox={`0 0 ${a.n} ${a.n}`} shapeRendering="crispEdges" style={{ display: 'block', flexShrink: 0 }}>
      {a.runs.map(([x, y, w, ch], i) => {
        const c = a.p[ch]
        return <rect key={i} x={x} y={y} width={w} height="1" fill={c === 'd' ? dark : (!c || c === '@') ? color : c} />
      })}
    </svg>
  )
}

// ── เกณฑ์สี/คำ ใช้ชุดเดียวกันทั้งหน้า ────────────────────────────────
const densColor = p => p == null ? '#5f2fae' : p >= 85 ? '#ff2d55' : p >= 70 ? C.orange : p >= 40 ? '#ffd84d' : C.green
const DENS_W  = [['ไม่ทราบ', 'แน่นมาก', 'ค่อนข้างแน่น', 'ปานกลาง', 'ค่อนข้างว่าง'],
                 ['Unknown', 'Very busy', 'Busy', 'Moderate', 'Fairly free']]
// เรียงตามคะแนน 1-5 ที่ผู้ดูแลให้ (index 0 = ยังไม่ได้ให้คะแนน)
const QUIET_W = [['ผู้ดูแลยังไม่ได้ให้คะแนน', 'พลุกพล่าน', 'ค่อนข้างพลุกพล่าน', 'พอมีเสียง', 'ค่อนข้างเงียบ', 'เงียบมาก'],
                 ['Not rated yet', 'Very noisy', 'Noisy', 'Some noise', 'Quiet', 'Very quiet']]
const densWord  = (p, i = 0) => DENS_W[i][p == null ? 0 : p >= 85 ? 1 : p >= 70 ? 2 : p >= 40 ? 3 : 4]
const quietWord = (r, i = 0) => QUIET_W[i][r == null ? 0 : Math.max(1, Math.min(5, Math.round(r)))]
const stars = r => Math.max(0, Math.min(5, Math.round(r ?? 0)))

/* พื้นหลัง = สี่เหลี่ยมพิกเซลขาวนีออน ลอยจากล่างขึ้นบนวนไม่รู้จบ พร้อมย่อ-ขยาย
   ทำด้วย CSS animation ล้วน ไม่ใช่ requestAnimationFrame — เบราว์เซอร์หยุดวาดให้เอง
   ตอนแท็บถูกซ่อน และไม่แย่ง main thread ตอนผู้ใช้เลื่อนหน้า

   สุ่มตำแหน่ง/ขนาด/จังหวะด้วยเลขตั้งต้นคงที่ ไม่ใช้ Math.random — ลายจะได้ไม่เปลี่ยน
   ทุกครั้งที่ re-render · delay เป็นค่าติดลบ = ให้แต่ละใบ "เริ่มไปแล้วกลางทาง"
   ตั้งแต่วินาทีแรก ไม่ต้องรอทั้งจอค่อย ๆ โผล่พร้อมกันเป็นแถวตอนเปิดหน้า

   ความจางเก็บไว้ในสีพื้น ไม่ใช่ opacity ของกล่อง เพราะ opacity ถูก keyframe
   คุมอยู่ (ใช้ทำจังหวะโผล่/หายหัวท้าย) ถ้าไปตั้งซ้ำที่ inline จะโดนทับหมด */
const PARTICLES = (() => {
  let seed = 20250907
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648
  return Array.from({ length: 46 }, () => ({
    left:  +(rnd() * 100).toFixed(2),
    size:  3 + Math.round(rnd() * 7),
    dur:   +(9 + rnd() * 14).toFixed(1),
    delay: +(-rnd() * 24).toFixed(1),
    tone:  +(0.34 + rnd() * 0.5).toFixed(2),
  }))
})()
const StarField = () => (
  <div aria-hidden style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    {PARTICLES.map((p, i) => (
      <span key={i} className="eb8-p" style={{
        left: `${p.left}%`, width: p.size, height: p.size,
        background: `rgba(255,255,255,${p.tone})`,
        animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`,
      }} />
    ))}
  </div>
)

const S = {
  /* ไล่สีจากม่วงสว่างด้านบนลงไปหาม่วงเข้มด้านล่าง — ให้หัวแอปเด่นและเนื้อหาด้านล่างสงบลง
     (พื้นเรียบสีเดียวทำให้ขอบนีออนของการ์ดทุกใบดูเท่ากันหมดจนไม่มีลำดับสายตา) */
  /* เลิกใส่ PixelNum ไว้หน้า Sarabun แล้ว — ฟอนต์นั้นประกาศ unicode-range ไว้แค่ตัวเลข
     (ดู public/fonts/fonts.css) เบราว์เซอร์จึงลากไปใช้กับเลขทุกตัวในหน้ารวมถึงเลขที่นั่ง
     กับเลขห้อง ซึ่งเป็นตัวเลขที่ต้องอ่านให้ออกจริง ๆ ไม่ใช่ของประดับ
     ความเป็นพิกเซลของธีมมาจากกรอบนีออนมุมตัด เส้นสแกน และป้ายอังกฤษที่ยังใช้ S.pix อยู่ */
  page:  { minHeight: '100dvh', background: 'radial-gradient(125% 72% at 50% 0%, #43189000 0%, #2a0d6200 1%, #16062f 100%), radial-gradient(115% 62% at 50% -6%, #5a23b8 0%, #2e1068 45%, #16062f 100%)', color: '#ffffff', fontFamily: 'Sarabun, system-ui, sans-serif', display: 'flex', justifyContent: 'center' },
  phone: { width: '100%', padding: '0 24px calc(30px + env(safe-area-inset-bottom, 0px))', boxSizing: 'border-box' },
  /* กรอบ 2px + เงาแข็งเยื้อง 4px = การ์ดลอยขึ้นมาแบบสไปรต์ ไม่ใช่เงาฟุ้งแบบ material
     มุมโค้งไม่ต้องสั่งที่นี่ — CSS ใน .eb8 บังคับเป็น 0 ให้ทั้งหน้าอยู่แล้ว */
  /* หน้าตาของการ์ด (พื้น ขอบนีออน มุมตัด เงาเรือง) อยู่ในคลาส .nb ในบล็อก <style>
     ที่นี่เหลือแค่ระยะขอบใน — สีขอบของแต่ละใบส่งผ่านตัวแปร --nb / --nb2 */
  card:  { padding: 14 },
  dim:   { color: C.dim, fontSize: 11.5 },
  secTitle: { fontSize: 13, fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 7, margin: '18px 0 9px', letterSpacing: 0.3, textShadow: '0 0 10px rgba(176,108,255,.75)' },
  /* ฟอนต์พิกเซลใช้เฉพาะตัวเลขกับอังกฤษสั้น ๆ (หัวแอป นาฬิกา ตัวเลขใหญ่)
     มีน้ำหนักเดียว จึงต้องสั่ง 400 ไว้ ไม่งั้นเบราว์เซอร์ปลอมตัวหนาให้จนขอบเยิน */
  pix:   { fontFamily: '"Press Start 2P", Sarabun, monospace', fontWeight: 400 },
  /* ตัวเลขที่เป็น "ข้อมูล" ทั้งหน้าใช้ชุดนี้ — ฟอนต์ปกติ หนา และ tabular-nums
     (ตัวเลขกว้างเท่ากันทุกตัว เลขที่เปลี่ยนทุกนาทีอย่างนาฬิกา/จำนวนคนจึงไม่ขยับซ้ายขวา)
     ฟอนต์พิกเซลเหลือไว้ให้ป้ายอังกฤษล้วนที่เป็นของประดับ (> NOTICE, SHARE) เท่านั้น
     ขนาดที่ตั้งไว้ใหญ่กว่าตอนเป็นพิกเซลเล็กน้อยทุกจุด เพราะ Press Start 2P เต็ม 1em
     ทุกตัวอักษร เปลี่ยนฟอนต์ที่ขนาดเดิมแล้วตัวเลขจะดูหดลงไปเลย */
  num:   { fontFamily: 'Sarabun, system-ui, sans-serif', fontWeight: 800, fontVariantNumeric: 'tabular-nums' },
}

/* หลอดพลังแบบเกม — แบ่งเป็นช่องเท่า ๆ กัน ไม่ใช่แถบยาวต่อเนื่อง
   อ่านค่าคร่าว ๆ ได้จากการนับช่องโดยไม่ต้องอ่านตัวเลข และเป็นภาพจำของยุค 8-bit
   pct = null (ยังไม่มีข้อมูล) → ไม่มีช่องไหนติด ต่างจาก 0% ที่แปลว่า "วัดได้ว่าไม่มีคน" */
function PixelBar({ pct, color, cells = 10, h = 9 }) {
  const on = pct == null ? 0 : Math.round((Math.max(0, Math.min(100, pct)) / 100) * cells)
  return (
    <div style={{ display: 'flex', gap: 2, background: '#0d0424', padding: 3 }}>
      {Array.from({ length: cells }, (_, i) => (
        <div key={i} style={{ flex: 1, height: h, background: i < on ? color : '#22104f', boxShadow: i < on ? `0 0 6px ${color}` : 'none' }} />
      ))}
    </div>
  )
}

// ── กราฟ: ทุกอย่างเป็นแท่งพิกเซล ไม่มีเส้นโค้ง ────────────────────────
/* กราฟของหน้าเดิมเป็นเส้นเรียบกับพื้นไล่สี ซึ่งเครื่อง 8-bit วาดไม่ได้อยู่แล้ว
   ที่นี่ปัดค่าทุกจุดลงเป็นขั้น (LEVELS ขั้น) แล้ววาดเป็นแท่งทึบ — รูปทรงรวมยังบอกเรื่อง
   เดียวกัน (ช่วงไหนคนเยอะ/น้อย) แต่ตาอ่านเป็นบล็อกแทนที่จะไล่ตามเส้น

   ปัดขึ้นเสมอเมื่อค่ามากกว่า 0 — ช่วงที่มีคนอยู่บ้างต้องไม่หายไปกลืนกับช่วงที่ไม่มีใครเลย */
const LEVELS = 8
const stepUp = (v, max, levels = LEVELS) => (v > 0 ? Math.max(1, Math.round((v / max) * levels)) : 0)

// band = [from, to] แถบไฮไลต์ช่วงเวลาที่แนะนำ — ให้ตาไปหยุดตรงช่วงนั้นเลย
// markIdx = ขีดบอก "ตอนนี้"
function AreaChart({ data, color, w = 300, h = 60, markIdx = null, band = null, labels = [] }) {
  const t = useT()
  const v = data?.filter(x => x != null) || []
  if (v.length < 2) return <div style={{ ...S.dim, fontSize: 10, padding: '8px 0' }}>{t('noStatsLong')}</div>
  const max = Math.max(...data.map(x => x ?? 0), 1)
  const cw = w / data.length
  const unit = h / LEVELS
  return (
    <div>
      {/* ไม่ใส่กรอบให้กราฟ — เส้นแท่งถี่ ๆ กับกรอบเรืองแสงอยู่ติดกันแล้วตาแยกไม่ออก
          ว่าอันไหนคือข้อมูล พื้นเข้มอย่างเดียวก็แยกกราฟออกจากการ์ดได้แล้ว */}
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" shapeRendering="crispEdges" style={{ display: 'block', background: '#0d0424' }}>
        {band && (() => {
          const x0 = band[0] * cw
          const bw = Math.max(cw, (Math.min(band[1], data.length - 1) - band[0] + 1) * cw)
          return <rect x={x0} y="0" width={bw} height={h} fill={color} opacity="0.2" />
        })()}
        {data.map((x, i) => {
          const lv = stepUp(x ?? 0, max)
          if (!lv) return null
          const bh = lv * unit
          // เว้นร่องบาง ๆ ระหว่างแท่ง ให้เห็นว่าเป็นช่อง ๆ ไม่ใช่พื้นทึบผืนเดียว
          return <rect key={i} x={i * cw} y={h - bh} width={Math.max(1, cw - 0.6)} height={bh} fill={color} opacity={i === markIdx ? 1 : 0.8} />
        })}
        {markIdx != null && <rect x={markIdx * cw} y="0" width={Math.max(1.5, cw)} height={h} fill="#fff" opacity="0.75" />}
      </svg>
      {!!labels.length && <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
        {labels.map(l => <span key={l} style={{ ...S.dim, fontSize: 9 }}>{l}</span>)}
      </div>}
    </div>
  )
}

/* line = ค่าอีกชุดที่เอามาเทียบกับแท่ง (ใช้โชว์ "วันนี้" ทับกับ "ค่าปกติ") — สเกลเดียวกันถึงจะเทียบกันได้
   หน้าเดิมวาด line เป็นเส้นต่อเนื่อง ที่นี่วาดเป็นขีดสั้น ๆ ทีละช่อง (ขั้นบันได)
   เส้นเฉียงเรียบ ๆ เป็นสิ่งที่จอ 8-bit ทำไม่ได้ และขีดทีละช่องอ่านง่ายกว่าตอนแท่งถี่ */
function BarChart({ data, color, w = 120, h = 42, line = null, lineColor = '#fff' }) {
  const v = (data || []).map(x => x ?? 0)
  if (!v.length) return null
  const max = Math.max(...v, ...(line || []).map(x => x ?? 0), 1)
  const bw = w / v.length
  const unit = h / LEVELS
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" shapeRendering="crispEdges" style={{ display: 'block', background: '#0d0424' }}>
      {v.map((x, i) => {
        const lv = stepUp(x, max)
        if (!lv) return null
        return <rect key={i} x={i * bw} y={h - lv * unit} width={Math.max(1, bw - 0.6)} height={lv * unit} fill={color} opacity={0.45 + 0.55 * (x / max)} />
      })}
      {(line || []).map((x, i) => x == null ? null : (
        <rect key={`l${i}`} x={i * bw} y={h - stepUp(x, max) * unit} width={Math.max(1, bw - 0.6)} height={Math.max(1.5, unit * 0.28)} fill={lineColor} />
      ))}
    </svg>
  )
}

// ดาวพิกเซลจากบิตแมปชุดเดียวกับไอคอน — ตัวอักษร ★ ของฟอนต์ปกติเป็นเส้นโค้ง ผิดธีม
const Stars = ({ n, color, size = 13 }) => (
  <span style={{ display: 'inline-flex', gap: 2, verticalAlign: 'middle' }}>
    {[0, 1, 2, 3, 4].map(i => <Icon key={i} name="star" size={size} color={i < n ? color : '#2a1560'} />)}
  </span>
)

/**
 * กล่องให้ดาว — มีทุกพื้นที่ทุกประเภท ไม่ต้องล็อกอิน
 * โชว์ค่าเฉลี่ยจากคนอื่นไว้ด้วย แต่ดาวที่ระบายสี = "ของคุณ" ถ้าเคยให้ไว้แล้ว
 * เพื่อไม่ให้สับสนว่ากดไปแล้วหรือยัง (เคยกดแล้วกดใหม่ได้ = แก้คะแนนเดิม)
 */
// ปุ่มในการ์ด — แถวดาวเล็ก ๆ ที่แปะไว้เฉย ๆ คนเลื่อนผ่านไม่ทันเห็นว่ากดได้
// ทำเป็นปุ่มเต็มความกว้างแทน แล้วค่อยเปิดป๊อปอัปให้กดดาวจริงในนั้น
function RateButton({ color, r, mine, onClick }) {
  const t = useT()
  return (
    <button data-track="open" onClick={onClick} className="nb" style={{
      width: '100%', marginTop: 13, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
      '--nb': color, '--nb2': C.purple, '--nbfill': '#1b0940', padding: '10px 13px', textAlign: 'left',
    }}>
      <Icon name="star" size={17} color={mine ? color : '#4a2390'} />
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 12.5, fontWeight: 800, color }}>
          {mine ? t('rateMine') : t('rateAsk')}
        </span>
        <span style={{ ...S.dim, fontSize: 10.5 }}>
          {r?.n > 0 ? `${r.avg.toFixed(1)} · ${t('rateFrom')} ${r.n} ${t('rateVoters')}` : t('rateNone')}
        </span>
      </span>
      {mine > 0 && <span style={{ fontSize: 13, fontWeight: 900, color, flexShrink: 0 }}>{mine}/5</span>}
      <Icon name="right" color={color} size={14} />
    </button>
  )
}

/**
 * ป๊อปอัปให้ดาว — ดาวใหญ่พอให้นิ้วโป้งกดไม่พลาด
 * ดาวที่ระบายสี = "ของคุณ" ถ้าเคยให้ไว้แล้ว จะได้ไม่สับสนว่ากดไปหรือยัง
 * (กดใหม่ได้ = แก้คะแนนเดิม ไม่ใช่เพิ่มใบใหม่)
 */
function RateModal({ zone, color, r, mine, onVote, busy, failed, onClose }) {
  const t = useT()
  const [hover, setHover] = useState(0)
  // เลือกดาวไว้ก่อน ยังไม่บันทึก — ต้องกดปุ่มส่งอีกที กันกดโดนแล้วคะแนนเปลี่ยนทันที
  const [pick, setPick] = useState(mine || 0)
  const [sent, setSent] = useState(false)
  const shown = hover || pick
  return (
    <div data-track-scope="rate" onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(10,3,32,0.88)', backdropFilter: 'none',
      // วางกลางจอเสมอ — เคยดันลงล่างแบบ bottom sheet แล้วบนจอเตี้ยกล่องล้นพ้นขอบ
      // ดาวกับปุ่มส่งตกไปอยู่ใต้จอจนกดไม่ได้ · overflow auto กันกรณีจอเตี้ยกว่ากล่อง
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, overflowY: 'auto',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 400, background: '#12062c', border: `2px solid ${color}55`,
        borderRadius: 20, padding: '20px 18px 16px', animation: 'momayUp 0.18s ease-out',
      }}>
        <div style={{ fontSize: 15, fontWeight: 800, color, marginBottom: 2 }}>{zoneName(zone, t.i)}</div>
        <div style={{ ...S.dim, fontSize: 11.5, marginBottom: 16 }}>{t('rateAsk')}</div>

        <div onMouseLeave={() => setHover(0)}
          style={{ display: 'flex', justifyContent: 'center', gap: 6, opacity: busy ? 0.5 : 1 }}>
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} disabled={busy} aria-label={`${n}`}
              onMouseEnter={() => setHover(n)} data-track="star" onClick={() => { setPick(n); setSent(false) }}
              style={{
                background: 'none', border: 'none', padding: '2px 3px', lineHeight: 0,
                cursor: busy ? 'wait' : 'pointer',
              }}><Icon name="star" size={38} color={n <= shown ? color : '#4a2390'} /></button>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 12, minHeight: 34 }}>
          {failed ? <span style={{ color: '#ff5b7a', fontSize: 12 }}>{t('rateFail')}</span> : <>
            {sent && <div style={{ fontSize: 12.5, fontWeight: 700, color }}>{t('rateSaved')}</div>}
            <div style={{ ...S.dim, fontSize: 11, marginTop: 2 }}>
              {r?.n > 0 ? `${t('rateFrom')} ${r.n} ${t('rateVoters')} · ${t('rateAvg')} ${r.avg.toFixed(1)}` : t('rateNone')}
            </div>
          </>}
        </div>

        {/* กดดาวแล้วยังไม่บันทึก ต้องกดส่งอีกทีถึงจะนับ */}
        <button disabled={busy || !pick || (sent && pick === mine)}
          data-track="submit" onClick={async () => { await onVote(zone.roomId, pick); setSent(true) }}
          style={{
            width: '100%', marginTop: 8, borderRadius: 11, padding: '12px', fontWeight: 800, fontSize: 13.5,
            background: pick ? `${color}22` : '#150733',
            border: `1.5px solid ${pick ? color : '#5f2fae'}`,
            color: pick ? color : '#b7a6e8',
            cursor: busy ? 'wait' : pick ? 'pointer' : 'not-allowed',
          }}>
          {busy ? '…' : sent && pick === mine ? t('rateSaved') : pick ? `${t('rateSend')} ${pick}/5` : t('ratePick')}
        </button>

        <button data-track="close" onClick={onClose} style={{
          width: '100%', marginTop: 14, background: '#1c0d40', border: '2px solid #5f2fae',
          borderRadius: 11, color: '#e2d6ff', padding: '11px', fontWeight: 700, fontSize: 13, cursor: 'pointer',
        }}>{t('rateClose')}</button>
      </div>
    </div>
  )
}

// ── จองห้อง: แถวในลิสต์ + ป๊อปอัปเลือกเวลา ────────────────────────────
function BookRow({ zone, color, st, onBook }) {
  const t = useT()
  const free = !st.loading && !st.current
  return (
    <button data-track="row" onClick={() => onBook(zone)} className="nb" style={{
      ...S.card, width: '100%', textAlign: 'left', cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 11, padding: '11px 13px',
    }}>
      <Icon name={iconOf(zone, 'users')} color={color} size={18} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {zoneName(zone, t.i)}
        </div>
        <div style={{ ...S.dim, fontSize: 10.5, display: 'flex', alignItems: 'center', gap: 5 }}>
          {zone.capacity > 0
            ? <><Icon name="users" color={C.dim} size={11} />{zone.capacity} {t(zone.unit === 'room' ? 'bookRooms' : 'bookSeats')}</>
            : zLabel(zone, t.i)}
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: st.loading ? C.dim : free ? C.green : C.orange }}>
          {st.loading ? '…' : free ? t('bookFree') : t('bookBusy')}
        </div>
        {/* สองบรรทัดนี้ตอบคนละคำถาม บรรทัดบน = ตอนนี้ว่างไหม · บรรทัดล่าง = แล้วทำอะไรได้
            (ว่าง -> กดจองเลย · ไม่ว่าง -> บอกว่าติดถึงกี่โมง จะได้รู้ว่ารอได้ไหม) */}
        <div style={{ fontSize: 11, fontWeight: 700, color: free ? color : C.dim, marginTop: 1 }}>
          {st.loading ? '' : st.current ? `${t('bookUntil')} ${st.current.endTime}` : t('bookNow')}
        </div>
      </div>
    </button>
  )
}

/**
 * ป๊อปอัปจองห้อง — ยิงเข้า collection bookings ตัวเดียวกับที่ autoControl เฝ้าอยู่
 * ช่วงเวลาไล่ทีละ 30 นาทีตามเวลาเปิด-ปิดของห้อง (ไม่ได้ตั้งไว้ = ทั้งวัน)
 * ช่องที่ชนกับคิวที่มีอยู่แล้วถูกปิดตั้งแต่ในตัวเลือก ไม่ต้องรอ server ตีกลับ
 */
function BookModal({ zone, color, st, onSubmit, busy, onClose }) {
  const t = useT()
  const taken = (st.all || []).map(b => [hhmmToMin(b.startTime), hhmmToMin(b.endTime)])
  const openA = zone.openFrom ? hhmmToMin(zone.openFrom) : 0
  const openB = zone.openTo ? hhmmToMin(zone.openTo) : 24 * 60
  // ปัดเวลาปัจจุบันขึ้นเป็นครึ่งชั่วโมงถัดไป — จองย้อนหลังไม่ได้
  const nowM = (() => { const d = new Date(); return Math.ceil((d.getHours() * 60 + d.getMinutes()) / 30) * 30 })()
  const lo = Math.max(openA, nowM)
  const slots = []
  for (let m = lo; m <= openB; m += 30) slots.push(m)

  const overlaps = (a, b) => taken.some(([x, y]) => a < y && b > x)
  const [from, setFrom] = useState(() => slots.find(m => !overlaps(m, m + 30)) ?? slots[0] ?? lo)
  const [to, setTo] = useState(() => (slots.find(m => !overlaps(m, m + 30)) ?? slots[0] ?? lo) + 60)
  const [name, setName] = useState(() => { try { return localStorage.getItem('momay_bookname') || '' } catch { return '' } })
  const [purpose, setPurpose] = useState('')
  const [msg, setMsg] = useState('')
  const [done, setDone] = useState(false)

  const send = async () => {
    if (!name.trim()) return setMsg(t('bookNeedName'))
    if (to <= from) return setMsg(t('bookBadTime'))
    if (overlaps(from, to)) return setMsg(t('bookOverlap'))
    setMsg('')
    const ok = await onSubmit({
      room: zone.roomId, startTime: minToHhmm(from), endTime: minToHhmm(to),
      bookerName: name.trim(), purpose: purpose.trim(),
    })
    if (ok) { try { localStorage.setItem('momay_bookname', name.trim()) } catch { /* จำไม่ได้ก็ไม่เป็นไร */ } setDone(true) }
    else setMsg(t('bookFail'))
  }

  const sel = { width: '100%', background: '#1c0d40', border: '2px solid #5f2fae', borderRadius: 9, color: '#ffffff', padding: '9px 10px', fontSize: 13, boxSizing: 'border-box' }

  return (
    <div data-track-scope="book" onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(10,3,32,0.88)', backdropFilter: 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, overflowY: 'auto',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 400, background: '#12062c', border: `2px solid ${color}55`,
        borderRadius: 20, padding: '20px 18px 16px', animation: 'momayUp 0.18s ease-out',
      }}>
        <div style={{ fontSize: 15, fontWeight: 800, color, marginBottom: 2 }}>{zoneName(zone, t.i)}</div>
        <div style={{ ...S.dim, fontSize: 11.5, marginBottom: 14 }}>
          {new Date().toLocaleDateString(t.lang === 'en' ? 'en-GB' : 'th-TH', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>

        {done ? (
          <>
            <div style={{ textAlign: 'center', padding: '10px 0 4px' }}>
              <div style={{ fontSize: 30, color: C.green }}>✓</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.green, marginTop: 6 }}>{t('bookDone')}</div>
              <div style={{ ...S.dim, fontSize: 12, marginTop: 4 }}>{minToHhmm(from)} - {minToHhmm(to)}</div>
              <div style={{ ...S.dim, fontSize: 10.5, marginTop: 8, lineHeight: 1.6 }}>{t('bookAuto')}</div>
            </div>
          </>
        ) : (
          <>
            {!!taken.length && (
              <div style={{ ...S.dim, fontSize: 10.5, marginBottom: 12, lineHeight: 1.6 }}>
                {t('bookTaken')}: {taken.map(([a, b]) => `${minToHhmm(a)}-${minToHhmm(b)}`).join(' · ')}
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
              <label>
                <div style={{ ...S.dim, fontSize: 10, marginBottom: 4 }}>{t('bookFrom')}</div>
                <select style={sel} value={from} onChange={e => { const v = Number(e.target.value); setFrom(v); if (to <= v) setTo(v + 30) }}>
                  {slots.slice(0, -1).map(m => <option key={m} value={m} disabled={overlaps(m, m + 30)}>{minToHhmm(m)}</option>)}
                </select>
              </label>
              <label>
                <div style={{ ...S.dim, fontSize: 10, marginBottom: 4 }}>{t('bookTo')}</div>
                <select style={sel} value={to} onChange={e => setTo(Number(e.target.value))}>
                  {slots.filter(m => m > from).map(m => <option key={m} value={m} disabled={overlaps(from, m)}>{minToHhmm(m)}</option>)}
                </select>
              </label>
            </div>

            <div style={{ marginTop: 10 }}>
              <div style={{ ...S.dim, fontSize: 10, marginBottom: 4 }}>{t('bookName')}</div>
              <input style={sel} value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={{ ...S.dim, fontSize: 10, marginBottom: 4 }}>{t('bookPurpose')}</div>
              <input style={sel} value={purpose} onChange={e => setPurpose(e.target.value)} />
            </div>

            {msg && <div style={{ color: '#ff5b7a', fontSize: 11.5, marginTop: 10 }}>{msg}</div>}

            <button data-track="send" onClick={send} disabled={busy} style={{
              width: '100%', marginTop: 14, background: `${color}22`, border: `1.5px solid ${color}`,
              borderRadius: 11, color, padding: '12px', fontWeight: 800, fontSize: 13.5, cursor: busy ? 'wait' : 'pointer',
            }}>{busy ? '…' : t('bookConfirm')}</button>
            <div style={{ ...S.dim, fontSize: 10, textAlign: 'center', marginTop: 8, lineHeight: 1.6 }}>{t('bookAuto')}</div>
          </>
        )}

        <button data-track="close" onClick={onClose} style={{
          width: '100%', marginTop: 12, background: '#1c0d40', border: '2px solid #5f2fae',
          borderRadius: 11, color: '#e2d6ff', padding: '11px', fontWeight: 700, fontSize: 13, cursor: 'pointer',
        }}>{t('rateClose')}</button>
      </div>
    </div>
  )
}

/**
 * ภาพสแนปล่าสุดของโซน — ตัวเลข % บอกว่า "แน่นแค่ไหน" แต่ภาพบอกว่า "แน่นแบบไหน"
 * (โต๊ะเต็มแต่คนนั่งห่างกัน ≠ คนยืนออกันหน้าลิฟต์) ช่วยตัดสินใจได้มากกว่าตัวเลขอย่างเดียว
 *
 * ใช้ snapTs เป็นตัวเปลี่ยน src — ภาพจะรีเฟรชเมื่อ relay ส่งภาพใหม่เข้ามาเท่านั้น
 * ไม่ได้ยิงซ้ำทุกวินาที (ภาพละ ~70KB ถ้าดึงรัว ๆ กินเน็ตเปล่า ๆ)
 */
/**
 * รูปประจำพื้นที่ — ใช้เฉพาะรูปที่ผู้ดูแลอัปโหลดเองที่ /settings เท่านั้น
 * ไม่ได้ดึงภาพสดจากกล้องมาแสดงแล้ว: ภาพกล้องมีคนจริงที่กำลังนั่งอยู่ตรงนั้น
 * เอาขึ้นหน้าที่ใครก็เปิดดูได้เป็นเรื่องละเอียดอ่อน (PDPA) และคุมมุมภาพไม่ได้ด้วย
 *
 * ไม่ได้อัปโหลดรูปไว้ = ไม่ต้องมีรูป ไม่ต้องมีกล่องเปล่าคั่นกลาง
 */
/**
 * ดูรูปใหญ่ขึ้น — เปิดจากการกดรูปบนการ์ด
 *
 * บนการ์ดรูปถูกครอบให้ทุกใบสูงเท่ากัน (cover) ริมภาพจึงหายไป ที่เปิดขึ้นมาใช้ contain
 * เห็นทั้งใบตามสัดส่วนจริง — ขยายพอให้ดูออก ไม่ได้กินทั้งจอ
 *
 * กดตรงไหนก็ปิด จึงไม่มีปุ่มปิดมาบังภาพ · ทีละใบพอ ไม่ต้องเลื่อนดูต่อในนี้
 * เพราะการปัดกับการกดเพื่อปิดอยู่บนนิ้วเดียวกัน แยกกันไม่ออก (เลื่อนดูทำที่การ์ดได้อยู่แล้ว)
 */
function ShotViewer({ src, onClose }) {
  // ปุ่ม Esc ปิดได้ด้วย — เปิดบนคอมพิวเตอร์แล้วมือไม่ได้อยู่ที่จอ
  useEffect(() => {
    const esc = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [onClose])
  /* แขวนไว้ที่ body ไม่ใช่ในการ์ด — การ์ดของธีมนี้ตั้ง isolation: isolate เพื่อให้กรอบ
     นีออนของชิปที่ซ้อนอยู่ข้างในไม่ถูกพื้นการ์ดวาดทับ (ดู .nb ในบล็อก <style>)
     ผลข้างเคียงคือ z-index ของลูกถูกจำกัดอยู่แค่ในกรอบการ์ด รูปเต็มจอที่เกิดจากในนั้น
     จึงจะโดนแถบเมนูล่างวาดทับ · ยกออกมาไว้นอกสุดแล้วปัญหานี้หมดไป
     ติดคลาส eb8 ไปด้วย เพราะออกนอกตัวครอบของหน้าแล้ว จะได้ยังได้กติกาภาพของธีม */
  return createPortal(
    <div className="eb8" data-track-scope="shot" onClick={onClose}
      onTouchStart={e => e.stopPropagation()} onTouchMove={e => e.stopPropagation()} onTouchEnd={e => e.stopPropagation()}
      style={{
        position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(10,3,32,0.93)',
        display: 'grid', placeItems: 'center', padding: 18, cursor: 'zoom-out',
        animation: 'momayUp 0.16s ease-out',
      }}>
      <img src={src} alt="" style={{ maxWidth: '100%', maxHeight: '72vh', objectFit: 'contain', display: 'block' }} />
    </div>,
    document.body,
  )
}

function ZoneSnap({ zone, height = 132 }) {
  // ใบไหนโหลดไม่ขึ้นก็ตัดใบนั้นทิ้งใบเดียว ที่เหลือยังเลื่อนดูได้ตามปกติ
  const [dead, setDead] = useState({})
  const [i, setI] = useState(0)
  const [zoom, setZoom] = useState(null)     // ใบที่กำลังกดดูใหญ่อยู่ · null = ไม่ได้เปิด
  useEffect(() => { setDead({}); setI(0); setZoom(null) }, [zone.roomId])
  const imgs = (zone.heroImgs || []).filter(k => !dead[k])
  if (!imgs.length) return null
  const src = k => `${API}/api/assets/${encodeURIComponent(k)}${zone.heroV ? `?v=${encodeURIComponent(zone.heroV)}` : ''}`
  // เว้นบนอย่างเดียว — ข้างล่างเป็นแถวความหนาแน่นที่มี marginTop ของตัวเองอยู่แล้ว
  // ใส่ marginBottom ซ้ำจะกลายเป็นช่องว่างสองเท่าเฉพาะการ์ดที่มีรูป
  return (
    <div style={{ marginTop: 11 }}>
      {/* เลื่อนด้วย scroll-snap ของเบราว์เซอร์เอง ไม่ได้เขียนตัวจับนิ้วเพิ่ม — ได้แรงเฉื่อย
          กับการหยุดเข้าใบพอดีมาฟรี · หยุด touch ไม่ให้ลอยขึ้นไปถึงการ์ด ไม่งั้นปัดดูรูป
          แล้วการ์ดเปลี่ยนไปพื้นที่ถัดไปพร้อมกัน */}
      <div className="nb" style={{ '--st': '3px', '--bw': '3px', '--nbfill': '#000000', padding: 3 }}>
      <div className="momay-shots pxclip" onScroll={e => setI(Math.round(e.currentTarget.scrollLeft / (e.currentTarget.clientWidth || 1)))}
        onTouchStart={e => e.stopPropagation()} onTouchMove={e => e.stopPropagation()} onTouchEnd={e => e.stopPropagation()}
        style={{
          display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory',
          background: '#000', WebkitOverflowScrolling: 'touch',
        }}>
        {imgs.map((k, n) => (
          <img key={k} src={src(k)} alt="" onError={() => setDead(d => ({ ...d, [k]: true }))}
            data-track="zoom-shot" onClick={() => setZoom(n)}
            style={{ flex: '0 0 100%', width: '100%', height, objectFit: 'cover', display: 'block', scrollSnapAlign: 'start', cursor: 'zoom-in' }} />
        ))}
      </div>
      </div>
      {imgs[zoom] && <ShotViewer src={src(imgs[zoom])} onClose={() => setZoom(null)} />}
      {/* จุดบอกจำนวนใบ — ใบเดียวไม่ต้องมี ไม่มีอะไรให้เลื่อน */}
      {imgs.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 6 }}>
          {imgs.map((k, n) => (
            <span key={k} style={{
              width: n === i ? 14 : 5, height: 5, borderRadius: 3,
              background: n === i ? '#ffffff' : '#7a52c8', transition: 'width .2s ease, background .2s ease',
            }} />
          ))}
        </div>
      )}
    </div>
  )
}


// ── ตัวเลื่อนดูทีละใบ ใช้ร่วมกันทุกหน้า ────────────────────────────────
// ลูกศรอยู่ "ข้างการ์ด" ไม่ใช่บนหัว เพราะนิ้วอยู่ตรงนั้นอยู่แล้วตอนอ่าน
// กระพริบเบา ๆ เพื่อบอกว่าเลื่อนได้ — แต่หยุดถาวรหลังผู้ใช้เลื่อนสำเร็จครั้งแรก
// (คำใบ้ที่กระพริบตลอดไปกลายเป็นสิ่งรบกวน ไม่ใช่คำใบ้)
const HINT_KEY = 'momay_swipe_hinted'
function usePager(len) {
  const [i, setI] = useState(0)
  const [hint, setHint] = useState(() => { try { return !localStorage.getItem(HINT_KEY) } catch { return true } })
  const touch = useRef(null)
  useEffect(() => { setI(n => (n >= len ? 0 : n)) }, [len])
  const done = () => { if (hint) { setHint(false); try { localStorage.setItem(HINT_KEY, '1') } catch {} } }
  const go = d => { setI(n => Math.max(0, Math.min(len - 1, n + d))); done() }
  const bind = {
    onTouchStart: e => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } },
    onTouchEnd: e => {
      if (!touch.current) return
      const dx = e.changedTouches[0].clientX - touch.current.x
      const dy = e.changedTouches[0].clientY - touch.current.y
      touch.current = null
      // ต้องปัดแนวนอนชัดเจน (>40px และมากกว่าแนวตั้ง) ไม่งั้นเลื่อนหน้าลงแล้วการ์ดสลับเอง
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return
      go(dx < 0 ? 1 : -1)
    },
  }
  return { i: Math.min(i, Math.max(0, len - 1)), setI, go, hint, bind }
}

// ปุ่มกว้าง 38 + ระยะจากขอบใน = ช่องทางเดินของลูกศร · การ์ดที่ใช้ปุ่มนี้เว้น
// padding ข้างเท่า ARROW_LANE เนื้อหาจะได้ไม่ไปนอนอยู่ใต้ปุ่มจนอ่านทับกัน
const ARROW_INSET = 3
const ARROW_LANE  = ARROW_INSET + 38 + 3

function PagerArrows({ i, len, go, hint, color, top = '50%' }) {
  if (len <= 1) return null
  const btn = (side, dis, dir) => (
    <button data-track="zone-pager" onClick={() => go(dir)} disabled={dis} aria-label={side}
      style={{
        // นั่งในการ์ด ชิดขอบใน — เดิมคร่อมขอบ (ครึ่งใบอยู่นอก) พอการ์ดชิดขอบจอ
        // ปุ่มฝั่งนั้นโดน viewport เฉือนหายไปครึ่งใบ กดยากและดูเหมือนวาดไม่เสร็จ
        // การ์ดที่มีปุ่มนี้ต้องเว้น padding ข้าง ARROW_LANE ให้เนื้อหาไม่มุดใต้ปุ่ม
        position: 'absolute', [side]: ARROW_INSET, top, marginTop: -19,
        width: 38, height: 38, borderRadius: '50%', cursor: dis ? 'default' : 'pointer',
        // พื้นโปร่งสนิท เหลือแค่วงแหวน — ข้อความที่อยู่ใต้ปุ่มยังอ่านได้
        // (ตัวปุ่มอยู่บนพื้นการ์ดสีเข้ม ไม่ใช่บนภาพ จึงไม่ต้องมีทินต์ช่วยให้อ่านออก)
        background: 'transparent',
        border: `1.5px solid ${dis ? '#8b6fd0' : color}`,
        display: 'grid', placeItems: 'center', zIndex: 3, padding: 0,
        // จางลงเหลือ 70% ตอนอยู่นิ่ง — ตัวปุ่มคร่อมข้อความอยู่ ถ้าทึบเต็มจะบังตัวหนังสือ
        opacity: dis ? 0.25 : 0.7,
        animation: (!dis && hint) ? 'momayPulse 1.9s ease-in-out infinite' : 'none',
      }}>
      <Icon name={side === 'left' ? 'back' : 'right'} color={dis ? '#a77ce0' : color} size={17} sw={2} />
    </button>
  )
  return <>{btn('left', i === 0, -1)}{btn('right', i === len - 1, 1)}</>
}

/* วนโชว์ทีละไม่กี่ใบ แทนการไล่เรียงทั้งหมด

   "ทางเลือกอื่น" มีได้หลายสิบพื้นที่หลังห้องสมุดลงผังครบทุกชั้น ไล่ออกมาทั้งหมดกลายเป็น
   แถวยาวที่ไม่มีใครเลื่อนอ่านจนจบ และดันเนื้อหาข้างล่างหายไปไกล

   สลับด้วยการหรี่ลงแล้วสว่างขึ้น ไม่ใช่เลื่อนซ้าย-ขวา — ใบไม่ขยับตำแหน่ง ตาไม่ต้องไล่ตาม
   และนิ้วไม่กดโดนใบที่กำลังเลื่อนหนี (บนมือถือกดพลาดง่ายมาก)
*/
function useRotate(total, size, ms = 4500, fade = 280) {
  const pages = Math.max(1, Math.ceil(total / size))
  const [page, setPage] = useState(0)
  const [dim, setDim] = useState(false)
  // จำนวนพื้นที่เปลี่ยน (สลับโหมด/โหลดข้อมูลรอบใหม่) = เริ่มนับหนึ่งใหม่ ไม่ค้างหน้ากลางอากาศ
  useEffect(() => { setPage(0); setDim(false) }, [total, size])
  useEffect(() => {
    if (pages < 2) return
    let t = null
    const id = setInterval(() => {
      setDim(true)
      t = setTimeout(() => { setPage(p => (p + 1) % pages); setDim(false) }, fade)
    }, ms)
    return () => { clearInterval(id); if (t) clearTimeout(t) }
  }, [pages, ms, fade])
  const from = Math.min(page, pages - 1) * size
  return { from, to: from + size, dim, pages, page, fade }
}

// ── โหลดข้อมูล ─────────────────────────────────────────────────────────
function useMomayData() {
  const [rooms, setRooms] = useState([])
  const [counts, setCounts] = useState({})
  const [today, setToday] = useState(null)   // ชุดของวันนี้ล้วน ๆ ไว้เทียบกับค่าปกติ
  const [byDay, setByDay] = useState(null)   // { 'YYYY-MM-DD': { camId: number[48] } } — หน้าวางแผนเวลาใช้
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    const cfg = async () => {
      try {
        const j = await (await fetch(`${API}/api/config`)).json()
        if (alive && j.ok) { setRooms(j.rooms || []); setErr('') }
      } catch { if (alive) setErr('เชื่อมต่อระบบไม่ได้ — ลองรีเฟรชอีกครั้ง') }
      finally { if (alive) setLoading(false) }
    }
    const cnt = async () => {
      try {
        const j = await (await fetch(`${API}/api/camera-counts`)).json()
        if (alive && j.ok) setCounts(j.counts || {})
      } catch { /* คงค่าเดิม ดีกว่ากระพริบเป็นศูนย์ */ }
    }
    cfg(); cnt()
    const t = setInterval(cnt, 5000)
    return () => { alive = false; clearInterval(t) }
  }, [])

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const j = await (await fetch(`${API}/api/camera-density?agg=30min&hours=${HISTORY_DAYS * 24}`)).json()
        if (!alive || !j.ok) { if (alive) setByDay({}); return }
        // เก็บแยกราย-วันเท่านั้น — ห้ามยุบเป็นค่าเฉลี่ยตรงนี้
        // เสาร์กับวันจันทร์คนใช้ห้องสมุดคนละแบบ เอามาเฉลี่ยรวมได้ตัวเลขที่ไม่ตรงกับวันไหนเลย
        const td = {}, days = {}
        const tKey = dayKey(new Date())
        for (const r of j.rows || []) {
          if (r.count?.p50 == null) continue
          const d = new Date(r.bucket)
          const s = slotOf(d)
          const dk = dayKey(d)
          ;(((days[dk] ||= {})[r.camId] ||= Array(SLOTS).fill(null)))[s] = r.count.p50
          if (dk === tKey) (td[r.camId] ||= Array(SLOTS).fill(null))[s] = r.count.p50
        }
        setToday(td)
        setByDay(days)
      } catch { if (alive) setByDay({}) }
    })()
    return () => { alive = false }
  }, [])

  return { rooms, counts, today, byDay, err, loading }
}


/* ยอดเข้าชมสะสมของทั้งเว็บ (ทุกหน้า ไม่ใช่เฉพาะหน้านี้)
   ตัวเลขมาจาก /api/usage/summary ซึ่งเป็นตัวนับชุดเดียวกับที่หน้า /usage ใช้อยู่
   ช่วงวันกว้าง ๆ = เอาทั้งหมดตั้งแต่วันแรกที่ระบบเริ่มนับ ไม่ใช่ 30 วันล่าสุด (ค่าตั้งต้นของ API)

   ดึงครั้งเดียวตอนเปิดหน้า ไม่ได้ตามสด — เป็นตัวเลขสะสมที่ขยับช้า ไม่คุ้มจะยิงซ้ำเรื่อย ๆ
   ดึงไม่ได้ก็คืน null แล้วป้ายจะไม่ขึ้นเลย ดีกว่าโชว์ 0 ให้เข้าใจว่าไม่มีคนเข้าเลย */
function useSiteViews() {
  const [n, setN] = useState(null)
  useEffect(() => {
    let live = true
    fetch(`${API}/api/usage/summary?from=2000-01-01&to=2100-12-31`)
      .then(r => r.json())
      .then(d => { if (live && d?.ok && typeof d.totals?.views === 'number') setN(d.totals.views) })
      .catch(() => {})
    return () => { live = false }
  }, [])
  return n
}

// ── ดาวที่ผู้ใช้ให้พื้นที่ ──────────────────────────────────────────────
// ยังไม่มีระบบล็อกอิน จึงใช้ id ที่เครื่องสุ่มเองเก็บใน localStorage เป็นตัวกันโหวตซ้ำ
// server เก็บแค่ hash ของมัน (ดู gateway/models/zoneRating.js)
// ล้าง localStorage แล้วโหวตใหม่ได้ — รับได้สำหรับคะแนนความน่านั่งของพื้นที่
// วันไหนต่อ SSO ของมหาลัยได้ ค่อยเปลี่ยนไปใช้ subject id แล้วจะเป็น 1 คน 1 คะแนนจริง
function voterId() {
  try {
    let v = localStorage.getItem('momay_vid')
    if (!v) {
      v = (crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`)
      localStorage.setItem('momay_vid', v)
    }
    return v
  } catch { return null }   // เบราว์เซอร์ปิด storage = ให้คะแนนไม่ได้ แต่หน้าอื่นต้องไม่พัง
}
const readMine = () => { try { return JSON.parse(localStorage.getItem('momay_myratings') || '{}') } catch { return {} } }

function useRatings() {
  const [ratings, setRatings] = useState({})
  const [mine, setMine] = useState(readMine)
  const [busy, setBusy] = useState('')
  const [err, setErr] = useState('')

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const j = await (await fetch(`${API}/api/ratings`)).json()
        if (alive && j.ok) setRatings(j.ratings || {})
      } catch { /* ไม่มีคะแนนก็แค่ไม่โชว์ ไม่ต้องขึ้น error ทั้งหน้า */ }
    })()
    return () => { alive = false }
  }, [])

  const vote = async (roomId, score) => {
    const vid = voterId()
    if (!vid) return
    setBusy(roomId); setErr('')
    try {
      const r = await fetch(`${API}/api/ratings`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, score, vid }),
      })
      const j = await r.json()
      if (!j.ok) throw new Error(j.error || 'failed')
      setRatings(p => ({ ...p, [roomId]: j.rating }))
      const next = { ...readMine(), [roomId]: score }
      setMine(next)
      try { localStorage.setItem('momay_myratings', JSON.stringify(next)) } catch { /* โหวตติดแล้ว แค่จำไม่ได้ */ }
    } catch { setErr(roomId) }
    finally { setBusy('') }
  }

  return { ratings, mine, vote, busy, err }
}

// ── จองห้อง ────────────────────────────────────────────────────────────
// ใช้ collection bookings ตัวเดียวกับที่ autoControl เฝ้าอยู่ — จองจากหน้านี้แล้ว
// ระบบเปิดไฟ/แอร์ให้ตอนถึงเวลาจริง ไม่ใช่ตารางจองที่แยกกันอยู่คนละใบกับของจริง
// booking.room ต้องตรงกับ gw_rooms.roomId เป๊ะ ๆ (autoControl จับคู่ด้วยค่านี้)
const bkDate = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const hhmmToMin = s => { const [h, m] = String(s || '0:0').split(':').map(Number); return h * 60 + (m || 0) }
const minToHhmm = m => `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`

function useBookings() {
  const [list, setList] = useState(null)      // null = ยังไม่โหลด, [] = โหลดแล้วไม่มี
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const date = bkDate(new Date())

  const load = async () => {
    try {
      const j = await (await fetch(`${API}/api/bookings?date=${date}`)).json()
      setList(Array.isArray(j.data) ? j.data : [])
    } catch { setList([]) }
  }
  useEffect(() => { load(); const t = setInterval(load, 60000); return () => clearInterval(t) }, [])   // eslint-disable-line react-hooks/exhaustive-deps

  const create = async body => {
    setBusy(true); setErr('')
    try {
      const r = await fetch(`${API}/api/bookings`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, date }),
      })
      const j = await r.json()
      if (!j.success) throw new Error(j.error || 'failed')
      await load()
      return true
    } catch (e) { setErr(e.message); return false }
    finally { setBusy(false) }
  }

  // ของห้องหนึ่ง ณ ตอนนี้: กำลังใช้อยู่ไหม / ว่างอีกครั้งกี่โมง / คิวถัดไป
  const stateOf = roomId => {
    if (!list) return { loading: true }
    const mine = list.filter(b => (b.room || '').replace(/\s*▼\s*/, '').trim() === roomId)
      .sort((a, b) => hhmmToMin(a.startTime) - hhmmToMin(b.startTime))
    const now = new Date().getHours() * 60 + new Date().getMinutes()
    const cur = mine.find(b => hhmmToMin(b.startTime) <= now && now < hhmmToMin(b.endTime))
    const next = mine.find(b => hhmmToMin(b.startTime) > now)
    return { loading: false, all: mine, current: cur || null, next: next || null }
  }

  return { list, date, load, create, busy, err, stateOf }
}

// ── ฐานเทียบ ("ปกติของช่วงเวลานี้") ──────────────────────────────────
// กติกา: ห้ามเอาวันคนละวันในสัปดาห์มาเฉลี่ยรวมกันเด็ดขาด
//   มีข้อมูล >= 7 วัน  -> ใช้ "วันเดียวกันของสัปดาห์" ย้อนหลัง (ศุกร์เทียบศุกร์)
//   ยังไม่ถึง          -> ใช้ "เมื่อวาน" วันเดียว แล้วบอกที่มาให้ผู้ใช้รู้
//   ไม่มีวันก่อนหน้าเลย -> ไม่มีฐานเทียบ (ไม่เดา ไม่วาด)
const median = a => {
  if (!a.length) return null
  const v = [...a].sort((x, y) => x - y)
  return v.length % 2 ? v[(v.length - 1) / 2] : (v[v.length / 2 - 1] + v[v.length / 2]) / 2
}
function useBaseline(byDay) {
  return useMemo(() => {
    if (!byDay) return { series: null, basis: null, days: [] }
    const now = new Date()
    const tKey = dayKey(now)
    const past = Object.keys(byDay).filter(k => k !== tKey).sort()
    if (!past.length) return { series: null, basis: null, days: [] }
    const dowOf = k => new Date(`${k}T00:00:00`).getDay()
    const sameDow = past.filter(k => dowOf(k) === now.getDay())
    const useSame = past.length >= 7 && sameDow.length >= 1
    const use = useSame ? sameDow : [past[past.length - 1]]   // ไม่ถึงเกณฑ์ = เมื่อวานวันเดียว
    const cams = new Set(use.flatMap(k => Object.keys(byDay[k] || {})))
    const series = {}
    for (const cam of cams) {
      series[cam] = Array.from({ length: SLOTS }, (_, s) => {
        // median ข้ามวัน "ในชุดเดียวกัน" เท่านั้น (ชุด = วันเดียวกันของสัปดาห์)
        const v = use.map(k => byDay[k]?.[cam]?.[s]).filter(x => x != null)
        return v.length ? median(v) : null
      })
    }
    return { series, basis: useSame ? 'sameDow' : 'yesterday', days: use }
  }, [byDay])
}

// ── เวลาเปิด-ปิดของพื้นที่ (ผู้ดูแลกรอกที่ /settings) ────────────────
// จำเป็นเพราะช่วงที่ปิด ข้อมูลจะเป็น 0 เหมือนกับ "เปิดอยู่แต่ไม่มีคน" ทุกประการ
// ถ้าไม่ตัดออก ระบบจะแนะนำให้ไปนั่งตอนห้องสมุดปิด
const slotOfHHMM = v => {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(v || '').trim())
  if (!m) return null
  const h = +m[1], mi = +m[2]
  return h > 23 || mi > 59 ? null : h * 2 + (mi >= 30 ? 1 : 0)
}
// ห้องสมุดเปิด ส-อา คนละเวลากับวันธรรมดา — ต้องรู้ว่าวันนี้เป็นวันไหนก่อนจะบอกเวลาเปิด
const isWeekend = d => d.getDay() === 0 || d.getDay() === 6
// เวลาเปิดที่ใช้ "วันนี้" · ไม่ได้กรอกช่องเสาร์-อาทิตย์ = ใช้เวลาเดียวกับวันธรรมดา
const hoursToday = (room, now = new Date()) => {
  const we = isWeekend(now)
  return {
    from: (we && room.openFromWeekend) || room.openFrom || '',
    to:   (we && room.openToWeekend)   || room.openTo   || '',
  }
}
// from > to = ข้ามเที่ยงคืน (08:00-02:00) · ไม่ได้กรอก = เปิดตลอด
const isOpenSlot = (s, from, to) =>
  from == null || to == null || from === to ? true
    : from < to ? (s >= from && s < to) : (s >= from || s < to)

function useZones(rooms, counts, base, today) {
  return useMemo(() => {
    const nowSlot = slotOf(new Date())
    const mk = (room, cams) => {
      const ids = cams.map(d => String(d.meta.camId))
      const live = ids.map(id => counts[id]).filter(c => c && !c.stale)
      // กล้องที่ยอมให้เอาภาพไปโชว์ (บางมุมไม่เหมาะ/ไม่อยากให้เห็น)
      let photoIds = cams.filter(usePhoto).map(d => String(d.meta.camId))
      // ผู้ดูแลเลือกกล้องไว้ -> ดันขึ้นหัวแถว (ยังเก็บตัวอื่นไว้เป็นตัวสำรองถ้าตัวที่เลือกไม่มีภาพ)
      const pick = String(room.photoCamId || '')
      if (pick && photoIds.includes(pick)) photoIds = [pick, ...photoIds.filter(x => x !== pick)]
      // เวลาที่ภาพถูกถ่าย — ต้องเป็นของ "กล้องที่เอาภาพมาใช้" ตัวเดียว
      // เดิมเอาค่ามากสุดของทุกกล้องในโซน ทำให้โซนที่มีหลายกล้อง (ชั้น 1 มี 5 ตัว) ค่านี้
      // ขยับแทบทุกรอบ poll -> src ของ <img> เปลี่ยนตลอด -> โหลดใหม่ไม่ทันเห็นภาพ
      const snapTs = photoIds.length ? (counts[photoIds[0]]?.snapTs || null) : null
      const count = live.reduce((s, c) => s + (c.count || 0), 0)
      const vcount = live.reduce((s, c) => s + (c.vcount || 0), 0)
      // ห้องที่ไม่มีกล้องใช้จำนวนที่นั่งที่ผู้ดูแลกรอกเองแทน (ห้องประชุมที่เปิดให้จองอย่างเดียว)
      const capacity = cams.reduce((s, d) => s + (Number(d.meta?.capacity) || 0), 0) || Number(room.seats) || 0
      const capacityVeh = cams.reduce((s, d) => s + (Number(d.meta?.capacityVehicle) || 0), 0)
      const pct = !live.length ? null
        : capacity > 0 ? Math.min(100, Math.round((count / capacity) * 100))
        : Math.round(live.reduce((s, c) => s + (c.pct || 0), 0) / live.length)
      // ช่วงที่ปิด = ไม่มีข้อมูล (null) ไม่ใช่ศูนย์ — กราฟจะได้ไม่ลากเส้นผ่านช่วงปิด
      // และ windowOf จะไม่หยิบช่วงนั้นมาเป็นคำแนะนำ
      const hrs = hoursToday(room)
      const oFrom = slotOfHHMM(hrs.from), oTo = slotOfHHMM(hrs.to)
      const open = s => isOpenSlot(s, oFrom, oTo)
      const merge = src => {
        const per = ids.map(id => src[id]).filter(Boolean)
        if (!per.length) return null
        return Array.from({ length: SLOTS }, (_, s) => {
          if (!open(s)) return null
          const v = per.map(a => a[s]).filter(x => x != null)
          return v.length ? v.reduce((a, b) => a + b, 0) : null
        })
      }
      const todayLine = today ? merge(today) : null
      const typical = base ? merge(base) : null
      return {
        roomId: room.roomId, label: room.label || room.roomId, shortLabel: room.shortLabel,
        zoneType: room.zoneType || '', floor: room.floor ?? null, img: room.img, order: room.order ?? 0,
        quietRating: room.quietRating ?? null,
        // เวลาเปิดที่ส่งต่อไปทั้งหน้า = ของ "วันนี้" ไม่ใช่ของวันธรรมดาเสมอ
        openFrom: hrs.from, openTo: hrs.to, openNow: open(nowSlot),
        bookable: !!room.bookable,
        // นับเป็นห้อง (ห้องศึกษากลุ่ม/ห้องกิจกรรม) หรือเป็นที่นั่ง (ค่าปกติ)
        unit: room.unit === 'room' ? 'room' : 'seat',
        // ข้อความ 2 ภาษา — ไม่กรอก EN ก็ถอยไปใช้ไทย ไม่ปล่อยช่องว่าง
        tags: String(room.studentTags || '').split(',').map(x => x.trim()).filter(Boolean),
        tagsEn: String(room.studentTagsEn || '').split(',').map(x => x.trim()).filter(Boolean),
        note: room.studentNote || '', noteEn: room.studentNoteEn || '',
        labelEn: room.labelEn || '',
        camIds: ids, nCams: ids.length, snapTs, capacityVeh, photoIds,
        // รูปที่ผู้ดูแลอัปโหลดเอง (คีย์ใน gw_assets) — ว่าง = การ์ดนี้ไม่มีรูป
        // พื้นที่หนึ่งมีได้หลายใบ · ห้องที่ตั้งไว้ก่อนมีลิสต์ยังมีแต่ heroImg ใบเดียว
        heroImgs: room.heroImgs?.length ? room.heroImgs : room.heroImg ? [room.heroImg] : [],
        heroV: room.updatedAt || '',
        hasLive: live.length > 0, count, vcount, capacity, pct,
        typical, todayLine, typicalNow: typical?.[nowSlot] ?? null, typicalNext: typical?.[(nowSlot + 2) % SLOTS] ?? null,
      }
    }
    const isVeh = d => ['vehicle', 'both'].includes(d.meta?.detectTarget)
    // กล้องที่มุมทับกับตัวอื่น ปิดได้รายตัวที่ /settings — ไม่งั้นคน/รถคันเดียวถูกนับซ้ำ
    // แยกคนกับรถ เพราะมุมที่ทับกันตอนนับคน อาจไม่ทับกันตอนนับรถ
    const useP = d => d.meta?.stPerson !== false      // นับคน
    const useV = d => d.meta?.stVehicle !== false     // นับรถ
    const usePhoto = d => d.meta?.stPhoto !== false   // ใช้ภาพเป็นตัวอย่างโซน
    const out = { zones: [], parking: [] }
    for (const room of rooms) {
      if (room.kind === 'building') continue
      // ผู้ดูแลเลือกกล้องให้พื้นที่เองได้ที่ /settings — ไม่งั้นใช้กล้องที่ผูกกับห้องในทะเบียน
      const cams = roomCams(room, rooms)
      const park = cams.filter(d => isVeh(d) && useV(d))
      const seat = cams.filter(d => !isVeh(d) && useP(d))
      if (seat.length) out.zones.push(mk(room, seat))
      // พื้นที่ที่ยังไม่มีกล้องเลยแต่ผู้ดูแลตั้งประเภทไว้แล้ว (เช่น ห้องประชุมที่เปิดให้จอง
      // อย่างเดียว หรือพื้นที่ที่เพิ่งสร้าง ยังไม่ได้ผูกกล้อง) — ให้ขึ้นในรายการด้วย
      // จำนวนคนขึ้น "—" และไม่ถูกหยิบมาแนะนำ เพราะไม่มีข้อมูลสด ไม่ใช่เพราะไม่มีคน
      else if (!cams.length && room.zoneType) out.zones.push(mk(room, []))
      if (park.length) out.parking.push({ ...mk(room, park), label: room.label || room.roomId })
    }
    return out
  }, [rooms, counts, base, today])
}

// ช่วงเวลาที่ค่าต่ำ/สูงสุด → "HH:MM - HH:MM"
// maxLen = จำนวนช่อง 30 นาทีสูงสุดของช่วงที่ตอบกลับ (4 = 2 ชม.)
function windowOf(typical, { from = 0, to = SLOTS - 1, mode = 'min', maxLen = 4 } = {}) {
  if (!typical) return null
  const idx = []
  for (let s = from; s <= to; s++) if (typical[s] != null) idx.push(s)
  if (idx.length < 2) return null
  const vals = idx.map(s => typical[s])
  const best = mode === 'min' ? Math.min(...vals) : Math.max(...vals)
  const peak = Math.max(...vals) || 1
  const near = s => mode === 'min' ? typical[s] <= best + peak * 0.12 : typical[s] >= best - peak * 0.12
  const bs = idx.find(near); if (bs == null) return null
  let be = bs
  // จำกัดความยาวช่วง — หลังห้องสมุดปิด ตัวเลขเป็น 0 ยาวติดกันหลายชั่วโมง
  // ปล่อยไว้จะได้คำแนะนำว่า "ช่วงที่ว่างที่สุดคือ 18:00 - 00:00" ซึ่งไม่ใช่คำแนะนำ
  // และเวลาวาดบนกราฟก็กลายเป็นแถบทึบยาวครึ่งรูป
  for (const s of idx) if (s === be + 1 && near(s) && be - bs + 1 < maxLen) be = s
  return { from: bs, to: be + 1, text: `${slotLabel(bs)} - ${slotLabel(be + 1)}` }
}

// ── ชิ้นส่วน UI ───────────────────────────────────────────────────────
// หัวข้อสองภาษา — ไทยเป็นตัวหลัก อังกฤษต่อท้ายด้วยสีจาง ๆ ให้อ่านผ่านได้ไม่รบกวนสายตา
const Sec = ({ children, info, tone = C.blue, flush = false }) => (
  /* ป้ายหัวข้อไล่เฉดจากสีสดด้านซ้ายไปหาพื้นเข้มด้านขวา — เหมือนป้ายหมวดในเกม
     ไม่ใช่ตัวหนังสือลอย ๆ · ส่งเฉดเข้าไปทาง --nbfill ได้เลยเพราะ .nb เอาค่านั้น
     ไปวางเป็นชั้นพื้นหลัง ซึ่งรับได้ทั้งสีเดี่ยวและ gradient */
  <div className="nb chip" style={{
    ...S.secTitle,
    // flush = ยกระยะห่างไปให้ตัวครอบจัดการ ใช้ตอนวางป้ายไว้ในแถวเดียวกับของอย่างอื่น
    ...(flush ? { margin: 0 } : null),
    '--nb': tone, '--nb2': C.purple, '--st': '3px',
    '--nbfill': `linear-gradient(90deg, ${tone} 0%, #3a1580 55%, #1b0940 100%)`,
    display: 'inline-flex', padding: '6px 15px 6px 11px', textShadow: '0 1px 0 rgba(0,0,0,.5)',
  }}>{children}{info && <Icon name="info" color="#8b6fd0" size={13} />}</div>
)

function ZoneRow({ z, a, onClick, showMode = false }) {
  const t = useT()
  const A = actT(a, t.i)
  return (
    <button data-track="zone-row" onClick={onClick} className="nb" style={{ ...S.card, width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 11, padding: '11px 13px', cursor: 'pointer' }}>
      <Icon name={iconOf(z, a.icon)} color={a.color} size={18} />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {zoneName(z, t.i)}
          {showMode && <span style={{ fontSize: 10, fontWeight: 800, color: a.color, marginLeft: 6 }}>· {A.title}</span>}
        </div>
        <div style={S.dim}>
          {a.metric === 'quiet'
            ? <><Stars n={stars(z.quietRating)} color={a.color} />
                <span style={{ fontSize: 10, marginLeft: 4 }}>{quietWord(z.quietRating, t.i)}</span></>
            : `${t('density')} ${z.pct ?? '--'}%`}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 13.5, fontWeight: 800, color: '#fff' }}>{z.hasLive ? `${z.count} ${t('people')}` : '—'}</div>
        <div style={{ ...S.dim, fontSize: 10 }}>{t('peopleNow')}</div>
      </div>
      <Icon name="right" color="#8b6fd0" size={15} />
    </button>
  )
}

/* ── พื้นที่แยกตามชั้น ────────────────────────────────────────────────────
   นักศึกษาเดินหาห้องจาก "ชั้น" ไม่ได้หาจากประเภทพื้นที่ หน้าแรกจึงเป็นชั้นก่อน
   กดชั้นแล้วค่อยเห็นพื้นที่ข้างใน (ประเภทพื้นที่ยังเลือกได้จากแท็บ "พื้นที่")

   ทั้งรายชื่อและเวลาเปิดอ่านจาก /api/config ไม่ได้ฝังตารางไว้ในโค้ด — ห้องสมุด
   แก้เวลาเปิดที่ /settings แล้วหน้านี้เปลี่ยนตามทันที ไม่ต้องรอบิลด์ใหม่

   เวลาที่โชว์เป็นของ "วันนี้" (เสาร์-อาทิตย์เปิดคนละเวลากับวันธรรมดา) ไม่ใช่โชว์
   ทั้งสองชุดพร้อมกัน เพราะคนที่เปิดดูอยากรู้ว่าตอนนี้เข้าได้ไหม */
const open24 = z => !z.openFrom || !z.openTo || z.openFrom === z.openTo

// จัดกลุ่มตามชั้น · ลำดับในชั้น = ตามที่ผู้ดูแลจัดไว้ที่ /settings ไม่ใช่เรียงตามตัวเลขสดที่สลับเองได้
const byFloor = zones => {
  const m = new Map()
  for (const z of zones) {
    if (z.floor == null) continue          // ห้องที่ไม่ได้ตั้งชั้น (ห้องเครื่อง/ลานจอด) ไม่ใช่พื้นที่ให้บริการ
    if (!m.has(z.floor)) m.set(z.floor, [])
    m.get(z.floor).push(z)
  }
  return [...m.entries()].sort((a, b) => a[0] - b[0]).map(([f, list]) =>
    [f, list.sort((x, y) => (x.order ?? 0) - (y.order ?? 0) || x.label.localeCompare(y.label))])
}

/* ── แถวพื้นที่ 1 บรรทัด — ใช้ร่วมกันทั้งหน้าแรก (ตามชั้น) และหน้าเลือกหมวด ────
   "ว่างเท่าไหร่" มาได้สองทางแล้วแต่ว่าพื้นที่นั้นมีอะไร
     มีกล้อง + กรอกจำนวนที่นั่ง -> ที่นั่งว่าง = ความจุ ลบ คนที่นับได้
     เป็นห้องที่จองได้            -> ดูจากคิวจองของวันนี้ว่าตอนนี้มีคนใช้อยู่ไหม
   ไม่มีทั้งสองอย่างก็ขึ้นขีด ไม่เดาให้ — 0 แปลว่า "เต็ม" ซึ่งคนละเรื่องกับ "ยังไม่รู้" */
const freeOf = z => (z.capacity > 0 && z.hasLive ? Math.max(0, z.capacity - z.count) : null)

/* sub = แถวนี้กางออกมาจากแถวชั้น ไม่ใช่แถวระดับบนสุด
   ใช้ตอนอยู่ในหน้าแรก (กางจากชั้น) ส่วนหน้าเลือกหมวดเรียกโดยไม่ใส่ = เป็นแถวหลักของหน้านั้น */
function IntentRow({ z, a, st, onClick, sub = false, tone = null }) {
  const t = useT()
  // a = หมวดของพื้นที่ · เป็น null ได้เมื่อห้องนั้นยังไม่ได้ตั้งประเภทพื้นที่ที่ /settings
  const color = a?.color || C.dim
  const free = freeOf(z)
  // นับที่ "ใช้อยู่" ไม่ใช่ "ว่าง" — คู่กับความจุแล้วอ่านได้ทั้งคนตอนนี้และขนาดของพื้นที่
  const used = free != null ? Math.min(z.capacity, z.count) : null
  const booked = z.bookable && st && !st.loading ? !!st.current : null
  // val = ตัวเลข/คำที่เป็นคำตอบ · cap = คำอธิบายใต้คำตอบ
  const total = z.capacity > 0 ? z.capacity : null
  /* ห้องที่ยังไม่มีกล้องแต่กรอกจำนวนที่นั่งไว้ ใช้รูปแบบเดียวกัน (0/20) จะได้อ่านเทียบกันได้
     ต่างกันที่สี: เขียว = วัดได้จริงและยังมีที่ว่าง · ขาว = ตัวเลขซ้ายยังไม่ได้วัด รู้แต่ขนาดพื้นที่ */
  const val = used != null ? `${used}/${total}`
    : total != null ? `0/${total}`
    : z.hasLive ? `${z.pct ?? '--'}%` : '—'
  /* บรรทัดล่าง: ห้องที่จองได้บอกสถานะจากคิวจอง (ว่าง/ไม่ว่าง) ที่เหลือบอกว่าตัวเลขข้างบนคืออะไร
     สองอย่างนี้อยู่คู่กันได้ — ตัวเลขบอกว่าคนเยอะแค่ไหน สถานะบอกว่าตอนนี้เดินเข้าไปใช้ได้ไหม */
  const cap = booked != null
    ? (booked ? `${t('notFree')}${st.current ? ` · ${t('until')} ${st.current.endTime}` : ''}` : t('freeNow'))
    : val === '—' ? t('noDataShort')
    : total == null ? t('density')
    : t(z.unit === 'room' ? 'roomsUsedShort' : 'seatsUsedShort')
  return (
    <button data-track={`zone:${z.label}`} onClick={onClick} className={sub ? 'nb sub' : 'nb'} style={{
      ...S.card, width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center',
      gap: 10, padding: '10px 11px', cursor: 'pointer', '--nb': color, '--nb2': C.purple,
      /* ของรองใช้ขอบบางกว่าและมุมตัดตื้นกว่า — ขนาดกรอบเป็นตัวบอกลำดับชั้น ไม่ใช่แค่สี
         tone = สีของชั้นที่กางอยู่ ใช้ทั้งขอบและพื้น ทั้งกลุ่มจึงอ่านเป็นก้อนเดียวกับแถวชั้น
         สีประเภทพื้นที่ยังอยู่ครบที่ไอคอนกับตัวเลข ไม่ได้หายไปไหน */
      ...(sub ? { '--st': '3px', '--bw': '2px' } : null),
      ...(tone ? { '--nb': tone, '--nb2': C.blue, '--nbfill': '#0b2d47' } : null),
    }}>
      <Icon name={iconOf(z, a?.icon || 'grid')} color={color} size={18} />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {zLabel(z, t.i) || ZONE_NAME[z.zoneType] || z.label}
        </div>
        <div style={{ ...S.dim, fontSize: 10.5, marginTop: 2, color: z.openNow ? C.dim : '#ff5b7a' }}>
          {z.openNow ? '' : `${t('closedNow')} · `}
          {open24(z) ? t('open24') : `${t('openHours')} ${z.openFrom}–${z.openTo}`}
        </div>
      </div>
      {/* คำอธิบายอยู่บน ตัวเลขอยู่ล่าง — อ่านจากบนลงล่างได้เป็นประโยคเดียว
          ("จำนวนที่ใช้งานอยู่ 50/131 ที่นั่ง") ไม่ใช่เจอตัวเลขก่อนแล้วค่อยรู้ทีหลังว่าเลขอะไร */}
      <div style={{ textAlign: 'right', flexShrink: 0, maxWidth: 128 }}>
        <div style={{ ...S.dim, fontSize: 9.5, color: booked === false ? C.green : booked ? '#ff5b7a' : C.dim }}>{cap}</div>
        <div style={{ fontSize: 13, fontWeight: 800, color: used != null && free ? C.green : val === '—' ? C.dim : '#fff' }}>
          {val}
          {/* ติดหน่วยไว้กับตัวเลข — 10 ห้อง กับ 10 ที่นั่ง คนละเรื่องกันมาก */}
          {total != null && <span style={{ fontSize: 9.5, fontWeight: 700, color: C.dim, marginLeft: 3 }}>
            {t(z.unit === 'room' ? 'bookRooms' : 'bookSeats')}
          </span>}
        </div>
      </div>
      <Icon name="right" color="#8b6fd0" size={15} />
    </button>
  )
}

/* ป้ายตัวเลขท้ายแถว — กล่องนีออนของตัวเอง ไม่ใช่ตัวหนังสือลอย ๆ
   ทุกแถวในหน้าวางป้ายนี้ตำแหน่งเดียวกัน กวาดตาลงมาคอลัมน์เดียวก็เทียบได้ทุกชั้น */
const StatBox = ({ cap, val, unit, color = C.green, tone = C.purple }) => (
  /* กว้างตายตัวเท่ากันทุกใบ ไม่ยืดตามความยาวตัวเลข — ป้ายทุกแถวจะได้เริ่มที่ตำแหน่ง
     เดียวกันพอดี กวาดตาลงมาคอลัมน์เดียวก็เทียบทุกชั้นได้ (0/70 กับ 0/191 ต้องตรงกัน)
     ความกว้างต้องพอสำหรับเลขสามหลักทั้งคู่ + หน่วย ("150/191 ที่นั่ง" ใช้ ~108)
     เคยตั้งไว้ 92 แล้วชั้นที่มีที่นั่งหลักร้อยดันหน่วยตกบรรทัดจนป้ายสูงกว่าใบอื่น */
  <span className="nb chip" style={{ '--nb': tone, '--nb2': tone, '--nbfill': '#1a0a3e', flexShrink: 0, textAlign: 'center', padding: '5px 4px', width: 112 }}>
    <span style={{ display: 'block', fontSize: 8.5, color: '#c9b8ff' }}>{cap}</span>
    {/* ตัวเลขกับหน่วยต้องอยู่บรรทัดเดียวกันเสมอ — เลขยาวผิดคาดให้ล้นออกนอกกรอบ
        ดีกว่าตัดคำว่า "ที่นั่ง" ครึ่งหนึ่งไปขึ้นบรรทัดใหม่ */}
    <span style={{ display: 'block', fontSize: 17, fontWeight: 900, color, textShadow: `0 0 9px ${color}88`, lineHeight: 1.25, whiteSpace: 'nowrap' }}>
      {val}{unit && <span style={{ fontSize: 9, fontWeight: 700, color: '#c9b8ff', marginLeft: 3 }}>{unit}</span>}
    </span>
  </span>
)

// หน้าแรก: ชั้น 1-6 เรียงลงมา กดแล้วกางพื้นที่ของชั้นนั้นออกมาในหน้าเดิม
// กางทีละชั้น — กางค้างไว้ได้ทุกชั้นเมื่อไหร่ หน้าแรกก็ยาวเป็นสิบจอเหมือนไม่ได้ยุบ
/* ประกายกระจายรอบแถวที่เพิ่งถูกกด — ของประดับล้วน ไม่กินคลิก (pointerEvents: none)
   ตำแหน่งของแต่ละเม็ดคำนวณจากดัชนีเป็นวงกลม ไม่ได้สุ่ม เพื่อให้กระจายรอบทิศเท่า ๆ กันทุกครั้ง
   สั่งเล่นใหม่ด้วยการเปลี่ยน key ของคอมโพเนนต์ (React ถอดของเก่าทิ้งแล้วสร้างใหม่
   อนิเมชันจึงเริ่มนับหนึ่งใหม่ ซึ่ง CSS animation ทำเองไม่ได้ถ้า element เดิมยังอยู่) */
const BURST_N = 16
function Burst({ color }) {
  const bits = useMemo(() => Array.from({ length: BURST_N }, (_, i) => {
    const ang = (i / BURST_N) * Math.PI * 2
    const dist = 46 + (i % 4) * 16
    return {
      dx: `${(Math.cos(ang) * dist).toFixed(1)}px`,
      dy: `${(Math.sin(ang) * dist * 0.6).toFixed(1)}px`,
      size: 4 + (i % 3) * 2,
      delay: `${(i % 5) * 22}ms`,
    }
  }), [])
  return (
    <span aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}>
      {bits.map((b, i) => (
        <span key={i} className="eb8-burst" style={{
          position: 'absolute', left: '50%', top: '50%', width: b.size, height: b.size,
          marginLeft: -b.size / 2, marginTop: -b.size / 2,
          background: i % 3 ? '#ffffff' : color,
          boxShadow: `0 0 8px ${color}, 0 0 16px ${color}`,
          '--dx': b.dx, '--dy': b.dy, animationDelay: b.delay,
        }} />
      ))}
    </span>
  )
}

function FloorAccordion({ zones, bk, go }) {
  const t = useT()
  const floors = useMemo(() => byFloor(zones), [zones])
  const [open, setOpen] = useState(null)
  // เปลี่ยนทุกครั้งที่กด — เอาไปทำ key ของ Burst ให้ประกายเล่นใหม่ แม้จะกดชั้นเดิมซ้ำ
  const [pop, setPop] = useState(0)
  if (!floors.length) return <div className="nb" style={{ ...S.card, ...S.dim }}>{t('noZone')}</div>
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      {floors.map(([f, list]) => {
        const on = open === f
        const all24 = list.every(open24)
        const live = list.filter(z => z.hasLive)
        const people = live.reduce((s, z) => s + z.count, 0)
        // ที่นั่งกับห้องนับคนละหน่วย (ห้องศึกษากลุ่มนับเป็นห้อง) จึงรวมแยกกัน
        const seats = list.reduce((s, z) => s + (z.unit === 'room' ? 0 : z.capacity || 0), 0)
        /* ขาว = "ชั้นที่กำลังดูอยู่" · ม่วง = ชั้นอื่น
           ตอนยังไม่ได้กางอะไรเลย ให้ชั้นแรกติดขาวไว้ก่อน เป็นตัวชี้นำว่าแถวพวกนี้กดได้
           (ไม่ได้ผูกกับ 24 ชม. แล้ว — สีตัวนี้บอก "สถานะการเลือก" ไม่ใช่ประเภทของชั้น)
           เคยเป็นฟ้า แต่ฟ้าไปซ้ำกับสีขอบนีออนที่ใช้ทั่วหน้าอยู่แล้วจนแยกไม่ออกว่ากดอันไหนค้างไว้
           ขาวไม่ซ้ำกับสีไหนในจานสีนี้เลย แถวที่เลือกจึงเด้งออกมาจากแถวอื่นทันที */
        const lit = on || (open == null && f === floors[0][0])
        const color = lit ? SEL : C.purple
        /* กลางแถว = ไอคอนของพื้นที่จริงในชั้นนั้น เรียงตามลำดับที่ตั้งไว้ที่ /settings
           บอกได้ในแวบเดียวว่าชั้นนี้มีอะไร (กาแฟ / ไอแพด / ที่นั่งอ่าน) โดยไม่ต้องกดกางออกมาดู
           เอาแค่ 5 ใบแรก — มากกว่านี้แถบไอคอนจะยาวจนเบียดตัวเลขท้ายแถวบนจอแคบ
           พื้นที่ที่ยังไม่ได้ตั้งประเภทที่ /settings ใช้ไอคอนกลาง ๆ ไม่ข้ามทิ้ง จะได้รู้ว่ามีอยู่ */
        /* ชนิดละใบพอ — ชั้นหนึ่งมีพื้นที่กิจกรรมเดียวกันหลายห้องได้ (ชั้น 2 มีห้องอ่าน
           หนังสือสามห้อง) ขึ้นไอคอนหนังสือสามใบไม่ได้บอกอะไรเพิ่ม แต่ดันใบอื่นตกแถวสอง
           จนมองไม่ออกว่าชั้นนี้มีอะไรบ้าง ซึ่งเป็นหน้าที่เดียวของแถวนี้ */
        const marks = []
        for (const z of list) {
          const icon = iconOf(z)
          if (marks.some(m => m.icon === icon)) continue
          marks.push({ icon, color: actOf(z)?.color || '#8b6fd0' })
          if (marks.length === 5) break
        }
        /* ตัวเลขคน/ที่นั่งย้ายมาอยู่ท้ายแถว รูปแบบเดียวกับแถวพื้นที่ที่กางออกมาข้างใน
           (49/191) — เรียงเป็นคอลัมน์เดียวกันทั้งหน้า กวาดตาลงมาก็เทียบได้ทุกชั้น
           ไม่ต้องอ่านประโยคยาวทีละบรรทัดแล้วเทียบเอาเอง
           สีเดียวกับแถวข้างใน: เขียว = วัดได้จริงและยังมีที่ว่าง · ขาว = รู้แต่ขนาดพื้นที่ */
        const used = live.length && seats > 0 ? Math.min(seats, people) : null
        const val  = seats > 0 ? `${used ?? 0}/${seats}` : null
        return (
          <div key={f} data-track-scope={`floor${f}`} style={{ position: 'relative' }}>
            {/* สีของแถว = สีขอบนีออน · ชั้นที่เปิด 24 ชม. ใช้ฟ้า ที่เหลือใช้ชมพู-ม่วง
                กดกางอยู่ = พื้นในสว่างขึ้นและขอบเรืองแรงขึ้น ไม่ต้องมีคำว่า "เปิดอยู่" */}
            <div style={{ position: 'relative' }}>
            <button data-track={`floor-${f}`} onClick={() => { setOpen(on ? null : f); setPop(n => n + 1) }} className="nb" style={{
              ...S.card, width: '100%', textAlign: 'left', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 9, padding: '11px 12px',
              '--nb': color, '--nb2': lit ? SEL : C.pink, '--nbfill': on ? '#2b1a5c' : '#150733',
              /* กางอยู่ = ขอบหนาขึ้นและพื้นในสว่างขึ้น จะได้ยังเป็นตัวแม่ที่เด่นกว่าแถวลูกข้างล่าง */
              ...(on ? { '--bw': '4px' } : null),
            }}>
              {/* เลขชั้นเป็นชิปคู่ (คำว่า "ชั้น" + ตัวเลข) — เลขใหญ่พอให้กวาดตาหาชั้นที่ต้องการได้เลย
                  ใต้ชิปบอกจำนวนห้องของชั้นนั้น: ชิปตอบว่า "ชั้นไหน" บรรทัดล่างตอบว่า "มีให้เลือกกี่ที่"
                  นับจากพื้นที่ที่ตั้งไว้จริงใน /settings ไม่ได้ฝังตัวเลขไว้ในโค้ด */}
              <span style={{ display: 'grid', justifyItems: 'center', gap: 4, flexShrink: 0 }}>
                <span style={{ display: 'flex', alignItems: 'stretch', gap: 5 }}>
                  <span className="nb chip" style={{ '--nb': C.purple, '--nb2': C.pink, '--nbfill': '#3a1580', display: 'grid', placeItems: 'center', padding: '6px 7px', fontSize: 12.5, fontWeight: 700, color: '#fff' }}>{t('floorWord')}</span>
                  <span className="nb chip" style={{ '--nb': '#ffffff', '--nb2': C.purple, '--nbfill': '#4a1d9e', display: 'grid', placeItems: 'center', minWidth: 30, fontSize: 19, color: '#fff', textShadow: '0 0 10px rgba(255,255,255,.6)' }}>{f}</span>
                </span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#c9b8ff', whiteSpace: 'nowrap' }}>
                  {list.length} {t('bookRooms')}
                </span>
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                {/* เขียนกำกับเฉพาะชั้นที่มีความหมายของตัวเอง (ชั้น 1 = เปิด 24 ชม.)
                    ชั้นอื่นไม่ต้องมีบรรทัดนี้ — จำนวนพื้นที่/ห้องนับซ้ำกับสิ่งที่ตาเห็นอยู่แล้ว
                    (แถบไอคอน = มีอะไรบ้าง · ป้ายท้ายแถว = ใช้ไปเท่าไหร่จากทั้งหมด)
                    ไม่มีบรรทัดนี้ ไอคอนก็ขยายขึ้นมาเป็นเนื้อหาหลักของแถวแทน */}
                {all24 && (
                  <span style={{ display: 'block', fontSize: 12.5, fontWeight: 800, color, textShadow: `0 0 10px ${color}99` }}>
                    {t('all24')}
                  </span>
                )}
                {/* ป้ายตัวเลขกว้างตายตัวแล้ว ที่เหลือให้ไอคอนใช้ — เกินก็ตกลงแถวสอง
                    ดีกว่าบีบไอคอนให้เล็กลงหรือตัดใบท้าย ๆ ทิ้งจนไม่รู้ว่าชั้นนั้นมีอะไรบ้าง */}
                <span style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 5, marginTop: all24 ? 5 : 0 }}>
                  {marks.map((m, k) => <Icon key={k} name={m.icon} color={m.color} size={all24 ? 20 : 24} />)}
                </span>
              </span>
              {val && <StatBox cap={t('seatsUsedShort')} val={val} unit={t('bookSeats')}
                color={used != null && seats - used > 0 ? C.green : '#fff'} tone={color} />}
              {/* ลูกศรหมุนลงตอนกาง — บอกว่ากางอยู่โดยไม่ต้องมีคำอธิบาย */}
              <span style={{ display: 'grid', placeItems: 'center', flexShrink: 0, transform: `rotate(${on ? 90 : 0}deg)` }}>
                <Icon name="right" color={on ? color : '#a77ce0'} size={16} />
              </span>
            </button>
            {/* ประกายเล่นเฉพาะแถวที่เพิ่งกด — pop เปลี่ยนค่าทุกครั้งที่กด จึงเล่นซ้ำได้
                อยู่ในตัวครอบของ "แถว" ไม่ใช่ของทั้งกลุ่ม ประกายจึงกระจายออกจากแถวที่นิ้วกดจริง */}
            {on && <Burst key={pop} color={SEL} />}
            </div>

            {/* ของที่กางออกมาต้องอ่านเป็น "อยู่ในชั้นนี้" ไม่ใช่แถวถัดไปที่ระดับเดียวกัน
                ใช้สามอย่างพร้อมกัน: ร่นเข้าไปทางซ้าย · รางสีของชั้นพาดตลอดกลุ่ม · แถวลูกเรืองแสงเบากว่า
                (ร่นอย่างเดียวไม่พอบนจอแคบ เพราะร่นได้ไม่กี่พิกเซลก่อนเนื้อหาจะเริ่มอึดอัด) */}
            {on && (
              <div style={{ display: 'grid', gap: 7, margin: '9px 0 4px', marginLeft: 16, paddingLeft: 12, borderLeft: `4px solid ${color}`, boxShadow: `-4px 0 12px -3px ${color}` }}>
                {list.map(z => {
                  const a = actOf(z)
                  return (
                    /* ขีดแนวนอนเชื่อมรางกับแถว — รางตั้งบอกว่า "กลุ่มนี้ยาวถึงไหน"
                       ขีดนอนบอกว่า "แถวนี้แขวนอยู่กับราง" อ่านเป็นกิ่งของชั้นทันที
                       กว้างเท่า paddingLeft ของกล่องพอดี ปลายจึงชนรางไม่มีช่องโหว่ */
                    <div key={z.roomId} style={{ position: 'relative' }}>
                      <span aria-hidden style={{
                        position: 'absolute', left: -12, top: '50%', marginTop: -2,
                        width: 12, height: 4, background: color, boxShadow: `0 0 8px ${color}`,
                      }} />
                      <IntentRow z={z} a={a} st={z.bookable ? bk?.stateOf(z.roomId) : null} sub tone={color}
                        onClick={() => go(a ? { v: 'zone', a: a.key, room: z.roomId } : { v: 'map', room: z.roomId })} />
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── จอประชาสัมพันธ์แบบตู้เกมอาร์เคด ────────────────────────────────────
   ป้ายไฟด้านบน (marquee) + จอด้านล่างที่สลับข้อความไปเรื่อย ๆ

   ทุกบรรทัดบนจอมาจากข้อมูลจริงทั้งหมด ไม่มีข้อความโฆษณาที่พิมพ์ทิ้งไว้ในโค้ด —
   ระบบยังไม่มีที่ให้ผู้ดูแลกรอกประกาศ (ใน /api/config ไม่มีฟิลด์นี้) ถ้าจะให้ห้องสมุด
   พิมพ์ประกาศเองได้ ต้องเพิ่มฟิลด์ที่ gateway + หน้า /settings ก่อน แล้วค่อยเอามาต่อ
   ที่ตัวแปร lines ข้างล่างนี้ · ระหว่างนี้จอโชว์สิ่งที่คนเดินเข้ามาอยากรู้จริง ๆ

   บรรทัดไหนไม่มีข้อมูลก็ตัดทิ้ง ไม่ขึ้นขีดหรือเลข 0 ให้เข้าใจผิด
   ถ้าไม่เหลือบรรทัดไหนเลยก็ยังมีคำต้อนรับ จอจะได้ไม่ว่างเปล่า */
/* ── ตู้อาร์เคด: จอประกาศแบบหน้าจอคอนโซล ──────────────────────────────
   ข้อความบนจอเป็นประกาศที่ห้องสมุดให้มา ไม่ใช่ตัวเลขที่คำนวณจากระบบ

   ยังไม่มีที่ให้ผู้ดูแลพิมพ์ประกาศเอง (ใน /api/config ไม่มีฟิลด์นี้) จึงเก็บไว้ที่นี่ก่อน
   เปลี่ยนประกาศ = แก้ข้อความในลิสต์นี้แล้ว build ใหม่ · ใส่หลายใบก็วนสลับให้เอง
   ถ้าจะให้ห้องสมุดแก้เองได้ ต้องเพิ่มฟิลด์ที่ gateway + หน้า /settings ก่อน
   แล้วเปลี่ยนแค่ที่มาของ NOTICES ที่เหลือใช้ได้เลย

   ข้อความไทยเป็น Sarabun ตามปกติ ไม่ใช่ฟอนต์พิกเซล (ฟอนต์พิกเซลไม่มีสระไทย)
   ความเป็นหน้าจอคอนโซลมาจากบรรทัดคำสั่ง สีเขียวบนพื้นดำ เส้นสแกน และเคอร์เซอร์กะพริบ */
const NOTICES = [
  'สำนักหอสมุดขอความร่วมมือ "ไม่จองโต๊ะนั่งอ่าน" เพื่อเป็นการแบ่งปันเก้าอี้และโต๊ะนั่งอ่าน'
  + 'ให้สามารถใช้งานได้ทุกคน และขอความร่วมมือผู้ใช้บริการ ไม่วางสิ่งของหรือทรัพย์สินทิ้งไว้'
  + 'โดยไม่มีผู้ดูแล หากเกิดการสูญหาย สำนักหอสมุดจะไม่รับผิดชอบต่อความเสียหายใด ๆ '
  + 'ที่เกิดขึ้นกับทรัพย์สินดังกล่าว',
  /* ขึ้นบรรทัดใหม่ด้วย 
 จริง ๆ (จอตั้ง whiteSpace: pre-line ไว้) — ตารางเวลาต้องอ่าน
     เป็นบรรทัดต่อบรรทัด ปล่อยให้ข้อความไหลรวมกันเองจะกลายเป็นย่อหน้ายาวที่หาเวลาไม่เจอ */
  'เวลาเปิด-ปิดบริการ (ชั้น 2 - ชั้น 7)\n'
  + 'จันทร์ - ศุกร์ 8.00 - 20.30 น.\n'
  + 'เสาร์ - อาทิตย์ 10.00 - 19.00 น.\n'
  + '\n'
  + 'ห้องโถงชั้น 1 เปิดบริการ 24 ชม.',
]
/* เฉลยไอคอน — หมวดทั้งหมดตาม ACTIVITIES บวกไอคอนที่ผูกกับชื่อพื้นที่ใน ZONE_ICON
   เพิ่มหมวดใหม่ที่ ACTIVITIES แล้วแถบนี้ตามเองทันที ไม่ต้องมาแก้สองที่ */
const LEGEND = [
  ...ACTIVITIES.map(a => ({ icon: a.icon, th: a.title, en: a.en, color: a.color })),
  { icon: 'mic', th: 'คาราโอเกะ', en: 'Karaoke', color: C.purple },
  { icon: 'game', th: 'เกมโซน', en: 'Game zone', color: '#ff5b7a' },
]
const BOARD_MS = 15000      // เปลี่ยนประกาศทุก 15 วินาที (ถ้ามีมากกว่าหนึ่งใบ)
/* พิมพ์ทีละตัวแบบจอคอนโซล — เร็ว (ทั้งใบจบใน ~2 วิ) เพราะนี่คือของประดับ
   คนที่เดินมาอ่านต้องได้ข้อความครบเกือบจะทันที ไม่ใช่นั่งรอเครื่องพิมพ์ให้จบ
   ทีละ 2 ตัวอักษรต่อจังหวะ แทนที่จะลดหน่วงให้ต่ำกว่านี้ — ต่ำกว่า ~16ms
   เบราว์เซอร์ก็รวบจังหวะให้อยู่ดี แต่ยังเสีย re-render ฟรีทุกรอบ */
const TYPE_MS = 16
const TYPE_STEP = 2

/* ตัดข้อความเป็น "ตัวอักษรที่ตาเห็น" ไม่ใช่ทีละ code unit — สระบน/ล่างกับวรรณยุกต์ไทย
   นับเป็นอักขระแยกตัว ถ้าตัดดิบ ๆ จะมีจังหวะที่สระโผล่มาลอย ๆ ก่อนพยัญชนะของมัน
   Intl.Segmenter จัดกลุ่มให้ถูกอยู่แล้ว · เบราว์เซอร์เก่าที่ไม่มีค่อยถอยไปใช้ regex
   (พยัญชนะ + สระ/วรรณยุกต์ที่เกาะอยู่ข้างหลัง นับเป็นก้อนเดียว) */
const graphemesOf = (s) => {
  try { return Array.from(new Intl.Segmenter('th', { granularity: 'grapheme' }).segment(s), g => g.segment) }
  catch { return s.match(/[\s\S][ัิ-ฺ็-๎]*/g) || [] }
}

function ArcadeBoard() {
  const t = useT()
  const [p, setP] = useState(0)
  useEffect(() => {
    if (NOTICES.length < 2) return
    const id = setInterval(() => setP(n => (n + 1) % NOTICES.length), BOARD_MS)
    return () => clearInterval(id)
  }, [])
  const notice = NOTICES[Math.min(p, NOTICES.length - 1)]

  /* เอฟเฟกต์พิมพ์: เก็บแค่ "พิมพ์ไปกี่ตัวแล้ว" แล้วตัดข้อความตามนั้นตอน render
     (เก็บเป็นสตริงที่พิมพ์ไปแล้วก็ได้ แต่จะสร้างสตริงใหม่ทุกจังหวะโดยไม่จำเป็น) */
  const chars = useMemo(() => graphemesOf(notice || ''), [notice])
  const [typed, setTyped] = useState(0)
  useEffect(() => {
    setTyped(0)
    if (!chars.length) return
    // เครื่องที่ตั้ง "ลดการเคลื่อนไหว" ไว้ = ขึ้นเต็มข้อความไปเลย ไม่ต้องพิมพ์ให้ดู
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setTyped(chars.length); return
    }
    const id = setInterval(() => setTyped(n => {
      const next = n + TYPE_STEP
      if (next >= chars.length) { clearInterval(id); return chars.length }
      return next
    }), TYPE_MS)
    return () => clearInterval(id)
  }, [chars])

  if (!notice) return null

  /* ทรงตู้เกมอาร์เคด — ตัวตู้ + ป้ายไฟหัวตู้ + จอ + แผงคอนโทรลมีจอยกับปุ่ม
     ทุกชิ้นเป็น div ธรรมดา ไม่ได้ใช้รูป ตู้จึงยืดตามความกว้างจอได้และไม่มีไฟล์ให้โหลดเพิ่ม

     ป้ายไฟหัวตู้จงใจไม่ใส่ตัวหนังสือ — เป็นชิ้นส่วนของตู้ ไม่ใช่ที่ประกาศข้อมูล
     แผงคอนโทรลเป็นของประดับล้วน กดไม่ได้ จึงไม่ใช่ <button> และตั้ง aria-hidden ไว้ */
  return (
    <div className="nb" style={{
      '--nb': C.pink, '--nb2': C.cyan, '--st': '6px', '--bw': '3px',
      '--nbfill': 'linear-gradient(180deg, #6a2fbe 0%, #4a1d9e 45%, #2a1060 100%)',
      padding: '9px 14px 11px', marginBottom: 18,
    }}>
      <div aria-hidden className="nb chip" style={{
        '--nb': C.cyan, '--nb2': C.pink, '--st': '3px',
        '--nbfill': `linear-gradient(90deg, ${C.cyan} 0%, ${C.purple} 50%, ${C.pink} 100%)`,
        display: 'block', height: 9, marginBottom: 8,
      }} />

      <div className="nb" style={{
        '--nb': C.cyan, '--nb2': C.purple, '--nbfill': '#02060a', '--st': '5px', '--bw': '4px',
        position: 'relative', padding: '12px 13px',
      }}>
        <div style={{ color: C.green, textShadow: `0 0 9px ${C.green}` }}>
          <div style={{ ...S.pix, fontSize: 8.5, lineHeight: 2, color: C.cyan, textShadow: `0 0 9px ${C.cyan}`, marginBottom: 4 }}>&gt; NOTICE</div>
          {/* ทุกใบซ้อนอยู่ในช่องกริดช่องเดียวกัน: ใบที่มองไม่เห็นเป็นคนกำหนดความสูงของจอ
              ส่วนใบที่เห็นคือข้อความที่พิมพ์ไปแล้ว จอจึงสูงเท่ากับ "ใบที่ยาวที่สุด" ตลอดเวลา
              — ไม่ยืดทีละบรรทัดตอนพิมพ์ และไม่หดตอนสลับไปใบที่สั้นกว่า
              ทั้งสองแบบดันทุกอย่างที่อยู่ใต้ตู้เลื่อนขึ้นลงทั้งหน้า ทั้งที่คนกำลังอ่านอย่างอื่นอยู่ */}
          <div style={{ display: 'grid', fontSize: 11.5, fontWeight: 600, lineHeight: 1.95, textAlign: 'left', whiteSpace: 'pre-line' }}>
            {NOTICES.map((n, i) => (
              <span key={i} aria-hidden style={{ gridArea: '1 / 1', visibility: 'hidden' }}>{n}</span>
            ))}
            <span style={{ gridArea: '1 / 1' }}>{chars.slice(0, typed).join('')}</span>
          </div>
          {/* เคอร์เซอร์กะพริบ — ตัวเดียวที่บอกว่าจอยังทำงานอยู่ ไม่ได้ค้าง */}
          <div style={{ ...S.pix, fontSize: 8.5, lineHeight: 1.9 }}>
            <span style={{ animation: 'eb8Blink 1s steps(1,end) infinite' }}>_</span>
          </div>
        </div>
        {/* เส้นสแกน + แสงสะท้อนมุมบนซ้าย + ขอบจอมืด วางทับด้วย absolute ไม่แตะตัวอักษร */}
        <span aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'repeating-linear-gradient(180deg, rgba(0,0,0,.30) 0 1px, rgba(0,0,0,0) 1px 3px),'
                    + 'radial-gradient(120% 90% at 22% 8%, rgba(255,255,255,.10), rgba(255,255,255,0) 45%),'
                    + 'radial-gradient(130% 110% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,2,6,.6) 100%)',
        }} />
      </div>

      {/* แผงคอนโทรล — จอยกับปุ่มเป็นของประดับ (aria-hidden) ส่วนตรงกลางเป็นของจริง:
          คำอธิบายว่าไอคอนในแถวชั้นแต่ละอันคืออะไร วิ่งวนแนวนอนไปเรื่อย ๆ
          แถวชั้นมีแต่ไอคอนไม่มีคำกำกับ (ไม่งั้นแถวยาวเกิน) ที่นี่จึงเป็นที่เฉลย */}
      <div className="nb" style={{
        '--nb': C.purple, '--nb2': C.pink, '--nbfill': '#3a1580', '--st': '3px',
        marginTop: 9, padding: '7px 10px', display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span aria-hidden style={{ display: 'flex', gap: 9, flexShrink: 0 }}>
          {[0, 1].map(n => (
            <span key={n} style={{ display: 'grid', justifyItems: 'center', gap: 2 }}>
              <span style={{ width: 11, height: 11, background: '#ff5b7a', boxShadow: '0 0 8px #ff5b7a' }} />
              <span style={{ width: 4, height: 7, background: '#1b0940' }} />
            </span>
          ))}
        </span>

        {/* วิ่งด้วย CSS animation ล้วน — เลื่อนไป 50% แล้ววนกลับ โดยวางรายการซ้ำสองชุด
            รอยต่อจึงต่อกันพอดีจนดูเหมือนวิ่งไม่รู้จบ ไม่มีจังหวะกระตุกตอนวนรอบใหม่ */}
        <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, #000 12px, #000 calc(100% - 12px), transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12px, #000 calc(100% - 12px), transparent)' }}>
          <span className="eb8-mq" style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
            {[0, 1].map(dup => (
              <span key={dup} aria-hidden={dup === 1} style={{ display: 'inline-flex' }}>
                {LEGEND.map(l => (
                  <span key={l.icon} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, paddingRight: 18 }}>
                    <Icon name={l.icon} color={l.color} size={15} />
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: '#e2d6ff' }}>{t.i ? l.en : l.th}</span>
                  </span>
                ))}
              </span>
            ))}
          </span>
        </span>

        <span aria-hidden style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {[C.yellow, C.green, C.cyan, C.pink].map(c => (
            <span key={c} style={{ width: 10, height: 10, background: c, boxShadow: `0 0 8px ${c}` }} />
          ))}
        </span>
      </div>

      {/* จุดบอกว่ามีกี่หน้า อยู่หน้าไหน — จอเลื่อนเอง ไม่มีปุ่มให้กด */}
      {NOTICES.length > 1 && (
        <div aria-hidden style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 8 }}>
          {NOTICES.map((_, n) => (
            <span key={n} style={{ width: n === p ? 12 : 5, height: 5, background: n === p ? C.cyan : '#4a2390' }} />
          ))}
        </div>
      )}
    </div>
  )
}


/* ── หนังสือแนะนำ ────────────────────────────────────────────────────
   ยกมาจาก layer2 (LayerDP.jsx — "การเลือกหนังสือแยกตามหมวดหมู่") แล้วเปลี่ยนเป็น 8-bit
   ตัวเลขยังเป็นชุดเดียวกับต้นทาง ซึ่งที่นั่นติดป้ายไว้ว่าเป็นข้อมูลตัวอย่าง เพราะระบบ
   ยังไม่ได้ต่อกับฐานข้อมูลยืม-คืนหนังสือ — ป้ายนั้นจึงต้องติดมาด้วย ห้ามถอดออก
   จนกว่าจะมี API จริง ไม่งั้นคนอ่านจะเข้าใจว่าเป็นสถิติการยืมของจริง

   ต่อ API จริงเมื่อไหร่ ให้เปลี่ยนแค่ที่มาของ PICKS แล้วลบป้ายออก ที่เหลือใช้ได้เลย */
const PICKS = [
  { th: 'นิยาย วารสาร', en: 'Fiction & magazines', pct: 35, color: C.purple },
  { th: 'ภาษาไทย', en: 'Thai language', pct: 28, color: C.pink },
  { th: 'ภาษาต่างประเทศ', en: 'Foreign languages', pct: 21, color: C.cyan },
  { th: 'วิทยานิพนธ์ / รายงานการวิจัย', en: 'Theses & research', pct: 16, color: C.yellow },
]

function BookPicks() {
  const t = useT()
  return (
    <>
      <Sec tone={C.purple}><Icon name="book" color={C.purple} size={17} />{t('pickTitle')}</Sec>
      <div className="nb" style={{ ...S.card, '--nb': C.purple, '--nb2': C.pink, display: 'grid', gap: 11 }}>
        <span className="nb chip" style={{
          '--nb': C.yellow, '--nb2': C.orange, '--nbfill': '#3a2405', '--st': '2px',
          justifySelf: 'start', padding: '3px 8px', fontSize: 9.5, fontWeight: 800, color: C.yellow,
        }}>{t('sampleData')}</span>
        {PICKS.map(b => (
          <div key={b.th}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <span style={{ flex: 1, minWidth: 0, fontSize: 11.5, fontWeight: 700, color: '#e2d6ff' }}>{t.i ? b.en : b.th}</span>
              <span style={{ ...S.num, fontSize: 14, color: b.color, textShadow: `0 0 9px ${b.color}` }}>{b.pct}%</span>
            </div>
            <PixelBar pct={b.pct} color={b.color} cells={14} h={8} />
          </div>
        ))}
      </div>
    </>
  )
}

// ── 1) หน้าแรก ────────────────────────────────────────────────────────
function Home({ zones, parking, bl, bk, go }) {
  const t = useT()
  const live = zones.filter(z => z.hasLive)
  const total = live.reduce((s, z) => s + z.count, 0)
  const nowSlot = slotOf(new Date())

  const bTypical = useMemo(() => {
    const w = zones.filter(z => z.typical)
    if (!w.length) return null
    return Array.from({ length: SLOTS }, (_, s) => {
      const v = w.map(z => z.typical[s]).filter(x => x != null)
      return v.length ? v.reduce((a, b) => a + b, 0) : null
    })
  }, [zones])
  // เส้น "วันนี้" รวมทั้งอาคาร — วาดทับแท่งค่าปกติ ให้เห็นทันทีว่าวันนี้ต่างจากปกติตรงไหน
  const bToday = useMemo(() => {
    const w = zones.filter(z => z.todayLine)
    if (!w.length) return null
    return Array.from({ length: SLOTS }, (_, s) => {
      const v = w.map(z => z.todayLine[s]).filter(x => x != null)
      return v.length ? v.reduce((a, b) => a + b, 0) : null
    })
  }, [zones])
  const peak = windowOf(bTypical, { mode: 'max' })
  const typNow = bTypical?.[nowSlot] ?? null
  const vs = typNow ? Math.round(((total - typNow) / typNow) * 100) : null
  /* ที่จอดรถ: ใส่ตัวเลขไว้ตั้งแต่แถวบนหน้าแรกเลย ไม่ต้องกดเข้าไปก่อนถึงจะรู้ว่าเต็มไหม
     — คนขับรถมาถึงหน้าอาคารแล้วต้องตัดสินใจทันทีว่าจะเลี้ยวเข้าลานหรือไปหาที่อื่น
     รวมทุกลานเป็นตัวเลขเดียว (รายลานอยู่ในหน้าที่จอดรถ) นับเฉพาะลานที่กล้องยังส่งค่าอยู่ */
  const pk = useMemo(() => {
    if (!parking.length) return null
    // ความจุมาจากที่ตั้งไว้ในทะเบียนกล้อง รู้ได้แม้กล้องยังไม่ส่งค่าเข้ามา
    // — แถวชั้นข้างบนก็โชว์จำนวนที่นั่งแบบนี้ ทั้งที่ยังไม่รู้ว่าตอนนี้มีคนกี่คน
    const cap = parking.reduce((s, p) => s + (p.capacityVeh || 0), 0)
    const live = parking.filter(p => p.hasLive)
    const cars = live.length ? live.reduce((s, p) => s + p.vcount, 0) : null
    // ไม่ได้กรอกความจุไว้ = บอกได้แค่ว่าตอนนี้จอดอยู่กี่คัน บอก "ว่างกี่ช่อง" ไม่ได้
    return { cap, cars, free: cars != null && cap > 0 ? Math.max(0, cap - cars) : null }
  }, [parking])

  return (
    <>
      {/* ไม่มีคำทักทายแล้ว — ตู้อาร์เคดขึ้นเป็นชิ้นแรกของหน้าเลย
          (ข้อความ hello/helloSub ยังอยู่ใน TXT เผื่อเอากลับมา) */}
      <ArcadeBoard />

      {/* หน้าแรกเป็น "ชั้น" เพราะคนที่มาถึงอาคารแล้วคิดเป็นชั้นก่อน ไม่ได้คิดเป็นประเภทพื้นที่
          เลือกจากสิ่งที่อยากทำย้ายไปอยู่แท็บ "พื้นที่" (ZonesView)
          ที่จอดรถไม่ได้อยู่ในชั้นไหน จึงเป็นแถวของตัวเองข้างล่าง */}
      {/* ปุ่มแชร์อยู่สุดขวาของแถวหัวข้อ — ระดับเดียวกับหัวข้อแรกของเนื้อหา ไม่ใช่ของประดับบนตู้
          Sec เป็น inline-flex อยู่แล้ว จึงห่อด้วยแถว flex แล้วดันปุ่มไปชิดขวาได้เลย
          alignItems: center ให้ปุ่มอยู่กึ่งกลางความสูงของป้ายหัวข้อ ไม่ลอยขึ้นหรือจมลง */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '18px 0 9px' }}>
        <Sec flush><Icon name="book" color={C.purple} size={17} />{t('floorPick')}</Sec>
        <span style={{ marginLeft: 'auto', flexShrink: 0 }}><ShareButton /></span>
      </div>
      <FloorAccordion zones={zones} bk={bk} go={go} />

      <button data-track="open-parking" onClick={() => go({ v: 'park' })} className="nb" style={{ ...S.card, width: '100%', textAlign: 'left', marginTop: 10, display: 'flex', alignItems: 'center', gap: 10, padding: '11px 12px', cursor: 'pointer', '--nb': C.cyan, '--nb2': C.blue }}>
        {/* ไอคอนอยู่ในกรอบเหมือนชิปเลขชั้น — แถวที่จอดรถจะได้ดูเป็นแถวเดียวกับชั้นข้างบน */}
        <span className="nb chip" style={{ '--nb': C.cyan, '--nb2': C.blue, '--nbfill': '#0e2f57', display: 'grid', placeItems: 'center', padding: '7px 9px', flexShrink: 0 }}>
          <Icon name="car" color={C.cyan} size={20} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 800, color: '#fff' }}>{t('parkTitle')}</div>
          <div style={{ fontSize: 10.5, color: '#c9b8ff', marginTop: 2 }}>
            {!pk ? t('notSet')
              : pk.cars != null ? `${t('parked')} ${pk.cars}${pk.cap > 0 ? `/${pk.cap}` : ''} ${t('cars')}`
              : t('parkSub')}
          </div>
        </div>
        {/* คอลัมน์ตัวเลขเดียวกับแถวชั้นข้างบน — คำอธิบายอยู่บน ตัวเลขอยู่ล่าง
            ที่จอดรถบอกเป็น "ว่างกี่ช่อง" ไม่ใช่ "ใช้ไปกี่ช่อง" เพราะคนขับรถวนหาที่จอด
            ถามคำถามเดียวคือยังเหลือที่ไหม (คำว่า "ว่าง" ติดกับตัวเลขบรรทัดเดียว) */}
        {pk && (pk.free != null || pk.cap > 0) && (
          /* มีกล้องส่งค่า → ตอบ "ว่างกี่ช่อง" · ไม่มี → ตอบได้แค่ "ลานนี้มีกี่ช่อง"
             คำกำกับต้องต่างกัน ไม่งั้นเลขความจุจะถูกอ่านเป็นจำนวนช่องว่าง */
          <StatBox cap={pk.free != null ? t('free') : t('seatsOf')} val={pk.free ?? pk.cap} unit={t('slots')}
            color={pk.free == null ? '#fff' : pk.free ? C.green : '#ff5b7a'} tone={C.cyan} />
        )}
        <Icon name="right" color="#a77ce0" size={15} />
      </button>

      {SHOW_PLAN && <button data-track="open-recommend" onClick={() => go({ v: 'rec' })} className="nb" style={{ ...S.card, width: '100%', textAlign: 'left', marginTop: 9, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', border: `2px solid ${C.purple}30` }}>
        <Icon name="cal" color={C.purple} size={21} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 800, color: '#fff' }}>{t('planTitle')}</div>
          <div style={{ ...S.dim, fontSize: 10.5 }}>{t('planSub')}</div>
        </div>
        <Icon name="right" color="#8b6fd0" size={15} />
      </button>}

      <BookPicks />

      <Sec tone={C.cyan}><Icon name="trend" color={C.cyan} size={17} />{t('overview')}</Sec>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div className="nb" style={{ ...S.card, '--nb': C.purple, '--nb2': C.pink }}>
          <Icon name="users" color={C.purple} size={19} />
          <div style={{ ...S.num, fontSize: 27, fontWeight: 900, color: '#fff', marginTop: 9, lineHeight: 1.1, textShadow: '0 0 12px rgba(176,108,255,.9)' }}>
            {live.length ? total.toLocaleString() : '—'}
            {/* หน่วยบางกว่าตัวเลขหนึ่งระดับ — ตัวเลขคือคำตอบ คำว่า "คน" แค่บอกว่าคำตอบเป็นหน่วยอะไร */}
            <span style={{ fontSize: 11.5, fontWeight: 400, color: C.dim, textShadow: 'none' }}> {t('people')}</span>
          </div>
          <div style={{ ...S.dim, marginTop: 1 }}>{t('inBuilding')}</div>
          {vs != null && <div style={{ fontSize: 10.5, marginTop: 4, color: vs > 0 ? C.orange : C.green }}>
            {vs > 0 ? `▲ ${t.i ? `${vs}% ${t('aboveNormal')}` : `${t('aboveNormal')} ${vs}%`}` : vs < 0 ? `▼ ${t.i ? `${-vs}% ${t('belowNormal')}` : `${t('belowNormal')} ${-vs}%`}` : t('sameNormal')}
          </div>}
        </div>
        <div className="nb" style={{ ...S.card, '--nb': C.orange, '--nb2': C.yellow }}>
          <Icon name="trend" color={C.orange} size={19} />
          {/* "17:30 - 19:00" = 13 ตัวอักษรบนการ์ดที่กว้างครึ่งจอ (~138px ที่จอ 390)
              ยังต้องคุมขนาดเองไม่ให้ตกบรรทัด แม้ฟอนต์ปกติจะแคบกว่าพิกเซลมากแล้วก็ตาม */}
          <div style={{ ...S.num, fontSize: 13.5, whiteSpace: 'nowrap', color: '#fff', marginTop: 9, lineHeight: 1.4, textShadow: '0 0 12px rgba(255,138,61,.9)' }}>{peak ? peak.text : '—'}</div>
          <div style={{ ...S.dim, marginTop: 1 }}>{t('peakHours')}</div>
          <div style={{ marginTop: 6 }}><BarChart data={bTypical} color={C.orange} h={26} line={bToday} lineColor="#fff" /></div>
          {bToday && <div style={{ ...S.dim, fontSize: 9.5, marginTop: 3, display: 'flex', gap: 9 }}>
            <span><span style={{ color: C.orange }}>▮</span> {t(bl.basis === 'sameDow' ? 'normalDay' : 'normalYest')}</span>
            <span><span style={{ color: '#fff' }}>—</span> {t('todayLine')}</span>
          </div>}
        </div>
      </div>

      {!bl.series && <div style={{ ...S.dim, marginTop: 12, fontSize: 10.5 }}>{t('loadingHist')}</div>}
    </>
  )
}

/* ── แท็บ "พื้นที่": เลือกจากสิ่งที่อยากทำ ───────────────────────────────────
   ไล่ตาม ACTIVITIES ตัวเดียว เพิ่ม/ลดกลุ่มพื้นที่แล้วหน้านี้ตามเองทันที */
function ZonesView({ zones, go }) {
  const t = useT()
  const ui = useUI()
  return (
    <>
      <div style={{ marginBottom: 13 }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>{t('momayFinds')}</div>
        <div style={{ ...S.dim, fontSize: 12, marginTop: 2 }}>{t('actSub')}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${ui.cols}, minmax(0, 1fr))`, gap: 9 }}>
        {ACTIVITIES.map(a => {
          const n = zones.filter(z => inAct(a, z)).length
          return (
            <button key={a.key} data-track={`activity-${a.key}`} onClick={() => n && go({ v: 'act', a: a.key })} disabled={!n}
              className="nb" style={{ ...S.card, textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12, cursor: n ? 'pointer' : 'not-allowed', opacity: n ? 1 : 0.42, border: `2px solid ${n ? a.color + '3d' : '#4a2390'}` }}>
              <Icon name={a.icon} color={a.color} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{actT(a, t.i).title}</div>
                {/* บรรทัดล่างคือชื่อโซนจริงที่ติดอยู่ในอาคาร — คนที่รู้ชื่อโซนอยู่แล้วจะได้เห็นว่าตรงกัน */}
                <div style={{ ...S.dim, fontSize: 10.5, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{actT(a, t.i).sub}</div>
              </div>
              <span style={{ ...S.dim, fontSize: 10.5, flexShrink: 0 }}>{n ? `${n} ${t('zonesUnit')}` : t('notSet')}</span>
              <Icon name="right" color="#8b6fd0" size={15} />
            </button>
          )
        })}
      </div>
    </>
  )
}

/* ── 2) เลือกหมวดแล้ว → พื้นที่จริงที่เหมาะ ─────────────────────────────────
   ลำดับของหน้านี้: หมวดเป็นประตู → ข้อมูลจริงเป็นคำตอบ → คำแนะนำเป็นตัวช่วยตัดสินใจ
   จึงเรียงตามชั้นให้เห็นทั้งอาคารก่อน แล้วค่อยชี้ว่าตอนนี้ควรไปใบไหน */

function IntentView({ activity, zones, rt, bk, back, go }) {
  const t = useT()
  const a = ACT[activity]
  const A = actT(a, t.i)
  const list = useMemo(() => zones.filter(z => inAct(a, z)), [zones, a])
  const floors = useMemo(() => byFloor(list), [list])
  const stOf = z => (z.bookable ? bk?.stateOf(z.roomId) : null)

  /* ตัวที่แนะนำ = ของที่ "ไปได้จริงตอนนี้" จึงต้องเปิดอยู่และมีอะไรให้ตัดสินใจได้จริง
     หมวดที่วัดด้วยความเงียบดูคะแนนก่อน ที่เหลือดูที่ว่างก่อน แล้วค่อยดูความหนาแน่น */
  const quietMode = a.metric === 'quiet'
  const score = z => {
    const free = freeOf(z)
    if (free != null) return 1000 + free                                   // รู้จำนวนที่ว่างจริง
    const st = stOf(z)
    if (st && !st.loading && !st.current) return 500                       // ห้องจองได้ ตอนนี้ยังไม่มีคิว
    if (z.hasLive) return 100 - (z.pct ?? 100)                             // เหลือแค่ความหนาแน่น
    return -1
  }
  const pick = useMemo(() => {
    const cand = list.filter(z => z.openNow && score(z) >= 0)
    return [...cand].sort((x, y) => {
      if (quietMode) {
        const q = (rt?.ratings?.[y.roomId]?.avg ?? y.quietRating ?? -1) - (rt?.ratings?.[x.roomId]?.avg ?? x.quietRating ?? -1)
        if (q) return q
      }
      return score(y) - score(x)
    })[0] || null
  }, [list, quietMode, rt, bk?.list])   // eslint-disable-line react-hooks/exhaustive-deps

  if (!list.length) return (
    <>
      <Head icon={a.icon} color={a.color} title={A.title} sub={A.sub} back={back} />
      <div className="nb" style={{ ...S.card, color: C.dim, fontSize: 12.5, lineHeight: 1.8 }}>
        {t('noZoneOfType')} <b style={{ color: a.color }}>{A.title}</b>
      </div>
    </>
  )

  const why = pick && (freeOf(pick) ? 'nudgeFree'
    : pick.bookable && !stOf(pick)?.current ? 'nudgeRoomFree'
    : quietMode ? 'nudgeQuiet' : 'nudgeOpen')

  return (
    <>
      <Head icon={a.icon} color={a.color} title={A.title} sub={A.sub} back={back} />

      {pick && (
        <button data-track="nudge" onClick={() => go({ v: 'zone', a: activity, room: pick.roomId })} className="nb" style={{
          ...S.card, width: '100%', textAlign: 'left', cursor: 'pointer',
          border: `2px solid ${C.green}55`, background: `linear-gradient(160deg, ${C.green}1a, #12062c 60%)`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.green, boxShadow: `0 0 8px ${C.green}` }} />
            <span style={{ fontSize: 12, fontWeight: 800, color: C.green }}>
              {t('nudge')}: {t('floorWord')} {pick.floor}
            </span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginTop: 6, lineHeight: 1.5 }}>
            {zLabel(pick, t.i) || pick.label}
            <span style={{ color: '#d3c4ff', fontWeight: 400 }}> {t(why)}</span>
          </div>
        </button>
      )}

      {floors.map(([f, zs]) => (
        <div key={f} data-track-scope={`floor${f}`}>
          <Sec>{t('floorWord')} {f}</Sec>
          <div style={{ display: 'grid', gap: 7 }}>
            {zs.map(z => (
              <IntentRow key={z.roomId} z={z} a={a} st={stOf(z)}
                onClick={() => go({ v: 'zone', a: activity, room: z.roomId })} />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

// ── 3) รายละเอียดพื้นที่ทีละใบ ──────────────────
function ActivityView({ activity, room, zones, bl, rt, bk, back, go }) {
  const t = useT(); const a = ACT[activity]; const A = actT(a, t.i)
  const ui = useUI()
  // ลำดับการแสดง = ตามที่ผู้ดูแลจัดไว้ที่ /settings (field order) ไม่ใช่เรียงตามตัวเลขสด
  // เพราะถ้าเรียงตามความหนาแน่น การ์ดจะสลับตำแหน่งเองระหว่างที่ผู้ใช้กำลังดูอยู่
  const inMode = zones.filter(z => inAct(a, z))
  const list = [...inMode].sort((x, y) => (x.order ?? 0) - (y.order ?? 0) || x.label.localeCompare(y.label))
  // ส่วน "ตัวที่แนะนำ" ยังคิดจากสถานะจริงตอนนี้ — ติดป้ายที่ใบไหนก็ได้ ไม่ต้องเป็นใบแรก
  // พื้นที่ของโหมดอื่น — เอามารวมในลิสต์เดียวกัน ไม่แยกหัวข้อ (เคยแยกแล้วซ้ำซ้อน)
  const otherModes = zones.filter(z => actOf(z) && !inAct(a, z))
  const bestId = [...inMode].sort((x, y) =>
    a.metric === 'quiet'
      ? (y.quietRating ?? -1) - (x.quietRating ?? -1) || (x.pct ?? 999) - (y.pct ?? 999)
      : (x.pct ?? 999) - (y.pct ?? 999))[0]?.roomId
  // เลื่อนดูพื้นที่อื่นในโหมดเดียวกัน — เดิมโชว์แค่ตัวแรก ตัวที่เหลือมุดอยู่ในลิสต์ข้างล่าง
  // จนดูเหมือนโหมดนี้มีพื้นที่เดียว
  const pg = usePager(list.length)
  const [rateOpen, setRateOpen] = useState(false)
  const [bookZone, setBookZone] = useState(null)
  const bookRef = useRef(null)
  useEffect(() => { setRateOpen(false) }, [activity, pg.i])   // eslint-disable-line react-hooks/exhaustive-deps
  // มาจากหน้าแรกจะระบุห้องมาด้วย — เปิดที่ใบนั้นเลย ไม่ใช่ใบแรกของโหมดแล้วให้ไล่กดหา
  useEffect(() => {
    const k = room ? list.findIndex(z => z.roomId === room) : -1
    pg.setI(k > 0 ? k : 0)
  }, [activity, room])   // eslint-disable-line react-hooks/exhaustive-deps
  const cur = pg.i
  const top = list[cur]
  const nowSlot = slotOf(new Date())
  /* ทางเลือกอื่น = พื้นที่อื่นในโหมดนี้ + พื้นที่ของโหมดอื่น รวมเป็นลิสต์เดียว
     เพราะผู้ใช้ถามคำถามเดียวคือ "ไปที่อื่นได้ที่ไหนบ้าง" — โชว์ทีละ 3 ใบแล้ววนสลับ
     (ACT[...] || a = กันไว้เผื่อเจอประเภทพื้นที่ที่บิลด์นี้ยังไม่รู้จัก ไม่ให้จอขาว) */
  const others = [
    ...list.map((z, k) => ({ z, a, onClick: () => pg.setI(k), k })).filter(o => o.k !== cur),
    ...otherModes.map(z => ({ z, a: actOf(z) || a, showMode: true, onClick: () => go({ v: 'zone', a: actOf(z).key, room: z.roomId }) })),
  ]
  const rot = useRotate(others.length, OTHER_SHOWN)

  if (!top) return (
    <>
      <Head icon={a.icon} color={a.color} title={A.title} sub={A.sub} back={back} />
      <div className="nb" style={{ ...S.card, color: C.dim, fontSize: 12.5, lineHeight: 1.8 }}>
        {t('noZoneOfType')} <b style={{ color: a.color }}>{A.title}</b>
      </div>
    </>
  )

  const win = windowOf(top.typical, { from: nowSlot, to: SLOTS - 1, mode: 'min' })
  // กราฟคาดการณ์วาดเฉพาะ "ที่เหลือของวัน" ส่วนแท่งความหนาแน่นด้านบนคือทั้ง 24 ชม.
  // ถ้าวาดช่วงเดียวกันทั้งคู่ ก็คือชุดข้อมูลเดียวกันสองรูปทรง ไม่ได้บอกอะไรเพิ่ม
  const restSeries = top.typical ? top.typical.slice(nowSlot) : null
  // ตัวเลขบนแกนตั้ง + เวลาบนแกนนอน — ไม่มีสองอย่างนี้ เส้นก็เป็นแค่เส้นหยึกหยัก
  // ที่บอกไม่ได้ว่ากี่คน ช่วงไหน
  const restMax = restSeries ? Math.round(Math.max(...restSeries.filter(x => x != null), 0)) : 0
  const midSlot = nowSlot + Math.floor((SLOTS - 1 - nowSlot) / 2)
  // คะแนนความเงียบ: ใช้ของผู้ใช้เมื่อมีคนให้ถึงเกณฑ์ ก่อนหน้านั้นใช้ของผู้ดูแล
  // เกณฑ์ 3 คน กันไม่ให้คนเดียวลากค่าเฉลี่ยไปไหนก็ได้ตั้งแต่โหวตแรก
  const topRating = rt?.ratings?.[top.roomId] || null
  const quietFromUsers = (topRating?.n ?? 0) >= 3
  const quietShown = quietFromUsers ? topRating.avg : top.quietRating
  // "จองได้ไหม" ดูจากธงของห้องเอง ไม่ได้ผูกกับประเภทพื้นที่ — ห้องประชุมที่อยู่ในโซน
  // พักผ่อนก็ต้องจองได้ ไม่ใช่ต้องย้ายห้องข้ามประเภทเพื่อจะเปิดให้จอง (ตั้งที่ /settings)
  const bookables = list.filter(z => z.bookable)
  const canBook = bookables.length > 0
  const trend = top.typicalNext != null && top.typicalNow != null
    ? (top.typicalNext < top.typicalNow * 0.9 ? t('fewer') : top.typicalNext > top.typicalNow * 1.1 ? t('more') : t('same')) : null
  const quietMode = a.metric === 'quiet'

  return (
    <>
      <Head icon={a.icon} color={a.color} title={A.title} sub={A.sub} back={back} />
      <div style={{ ...S.secTitle, justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>{A.head}<Icon name="info" color="#8b6fd0" size={13} /></span>
        {list.length > 1 && <span style={{ ...S.dim, fontSize: 10.5 }}>{cur + 1}/{list.length}</span>}
      </div>

      <div style={{ position: 'relative' }} {...pg.bind}>
      <PagerArrows i={cur} len={list.length} go={pg.go} hint={pg.hint} color={a.color} />
      {/* เว้นข้างให้พ้นช่องลูกศร (และเว้นเท่ากันทั้งสองข้างถึงจะดูอยู่กลางการ์ด)
          บนแท็บเล็ตการ์ดกว้างขึ้นมาก จึงเว้นมากกว่านี้ได้โดยเนื้อหายังไม่แคบ */}
      <div className="nb" style={{
        ...S.card, border: `2px solid ${a.color}55`, background: `linear-gradient(165deg,${a.color}18,#16062f 55%)`,
        /* เว้นช่องลูกศรไว้เท่ากันทุกใบ แม้หมวดนั้นจะมีพื้นที่เดียวจนไม่มีลูกศรให้กด —
           เดิมผูกกับจำนวนพื้นที่ในหมวด หมวดที่มีใบเดียวเลยได้ padding 14 แทน 44
           รูปกับข้อความกว้างขึ้นมา 60px เห็นชัดว่าไม่เท่าหมวดอื่นเวลากดสลับไปมา */
        padding: `16px ${ui.wide ? 64 : ARROW_LANE}px`,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* เรียงจากกว้างไปแคบ: ชื่อโซน -> คำอธิบายสั้น (แท็ก) -> ห้องจริงในระบบ
                ไล่ขนาดและน้ำหนักลงตามลำดับ อ่านเป็นย่อหน้าเดียวไม่ต้องกวาดตาไปมา */}
            <div style={{ fontSize: 17, fontWeight: 800, color: a.color }}>{zoneName(top, t.i)}</div>
            {!!zTags(top, t.i).length &&
              <div style={{ fontSize: 12.5, fontWeight: 800, color: a.color, opacity: 0.9, marginTop: 2 }}>{zTags(top, t.i).join(' · ')}</div>}
            {/* บอกหมวดที่เข้ามา ไม่ใช่ชื่อกลุ่มพื้นที่เดิม — หน้านี้จัดของด้วยหมวดแล้ว
                ชื่อกลุ่มพื้นที่ (Collaboration Room ฯลฯ) เป็นศัพท์หลังบ้าน คนอ่านไม่ได้ใช้ */}
            <div style={{ fontSize: 11.5, fontWeight: 700, color: '#e2d6ff', marginTop: 2 }}>{A.title}</div>
            {!!zNote(top, t.i) && <div style={{ ...S.dim, fontSize: 11, marginTop: 5, lineHeight: 1.5 }}>{zNote(top, t.i)}</div>}
            {/* ปิดอยู่ก็ต้องบอก ไม่งั้นคนเดินไปถึงแล้วเจอประตูล็อก */}
            {top.openFrom && top.openTo && (
              <div style={{ fontSize: 10.5, marginTop: 5, color: top.openNow ? C.dim : '#ff5b7a' }}>
                {top.openNow ? '' : `${t('closedNow')} · `}{t('openHours')} {top.openFrom} - {top.openTo}
              </div>
            )}
          </div>
          {top.roomId === bestId &&
            <span style={{ fontSize: 10, fontWeight: 700, color: a.color, background: `${a.color}22`, border: `2px solid ${a.color}55`, borderRadius: 20, padding: '2px 9px', flexShrink: 0 }}>{t('recommended')}</span>}
        </div>

        {/* รูปอยู่ใต้ชื่อ ไม่ใช่เหนือชื่อ — คนเปิดการ์ดมาเพื่อรู้ว่า "ที่นี่คือที่ไหน" ก่อน
            รูปเป็นตัวยืนยันว่าหน้าตาเป็นอย่างไร ไม่ใช่ตัวบอกว่ากำลังดูอะไรอยู่ */}
        <ZoneSnap zone={top} height={ui.wide ? 190 : 132} />

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginTop: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={S.dim}>{quietMode ? t('quietScore') : t('density')}</div>
            {quietMode ? (
              <>
                {/* คนที่ไปนั่งจริงตอบได้ตรงกว่าใคร — พอมีคนให้คะแนนถึงเกณฑ์ก็ใช้ของผู้ใช้
                    ยังไม่ถึงเกณฑ์ค่อยใช้คะแนนที่ผู้ดูแลประเมินไว้
                    (ไม่เคยคำนวณจากจำนวนคน เพราะระบบไม่มีไมโครโฟน วัดเสียงจริงไม่ได้) */}
                {/* ดาวปัดเป็นจำนวนเต็ม 4.5 กับ 5 จึงวาดออกมาเหมือนกันเป๊ะ
                    เขียนตัวเลขจริงต่อท้ายไว้ด้วย จะได้เห็นว่าคะแนนขยับ */}
                <div style={{ marginTop: 3, fontSize: 22, display: 'flex', alignItems: 'center', gap: 7 }}>
                  <Stars n={stars(quietShown)} color={a.color} />
                  {quietShown != null && <span style={{ fontSize: 15, fontWeight: 800, color: a.color }}>{Number(quietShown).toFixed(1)}</span>}
                </div>
                <div style={{ ...S.dim, marginTop: 2, color: quietShown == null ? C.dim : a.color }}>
                  {quietWord(quietShown, t.i)}
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 1 }}>
                  <span style={{ ...S.num, fontSize: 27, fontWeight: 900, color: densColor(top.pct), lineHeight: 1 }}>{top.pct == null ? '--' : `${top.pct}%`}</span>
                </div>
                {/* หลอดพลังใต้ตัวเลข — เห็นความแน่นได้จากหางตาโดยไม่ต้องอ่านเลข */}
                <div style={{ marginTop: 6 }}><PixelBar pct={top.pct} color={densColor(top.pct)} /></div>
                <div style={{ ...S.dim, marginTop: 5, color: densColor(top.pct) }}>{densWord(top.pct, t.i)}</div>
              </>
            )}
          </div>
          {!quietMode && <div style={{ width: ui.wide ? 190 : 118 }}><BarChart data={top.typical} color={a.color} h={44} /></div>}
        </div>

        {/* แถวคาดการณ์ — ย้ายมาจากการ์ดแยกด้านล่าง เพราะเป็นข้อมูลของพื้นที่ใบนี้อยู่แล้ว
            เส้น = คนโดยปกติ ตั้งแต่ตอนนี้ถึงสิ้นวัน (แท่งด้านบนคือทั้ง 24 ชม.) */}
        {win && (
          <div style={{ marginTop: 12, paddingTop: 11, borderTop: '2px solid #2a1560' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, flexWrap: 'wrap' }}>
              <span style={S.dim}>{t(quietMode ? 'bestLeftQ' : 'bestLeftF')}</span>
              <b style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>{win.text}</b>
            </div>
            {/* ให้กราฟกินความกว้างทั้งการ์ด จะได้มีที่พอใส่ตัวเลขแกนตั้งและเวลาแกนนอน
                เดิมบีบอยู่ข้าง ๆ ข้อความกว้าง 118 ใส่อะไรไม่ได้เลยนอกจากเส้น
                แถบทึบบนกราฟ = ช่วงเวลาที่เขียนไว้บรรทัดบน ไม่ต้องมีคำอธิบายกำกับ */}
            <div style={{ display: 'flex', gap: 7, marginTop: 9 }}>
              <div style={{ width: 34, height: 46, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', flexShrink: 0 }}>
                <span style={{ ...S.dim, fontSize: 9, lineHeight: 1, whiteSpace: 'nowrap' }}>{restMax} {t('unitPpl')}</span>
                <span style={{ ...S.dim, fontSize: 9, lineHeight: 1 }}>0</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <AreaChart data={restSeries} color={a.color} h={46}
                  band={[win.from - nowSlot, win.to - nowSlot]}
                  labels={[t('nowLbl'), slotLabel(midSlot), slotLabel(SLOTS - 1)]} />
              </div>
            </div>
            <div style={{ ...S.dim, fontSize: 10, marginTop: 6 }}>
              {t(bl.basis === 'sameDow' ? 'basisSame' : bl.basis ? 'basisYest' : 'basisNone')}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, marginTop: 13, paddingTop: 11, borderTop: '2px solid #2a1560' }}>
          <div style={{ flex: 1 }}>
            <div style={S.dim}>{t('peopleNow')}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>
              {top.hasLive ? `${top.count} ${t('people')}` : '—'}
              {top.capacity > 0 && top.hasLive && <span style={{ ...S.dim, fontWeight: 400 }}> / {top.capacity}</span>}
            </div>
          </div>
          {/* สองช่องกว้างเท่ากัน ช่องขวาจะได้เริ่มที่กึ่งกลางการ์ดพอดี — เดิม 1 : 1.3
              ทำให้เริ่มที่ 43% ไม่ตรงกับอะไรเลยสักอย่างในการ์ด */}
          <div style={{ flex: 1 }}>
            <div style={S.dim}>{t('nextHour')}</div>
            {/* เอากราฟทั้งวันออก — ป้ายบอก "อีก 1 ชม." แต่กราฟแสดง 24 ชม. อ่านแล้วเข้าใจผิด
                และย่อเหลือสูง 26px ก็ดูอะไรไม่ออกอยู่ดี · กราฟเต็ม ๆ อยู่ในหน้าดูช่วงเวลาคนน้อยแล้ว */}
            <div style={{ fontSize: 15, fontWeight: 800, color: trend ? a.color : '#5f2fae' }}>{trend || t('noStats')}</div>
          </div>
        </div>

        <RateButton color={a.color} r={topRating} mine={rt?.mine?.[top.roomId] || 0}
          onClick={() => setRateOpen(true)} />

        {/* โหมดที่จองห้องได้ ปุ่มหลักคือ "ดูห้องว่าง" (สิ่งที่คนกดต่อจริง ๆ)
            โหมดอื่นไม่มีห้องให้จอง ปุ่มหลักจึงเป็นนำทางไปพื้นที่เหมือนเดิม */}
        {canBook && (
          <button data-track="scroll-to-book" onClick={() => bookRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            style={{ width: '100%', marginTop: 13, background: `${a.color}22`, border: `1.5px solid ${a.color}`, borderRadius: 11, color: a.color, padding: '11px', fontWeight: 800, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            {t('bookSee')} <Icon name="right" color={a.color} size={14} />
          </button>
        )}
        <button data-track="open-map-of-zone" onClick={() => go({ v: 'map', room: top.roomId })}
          className={canBook ? undefined : 'nb'}
          style={canBook
            ? { width: '100%', marginTop: 8, background: 'none', border: 'none', color: '#c9b8ff', padding: '4px', fontWeight: 700, fontSize: 11.5, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }
            : { width: '100%', marginTop: 13, '--nb': a.color, '--nb2': C.purple, '--nbfill': '#1b0940', color: a.color, padding: '10px', fontWeight: 800, fontSize: 12.5, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          {t('goZone')} <Icon name="right" color={canBook ? '#c9b8ff' : a.color} size={canBook ? 12 : 14} />
        </button>
      </div>
      </div>

      {SHOW_OTHERS && others.length > 0 && <>
        <Sec>{t('otherOptions')}</Sec>
        <div style={{
          display: 'grid', gridTemplateColumns: `repeat(${ui.cols}, minmax(0, 1fr))`, gap: 8,
          opacity: rot.dim ? 0 : 1, transition: `opacity ${rot.fade}ms ease`,
        }}>
          {others.slice(rot.from, rot.to).map(o => (
            <ZoneRow key={o.z.roomId} z={o.z} a={o.a} showMode={o.showMode} onClick={o.onClick} />
          ))}
        </div>
        {/* จุดบอกว่ายังมีชุดอื่นวนอยู่ ไม่งั้นการ์ดที่เปลี่ยนเองดูเหมือนหน้าเว็บกระตุก */}
        {rot.pages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 10 }}>
            {Array.from({ length: rot.pages }, (_, i) => (
              <span key={i} style={{
                width: i === rot.page ? 13 : 5, height: 5, borderRadius: 3,
                background: i === rot.page ? a.color : '#8b6fd0',
                transition: 'width .3s ease, background .3s ease',
              }} />
            ))}
          </div>
        )}
      </>}

      {/* จองห้อง — ใช้ collection bookings ตัวเดียวกับที่ autoControl เฝ้าอยู่
          จองจากหน้านี้แล้วไฟ/แอร์เปิดให้จริงเมื่อถึงเวลา ไม่ใช่ตารางจองแยกใบ */}
      {canBook && <>
        <div ref={bookRef} style={S.secTitle}>{t('bookTitle')}</div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${ui.cols}, minmax(0, 1fr))`, gap: 8 }}>
          {bookables.map(z => (
            <BookRow key={z.roomId} zone={z} color={a.color}
              st={bk?.stateOf(z.roomId) || { loading: true }} onBook={setBookZone} />
          ))}
        </div>
      </>}

      {rateOpen && (
        <RateModal zone={top} color={a.color} r={topRating} mine={rt?.mine?.[top.roomId] || 0}
          onVote={rt?.vote} busy={rt?.busy === top.roomId} failed={rt?.err === top.roomId}
          onClose={() => setRateOpen(false)} />
      )}
      {bookZone && (
        <BookModal zone={bookZone} color={a.color} st={bk?.stateOf(bookZone.roomId) || {}}
          onSubmit={bk?.create} busy={bk?.busy} onClose={() => setBookZone(null)} />
      )}
    </>
  )
}

// ── ที่จอดรถ (ของจริง — กล้อง carpark นับรถอยู่แล้ว) ──────────────────
function ParkingView({ parking, back }) {
  const t = useT()
  const ui = useUI()
  return (
    <>
      <Head icon="car" color={C.blue} title={t('parkTitle')} sub={t('parkSub')} back={back} />
      {!parking.length ? (
        <div className="nb" style={{ ...S.card, color: C.dim, fontSize: 12.5, lineHeight: 1.8 }}>
          {t('noParkCam')}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${ui.cols}, minmax(0, 1fr))`, gap: 9 }}>
          {parking.map(p => {
            const free = p.capacityVeh > 0 ? Math.max(0, p.capacityVeh - p.vcount) : null
            const pct = p.capacityVeh > 0 ? Math.min(100, Math.round((p.vcount / p.capacityVeh) * 100)) : null
            return (
              <div key={p.roomId} className="nb" style={S.card}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon name="car" color={C.blue} size={19} />
                  <div style={{ fontSize: 13.5, fontWeight: 800, color: '#fff', flex: 1 }}>{p.label}</div>
                  <span style={{ ...S.num, fontSize: 12.5, color: densColor(pct) }}>{pct == null ? '' : `${pct}%`}</span>
                </div>
                <div style={{ marginTop: 9 }}><PixelBar pct={pct} color={densColor(pct)} /></div>
                <div style={{ display: 'flex', gap: 14, marginTop: 10 }}>
                  {/* คู่กับความจุไปเลย จะได้รู้ทั้ง "จอดอยู่กี่คัน" และ "ลานนี้ใหญ่แค่ไหน" ในบรรทัดเดียว */}
                  <div><div style={S.dim}>{t('parked')}</div><div style={{ fontSize: 17, fontWeight: 900, color: '#fff' }}>
                    {!p.hasLive ? '—' : p.capacityVeh > 0 ? `${p.vcount}/${p.capacityVeh} ${t('cars')}` : `${p.vcount} ${t('cars')}`}
                  </div></div>
                  <div><div style={S.dim}>{t('free')}</div><div style={{ fontSize: 17, fontWeight: 900, color: free ? C.green : '#5f2fae' }}>{free == null ? t('unknown') : `${free} ${t('slots')}`}</div></div>
                </div>
                {!p.capacityVeh && <div style={{ ...S.dim, fontSize: 10, marginTop: 7 }}>{t('noCapacity')}</div>}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

// ── 4) คำแนะนำ ────────────────────────────────────────────────────────
function RecommendView({ zones, bl, rt, back }) {
  const t = useT()
  const ui = useUI()
  const nowSlot = slotOf(new Date())
  const basisKey = bl.basis === 'sameDow' ? 'basisSame' : bl.basis ? 'basisYest' : 'basisNone'

  // ตัวที่แนะนำ = ว่างที่สุดตอนนี้ (โหมดอ่านหนังสือดูคะแนนความเงียบก่อน)
  const cand = zones.filter(z => actOf(z) && z.hasLive)
  const best = [...cand].sort((x, y) => {
    const ax = actOf(x), ay = actOf(y)
    const qx = ax?.metric === 'quiet' ? (x.quietRating ?? -1) : -1
    const qy = ay?.metric === 'quiet' ? (y.quietRating ?? -1) : -1
    return (qy - qx) || (x.pct ?? 999) - (y.pct ?? 999)
  })[0]

  const all = [...zones].sort((x, y) => (x.order ?? 0) - (y.order ?? 0) || x.label.localeCompare(y.label))

  return (
    <>
      <Head icon="brain" color={C.purple} title={t('recTitle')} sub={t('recSub')} back={back} />

      {!best ? (
        <div className="nb" style={{ ...S.card, color: C.dim, fontSize: 12.5, lineHeight: 1.8 }}>{t('recNone')}</div>
      ) : (() => {
        const a = actOf(best)
        const quietMode = a.metric === 'quiet'
        // กติกาเดียวกับการ์ดหลัก — ครบ 3 คนเมื่อไหร่ใช้คะแนนของผู้ใช้แทนของผู้ดูแล
        const bq = rt?.ratings?.[best.roomId]
        const bestQuiet = (bq?.n ?? 0) >= 3 ? bq.avg : best.quietRating
        const diff = best.typicalNow != null ? Math.round(best.typicalNow - best.count) : null
        const vs = best.typicalNow ? Math.round(((best.typicalNow - best.count) / best.typicalNow) * 100) : null
        const win = windowOf(best.typical, { from: nowSlot, to: SLOTS - 1, mode: 'min' })
        // แสดงเฉพาะเหตุผลที่มีข้อมูลจริงรองรับ — ไม่เติมบรรทัดให้ครบสามอันด้วยการเดา
        const reasons = [
          vs != null && vs > 0 && { icon: 'pin', text: t('freerThan'), sub: t(basisKey), val: `${vs}%`, color: C.green },
          diff != null && diff > 0 && { icon: 'users', text: t('fewerThan'), sub: t('fewerSub'), val: `${diff} ${t('people')}`, color: C.purple },
          best.capacity > 0 && { icon: 'clock', text: t(best.unit === 'room' ? 'roomsFree' : 'seatsFree'), sub: `${t('seatsOf')} ${best.capacity}`, val: `${Math.max(0, best.capacity - best.count)}`, color: C.blue },
        ].filter(Boolean)

        return (
          <>
            <div className="nb" style={{ ...S.card, border: `2px solid ${a.color}44` }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>{t('bestForYou')}</div>
              <div style={{ ...S.dim, marginTop: 2 }}>{t('bestFor')} {actT(a, t.i).title}</div>
              <div style={{ fontSize: 21, fontWeight: 900, color: a.color, margin: '7px 0 5px' }}>{zoneName(best, t.i)}</div>
              {quietMode
                ? <><Stars n={stars(bestQuiet)} color={a.color} />
                    {bestQuiet != null && <b style={{ color: a.color, fontSize: 13, marginLeft: 5 }}>{Number(bestQuiet).toFixed(1)}</b>}
                    <span style={{ ...S.dim, marginLeft: 5 }}>{quietWord(bestQuiet, t.i)}</span></>
                : <span style={{ ...S.dim, color: densColor(best.pct) }}>■ {densWord(best.pct, t.i)}</span>}

              <div style={{ height: 1, background: '#2a1560', margin: '13px 0 11px' }} />
              <div style={{ ...S.dim, marginBottom: 8 }}>{t('why')}</div>
              <div style={{ display: 'grid', gap: 8 }}>
                {reasons.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, background: '#150733', borderRadius: 11, padding: '10px 12px' }}>
                    <Icon name={r.icon} color={r.color} size={17} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: '#ffffff', fontWeight: 600 }}>{r.text}</div>
                      <div style={{ ...S.dim, fontSize: 10 }}>{r.sub}</div>
                    </div>
                    <b style={{ color: r.color, fontSize: 13.5 }}>{r.val}</b>
                  </div>
                ))}
                {!reasons.length && <div style={S.dim}>{t('noReason')}</div>}
              </div>
            </div>

            {win && (
              <div className="nb" style={{ ...S.card, marginTop: 10 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: '#f0e8ff' }}>{t('bestTime')}</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: '#fff', margin: '5px 0 3px' }}>{win.text}</div>
                <div style={S.dim}>{t(quietMode ? 'bestTimeSubQ' : 'bestTimeSubF')}</div>
                <div style={{ marginTop: 10 }}>
                  <AreaChart data={best.typical} color={a.color} h={58} markIdx={nowSlot}
                    labels={['00', '06', '12', '18', '24']} />
                </div>
                <div style={{ ...S.dim, fontSize: 10, marginTop: 4 }}>{t(basisKey)}</div>
              </div>
            )}
          </>
        )
      })()}

      {/* สถิติรายพื้นที่ — เทียบกันเองได้ ไม่ต้องเชื่อตัวที่ระบบเลือกให้อย่างเดียว */}
      {all.length > 1 && <>
        <Sec>{t('allZoneStats')}</Sec>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${ui.cols}, minmax(0, 1fr))`, gap: 8 }}>
        {all.map(z => {
          const a = actOf(z) || ACTIVITIES[0]
          return (
            <div key={z.roomId} className="nb" style={{ ...S.card, border: `2px solid ${a.color}2e` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1, minWidth: 0, fontSize: 12.5, fontWeight: 800, color: a.color, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {zoneName(z, t.i)}
                </div>
                <div style={{ fontSize: 13, fontWeight: 900, color: '#fff' }}>
                  {z.hasLive ? `${z.count} ${t('people')}` : '—'}
                </div>
              </div>
              <div style={{ marginTop: 7 }}>
                <BarChart data={z.typical} color={a.color} h={34} line={z.todayLine} lineColor="#fff" />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  {['00', '06', '12', '18', '24'].map(h => <span key={h} style={{ ...S.dim, fontSize: 9 }}>{h}</span>)}
                </div>
              </div>
            </div>
          )
        })}
        </div>
      </>}

    </>
  )
}

// ── แผนที่ / ผังชั้น ───────────────────────────────────────────────────
/* ── ผังชั้นแบบกดได้ ────────────────────────────────────────────────────
   ไฟล์ผังวาดใน Figma แล้ว export SVG โดยตั้งชื่อเลเยอร์ห้องให้ตรงกับ roomId
   โหลดมาแปะแบบ inline (ไม่ใช่ <img>) เพราะต้องเข้าไปเปลี่ยนสีทีละห้องและรับคลิก

   Figma เขียน id ที่ไม่ใช่ ASCII เป็น entity ของ "ไบต์ UTF-8" ทีละไบต์
   เบราว์เซอร์จึงอ่าน id ภาษาไทยได้เป็นตัวเพี้ยน ต้องประกอบไบต์กลับก่อนจับคู่

   ตอนนี้ยังไม่มีไฟล์ผัง (ของเดิมถอดออกไปวาดใหม่) — แท็บแผนที่จึงขึ้นว่ายังไม่ได้ตั้งผัง
   วาดเสร็จแล้วเอาไฟล์ไปวางที่ frontend/public/Floorplan/ แล้วใส่ชั้น -> พาธ ตรงนี้ */
const PLANS = {}

const deFigmaId = s => {
  // ไบต์ UTF-8 ที่หลุดมาเป็นตัวอักษรเดี่ยว ๆ จะอยู่ช่วง 0x80-0xFF · ถ้าไม่มีเลยแปลว่า id ปกติ
  if (!s || ![...s].some(c => c.charCodeAt(0) > 127 && c.charCodeAt(0) < 256)) return s
  try {
    return new TextDecoder().decode(Uint8Array.from([...s], c => c.charCodeAt(0)))
  } catch { return s }
}

/* หมุดบอกจุดหมายบนผัง — วงกระเพื่อม + จุดทึบ
   ใช้ <animate> ของ SVG เอง ไม่ใช่ CSS keyframes เพราะ SVG ถูกแทรกเข้ามาทีหลัง
   สไตล์ของหน้าจึงเอื้อมไม่ถึง · วางหมุดไว้ใน parent เดียวกับห้องจะได้ใช้พิกัดชุดเดียวกัน */
const SVGNS = 'http://www.w3.org/2000/svg'
function mark(host, z) {
  host.querySelectorAll('.momay-mark').forEach(n => n.remove())
  if (!z) return
  const node = [...host.querySelectorAll('[data-room]')].find(n => n.dataset.room === z.roomId)
  if (!node) return
  let bb
  try { bb = node.getBBox() } catch { return }
  if (!bb.width || !bb.height) return
  const cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2
  // ผังทั้งใบกว้าง 3000+ หน่วยแต่ย่อลงเหลือ ~330px บนมือถือ ถ้าคิดขนาดหมุดจากขนาดห้อง
  // ห้องเล็กจะได้หมุดเล็กจนมองไม่เห็น จึงยึดขนาดจากความกว้างของผังเป็นพื้น
  const vb = host.querySelector('svg')?.viewBox?.baseVal
  const r = Math.max((vb?.width || 3000) / 70, Math.min(bb.width, bb.height) / 9)
  const g = document.createElementNS(SVGNS, 'g')
  g.setAttribute('class', 'momay-mark')
  g.style.pointerEvents = 'none'
  const ring = document.createElementNS(SVGNS, 'circle')
  ring.setAttribute('cx', cx); ring.setAttribute('cy', cy); ring.setAttribute('r', r)
  ring.setAttribute('fill', C.purple)
  for (const [name, values] of [['r', `${r};${r * 3.2}`], ['opacity', '0.5;0']]) {
    const an = document.createElementNS(SVGNS, 'animate')
    an.setAttribute('attributeName', name); an.setAttribute('values', values)
    an.setAttribute('dur', '1.9s'); an.setAttribute('repeatCount', 'indefinite')
    ring.appendChild(an)
  }
  const dot = document.createElementNS(SVGNS, 'circle')
  dot.setAttribute('cx', cx); dot.setAttribute('cy', cy); dot.setAttribute('r', r * 0.62)
  dot.setAttribute('fill', C.purple); dot.setAttribute('stroke', '#fff')
  dot.setAttribute('stroke-width', r * 0.28)
  g.append(ring, dot)

  node.parentNode.appendChild(g)
}

function FloorPlan({ floor, zones, sel, onPick }) {
  const t = useT()
  const box = useRef(null)
  const [svg, setSvg] = useState('')
  const [ready, setReady] = useState(0)
  const src = PLANS[floor]

  useEffect(() => {
    if (!src) return
    let alive = true
    fetch(src).then(r => (r.ok ? r.text() : '')).then(txt => { if (alive) setSvg(txt) }).catch(() => {})
    return () => { alive = false }
  }, [src])

  /* แปลงเป็น XML ไม่ใช่ HTML (ห้ามใช้ innerHTML)
     ตัวแปลง HTML แมปตัวอ้างอิงอักขระช่วง 0x80-0x9F ผ่านตาราง Windows-1252
     ไบต์ที่ Figma เขียนมาจึงเพี้ยน (&#137; กลายเป็น U+2030) แล้วประกอบชื่อไทยกลับไม่ได้ */
  useEffect(() => {
    const host = box.current
    if (!host || !svg) return
    const doc = new DOMParser().parseFromString(svg, 'image/svg+xml')
    if (doc.querySelector('parsererror')) return
    const el = document.importNode(doc.documentElement, true)
    el.removeAttribute('width'); el.removeAttribute('height')
    el.setAttribute('style', 'width:100%;height:auto;display:block')
    for (const node of el.querySelectorAll('[id]')) node.dataset.roomId = deFigmaId(node.getAttribute('id'))
    host.replaceChildren(el)
    setReady(r => r + 1)
  }, [svg])

  // ระบายสีตามข้อมูลสด — แยกจากรอบโหลด จะได้ไม่ต้องแปลงไฟล์ใหม่ทุกครั้งที่ตัวเลขเปลี่ยน
  useEffect(() => {
    const host = box.current
    if (!host) return
    for (const node of host.querySelectorAll('[data-room-id]')) {
      const z = zones.find(x => x.roomId === node.dataset.roomId)
      if (!z) continue
      node.dataset.room = z.roomId
      node.style.cursor = 'pointer'
      // ห้องที่ยังเป็นกลุ่มหลายชิ้น (ยังไม่ Flatten ใน Figma) ต้องระบายทุกชิ้นในกลุ่ม
      const shapes = node.tagName.toLowerCase() === 'g'
        ? node.querySelectorAll('rect, path, polygon, circle')
        : [node]
      const on = z.roomId === sel
      for (const sh of shapes) {
        sh.style.opacity = 1
        sh.style.transition = 'fill .25s ease'
        // มีกล้องรายงานคน = ระบายตามความหนาแน่น
        // ไม่มีกล้องแต่อยู่ในระบบ = แต้มสีจาง ๆ ให้รู้ว่ากดดูได้ ไม่ใช่ห้องเฉย ๆ บนผัง
        sh.style.fill = z.hasLive ? densColor(z.pct) : ''
        sh.style.filter = z.hasLive ? '' : 'saturate(1.15)'
        sh.style.stroke = on ? '#16062f' : z.hasLive ? '' : C.purple
        sh.style.strokeWidth = on ? 16 : z.hasLive ? '' : 6
        sh.style.strokeDasharray = on || z.hasLive ? '' : '26 18'
      }
    }
    mark(host, zones.find(x => x.roomId === sel))
  }, [ready, zones, sel, t.i])

  if (!src) return null
  return (
    <div
      ref={box}
      data-track="floorplan"
      onClick={e => {
        const hit = e.target.closest?.('[data-room]')
        if (hit) onPick(hit.dataset.room)
      }}
      style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', marginBottom: 10 }}
    />
  )
}

/* ── แท็บแผนที่: ผังเต็มจอแบบแอปแผนที่ ──────────────────────────────────
   ผังกินเต็มจอ ของอย่างอื่นลอยทับ: แถบชั้นด้านบน ปุ่มซูมด้านขวา แผงรายการด้านล่าง
   (ผังทั้งชั้นถ้าย่อใส่การ์ดจะเหลือ ~330px บนมือถือ ห้องเล็กอ่านชื่อไม่ออก)

   หัวใจของความลื่นอยู่ที่ "ไม่เก็บตำแหน่งใน state"
   ทุกครั้งที่นิ้วขยับแล้ว setState หน้าจะ re-render ผังทั้งใบ (SVG หลายร้อยชิ้น) ไม่ทัน 60fps
   จึงเก็บ {k,x,y} ไว้ใน ref แล้วเขียน transform ลง DOM ตรง ๆ

   ซูมยึดจุด: เข้าหาที่นิ้ว/เมาส์อยู่ ไม่ใช่กลางจอ
     x' = px - (px - x) * (k'/k)   โดย px วัดจากมุมซ้ายบนของเวที และ transform-origin ต้องเป็น 0 0
   ปล่อยนิ้วแล้วไถลต่อด้วยความเร็วสุดท้าย ขาดอันนี้การลากจะรู้สึกฝืด */
function PlanCanvas({ floor, zones, sel, onPick }) {
  const t = useT()
  const stage = useRef(null)
  const inner = useRef(null)
  const v = useRef({ k: 1, x: 0, y: 0 })
  const st = useRef({ pts: new Map(), dist: 0, moved: 0, vx: 0, vy: 0, last: 0, tap: 0, raf: 0, fitted: false })
  const [k, setK] = useState(1)          // ใช้โชว์ % อย่างเดียว ไม่ได้ใช้ขยับผัง
  const [tick, setTick] = useState(0)    // ผังโหลดเสร็จ/จอเปลี่ยนขนาด ไว้สั่งเลื่อนไปห้องที่เลือก

  /* ซูมต่ำสุด = ระดับที่ผังเต็มจอพอดี (cover) ไม่ปล่อยให้ย่อจนผังลอยเป็นแผ่นเล็ก ๆ
     ผังเป็นแนวนอน จอมือถือเป็นแนวตั้ง ถ้าให้พอดีความกว้างจะเหลือที่ว่างบน-ล่างเยอะมาก */
  const cover = useRef(1)
  const clamp = n => Math.min(Math.max(8, cover.current), Math.max(cover.current, n))
  const fit = () => {
    const s = stage.current, el = inner.current
    // ระหว่างที่ SVG ยังโหลดไม่เสร็จ กล่องสูงเกือบศูนย์ ถ้าคิด cover ตอนนั้นจะได้ค่ามหาศาล
    if (!s || !el || el.offsetHeight < 20) return
    const b = s.getBoundingClientRect()
    cover.current = Math.max(1, b.width / el.offsetWidth, b.height / el.offsetHeight)
    if (!st.current.fitted) { v.current.k = cover.current; st.current.fitted = true }
    v.current.k = Math.min(Math.max(v.current.k, cover.current), Math.max(8, cover.current))
    const w = el.offsetWidth * v.current.k, h = el.offsetHeight * v.current.k
    // ลากได้แต่ห้ามหลุดขอบ (ถ้าเล็กกว่าจอด้านไหนก็จัดกลางด้านนั้น)
    v.current.x = w <= b.width ? (b.width - w) / 2 : Math.min(0, Math.max(b.width - w, v.current.x))
    v.current.y = h <= b.height ? (b.height - h) / 2 : Math.min(0, Math.max(b.height - h, v.current.y))
  }
  const draw = anim => {
    const el = inner.current
    if (!el) return
    el.style.transition = anim ? 'transform .3s cubic-bezier(.2,.75,.3,1)' : 'none'
    el.style.transform = `translate3d(${v.current.x}px, ${v.current.y}px, 0) scale(${v.current.k})`
  }
  const zoomAt = (f, px, py, anim) => {
    const nk = clamp(v.current.k * f)
    const r = nk / v.current.k
    v.current.x = px - (px - v.current.x) * r
    v.current.y = py - (py - v.current.y) * r
    v.current.k = nk
    fit(); draw(anim); setK(nk)
  }
  const local = e => {
    const b = stage.current.getBoundingClientRect()
    return [e.clientX - b.left, e.clientY - b.top]
  }
  const mid = () => {
    const b = stage.current.getBoundingClientRect()
    return [b.width / 2, b.height / 2]
  }

  // ผังมาทีหลัง (fetch) และจอหมุนได้ — จัดให้พอดีทุกครั้งที่ขนาดเปลี่ยน
  useEffect(() => {
    const el = inner.current
    if (!el) return
    const ro = new ResizeObserver(() => { fit(); draw(false); setK(v.current.k); setTick(n => n + 1) })
    ro.observe(el)
    if (stage.current) ro.observe(stage.current)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = inner.current, svg = el?.querySelector('svg'), s = stage.current
    if (!el || !svg || !s || el.offsetHeight < 20) return
    const node = [...el.querySelectorAll('[data-room]')].find(n => n.dataset.room === sel)
    if (!node) return
    let bb
    try { bb = node.getBBox() } catch { return }
    // getBBox ให้พิกัดในหน่วยของ SVG ต้องคูณอัตราส่วนก่อนถึงจะเป็น px ของกล่อง
    const vb = svg.viewBox?.baseVal
    const ratio = vb?.width ? el.offsetWidth / vb.width : 1
    const b = s.getBoundingClientRect()
    v.current.x = b.width / 2 - (bb.x + bb.width / 2) * ratio * v.current.k
    v.current.y = b.height / 2 - (bb.y + bb.height / 2) * ratio * v.current.k
    fit(); draw(true)
  }, [sel, tick])   // eslint-disable-line react-hooks/exhaustive-deps

  const glide = () => {
    const s = st.current
    s.vx *= 0.94; s.vy *= 0.94
    v.current.x += s.vx; v.current.y += s.vy
    fit(); draw(false)
    s.raf = Math.abs(s.vx) + Math.abs(s.vy) > 0.15 ? requestAnimationFrame(glide) : 0
  }
  const down = e => {
    cancelAnimationFrame(st.current.raf); st.current.raf = 0
    const s = st.current
    s.pts.set(e.pointerId, { x: e.clientX, y: e.clientY })
    s.moved = 0; s.vx = 0; s.vy = 0; s.last = performance.now()
    if (s.pts.size === 2) {
      const [a, b] = [...s.pts.values()]
      s.dist = Math.hypot(a.x - b.x, a.y - b.y)
    }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const move = e => {
    const s = st.current
    const prev = s.pts.get(e.pointerId)
    if (!prev) return
    const dx = e.clientX - prev.x, dy = e.clientY - prev.y
    s.pts.set(e.pointerId, { x: e.clientX, y: e.clientY })
    s.moved += Math.abs(dx) + Math.abs(dy)
    if (s.pts.size === 1) {
      const now = performance.now(), dt = Math.max(8, now - s.last)
      s.vx = (dx / dt) * 16; s.vy = (dy / dt) * 16     // px ต่อเฟรม ไว้ใช้ตอนไถล
      s.last = now
      v.current.x += dx; v.current.y += dy
      fit(); draw(false)
    } else if (s.pts.size === 2) {
      const [a, b] = [...s.pts.values()]
      const d = Math.hypot(a.x - b.x, a.y - b.y)
      const box = stage.current.getBoundingClientRect()
      if (s.dist) zoomAt(d / s.dist, (a.x + b.x) / 2 - box.left, (a.y + b.y) / 2 - box.top, false)
      s.dist = d
    }
  }
  const up = e => {
    const s = st.current
    s.pts.delete(e.pointerId)
    if (s.pts.size < 2) s.dist = 0
    if (s.pts.size) return
    if (s.moved < 8) {
      const now = performance.now()
      if (now - s.tap < 300) { const [px, py] = local(e); zoomAt(v.current.k > 1.6 ? 1 / v.current.k : 2.4, px, py, true) }
      s.tap = now
    } else if (Math.abs(s.vx) + Math.abs(s.vy) > 0.6) {
      s.raf = requestAnimationFrame(glide)
    }
  }

  const rb = {
    width: 40, height: 40, borderRadius: 14, border: '2px solid #5f2fae',
    background: '#12062c', backdropFilter: 'none', color: '#fff',
    fontSize: 18, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
    display: 'grid', placeItems: 'center',
  }
  return (
    <div ref={stage}
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
      onWheel={e => { const [px, py] = local(e); zoomAt(e.deltaY < 0 ? 1.18 : 1 / 1.18, px, py, false) }}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', touchAction: 'none', background: '#16062f' }}>
      <div ref={inner} style={{ position: 'absolute', top: 0, left: 0, width: '100%', transformOrigin: '0 0', willChange: 'transform' }}>
        <FloorPlan floor={floor} zones={zones} sel={sel}
          onPick={id => { if (st.current.moved < 8) onPick(id) }} />
      </div>
      {/* ปุ่มลอยข้างขวา — ซูมด้วยนิ้วได้อยู่แล้ว อันนี้ไว้ให้คนใช้เมาส์หรือกดยาก */}
      <div style={{ position: 'absolute', right: 12, bottom: 156, display: 'grid', gap: 8, justifyItems: 'center' }}>
        <span style={{ fontSize: 10.5, fontWeight: 800, color: '#fff', background: '#12062c', borderRadius: 10, padding: '3px 8px' }}>
          {Math.round(k * 100)}%
        </span>
        <button data-track="zoom-in" onClick={() => zoomAt(1.5, ...mid(), true)} style={rb}>+</button>
        <button data-track="zoom-out" onClick={() => zoomAt(1 / 1.5, ...mid(), true)} style={rb}>−</button>
        <button data-track="zoom-reset" onClick={() => { v.current.k = cover.current; fit(); draw(true); setK(v.current.k) }}
          style={{ ...rb, fontSize: 11 }}>{t('fitScreen')}</button>
      </div>
    </div>
  )
}

// ── 5) แผนที่ ─────────────────────────────────────────────────────────
function MapView({ zones, roomId, back, go }) {
  const t = useT()
  const first = zones.find(x => x.roomId === roomId) || zones.find(x => PLANS[x.floor]) || zones[0]
  const [floor, setFloor] = useState(first?.floor ?? 1)
  const [sel, setSel] = useState(first?.roomId)
  const [open, setOpen] = useState(false)      // แผงล่างกางอยู่ไหม
  const floors = useMemo(() => [...new Set(zones.map(z => z.floor).filter(f => f != null))].sort((a, b) => a - b), [zones])
  const list = useMemo(() => zones.filter(z => z.floor === floor).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)), [zones, floor])
  const z = zones.find(x => x.roomId === sel)

  const pick = id => { setSel(id); setOpen(false) }
  const chip = on => ({
    flexShrink: 0, borderRadius: 20, padding: '7px 14px', fontSize: 12, fontWeight: 800, cursor: 'pointer',
    fontFamily: 'inherit', border: `2px solid ${on ? C.purple + '99' : '#5f2fae'}`,
    background: on ? '#4a1d8a' : '#12062c', backdropFilter: 'none',
    color: on ? '#fff' : '#e2d6ff',
  })
  const stat = zz => (zz.hasLive ? `${zz.count} ${t('people')}${zz.pct != null ? ` · ${zz.pct}%` : ''}`
    : zz.capacity > 0 ? `0/${zz.capacity} ${t(zz.unit === 'room' ? 'bookRooms' : 'bookSeats')}` : '—')

  return (
    <div data-track-scope="map" style={{
      position: 'fixed', left: 0, right: 0, top: 0,
      bottom: 'calc(62px + env(safe-area-inset-bottom, 0px))', zIndex: 20, background: '#16062f',
    }}>
      {PLANS[floor]
        ? <PlanCanvas floor={floor} zones={list} sel={sel} onPick={pick} />
        : <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', padding: 28, textAlign: 'center' }}>
            <div style={{ ...S.dim, fontSize: 12.5, lineHeight: 1.8 }}>{t('noPlan')}</div>
          </div>}

      {/* แผงล่าง — ปิดอยู่โชว์ห้องที่เลือก ลากขึ้น/แตะเพื่อดูรายการทั้งชั้น */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: '#0d0424', backdropFilter: 'none',
        borderTop: '2px solid #2a1560', borderRadius: '18px 18px 0 0',
        maxHeight: open ? '62%' : 'auto', display: 'flex', flexDirection: 'column',
        transition: 'max-height .28s ease',
      }}>
        {/* เลือกชั้นอยู่ในแผงล่าง ไม่ใช่แถบลอยข้างบน ผังจะได้เต็มจอจริง ๆ */}
        <div style={{ display: 'flex', gap: 7, overflowX: 'auto', padding: '10px 12px 0' }}>
          {floors.map(f => (
            <button key={f} data-track={`floor-${f}`} onClick={() => { setFloor(f); setSel(zones.find(x => x.floor === f)?.roomId) }}
              style={chip(f === floor)}>{t('floorWord')} {f}</button>
          ))}
        </div>
        <button data-track="sheet-toggle" onClick={() => setOpen(o => !o)} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: '9px 0 6px', display: 'grid', placeItems: 'center', gap: 6,
        }}>
          <span style={{ width: 44, height: 4, borderRadius: 3, background: '#7a52c8' }} />
          <span style={{ ...S.dim, fontSize: 10.5 }}>{t(open ? 'sheetClose' : 'sheetOpen')}</span>
        </button>

        {!open && z && (
          <button data-track="open-zone" onClick={() => go({ v: 'zone', a: actOf(z)?.key, room: z.roomId })}
            style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: '2px 16px 16px', display: 'flex', alignItems: 'center', gap: 11 }}>
            <Icon name={iconOf(z)} color={actOf(z)?.color || C.dim} size={19} />
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 13.5, fontWeight: 800, color: '#fff' }}>{zoneName(z, t.i)}</span>
              <span style={{ ...S.dim, display: 'block', fontSize: 11, marginTop: 2 }}>{stat(z)}</span>
            </span>
            <Icon name="right" color="#8b6fd0" size={15} />
          </button>
        )}

        {open && (
          <div style={{ overflowY: 'auto', padding: '2px 12px 16px', display: 'grid', gap: 7 }}>
            {list.map(x => (
              <button key={x.roomId} data-track={`zone:${x.label}`} onClick={() => pick(x.roomId)} className="nb" style={{
                ...S.card, width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 11,
                padding: '10px 12px', cursor: 'pointer',
                border: `2px solid ${x.roomId === sel ? C.purple + '77' : '#4a2390'}`,
              }}>
                <Icon name={iconOf(x)} color={actOf(x)?.color || C.dim} size={17} />
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#ffffff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {zLabel(x, t.i) || x.label}
                  </span>
                  <span style={{ ...S.dim, display: 'block', fontSize: 10.5, marginTop: 2 }}>{stat(x)}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Head({ icon, color, title, sub, back }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, margin: '2px 0 4px' }}>
      {/* ทรงเดียวกับลูกศรเลื่อนการ์ด — วงแหวนบาง พื้นโปร่ง สีตามโหมด */}
      <button data-track="back" onClick={back} style={{
        background: 'transparent', border: `1.5px solid ${color}`, borderRadius: '50%',
        width: 36, height: 36, cursor: 'pointer', display: 'grid', placeItems: 'center',
        flexShrink: 0, opacity: 0.8, padding: 0,
      }}>
        <Icon name="back" color={color} size={16} sw={2} />
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>{title}</div>
        <div style={{ ...S.dim, fontSize: 11 }}>{sub}</div>
      </div>
      <Icon name={icon} color={color} size={21} />
    </div>
  )
}

const Blank = ({ icon, title, note }) => (
  <div className="nb" style={{ ...S.card, textAlign: 'center', padding: '34px 18px' }}>
    <Icon name={icon} color="#4a2390" size={34} />
    <div style={{ fontSize: 13.5, fontWeight: 800, color: '#c9b8ff', marginTop: 10 }}>{title}</div>
    {note && <div style={{ ...S.dim, fontSize: 11, marginTop: 5, lineHeight: 1.7 }}>{note}</div>}
  </div>
)

/* ป๊อปอัปแชร์ลิงก์ — เลือกปลายทางในแอปเอง ไม่เด้งออกไปแผงแชร์ของเครื่องทันที

   คัดลอกคลิปบอร์ดใช้ได้เฉพาะ https หรือ localhost — เปิดผ่าน http://<ip> เบราว์เซอร์บล็อก
   ลิงก์ในกล่องจึงตั้ง userSelect: all ไว้ กดครั้งเดียวติดทั้งเส้น คัดลอกเองได้ */
/* ปลายทางที่ส่งลิงก์ต่อได้ — ทุกตัวเป็นลิงก์แชร์มาตรฐานของแอปนั้น ไม่ต้องใช้ SDK
   เปิดหน้าต่างใหม่ให้ผู้ใช้ยืนยันเองในแอป เราไม่ได้โพสต์แทนใคร
   เพิ่มปลายทางใหม่ = เพิ่มบรรทัดในลิสต์นี้ · สีคือสีประจำแอปนั้น */
const SHARE_TO = [
  { key: 'line', label: 'LINE', color: '#06c755', url: u => `https://social-plugins.line.me/lineit/share?url=${u}` },
  { key: 'fb', label: 'Facebook', color: '#4a90ff', url: u => `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  { key: 'x', label: 'X', color: '#e2d6ff', url: u => `https://twitter.com/intent/tweet?url=${u}` },
]

/* ลิงก์ที่แจกออกไปเป็นที่อยู่ถาวรของหน้านี้ ไม่ใช่ที่อยู่ที่คนแชร์กำลังเปิดอยู่
   เครื่องที่เปิดหน้านี้อาจอยู่บน railway, บน IP ในวง หรือ localhost ตอนทดสอบ
   ส่งที่อยู่พวกนั้นออกไปคนรับเปิดไม่ได้ (หรือเปิดได้วันนี้ พรุ่งนี้ย้ายวงก็ตาย) */
const SHARE_URL = 'https://www.kwangunlimit.com/momay/Momay-Student-Pixel'

function ShareModal({ onClose }) {
  const t = useT()
  const url = SHARE_URL
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const esc = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [onClose])

  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1900) } catch {}
  }

  return createPortal(
    <div className="eb8" data-track-scope="share" onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(10,3,32,0.88)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 18, overflowY: 'auto',
      fontFamily: 'Sarabun, system-ui, sans-serif',
    }}>
      <div onClick={e => e.stopPropagation()} className="nb" style={{
        '--nb': C.cyan, '--nb2': C.pink, '--nbfill': '#150733', '--st': '5px', '--bw': '3px',
        width: '100%', maxWidth: 330, padding: 18, textAlign: 'center',
      }}>
        <div style={{ ...S.pix, fontSize: 9, color: C.cyan, textShadow: `0 0 10px ${C.cyan}` }}>SHARE</div>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginTop: 8 }}>{t('share')}</div>

        <div style={{ display: 'grid', gap: 8, marginTop: 14 }}>
          {SHARE_TO.map(a => (
            <button key={a.key} data-track={`to-${a.key}`}
              onClick={() => window.open(a.url(encodeURIComponent(url)), '_blank', 'noopener,noreferrer')}
              className="nb" style={{
                '--nb': a.color, '--nb2': C.purple, '--nbfill': '#1b0940', '--st': '3px',
                display: 'flex', alignItems: 'center', gap: 10, padding: '11px 12px', cursor: 'pointer', textAlign: 'left',
              }}>
              <span style={{ width: 12, height: 12, background: a.color, boxShadow: `0 0 8px ${a.color}`, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 12.5, fontWeight: 800, color: a.color }}>{a.label}</span>
              <Icon name="right" color={a.color} size={13} />
            </button>
          ))}
        </div>

        <div className="nb" style={{
          '--nb': C.purple, '--nb2': C.pink, '--nbfill': '#0d0424', '--st': '3px',
          marginTop: 13, padding: '9px 10px', fontSize: 10.5, color: '#e2d6ff', wordBreak: 'break-all', userSelect: 'all',
        }}>{url}</div>

        <div style={{ display: 'grid', gap: 8, marginTop: 14 }}>
          <button data-track="copy" onClick={copy} className="nb" style={{
            '--nb': copied ? C.green : C.cyan, '--nb2': C.purple, '--nbfill': copied ? '#052a18' : '#0d3b52', '--st': '3px',
            padding: '11px 10px', fontSize: 12.5, fontWeight: 800, color: copied ? C.green : C.cyan, cursor: 'pointer',
          }}>{copied ? t('shareCopied') : t('shareCopy')}</button>

          {/* ปุ่มนี้โผล่เฉพาะเครื่องที่มีแผงแชร์ของตัวเอง (มือถือเกือบทั้งหมด) */}
          {typeof navigator !== 'undefined' && navigator.share && (
            <button data-track="via-app" onClick={() => navigator.share({ title: 'Momay', url }).catch(() => {})} className="nb" style={{
              '--nb': C.pink, '--nb2': C.purple, '--nbfill': '#3a1035', '--st': '3px',
              padding: '11px 10px', fontSize: 12.5, fontWeight: 800, color: C.pink, cursor: 'pointer',
            }}>{t('shareApp')}</button>
          )}

          <button data-track="close" onClick={onClose} style={{
            background: 'none', border: 'none', color: '#8b6fd0', fontSize: 11.5, fontWeight: 700, padding: 6, cursor: 'pointer',
          }}>{t('rateClose')}</button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

/* ปุ่มแชร์ — เป็นปุ่มหนึ่งบนแผงคอนโทรลของตู้ ต่อจากปุ่มสี
   (ปุ่มสีข้าง ๆ เป็นของประดับ ตัวนี้ปุ่มเดียวที่กดได้จริง จึงทำให้ใหญ่กว่าและมีไอคอน) */
const BEAT_KEY = 'momay_share_tapped'
function ShareButton() {
  const t = useT()
  const [open, setOpen] = useState(false)
  const [beat, setBeat] = useState(() => { try { return !localStorage.getItem(BEAT_KEY) } catch { return true } })
  const tap = () => {
    setOpen(true)
    setBeat(false)
    try { localStorage.setItem(BEAT_KEY, '1') } catch { /* storage ปิดอยู่ ก็แค่เต้นต่อ */ }
  }
  return (
    <>
      {/* เต้นเป็นจังหวะหัวใจ ตุบ-ตุบ แล้วพัก — ปุ่มเล็กที่ไม่มีคำกำกับ ถ้าอยู่นิ่ง ๆ คนกวาดตาผ่าน
          หยุดเต้นถาวรหลังกดครั้งแรก คนที่รู้แล้วว่ากดได้ ไม่ต้องมีอะไรมากระตุกตาอีก */}
      <button data-track="share" onClick={tap} aria-label={t('share')} title={t('share')} className={`nb chip${beat ? ' eb8-beat' : ''}`} style={{
        '--nb': '#ffffff', '--nb2': '#c9b8ff', '--nbfill': '#241056',
        display: 'grid', placeItems: 'center', width: 32, height: 32, flexShrink: 0, cursor: 'pointer',
      }}>
        <Icon name="share" color="#ffffff" size={17} />
      </button>
      {open && <ShareModal onClose={() => setOpen(false)} />}
    </>
  )
}

// ── หน้าหลัก ──// ── หน้าหลัก ──// ── หน้าหลัก ──────────────────────────────────────────────────────────
export default function BuuStudent8bitV2() {
  // จำภาษาที่เลือกไว้ ไม่ต้องกดใหม่ทุกครั้งที่เปิด
  const [lang, setLang] = useState(() => { try { return localStorage.getItem('momay_lang') || 'th' } catch { return 'th' } })
  useEffect(() => { try { localStorage.setItem('momay_lang', lang) } catch {} }, [lang])
  const T = k => (TXT[k] ? TXT[k][lang === 'en' ? 1 : 0] : k)
  const li = lang === 'en' ? 1 : 0
  const { rooms, counts, today, byDay, err, loading } = useMomayData()
  const bl = useBaseline(byDay)
  const { zones, parking } = useZones(rooms, counts, bl.series, today)
  const [nav, setNav] = useState({ v: 'home' })
  // นับคนเข้าดู + การกดปุ่ม (nav.v = จอย่อยที่เปิดอยู่ ติดไปกับทุกเหตุการณ์)
  const uref = usePageUsage('buu-student-8bit', nav.v)
  const [clock, setClock] = useState(() => new Date())
  useEffect(() => { const t = setInterval(() => setClock(new Date()), 30000); return () => clearInterval(t) }, [])

  /* ปุ่ม back ของเบราว์เซอร์/มือถือ ต้องถอยทีละจอในแอป ไม่ใช่ออกจากเว็บไปเลย

     จอย่อยของหน้านี้เป็น state ไม่ใช่ URL เบราว์เซอร์จึงไม่รู้จักมัน — เลยผูก state
     เข้ากับ history เอง: เปลี่ยนจอ = pushState หนึ่งใบ · กด back = popstate แล้วเอา
     จอที่เก็บไว้ในใบนั้นกลับมา · ที่ไม่เปลี่ยน URL เพราะจอย่อยไม่ใช่หน้าแยกที่แชร์ลิงก์ได้
     และการเปลี่ยน path จะไปชนกับ react-router ที่ดูแล /buustudent8bit อยู่

     กันลูป: ตอนกลับมาจาก popstate ห้าม push ซ้ำ (fromPop) และครั้งแรกที่เปิดหน้าไม่ต้อง
     push เพราะใบแรกคือหน้าแรกอยู่แล้ว (first) */
  const fromPop = useRef(false)
  const first = useRef(true)
  useEffect(() => {
    window.history.replaceState({ ...window.history.state, mnav: { v: 'home' } }, '')
    const onPop = e => { fromPop.current = true; setNav(e.state?.mnav || { v: 'home' }) }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  useEffect(() => {
    if (first.current) { first.current = false; return }
    if (fromPop.current) { fromPop.current = false; return }
    window.history.pushState({ ...window.history.state, mnav: nav }, '')
  }, [nav])

  // ปุ่มย้อนกลับในแอปสั่ง history.back() ไม่ใช่ setNav ตรง ๆ ประวัติจะได้ไม่งอก
  // ใบซ้อนใบจนกด back ของเบราว์เซอร์แล้ววิ่งกลับไปข้างหน้า
  const home = () => window.history.back()
  /* ไม่มีแถบเมนูล่างแล้ว — ทุกจอเข้าถึงจากเนื้อหาบนหน้าแรกและปุ่มย้อนกลับในจอนั้น ๆ
     (แผนที่เข้าจากปุ่ม "นำทางไปพื้นที่" ในการ์ดพื้นที่ · ที่จอดรถเข้าจากแถวบนหน้าแรก)
     nav.v ยังทำงานเหมือนเดิมทุกอย่าง ตัดออกแค่แถบปุ่มที่ลอยทับเนื้อหาด้านล่าง */

  const ui = useViewport()
  const views = useSiteViews()
  const rt = useRatings()
  const bk = useBookings()

  return (
   <LangCtx.Provider value={lang}>
    <UICtx.Provider value={ui}>
    <div ref={uref} className="eb8" style={S.page}>
      {/* CSS ของธีม 8-bit — ทำสิ่งที่ inline style ทำไม่ได้ หรือทำได้แต่ต้องไล่แก้หลายสิบจุด

          ที่ต้องเป็น CSS ไม่ใช่ inline style:
            • border-radius ถูกเขียนไว้กระจายหลายสิบจุดทั่วไฟล์ ใช้ !important กดทีเดียวจบ
              (กฎของ CSS: !important ในสไตล์ชีตชนะ inline style ที่ไม่มี !important)
            • image-rendering / ::selection / ::-webkit-scrollbar เขียนเป็น inline ไม่ได้เลย

          ทุกกฎอยู่ใต้ .eb8 ทั้งหมด — /allmomay เอาหลายหน้ามาต่อกันในหน้าเดียว
          ถ้าเขียนลอย ๆ ธีมนี้จะไปล้างหน้าอื่นทั้งหน้า */}
      <style>{`
        @keyframes momayPulse { 0%,100% { opacity:0 } 50% { opacity:.7 } }
        @keyframes momayUp { from { transform: translateY(12px); opacity: 0 } to { transform: none; opacity: 1 } }
        /* กรอบเปิดปิดของการ์ดหลักหน้าจอ — สีเต้นทีละสี เหมือนไฟวิ่งตู้เกม */
        @keyframes eb8Blink { 0%,49% { opacity: 1 } 50%,100% { opacity: .3 } }
        /* อนุภาคพื้นหลัง: ลอยขึ้นพ้นจอแล้ววนใหม่ · เล็ก-ใหญ่-เล็ก ระหว่างทาง
           จาง 0 ที่หัวกับท้ายเส้นทาง ไม่ให้เห็นจังหวะ "ตัดกลับ" ตอนวนรอบใหม่ */
        @keyframes eb8Rise {
          0%   { transform: translateY(0) scale(.5);      opacity: 0 }
          9%   {                                          opacity: 1 }
          50%  { transform: translateY(-52vh) scale(1.55) }
          91%  {                                          opacity: 1 }
          100% { transform: translateY(-114vh) scale(.5); opacity: 0 }
        }
        /* แถบเฉลยไอคอนวิ่งวน — วางรายการซ้ำสองชุดแล้วเลื่อนไป 50% รอยต่อจึงต่อกันพอดี */
        @keyframes eb8Scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .eb8-mq { animation: eb8Scroll 22s linear infinite; will-change: transform; }
        .eb8-p {
          position: absolute; bottom: -14px; display: block; will-change: transform;
          box-shadow: 0 0 6px rgba(255,255,255,.85), 0 0 15px rgba(180,120,255,.5);
          animation-name: eb8Rise; animation-timing-function: linear; animation-iteration-count: infinite;
        }
        /* เครื่องที่ผู้ใช้ตั้งค่าว่าไม่เอาภาพเคลื่อนไหว ให้เหลือเป็นจุดนิ่ง ๆ ไม่ใช่หายไปเลย */
        /* จังหวะหัวใจ: ตุบแรงแล้วตุบเบา แล้วพักยาว — ไม่ใช่เต้นรัวสม่ำเสมอซึ่งกลายเป็นสิ่งรบกวน
           ขยายจากกึ่งกลางปุ่ม กรอบนีออน (::before/::after ของ .nb) ขยายตามไปด้วยทั้งใบ */
        @keyframes momay-beat {
          0%, 30%, 100% { transform: scale(1) }
          7%            { transform: scale(1.18) }
          15%           { transform: scale(1) }
          22%           { transform: scale(1.10) }
        }
        .eb8-beat { animation: momay-beat 2.2s ease-in-out infinite; transform-origin: center }
        @media (prefers-reduced-motion: reduce) { .eb8-p, .eb8-mq, .eb8-beat { animation: none; transform: none } }
        .momay-shots { scrollbar-width: none; -ms-overflow-style: none; }
        .momay-shots::-webkit-scrollbar { display: none; }

        /* มุมตัดเป็นศัตรูของ border-radius — บังคับมุมโค้งเป็น 0 ทั้งหน้าตั้งแต่ต้น
           ตัวครอบยันจุดกลมเล็กสุด จะได้ไม่ต้องไล่ลบ borderRadius ทีละจุดในไฟล์ */
        .eb8, .eb8 *, .eb8 *::before, .eb8 *::after { border-radius: 0 !important; }
        .eb8 * { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
        .eb8 img, .eb8 canvas, .eb8 video { image-rendering: pixelated; }
        /* ฟอนต์พิกเซลมีน้ำหนักเดียว — ห้ามเบราว์เซอร์ปลอมตัวหนาให้ ไม่งั้นตัวเลขขอบเยิน */
        .eb8 { font-synthesis-weight: none; font-synthesis: none; }
        /* ปุ่มกับช่องกรอกไม่รับฟอนต์จากหน้าเอง (UA ตั้งของตัวเองไว้) และ index.css ก็ตั้ง
           button { font-family: var(--sans) } ทับไว้อีกชั้น — ตัวเลขเกือบทั้งหน้านี้
           (ชิปเลขชั้น · ป้ายตัวเลขท้ายแถว · แถวพื้นที่) อยู่ในปุ่มทั้งนั้น ไม่ประกาศซ้ำตรงนี้
           ปุ่มจะกลับไปใช้ฟอนต์ของ UA แทนที่จะเป็น Sarabun เหมือนข้อความรอบ ๆ */
        .eb8, .eb8 button, .eb8 input, .eb8 select, .eb8 textarea {
          font-family: Sarabun, system-ui, sans-serif;
        }
        .eb8 button { transition: none !important; }
        .eb8 button:hover { filter: brightness(1.18); }
        .eb8 ::selection { background: #22e8ff; color: #16062f; }
        .eb8 ::-webkit-scrollbar { width: 8px; height: 8px; }
        .eb8 ::-webkit-scrollbar-thumb { background: #6a2fbe; }
        .eb8 ::-webkit-scrollbar-track { background: #0d0424; }

        /* ── กรอบนีออนมุมตัด (.nb) — ชิ้นส่วนหลักของธีมนี้ ────────────────────
           วาดด้วยสี่เหลี่ยมตัดมุมสองใบซ้อนกัน ไม่ใช่ border ธรรมดา:
             ::before = ใบนอก ไล่สีเต็มพื้นที่ (ตัวนี้คือ "สีขอบ")
             ::after  = ใบใน  หดเข้ามาเท่าความหนาขอบ (--bw) แล้วทับพื้นตรงกลางคืน
           ส่วนที่ใบในทับไม่ถึง = กรอบ · หดเข้าเท่ากันทุกด้าน ขอบจึงหนาเท่ากันหมด
           รวมถึงมุมทแยง ซึ่งเป็นจุดที่วิธี border/mask ทำให้บางลงจนมุมดูแหว่ง

           ไล่สีของขอบไปจบที่สีขาวทั้งสองปลาย = แสงวิ่งผ่านมุมบนซ้ายกับล่างขวา
           ส่วนพื้นด้านในมีไฮไลต์ขาวจาง ๆ ด้านบนไล่ลงไปหาเงาดำด้านล่าง — ทำให้ทุกใบ
           ดูเป็นแผ่นนูนรับแสงจากด้านบน ไม่ใช่สี่เหลี่ยมแบน ๆ ที่มีเส้นล้อมรอบ
           (เขียนไฮไลต์เป็นขาว/ดำโปร่งแสงทับบนสีพื้น ไม่ใช่ระบุสีตายตัว จะได้ใช้ได้
            กับทุกค่า --nbfill ตั้งแต่ชิปสีสว่างยันการ์ดสีเข้ม)

           z-index: -1 วางสองชั้นนี้ไว้ใต้เนื้อหาแต่ยังอยู่เหนือพื้นหลังหน้า
           (ลำดับการวาดของ CSS: พื้นของตัวเอง → z-index ติดลบ → เนื้อหา)

           จงใจไม่ใส่ clip-path/filter ที่ตัว .nb เอง — ในการ์ดพื้นที่มี ShotViewer
           ที่เป็น position:fixed เต็มจอซ่อนอยู่ ถ้า clip ที่ตัวการ์ด รูปเต็มจอจะโดน
           ตัดเหลือเท่าการ์ด และ filter จะทำให้ fixed ยึดกับการ์ดแทนที่จะยึดกับจอ */
        .eb8 .nb {
          --nb: #b06cff; --nb2: #ff4fd8; --nbfill: #150733; --st: 3px; --bw: 2px;
          position: relative;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          /* บังคับให้แต่ละใบมีชั้นซ้อนของตัวเอง — ไม่งั้นพื้น (::after) ของการ์ดใบนอก
             จะถูกวาดทีหลังกรอบของชิปที่ซ้อนอยู่ข้างใน แล้วกลืนกรอบชิปหายไปทั้งใบ
             (ทั้งคู่อยู่ z-index -1 ชั้นเดียวกัน ใบนอกอยู่หลังในลำดับต้นไม้จึงชนะ) */
          isolation: isolate;
        }
        /* มุมเป็น "บันได" ไต่ทีละขั้นละ --st ไม่ใช่เส้นเฉียง 45 องศาเส้นเดียว
           เส้นเฉียงเรียบเป็นสิ่งที่จอพิกเซลวาดไม่ได้ ต้องไต่ทีละช่องแบบนี้เท่านั้น
           สามขั้นต่อมุม · ::before กับ ::after ใช้รูปเดียวกัน ต่างแค่ ::after หดเข้ามา
           --bw เท่ากันทุกด้าน ขอบจึงหนาเท่ากันหมด รวมถึงช่วงบันไดตรงมุม */
        .eb8 .nb::before, .eb8 .nb::after, .eb8 .pxclip {
          clip-path: polygon(
            0 calc(var(--st)*3), var(--st) calc(var(--st)*3), var(--st) calc(var(--st)*2),
            calc(var(--st)*2) calc(var(--st)*2), calc(var(--st)*2) var(--st),
            calc(var(--st)*3) var(--st), calc(var(--st)*3) 0,
            calc(100% - var(--st)*3) 0, calc(100% - var(--st)*3) var(--st),
            calc(100% - var(--st)*2) var(--st), calc(100% - var(--st)*2) calc(var(--st)*2),
            calc(100% - var(--st)) calc(var(--st)*2), calc(100% - var(--st)) calc(var(--st)*3),
            100% calc(var(--st)*3), 100% calc(100% - var(--st)*3),
            calc(100% - var(--st)) calc(100% - var(--st)*3), calc(100% - var(--st)) calc(100% - var(--st)*2),
            calc(100% - var(--st)*2) calc(100% - var(--st)*2), calc(100% - var(--st)*2) calc(100% - var(--st)),
            calc(100% - var(--st)*3) calc(100% - var(--st)), calc(100% - var(--st)*3) 100%,
            calc(var(--st)*3) 100%, calc(var(--st)*3) calc(100% - var(--st)),
            calc(var(--st)*2) calc(100% - var(--st)), calc(var(--st)*2) calc(100% - var(--st)*2),
            var(--st) calc(100% - var(--st)*2), var(--st) calc(100% - var(--st)*3),
            0 calc(100% - var(--st)*3));
        }
        .eb8 .nb::before, .eb8 .nb::after { content: ''; position: absolute; z-index: -1; pointer-events: none; }
        .eb8 .nb::before {
          inset: 0;
          background: linear-gradient(145deg, #ffffff 0%, var(--nb) 26%, var(--nb2) 74%, #ffffff 100%);
          filter: drop-shadow(0 0 5px var(--nb)) drop-shadow(0 0 12px var(--nb2));
        }
        .eb8 .nb::after {
          inset: var(--bw);
          background:
            linear-gradient(168deg, rgba(255,255,255,.20) 0%, rgba(255,255,255,.06) 15%,
                                    rgba(255,255,255,0) 45%, rgba(0,0,0,.34) 100%),
            var(--nbfill);
        }
        /* ประกายที่กระจายออกตอนกดแถวชั้น — ทิศทางกับระยะส่งมาทาง --dx/--dy ของแต่ละเม็ด
           steps() ทำให้กระเด็นเป็นช่วง ๆ แบบเกม 8 บิต ไม่ใช่ไหลลื่นแบบภาพเวกเตอร์ */
        @keyframes eb8Burst {
          from { transform: translate(0, 0) scale(1);              opacity: 1 }
          to   { transform: translate(var(--dx), var(--dy)) scale(.25); opacity: 0 }
        }
        .eb8-burst { animation: eb8Burst .55s steps(7, end) forwards; }
        @media (prefers-reduced-motion: reduce) { .eb8-burst { display: none } }
        /* แถวพื้นที่ที่กางออกมาจากชั้น — ลดแสงเรืองลงเยอะ ให้เป็นของรองของแถวชั้น
           ถ้าเรืองเท่ากันทั้งคู่ ตาจะอ่านเป็นแถวระดับเดียวกันหมด แยกไม่ออกว่าอันไหนอยู่ในอันไหน */
        .eb8 .nb.sub::before { filter: drop-shadow(0 0 2px var(--nb)); }
        /* หัวแอปตัดมุมลึกกว่าใบอื่นจนเป็นทรงหกเหลี่ยม — ป้ายชื่อของหน้า ไม่ใช่การ์ดข้อมูล */
        .eb8 .nb.hex { --st: 5px; }
        /* ป้ายเล็ก (นาฬิกา ปุ่มภาษา ชิปเลขชั้น) — มุมตัดต้องได้สัดส่วนกับป้ายที่เตี้ยกว่า
           ใช้ค่าเดียวกับการ์ดใหญ่แล้วมุมจะกินเนื้อป้ายจนตัวหนังสือข้างในบี้ */
        .eb8 .nb.chip { --st: 1.5px; }
      `}</style>
      <StarField />
      {/* nav.v = จอที่เปิดอยู่ → เป็น "ตัวแม่" ของทุกปุ่มในเนื้อหา (แถบเมนูล่างอยู่นอกกรอบนี้ มีแม่ของตัวเอง) */}
      <div data-track-scope={nav.v} style={{ ...S.phone, position: 'relative', zIndex: 1, width: ui.base ?? '100%', maxWidth: ui.maxW, zoom: ui.zoom }}>
        {/* ยอดเข้าชมสะสม — อยู่บนสุดของหน้า ชิดขวา เหนือหัวแอป
            "visitor" ใช้ฟอนต์ปกติ ไม่ใช่ฟอนต์พิกเซล เพราะฟอนต์พิกเซลมีแต่ตัวเลขกับเครื่องหมาย
            (ตัวอักษรละตินจะตกไปใช้ Sarabun เองอยู่แล้ว เขียนแยก span ไว้เพื่อคุมขนาดกับสี)
            ยังดึงไม่ได้ก็ไม่ต้องขึ้น ดีกว่าโชว์ 0 ให้เข้าใจว่าไม่มีคนเข้าเลย */}
        {views != null && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0 0' }}>
            <span className="nb chip" title={T('viewsAll')} aria-label={`${T('viewsAll')} ${views}`} style={{
              '--nb': C.cyan, '--nb2': C.purple, '--nbfill': '#0d3b52',
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 9px',
            }}>
              <Icon name="eye" color={C.cyan} size={13} />
              <span style={{ ...S.num, fontSize: 12, color: '#fff' }}>{views.toLocaleString()}</span>
              <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 0.4, color: '#8fe6ff' }}>{T('visitorUnit')}</span>
            </span>
          </div>
        )}

        {/* หัวแอป — แถบเดียวจบ: ใครทำ · ให้ใคร · กี่โมง · ภาษาอะไร
            โชว์เวลาจริงของเครื่อง ไม่ใช่ 9:41 ใน mockup */}
        {/* ทุกชิ้นตั้ง flexShrink: 0 ยกเว้นชื่อห้องสมุด — จอแคบกว่าที่คิดไว้จะได้ย่อที่ชื่อ
            ไม่ใช่ไปบีบนาฬิกาหรือปุ่มภาษาจนกดไม่โดน (ขนาดพวกนี้ตั้งไว้ให้พอดีจอ 390) */}
        {/* ── แก้จากต้นฉบับ BUU (จุดที่ 2 จาก 2) ──
            เดิมเป็น flex + space-between ชื่อจึงชิดซ้าย เพราะต้นฉบับมีชื่อห้องสมุดยาว ๆ
            กินพื้นที่ซ้ายอยู่แล้ว · พอเหลือชื่อแบรนด์สั้น ๆ มันเลยลอยอยู่มุมซ้าย
            เปลี่ยนเป็นกริด 3 ช่อง [ช่องเปล่า | ชื่อ | นาฬิกา+กระดิ่ง] ที่ช่องซ้าย-ขวา
            กว้างเท่ากัน (1fr เท่ากันเสมอ) ชื่อจึงอยู่กลางแถบจริง ๆ ไม่ใช่กลางที่ว่างที่เหลือ
            ระยะขอบบนลดจาก 8px เหลือ 2px ด้วย — ตัวครอบตั้ง zoom ไว้ (สูงสุด 2.2 บนจอกว้าง)
            ระยะที่ตั้งไว้สำหรับจอมือถือจึงถูกคูณตาม กลายเป็นช่องว่างก้อนใหญ่เหนือแถบ
            ก๊อบไฟล์ทับจากต้นทางเมื่อไหร่ ต้องมาแก้ตรงนี้ซ้ำ */}
        <div className="nb hex" style={{ '--nb': C.cyan, '--nb2': C.pink, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)', alignItems: 'center', gap: 4, padding: '9px 12px', margin: '2px 0 18px' }}>
          {/* ช่องเปล่าฝั่งซ้าย — ถ่วงให้เท่ากับกลุ่มขวา ชื่อถึงจะอยู่กึ่งกลางพอดี */}
          <span aria-hidden="true" />

          {/* ── แก้จากต้นฉบับ BUU (จุดที่ 1 จาก 2): ตัดชื่อ ม.บูรพา ออก เหลือชื่อแบรนด์อย่างเดียว ──
              เดิมเป็น "Momay x สำนักหอสมุดม.บูรพา | For Student" */}
          <b style={{ fontSize: 'clamp(15px, 3.3vw, 22px)', fontWeight: 700, letterSpacing: 0.7, color: '#e2d6ff', whiteSpace: 'nowrap' }}>
            Momay<span style={{ color: '#b06cff' }}>for</span>Student
          </b>

          {/* กลุ่มขวา: นาฬิกา + กระดิ่ง อยู่ในช่องเดียวกัน จะได้ถ่วงกับช่องเปล่าฝั่งซ้ายได้ */}
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
            {/* นาฬิกากะพริบเหมือนหน้าปัดเกม — ความเป็นเกมมาจากจังหวะกะพริบกับกรอบชิป
                ไม่ได้มาจากฟอนต์ เวลาจึงอ่านง่ายเหมือนตัวเลขอื่นทั้งหน้าได้โดยไม่เสียธีม */}
            <span className="nb chip" style={{ '--nb': C.pink, '--nb2': C.purple, '--nbfill': '#1c0940', flexShrink: 0, ...S.num, fontSize: 11, color: '#fff', padding: '5px 5px', animation: 'eb8Blink 2s steps(1,end) infinite' }}>
              {clock.toLocaleTimeString(lang === 'en' ? 'en-GB' : 'th-TH', { hour: '2-digit', minute: '2-digit' })}
            </span>
            {/* ปุ่มสลับภาษา (TH/EN) ถอดออกก่อนตามที่สั่ง — ตรึงไว้ที่ไทยอย่างเดียว
                ข้อความสองภาษาใน TXT ยังอยู่ครบ เอาปุ่มกลับมาเมื่อไหร่ก็ใช้ได้ทันที */}
            <Icon name="bell" color={C.pink} size={15} />
          </span>
        </div>

        {err && <div className="nb" style={{ ...S.card, '--nb': '#ff2d55', '--nb2': '#ff8a3d', color: '#ff5b7a', fontSize: 12.5, marginBottom: 12 }}>⚠ {T('errConn')}</div>}
        {loading && <div style={S.dim}>{T('loading')}</div>}

        {!loading && (() => {
          switch (nav.v) {
            case 'home':  return <Home zones={zones} parking={parking} bl={bl} bk={bk} go={setNav} />
            case 'act':   return <IntentView activity={nav.a} zones={zones} rt={rt} bk={bk} back={home} go={setNav} />
            case 'zone':  return <ActivityView activity={nav.a} room={nav.room} zones={zones} bl={bl} rt={rt} bk={bk} back={home} go={setNav} />
            case 'park':  return <ParkingView parking={parking} back={home} />
            case 'rec':   return <RecommendView zones={zones} bl={bl} rt={rt} back={home} />
            case 'map':   return <MapView zones={zones} roomId={nav.room} back={home} go={setNav} />
            case 'noti':  return <Blank icon="bell" title={T('notiTitle')} />
            case 'me':    return <Blank icon="user" title={T('meTitle')} />
            default: return <ZonesView zones={zones} go={setNav} />
          }
        })()}
      </div>

    </div>
    </UICtx.Provider>
   </LangCtx.Provider>
  )
}
