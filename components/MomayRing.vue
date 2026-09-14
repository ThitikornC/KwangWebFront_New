<template>
  <!-- วงสัญญาณ MOMAY — ยกมาจากหน้า 02 ของ MomayDemoV2 ให้ใช้ซ้ำได้ทั้งเดโมและหน้าขาย
       ทุกอย่างวาดเองด้วย SVG + CSS ยกเว้นภาพเมืองที่เป็นพื้นหลังในวง -->
  <div class="momay-ring">
    <div class="ring-wrap awakening" :class="{ ready }">
      <div class="ring-bg photo-slot" :style="{ '--bg-photo': `url('${photo}')` }" />

      <!-- โดมโฮโลแกรมกลางวง + อนุภาคเรืองแสง -->
      <div class="holo-dome">
        <span class="dome-core" />
        <span class="dome-arc" />
        <span class="dome-arc a2" />
        <span
          v-for="(pt, i) in HOLO_PARTICLES"
          :key="'pt' + i"
          class="particle"
          :style="{
            left: pt.x + '%', top: pt.y + '%',
            width: pt.size + 'px', height: pt.size + 'px',
            animationDelay: pt.delay + 's',
          }"
        />
      </div>

      <!-- เมืองโฮโลแกรม -->
      <svg class="holo-city" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="holoBld" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#6fe6ff" stop-opacity="0.1" />
            <stop offset="100%" stop-color="#2f9fd6" stop-opacity="0.01" />
          </linearGradient>
          <pattern id="holoWin" width="4" height="5.5" patternUnits="userSpaceOnUse">
            <rect x="1" y="1.4" width="1.7" height="2.1" fill="#bff3ff" opacity="0.16" />
          </pattern>
          <!-- จางลงที่ขอบวง ให้เป็นฉากหลังไม่แย่งสายตา -->
          <radialGradient id="holoFade" cx="0.5" cy="0.58" r="0.55">
            <stop offset="0%" stop-color="#fff" stop-opacity="1" />
            <stop offset="62%" stop-color="#fff" stop-opacity="0.7" />
            <stop offset="100%" stop-color="#fff" stop-opacity="0" />
          </radialGradient>
          <mask id="holoMask">
            <rect x="0" y="0" width="200" height="200" fill="url(#holoFade)" />
          </mask>
        </defs>

        <g mask="url(#holoMask)">
          <!-- พื้นกริดเปอร์สเปกทีฟ -->
          <g class="holo-grid">
            <line v-for="y in HOLO_GROUND" :key="'gy' + y" x1="0" :y1="y" x2="200" :y2="y" />
            <line v-for="x in HOLO_RAYS" :key="'gx' + x" :x1="x" y1="200" x2="100" :y2="HOLO_GROUND_Y" />
          </g>

          <!-- ตึก -->
          <g class="holo-bld">
            <template v-for="b in HOLO_BUILDINGS" :key="'b' + b.x">
              <line
                v-if="b.mast"
                :x1="b.x + b.w / 2" :y1="HOLO_GROUND_Y - b.h"
                :x2="b.x + b.w / 2" :y2="HOLO_GROUND_Y - b.h - b.mast"
              />
              <rect :x="b.x" :y="HOLO_GROUND_Y - b.h" :width="b.w" :height="b.h" fill="url(#holoBld)" />
              <rect :x="b.x" :y="HOLO_GROUND_Y - b.h" :width="b.w" :height="b.h" fill="url(#holoWin)" stroke="none" />
            </template>
          </g>

          <!-- เงาสะท้อนใต้พื้น -->
          <g class="holo-bld holo-reflect">
            <rect
              v-for="b in HOLO_BUILDINGS"
              :key="'r' + b.x"
              :x="b.x" :y="HOLO_GROUND_Y"
              :width="b.w" :height="b.h * 0.4"
              fill="url(#holoBld)"
            />
          </g>
        </g>

        <!-- ลำแสงสแกนกวาดขึ้นลง -->
        <rect class="holo-scan" x="0" y="0" width="200" height="12" mask="url(#holoMask)" />
      </svg>
      <span class="radar" style="animation-delay: 0s" />
      <span class="radar" style="animation-delay: 1.2s" />
      <span class="radar" style="animation-delay: 2.4s" />
      <!-- orbit เป็นกล่องสี่เหลี่ยมที่หมุน กรอบนอกของมันจะพองตอนหมุนถึง 45°
           ถ้าปล่อยไว้จะไปดันความสูงเอกสาร ทำให้สกรอลล์บาร์เกิด-หายเป็นจังหวะจนหน้าเด้งเอง
           จึงครอบด้วยกล่องตัดขอบ (วงกลมหมุนอยู่กับที่ ไม่มีอะไรถูกตัดให้เห็น) -->
      <span class="orbit-shell"><span class="orbit" /></span>

      <svg class="ring-lines" viewBox="0 0 100 100">
        <defs>
          <!-- เส้นต่อเนื่อง ไล่จางจากศูนย์กลางไปเข้มที่โหนด -->
          <linearGradient
            v-for="(n, i) in awakenNodes"
            :key="'g' + n.id"
            :id="gradId(i)"
            gradientUnits="userSpaceOnUse"
            x1="50" y1="50" :x2="n.x" :y2="n.y"
          >
            <stop offset="0%" :stop-color="n.def.color" stop-opacity="0.06" />
            <stop offset="55%" :stop-color="n.def.color" stop-opacity="0.32" />
            <stop offset="100%" :stop-color="n.def.color" stop-opacity="0.8" />
          </linearGradient>
        </defs>

        <line
          v-for="(n, i) in awakenNodes"
          :key="'l' + n.id"
          class="ln"
          x1="50" y1="50" :x2="n.x" :y2="n.y"
          :stroke="`url(#${gradId(i)})`"
        />

        <!-- จุดแสงวิ่งตามเส้นอย่างต่อเนื่อง -->
        <circle
          v-for="(n, i) in awakenNodes"
          :key="'s' + n.id"
          class="spark"
          r="1.15"
          :fill="n.def.color"
        >
          <animateMotion
            :path="`M 50 50 L ${n.x} ${n.y}`"
            dur="2.8s"
            repeatCount="indefinite"
            :begin="`${i * 0.34}s`"
          />
          <animate
            attributeName="opacity"
            dur="2.8s"
            repeatCount="indefinite"
            values="0;1;1;0"
            keyTimes="0;0.14;0.82;1"
            :begin="`${i * 0.34}s`"
          />
        </circle>
      </svg>

      <div class="ring-core">
        <span class="core-halo" />
        <span class="core-en">{{ core[0] }}</span>
        <span class="core-en">{{ core[1] }}</span>
      </div>

      <div
        v-for="(n, i) in awakenNodes"
        :key="n.id"
        class="ring-node"
        :class="{ flip: n.x < 49.5 }"
        :style="{ left: n.x + '%', top: n.y + '%', '--sig': n.def.color, '--i': i }"
      >
        <span class="node-pill"><span class="node-label">{{ n.def.en }}</span></span>
        <span class="node-dot"><Ico :name="n.def.icon" /></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, computed, toRefs } from 'vue'
