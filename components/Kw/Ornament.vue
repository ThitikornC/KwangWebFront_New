<!--
  KwOrnament — ลายคั่นหน้าแบบลายเส้นแกะโลหะ (engraving) ให้เข้ากับภาพพื้นหลังยุค Enlightenment
  วาดเป็น SVG เส้นทองบาง ๆ ตรงกลางเป็นเครื่องมือดาราศาสตร์ ขนาบด้วยเส้นยาวสองข้าง

    variant="compass"    เข็มทิศแปดแฉก ในวงแหวนขีดองศา
    variant="armillary"  ทรงกลมดาราศาสตร์ (armillary sphere) วงแหวนเอียงหมุนช้า ๆ

  เส้นลากออกจากกลางไปสองข้างตอนเลื่อนมาถึง (KwShell ใส่ .kw-in ให้ลูกชั้นแรกของ main)
-->
<template>
  <div class="orn" :class="`orn--${variant}`" aria-hidden="true">
    <svg viewBox="0 0 1200 140" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient :id="`ornFadeL-${uid}`" x1="0" x2="1">
          <stop offset="0" stop-color="currentColor" stop-opacity="0" />
          <stop offset="1" stop-color="currentColor" stop-opacity="0.85" />
        </linearGradient>
        <linearGradient :id="`ornFadeR-${uid}`" x1="0" x2="1">
          <stop offset="0" stop-color="currentColor" stop-opacity="0.85" />
          <stop offset="1" stop-color="currentColor" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- เส้นขนาบสองข้าง: เส้นคู่บาง มีขีดข้าวหลามตัดกับจุดแดงคั่น -->
      <g class="orn__rule orn__rule--l">
        <line x1="40" y1="70" x2="500" y2="70" :stroke="`url(#ornFadeL-${uid})`" />
        <line x1="180" y1="76" x2="500" y2="76" :stroke="`url(#ornFadeL-${uid})`" stroke-width="0.6" />
        <path d="M430 70 l8 -5 8 5 -8 5 z" class="orn__fill" />
        <circle cx="506" cy="70" r="3.4" class="orn__red" />
      </g>
      <g class="orn__rule orn__rule--r">
        <line x1="700" y1="70" x2="1160" y2="70" :stroke="`url(#ornFadeR-${uid})`" />
        <line x1="700" y1="76" x2="1020" y2="76" :stroke="`url(#ornFadeR-${uid})`" stroke-width="0.6" />
        <path d="M754 70 l8 -5 8 5 -8 5 z" class="orn__fill" />
        <circle cx="694" cy="70" r="3.4" class="orn__red" />
      </g>

      <!-- ── เข็มทิศ ── -->
      <g v-if="variant === 'compass'" class="orn__center" transform="translate(600 70)">
        <g class="orn__spin">
          <circle r="60" stroke-dasharray="1.5 4" />
          <circle r="54" />
          <!-- ขีดองศารอบวง ทุก 10° ขีดยาวทุก 45° -->
          <line v-for="a in TICKS" :key="a" :x1="0" :y1="-54" :x2="0" :y2="a % 45 === 0 ? -46 : -50" :transform="`rotate(${a})`" />
        </g>
        <circle r="36" stroke-width="0.7" />
        <!-- แฉกทแยงสั้น -->
        <g v-for="a in [45, 135, 225, 315]" :key="`d${a}`" :transform="`rotate(${a})`">
          <path d="M0 -30 L5 -5 L0 0 Z" class="orn__fill" />
          <path d="M0 -30 L-5 -5 L0 0 Z" />
        </g>
        <!-- แฉกหลักยาว — ครึ่งหนึ่งถมทึบ อีกครึ่งเป็นเส้น แบบลงเงาในงานแกะ -->
        <g v-for="a in [0, 90, 180, 270]" :key="`m${a}`" :transform="`rotate(${a})`">
          <path d="M0 -58 L8 -8 L0 0 Z" class="orn__fill" />
          <path d="M0 -58 L-8 -8 L0 0 Z" />
        </g>
        <circle r="4.5" class="orn__red" />
        <text y="-66" class="orn__n">N</text>
      </g>

      <!-- ── ทรงกลมดาราศาสตร์ ── -->
      <g v-else class="orn__center" transform="translate(600 66)">
        <!-- ขาตั้ง -->
        <path d="M0 58 V66 M-18 70 H18 M-12 66 H12" />
        <circle r="56" stroke-dasharray="1.5 4" />
        <circle r="50" />
        <g class="orn__tilt">
          <ellipse rx="50" ry="15" />
          <ellipse rx="50" ry="15" transform="rotate(-24)" class="orn__band" />
          <ellipse rx="15" ry="50" transform="rotate(24)" />
          <ellipse rx="34" ry="50" transform="rotate(24)" stroke-width="0.6" />
          <!-- แกนหมุน -->
          <line x1="0" y1="-66" x2="0" y2="66" transform="rotate(24)" />
        </g>
        <circle r="7" class="orn__fill" />
        <circle r="3" class="orn__red" />
        <circle cx="0" cy="-66" r="2.6" class="orn__red" transform="rotate(24)" />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'compass' | 'armillary' }>(), { variant: 'compass' })

const TICKS = Array.from({ length: 36 }, (_, i) => i * 10)
// id ของ gradient ต้องไม่ซ้ำกันเมื่อมีลายหลายอันในหน้าเดียว
const uid = Math.random().toString(36).slice(2, 8)
</script>

<style scoped>
.orn {
  color: var(--gold, #c2a468);
  margin: clamp(38px, 6vw, 84px) auto 0;
  max-width: 1100px;
}
.orn svg { display: block; width: 100%; height: auto; overflow: visible; }
.orn :is(line, circle, ellipse, path) { fill: none; stroke: currentColor; stroke-width: 1; }
.orn .orn__fill { fill: currentColor; stroke: none; }
.orn .orn__red { fill: var(--red, #a01c24); stroke: none; }
.orn .orn__band { stroke-width: 3.2; stroke-opacity: 0.55; }
.orn__n {
  fill: currentColor; stroke: none;
  font-family: 'Playfair Display', Georgia, serif; font-size: 13px; font-style: italic;
  text-anchor: middle;
}

/* เส้นขนาบลากออกจากกลาง ตัวกลางค่อย ๆ ปรากฏ — รอ .kw-in จาก KwShell */
.orn__rule { transition: transform 1.3s cubic-bezier(0.65, 0, 0.35, 1) 0.15s, opacity 0.8s ease 0.15s; }
.orn__rule--l { transform-origin: 506px 70px; }
.orn__rule--r { transform-origin: 694px 70px; }
.orn__center { transition: opacity 0.9s ease; }
[data-kw-reveal]:not(.kw-in) .orn__rule { transform: scaleX(0); opacity: 0; }
[data-kw-reveal]:not(.kw-in) .orn__center { opacity: 0; }

/* หมุนช้ามาก ให้พอรู้สึกว่ามีชีวิต */
.orn__spin { animation: ornSpin 90s linear infinite; }
.orn__tilt { animation: ornRock 9s ease-in-out infinite alternate; }
@keyframes ornSpin { to { transform: rotate(360deg); } }
@keyframes ornRock { from { transform: rotate(-8deg); } to { transform: rotate(8deg); } }

@media (prefers-reduced-motion: reduce) {
  .orn__spin, .orn__tilt { animation: none; }
}
</style>
