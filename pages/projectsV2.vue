<!--
  PROJECTS (V2) — /projectsV2

  ชุดเดียวกับ /home2 · หน้าเดิมคือ /home (ProfileSolution) ไม่ถูกแตะ

  ข้อมูลมาจาก API เดียวกับหน้าเดิม: GET {apiURL}/solutions
  รูปทรงข้อมูลอยู่ที่ store/solution_store.ts (interface Solution)

  ต่างจากหน้าเดิมตรงที่หน้านี้เป็นหน้าอ่านอย่างเดียว — ไม่มีปุ่มเพิ่ม/แก้/ลบ
  งานหลังบ้านยังอยู่ที่ /home เหมือนเดิม ที่นี่ตั้งใจให้เป็นหน้าโชว์ผลงานล้วน ๆ

  โครงหน้า แถบเมนู แถบท้าย อยู่ที่ components/Kw/Shell.vue
-->
<template>
  <KwShell
    active="projects"
    eyebrow="SELECTED WORK"
    title="Our projects"
    title-th="ผลงานที่ผ่านมา"
  >
    <!-- ── สารบัญหมวด: กดแล้วเลื่อนไปยังหมวดนั้น ── -->
    <nav v-if="sections.length" class="jump" aria-label="ประเภทงาน">
      <a v-for="s in sections" :key="s.key" class="jump__item" :href="`#${s.id}`">
        <span class="jump__en">{{ s.en }}</span>
        <span class="jump__n">{{ s.items.length }}</span>
      </a>
    </nav>

    <!-- ── สถานะระหว่างโหลด / โหลดไม่ได้ ── -->
    <p v-if="pending" class="note font-th">กำลังโหลดผลงาน…</p>

    <div v-else-if="error" class="note note--bad font-th">
      <p>ตอนนี้ดึงรายการผลงานไม่ได้ ลองใหม่อีกครั้งได้เลย</p>
      <button type="button" class="retry" @click="refresh()">ลองอีกครั้ง</button>
    </div>

    <p v-else-if="!sections.length" class="note font-th">ยังไม่มีผลงานในตอนนี้</p>

    <!-- ── รายการผลงาน แยกตามหมวดแบบหน้าเดิม ──
         ref อยู่ที่กล่องครอบทุกหมวด เพราะ IntersectionObserver ต้องกวาดการ์ดข้ามหมวดได้ -->
    <div v-else ref="listEl">
      <section v-for="s in sections" :id="s.id" :key="s.key" class="cat">
        <header class="cat__head">
          <div>
            <p class="cat__en">{{ s.en }}</p>
            <h2 class="cat__th font-th">{{ s.th }}</h2>
          </div>
          <span class="cat__n">{{ s.items.length }} {{ s.items.length === 1 ? 'PROJECT' : 'PROJECTS' }}</span>
        </header>

        <ul class="grid">
          <li v-for="p in s.items" :key="p.id" :data-pid="p.id" class="proj">
        <NuxtLink class="proj__link" :to="`/viewsolution/${p.id}`">
          <span class="proj__media">
            <!-- ไม่มีไฟล์วิดีโอตัวอย่าง → ขึ้นแผ่นลายเส้นแทน ไม่ปล่อยช่องดำ
                 ผูก src เฉพาะการ์ดที่อยู่ในสายตา (ดู IntersectionObserver ข้างล่าง)
                 คลิปตัวอย่างไฟล์ละหลายสิบเมกะไบต์ ถ้าปล่อยให้เล่นพร้อมกันทั้งตารางหน้าจะหนักมาก -->
            <video
              v-if="p.linkVideoPreview"
              class="proj__video"
              autoplay muted loop playsinline preload="none"
              :src="inView.has(p.id) ? p.linkVideoPreview : undefined"
            />
            <span v-else class="proj__blank" aria-hidden="true">
              <img src="/kwang_logo.png" alt="" />
            </span>
            <span class="proj__type">{{ p.type }}</span>
          </span>

          <span class="proj__body">
            <span class="proj__date">{{ formatDate(p.date) }}</span>
            <span class="proj__name font-th">{{ p.projectName }}</span>
            <span v-if="p.description" class="proj__desc font-th">{{ p.description }}</span>
            <span class="proj__more">
              DOCUMENT
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </span>
          </span>
        </NuxtLink>

        <!-- ปุ่มแชร์อยู่นอก <NuxtLink> เพื่อไม่ให้กลายเป็นลิงก์ซ้อนลิงก์ -->
        <button
          v-if="p.linkPresentSheet"
          type="button"
          class="proj__share"
          :aria-label="`แชร์ ${p.projectName}`"
          @click="share(p)"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
            <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
          </svg>
        </button>
          </li>
        </ul>
      </section>
    </div>

    <!-- ── ทางไปต่อ ── -->
    <section class="ends">
      <p class="ends__th font-th">สนใจให้เราช่วยดูงานของคุณ</p>
      <div class="ends__cta">
        <a class="btn btn--solid" href="/contactV2">CONTACT US</a>
        <a class="btn btn--ghost" href="/forwardthinkingV2">OUR PLATFORMS</a>
      </div>
    </section>
  </KwShell>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import dayjs from 'dayjs'
