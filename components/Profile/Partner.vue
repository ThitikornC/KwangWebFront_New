<script setup lang="ts">
import { ref, onMounted } from 'vue';
const LogoPartner = ref<string[]>([]);
onMounted(() => {
  LogoPartner.value = [
    '/icon_partner/Schneider_Electric_20071.svg',
    '/icon_partner/longi-solar-logo-vector1.svg',
    '/icon_partner/Hikvision_logo.svg',
    '/icon_partner/Huawei_Standard_logo.svg',
    '/icon_partner/Cisco_logo.svg',
    '/icon_partner/Tasaki_logo.svg',
  ];
});
</script>

<template>
  <div class="w-full flex flex-col items-center font-inter">
    <div class="w-11/12 xl:max-w-[1280px] flex flex-col items-center gap-12 ">
      <div class="flex flex-col items-center">
        <h1 class="pt-12 text-header font-semibold text-reddeep">
          COOPEARATE
        </h1>
        <h2 class="text-topic text-graydeep font-thai">
          ผู้มีส่วนร่วม
        </h2>
      </div>
      <div class="w-full flex flex-col items-center justify-center bg-reddeep h-[200px] rounded-[24px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div class="main w-full h-full flex flex-row items-center justify-center gap-20">
          <div
            x-data="{}"
            x-init="$nextTick(() => {
              let ul = $refs.logos;
              ul.insertAdjacentHTML('afterend', ul.outerHTML);
              ul.nextSibling.setAttribute('aria-hidden', 'true');
            })"
            class="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
          >
            <ul x-ref="logos" class="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
              <li v-for="logo in LogoPartner" :key="logo">
                <img :src="logo" alt="Partner Logo" />
              </li>
              <li v-for="logo in LogoPartner" :key="'clone-' + logo">
                <img :src="logo" alt="Partner Logo" />
              </li>
            </ul>                
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes infinite-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-infinite-scroll {
  animation: infinite-scroll 25s linear infinite;
}
</style>
