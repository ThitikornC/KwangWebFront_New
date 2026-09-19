<!--
  FORWARD THINKING (V2) — /forwardthinkingV2

  ชุดเดียวกับ /home2 · หน้าเดิมคือ /renewable ไม่ถูกแตะ

  หน้าเดิมเป็นวงกลมโลโก้สี่ใบที่กดแล้วสลับแผงเนื้อหาอยู่ในจอเดียว
  หน้านี้คลี่ทั้งสี่แพลตฟอร์มออกมาเรียงต่อกันเลย — เนื้อหาเท่าเดิมแต่ไม่ต้องกดหาว่าอะไรอยู่ตรงไหน
  ปลายทางทุกอันยกมาจาก pages/renewable.vue (splineLinks + navigateTo) ยกเว้น MOMAY
  ที่ชี้ไป /renewablesort/MomayforSaleV2 ให้ตรงกับเมนู MOMAY ของ /home2

  โครงหน้า แถบเมนู แถบท้าย อยู่ที่ components/Kw/Shell.vue
-->
<template>
  <KwShell
    active="forward"
    eyebrow="FORWARD THINKING"
    title="Platforms we build."
    title-th="แพลตฟอร์มที่เราพัฒนาขึ้นเอง"
    lead="สี่ระบบที่ทำงานต่อกันเป็นชุดเดียว — เก็บข้อมูลจากหน้างานจริง ส่งต่อให้กันได้ และแสดงผลให้คนตัดสินใจได้ทันที"
  >
    <!-- ── สารบัญ: กดแล้วเลื่อนไปยังแพลตฟอร์มนั้น ── -->
    <nav class="jump" aria-label="ไปยังแพลตฟอร์ม">
      <a v-for="p in PLATFORMS" :key="p.id" :href="`#${p.id}`" class="jump__item">
        <span class="jump__mark"><img :src="p.logo" alt="" /></span>
        <span class="jump__name">{{ p.name }}</span>
      </a>
    </nav>

    <!-- ── แพลตฟอร์มทีละตัว ── -->
    <section v-for="(p, i) in PLATFORMS" :id="p.id" :key="p.id" class="plat">
      <div class="plat__side">
        <span class="plat__no">{{ String(i + 1).padStart(2, '0') }}</span>
        <!-- วงกลมโลโก้ — ขอบทองบนกระดาษ แทนกรอบนีออนของหน้าเดิม ให้เข้ากับ /home2 -->
        <span class="plat__disc">
          <img :src="p.logo" :alt="p.name" loading="lazy" />
        </span>
      </div>

      <div class="plat__main">
        <p class="plat__kicker">{{ p.kicker }}</p>
        <h2 class="plat__name">{{ p.name }}</h2>
        <p class="plat__th font-th">{{ p.nameTh }}</p>

        <span class="plat__rule" aria-hidden="true" />

        <p class="plat__body font-th">{{ p.body }}</p>

        <ul v-if="p.features?.length" class="feats">
          <li v-for="f in p.features" :key="f.head">
            <b>{{ f.head }}</b>
            <span class="font-th">{{ f.body }}</span>
          </li>
        </ul>

        <ul v-if="p.bullets?.length" class="bullets font-th">
          <li v-for="b in p.bullets" :key="b">{{ b }}</li>
        </ul>

        <div class="plat__links">
          <a class="btn btn--solid" :href="p.primary.href">{{ p.primary.label }}</a>
          <a
            v-for="l in p.links"
            :key="l.href"
            class="btn btn--ghost"
            :href="l.href"
            :target="l.external ? '_blank' : undefined"
            :rel="l.external ? 'noopener' : undefined"
            :download="l.download ? '' : undefined"
          >{{ l.label }}</a>
        </div>
      </div>
    </section>

    <!-- ── แผนภาพการเชื่อมต่อ ── -->
    <section class="diagram">
      <header class="diagram__head">
        <span class="diagram__no">05</span>
        <h2 class="diagram__title">How it fits together</h2>
        <p class="diagram__th font-th">ข้อมูลไหลจากหน้างานจริง ผ่านตัวกลาง ไปจบที่หน้าจอที่คนอ่านแล้วตัดสินใจได้</p>
      </header>

      <button type="button" class="diagram__shot" @click="zoom = true">
        <img src="/diagramSystem.png" alt="แผนภาพการเชื่อมต่อของระบบ" loading="lazy" />
        <span class="diagram__hint font-th">กดเพื่อดูภาพขยาย</span>
      </button>
    </section>

    <!-- ── ทางไปต่อ ── -->
    <section class="ends">
      <p class="ends__th font-th">อยากได้ระบบแบบนี้ในงานของคุณ</p>
      <div class="ends__cta">
        <a class="btn btn--solid" href="/contactV2">CONTACT US</a>
        <a class="btn btn--ghost" href="/projectsV2">VIEW OUR WORK</a>
      </div>
    </section>

    <!-- ── ภาพขยาย ── -->
    <Teleport to="body">
      <Transition name="zoom">
        <div v-if="zoom" class="zoom-mask" @click.self="zoom = false">
          <button type="button" class="zoom-x" aria-label="ปิด" @click="zoom = false">×</button>
          <img src="/diagramSystem.png" alt="แผนภาพการเชื่อมต่อของระบบ" />
        </div>
      </Transition>
    </Teleport>
  </KwShell>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

