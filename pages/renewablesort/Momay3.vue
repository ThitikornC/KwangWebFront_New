<!--
  MOMAY — ชั้นหนังสือ (/renewablesort/Momay3)

  เวอร์ชัน 3 ของ /renewablesort/Momay2 — เนื้อหาเหมือนกันทุกอย่าง ต่างแค่หน้าตา:
    งาน Momay ทั่วไปเป็นหนังสือนอนซ้อนเป็นกองอยู่บนหลังตู้ หันสันออก (วาด 2 มิติล้วน เบาเครื่อง)
    ในตู้เป็นงาน BUU ทั้งหมด (ชั้น "เก็บไว้เช็คประวัติ" กับ "ส่งงาน" ซึ่งแบ่งย่อยตามประเภทชั้นละประเภท)

  รายการหนังสืออยู่ใน momayBooks / buuShelves ในสคริปต์ ส่วนลิงก์กับรหัสผ่านใช้ชุดเดียวกับ Momay2
  เพิ่ม/แก้การ์ดที่ /renewablesort/momay หรือ Momay2 แล้วต้องตามมาแก้ที่นี่ด้วย
-->
<template>
  <div class="lib">

    <!-- หัวหน้า: ภาพ MOMAY เต็มจอแบบเดียวกับ Momay2 ปุ่มเลื่อนลงลอยทับด้านล่าง -->
    <header class="mm-head">
      <div class="mm-head__mark">
        <img src="/momay/momay-enlightenment-art.jpg" alt="MOMAY ENLIGHTENMENT" />
      </div>
      <button type="button" class="mm-scroll" aria-label="เลื่อนลงไปดูชั้นหนังสือ" @click="scrollToContent">
        <span class="mm-scroll__label">SCROLL</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path d="M6 9.5 12 15.5 18 9.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </header>

    <div id="mm-content" class="wall">
      <h1 class="wall__title">MOMAY <em>Library</em></h1>
      <p class="wall__hint font-thai">หยิบเล่มที่ต้องการ แล้วใส่รหัสเพื่อเปิด</p>
    </div>

    <!-- ตู้หนังสือ: บนหลังตู้มีกองหนังสือนอนซ้อน (งาน Momay ทั่วไป) ในตู้เป็นงาน BUU -->
    <section class="case" aria-label="MOMAY Library">
      <!-- หลังตู้: หนังสือนอนซ้อนเป็นกอง สูงต่ำไม่เท่ากัน มีกระถางต้นไม้คั่นกลาง
           จอกว้าง 4 กองเรียงกัน / จอแคบรวมเป็น 2 กอง (ดู .pile ใน CSS) -->
      <div class="tops" role="group" aria-label="Momay">
        <template v-for="(pile, pi) in momayPiles" :key="pi">
          <svg v-if="pi === 1" class="decor" viewBox="0 0 64 100" aria-hidden="true">
            <defs>
              <linearGradient id="mm-pot" x1="0" x2="1">
                <stop offset="0" stop-color="#8f4a26" />
                <stop offset="0.45" stop-color="#c9784a" />
                <stop offset="1" stop-color="#8a4424" />
              </linearGradient>
            </defs>
            <g fill="#3d6338">
              <path d="M32 62C20 46 10 42 5 29c13 2 23 13 27 33z" />
              <path d="M32 62c12-16 22-20 27-34-13 3-23 14-27 34z" />
            </g>
            <g fill="#5c8a4b">
              <path d="M32 62c-6-20-8-38-2-55 8 16 8 34 2 55z" />
              <path d="M32 62C22 52 12 54 3 47c11-4 23 0 29 15z" />
              <path d="M32 62c10-10 20-8 29-15-11-4-23 0-29 15z" />
            </g>
            <path d="M15 64h34l-4 34H19z" fill="url(#mm-pot)" />
            <rect x="12" y="59" width="40" height="8" rx="2" fill="#d08552" />
            <rect x="12" y="65" width="40" height="2" fill="rgba(0,0,0,0.18)" />
          </svg>
          <div class="pile">
            <div v-for="(heap, hi) in pile" :key="hi" class="heap">
              <button
                v-for="b in heap"
                :key="b.key"
                type="button"
                class="lay"
                :class="layLook(b)"
                :style="layStyle(b)"
                :aria-label="b.title"
                @click="openSplineDesign(b.key)"
              >
                <span class="lay__title">{{ b.title }}</span>
              </button>
            </div>
          </div>
        </template>
      </div>
      <!-- ผิวบนของตู้ที่กองหนังสือวางอยู่ -->
      <div class="case__top" aria-hidden="true"></div>

      <div class="case__crown"><span class="plate">BUU</span></div>
      <div class="case__body">
        <template v-for="(g, gi) in buuShelves" :key="g.label">
          <div v-if="gi" class="case__divider"><span class="plate">{{ g.label }}</span></div>
          <div class="shelf">
            <div
              v-for="t in g.groups"
              :key="t.label"
              class="shelf-group"
              role="group"
              :aria-label="t.label"
            >
              <button
                v-for="(b, i) in t.books"
                :key="b.key"
                type="button"
                class="book"
                :style="spineStyle(b, i)"
                :aria-label="b.note ? `${b.title} — ${b.note}` : b.title"
                @click="openSplineDesign(b.key)"
              >
                <span class="spine" :class="{ 'spine--tag': b.tag }">
                  <span class="spine__mono" aria-hidden="true">M</span>
                  <span class="spine__title font-thai">{{ b.title }}</span>
                  <span v-if="b.tag" class="spine__tag">{{ b.tag }}</span>
                </span>
                <span class="book__label font-thai" aria-hidden="true">
                  <strong>{{ b.title }}</strong>
                  <small v-if="b.note">{{ b.note }}</small>
                </span>
              </button>
              <span class="shelf-group__tag font-thai" aria-hidden="true">{{ t.label }}</span>
            </div>
          </div>
        </template>
      </div>
      <div class="case__base" aria-hidden="true"></div>
    </section>
  </div>
