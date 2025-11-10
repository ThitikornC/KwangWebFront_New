<script setup lang="ts">
import { ref } from 'vue';
useSeoMeta({
  title: 'Company Profile',
  ogTitle: 'Company Profile',
  description: 'Welcome to New ERA ! Kwang unlimit',
  ogDescription: 'Welcome to New ERA ! Kwang unlimit',
  ogImage: '/kwang_logo2.png'
})
definePageMeta({
    layout: 'custom'
})
</script>
<template>
  <div>
    <ProfileTarget/>
    <ProfilePartner id="partner"/>
  </div>
</template>