definePageMeta({ layout: false })

useSeoMeta({
  title: 'FORWARD THINKING — KWANG UNLIMITED',
  description: 'Espresso · MOMAY · Collaborative Sensing · Dashboard — แพลตฟอร์มด้านพลังงาน ความปลอดภัย และข้อมูล ที่กว้างไม่จำกัดพัฒนาขึ้นเอง',
  ogTitle: 'FORWARD THINKING — KWANG UNLIMITED',
  ogDescription: 'แพลตฟอร์มที่เก็บข้อมูลจากหน้างานจริง แล้วแสดงผลให้ตัดสินใจได้ทันที',
  ogImage: '/kwang_logo.png',
})

type Link = { label: string; href: string; external?: boolean; download?: boolean }

/* เนื้อหาและปลายทางยกมาจาก pages/renewable.vue — แก้ที่นั่นแล้วต้องตามมาแก้ที่นี่ */
const PLATFORMS: {
  id: string
  name: string
  nameTh: string
  kicker: string
  logo: string
  body: string
  features?: { head: string; body: string }[]
  bullets?: string[]
  primary: Link
  links: Link[]
}[] = [
  {
    id: 'espresso',
    name: 'ESPRESSO',
    nameTh: 'ระบบบริหารจัดการพลังงานอัจฉริยะ',
    kicker: 'ENERGY MANAGEMENT',
    logo: '/ESPRESSO_logo.png',
    body: 'ติดตามและควบคุมการใช้ไฟฟ้าได้อย่างมีประสิทธิภาพ Espresso ช่วยให้คุณเห็นและวิเคราะห์การใช้พลังงานแบบเรียลไทม์ เพื่อให้ตรวจสอบและแก้ไขปัญหาได้ทันที',
    features: [
      { head: 'REAL-TIME MONITORING', body: 'เฝ้าติดตามพลังงานแบบเรียลไทม์ ตั้งแต่ภาพรวมอาคารจนถึงแต่ละห้อง' },
      { head: 'INSIGHT ANALYTICS', body: 'วิเคราะห์ข้อมูลเชิงลึก พร้อมรายงานรายวัน รายเดือน และรายปี' },
      { head: 'AUTO-REPORTING', body: 'สร้างรายงานอัตโนมัติ ส่งออกเป็น PDF หรือ CSV ได้ทันที' },
      { head: 'WEB ACCESS', body: 'เข้าถึงระบบออนไลน์ได้ทุกที่ ทุกเวลา ผ่านเว็บเบราว์เซอร์' },
    ],
    primary: { label: 'OPEN ESPRESSO', href: '/renewablesort/espresso' },
    links: [
      { label: 'ESPRESSO PHARMACY', href: 'https://my.spline.design/espresopharmacy-a21edee004531a425af1c2768331add8/', external: true },
      { label: 'ESPRESSO HUMAN', href: 'https://my.spline.design/espresohumen-dde33c067dcf5aa8cf10d9d16cfe66b2/', external: true },
      { label: 'DOWNLOAD SALE KIT', href: '/Sale Kit Espresso251125.pdf', download: true },
    ],
  },
  {
    id: 'momay',
    name: 'MOMAY',
    nameTh: 'ตัวกลางรับ–ส่งข้อมูลระหว่างระบบ',
    kicker: 'BEHAVIORAL INTELLIGENCE',
    logo: '/MOMAY_logo.png',
    body: 'MOMAY คือ source code ที่เป็นตัวกลางในการรับข้อมูลจากแหล่งต่าง ๆ ได้ตามความต้องการ แล้วส่งต่อไปยัง Espresso เพื่อแสดงผลแบบเรียลไทม์',
    bullets: ['พลังงานไฟฟ้า', 'กล้องวงจรปิด', 'ห้องสมุดออนไลน์'],
    primary: { label: 'EXPLORE MOMAY', href: '/renewablesort/MomayforSaleV2' },
    links: [
      { label: 'BANKLONG RESORT HOTEL', href: 'https://momaysukhothai.web.app/', external: true },
      { label: 'WONGPANIT SUKHOTHAI', href: 'https://wongpanit-sukhothai.web.app/', external: true },
      { label: 'DOWNLOAD SALE KIT', href: '/Sale Kit Momay181125 .pdf', download: true },
    ],
  },
  {
    id: 'collaborative-sensing',
    name: 'COLLABORATIVE SENSING',
    nameTh: 'หลายอุปกรณ์ หลายระบบ ตรวจจับร่วมกัน',
    kicker: 'DATA IS YOUR SPACE',
    logo: '/datacityplatform.png',
    body: 'กระบวนการที่นำอุปกรณ์หลายตัวหรือหลายระบบมาทำงานร่วมกัน เพื่อตรวจจับ รวบรวม และประมวลผลข้อมูลจากสภาพแวดล้อมโดยรอบ ให้ได้ข้อมูลที่แม่นยำและครอบคลุมยิ่งขึ้น แล้วส่งไปแสดงผลบนระบบ Data is your เพื่อให้ผู้ใช้เข้าถึงและวิเคราะห์ข้อมูลได้อย่างมีประสิทธิภาพ',
    bullets: ['Energy', 'Camera CCTV', 'EV Charger', 'Access Control'],
    primary: { label: 'OPEN PLATFORM', href: '/renewablesort/collaborativesensing' },
    links: [
      { label: 'KWANG DATA IS YOUR SPACE', href: 'https://kwangdataisyourspace.space/', external: true },
    ],
  },
  {
    id: 'dashboard',
    name: 'DASHBOARD',
    nameTh: 'หน้าจอรวมข้อมูลของทุกระบบ',
    kicker: 'ONE SCREEN, EVERY SIGNAL',
    logo: '/chart-logo.png',
    body: 'รวมตัวเลขจากทุกระบบมาไว้บนหน้าจอเดียว เห็นภาพรวมได้ในครั้งเดียว และเจาะลงไปดูรายจุดได้เมื่อมีอะไรผิดปกติ',
    primary: { label: 'OPEN DASHBOARD', href: '/renewablesort/dashboard' },
    links: [],
  },
]

