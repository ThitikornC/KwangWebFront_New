/**
 * กล้องของ "พื้นที่" บนหน้านักศึกษา/ผู้บริหาร
 *
 * ปกติกล้องผูกกับห้องตอนลงทะเบียนอุปกรณ์ (device.room) ซึ่งตรงกับผังอาคารจริง
 * แต่พื้นที่ที่นักศึกษาเห็นไม่ได้ตรงกับห้องในทะเบียนเสมอ — "Focus Floor ชั้น 3"
 * อาจกินสองห้อง หรือเป็นพื้นที่ที่ผู้ดูแลเพิ่งตั้งขึ้นมาเองซึ่งยังไม่มีอุปกรณ์ของตัวเอง
 * ผู้ดูแลจึงเลือกกล้องให้พื้นที่เองได้ที่ /settings → เก็บเป็น room.studentCamIds
 *
 * ทั้งสองฝั่งต้องอ่านกติกาเดียวกัน ไม่งั้นตัวเลขหน้านักศึกษากับหน้าผู้บริหารจะไม่ตรงกัน
 */

// กล้องทุกตัวในทะเบียน (ข้ามห้อง) — ใช้ตอนผู้ดูแลเลือกกล้องเอง และตอนแสดงรายการให้เลือก
export function allCams(rooms) {
  return (rooms || []).flatMap(r =>
    (r.devices || [])
      .filter(d => d.category === 'camera' && d.meta?.camId)
      .map(d => ({ ...d, _room: r })))
}

/**
 * กล้องที่นับให้พื้นที่นี้
 *   มี studentCamIds = ใช้ตามที่เลือก (ข้ามการผูกจากทะเบียน)
 *   ว่าง            = ใช้กล้องที่ผูกกับห้องนี้ในทะเบียนเหมือนเดิม
 * เรียงตามลำดับที่เลือกไว้ ไม่ใช่ลำดับในทะเบียน — ตัวแรกคือตัวที่ผู้ดูแลตั้งใจให้เป็นหลัก
 */
export function roomCams(room, rooms) {
  const picked = (room?.studentCamIds || []).map(String).filter(Boolean)
  if (picked.length) {
    const all = allCams(rooms)
    return picked
      .map(id => all.find(d => String(d.meta.camId) === id))
      .filter(Boolean)
  }
  // กล้องที่ถูกดึงไปให้พื้นที่อื่นแล้ว ตัดออกจากห้องที่มันสังกัดในทะเบียน
  // ไม่งั้นคนกลุ่มเดียวกันถูกนับสองที่ แล้วยอดรวมทั้งอาคารบวมขึ้นทันทีที่มีการเลือกกล้องเอง
  const claimed = new Set((rooms || [])
    .filter(r => r.roomId !== room?.roomId)
    .flatMap(r => (r.studentCamIds || []).map(String)))
  return (room?.devices || [])
    .filter(d => d.category === 'camera' && d.meta?.camId && !claimed.has(String(d.meta.camId)))
}