import { SIGNAL_MAP, type SignalId } from '~/utils/momayDemoV2/model'

const props = withDefaults(defineProps<{
  /** สองบรรทัดที่อยู่กลางวง */
  core?: string[]
  /** ภาพพื้นหลังในวง */
  photo?: string
  /** true = ทุกโหนดสว่างค้าง (ใช้ตอนวิเคราะห์เสร็จ) · false = ไล่ไฮไลต์วนไปเรื่อย ๆ */
  ready?: boolean
}>(), {
  core: () => ['READING', 'SIGNALS'],
  photo: '/momay/demo-bg-04.webp',
  ready: false,
})

const { core, photo, ready } = toRefs(props)

/* id ของ gradient ต้องไม่ซ้ำกัน เผื่อมีวงมากกว่าหนึ่งวงในหน้าเดียว */
const uid = Math.random().toString(36).slice(2, 8)
const gradId = (i: number) => `mrg-${uid}-${i}`

/* ─── ไอคอน ─── */
const ICONS: Record<string, string[]> = {
  user: ['M20 21v-1.8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4V21', 'M12 3.2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z'],
  car: ['M3 13.5 4.6 8.4A2 2 0 0 1 6.5 7h11a2 2 0 0 1 1.9 1.4L21 13.5V18H3v-4.5Z', 'M3 13.5h18', 'M6.5 18v1.5M17.5 18v1.5', 'M6.8 15.7h.01M17.2 15.7h.01'],
  parking: ['M5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13A2.5 2.5 0 0 1 5.5 3Z', 'M9.3 17.5v-11h3.6a3.2 3.2 0 0 1 0 6.4H9.3'],
  bolt: ['M13.5 2.5 4.5 14h6.2l-1.2 7.5L19.5 10h-6.2l.2-7.5Z'],
  trash: ['M3.5 6.5h17', 'M8.5 6.5V4.2h7v2.3', 'M6 6.5 7.1 20a1.5 1.5 0 0 0 1.5 1.4h6.8a1.5 1.5 0 0 0 1.5-1.4L18 6.5', 'M10.2 11v6M13.8 11v6'],
  calendar: ['M5 4.5h14A1.5 1.5 0 0 1 20.5 6v13A1.5 1.5 0 0 1 19 20.5H5A1.5 1.5 0 0 1 3.5 19V6A1.5 1.5 0 0 1 5 4.5Z', 'M3.5 9.5h17', 'M8 2.5v4M16 2.5v4'],
}
const Ico = (p: { name: string }) =>
  h('svg', {
    class: 'ic', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    'stroke-width': 1.7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
  }, (ICONS[p.name] ?? []).map(d => h('path', { d })))
