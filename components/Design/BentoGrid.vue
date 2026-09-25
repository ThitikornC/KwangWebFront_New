<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  cols: { type: [Number, String], default: 3 },
  gap: { type: [Number, String], default: 6 }
})

const gridClass = computed(() => {
  // map to explicit Tailwind classes so JIT picks them up
  const cols = Number(props.cols || 3);
  const gap = Number(props.gap || 6);
  const colClass = cols === 1 ? 'grid-cols-1' : cols === 2 ? 'sm:grid-cols-2 lg:grid-cols-2' : cols === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'
  const gapClass = gap === 2 ? 'gap-2' : gap === 4 ? 'gap-4' : gap === 6 ? 'gap-6' : gap === 8 ? 'gap-8' : 'gap-6'
  return `grid ${colClass} ${gapClass}`
})
</script>

<template>
  <div :class="gridClass">
    <slot />
  </div>
</template>

<style scoped>
/* BentoGrid intentionally uses a small set of explicit classes for Tailwind JIT friendliness */
</style>
