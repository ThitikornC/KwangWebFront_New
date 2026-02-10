<script setup lang="ts">
import { ref } from 'vue';
useSeoMeta({
  title: 'Company Profile',
  ogTitle: 'Company Profile',
  description: 'Welcome to New ERA ! Kwang unlimit',
  ogDescription: 'Welcome to New ERA ! Kwang unlimit',
  ogImage: '/kwang_logo2.png'
});
</script>

<template>
  <!-- ✅ เพิ่ม root-bg เข้าไป -->
  <div class="root-bg">
    <ProfileSolution id="solution" />
  </div>
</template>

<style scoped>


.root-bg {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  /* gradient หลัก */
  background: linear-gradient(to bottom, #ebd09e 0%, #251f03 100%);
}

/* เลเยอร์ ::before สำหรับ radial gradient */
.root-bg::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: -1;
  background: radial-gradient(circle at 30% 40%, #ebd09e, #251f03);
  opacity: 0.6; /* ปรับให้ซ้อนกับพื้นหลังได้สวย */
  animation: floatBg 30s linear infinite;
}

/* เลเยอร์ ::after สามารถลอยอีกชั้นหรือเอาออกก็ได้ */
.root-bg::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: -1;
  background: linear-gradient(to bottom, #ebd09e 0%, #251f03 100%);
  opacity: 0.3;
  animation: floatBg 30s linear infinite;
}

@keyframes floatBg {
  0% { transform: translateY(0); }
  50% { transform: translateY(20px); }
  100% { transform: translateY(0); }
}

</style>
