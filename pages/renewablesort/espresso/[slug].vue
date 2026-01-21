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
  huaroa: 'https://huaroa-production.up.railway.app/',
  huaroa2: 'https://espressohuaroa-production.up.railway.app/'
}

function slugify(str: string) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-').replace(/^-+|-+$/g, '')
}

const key = String(route.params.slug || '')
const target = targets[key]
let url: string | null = null

if (target) {
  // external URL -> use as-is
  if (/^https?:\/\//i.test(target)) {
    url = target
  } else {
    // internal path: replace last segment with slugified version of the param
    try {
      const parts = target.split('/')
      if (parts.length > 0) {
        parts[parts.length - 1] = slugify(key)
        url = parts.join('/')
      } else {
        url = target
      }
    } catch (e) {
      url = target
    }
  }
}

if (!url) await navigateTo('/', { replace: true })
</script>