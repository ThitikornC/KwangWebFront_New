<template>
  <!-- ใช้ root-bg เป็น container หลัก -->
  <div class="root-bg p-8 min-h-screen">

  <!-- Running Text -->
  <div class="scroll-reveal flex justify-center flex-1 px-[clamp(1rem,3vw,1.5rem)] mt-[clamp(4rem,10vw,5.625rem)] mb-[clamp(2rem,4vw,3rem)]">
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

  <div class="flipbook-container">
    <client-only>
      <template v-if="isMobile">
        <MobileFlipbook :pages="pages" />
      </template>
      <template v-else>
        <PageFlipBook :pages="pages" />
      </template>
    </client-only>
  </div>

  <div class="flex gap-3 sm:gap-4 flex-wrap justify-center mt-8 sm:mt-10 px-4 max-w-6xl mx-auto">
    <!-- New order: Humen - Phama - Bangkrong - Wongpanit - Ps - Clinic - hospital_Noenmaprang_v1 - hospital_Noenmaprang - Naresuan Library -->

    <div
      @click="openSplineDesign('Mpmay_human')"
      class="neon-btn spline-link-card hover:from-indigo-100 hover:to-indigo-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Momay Human" class="w-12 h-12 object-contain" />
        <span class="font-thai">Human_NU</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('Momay_pharmacy')"
      class="neon-btn spline-link-card hover:from-green-100 hover:to-green-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Momay Pharmacy" class="w-12 h-12 object-contain" />
        <span class="font-thai">Pharmacy_NU</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('momay_BanKlongResort')"
      class="neon-btn spline-link-card hover:from-yellow-100 hover:to-yellow-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="BanKlong Resort" class="w-12 h-12 object-contain" />
        <span class="font-thai">BanKlong Resort</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('wongpanit_sukhothai')"
      class="neon-btn spline-link-card hover:from-pink-100 hover:to-pink-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Momay" class="w-12 h-12 object-contain" />
        <span class="font-thai">Wongpanit Sukhothai</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('momay2')"
      class="neon-btn spline-link-card hover:from-pink-100 hover:to-pink-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Momay" class="w-12 h-12 object-contain" />
        <span class="font-thai">Momay 2</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('clinic')"
      class="neon-btn spline-link-card hover:from-pink-100 hover:to-pink-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Momay" class="w-12 h-12 object-contain" />
        <span class="font-thai">Clinic</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('hospital_Noenmaprang_v1')"
      class="neon-btn spline-link-card hover:from-pink-100 hover:to-pink-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Momay" class="w-12 h-12 object-contain" />
        <span class="font-thai">Hospital Noenmaprang V1</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('hospital_Noenmaprang')"
      class="neon-btn spline-link-card hover:from-pink-100 hover:to-pink-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Momay" class="w-12 h-12 object-contain" />
        <span class="font-thai">Hospital Noenmaprang</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('momay_doc_99_99')"
      class="neon-btn spline-link-card hover:from-amber-100 hover:to-amber-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Momay 99/99" class="w-12 h-12 object-contain" />
        <span class="font-thai">99/99</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('momay_88_31_khun_deer')"
      class="neon-btn spline-link-card hover:from-blue-100 hover:to-blue-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="คุณเดียร์" class="w-12 h-12 object-contain" />
        <span class="font-thai">คุณเดียร์</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('momay_khun_sand')"
      class="neon-btn spline-link-card hover:from-blue-100 hover:to-blue-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="คุณแซน" class="w-12 h-12 object-contain" />
        <span class="font-thai">คุณแซน</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('momay_khun_nak')"
      class="neon-btn spline-link-card hover:from-blue-100 hover:to-blue-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Momay คุณนัก" class="w-12 h-12 object-contain" />
        <span class="font-thai">Momay คุณนัก</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('momaynew')"
      class="neon-btn spline-link-card hover:from-emerald-100 hover:to-emerald-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="คุณนิว" class="w-12 h-12 object-contain" />
        <span class="font-thai">คุณนิว</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('momay_bangkrong')"
      class="neon-btn spline-link-card hover:from-teal-100 hover:to-teal-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="บ้านคลองรีสอร์ท" class="w-12 h-12 object-contain" />
        <span class="font-thai">บ้านคลองรีสอร์ท</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('demo')"
      class="neon-btn spline-link-card hover:from-violet-100 hover:to-violet-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Demo Momay" class="w-12 h-12 object-contain" />
        <span class="font-thai">Demo Momay</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('momay_khun_taeng')"
      class="neon-btn spline-link-card hover:from-orange-100 hover:to-orange-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Momay คุณเท้ง" class="w-12 h-12 object-contain" />
        <span class="font-thai">Momay คุณเท้ง</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('momay_khun_eat')"
      class="neon-btn spline-link-card hover:from-orange-100 hover:to-orange-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Momay คุณอิ๊ด" class="w-12 h-12 object-contain" />
        <span class="font-thai">Momay คุณอิ๊ด</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('dashboard')"
      class="neon-btn spline-link-card hover:from-amber-100 hover:to-amber-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Momay Dashboard" class="w-12 h-12 object-contain" />
        <span class="font-thai">Momay Dashboard</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('naresuan_library')"
      class="neon-btn spline-link-card hover:from-amber-100 hover:to-amber-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Naresuan Library" class="w-12 h-12 object-contain" />
        <span class="font-thai">Naresuan University Library</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('momayBUU')"
      class="neon-btn spline-link-card hover:from-sky-100 hover:to-sky-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="momayBUU" class="w-12 h-12 object-contain" />
        <span class="font-thai">momayBUU</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('momay_mom')"
      class="neon-btn spline-link-card hover:from-rose-100 hover:to-rose-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Momay แม่พี่เอิน" class="w-12 h-12 object-contain" />
        <span class="font-thai">Momay แม่พี่เอิน</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('momay_kae')"
      class="neon-btn spline-link-card hover:from-fuchsia-100 hover:to-fuchsia-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Momay คุณเก๋" class="w-12 h-12 object-contain" />
        <span class="font-thai">Momay คุณเก๋</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('MomayHMV1')"
      class="neon-btn spline-link-card hover:from-cyan-100 hover:to-cyan-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="MomayHMV1" class="w-12 h-12 object-contain" />
        <span class="font-thai">MomayHMV1</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('MomayGreedy')"
      class="neon-btn spline-link-card hover:from-lime-100 hover:to-lime-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="MomayGreedy" class="w-12 h-12 object-contain" />
        <span class="font-thai">MomayGreedy</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('MomayDP')"
      class="neon-btn spline-link-card hover:from-purple-100 hover:to-purple-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="MomayDP" class="w-12 h-12 object-contain" />
        <span class="font-thai">MomayDP</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('MomayModel')"
      class="neon-btn spline-link-card hover:from-indigo-100 hover:to-indigo-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="MomayModel" class="w-12 h-12 object-contain" />
        <span class="font-thai">MomayModel</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('MomayChamp')"
      class="neon-btn spline-link-card hover:from-amber-100 hover:to-amber-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Momayเต็งหนามคอฟฟี่" class="w-12 h-12 object-contain" />
        <span class="font-thai">Momayเต็งหนามคอฟฟี่</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('MomayHMModel')"
      class="neon-btn spline-link-card hover:from-sky-100 hover:to-sky-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="MomayHMModel" class="w-12 h-12 object-contain" />
        <span class="font-thai">MomayHMModel</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('MomayTopSoccer')"
      class="neon-btn spline-link-card hover:from-emerald-100 hover:to-emerald-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Momay_Top soccer club & P.R.G Car สุโขทัย" class="w-12 h-12 object-contain" />
        <span class="font-thai card-label-sm">Momay_Top soccer club &amp; P.R.G Car สุโขทัย</span>
      </div>
    </div>

    <div
      @click="openSplineDesign('MomayAnan')"
      class="neon-btn spline-link-card hover:from-emerald-100 hover:to-emerald-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="คุณอนัน" class="w-12 h-12 object-contain" />
        <span class="font-thai">คุณอนัน</span>
      </div>
    </div>
  </div>

  <!-- Flipbook Viewer using FlipbookVue Component -->

  <div class="pdf-download-bar">
    <a href="/Sale Kit Momay181125 .pdf" download class="pdf-download-btn">
      Download Document
    </a>
  </div>
