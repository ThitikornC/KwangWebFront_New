<!--
  KwLinkCards — แถวการ์ดลิงก์ของหน้าชุด V2 (แทนการ์ดนีออน spline-link-card ของหน้าเดิม)

  ป้ายบนการ์ดใช้ข้อความเดียวกับหน้าเดิมเท่านั้น ไม่แต่งเพิ่ม
  การ์ดแต่ละใบมี href (ลิงก์ธรรมดา / ดาวน์โหลด) หรือ action (เช่น เปิดฟอร์ม ถามรหัสผ่าน) อย่างใดอย่างหนึ่ง
-->
<template>
  <div class="lc">
    <component
      :is="c.href ? 'a' : 'button'"
      v-for="c in items"
      :key="c.label"
      class="lc__card"
      :type="c.href ? undefined : 'button'"
      :href="c.href"
      :download="c.download ? '' : undefined"
      @click="c.action?.()"
    >
      <span class="lc__mark" aria-hidden="true"><img :src="c.logo" alt="" /></span>
      <span class="lc__label font-th">{{ c.label }}</span>
      <svg class="lc__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
        <path v-if="c.download" d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" stroke-linecap="round" stroke-linejoin="round" />
        <path v-else d="M5 12h14m0 0-6-6m6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </component>
  </div>
</template>

<script setup lang="ts">
export type KwLinkCard = {
  label: string
  logo: string
  href?: string
  download?: boolean
  action?: () => void
}
defineProps<{ items: KwLinkCard[] }>()
</script>

<style scoped>
.lc {
  display: grid; gap: clamp(10px, 1.4vw, 16px);
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
}
.lc__card {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 18px;
  font: inherit; text-align: left; text-decoration: none; color: var(--ink);
  background: rgba(251, 247, 238, 0.78);
  border: 1px solid rgba(29, 27, 25, 0.16);
  border-left: 2px solid var(--gold);
  cursor: pointer;
  transition: border-color 0.22s, transform 0.22s, background 0.22s;
}
.lc__card:hover { border-color: var(--gold); background: var(--paper-2); transform: translateY(-2px); }
.lc__mark {
  display: grid; place-items: center; flex: none;
  width: 46px; height: 46px; border-radius: 50%;
  background: var(--paper-2); border: 1px solid rgba(194, 164, 104, 0.7);
}
.lc__mark img { width: 30px; height: 30px; object-fit: contain; }
.lc__label { flex: 1; min-width: 0; overflow-wrap: anywhere; font-family: 'Noto Sans Thai', 'Montserrat', sans-serif; font-size: clamp(15px, 1.35vw, 17px); font-weight: 500; line-height: 1.45; }
.lc__arrow { flex: none; width: 18px; height: 18px; color: var(--red); transition: transform 0.22s; }
.lc__card:hover .lc__arrow { transform: translateX(3px); }
</style>
