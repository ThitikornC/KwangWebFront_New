/*
  ผังคณะสามมิติ

  เดิมผังนี้วาดด้วย SVG ที่ฉายพิกัดเองแล้วไล่สีสามหน้าให้ดูเหมือนกล่อง
  ปัญหาคือแสงเป็นของปลอม — ทุกก้อนสว่างเท่ากันไม่ว่าจะอยู่ตรงไหน
  ไม่มีเงาตกกระทบ ไม่มีเงาในซอก ผังเลยแบนและดูเป็นไดอะแกรมมากกว่าเป็นเมือง

  ตอนนี้เป็นฉากสามมิติจริง กล้องออร์โธกราฟิกวางมุมไอโซเมตริก (มุมเดียวกับของเดิม
  ผังจึงยังอ่านคู่กับหน้า ORGANIZE ได้) แต่แสงกับเงาคำนวณจริง

  รูปทรงทั้งหมดยังมาจาก facultyReport ตัวเดียวกับหน้า ORGANIZE — ใช้ฟิลด์ gx/gy/gw/gd
  ที่ engine ส่งมาเป็น "พิกัดกริด" ไม่ใช่พิกัดจอที่ฉายแล้ว เพราะพิกัดที่ฉายแล้วย้อนกลับไม่ได้
*/

