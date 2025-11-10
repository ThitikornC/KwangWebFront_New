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

  <!-- Responsive container -->
<div class="px-[clamp(1rem,3vw,1.5rem)] max-w-[min(80rem,95vw)] mx-auto flex flex-col items-center">
  <h1 class="neon-btn text-[clamp(1.875rem,4vw,3rem)] font-bold text-pink-900 capitalize font-thai text-center rounded-xl py-[clamp(0.75rem,2vw,1rem)] px-[clamp(1.5rem,4vw,2.5rem)] w-full sm:w-auto">
    Momay
  </h1>

  <!-- Key Features -->
  <h2 class="neon-btn mt-[clamp(1.5rem,3vw,2rem)] font-bold text-pink-900 text-[clamp(1.25rem,2.5vw,1.875rem)] font-thai text-left rounded-xl py-[clamp(0.5rem,1.5vw,0.75rem)] px-[clamp(1.5rem,4vw,2.5rem)] self-start">
    Value
  </h2>

  <div class="mt-[clamp(1.5rem,3vw,2rem)] grid grid-cols-1 gap-[clamp(1rem,2vw,1.5rem)] font-thai w-full">
    <div class="neon-btn rounded-xl flex flex-col justify-center items-center py-[clamp(1rem,2.5vw,1.5rem)] px-[clamp(1rem,3vw,1.5rem)] shadow hover:shadow-lg transition-shadow">
      <p class="text-[clamp(0.875rem,1.5vw,1.125rem)] text-gray-600 font-normal leading-relaxed tracking-wide font-thai text-center md:text-justify break-words">
        แอพพริเคชั่นสำหรับผู้ใช้งานต้องการรักษาผลของตนเอง
      </p>
    </div>

    <div class="neon-btn rounded-xl flex flex-col justify-center items-center py-[clamp(1rem,2.5vw,1.5rem)] px-[clamp(1rem,3vw,1.5rem)] shadow hover:shadow-lg transition-shadow">
      <p class="text-[clamp(0.875rem,1.5vw,1.125rem)] text-gray-600 font-normal leading-relaxed tracking-wide font-thai text-center md:text-justify break-words">
        เป็นโมเดลและแพลตฟอร์มที่มอบคำตอบที่เป็นผลประโยชน์ของผู้ใช้ ก่อนผู้ใช้จะตั้งคำถามเสมอ
      </p>
    </div>

    <div class="neon-btn rounded-xl flex flex-col justify-center items-center py-[clamp(1rem,2.5vw,1.5rem)] px-[clamp(1rem,3vw,1.5rem)] shadow hover:shadow-lg transition-shadow">
      <p class="text-[clamp(0.875rem,1.5vw,1.125rem)] text-gray-600 font-normal leading-relaxed tracking-wide font-thai text-center md:text-justify break-words">
        Momay จะโน้มน้าวกลุ่มคนที่ตั้งคำถามและผู้หาคำตอบเพื่อรักษาผลประโยชน์ตัวเองให้มา
        ดูข้อมูลเพื่อเปรียบเทียบและกำหนดทิศทางที่ดีกว่าเดิมในทุกวัน
      </p>
    </div>
  </div>
