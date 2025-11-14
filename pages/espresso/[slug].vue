<template>
  <div class="w-screen h-screen">
    <iframe v-if="url" :src="url" class="w-full h-full border-0"></iframe>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const targets: Record<string, string> = {
  espresso_pharmacy: 'https://my.spline.design/espresopharmacy-a21edee004531a425af1c2768331add8/',
  espresso_human: 'https://my.spline.design/espresohumen-dde33c067dcf5aa8cf10d9d16cfe66b2/',
  espresso: 'https://huaroa-production.up.railway.app/'
}
const url = targets[String(route.params.slug)]
if (!url) await navigateTo('/', { replace: true })
</script>