import { Fragment, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { districtCenter } from '../lib/spaces'

/** ต้องตรงกับ faculty.ts — ใช้แปลงหน่วยกริดเป็นหน่วยฉาก */
const GRID_N = 12
const LEVEL_H = 0.42
const BLOCK = 4

/* ── สีอาคารตามสถานะ ──
   ค่าตั้งต้นคือ "เกือบขาว" ไม่ใช่สีประจำสถานะ
   ถ้าย้อมทุกสถานะ ทั้งผังจะเป็นสีหมดแล้วไม่มีอะไรเด่น — สีต้องเป็นของหายาก
   จึงย้อมเฉพาะที่คนแน่นจริง (hot) กับอาคารที่กำลังเลือก (sel)
   ส่วน ok/mid ปล่อยขาวเหมือนอาคารทั่วไป เพราะ "ปกติ" ไม่ใช่ข้อมูลที่ต้องเน้น */
const TONE = {
  hot: { body: 0xf6cfd2, roof: 0xfde7e9 },
  mid: { body: 0xf4f2ee, roof: 0xfdfcfa },
  ok: { body: 0xf3f6f8, roof: 0xfdfefe },
  sel: { body: 0xcabdf5, roof: 0xe4dcff },
  none: { body: 0xf2f5f8, roof: 0xfdfdfe },
}

/** กริด (0..12) → พิกัดฉาก โดยให้กลางผังอยู่ที่จุดกำเนิด */
const wx = g => g - GRID_N / 2

/* ── ตึกฉากหลัง ──
   อาคารนอกผังคณะ ไม่ใช่ข้อมูล ไม่มีสถานะ กดไม่ได้ มีไว้ให้เมืองต่อเนื่องเลยขอบเฟรม
   ถ้าไม่มี พอลากผังไปสุดทางจะเห็นพื้นเปล่า ๆ แล้วคณะดูเหมือนเกาะลอยกลางที่ว่าง

   สร้างด้วยเมล็ดคงที่เหมือน faculty.ts ฉากหลังจะได้ไม่ขยับทุกครั้งที่เรนเดอร์ */
function outerLots() {
  let seed = 90210
  const rnd = () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const out = []
  const R = 10 // กว้างกว่าผังออกไปกี่ช่อง
  for (let gx = -R; gx < GRID_N + R; gx++) {
    for (let gy = -R; gy < GRID_N + R; gy++) {
      const inside = gx >= 0 && gx < GRID_N && gy >= 0 && gy < GRID_N
      if (inside) continue
      // ถนนของฉากหลังใช้คาบเดียวกับในผัง เมืองจะได้ต่อเป็นผืนเดียว
      if (((gx % BLOCK) + BLOCK) % BLOCK === BLOCK - 1) continue
      if (((gy % BLOCK) + BLOCK) % BLOCK === BLOCK - 1) continue
      const r = rnd()
      if (r > 0.55) continue
      const w = rnd() < 0.24 ? 2 : 1
      out.push({
        gx: gx + 0.14,
        gy: gy + 0.14,
        gw: w - 0.28,
        gd: 0.72,
        lv: 1 + Math.floor(rnd() * 4),
        tone: (rnd() * 3) | 0,
      })
    }
  }
  return out
}
const OUTER = outerLots()

/* ── มุมกล้อง ──
   แก้สองตัวนี้ตัวเดียวก็เปลี่ยนมุมได้ทั้งแอป ไม่ต้องไปไล่แก้ค่า x/y/z สามตัว
   ที่ต้องแยกเป็นองศา เพราะคิดเป็น "ก้มกี่องศา หันกี่องศา" ได้ตรงกับที่คนพูดถึงมุมกล้อง
   ส่วนพิกัด x/y/z สามตัวนั้นต้องแก้พร้อมกันให้สัมพันธ์กัน ไม่งั้นระยะกล้องเพี้ยนด้วย

   TILT  ก้มลงกี่องศาจากแนวระนาบ — 35.26 คือไอโซเมตริกมาตรฐาน (เห็นผนังเยอะ)
         90 คือมองตรงลงมาจากข้างบน (เห็นแต่หลังคา)
   TURN  หมุนรอบแกนตั้งกี่องศา — 45 คือมุมไอโซเมตริกที่เห็นสองด้านเท่า ๆ กัน */
const TILT_DEG = 49
const TURN_DEG = 45
/** ระยะกล้อง ไม่มีผลกับขนาดภาพ (กล้องออร์โธกราฟิก) แค่ต้องไกลพอไม่ให้ตัดวัตถุ */
const CAM_DIST = 24

/* เส้นนำทางเป็นจุดกลมเรียงกัน แบบเดียวกับทางเดินเท้าในแผนที่ทั่วไป */
const ROUTE_Y = 0.1
/* รัศมีจุดและระยะห่าง — จุดโตขึ้นและห่างขึ้น อ่านเป็น "รอยเท้า" ชัดกว่าจุดเล็กถี่ ๆ
   จุดถี่เกินไปจะกลายเป็นเส้นประที่ตาอ่านรวมเป็นเส้นเดียว ซึ่งก็คือเส้นทึบที่เพิ่งเลิกใช้ */
// ขอบเขตการซูม — แคบพอที่ผู้ใช้จะไม่หลงออกไปอยู่กลางพื้นเปล่าหรือจมอยู่ในตัวตึก
const ZOOM_MIN = 0.55
const ZOOM_MAX = 3
const DOT_R = 0.125
const DOT_GAP = 0.58

function camPos(tiltDeg, turnDeg) {
  const t = (tiltDeg * Math.PI) / 180
  const r = (turnDeg * Math.PI) / 180
  const flat = Math.cos(t) * CAM_DIST
  return [Math.sin(r) * flat, Math.sin(t) * CAM_DIST, Math.cos(r) * flat]
}

export default function Campus3D({
  report,
  pins = [],
  activeId = null,
  districtTone = {},
  route = null,
  you = null,
  onPick,
  full = false,
  height = 230,
  tilt = TILT_DEG,
  turn = TURN_DEG,
  /* แถบบนสุดของผังที่มีอย่างอื่นลอยทับอยู่ (หัวข้อหน้า) คิดเป็น % ของความสูงกรอบ
     ป้ายที่ตกลงไปอยู่ในแถบนี้จะอ่านไม่ออกเพราะซ้อนกับหัวข้อ จึงยุบเป็นจุดแทน */
  headroom = 0,
}) {
  const hostRef = useRef(null)
  const zoomRef = useRef(1)
  const stateRef = useRef(null)
  /* ตำแหน่งป้ายต้องมาจากกล้องจริง ไม่ใช่สูตรฉายที่เขียนมือขึ้นมาอีกชุด
     สองชุดจะเพี้ยนจากกันทันทีที่กล้องขยับหรือกรอบเปลี่ยนอัตราส่วน
     ป้ายก็จะลอยไปอยู่คนละที่กับอาคารที่มันชี้ */
  const [proj, setProj] = useState({})
  /* ระยะที่ลากไป เก็บเป็น "พิกเซลบนจอ" ไม่ใช่หน่วยฉาก
     เพราะนิ้วเลื่อนไปกี่พิกเซล ผังต้องเลื่อนตามเท่านั้นพอดี ถึงจะรู้สึกว่าลากติดมือ
     ถ้าเก็บเป็นหน่วยฉากต้องแปลงกลับไปมาทุกเฟรม และจะเพี้ยนเมื่อกรอบเปลี่ยนขนาด */
  const panRef = useRef({ x: 0, y: 0 })
  const [pan, setPan] = useState({ x: 0, y: 0 })

  // สร้างฉากครั้งเดียว — สร้างใหม่ทุกครั้งที่ข้อมูลขยับจะกระตุกและกินหน่วยความจำ
  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const scene = new THREE.Scene()
    scene.background = null

    /* จอมือถือความละเอียดสูงไม่ต้องใช้ MSAA ก็คมพออยู่แล้ว
       เพราะหนึ่งพิกเซล CSS กินหลายพิกเซลจริง ขอบจึงเนียนเองโดยปริยาย
       เปิด antialias ทิ้งไว้เท่ากับจ่ายค่าประมวลผลฟรีบนเครื่องที่ช้าที่สุด */
    const dpr = window.devicePixelRatio || 1
    const renderer = new THREE.WebGLRenderer({ antialias: dpr < 1.5, alpha: true, powerPreference: 'low-power' })
    /* 1.5 เท่าคมพอสำหรับผังที่เป็นสีเรียบ ๆ ไม่มีลวดลายละเอียด
       ขยับจาก 1.75 เป็น 1.5 ตัดจำนวนพิกเซลที่ต้องวาดลงราวหนึ่งในสี่ */
    renderer.setPixelRatio(Math.min(dpr, 1.5))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    /* ฉากนี้นิ่งสนิท มีแต่ texture ลูกศรที่เลื่อน เงาจึงไม่มีวันเปลี่ยน
       ถ้าปล่อย autoUpdate ไว้ เงาทั้งฉากจะถูกคำนวณใหม่ทุกเฟรมที่วาด
       ซึ่งบนมือถือคือต้นตอหลักที่ทำให้เครื่องร้อนและหน่วง */
    renderer.shadowMap.autoUpdate = false
    renderer.shadowMap.needsUpdate = true
    renderer.outputColorSpace = THREE.SRGBColorSpace
    host.appendChild(renderer.domElement)

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
    camera.position.set(...camPos(tilt, turn))
    camera.lookAt(0, 0, 0)

    scene.add(new THREE.HemisphereLight(0xffffff, 0xc9d2e0, 2.1))
    const sun = new THREE.DirectionalLight(0xfff6e8, 2.4)
    sun.position.set(9, 16, 7)
    sun.castShadow = true
    // 2048 เกินจำเป็นสำหรับผังขนาดนี้ 1024 ให้เงาคุณภาพใกล้กันแต่ใช้หน่วยความจำ 1 ใน 4
    sun.shadow.mapSize.set(1024, 1024)
    const sc = sun.shadow.camera
    sc.left = -12
    sc.right = 12
    sc.top = 12
    sc.bottom = -12
    sc.near = 1
    sc.far = 46
    sun.shadow.bias = -0.0012
    sun.shadow.normalBias = 0.02
    scene.add(sun)

    const root = new THREE.Group()
    scene.add(root)

    stateRef.current = { scene, renderer, camera, root, host }

    /* ฉายพิกัดฉาก → เปอร์เซ็นต์ของกรอบ ผ่านเมทริกซ์ของกล้องตัวจริง */
    stateRef.current.project = (gx, gy, lift = 0) => {
      const v = new THREE.Vector3(wx(gx), lift, wx(gy)).project(camera)
      return { left: (v.x * 0.5 + 0.5) * 100, top: (-v.y * 0.5 + 0.5) * 100 }
    }

    const resize = () => {
      const w = host.clientWidth || 320
      const h = height
      /* ต้องให้ three ตั้ง CSS ให้ canvas ด้วย (อาร์กิวเมนต์ที่สามปล่อยเป็น true)
         ถ้าสั่ง false canvas จะใช้ขนาด attribute ดิบซึ่งคูณ devicePixelRatio มาแล้ว
         บนจอ retina มันจึงกว้างเป็นสองเท่าของกรอบและล้นออกไป */
      renderer.setSize(w, h)
      // ครอบให้เห็นผังพอดีกรอบ ปรับตามอัตราส่วนจริงของกล่อง
      /* ครอบกรอบจาก "ขนาดจริงของผังบนจอ" ไม่ใช่ผูกกับความสูงแล้วยืดความกว้างตาม
         ของเดิมพอกล่องกว้าง (จอคอม) กล้องจะถอยออกจนผังเล็กลอยกลางที่ว่าง
         เพราะความกว้างที่มองเห็นโตตาม aspect ไปเรื่อย ๆ โดยไม่มีอะไรจำกัด

         cw/ch คือครึ่งความกว้าง/ความสูงของผังหลังฉายแล้ว เลือกกรอบที่เล็กที่สุด
         ที่ยังคลุมทั้งสองค่า ผังจึงเต็มกรอบเสมอไม่ว่ากล่องจะรูปร่างไหน */
      const { cw, ch } = stateRef.current.fit || { cw: 9, ch: 6 }
      const base = stateRef.current.shift || { x: 0, y: 0 }
      const aspect = w / h
      /* ซูมคือการย่อ/ขยายกรอบที่กล้องมองเห็น กรอบเล็กลง = เห็นใกล้ขึ้น
         กล้องเป็นออร์โธกราฟิก จึงขยับกล้องเข้าออกไม่ได้ ต้องปรับกรอบแทน */
      const z = zoomRef.current || 1
      /* จอใหญ่ควรเห็นผังมากขึ้น ไม่ใช่เห็นเท่าเดิมแต่ตัวอาคารโตขึ้น
         กรอบแนวนอนบนแท็บเล็ตเตี้ยกว่ามือถือ ถ้าไม่ถอยกล้องออก
         จะเห็นอาคารแค่ไม่กี่หลังจากทั้งหมดเก้าหลัง
         อิงเส้นทแยงมุมของกรอบ จะได้ครอบคลุมทั้งจอเตี้ยกว้างและจอสูงแคบ
         จำกัดไว้ที่ 1.35 เท่า เพราะถอยมากกว่านี้อาคารจะเล็กจนอ่านป้ายไม่ออก */
      const screenK = Math.min(1.35, Math.max(1, Math.hypot(w, h) / 820))
      const sx = (Math.max(cw, ch * aspect) * screenK) / z
      const sy = sx / aspect
      /* แปลงพิกเซลที่ลาก เป็นหน่วยฉาก ตามอัตราส่วนของกรอบกล้องกับขนาดจริงของ canvas
         ลากขวา = โลกเลื่อนขวา = กรอบกล้องต้องเลื่อนซ้าย จึงเป็นเครื่องหมายลบ */
      const wppX = (sx * 2) / w
      const wppY = (sy * 2) / h
      /* จำกัดระยะลากไม่ให้เลยขอบผัง ไม่งั้นลากไปเรื่อย ๆ จะเจอแต่พื้นเปล่า
         แล้วผู้ใช้จะหาทางกลับมาที่คณะไม่เจอ

         ตัวเลขนี้เล็กกว่าครึ่งผังจริง (0.74/0.5) โดยตั้งใจ เพราะผังเป็นทรงข้าวหลามตัด
         ถ้าใช้ขอบเขตแบบสี่เหลี่ยมครอบ พอลากไปมุมสุดจะเห็นพื้นเปล่านอกผัง
         ค่านี้คือกรอบที่อยู่ในตัวข้าวหลามตัดจริง ๆ */
      const halfMapX = GRID_N * 0.5
      const halfMapY = GRID_N * 0.34
      const maxPanX = Math.max(0, (halfMapX - sx) / wppX)
      const maxPanY = Math.max(0, (halfMapY - sy) / wppY)
      const pr = panRef.current
      pr.x = Math.max(-maxPanX, Math.min(maxPanX, pr.x))
      pr.y = Math.max(-maxPanY, Math.min(maxPanY, pr.y))
      const sh = {
        x: base.x - pr.x * wppX,
        y: base.y + pr.y * wppY,
      }
      stateRef.current.wpp = { x: wppX, y: wppY }
      /* เลื่อนกรอบไปกลางสิ่งที่สนใจ แทนที่จะยึดกลางผังเสมอ
         ใช้ offset ของกรอบ ไม่ย้ายตัวกล้อง เพราะย้ายกล้องจะเปลี่ยนมุมมองด้วย */
      camera.left = -sx + sh.x
      camera.right = sx + sh.x
      camera.top = sy + sh.y
      camera.bottom = -sy + sh.y
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    }
    stateRef.current.resize = resize

    /* ── เอฟเฟกต์เส้นไหล ──
       เลื่อน texture ไปทางปลายทางเรื่อย ๆ ได้ลูกศรที่วิ่งบอกทิศ
       ลูปทำงานเฉพาะตอนมีเส้นทาง จอที่ไม่มีเส้นจะไม่เสียแรงเครื่องเปล่า ๆ
       และหยุดให้คนที่ตั้งค่าลดการเคลื่อนไหวด้วย */
    const calm = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    let raf = 0
    let lastFrame = 0
    /* ลูปเดิมหมุนตลอดเวลาแม้จอนั้นไม่มีเส้นทางให้วิ่ง เท่ากับกันไม่ให้เครื่องพัก
       และตอนมีเส้นทางก็วาดฉากใหม่ทั้งฉาก 60 ครั้งต่อวินาที ทั้งที่ลูกศรที่ขยับ
       ช้ากว่านั้นมาก 24 เฟรมต่อวินาทีพอให้จุดไหลลื่น
       (15 ประหยัดกว่าแต่ตาจับได้ว่ากระตุก ส่วน 30 ลื่นขึ้นอีกนิดเดียว
        แต่บนมือถือช้า ๆ กินเวลาว่างของเครื่องหายไปเกือบครึ่ง ไม่คุ้มกัน) */
    const FRAME_MS = 1000 / 24
    // ความเร็วจุดคิดเป็น "ช่องต่อวินาที" ไม่ใช่ "ช่องต่อเฟรม"
    // ปรับจำนวนเฟรมขึ้นลงได้โดยจุดไม่ไหลเร็วหรือช้าตาม
    const DOT_PER_SEC = 1.65
    const tick = now => {
      raf = requestAnimationFrame(tick)
      const d = stateRef.current?.dots
      // ไม่มีเส้นทาง แท็บถูกซ่อน หรือผู้ใช้ขอลดการเคลื่อนไหว → ไม่ต้องวาดอะไรเลย
      if (!d || calm?.matches || document.hidden) return
      const dt = now - lastFrame
      if (dt < FRAME_MS) return
      // เฟรมแรกหลังกลับมาที่แท็บ dt จะใหญ่มาก จำกัดไว้ไม่ให้จุดกระโดด
      lastFrame = now
      // จุดไหลไปทางปลายทาง ไม่ใช่ย้อนกลับ
      d.phase += DOT_PER_SEC * (Math.min(dt, 200) / 1000)
      d.place(d.phase)
      renderer.render(scene, camera)
    }
    raf = requestAnimationFrame(tick)
    stateRef.current.stopLoop = () => cancelAnimationFrame(raf)

    /* กลับมาที่แท็บแล้วค่อยเริ่มนับเฟรมใหม่ ไม่งั้นจุดจะกระโดด
       เพราะ timestamp ห่างจากครั้งก่อนเป็นนาที */
    const onVis = () => {
      lastFrame = 0
    }
    document.addEventListener('visibilitychange', onVis)
    stateRef.current.stopVis = () => document.removeEventListener('visibilitychange', onVis)

    const ro = new ResizeObserver(resize)
    ro.observe(host)

    /* ลากเลื่อนผัง
       ใช้ pointer event ตัวเดียวคุมทั้งเมาส์และนิ้ว ไม่ต้องเขียนสองชุด
       setPointerCapture ทำให้ลากออกนอกกรอบแล้วยังลากต่อได้ ไม่หลุดกลางคัน */
    /* ── ซูมด้วยสองนิ้วหรือล้อเมาส์ ──
       เก็บนิ้วที่แตะอยู่ไว้ทั้งหมด เพราะต้องรู้ว่ากำลังใช้กี่นิ้ว
       นิ้วเดียว = ลากเลื่อน สองนิ้ว = ซูม ปนกันไม่ได้ */
    const touches = new Map()
    let pinch = null
    const applyZoom = next => {
      zoomRef.current = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, next))
      stateRef.current?.resize?.()
      // ป้ายต้องฉายใหม่ ไม่ใช่แค่เลื่อน เพราะระยะห่างระหว่างป้ายเปลี่ยนไปตามสเกล
      stateRef.current?.reproject?.()
      setPan({ ...panRef.current })
    }
    const dist = () => {
      const [a, b] = [...touches.values()]
      return Math.hypot(a.x - b.x, a.y - b.y)
    }

    let dragging = false
    let last = null
    const onDown = e => {
      /* ถ้านิ้วลงบนหมุดหรือป้าย อย่าเริ่มลาก
         setPointerCapture จะดูด pointer ไปไว้ที่ตัวผัง เหตุการณ์ที่เหลือรวมถึง
         การตัดสินว่ากดอะไรจึงไม่ไปถึงปุ่มหมุด กดยังไงก็ไม่ติด */
      if (e.target.closest?.('.p3, .p3drop, .p3dot')) return
      touches.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (touches.size === 2) {
        // นิ้วที่สองลง = เลิกลาก เริ่มซูม ไม่งั้นผังจะทั้งเลื่อนทั้งซูมพร้อมกันจนมึน
        dragging = false
        last = null
        pinch = { d: dist(), z: zoomRef.current }
        return
      }
      if (touches.size > 2) return
      dragging = true
      last = { x: e.clientX, y: e.clientY }
      host.setPointerCapture?.(e.pointerId)
      host.classList.add('is-dragging')
    }
    const onMove = e => {
      if (touches.has(e.pointerId)) touches.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (pinch && touches.size === 2) {
        const d = dist()
        if (pinch.d > 0) applyZoom(pinch.z * (d / pinch.d))
        return
      }
      if (!dragging || !last) return
      const dx = e.clientX - last.x
      const dy = e.clientY - last.y
      last = { x: e.clientX, y: e.clientY }
      panRef.current = { x: panRef.current.x + dx, y: panRef.current.y + dy }
      // resize จะจำกัดค่าใน panRef ให้เอง ต้องเรียกก่อนแล้วค่อยอ่านค่าไปเลื่อนชั้นป้าย
      stateRef.current?.resize?.()
      /* ป้ายเป็น HTML วางด้วยเปอร์เซ็นต์ที่คำนวณจากกล้องตอนยังไม่ลาก
         เลื่อนทั้งชั้นด้วย transform จึงตรงกับผังเสมอ และถูกกว่าการฉายใหม่ทุกเฟรม
         (ออร์โธกราฟิกเลื่อนกล้องคือ translate บนจอตรง ๆ ไม่มีเพอร์สเปกทีฟให้เพี้ยน) */
      setPan({ ...panRef.current })
    }
    const onUp = e => {
      touches.delete(e.pointerId)
      if (touches.size < 2) pinch = null
      dragging = false
      last = null
      host.releasePointerCapture?.(e.pointerId)
      host.classList.remove('is-dragging')
    }

    /* ล้อเมาส์และการถ่างนิ้วบนแทร็กแพด (เบราว์เซอร์ส่งมาเป็น wheel + ctrlKey)
       ต้อง preventDefault ไม่งั้นหน้าเว็บจะเลื่อนหรือซูมทั้งหน้าไปด้วย
       และต้องลงทะเบียนแบบ passive: false ถึงจะ preventDefault ได้ */
    const onWheel = e => {
      e.preventDefault()
      applyZoom(zoomRef.current * Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0018)))
    }
    host.addEventListener('wheel', onWheel, { passive: false })
    host.addEventListener('pointerdown', onDown)
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerup', onUp)
    host.addEventListener('pointercancel', onUp)

    return () => {
      stateRef.current?.stopLoop?.()
      stateRef.current?.stopVis?.()
      host.removeEventListener('pointerdown', onDown)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerup', onUp)
      host.removeEventListener('pointercancel', onUp)
      host.removeEventListener('wheel', onWheel)
      ro.disconnect()
      renderer.dispose()
      /* dispose() คืนแค่ทรัพยากรฝั่ง three ไม่ได้ปล่อย WebGL context ของเบราว์เซอร์
         แอปนี้สร้าง Campus3D ใหม่ทุกครั้งที่เปลี่ยนหน้า ถ้าไม่บังคับปล่อย
         context จะค้างสะสมจนชนเพดาน (ราว 16 ตัว) แล้วเบราว์เซอร์จะทิ้งตัวเก่า
         ผังหน้าที่เคยเปิดไว้ก็กลายเป็นจอว่าง และเครื่องก็แบกหน่วยความจำ GPU ไว้เปล่า ๆ */
      renderer.forceContextLoss?.()
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
      scene.traverse(o => {
        if (o.geometry) o.geometry.dispose()
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => m.dispose())
      })
      stateRef.current = null
    }
  }, [height])

  // เติมเนื้อฉากใหม่เมื่อข้อมูลเปลี่ยน
  useEffect(() => {
    const st = stateRef.current
    if (!st) return
    const { root, renderer, scene, camera } = st

    /* เปลี่ยนมุมแค่ขยับกล้อง ไม่รื้อฉากสร้างใหม่
       ถ้าไปผูกมุมไว้กับ effect ที่สร้างฉาก ฉากจะถูกทิ้งแล้วสร้างใหม่ว่าง ๆ
       เพราะ effect ที่เติมอาคารไม่ได้รันตาม ผังจึงหายทั้งแผง */
    camera.position.set(...camPos(tilt, turn))
    camera.lookAt(0, 0, 0)
    camera.updateMatrixWorld()

    // ข้อมูลเปลี่ยน (เช่น เข้าจอเส้นทาง) ให้กลับมาที่กรอบตั้งต้น ไม่ค้างระยะลากของจอก่อน
    panRef.current = { x: 0, y: 0 }
    setPan({ x: 0, y: 0 })

    while (root.children.length) {
      const o = root.children.pop()
      o.traverse?.(c => {
        if (c.geometry) c.geometry.dispose()
        if (c.material) (Array.isArray(c.material) ? c.material : [c.material]).forEach(m => m.dispose())
      })
    }

    const half = GRID_N / 2

    /* ── พื้น ──
       กว้างกว่ากริดมาก เพราะกล้องซูมใกล้แล้วขอบผังต้องอยู่นอกเฟรมเสมอ
       ถ้าพื้นเท่ากริดพอดี จะเห็นขอบเป็นแผ่นลอย อ่านเป็น "โมเดลจำลอง" ไม่ใช่ "เมือง" */
    const ground = new THREE.Mesh(
      new THREE.BoxGeometry(GRID_N * 4, 0.3, GRID_N * 4),
      new THREE.MeshStandardMaterial({ color: 0xf4f7fa, roughness: 0.95 }),
    )
    ground.position.y = -0.15
    ground.receiveShadow = true
    root.add(ground)

    /* สนามหญ้าในใจกลางบล็อก — ตัวอย่างมีพื้นเขียวแทรกระหว่างอาคารเยอะ
       ช่วยให้ผังไม่เป็นสีเทาทั้งแผ่น และแยกบล็อกออกจากถนนได้ด้วยตัวเอง */
    const lawnMat = new THREE.MeshStandardMaterial({ color: 0xdcecd8, roughness: 1 })
    for (let bx = 0; bx < 3; bx++) {
      for (let by = 0; by < 3; by++) {
        const lawn = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.03, 2.9), lawnMat)
        lawn.position.set(wx(bx * BLOCK + 1.5), 0.015, wx(by * BLOCK + 1.5))
        lawn.receiveShadow = true
        root.add(lawn)
      }
    }

    // ── ถนน ── ยกขึ้นนิดเดียวให้เห็นแยกจากพื้น แต่ไม่ลอย
    const roadMat = new THREE.MeshStandardMaterial({ color: 0xd9dee7, roughness: 1 })
    const laneMat = new THREE.MeshStandardMaterial({ color: 0xf4f6fa, roughness: 1 })
    /* ถนนลากยาวเกินขอบกริด เพราะพื้นกว้างกว่ากริดมาก
       ถ้าถนนจบที่ขอบกริดพอดี มุมไกลจะเป็นพื้นเปล่า ๆ ไม่มีอะไรเลย */
    const ROAD_LEN = GRID_N * 3
    for (let st2 = BLOCK - 1; st2 < GRID_N; st2 += BLOCK) {
      const a = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.02, ROAD_LEN), roadMat)
      a.position.set(wx(st2 + 0.5), 0.01, 0)
      a.receiveShadow = true
      root.add(a)
      const b = new THREE.Mesh(new THREE.BoxGeometry(ROAD_LEN, 0.02, 0.62), roadMat)
      b.position.set(0, 0.01, wx(st2 + 0.5))
      b.receiveShadow = true
      root.add(b)
      // เส้นแบ่งเลนแบบประ
      for (let v = 0.4; v < GRID_N; v += 0.9) {
        const d1 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.02, 0.34), laneMat)
        d1.position.set(wx(st2 + 0.5), 0.025, wx(v))
        root.add(d1)
        const d2 = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.02, 0.05), laneMat)
        d2.position.set(wx(v), 0.025, wx(st2 + 0.5))
        root.add(d2)
      }
    }

    /* ── ตึกฉากหลัง ──
       สีจางกว่าตึกในผังเล็กน้อยและไม่มีหน้าต่าง เพื่อให้สายตาแยกออกว่าอันไหนคือคณะ
       ถ้าทำให้เหมือนกันเป๊ะ ผู้ใช้จะพยายามกดตึกที่กดไม่ได้ */
    const outerMats = [0xe9edf2, 0xe4e9ef, 0xeef1f5].map(
      c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.9 }),
    )
    OUTER.forEach(l => {
      const h = l.lv * LEVEL_H
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(l.gw, h, l.gd),
        outerMats[l.tone % outerMats.length],
      )
      m.position.set(wx(l.gx + l.gw / 2), h / 2, wx(l.gy + l.gd / 2))
      m.castShadow = true
      m.receiveShadow = true
      root.add(m)
    })

    // ── อาคาร ──
    const winMat = new THREE.MeshStandardMaterial({ color: 0x93a3bb, roughness: 0.4, metalness: 0.1 })
    report.campusItems.forEach(it => {
      if (it.t !== 'b') return
      const tone = TONE[districtTone[it.district]] || TONE.none
      const h = it.lv * LEVEL_H
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(it.gw, h, it.gd),
        new THREE.MeshStandardMaterial({ color: tone.body, roughness: 0.82 }),
      )
      body.position.set(wx(it.gx + it.gw / 2), h / 2, wx(it.gy + it.gd / 2))
      body.castShadow = true
      body.receiveShadow = true
      root.add(body)

      // ขอบดาดฟ้า — แผ่นบางสีอ่อนกว่า วางทับหลังคา
      const roof = new THREE.Mesh(
        new THREE.BoxGeometry(it.gw * 0.88, 0.05, it.gd * 0.88),
        new THREE.MeshStandardMaterial({ color: tone.roof, roughness: 0.9 }),
      )
      roof.position.set(body.position.x, h + 0.025, body.position.z)
      roof.castShadow = true
      root.add(roof)

      // กล่องบนดาดฟ้า
      if (it.roofBox) {
        const cap = new THREE.Mesh(
          new THREE.BoxGeometry(0.24, 0.22, 0.24),
          new THREE.MeshStandardMaterial({ color: tone.roof, roughness: 0.9 }),
        )
        cap.position.set(body.position.x + it.gw * 0.18, h + 0.16, body.position.z + it.gd * 0.14)
        cap.castShadow = true
        root.add(cap)
      }

      /* แถวหน้าต่างเป็นแผ่นบางแปะบนผนังสองด้านที่กล้องเห็น
         ใช้แผ่นแทนการเจาะผนังจริง เพราะเจาะจริงต้องใช้ CSG ซึ่งหนักเกินจำเป็น
         ที่ระยะกล้องขนาดนี้แยกไม่ออกอยู่แล้ว */
      for (let lv = 0; lv < it.lv; lv++) {
        const y = lv * LEVEL_H + LEVEL_H * 0.55
        const a = new THREE.Mesh(new THREE.BoxGeometry(it.gw * 0.72, LEVEL_H * 0.34, 0.02), winMat)
        a.position.set(body.position.x, y, body.position.z + it.gd / 2 + 0.005)
        root.add(a)
        const b = new THREE.Mesh(new THREE.BoxGeometry(0.02, LEVEL_H * 0.34, it.gd * 0.72), winMat)
        b.position.set(body.position.x + it.gw / 2 + 0.005, y, body.position.z)
        root.add(b)
      }
    })

    // ── ต้นไม้ ──
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8a6a4a, roughness: 1 })
    const leafMats = [0x63bf68, 0x4da256, 0x78cd76].map(
      c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.95 }),
    )
    report.campusItems.forEach(it => {
      if (it.t !== 'g') return
      const r = it.gr * 0.5
      const x = wx(it.gx)
      const z = wx(it.gy)
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.13, r * 0.17, r * 1.2, 6), trunkMat)
      trunk.position.set(x, r * 0.6, z)
      trunk.castShadow = true
      root.add(trunk)
      const mat = leafMats[it.tone % leafMats.length]
      // พุ่มเป็นทรงกลมซ้อนกัน ให้ขอบไม่เรียบเป็นลูกบอล
      ;[
        [0, r * 1.5, 0, r * 0.82],
        [r * 0.42, r * 1.24, r * 0.2, r * 0.56],
        [-r * 0.36, r * 1.3, -r * 0.26, r * 0.5],
        [r * 0.05, r * 1.95, -r * 0.1, r * 0.44],
      ].forEach(([dx, dy, dz, rr]) => {
        const s = new THREE.Mesh(new THREE.SphereGeometry(rr, 10, 8), mat)
        s.position.set(x + dx, dy, z + dz)
        s.castShadow = true
        root.add(s)
      })
    })

    /* ── ความหนาแน่น ──
       ไม่วาดดวงเรืองแล้ว บอกด้วยสีตัวอาคารอย่างเดียว (ดู TONE)
       ดวงเรืองลอยทับทำให้ผังเลอะและกลบทรงอาคารจนดูไม่ออกว่าตึกไหนคือตึกไหน
       ส่วนสีที่ตัวอาคารชี้ตรงไปที่ของจริงที่ผู้ใช้ต้องเดินไป ไม่ต้องแปลอีกชั้น
       (ผังฝั่งคณะยังใช้ดวงเรืองอยู่ เพราะที่นั่นอ่าน "ย่าน" ไม่ใช่ "ตึก") */

    /* ── เส้นทาง ──
       วาดเป็นจุดกลมเรียงตามทาง ไม่ใช่เส้นทึบยาว
       เส้นทึบกินพื้นที่ผังเยอะและบังถนนที่มันวางทับอยู่จนดูไม่ออกว่าเดินตรงไหน
       จุดเว้นระยะอ่านง่ายกว่าและเป็นภาษาที่แผนที่เดินเท้าใช้กันอยู่แล้ว

       ใช้ InstancedMesh ก้อนเดียวแทนการสร้าง mesh ทีละจุด
       จุดมีหลายสิบจุดและขยับทุกเฟรม ถ้าแยกเป็น mesh ละจุดจะกลายเป็น
       draw call หลายสิบครั้งต่อเฟรม ซึ่งเป็นปัญหาเดิมที่เพิ่งแก้ไป */
    if (route && route.points && route.points.length > 1) {
      const v = route.points.map(p => new THREE.Vector3(wx(p.gx), ROUTE_Y, wx(p.gy)))
      const curve = new THREE.CurvePath()
      for (let i = 0; i < v.length - 1; i++) curve.add(new THREE.LineCurve3(v[i], v[i + 1]))

      const len = curve.getLength()
      const count = Math.max(2, Math.round(len / DOT_GAP))

      const dots = new THREE.InstancedMesh(
        new THREE.SphereGeometry(DOT_R, 12, 10),
        new THREE.MeshStandardMaterial({
          color: 0x6d4aff,
          emissive: 0x2a1580,
          emissiveIntensity: 0.3,
          roughness: 0.42,
        }),
        count,
      )
      dots.castShadow = true
      // อย่าให้ mergeByMaterial ไปยุบรวม จุดต้องขยับได้เป็นอิสระ
      dots.userData.keep = true
      dots.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
      root.add(dots)

      /* วางจุดตามระยะทางจริง ไม่ใช่ตามพารามิเตอร์ t ของเส้นโค้ง
         เพราะ CurvePath แบ่ง t เท่า ๆ กันต่อหนึ่งท่อน ท่อนสั้นจะได้จุดถี่กว่าท่อนยาว
         ระยะห่างระหว่างจุดจึงจะไม่สม่ำเสมอถ้าใช้ t ตรง ๆ */
      // สร้างตัวช่วยไว้นอกลูป ฟังก์ชันนี้ถูกเรียกทุกเฟรม การจองวัตถุใหม่ทุกครั้งคือขยะที่ GC ต้องตามเก็บ
      const m = new THREE.Matrix4()
      const at = new THREE.Vector3()
      /* จุดที่ไหลถึงปลายทางต้องวนกลับไปเริ่มใหม่ที่ต้นทาง
         ถ้าย้ายตำแหน่งดื้อ ๆ จะเห็นจุดวาบหายที่ปลายแล้วโผล่ที่ต้นทางทุกรอบ
         ซึ่งคือสิ่งที่ทำให้ดูกระตุก จึงย่อจุดให้เล็กลงจนหายไปก่อนถึงขอบทั้งสองด้าน
         ตาจะเห็นเป็นจุดค่อย ๆ จางเข้าจางออก ไม่ใช่กระโดด */
      const FADE = 0.09
      const place = phase => {
        for (let i = 0; i < count; i++) {
          const d = ((i + phase) % count) / count
          curve.getPointAt(Math.min(0.9999, Math.max(0, d)), at)
          const k = Math.max(0, Math.min(1, Math.min(d, 1 - d) / FADE))
          m.makeScale(k, k, k)
          m.setPosition(at.x, at.y, at.z)
          dots.setMatrixAt(i, m)
        }
        dots.instanceMatrix.needsUpdate = true
      }
      place(0)
      st.dots = { place, phase: 0 }

      // จุดเริ่มต้น
      const ring = new THREE.Mesh(
        new THREE.CylinderGeometry(0.34, 0.34, 0.06, 20),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 }),
      )
      ring.position.copy(v[0])
      root.add(ring)
      const dot = new THREE.Mesh(
        new THREE.CylinderGeometry(0.19, 0.19, 0.09, 16),
        new THREE.MeshStandardMaterial({ color: 0x6d4aff, roughness: 0.4 }),
      )
      dot.position.copy(v[0]).setY(0.11)
      root.add(dot)
    } else {
      st.dots = null
    }

    if (route) {
      const xs = []
      const ys = []
      /* ใช้เมทริกซ์ของกล้องตรง ๆ ไม่เขียนสูตรฉายขึ้นมาเอง
         สูตรที่เขียนเองต้องตรงกับตำแหน่งกล้องเป๊ะ ๆ พอขยับกล้องทีเดียวก็เพี้ยน
         (รอบก่อนใช้ 0.4472 ทั้งที่ค่าจริงคือ -0.5296 ปลายทางเลยหลุดนอกกรอบ)
         พิกัดหลัง matrixWorldInverse คือพิกัดชุดเดียวกับที่ frustum ใช้เทียบพอดี */
      camera.updateMatrixWorld()
      const tmp = new THREE.Vector3()
      const pushPt = (gx, gy, lift = 0) => {
        tmp.set(wx(gx), lift, wx(gy)).applyMatrix4(camera.matrixWorldInverse)
        xs.push(tmp.x)
        ys.push(tmp.y)
      }
      ;(route.points || route.legs.map(l => l.at)).forEach(p => pushPt(p.gx, p.gy))
      // เผื่อความสูงของอาคารปลายทาง ป้ายจะได้ไม่โดนขอบบนตัด
      const pl = route.points || route.legs.map(l => l.at)
      const last = pl[pl.length - 1]
      if (last) pushPt(last.gx, last.gy, 5 * LEVEL_H + 1)
      if (you) pushPt(you.gx, you.gy)
      const padX = 1.8
      const padY = 1.4
      const halfW = Math.max(3, (Math.max(...xs) - Math.min(...xs)) / 2 + padX)
      const halfH = Math.max(2.4, (Math.max(...ys) - Math.min(...ys)) / 2 + padY)
      st.fit = { cw: halfW, ch: halfH }
      // เลื่อนกล้องไปกลางเส้นทาง ไม่ใช่กลางผัง
      const cx = (Math.max(...xs) + Math.min(...xs)) / 2
      const cy = (Math.max(...ys) + Math.min(...ys)) / 2
      st.shift = { x: cx, y: cy }
    } else {
      /* ซูมใกล้กว่าเดิมมาก ให้เห็นอาคารสิบกว่าหลังเต็มเฟรม ไม่ใช่เห็นทั้งผังเป็นเกาะเล็ก
         ผู้ใช้ยืนอยู่ในคณะ เขาสนใจอาคารรอบตัว ไม่ได้ต้องการภาพถ่ายทางอากาศ */
      const k = full ? 0.92 : 0.42
      st.fit = { cw: GRID_N * 0.74 * k, ch: GRID_N * 0.5 * k }
      st.shift = { x: 0, y: 0 }
    }
    mergeByMaterial(root)
    st.resize()
    /* เงาถูกปิด autoUpdate ไว้ จึงต้องสั่งคำนวณใหม่เองทุกครั้งที่ฉากเปลี่ยน
       (เปลี่ยนโหมด เลือกอาคารใหม่ เพิ่มเส้นทาง) ครั้งเดียวต่อการเปลี่ยน ไม่ใช่ทุกเฟรม */
    renderer.shadowMap.needsUpdate = true
    renderer.render(scene, camera)

    /* ฉายตำแหน่งป้ายหลังกล้องถูกตั้งค่าแล้วเท่านั้น ไม่งั้นได้เมทริกซ์เก่า

       ป้ายที่ฉายมาตรง ๆ ทับกันได้ง่ายมาก เพราะอาคารในผังอยู่ใกล้กัน
       และป้ายกว้างกว่าตัวอาคารหลายเท่า จึงต้องไล่วางทีละใบแล้วดันใบที่ชนขึ้นไปหลบ
       ใบไหนดันแล้วยังชนอยู่ ยุบเป็นจุดแทน — ป้ายที่อ่านไม่ออกไม่มีประโยชน์
       และยังไปบังผังที่อยู่ข้างหลังอีก */
    /* ฉายป้ายใหม่ได้ตามต้องการ ไม่ใช่แค่ตอนฉากเปลี่ยน
       การซูมทำให้กรอบกล้องเปลี่ยน ตำแหน่งที่ฉายไว้เดิมจึงใช้ไม่ได้อีก
       (การลากใช้ transform เลื่อนทั้งชั้นเอาได้ แต่การซูมเลื่อนเฉย ๆ ไม่พอ
        เพราะป้ายต้องขยับออกจากกันตามสเกล ไม่ใช่ขยับไปทางเดียวกันทั้งชุด) */
    const reproject = () => {
      const next = {}
      pins.forEach(p => {
        const c = districtCenter(p.district)
        /* ยกป้ายให้พ้นหลังคาที่สูงที่สุดของย่านนั้นพอดี ไม่ใช่ยกเท่ากันหมด
           ย่านที่มีแต่ตึกเตี้ยจะได้ไม่มีป้ายลอยสูงเก้อ */
        const tallest = report.campusItems.reduce(
          (m, i) => (i.t === 'b' && i.district === p.district ? Math.max(m, i.lv) : m),
          1,
        )
        next[p.id] = {
          label: st.project(c.gx, c.gy, tallest * LEVEL_H + 0.45),
          dot: st.project(c.gx, c.gy, 0.1),
        }
      })
      // ยกป้ายให้พ้นหมุดของตัวเอง ไม่งั้นตัวอักษรทับจุดจนอ่านไม่ออก
      if (you)
        next.__you = {
          label: st.project(you.gx, you.gy, 2.6),
          dot: st.project(you.gx, you.gy, 0.15),
        }

      /* ── หลบไม่ให้ป้ายทับกัน ──
         ทำงานบนหน่วยเปอร์เซ็นต์ของกรอบ เพราะป้ายวางด้วยเปอร์เซ็นต์
         ขนาดป้ายประมาณจากจำนวนตัวอักษร (อักษรไทยกว้างกว่าละติน)
         ลำดับความสำคัญ: ตำแหน่งของคุณ > อาคารที่เลือก > ตามอันดับที่ engine จัดมา */
      const box = w => ({ w, h: 7.2 })
      const wOf = p => {
        const t = Math.max((p.label || '').length, (p.sub || '').length)
        return Math.min(46, 9 + t * 2.6)
      }

      const order = []
      if (you && next.__you) order.push({ id: '__you', at: next.__you.label, w: 24 })
      const labelled = pins.filter(p => p.showLabel && next[p.id])
      labelled
        .slice()
        .sort((a, b) => (a.id === activeId ? -1 : b.id === activeId ? 1 : 0))
        .forEach(p => order.push({ id: p.id, at: next[p.id].label, w: wOf(p) }))

      const placed = []
      const hidden = new Set()
      order.forEach(it => {
        const b = box(it.w)
        let top = it.at.top
        const left = it.at.left
        let tries = 0
        const hits = () =>
          placed.some(
            q =>
              Math.abs(q.left - left) < (q.w + b.w) / 2 + 1 &&
              Math.abs(q.top - top) < b.h + 0.6,
          )
        // ดันขึ้นทีละนิดจนพ้น ป้ายอยู่เหนืออาคารอยู่แล้ว ดันขึ้นจึงไม่ไปบังอะไรเพิ่ม
        while (hits() && tries < 14) {
          top -= b.h * 0.85
          tries++
        }
        if (hits() || top < Math.max(5, headroom)) {
          hidden.add(it.id)
          return
        }
        placed.push({ left, top, w: b.w })
        next[it.id] = { ...next[it.id], label: { left, top } }
      })
      next.__hidden = hidden
      setProj(next)
    }
    reproject()
    st.reproject = reproject
  }, [report, districtTone, route, full, pins, you, tilt, turn, activeId, headroom])

  return (
    <div className="c3d" ref={hostRef} style={{ height }}>
      <div className="c3d__pan" style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}>
        <Pins pins={pins} activeId={activeId} you={you} onPick={onPick} proj={proj} />
      </div>
    </div>
  )
}

