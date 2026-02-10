<template>
  <div class="w-screen h-screen">
    <iframe v-if="url" :src="url" class="w-full h-full border-0"></iframe>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ name: 'momay-splat' })
const route = useRoute()
const targets: Record<string, string> = {
  momay_BanKlongResort: 'https://momaysukhothai.web.app/',
  wongpanit_sukhothai: 'https://wongpanit-sukhothai.web.app/',
  hospital_Noenmaprang: 'https://momayretro-production.up.railway.app/',
  hospital_Noenmaprang_v1: 'https://momay-4a073.web.app/',
  clinic: 'https://momayclinic.web.app/',
  momay02:'https://momay02-production.up.railway.app/',
  momayBUU: 'https://momaybuu-production.up.railway.app/',
  naresuan_library: 'https://momaylib-production.up.railway.app/',
  Momay_pharmacy: 'https://my.spline.design/espresopharmacy-a21edee004531a425af1c2768331add8/',
  Mpmay_human: 'https://my.spline.design/espresohumen-dde33c067dcf5aa8cf10d9d16cfe66b2/',
  '99/99': 'https://momaydoc-production.up.railway.app/'
}

const raw = route.params.slug
const slug = Array.isArray(raw) ? raw.join('/') : String(raw)
const url = targets[slug]
if (!url) await navigateTo('/', { replace: true })
</script>
