<!--
  CONTACT (V2) — /contactV2

  ชุดเดียวกับ /home2 · หน้าเดิมคือ /contact (ProfileContact + ProfileInspiration) ไม่ถูกแตะ

  ที่อยู่ เวลาทำการ ช่องทางติดต่อ และพิกัดแผนที่ ยกมาจาก components/Profile/Contact.vue
  เบอร์สองเบอร์ด้านบนคือชุดเดียวกับกล่อง CONTACT ของ /home2

  ใน /home2 เมนู CONTACT เปิดกล่องเบอร์โทรค้างอยู่บนหน้า
  พอมีหน้านี้แล้ว เมนูของทุกหน้าในชุด V2 ชี้มาที่นี่ จะได้เป็นปลายทางเดียวกันหมด

  โครงหน้า แถบเมนู แถบท้าย อยู่ที่ components/Kw/Shell.vue
-->
<template>
  <KwShell
    active="contact"
    eyebrow="GET IN TOUCH"
    title="Let's talk."
    title-th="ช่องทางการติดต่อ"
    lead="โทรหาเราได้โดยตรงในเวลาทำการ หรือทักมาทางอีเมลก็ได้ ยินดีให้คำปรึกษาตั้งแต่ขั้นสำรวจหน้างาน"
  >
    <!-- ── โทรตรง ── -->
    <section class="calls">
      <a v-for="c in CALLS" :key="c.tel" class="call" :href="`tel:${c.tel}`">
        <span class="call__label">CALL</span>
        <span class="call__tel">{{ c.pretty }}</span>
        <span class="call__name font-th">{{ c.name }}</span>
      </a>
    </section>

    <!-- ── รายละเอียด + แผนที่ ── -->
    <section class="split">
      <div class="info">
        <article class="info__block">
          <h2 class="info__head">ADDRESS</h2>
          <p class="info__th font-th">ที่อยู่</p>
          <address class="info__body font-th">
            กว้างไม่จำกัด 263/1 หมู่ 6<br />
            ตำบลหัวรอ อำเภอเมือง<br />
            จังหวัดพิษณุโลก 65000
          </address>
          <a class="info__link" :href="MAP_LINK" target="_blank" rel="noopener">
            OPEN IN GOOGLE MAPS
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </a>
        </article>

        <article class="info__block">
          <h2 class="info__head">OPENING HOURS</h2>
          <p class="info__th font-th">เวลาให้บริการ</p>
          <dl class="hours font-th">
            <div><dt>จันทร์ – ศุกร์</dt><dd>10.00 – 17.00 น.</dd></div>
            <div><dt>เสาร์ – อาทิตย์</dt><dd>10.00 – 15.00 น.</dd></div>
          </dl>
        </article>

        <article class="info__block">
          <h2 class="info__head">CHANNELS</h2>
          <p class="info__th font-th">ช่องทางอื่น</p>
          <ul class="chans">
            <li v-for="ch in CHANNELS" :key="ch.label">
              <span class="chans__k">{{ ch.k }}</span>
              <a v-if="ch.href" :href="ch.href" :target="ch.external ? '_blank' : undefined" :rel="ch.external ? 'noopener' : undefined">{{ ch.label }}</a>
              <span v-else>{{ ch.label }}</span>
            </li>
          </ul>
        </article>
      </div>

      <!-- แผนที่โหลดแบบ lazy — เป็นก้อนหนักที่สุดของหน้า ไม่ควรถ่วงตอนเปิดหน้าแรก -->
      <div class="map">
        <iframe
          :src="MAP_EMBED"
          title="แผนที่สำนักงาน กว้างไม่จำกัด"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>

    <!-- ── คำคม (ยกมาจาก ProfileInspiration ของหน้าเดิม) ── -->
    <section class="quote">
      <blockquote>
        <p>“I think if you do something and it turns out pretty good, then you should go do something else wonderful, not dwell on it for too long. Just figure out what's next.”</p>
        <cite>Steve Jobs</cite>
      </blockquote>
      <img src="/Steve-Jobs.png" alt="" loading="lazy" />
    </section>

    <!-- ── ทางไปต่อ ── -->
    <section class="ends">
      <p class="ends__th font-th">ยังไม่แน่ใจว่าจะเริ่มจากตรงไหน ลองดูงานที่เราทำมาก่อนก็ได้</p>
      <div class="ends__cta">
        <a class="btn btn--solid" href="/projectsV2">VIEW OUR WORK</a>
        <a class="btn btn--ghost" href="/aboutV2">ABOUT US</a>
      </div>
    </section>
  </KwShell>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useSeoMeta({
  title: 'CONTACT — KWANG UNLIMITED',
  description: 'ติดต่อ บริษัท กว้างไม่จำกัด — 263/1 หมู่ 6 ตำบลหัวรอ อำเภอเมือง จังหวัดพิษณุโลก 65000 · 083-954-9743',
  ogTitle: 'CONTACT — KWANG UNLIMITED',
  ogDescription: 'ช่องทางการติดต่อ บริษัท กว้างไม่จำกัด',
  ogImage: '/kwang_logo.png',
})