</template>

<script setup lang="ts">

useHead({
  title: 'MOMAY — ชั้นหนังสือ',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href:
        'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,500&' +
        'family=Montserrat:wght@400;500;600;700;800&' +
        'family=Noto+Sans+Thai:wght@300;400;500;600&display=swap',
    },
  ],
  // สีผนังต้องไปถึงขอบจอ ไม่งั้นตอนเด้ง (overscroll) จะเห็นพื้นขาวของเบราว์เซอร์
  style: [{ children: 'html,body{background:#efe6d4 !important;}' }],
})

type Book = { key: string; title: string; tag?: string; note?: string }

// ลำดับเดียวกับการ์ดใน Momay2
const momayBooks: Book[] = [
  { key: 'Mpmay_human', title: 'Human_NU' },
  { key: 'Momay_pharmacy', title: 'Pharmacy_NU' },
  { key: 'momay_BanKlongResort', title: 'BanKlong Resort' },
  { key: 'wongpanit_sukhothai', title: 'Wongpanit Sukhothai' },
  { key: 'momay2', title: 'Momay 2' },
  { key: 'clinic', title: 'Clinic' },
  { key: 'hospital_Noenmaprang_v1', title: 'Hospital Noenmaprang V1' },
  { key: 'hospital_Noenmaprang', title: 'Hospital Noenmaprang' },
  { key: 'momay_doc_99_99', title: '99/99' },
  { key: 'momay_88_31_khun_deer', title: 'คุณเดียร์' },
  { key: 'momay_khun_sand', title: 'คุณแซน' },
  { key: 'momay_khun_nak', title: 'Momay คุณนัก' },
  { key: 'momaynew', title: 'คุณนิว' },
  { key: 'momay_bangkrong', title: 'บ้านคลองรีสอร์ท' },
  { key: 'demo', title: 'Demo Momay' },
  { key: 'momay_khun_taeng', title: 'Momay คุณเท้ง' },
  { key: 'momay_khun_eat', title: 'Momay คุณอิ๊ด' },
  { key: 'dashboard', title: 'Momay Dashboard' },
  { key: 'naresuan_library', title: 'Naresuan University Library' },
  { key: 'momay_mom', title: 'Momay แม่พี่เอิน' },
  { key: 'momay_kae', title: 'Momay คุณเก๋' },
  { key: 'MomayDP', title: 'MomayDP' },
  { key: 'MomayChamp', title: 'Momayเต็งหนามคอฟฟี่' },
  { key: 'MomayTopSoccer', title: 'ปั้มแก๊ส' },
  { key: 'MomayAnan', title: 'top soccer' },
  { key: 'MomayKorn', title: 'คุณกร' },
  { key: 'SmartLibrary', title: 'Borrow and Return Service' },
]

// ชั้น "ส่งงาน" แบ่งย่อยตามประเภทงาน ประเภทละหนึ่งชั้น มีป้ายชื่อติดขอบชั้น
const buuShelves: { label: string; groups: { label: string; books: Book[] }[] }[] = [
  {
    label: 'เก็บไว้เช็คประวัติ',
    groups: [{
      label: 'เก็บไว้เช็คประวัติ',
      books: [
        { key: 'momayBUU', title: 'momayBUU' },
        { key: 'MomayHMV1', title: 'MomayHMV1' },
        { key: 'MomayModel', title: 'MomayModel' },
        { key: 'MomayBUU-Student', title: 'MomayBUU-Student' },
        { key: 'MomayInsights', title: 'Momay-Insights' },
        { key: 'MomayTemplate', title: 'momay-template' },
        // ขีดฆ่าในโน้ต — เก็บไว้ท้ายสุด
        { key: 'MomayGreedy', title: 'MomayGreedy' },
        { key: 'MomayBUU', title: 'MomayBUU' },
      ],
    }],
  },
  {
    label: 'ส่งงาน',
    // เรียง Enlightened → Student → Executive → รวม แต่ละประเภทอยู่คนละชั้น (Report รวมอยู่ใน Executive)
    // ในแต่ละชั้นเรียงตามวันที่จากเก่าไปใหม่
    groups: [
      {
        label: 'Enlightened',
        books: [
          { key: 'MomayBUUV230926', title: 'Momay Enlightened', tag: 'V230926', note: 'เพิ่มกล้องชั้น 1-3 ทุกตัว และจัดหมวดหมู่ตามชั้น' },
          { key: 'MomayBUUV280926', title: 'Momay Enlightened', tag: 'V280926', note: 'เพิ่มนับคนเข้า-ออกแบบเรียลไทม์ และนับรถ' },
        ],
      },
      {
        label: 'Student',
        books: [
          { key: 'MomayBUUStudent', title: 'Momay BUU Student', tag: '070926', note: '(070926) สีดำ V.1 — พี่จ๊อบออก V.1 ยังไม่สนุก ทางการมาก' },
          { key: 'Momay-Student-Pixel', title: 'Momay Student Pixel V.1', tag: '100926', note: '(100926) ตัวเลขยังเป็น Pixel' },
          { key: 'Momay-Student-Pixel-V2', title: 'Momay Student Pixel V.2', tag: '130926', note: '(130926) ปรับตัวหนังสือชัด ตามพี่ตูน' },
          { key: 'Momay-Student-Pixel-VSettings', title: 'Momay Student Pixel V.Settings', tag: '150926', note: '(150926) เพิ่มการตั้งค่า' },
        ],
      },
      {
        label: 'Executive',
        books: [
          { key: 'MomayBUU-ByJob', title: 'MomayBUU by Job' },
          { key: 'MomayBUU-Executive', title: 'MomayBUU-Executive' },
          { key: 'MomayReportV1', title: 'Momay ReportV1', tag: 'Classic', note: 'Momay Report แบบ Classic' },
          { key: 'MomayReport', title: 'MomayReportBuu', tag: 'V250926', note: 'เพิ่มข้อมูลเปรียบเทียบผู้ใช้งาน x ค่าไฟฟ้า' },
          { key: 'MomayExecV290926', title: 'Momay Executive', tag: 'V290926', note: 'Executive Brief รวมกับ Momay Report ในหน้าเดียว' },
        ],
      },
      {
        label: 'รวม',
        books: [
          { key: 'MomayPrototype', title: 'Momay-Enligtend-Executive-Student' },
          { key: '061026waitJobAppove', title: '061026waitJobAppove', tag: '06/10/26' },
        ],
      },
    ],
  },
]

