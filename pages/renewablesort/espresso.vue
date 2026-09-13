
<template>
  <div class="root-bg p-8 min-h-screen">
    <div class="scroll-reveal flex justify-center flex-1 px-[clamp(1rem,3vw,1.5rem)] mt-[clamp(4rem,10vw,5.625rem)] mb-[clamp(2rem,4vw,3rem)]">
      <div class="running-text w-full max-w-[min(1200px,95vw)] overflow-hidden relative text-[clamp(0.875rem,1.5vw,1.25rem)] whitespace-nowrap">
        <div class="marquee">
          <div class="marquee-content">
            <span>Espresso Platform</span>
            <span>Real-time Data Integration</span>
            <span>Smart Classroom</span>
          </div>
          <div class="marquee-content">
            <span>Espresso Platform</span>
            <span>Real-time Data Integration</span>
            <span>Smart Classroom</span>
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
      <div class="ebook-badge" role="button" tabindex="0">
        <div @click="openTestProject" class="neon-btn spline-link-card hover:from-yellow-100 hover:to-yellow-300">
          <div class="card-content">
            <img src="/ESPRESSO_logo.png" alt="ทดลองใช้งาน" class="w-8 h-8 object-contain" />
            <span class="font-thai text-xs">ทดลองใช้งานฟรี</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex gap-3 sm:gap-4 flex-wrap justify-center mt-8 sm:mt-10 px-4 max-w-6xl mx-auto">
      <!-- existing project cards removed (moved to fixed download bar) -->
    </div>

    <div class="pdf-download-bar">
      <div @click="openSplineDesign('espresso_Huaroa_page')" class="pdf-download-btn" role="button" tabindex="0">
        <span class="font-thai">บัญชีผู้ใช้งาน</span>
      </div>
      <a href="/Sale Kit Espresso251125.pdf" download class="pdf-download-btn">
        Download Document
      </a>
    </div>

    <!-- Trial Modal -->
    <teleport to="body">
      <div v-if="showTrialModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]" @click.self="showTrialModal = false">
        <div class="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl transform transition-all">
          <h3 class="text-2xl font-bold mb-4 text-gray-800 font-thai">ลงทะเบียนทดลองใช้งานฟรี</h3>
          <form @submit.prevent="submitTrialForm" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล</label>
              <input v-model="trialForm.name" required class="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition" placeholder="กรอกชื่อ-นามสกุล" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
              <input v-model="trialForm.phone" type="tel" required class="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition" placeholder="08x-xxx-xxxx" />
            </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">ประเภทผู้ใช้งาน</label>
                <select v-model="trialForm.type" required class="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition">
                  <option value="" disabled>เลือกประเภทผู้ใช้งาน</option>
                  <option value="1">หน่วยงานราชการ</option>
                  <option value="2">บริษัทเอกชน</option>
                  <option value="3">ลูกค้าทั่วไป</option>
                </select>
              </div>
            <div class="flex justify-end gap-3 pt-4">
              <button type="button" @click="showTrialModal = false" class="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition font-medium">ยกเลิก</button>
              <button type="submit" :disabled="isSubmittingTrial || !trialForm.type" class="px-8 py-2.5 bg-gradient-to-r from-[#74640a] to-[#9e8c1a] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                <span v-if="isSubmittingTrial" class="animate-spin">⏳</span>
                {{ isSubmittingTrial ? 'กำลังส่งข้อมูล...' : '✨ ยืนยันการลงทะเบียน' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </teleport>
  </div>
</template>


<script setup lang="ts">
import MobileFlipbook from '~/components/MobileFlipbook.vue'
import PageFlipBook from '~/components/PageFlipBook.vue'
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

const splineLinks = {
  espresso_pharmacy: 'https://espresso-pharmacy.example.com/',
  espresso_human: 'https://espresso-human.example.com/',
  espresso_Huaroa_page: '/renewablesort/Client'
}

// ทดลองใช้งาน (Magazine) project link
const testProjectUrl = 'https://magazine-espresso-demo.example.com/';

const showTrialModal = ref(false);
const trialForm = reactive({
  name: '',
  phone: '',
  type: ''
});
const isSubmittingTrial = ref(false);

// ทดลองใช้งาน (Magazine) project card handler
function openTestProject() {
  showTrialModal.value = true;
}

async function submitTrialForm() {
  isSubmittingTrial.value = true;
  try {
    await $fetch('/api/lead', {
      method: 'POST',
      body: trialForm
    });
    
    alert('ส่งข้อมูลเรียบร้อยแล้ว! เจ้าหน้าที่จะติดต่อกลับเพื่อยืนยันการเปิดใช้งาน');
    showTrialModal.value = false;
    // Reset form
    Object.assign(trialForm, { name: '', phone: '' });
  } catch (e: any) {
    console.error(e);
    alert('เกิดข้อผิดพลาด: ' + (e.data?.statusMessage || 'ไม่สามารถส่งข้อมูลได้'));
  } finally {
    isSubmittingTrial.value = false;
  }
}

const pages = [
  '/5.png',
  '/6.png',
  '/7.png',
  '/8.png',
  '/9.png',
  '/10.png',
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

  let observer: IntersectionObserver | null = null
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

function openSplineDesign(key: keyof typeof splineLinks) {
  const url = splineLinks[key]
  if (!url) return
  // Same-tab navigation so the browser Back button works
  if (/^https?:\/\//i.test(url)) navigateTo(url, { external: true })
  else navigateTo(url)
}


</script>


<style scoped>
/* ใช้ style เดียวกับหน้า momay.vue */
.font-thai {
  font-family: 'Roboto', sans-serif;
}
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
.flipbook-container {
  position: relative; /* make absolute children position relative to this container */
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

.ebook-badge {
  position: absolute;
  right: 40px;
  bottom: 40px;
  z-index: 120;
}
/* keep the trial badge compact (smaller than the default spline card) */
.ebook-badge .spline-link-card { width: 190px; height: 54px; padding: 0 12px; }
.ebook-badge .card-content { padding: 0 6px; gap: 8px; }
.ebook-badge .card-content img { width: 28px; height: 28px; }
.ebook-badge .card-content span { font-size: 13px; }

@media (max-width: 768px) {
  .ebook-badge { right: 16px; bottom: 56px; }
  .ebook-badge .spline-link-card { width: 180px; height: 56px; padding: 0 12px; }
  .ebook-badge .card-content img { width: 32px; height: 32px; }
  .ebook-badge .card-content span { font-size: 13px; }
}
.flipbook {
  width: 100%;
  max-width: 1200px;
  height: 900px;
  overflow: visible !important;
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
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
}
.pdf-download-btn {
  padding: 10px 18px;
  width: 320px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #f8f6f0;
  color: #251f03;
  border-radius: 24px;
  font-weight: 700;
  border: none;
  box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s;
  text-decoration: none;
  font-size: 16px;
}
  .pdf-download-btn:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 24px rgba(0,0,0,0.14);
    background: #ffe8a0;
}

/* Project cards styled like download button */
.project-download-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 320px;
  padding: 10px 18px;
  background: #f8f6f0;
  color: #251f03;
  border-radius: 24px;
  font-weight: 700;
  border: none;
  box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s;
}
.project-download-btn:hover { transform: translateY(-4px); box-shadow: 0 10px 24px rgba(0,0,0,0.14); }
.project-download-btn .card-content { padding: 0; width: 100%; }
.project-download-btn img { width: 40px; height: 40px; }

@media (max-width: 768px) {
  .pdf-download-bar {
    /* center the stacked buttons on small screens */
    left: 50%;
    right: auto;
    bottom: 12px;
    transform: translateX(-50%);
    align-items: center;
  }
  .pdf-download-btn,
  .project-download-btn {
    /* keep buttons a comfortable width on mobile */
    width: min(320px, 92vw);
    padding: 10px 18px;
    font-size: 15px;
  }
}
</style>