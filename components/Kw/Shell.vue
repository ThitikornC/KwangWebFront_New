<!--
  KwShell — โครงหน้าร่วมของหน้าชุด V2 (ชุดเดียวกับ /home2)

  /home2 เป็นหน้าเดียวจบใน 1 จอ จึงเขียนโครงไว้ในไฟล์ตัวเอง
  ส่วนหน้าเนื้อหา (about / projects / forward thinking / contact) เลื่อนยาวได้
  จึงยกฉากหลัง แถบเมนู และแถบท้ายมาไว้ที่นี่ที่เดียว แก้ทีเดียวเปลี่ยนตามกันทุกหน้า

  ค่าสี ตัวอักษร และสัดส่วนแถบบน ลอกมาจาก pages/home2.vue ตรง ๆ เพื่อให้ต่อกันแล้วไม่สะดุด
  ถ้าแก้โทนที่ home2 ต้องตามมาแก้ที่นี่ด้วย (และกลับกัน)

  ฉากหลังตั้งเป็น fixed — เนื้อหาเลื่อนผ่านวงโคจรไป ไม่ใช่ลากวงโคจรตามลงไปด้วย
  และลดความเข้มลงจาก home2 เพราะหน้าพวกนี้มีตัวหนังสือเต็มหน้า ไม่ใช่หัวเรื่องใหญ่ใบเดียว