// กองหนังสือบนหลังตู้ 4 กอง สูงต่ำไม่เท่ากันให้ดูจัดวางจริง เรียงตามลำดับเดิม อ่านจากกองซ้ายบนลงล่าง
// ห้ามใช้ชื่อคลาส .stack — daisyUI มีคอมโพเนนต์ชื่อนี้ ย่อและจางลูกตัวที่ 2 เป็นต้นไป
const HEAP_SIZES = [7, 6, 8] // กองสุดท้ายรับที่เหลือทั้งหมด
const heaps: Book[][] = []
let heapFrom = 0
for (const n of HEAP_SIZES) {
  heaps.push(momayBooks.slice(heapFrom, heapFrom + n))
  heapFrom += n
}
heaps.push(momayBooks.slice(heapFrom))
const momayPiles = [heaps.slice(0, 2), heaps.slice(2, 4)]
const layOrder = new Map(momayBooks.map((b, i) => [b.key, i]))

// ปกหนังสือ: สีหนัง [พื้น, ตัวอักษร/เส้นทอง]
const leathers: [string, string][] = [
  ['#7a1f24', '#e6cf96'], // แดงเลือดหมู
  ['#1f2d45', '#d9c28a'], // กรมท่า
  ['#27402f', '#dcc78f'], // เขียวป่า
  ['#94652a', '#f6ead0'], // เหลืองมัสตาร์ด
  ['#2d2926', '#c9ad6e'], // ถ่าน
  ['#1d4747', '#e0cd98'], // เขียวหัวเป็ด
  ['#4b2a40', '#e3cb97'], // ม่วงพลัม
  ['#e7dbbd', '#6b1c20'], // ครีม (ตัวหนังสือแดง)
  ['#853a1f', '#f1dcae'], // สนิม
  ['#a01c24', '#f3dfa9'], // แดงตรา MOMAY
]

// ค่าสุ่มคงที่ต่อ key (FNV-1a) — รีเฟรชแล้วหนังสือแต่ละเล่มยังสี/ขนาดเดิม
function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}

// หนังสือนอน: ยาว/หนา/เยื้องไม่เท่ากันให้ดูเป็นกองจริง
// เล่มที่อยู่สูงกว่าต้องมี z-index มากกว่า เพื่อบังปกบน/ขอบกระดาษของเล่มที่รองอยู่
function layStyle(b: Book) {
  const h = hash(b.key)
  const [bg, ink] = leathers[(h >>> 7) % leathers.length]
  return {
    '--w': `${150 + (h % 46)}px`,
    '--th': `${24 + ((h >>> 4) % 5) * 2}px`,
    '--dx': `${((h >>> 9) % 13) - 6}px`,
    '--c': bg, '--t': ink,
    zIndex: 100 - (layOrder.get(b.key) ?? 0),
  }
}

// ลายสันสองแบบสลับกัน: ตัวอักษรบนหนังเปล่า หรือบนป้ายหนังสีเข้มคาดเส้นทอง
function layLook(b: Book) {
  return (hash(b.key) >>> 17) & 1 ? 'lay--label' : 'lay--plain'
}

function spineStyle(b: Book, i: number) {
  const h = hash(b.key)
  const len = [...b.title].length
  // ชื่อยาวต้องขึ้นหลายคอลัมน์ในแนวตั้ง จึงต้องใช้สันหนาขึ้นและเล่มสูงขึ้น
  const cols = Math.ceil(len / 15)
  const width = Math.max(40, cols * 17 + 18) + (h % 4) * 3 + (b.tag ? 6 : 0)
  // คำเดียวยาว ๆ (เช่น MomayReportBuu) ตัดคอลัมน์ไม่ได้ ต้องใช้เล่มสูงและย่อตัวหนังสือแทน
  const longestWord = Math.max(...b.title.split(/[\s-]/).map(w => [...w].length))
  const heightFactor = Math.min(0.95, Math.max(
    longestWord > 9 ? 0.9 : 0,
    0.74 + ((h >>> 3) % 7) * 0.026 + (len > 14 || b.tag ? 0.08 : 0),
  ))
  const [bg, ink] = leathers[(h >>> 7) % leathers.length]
  return {
    '--w': `${width}px`, '--hf': heightFactor, '--c': bg, '--t': ink, '--i': i,
    ...(longestWord > 12 ? { '--fs': '11px', '--fs-m': '9.5px' } : {}),
  }
}

