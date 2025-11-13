<template>
  <div class="w-screen h-screen">
    <iframe src="https://huaroa-production.up.railway.app/" class="w-full h-full border-0"></iframe>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // รีไดเรกต์ไปยังลิงก์ภายนอก
  window.location.href = 'https://huaroa-production.up.railway.app/';
});
</script>