<!--
  COLLABORATIVE SENSING (V2) — /forwardthinkingV2/collaborativesensing

  หน้าเดิมคือ /renewablesort/collaborativesensing — เปลี่ยนแค่ดีไซน์ เนื้อหาไม่แต่งเพิ่ม
    · ตัววิ่ง สมุดพลิก การ์ด Presentation / Collaborative sensing (ถามรหัสผ่านก่อนเปิด เหมือนเดิม) Download Document  ← จากหน้าเดิม
    · คำอธิบาย รายการอุปกรณ์ แผนภาพ และการ์ด kwangdataisyourspace.space  ← จากแผง Collaborative sensing ใน pages/renewable.vue

  หมายเหตุ: หน้าเดิมใช้ไฟล์ Sale Kit ของ MOMAY ทั้งในสมุดพลิกและปุ่มดาวน์โหลด — คงไว้ตามเดิม
-->
<template>
  <KwShell active="forward" eyebrow="FORWARD THINKING" title="COLLABORATIVE SENSING">
    <KwTicker :words="['Collaborative Sensing', 'Data Integration', 'Smart Environment']" />

    <div class="intro font-th">
      <p>
        Collaborative sensing คือกระบวนการที่นำอุปกรณ์หลายตัวหรือหลายระบบทำงานร่วมกัน
        เพื่อ<strong>ตรวจจับ รวบรวม และประมวลผลข้อมูล</strong>จากสภาพแวดล้อมโดยรอบ
        เพื่อให้ได้ข้อมูลที่แม่นยำและครอบคลุมยิ่งขึ้น
      </p>
      <ul class="chips">
        <li v-for="b in DEVICES" :key="b">{{ b }}</li>
      </ul>
      <p>
        และส่งข้อมูลเพื่อแสดงผลบนระบบที่ถูกพัฒนาขึ้นมา
        <strong>Data is your</strong> เพื่อให้ผู้ใช้สามารถเข้าถึงและวิเคราะห์ข้อมูลได้อย่างมีประสิทธิภาพ
      </p>
    </div>

    <section class="sect">
      <button type="button" class="shot" @click="zoom = true">
        <img src="/diagramSystem.png" alt="Diagram System" loading="lazy" />
      </button>
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

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="zoom" class="zoom-mask" @click.self="zoom = false">
          <button type="button" class="zoom-x" aria-label="ปิด" @click="zoom = false">×</button>
          <img src="/diagramSystem.png" alt="Diagram System" />
        </div>
      </Transition>
    </Teleport>
  </KwShell>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { KwLinkCard } from '~/components/Kw/LinkCards.vue'

definePageMeta({ layout: false })

useSeoMeta({
  title: 'COLLABORATIVE SENSING — KWANG UNLIMITED',
  description: 'Collaborative sensing คือกระบวนการที่นำอุปกรณ์หลายตัวหรือหลายระบบทำงานร่วมกัน เพื่อตรวจจับ รวบรวม และประมวลผลข้อมูลจากสภาพแวดล้อมโดยรอบ',
  ogTitle: 'COLLABORATIVE SENSING — KWANG UNLIMITED',
  ogImage: '/datacityplatform.png',
})

const DEVICES = ['Energy', 'Camera CCTV', 'EV Charger', 'Access Control']

/* การ์ดสองใบแรกของหน้าเดิมถามรหัสผ่านก่อนเปิด — คงพฤติกรรมเดิมไว้ */
function openWithPassword(url: string) {
  const password = prompt('กรุณาใส่รหัสผ่านเพื่อเข้าถึง')
  if (password !== '240124') {
    alert('รหัสผ่านไม่ถูกต้อง ❌')
    return
  }
  window.location.href = url
}

const CARDS: KwLinkCard[] = [
  { label: 'Presentation', logo: '/datacityplatform.png', action: () => openWithPassword('https://my.spline.design/gbuildingcopy-IkEUVsUF6jDjYMQXbQSS3pFb/') },
  { label: 'Collaborative sensing', logo: '/datacityplatform.png', action: () => openWithPassword('/cs') },
  { label: 'kwangdataisyourspace.space', logo: '/datacityplatform.png', href: 'https://kwangdataisyourspace.space/' },
  { label: 'Download Document', logo: '/datacityplatform.png', href: '/Sale Kit Momay181125 .pdf', download: true },
]

const PAGES = [1, 2, 3, 4, 5, 6, 7].map(n => `/Sale%20Kit%20Momay181125%20_pages-to-jpg-000${n}.jpg`)

const zoom = ref(false)

// จอแคบใช้สมุดพลิกรุ่นมือถือ เกณฑ์เดียวกับหน้าเดิม (≤ 768px)
const isMobile = ref(false)
function updateIsMobile() { isMobile.value = window.innerWidth <= 768 }
function onKeydown(e: KeyboardEvent) { if (e.key === 'Escape') zoom.value = false }
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

.intro { display: grid; gap: 14px; max-width: 880px; margin-top: clamp(26px, 3.6vw, 44px); }
.intro p { font-size: clamp(17px, 1.7vw, 22px); line-height: 1.9; color: var(--ink); }
.intro strong { font-weight: 600; color: var(--red); }
.chips { display: flex; flex-wrap: wrap; gap: 10px; margin: 0; padding: 0; list-style: none; }
.chips li {
  padding: 7px 16px;
  font-size: clamp(14px, 1.3vw, 16px); color: var(--ink);
  border: 1px solid rgba(29, 27, 25, 0.18); border-radius: 999px;
  background: var(--paper-2);
}

.sect { margin-top: clamp(36px, 5vw, 72px); }

.shot {
  display: block; width: 100%; padding: clamp(14px, 2vw, 26px);
  background: rgba(251, 247, 238, 0.72);
  border: 1px solid rgba(29, 27, 25, 0.14);
  cursor: zoom-in;
  transition: border-color 0.22s;
}
.shot:hover { border-color: var(--gold); }
.shot img { display: block; width: 100%; max-width: 880px; margin: 0 auto; height: auto; }

.book { display: flex; justify-content: center; }

.zoom-mask {
  position: fixed; inset: 0; z-index: 90;
  display: grid; place-items: center; padding: clamp(16px, 4vw, 48px);
  background: rgba(24, 20, 16, 0.72); backdrop-filter: blur(3px);
}
.zoom-mask img { max-width: 100%; max-height: 88svh; background: #fbf7ee; padding: 12px; }
.zoom-x {
  position: absolute; top: 14px; right: 20px;
  font-size: 34px; line-height: 1; color: #f3ead9;
  background: none; border: 0; cursor: pointer;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
