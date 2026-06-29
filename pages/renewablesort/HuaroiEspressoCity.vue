<template>
  <!-- WeatherSky wrapper: ท้องฟ้าไดนามิกตามเวลา/อากาศจริงของพิษณุโลก -->
  <div
    class="force-landscape relative w-full h-[100dvh] overflow-hidden"
    :style="{ background: sky, transition: 'background 2s ease' }"
  >
    <!-- ภาพเมือง — เต็มจอ (cover) -->
    <div
      class="absolute inset-0 z-[1] bg-center bg-cover bg-no-repeat pointer-events-none"
      :style="{ backgroundImage: `url('${BG_CITY}')` }"
    />

    <!-- ปุ่มเข้าแต่ละศูนย์ — วางทับตำแหน่งตึก (top/left เป็น %) -->
    <div
      v-for="center in centers"
      :key="center.link"
      class="center-anchor"
      :style="{ top: center.top, left: center.left, zIndex: center.z ?? 20 }"
    >
      <button
        type="button"
        class="center-btn"
        @click="openLink(center.link)"
      >
        {{ center.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// พื้นหลังเมือง — ใช้ WebP (เล็กกว่า PNG ~92%) เพื่อโหลดไว
const BG_CITY = '/espresso/Esprestopia_main.webp'

// preload รูป BG ตั้งแต่ต้น + ความสำคัญสูง ให้ขึ้นเร็วที่สุด
useHead({
  link: [
    { rel: 'preload', as: 'image', href: BG_CITY, fetchpriority: 'high' },
  ],
})

// ── 3 ศูนย์ + URL + ตำแหน่งปุ่มบนตึก (top/left เป็น % ปรับให้ตรงตึกได้) ──
const centers = [
  { name: 'ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ', link: '/espresso/Huaroa', top: '50%', left: '31.5%', z: 40 },
  { name: 'ศูนย์พัฒนาเด็กเล็กบ้านสระโคล่', link: '/espresso/huaroa3', top: '13%', left: '30.5%' },
  { name: 'ศูนย์พัฒนาเด็กเล็กมหาวนาราม', link: '/espresso/huaroa4', top: '50%', left: '69%' },
]

const openLink = (link) => {
  if (!link) return
  // Same-tab navigation so the browser Back button works
  if (/^https?:\/\//i.test(link)) navigateTo(link, { external: true })
  else navigateTo(link)
}

// ── Weather sky (ไดนามิกตามเวลา/อากาศจริงของพิษณุโลก) ──
const LAT = 16.8211
const LON = 100.2659
const DIRECT_URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
  `&current=temperature_2m,weather_code,is_day&timezone=Asia%2FBangkok`

const SKY = {
  dawn: {
    clear: 'linear-gradient(180deg,#fbc18b 0%,#f6d99f 42%,#cfe7f5 100%)',
    cloud: 'linear-gradient(180deg,#c8b6a8 0%,#d6c9bd 45%,#d3dde0 100%)',
    rain: 'linear-gradient(180deg,#8c8a93 0%,#9ea3ab 45%,#b3bcc2 100%)',
  },
  day: {
    clear: 'linear-gradient(180deg,#5fa8e0 0%,#8fc7e8 45%,#cfe7f5 100%)',
    cloud: 'linear-gradient(180deg,#9bb0bd 0%,#b6c6cf 45%,#d3dde0 100%)',
    rain: 'linear-gradient(180deg,#6b727a 0%,#878d95 45%,#a7adb3 100%)',
  },
  dusk: {
    clear: 'linear-gradient(180deg,#f6955b 0%,#ea6f7e 45%,#6b4e8e 100%)',
    cloud: 'linear-gradient(180deg,#b5887e 0%,#9e7e8c 45%,#5c5273 100%)',
    rain: 'linear-gradient(180deg,#6a5f63 0%,#5d5560 45%,#454258 100%)',
  },
  night: {
    clear: 'linear-gradient(180deg,#070b1f 0%,#121a38 50%,#26304f 100%)',
    cloud: 'linear-gradient(180deg,#11131c 0%,#1c2030 50%,#2b313f 100%)',
    rain: 'linear-gradient(180deg,#0a0c12 0%,#15181f 50%,#242832 100%)',
  },
}

const weatherCategory = (code) => {
  if (code == null) return 'clear'
  if (code <= 1) return 'clear'
  if (code <= 3) return 'cloudy'
  if (code === 45 || code === 48) return 'fog'
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rain'
  if (code >= 71 && code <= 86) return 'snow'
  if (code >= 95) return 'storm'
  return 'cloudy'
}
const groupOf = (category) => {
  if (category === 'rain' || category === 'storm') return 'rain'
  if (category === 'clear') return 'clear'
  return 'cloud'
}
const bangkokHour = () => {
  try {
    const s = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Bangkok', hour: '2-digit', hourCycle: 'h23',
    }).format(new Date())
    return Number(s)
  } catch {
    return new Date().getHours()
  }
}
const phaseFromHour = (h) => {
  if (h >= 5 && h < 7) return 'dawn'
  if (h >= 7 && h < 16) return 'day'
  if (h >= 16 && h < 19) return 'dusk'
  return 'night'
}

const code = ref(null)
const isDay = ref(1)
const loading = ref(true)
const hour = ref(bangkokHour())

const sky = computed(() => {
  const category = weatherCategory(code.value)
  let phase = phaseFromHour(hour.value)
  if (!loading.value && isDay.value === 0 && phase === 'day') phase = 'night'
  const group = groupOf(category)
  return SKY[phase][group]
})

const fetchWeather = async () => {
  try {
    const res = await fetch(DIRECT_URL)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const c = (await res.json()).current || {}
    code.value = c.weather_code
    isDay.value = c.is_day
  } catch (e) {
    console.error('[weather] fetch failed', e)
  } finally {
    loading.value = false
  }
}

let hourTimer = null
let weatherTimer = null

onMounted(() => {
  fetchWeather()
  weatherTimer = setInterval(fetchWeather, 10 * 60 * 1000)
  hourTimer = setInterval(() => { hour.value = bangkokHour() }, 60 * 1000)
})

onBeforeUnmount(() => {
  if (weatherTimer) clearInterval(weatherTimer)
  if (hourTimer) clearInterval(hourTimer)
})
</script>

<style scoped>
/* ตัวยึดตำแหน่งปุ่ม — รับผิดชอบเฉพาะการจัดกลางบนพิกัดตึก (ไม่ทำ animation) */
.center-anchor {
  position: absolute;
  z-index: 20;
  transform: translate(-50%, -50%);
}

/* ปุ่มเข้าศูนย์ — ลอยทับตึก กดเข้าได้ (animation/hover ทำที่ transform ของปุ่มเอง) */
.center-btn {
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 700;
  color: #ffe894;
  background: rgba(50, 22, 9, 0.85);
  border: 2px solid #b5851f;
  border-radius: 10px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45), 0 0 10px rgba(230, 180, 40, 0.25);
  cursor: pointer;
  white-space: nowrap;
  backdrop-filter: blur(2px);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  animation: centerBtnFloat 3s ease-in-out infinite alternate;
  will-change: transform;
}
.center-btn:hover,
.center-btn:focus-visible {
  outline: none;
  border-color: #e6b428;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.55), 0 0 18px rgba(230, 180, 40, 0.55);
  animation-play-state: paused;
  transform: translateY(-3px) scale(1.06);
}
.center-btn:active {
  transform: translateY(-3px) scale(0.98);
}

@keyframes centerBtnFloat {
  0% { transform: translateY(0); }
  100% { transform: translateY(-6px); }
}

@media (max-width: 768px) {
  .center-btn {
    font-size: 11px;
    padding: 6px 10px;
  }
}

/* บังคับแนวนอนบนมือถือ/แท็บเล็ตที่ถือแนวตั้ง — หมุนทั้งหน้า 90° */
@media (orientation: portrait) and (max-width: 1024px) {
  .force-landscape {
    /* สลับด้านกว้าง/สูง แล้วหมุนกลับเข้าจอ */
    width: 100vh;
    height: 100vw;
    transform: rotate(90deg);
    transform-origin: left top;
    position: fixed;
    top: 0;
    left: 100%;
    overflow: hidden;
  }
}
</style>
