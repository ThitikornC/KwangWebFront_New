<!--
  KWANG UNLIMITED — หน้าแรกชุดใหม่ (/home2)

  หน้าเดิม (/ และ /home) ไม่ถูกแตะ หน้านี้เป็นอีกทางเลือกที่วางคู่กันไว้
  ปลายทางของเมนูยกมาจาก pages/index.vue ชุดเดียวกัน แก้ที่นั่นแล้วต้องตามมาแก้ที่นี่

  ── ไฟล์ภาพที่หน้านี้รอ ──

      public/home2/momay-enlightenment.png  — ตราคำว่า MOMAY ENLIGHTENMENT (ต้องพื้นใส)
      public/home2/plate-left.webp          — ภาพสลักฝั่งซ้าย  (ตัวแปร --plate-left)
      public/home2/plate-right.webp         — ภาพสลักฝั่งขวา   (ตัวแปร --plate-right)

  ตราคำว่า MOMAY เป็น <img> ถ้าไฟล์ยังไม่ถูกวางจะตกไปใช้ตราแบบตัวอักษรแทนอัตโนมัติ
  (ดู logoFailed) หัวเรื่องจึงไม่มีทางกลายเป็นช่องว่าง
  ส่วนภาพสลักสองใบเป็น background ไม่มีไฟล์ก็แค่ว่างไว้ ไม่ขึ้นไอคอนรูปแตก

  ลายเส้นเชิงเรขาคณิต (วงโคจร ดวงอาทิตย์ ดาว ลูกโลก) วาดเป็น inline SVG ในไฟล์นี้ ไม่ต้องหาไฟล์เพิ่ม