const splineLinks: Record<string, string> = {
  momay_BanKlongResort: '/momay/momay_BanKlongResort',
  wongpanit_sukhothai: '/momay/wongpanit_sukhothai',
  hospital_Noenmaprang: '/momay/hospital_Noenmaprang',
  hospital_Noenmaprang_v1: '/momay/hospital_Noenmaprang_v1',
  clinic: '/momay/clinic',
  momay2: '/momay/momay02',
  naresuan_library: '/momay/naresuan_library',
  Momay_pharmacy: '/momay/Momay_pharmacy',
  Mpmay_human: '/momay/Mpmay_human',
  momayBUU: '/momay/momayBUU',
  momay_88_31_khun_deer: '/momay/momay_88_31_khun_deer',
  momay_khun_sand: '/momay/momay_khun_sand',
  momay_khun_nak: '/momay/momay_khun_nak',
  momaynew: '/momay/momaynew',
  momay_doc_99_99: '/momay/99/99',
  momay_bangkrong: '/momay/momay_bangkrong',
  demo: '/momay/demo',
  dashboard: '/momay/dashboard',
  momay_khun_taeng: '/momay/momay_khun_taeng',
  momay_khun_eat: '/momay/momay_khun_eat',
  momay_mom: '/momay/momay_mom',
  momay_kae: '/momay/momay_kae',
  MomayHMV1: '/momay/MomayHMV1',
  MomayGreedy: '/momay/MomayGreedy',
  MomayDP: '/momay/MomayDP',
  MomayModel: '/momay/MomayModel',
  MomayChamp: '/momay/MomayChamp',
  'MomayBUU-Executive': '/momay/MomayBUU-Executive',
  'MomayBUU-Student': '/momay/MomayBUU-Student',
  'MomayBUU-ByJob': '/momay/MomayBUU-ByJob',
  MomayBUU: '/momay/MomayBUU',
  MomayTopSoccer: '/momay/MomayTopSoccer',
  MomayAnan: '/momay/MomayAnan',
  MomayKorn: '/momay/MomayKorn',
  MomayPrototype: '/momay/MomayPrototype',
  '061026waitJobAppove': '/momay/061026waitJobAppove',
  SmartLibrary: '/momay/SmartLibrary',
  MomayInsights: '/momay/MomayInsights',
  MomayBUUStudent: '/momay/MomayBUUStudent',
  'Momay-Student-Pixel': '/momay/Momay-Student-Pixel',
  'Momay-Student-Pixel-V2': '/momay/Momay-Student-Pixel-V2',
  'Momay-Student-Pixel-VSettings': '/momay/Momay-Student-Pixel-VSettings',
  MomayBUUV230926: '/momay/MomayBUUV230926',
  MomayBUUV280926: '/momay/MomayBUUV280926',
  MomayReport: '/momay/MomayReport',
  MomayReportV1: '/momay/MomayReportV1',
  MomayExecV290926: '/momay/MomayExecV290926',
  MomayTemplate: '/momay/MomayTemplate'
}

