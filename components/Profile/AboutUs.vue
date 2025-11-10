<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Contact from './Contact.vue'; // ✅ import Contact

onMounted(() => {
    AOS.init();
});
useSeoMeta({
  title: 'Kwang Unlimit',
  ogTitle: 'Kwang Unlimit',
  description: 'Welcome to New ERA ! Kwang unlimit',
  ogDescription: 'Welcome to New ERA ! Kwang unlimit',
  ogImage: '/kwang_logo.png'
});
</script>

<template>
    
  <div class="w-full flex flex-col items-center font-roboto py-[clamp(3rem,5vw,5rem)]">
    <div class="background-image2">
      <img src="/kwang_logo.png" alt="Logo" />
    </div>

    <!-- ตัววิ่ง -->
    <div class="flex justify-center w-full px-[clamp(1rem,3vw,1.5rem)] mt-[clamp(4rem,10vw,5.625rem)] mb-[clamp(2rem,4vw,3rem)]">       
      <div class="running-text w-full max-w-[min(1200px,95vw)] overflow-hidden relative text-[clamp(0.875rem,1.5vw,1.25rem)] whitespace-nowrap">
          <div class="marquee">
            <div class="marquee-content">
              <span>Make tech fresh get forward</span>
              <span>EST 24/01/2024</span>
            </div>
            <div class="marquee-content">
    
              <span>Make tech fresh get forward</span>
              <span>EST 24/01/2024</span>
            </div>
          </div>
        </div>
      </div>
    
    <div class="w-[min(80rem,95vw)] flex flex-col items-center gap-[clamp(2rem,4vw,4rem)]">

      <!-- Text Box -->
      <div class="neon-btn-H p-[clamp(1.5rem,3vw,2rem)] max-w-[min(48rem,90vw)] mx-auto text-justify text-[clamp(0.875rem,1.5vw,1.125rem)] text-graydeep font-light leading-relaxed">
        <p class="mb-[clamp(1rem,2vw,1.5rem)] indent-8">
          บริษัท กว้างไม่ จำกัด ก่อตั้งที่จังหวัดพิษณุโลกในปี 2024 ในฐานะบริษัทการออกแบบและติดตั้งระบบโซล่าเซลล์ ไอทีเน็ตเวิร์ค เคยให้บริการทั้งองค์กรภาครัฐบาลและภาคเอกชนในจังหวัดพิษณุโลกและจังหวัดใกล้เคียง
        </p>

        <p class="mb-[clamp(1rem,2vw,1.5rem)] indent-8">
          หลังจากนั้นได้พัฒนาซอฟแวร์และแพลตฟอร์มบริการด้านจัดการพลังงานทดแทน ความปลอดภัย การศึกษา ซึ่งผสานการบริหารจัดการการให้คำปรึกษาตามความต้องการสินค้าและบริการเข้าด้วยกันที่มุ่งเน้นนำเทคโนโลยีสร้างความเปลี่ยนแปลง ให้กับสังคมอย่างตรงไปตรงมา
        </p>
      </div>

