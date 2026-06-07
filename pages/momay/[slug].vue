<template>
  <div class="w-screen h-screen">
    <iframe v-if="url" :src="url" class="w-full h-full border-0"></iframe>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ name: 'momay-slug' })
const route = useRoute()
const targets: Record<string, string> = {
  momay_BanKlongResort: 'https://momaysukhothai.web.app/',
  wongpanit_sukhothai: 'https://wongpanit-sukhothai.web.app/',
  hospital_Noenmaprang: 'https://momayretro-production.up.railway.app/',
  hospital_Noenmaprang_v1: 'https://momay-4a073.web.app/',
  clinic: 'https://momayclinic.web.app/',
  momay02:'https://momay02-production.up.railway.app/',
  momayBUU: 'https://momaybuu-production.up.railway.app/',
  naresuan_library: 'https://momaylib-production-6b26.up.railway.app/',
  Momay_pharmacy: 'https://my.spline.design/espresopharmacy-a21edee004531a425af1c2768331add8/',
  Mpmay_human: 'https://my.spline.design/espresohumen-dde33c067dcf5aa8cf10d9d16cfe66b2/',
  '99/99': 'https://momaydoc-production.up.railway.app/',
  momay_88_31_khun_deer: 'https://momaydeer-production.up.railway.app/',
  momay_khun_sand: 'https://momaysand-production.up.railway.app/',
  momay_khun_nak: 'https://momaynug-production.up.railway.app/',
  momaynew: 'https://momaynew-production.up.railway.app/',
  momay_bangkrong: 'https://momaybangkrong-production.up.railway.app/',
  demo: 'https://momaydemo-production.up.railway.app/',
  dashboard: 'https://dasaut-production.up.railway.app/',
  momay_khun_taeng: 'https://momaytang-production.up.railway.app/',
  momay_khun_eat: 'https://momayeat-production.up.railway.app/',
  momay_mom: 'https://momaymom-production.up.railway.app/',
  momay_kae: 'https://momaykae-production.up.railway.app/',
  MomayHMV1: 'https://resplendent-charm-productionhm.up.railway.app/V1',
  MomayGreedy: 'https://layergreedy-production.up.railway.app/',
  MomayDP: 'https://layerdp-production.up.railway.app/',
  MomayModel: 'https://momayhmmodel-production.up.railway.app/model',
  MomayChamp: 'https://momaychamp-production.up.railway.app/',
  MomayHMModel: 'https://momayhmmomaymodel-production.up.railway.app/momaymodel'
}
const url = targets[String(route.params.slug)]
if (!url) await navigateTo('/', { replace: true })
</script>
