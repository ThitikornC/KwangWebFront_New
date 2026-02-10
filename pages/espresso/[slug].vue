<template>
  <div class="w-screen h-screen">
    <iframe v-if="url" :src="url" class="w-full h-full border-0" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const targets: Record<string, string> = {
  espresso_pharmacy: 'https://my.spline.design/espresopharmacy-a21edee004531a425af1c2768331add8/',
  espresso_human: 'https://my.spline.design/espresohumen-dde33c067dcf5aa8cf10d9d16cfe66b2/',
  espresso: 'https://huaroa-production.up.railway.app/',
  MaeHongSon: 'https://huaroa-production.up.railway.app/',
  Huaroa: 'https://espressohuaroa-production.up.railway.app/',
  huaroa2: 'https://espressohuaroa-production.up.railway.app/',
  huaroa3: 'https://espressohuaroa2-production.up.railway.app/',
  huaroa4: 'https://espressohuaroa3-production.up.railway.app/',
  huaroa5: 'https://espressohuaroa4-production.up.railway.app/',
  huaroa6: 'https://espressohuaroa5-production.up.railway.app/',
  naresuan_library: 'https://momaylib-production.up.railway.app/'
}
const url = computed(() => targets[String(route.params.slug)])

onMounted(() => {
  if (!url.value) {
    router.replace('/')
  }
})
</script>