;(Ico as any).props = ['name']

/* ─── ตำแหน่งโหนดรอบวง ─── */
/* People อยู่ 12 นาฬิกา แล้วไล่ตามเข็ม — Traffic บนซ้าย Parking ล่างซ้าย */
const AWAKEN_ORDER: SignalId[] = ['people', 'energy', 'waste', 'events', 'parking', 'traffic']
const RADIUS = 29
const awakenNodes = computed(() =>
  AWAKEN_ORDER.map((id, i) => {
    const a = (-90 + (360 / AWAKEN_ORDER.length) * i) * (Math.PI / 180)
    return {
      id,
      def: SIGNAL_MAP[id],
      x: 50 + RADIUS * Math.cos(a),
      y: 50 + RADIUS * Math.sin(a),
    }
  }),
)

/* ─── เมืองโฮโลแกรมกลางวง (SVG บนกริด 200×200) ─── */
const HOLO_GROUND_Y = 152

/** ตึกในเส้นขอบฟ้า: [x, กว้าง, สูง, มีเสาอากาศ] */
const HOLO_BUILDINGS: { x: number; w: number; h: number; mast?: number }[] = [
  { x: 0, w: 13, h: 16 },
  { x: 15, w: 9, h: 26 },
  { x: 26, w: 15, h: 13 },
  { x: 43, w: 11, h: 31, mast: 7 },
  { x: 56, w: 17, h: 20 },
  { x: 75, w: 10, h: 38, mast: 9 },
  { x: 87, w: 14, h: 23 },
  { x: 103, w: 12, h: 17 },
  { x: 117, w: 16, h: 29, mast: 6 },
  { x: 135, w: 9, h: 15 },
  { x: 146, w: 14, h: 26 },
  { x: 162, w: 11, h: 20 },
  { x: 175, w: 15, h: 14 },
  { x: 192, w: 8, h: 22 },
]

