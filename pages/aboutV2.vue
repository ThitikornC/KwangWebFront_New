<!--
  ABOUT (V2) — /aboutV2

  ชุดเดียวกับ /home2 · หน้าเดิมคือ /valueProposition (ProfileAboutUs + ProfileMission + ProfileContact)
  ไม่ถูกแตะ หน้านี้เป็นอีกทางเลือกที่วางคู่กันไว้

  เนื้อความ ปีในเส้นเวลา และหัวข้อภารกิจ ยกมาจาก
      components/Profile/AboutUs.vue
      components/Profile/Mission.vue
  แก้ข้อความที่นั่นแล้วต้องตามมาแก้ที่นี่ (คนละชุด CSS กัน จงใจไม่แชร์)

  โครงหน้า แถบเมนู แถบท้าย อยู่ที่ components/Kw/Shell.vue
-->
<template>
  <KwShell
    active="about"
    eyebrow="ABOUT KWANG UNLIMITED"
    title="We build what comes next."
    title-th="บริษัท กว้างไม่จำกัด — ออกแบบ ติดตั้ง และพัฒนาแพลตฟอร์มที่ทำให้เทคโนโลยีเป็นเรื่องใช้ได้จริง"
    lead="ก่อตั้งที่จังหวัดพิษณุโลกเมื่อปี 2024 เริ่มจากงานออกแบบและติดตั้งระบบโซลาร์เซลล์และไอทีเน็ตเวิร์ค ให้ทั้งหน่วยงานภาครัฐและภาคเอกชนในพิษณุโลกและจังหวัดใกล้เคียง แล้วขยายมาสู่การพัฒนาซอฟต์แวร์และแพลตฟอร์มผู้ช่วยอัจฉริยะด้านพลังงาน ความปลอดภัย และการศึกษา"
  >
    <!-- ── ตัวเลขสรุป ── -->
    <section class="facts">
      <div v-for="s in STATS" :key="s.label" class="fact">
        <span class="fact__num">{{ s.num }}</span>
        <span class="fact__label">{{ s.label }}</span>
        <span class="fact__th font-th">{{ s.th }}</span>
      </div>
    </section>

    <!-- ── เรื่องของเรา ── -->
    <section class="sect">
      <header class="sect__head">
        <span class="sect__no">01</span>
        <h2 class="sect__title">Who we are</h2>
        <p class="sect__th font-th">เกี่ยวกับเรา</p>
      </header>

      <div class="story font-th">
        <p>
          บริษัท กว้างไม่จำกัด ก่อตั้งขึ้นที่จังหวัดพิษณุโลกในปี 2024 ในฐานะบริษัทการออกแบบและติดตั้งระบบโซลาร์เซลล์
          และไอทีเน็ตเวิร์ค เคยให้บริการทั้งองค์กรภาครัฐบาลและภาคเอกชนในจังหวัดพิษณุโลกและจังหวัดใกล้เคียง
        </p>
        <p>
          หลังจากนั้นได้พัฒนาซอฟต์แวร์และแพลตฟอร์มบริการด้านจัดการพลังงานทดแทน ความปลอดภัย และการศึกษา
          ซึ่งผสานการบริหารจัดการและการให้คำปรึกษาตามความต้องการสินค้าและบริการเข้าด้วยกัน
          โดยมุ่งเน้นการนำเทคโนโลยีมาสร้างความเปลี่ยนแปลงให้กับสังคมอย่างตรงไปตรงมา
        </p>
      </div>

      <!-- คำประจำบริษัท — วิ่งไปเรื่อย ๆ เหมือนตัววิ่งของหน้าเดิม แต่เป็นเส้นบาง ๆ ไม่ใช่ป้ายนีออน -->
      <div class="ticker" aria-hidden="true">
        <div class="ticker__track">
          <span v-for="i in 4" :key="i" class="ticker__set">
            <b>MAKE TECH FRESH, GET FORWARD</b>
            <i>✦</i>
            <b>EST 24 / 01 / 2024</b>
            <i>✦</i>
          </span>
        </div>
      </div>
    </section>

    <!-- ── เส้นเวลา ── -->
    <section class="sect">
      <header class="sect__head">
        <span class="sect__no">02</span>
        <h2 class="sect__title">The road so far</h2>
        <p class="sect__th font-th">เส้นทางที่ผ่านมา</p>
      </header>

      <ol class="tl">
        <li v-for="t in TIMELINE" :key="t.year" class="tl__item">
          <span class="tl__dot" aria-hidden="true" />
          <span class="tl__year">{{ t.year }}</span>
          <h3 class="tl__head">{{ t.head }}</h3>
          <p class="tl__body font-th">{{ t.body }}</p>
        </li>
      </ol>
    </section>

    <!-- ── ภารกิจ ── -->
    <section class="sect">
      <header class="sect__head">
        <span class="sect__no">03</span>
        <h2 class="sect__title">Mission</h2>
        <p class="sect__th font-th">ภารกิจ</p>
      </header>

      <div class="cards">
        <article v-for="m in MISSION" :key="m.head" class="mcard">
          <span class="mcard__rule" aria-hidden="true" />
          <h3 class="mcard__head">{{ m.head }}</h3>
          <p class="mcard__body font-th">{{ m.body }}</p>
        </article>
      </div>

      <!-- IMPACT PARTNER แยกออกมาเป็นแผ่นกว้างใบเดียว เพราะเป็นคำสัญญาต่อคู่ค้า ไม่ใช่หนึ่งในสามข้อ -->
      <article class="wide">
        <p class="wide__eyebrow">IMPACT PARTNER</p>
        <p class="wide__body font-th">
          ความร่วมมือในการออกแบบแผนการ ดำเนินการตั้งแต่เริ่มต้น
          โดยเฉพาะโครงการดิจิทัล ให้บรรลุเป้าหมายระยะยาวร่วมกับผู้ที่เกี่ยวข้อง
        </p>
      </article>
    </section>

    <!-- ── ทางไปต่อ ── -->
    <section class="ends">
      <p class="ends__th font-th">อยากเห็นว่าเราทำอะไรมาแล้วบ้าง</p>
      <div class="ends__cta">
        <a class="btn btn--solid" href="/projectsV2">VIEW OUR WORK</a>
        <a class="btn btn--ghost" href="/contactV2">CONTACT US</a>
      </div>
    </section>
  </KwShell>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useSeoMeta({
  title: 'ABOUT — KWANG UNLIMITED',
  description: 'บริษัท กว้างไม่จำกัด — ออกแบบ ติดตั้ง และพัฒนาแพลตฟอร์มด้านพลังงาน ความปลอดภัย และการศึกษา ตั้งแต่ปี 2024',
  ogTitle: 'ABOUT — KWANG UNLIMITED',
  ogDescription: 'MAKE TECH FRESH, GET FORWARD — EST 24/01/2024',
  ogImage: '/kwang_logo.png',
})

