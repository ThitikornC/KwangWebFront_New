<template>
  <div class="w-screen h-screen">
    <iframe v-if="url" :src="url" class="w-full h-full border-0"></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, navigateTo } from '#imports'

const route = useRoute()
const slug = String(route.params.slug || '')

const targets: Record<string, string> = {
  espresso_pharmacy: 'https://my.spline.design/espresopharmacy-a21edee004531a425af1c2768331add8/',
  espresso_human: 'https://my.spline.design/espresohumen-dde33c067dcf5aa8cf10d9d16cfe66b2/',
  espresso: 'https://huaroa-production.up.railway.app/',
  MaeHongSon: 'https://huaroa-production.up.railway.app/',
  maehongson3: 'https://espressotemplate-production-cf70.up.railway.app/',
  Huaroa: 'https://espressohuaroa-production.up.railway.app/',
  huaroa2: 'https://espressohuaroa-production.up.railway.app/',
  huaroa3: 'https://espressohuaroa2-production.up.railway.app/',
  huaroa4: 'https://espressohuaroa3-production.up.railway.app/',
  huaroa5: 'https://espressohuaroa4-production.up.railway.app/',
  huaroa6: 'https://espressohuaroa5-production.up.railway.app/',
  // ── 5 ศูนย์ในหน้า City — slug อ่านง่ายเป็นภาษาอังกฤษ ──
  Huaroi1: 'https://espressohuaroa-production.up.railway.app/',       // หัวรอ 1
  Huaroi2: 'https://espresso2-production.up.railway.app/',            // หัวรอ 2
  Srakhlo1: 'https://espressohuaroa2-production.up.railway.app/',     // สระโคล่ 1
  Srakhlo2: 'https://espresso2-production-1891.up.railway.app/',      // สระโคล่ 2
  Mahawanaram: 'https://espressohuaroa3-production.up.railway.app/',  // มหาวนาราม
  naresuan_library: 'https://momaylib-production.up.railway.app/'
}

const url = ref<string | null>(null)

onMounted(async () => {
  // Try backend lookup first (if /api/espresso exists and returns list)
  try {
    const res: any = await $fetch('/api/espresso')
    if (res && res.success && Array.isArray(res.list)) {
      const found = res.list.find((l: any) => {
        const s = slug.toLowerCase()
        return (String(l.slug || '').toLowerCase() === s) || (String(l.dbSlug || '').toLowerCase() === s) || (String(l.name || '').toLowerCase() === s) || (String(l.url || '').toLowerCase().endsWith('/' + s))
      })
      if (found && found.deployedUrl) {
        url.value = String(found.deployedUrl)
        return
      }
    }
  } catch (err) {
    // ignore and fallback to local targets
    console.warn('espresso lookup failed:', err)
  }

  // fallback to local mapping
  url.value = targets[slug] || targets[slug.toLowerCase()] || null
  if (!url.value) await navigateTo('/', { replace: true })
})
</script>