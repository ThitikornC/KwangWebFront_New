<template>
  <div class="w-screen h-screen">
    <iframe v-if="url" :src="url" class="w-full h-full border-0"></iframe>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const targets: Record<string, string> = {
  espresso_pharmacy: '/renewablesort/espresso/espresso_pharmacy',
  espresso_human: '/renewablesort/espresso/espresso_human',
  huaroa: 'https://huaroa-production.up.railway.app/'
}
const url = targets[String(route.params.slug)]
if (!url) await navigateTo('/', { replace: true })
</script>