<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead, useSeoMeta } from '#imports'

// Head & SEO
useHead({
  title: 'Kwang Unlimit',
  script: [
    { innerHTML: `console.log('Welcome To New ERA! Kwang Unlimit LTD.')` }
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap'
    }
  ]
})
useSeoMeta({
  title: 'Kwang Unlimit',
  ogTitle: 'Kwang Unlimit',
  description: 'Welcome to New ERA ! Kwang unlimit',
  ogDescription: 'Welcome to New ERA ! Kwang unlimit',
  ogImage: '/kwang_logo2.png'
})

// State
const hoveredLogo = ref<string|null>(null)
const selectedLogo = ref<string|null>(null)
const swapAnimation = ref<boolean>(false)
const isAnimating = ref<boolean>(false)

// External links for spline designs
const splineLinks = {
  espresso_pharmacy: 'https://my.spline.design/espresopharmacy-a21edee004531a425af1c2768331add8/',
  espresso_human: 'https://my.spline.design/espresohumen-dde33c067dcf5aa8cf10d9d16cfe66b2/',
  momay_BanKlongResort: 'https://momaysukhothai.web.app/',
  wongpanit_sukhothai:  'https://wongpanit-sukhothai.web.app/',
  Collaborativesensing:'https://kwangdataisyourspace.space/'
}

// Dynamic background color
const bgCenterColor = computed(() => {
  if (!selectedLogo.value) {
    if (hoveredLogo.value === 'espresso') return '#FED7AA'
    if (hoveredLogo.value === 'momay')    return '#FBCFE8'
    if (hoveredLogo.value === 'Collaborativesensing')    return '#f69988'
    return '#dbeafe'
  }
  return selectedLogo.value === 'espresso' ? '#FED7AA' : '#e84e40'
})

// Target logo (for swap animation)
const targetLogo = ref<string|null>(null)

// Handle logo swap with animation
const swapLogo = (newLogo: string) => {
  if (selectedLogo.value === newLogo || isAnimating.value) return
  isAnimating.value = true
  swapAnimation.value = true
  targetLogo.value = newLogo
  setTimeout(() => {
    selectedLogo.value = newLogo
    swapAnimation.value = false
    isAnimating.value = false 
  }, 700)
}

// Open spline design in new tab
const openSplineDesign = (key: keyof typeof splineLinks) => {
  const url = splineLinks[key]
  if (url) {
    window.open(url, '_blank')
  } else {
    console.warn(`No spline link found for “${key}”`)
  }
}

const navigateTo = useRouter().push



// function showImage
const showImageModal = ref(false)
const modalImageSrc  = ref('')

function openImageModal(src: string) {
  modalImageSrc.value = src
  showImageModal.value = true
}

function closeImageModal() {
  showImageModal.value = false
}

</script>