/* ป้ายเป็น HTML ไม่ใช่วัตถุในฉาก เพราะตัวอักษรไทยใน WebGL ต้องอบเป็น texture
   ซึ่งเบลอตอนซูมและจัดบรรทัดไม่ได้ HTML ทับบนผืนผ้าใบคมกว่าและจัดง่ายกว่ามาก
   ตำแหน่งมาจาก camera.project ของฉากจริง ป้ายจึงเกาะอาคารเสมอ */
function Pins({ pins, activeId, you, onPick, proj }) {
  return (
    <div className="c3d__pins">
      {you && proj.__you && !proj.__hidden?.has('__you') && (
        <>
          <span className="p3drop p3drop--you" style={posStyle(proj.__you.dot || proj.__you.label)}>
            <Drop />
          </span>
          <span className="p3 p3--you" style={posStyle(proj.__you.label)}>
            ตำแหน่งของคุณ
          </span>
        </>
      )}
      {pins.map(p => {
        const at = proj[p.id]
        if (!at) return null
        // ป้ายที่หลบไม่พ้นถูกยุบเป็นจุด ผังจะได้ไม่มีตัวหนังสือทับกัน
        if (!p.showLabel || proj.__hidden?.has(p.id))
          return (
            <button
              key={p.id}
              type="button"
              className={'p3dot p3dot--' + p.tone}
              style={posStyle(at.dot)}
              onClick={onPick ? () => onPick(p.id) : undefined}
              aria-label={p.label}
            />
          )
        return (
          <Fragment key={p.id}>
            {/* หมุดหยดน้ำปักที่ตัวอาคาร คู่กับป้ายที่ลอยอยู่เหนือขึ้นไป
                ป้ายอย่างเดียวบอกไม่ได้ว่าชี้ตึกไหนแน่ เพราะป้ายถูกดึงให้พ้นขอบและพ้นกันเอง */}
            <button
              type="button"
              className={'p3drop p3drop--' + p.tone + (p.id === activeId ? ' is-on' : '')}
              style={posStyle(at.dot)}
              onClick={onPick ? () => onPick(p.id) : undefined}
              aria-label={p.label}
            >
              <Drop />
            </button>
            <button
              type="button"
              className={'p3 p3--card p3--' + p.tone + (p.id === activeId ? ' is-on' : '')}
              style={posStyle(at.label)}
              onClick={onPick ? () => onPick(p.id) : undefined}
            >
              <b>{p.label}</b>
              <small className={'p3--' + p.tone}>{p.sub}</small>
            </button>
          </Fragment>
        )
      })}
    </div>
  )
}

