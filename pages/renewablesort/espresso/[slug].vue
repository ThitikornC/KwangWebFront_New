<template>
  <div class="w-screen h-screen">
    <iframe v-if="url" :src="url" class="w-full h-full border-0"></iframe>
  <template>
    <div class="w-screen h-screen">
      <iframe v-if="url" :src="url" class="w-full h-full border-0"></iframe>
    </div>
  </template>

  <script setup lang="ts">
  const route = useRoute()
  const key = String(route.params.slug || '')

  // local fallback mapping (keeps previous behavior when backend missing)
  const localTargets: Record<string, string> = {
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

  let url: string | null = null

  // Resolve deployed URL from backend `/api/espresso` by matching slug/dbSlug/name/url
  try {
    const res = await $fetch('/api/espresso')
    if (res && res.success && Array.isArray(res.list)) {
      const list = res.list
      const found = list.find((lead: any) => {
        const slugLower = key.toLowerCase()
        if (!lead) return false
        if (lead.slug && String(lead.slug).toLowerCase() === slugLower) return true
        if (lead.dbSlug && String(lead.dbSlug).toLowerCase() === slugLower) return true
        if (lead.name && String(lead.name).toLowerCase() === slugLower) return true
        if (lead.url && String(lead.url).toLowerCase().endsWith('/' + slugLower)) return true
        if (lead.runNumber && String(lead.runNumber) === key) return true
        return false
      })
      if (found && found.deployedUrl) {
        url = String(found.deployedUrl)
      }
    }
  } catch (e) {
    // ignore backend errors and fall back to local map
    console.warn('Failed to fetch /api/espresso, falling back to localTargets', e)
  }

  // fallback to static targets if backend didn't provide a deployed URL
  if (!url) {
    const candidate = localTargets[key]
    if (candidate) {
      if (/^https?:\/\//i.test(candidate)) {
        url = candidate
      } else {
        try {
          const parts = candidate.split('/')
          if (parts.length > 0) {
            parts[parts.length - 1] = slugify(key)
            url = parts.join('/')
          } else {
            url = candidate
          }
        } catch (e) {
          url = candidate
        }
      }
    }
  }

  if (!url) await navigateTo('/', { replace: true })
  </script>

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