function scrollToContent() {
  document.getElementById('mm-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function openSplineDesign(key: string) {
  const password = prompt("กรุณาใส่รหัสผ่านเพื่อเข้าถึง")

  // ถ้าเป็น hospital ให้ตรวจรหัสเฉพาะ
  if (key === 'hospital_Noenmaprang' || key === 'hospital_Noenmaprang_v1') {
    if (password !== '1125711257') {
      alert("รหัสสำหรับโรงพยาบาลไม่ถูกต้อง ❌")
      return
    }
  } else if (key === 'naresuan_library') {
    if (password !== '240124') {
      alert("รหัสสำหรับ Naresuan Library ไม่ถูกต้อง ❌")
      return
    }
  } else {
    // ที่เหลือใช้รหัสมาตรฐาน
    if (password !== '240124') {
      alert("รหัสผ่านไม่ถูกต้อง ❌")
      return
    }
  }

  const url = splineLinks[key]
  if (url) window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
/* ══════════════ ห้องสมุด: ผนังครีม ตู้ไม้วอลนัท ══════════════ */
.lib {
  --wall: #efe6d4;
  --wall-2: #f7f1e4;
  --ink: #1d1b19;
  --ink-dim: #7a7267;
  --red: #a01c24;
  --wood-hi: #b07b45;
  --wood: #8a5a2e;
  --wood-lo: #5e3b1c;
  --wood-dark: #3b2513;
  --back: #2e1d10;
  --brass-hi: #efdca5;
  --brass: #c7a766;
  --brass-lo: #8f733c;
}

.lib {
  position: relative;
  min-height: 100vh;
  padding: 0 16px clamp(48px, 8vw, 96px);
  color: var(--ink);
  font-family: 'Montserrat', system-ui, sans-serif;
  background:
    radial-gradient(70% 55% at 50% 0%, rgba(255, 244, 214, 0.9), transparent 70%),
    /* ลายวอลเปเปอร์ริ้วจาง ๆ */
    repeating-linear-gradient(90deg, rgba(120, 90, 50, 0.035) 0 1px, transparent 1px 56px),
    linear-gradient(180deg, var(--wall-2), var(--wall) 60%, #e6dac3);
  overflow-x: hidden;
}

.font-thai { font-family: 'Noto Sans Thai', 'Montserrat', sans-serif; }

/* ── หัวหน้า: ชุดเดียวกับ Momay2 ── */
/* ภาพ MOMAY เต็มจอ ขอบถึงขอบ (ดึงออกไปทับ padding 16px ของ .lib) */
.mm-head {
  position: relative;
  display: flex; flex-direction: column; align-items: center;
  margin: 0 -16px;
  height: 100svh;
  padding: clamp(14px, 2.4vh, 26px) 16px clamp(10px, 2vh, 20px);
  overflow: hidden;
}
/* ภาพ (1536×1024) ปูเต็มจอ ตัวตราอยู่กลางภาพจึงยังเห็นครบเมื่อครอบขอบ */
.mm-head__mark { position: absolute; inset: 0; background: #fcf8ef; }
.mm-head__mark img {
  display: block; width: 100%; height: 100%; object-fit: cover; object-position: center;
  animation: mmZoomIn 2.4s cubic-bezier(0.22, 0.61, 0.36, 1) both;
}
/* จอแนวตั้ง: cover เต็มความสูงจะตัดตัวตราขาด จึงขยายภาพแค่ให้ตัวตรากินเกือบเต็มความกว้างจอ */
@media (max-aspect-ratio: 5/4) {
  .mm-head__mark { display: grid; place-items: center; }
  .mm-head__mark img {
    width: 160%; max-width: none; height: auto; object-fit: initial;
    -webkit-mask-image: linear-gradient(180deg, transparent, #000 14%, #000 86%, transparent);
    mask-image: linear-gradient(180deg, transparent, #000 14%, #000 86%, transparent);
  }
}
.mm-scroll {
  position: relative; z-index: 1;
  margin-top: auto;
  display: grid; justify-items: center; gap: 2px;
  padding: 6px 14px; background: none; border: 0; cursor: pointer;
  color: var(--red);
  animation: mmFadeUp 0.9s ease 1.1s both;
}
.mm-scroll__label { font-size: 10.5px; font-weight: 600; letter-spacing: 0.3em; color: var(--ink-dim); }
.mm-scroll svg { width: 28px; height: 28px; animation: mmBob 1.8s ease-in-out infinite; }
.mm-scroll:hover .mm-scroll__label { color: var(--red); }
.mm-scroll:focus { outline: none; }
.mm-scroll:focus-visible { outline: 1px solid var(--red); outline-offset: 4px; }

/* ── หัวข้อเหนือตู้ ── */
.wall {
  padding-top: clamp(36px, 6vw, 64px);
  margin-bottom: clamp(24px, 4vw, 40px);
  text-align: center;
}
.wall__title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(26px, 4vw, 42px); font-weight: 500; letter-spacing: 0.04em;
}
.wall__title em { font-style: italic; color: var(--red); }
.wall__hint { margin-top: 6px; font-size: 13px; color: var(--ink-dim); letter-spacing: 0.02em; }

/* ══════════════ ตู้หนังสือ ══════════════ */
/* ชั้นแต่ละแถวสูง --row แผ่นชั้นหนา --plank
   ลายชั้นวาดด้วย background ที่วนซ้ำทุก (--row + --plank) และหนังสือทุกเล่มสูงเท่า --row พอดี
   แถวที่ขึ้นบรรทัดใหม่จึงตกลงบนแผ่นชั้นถัดไปเองไม่ว่าจอกว้างเท่าไร */
.case {
  --row: 230px;
  --plank: 20px;
  --side: 18px;
  position: relative;
  max-width: 1120px; margin: 0 auto;
}
.case__crown {
  position: relative;
  display: flex; justify-content: center; align-items: center;
  height: 52px; margin: 0 -10px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.22), transparent 18%, transparent 70%, rgba(0, 0, 0, 0.35)),
    linear-gradient(90deg, var(--wood-lo), var(--wood-hi) 30%, var(--wood) 70%, var(--wood-lo));
  border-radius: 4px 4px 0 0;
  box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.25);
}
.case__body {
  padding: 0 var(--side);
  box-shadow: 0 30px 50px -24px rgba(40, 24, 10, 0.4);
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.25), transparent 6px, transparent calc(100% - 6px), rgba(0, 0, 0, 0.25)),
    linear-gradient(90deg, var(--wood-lo), var(--wood-hi) 1.2%, var(--wood) 1.6%, var(--wood) 98.4%, var(--wood-hi) 98.8%, var(--wood-lo));
}
.case__base {
  height: 34px; margin: 0 -10px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.14), transparent 20%, rgba(0, 0, 0, 0.4)),
    linear-gradient(90deg, var(--wood-lo), var(--wood) 30%, var(--wood-hi) 55%, var(--wood-lo));
  border-radius: 0 0 3px 3px;
  box-shadow: 0 22px 30px -10px rgba(40, 24, 10, 0.45);
}
/* ผิวบนตู้: ขอบหลังแคบกว่าขอบหน้านิดหน่อยให้ดูเป็นระนาบที่ลึกเข้าไป */
.case__top {
  height: 18px; margin: 0 -10px;
  clip-path: polygon(1.2% 0, 98.8% 0, 100% 100%, 0 100%);
  background: linear-gradient(180deg, #6a4222, #95653a 55%, #b88857);
}
/* แผ่นคั่นระหว่างหมวดในตู้เดียวกัน */
.case__divider {
  display: flex; justify-content: center; align-items: center;
  height: 40px;
  background:
    linear-gradient(180deg, #c48c52 0, var(--wood-hi) 3px, var(--wood) 40%, var(--wood-lo) calc(100% - 3px), var(--wood-dark));
}

/* ป้ายทองเหลืองมีหมุดสองข้าง */
.plate {
  position: relative;
  padding: 5px 26px 6px;
  font-family: 'Playfair Display', 'Noto Sans Thai', Georgia, serif;
  font-size: 13px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase;
  color: #3a2a12;
  background: linear-gradient(180deg, var(--brass-hi), var(--brass) 55%, var(--brass-lo));
  border-radius: 2px;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.35) inset, 0 2px 3px rgba(0, 0, 0, 0.45);
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.35);
}
.plate::before, .plate::after {
  content: ''; position: absolute; top: 50%; width: 5px; height: 5px; margin-top: -2.5px;
  border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fff4cf, #7d6330);
}
.plate::before { left: 9px; }
.plate::after { right: 9px; }

