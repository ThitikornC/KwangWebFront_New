<script setup>
import BentoGrid from '~/components/Design/BentoGrid.vue';
import SoftButton from '~/components/SoftButton.vue';
</script>

<template>
  <section class="w-full flex flex-col items-center pb-10 sm:px-10 gap-6">
    <div class="w-full max-w-[1200px]">
      <h2 class="text-topic font-thai mb-4 text-white">สินค้าอื่นๆ</h2>
      <BentoGrid cols="4" gap="4">
        <div v-for="i in 8" :key="i" class="soft-card p-4">
          <div class="w-full h-36 bg-graylight/20 rounded-md mb-3 flex items-center justify-center">
            <img src="/Image.png" alt="placeholder" class="object-contain h-full" />
          </div>
          <div class="text-sm font-medium text-white">ชื่อสินค้า ตัวอย่าง</div>
          <div class="text-sm text-graylight">ราคา 0 บาท</div>
          <div class="pt-2">
            <SoftButton>ดูรายละเอียด</SoftButton>
          </div>
        </div>
      </BentoGrid>
    </div>
  </section>
</template>