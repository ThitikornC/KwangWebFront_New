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
    <div class="plats">
      <article v-for="p in PLATFORMS" :key="p.id" class="plat">
        <a class="plat__hit" :href="p.href" :aria-label="p.name">
          <span class="plat__disc"><img :src="p.logo" alt="" /></span>
          <h2 class="plat__name">{{ p.name }}</h2>
        </a>

        <div class="plat__foot">
          <a class="btn btn--solid" :href="p.href">เข้าชม</a>
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
</style>
