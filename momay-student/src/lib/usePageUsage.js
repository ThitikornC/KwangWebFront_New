/**
 * ผูกการนับการใช้งานเข้ากับหน้าหนึ่งหน้า — ดู lib/usage.js สำหรับภาพรวม
 *
 *   const uref = usePageUsage('momay-student', nav.v)
 *   return <div ref={uref}> … </div>
 *
 * ค่าที่สอง (ไม่ใส่ก็ได้) = ชื่อหน้าจอย่อยที่กำลังเปิดอยู่ ติดไปกับทุกเหตุการณ์
 * — หน้านักศึกษามีหลายจอในหน้าเดียว ปุ่ม "ย้อนกลับ" ของแต่ละจอจึงต้องแยกออกจากกัน
 *
 * ต้องเอา ref ไปแปะที่ตัวครอบของหน้า เพราะ /allmomay เอาสามหน้ามาต่อกันในหน้าเดียว
 * ถ้าดักคลิกที่ document เฉย ๆ คลิกในหน้านักศึกษาจะถูกนับให้หน้า by-job ด้วย
 * (ดักที่ document แล้วค่อยเช็คว่าคลิกตกอยู่ในกรอบของใคร — ปุ่มที่โผล่ทีหลังจึงถูกนับด้วย)
 */
import { useEffect, useRef } from 'react'
import { trackView, trackClick, trackLeave, flushUsage, actionOf } from './usage'

// กัน StrictMode ตอน dev เรียก effect สองรอบแล้วนับการเข้าหน้าเป็นสองครั้ง
const lastView = new Map()
const seenTwice = page => {
  const now = Date.now()
  const prev = lastView.get(page) || 0
  lastView.set(page, now)
  return now - prev < 1000
}

export function usePageUsage(page, view) {
  const ref = useRef(null)
  // เก็บใส่ ref เพราะ effect ผูกตัวดักคลิกครั้งเดียว แต่จอย่อยเปลี่ยนได้ตลอด
  const viewRef = useRef(view)
  viewRef.current = view

  useEffect(() => {
    if (!page) return
    if (!seenTwice(page)) trackView(page, { view: viewRef.current })

    let since = Date.now()          // เริ่มจับเวลาใหม่ทุกครั้งที่กลับมาดูหน้านี้
    let counted = false             // กันนับเวลาซ้ำ เมื่อสลับแท็บแล้วปิดไปเลย
    const secs = () => Math.round((Date.now() - since) / 1000)

    const onClick = e => {
      const root = ref.current
      if (root && !root.contains(e.target)) return      // คลิกของหน้าอื่นใน /allmomay
      const hit = actionOf(e.target, root)
      if (hit) trackClick(page, hit.action, hit.label, { view: viewRef.current })
    }
    const record = () => {
      if (counted) return
      counted = true
      trackLeave(page, secs())
      flushUsage()
    }
    // สลับแท็บ = หยุดจับเวลา · กลับมา = เริ่มจับใหม่ (ไม่นับเวลาที่จอถูกซ่อนอยู่)
    const onVisible = () => {
      if (document.visibilityState === 'visible') { since = Date.now(); counted = false }
      else record()
    }
    // ปิดแท็บต้องบันทึกเสมอ ห้ามไปเช็ค visibilityState ก่อน — ตอน pagehide บางเบราว์เซอร์
    // ยังรายงานว่า 'visible' อยู่ ถ้าไปเช็คแล้วรีเซ็ตนาฬิกา เวลาที่อยู่บนหน้าจะกลายเป็น 0
    const onPageHide = () => record()

    document.addEventListener('click', onClick, true)   // capture — ปุ่มที่ stopPropagation ก็ยังนับได้
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('pagehide', onPageHide)     // iOS ปิดแท็บบางกรณีไม่ยิง visibilitychange

    return () => {
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('pagehide', onPageHide)
      if (!counted) trackLeave(page, secs())
      flushUsage()
    }
  }, [page])

  return ref
}

export default usePageUsage