const zoom = ref(false)

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') zoom.value = false
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
/* สีทั้งหมดรับมาจาก KwShell ผ่านตัวแปร CSS */

/* ── สารบัญ ── */
.jump {
  display: grid; gap: clamp(10px, 1.4vw, 16px);
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  padding-bottom: clamp(18px, 2.4vw, 28px);
  border-bottom: 1px solid rgba(29, 27, 25, 0.14);
}
.jump__item {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 16px;
  text-decoration: none;
  border: 1px solid rgba(29, 27, 25, 0.14);
  background: rgba(251, 247, 238, 0.6);
  transition: border-color 0.22s, transform 0.22s;
}
.jump__item:hover { border-color: var(--gold); transform: translateY(-2px); }
.jump__mark {
  display: grid; place-items: center; flex: none;
  width: 38px; height: 38px; border-radius: 50%;
  background: var(--paper-2); border: 1px solid rgba(29, 27, 25, 0.12);
}
.jump__mark img { width: 24px; height: 24px; object-fit: contain; }
.jump__name {
  font-size: clamp(10px, 1vw, 11.5px); font-weight: 600; letter-spacing: 0.16em; color: var(--ink-soft);
  line-height: 1.4;
}

/* ── แพลตฟอร์ม ── */
.plat {
  display: grid;
  grid-template-columns: clamp(140px, 17vw, 230px) 1fr;
  gap: clamp(22px, 4vw, 60px);
  margin-top: clamp(42px, 6.5vw, 96px);
  /* หัวข้อไม่ให้ไปมุดใต้แถบเมนูที่ติดขอบบนตอนกดจากสารบัญ */
  scroll-margin-top: 110px;
}
.plat__side { display: grid; justify-items: center; gap: 16px; align-content: start; }
.plat__no {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(22px, 2.6vw, 32px); color: var(--gold);
}
.plat__disc {
  display: grid; place-items: center;
  width: 100%; max-width: 190px; aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle at 42% 34%, var(--paper-2) 0%, #f1e9da 100%);
  border: 1px solid rgba(194, 164, 104, 0.85);
  box-shadow: 0 14px 34px rgba(24, 20, 16, 0.09), inset 0 0 0 7px rgba(251, 247, 238, 0.9);
  transition: transform 0.3s;
}
.plat:hover .plat__disc { transform: translateY(-3px); }
.plat__disc img { width: 62%; height: 62%; object-fit: contain; }