.shelf {
  display: flex; flex-wrap: wrap; align-items: flex-end;
  column-gap: 3px; row-gap: var(--plank);
  padding: 0 clamp(10px, 2vw, 22px) var(--plank);
  background:
    /* แผ่นชั้น: ผิวบนสว่าง ขอบหน้ามืดลง */
    linear-gradient(180deg,
      transparent 0 var(--row),
      #c48c52 var(--row),
      var(--wood-hi) calc(var(--row) + 3px),
      var(--wood) calc(var(--row) + 8px),
      var(--wood-lo) calc(var(--row) + var(--plank) - 2px),
      var(--wood-dark) calc(var(--row) + var(--plank))),
    /* เงาที่แผ่นชั้นด้านบนทอดลงบนแผ่นหลังตู้ */
    linear-gradient(180deg, rgba(0, 0, 0, 0.5), transparent 34px),
    /* ความลึกซ้าย-ขวาของช่อง */
    linear-gradient(90deg, rgba(0, 0, 0, 0.45), transparent 5%, transparent 95%, rgba(0, 0, 0, 0.45)),
    /* ลายไม้แผ่นหลัง */
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.025) 0 2px, transparent 2px 23px, rgba(0, 0, 0, 0.06) 23px 24px, transparent 24px 61px),
    var(--back);
  background-size:
    100% calc(var(--row) + var(--plank)),
    100% calc(var(--row) + var(--plank)),
    100% 100%, 100% 100%, 100% 100%;
}
/* หมวดที่ยังมีแผ่นคั่นตามมา ไม่ต้องวาดแผ่นชั้นแถวสุดท้ายซ้ำ */
.shelf:not(:last-child) { padding-bottom: 0; }

/* ── กลุ่มหนังสือ ──
   กลุ่มกินเต็มความกว้างชั้น จึงได้ชั้นของตัวเองเสมอ
   row-gap เท่าแผ่นชั้น กลุ่มที่ยาวเกินแถวจึงยังลงแผ่นชั้นพอดี */
.shelf-group {
  position: relative;
  display: flex; flex-wrap: wrap; align-items: flex-end;
  column-gap: 3px; row-gap: var(--plank);
  max-width: 100%;
}
.shelf-group { flex-basis: 100%; }
/* ที่กั้นหนังสือทองเหลืองต่อท้ายเล่มสุดท้าย */
.shelf-group::after {
  content: ''; align-self: flex-end;
  width: 8px; height: calc(var(--row) * 0.44); margin-left: 5px;
  border-radius: 2px 2px 0 0;
  background: linear-gradient(90deg, var(--brass-lo), var(--brass-hi) 40%, var(--brass) 70%, var(--brass-lo));
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.45);
}
/* ป้ายประเภทติดขอบหน้าแผ่นชั้น ชิดซ้ายเหมือนป้ายหมวดในห้องสมุด */
.shelf-group__tag {
  position: absolute; left: 0; top: 100%;
  margin-top: calc((var(--plank) - 15px) / 2);
  padding: 0 10px; height: 15px;
  font-size: 9.5px; font-weight: 700; line-height: 15px; letter-spacing: 0.14em; text-transform: uppercase;
  white-space: nowrap;
  color: #3a2a12;
  background: linear-gradient(180deg, var(--brass-hi), var(--brass) 60%, var(--brass-lo));
  border-radius: 1px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}
.shelf-group__tag.font-thai { letter-spacing: 0.08em; }

/* ── หนังสือ ── */
/* ปุ่มสูงเท่าแถวเต็ม ๆ (ให้แถวลงชั้นพอดี) แต่รับเมาส์เฉพาะตัวสันหนังสือ */
.book {
  position: relative;
  display: flex; align-items: flex-end;
  height: var(--row); padding: 0;
  background: none; border: 0; cursor: pointer;
  pointer-events: none;
  animation: bookIn 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) both;
  animation-delay: calc(var(--i, 0) * 28ms + 150ms);
}
.book:focus { outline: none; }
/* เล่มที่ถูกดึงขึ้นต้องอยู่หน้าเล่มข้าง ๆ ไม่งั้นป้ายชื่อโดนสันเล่มถัดไปทับ */
.book:hover, .book:focus-visible { z-index: 6; }

