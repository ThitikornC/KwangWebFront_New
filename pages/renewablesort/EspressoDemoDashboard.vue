<template>
  <div class="root-bg p-4 sm:p-8 min-h-screen flex items-center justify-center">
    <div class="max-w-5xl w-full mx-auto">

      <!-- Main card (greedy theme) -->
      <div class="greedy-main relative overflow-hidden">
        <!-- glow blobs -->
        <div class="greedy-blob greedy-blob--tl" />
        <div class="greedy-blob greedy-blob--br" />

        <!-- Customer info — full width across both columns -->
        <div class="greedy-card customer-card px-4 py-2 mb-3 relative">
          <div class="city-head mb-1">
            <div class="text-sm font-bold" style="color:#E6B428;">Espresso demo</div>
            <button type="button" class="city-btn" @click="goToCity">
              <span>Espresso</span>
              <span class="city-btn-arrow" aria-hidden="true"></span>
            </button>
          </div>
          <div class="flex flex-col gap-0.5">
            <div class="text-xs" style="color:#e5e7eb;">หมายเลขสมาชิก : 000</div>
            <div class="text-xs" style="color:#e5e7eb;">หมายเลขสัญญา :</div>
            <div class="text-xs" style="color:#e5e7eb;">วันที่เริ่มเป็นสมาชิก :</div>
            <div class="text-xs" style="color:#e5e7eb;">วันที่สิ้นสุดสมาชิก :</div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
          <!-- Left Section - Ranking -->
          <div class="greedy-card p-4 flex flex-col">
            <!-- Ranking -->
            <div style="flex: 1; display: flex; flex-direction: column;">
            <div class="flex justify-between items-center mb-3 flex-shrink-0">
              <h2 class="text-[16px] font-bold text-gray-300 tracking-wider">จำนวนครั้งที่ใช้งาน</h2>
              <div class="w-1.5 h-1.5 rounded-full bg-[#E6B428] animate-pulse" />
            </div>

            <div class="flex flex-col" style="gap: 3px;">
                <div
                  v-for="(expense, i) in ranked"
                  :key="expense.name"
                  class="rank-row"
                >
                  <!-- coin -->
                  <div class="rank-coin">
                    <svg class="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="48" fill="#321609" />
                      <g transform="rotate(-90 50 50)">
                        <circle cx="50" cy="50" r="36" fill="none" :stroke="rankPct(expense) > 0 ? coinColor(i) : '#3A2410'" stroke-width="8" stroke-dasharray="52.55 173.64" stroke-dashoffset="0" />
                        <circle cx="50" cy="50" r="36" fill="none" :stroke="rankPct(expense) >= 25 ? coinColor(i) : '#3A2410'" stroke-width="8" stroke-dasharray="52.55 173.64" stroke-dashoffset="-56.55" />
                        <circle cx="50" cy="50" r="36" fill="none" :stroke="rankPct(expense) >= 50 ? coinColor(i) : '#3A2410'" stroke-width="8" stroke-dasharray="52.55 173.64" stroke-dashoffset="-113.1" />
                        <circle cx="50" cy="50" r="36" fill="none" :stroke="rankPct(expense) >= 75 ? coinColor(i) : '#3A2410'" stroke-width="8" stroke-dasharray="52.55 173.64" stroke-dashoffset="-169.65" />
                      </g>
                      <text x="50" y="62" text-anchor="middle" fill="#ffffff" font-size="28" font-weight="bold">{{ expense.count }}</text>
                    </svg>
                  </div>
                  <!-- bar -->
                  <div
                    class="rank-bar"
                    :class="{ 'rank-bar--top': i === 0 }"
                    :style="{ borderColor: coinColor(i) }"
                  >
                    <div class="relative z-10 flex flex-col justify-center min-w-0">
                      <div class="flex items-center gap-1.5">
                        <span class="text-[14px] font-black flex-shrink-0" :style="{ color: coinColor(i) }">#{{ i + 1 }}</span>
                        <span class="font-bold leading-tight line-clamp-2 text-[13px]" :style="{ color: coinColor(i), textShadow: `0 0 8px ${coinColor(i)}80` }">{{ expense.name }}</span>
                      </div>
                      <span class="text-[11px] font-semibold tracking-wide mt-0.5" :style="{ color: `${coinColor(i)}cc` }">{{ formatNumber(expense.count) }} ครั้ง</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            </div>

          <!-- Right Section — demo มีที่เดียว จึงกางรายละเอียดแต่ละโหมดไว้เลย ไม่ต้องกดเปิด -->
          <div class="greedy-card p-4 flex flex-col">
            <div class="flex justify-between items-center mb-3 flex-shrink-0">
              <h2 class="text-[16px] font-bold tracking-wider" style="color:#e5e7eb;">จำนวนการเข้าใช้งานแต่ละโหมด</h2>
              <div class="w-1.5 h-1.5 rounded-full animate-pulse" style="background:#E6B428;" />
            </div>

            <div v-for="center in ranked" :key="center.name" class="mode-detail-block">
              <div class="text-sm font-bold mb-2" style="color:#e5e7eb;">{{ centerShortName(center.name) }}</div>
              <div class="flex flex-col gap-1.5">
                <div v-for="mode in modesForCenter(center)" :key="mode.name">
                  <div class="flex items-center gap-2 mb-0.5">
                    <span class="w-2 h-2 rounded-full flex-shrink-0" :style="{ background: mode.color }"></span>
                    <span class="text-[11px] font-semibold" :style="{ color: mode.color }">{{ mode.name }}</span>
                    <span class="ml-auto text-[11px] font-bold" :style="{ color: mode.color }">{{ formatNumber(mode.count) }} ครั้ง · {{ mode.pct }}%</span>
                  </div>
                  <div class="mode-bar-track" style="height:6px;">
                    <div class="mode-bar-fill" :style="{ width: mode.pct + '%', background: mode.color, boxShadow: `0 0 8px ${mode.color}80` }" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>