.plat__kicker { font-size: clamp(10px, 1vw, 12px); font-weight: 600; letter-spacing: 0.26em; color: var(--red); }
.plat__name {
  margin-top: 10px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(26px, 3.8vw, 48px); font-weight: 500; line-height: 1.08; color: var(--ink);
}
.plat__th { margin-top: 6px; font-size: clamp(13px, 1.35vw, 17px); color: var(--ink-soft); }
.plat__rule {
  display: block; width: min(100%, 460px); height: 1px;
  margin: clamp(14px, 2vw, 22px) 0;
  background: linear-gradient(90deg, rgba(29, 27, 25, 0.3), rgba(29, 27, 25, 0.05));
}
.plat__body { max-width: 760px; font-size: clamp(13px, 1.3vw, 16px); line-height: 1.95; color: var(--ink-soft); }

.feats {
  display: grid; gap: clamp(12px, 1.6vw, 18px);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  margin: clamp(18px, 2.6vw, 30px) 0 0; padding: 0; list-style: none;
}
.feats li {
  padding: 16px 18px;
  background: rgba(251, 247, 238, 0.7);
  border: 1px solid rgba(29, 27, 25, 0.12);
  border-left: 2px solid var(--gold);
}
.feats b { display: block; font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em; color: var(--ink); }
.feats span { display: block; margin-top: 8px; font-size: 12.5px; line-height: 1.8; color: var(--ink-soft); }

.bullets { display: flex; flex-wrap: wrap; gap: 10px; margin: clamp(16px, 2.2vw, 24px) 0 0; padding: 0; list-style: none; }
.bullets li {
  padding: 7px 14px;
  font-size: 12.5px; color: var(--ink-soft);
  border: 1px solid rgba(29, 27, 25, 0.16);
  border-radius: 999px;
  background: rgba(251, 247, 238, 0.7);
}

.plat__links { display: flex; flex-wrap: wrap; gap: clamp(10px, 1.2vw, 14px); margin-top: clamp(20px, 3vw, 34px); }

