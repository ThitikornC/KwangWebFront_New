<template>
  <div class="w-screen h-screen">
    <iframe src="https://huaroa-production.up.railway.app/" class="w-full h-full border-0" @load="onIframeLoad" @error="onIframeError"></iframe>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

function onIframeLoad() {
  console.log('Iframe loaded successfully');
}

function onIframeError() {
  console.log('Iframe failed to load');
}
</script>