/* เบอร์ชุดเดียวกับกล่อง CONTACT ของ /home2 — href ต้องเป็นเลขล้วน ส่วนที่โชว์ค่อยเว้นวรรคให้อ่านง่าย */
const CALLS = [
  { name: 'คุณจ๊อบ', tel: '0839549743', pretty: '083 954 9743' },
  { name: 'คุณไอซ์', tel: '0888150287', pretty: '088 815 0287' },
]

const CHANNELS = [
  { k: 'EMAIL',    label: 'Natthaphongphothikoed@gmail.com', href: 'mailto:Natthaphongphothikoed@gmail.com' },
]

const MAP_LINK = 'https://maps.google.com/?q=KWANG+SOCIETY+%E0%B8%81%E0%B8%A7%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94'

/* พิกัดชุดเดียวกับ components/Profile/Contact.vue */
const MAP_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3818.424958886644!2d100.26615407593243!3d16.85486001792612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30df99f39574afa1%3A0x665337f03ba679c5!2zS1dBTkcgU09DSUVUWSAtIOC4geC4p-C5ieC4suC4hyDguYLguIvguYTguIvguJXguLXguYkg4Lie4Li34LmJ4LiZ4LiX4Li14LmI4Liq4Lij4LmJ4Liy4LiH4Liq4Lij4Lij4LiE4LmM4Liq4Liz4Lir4Lij4Lix4Lia4LiE4Li44LiT!5e0!3m2!1sth!2sth!4v1717931309861!5m2!1sth!2sth'
</script>

<style scoped>
/* สีทั้งหมดรับมาจาก KwShell ผ่านตัวแปร CSS */

/* ── โทรตรง ── */
.calls {
  display: grid; gap: clamp(14px, 2vw, 22px);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  padding-bottom: clamp(24px, 3.4vw, 40px);
  border-bottom: 1px solid rgba(29, 27, 25, 0.14);
}
.call {
  display: grid; gap: 8px;
  padding: clamp(20px, 2.6vw, 30px);
  text-decoration: none;
  background: rgba(251, 247, 238, 0.72);
  border: 1px solid rgba(29, 27, 25, 0.14);
  border-left: 3px solid var(--red);
  transition: border-color 0.22s, transform 0.22s, box-shadow 0.22s;
}
.call:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 36px rgba(24, 20, 16, 0.1);
}
.call__label { font-size: 10px; font-weight: 600; letter-spacing: 0.26em; color: var(--red); }
/* Playfair ใช้ตัวเลขแบบ old-style เป็นค่าตั้งต้น (0 เตี้ย 8 สูง กว้างไม่เท่ากัน)
   เบอร์สองเบอร์เลยสูง-กว้างไม่เท่ากัน → บังคับเป็นตัวเลขแบบ lining + ความกว้างเท่ากันทุกตัว */