</div>
</template>

<script setup lang="ts">
import FastCarousel from '~/components/FastCarousel.vue'
import MobileFlipbook from '~/components/MobileFlipbook.vue'
import PageFlipBook from '~/components/PageFlipBook.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

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
  MomayHMModel: '/momay/MomayHMModel',
  MomayTopSoccer: '/momay/MomayTopSoccer',
  MomayAnan: '/momay/MomayAnan'
}

const pages = [
  '/Sale%20Kit%20Momay181125%20_pages-to-jpg-0001.jpg',
  '/Sale%20Kit%20Momay181125%20_pages-to-jpg-0002.jpg',
  '/Sale%20Kit%20Momay181125%20_pages-to-jpg-0003.jpg',
  '/Sale%20Kit%20Momay181125%20_pages-to-jpg-0004.jpg',
  '/Sale%20Kit%20Momay181125%20_pages-to-jpg-0005.jpg',
  '/Sale%20Kit%20Momay181125%20_pages-to-jpg-0006.jpg',
  '/Sale%20Kit%20Momay181125%20_pages-to-jpg-0007.jpg',
]

const isMobile = ref(false)
function updateIsMobile() {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth <= 768
  }
}
onMounted(() => {
  updateIsMobile()
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateIsMobile)
  }

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
      window.removeEventListener('resize', updateIsMobile)
    }
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })
})

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
  if (url) navigateTo(url)
}
</script>

