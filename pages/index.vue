<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { useHead, useSeoMeta } from '#imports';

useHead({
  title: 'Kwang Unlimit',
  script: [{ innerHTML: `console.log('Welcome To New ERA! Kwang Unlimit LTD.')`}],
  link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap' }]
});

useSeoMeta({
  title: 'Kwang Unlimit',
  ogTitle: 'Kwang Unlimit',
  description: 'Welcome to New ERA ! Kwang unlimit',
  ogDescription: 'Welcome to New ERA ! Kwang unlimit',
  ogImage: '/kwang_logo.png'
});

let observer: IntersectionObserver | null = null;

onMounted(() => {
  // Reset all scroll-reveal elements
  const revealElements = document.querySelectorAll('.scroll-reveal');
  revealElements.forEach(el => {
    el.classList.remove('visible');
  });

  // ✅ Scroll Reveal Effect
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer!.observe(el));
});

onBeforeUnmount(() => {
  // Cleanup observer
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});

</script>


<template>
  <div class="root-bg flex flex-col relative z-10 px-[clamp(1rem,2vw,2rem)] py-[clamp(2rem,4vw,3rem)]">
    <!-- Logo ลายน้ำ - ย้ายมาไว้ข้างนอก -->
    <div class="background-image">
      <img src="/kwang_logo.png" alt="Logo" />
    </div>

    <!-- Running Text -->
    <div class="flex justify-center flex-1 px-[clamp(1rem,3vw,1.5rem)] mt-[clamp(4rem,10vw,5.625rem)] mb-[clamp(2rem,4vw,3rem)]">       
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

    <!-- Video + Menu -->
    <div class="flex-1 max-w-6xl mx-auto px-[clamp(1rem,3vw,2rem)] py-0 flex flex-col xl:flex-row items-center gap-[clamp(2rem,5vw,5rem)]">
      
      <!-- Video Box -->
      <div class="flex-[2] w-full flex justify-center items-center video-box">
        <video class="w-full max-w-[min(48rem,85vw)] rounded-xl shadow-xl object-cover" autoplay muted loop playsinline>
          <source src="/video/kwang_Temporary.mp4" type="video/mp4" />
        </video>
      </div>
      
      <!-- Menu -->
      <div class="flex-[1] flex flex-col items-center gap-[clamp(1rem,2.5vw,2rem)] w-full">
        <a href="/valueProposition" class="neon-btn bg-[#f8f6f0] text-black text-[clamp(1rem,2.5vw,1.75rem)] font-sans font-light px-[clamp(1.5rem,4vw,2.5rem)] py-[clamp(0.875rem,2.5vw,1.25rem)] rounded-xl w-full max-w-[min(350px,85vw)] whitespace-nowrap flex items-center justify-center">
          ABOUT US
        </a>

        <a href="/home" class="neon-btn bg-[#7d1007] text-white text-[clamp(1rem,2.5vw,1.75rem)] font-sans font-light px-[clamp(1.5rem,4vw,2.5rem)] py-[clamp(0.875rem,2.5vw,1.25rem)] rounded-xl w-full max-w-[min(350px,85vw)] whitespace-nowrap flex items-center justify-center">
          PROJECTS
        </a>

        <a href="/renewable" class="neon-btn bg-[#7d1007] text-white text-[clamp(1rem,2.5vw,1.75rem)] font-sans font-light px-[clamp(1.5rem,4vw,2.5rem)] py-[clamp(0.875rem,2.5vw,1.25rem)] rounded-xl w-full max-w-[min(350px,85vw)] whitespace-nowrap flex items-center justify-center">
          FORWARD THINKING
        </a>

        <a href="/products" class="neon-btn bg-[#f8f6f0] text-black text-[clamp(1rem,2.5vw,1.75rem)] font-sans font-light px-[clamp(1.5rem,4vw,2.5rem)] py-[clamp(0.875rem,2.5vw,1.25rem)] rounded-xl w-full max-w-[min(350px,85vw)] whitespace-nowrap flex items-center justify-center">
          SHOP
        </a>
      </div>
    </div>

  </div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

body {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
}

.neon-btn, .running-text, .marquee span {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  font-weight: 300; /* Light */
}

/* 🌈 พื้นหลังทั้งหน้า */
.root-bg {
  position: relative;
  overflow-x: hidden;
}

.root-bg::before,
.root-bg::after {
  content: '';
  position: fixed;
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0;
  z-index: 0;
  animation: floatBg 30s linear infinite;
}

