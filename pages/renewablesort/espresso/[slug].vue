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

// Perform a tolerant, case-insensitive lookup for the slug so local testing works
const param = String(route.params.slug || '')
const normalizedParam = param.toLowerCase()
const normalizedTargets: Record<string, string> = {}
Object.entries(targets).forEach(([k, v]) => {
  normalizedTargets[k.toLowerCase()] = v
})

// Exceptions: use the original target URL rather than proxy
const exceptions = new Set([
  'espresso_pharmacy',
  'espresso_human',
  'espresso',
  'maehongson',
  'huaroa',
  'huaroa2',
  'huaroa3',
  'huaroa4',
  'huaroa5',
  'huaroa6',
  'naresuan_library'
])

const proxyBase = 'https://www.kwangunlimit.com/espresso'
let url: string | undefined
const key = normalizedParam
const originalTarget = normalizedTargets[key]

if (originalTarget) {
  if (exceptions.has(key)) {
    // For some deployments hosted on Railway we prefer to surface the kwangunlimit proxy URL
    // instead of the raw railway.app host. Detect common railway host and rewrite to proxy.
    try {
      const isRailway = /\.up\.railway\.app/.test(originalTarget)
      if (isRailway) {
        url = `${proxyBase}/${encodeURIComponent(param)}`
      } else {
        // Use original URL for non-railway exceptions
        url = originalTarget
      }
    } catch (e) {
      url = originalTarget
    }
  } else {
    // Use proxy path for other targets (encode slug portion)
    url = `${proxyBase}/${encodeURIComponent(param)}`
  }
}

// If slug is not recognized, go back to the espresso listing (not site root)
if (!url) await navigateTo('/renewablesort/espresso', { replace: true })
</script>