import type { Solution } from '~/store/solution_store'

definePageMeta({ layout: false })

useSeoMeta({
  title: 'PROJECTS — KWANG UNLIMITED',
  description: 'ผลงานติดตั้งระบบโซลาร์เซลล์ ระบบเครือข่าย และซอฟต์แวร์ของบริษัท กว้างไม่จำกัด',
  ogTitle: 'PROJECTS — KWANG UNLIMITED',
  ogDescription: 'SELECTED WORK — KWANG UNLIMITED',
  ogImage: '/kwang_logo.png',
})

const config = useRuntimeConfig()

/* โปรเจกต์นี้ตั้ง ssr: false (ดู nuxt.config.ts) การดึงจึงเกิดบนเบราว์เซอร์เสมอ
   ใช้ useAsyncData เพราะได้ pending / error / refresh มาให้ครบ ไม่ต้องจัดการสถานะเอง */
const { data, pending, error, refresh } = await useAsyncData<Solution[]>(
  'projects-v2',
  () => $fetch<Solution[]>(`${config.public.apiURL}/solutions`),
  { default: () => [] },
)

/* หน้าเดิมโชว์เฉพาะ tag === 'lastest' — ตามนั้น ไม่งั้นของเก่าที่ถูกเก็บไว้จะโผล่กลับมา */
const items = computed(() =>
  (data.value ?? [])
    .filter(p => p.tag === 'lastest')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
)

/* หมวดและลำดับยกมาจากหน้าเดิม (components/Profile/Solution.vue) — โซล่าเซลล์ · ซอฟต์แวร์ · เน็ตเวิร์ค */
const CATEGORIES = [
  { key: 'solarcell', id: 'solar-cell', en: 'RENEWABLE ENERGY', th: 'ออกแบบและติดตั้งระบบโซล่าเซลล์' },
  { key: 'software',  id: 'software',   en: 'SOFTWARE',         th: 'ซอฟต์แวร์' },
  { key: 'network',   id: 'network',    en: 'IT NETWORK',       th: 'ออกแบบและติดตั้งไอทีเน็ตเวิร์ค' },
]

/* type ที่คนกรอกไว้ในฐานข้อมูลสะกดไม่ตรงกันทุกอัน — มีทั้ง "Solar cell" และ "SolarCell"
   หน้าเดิมเทียบสตริงตรง ๆ งาน 3 ชิ้นที่สะกดติดกันเลยไม่เคยขึ้นเลยสักหมวด
   ตัดช่องว่าง/ขีด แล้วเทียบตัวพิมพ์เล็ก จะได้ไม่หายอีก */
const norm = (t: string) => (t ?? '').toLowerCase().replace(/[\s_-]/g, '')

const sections = computed(() => {
  const out = CATEGORIES.map(c => ({
    ...c,
    items: items.value.filter(p => norm(p.type) === c.key),
  }))

  /* "งานอื่น ๆ" เป็นถังรับทุกอย่างที่ไม่เข้าสามหมวดบน ไม่ใช่ type ชื่อ Other อย่างเดียว
     ต่อให้มี type ใหม่โผล่มาในฐานข้อมูล งานก็ยังขึ้นหน้าเว็บ ไม่หายเงียบ */
  const taken = new Set(out.flatMap(s => s.items.map(p => p.id)))
  const rest = items.value.filter(p => !taken.has(p.id))
  if (rest.length) out.push({ key: 'other', id: 'other', en: 'OTHER', th: 'งานอื่น ๆ', items: rest })

  // หมวดที่ยังไม่มีงานถูกตัดออก ไม่ให้เหลือหัวข้อลอยกับช่องว่าง
  return out.filter(s => s.items.length > 0)
})

