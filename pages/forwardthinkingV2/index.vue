<!--
  FORWARD THINKING (V2) — /forwardthinkingV2

  หน้าเดิมคือ /renewable (pages/renewable.vue) — โลโก้สี่วง กดแล้วไปหน้าย่อยของแต่ละแพลตฟอร์ม
  หน้านี้ทำแบบเดียวกัน ไม่มีคำอธิบายใต้ชื่อ (ข้อความในแผงเก่าของ renewable.vue ไม่ตรงกับระบบแล้ว)

      ESPRESSO               → /forwardthinkingV2/espresso               (หน้าเดิม /renewablesort/espresso)
      MOMAY                  → /renewablesort/Momay2                     (หน้ารวมการ์ด MOMAY — เดิม /renewablesort/momay)
      COLLABORATIVE SENSING  → /forwardthinkingV2/collaborativesensing   (หน้าเดิม /renewablesort/collaborativesensing)
      DASHBOARD              → /renewablesort/dashboard                  (หน้าเดิม เปิดแดชบอร์ดเต็มจอ)

  โครงหน้า แถบเมนู แถบท้าย อยู่ที่ components/Kw/Shell.vue
-->
<template>
  <KwShell active="forward" title="Forward Thinking">
    <!-- สี่วงเรียงบนเส้นวงโคจรเส้นเดียว ให้เข้ากับลายเส้นดาราศาสตร์ของพื้นหลัง
         ไม่มีกรอบการ์ด ทั้งก้อนเป็นลิงก์เดียว -->
    <nav class="plats" aria-label="แพลตฟอร์ม">
      <a v-for="(p, i) in PLATFORMS" :key="p.id" class="plat" :class="`plat--${p.id}`" :href="p.href">
        <span class="plat__no">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="plat__disc">
          <span class="plat__ring" aria-hidden="true" />
          <img :src="p.logo" alt="" />
        </span>
        <h2 class="plat__name">{{ p.name }}</h2>
        <span class="plat__go font-th">
          เข้าชม
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </a>
    </nav>
  </KwShell>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useSeoMeta({
  title: 'FORWARD THINKING — KWANG UNLIMITED',
  description: 'Espresso · MOMAY · Collaborative Sensing · Dashboard',
  ogTitle: 'FORWARD THINKING — KWANG UNLIMITED',
  ogImage: '/kwang_logo.png',
})

const PLATFORMS: {
  id: string
  name: string
  logo: string
  href: string
}[] = [
  {
    id: 'espresso',
    name: 'ESPRESSO',
    logo: '/ESPRESSO_logo.png',
    href: '/forwardthinkingV2/espresso',
  },
  {
    id: 'momay',
    name: 'MOMAY',
    // ตราแนวนอน /MOMAY_logo.png ใส่ในวงกลมแล้วเล็กจนอ่านไม่ออก จึงใช้ตราชุดใหม่ที่สัดส่วนใกล้จัตุรัส
    logo: '/home2/momay-enlightenment.png',
    href: '/renewablesort/Momay2',
  },
  {
    id: 'collaborative-sensing',
    name: 'COLLABORATIVE SENSING',
    logo: '/datacityplatform.png',
    href: '/forwardthinkingV2/collaborativesensing',
  },
  {
    id: 'dashboard',
    name: 'DASHBOARD',
    logo: '/chart-logo.png',
    href: '/renewablesort/dashboard',
  },
]
</script>

<style scoped>
/* สีทั้งหมดรับมาจาก KwShell ผ่านตัวแปร CSS */

.plats {
  --disc: clamp(138px, 13vw, 184px);
  --no-h: 26px;
  --no-gap: 16px;
  position: relative;
  display: grid; gap: clamp(20px, 3vw, 44px);
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: clamp(10px, 2vw, 24px) 0 clamp(20px, 4vw, 48px);
}
/* เส้นวงโคจรลากผ่านกลางวงทั้งสี่ — เส้นประทองจาง ๆ ชุดเดียวกับลายพื้นหลัง */
.plats::before {
  content: ''; position: absolute; left: 4%; right: 4%;
  top: calc(clamp(10px, 2vw, 24px) + var(--no-h) + var(--no-gap) + var(--disc) / 2);
  border-top: 1px dashed rgba(194, 164, 104, 0.75);
  pointer-events: none;
}

