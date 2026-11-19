<!--
  KwTicker — ตัววิ่งของหน้าชุด V2 แทนป้ายนีออน marquee ของหน้าเดิม
  คำที่วิ่งต้องเป็นคำเดียวกับตัววิ่งของหน้าเดิม
-->
<template>
  <div class="ticker" aria-hidden="true">
    <div class="ticker__track">
      <span v-for="i in 4" :key="i" class="ticker__set">
        <template v-for="w in words" :key="w">
          <b>{{ w }}</b>
          <i>✦</i>
        </template>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ words: string[] }>()
</script>

<style scoped>
.ticker {
  padding: 14px 0;
  border-top: 1px solid rgba(29, 27, 25, 0.14);
  border-bottom: 1px solid rgba(29, 27, 25, 0.14);
  overflow: hidden;
  /* จางที่ปลายทั้งสองข้าง ให้ดูเหมือนวิ่งมาจากนอกจอ */
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.ticker__track { display: flex; width: max-content; animation: kwTicker 34s linear infinite; }
.ticker__set { display: flex; align-items: center; gap: clamp(18px, 3vw, 40px); padding-right: clamp(18px, 3vw, 40px); }
.ticker__set b {
  font-size: clamp(11px, 1.1vw, 14px); font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--ink-soft); white-space: nowrap;
}
.ticker__set i { font-style: normal; color: var(--gold); }
/* เลื่อนไป 25% = 1 ชุดจาก 4 ชุด วนกลับแล้วภาพตรงกันพอดี */
@keyframes kwTicker { to { transform: translateX(-25%); } }

@media (prefers-reduced-motion: reduce) {
  .ticker__track { animation: none; }
}
</style>