function formatDate(dateStr: string) {
  return dayjs(dateStr).format('D MMM YYYY')
}

/* ── โหลดคลิปเฉพาะการ์ดที่อยู่ในสายตา ──
   การ์ดที่เลื่อนพ้นจอจะถูกถอด src ออก คลิปหยุดเล่นและคืนแบนด์วิดท์
   เผื่อขอบไว้ 300px เพื่อให้คลิปเริ่มโหลดก่อนการ์ดจะโผล่จริง ภาพจะได้ไม่ค้างเป็นช่องว่าง */
const listEl = ref<HTMLElement | null>(null)
const inView = ref<Set<string>>(new Set())
let io: IntersectionObserver | null = null

function rescan() {
  if (!io || !listEl.value) return
  io.disconnect()
  inView.value = new Set()
  listEl.value.querySelectorAll('[data-pid]').forEach(el => io!.observe(el))
}

onMounted(() => {
  // เบราว์เซอร์เก่าที่ไม่มี IntersectionObserver → ไม่ผูก src ให้คลิปเลย เหลือแค่แผ่นโลโก้
  if (!('IntersectionObserver' in window)) return

  io = new IntersectionObserver((entries) => {
    const next = new Set(inView.value)
    for (const e of entries) {
      const id = (e.target as HTMLElement).dataset.pid
      if (!id) continue
      if (e.isIntersecting) next.add(id)
      else next.delete(id)
    }
    inView.value = next
  }, { rootMargin: '300px 0px' })

  nextTick(rescan)
})

// ข้อมูลมาถึง/เปลี่ยนแล้วการ์ดเป็นคนละชุด ต้องจับตาใหม่ทั้งหมด
watch([sections, pending], () => nextTick(rescan))

onBeforeUnmount(() => io?.disconnect())

/* เครื่องที่รองรับ navigator.share ใช้แผงแชร์ของระบบ · ที่เหลือคัดลอกลิงก์ให้แทน */
function share(p: Solution) {
  const url = p.linkPresentSheet
  if (!url) return
  if (navigator.share) {
    navigator.share({ title: p.projectName, url }).catch(() => {})
  } else {
    navigator.clipboard?.writeText(url)
  }
}
</script>

<style scoped>
/* สีทั้งหมดรับมาจาก KwShell ผ่านตัวแปร CSS */

/* ── สารบัญหมวด ── */
.jump {
  display: flex; flex-wrap: wrap; gap: clamp(8px, 1.2vw, 14px);
  padding-bottom: clamp(18px, 2.4vw, 28px);
  border-bottom: 1px solid rgba(29, 27, 25, 0.14);
}
.jump__item {
  display: inline-flex; align-items: baseline; gap: 8px;
  padding: 10px 18px;
  text-decoration: none;
  border: 1px solid rgba(29, 27, 25, 0.2);
  background: rgba(251, 247, 238, 0.6);
  transition: color 0.2s, border-color 0.2s;
}
.jump__en {
  font-size: clamp(10px, 1vw, 12px); font-weight: 600; letter-spacing: 0.18em; color: var(--ink-soft);
}
.jump__n { font-size: 10px; letter-spacing: 0.08em; color: var(--ink-dim); }
.jump__item:hover { border-color: var(--red); }
.jump__item:hover .jump__en { color: var(--red); }

/* ── หัวข้อหมวด ── */
.cat {
  margin-top: clamp(34px, 5vw, 72px);
  /* กันไม่ให้หัวข้อมุดใต้แถบเมนูที่ติดขอบบน ตอนกดมาจากสารบัญ */
  scroll-margin-top: 110px;
}
.cat__head {
  display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between;
  gap: 12px;
  padding-bottom: clamp(12px, 1.6vw, 18px);
  border-bottom: 1px solid rgba(29, 27, 25, 0.16);
}
.cat__en { font-size: clamp(10px, 1vw, 12px); font-weight: 600; letter-spacing: 0.26em; color: var(--red); }
.cat__th {
  margin-top: 7px;
  font-size: clamp(16px, 2vw, 25px); font-weight: 500; line-height: 1.35; color: var(--ink);
}
.cat__n {
  font-size: 10.5px; font-weight: 600; letter-spacing: 0.2em; color: var(--ink-dim);
  white-space: nowrap;
}

