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
  <div class="relative w-full h-64 overflow-hidden">
    <div class="absolute inset-0 w-full h-full">
      <img
        v-for="(banner, index) in BannerProduct"
        :key="index"
        :src="banner.image"
        :class="{ 'opacity-100': currentImageIndex === index, 'opacity-0': currentImageIndex !== index }"
        class="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000"
        alt="Promotion Banner"
      />
    </div>
  </div>
</template>



<style scoped>
.carousel-fade-enter-active, .carousel-fade-leave-active {
  transition: opacity 1s;
}
.carousel-fade-enter, .carousel-fade-leave-to /* .carousel-fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