-->
<template>
  <div class="kwp">
    <!-- ── ฉากหลัง ── -->
    <div class="kwp__paper" aria-hidden="true" />
    <div class="kwp__plate" aria-hidden="true" />
    <div class="kwp__grain" aria-hidden="true" />

    <svg class="kwp__orbits" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="kwpSunGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stop-color="#e8c56a" stop-opacity="0.38" />
          <stop offset="60%" stop-color="#e8c56a" stop-opacity="0.1" />
          <stop offset="100%" stop-color="#e8c56a" stop-opacity="0" />
        </radialGradient>
      </defs>

      <g class="kwp__ring">
        <ellipse cx="1330" cy="215" rx="430" ry="185" transform="rotate(-18 1330 215)" />
        <ellipse cx="1330" cy="215" rx="330" ry="300" transform="rotate(12 1330 215)" />
        <ellipse cx="1330" cy="215" rx="215" ry="212" />
      </g>

      <g class="kwp__arc">
        <path d="M -60 110 C 320 -40 900 40 1420 280" />
        <path d="M -60 820 C 300 1010 900 980 1660 700" />
        <path d="M 110 -30 C 30 320 110 700 350 1030" />
      </g>

      <g class="kwp__dot">
        <circle cx="1268" cy="34" r="7" class="is-red" />
        <circle cx="1592" cy="112" r="6" class="is-red" />
        <circle cx="1168" cy="396" r="4" class="is-gold" />
        <circle cx="1470" cy="356" r="4" class="is-gold" />
        <circle cx="132" cy="742" r="4" class="is-gold" />
        <circle cx="404" cy="898" r="4" class="is-gold" />
      </g>

      <g class="kwp__star">
        <path d="M1498 468 l6 17 17 6 -17 6 -6 17 -6 -17 -17 -6 17 -6 z" />
        <path d="M232 268 l5 15 15 5 -15 5 -5 15 -5 -15 -15 -5 15 -5 z" />
      </g>

      <g class="kwp__globe" transform="translate(196 596)">
        <circle r="54" />
        <path d="M-54 0 H54 M-49 -23 H49 M-49 23 H49" />
        <ellipse rx="21" ry="54" />
        <ellipse rx="40" ry="54" />
      </g>

      <g class="kwp__sun" transform="translate(1330 215)">
        <circle class="kwp__sunglow" r="150" fill="url(#kwpSunGlow)" />
        <g class="kwp__rays">
          <path v-for="r in SUN_RAYS" :key="r.a" :d="r.d" :transform="`rotate(${r.a})`" />
        </g>
        <circle class="kwp__disc" r="44" />
        <!-- หน้าชุดเดียวกับ /home2 ย่อตามรัศมีจาน (52 → 44 = ×0.846) -->
        <g class="kwp__face">
          <path d="M-28 -25 q9 -8 19 -1" />
          <path d="M9 -26 q9 -7 19 1" />
          <circle cx="-18" cy="-19" r="3.6" class="is-fill" />
          <circle cx="18" cy="-19" r="3.6" class="is-fill" />
          <path d="M1 -12 q-5 12 -1 15 q4 3 7 -1" />
          <path d="M-22 7 q22 14 44 -3" />
        </g>
      </g>
    </svg>

    <!-- ══════════════ แถบบน — ชุดเดียวกับ /home2 ══════════════ -->
    <header class="topbar">
      <a class="brand" href="/home2" aria-label="KWANG UNLIMITED — หน้าแรก">
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
        aria-controls="kwp-nav"
        @click="navOpen = !navOpen"
      >
        <span :class="{ on: navOpen }" />
        <span class="sr-only">{{ navOpen ? 'ปิดเมนู' : 'เปิดเมนู' }}</span>
      </button>

      <nav id="kwp-nav" class="nav" :class="{ open: navOpen }">
        <a
          v-for="n in NAV"
          :key="n.key"
          class="nav__link"
          :class="{ 'is-on': n.key === active }"
          :href="n.href"
          @click="navOpen = false"
        >{{ n.label }}</a>
      </nav>
    </header>

    <main class="kwp__main">
      <!-- หัวหน้า — อังกฤษตัวใหญ่ + ไทยกำกับ ตามจังหวะเดียวกับ hero ของ /home2 -->
      <section v-if="title" class="phead">
        <p v-if="eyebrow" class="phead__eyebrow">{{ eyebrow }}</p>
        <h1 class="phead__title">{{ title }}</h1>
        <p v-if="titleTh" class="phead__th">{{ titleTh }}</p>
        <span class="phead__rule" aria-hidden="true" />
        <p v-if="lead" class="phead__lead">{{ lead }}</p>
      </section>

      <slot />
    </main>

    <!-- ══════════════ แถบท้าย ══════════════ -->
    <footer class="sfoot">
      <div class="sfoot__in">
        <div class="sfoot__brand">
          <span class="sfoot__mark" aria-hidden="true"><img src="/kwang_logo.png" alt="" /></span>
          <span>
            <b>KWANG UNLIMITED</b>
            <i>กว้างไม่จำกัด · พิษณุโลก</i>
          </span>
        </div>

        <nav class="sfoot__nav">
          <a v-for="n in NAV" :key="n.key" :href="n.href">{{ n.label }}</a>
        </nav>

        <div class="sfoot__tel">
          <a v-for="c in CONTACTS" :key="c.tel" :href="`tel:${c.tel}`">
            {{ c.tel }}<i>({{ c.name }})</i>
          </a>
        </div>
      </div>
      <p class="sfoot__copy">© {{ year }} KWANG UNLIMITED — MAKE TECH FRESH, GET FORWARD</p>
    </footer>

    <!-- ปุ่มกลับขึ้นบน — โผล่เมื่อเลื่อนลงไปพอสมควรแล้ว -->
    <Transition name="kwp-up">
      <button v-if="showTop" type="button" class="totop" aria-label="กลับขึ้นบนสุด" @click="toTop">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 14.5 12 7.5 19 14.5" />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

withDefaults(defineProps<{
  /** คีย์ของเมนูที่กำลังเปิดอยู่ — ใช้ขีดเส้นแดงใต้เมนูนั้น */
  active?: string
  eyebrow?: string
  title?: string
  titleTh?: string
  lead?: string
}>(), { active: '', eyebrow: '', title: '', titleTh: '', lead: '' })