<style scoped>
.font-thai {
  font-family: 'Roboto', sans-serif;
}

/* Apple-style scroll reveal animation */
.scroll-reveal {
  opacity: 0;
  transform: translateY(60px);
  transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Running Text */
.running-text {
  background: linear-gradient(180deg, #f8f6f0 0%, #fff8e8 50%, #f5f0e5 100%);
  color: #000;
  border: 6px solid #74640a;
  border-radius: 9999px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 15px 20px;
  box-shadow: 1px 1px 0 #000, -8px 6px #3b3305, 0 0 20px rgba(255,230,160,0.55);
  text-shadow: 0 1px 0 rgba(255,255,255,0.4), 0 -1px 0 rgba(0,0,0,0.15), 0 0 6px rgba(255,230,160,0.55);
  overflow: hidden;
  position: relative;
  z-index: 50;
}


/* Marquee */
.marquee { 
  display: flex; 
  min-width: 300%; 
  animation: marquee 30s linear infinite; 
}

.marquee-content { 
  display: flex; 
  align-items: center; 
  margin-right: 2rem; 
}

.marquee span {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  padding: 0.5rem 2rem;
  background: linear-gradient(180deg, #f8f6f0 0%, #fff8e8 50%, #f5f0e5 100%);
  font-weight: 700;
  text-transform: uppercase;
  border: 2px solid #000;
  border-radius: 6px;
  box-shadow: 2px 2px 0 #000, -1px -1px 0 #000, 0 0 6px rgba(255,230,160,0.55);
  margin-right: 1rem;
}

@keyframes marquee { 
  0% { transform: translateX(0); } 
  100% { transform: translateX(-50%); } 
}

.spline-link-card {
  width: 200px;
  height: 70px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 12px;
}

@media (min-width: 640px) {
  .spline-link-card {
    width: 250px;
    height: 80px;
    padding: 0 20px;
  }
}

.spline-link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card-content {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  width: 100%;
  gap: 8px;
}

@media (min-width: 640px) {
  .card-content {
    padding: 0 12px;
    gap: 12px;
  }
}

.card-content span {
  font-weight: 600;
  font-size: 14px;
  flex-grow: 1;
}

@media (min-width: 640px) {
  .card-content span {
    font-size: 16px;
  }
}

/* Compact label for long card titles so they fit without overflowing */
.card-content span.card-label-sm {
  font-size: 11px;
  line-height: 1.15;
  white-space: normal;
  overflow-wrap: anywhere;
}

@media (min-width: 640px) {
  .card-content span.card-label-sm {
    font-size: 12px;
  }
}

.root-bg {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow-x: clip;
  background: transparent !important;
}

.root-bg::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: -1;
  background: radial-gradient(circle at 30% 40%, #ebd09e, #251f03);
  opacity: 0.6;
  animation: floatBg 30s linear infinite;
}

.root-bg::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: -1;
  background: linear-gradient(to bottom, #ebd09e 0%, #251f03 100%);
  opacity: 0.3;
  animation: floatBg 30s linear infinite;
}

@keyframes floatBg {
  0% { transform: translateY(0); }
  50% { transform: translateY(20px); }
  100% { transform: translateY(0); }
}

.neon-btn {
  background: linear-gradient(180deg, #f8f6f0 0%, #fffef8 45%, #fff8e8 55%, #f5f0e5 100%);
  color: #000000;
  border: 3px solid #74640a;
  border-radius: 12px;
  box-shadow: 1px 1px 0 #000, -6px 4px #3b3305, 0 0 16px rgba(255,230,160,0.45);
  font-weight: 700;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  transform: translateZ(0);
  transition: all 0.3s ease;
  z-index: 10;
}

/* ลดขนาด 70% สำหรับมือถือ */
@media (max-width: 768px) {
  .running-text {
    border-width: 3px;
    padding: 7px 10px;
    font-size: 0.7rem;
  }
  
  .marquee span {
    padding: 0.26rem 0.875rem;
    border-width: 1px;
    border-radius: 3px;
    font-size: 0.525rem;
    margin-right: 0.525rem;
  }
  
  .neon-btn {
    border-width: 2px;
    padding: 8.4px 19.6px;
    font-size: 0.7rem;
  }
  
  .whitespace-nowrap {
    white-space: nowrap !important;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/* Flipbook Styles */
.flipbook-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 60px;
  padding: 20px;
  overflow: visible;
  background: transparent !important;
}

.flipbook {
  width: 100%;
  max-width: 1200px;
  height: 900px;
  overflow: visible !important;
  /* removed all background colors - making completely transparent */
  background: transparent !important;
}

.flipbook :deep(.viewport) {
  width: 100% !important;
  height: 100% !important;
  overflow: visible !important;
  background: transparent !important;
}

.flipbook :deep(.bounding-box) {
  overflow: visible !important;
  background: transparent !important;
}

.flipbook :deep(canvas) {
  background: transparent !important;
}

.flipbook :deep(.stf__item),
.flipbook :deep(.stf__block),
.flipbook :deep(.stf__wrapper) {
  background: transparent !important;
}

.flipbook :deep(div) {
  background-color: transparent !important;
}

.flipbook :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

@media (max-width: 768px) {
  .flipbook {
    height: 400px;
    max-width: 600px;
  }
}

.action-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.page-counter {
  font-weight: 600;
  font-size: 18px;
  color: #f8f6f0;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .page-counter {
    font-size: 16px;
  }
}

.pdf-download-bar {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 100;
}

.pdf-download-btn {
  padding: 12px 28px;
  background: #f8f6f0;
  color: #251f03;
  border-radius: 24px;
  font-weight: 700;
  border: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
  font-size: 18px;
}

  .pdf-download-btn:hover {
    transform: scale(1.08) rotate(-2deg);
    box-shadow: 0 6px 24px rgba(255, 200, 80, 0.25);
    background: #ffe8a0;
    transition: transform 0.2s cubic-bezier(.4,2,.3,1), box-shadow 0.2s, background 0.2s;
  background: #ffe8a0;
}

@media (max-width: 768px) {
  .pdf-download-bar {
    right: 12px;
    bottom: 12px;
  }
  .pdf-download-btn {
    padding: 10px 18px;
    font-size: 15px;
  }
}
</style>