.spine {
  /* ความสูงส่วนหัว-ท้ายสัน (วงกลม M, แถบทอง, ป้ายรุ่น) ที่เหลือคือช่องชื่อ */
  --edge: 22px;
  --chrome: calc(var(--edge) * 2 + 36px);
  position: relative;
  display: flex; flex-direction: column; align-items: center;
  width: var(--w); height: calc(var(--row) * var(--hf));
  pointer-events: auto;
  color: var(--t);
  background:
    /* ความโค้งของสันหนังสือ */
    linear-gradient(90deg, rgba(0, 0, 0, 0.42), rgba(255, 255, 255, 0.07) 16%, rgba(255, 255, 255, 0.16) 30%, rgba(0, 0, 0, 0.04) 62%, rgba(0, 0, 0, 0.4)),
    var(--c);
  border-radius: 3px 3px 1px 1px;
  box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.12) inset, 2px 0 3px rgba(0, 0, 0, 0.35);
  transition: translate 0.28s cubic-bezier(0.22, 0.61, 0.36, 1), box-shadow 0.28s;
}
/* แถบทองคู่หัว-ท้ายสัน */
.spine--tag { --chrome: calc(var(--edge) * 2 + 53px); }
.spine::before, .spine::after {
  content: ''; position: absolute; left: 0; right: 0; height: 5px;
  border-top: 1px solid var(--t); border-bottom: 1px solid var(--t);
  opacity: 0.7;
}
.spine::before { top: 9px; }
.spine::after { bottom: 9px; }

.spine__mono {
  display: grid; place-items: center;
  width: 20px; height: 20px; margin-top: var(--edge); flex: none;
  border: 1px solid var(--t); border-radius: 50%;
  font-size: 10px; font-weight: 800; line-height: 1;
}
/* ความสูงต้องกำหนดตรง ๆ — ตัวหนังสือแนวตั้งในกล่อง flex แนวนอนจะตัดบรรทัดตามความสูงสันทั้งเล่ม
   ถ้าปล่อยให้ flex หดเอง ท้ายชื่อจะโดนตัดหายแทนที่จะขึ้นคอลัมน์ใหม่ */
.spine__title {
  flex: none;
  height: calc(var(--row) * var(--hf) - var(--chrome));
  max-width: calc(100% - 8px);
  margin: 8px 0; overflow: hidden;
  writing-mode: vertical-rl;
  text-align: center;
  font-size: var(--fs, 12.5px); font-weight: 600; line-height: 1.3; letter-spacing: 0.02em;
  overflow-wrap: anywhere;
}
.spine__tag {
  margin-bottom: var(--edge); flex: none;
  padding: 2px 3px; line-height: 11px;
  font-size: 8px; font-weight: 700; letter-spacing: 0.04em;
  border: 1px solid var(--t); border-radius: 1px;
  opacity: 0.9;
}

/* ดึงหนังสือขึ้นจากชั้นตอนชี้/โฟกัส */
.book:hover .spine,
.book:focus-visible .spine {
  translate: 0 -14px;
  box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.12) inset, 3px 8px 14px rgba(0, 0, 0, 0.55);
}
.book:focus-visible .spine { outline: 2px solid var(--brass-hi); outline-offset: 2px; }
.book:active .spine { translate: 0 -8px; }

/* ป้ายชื่อเต็ม + โน้ต ลอยเหนือเล่มที่ชี้อยู่ */
.book__label {
  position: absolute; z-index: 5; left: 50%;
  bottom: calc(var(--row) * var(--hf) + 22px);
  width: max-content; max-width: 230px;
  display: flex; flex-direction: column; gap: 3px;
  padding: 8px 12px;
  text-align: left; color: var(--ink);
  background: #fdfaf2;
  border: 1px solid rgba(29, 27, 25, 0.12); border-left: 3px solid var(--red);
  box-shadow: 0 10px 24px rgba(20, 12, 4, 0.35);
  opacity: 0; translate: -50% 6px; pointer-events: none;
  transition: opacity 0.2s, translate 0.2s;
}
.book__label strong { font-size: 13px; font-weight: 600; line-height: 1.35; }
.book__label small { font-size: 11px; line-height: 1.5; color: var(--ink-dim); }
.book:hover .book__label,
.book:focus-visible .book__label { opacity: 1; translate: -50% 0; }
/* จอสัมผัสไม่มี hover แตะเล่มเดียวก็เปิดรหัสเลย ไม่ต้องให้ป้ายค้าง */
@media (hover: none) {
  .book__label { display: none; }
}

/* ══════════════ กองหนังสือบนหลังตู้ ══════════════ */
/* วาดแบบ 2 มิติล้วน ไม่ใช้ CSS 3D/filter จึงเบาเครื่อง:
   ตัวปุ่มคือสัน, ::before คือปกด้านบน, ::after คือขอบกระดาษด้านขวา
   ปกกับขอบกระดาษเอียงด้วย skew ตามทิศลึกเดียวกัน (ขวา 4 : ขึ้น 3) มุมจึงต่อกันพอดี */