</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Demo — มีที่เดียว: อ่านข้อมูลจากฐาน Espresso_Demo (espressotemplate-production-94ae)
const expenses = ref([
  { name: 'demo', icon: '/ESPRESSO_logo.png', link: '/espresso/EspressoDemo', count: 0, color: '#800080', dbSlug: 'Espresso_Demo' },
])

// per-mode counts per center (index ตรงกับ MODE_DEFS) — เริ่มที่ 0 แล้ว fetch มาเติม
expenses.value.forEach((e) => { e.modeCounts = [0, 0, 0, 0, 0] })

// 5 Espresso modes definition (สี + ชื่อ + path)
const MODE_DEFS = [
  { name: 'สมาร์ทเช็ค',  color: '#10b981', path: 'teacherpicture' },
  { name: 'ตัวเลข',      color: '#f59e0b', path: 'teachermatch'   },
  { name: 'ภาษา',        color: '#60a5fa', path: 'teacherthai'    },
  { name: 'สตูดิโอ',    color: '#a78bfa', path: 'studio'         },
  { name: 'สมาร์ทแทรค', color: '#fb7185', path: 'bmi'            },
]

// รับ expense object (จาก ranked) แล้วอ่าน modeCounts จริงของศูนย์นั้น
const modesForCenter = (expense) => {
  const counts = (expense && expense.modeCounts) || [0, 0, 0, 0, 0]
  const total = counts.reduce((s, c) => s + c, 0)
  const equal = Math.floor(100 / MODE_DEFS.length)
  return MODE_DEFS.map((m, i) => ({
    ...m,
    count: counts[i] || 0,
    pct: total === 0
      ? (i === MODE_DEFS.length - 1 ? 100 - equal * (MODE_DEFS.length - 1) : equal)
      : Math.round(((counts[i] || 0) / total) * 100)
  }))
}

// Loading state
const isLoading = ref(true)

// Normalize string (lowercase, remove punctuation) for tolerant matching
const normalize = (s) => {
  if (!s) return ''
  return String(s)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9฀-๿]/g, '')
}

// polling interval for fetching counts and status (3 minutes)
const POLL_INTERVAL_MS = 3 * 60 * 1000

// Fetch counts from daily_users endpoint per DB (ensure correct collection)
const fetchCounts = async () => {
  try {
    isLoading.value = true
    await Promise.all(expenses.value.map(async (e) => {
      const db = e.dbSlug || ''
      try {
        const url = `/api/daily-users${db ? `?db=${encodeURIComponent(db)}` : ''}`
        const response = await $fetch(url)

        if (response && response.success) {
          // Response may be an aggregated object or an array of records
          if (Array.isArray(response.data)) {
            const total = response.data.reduce((s, it) => s + Number(it.totalVisits ?? it.visits ?? it.count ?? 0), 0)
            e.count = total
          } else if (typeof response.data === 'object' && response.data !== null) {
            e.count = Number(response.data.totalVisits ?? response.data.visits ?? response.data.count ?? e.count ?? 0)
          }
          e.onlineCount = Number(response.data?.onlineCount ?? response.data?.online ?? e.onlineCount ?? 0)
        }
      } catch (inner) {
        console.error('[fetchCounts] error for db', db, inner)
      }
    }))
  } catch (error) {
    console.error('Error fetching daily users (counts):', error)
  } finally {
    isLoading.value = false
  }
}