const STATS = [
  { num: '2024', label: 'FOUNDED', th: 'ก่อตั้งที่พิษณุโลก' },
  { num: '03', label: 'CORE FIELDS', th: 'พลังงาน · ความปลอดภัย · ซอฟต์แวร์' },
  { num: '04', label: 'PLATFORMS', th: 'Espresso · MOMAY · Collaborative Sensing · Dashboard' },
]

/* เส้นเวลา — ข้อความยกมาจาก components/Profile/AboutUs.vue */
const TIMELINE = [
  {
    year: '2024',
    head: 'RENEWABLE ENERGY',
    body: 'เริ่มจากการออกแบบและติดตั้งระบบโซลาร์เซลล์ครบวงจร ซึ่งสะท้อนความมุ่งมั่นของเราในการสนับสนุนพลังงานทดแทน และสร้างอนาคตที่เป็นมิตรต่อสิ่งแวดล้อม',
  },
  {
    year: '2025',
    head: 'DIGITAL INFRASTRUCTURE',
    body: 'ขยายธุรกิจเข้าสู่พื้นที่โครงสร้างพื้นฐานดิจิทัล ด้วยการออกแบบและติดตั้งระบบเครือข่าย IT ที่มีประสิทธิภาพสูง เพื่อเสริมความมั่นคงและความสามารถในการขยายตัวขององค์กร',
  },
  {
    year: '2026',
    head: 'SOFTWARE & PLATFORMS',
    body: 'มุ่งเน้นไปที่นวัตกรรมดิจิทัล ด้วยการพัฒนาซอฟต์แวร์และแพลตฟอร์มล้ำสมัย ที่ช่วยเพิ่มประสิทธิภาพ การเชื่อมต่อ และการตัดสินใจที่ชาญฉลาดสำหรับลูกค้าของเรา',
  },
]

