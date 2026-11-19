<!--
  ESPRESSO X สังคม — /EspressoSocial
  หน้าสำหรับแชร์ เปิดมาเจอการ์ดลิงก์ 2 ใบ (Enlightenment / Student)
-->
<template>
  <KwShell active="forward" eyebrow="ESPRESSO" title="ESPRESSO X สังคม">
    <section class="sect">
      <KwLinkCards :items="CARDS" />
    </section>
  </KwShell>
</template>

<script setup lang="ts">
import type { KwLinkCard } from '~/components/Kw/LinkCards.vue'

definePageMeta({ layout: false })

useSeoMeta({
  title: 'ESPRESSO X สังคม — KWANG UNLIMITED',
  description: 'ESPRESSO X สังคม — Espresso Enlightenment และ Espresso Student',
  ogTitle: 'ESPRESSO X สังคม — KWANG UNLIMITED',
  ogImage: '/ESPRESSO_logo.png',
})

const CARDS: KwLinkCard[] = [
  { label: 'Espresso Enlightenment', logo: '/ESPRESSO_logo.png', href: '/espresso/EspressoEnlightenment', newTab: true },
  { label: 'Espresso Student', logo: '/ESPRESSO_logo.png', href: '/espresso/EspressoStudent', newTab: true },
]
</script>

<style scoped>
.sect { margin-top: clamp(24px, 4vw, 48px); }
</style>