.tops {
  --dz: 12px;
  position: relative; z-index: 1;
  display: flex; justify-content: space-evenly; align-items: flex-end;
  padding: 0 clamp(8px, 3vw, 40px);
  margin-bottom: -11px; /* ให้กองจมลงกลางผิวบนตู้ */
  animation: topsIn 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) 0.15s both;
}
/* จอกว้าง .pile หายไปจากเลย์เอาต์ กองย่อย (.heap) ทั้ง 4 จึงเรียงใน .tops ตรง ๆ */
.pile { display: contents; }
.heap {
  position: relative;
  display: flex; flex-direction: column; align-items: center;
  padding-right: var(--dz);
}
/* เงาที่กองทอดลงบนผิวตู้ */
.heap::after {
  content: ''; position: absolute; z-index: -1;
  left: -8%; right: -4%; bottom: -8px; height: 18px;
  background: radial-gradient(closest-side, rgba(30, 16, 6, 0.55), transparent);
}

.lay {
  position: relative; left: var(--dx);
  display: flex; align-items: center; justify-content: center;
  width: var(--w); min-height: var(--th);
  padding: 3px 18px;
  color: var(--t);
  border: 0; border-radius: 2px 0 0 2px; cursor: pointer;
  background:
    /* ความโค้งของสัน: บนสว่าง ล่างมืด */
    linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.07) 22%, transparent 48%, rgba(0, 0, 0, 0.22) 82%, rgba(0, 0, 0, 0.42)),
    /* แถบทองคู่หัว-ท้ายสัน */
    linear-gradient(90deg,
      transparent 7px, var(--t) 7px 8px, transparent 8px 10px, var(--t) 10px 11px,
      transparent 11px calc(100% - 11px),
      var(--t) calc(100% - 11px) calc(100% - 10px), transparent calc(100% - 10px) calc(100% - 8px),
      var(--t) calc(100% - 8px) calc(100% - 7px), transparent calc(100% - 7px)),
    /* ลายหนังจาง ๆ */
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0 1px, transparent 1px 4px),
    var(--c);
  transition: translate 0.25s cubic-bezier(0.22, 0.61, 0.36, 1);
}
/* ปกด้านบน (เห็นเต็มเฉพาะเล่มบนสุด เล่มอื่นถูกเล่มที่ทับอยู่บัง) */
.lay::before {
  content: ''; position: absolute; left: 0; right: 0; bottom: 100%;
  height: calc(var(--dz) * 0.75);
  transform-origin: 0 100%;
  transform: skewX(-53.13deg);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.14), rgba(0, 0, 0, 0.12)), var(--c);
  pointer-events: none;
}
/* ขอบกระดาษ: ปกแข็งบน-ล่าง กระดาษครีมเป็นเส้นแนวนอน */
.lay::after {
  content: ''; position: absolute; left: 100%; top: 0; bottom: 0;
  width: var(--dz);
  transform-origin: 0 0;
  transform: skewY(-36.87deg);
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.3)),
    linear-gradient(180deg, var(--c) 0 2px, transparent 2px calc(100% - 2px), var(--c) calc(100% - 2px)),
    repeating-linear-gradient(180deg, #f4ebd3 0 1px, #d9cba7 1px 2px);
  pointer-events: none;
}
.lay__title {
  font-family: 'Playfair Display', 'Noto Sans Thai', Georgia, serif;
  font-size: 12.5px; font-weight: 600; line-height: 1.2; letter-spacing: 0.03em;
  text-align: center; overflow-wrap: anywhere;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.28);
}
.lay--label .lay__title {
  padding: 2px 10px;
  background: rgba(0, 0, 0, 0.24);
  border-top: 1px solid; border-bottom: 1px solid;
}
/* ชี้แล้วเล่มนั้นเลื่อนออกมาจากกอง */
.lay:hover, .lay:focus-visible { translate: -12px 0; }
.lay:focus { outline: none; }
.lay:focus-visible { outline: 2px solid var(--brass-hi); outline-offset: 2px; }

/* กระถางต้นไม้คั่นกลาง */
.decor {
  position: relative; flex: none;
  width: 58px; height: 90px; margin-bottom: 3px;
}

/* ── แอนิเมชัน ── */
@keyframes topsIn { from { opacity: 0; transform: translateY(-18px); } to { opacity: 1; transform: none; } }
@keyframes bookIn { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: none; } }
@keyframes mmZoomIn { from { opacity: 0; transform: scale(1.08); } to { opacity: 1; transform: none; } }
@keyframes mmFadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
@keyframes mmBob {
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50% { transform: translateY(7px); opacity: 1; }
}

@media (max-width: 640px) {
  .case { --row: 210px; --plank: 16px; --side: 10px; }
  .case__crown, .case__base { margin: 0 -4px; }
  .spine { --edge: 18px; width: calc(var(--w) * 0.86); }
  .spine__title { font-size: var(--fs-m, 11px); }
  /* จอแคบ 4 กองแคบเกินจะอ่านชื่อได้ จึงรวมเป็น 2 กอง กองละ 2 กองย่อยต่อกันลงมา */
  .tops { --dz: 9px; justify-content: space-around; padding: 0 6px; margin-top: 14px; }
  .pile { display: flex; flex-direction: column; align-items: center; }
  .pile > .heap:first-child::after { display: none; }
  .decor { display: none; }
  .lay { width: calc(var(--w) * 0.8); min-height: calc(var(--th) - 3px); padding: 3px 13px; }
  .lay__title { font-size: 10px; }
  .plate { font-size: 11px; padding: 4px 22px 5px; }
}

@media (prefers-reduced-motion: reduce) {
  .book, .tops, .mm-head__mark img, .mm-scroll, .mm-scroll svg { animation: none; }
  .spine, .book__label, .lay { transition: none; }
}
</style>
