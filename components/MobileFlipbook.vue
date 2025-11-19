<template>
  <div class="mobile-flipbook">
    <div class="page-wrapper">
      <img :src="pages[currentPage]" class="page-img" alt="page" @touchstart="handleTouchStart" @touchend="handleTouchEnd" />
    </div>
    <div class="controls" v-if="false">
      <!-- ปุ่มถูกซ่อนไว้ -->
      <button @click="goPrev" :disabled="currentPage === 0">Prev</button>
      <span>{{ currentPage + 1 }} / {{ pages.length }}</span>
      <button @click="goNext" :disabled="currentPage === pages.length - 1">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
const props = defineProps<{ pages: string[] }>()
const currentPage = ref(0)
let touchStartX = 0
let touchEndX = 0
const handleTouchStart = (e: TouchEvent) => {
  touchStartX = e.changedTouches[0].screenX
}
const handleTouchEnd = (e: TouchEvent) => {
  touchEndX = e.changedTouches[0].screenX
  if (touchEndX < touchStartX - 40 && currentPage.value < props.pages.length - 1) {
    currentPage.value++
  } else if (touchEndX > touchStartX + 40 && currentPage.value > 0) {
    currentPage.value--
  }
}
</script>

<style scoped>
.mobile-flipbook {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.page-wrapper {
  width: 100%;
  max-width: 400px;
  height: 60vw;
  max-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff8e8;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin-bottom: 16px;
}
.page-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  touch-action: pan-y;
}
.controls {
  display: none;
}
</style>
