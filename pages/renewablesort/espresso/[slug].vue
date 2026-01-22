#!/usr/bin/env false
<template>
  <div class="w-screen h-screen">
    <iframe v-if="url" :src="url" class="w-full h-full border-0"></iframe>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, navigateTo } from '#imports'

const route = useRoute()
const key = String(route.params.slug || '')
const slugKey = (k => String(k).toLowerCase().trim().replace(/[_\s]+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-+|-+$/g, ''))(key)

const localTargets: Record<string, string> = {
  espresso_pharmacy: '/renewablesort/espresso/espresso_pharmacy',
  espresso_human: '/renewablesort/espresso/espresso_human',
  huaroa: 'https://espressohuaroa-production.up.railway.app/',
  huaroa2: 'https://espressohuaroa-production.up.railway.app/'
}

const url = ref<string | null>(null)

function slugify(str: string) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function resolveUrl() {
  try {
    const res: any = await $fetch('/api/espresso')
    if (res && res.success && Array.isArray(res.list)) {
      const list = res.list
      const slugLower = key.toLowerCase()
      const found = list.find((lead: any) => {
        if (!lead) return false
        if (lead.slug && String(lead.slug).toLowerCase() === slugLower) return true
        if (lead.dbSlug && String(lead.dbSlug).toLowerCase() === slugLower) return true
        if (lead.name && String(lead.name).toLowerCase() === slugLower) return true
        if (lead.url && String(lead.url).toLowerCase().endsWith('/' + slugLower)) return true
        if (lead.runNumber && String(lead.runNumber) === key) return true
        return false
      })
      if (found && found.deployedUrl) {
        url.value = String(found.deployedUrl)
        return
      }
    }
  } catch (e) {
    // ignore
  }

  const candidate = localTargets[slugKey] || localTargets[key]
  if (candidate) {
    if (/^https?:\/\//i.test(candidate)) {
      url.value = candidate
      return
    }
    try {
      const parts = candidate.split('/')
      if (parts.length > 0) {
        parts[parts.length - 1] = slugify(key)
        url.value = parts.join('/')
        return
      }
      url.value = candidate
      return
    } catch (e) {
      url.value = candidate
      return
    }
  }

  await navigateTo('/', { replace: true })
}

onMounted(() => {
  resolveUrl()
})
</script>