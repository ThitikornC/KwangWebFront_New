<template>
  <div class="root-bg p-8 min-h-screen">
    <div class="scroll-reveal flex justify-center flex-1 px-[clamp(1rem,3vw,1.5rem)] mt-[clamp(4rem,10vw,5.625rem)] mb-[clamp(2rem,4vw,3rem)]">
      <div class="running-text w-full max-w-[min(1200px,95vw)] overflow-hidden relative text-[clamp(0.875rem,1.5vw,1.25rem)] whitespace-nowrap">
        <div class="marquee">
          <div class="marquee-content">
            <span>Espresso Platform</span>
            <span>Smart Classroom</span>
          </div>
          <div class="marquee-content">
            <span>Espresso Platform</span>
            <span>Smart Classroom</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Parent box styled like the child cards (group header) -->
    <div class="tree-container">
      <div class="tree-wrapper">
        <!-- Parent Node -->
        <div class="tree-parent">
          <div class="neon-btn spline-link-card flow-card parent-box">
            <div class="card-content parent-card-content">
              <div class="parent-title">Usernumber : 001</div>
              <div class="parent-sub">เทศบาลตำบลหัวรอ</div>
              <div class="parent-meta">Contractnumber :</div>
              <div class="parent-meta">Date Installed : 1-11-25</div>
              <div class="parent-meta">Expiration Date : 1-12-25</div>
            </div>
          </div>
        </div>

        <!-- Child Nodes -->
        <div class="tree-children">
          <div @click="openProject('huaroa1')" class="neon-btn spline-link-card flow-card child-card">
            <div class="card-content">
              <img src="/ESPRESSO_logo.png" alt="Huaroa 1" class="w-12 h-12 object-contain" />
              <span class="font-thai text-sm">เทศบาลหัวรอ 1</span>
            </div>
          </div>

          <div @click="openProject('huaroa2')" class="neon-btn spline-link-card flow-card child-card">
            <div class="card-content">
              <img src="/ESPRESSO_logo.png" alt="Huaroa 2" class="w-12 h-12 object-contain" />
              <span class="font-thai text-sm">เทศบาลหัวรอ 2</span>
            </div>
          </div>

          <div @click="openProject('huaroa3')" class="neon-btn spline-link-card flow-card child-card">
            <div class="card-content">
              <img src="/ESPRESSO_logo.png" alt="Huaroa 3" class="w-12 h-12 object-contain" />
              <span class="font-thai text-sm">เทศบาลหัวรอ 3</span>
            </div>
          </div>

          <div @click="openProject('huaroa4')" class="neon-btn spline-link-card flow-card child-card">
            <div class="card-content">
              <img src="/ESPRESSO_logo.png" alt="Huaroa 4" class="w-12 h-12 object-contain" />
              <span class="font-thai text-sm">เทศบาลหัวรอ 4</span>
            </div>
          </div>

          <div @click="openProject('huaroa5')" class="neon-btn spline-link-card flow-card child-card">
            <div class="card-content">
              <img src="/ESPRESSO_logo.png" alt="Huaroa 5" class="w-12 h-12 object-contain" />
              <span class="font-thai text-sm">เทศบาลหัวรอ 5</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PDF download removed -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

const projectLinks: Record<string, string> = {
  huaroa1: '/espresso/Huaroa',
  huaroa2: '/espresso/huaroa3',
  huaroa3: '/espresso/huaroa4',
  huaroa4: '/espresso/huaroa5',
  huaroa5: '/espresso/huaroa6'
}



function openProject(key: string) {
  const url = projectLinks[key]
  if (url) window.open(url, '_blank')
}

onMounted(() => {
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
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })
})
</script>

<style scoped>
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
  padding: 0 6px;
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
  font-size: 13px;
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
/* Flow column styles */
.flow-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
  padding-top: 6px;
}
.card-row {
  display: flex;
  justify-content: center;
  width: 100%;
}
.flow-card {
  width: 320px;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  border-radius: 10px;
}
/* arrows removed - keep styles if needed later */
.arrow { display: none; }

/* Tree Structure Styles */
.tree-container { 
  display: flex; 
  justify-content: center; 
  margin-top: 20px;
  padding: 20px 20px 40px;
}

.tree-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tree-parent {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
}

.tree-children {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-left: 40px;
}

.child-card {
  cursor: pointer;
}

/* Parent header */
.parent-box { 
  width: 320px; 
  height: auto; 
  padding: 16px 20px; 
  border-radius: 10px;
  border: 2px solid #74640a;
}
.parent-card-content { 
  flex-direction: column; 
  align-items: flex-start; 
  gap: 4px; 
}
.parent-title { font-weight: 800; font-size: 18px; }
.parent-sub { font-weight: 700; font-size: 16px; }
.parent-meta { font-size: 14px; color: #2b2b2b; line-height: 1.4; }

/* compact logo inside cards */
.card-content img { width: 40px !important; height: 40px !important; }
.card-content span { font-size: 15px; font-weight: 600; }

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
  .tree-container {
    padding: 15px 10px;
  }
  .tree-parent {
    margin-bottom: 24px;
  }
  .tree-children {
    gap: 12px;
    padding-left: 20px;
  }
  .parent-box {
    width: 280px;
    padding: 12px 14px;
  }
  .parent-title { font-size: 15px; }
  .parent-sub { font-size: 14px; }
  .parent-meta { font-size: 12px; }
  .flow-card {
    width: 260px;
    height: 52px;
  }
  .card-content img {
    width: 32px !important;
    height: 32px !important;
  }
  .card-content span {
    font-size: 13px;
  }
}
.flipbook-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 20px;
  overflow: visible;
  background: transparent !important;
}
.flipbook {
  width: 100%;
  max-width: 600px;
  height: 450px;
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
    height: 200px;
    max-width: 300px;
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