/* ภารกิจ — ยกมาจาก components/Profile/Mission.vue */
const MISSION = [
  {
    head: 'TECHNICAL REPRESENTATIVE',
    body: 'ตัวแทนด้านเทคนิคที่นำเสนอข้อมูลเชิงเทคนิคให้เข้าใจง่าย และน่าสนใจสำหรับทุกกลุ่มผู้ฟัง',
  },
  {
    head: 'ADAPT, AND TEST',
    body: 'ปรับตัวและทดสอบ โดยยึดความพึงพอใจของลูกค้าเป็นหลัก',
  },
  {
    head: 'IMPROVING COMPETITIVENESS',
    body: 'วางแผน ปรับเปลี่ยน ทดสอบ โดยยึดความพึงพอใจของผู้บริโภคเป็นหลัก',
  },
]
</script>

<style scoped>
/* สีทั้งหมดรับมาจาก KwShell ผ่านตัวแปร CSS — ที่นี่ไม่ประกาศสีเองเพื่อไม่ให้สองที่หลุดกัน */

/* ── ตัวเลขสรุป ── */
.facts {
  display: grid; gap: clamp(16px, 2.4vw, 32px);
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  padding: clamp(18px, 2.6vw, 30px) 0;
  border-top: 1px solid rgba(29, 27, 25, 0.14);
  border-bottom: 1px solid rgba(29, 27, 25, 0.14);
}
.fact { display: grid; gap: 6px; }
.fact__num {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(28px, 3.4vw, 44px); font-weight: 500; line-height: 1; color: var(--red);
}
.fact__label { font-size: 10.5px; font-weight: 600; letter-spacing: 0.24em; color: var(--ink); }
.fact__th { font-size: 12.5px; line-height: 1.7; color: var(--ink-dim); }

/* ── หัวข้อของแต่ละตอน ── */
.sect { margin-top: clamp(42px, 6.5vw, 96px); }
.sect__head { margin-bottom: clamp(20px, 3vw, 36px); }
.sect__no {
  display: block; font-size: 11px; font-weight: 600; letter-spacing: 0.3em; color: var(--gold);
}
.sect__title {
  margin-top: 8px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(24px, 3.4vw, 42px); font-weight: 500; line-height: 1.1; color: var(--ink);
}
.sect__th { margin-top: 5px; font-size: clamp(13px, 1.3vw, 16px); color: var(--ink-dim); }

/* ── ย่อหน้าเนื้อความ ── */
.story { max-width: 820px; display: grid; gap: clamp(12px, 1.6vw, 18px); }
.story p {
  font-size: clamp(13.5px, 1.35vw, 17px); line-height: 1.95; color: var(--ink-soft);
  text-indent: 2em;
}