</div>


  <!-- Diagram -->
  <div class="flex justify-center items-center mt-[clamp(1.5rem,3vw,2rem)] px-[clamp(1rem,3vw,2rem)]">
    <img src="/diagramSystem.png"
         alt="Diagram System"
         class="my-[clamp(0.5rem,1vw,1rem)] w-[min(100%,50rem)] h-auto rounded-lg shadow-lg" />
  </div>

  <!-- Momay UI Images - Responsive layout -->
  <div class="scroll-reveal mt-[clamp(2rem,4vw,3rem)] mx-auto flex flex-col md:flex-row gap-[clamp(0.5rem,2vw,1rem)] items-center justify-center px-[clamp(1rem,3vw,2rem)] max-w-[min(72rem,95vw)]">
    <img src="/Momay_UI/1.png" alt="Momay UI 1" @click="toggleDescription(0)" class="w-[min(100%,40%)] h-auto block cursor-pointer hover:opacity-90 transition-opacity rounded-lg shadow-md" />
    <div v-if="showDescription[0]" class="neon-btn p-[clamp(0.75rem,2vw,1rem)] rounded-xl font-thai text-gray-700 w-[min(100%,40%)] slide-in-right">
      <p class="text-[clamp(0.875rem,1.5vw,1rem)]">ข้อมูลพื้นฐาน และค่าไฟฟ้าแบบเรียลไทมม์</p>
    </div>
  </div>
  
  <div class="scroll-reveal -mt-[clamp(1.5rem,3vw,3rem)] mx-auto flex flex-col md:flex-row gap-[clamp(0.5rem,2vw,1rem)] items-center justify-center px-[clamp(1rem,3vw,2rem)] max-w-[min(72rem,95vw)]">
    <img src="/Momay_UI/2.png" alt="Momay UI 2" @click="toggleDescription(1)" class="w-[min(100%,40%)] h-auto block cursor-pointer hover:opacity-90 transition-opacity rounded-lg shadow-md" />
    <div v-if="showDescription[1]" class="neon-btn p-[clamp(0.75rem,2vw,1rem)] rounded-xl font-thai text-gray-700 w-[min(100%,40%)] slide-in-right">
      <p class="text-[clamp(0.875rem,1.5vw,1rem)]">หน้าแดชบอร์ดแสดงข้อมูลเรียลไทม์</p>
    </div>
  </div>
  
  <div class="scroll-reveal -mt-[clamp(1.5rem,3vw,3rem)] mx-auto flex flex-col md:flex-row gap-[clamp(0.5rem,2vw,1rem)] items-center justify-center px-[clamp(1rem,3vw,2rem)] max-w-[min(72rem,95vw)]">
    <img src="/Momay_UI/3.png" alt="Momay UI 3" @click="toggleDescription(2)" class="w-[min(100%,40%)] h-auto block cursor-pointer hover:opacity-90 transition-opacity rounded-lg shadow-md" />
    <div v-if="showDescription[2]" class="neon-btn p-[clamp(0.75rem,2vw,1rem)] rounded-xl font-thai text-gray-700 w-[min(100%,40%)] slide-in-right">
      <p class="text-[clamp(0.875rem,1.5vw,1rem)]">หน้ารายละเอียดข้อมูลการใช้พลังงานไฟฟ้าของแต่ละชั้น</p>
    </div>
  </div>
  
  <div class="scroll-reveal -mt-[clamp(1.5rem,3vw,3rem)] mx-auto flex flex-col md:flex-row gap-[clamp(0.5rem,2vw,1rem)] items-center justify-center px-[clamp(1rem,3vw,2rem)] max-w-[min(72rem,95vw)]">
    <img src="/Momay_UI/4.png" alt="Momay UI 4" @click="toggleDescription(3)" class="w-[min(100%,40%)] h-auto block cursor-pointer hover:opacity-90 transition-opacity rounded-lg shadow-md" />
    <div v-if="showDescription[3]" class="neon-btn p-[clamp(0.75rem,2vw,1rem)] rounded-xl font-thai text-gray-700 w-[min(100%,40%)] slide-in-right">
      <p class="text-[clamp(0.875rem,1.5vw,1rem)]">กราฟแบบเรียลไทมม์</p>
    </div>
  </div>
  
  <div class="scroll-reveal -mt-[clamp(1.5rem,3vw,3rem)] mx-auto flex flex-col md:flex-row gap-[clamp(0.5rem,2vw,1rem)] items-center justify-center px-[clamp(1rem,3vw,2rem)] max-w-[min(72rem,95vw)]">
    <img src="/Momay_UI/5.png" alt="Momay UI 5" @click="toggleDescription(4)" class="w-[min(100%,40%)] h-auto block cursor-pointer hover:opacity-90 transition-opacity rounded-lg shadow-md" />
    <div v-if="showDescription[4]" class="neon-btn p-[clamp(0.75rem,2vw,1rem)] rounded-xl font-thai text-gray-700 w-[min(100%,40%)] slide-in-right">
      <p class="text-[clamp(0.875rem,1.5vw,1rem)]">หน้ารายงานและสถิติรายเดือน</p>
    </div>
  </div>
  
  <div class="scroll-reveal -mt-[clamp(1.5rem,3vw,3rem)] mx-auto flex flex-col md:flex-row gap-[clamp(0.5rem,2vw,1rem)] items-center justify-center px-[clamp(1rem,3vw,2rem)] max-w-[min(72rem,95vw)]">
    <img src="/Momay_UI/6.png" alt="Momay UI 6" @click="toggleDescription(5)" class="w-[min(100%,40%)] h-auto block cursor-pointer hover:opacity-90 transition-opacity rounded-lg shadow-md" />
    <div v-if="showDescription[5]" class="neon-btn p-[clamp(0.75rem,2vw,1rem)] rounded-xl font-thai text-gray-700 w-[min(100%,40%)] slide-in-right">
      <p class="text-[clamp(0.875rem,1.5vw,1rem)]">คำนวนและวิเคราห์การติดตั้งระบบโซล่าเซลล์และการช่วยประหยัดค่าไฟ</p>
    </div>
  </div>
  
  <div class="scroll-reveal -mt-[clamp(1.5rem,3vw,3rem)] mx-auto flex flex-col md:flex-row gap-[clamp(0.5rem,2vw,1rem)] items-center justify-center px-[clamp(1rem,3vw,2rem)] max-w-[min(72rem,95vw)]">
    <img src="/Momay_UI/7.png" alt="Momay UI 7" @click="toggleDescription(6)" class="w-[min(100%,40%)] h-auto block cursor-pointer hover:opacity-90 transition-opacity rounded-lg shadow-md" />
    <div v-if="showDescription[6]" class="neon-btn p-[clamp(0.75rem,2vw,1rem)] rounded-xl font-thai text-gray-700 w-[min(100%,40%)] slide-in-right">
      <p class="text-[clamp(0.875rem,1.5vw,1rem)]">แจ้งเตือนเมื่อมีการใช้ไฟฟ้ามากขึ้น</p>
    </div>
  </div>
  
  <div class="scroll-reveal -mt-[clamp(1.5rem,3vw,3rem)] mx-auto flex flex-col md:flex-row gap-[clamp(0.5rem,2vw,1rem)] items-center justify-center px-[clamp(1rem,3vw,2rem)] max-w-[min(72rem,95vw)]">
    <img src="/Momay_UI/8.png" alt="Momay UI 8" @click="toggleDescription(7)" class="w-[min(100%,40%)] h-auto block cursor-pointer hover:opacity-90 transition-opacity rounded-lg shadow-md" />
    <div v-if="showDescription[7]" class="neon-btn p-[clamp(0.75rem,2vw,1rem)] rounded-xl font-thai text-gray-700 w-[min(100%,40%)] slide-in-right">
      <p class="text-[clamp(0.875rem,1.5vw,1rem)]">สรุปค่าไฟฟ้าและเปรียบเทียบ</p>
    </div>
  </div>

  <!-- Spline Cards - Responsive -->
  <div class="flex gap-3 sm:gap-4 flex-wrap justify-center mt-8 sm:mt-10 px-4 max-w-6xl mx-auto">
    <div
      @click="openSplineDesign('momay_BanKlongResort')"
      class="neon-btn spline-link-card hover:from-pink-100 hover:to-pink-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Momay" class="w-8 h-8 sm:w-12 sm:h-12 object-contain" />
        <span class="font-thai">Noen Maprang Hospital</span>
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
      @click="openSplineDesign('hospital_Noenmaprang')"
      class="neon-btn spline-link-card hover:from-pink-100 hover:to-pink-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Momay" class="w-12 h-12 object-contain" />
        <span class="font-thai">Hospital Noenmaprang</span>
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
      @click="openSplineDesign('momay2')"
      class="neon-btn spline-link-card hover:from-pink-100 hover:to-pink-300"
    >
      <div class="card-content">
        <img src="/MOMAY_logo.png" alt="Momay" class="w-12 h-12 object-contain" />
        <span class="font-thai">Momay 2</span>
      </div>
    </div>
  </div>
