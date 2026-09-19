<!--
  MOMAY — สารบัญงาน (/renewablesort/Momay2)

  ยกมาจาก momay.vue หน้าเดิม ต่างกันสามเรื่อง:
    1. ธีมกระดาษครีมชุดเดียวกับหน้าแรก /home2 (เดิมเป็นธีมมืด)
    2. โลโก้บนการ์ดเปลี่ยนเป็นตรา MOMAY ENLIGHTENMENT
    3. ตัดเอกสารออกทั้งหมด ทั้งตัวอ่าน e-book (flipbook) และปุ่มดาวน์โหลด PDF

  การ์ดและลิงก์ทั้งหมดรวมถึงห้อง BUU ยกมาครบ ไม่มีตัวไหนถูกตัด
  หน้าเดิมยังอยู่ที่ /renewablesort/momay แก้ที่นั่นแล้วต้องตามมาแก้ที่นี่ด้วย
-->
<template>
  <!-- ใช้ root-bg เป็น container หลัก -->
  <div class="root-bg p-8 min-h-screen">

  <!-- หัวหน้าเพจ: ตรา MOMAY บนกระดาษครีม ชุดเดียวกับหน้าแรก -->
  <header class="mm-head">
    <a class="mm-brand" href="/home2" aria-label="KWANG UNLIMIT">
      <img class="mm-brand__logo" src="/kwang_logo2.png" alt="KWANG UNLIMIT" />
    </a>
    <div class="mm-head__mark">
      <img src="/home2/momay-enlightenment.png" alt="MOMAY ENLIGHTENMENT" />
    </div>
    <p class="mm-head__sub font-thai">สารบัญงานทั้งหมดของ MOMAY</p>
  </header>

  <!-- Running Text -->
  <div class="scroll-reveal flex justify-center flex-1 px-[clamp(1rem,3vw,1.5rem)] mt-[clamp(1rem,4vw,2.5rem)] mb-[clamp(2rem,4vw,3rem)]">
    <div class="running-text w-full max-w-[min(1200px,95vw)] overflow-hidden relative text-[clamp(0.875rem,1.5vw,1.25rem)] whitespace-nowrap">
      <div class="marquee">
        <div class="marquee-content">
          <span>Momay Platform</span>
          <span>Real-time Data Integration</span>
          <span>Smart Energy Management</span>
        </div>
        <div class="marquee-content">
          <span>Momay Platform</span>
          <span>Real-time Data Integration</span>
          <span>Smart Energy Management</span>
        </div>
      </div>
    </div>
  </div>

  <div class="momay-sections max-w-6xl mx-auto px-4 mt-8 sm:mt-10">

    <section class="momay-section">
      <div class="section-head">
        <h2 class="section-title font-thai">Momay</h2>
      </div>
      <div class="flex gap-3 sm:gap-4 flex-wrap justify-center">
      <div
        @click="openSplineDesign('Mpmay_human')"
        class="neon-btn spline-link-card hover:from-indigo-100 hover:to-indigo-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="Momay Human" class="w-12 h-12 object-contain" />
          <span class="font-thai">Human_NU</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('Momay_pharmacy')"
        class="neon-btn spline-link-card hover:from-green-100 hover:to-green-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="Momay Pharmacy" class="w-12 h-12 object-contain" />
          <span class="font-thai">Pharmacy_NU</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('momay_BanKlongResort')"
        class="neon-btn spline-link-card hover:from-yellow-100 hover:to-yellow-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="BanKlong Resort" class="w-12 h-12 object-contain" />
          <span class="font-thai">BanKlong Resort</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('wongpanit_sukhothai')"
        class="neon-btn spline-link-card hover:from-pink-100 hover:to-pink-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="Momay" class="w-12 h-12 object-contain" />
          <span class="font-thai">Wongpanit Sukhothai</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('momay2')"
        class="neon-btn spline-link-card hover:from-pink-100 hover:to-pink-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="Momay" class="w-12 h-12 object-contain" />
          <span class="font-thai">Momay 2</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('clinic')"
        class="neon-btn spline-link-card hover:from-pink-100 hover:to-pink-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="Momay" class="w-12 h-12 object-contain" />
          <span class="font-thai">Clinic</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('hospital_Noenmaprang_v1')"
        class="neon-btn spline-link-card hover:from-pink-100 hover:to-pink-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="Momay" class="w-12 h-12 object-contain" />
          <span class="font-thai">Hospital Noenmaprang V1</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('hospital_Noenmaprang')"
        class="neon-btn spline-link-card hover:from-pink-100 hover:to-pink-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="Momay" class="w-12 h-12 object-contain" />
          <span class="font-thai">Hospital Noenmaprang</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('momay_doc_99_99')"
        class="neon-btn spline-link-card hover:from-amber-100 hover:to-amber-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="Momay 99/99" class="w-12 h-12 object-contain" />
          <span class="font-thai">99/99</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('momay_88_31_khun_deer')"
        class="neon-btn spline-link-card hover:from-blue-100 hover:to-blue-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="คุณเดียร์" class="w-12 h-12 object-contain" />
          <span class="font-thai">คุณเดียร์</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('momay_khun_sand')"
        class="neon-btn spline-link-card hover:from-blue-100 hover:to-blue-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="คุณแซน" class="w-12 h-12 object-contain" />
          <span class="font-thai">คุณแซน</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('momay_khun_nak')"
        class="neon-btn spline-link-card hover:from-blue-100 hover:to-blue-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="Momay คุณนัก" class="w-12 h-12 object-contain" />
          <span class="font-thai">Momay คุณนัก</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('momaynew')"
        class="neon-btn spline-link-card hover:from-emerald-100 hover:to-emerald-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="คุณนิว" class="w-12 h-12 object-contain" />
          <span class="font-thai">คุณนิว</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('momay_bangkrong')"
        class="neon-btn spline-link-card hover:from-teal-100 hover:to-teal-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="บ้านคลองรีสอร์ท" class="w-12 h-12 object-contain" />
          <span class="font-thai">บ้านคลองรีสอร์ท</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('demo')"
        class="neon-btn spline-link-card hover:from-violet-100 hover:to-violet-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="Demo Momay" class="w-12 h-12 object-contain" />
          <span class="font-thai">Demo Momay</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('momay_khun_taeng')"
        class="neon-btn spline-link-card hover:from-orange-100 hover:to-orange-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="Momay คุณเท้ง" class="w-12 h-12 object-contain" />
          <span class="font-thai">Momay คุณเท้ง</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('momay_khun_eat')"
        class="neon-btn spline-link-card hover:from-orange-100 hover:to-orange-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="Momay คุณอิ๊ด" class="w-12 h-12 object-contain" />
          <span class="font-thai">Momay คุณอิ๊ด</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('dashboard')"
        class="neon-btn spline-link-card hover:from-amber-100 hover:to-amber-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="Momay Dashboard" class="w-12 h-12 object-contain" />
          <span class="font-thai">Momay Dashboard</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('naresuan_library')"
        class="neon-btn spline-link-card hover:from-amber-100 hover:to-amber-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="Naresuan Library" class="w-12 h-12 object-contain" />
          <span class="font-thai">Naresuan University Library</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('momay_mom')"
        class="neon-btn spline-link-card hover:from-rose-100 hover:to-rose-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="Momay แม่พี่เอิน" class="w-12 h-12 object-contain" />
          <span class="font-thai">Momay แม่พี่เอิน</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('momay_kae')"
        class="neon-btn spline-link-card hover:from-fuchsia-100 hover:to-fuchsia-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="Momay คุณเก๋" class="w-12 h-12 object-contain" />
          <span class="font-thai">Momay คุณเก๋</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('MomayDP')"
        class="neon-btn spline-link-card hover:from-purple-100 hover:to-purple-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="MomayDP" class="w-12 h-12 object-contain" />
          <span class="font-thai">MomayDP</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('MomayChamp')"
        class="neon-btn spline-link-card hover:from-amber-100 hover:to-amber-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="Momayเต็งหนามคอฟฟี่" class="w-12 h-12 object-contain" />
          <span class="font-thai">Momayเต็งหนามคอฟฟี่</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('MomayTopSoccer')"
        class="neon-btn spline-link-card hover:from-emerald-100 hover:to-emerald-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="ปั้มแก๊ส" class="w-12 h-12 object-contain" />
          <span class="font-thai">ปั้มแก๊ส</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('MomayAnan')"
        class="neon-btn spline-link-card hover:from-emerald-100 hover:to-emerald-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="top soccer" class="w-12 h-12 object-contain" />
          <span class="font-thai">top soccer</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('MomayKorn')"
        class="neon-btn spline-link-card hover:from-emerald-100 hover:to-emerald-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="คุณกร" class="w-12 h-12 object-contain" />
          <span class="font-thai">คุณกร</span>
        </div>
      </div>
      <div
        @click="openSplineDesign('SmartLibrary')"
        class="neon-btn spline-link-card hover:from-violet-100 hover:to-violet-300"
      >
        <div class="card-content">
          <img src="/home2/momay-enlightenment.png" alt="Borrow and Return Service" class="w-12 h-12 object-contain" />
          <span class="font-thai">Borrow and Return Service</span>
        </div>
      </div>
      </div>
    </section>

    <section class="momay-section">
      <div class="flex justify-center">
        <div
          @click="openBuu"
          class="neon-btn spline-link-card buu-entry-card"
          role="button"
          tabindex="0"
          @keydown.enter="openBuu"
          @keydown.space.prevent="openBuu"
        >
          <div class="card-content">
            <img src="/home2/momay-enlightenment.png" alt="BUU" class="w-12 h-12 object-contain" />
            <span class="font-thai">BUU</span>
          </div>
        </div>
      </div>
    </section>

  </div>

  <!-- Flipbook Viewer using FlipbookVue Component -->

  <!-- BUU: กดการ์ด BUU แล้วค่อยเข้ามาดูรายการข้างใน -->
  <Teleport to="body">
    <div v-if="isBuuOpen" class="buu-modal-overlay" @click.self="closeBuu">
      <div class="buu-modal" role="dialog" aria-modal="true" aria-label="BUU">
        <button type="button" class="buu-modal-close" aria-label="ปิด" @click="closeBuu">&times;</button>
        <div class="section-head">
          <h2 class="section-title font-thai">BUU</h2>
        </div>
          <div class="buu-subsections">
            <div class="buu-subsection">
              <div class="subsection-head">
                <h3 class="subsection-title font-thai">เก็บไว้เช็คประวัติ</h3>
              </div>
              <div class="flex gap-3 sm:gap-4 flex-wrap justify-center">
              <div
                @click="openSplineDesign('momayBUU')"
                class="neon-btn spline-link-card hover:from-sky-100 hover:to-sky-300"
              >
                <div class="card-content">
                  <img src="/home2/momay-enlightenment.png" alt="momayBUU" class="w-12 h-12 object-contain" />
                  <span class="font-thai">momayBUU</span>
                </div>
              </div>
              <div
                @click="openSplineDesign('MomayHMV1')"
                class="neon-btn spline-link-card hover:from-cyan-100 hover:to-cyan-300"
              >
                <div class="card-content">
                  <img src="/home2/momay-enlightenment.png" alt="MomayHMV1" class="w-12 h-12 object-contain" />
                  <span class="font-thai">MomayHMV1</span>
                </div>
              </div>
              <div
                @click="openSplineDesign('MomayModel')"
                class="neon-btn spline-link-card hover:from-indigo-100 hover:to-indigo-300"
              >
                <div class="card-content">
                  <img src="/home2/momay-enlightenment.png" alt="MomayModel" class="w-12 h-12 object-contain" />
                  <span class="font-thai">MomayModel</span>
                </div>
              </div>
              <div
                @click="openSplineDesign('MomayBUU-Student')"
                class="neon-btn spline-link-card hover:from-sky-100 hover:to-sky-300"
              >
                <div class="card-content">
                  <img src="/home2/momay-enlightenment.png" alt="MomayBUU-Student" class="w-12 h-12 object-contain" />
                  <span class="font-thai">MomayBUU-Student</span>
                </div>
              </div>
              <div
                @click="openSplineDesign('MomayInsights')"
                class="neon-btn spline-link-card hover:from-violet-100 hover:to-violet-300"
              >
                <div class="card-content">
                  <img src="/home2/momay-enlightenment.png" alt="Momay-Insights" class="w-12 h-12 object-contain" />
                  <span class="font-thai">Momay-Insights</span>
                </div>
              </div>
              <div
                @click="openSplineDesign('MomayTemplate')"
                class="neon-btn spline-link-card hover:from-violet-100 hover:to-violet-300"
              >
                <div class="card-content">
                  <img src="/home2/momay-enlightenment.png" alt="momay-template" class="w-12 h-12 object-contain" />
                  <span class="font-thai">momay-template</span>
                </div>
              </div>
              <!-- ขีดฆ่าในโน้ต — เก็บไว้ท้ายสุด -->
              <div
                @click="openSplineDesign('MomayGreedy')"
                class="neon-btn spline-link-card hover:from-lime-100 hover:to-lime-300"
              >
                <div class="card-content">
                  <img src="/home2/momay-enlightenment.png" alt="MomayGreedy" class="w-12 h-12 object-contain" />
                  <span class="font-thai">MomayGreedy</span>
                </div>
              </div>
              <div
                @click="openSplineDesign('MomayBUU')"
                class="neon-btn spline-link-card hover:from-sky-100 hover:to-sky-300"
              >
                <div class="card-content">
                  <img src="/home2/momay-enlightenment.png" alt="MomayBUU" class="w-12 h-12 object-contain" />
                  <span class="font-thai">MomayBUU</span>
                </div>
              </div>
              </div>
            </div>

            <div class="buu-subsection">
              <div class="subsection-head">
                <h3 class="subsection-title font-thai">ส่งงาน</h3>
              </div>
              <div class="flex gap-3 sm:gap-4 flex-wrap justify-center">
              <div
                @click="openSplineDesign('MomayBUU-ByJob')"
                class="neon-btn spline-link-card hover:from-sky-100 hover:to-sky-300"
              >
                <div class="card-content">
                  <img src="/home2/momay-enlightenment.png" alt="MomayBUU by Job" class="w-12 h-12 object-contain" />
                  <span class="font-thai">MomayBUU by Job</span>
                </div>
              </div>
              <div
                @click="openSplineDesign('MomayBUUStudent')"
                class="neon-btn spline-link-card card-detail hover:from-violet-100 hover:to-violet-300"
              >
                <div class="card-content">
                  <img src="/home2/momay-enlightenment.png" alt="Momay BUU Student (070926)" class="w-12 h-12 object-contain" />
                  <span class="font-thai">Momay BUU Student<span class="card-note">(070926) สีดำ V.1 — พี่จ๊อบออก V.1 ยังไม่สนุก ทางการมาก</span></span>
                </div>
              </div>
              <div
                @click="openSplineDesign('MomayBUU-Executive')"
                class="neon-btn spline-link-card hover:from-sky-100 hover:to-sky-300"
              >
                <div class="card-content">
                  <img src="/home2/momay-enlightenment.png" alt="MomayBUU-Executive" class="w-12 h-12 object-contain" />
                  <span class="font-thai">MomayBUU-Executive</span>
                </div>
              </div>
              <div
                @click="openSplineDesign('MomayPrototype')"
                class="neon-btn spline-link-card label-tight hover:from-violet-100 hover:to-violet-300"
              >
                <div class="card-content">
                  <img src="/home2/momay-enlightenment.png" alt="Momay-Enligtend-Executive-Student" class="w-12 h-12 object-contain" />
                  <span class="font-thai">Momay-Enligtend-Executive-Student</span>
                </div>
              </div>
              <div
                @click="openSplineDesign('Momay-Student-Pixel')"
                class="neon-btn spline-link-card card-detail hover:from-violet-100 hover:to-violet-300"
              >
                <div class="card-content">
                  <img src="/home2/momay-enlightenment.png" alt="Momay-Student-Pixel" class="w-12 h-12 object-contain" />
                  <span class="font-thai">Momay Student Pixel V.1<span class="card-note">(100926) ตัวเลขยังเป็น Pixel</span></span>
                </div>
              </div>
              <div
                @click="openSplineDesign('Momay-Student-Pixel-V2')"
                class="neon-btn spline-link-card card-detail hover:from-fuchsia-100 hover:to-fuchsia-300"
              >
                <div class="card-content">
                  <img src="/home2/momay-enlightenment.png" alt="Momay-Student-Pixel-V2" class="w-12 h-12 object-contain" />
                  <span class="font-thai">Momay Student Pixel V.2<span class="card-note">(130926) ปรับตัวหนังสือชัด ตามพี่ตูน</span></span>
                </div>
              </div>
              <div
                @click="openSplineDesign('Momay-Student-Pixel-VSettings')"
                class="neon-btn spline-link-card card-detail hover:from-rose-100 hover:to-rose-300"
              >
                <div class="card-content">
                  <img src="/home2/momay-enlightenment.png" alt="Momay-Student-Pixel-VSettings" class="w-12 h-12 object-contain" />
                  <span class="font-thai">Momay Student Pixel V.Settings<span class="card-note">(150926) เพิ่มการตั้งค่า</span></span>
                </div>
              </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </Teleport>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

