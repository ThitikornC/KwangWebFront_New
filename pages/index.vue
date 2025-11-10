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
  <div class="root-bg min-h-screen flex flex-col relative z-10">
    <!-- Logo ลายน้ำ - ย้ายมาไว้ข้างนอก -->
    <div class="background-image">
      <img src="/kwang_logo.png" alt="Logo" />
    </div>

    <!-- Logo + Running Text -->
    <div class="flex items-center justify-between px-16 py-4 w-full gap-6 relative z-10">
      <div class="running-text-container flex justify-center flex-1 px-6" 
           style="margin-top: 90px; margin-left: 150px; margin-bottom: -40px;">       
        <div class="running-text w-full max-w-[1000px] overflow-hidden relative">
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
    </div>

    <!-- Video + Menu -->
    <div class="flex-1 max-w-6xl mx-auto px-6 py-0 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-20 my-6"
         style="margin-top: -20px;">
      
      <!-- Video Box -->
      <div class="flex-[2] w-full flex justify-center items-center video-box md:mr-8">
        <video class="w-full max-w-3xl rounded-xl shadow-xl object-cover" autoplay muted loop playsinline>
          <source src="/video/kwang_Temporary.mp4" type="video/mp4" />
        </video>
      </div>
      
      <!-- Menu -->
      <div class="flex-[1] flex flex-col items-center gap-6 w-full">
        <a href="/valueProposition" class="neon-btn bg-[#f8f6f0] text-black text-2xl font-sans font-light px-6 py-4 rounded-xl w-full max-w-[300px] whitespace-nowrap flex items-center justify-center">
          ABOUT US
        </a>

        <a href="/home" class="neon-btn bg-[#7d1007] text-white text-2xl font-sans font-light px-6 py-4 rounded-xl w-full max-w-[300px] whitespace-nowrap flex items-center justify-center">
          PROJECTS
        </a>

        <a href="/renewable" class="neon-btn bg-[#7d1007] text-white text-2xl font-sans font-light px-6 py-4 rounded-xl w-full max-w-[300px] whitespace-nowrap flex items-center justify-center">
          FORWARD THINKING
        </a>

        <a href="/products" class="neon-btn bg-[#f8f6f0] text-black text-2xl font-sans font-light px-6 py-4 rounded-xl w-full max-w-[300px] whitespace-nowrap flex items-center justify-center">
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
  min-height: 100vh;
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
  justify-content: flex-start; 
  padding-left: 0px; 
  padding-right: 0; 
}

.running-text { 
  max-width: 1090px; 
  width: auto; 
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

</style>