<!-- Timeline -->
<div class="timeline-container relative w-full overflow-x-auto scrollbar-hide px-[clamp(1rem,3vw,1rem)] py-[clamp(2rem,3vw,3rem)]">
  <div class="timeline-flex flex items-start gap-0 min-w-[900px] relative">
    
    <!-- เส้นแนวนอนเชื่อม Timeline (วงกลมปะ) -->
    <div class="absolute left-[16.666%] right-[16.666%] top-[44px] flex items-center justify-start gap-2 z-0">
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
            <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
            <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="w-2 h-2 rounded-full bg-white opacity-80" style="box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);"></div>
      <div class="flex-1"></div>
    </div>
    
    <!-- ลูกศรปลายขวา -->
    <div class="absolute top-[44px] z-10"
         style="right: calc(16.666% - 14px);
                width: 0; height: 0; 
                border-left: 14px solid rgba(255, 255, 255, 0.8);
                border-top: 9px solid transparent;
                border-bottom: 9px solid transparent;
                filter: drop-shadow(0 2px 6px rgba(255, 255, 255, 0.3));"></div>
    
    <!-- จุดเชื่อมที่แต่ละปี (ไข่ปลาใหญ่) -->
    <div class="absolute left-[16.666%] top-[41px] w-5 h-8 z-10"
         style="background: rgba(255, 255, 255, 0.9);
                border-radius: 50%;
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.6), 0 2px 6px rgba(0, 0, 0, 0.1); 
                border: 2px solid rgba(255, 255, 255, 0.95);"></div>
    <div class="absolute left-[50%] top-[41px] w-5 h-8 z-10"
         style="transform: translateX(-50%);
                background: rgba(255, 255, 255, 0.9);
                border-radius: 50%;
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.6), 0 2px 6px rgba(0, 0, 0, 0.1); 
                border: 2px solid rgba(255, 255, 255, 0.95);"></div>
    <div class="absolute right-[16.666%] top-[41px] w-5 h-8 z-10"
         style="background: rgba(255, 255, 255, 0.9);
                border-radius: 50%;
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.6), 0 2px 6px rgba(0, 0, 0, 0.1); 
                border: 2px solid rgba(255, 255, 255, 0.95);"></div>

    <!-- 2024 -->
    <div class="flex-1 flex flex-col items-center text-center relative z-20">
      <div class="relative group mb-[clamp(1rem,2vw,1.5rem)]">
        <div class="absolute bg-red-300 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-300"
             style="filter: blur(24px); top: -10px; left: -10px; right: -10px; bottom: -10px;"></div>
        <div class="neon-btn relative text-white px-[clamp(1.5rem,3vw,2rem)] py-[clamp(0.75rem,2vw,1rem)]">
          <div class="text-[clamp(1.5rem,3vw,1.875rem)] font-bold">2024</div>
        </div>
      </div>

      <!-- เส้นแนวตั้งเชื่อมลงการ์ด -->
      <div class="w-1 h-[clamp(1rem,2vw,1.5rem)] rounded-full"
           style="background: linear-gradient(to bottom, rgba(255, 255, 255, 0.7), transparent);"></div>

      <div class="neon-btn mt-[clamp(1rem,2vw,1.5rem)] bg-gradient-to-br from-gray-50 to-white p-[clamp(1rem,2vw,1.5rem)] rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 w-[clamp(12rem,20vw,15rem)]">
        <div class="text-red-600 font-semibold text-[clamp(0.875rem,1.5vw,1rem)] mb-2">พลังงานทดแทน</div>
        <div class="text-gray-600 text-[clamp(0.75rem,1.25vw,0.875rem)]" style="line-height: 1.6;">ออกแบบและติดตั้งระบบโซล่าเซลล์</div>
      </div>
    </div>

    <!-- 2025 -->
    <div class="flex-1 flex flex-col items-center text-center relative z-20">
      <div class="relative group mb-[clamp(1rem,2vw,1.5rem)]">
        <div class="absolute bg-red-300 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-300"
             style="filter: blur(24px); top: -10px; left: -10px; right: -10px; bottom: -10px;"></div>
        <div class="neon-btn relative text-white px-[clamp(1.5rem,3vw,2rem)] py-[clamp(0.75rem,2vw,1rem)] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <div class="text-[clamp(1.5rem,3vw,1.875rem)] font-bold">2025</div>
        </div>
      </div>

      <!-- เส้นแนวตั้งเชื่อมลงการ์ด -->
      <div class="w-1 h-[clamp(1rem,2vw,1.5rem)] rounded-full"
           style="background: linear-gradient(to bottom, rgba(255, 255, 255, 0.7), transparent);"></div>

      <div class="neon-btn mt-[clamp(1rem,2vw,1.5rem)] bg-gradient-to-br from-gray-50 to-white p-[clamp(1rem,2vw,1.5rem)] rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 w-[clamp(12rem,20vw,15rem)]">
        <div class="text-red-600 font-semibold text-[clamp(0.875rem,1.5vw,1rem)] mb-2">เครือข่าย IT</div>
        <div class="text-gray-600 text-[clamp(0.75rem,1.25vw,0.875rem)]" style="line-height: 1.6;">ออกแบบและติดตั้งไอทีเน็ตเวิร์ค</div>
      </div>
    </div>

    <!-- 2026 -->
    <div class="flex-1 flex flex-col items-center text-center relative z-20">
      <div class="relative group mb-[clamp(1rem,2vw,1.5rem)]">
        <div class="absolute bg-red-300 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-300"
             style="filter: blur(24px); top: -10px; left: -10px; right: -10px; bottom: -10px;"></div>
        <div class="neon-btn relative text-white px-[clamp(1.5rem,3vw,2rem)] py-[clamp(0.75rem,2vw,1rem)] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <div class="text-[clamp(1.5rem,3vw,1.875rem)] font-bold">2026</div>
        </div>
      </div>

      <!-- เส้นแนวตั้งเชื่อมลงการ์ด -->
      <div class="w-1 h-6 rounded-full"
           style="background: linear-gradient(to bottom, rgba(255, 255, 255, 0.7), transparent);"></div>

      <div class="neon-btn mt-6 bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 w-60">
        <div class="text-red-600 font-semibold text-base mb-2">นวัตกรรมดิจิทัล</div>
        <div class="text-gray-600 text-sm" style="line-height: 1.6;">พัฒนาซอฟแวร์และแพลตฟอร์ม</div>
      </div>
    </div>

  </div>
</div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

/* ซ่อน scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* ปรับ font ให้ Roboto */
.font-roboto {
  font-family: 'Roboto', sans-serif;
}