</div>


</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

// State for toggling descriptions
const showDescription = ref([false, false, false, false, false, false, false, false])

// Toggle description visibility
function toggleDescription(index: number) {
  showDescription.value[index] = !showDescription.value[index]
}

const splineLinks = {
  momay_BanKlongResort: 'https://momayretro-production.up.railway.app/',
  wongpanit_sukhothai: '/momay/wongpanit_sukhothai',
  hospital_Noenmaprang: '/momay/hospital_Noenmaprang',
  clinic: '/momay/clinic',
  momay2:'/momay/momay02'
}

// Scroll animation observer - Apple style
let observer: IntersectionObserver | null = null;

onMounted(() => {
  // Reset all scroll-reveal elements
  const scrollElements = document.querySelectorAll('.scroll-reveal');
  scrollElements.forEach(el => {
    el.classList.remove('is-visible');
  });

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
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
})

function openSplineDesign(key: keyof typeof splineLinks) {
  const password = prompt("กรุณาใส่รหัสผ่านเพื่อเข้าถึง")

  // ถ้าเป็น hospital ให้ตรวจรหัสเฉพาะ
  if (key === 'hospital_Noenmaprang') {
    if (password !== '1125711257') {
      alert("รหัสสำหรับโรงพยาบาลไม่ถูกต้อง ❌")
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
  if (url) window.open(url, '_blank')
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

/* Slide-in animation from right for descriptions */
.slide-in-right {
  animation: slideInRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
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

.running-text-container { 
  justify-content: center;
  padding-left: 0px; 
  padding-right: 0; 
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
.root-bg {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(to bottom, #ebd09e 0%, #251f03 100%);
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
  border: 3px solid #74640a; /* ลดความหนาขอบลง */
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
  
  /* ป้องกัน text wrap */
  .whitespace-nowrap {
    white-space: nowrap !important;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

</style>