<template>
  <div class="root-bg flex flex-col">
    <!-- Top nav -->
    <!-- Main logo -->
    <!-- Interactive area -->
    <div class="flex-1 flex flex-col md:flex-row items-center justify-center
            px-4 md:px-20 relative overflow-hidden">

      <!-- Step 1: show both logos sliding out/in with Spline links below -->
      <transition name="slide-dual" mode="out-in">
        <div v-if="!selectedLogo" key="dual" class="flex flex-col items-center">
          <div class="flex flex-col sm:flex-row items-center space-y-8 sm:space-y-0 sm:space-x-12 md:space-x-16">
            <!-- Espresso -->
            <div
              @mouseenter="hoveredLogo = 'espresso'"
              @mouseleave="hoveredLogo = null"
              @click="navigateTo('/renewablesort/espresso')"
               class="relative 
            bg-gradient-to-b from-[#fffef8] via-[#e5e5e4] to-[#edeceb]
            rounded-full p-4 sm:p-6
            border-8 border-[#9b7c3c]
            flex justify-center items-center
            transform transition-transform duration-500 hover:scale-110 cursor-pointer"
     style="box-shadow: 3px 3px 10px #000, -14px 3px #3b3305, 0 0 20px rgba(255,230,160,0.55);">
              <img
                src="/ESPRESSO_logo.png"
                alt="Espresso Logo"
                class="w-24 h-24 sm:w-48 sm:h-48 md:w-64 md:h-64 object-contain"
              />
              <transition-group name="dot" tag="template">
                <div
                  v-if="hoveredLogo==='espresso'"
                  key="e-top"
                  class="dot dot-top bg-red-300"
                />
                <div
                  v-if="hoveredLogo==='espresso'"
                  key="e-right"
                  class="dot dot-right bg-red-300"
                />
                <div
                  v-if="hoveredLogo==='espresso'"
                  key="e-bottom"
                  class="dot dot-bottom bg-red-300"
                />
                <div
                  v-if="hoveredLogo==='espresso'"
                  key="e-left"
                  class="dot dot-left bg-red-300"
                />
              </transition-group>
            </div>

            <!-- Momay -->
            <div
              @mouseenter="hoveredLogo = 'momay'"
              @mouseleave="hoveredLogo = null"
              @click="navigateTo('/renewablesort/momay')"
               class="relative 
            bg-gradient-to-b from-[#fffef8] via-[#e5e5e4] to-[#edeceb]
            rounded-full p-4 sm:p-6
            border-8 border-[#9b7c3c]
            flex justify-center items-center
            transform transition-transform duration-500 hover:scale-110 cursor-pointer"
     style="box-shadow: 3px 3px 10px #000, -14px 3px #3b3305, 0 0 20px rgba(255,230,160,0.55);">
              <img
                src="/MOMAY_logo.png"
                alt="Momay Logo"
                class="w-24 h-24 sm:w-48 sm:h-48 md:w-64 md:h-64 object-contain"
              />
              <transition-group name="dot" tag="template">
                <div
                  v-if="hoveredLogo==='momay'"
                  key="m-top"
                  class="dot dot-top bg-pink-300"
                />
                <div
                  v-if="hoveredLogo==='momay'"
                  key="m-right"
                  class="dot dot-right bg-pink-300"
                />
                <div
                  v-if="hoveredLogo==='momay'"
                  key="m-bottom"
                  class="dot dot-bottom bg-pink-300"
                />
                <div
                  v-if="hoveredLogo==='momay'"
                  key="m-left"
                  class="dot dot-left bg-pink-300"
                />
              </transition-group>
            </div>
            <!-- Collaborativesensing -->
            <div
              @mouseenter="hoveredLogo = 'Collaborativesensing'"
              @mouseleave="hoveredLogo = null"
              @click="navigateTo('/renewablesort/collaborativesensing')"
               class="relative 
            bg-gradient-to-b from-[#fffef8] via-[#e5e5e4] to-[#edeceb]
            rounded-full p-4 sm:p-6
            border-8 border-[#9b7c3c]
            flex justify-center items-center
            transform transition-transform duration-500 hover:scale-110 cursor-pointer"
     style="box-shadow: 3px 3px 10px #000, -14px 3px #3b3305, 0 0 20px rgba(255,230,160,0.55);">
              <img
                src=" /datacityplatform.png"
                alt="Collaborative sensing Logo"
                class="w-24 h-24 sm:w-48 sm:h-48 md:w-64 md:h-64 object-contain"
              />
              <transition-group name="dot" tag="template">
                <div
                  v-if="hoveredLogo==='Collaborativesensing '"
                  key="m-top"
                  class="dot dot-top bg-red-300"
                />
                <div
                  v-if="hoveredLogo==='Collaborativesensing '"
                  key="m-right"
                  class="dot dot-right bg-red-300"
                />
                <div
                  v-if="hoveredLogo==='Collaborativesensing '"
                  key="m-bottom"
                  class="dot dot-bottom bg-red-300"
                />
                <div
                  v-if="hoveredLogo==='Collaborativesensing '"
                  key="m-left"
                  class="dot dot-left bg-red-300"
                />
              </transition-group>
            </div>
          </div>

          
          
          
          <!-- Spline Design Links Row -->
          <div class="mt-16 flex flex-wrap gap-8 justify-center">
           

            
            

          </div>
        </div>
        
      </transition>

      <!-- Step 2: show single logo + content panel  -->
      <div
        v-if="selectedLogo"
        :key="selectedLogo"
        
        class="absolute inset-0 flex justify-center px-4 sm:px-8 md:px-20"
      >
      
        <div class="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-y-0 gap-x-6 md:gap-x-8
            w-full mt-6 px-4 md:px-0">
          <!-- Left column: big logo + swap thumbnail -->
          <div class="flex justify-center md:mt-12 2xl:mt-0">
            <div class="relative">
              <!-- Main Logo Container -->
              <div
                @click="selectedLogo = null"
                class="logo-container bg-white rounded-full p-6 shadow-lg border-4 border-white
                       flex items-center justify-center
                       transform transition-transform duration-500 hover:scale-110 cursor-pointer"
              >
                <!-- Main Logo (when not animating) -->
                <transition name="logo-fade" mode="out-in">
                  <img
                    v-if="!swapAnimation"
                    :key="selectedLogo"
                    :src="selectedLogo==='espresso' ? '/ESPRESSO_logo.png' : selectedLogo==='momay' ? '/MOMAY_logo.png' : '/datacityplatform.png'"
                    :alt="selectedLogo + ' Logo'"
                    class="w-64 h-64 object-contain z-10"
                  />
                </transition>
                
                <!-- Animation Container - Moving from main to thumb -->
                <div v-if="swapAnimation" class="animation-container">
                  <!-- Current Logo (animating out) -->
                  <img
                    :src="selectedLogo==='espresso' ? '/ESPRESSO_logo.png' : selectedLogo==='momay' ? '/MOMAY_logo.png' : '/datacityplatform.png'"

                    :alt="selectedLogo + ' Logo'"
                    class="main-logo-out w-64 h-64 object-contain"
                  />
                </div>
                
                <!-- Animation Container - Moving from thumb to main -->
                <div v-if="swapAnimation" class="animation-container">
                  <!-- New Logo (animating in) -->
                  <img
                    :src="selectedLogo==='espresso' ? '/ESPRESSO_logo.png' : selectedLogo==='momay' ? '/MOMAY_logo.png' : '/datacityplatform.png'"

                    :alt="targetLogo + ' Logo'"
                    class="thumb-logo-in w-64 h-64 object-contain"
                  />
                </div>

                
              </div>
              
              <!-- Swap thumbnails container -->
              <div class="absolute -left-24 top-1/2 transform -translate-y-1/2">

                <!-- Espresso thumbnail -->
                <div 
                  v-if="selectedLogo !== 'espresso' && !swapAnimation"
                  @click="swapLogo('espresso')"
                  class="relative mb-6"
                >
                  <div class="logo-thumbnail">
                    <img
                      src="/ESPRESSO_logo.png"
                      alt="Go to Espresso"
                      class="w-16 h-16 rounded-full border-2 border-white shadow cursor-pointer"
                    />
                  </div>
                  <div class="absolute -right-2 -top-2 flex h-4 w-4">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-4 w-4 bg-red-400"></span>
                  </div>
                </div>

                <div 
                  v-if="selectedLogo !== 'Collaborativesensing' && !swapAnimation"
                  @click="swapLogo('Collaborativesensing')"
                  class="relative mb-6"
                >
                  <div class="logo-thumbnail">
                    <img
                      src="/datacityplatform.png"
                      alt="Go to datacityplatform"
                      class="w-16 h-16 rounded-full border-2 border-white shadow cursor-pointer"
                    />
                  </div>
                  <div class="absolute -right-2 -top-2 flex h-4 w-4">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-4 w-4 bg-red-400"></span>
                  </div>
                </div>
                
                <!-- Momay thumbnail -->
                <div 
                  v-if="selectedLogo !== 'momay' && !swapAnimation"
                  @click="swapLogo('momay')"
                  class="relative"
                >
                  <div class="logo-thumbnail">
                    <img
                      src="/MOMAY_logo.png"
                      alt="Go to Momay"
                      class="w-16 h-16 rounded-full border-2 border-white shadow cursor-pointer"
                    />
                  </div>
                  <div class="absolute -right-2 -top-2 flex h-4 w-4">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-300 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-4 w-4 bg-pink-400"></span>
                  </div>
                   <!-- collabrative thumbnail -->
                
                </div>
              </div>
                <!-- Animation for logo going to thumbnail position -->
                <div v-if="swapAnimation" class="thumbnail-animation-container">
                  <div class="thumb-position">
                    <img
                      :src="selectedLogo==='espresso' ? '/ESPRESSO_logo.png' : selectedLogo==='momay' ? '/MOMAY_logo.png' : '/datacityplatform.png'"

                      :alt="selectedLogo + ' Logo'"
                      class="logo-to-thumb w-16 h-16 rounded-full border-2 border-white shadow"
                    />
                  </div>
                </div>
                
                <!-- Animation for logo coming from thumbnail position -->
                <div v-if="swapAnimation" class="thumbnail-animation-container">
                  <div class="thumb-position">
                    <img
                      :src="selectedLogo==='espresso' ? '/ESPRESSO_logo.png' : selectedLogo==='momay' ? '/MOMAY_logo.png' : '/datacityplatform.png'"

                      :alt="targetLogo + ' Logo'"
                      class="thumb-disappear w-16 h-16 rounded-full border-2 border-white shadow"
                    />
                  </div>
                </div>
              </div>
                          <!-- ปุ่มย้อนกลับ แบบวงกลม -->
              <div class="absolute top-10 left-1 ">
                <button
                  @click="selectedLogo = null"
                  class="bg-white hover:bg-pink-100 rounded-full p-3 shadow-lg
                        transition-transform duration-200 hover:scale-500 focus:outline-none"
                  title="ย้อนกลับ"
                >
                  <svg xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6 text-gray-600"
                      fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Right column: content panel -->
          <div class="overflow-auto mt-12 md:mt-0">
            <h1 class="text-4xl font-bold text-red-900 capitalize ml-4 font-thai">{{ selectedLogo }}</h1>
            
            <!-- Espresso content -->
            <div v-if="selectedLogo==='espresso'">
              <p class="mt-4 text-lg leading-relaxed indent-8 whitespace-pre-line font-thai">
                ระบบบริหารจัดการพลังงานอัจฉริยะ ติดตามและควบคุมการใช้ไฟฟ้าได้อย่างมีประสิทธิภาพ
                Espresso ช่วยให้คุณเห็นและวิเคราะห์การใช้พลังงานแบบเรียลไทม์
                เพื่อให้คุณสามารถตรวจสอบและแก้ไขปัญหาได้ทันที
              </p>
              <h2
                class="
                mt-8
                ml-4
                font-bold text-red-900
                text-3xl
                text-center md:text-left font-thai
                "
            >
                  Key Features
              </h2>

              <div
                class="
                  mt-6
                  grid
                    grid-cols-1      /* มือถือ: 1 คอลัมน์ */
                    md:grid-cols-2   /* ≥768px (iPad ขึ้นไป): 2 คอลัมน์ */
                  gap-6
                  font-thai
                "
              >
                <!-- Card 1 -->
                <div class="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
                  <h3 class="text-lg font-semibold mb-2">Real-time Monitoring</h3>
                  <p class="text-gray-600 leading-relaxed">
                    เฝ้าติดตามพลังงานแบบเรียลไทม์ ตั้งแต่ภาพรวมอาคารจนถึงแต่ละห้อง
                  </p>
                </div>

                <!-- Card 2 -->
                <div class="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
                  <h3 class="text-lg font-semibold mb-2">Insight Analytics</h3>
                  <p class="text-gray-600 leading-relaxed">
                    วิเคราะห์ข้อมูลเชิงลึก พร้อมรายงานรายวัน รายเดือน และรายปี
                  </p>
                </div>

                <!-- Card 3 -->
                <div class="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
                  <h3 class="text-lg font-semibold mb-2">Auto-Reporting</h3>
                  <p class="text-gray-600 leading-relaxed">
                    สร้างรายงานอัตโนมัติ ส่งออกเป็น PDF หรือ CSV ได้ทันที
                  </p>
                </div>

                <!-- Card 4 -->
                <div class="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
                  <h3 class="text-lg font-semibold mb-2">Web Access</h3>
                  <p class="text-gray-600 leading-relaxed">
                    เข้าถึงระบบออนไลน์ได้ทุกที่ ทุกเวลา ผ่านเว็บเบราว์เซอร์
                  </p>
                </div>
              </div>
              
              <div class="flex gap-4 flex-wrap justify-center mt-4"></div>
              
              <div class="flex gap-4 flex-wrap">
              <div 
                  @click="openSplineDesign('espresso_pharmacy')"
                  class="spline-link-card bg-gradient-to-br from-amber-50 to-amber-200 hover:from-amber-100 hover:to-amber-300"
                >
                  <div class="card-content">
                    <img
                      src="/ESPRESSO_logo.png"
                      alt="Espresso Design"
                      class="w-12 h-12 object-contain"
                    />
                    <span class="font-thai">Espresso Pharmacy</span>
                    <div class="card-arrow">
                     
                    </div>
                  </div>
                </div>

                <!-- Espresso Human Spline Link -->
                <div 
                  @click="openSplineDesign('espresso_human')"
                  class="spline-link-card bg-gradient-to-br from-pink-50 to-pink-200 hover:from-pink-100 hover:to-pink-300"
                >
                  <div class="card-content">
                    <img
                      src="/ESPRESSO_logo.png"
                      alt="Espresso Design"
                      class="w-12 h-12 object-contain"
                    />
                    <span class="font-thai">Espresso Human</span>
                    <div class="card-arrow">
                      
                    </div>
                  </div>
                </div>
                </div>

            </div>

            <!-- Momay content -->
            <div v-if="selectedLogo==='momay'">
              <p class="mt-3 text-lg leading-relaxed font-thai">
                คือ SauceCode ที่เป็นตัวกลางในการรับข้อมูลจากแหล่งต่าง ๆ ได้ตามความต้องการ
              </p>
              <ul class="list-disc list-inside mt-2 space-y-1 text-lg font-thai">
                <li>พลังงานไฟฟ้า</li>
                <li>กล้องวงจรปิด</li>
                <li>ห้องสมุดออนไลน์</li>
              </ul>
              <p class="mt-2 text-lg leading-relaxed font-thai">
                และส่งข้อมูลไปยัง Espresso เพื่อแสดงผลแบบเรียลไทม์
              </p>
              <img
                src="/diagramSystem.png"
                alt="Diagram System"
                class="mt-3 w-1/2 h-auto rounded-lg shadow-lg ml-2"
                @click="openImageModal('/diagramSystem.png')"
              />
              <!-- Momay BanKlong Resort Link -->
            <div class="flex gap-4 flex-wrap justify-center mt-4"></div>
              
            <div class="flex gap-4 flex-wrap">
            <div 
              @click="openSplineDesign('momay_BanKlongResort')"
              class="spline-link-card bg-gradient-to-br from-pink-50 to-pink-200 hover:from-pink-100 hover:to-pink-300"
            >
              <div class="card-content">
                <img
                  src="/MOMAY_logo.png"
                  alt="Momay Design"
                  class="w-12 h-12 object-contain"
                />
                <span class="font-thai">Momay Banklong Resort Hotel</span>
                <div class="card-arrow">
                  
                </div>
              </div>
            </div>

             <!-- Wongpanit_Sukhothai -->
            <div 
              @click="openSplineDesign('wongpanit_sukhothai')"
              class="spline-link-card bg-gradient-to-br from-green-50 to-green-200 hover:from-green-100 hover:to-green-300"
            >
              <div class="card-content">
                <img
                  src="/MOMAY_logo.png"
                  alt="Wongpanit Sukhothai"
                  class="w-12 h-12 object-contain"
                />
                <span class="font-thai">Wongpanit Sukhothai</span>
                <div class="card-arrow">
                  
                </div>
              </div>

              
            </div>

            
            </div>
            </div>
            

            <!-- collabarate content -->
            <div v-if="selectedLogo==='Collaborativesensing'">
             <p class="mt-3 text-lg leading-relaxed font-thai">
              Collaborative sensing คือกระบวนการที่นำอุปกรณ์หลายตัวหรือหลายระบบทำงานร่วมกัน
              เพื่อ<strong>ตรวจจับ รวบรวม และประมวลผลข้อมูล</strong>จากสภาพแวดล้อมโดยรอบ
              เพื่อให้ได้ข้อมูลที่แม่นยำและครอบคลุมยิ่งขึ้น
            </p>
              <ul class="list-disc list-inside mt-2 space-y-1 text-lg font-thai">
                <li>Energy</li>
                <li>Camera CCTV</li>
                <li>EV Charger</li>
                <li>Access Control</li>
              </ul>
              <p class="mt-2 text-lg leading-relaxed font-thai">
                และส่งข้อมูลเพื่อแสดงผลบนระบบที่ถูกพัฒนาขึ้นมา
                <strong>Data is your</strong> เพื่อให้ผู้ใช้สามารถเข้าถึงและวิเคราะห์ข้อมูลได้อย่างมีประสิทธิภาพ]
              </p>
              <img
                src="/diagramSystem.png"
                alt="Diagram System"
                class="mt-3 w-1/2 h-auto rounded-lg shadow-lg ml-2"
                @click="openImageModal('/diagramSystem.png')"
              />

              <div class="flex gap-4 flex-wrap justify-center mt-4"></div>
              
              <div class="flex gap-5 flex-wrap">
                <!-- Espresso Pharmacy Spline Link -->
                

                    <!-- figmadataisyour -->
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
          </div>
        </div>
      
      </div>

    </div>
 

  <!--fade รูป-->
  <transition name="fade">
  <div
    v-if="showImageModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="closeImageModal"
  >
    <div class="relative">
      <button
        class="absolute  right-2 text-white text-2xl font-bold"
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

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

.font-thai {
  font-family: 'Poppins', sans-serif;
}

/* Fixed logo container size to prevent movement */
.logo-container {
  width: 300px;
  height: 300px;
  position: relative;
  overflow: hidden;
}

/* Animation container with absolute positioning */
.animation-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Thumbnail animation container */
.thumbnail-animation-container {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.thumb-position {
  position: relative;
  margin-bottom: 6px;
}

/* Dual logos slide animation */
.slide-dual-enter-active,
.slide-dual-leave-active {
  transition: transform .5s ease, opacity .5s ease;
}
.slide-dual-enter-from { opacity: 0; transform: translateX(-100px); }
.slide-dual-enter-to   { opacity: 1; transform: translateX(0);     }
.slide-dual-leave-from { opacity: 1; transform: translateX(0);     }
.slide-dual-leave-to   { opacity: 0; transform: translateX(-100px); }

/* Logo fade animation */
.logo-fade-enter-active,
.logo-fade-leave-active {
  transition: opacity .3s ease;
}
.logo-fade-enter-from,
.logo-fade-leave-to {
  opacity: 0;
}

/* Main Logo Animation - Slide to thumbnail */
@keyframes main-to-thumb {
  0% {
    opacity: 1;
    transform: scale(1) translate(0, 0);
  }
  100% {
    opacity: 0;
    transform: scale(0.25) translate(-200px, 0);
  }
}

/* Thumbnail Logo Animation - Slide to main */
@keyframes thumb-to-main {
  0% {
    opacity: 0;
    transform: scale(0.25) translate(-200px, 0);
  }
  100% {
    opacity: 1;
    transform: scale(1) translate(0, 0);
  }
}

/* Animation for logo going from thumbnail to main position */
@keyframes thumb-disappear {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
}

/* Animation for logo going from main to thumbnail position */
@keyframes logo-to-thumb {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Apply animations */
.main-logo-out {
  animation: main-to-thumb 0.7s ease-in-out forwards;
}

.thumb-logo-in {
  animation: thumb-to-main 0.7s ease-in-out forwards;
}

.logo-to-thumb {
  animation: logo-to-thumb 0.7s ease-in-out forwards;
}

.thumb-disappear {
  animation: thumb-disappear 0.7s ease-in-out forwards;
}

/* Thumbnail styling */
.logo-thumbnail {
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
}

.logo-thumbnail:hover {
  transform: scale(1.1);
}

.logo-thumbnail:hover::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -12px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 8px solid white;
}

/* Dot pop animation */
.dot-enter-active {
  transition: all .3s ease-out;
}
.dot-enter-from {
  opacity: 0; transform: scale(0);
}
.dot-enter-to {
  opacity: 1; transform: scale(1);
}

/* Dot positioning */
.dot {
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
}
.dot-top    { top: -1rem;  left: 50%;   transform: translateX(-50%); }
.dot-right  { top: 50%;    right: -1rem;transform: translateY(-50%); }
.dot-bottom { bottom: -1rem;left: 50%;   transform: translateX(-50%); }
.dot-left   { top: 50%;    left: -1rem; transform: translateY(-50%); }

/* Spline link card styling */
.spline-link-card {
  width: clamp(400px, min(60vw, 60vh), 800px);
  height: clamp(400px, min(60vw, 60vh), 800px);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spline-link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
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

/* fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.neon-circle {
  background: linear-gradient(180deg, #f8f6f0 0%, #fffef8 45%, #fff8e8 55%, #f5f0e5 100%);
  color: #000000;
  border: 6px solid #74640a;
  border-radius: 9999px; /* ✅ ทำเป็นวงกลม */
  box-shadow:
    inset 0 0 90px rgba(255, 252, 240, 1),
    1px 1px 0 #000,
    -8px 6px #3b3305,
    0 0 20px rgba(255,230,160,0.55);
  font-weight: 700;
  text-shadow: 
    0 1px 0 rgba(255, 255, 255, 0.3),
    0 -1px 0 rgba(0, 0, 0, 0.1);
  padding: 16px; /* ✅ ขนาดปุ่ม ขยายตามเนื้อด้านใน */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

/* Root Background with Gradient Animation */
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

</style>