/* ── แผนภาพ ── */
.diagram { margin-top: clamp(42px, 6.5vw, 96px); }
.diagram__head { margin-bottom: clamp(18px, 2.6vw, 30px); }
.diagram__no { display: block; font-size: 11px; font-weight: 600; letter-spacing: 0.3em; color: var(--gold); }
.diagram__title {
  margin-top: 8px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(24px, 3.4vw, 42px); font-weight: 500; color: var(--ink);
}
.diagram__th { margin-top: 6px; max-width: 640px; font-size: clamp(13px, 1.3vw, 16px); line-height: 1.8; color: var(--ink-dim); }
.diagram__shot {
  position: relative; display: block; width: 100%; padding: clamp(14px, 2vw, 26px);
  background: rgba(251, 247, 238, 0.72);
  border: 1px solid rgba(29, 27, 25, 0.14);
  cursor: zoom-in;
  transition: border-color 0.22s;
}
.diagram__shot:hover { border-color: var(--gold); }
.diagram__shot img { display: block; width: 100%; max-width: 880px; margin: 0 auto; height: auto; }
.diagram__hint {
  display: block; margin-top: 10px;
  font-size: 11.5px; letter-spacing: 0.06em; color: var(--ink-dim); text-align: center;
}

/* ── ทางไปต่อ ── */
.ends {
  margin-top: clamp(42px, 6.5vw, 96px);
  padding-top: clamp(24px, 3.4vw, 40px);
  border-top: 1px solid rgba(29, 27, 25, 0.14);
}
.ends__th { font-size: clamp(14px, 1.5vw, 19px); color: var(--ink-soft); }
.ends__cta { display: flex; flex-wrap: wrap; gap: clamp(10px, 1.2vw, 16px); margin-top: clamp(14px, 2vw, 24px); }

/* ── ปุ่ม ── */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: clamp(11px, 1.3vw, 16px) clamp(18px, 1.9vw, 28px);
  font-size: clamp(10px, 1vw, 12.5px); font-weight: 600; letter-spacing: 0.18em;
  text-decoration: none; text-align: center;
  transition: background 0.22s, color 0.22s, border-color 0.22s, transform 0.22s;
}
.btn--solid { background: var(--red); color: #fdf8ef; }
.btn--solid:hover { background: #8a171e; transform: translateY(-1px); }
.btn--ghost { background: transparent; color: var(--ink); border: 1px solid rgba(29, 27, 25, 0.42); }
.btn--ghost:hover { border-color: var(--ink); background: rgba(29, 27, 25, 0.045); transform: translateY(-1px); }
.ends__cta .btn { min-width: clamp(180px, 17vw, 244px); }

/* ── ภาพขยาย ── */
.zoom-mask {
  position: fixed; inset: 0; z-index: 90;
  display: grid; place-items: center; padding: clamp(16px, 4vw, 48px);
  background: rgba(24, 20, 16, 0.72); backdrop-filter: blur(3px);
}
.zoom-mask img { max-width: 100%; max-height: 88svh; background: var(--paper-2); padding: 12px; }
.zoom-x {
  position: absolute; top: 14px; right: 20px;
  font-size: 34px; line-height: 1; color: #f3ead9;
  background: none; border: 0; cursor: pointer;
}
.zoom-enter-active, .zoom-leave-active { transition: opacity 0.2s ease; }
.zoom-enter-from, .zoom-leave-to { opacity: 0; }

/* ── จอแคบ ── */
@media (max-width: 860px) {
  .plat { grid-template-columns: 1fr; gap: clamp(18px, 3vw, 26px); }
  .plat__side { justify-items: start; grid-auto-flow: column; align-items: center; justify-content: start; gap: 18px; }
  .plat__disc { width: clamp(96px, 26vw, 140px); }
}

@media (max-width: 640px) {
  .ends__cta .btn { min-width: 0; flex: 1 1 200px; }
}
</style>