// Fetch per-mode counts from daily_page_views (grouped by page) per DB,
// then map each page to one of the 5 MODE_DEFS via tolerant path matching.
const fetchModeCounts = async () => {
  try {
    const uniqueDbs = [...new Set(expenses.value.map(e => e.dbSlug).filter(Boolean))]
    const countsByDb = {}
    await Promise.all(uniqueDbs.map(async (db) => {
      try {
        const res = await $fetch(`/api/daily-page-modes?db=${encodeURIComponent(db)}`)
        if (res && res.success && res.data) {
          countsByDb[db] = res.data.pageCounts || {}
        }
      } catch (inner) {
        console.error('[fetchModeCounts] error for db', db, inner)
      }
    }))

    expenses.value.forEach((e) => {
      const pageCounts = countsByDb[e.dbSlug] || {}
      e.modeCounts = MODE_DEFS.map((m) => {
        const target = normalize(m.path)
        let sum = 0
        for (const [page, cnt] of Object.entries(pageCounts)) {
          if (normalize(page).includes(target)) sum += Number(cnt) || 0
        }
        return sum
      })
    })
  } catch (error) {
    console.error('Error fetching mode counts:', error)
  }
}

let pollTimerCounts = null

onMounted(() => {
  fetchCounts()
  fetchModeCounts()
  pollTimerCounts = setInterval(() => {
    fetchCounts()
    fetchModeCounts()
  }, POLL_INTERVAL_MS)
})

onBeforeUnmount(() => {
  if (pollTimerCounts) clearInterval(pollTimerCounts)
})

// Jump to the demo city view
const goToCity = () => navigateTo('/renewablesort/EspressoDemo')

// ── Greedy RankingCard helpers ──
// Sort centers by usage (desc) so #1 is the most-used
const ranked = computed(() =>
  [...expenses.value].sort((a, b) => (Number(b.count) || 0) - (Number(a.count) || 0))
)
// Max count for the coin progress ring (avoid divide-by-zero)
const maxCount = computed(() =>
  Math.max(1, ...ranked.value.map(e => Number(e.count) || 0))
)
// Coin/bar color: top rank is green, the rest grey (matches greedy theme)
const coinColor = (index) => (index === 0 ? '#10b981' : '#8a8175')
// Percentage used to fill the 4-segment coin ring
const rankPct = (expense) =>
  Math.round(((Number(expense.count) || 0) / maxCount.value) * 100)

// Demo มีที่เดียว — ใช้ชื่อเดิมเป็นชื่อย่อ
const centerShortName = (name) => name

// Format number with commas
const formatNumber = (num) => {
  return num.toLocaleString('th-TH')
}
</script>

<style scoped>
/* พื้นหลังสีดำล้วน */
.root-bg {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background: #000000 !important;
}

/* ── Greedy theme (จาก StatsCards/Huaroi ของ espressopia) ── */
/* การ์ดหลัก น้ำตาลเข้ม ขอบทอง เรืองแสง */
.greedy-main {
  background: #2A1208;
  border: 2px solid #C8982C;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 0 32px rgba(200, 152, 44, 0.4);
  color: #ffffff;
}
/* บังคับตัวหนังสือสีขาวบนพื้นเข้ม (กัน text-gray-* ของ Tailwind ไม่ถูก build) */
.greedy-main :where(h1, h2, .text-sm, .legend-item span) {
  color: #ffffff;
}
@media (min-width: 640px) {
  .greedy-main { padding: 24px; }
}

/* glow blobs มุมการ์ด */
.greedy-blob {
  position: absolute;
  width: 24rem;
  height: 24rem;
  border-radius: 9999px;
  filter: blur(120px);
  pointer-events: none;
}
.greedy-blob--tl { top: -10rem; left: -10rem; background: rgba(230, 180, 40, 0.05); }
.greedy-blob--br { bottom: -10rem; right: -10rem; background: rgba(224, 133, 42, 0.05); }

