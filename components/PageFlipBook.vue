
<template>
  <div ref="wrapper" class="flipbook-pageflip-wrapper">
    <div ref="container" class="flipbook-pageflip" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
// @ts-ignore
import { PageFlip } from 'page-flip'
const props = defineProps<{ pages: string[] }>()
const container = ref<HTMLElement | null>(null)
const wrapper = ref<HTMLElement | null>(null)
let pageFlip: any = null
const currentPage = ref(0)
const totalPages = ref(0)

const flipNext = () => {
  if (pageFlip) {
    pageFlip.flipNext()
  }
}

const flipPrev = () => {
  if (pageFlip) {
    pageFlip.flipPrev()
  }
}

const getCurrentPage = () => currentPage.value
const getTotalPages = () => totalPages.value

defineExpose({
  flipNext,
  flipPrev,
  getCurrentPage,
  getTotalPages,
  currentPage,
  totalPages
})

onMounted(() => {
  if (container.value) {
    pageFlip = new PageFlip(container.value, {
      width: 600,
      height: 800,
      size: 'stretch',
      minWidth: 315,
      minHeight: 420,
      maxWidth: 1200,
      maxHeight: 1600,
      drawShadow: true,
      flippingTime: 700,
      useMouseEvents: true,
      showCover: false,
      mobileScrollSupport: true,
      swipeDistance: 30,
      backgroundColor: 'transparent',
    })
    pageFlip.loadFromImages(props.pages)
    totalPages.value = props.pages.length
    
    pageFlip.on('flip', (e: any) => {
      currentPage.value = e.data
    })

    // ให้ scroll ผ่าน flipbook ได้ ไม่ดักจับ wheel event
    wrapper.value?.addEventListener('wheel', (e: WheelEvent) => {
      window.scrollBy({ top: e.deltaY, behavior: 'auto' })
    }, { passive: true })
  }
})

watch(() => props.pages, (newPages) => {
  if (pageFlip) {
    pageFlip.loadFromImages(newPages)
    totalPages.value = newPages.length
  }
})

onBeforeUnmount(() => {
  if (pageFlip) {
    pageFlip.destroy()
    pageFlip = null
  }
})
</script>

<style scoped>
.flipbook-pageflip-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.flipbook-pageflip {
  width: 100%;
  max-width: 1200px;
  height: 800px;
  margin: 0 auto;
  background: transparent !important;
  border-radius: 0;
  box-shadow: none !important;
  padding: 0 !important;
  border: none !important;
}
.flipbook-pageflip canvas {
  background: transparent !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  display: block;
}
.flipbook-pageflip .stf__block,
.flipbook-pageflip .stf__item,
.flipbook-pageflip .stf__parent,
.flipbook-pageflip .stf__wrapper {
  background: transparent !important;
}
.flipbook-pageflip *,
.flipbook-pageflip *::before,
.flipbook-pageflip *::after {
  background: transparent !important;
  box-shadow: none !important;
}
.flipbook-pageflip .stf__block,
.flipbook-pageflip .stf__item,
.flipbook-pageflip .stf__parent,
.flipbook-pageflip .stf__wrapper {
  background: transparent !important;
}
.flipbook-pageflip *,
.flipbook-pageflip *::before,
.flipbook-pageflip *::after {
  background: transparent !important;
  box-shadow: none !important;
}
@media (max-width: 768px) {
  .flipbook-pageflip {
    max-width: 600px;
    height: 400px;
  }
}

.flipbook-pageflip-wrapper {
  touch-action: pan-y;
}
</style>