/* ── เมนู — ชุดเดียวกับ /home2 แก้ที่นี่แล้วต้องตามไปแก้ NAV ใน pages/home2.vue ── */
const NAV = [
  { key: 'about',    label: 'ABOUT',            href: '/aboutV2' },
  { key: 'projects', label: 'PROJECTS',         href: '/projectsV2' },
  { key: 'forward',  label: 'FORWARD THINKING', href: '/forwardthinkingV2' },
  { key: 'momay',    label: 'MOMAY',            href: '/renewablesort/MomayforSaleV2' },
  { key: 'contact',  label: 'CONTACT',          href: '/contactV2' },
]

const CONTACTS = [
  { name: 'จ๊อบ', tel: '0839549743' },
  { name: 'ไอซ์', tel: '0888150287' },
]

const year = new Date().getFullYear()

/* รัศมีดวงอาทิตย์ — แฉกยาวสลับแฉกสั้น เรียงรอบวงทีละ 15 องศา
   สูตรเดียวกับ /home2 ย่อตามรัศมีจาน (52 → 44 = ×0.846) ดูคำอธิบายสัดส่วนที่นั่น */
const SUN_RAYS = Array.from({ length: 24 }, (_, i) => {
  const long = i % 2 === 0
  const base = 49
  const tip = long ? 95 : 69
  const half = long ? 3.6 : 6.4
  return { a: i * 15, d: `M ${-half} ${-base} L 0 ${-tip} L ${half} ${-base} Z` }
})

const navOpen = ref(false)
const showTop = ref(false)

function onScroll() {
  showTop.value = window.scrollY > 600
}
function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') navOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  onScroll()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})

