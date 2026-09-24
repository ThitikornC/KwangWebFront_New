<!--
  ABOUT (V2) — /aboutV2

  หน้าเดิมคือ /valueProposition (ProfileAboutUs + ProfileMission + Contact) — เปลี่ยนแค่ดีไซน์ เนื้อหาไม่แต่งเพิ่ม
  ข้อความทุกบรรทัดยกมาจาก
      components/Profile/AboutUs.vue   — ตัววิ่ง, เกี่ยวกับเรา, เส้นเวลา 2024–2026
      components/Profile/Mission.vue   — MISSION / ภารกิจ, IMPACT PARTNER
      components/Profile/Contact.vue   — CONTACT / ช่องการติดต่อ
  หน้าเดิมเป็นภาษาไทยเกือบทั้งหมด หัวข้อจึงใช้ภาษาไทยตัวใหญ่ ส่วนคำอังกฤษใช้เฉพาะที่หน้าเดิมมี

  โครงหน้า แถบเมนู แถบท้าย อยู่ที่ components/Kw/Shell.vue
-->
<template>
  <KwShell active="about">
    <KwTicker :words="['Make tech fresh get forward', 'EST 24/01/2024']" />

    <!-- ── เกี่ยวกับเรา ── -->
    <section class="sect sect--first">
      <h1 class="th-title font-th">เกี่ยวกับเรา</h1>
      <div class="story font-th">
        <p>
          บริษัท กว้างไม่จำกัด ก่อตั้งขึ้นที่จังหวัดพิษณุโลกในปี 2024 ในฐานะบริษัทการออกแบบและติดตั้งระบบโซล่าเซลล์ ไอทีเน็ตเวิร์ค
          เคยให้บริการทั้งองค์กรภาครัฐบาลและภาคเอกชนในจังหวัดพิษณุโลกและจังหวัดใกล้เคียง
          หลังจากนั้นได้พัฒนาซอฟแวร์และแพลตฟอร์มผู้ช่วยอัจฉริยะด้านพลังงาน ปลอดภัย การศึกษา
          ซึ่งผสานการบริหารจัดการการให้คำปรึกษาตามความต้องการสินค้าและบริการเข้าด้วยกันที่มุ่งเน้นนำเทคโนโลยีสร้างความเปลี่ยนแปลง ให้กับสังคมอย่างตรงไปตรงมา
        </p>
        <p>
          หลังจากนั้นได้พัฒนาซอฟแวร์และแพลตฟอร์มบริการด้านจัดการพลังงานทดแทน ความปลอดภัย การศึกษา
          ซึ่งผสานการบริหารจัดการการให้คำปรึกษาตามความต้องการสินค้าและบริการเข้าด้วยกันที่มุ่งเน้นนำเทคโนโลยีสร้างความเปลี่ยนแปลง ให้กับสังคมอย่างตรงไปตรงมา
        </p>
      </div>
    </section>

    <!-- ── เส้นเวลา ── -->
    <section class="sect">
      <ol class="tl">
        <li v-for="t in TIMELINE" :key="t.year" class="tl__item">
          <span class="tl__dot" aria-hidden="true" />
          <span class="tl__year">{{ t.year }}</span>
          <p class="tl__body font-th">{{ t.body }}</p>
        </li>
      </ol>
    </section>

    <!-- ── ภารกิจ ── -->
    <section class="sect">
      <header class="sect__head">
        <p class="sect__en">MISSION</p>
        <h2 class="th-title font-th">ภารกิจ</h2>
      </header>

      <div class="cards">
        <article v-for="m in MISSION" :key="m.head" class="mcard">
          <span class="mcard__rule" aria-hidden="true" />
          <p class="mcard__body font-th">{{ m.body }}</p>
          <h3 class="mcard__head">{{ m.head }}</h3>
        </article>
      </div>

      <article class="wide">
        <p class="wide__body font-th">
          ความร่วมมือในการออกแบบแผนการ ดำเนินการ
          ตั้งแต่เริ่มต้นโดยเฉพาะโครงการดิจิทัลให้บรรลุเป้าหมายระยะยาวกับผู้ที่เกี่ยวข้อง
        </p>
        <p class="wide__eyebrow">IMPACT PARTNER</p>
      </article>
    </section>

    <!-- ── ช่องการติดต่อ ── -->
    <section class="sect">
      <header class="sect__head">
        <p class="sect__en">CONTACT</p>
        <h2 class="th-title font-th">ช่องการติดต่อ</h2>
      </header>

      <div class="contact">
        <iframe
          class="contact__map"
          title="แผนที่ กว้างไม่จำกัด"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3818.424958886644!2d100.26615407593243!3d16.85486001792612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30df99f39574afa1%3A0x665337f03ba679c5!2zS1dBTkcgU09DSUVUWSAtIOC4geC4p-C5ieC4suC4hyDguYLguIvguYTguIvguJXguLXguYkg4Lie4Li34LmJ4LiZ4LiX4Li14LmI4Liq4Lij4LmJ4Liy4LiH4Liq4Lij4Lij4LiE4LmM4Liq4Liz4Lir4Lij4Lix4Lia4LiE4Li44LiT!5e0!3m2!1sth!2sth!4v1717931309861!5m2!1sth!2sth"
          loading="lazy"
        />
        <div class="contact__info font-th">
          <div class="cblock">
            <h3>ที่อยู่</h3>
            <p>กว้างไม่จำกัด 263/1 หมู่ 6<br />ตำบลหัวรอ อำเภอเมือง<br />จังหวัดพิษณุโลก 65000</p>
          </div>
          <div class="cblock">
            <h3>เวลาให้บริการ</h3>
            <p>จันทร์ - ศุกร์ : 10.00 น - 17.00 น<br />เสาร์ - อาทิตย์ : 10.00 น - 15.00 น</p>
          </div>
          <div class="cblock">
            <h3>การติดต่อ</h3>
            <p>
              <a href="mailto:Natthaphongphothikoed@gmail.com">Natthaphongphothikoed@gmail.com</a><br />
              <a href="tel:0839549743">083-954-9743</a><br />
              Mrjob1001<br />
              Kwangunlimit/กว้างไม่จำกัด
            </p>
          </div>
        </div>
      </div>
    </section>
  </KwShell>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useSeoMeta({
  title: 'ABOUT — KWANG UNLIMITED',
  description: 'บริษัท กว้างไม่จำกัด ก่อตั้งขึ้นที่จังหวัดพิษณุโลกในปี 2024',
  ogTitle: 'ABOUT — KWANG UNLIMITED',
  ogDescription: 'Make tech fresh get forward — EST 24/01/2024',
  ogImage: '/kwang_logo.png',
})