/* ── สถานะ ── */
.note {
  margin-top: clamp(28px, 4vw, 48px);
  font-size: clamp(13.5px, 1.35vw, 16px); color: var(--ink-dim);
}
.note--bad { color: var(--red); }
.retry {
  margin-top: 12px; padding: 10px 20px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.18em;
  color: var(--ink); background: transparent;
  border: 1px solid rgba(29, 27, 25, 0.42); cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}
.retry:hover { border-color: var(--ink); background: rgba(29, 27, 25, 0.045); }

/* ── ตาราง ── */
.grid {
  display: grid; gap: clamp(16px, 2.2vw, 28px);
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  list-style: none; margin: clamp(20px, 2.8vw, 32px) 0 0; padding: 0;
}
.proj {
  position: relative;
  background: rgba(251, 247, 238, 0.72);
  border: 1px solid rgba(29, 27, 25, 0.14);
  transition: border-color 0.24s, transform 0.24s, box-shadow 0.24s;
}
.proj:hover {
  border-color: var(--gold);
  transform: translateY(-3px);
  box-shadow: 0 16px 36px rgba(24, 20, 16, 0.1);
}
/* auto 1fr — การ์ดในแถวเดียวกันสูงเท่ากันเสมอ ส่วนที่เกินต้องไปลงที่กล่องข้อความอย่างเดียว
   ถ้าปล่อยเป็น auto auto กล่องรูปจะยืดตามไปด้วย แล้วคลิปในแถวเดียวกันจะสูงไม่เท่ากัน */
.proj__link { display: grid; grid-template-rows: auto 1fr; text-decoration: none; color: inherit; height: 100%; }

.proj__media { position: relative; display: block; aspect-ratio: 16 / 10; overflow: hidden; background: #ece3d2; }
.proj__video { display: block; width: 100%; height: 100%; object-fit: cover; }
.proj__blank { display: grid; place-items: center; width: 100%; height: 100%; }
.proj__blank img { width: 54px; height: auto; opacity: 0.3; }
.proj__type {
  position: absolute; left: 0; bottom: 0;
  padding: 6px 12px;
  font-size: 9.5px; font-weight: 600; letter-spacing: 0.2em;
  color: #fdf8ef; background: rgba(160, 28, 36, 0.92);
}

.proj__body {
  display: grid; align-content: start; gap: 8px;
  padding: clamp(16px, 1.8vw, 22px);
}
.proj__date { font-size: 10.5px; font-weight: 500; letter-spacing: 0.2em; color: var(--ink-dim); }
/* ชื่อโครงการหลายอันเป็นคำยาวติดกันไม่มีเว้นวรรค (เช่น Proposal_CollaborativeSensing_Momay)
   ถ้าไม่บังคับตัด จะดันทะลุขอบการ์ดออกไป */
.proj__name {
  font-size: clamp(14px, 1.4vw, 17px); font-weight: 600; line-height: 1.55; color: var(--ink);
  overflow-wrap: anywhere;
}
.proj__desc {
  font-size: 12.5px; line-height: 1.8; color: var(--ink-soft);
  overflow-wrap: anywhere;
  /* ตัดที่ 3 บรรทัด — คำอธิบายแต่ละโครงการยาวไม่เท่ากัน การ์ดจะได้สูงใกล้เคียงกัน */
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
}
.proj__more {
  display: inline-flex; align-items: center; gap: 8px; margin-top: 4px;
  font-size: 10.5px; font-weight: 600; letter-spacing: 0.2em; color: var(--red);
}
.proj__more svg { width: 16px; height: 16px; transition: transform 0.24s; }
.proj:hover .proj__more svg { transform: translateX(4px); }

.proj__share {
  position: absolute; top: 10px; right: 10px; z-index: 2;
  display: grid; place-items: center;
  width: 34px; height: 34px; padding: 8px;
  color: var(--ink); background: rgba(251, 247, 238, 0.9);
  border: 1px solid rgba(29, 27, 25, 0.16); cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}
.proj__share:hover { color: var(--red); border-color: var(--red); }
.proj__share svg { width: 100%; height: 100%; }

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
}
</style>
