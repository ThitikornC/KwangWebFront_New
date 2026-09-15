<script setup>
import { ref, onMounted } from 'vue';
import { dataProductStore } from '~/store/product-store';
import { storeToRefs } from 'pinia';
const { BannerProduct } = storeToRefs(dataProductStore());
const currentImageIndex = ref(0);
const startImageRotation = () => {
  setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % BannerProduct.value.length;
  }, 4000);
}; 
const loadBanner = async () =>{
  // try {
  //       const response = await axios.get(`${runtimeConfig.public.apiURL}/products/all`);
  //       products.value = response.data
  //       isLoadingCarddata.value = true;
        
  //   } catch (error) {
  //       console.error('Error fetching CCTV product data:', error);
  //       throw error;
  //   }
}
onMounted(() => {
  startImageRotation();
});
</script>
<template>
  <section class="relative w-full h-64 overflow-hidden rounded-lg card-hero" aria-label="Promotion banners">
    <div class="absolute inset-0 w-full h-full">
      <img
        v-for="(banner, index) in BannerProduct"
        :key="index"
        :src="banner.image"
        :alt="banner.alt || 'Promotion Banner'"
        :aria-hidden="currentImageIndex !== index"
        :class="[
          'absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700',
          currentImageIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
        ]"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
    </div>

    <!-- Dots -->
    <div class="absolute left-1/2 transform -translate-x-1/2 bottom-3 flex gap-2 z-20">
      <button
        v-for="(_, i) in BannerProduct"
        :key="i"
        @click="currentImageIndex = i"
        :aria-label="`Show banner ${i + 1}`"
        :class="['w-3 h-3 rounded-full transition-all', currentImageIndex === i ? 'bg-reddeep scale-110' : 'bg-white/30']"
      ></button>
    </div>
  </section>
</template>



<style scoped>
.carousel-fade-enter-active, .carousel-fade-leave-active {
  transition: opacity 1s;
}
.carousel-fade-enter, .carousel-fade-leave-to /* .carousel-fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