/* เส้นเวลา — ข้อความยกมาจาก components/Profile/AboutUs.vue */
const TIMELINE = [
  {
    year: '2024',
    body: 'บริษัทของเราได้ก้าวสู่การเป็นผู้นำด้านโซลูชันที่ยั่งยืน โดยเริ่มจาก การออกแบบและติดตั้งระบบโซลาร์เซลล์ครบวงจร ซึ่งสะท้อนถึงความมุ่งมั่นของเราในการสนับสนุนพลังงานทดแทนและสร้างอนาคตที่เป็นมิตรต่อสิ่งแวดล้อม',
  },
  {
    year: '2025',
    body: 'เราขยายธุรกิจเข้าสู่พื้นที่โครงสร้างพื้นฐานดิจิทัล ด้วยการ ออกแบบและติดตั้งระบบเครือข่าย IT ที่มีประสิทธิภาพสูง เพื่อเสริมสร้างความมั่นคงและความสามารถในการขยายตัวขององค์กร',
  },
  {
    year: '2026',
    body: 'เราได้มุ่งเน้นไปที่ นวัตกรรมดิจิทัล ด้วยการ พัฒนาซอฟต์แวร์และแพลตฟอร์มดิจิทัลล้ำสมัย ที่ช่วยเพิ่มประสิทธิภาพ การเชื่อมต่อ และการตัดสินใจที่ชาญฉลาดสำหรับลูกค้าของเรา',
  },
]

/* ภารกิจ — ยกมาจาก components/Profile/Mission.vue */
const MISSION = [
  {
    head: 'TECHNICAL REPRESENTATIVE',
    body: 'ตัวแทนด้านเทคนิคที่นำเสนอข้อมูลเชิงเทคนิคให้เข้าใจง่ายและน่าสนใจสำหรับทุกกลุ่มผู้ฟัง',
  },
  {
    head: 'ADAPT, AND TEST',
    body: 'ปรับตัว และทดสอบ โดยยึดความพึงพอใจของลูกค้าเป็นหลัก',
  },
  {
    head: 'FOCUS ON CONTINUOUSLY IMPROVING BUSINESS COMPETITIVENESS',
    body: 'วางแผน ปรับเปลี่ยน ทดสอบ โดยยึดความพึงพอใจของผู้บริโภคเป็นหลัก',
  },
]
</script>

<style scoped>
/* สีทั้งหมดรับมาจาก KwShell ผ่านตัวแปร CSS — ที่นี่ไม่ประกาศสีเองเพื่อไม่ให้สองที่หลุดกัน */

/* ขนาดหัวข้อ — ใช้ทั้งหัวข้อไทยและหัวข้ออังกฤษที่คู่กัน */
.sect { --head-size: clamp(26px, 3.4vw, 44px); }

/* หัวข้อภาษาไทย — ตัวหลักของหน้า เพราะหน้าเดิมเป็นไทย */
.th-title {
  font-family: 'Noto Sans Thai', 'Montserrat', sans-serif;
  font-size: var(--head-size); font-weight: 600; line-height: 1.25; color: var(--ink);
}