useHead({
  title: 'MOMAY — สารบัญงาน',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href:
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&' +
        'family=Montserrat:wght@400;500;600;700;800&' +
        'family=Noto+Sans+Thai:wght@300;400;500;600&display=swap',
    },
  ],
  // สีกระดาษต้องไปถึงขอบจอ ไม่งั้นตอนเด้ง (overscroll) จะเห็นพื้นขาวของเบราว์เซอร์
  style: [{ children: 'html,body{background:#f6f1e6 !important;}' }],
})

const splineLinks: Record<string, string> = {
  momay_BanKlongResort: '/momay/momay_BanKlongResort',
  wongpanit_sukhothai: '/momay/wongpanit_sukhothai',
  hospital_Noenmaprang: '/momay/hospital_Noenmaprang',
  hospital_Noenmaprang_v1: '/momay/hospital_Noenmaprang_v1',
  clinic: '/momay/clinic',
  momay2:'/momay/momay02',
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
  SmartLibrary: '/momay/SmartLibrary',
  MomayInsights: '/momay/MomayInsights',
  MomayBUUStudent: '/momay/MomayBUUStudent',
  'Momay-Student-Pixel': '/momay/Momay-Student-Pixel',
  'Momay-Student-Pixel-V2': '/momay/Momay-Student-Pixel-V2',
  'Momay-Student-Pixel-VSettings': '/momay/Momay-Student-Pixel-VSettings',
  MomayTemplate: '/momay/MomayTemplate'
}