-->
<template>
  <div class="kw">
    <!-- ── ฉากหลัง: กระดาษ + เกรน + ขอบมืด ── -->
    <div class="kw__paper" aria-hidden="true" />
    <div class="kw__grain" aria-hidden="true" />

    <!-- ── ภาพสลัก (ไฟล์ที่จะวางทีหลัง) ── -->
    <div class="plate plate--left" aria-hidden="true" />
    <div class="plate plate--right" aria-hidden="true" />

    <!-- ── ระบบวงโคจร: เต็มหน้า วางศูนย์กลางไว้ฝั่งขวาตามแบบ ── -->
    <svg class="orbits" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="kwSunGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stop-color="#e8c56a" stop-opacity="0.5" />
          <stop offset="60%" stop-color="#e8c56a" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#e8c56a" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- วงโคจรเอียงคนละมุม ตัดกันเป็นตาข่ายบาง ๆ -->
      <g class="orbits__ring">
        <ellipse cx="1150" cy="470" rx="470" ry="200" transform="rotate(-18 1150 470)" />
        <ellipse cx="1150" cy="470" rx="370" ry="330" transform="rotate(12 1150 470)" />
        <ellipse cx="1150" cy="470" rx="250" ry="245" />
        <ellipse cx="1150" cy="470" rx="620" ry="430" transform="rotate(-6 1150 470)" />
      </g>

      <!-- เส้นโค้งยาวที่พาดข้ามไปถึงฝั่งซ้ายของหน้า -->
      <g class="orbits__arc">
        <path d="M -60 120 C 320 -40 900 40 1420 300" />
        <path d="M -60 760 C 300 980 880 960 1500 690" />
        <path d="M 120 -30 C 40 320 120 700 360 1030" />
      </g>

      <!-- จุดบนวงโคจร — แดงเป็นตัวเน้น ทองเป็นตัวประกอบ -->
      <g class="orbits__dot">
        <circle cx="1080" cy="222" r="9" class="is-red" />
        <circle cx="1430" cy="258" r="8" class="is-red" />
        <circle cx="1196" cy="742" r="9" class="is-red" />
        <!-- ไม่มีจุดฝั่งซ้ายแล้ว — ครึ่งซ้ายของหน้าเป็นคอลัมน์ข้อความ จุดไปทับตัวหนังสือพอดี
             จุดเน้นทั้งหมดจึงอยู่ฝั่งขวาที่เป็นพื้นที่ของวงโคจร -->
        <circle cx="982" cy="300" r="5" class="is-gold" />
        <circle cx="1288" cy="306" r="5" class="is-gold" />
        <circle cx="1160" cy="330" r="4" class="is-gold" />
        <circle cx="900" cy="500" r="5" class="is-gold" />
        <circle cx="1402" cy="520" r="5" class="is-gold" />
        <circle cx="1052" cy="666" r="5" class="is-gold" />
      </g>

      <!-- ดาวสี่แฉกแบบภาพสลัก -->
      <g class="orbits__star">
        <path d="M1322 150 l7 20 20 7 -20 7 -7 20 -7 -20 -20 -7 20 -7 z" />
        <path d="M1498 402 l6 17 17 6 -17 6 -6 17 -6 -17 -17 -6 17 -6 z" />
        <path d="M878 676 l5 15 15 5 -15 5 -5 15 -5 -15 -15 -5 15 -5 z" />
      </g>

      <!-- ลูกโลกลายเส้น (เส้นรุ้ง-เส้นแวง) -->
      <g class="orbits__globe" transform="translate(1452 612)">
        <circle r="62" />
        <path d="M-62 0 H62 M-56 -26 H56 M-56 26 H56" />
        <ellipse rx="24" ry="62" />
        <ellipse rx="46" ry="62" />
      </g>

      <!-- ดวงอาทิตย์หน้าคน — ใจกลางของทั้งระบบ -->
      <g class="sun" transform="translate(1150 470)">
        <circle class="sun__glow" r="180" fill="url(#kwSunGlow)" />

        <!-- รัศมี: แฉกยาวสลับแฉกสั้นรอบวง -->
        <g class="sun__rays">
          <path
            v-for="r in SUN_RAYS"
            :key="r.a"
            :d="r.d"
            :transform="`rotate(${r.a})`"
          />
        </g>

        <circle class="sun__disc" r="52" />
        <!-- หน้า: คิ้ว-ตา-จมูก-ปาก แบบลายเส้นน้อยเส้น -->
        <g class="sun__face">
          <path d="M-30 -14 q10 -9 20 -1" />
          <path d="M10 -15 q10 -8 20 1" />
          <circle cx="-20" cy="-2" r="4.2" class="is-fill" />
          <circle cx="20" cy="-2" r="4.2" class="is-fill" />
          <path d="M0 -6 q-5 14 -1 20 q4 3 8 -1" />
          <path d="M-17 26 q17 14 34 -2" />
        </g>
      </g>
    </svg>

    <!-- ══════════════ แถบบน ══════════════ -->
    <header class="topbar">
      <a class="brand" href="/" aria-label="KWANG UNLIMITED — หน้าแรก">
        <span class="brand__mark" aria-hidden="true">
          <img src="/kwang_logo.png" alt="" />
        </span>
        <span class="brand__name">
          <span class="brand__line1">KWANG</span>
          <span class="brand__line2">UNLIMITED</span>
        </span>
      </a>

      <span class="topbar__rule" aria-hidden="true" />

      <button
        type="button"
        class="navtoggle"
        :aria-expanded="navOpen"
        aria-controls="kw-nav"
        @click="navOpen = !navOpen"
      >
        <span :class="{ on: navOpen }" />
        <span class="sr-only">{{ navOpen ? 'ปิดเมนู' : 'เปิดเมนู' }}</span>
      </button>

      <nav id="kw-nav" class="nav" :class="{ open: navOpen }">
        <template v-for="n in NAV" :key="n.label">
          <button
            v-if="n.contact"
            type="button"
            class="nav__link"
            @click="openContact"
          >{{ n.label }}</button>
          <a
            v-else
            class="nav__link"
            :class="{ 'is-on': n.active }"
            :href="n.href"
            @click="navOpen = false"
          >{{ n.label }}</a>
        </template>
      </nav>
    </header>

    <!-- ══════════════ ฮีโร่ ══════════════ -->
    <main class="hero">
      <div class="hero__copy">
        <!-- ตราคำว่า MOMAY ENLIGHTENMENT
             มีไฟล์โลโก้ (ดูหัวไฟล์) → ใช้ไฟล์ · ยังไม่มีไฟล์/โหลดไม่ขึ้น → ตกมาที่ตัวอักษร
             จะได้ไม่มีจังหวะไหนที่หัวเรื่องหายไปทั้งก้อน -->
        <h1 class="wordmark">
          <span v-if="!logoFailed" class="wordmark__crop">
            <img
              class="wordmark__img"
              :src="LOGO_SRC"
              alt="MOMAY ENLIGHTENMENT"
              @error="logoFailed = true"
            />
          </span>

          <span v-else class="wordmark__text">
            <span class="sr-only">MOMAY Enlightenment</span>
            <span class="wm-word" aria-hidden="true">
              <span class="wm-m">
                <span class="wm-m__quill" />
                M
              </span>OMAY
            </span>
            <span class="wm-sub" aria-hidden="true">ENLIGHTENMENT</span>
          </span>
        </h1>

        <span class="hr" aria-hidden="true" />

        <p class="kicker">A BEHAVIORAL INTELLIGENCE PLATFORM</p>
        <p class="kicker-th font-th">แพลตฟอร์มอัจฉริยะที่เข้าใจพฤติกรรมและความสัมพันธ์</p>

        <h2 class="claim">
          <span>SEE WHAT MATTERS.</span>
          <span>UNDERSTAND WHY.</span>
          <span>ANTICIPATE WHAT COMES NEXT.</span>
        </h2>

        <p class="claim-th font-th">
          เห็นสิ่งสำคัญ <i aria-hidden="true">•</i> เข้าใจเหตุผล <i aria-hidden="true">•</i> มองเห็นสิ่งที่จะเกิดขึ้นต่อไป
        </p>

        <div class="cta">
          <a class="btn btn--solid" href="/renewablesort/MomayforSaleV2">EXPLORE MOMAY</a>
          <a class="btn btn--ghost" href="/home">VIEW OUR WORK</a>
        </div>
      </div>
    </main>

    <!-- ══════════════ แถบล่าง: สี่จังหวะของ MOMAY ══════════════ -->
    <footer class="rail">
      <ul class="rail__steps">
        <li v-for="(s, i) in STEPS" :key="s">
          <span class="rail__label">{{ s }}</span>
          <span v-if="i < STEPS.length - 1" class="rail__line" aria-hidden="true" />
        </li>
      </ul>

      <!-- ลูกศรเป็นของตกแต่งตามแบบ ไม่ใช่ปุ่ม — หน้านี้จบใน 1 จอ ไม่มีอะไรให้เลื่อนไปหา
           ถ้าวันหลังมีเนื้อหาต่อท้าย ค่อยเปลี่ยนกลับเป็น <button> แล้วผูก scroll -->
      <span class="rail__down" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 8.5 12 15.5 19 8.5" />
        </svg>
      </span>
    </footer>

    <!-- ══════════════ เบอร์ติดต่อ ══════════════ -->
    <Teleport to="body">
      <Transition name="ct">
        <div v-if="showContact" class="ct-mask" @click.self="showContact = false">
          <div class="ct-card" role="dialog" aria-modal="true" aria-labelledby="kw-ct-title">
            <button type="button" class="ct-x" aria-label="ปิด" @click="showContact = false">×</button>
            <h2 id="kw-ct-title" class="ct-title">CONTACT</h2>
            <a v-for="c in CONTACTS" :key="c.tel" class="ct-item" :href="`tel:${c.tel}`">
              <span class="ct-tel">{{ c.tel }}</span>
              <span class="ct-name font-th">({{ c.name }})</span>
            </a>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

