<!--
  FORWARD THINKING (V2) — /forwardthinkingV2

  หน้าเดิมคือ /renewable (pages/renewable.vue) — หน้านี้เปลี่ยนแค่ดีไซน์ เนื้อหาไม่แต่งเพิ่ม
  หน้าเดิมเป็นโลโก้สี่วง กดแล้วไปหน้าย่อยของแต่ละแพลตฟอร์ม หน้านี้ก็ทำแบบเดียวกัน:

      ESPRESSO               → /forwardthinkingV2/espresso               (หน้าเดิม /renewablesort/espresso)
      MOMAY                  → /renewablesort/MomayforSaleV2             (ให้ตรงกับเมนู MOMAY)
      COLLABORATIVE SENSING  → /forwardthinkingV2/collaborativesensing   (หน้าเดิม /renewablesort/collaborativesensing)
      DASHBOARD              → /renewablesort/dashboard                  (หน้าเดิม เปิดแดชบอร์ดเต็มจอ)

  ข้อความใต้ชื่อยกมาจากแผงเนื้อหาของ pages/renewable.vue ตรง ๆ (Dashboard หน้าเดิมไม่มีคำอธิบาย จึงไม่มี)
  ปุ่มดาวน์โหลดใต้ Espresso กับ MOMAY ก็มีในหน้าเดิม

  โครงหน้า แถบเมนู แถบท้าย อยู่ที่ components/Kw/Shell.vue
-->
<template>
  <KwShell active="forward" title="Forward Thinking">
    <div class="plats">
      <article v-for="p in PLATFORMS" :key="p.id" class="plat">
        <a class="plat__hit" :href="p.href" :aria-label="p.name">
          <span class="plat__disc"><img :src="p.logo" alt="" /></span>
          <h2 class="plat__name">{{ p.name }}</h2>
        </a>

        <div v-if="p.body.length || p.bullets?.length" class="plat__text font-th">
          <p v-for="t in p.body" :key="t">{{ t }}</p>
          <ul v-if="p.bullets?.length" class="plat__bullets">
            <li v-for="b in p.bullets" :key="b">{{ b }}</li>
          </ul>
          <p v-for="t in p.after ?? []" :key="t">{{ t }}</p>
        </div>

        <div class="plat__foot">
          <a class="btn btn--solid" :href="p.href">เข้าชม</a>
          <a v-if="p.doc" class="btn btn--ghost" :href="p.doc.href" download>{{ p.doc.label }}</a>
        </div>
      </article>
    </div>
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

/* ข้อความยกมาจาก pages/renewable.vue (แผงเนื้อหาของแต่ละโลโก้) */
const PLATFORMS: {
  id: string
  name: string
  logo: string
  href: string
  body: string[]
  bullets?: string[]
  after?: string[]
  doc?: { label: string; href: string }
}[] = [
  {
    id: 'espresso',
    name: 'ESPRESSO',
    logo: '/ESPRESSO_logo.png',
    href: '/forwardthinkingV2/espresso',
    body: [
      'ระบบบริหารจัดการพลังงานอัจฉริยะ ติดตามและควบคุมการใช้ไฟฟ้าได้อย่างมีประสิทธิภาพ Espresso ช่วยให้คุณเห็นและวิเคราะห์การใช้พลังงานแบบเรียลไทม์ เพื่อให้คุณสามารถตรวจสอบและแก้ไขปัญหาได้ทันที',
    ],
    doc: { label: 'Download Espresso Document', href: '/Sale Kit Espresso251125.pdf' },
  },
  {
    id: 'momay',
    name: 'MOMAY',
    // ตราแนวนอน /MOMAY_logo.png ใส่ในวงกลมแล้วเล็กจนอ่านไม่ออก จึงใช้ตราชุดใหม่ที่สัดส่วนใกล้จัตุรัส
    logo: '/home2/momay-enlightenment.png',
    href: '/renewablesort/MomayforSaleV2',
    body: ['คือ Source Code ที่เป็นตัวกลางในการรับข้อมูลจากแหล่งต่าง ๆ ได้ตามความต้องการ'],
    bullets: ['พลังงานไฟฟ้า', 'กล้องวงจรปิด', 'ห้องสมุดออนไลน์'],
    after: ['และส่งข้อมูลไปยัง Espresso เพื่อแสดงผลแบบเรียลไทม์'],
    doc: { label: 'Download Momay Document', href: '/Sale Kit Momay181125 .pdf' },
  },
  {
    id: 'collaborative-sensing',
    name: 'COLLABORATIVE SENSING',
    logo: '/datacityplatform.png',
    href: '/forwardthinkingV2/collaborativesensing',
    body: [
      'Collaborative sensing คือกระบวนการที่นำอุปกรณ์หลายตัวหรือหลายระบบทำงานร่วมกัน เพื่อตรวจจับ รวบรวม และประมวลผลข้อมูลจากสภาพแวดล้อมโดยรอบ เพื่อให้ได้ข้อมูลที่แม่นยำและครอบคลุมยิ่งขึ้น',
    ],
    bullets: ['Energy', 'Camera CCTV', 'EV Charger', 'Access Control'],
  },
  {
    id: 'dashboard',
    name: 'DASHBOARD',
    logo: '/chart-logo.png',
    href: '/renewablesort/dashboard',
    body: [],
  },
]
</script>

