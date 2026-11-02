<template>
  <div class="carousel-bg">
    <Carousel :items-to-show="1" :wrap-around="true" class="carousel">
      <Slide v-for="(img, i) in pages" :key="i">
        <img :src="img" class="carousel-img" />
      </Slide>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
const props = defineProps<{ pages: string[] }>()
</script>

<style scoped>
.carousel-bg {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
  background: linear-gradient(to bottom, #ebd09e 0%, #251f03 100%);
}
.carousel {
  width: 100%;
  max-width: 1200px;
  height: 900px;
}
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  background: #fff8e8;
}
@media (max-width: 768px) {
  .carousel {
    max-width: 600px;
    height: 400px;
  }
}
</style>
