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
  espresso: 'https://espresso.kwangunlimit.com/',
  MaeHongSon: 'https://espresso.kwangunlimit.com/',
  maehongson3: 'https://espresso3.kwangunlimit.com/',
  Huaroa: 'https://huaroa.kwangunlimit.com/',
  huaroa2: 'https://huaroa.kwangunlimit.com/',
  huaroa3: 'https://huaroa2.kwangunlimit.com/',
  huaroa4: 'https://huaroa3.kwangunlimit.com/',
  huaroa5: 'https://huaroa4.kwangunlimit.com/',
  huaroa6: 'https://huaroa5.kwangunlimit.com/',
  naresuan_library: 'https://library.kwangunlimit.com/'
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