<style scoped>
/* สีทั้งหมดรับมาจาก KwShell ผ่านตัวแปร CSS */

/* สี่แพลตฟอร์มเรียงเป็นตาราง เหมือนโลโก้สี่วงของหน้าเดิม */
.plats {
  display: grid; gap: clamp(16px, 2.2vw, 28px);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  align-items: stretch;
}
.plat {
  display: flex; flex-direction: column;
  padding: clamp(22px, 2.6vw, 34px);
  background: rgba(251, 247, 238, 0.72);
  border: 1px solid rgba(29, 27, 25, 0.14);
  transition: border-color 0.24s, background 0.24s;
}
.plat:hover { border-color: var(--gold); background: rgba(251, 247, 238, 0.95); }

.plat__hit { display: grid; justify-items: center; gap: 18px; text-decoration: none; }
.plat__disc {
  display: grid; place-items: center;
  width: min(100%, 180px); aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle at 42% 34%, var(--paper-2) 0%, #f1e9da 100%);
  border: 1px solid rgba(194, 164, 104, 0.85);
  box-shadow: 0 14px 34px rgba(24, 20, 16, 0.09), inset 0 0 0 7px rgba(251, 247, 238, 0.9);
  transition: transform 0.3s;
}
.plat__hit:hover .plat__disc { transform: translateY(-4px) scale(1.03); }
.plat__disc img { width: 64%; height: 64%; object-fit: contain; }
.plat__name {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(22px, 2.2vw, 30px); font-weight: 500; line-height: 1.15; text-align: center; color: var(--ink);
}

.plat__text {
  display: grid; gap: 10px;
  margin-top: clamp(16px, 2vw, 22px);
  padding-top: clamp(16px, 2vw, 22px);
  border-top: 1px solid rgba(29, 27, 25, 0.12);
}
.plat__text p { font-size: clamp(15px, 1.3vw, 17px); line-height: 1.85; color: var(--ink-soft); }
.plat__bullets { display: flex; flex-wrap: wrap; gap: 8px; margin: 0; padding: 0; list-style: none; }
.plat__bullets li {
  padding: 5px 13px;
  font-size: clamp(14px, 1.2vw, 15.5px); color: var(--ink);
  border: 1px solid rgba(29, 27, 25, 0.18); border-radius: 999px;
  background: var(--paper-2);
}

/* ปุ่มชิดล่างการ์ดทุกใบ ให้แถวปุ่มตรงกันแม้ข้อความยาวไม่เท่ากัน */
.plat__foot { display: grid; gap: 10px; margin-top: auto; padding-top: clamp(18px, 2.4vw, 26px); }

.btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 13px 18px;
  font-family: 'Noto Sans Thai', 'Montserrat', sans-serif;
  font-size: clamp(13px, 1.1vw, 14.5px); font-weight: 600; letter-spacing: 0.06em;
  text-decoration: none; text-align: center;
  transition: background 0.22s, color 0.22s, border-color 0.22s, transform 0.22s;
}
.btn--solid { background: var(--red); color: #fdf8ef; }
.btn--solid:hover { background: #8a171e; transform: translateY(-1px); }
.btn--ghost { background: transparent; color: var(--ink); border: 1px solid rgba(29, 27, 25, 0.42); }
.btn--ghost:hover { border-color: var(--ink); background: rgba(29, 27, 25, 0.045); transform: translateY(-1px); }
</style>