/* ── ตัววิ่ง ── */
.ticker {
  margin-top: clamp(26px, 4vw, 48px);
  padding: 14px 0;
  border-top: 1px solid rgba(29, 27, 25, 0.14);
  border-bottom: 1px solid rgba(29, 27, 25, 0.14);
  overflow: hidden;
  /* จางที่ปลายทั้งสองข้าง ให้ดูเหมือนวิ่งมาจากนอกจอ ไม่ใช่โผล่มาเฉย ๆ */
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.ticker__track { display: flex; width: max-content; animation: aboutTicker 34s linear infinite; }
.ticker__set { display: flex; align-items: center; gap: clamp(18px, 3vw, 40px); padding-right: clamp(18px, 3vw, 40px); }
.ticker__set b { font-size: clamp(10.5px, 1.05vw, 13px); font-weight: 600; letter-spacing: 0.26em; color: var(--ink-soft); white-space: nowrap; }
.ticker__set i { font-style: normal; color: var(--gold); }
/* เลื่อนไป 25% = ความกว้างของ 1 ชุดจาก 4 ชุด — วนกลับแล้วภาพตรงกันพอดี ไม่มีรอยต่อ */
@keyframes aboutTicker { to { transform: translateX(-25%); } }

/* ── เส้นเวลา ── */
.tl {
  display: grid; gap: clamp(22px, 3vw, 38px);
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  list-style: none; margin: 0; padding: 0;
  position: relative;
}
.tl__item {
  position: relative;
  padding-top: 26px;
  border-top: 1px solid rgba(29, 27, 25, 0.2);
}
.tl__dot {
  position: absolute; top: -4.5px; left: 0;
  width: 9px; height: 9px; border-radius: 50%; background: var(--red);
}
.tl__year {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(26px, 3vw, 38px); font-weight: 500; color: var(--ink);
}
.tl__head {
  margin-top: 8px;
  font-size: clamp(10.5px, 1.05vw, 12.5px); font-weight: 600; letter-spacing: 0.22em; color: var(--red);
}
.tl__body { margin-top: 12px; font-size: clamp(13px, 1.25vw, 15px); line-height: 1.9; color: var(--ink-soft); }

/* ── การ์ดภารกิจ ── */
.cards {
  display: grid; gap: clamp(16px, 2.2vw, 26px);
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
}
.mcard {
  padding: clamp(22px, 2.6vw, 34px);
  background: rgba(251, 247, 238, 0.72);
  border: 1px solid rgba(29, 27, 25, 0.14);
  transition: border-color 0.24s, transform 0.24s, background 0.24s;
}
.mcard:hover { border-color: var(--gold); background: rgba(251, 247, 238, 0.95); transform: translateY(-3px); }
.mcard__rule { display: block; width: 34px; height: 2px; background: var(--red); }
.mcard__head {
  margin-top: 18px;
  font-size: clamp(12px, 1.2vw, 14.5px); font-weight: 700; letter-spacing: 0.14em; line-height: 1.5; color: var(--ink);
}
.mcard__body { margin-top: 12px; font-size: clamp(13px, 1.25vw, 15px); line-height: 1.9; color: var(--ink-soft); }

.wide {
  margin-top: clamp(16px, 2.2vw, 26px);
  padding: clamp(22px, 3vw, 38px);
  border: 1px solid rgba(29, 27, 25, 0.14);
  border-left: 3px solid var(--red);
  background: rgba(251, 247, 238, 0.72);
}
.wide__eyebrow { font-size: clamp(11px, 1.1vw, 13px); font-weight: 700; letter-spacing: 0.24em; color: var(--red); }
.wide__body {
  margin-top: 12px; max-width: 760px;
  font-size: clamp(13px, 1.3vw, 16px); line-height: 1.9; color: var(--ink-soft);
}

/* ── ทางไปต่อ ── */
.ends {
  margin-top: clamp(42px, 6.5vw, 96px);
  padding-top: clamp(24px, 3.4vw, 40px);
  border-top: 1px solid rgba(29, 27, 25, 0.14);
}
.ends__th { font-size: clamp(14px, 1.5vw, 19px); color: var(--ink-soft); }
.ends__cta { display: flex; flex-wrap: wrap; gap: clamp(10px, 1.2vw, 16px); margin-top: clamp(14px, 2vw, 24px); }
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: clamp(180px, 17vw, 244px);
  padding: clamp(12px, 1.4vw, 18px) clamp(20px, 2vw, 30px);
  font-size: clamp(11px, 1vw, 13.5px); font-weight: 600; letter-spacing: 0.18em;
  text-decoration: none;
  transition: background 0.22s, color 0.22s, border-color 0.22s, transform 0.22s;
}
.btn--solid { background: var(--red); color: #fdf8ef; }
.btn--solid:hover { background: #8a171e; transform: translateY(-1px); }
.btn--ghost { background: transparent; color: var(--ink); border: 1px solid rgba(29, 27, 25, 0.42); }
.btn--ghost:hover { border-color: var(--ink); background: rgba(29, 27, 25, 0.045); transform: translateY(-1px); }

@media (max-width: 640px) {
  .btn { min-width: 0; flex: 1 1 200px; }
  .story p { text-indent: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .ticker__track { animation: none; }
}
</style>