/* ป้ายที่ฉายออกไปนอกกรอบต้องดึงกลับเข้ามา ไม่งั้นโดนขอบตัดครึ่งจนอ่านไม่ออก
   ยอมให้เพี้ยนจากตำแหน่งจริงเล็กน้อย ดีกว่าอ่านไม่ได้เลย */
const posStyle = p => ({
  left: Math.min(Math.max(p.left, 13), 87) + '%',
  top: Math.min(Math.max(p.top, 9), 92) + '%',
})

/** ไล่สีความหนาแน่นเป็น texture — ชุดสีเดียวกับหน้า ORGANIZE */
const GLOW_CACHE = {}
function makeGlow(tier) {
  if (GLOW_CACHE[tier]) return GLOW_CACHE[tier]
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(64, 64, 2, 64, 64, 62)
  const stops =
    tier === 'Hot'
      ? [[0, 'rgba(200,20,13,0.95)'], [0.27, 'rgba(244,78,21,0.88)'], [0.58, 'rgba(253,166,22,0.6)'], [0.85, 'rgba(255,229,88,0.2)'], [1, 'rgba(255,243,180,0)']]
      : [[0, 'rgba(244,82,15,0.88)'], [0.38, 'rgba(253,155,22,0.72)'], [0.72, 'rgba(254,192,29,0.42)'], [1, 'rgba(255,240,168,0)']]
  stops.forEach(([o, col]) => grd.addColorStop(o, col))
  g.fillStyle = grd
  g.fillRect(0, 0, 128, 128)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  GLOW_CACHE[tier] = t
  return t
}


