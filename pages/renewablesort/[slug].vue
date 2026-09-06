<template>
  <div class="w-screen h-screen">
    <iframe v-if="url" :src="url" class="w-full h-full border-0"></iframe>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const targets: Record<string, string> = {
  dashboard: 'https://dashboard-production-2af3.up.railway.app/'
  // เพิ่ม slug อื่น ๆ ได้ที่นี่
}
const url = targets[String(route.params.slug)]
if (!url) await navigateTo('/', { replace: true })
</script>
