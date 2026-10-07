<script setup lang="ts">
defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' }
})
</script>

<template>
  <button
    class="soft-btn inline-flex items-center justify-center gap-2 font-thai rounded-[14px] transition-transform active:translate-y-0.5"
  >
    <slot />
  </button>
</template>

<style scoped>
.soft-btn{
  @apply px-4 py-3 text-white font-medium; /* base */
  border-radius: 14px;
  box-shadow: 8px 12px 30px rgba(0,0,0,0.35), inset -2px -2px 6px rgba(255,255,255,0.02);
  background: linear-gradient(90deg, rgba(127,24,27,1) 0%, rgba(237,27,46,1) 100%);
}
.soft-btn:hover{
  transform: translateY(-3px) scale(1.01);
}
</style>