/* ── ยุบ mesh ที่ใช้วัสดุเดียวกันให้เหลือก้อนเดียว ──
   ผังนี้มี mesh แปดร้อยกว่าชิ้นแต่มีสามเหลี่ยมแค่เจ็ดพัน
   แปลว่าต้นทุนไม่ได้อยู่ที่รูปทรง แต่อยู่ที่จำนวนครั้งที่สั่งการ์ดจอวาด
   ซึ่งเป็นงานของ CPU ล้วน ๆ บนมือถือจึงหน่วงแม้ฉากจะเรียบง่าย

   ฉากนี้นิ่งสนิทและไม่มีใครต้องอ้างถึง mesh รายชิ้น (การกดหมุดใช้ HTML ไม่ใช่ raycast)
   จึงยุบรวมได้ทั้งหมดอย่างปลอดภัย เหลือหนึ่งก้อนต่อหนึ่งวัสดุ
   แยกกลุ่มตามการรับ/ทอดเงาด้วย เพราะสองอย่างนี้ตั้งได้ทีละก้อน */
function mergeByMaterial(root) {
  const groups = new Map()
  const victims = []
  root.updateMatrixWorld(true)

  root.traverse(o => {
    if (!o.isMesh || o.isInstancedMesh || Array.isArray(o.material)) return
    if (!o.geometry?.attributes?.position) return
    // ข้ามเส้นนำทาง texture ของมันต้องเลื่อนได้อิสระ
    if (o.userData.keep) return
    const key = o.material.uuid + '|' + (o.castShadow ? 1 : 0) + (o.receiveShadow ? 1 : 0)
    if (!groups.has(key)) groups.set(key, { mat: o.material, cast: o.castShadow, recv: o.receiveShadow, geos: [] })
    const g = o.geometry.clone()
    g.applyMatrix4(o.matrixWorld)
    // ยุบรวมได้เฉพาะรูปทรงที่มีชุด attribute ตรงกัน ตัด attribute ส่วนเกินทิ้งก่อน
    for (const name of Object.keys(g.attributes)) {
      if (name !== 'position' && name !== 'normal' && name !== 'uv') g.deleteAttribute(name)
    }
    if (!g.attributes.uv) {
      const n = g.attributes.position.count
      g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2))
    }
    groups.get(key).geos.push(g)
    victims.push(o)
  })

  victims.forEach(o => o.parent?.remove(o))
  groups.forEach(({ mat, cast, recv, geos }) => {
    if (!geos.length) return
    let geo
    try {
      geo = geos.length === 1 ? geos[0] : mergeGeometries(geos, false)
    } catch {
      geo = null
    }
    // ยุบไม่สำเร็จก็ใส่กลับไปทีละชิ้นตามเดิม ดีกว่าฉากหาย
    if (!geo) {
      geos.forEach(g => {
        const m = new THREE.Mesh(g, mat)
        m.castShadow = cast
        m.receiveShadow = recv
        root.add(m)
      })
      return
    }
    if (geos.length > 1) geos.forEach(g => g.dispose())
    const m = new THREE.Mesh(geo, mat)
    m.castShadow = cast
    m.receiveShadow = recv
    root.add(m)
  })
}

/** หมุดหยดน้ำแบบแผนที่ — วาดเป็น SVG จะได้คมทุกความละเอียด */
function Drop() {
  return (
    <svg viewBox="0 0 24 34" width="18" height="26" aria-hidden="true">
      <path
        d="M12 33C12 33 22 21.5 22 13A10 10 0 0 0 2 13C2 21.5 12 33 12 33Z"
        className="p3drop__body"
      />
      <circle cx="12" cy="13" r="4.2" className="p3drop__eye" />
    </svg>
  )
}


/* ลายลูกศรสำหรับเส้นนำทาง — วาดครั้งเดียวแล้วใช้ซ้ำ
   ลูกศรชี้ไปทางปลายทาง ผู้ใช้จึงรู้ทิศแม้ดูภาพนิ่ง ไม่ต้องรอให้มันวิ่ง */