onMounted(() => {
  // Scroll animation observer - Apple style
  let observer: IntersectionObserver | null = null

  // Reset all scroll-reveal elements
  const scrollElements = document.querySelectorAll('.scroll-reveal')
  scrollElements.forEach(el => {
    el.classList.remove('is-visible')
  })

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      }
    })
  }, observerOptions)

  scrollElements.forEach(el => observer!.observe(el))

  onBeforeUnmount(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', onBuuKeydown)
      document.body.style.overflow = ''
    }
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })
})

const isBuuOpen = ref(false)

function onBuuKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeBuu()
}

function openBuu() {
  isBuuOpen.value = true
  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onBuuKeydown)
  }
}

function closeBuu() {
  isBuuOpen.value = false
  if (typeof window !== 'undefined') {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onBuuKeydown)
  }
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
/* ══════════════ ธีมกระดาษครีม — ชุดเดียวกับหน้าแรก /home2 ══════════════ */
.root-bg {
  --paper: #f6f1e6;
  --paper-2: #fbf7ee;
  --surface: #fdfbf6;
  --ink: #1d1b19;
  --ink-soft: #4a443d;
  --ink-dim: #7a7267;
  --red: #a01c24;
  --red-bright: #c22a30;
  --gold: #c2a468;
  --line: rgba(29, 27, 25, 0.14);
  --line-on: rgba(160, 28, 36, 0.4);

  position: relative;
  background: radial-gradient(120% 90% at 50% 0%, var(--paper-2) 0%, var(--paper) 55%, #efe7d8 100%);
  color: var(--ink);
  font-family: 'Montserrat', system-ui, sans-serif;
  overflow-x: hidden;
}

/* เกรนกระดาษบาง ๆ ทับทั้งหน้า ให้ไม่เป็นพื้นเรียบแบน */
.root-bg::before {
  content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
  opacity: 0.05; mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* เส้นวงโคจรจาง ๆ สองวงที่มุมบนขวา เก็บกลิ่นหน้าแรกไว้
   ใช้ border อย่างเดียว ห้ามใส่ box-shadow สเปรดกว้าง ไม่งั้นกลายเป็นก้อนทึบกลางหน้า */
.root-bg::after {
  content: ''; position: fixed; top: -26vw; right: -30vw; z-index: 0; pointer-events: none;
  width: 86vw; height: 86vw; border-radius: 50%;
  border: 1px solid rgba(194, 164, 104, 0.3);
}

.root-bg > * { position: relative; z-index: 1; }

.font-thai { font-family: 'Noto Sans Thai', 'Montserrat', sans-serif; }

/* ── หัวหน้าเพจ ── */
.mm-head {
  display: flex; flex-direction: column; align-items: center; gap: clamp(16px, 2.6vw, 28px);
  padding-top: clamp(8px, 2vw, 20px); text-align: center;
}
/* ไฟล์โลโก้ KWANG เป็นผืนจัตุรัสที่มีขอบใสรอบเยอะ ครอบทิ้งเหมือนที่ทำในหน้าแรก
   (เนื้อโลโก้เริ่มที่ซ้าย 4.40% บน 11.90% กินพื้นที่ 90.00% × 65.55%) */
.mm-brand {
  --logo-h: clamp(44px, 6vw, 64px);
  --logo-box: calc(var(--logo-h) / 0.6555);
  display: block; overflow: hidden;
  height: var(--logo-h); width: calc(var(--logo-box) * 0.9);
}
.mm-brand__logo {
  display: block; max-width: none;
  width: var(--logo-box); height: var(--logo-box);
  margin: calc(var(--logo-box) * -0.119) 0 0 calc(var(--logo-box) * -0.044);
}
/* ตรา MOMAY ก็มีขอบใสรอบเช่นกัน (ซ้าย 10.13% บน 32.84% · 80.72% × 31.13%) */
.mm-head__mark {
  --wm-w: min(78vw, 420px);
  --wm-box: calc(var(--wm-w) / 0.8072);
  --wm-box-h: calc(var(--wm-box) * 0.6667);
  overflow: hidden;
  width: var(--wm-w); height: calc(var(--wm-box-h) * 0.3113);
}
.mm-head__mark img {
  display: block; max-width: none;
  width: var(--wm-box); height: auto;
  margin: calc(var(--wm-box-h) * -0.3284) 0 0 calc(var(--wm-box) * -0.1013);
}
.mm-head__sub { font-size: clamp(12px, 1.4vw, 15px); color: var(--ink-dim); }

/* ── สกรอลล์รีวีล ── */
.scroll-reveal {
  opacity: 0; transform: translateY(60px);
  transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.scroll-reveal.is-visible { opacity: 1; transform: translateY(0); }

/* ── ข้อความวิ่ง ── */
.running-text {
  padding: 12px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  color: var(--ink-dim);
}
.marquee { display: flex; width: max-content; animation: mmMarquee 26s linear infinite; }
.marquee-content { display: flex; }
.marquee-content span {
  padding: 0 2.2rem; font-size: 0.72em; font-weight: 500; letter-spacing: 0.22em;
  text-transform: uppercase; white-space: nowrap;
}
/* คั่นแต่ละวลีด้วยจุดแดงเล็ก ๆ แทนการใช้เส้น */
.marquee-content span + span::before {
  content: '·'; color: var(--red); margin-right: 2.2rem; margin-left: -2.2rem;
}
@keyframes mmMarquee { to { transform: translateX(-50%); } }

/* ── หัวข้อหมวด ── */
.momay-sections { padding-bottom: clamp(40px, 6vw, 72px); }
.momay-section { margin-top: clamp(28px, 4vw, 48px); }
.section-head { display: flex; justify-content: center; margin-bottom: clamp(14px, 2vw, 22px); }
.section-title {
  position: relative;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(22px, 3vw, 34px); font-weight: 500; color: var(--ink);
}
/* ขีดแดงสั้น ๆ ใต้หัวข้อ แทนกรอบเรืองแสงของธีมเดิม */
.section-title::after {
  content: ''; position: absolute; left: 50%; bottom: -8px; transform: translateX(-50%);
  width: 46px; height: 2px; background: var(--red);
}
.subsection-head { display: flex; justify-content: center; margin: 22px 0 14px; }
.subsection-title {
  font-size: clamp(13px, 1.6vw, 16px); font-weight: 600;
  letter-spacing: 0.06em; color: var(--ink-soft);
}

/* ── การ์ดลิงก์ ── */
.neon-btn.spline-link-card {
  width: clamp(148px, 21vw, 186px);
  padding: 16px 12px; border-radius: 4px; cursor: pointer;
  background: var(--surface);
  border: 1px solid var(--line);
  box-shadow: 0 1px 2px rgba(29, 27, 25, 0.04);
  transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
}
.neon-btn.spline-link-card:hover {
  border-color: var(--line-on);
  box-shadow: 0 10px 26px rgba(29, 27, 25, 0.12);
  transform: translateY(-2px);
}
.card-content { display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; }
/* โลโก้บนการ์ดเป็นตรา MOMAY แนวนอนที่มีขอบใสบน-ล่างเกินครึ่งไฟล์
   ถ้าตั้งความสูงเท่าที่อยากเห็น ตัวโลโก้จะเหลือนิดเดียว จึงตั้งกล่องให้สูงเผื่อขอบใส
   แล้วดึงขอบใสคืนด้วย margin ติดลบ ตัวโลโก้จะได้เต็มความกว้างการ์ดจริง ๆ */
.card-content img {
  width: 100% !important; height: 88px !important;
  object-fit: contain; object-position: center;
  margin: -27px 0 -30px;
}
.card-content span {
  font-size: 12.5px; font-weight: 600; line-height: 1.45; color: var(--ink);
  display: flex; flex-direction: column; gap: 3px;
}
.card-content span.card-note,
.card-content span .card-note {
  font-size: 10px; font-weight: 400; line-height: 1.5; color: var(--ink-dim);
}
.card-content span.card-date { font-size: 10px; font-weight: 400; color: var(--ink-dim); }
.card-content span.card-label-sm { font-size: 11px; }
.spline-link-card.card-detail { width: clamp(168px, 24vw, 210px); }
.spline-link-card.label-tight .card-content span { font-size: 11.5px; }

/* การ์ด BUU เป็นประตูเข้าห้องย่อย จึงเน้นด้วยกรอบแดงตั้งแต่ยังไม่ hover */
.buu-entry-card {
  border-color: rgba(160, 28, 36, 0.4) !important;
  background: linear-gradient(180deg, #fff, #fbf2f1) !important;
}

/* ── ห้อง BUU ── */
.buu-modal-overlay {
  position: fixed; inset: 0; z-index: 80;
  display: grid; place-items: center; padding: 20px;
  background: rgba(24, 20, 16, 0.55); backdrop-filter: blur(3px);
}
.buu-modal {
  position: relative; width: min(1100px, 100%); max-height: 88vh; overflow-y: auto;
  padding: 30px clamp(16px, 3vw, 34px) 34px;
  background: var(--paper-2); border: 1px solid var(--line);
  box-shadow: 0 30px 70px rgba(24, 20, 16, 0.34);
}
.buu-modal-close {
  position: absolute; top: 10px; right: 16px;
  font-size: 30px; line-height: 1; color: var(--ink-dim);
  background: none; border: 0; cursor: pointer;
}
.buu-modal-close:hover { color: var(--red); }
.buu-subsections { display: flex; flex-direction: column; gap: 26px; margin-top: 18px; }

@media (max-width: 640px) {
  .root-bg { padding: 16px !important; }
  .neon-btn.spline-link-card { width: calc(50% - 8px); }
  .spline-link-card.card-detail { width: calc(50% - 8px); }
}

@media (prefers-reduced-motion: reduce) {
  .marquee { animation: none; }
  .scroll-reveal { opacity: 1; transform: none; transition: none; }
}
</style>