.root-bg::before {
  background: linear-gradient(to bottom, #ebd09e 0%, #251f03 100%);
}

.root-bg::after {
  background: radial-gradient(circle at 30% 40%, #ebd09e, #251f03);
}

/* Animation */
/* Logo ลายน้ำ */
.background-image {
  position: fixed;
  top: 55%;
  left: 75%;
  transform: translate(-50%, -50%);
  width: 90%;        /* ✅ ขยายจาก 60% */
  max-width: 1400px; /* ✅ เพิ่มขนาดสูงสุด */
  height: auto;
  opacity: 0.3;
  z-index: 1;
  pointer-events: none;
}

.background-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}

/* Neon Button */
.neon-btn {
  background: linear-gradient(180deg, #f8f6f0 0%, #fffef8 45%, #fff8e8 55%, #f5f0e5 100%);
  color: #000000;
  border: 6px solid #74640a;
  border-radius: 9999px;
  box-shadow: 1px 1px 0 #000, -8px 6px #3b3305, 0 0 20px rgba(255,230,160,0.55);
  font-weight: 700;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  padding: 16px 40px;
  transform: translateZ(0);
  transition: all 0.3s ease;
  z-index: 10;
}

/* Running Text */
.running-text {
  background: linear-gradient(180deg, #f8f6f0 0%, #fff8e8 50%, #f5f0e5 100%);
  color: #000;
  border: clamp(4px, 0.5vw, 6px) solid #74640a;
  border-radius: 9999px;
  font-weight: 700;
  text-transform: uppercase;
  padding: clamp(10px, 1.5vw, 15px) clamp(15px, 2vw, 20px);
  box-shadow: 1px 1px 0 #000, clamp(-6px, -0.8vw, -8px) clamp(4px, 0.6vw, 6px) #3b3305, 0 0 20px rgba(255,230,160,0.55);
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

.marquee img { 
  max-height: 40px; 
  display: inline-block; 
  vertical-align: middle; 
  margin-right: 1rem; 
}

.marquee span {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  padding: clamp(0.375rem, 1vw, 0.5rem) clamp(1.25rem, 2.5vw, 2rem);
  background: linear-gradient(180deg, #f8f6f0 0%, #fff8e8 50%, #f5f0e5 100%);
  font-weight: 700;
  text-transform: uppercase;
  border: clamp(1.5px, 0.25vw, 2px) solid #000;
  border-radius: clamp(4px, 0.6vw, 6px);
  box-shadow: 2px 2px 0 #000, -1px -1px 0 #000, 0 0 6px rgba(255,230,160,0.55);
  margin-right: clamp(0.75rem, 1.5vw, 1rem);
  font-size: clamp(0.75rem, 1.25vw, 0.875rem);
}

@keyframes marquee { 
  0% { transform: translateX(0); } 
  100% { transform: translateX(-50%); } 
}

/* Scroll Reveal */
.scroll-reveal { 
  opacity: 0; 
  transform: translateY(40px); 
  transition: opacity 0.9s ease, transform 0.9s ease;
  position: relative;
  z-index: 10;
}

.scroll-reveal.visible { 
  opacity: 1; 
  transform: translateY(0); 
}

/* Video Box */
.video-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding: 0.5rem 1rem;
  background: linear-gradient(180deg, rgba(239,187,91,0.68) 0%, rgba(255,220,140,0.55) 50%, #f5f0e5 100%);
  border: 6px solid #74640a;
  border-radius: 18px;
  box-shadow: 1px 1px 0 #000, -8px 6px #3b3305, 0 0 20px rgba(255,230,160,0.55);
  position: relative;
  overflow: hidden;
  z-index: 10;
}

/* ฟองฟุ้งเบา ๆ */
.video-box::before,
.video-box::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  filter: blur(20px);
  animation: bubbleMove 12s linear infinite;
}

.video-box::before {
  width: 60px;
  height: 60px;
  top: 15%;
  left: 10%;
}

.video-box::after {
  width: 80px;
  height: 80px;
  bottom: 20%;
  right: 15%;
  animation-duration: 14s;
}

@keyframes bubbleMove {
  0% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-10px) translateX(8px); }
  100% { transform: translateY(0) translateX(0); }
}

.slogan-text { 
  font-family: 'Poppins', sans-serif; 
  font-weight: 700; 
  color: #7d1007; 
  font-size: 2.7rem; 
}

/* ลดขนาด 70% สำหรับมือถือ */
@media (max-width: 768px) {
  .running-text {
    border-width: 3px !important;
    padding: 7px 10px !important;
    font-size: 0.7rem !important;
  }
  
  .marquee span {
    padding: 0.26rem 0.875rem !important;
    border-width: 1px !important;
    border-radius: 3px !important;
    font-size: 0.525rem !important;
    margin-right: 0.525rem !important;
  }
  
  .neon-btn {
    border-width: 3px;
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

/* iPad Pro แนวนอน - แสดง menu ข้างๆ */
@media (min-width: 1200px) {
  .flex-1.max-w-6xl {
    flex-direction: row !important;
  }
}

</style>