useHead({
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
</script>

<style scoped>
.kwp {
  --paper: #f6f1e6;
  --paper-2: #fbf7ee;
  --ink: #1d1b19;
  --ink-soft: #4a443d;
  --ink-dim: #7a7267;
  --red: #a01c24;
  --red-bright: #c22a30;
  --gold: #c2a468;
  --gold-soft: #d8c49a;
  --line: rgba(29, 27, 25, 0.16);
  --gut: clamp(18px, 3.4vw, 54px);
  --wrap: 1540px;

  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  background: var(--paper);
  color: var(--ink);
  font-family: 'Montserrat', system-ui, sans-serif;
  overflow-x: clip;
}

/* ตัวช่วยที่เนื้อหาในสล็อตเรียกใช้ได้ — ต้องผ่าน :slotted() เพราะสล็อตถือ scope ของหน้า ไม่ใช่ของ shell */
:slotted(.font-th) { font-family: 'Noto Sans Thai', 'Montserrat', sans-serif; }

.sr-only {
  position: absolute; width: 1px; height: 1px; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap;
}

/* ── ฉากหลัง — ติดหน้าจอไว้ ไม่เลื่อนตามเนื้อหา ── */
.kwp__paper,
.kwp__grain,
.kwp__orbits {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
}
.kwp__paper {
  background: radial-gradient(120% 90% at 50% 26%, var(--paper-2) 0%, var(--paper) 58%, #efe7d8 100%);
}
/* ภาพสลักผืนเดียวกับ /home2 — ที่นั่นตั้ง 0.62 เพราะมีหัวเรื่องใหญ่ใบเดียว
   หน้านี้มีตัวหนังสือเต็มหน้าและเลื่อนผ่านภาพตลอด จึงต้องจางกว่านั้นมาก

   ซ้าย-ขวากินเต็มจอเหมือน /home2
   ส่วนบน-ล่างปล่อยเต็มความสูงจอ เพราะหน้านี้เลื่อนยาว ไม่มี "แถวกลาง" ที่ตายตัวแบบ /home2
   ด้านบนถูกแถบเมนูทึบบังอยู่แล้ว จึงเห็นเป็นภาพที่เริ่มใต้เส้นคั่นเหมือนกัน */
.kwp__plate {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  background-image: url('/home2/bg-momay.webp');
  background-repeat: no-repeat;
  background-position: center;
  /* ขยายตามสัดส่วนจริง ไม่บีบ เหมือน /home2 (ดูเหตุผลที่นั่น) */
  background-size: cover;
  opacity: 0.2;
  mix-blend-mode: multiply;
}
.kwp__grain {
  z-index: 1; opacity: 0.055; mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E");
}
.kwp__orbits { z-index: 2; width: 100%; height: 100%; opacity: 0.72; }

.kwp__ring ellipse,
.kwp__arc path { fill: none; stroke: var(--gold); stroke-width: 1.1; opacity: 0.45; }
.kwp__arc path { opacity: 0.26; }
.kwp__dot .is-red { fill: var(--red-bright); opacity: 0.75; }
.kwp__dot .is-gold { fill: var(--gold); opacity: 0.6; }
.kwp__star path { fill: none; stroke: var(--gold); stroke-width: 1.2; opacity: 0.55; }
.kwp__globe circle,
.kwp__globe ellipse,
.kwp__globe path { fill: none; stroke: var(--gold); stroke-width: 1.1; opacity: 0.3; }
.kwp__rays path { fill: var(--gold); opacity: 0.45; }
.kwp__disc { fill: var(--paper-2); stroke: var(--gold); stroke-width: 1.3; }
.kwp__face path { fill: none; stroke: #9a7f45; stroke-width: 1.8; stroke-linecap: round; opacity: 0.8; }
.kwp__face .is-fill { fill: #9a7f45; opacity: 0.8; }

.kwp__rays { animation: kwpSpin 220s linear infinite; transform-origin: 0 0; }
.kwp__ring { animation: kwpDrift 26s ease-in-out infinite alternate; transform-origin: 1330px 215px; }
@keyframes kwpSpin { to { transform: rotate(360deg); } }
@keyframes kwpDrift { to { transform: rotate(2.2deg); } }

/* ── แถบบน ──
   หน้าเนื้อหาเลื่อนยาว แถบเมนูจึงติดขอบบนไว้ (sticky) ต่างจาก home2 ที่จบใน 1 จอ
   ระยะขอบซ้าย-ขวาคำนวณให้โลโก้กับเมนูตรงแนวกับเนื้อหาข้างใน ทั้งที่แถบกินเต็มความกว้างจอ */
.topbar {
  position: sticky; top: 0; z-index: 40;
  display: flex; align-items: center; gap: 22px;
  flex: none;
  width: 100%; margin: 0 auto;
  padding: clamp(12px, 2.2svh, 22px) max(var(--gut), calc((100vw - var(--wrap)) / 2 + var(--gut)))
           clamp(10px, 1.8svh, 18px);
  /* แถบติดขอบบนตอนเลื่อน — ต้องมีพื้นทึบของตัวเอง ไม่งั้นตัวหนังสือด้านล่างวิ่งทะลุขึ้นมา */
  background: rgba(246, 241, 230, 0.9);
  backdrop-filter: blur(8px);
}
.topbar::after {
  content: ''; position: absolute;
  left: max(var(--gut), calc((100vw - var(--wrap)) / 2 + var(--gut)));
  right: max(var(--gut), calc((100vw - var(--wrap)) / 2 + var(--gut)));
  bottom: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(29, 27, 25, 0.34) 5%, rgba(29, 27, 25, 0.34) 95%, transparent);
}

/* โลโก้: ขนนก + ชื่อสองบรรทัด — ตัวเลขครอบขอบใสยกมาจาก /home2 ทั้งชุด */
.brand {
  --quill-h: clamp(32px, 3.6vw, 46px);
  --q-box-h: calc(var(--quill-h) / 0.9065);
  --q-box-w: calc(var(--q-box-h) * 1.7778);
  display: flex; align-items: center; gap: 12px; text-decoration: none;
}
.brand__mark {
  display: block; flex: none; overflow: hidden;
  height: var(--quill-h); width: calc(var(--q-box-w) * 0.4203);
}
.brand__mark img {
  display: block; max-width: none;
  width: var(--q-box-w); height: var(--q-box-h);
  margin: calc(var(--q-box-h) * -0.0194) 0 0 calc(var(--q-box-w) * -0.2609);
}
.brand__name { display: grid; line-height: 1.08; }
.brand__line1 { font-size: clamp(14px, 1.4vw, 19px); font-weight: 500; letter-spacing: 0.12em; color: var(--ink-soft); }
.brand__line2 { font-size: clamp(14px, 1.4vw, 19px); font-weight: 600; letter-spacing: 0.12em; color: var(--ink); }

.topbar__rule { flex: none; width: 1px; height: 38px; background: rgba(29, 27, 25, 0.22); }

.nav { margin-left: auto; display: flex; align-items: center; gap: clamp(18px, 2.6vw, 44px); }
.nav__link {
  position: relative; padding: 4px 0;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(12px, 1.12vw, 15px);
  font-weight: 500; letter-spacing: 0.13em;
  color: var(--ink-soft); text-decoration: none;
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

/* ── เนื้อหา ── */
.kwp__main {
  position: relative; z-index: 10;
  flex: 1 1 auto;
  width: 100%; max-width: var(--wrap); margin: 0 auto;
  padding: clamp(26px, 5vw, 62px) var(--gut) clamp(40px, 6vw, 88px);
}

.phead { max-width: 900px; margin-bottom: clamp(26px, 4vw, 52px); }
.phead__eyebrow {
  font-size: clamp(10px, 1.05vw, 13px); font-weight: 500; letter-spacing: 0.26em; color: var(--red);
}
.phead__title {
  margin-top: clamp(8px, 1.4vw, 14px);
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(32px, 5.4vw, 68px);
  font-weight: 500; line-height: 1.06; letter-spacing: -0.006em; color: var(--ink);
}
.phead__th {
  margin-top: 8px;
  font-family: 'Noto Sans Thai', 'Montserrat', sans-serif;
  font-size: clamp(14px, 1.6vw, 21px); font-weight: 400; color: var(--ink-soft);
}
.phead__rule {
  display: block; width: min(100%, 520px); height: 1px;
  margin: clamp(14px, 2.2vw, 26px) 0 clamp(12px, 1.6vw, 18px);
  background: linear-gradient(90deg, rgba(29, 27, 25, 0.32), rgba(29, 27, 25, 0.06));
}
.phead__lead {
  font-family: 'Noto Sans Thai', 'Montserrat', sans-serif;
  font-size: clamp(13.5px, 1.35vw, 17px); line-height: 1.85; color: var(--ink-soft);
  max-width: 720px;
}

/* ── แถบท้าย ── */
.sfoot {
  position: relative; z-index: 10; flex: none;
  width: 100%; max-width: var(--wrap); margin: 0 auto;
  padding: clamp(20px, 3vw, 32px) var(--gut) clamp(24px, 3.4vw, 40px);
  border-top: 1px solid rgba(29, 27, 25, 0.14);
}
.sfoot__in {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
  gap: clamp(14px, 2.4vw, 32px);
}
.sfoot__brand { display: flex; align-items: center; gap: 10px; }
/* ครอบขอบใสของไฟล์ขนนกแบบเดียวกับแถบบน แต่ตรึงความสูงไว้ เพราะแถบท้ายไม่ต้องย่อตามจอ
   ใช้สูตรชุดเดียวกับ .brand ไม่กรอกตัวเลขที่คำนวณไว้เอง — ครั้งก่อนกรอกความกว้างผิด
   (15px แทนที่จะเป็น ~26px) ขนนกเลยโดนกรอบครอบตัดข้างจนเหลือครึ่งเดียว */
.sfoot__mark {
  --quill-h: 32px;
  --q-box-h: calc(var(--quill-h) / 0.9065);
  --q-box-w: calc(var(--q-box-h) * 1.7778);
  display: block; flex: none; overflow: hidden;
  height: var(--quill-h);
  width: calc(var(--q-box-w) * 0.4203);
}
.sfoot__mark img {
  display: block; max-width: none;
  width: var(--q-box-w); height: var(--q-box-h);
  margin: calc(var(--q-box-h) * -0.0194) 0 0 calc(var(--q-box-w) * -0.2609);
}
.sfoot__brand b { display: block; font-size: 12.5px; font-weight: 600; letter-spacing: 0.14em; color: var(--ink); }
.sfoot__brand i {
  display: block; margin-top: 3px; font-style: normal;
  font-family: 'Noto Sans Thai', 'Montserrat', sans-serif;
  font-size: 12px; color: var(--ink-dim);
}
.sfoot__nav { display: flex; flex-wrap: wrap; gap: clamp(12px, 1.8vw, 26px); }
.sfoot__nav a {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 11.5px; letter-spacing: 0.13em; color: var(--ink-dim); text-decoration: none;
  transition: color 0.2s;
}
.sfoot__nav a:hover { color: var(--red); }
.sfoot__tel { display: flex; flex-wrap: wrap; gap: 14px; }
.sfoot__tel a {
  font-size: 13px; font-weight: 600; letter-spacing: 0.04em; color: var(--ink); text-decoration: none;
  transition: color 0.2s;
}
.sfoot__tel a:hover { color: var(--red); }
.sfoot__tel i {
  font-style: normal; margin-left: 5px; font-weight: 400;
  font-family: 'Noto Sans Thai', 'Montserrat', sans-serif;
  font-size: 11.5px; color: var(--ink-dim);
}
.sfoot__copy {
  margin-top: clamp(14px, 2vw, 22px);
  font-size: 10.5px; letter-spacing: 0.2em; color: var(--ink-dim);
}

/* ── ปุ่มกลับขึ้นบน ── */
.totop {
  position: fixed; right: clamp(14px, 2.4vw, 30px); bottom: clamp(14px, 2.4vw, 30px); z-index: 60;
  width: 44px; height: 44px; padding: 10px;
  color: var(--red);
  background: var(--paper-2);
  border: 1px solid rgba(29, 27, 25, 0.18);
  cursor: pointer;
  box-shadow: 0 10px 26px rgba(24, 20, 16, 0.14);
  transition: border-color 0.2s, transform 0.2s;
}
.totop:hover { border-color: var(--red); transform: translateY(-2px); }
.totop svg { width: 100%; height: 100%; }
.kwp-up-enter-active, .kwp-up-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.kwp-up-enter-from, .kwp-up-leave-to { opacity: 0; transform: translateY(8px); }

/* ── จอแคบ ── */
@media (max-width: 900px) {
  .topbar { gap: 12px; padding-top: 16px; }
  .topbar__rule { display: none; }
  .navtoggle { display: block; }

  .nav {
    position: absolute; top: 100%; left: 0; right: 0; z-index: 20;
    flex-direction: column; align-items: stretch; gap: 0;
    margin: 0; padding: 0 var(--gut);
    max-height: 0; overflow: hidden;
    background: var(--paper-2);
    transition: max-height 0.28s ease;
  }
  .nav.open { max-height: 340px; border-bottom: 1px solid rgba(29, 27, 25, 0.14); }
  .nav__link { padding: 14px 0; text-align: left; font-size: 12.5px; border-bottom: 1px solid rgba(29, 27, 25, 0.1); }
  .nav__link::after { display: none; }

  /* จอแคบภาพสลักขยับเข้ามาทับตัวหนังสือ ต้องจางลงอีก เหมือน /home2 */
  .kwp__orbits { opacity: 0.45; }
  .kwp__plate { opacity: 0.16; }
  .sfoot__in { flex-direction: column; align-items: flex-start; }
}

@media (prefers-reduced-motion: reduce) {
  .kwp__rays, .kwp__ring { animation: none; }
}
</style>
