<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-green-200 p-8">
    <header class="flex justify-between items-center mb-8">
      
      <a href="/" class="text-xl font-bold text-green-800">
        <img
        src="/kwang_logo2.png"
        alt="Espresso"
        class="w-14 h-14 object-contain mb-2"
      />
      </a>
       
    </header>

<div class="flex gap-4">

  <!-- กล่องที่ 1: Espresso -->
  <router-link
    to="/renewablesort/espresso"
    class="circle-link bg-gradient-to-br from-pink-50 to-pink-200 hover:from-pink-100 hover:to-pink-300 
            w-20 h-20 rounded-xl shadow-lg flex flex-col justify-center items-center p-4 border border-pink-300"
  >
    <div class="circle-content">
      <img
        src="/ESPRESSO_logo.png"
        alt="Espresso"
        class="w-14 h-14 object-contain mb-2"
      />
      <span class="text-sm font-thai text-center"></span>
    </div>
  </router-link>

  <!-- กล่องที่ 2: Momay -->
  <router-link
    to="/renewablesort/momay"
    class="circle-link bg-gradient-to-br from-pink-50 to-pink-200 hover:from-pink-100 hover:to-pink-300 
            w-20 h-20 rounded-xl shadow-lg flex flex-col justify-center items-center p-4 border border-pink-300"
  >
    <div class="circle-content">
      <img
        src="/MOMAY_logo.png"
        alt="Momay"
        class="w-14 h-14 object-contain mb-2"
      />
      <span class="text-sm font-thai text-center"></span>
    </div>
  </router-link>

</div>


    <div class="max-w-5xl mx-auto">
      <h1 class="text-4xl font-bold text-green-900 mb-4 font-thai">Collaborative Sensing</h1>
      <p class="text-lg text-gray-700 mb-4 font-thai">
        Collaborative sensing คือกระบวนการที่นำอุปกรณ์หลายตัวหรือหลายระบบทำงานร่วมกัน
        เพื่อ<strong>ตรวจจับ รวบรวม และประมวลผลข้อมูล</strong>จากสภาพแวดล้อมโดยรอบ
        เพื่อให้ได้ข้อมูลที่แม่นยำและครอบคลุมยิ่งขึ้น
      </p>

      <ul class="list-disc list-inside mb-4 text-lg text-gray-700 font-thai">
        <li>Energy</li>
        <li>Camera CCTV</li>
        <li>EV Charger</li>
        <li>Access Control</li>
      </ul>

      <p class="text-lg text-gray-700 mb-6 font-thai">
        และส่งข้อมูลเพื่อแสดงผลบนระบบที่ถูกพัฒนาขึ้นมา <strong>Data is your</strong>
        เพื่อให้ผู้ใช้สามารถเข้าถึงและวิเคราะห์ข้อมูลได้อย่างมีประสิทธิภาพ
      </p>

      <!-- <img
        src="/public/qrcode.png"
        alt="Diagram System"
        class="w-2/3 h-auto rounded-lg shadow-lg mb-6 cursor-pointer"
        @click="openImageModal('/public/qrcode.png')"
      /> -->

      

      <div class="flex gap-4 flex-wrap">
        <div
          @click="openSplineDesign('Presentation')"
          class="spline-link-card bg-gradient-to-br from-green-50 to-green-200 hover:from-green-100 hover:to-green-300"
        >
          <div class="card-content">
            <img
              src="/datacityplatform.png"
              alt="figma data is your"
              class="w-12 h-12 object-contain"
            />
            <span class="font-thai">Presentation</span>
            <div class="card-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>
        
        <div
          @click="openSplineDesign('Collaborativesensing')"
          class="spline-link-card bg-gradient-to-br from-green-50 to-green-200 hover:from-green-100 hover:to-green-300"
        >
          <div class="card-content">
            <img
              src="/datacityplatform.png"
              alt="figma data is your"
              class="w-12 h-12 object-contain"
            />
            <span class="font-thai">Collaborative sensing</span>
            <div class="card-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="showImageModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click.self="closeImageModal"
      >
        <div class="relative">
          <button
            class="absolute right-2 text-white text-2xl font-bold"
            @click="closeImageModal"
          >&times;</button>
          <img
            :src="modalImageSrc"
            class="max-w-full max-h-[90vh] rounded-lg shadow-lg"
            alt="Enlarged Diagram"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showImageModal = ref(false)
const modalImageSrc = ref('')

function openImageModal(src: string) {
  modalImageSrc.value = src
  showImageModal.value = true
}

function closeImageModal() {
  showImageModal.value = false
}

// ✅ กำหนดลิงก์ที่ต้องการเปิด
const links: Record<string, string> = {
  Collaborativesensing: 'https://www.kwangunlimit.com/cs',
  Presentation:'https://my.spline.design/gbuildingcopy-IkEUVsUF6jDjYMQXbQSS3pFb/'
}

// ✅ ระบบใส่รหัสผ่านก่อนเข้าถึงลิงก์
function openSplineDesign(key: keyof typeof links) {
 

  const password = prompt("กรุณาใส่รหัสผ่านเพื่อเข้าถึง Collaborative Sensing:")
  if (password !== '240124') {
    alert("รหัสผ่านไม่ถูกต้อง ❌")
    return
  }

  const url = links[key]
  if (url) window.open(url, '_blank')
}
</script>

<style scoped>
.spline-link-card {
  width: 250px;
  height: 80px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.spline-link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card-content {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

.card-content span {
  margin-left: 12px;
  font-weight: 600;
  font-size: 16px;
  flex-grow: 1;
}

.card-arrow {
  color: #4b5563;
  opacity: 0.7;
  transition: transform 0.3s ease;
}

.spline-link-card:hover .card-arrow {
  transform: translateX(5px);
  opacity: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