definePageMeta({ layout: false })

useHead({
  title: 'KWANG UNLIMITED — MOMAY Enlightenment',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href:
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&' +
        'family=Montserrat:wght@400;500;600;800;900&' +
        'family=Noto+Sans+Thai:wght@300;400;500;600&display=swap',
    },
  ],
  // สีกระดาษต้องไปถึงขอบจอ ไม่งั้นเวลาเด้ง (overscroll) จะเห็นพื้นขาวของเบราว์เซอร์
  style: [{ children: 'html,body{background:#f6f1e6 !important;}' }],
})

useSeoMeta({
  title: 'KWANG UNLIMITED — MOMAY Enlightenment',
  description: 'แพลตฟอร์มอัจฉริยะที่เข้าใจพฤติกรรมและความสัมพันธ์ — เห็นสิ่งสำคัญ เข้าใจเหตุผล มองเห็นสิ่งที่จะเกิดขึ้นต่อไป',
  ogTitle: 'KWANG UNLIMITED — MOMAY Enlightenment',
  ogDescription: 'SEE WHAT MATTERS. UNDERSTAND WHY. ANTICIPATE WHAT COMES NEXT.',
  ogImage: '/kwang_logo.png',
})

/* ── เมนู — ปลายทางชุดเดียวกับหน้าแรกเดิม (pages/index.vue) ── */
const NAV = [
  { label: 'ABOUT',            href: '/valueProposition' },
  { label: 'PROJECTS',         href: '/home' },
  { label: 'FORWARD THINKING', href: '/renewable' },
  { label: 'MOMAY',            href: '/renewablesort/MomayforSaleV2', active: true },
  { label: 'CONTACT',          contact: true },
] as { label: string; href?: string; active?: boolean; contact?: boolean }[]

const STEPS = ['SEE', 'UNDERSTAND', 'ANTICIPATE', 'SIMULATE']

const CONTACTS = [
  { name: 'จ๊อบ', tel: '0839549743' },
  { name: 'ไอซ์', tel: '0888150287' },
]

/* ── รัศมีดวงอาทิตย์ — แฉกยาวสลับแฉกสั้น เรียงรอบวงทีละ 15 องศา
      วาดจากสูตรเพื่อให้เว้นระยะเท่ากันเป๊ะ เขียนมือ 24 แฉกแล้วมักเบี้ยว ── */
const SUN_RAYS = Array.from({ length: 24 }, (_, i) => {
  const long = i % 2 === 0
  const base = 58
  const tip = long ? 112 : 84
  const half = long ? 7.5 : 4.5
  return {
    a: i * 15,
    d: `M ${-half} ${-base} L 0 ${-tip} L ${half} ${-base} Z`,
  }
})

/** ตราคำว่า MOMAY — ผูก src เป็นตัวแปร ไม่ใส่พาธตรง ๆ ใน template
    เพราะตอน build ตัวรวมไฟล์จะพยายาม resolve พาธในแอตทริบิวต์ src แล้ว build พังถ้ายังไม่มีไฟล์ */
const LOGO_SRC = '/home2/momay-enlightenment.png'

/** ไฟล์โลโก้ยังไม่ถูกวาง (หรือโหลดไม่ขึ้น) → ตกมาใช้ตราแบบตัวอักษรแทน
    หน้าจะได้ไม่มีช่องว่างตรงหัวเรื่องระหว่างที่ยังไม่มีไฟล์ */