.call__tel {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(24px, 3vw, 38px); font-weight: 500; letter-spacing: 0.01em; color: var(--ink);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: 'lnum' 1, 'tnum' 1;
  white-space: nowrap;
}
.call__name { font-size: 13px; color: var(--ink-dim); }

/* ── รายละเอียด + แผนที่ ── */
.split {
  display: grid; gap: clamp(22px, 3.4vw, 48px);
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  margin-top: clamp(28px, 4vw, 52px);
}
.info { display: grid; gap: clamp(22px, 3vw, 36px); align-content: start; }
.info__block { padding-top: clamp(16px, 2vw, 22px); border-top: 1px solid rgba(29, 27, 25, 0.16); }
.info__block:first-child { padding-top: 0; border-top: 0; }
.info__head { font-size: clamp(11px, 1.1vw, 13px); font-weight: 700; letter-spacing: 0.24em; color: var(--ink); }
.info__th { margin-top: 5px; font-size: 12.5px; color: var(--ink-dim); }
.info__body {
  margin-top: 14px; font-style: normal;
  font-size: clamp(13.5px, 1.35vw, 16px); line-height: 2; color: var(--ink-soft);
}
.info__link {
  display: inline-flex; align-items: center; gap: 8px; margin-top: 14px;
  font-size: 10.5px; font-weight: 600; letter-spacing: 0.2em; color: var(--red); text-decoration: none;
}
.info__link svg { width: 16px; height: 16px; transition: transform 0.22s; }
.info__link:hover svg { transform: translateX(4px); }

.hours { margin: 14px 0 0; display: grid; gap: 10px; }
.hours > div { display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px; }
.hours dt { flex: none; min-width: 110px; font-size: 13.5px; color: var(--ink-dim); }
.hours dd { margin: 0; font-size: 14px; color: var(--ink); }

.chans { margin: 14px 0 0; padding: 0; list-style: none; display: grid; gap: 12px; }
.chans li { display: flex; flex-wrap: wrap; align-items: baseline; gap: 12px; }
.chans__k { flex: none; min-width: 84px; font-size: 9.5px; font-weight: 600; letter-spacing: 0.2em; color: var(--gold); }
.chans a, .chans li > span:last-child {
  font-size: 13.5px; color: var(--ink-soft); text-decoration: none; word-break: break-word;
  transition: color 0.2s;
}
.chans a { border-bottom: 1px solid rgba(29, 27, 25, 0.22); }
.chans a:hover { color: var(--red); border-color: var(--red); }

.map {
  position: relative; min-height: clamp(300px, 46vw, 520px);
  border: 1px solid rgba(29, 27, 25, 0.14);
  background: rgba(251, 247, 238, 0.72);
  padding: clamp(8px, 1vw, 12px);
}
.map iframe {
  display: block; width: 100%; height: 100%; min-height: clamp(284px, 44vw, 496px); border: 0;
  /* แผนที่ของ Google สีสดกว่าทั้งหน้า ลดความอิ่มลงหน่อยให้อยู่ในโทนกระดาษเดียวกัน */
  filter: saturate(0.72) contrast(0.96);
}

/* ── คำคม ── */
.quote {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
  gap: clamp(18px, 3vw, 40px);
  margin-top: clamp(42px, 6.5vw, 96px);
  padding: clamp(22px, 3vw, 40px);
  background: rgba(251, 247, 238, 0.72);
  border: 1px solid rgba(29, 27, 25, 0.14);
}
.quote blockquote { flex: 1 1 320px; margin: 0; }
.quote p {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(16px, 1.9vw, 24px); font-style: italic; line-height: 1.6; color: var(--ink);
}
.quote cite {
  display: block; margin-top: 14px;
  font-family: 'Montserrat', sans-serif; font-style: normal;
  font-size: 10.5px; font-weight: 600; letter-spacing: 0.24em; color: var(--red);
}
.quote img { flex: none; width: clamp(130px, 18vw, 210px); height: auto; }

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

@media (max-width: 900px) {
  .split { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .btn { min-width: 0; flex: 1 1 200px; }
  .quote { flex-direction: column-reverse; align-items: flex-start; }
}
</style>
