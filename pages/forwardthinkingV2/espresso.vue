<!--
  ESPRESSO (V2) — /forwardthinkingV2/espresso

  หน้าเดิมคือ /renewablesort/espresso — เปลี่ยนแค่ดีไซน์ เนื้อหาไม่แต่งเพิ่ม
    · ตัววิ่ง สมุดพลิก (/5.png–/10.png) ฟอร์มทดลองใช้งานฟรี บัญชีผู้ใช้งาน Download Document  ← จากหน้าเดิม
    · คำอธิบาย Key Features และการ์ด Espresso Pharmacy / Espresso Human  ← จากแผง Espresso ใน pages/renewable.vue

  ฟอร์มทดลองใช้งานส่งไปที่ /api/lead เหมือนหน้าเดิม (ช่องเดียวกัน: name, phone, type)
-->
<template>
  <KwShell active="forward" eyebrow="FORWARD THINKING" title="ESPRESSO">
    <KwTicker :words="['Espresso Platform', 'Real-time Data Integration', 'Smart Classroom']" />

    <p class="intro font-th">
      ระบบบริหารจัดการพลังงานอัจฉริยะ ติดตามและควบคุมการใช้ไฟฟ้าได้อย่างมีประสิทธิภาพ
      Espresso ช่วยให้คุณเห็นและวิเคราะห์การใช้พลังงานแบบเรียลไทม์
      เพื่อให้คุณสามารถตรวจสอบและแก้ไขปัญหาได้ทันที
    </p>

    <section class="sect">
      <h2 class="sect__title">Key Features</h2>
      <ul class="feats">
        <li v-for="f in FEATURES" :key="f.head">
          <b>{{ f.head }}</b>
          <span class="font-th">{{ f.body }}</span>
        </li>
      </ul>
    </section>

    <section class="sect">
      <KwLinkCards :items="CARDS" />
    </section>

    <section class="sect book">
      <ClientOnly>
        <MobileFlipbook v-if="isMobile" :pages="PAGES" />
        <PageFlipBook v-else :pages="PAGES" />
      </ClientOnly>
    </section>

    <!-- ฟอร์มทดลองใช้งานฟรี — ช่องและข้อความเดียวกับหน้าเดิม -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showTrialModal" class="modal-mask" @click.self="showTrialModal = false">
          <form class="modal" @submit.prevent="submitTrialForm">
            <h3 class="modal__title">ลงทะเบียนทดลองใช้งานฟรี</h3>

            <label class="field">
              <span>ชื่อ-นามสกุล</span>
              <input v-model="trialForm.name" required placeholder="กรอกชื่อ-นามสกุล" />
            </label>
            <label class="field">
              <span>เบอร์โทรศัพท์</span>
              <input v-model="trialForm.phone" type="tel" required placeholder="08x-xxx-xxxx" />
            </label>
            <label class="field">
              <span>ประเภทผู้ใช้งาน</span>
              <select v-model="trialForm.type" required>
                <option value="" disabled>เลือกประเภทผู้ใช้งาน</option>
                <option value="1">หน่วยงานราชการ</option>
                <option value="2">บริษัทเอกชน</option>
                <option value="3">ลูกค้าทั่วไป</option>
              </select>
            </label>

            <div class="modal__actions">
              <button type="button" class="mbtn mbtn--ghost" @click="showTrialModal = false">ยกเลิก</button>
              <button type="submit" class="mbtn mbtn--solid" :disabled="isSubmittingTrial || !trialForm.type">
                {{ isSubmittingTrial ? 'กำลังส่งข้อมูล...' : 'ยืนยันการลงทะเบียน' }}
              </button>
            </div>
          </form>
        </div>
      </Transition>
    </Teleport>
  </KwShell>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import type { KwLinkCard } from '~/components/Kw/LinkCards.vue'

definePageMeta({ layout: false })

useSeoMeta({
  title: 'ESPRESSO — KWANG UNLIMITED',
  description: 'ระบบบริหารจัดการพลังงานอัจฉริยะ ติดตามและควบคุมการใช้ไฟฟ้าได้อย่างมีประสิทธิภาพ',
  ogTitle: 'ESPRESSO — KWANG UNLIMITED',
  ogImage: '/ESPRESSO_logo.png',
})

const FEATURES = [
  { head: 'Real-time Monitoring', body: 'เฝ้าติดตามพลังงานแบบเรียลไทม์ ตั้งแต่ภาพรวมอาคารจนถึงแต่ละห้อง' },
  { head: 'Insight Analytics', body: 'วิเคราะห์ข้อมูลเชิงลึก พร้อมรายงานรายวัน รายเดือน และรายปี' },
  { head: 'Auto-Reporting', body: 'สร้างรายงานอัตโนมัติ ส่งออกเป็น PDF หรือ CSV ได้ทันที' },
  { head: 'Web Access', body: 'เข้าถึงระบบออนไลน์ได้ทุกที่ ทุกเวลา ผ่านเว็บเบราว์เซอร์' },
]

const showTrialModal = ref(false)