/** เส้นพื้นแนวนอน — ถี่ใกล้ขอบฟ้า ห่างเมื่อเข้าใกล้ผู้ชม */
const HOLO_GROUND = [1, 2, 3, 4, 5, 6].map(i => HOLO_GROUND_Y + i * i * 1.3)

/** เส้นพื้นแนวลึก พุ่งเข้าหาจุดรวมสายตากลางภาพ */
const HOLO_RAYS = Array.from({ length: 13 }, (_, i) => 100 + (i - 6) * 46)

/** จุดอนุภาคในโดมโฮโลแกรม — กระจายด้วยมุมทองให้ไม่จับกลุ่ม */
const HOLO_PARTICLES = Array.from({ length: 24 }, (_, i) => {
  const a = (i * 137.5 * Math.PI) / 180
  const r = 7 + (i % 8) * 2.6
  return {
    x: 50 + r * Math.cos(a),
    y: 50 + r * Math.sin(a) * 0.82,
    size: 2 + (i % 3),
    delay: ((i % 9) * 0.42).toFixed(2),
  }
})
</script>

<style scoped>
.momay-ring { --cyan: #4fd8ff; position: relative; }
.ic { width: 20px; height: 20px; flex: none; }

/* ช่องภาพพื้นหลัง — เปลี่ยนรูปได้ที่ --bg-photo */
.photo-slot {
  --bg-photo: none;
  background-image: var(--bg-photo), var(--photo-fallback);
  background-size: cover, auto;
  background-position: center, center;
  background-repeat: no-repeat, no-repeat;
  --photo-fallback:
    radial-gradient(80% 120% at 30% 0%, rgba(38, 108, 182, 0.34) 0%, transparent 62%),
    radial-gradient(70% 100% at 88% 100%, rgba(79, 216, 255, 0.16) 0%, transparent 60%),
    linear-gradient(160deg, #0c2340 0%, #061426 100%);
}

/* ── วงความสัมพันธ์ (04 / 06) ── */
/* วงเต็มความกว้างเนื้อหา เผื่อที่ให้ป้ายชื่อของโหนดฝั่งขวาไม่ล้นขอบจอ */
.ring-wrap { position: relative; width: 100%; max-width: 404px; margin: 22px auto; aspect-ratio: 1; }
.ring-wrap.relations { max-width: 404px; }
/* วงหน้า 04 — ภาพเมืองอยู่ในวงกลม ขอบไล่จางกลืนพื้นหลัง */
.ring-bg {
  position: absolute; inset: 0; border-radius: 50%;
  --bg-photo: url('/momay/demo-bg-04.webp');
  opacity: 0.62;
  -webkit-mask-image: radial-gradient(closest-side, #000 58%, rgba(0, 0, 0, 0.35) 86%, transparent 100%);
  mask-image: radial-gradient(closest-side, #000 58%, rgba(0, 0, 0, 0.35) 86%, transparent 100%);
}

/* ── โดมโฮโลแกรมกลางวง ── */
.holo-dome { position: absolute; inset: 0; pointer-events: none; }
.holo-dome > * { position: absolute; }
.dome-core {
  left: 50%; top: 50%; width: 130px; height: 130px;
  transform: translate(-50%, -50%); border-radius: 50%;
  background: radial-gradient(closest-side,
    rgba(150, 240, 255, 0.34), rgba(70, 175, 240, 0.16) 48%, transparent 100%);
  animation: domePulse 4.2s ease-in-out infinite;
}
.dome-arc {
  left: 50%; top: 50%; width: 168px; height: 168px;
  transform: translate(-50%, -50%); border-radius: 50%;
  border: 1px solid rgba(130, 225, 255, 0.22);
  border-bottom-color: transparent; border-right-color: transparent;
  animation: spin 18s linear infinite;
}
.dome-arc.a2 {
  width: 210px; height: 210px;
  border-color: rgba(130, 225, 255, 0.14);
  border-top-color: transparent; border-left-color: transparent;
  animation-duration: 26s; animation-direction: reverse;
}
.particle {
  border-radius: 50%; background: #cdf4ff;
  box-shadow: 0 0 8px rgba(140, 230, 255, 0.95);
  animation: particleFloat 5s ease-in-out infinite;
}
@keyframes domePulse {
  0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.07); }
}
@keyframes particleFloat {
  0%, 100% { opacity: 0; transform: translateY(6px); }
  35%, 65% { opacity: 0.95; transform: translateY(-4px); }
}

/* ── เมืองโฮโลแกรมในวง ── */
.holo-city {
  position: absolute; inset: 6%; width: 88%; height: 88%;
  border-radius: 50%; overflow: hidden; pointer-events: none;
  opacity: 0.62;
}
.holo-grid line { stroke: rgba(79, 216, 255, 0.13); stroke-width: 0.45; }
.holo-bld rect { stroke: rgba(120, 232, 255, 0.45); stroke-width: 0.5; }
.holo-bld line { stroke: rgba(150, 240, 255, 0.42); stroke-width: 0.45; }
.holo-reflect { opacity: 0.18; }
.holo-scan {
  fill: rgba(120, 232, 255, 0.1);
  animation: holoScan 7s ease-in-out infinite;
}
@keyframes holoScan {
  0%, 100% { transform: translateY(4px); opacity: 0; }
  18% { opacity: 1; }
  82% { opacity: 1; }
  50% { transform: translateY(184px); }
}
.ring-lines { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
/* เส้นเชื่อมต่อเนื่อง ไล่เฉดสีตามโหนด ไม่ใช้เส้นประ */
.ring-lines .ln { stroke-width: 0.55; stroke-linecap: round; }
.ring-lines.web .ln { stroke-width: 0.45; }
.ring-lines .ln.cross { stroke-dasharray: 2 2.4; opacity: 0.65; }
.ring-lines .rel-arrow { stroke-linecap: butt; }
.ring-lines .rel-arrow { shape-rendering: geometricPrecision; }
.ring-lines .rel-arrow.near { stroke: #41e0a3; stroke-width: 0.8; }
.ring-lines .rel-arrow.far  { stroke: #6fe0ff; stroke-width: 1; }
.ring-lines .rel-arrow.link { stroke: #6fe0ff; stroke-width: 0.8; }
.ring-lines .rel-arrow.web  { stroke: #5f89ab; stroke-width: 0.55; opacity: 0.75; }

/* ประกายข้อมูลวิ่งไปตามเส้น — pathLength=100 ทำให้ยาวเท่ากันทุกเส้นไม่ว่าเส้นจริงจะสั้นยาวแค่ไหน */
.ring-lines .rel-flow {
  fill: none; stroke-linecap: round;
  stroke-dasharray: 10 90; stroke-dashoffset: 100;
  animation: relFlow 2.6s linear infinite;
}
.ring-lines .rel-flow.near { stroke: #b9ffe4; stroke-width: 0.8; }
.ring-lines .rel-flow.far  { stroke: #d6f7ff; stroke-width: 1; }
.ring-lines .rel-flow.link { stroke: #d6f7ff; stroke-width: 0.8; }
@keyframes relFlow {
  0% { stroke-dashoffset: 100; opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}

/* จุดแสงข้อมูลวิ่งไปตามเส้น */
.ring-lines .spark { filter: drop-shadow(0 0 1.6px currentColor); }

/* คลื่นเรดาร์แผ่ออกจากศูนย์กลาง */
.radar {
  position: absolute; left: 50%; top: 50%; border-radius: 50%;
  border: 1px solid rgba(79, 216, 255, 0.4); transform: translate(-50%, -50%);
  animation: radar 3.6s ease-out infinite; pointer-events: none;
}
@keyframes radar {
  0% { width: 12%; height: 12%; opacity: 0.85; }
  100% { width: 94%; height: 94%; opacity: 0; }
}

/* วงโคจรเส้นประ + จุดเดินรอบวง */
/* กันไม่ให้กรอบของ .orbit ที่หมุนอยู่ไปเพิ่มพื้นที่สกรอลล์ของหน้า */
.orbit-shell { position: absolute; inset: 0; border-radius: 50%; overflow: hidden; pointer-events: none; }
.orbit {
  position: absolute; inset: 5%; border-radius: 50%;
  border: 1px dashed rgba(79, 216, 255, 0.2);
  animation: spin 28s linear infinite; pointer-events: none;
}
.orbit.slow { inset: 2%; animation-duration: 46s; animation-direction: reverse; }
.orbit::before {
  content: ''; position: absolute; top: -4px; left: 50%; margin-left: -4px;
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--cyan); box-shadow: 0 0 14px var(--cyan);
}

.ring-core {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  font-size: 20px; font-weight: 300; letter-spacing: 0.16em;
  color: #eaf9ff; text-align: center; white-space: nowrap;
  text-shadow:
    0 0 10px rgba(170, 240, 255, 0.9),
    0 0 26px rgba(79, 216, 255, 0.6),
    0 2px 16px rgba(0, 0, 0, 0.8);
}
.core-en { position: relative; z-index: 1; }
.core-halo {
  position: absolute; z-index: 0; left: 50%; top: 50%; width: 178px; height: 178px;
  transform: translate(-50%, -50%); border-radius: 50%;
  border: 1px solid rgba(79, 216, 255, 0.26);
  /* ฉากมืดบาง ๆ ให้ตัวหนังสือกลางวงอ่านออกแม้มีเมืองอยู่ข้างหลัง */
  background: radial-gradient(closest-side, rgba(3, 11, 24, 0.88), rgba(3, 11, 24, 0.35) 72%, rgba(3, 11, 24, 0));
  box-shadow: inset 0 0 34px rgba(79, 216, 255, 0.16), 0 0 26px rgba(79, 216, 255, 0.1);
  animation: breathe 3.4s ease-in-out infinite;
}
@keyframes breathe {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.75; }
  50% { transform: translate(-50%, -50%) scale(1.08); opacity: 1; }
}

/* กล่องของโหนด = วงไอคอนพอดี (ป้ายชื่อลอยออกไปข้าง ๆ แบบ absolute)
   เพื่อให้จุดกึ่งกลางโหนดตรงกับปลายเส้นเชื่อมพอดี */
.ring-node {
  --dot: 52px;
  position: absolute; transform: translate(-50%, -50%);
  display: block; line-height: 0;
  /* ป้ายชื่อต้องไม่ตัดบรรทัดแม้โหนดอยู่ชิดขอบวง */
  white-space: nowrap;
  animation: nodeIn 0.55s cubic-bezier(0.2, 0.9, 0.3, 1.3) backwards;
  animation-delay: calc(var(--i, 0) * 0.09s);
}
/* แคปซูลชื่อ — ยื่นออกไปทางขวา ซ้อนอยู่ใต้วงไอคอน */
.node-pill {
  position: absolute; left: 50%; top: 50%; z-index: 1;
  transform: translateY(-50%);
  display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 1px;
  padding: 8px 13px 8px calc(var(--dot) / 2 + 12px);
  border-radius: 999px;
  background: rgba(5, 16, 31, 0.86);
  border: 1px solid color-mix(in srgb, var(--sig) 52%, transparent);
  box-shadow:
    0 0 20px color-mix(in srgb, var(--sig) 20%, transparent),
    inset 0 0 20px rgba(4, 14, 28, 0.55);
  line-height: 1.25;
}
/* โหนดฝั่งซ้าย (Parking / Traffic) ให้ป้ายชื่ออยู่ทางซ้ายของไอคอน ชี้ออกนอกวง */
.ring-node.flip .node-pill {
  left: auto; right: 50%;
  align-items: flex-end;
  padding: 8px calc(var(--dot) / 2 + 12px) 8px 13px;
}
@keyframes nodeIn {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.55); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}
.node-dot {
  position: relative; z-index: 2;
  display: grid; place-items: center;
  width: var(--dot); height: var(--dot); border-radius: 50%;
  color: var(--sig); background: rgba(4, 14, 28, 0.94);
  border: 1.5px solid var(--sig); box-shadow: 0 0 16px color-mix(in srgb, var(--sig) 45%, transparent);
}
.node-dot :deep(.ic) { width: calc(var(--dot) * 0.5); height: calc(var(--dot) * 0.5); }
.node-label { font-size: 11.5px; font-weight: 600; color: #eaf5ff; white-space: nowrap; }
.node-val { font-size: 12px; font-weight: 700; color: var(--sig); }

.awakening .node-dot {
  animation: nodeTurn 13.2s ease-in-out infinite;
  animation-delay: calc(var(--i, 0) * 2.2s);
}
@keyframes nodeTurn {
  0% { transform: scale(1); opacity: 0.6; box-shadow: 0 0 8px color-mix(in srgb, var(--sig) 25%, transparent); }
  4% { transform: scale(1.22); opacity: 1; box-shadow: 0 0 28px color-mix(in srgb, var(--sig) 75%, transparent); }
  13% { transform: scale(1.22); opacity: 1; box-shadow: 0 0 28px color-mix(in srgb, var(--sig) 75%, transparent); }
  17%, 100% { transform: scale(1); opacity: 0.6; box-shadow: 0 0 8px color-mix(in srgb, var(--sig) 25%, transparent); }
}

/* แสงวิ่งรอบขอบวงของไอคอนที่กำลังถูกไฮไลต์
   conic-gradient หมุนรอบตัว + mask เจาะกลางให้เหลือเฉพาะวงแหวนบาง ๆ */
.awakening .node-dot::after {
  content: ''; position: absolute; inset: -4px; border-radius: 50%;
  pointer-events: none; opacity: 0;
  background: conic-gradient(from 0deg,
    transparent 0deg 232deg,
    color-mix(in srgb, var(--sig) 55%, transparent) 300deg,
    color-mix(in srgb, var(--sig) 90%, #ffffff) 352deg,
    transparent 360deg);
  -webkit-mask: radial-gradient(closest-side, transparent calc(100% - 3.5px), #000 calc(100% - 3px));
  mask: radial-gradient(closest-side, transparent calc(100% - 3.5px), #000 calc(100% - 3px));
  animation: sweepSpin 1.1s linear infinite, sweepOn 13.2s linear infinite;
  animation-delay: 0s, calc(var(--i, 0) * 2.2s);
}
@keyframes sweepSpin { to { transform: rotate(1turn); } }
@keyframes sweepOn {
  0% { opacity: 0; }
  4% { opacity: 1; }
  14% { opacity: 1; }
  17%, 100% { opacity: 0; }
}
/* วิเคราะห์เสร็จ — ทุกโหนดสว่างค้าง วงโคจรหมุนเร็วขึ้นสั้น ๆ */
.ring-wrap.ready .node-dot {
  animation: none; opacity: 1; transform: none;
  box-shadow: 0 0 24px color-mix(in srgb, var(--sig) 70%, transparent);
}
.ring-wrap.ready .node-dot::after { animation: none; opacity: 0; }
.ring-wrap.ready .core-halo { border-color: rgba(52, 211, 153, 0.45); box-shadow: inset 0 0 40px rgba(52, 211, 153, 0.18); }
</style>