.sect { margin-top: clamp(42px, 6.5vw, 96px); }
.sect--first { margin-top: clamp(28px, 4vw, 52px); }
.sect__head { margin-bottom: clamp(20px, 3vw, 36px); }
/* หัวข้ออังกฤษขนาดเท่าหัวข้อไทย ใช้ตัวแปรเดียวกันจะได้ไม่หลุดกัน */
.sect__en {
  font-size: var(--head-size); font-weight: 600; line-height: 1.2; letter-spacing: 0.06em;
  color: var(--red);
}

/* ── ย่อหน้าเนื้อความ ── */
.story { max-width: 900px; display: grid; gap: clamp(14px, 1.8vw, 20px); margin-top: clamp(16px, 2.2vw, 26px); }
.story p {
  font-size: clamp(17px, 1.6vw, 21px); line-height: 1.95; color: var(--ink-soft);
  text-indent: 2em;
}

/* ── เส้นเวลา ── */
.tl {
  display: grid; gap: clamp(22px, 3vw, 38px);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  list-style: none; margin: 0; padding: 0;
}
.tl__item { position: relative; padding-top: 26px; border-top: 1px solid rgba(29, 27, 25, 0.2); }
.tl__dot { position: absolute; top: -4.5px; left: 0; width: 9px; height: 9px; border-radius: 50%; background: var(--red); }
.tl__year {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(28px, 3.2vw, 42px); font-weight: 500; color: var(--ink);
}
.tl__body { margin-top: 12px; font-size: clamp(16px, 1.45vw, 18.5px); line-height: 1.9; color: var(--ink-soft); }

/* ── การ์ดภารกิจ — ไทยเป็นตัวหลัก อังกฤษเป็นป้ายเล็กใต้ ── */
.cards {
  display: grid; gap: clamp(16px, 2.2vw, 26px);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 270px), 1fr));
}
.mcard {
  display: flex; flex-direction: column;
  padding: clamp(22px, 2.6vw, 34px);
  background: rgba(251, 247, 238, 0.72);
  border: 1px solid rgba(29, 27, 25, 0.14);
  transition: border-color 0.24s, transform 0.24s, background 0.24s;
}
.mcard:hover { border-color: var(--gold); background: rgba(251, 247, 238, 0.95); transform: translateY(-3px); }
.mcard__rule { display: block; width: 34px; height: 2px; background: var(--red); }
.mcard__body { margin-top: 18px; font-size: clamp(17px, 1.6vw, 21px); font-weight: 500; line-height: 1.75; color: var(--ink); }
.mcard__head {
  margin-top: auto; padding-top: 16px;
  font-size: clamp(10.5px, 1vw, 12px); font-weight: 600; letter-spacing: 0.16em; line-height: 1.6; color: var(--ink-dim);
}

.wide {
  margin-top: clamp(16px, 2.2vw, 26px);
  padding: clamp(22px, 3vw, 38px);
  border: 1px solid rgba(29, 27, 25, 0.14);
  border-left: 3px solid var(--red);
  background: rgba(251, 247, 238, 0.72);
}
.wide__body { max-width: 860px; font-size: clamp(17px, 1.6vw, 21px); font-weight: 500; line-height: 1.8; color: var(--ink); }
.wide__eyebrow { margin-top: 14px; font-size: clamp(10.5px, 1vw, 12px); font-weight: 600; letter-spacing: 0.24em; color: var(--red); }

/* ── ช่องการติดต่อ ── */
.contact {
  display: grid; gap: clamp(18px, 2.6vw, 32px);
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
}
.contact__map {
  width: 100%; min-height: 340px; height: 100%;
  border: 1px solid rgba(29, 27, 25, 0.16);
  background: var(--paper-2);
}
.contact__info {
  display: grid; align-content: start;
  background: rgba(251, 247, 238, 0.72);
  border: 1px solid rgba(29, 27, 25, 0.14);
}
.cblock { padding: clamp(16px, 2vw, 24px) clamp(18px, 2.4vw, 28px); }
.cblock + .cblock { border-top: 1px solid rgba(29, 27, 25, 0.12); }
.cblock h3 { font-size: clamp(17px, 1.6vw, 20px); font-weight: 600; color: var(--ink); }
.cblock p { margin-top: 8px; font-size: clamp(15px, 1.35vw, 17px); line-height: 1.85; color: var(--ink-soft); overflow-wrap: anywhere; }
.cblock a { color: inherit; text-decoration: none; border-bottom: 1px solid rgba(160, 28, 36, 0.35); }
.cblock a:hover { color: var(--red); }

@media (max-width: 860px) {
  .contact { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .story p { text-indent: 0; }
}
</style>
