<template>
  <div class="w-screen h-screen">
    <iframe :src="url" class="w-full h-full border-0"></iframe>
  </div>
</template>

<script setup lang="ts">
// หลังบ้านสำหรับควบคุมแอร์ ไม่มีปุ่มบนหน้า momay เข้าโดยพิมพ์ URL เท่านั้น
// รองรับหลายสะกดเพื่อกันพิมพ์ผิด
definePageMeta({
  name: 'settings',
  alias: ['/Settings', '/SETTINGS', '/Setiings', '/setiings']
})

const url = 'https://momaymodelbuu-production.up.railway.app/settings'
</script>