/* ปุ่มไปหน้ามุมมองเมือง */
.city-btn {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 22px;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0.3px;
  color: #2A1208;
  background: linear-gradient(180deg, #f7f6f4 0%, #f7f6f4 50%, #f7f6f4 0%);
  border: 1px solid #f7f6f4;
  border-top-color: #f7f6f4;
  border-radius: 9999px;
  cursor: pointer;
  /* เงาดรอปด้านล่าง + ไฮไลต์ขอบบนด้านใน = ปุ่มนูนกดได้ */
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.45),
    inset 0 -2px 4px rgba(120, 80, 0, 0.35),
    0 4px 8px rgba(0, 0, 0, 0.45),
    0 0 10px rgba(200, 152, 44, 0.25);
  transition: background 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease;
}
.city-btn:hover {
  background: linear-gradient(180deg, #FFD24A 0%, #E6B428 50%, #C8982C 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.55),
    inset 0 -2px 4px rgba(120, 80, 0, 0.3),
    0 7px 14px rgba(0, 0, 0, 0.5),
    0 0 16px rgba(230, 180, 40, 0.5);
  transform: translateY(calc(-50% - 2px));
}
.city-btn:active {
  transform: translateY(-50%);
  box-shadow:
    inset 0 2px 5px rgba(120, 80, 0, 0.5),
    0 1px 2px rgba(0, 0, 0, 0.4);
}
.city-btn:focus-visible {
  outline: 2px solid #FFE896;
  outline-offset: 2px;
}
/* สามเหลี่ยมชี้ขวา วาดด้วย CSS border — ไม่พึ่งฟอนต์ กัน iOS เรนเดอร์เป็นอิโมจิ */
.city-btn-arrow {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 15px solid #2A1208;
  transition: transform 0.15s ease;
}
.city-btn:hover .city-btn-arrow { transform: translateX(3px); }

/* มือถือ: ปุ่มลอยกลางแนวตั้งเหมือนเดสก์ท็อป แต่ย่อเล็ก + กันที่ว่างไม่ให้ทับข้อความ */
@media (max-width: 640px) {
  .customer-card { padding-right: 124px; }
  .city-btn {
    right: 14px;
    padding: 5px 14px;
    font-size: 14px;
    gap: 6px;
  }
  .city-btn-arrow {
    border-top-width: 6px;
    border-bottom-width: 6px;
    border-left-width: 9px;
  }
}

/* การ์ดย่อย (info / ranking / chart) */
.greedy-card {
  background: #321609;
  border: 2px solid #B5851F;
  border-radius: 12px;
  transition: border-color 0.3s ease;
}
.greedy-card:hover { border-color: #E6B428; }

/* ── Ranking row (เหรียญ + แถบ) ── */
.rank-row {
  display: flex;
  align-items: center;
  height: 50px;
  cursor: default;
  position: relative;
}
.rank-coin {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
  user-select: none;
}
.rank-bar {
  position: relative;
  overflow: hidden;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: -16px;
  background: #241005;
  border-top: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
  border-radius: 0 12px 12px 0;
  padding-left: 32px;
  padding-right: 12px;
  transition: background 0.3s ease;
}
.rank-row:hover .rank-bar { background: #3D1E0A; }
.rank-bar--top {
  border-width: 2px;
  animation: rankBorderPulse 1.5s ease-in-out infinite;
}
@keyframes rankBorderPulse {
  0%, 100% { border-color: #10b981; box-shadow: 0 0 4px #10b98144; }
  50% { border-color: #6ee7b7; box-shadow: 0 0 20px #10b981ff, 0 0 40px #10b981aa; }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Legend Items */
.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 8px;
  transition: all 0.2s ease;
}
.legend-item:hover { background: rgba(230, 180, 40, 0.12); }

/* ── Mode usage bars (กางไว้ตลอด — demo มีที่เดียว) ── */
.mode-detail-block {
  padding: 8px 10px;
  border-radius: 8px;
  background: #241005;
  border: 1px solid #3A2410;
}
.mode-detail-block + .mode-detail-block { margin-top: 8px; }

.mode-bar-track {
  height: 8px;
  background: #3A2410;
  border-radius: 9999px;
  overflow: hidden;
}
.mode-bar-fill {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 4px;
}

@media (max-width: 768px) {
  .greedy-main { padding: 16px; }
  .rank-row { height: 62px; }
  .rank-coin { width: 50px; height: 50px; }
}
</style>