.plat {
  position: relative;
  display: grid; justify-items: center; align-content: start;
  text-decoration: none; color: var(--ink);
}
.plat__no {
  height: var(--no-h); margin-bottom: var(--no-gap);
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 18px; font-style: italic; letter-spacing: 0.08em; color: var(--gold);
}

/* วงกลมโลโก้ — กระดาษนูนในกรอบทอง มีวงแหวนประหมุนช้า ๆ ล้อมอีกชั้น */
.plat__disc {
  position: relative; z-index: 1;
  display: grid; place-items: center;
  width: var(--disc); aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 32%, #fffdf8 0%, var(--paper-2) 45%, #efe5d2 100%);
  border: 1px solid rgba(194, 164, 104, 0.9);
  box-shadow:
    0 0 0 6px var(--paper),
    0 0 0 7px rgba(194, 164, 104, 0.45),
    0 16px 36px rgba(60, 44, 20, 0.12);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.plat__ring {
  position: absolute; inset: -18px;
  border-radius: 50%;
  border: 1px dashed rgba(194, 164, 104, 0.55);
  transition: border-color 0.3s;
}
/* จุดแดงบนวงแหวน — เหมือนดาวบนวงโคจรของพื้นหลัง */
.plat__ring::after {
  content: ''; position: absolute; top: 50%; right: -4px;
  width: 7px; height: 7px; margin-top: -3.5px; border-radius: 50%;
  background: var(--red-bright);
}
.plat__disc img {
  position: relative;
  width: 62%; height: 62%; object-fit: contain;
  /* ให้พื้นขาวของไฟล์โลโก้กลืนไปกับกระดาษ */
  mix-blend-mode: multiply;
}
/* ไฟล์ตรา MOMAY มีขอบใสรอบเยอะ (เนื้อโลโก้กว้างแค่ ~80% ของไฟล์) ขยายชดเชยให้ขนาดพอ ๆ กับวงอื่น */
.plat--momay .plat__disc img { width: 88%; height: 88%; }

.plat__name {
  margin-top: clamp(22px, 2.6vw, 32px);
  min-height: 2.3em;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(19px, 1.9vw, 27px); font-weight: 500; line-height: 1.15; letter-spacing: 0.02em;
  text-align: center; color: var(--ink);
}

/* ลิงก์ตัวอักษรแบบเดียวกับเมนูด้านบน เส้นใต้แดงยืดออกตอนชี้ */
.plat__go {
  position: relative;
  display: inline-flex; align-items: center; gap: 8px;
  margin-top: 10px; padding-bottom: 6px;
  font-size: clamp(14px, 1.2vw, 15.5px); font-weight: 600; letter-spacing: 0.08em; color: var(--red);
}
.plat__go svg { width: 16px; height: 16px; transition: transform 0.3s; }
.plat__go::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 1px;
  background: var(--red); transform: scaleX(0.35); transform-origin: left;
  transition: transform 0.3s ease;
}

.plat:hover .plat__disc {
  transform: translateY(-5px);
  box-shadow:
    0 0 0 6px var(--paper),
    0 0 0 7px rgba(194, 164, 104, 0.8),
    0 22px 44px rgba(60, 44, 20, 0.16);
}
.plat:hover .plat__ring { border-color: rgba(160, 28, 36, 0.5); animation: ringSpin 14s linear infinite; }
.plat:hover .plat__go::after { transform: scaleX(1); }
.plat:hover .plat__go svg { transform: translateX(3px); }
@keyframes ringSpin { to { transform: rotate(360deg); } }

/* จอแคบ: สองคอลัมน์ เส้นวงโคจรแนวเดียวใช้ไม่ได้แล้วจึงซ่อน */
@media (max-width: 900px) {
  .plats { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: clamp(36px, 7vw, 56px); }
  .plats::before { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .plat:hover .plat__ring { animation: none; }
}
</style>
