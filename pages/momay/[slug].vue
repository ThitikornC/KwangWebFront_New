<template>
  <div class="w-screen h-screen">
    <iframe v-if="url" :src="url" class="w-full h-full border-0"></iframe>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const targets: Record<string, string> = {
  momay_BanKlongResort: 'https://momaysukhothai.web.app/',
  wongpanit_sukhothai: 'https://wongpanit-sukhothai.web.app/',
  hospital_Noenmaprang: 'https://momay-4a073.web.app/',
  clinic: 'https://momayclinic.web.app/',
  momay02:'https://momay02-production.up.railway.app/'
}
const url = targets[String(route.params.slug)]
if (!url) await navigateTo('/', { replace: true })
</script>
