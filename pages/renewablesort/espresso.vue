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
      <router-link
      to="/renewablesort/collaborativesensing"
      class="circle-link bg-gradient-to-br from-pink-50 to-pink-200 hover:from-pink-100 hover:to-pink-300 
              w-20 h-20 rounded-xl shadow-lg flex flex-col justify-center items-center p-4 border border-pink-300"
    >
      <div class="circle-content">
        <img
          src="/datacityplatform.png"
          alt="Collaborative"
          class="w-14 h-14 object-contain mb-2"
        />
        <span class="text-sm font-thai text-center"></span>
      </div>
    </router-link>
    <!-- Espresso -->
      <router-link
        to="/renewablesort/momay"
        class="circle-link bg-gradient-to-br from-pink-50 to-pink-200 hover:from-pink-100 hover:to-pink-300 
              w-20 h-20 rounded-xl shadow-lg flex flex-col justify-center items-center p-4 border border-pink-300"
      >
      <div class="circle-content">
        <img
          src="/MOMAY_logo.png"
          alt="Espresso"
          class="w-14 h-14 object-contain mb-2"
        />
        <span class="text-sm font-thai text-center"></span>
      </div>
    </router-link>
  </div>
  <div class="p-8 min-h-screen bg-gradient-to-b from-amber-50 to-white">
    <h1 class="text-4xl font-bold text-red-900 capitalize ml-4 font-thai">Espresso</h1>
    <p class="mt-4 text-lg leading-relaxed indent-8 whitespace-pre-line font-thai">
      ระบบบริหารจัดการพลังงานอัจฉริยะ ติดตามและควบคุมการใช้ไฟฟ้าได้อย่างมีประสิทธิภาพ
      Espresso ช่วยให้คุณเห็นและวิเคราะห์การใช้พลังงานแบบเรียลไทม์
      เพื่อให้คุณสามารถตรวจสอบและแก้ไขปัญหาได้ทันที
    </p>

    <h2 class="mt-8 ml-4 font-bold text-red-900 text-3xl text-center md:text-left font-thai">
      Key Features
    </h2>
    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 font-thai">
      <div class="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-semibold mb-2">Real-time Monitoring</h3>
        <p class="text-gray-600 leading-relaxed">
          เฝ้าติดตามพลังงานแบบเรียลไทม์ ตั้งแต่ภาพรวมอาคารจนถึงแต่ละห้อง
        </p>
      </div>
      <div class="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-semibold mb-2">Insight Analytics</h3>
        <p class="text-gray-600 leading-relaxed">
          วิเคราะห์ข้อมูลเชิงลึก พร้อมรายงานรายวัน รายเดือน และรายปี
        </p>
      </div>
      <div class="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-semibold mb-2">Auto-Reporting</h3>
        <p class="text-gray-600 leading-relaxed">
          สร้างรายงานอัตโนมัติ ส่งออกเป็น PDF หรือ CSV ได้ทันที
        </p>
      </div>
      <div class="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-semibold mb-2">Web Access</h3>
        <p class="text-gray-600 leading-relaxed">
          เข้าถึงระบบออนไลน์ได้ทุกที่ ทุกเวลา ผ่านเว็บเบราว์เซอร์
        </p>
      </div>
    </div>

    <div class="flex gap-4 flex-wrap justify-center mt-10">
      <div 
        @click="openSplineDesign('espresso_pharmacy')"
        class="spline-link-card bg-gradient-to-br from-amber-50 to-amber-200 hover:from-amber-100 hover:to-amber-300"
        >
        <div class="card-content">
          <img src="/ESPRESSO_logo.png" alt="Espresso Design" class="w-12 h-12 object-contain" />
          <span class="font-thai">Espresso Pharmacy</span>
        </div>
    </div>    

      <div 
        @click="openSplineDesign('espresso_human')"
        class="spline-link-card bg-gradient-to-br from-pink-50 to-pink-200 hover:from-pink-100 hover:to-pink-300"
      >
        <div class="card-content">
          <img src="/ESPRESSO_logo.png" alt="Espresso Design" class="w-12 h-12 object-contain" />
          <span class="font-thai">Espresso Human</span>
        </div>
      </div>

      <div 
        @click="openSplineDesign('huaroa')"
        class="spline-link-card bg-gradient-to-br from-pink-50 to-pink-200 hover:from-pink-100 hover:to-pink-300"
      >
        <div class="card-content">
          <img src="/ESPRESSO_logo.png" alt="Espresso Design" class="w-12 h-12 object-contain" />
          <span class="font-thai">Huaroa</span>
        </div>
      </div>
    </div>
  </div>
 </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const splineLinks = {
  espresso_pharmacy: '/renewablesort/espresso/espresso_pharmacy',
  espresso_human: '/renewablesort/espresso/espresso_human',
  huaroa: 'https://huaroa-production.up.railway.app/', // External link
};

function openSplineDesign(key: keyof typeof splineLinks) {
  const password = prompt("กรุณาใส่รหัสผ่านเพื่อเข้าถึง");

  if (password !== '240124') {
    alert("รหัสผ่านไม่ถูกต้อง ❌");
    return;
  }

  const url = splineLinks[key];
  if (url) window.open(url, '_blank');
}
</script>

<style scoped>
.font-thai {
  font-family: 'Poppins', sans-serif;
}

.spline-link-card {
  width: 250px;
  height: 80px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
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
</style>