.neon-btn-H {
  background: linear-gradient(180deg, #f8f6f0 0%, #fffef8 45%, #fff8e8 55%, #f5f0e5 100%);
  color: #000;
  border: 6px solid #74640a;
  border-radius: 10px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  padding: 32px 60px; /* สูงขึ้นและกว้างขึ้น */
  font-size: 1.125rem; /* ตัวอักษรใหญ่ขึ้น */
  line-height: 1.75rem;
  box-shadow:
    inset 0 0 90px rgba(255, 252, 240, 1),
    1px 1px 0 #000,
    -10px 8px  #3b3305,
    0 0 20px rgba(255,230,160,0.55);
  position: relative;
  transform: translateZ(0);
  transition: all 0.3s ease;
}

/* Neon Buttons */
.neon-btn {
  background: linear-gradient(180deg, #f8f6f0 0%, #fffef8 45%, #fff8e8 55%, #f5f0e5 100%);
  color: #000000;
  border: 6px solid #74640a;
  border-radius: 10px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  padding: 16px 40px;
  box-shadow:
    0 0 15px rgba(255, 248, 220, 0.5),
    0 0 25px rgba(255, 240, 180, 0.4),
    0 0 20px rgba(199, 174, 103, 0.8),
    0 0 20px rgba(204, 161, 69, 0.6),
    inset 0 0 30px rgba(255, 210, 120, 0.9),
    inset 0 0 10px rgba(255, 230, 160, 0.8),
    inset 0 0 50px rgba(255, 240, 200, 0.705),
    inset 0 0 90px rgba(255, 252, 240, 1),
    1px 1px 0 #000,
    -10px 8px  #3b3305,
    0 0 20px rgba(255,230,160,0.55);
  position: relative;
  transform: translateZ(0);
  transition: all 0.3s ease;
  text-align: center;
}
.running-text {
  background: linear-gradient(180deg, #f8f6f0 0%, #fff8e8 50%, #f5f0e5 100%);
  color: #000;
   border: 6px solid #74640a;
border-radius: 9999px; /* ทำเป็นวงรี/วงกลมเต็มสำหรับปุ่มสั้น */
  font-weight: 700;
  text-transform: uppercase;
  padding: 15px 20px;
  box-shadow:
    0 0 5px rgba(255,248,220,0.25),
    0 0 10px rgba(255,240,180,0.2),
    inset 0 10px 16px rgba(239,187,91,0.68),
    inset 0 10px 16px rgba(255,220,140,0.55),
    inset 0 0 45px rgba(255,235,180,0.45),
    inset 0 0 80px rgba(255,250,230,1);
  text-shadow: 0 1px 0 rgba(255,255,255,0.4), 0 -1px 0 rgba(0,0,0,0.15), 0 0 6px rgba(255,230,160,0.55);
 box-shadow: 1px 1px 0 #000, -8px 6px  #3b3305, 0 0 20px rgba(255,230,160,0.55);
  overflow: hidden;
  position: relative;
  z-index: 50;
}

/* --- ส่วน marquee, scroll-reveal และอื่นๆ เหมือนเดิม --- */

.marquee { display: flex; min-width: 300%; animation: marquee 30s linear infinite; }
.marquee-content { display: flex; align-items: center; margin-right: 2rem; }
.marquee img { max-height: 40px; display: inline-block; vertical-align: middle; margin-right: 1rem; }
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

.running-text-container { justify-content: flex-start; padding-left: 25px; padding-right: 0; }
.running-text { max-width: 1090px; width: auto; }

@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
/*
.background-image {
  position: absolute; 
  top: 500%;         
  left: 80%;
  transform: translate(-50%, -50%);
  width: 120%;      
  max-width: none;   
  height: auto;
  opacity: 0.1;     
  z-index: 0;        
  pointer-events: none; 
}
*/
.background-image2 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  max-width: none;
  height: auto;
  opacity: 0.1;
  z-index: 999999; /* 🔥 สูงสุดในโปรเจกต์ */
  pointer-events: none;
}


.root-bg {
  position: relative; /* เพื่อให้ absolute ของ background-image อิง container */
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
    border-width: 3px;
    padding: 8.4px 19.6px;
    font-size: 0.7rem;
  }
  
  .neon-btn-H {
    border-width: 3px;
    padding: 16.8px 31.5px;
    font-size: 0.7rem;
  }
  
  /* Timeline แนวตั้งในมือถือ */
  .timeline-container {
    overflow-x: visible;
  }
  
  .timeline-flex {
    flex-direction: column;
    min-width: 100%;
    gap: 2rem;
  }
  
  .timeline-flex > div {
    width: 100%;
  }
  
  /* ซ่อนเส้นแนวนอนและลูกศร */
  .timeline-flex .absolute {
    display: none;
  }
  
  /* แสดงเส้นแนวตั้งแทน */
  .timeline-container::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, 
      transparent,
      rgba(255, 255, 255, 0.3) 10%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0.3) 90%,
      transparent
    );
    transform: translateX(-50%);
    z-index: 0;
  }
  
  /* ป้องกัน text wrap */
  .whitespace-nowrap {
    white-space: nowrap !important;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

</style>