const logoFailed = ref(false)

/* ── เบอร์ติดต่อ ── */
const showContact = ref(false)
const navOpen = ref(false)

function openContact() {
  navOpen.value = false
  showContact.value = true
}

function onKeydown(e: KeyboardEvent) {
  if (e.key !== 'Escape') return
  showContact.value = false
  navOpen.value = false
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
.kw {
  --paper: #f6f1e6;
  --paper-2: #fbf7ee;
  --ink: #1d1b19;
  --ink-soft: #4a443d;
  --ink-dim: #7a7267;
  --red: #a01c24;
  --red-bright: #c22a30;
  --gold: #c2a468;
  --gold-soft: #d8c49a;

  /* ระยะขอบซ้าย-ขวาของทั้งหน้า — เส้นคั่นอ้างค่านี้ ปลายเส้นจะได้ตรงกับขอบเนื้อหาพอดี */
  --gut: clamp(18px, 3.4vw, 54px);

  --plate-left: url('/home2/plate-left.webp');
  --plate-right: url('/home2/plate-right.webp');

  /* หน้านี้ต้องจบใน 1 จอ ไม่มีสกรอลล์ — ความสูงจึงตายตัวที่ความสูงจอ
     แล้วให้ทุกอย่างข้างในย่อตาม svh ด้วย (ไม่ใช่ย่อตาม vw อย่างเดียว)
     ไม่งั้นจอเตี้ย-กว้าง เช่น 1280×720 ตัวหนังสือจะใหญ่จนดันแถบล่างตกขอบ */
  position: relative;
  height: 100vh;
  height: 100svh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--paper);
  color: var(--ink);
  font-family: 'Montserrat', system-ui, sans-serif;
}

.font-th { font-family: 'Noto Sans Thai', 'Montserrat', sans-serif; }

.sr-only {
  position: absolute; width: 1px; height: 1px; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap;
}

/* ── ฉากหลัง ───────────────────────────────────────────── */

