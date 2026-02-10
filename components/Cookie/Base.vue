<template>
  <div v-if="cookieCheck" class="z-50 fixed bottom-0 right-0 mb-4 mr-4 w-64 font-inter">
    <div class="bg-white rounded-lg shadow-lg p-4 border-reddeep border">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center">
          <img src="https://www.svgrepo.com/show/401340/cookie.svg" alt="Cookie" class="h-6 w-6 mr-2">
          <span class="font-bold text-detail font-thai text-reddeep">เว็บไซต์นี้ใช้คุกกี้</span>
        </div>
        <button @click="" class="text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <p class="text-graydeep text-detail font-thai mb-2">
        คุกกี้พื้นฐานที่จำเป็น เพื่อช่วยให้การทำงานหลักของเว็บไซต์ใช้งานได้ รวมถึงการเข้าถึงพื้นที่ที่ปลอดภัยต่าง ๆ ของเว็บไซต์ หากไม่มีคุกกี้นี้เว็บไซต์จะไม่สามารถทำงานได้อย่างเหมาะสม และจะใช้งานได้โดยการตั้งค่าเริ่มต้น โดยไม่สามารถปิดการใช้งานได้
      </p>
      <div class="w-full flex justify-center">
        <button @click="" class="bg-reddeep hover:bg-black text-white py-1 px-4 rounded focus:outline-none font-thai">
          ยอมรับ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
const cookieCheck = useCookie('verifyCookie')
onMounted(() => {
  console.log(cookieCheck.value)
})
</script>