const CARDS: KwLinkCard[] = [
  { label: 'ทดลองใช้งานฟรี', logo: '/ESPRESSO_logo.png', action: () => { showTrialModal.value = true } },
  { label: 'บัญชีผู้ใช้งาน', logo: '/ESPRESSO_logo.png', href: '/renewablesort/Client' },
  { label: 'Espresso Pharmacy', logo: '/ESPRESSO_logo.png', href: 'https://my.spline.design/espresopharmacy-a21edee004531a425af1c2768331add8/' },
  { label: 'Espresso Human', logo: '/ESPRESSO_logo.png', href: 'https://my.spline.design/espresohumen-dde33c067dcf5aa8cf10d9d16cfe66b2/' },
  { label: 'Download Document', logo: '/ESPRESSO_logo.png', href: '/Sale Kit Espresso251125.pdf', download: true },
]

const PAGES = ['/5.png', '/6.png', '/7.png', '/8.png', '/9.png', '/10.png']

const trialForm = reactive({ name: '', phone: '', type: '' })
const isSubmittingTrial = ref(false)

async function submitTrialForm() {
  isSubmittingTrial.value = true
  try {
    await $fetch('/api/lead', { method: 'POST', body: trialForm })
    alert('ส่งข้อมูลเรียบร้อยแล้ว! เจ้าหน้าที่จะติดต่อกลับเพื่อยืนยันการเปิดใช้งาน')
    showTrialModal.value = false
    Object.assign(trialForm, { name: '', phone: '', type: '' })
  } catch (e: any) {
    console.error(e)
    alert('เกิดข้อผิดพลาด: ' + (e.data?.statusMessage || 'ไม่สามารถส่งข้อมูลได้'))
  } finally {
    isSubmittingTrial.value = false
  }
}

// จอแคบใช้สมุดพลิกรุ่นมือถือ เกณฑ์เดียวกับหน้าเดิม (≤ 768px)
const isMobile = ref(false)
function updateIsMobile() { isMobile.value = window.innerWidth <= 768 }
function onKeydown(e: KeyboardEvent) { if (e.key === 'Escape') showTrialModal.value = false }
onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsMobile)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
/* สีทั้งหมดรับมาจาก KwShell ผ่านตัวแปร CSS */

.intro {
  max-width: 860px;
  margin-top: clamp(26px, 3.6vw, 44px);
  font-size: clamp(17px, 1.7vw, 22px); line-height: 1.9; color: var(--ink);
}

.sect { margin-top: clamp(36px, 5vw, 72px); }
.sect__title {
  margin-bottom: clamp(16px, 2.2vw, 26px);
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(24px, 3vw, 38px); font-weight: 500; color: var(--ink);
}

.feats {
  display: grid; gap: clamp(12px, 1.6vw, 18px);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  margin: 0; padding: 0; list-style: none;
}
.feats li {
  padding: 18px 20px;
  background: rgba(251, 247, 238, 0.72);
  border: 1px solid rgba(29, 27, 25, 0.12);
  border-left: 2px solid var(--gold);
}
.feats b { display: block; font-size: clamp(13px, 1.15vw, 15px); font-weight: 700; letter-spacing: 0.06em; color: var(--red); }
.feats span { display: block; margin-top: 8px; font-size: clamp(15px, 1.3vw, 17px); line-height: 1.8; color: var(--ink-soft); }

/* สมุดพลิก — ตัวคอมโพเนนต์กำหนดขนาดเอง ที่นี่แค่จัดกลาง */
.book { display: flex; justify-content: center; }

/* ── ฟอร์ม ── */
.modal-mask {
  position: fixed; inset: 0; z-index: 90;
  display: grid; place-items: center; padding: 16px;
  background: rgba(24, 20, 16, 0.6); backdrop-filter: blur(3px);
}
.modal {
  width: min(100%, 440px);
  display: grid; gap: 16px;
  padding: clamp(22px, 4vw, 32px);
  background: #fbf7ee; color: #1d1b19;
  border: 1px solid rgba(194, 164, 104, 0.85);
  box-shadow: 0 24px 60px rgba(24, 20, 16, 0.3);
  font-family: 'Noto Sans Thai', 'Montserrat', sans-serif;
}
.modal__title { font-size: clamp(20px, 2.4vw, 24px); font-weight: 600; }
.field { display: grid; gap: 6px; font-size: 14px; color: #4a443d; }
.field input, .field select {
  width: 100%; padding: 10px 12px;
  font: inherit; font-size: 15px; color: #1d1b19;
  background: #fff; border: 1px solid rgba(29, 27, 25, 0.25);
  outline: none;
}
.field input:focus, .field select:focus { border-color: #a01c24; }
.modal__actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 6px; }
.mbtn { padding: 11px 20px; font: inherit; font-size: 14.5px; font-weight: 600; cursor: pointer; border: 1px solid transparent; }
.mbtn--solid { background: #a01c24; color: #fdf8ef; }
.mbtn--solid:disabled { opacity: 0.5; cursor: not-allowed; }
.mbtn--ghost { background: transparent; color: #1d1b19; border-color: rgba(29, 27, 25, 0.35); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