/* ไล่สีให้กลางหน้าสว่างกว่าขอบ เหมือนกระดาษที่โดนแสงตรงกลาง */
.kw__paper {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background:
    radial-gradient(120% 90% at 50% 40%, var(--paper-2) 0%, var(--paper) 58%, #efe7d8 100%);
}

/* เกรนกระดาษ — SVG noise ทับแบบ multiply บาง ๆ ไม่ใช่ texture ไฟล์ใหญ่ */
.kw__grain {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  opacity: 0.055; mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ── ภาพสลักสองฝั่ง ── */
.plate {
  position: absolute; top: 0; bottom: 0; z-index: 2; pointer-events: none;
  background-repeat: no-repeat;
  background-size: contain;
  /* จางลงและเป็นโทนเดียวกับหมึกบนกระดาษ ไม่ให้แย่งตัวหนังสือ */
  opacity: 0.5;
  mix-blend-mode: multiply;
}
.plate--left {
  left: 0; width: min(30vw, 420px);
  background-image: var(--plate-left);
  background-position: left center;
  -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 52%, transparent 100%);
  mask-image: linear-gradient(90deg, #000 0%, #000 52%, transparent 100%);
}
.plate--right {
  right: 0; width: min(38vw, 620px);
  background-image: var(--plate-right);
  background-position: right center;
  -webkit-mask-image: linear-gradient(270deg, #000 0%, #000 60%, transparent 100%);
  mask-image: linear-gradient(270deg, #000 0%, #000 60%, transparent 100%);
}

/* ── ระบบวงโคจร ── */
.orbits {
  position: absolute; inset: 0; z-index: 3; pointer-events: none;
  width: 100%; height: 100%;
}
.orbits__ring ellipse,
.orbits__arc path {
  fill: none;
  stroke: var(--gold);
  stroke-width: 1.1;
  opacity: 0.55;
}
.orbits__arc path { opacity: 0.35; }
.orbits__dot circle { opacity: 0.9; }
.orbits__dot .is-red { fill: var(--red-bright); }
.orbits__dot .is-gold { fill: var(--gold); opacity: 0.75; }
.orbits__star path { fill: none; stroke: var(--gold); stroke-width: 1.2; opacity: 0.7; }
.orbits__globe circle,
.orbits__globe ellipse,
.orbits__globe path {
  fill: none; stroke: var(--gold); stroke-width: 1.1; opacity: 0.45;
}

.sun__rays path {
  fill: var(--gold);
  opacity: 0.62;
}
.sun__disc {
  fill: var(--paper-2);
  stroke: var(--gold);
  stroke-width: 1.4;
}
.sun__face path {
  fill: none; stroke: #9a7f45; stroke-width: 2; stroke-linecap: round;
}
.sun__face .is-fill { fill: #9a7f45; }

/* หมุนช้ามาก — เห็นว่าไม่ใช่ภาพนิ่ง แต่ไม่ดึงสายตาออกจากตัวหนังสือ */
.sun__rays { animation: kwSpin 220s linear infinite; transform-origin: 0 0; }
.orbits__ring { animation: kwDrift 26s ease-in-out infinite alternate; transform-origin: 1150px 470px; }
@keyframes kwSpin { to { transform: rotate(360deg); } }
@keyframes kwDrift { to { transform: rotate(2.2deg); } }

/* ── แถบบน ───────────────────────────────────────────── */
.topbar {
  position: relative; z-index: 10;
  display: flex; align-items: center; gap: 22px;
  flex: none;
  width: 100%; max-width: 1540px; margin: 0 auto;
  padding: clamp(12px, 2.2svh, 22px) var(--gut) clamp(10px, 1.8svh, 18px);
}

/* เส้นคั่นใต้แถบเมนู — แยกส่วนหัวออกจากเนื้อหา
   ใช้ ::after แทน border-bottom เพราะต้องการให้ปลายเส้นหยุดตรงขอบเนื้อหา ไม่ใช่ลากถึงขอบ padding */
.topbar::after {
  content: ''; position: absolute; left: var(--gut); right: var(--gut); bottom: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(29, 27, 25, 0.34) 5%,
    rgba(29, 27, 25, 0.34) 95%,
    transparent
  );
}

/* ── โลโก้ KWANG UNLIMIT ──
   ไฟล์ /kwang_logo2.png เป็นผืนจัตุรัส 2000×2000 ที่มีขอบใสรอบตัวโลโก้เยอะ
   วัดกรอบเนื้อโลโก้จริงได้: เริ่มที่ซ้าย 4.40% บน 11.90% · กินพื้นที่ 90.00% × 65.55%
   ถ้าใส่ height ตรง ๆ ตัวอักษรในโลโก้จะเล็กกว่าเมนูข้าง ๆ มาก
   จึงขยายทั้งผืนให้เนื้อโลโก้สูงเท่า --logo-h แล้วครอบขอบใสทิ้งด้วย overflow:hidden + margin ติดลบ
   ถ้าวันหลังเปลี่ยนเป็นไฟล์ที่ครอบขอบมาแล้ว ลบตัวเลขพวกนี้ออก เหลือ height อย่างเดียวพอ */
/* ── โลโก้: ขนนก + ชื่อสองบรรทัด ──
   เคยลองใช้ไฟล์โลโก้รวม (kwang_logo2.png) แต่ไฟล์นั้นมีขอบใสรอบเยอะและตัวอักษรในไฟล์
   เล็กกว่าเมนูข้าง ๆ พอย่อให้พอดีแถบบนแล้วอ่านไม่ออก จึงกลับมาเรียงเองจากขนนก + ตัวหนังสือ */
.brand {
  /* ไฟล์ขนนกเป็นผืน 1920×1080 ที่มีขอบใสซ้าย-ขวารวมกันเกินครึ่ง
     (ตัวขนนกเริ่มที่ซ้าย 26.09% บน 1.94% กินพื้นที่ 42.03% × 90.65%)
     ถ้าตั้ง width ตรง ๆ ตัวขนนกจะเหลือไม่ถึงครึ่งของที่ตั้งไว้ จนอ่านเป็นก้อนทึบ
     จึงขยายทั้งผืนให้ตัวขนนกสูงเท่า --quill-h แล้วครอบขอบใสทิ้ง */
  --quill-h: clamp(32px, 3.6vw, 46px);
  --q-box-h: calc(var(--quill-h) / 0.9065);
  --q-box-w: calc(var(--q-box-h) * 1.7778);

  display: flex; align-items: center; gap: 12px; text-decoration: none;
}
.brand__mark {
  display: block; flex: none; overflow: hidden;
  height: var(--quill-h);
  width: calc(var(--q-box-w) * 0.4203);
}
.brand__mark img {
  display: block; max-width: none;
  width: var(--q-box-w); height: var(--q-box-h);
  margin: calc(var(--q-box-h) * -0.0194) 0 0 calc(var(--q-box-w) * -0.2609);
}
.brand__name { display: grid; line-height: 1.08; }
.brand__line1 {
  font-size: clamp(14px, 1.4vw, 19px); font-weight: 500; letter-spacing: 0.12em; color: var(--ink-soft);
}
.brand__line2 {
  font-size: clamp(14px, 1.4vw, 19px); font-weight: 600; letter-spacing: 0.12em; color: var(--ink);
}

.topbar__rule { flex: none; width: 1px; height: 38px; background: rgba(29, 27, 25, 0.22); }

.nav { margin-left: auto; display: flex; align-items: center; gap: clamp(18px, 2.6vw, 44px); }
.nav__link {
  position: relative;
  padding: 4px 0;
  /* เมนูเป็นเซอริฟตามตัวอย่าง เข้าชุดกับหัวข้อใหญ่ ไม่ใช่ซานส์แบบตราโลโก้ */
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(12px, 1.12vw, 15px);
  font-weight: 500;
  letter-spacing: 0.13em;
  color: var(--ink-soft);
  text-decoration: none;
  background: none; border: 0; cursor: pointer;
  transition: color 0.2s;
}
.nav__link::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: -4px; height: 1.5px;
  background: var(--red); transform: scaleX(0); transform-origin: left;
  transition: transform 0.24s ease;
}
.nav__link:hover { color: var(--ink); }
.nav__link:hover::after { transform: scaleX(1); }
.nav__link.is-on { color: var(--red); }
.nav__link.is-on::after { transform: scaleX(1); }

/* ปุ่มเมนูของจอแคบ — ซ่อนไว้บนจอกว้าง */
.navtoggle {
  display: none; margin-left: auto;
  width: 40px; height: 34px; padding: 0;
  background: none; border: 0; cursor: pointer; color: var(--ink);
}
.navtoggle > span:first-child {
  position: relative; display: block; width: 24px; height: 1.6px; margin: 0 auto;
  background: currentColor; transition: background 0.2s;
}
.navtoggle > span:first-child::before,
.navtoggle > span:first-child::after {
  content: ''; position: absolute; left: 0; width: 24px; height: 1.6px; background: currentColor;
  transition: transform 0.24s ease;
}
.navtoggle > span:first-child::before { top: -7px; }
.navtoggle > span:first-child::after { top: 7px; }
.navtoggle > span.on { background: transparent; }
.navtoggle > span.on::before { transform: translateY(7px) rotate(45deg); }
.navtoggle > span.on::after { transform: translateY(-7px) rotate(-45deg); }

/* ── ฮีโร่ ───────────────────────────────────────────── */
.hero {
  position: relative; z-index: 10;
  /* 1 1 auto + min-height:0 = ยอมให้ย่อได้เมื่อจอเตี้ย แทนที่จะดันแถบล่างตกขอบ */
  flex: 1 1 auto; min-height: 0;
  display: flex; align-items: center;
  width: 100%; max-width: 1540px; margin: 0 auto;
  padding: clamp(12px, 3svh, 44px) var(--gut);
}
/* คอลัมน์ข้อความกินราวครึ่งซ้าย ที่เหลือปล่อยให้ภาพและวงโคจรหายใจ
   กว้างพอให้ ANTICIPATE WHAT COMES NEXT. อยู่บรรทัดเดียวบนจอกว้าง แต่ยังไม่ชนดวงอาทิตย์ */
.hero__copy { width: min(100%, 960px); }

/* ── ตราคำว่า MOMAY ENLIGHTENMENT ──
   --wordmark-ratio = สัดส่วน กว้าง/สูง ของไฟล์โลโก้ (ครอบขอบขาวออกแล้ว)
   ถ้าไฟล์ที่วางมีสัดส่วนต่างจากนี้ ปรับตัวเลขนี้ตัวเดียวพอ ภาพจะไม่ยืดเพราะใช้ contain */
.wordmark { display: block; }

/* ── แบบที่ใช้ไฟล์โลโก้ ──
   ไฟล์ /home2/momay-enlightenment.png เป็น PNG พื้นใส 612×408 ที่มีขอบใสรอบเยอะ
   วัดกรอบเนื้อโลโก้จริงได้: เริ่มที่ซ้าย 10.13% บน 32.84% · กินพื้นที่ 80.72% × 31.13%
   ขยายทั้งผืนให้เนื้อโลโก้กว้างเท่า --wm-w แล้วครอบขอบใสทิ้ง เหมือนที่ทำกับโลโก้ KWANG
   (ถ้าเปลี่ยนไฟล์ ให้วัดใหม่แล้วแก้ตัวเลขสี่ตัวนี้ — หรือถ้าไฟล์ครอบขอบมาแล้วก็ลบทิ้งได้เลย)

   หมายเหตุ: ไฟล์ต้องพื้นใสเสมอ พื้นหน้านี้เป็นสีกระดาษไล่เฉด ไฟล์พื้นขาวจะกลายเป็นกล่องขาว
   และแก้ด้วย mix-blend-mode ไม่ได้ เพราะ .hero เป็น stacking context ไปแล้ว */
.wordmark__crop {
  --wm-w: min(46vw, 60svh, 680px);
  --wm-box: calc(var(--wm-w) / 0.8072);
  --wm-box-h: calc(var(--wm-box) * 0.6667);

  display: block;
  width: var(--wm-w);
  height: calc(var(--wm-box-h) * 0.3113);
  overflow: hidden;
}
.wordmark__img {
  display: block;
  width: var(--wm-box); height: auto;
  max-width: none;
  margin: calc(var(--wm-box-h) * -0.3284) 0 0 calc(var(--wm-box) * -0.1013);
}

/* ── แบบสำรองเมื่อยังไม่มีไฟล์โลโก้ ──
   วางตามตราจริง: M แดง · OMAY เทาเข้ม · ENLIGHTENMENT แดงตัวห่าง
   ขนาดผูกกับทั้ง vw และ svh เหมือนกล่องรูป หน้าจะได้ยังจบใน 1 จอเท่าเดิม */
.wm-word {
  display: block;
  font-size: clamp(44px, min(9.2vw, 15.5svh), 132px);
  font-weight: 900; letter-spacing: -0.012em; line-height: 0.94;
  color: var(--ink);
}
.wm-m { position: relative; display: inline-block; color: var(--red); }
/* ขนนกเป็นรอยเจาะสีกระดาษพาดบนขาซ้ายของตัว M — ต้องอยู่ชั้นบนตัวอักษร */
.wm-m__quill {
  position: absolute; z-index: 2;
  left: -0.05em; top: 0.06em;
  width: 0.42em; height: 0.8em;
  background: var(--paper-2);
  -webkit-mask-image: url('/kwang_logo.png');
  mask-image: url('/kwang_logo.png');
  -webkit-mask-size: contain; mask-size: contain;
  -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
  -webkit-mask-position: center; mask-position: center;
  transform: rotate(-5deg);
}
.wm-sub {
  display: block;
  margin-top: clamp(4px, 0.9svh, 10px);
  padding-left: 0.26em;
  font-size: clamp(13px, min(1.86vw, 3.2svh), 27px);
  font-weight: 800; letter-spacing: 0.34em; color: var(--red);
}

.hr {
  display: block; width: min(100%, 560px); height: 1px;
  margin: clamp(10px, 2.6svh, 30px) 0 clamp(8px, 1.6svh, 18px);
  background: linear-gradient(90deg, rgba(29, 27, 25, 0.32), rgba(29, 27, 25, 0.06));
}

.kicker {
  font-size: clamp(10px, 1.05vw, 14px);
  font-weight: 500; letter-spacing: 0.26em; color: var(--ink-soft);
}
.kicker-th {
  margin-top: 5px;
  font-size: clamp(12.5px, 1.32vw, 17px);
  font-weight: 400; color: var(--ink-soft);
}

.claim {
  margin-top: clamp(10px, 2.4svh, 28px);
  display: grid; gap: clamp(2px, 0.4vw, 6px);
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(24px, min(3.9vw, 7.2svh), 56px);
  font-weight: 500; line-height: 1.12; letter-spacing: -0.004em;
  color: var(--ink);
}

.claim-th {
  margin-top: clamp(8px, 1.6svh, 18px);
  font-size: clamp(13px, min(1.65vw, 2.9svh), 23px);
  font-weight: 400; color: var(--ink-soft);
}
.claim-th i { font-style: normal; color: var(--red); padding: 0 2px; }

/* ── ปุ่ม ── */
.cta { display: flex; flex-wrap: wrap; gap: clamp(10px, 1.2vw, 16px); margin-top: clamp(14px, 3.4svh, 40px); }
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: clamp(180px, 17vw, 244px);
  padding: clamp(10px, 1.9svh, 18px) clamp(20px, 2vw, 30px);
  font-size: clamp(11px, 1vw, 13.5px);
  font-weight: 600; letter-spacing: 0.18em;
  text-decoration: none;
  transition: background 0.22s, color 0.22s, border-color 0.22s, transform 0.22s;
}
.btn--solid { background: var(--red); color: #fdf8ef; }
.btn--solid:hover { background: #8a171e; transform: translateY(-1px); }
.btn--ghost { background: transparent; color: var(--ink); border: 1px solid rgba(29, 27, 25, 0.42); }
.btn--ghost:hover { border-color: var(--ink); background: rgba(29, 27, 25, 0.045); transform: translateY(-1px); }

/* ── แถบล่าง ───────────────────────────────────────────── */
.rail {
  position: relative; z-index: 10; flex: none;
  width: 100%; max-width: 1540px; margin: 0 auto;
  padding: 0 var(--gut) clamp(12px, 2.4svh, 30px);
}
.rail__steps {
  display: flex; align-items: center; justify-content: center;
  gap: clamp(10px, 1.6vw, 26px);
  padding-top: clamp(10px, 2.2svh, 24px);
  border-top: 1px solid rgba(29, 27, 25, 0.14);
  list-style: none; margin: 0;
}
.rail__steps li { display: flex; align-items: center; gap: clamp(10px, 1.6vw, 26px); }
.rail__label {
  font-size: clamp(9.5px, 0.92vw, 12.5px);
  font-weight: 500; letter-spacing: 0.24em; color: var(--ink-dim);
  white-space: nowrap;
}
/* เส้นคั่นยืดเต็มช่องว่างที่เหลือ ทำให้สี่คำกระจายเท่า ๆ กันทุกความกว้างจอ */
.rail__line { display: block; width: clamp(24px, 9vw, 150px); height: 1px; background: rgba(29, 27, 25, 0.2); }

.rail__down {
  display: block; margin: clamp(4px, 1.1svh, 14px) auto 0;
  width: 34px; height: 24px; padding: 0;
  background: none; border: 0; cursor: pointer; color: var(--gold);
  animation: kwNudge 2.6s ease-in-out infinite;
}
.rail__down svg { width: 100%; height: 100%; }

@keyframes kwNudge {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(5px); }
}

/* ── เบอร์ติดต่อ ───────────────────────────────────────── */
.ct-mask {
  position: fixed; inset: 0; z-index: 90;
  display: grid; place-items: center; padding: 20px;
  background: rgba(24, 20, 16, 0.55); backdrop-filter: blur(3px);
}
.ct-card {
  position: relative; width: min(400px, 100%);
  padding: 34px 28px 26px; text-align: center;
  background: var(--paper-2); border: 1px solid rgba(29, 27, 25, 0.16);
  box-shadow: 0 24px 60px rgba(24, 20, 16, 0.3);
  font-family: 'Montserrat', sans-serif;
}
.ct-x {
  position: absolute; top: 10px; right: 14px;
  font-size: 26px; line-height: 1; color: var(--ink-dim);
  background: none; border: 0; cursor: pointer;
}
.ct-title { font-size: 15px; font-weight: 600; letter-spacing: 0.28em; color: var(--red); }
.ct-item {
  display: flex; align-items: baseline; justify-content: center; gap: 10px;
  margin-top: 16px; padding: 12px 10px; text-decoration: none;
  border: 1px solid rgba(29, 27, 25, 0.16); color: var(--ink);
  transition: border-color 0.2s, background 0.2s;
}
.ct-item:hover { border-color: var(--red); background: rgba(160, 28, 36, 0.05); }
.ct-tel { font-size: 19px; font-weight: 600; letter-spacing: 0.05em; }
.ct-name { font-size: 13px; color: var(--ink-dim); }

.ct-enter-active, .ct-leave-active { transition: opacity 0.2s ease; }
.ct-enter-from, .ct-leave-to { opacity: 0; }

/* ── เข้าหน้าแบบค่อย ๆ ขึ้น ── */
.wordmark, .hr, .kicker, .kicker-th, .claim, .claim-th, .cta {
  animation: kwRise 0.7s cubic-bezier(0.22, 0.85, 0.3, 1) backwards;
}
.hr { animation-delay: 0.12s; }
.kicker { animation-delay: 0.16s; }
.kicker-th { animation-delay: 0.2s; }
.claim { animation-delay: 0.26s; }
.claim-th { animation-delay: 0.32s; }
.cta { animation-delay: 0.38s; }
@keyframes kwRise { from { opacity: 0; transform: translateY(14px); } }

/* ── จอแคบ ───────────────────────────────────────────── */
@media (max-width: 900px) {
  .topbar { gap: 12px; padding-top: 16px; }
  .topbar__rule { display: none; }
  .navtoggle { display: block; }

  /* เมนูกางลงมาเป็นแผ่นเต็มความกว้าง แทนการเรียงแถวจนตัวหนังสือชนกัน */
  .nav {
    position: absolute; top: 100%; left: 0; right: 0; z-index: 20;
    flex-direction: column; align-items: stretch; gap: 0;
    margin: 0; padding: 0 var(--gut);
    max-height: 0; overflow: hidden;
    background: var(--paper-2);
    transition: max-height 0.28s ease;
  }
  .nav.open { max-height: 320px; border-bottom: 1px solid rgba(29, 27, 25, 0.14); }
  .nav__link {
    padding: 14px 0; text-align: left; font-size: 12.5px;
    border-bottom: 1px solid rgba(29, 27, 25, 0.1);
  }
  .nav__link::after { display: none; }

  /* ภาพสลักถอยไปเป็นฉากหลังจาง ๆ ไม่งั้นทับตัวหนังสือบนจอแคบ */
  .plate { opacity: 0.22; }
  .plate--left { width: 52vw; }
  .plate--right { width: 62vw; }

  .hero { align-items: flex-start; padding-top: clamp(16px, 4svh, 40px); }
  .hero__copy { width: 100%; }
  /* จอแคบ: โลโก้ยึดความกว้างเป็นหลัก แต่ยังมีเพดานตามความสูงจอกันล้น */
  .wordmark__crop { --wm-w: min(80vw, 34svh, 460px); }
  .claim { font-size: clamp(22px, min(6.6vw, 5svh), 40px); }
  .btn { min-width: 0; flex: 1 1 200px; }
}

/* จอเตี้ยมาก (มือถือแนวนอน) — ย่อต่อไม่ไหวแล้ว ยอมให้เลื่อนดีกว่าตัดเนื้อหาทิ้ง */
@media (max-height: 520px) {
  .kw { height: auto; min-height: 100svh; overflow: visible; }
}

@media (max-width: 560px) {
  /* สี่จังหวะเรียงแถวเดียวไม่พอ ตัดเส้นคั่นออกแล้วให้ขึ้นบรรทัดเอง */
  .rail__steps { flex-wrap: wrap; justify-content: center; gap: 8px 14px; }
  .rail__line { display: none; }
  .rail__steps li { gap: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .sun__rays, .orbits__ring, .rail__down,
  .wordmark, .hr, .kicker, .kicker-th, .claim, .claim-th, .cta {
    animation: none;
  }
}
</style>
