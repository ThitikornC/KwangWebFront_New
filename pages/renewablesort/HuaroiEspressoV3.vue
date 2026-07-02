<template>
  <div class="root-bg p-4 sm:p-8 min-h-screen flex items-center justify-center">
    <div class="max-w-5xl w-full mx-auto">

      <!-- Main card (greedy theme) -->
      <div class="greedy-main relative overflow-hidden">
        <!-- glow blobs -->
        <div class="greedy-blob greedy-blob--tl" />
        <div class="greedy-blob greedy-blob--br" />

        <!-- Customer info — full width across both columns -->
        <div class="greedy-card px-4 py-2 mb-3">
          <div class="flex items-start justify-between gap-2 mb-1">
            <div class="text-sm font-bold" style="color:#E6B428;">เทศบาลตำบลหัวรอ</div>
            <button type="button" class="city-btn" @click="goToCity">
              <span>มุมมองเมือง</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <div class="flex flex-col gap-0.5">
            <div class="text-xs" style="color:#e5e7eb;">หมายเลขสมาชิก : 001</div>
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

          <!-- Right Section -->
          <div class="greedy-card p-4 flex flex-col">

            <!-- VIEW A: stacked bars (ครึ่งบน) -->
            <template v-if="modeModal === null">
              <div class="flex justify-between items-center mb-3 flex-shrink-0">
                <h2 class="text-[16px] font-bold tracking-wider" style="color:#e5e7eb;">จำนวนการเข้าใช้งานแต่ละโหมด</h2>
                <div class="w-1.5 h-1.5 rounded-full animate-pulse" style="background:#E6B428;" />
              </div>
              <!-- rows — fill remaining space -->
              <div style="flex: 1; overflow-y: auto; scrollbar-width: none;">
                <div class="flex flex-col" style="gap:3px;">
                  <div
                    v-for="(exp, ci) in ranked"
                    :key="exp.name"
                    class="center-mode-row"
                    style="padding: 3px 6px;"
                    @click="openModeModal(ci)"
                  >
                    <div class="flex items-center gap-1 mb-0.5">
                      <span class="font-bold flex-1 truncate" style="color:#e5e7eb; font-size:12px;">{{ centerShortName(exp.name) }}</span>
                      <span style="color:#9ca3af; font-size:10px;">▼</span>
                    </div>
                    <div class="stacked-bar-track" style="height:20px;">
                      <div
                        v-for="mode in modesForCenter(exp)"
                        :key="mode.name"
                        class="stacked-bar-segment"
                        :style="{ width: mode.pct + '%', background: mode.color }"
                        :title="`${mode.name}: ${mode.count} ครั้ง (${mode.pct}%)`"
                      >
                        <transition v-if="mode.pct >= 14" name="bar-flip" mode="out-in">
                          <span :key="showPct" style="font-size:11px; font-weight:700; color:rgba(0,0,0,0.75); line-height:20px; padding:0 3px; white-space:nowrap; pointer-events:none; user-select:none;">{{ showPct ? mode.pct + '%' : mode.count + ' ครั้ง' }}</span>
                        </transition>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Legend — อยู่ใต้ rows ไม่โดนซ่อน -->
              <div class="flex flex-wrap gap-x-2 gap-y-0.5 mt-1 pt-1" style="flex: 0 0 auto; border-top:1px solid rgba(74,42,16,0.5);">
                <div v-for="m in MODE_DEFS" :key="m.name" class="flex items-center gap-1">
                  <span class="rounded-full flex-shrink-0" style="width:8px;height:8px;" :style="{ background: m.color }"></span>
                  <span class="font-semibold" style="font-size:12px;" :style="{ color: m.color }">{{ m.name }}</span>
                </div>
              </div>

            </template>

            <!-- VIEW B: detail ของศูนย์ที่เลือก -->
            <template v-else>
              <div class="flex justify-between items-center mb-4 flex-shrink-0">
                <span class="text-sm font-bold" style="color:#e5e7eb;">{{ centerShortName(ranked[modeModal]?.name || '') }}</span>
                <button @click="modeModal = null" title="ย้อนกลับ" style="background:none;border:none;cursor:pointer;color:#E6B428;font-size:16px;font-weight:900;padding:0 4px;line-height:1;">▲</button>
              </div>
              <div class="flex flex-col gap-1.5" style="flex: 0 0 auto;">
                <div v-for="mode in modesForCenter(ranked[modeModal])" :key="mode.name">
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

              <!-- การ์ดรวมของศูนย์ถัดไป (สูงสุด 2 ที่) -->
              <div v-if="nextCenters.length" class="mt-4" style="flex: 0 0 auto; border:1px solid rgba(200,152,44,0.4); border-radius:10px; padding:8px 10px; background:rgba(0,0,0,0.18);">
                <div class="text-[10px] font-semibold mb-2" style="color:#9ca3af;">ถัดไป</div>
                <div class="flex flex-col" style="gap:8px;">
                  <div
                    v-for="item in nextCenters"
                    :key="item.idx"
                    class="center-mode-row"
                    style="padding: 4px 8px;"
                    @click="openModeModal(item.idx)"
                  >
                    <div class="flex items-center gap-1 mb-0.5">
                      <span class="font-bold flex-1 truncate" style="color:#e5e7eb; font-size:10px;">{{ centerShortName(item.center.name) }}</span>
                      <span style="color:#9ca3af; font-size:8px;">▼</span>
                    </div>
                    <div class="stacked-bar-track" style="height:12px;">
                      <div
                        v-for="mode in modesForCenter(item.center)"
                        :key="mode.name"
                        class="stacked-bar-segment"
                        :style="{ width: mode.pct + '%', background: mode.color }"
                        :title="`${mode.name}: ${mode.count} ครั้ง (${mode.pct}%)`"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </template>

          </div>
        </div>
      </div>
    </div>
</div>

</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Income data
const income = ref({
  salary: 4000,
  additional: 0
})

// Expense data with links and user count (for API)
const expenses = ref([
  { name: 'ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ 1', icon: '/ESPRESSO_logo.png', link: '/espresso/Huaroa', count: 0, color: '#800080', dbSlug: 'Huroa2' },
  { name: 'ศูนย์พัฒนาเด็กเล็กบ้านสระโคล่ 1', icon: '/ESPRESSO_logo.png', link: '/espresso/huaroa3', count: 0, color: '#22C8F7', dbSlug: 'Huroa3' },
  { name: 'ศูนย์พัฒนาเด็กเล็กมหาวนาราม', icon: '/ESPRESSO_logo.png', link: '/espresso/huaroa4', count: 0, color: '#FFD700', dbSlug: 'Huroa4' },
  { name: 'ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ 2', icon: '/ESPRESSO_logo.png', link: '/espresso/Huaroa', count: 0, color: '#E05CFF', dbSlug: 'Huroa2' },
  { name: 'ศูนย์พัฒนาเด็กเล็กบ้านสระโคล่ 2', icon: '/ESPRESSO_logo.png', link: '/espresso/huaroa3', count: 0, color: '#00E5FF', dbSlug: 'Huroa3' },
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

const expandedCenter = ref(null)

// ── BMI Line Chart ──
const bmiChartW = 280
const bmiChartH = 100
const bmiPad = 28

// placeholder data per center [หัวรอ1, หัวรอ2, สระโคล่1, สระโคล่2, มหาวนาราม] (ตามลำดับ ranked)
const bmiLines = ref([
  { label: 'สมส่วน',        color: '#10b981', data: [42, 38, 18, 14, 9] },
  { label: 'เริ่มอ้วน/อ้วน', color: '#f59e0b', data: [12, 15,  5,  4, 2] },
  { label: 'ผอม',           color: '#fb7185', data: [ 8,  7,  3,  5, 1] },
])

const bmiMax = computed(() => Math.max(10, ...bmiLines.value.flatMap(l => l.data)))
const bmiYTicks = computed(() => {
  const m = bmiMax.value
  return [m, Math.round(m * 0.5), 0]
})
const bmiGridY = computed(() => bmiYTicks.value.map(v => bmiY(v)))
const bmiX = (ci) => bmiPad + ci * ((bmiChartW - bmiPad - 10) / (ranked.value.length - 1 || 1))
const bmiY = (v) => {
  const m = bmiMax.value
  return 10 + (1 - v / m) * (bmiChartH - 22)
}

// smooth bezier line path
const bmiLinePath = (data) => {
  const pts = data.map((v, i) => [bmiX(i), bmiY(v)])
  if (pts.length < 2) return ''
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const cp1x = pts[i-1][0] + (pts[i][0] - pts[i-1][0]) * 0.45
    const cp1y = pts[i-1][1]
    const cp2x = pts[i][0] - (pts[i][0] - pts[i-1][0]) * 0.45
    const cp2y = pts[i][1]
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pts[i][0]} ${pts[i][1]}`
  }
  return d
}
// area fill path (line + close to bottom)
const bmiAreaPath = (data) => {
  const pts = data.map((v, i) => [bmiX(i), bmiY(v)])
  const bottom = bmiChartH - 12
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const cp1x = pts[i-1][0] + (pts[i][0] - pts[i-1][0]) * 0.45
    const cp1y = pts[i-1][1]
    const cp2x = pts[i][0] - (pts[i][0] - pts[i-1][0]) * 0.45
    const cp2y = pts[i][1]
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pts[i][0]} ${pts[i][1]}`
  }
  d += ` L ${pts[pts.length-1][0]} ${bottom} L ${pts[0][0]} ${bottom} Z`
  return d
}


const modeModal = ref(null)
const openModeModal = (ci) => { modeModal.value = ci }

// ศูนย์ถัดไปสูงสุด 2 ตัว (วนกลับไปตัวแรกเมื่อถึงตัวสุดท้าย) สำหรับการ์ดรวมด้านล่าง
const nextCenters = computed(() => {
  if (modeModal.value === null) return []
  const n = ranked.value.length
  const out = []
  for (let k = 1; k <= 2 && k < n; k++) {
    const idx = (modeModal.value + k) % n
    out.push({ idx, center: ranked.value[idx] })
  }
  return out
})


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

// (timestamp parsing removed — status fetching not used)

// Fetch counts from daily_users endpoint per DB (ensure correct collection)
const fetchCounts = async () => {
  try {
    isLoading.value = true
    // fetch per-expense by dbSlug to ensure counts come from the correct DB
    await Promise.all(expenses.value.map(async (e) => {
      const db = e.dbSlug || ''
      try {
        const url = `/api/daily-users${db ? `?db=${encodeURIComponent(db)}` : ''}`
        const response = await $fetch(url)

        if (response && response.success) {
          // Response may be an aggregated object or an array of records
          if (Array.isArray(response.data)) {
            // Sum totalVisits (or visits/count) across returned records
            const total = response.data.reduce((s, it) => s + Number(it.totalVisits ?? it.visits ?? it.count ?? 0), 0)
            e.count = total
          } else if (typeof response.data === 'object' && response.data !== null) {
            e.count = Number(response.data.totalVisits ?? response.data.visits ?? response.data.count ?? e.count ?? 0)
          }
          // keep any client/online fields if present
          e.onlineCount = Number(response.data?.onlineCount ?? response.data?.online ?? e.onlineCount ?? 0)
          console.debug('[fetchCounts] db fetch', { db, name: e.name, count: e.count })
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

// Fetch per-mode counts from daily_page_users (grouped by page) per DB,
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

    // assign modeCounts to each expense (centers sharing a dbSlug get the same data)
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

// Status polling removed — this page no longer displays online status

let pollTimerCounts = null

// Toggle the stacked-bar label between % and จำนวนครั้ง every 2.5s
const showPct = ref(true)
let labelToggleTimer = null

// Fetch data on mount and poll every POLL_INTERVAL_MS (counts + per-mode)
onMounted(() => {
  fetchCounts()
  fetchModeCounts()
  pollTimerCounts = setInterval(() => {
    fetchCounts()
    fetchModeCounts()
  }, POLL_INTERVAL_MS)
  labelToggleTimer = setInterval(() => { showPct.value = !showPct.value }, 5000)
})

onBeforeUnmount(() => {
  if (pollTimerCounts) clearInterval(pollTimerCounts)
  if (labelToggleTimer) clearInterval(labelToggleTimer)
})

// Jump to the City View dashboard for this center
const goToCity = () => navigateTo('/renewablesort/HuaroiEspressoCity')

// Open expense link (same-tab so the browser Back button works)
const openExpenseLink = (link) => {
  if (!link) return
  if (/^https?:\/\//i.test(link)) navigateTo(link, { external: true })
  else navigateTo(link)
}

// Create ripple effect inside element
const createRipple = (el, event) => {
  if (!el) return
  // remove old ripples
  const old = el.querySelectorAll('.ripple')
  old.forEach(o => o.remove())

  const rect = el.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height) * 1.2
  const ripple = document.createElement('span')
  ripple.className = 'ripple'
  ripple.style.width = ripple.style.height = `${size}px`

  let x = (rect.width - size) / 2
  let y = (rect.height - size) / 2
  if (event && event.clientX != null) {
    x = event.clientX - rect.left - size / 2
    y = event.clientY - rect.top - size / 2
  }
  ripple.style.left = `${x}px`
  ripple.style.top = `${y}px`

  el.appendChild(ripple)
  setTimeout(() => {
    ripple.remove()
  }, 700)
}

const handleCardClick = (event, link) => {
  const el = event.currentTarget
  createRipple(el, event)
  // small delay so ripple visible before navigation
  setTimeout(() => openExpenseLink(link), 120)
}

const handleCardKeydown = (event, link) => {
  const el = event.currentTarget
  createRipple(el, null)
  setTimeout(() => openExpenseLink(link), 120)
}


// (no password modal — links open directly)



// Computed values
const totalIncome = computed(() => {
  return income.value.salary + income.value.additional
})

const totalUsers = computed(() => {
  return expenses.value.reduce((sum, expense) => sum + (Number(expense.count) || 0), 0)
})

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

const totalExpenses = computed(() => {
  return expenses.value.reduce((sum, expense) => sum + (expense.amount || 0), 0)
})

const remaining = computed(() => {
  return totalIncome.value - totalExpenses.value
})

// Chart segments calculation
const chartSegments = computed(() => {
  const circumference = 2 * Math.PI * 40 // r = 40
  let cumulativeOffset = 0
  const total = expenses.value.reduce((sum, e) => sum + (Number(e.count) || 0), 0)

  return expenses.value.map((expense) => {
    const percentage = total === 0 ? 1 / expenses.value.length : (Number(expense.count) || 0) / total
    const dashLength = percentage * circumference
    const dashArray = `${dashLength} ${circumference - dashLength}`
    const offset = -cumulativeOffset

    cumulativeOffset += dashLength

    return {
      color: expense.color,
      dashArray,
      offset
    }
  })
})

// Short center name for pills
const centerShortName = (name) => {
  if (name.includes('มหาวนาราม')) return 'มหาวนาราม'
  if (name.includes('หัวรอ 2')) return 'หัวรอ 2'
  if (name.includes('หัวรอ')) return 'หัวรอ 1'
  if (name.includes('สระโคล่ 2')) return 'สระโคล่ 2'
  if (name.includes('สระโคล่')) return 'สระโคล่ 1'
  return name
}

// Format number with commas
const formatNumber = (num) => {
  return num.toLocaleString('th-TH')
}

// Status helpers — use `onlineCount` (from `fetchCounts`) or fall back to gray
const statusColor = (expense) => {
  if (Number(expense.onlineCount) > 0) return '#22c55e'
  return '#9ca3af'
}

const getStatusTitle = (expense) => {
  if (Number(expense.onlineCount) > 0) return `ออนไลน์ ${expense.onlineCount} คน`
  return 'ยังไม่มีผู้ใช้งานออนไลน์'
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

.greedy-header-border { border-bottom: 1px solid rgba(74, 42, 16, 0.4); }

/* ไอคอน Zap ในหัวการ์ด */
.greedy-zap {
  width: 44px;
  height: 44px;
  background: #E6B428;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  box-shadow: 0 0 20px rgba(230, 180, 40, 0.55);
  z-index: 10;
}
.greedy-zap-ping {
  position: absolute;
  width: 48px;
  height: 48px;
  border-radius: 9999px;
  background: rgba(230, 180, 40, 0.15);
  animation: greedyPing 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}
@keyframes greedyPing {
  0% { transform: scale(0.9); opacity: 0.8; }
  75%, 100% { transform: scale(1.6); opacity: 0; }
}

/* ปุ่มไปหน้ามุมมองเมือง */
.city-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 700;
  color: #2A1208;
  background: #E6B428;
  border: 1px solid #E6B428;
  border-radius: 9999px;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease;
  box-shadow: 0 0 12px rgba(230, 180, 40, 0.35);
}
.city-btn:hover {
  background: #F4C842;
  box-shadow: 0 0 18px rgba(230, 180, 40, 0.6);
}
.city-btn:active { transform: scale(0.96); }

/* การ์ดย่อย (info / ranking / chart) */
.greedy-card {
  background: #321609;
  border: 2px solid #B5851F;
  border-radius: 12px;
  transition: border-color 0.3s ease;
}
.greedy-card:hover { border-color: #E6B428; }

/* แถบรวมยอดการเข้าใช้งาน */
.greedy-total {
  background: rgba(230, 180, 40, 0.08);
  border: 1px solid rgba(230, 180, 40, 0.35);
}
.greedy-total span { color: #E6B428; }

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

/* ── Mode usage bars ── */
.stacked-bar-track {
  display: flex;
  width: 100%;
  height: 16px;
  border-radius: 9999px;
  overflow: hidden;
  background: #3A2410;
}

.center-mode-row {
  padding: 8px 10px;
  border-radius: 8px;
  background: #241005;
  border: 1px solid #3A2410;
  cursor: pointer;
  transition: border-color 0.2s ease;
}
.center-mode-row:hover { border-color: #E6B428; }
.stacked-bar-segment {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 2px;
}

/* สลับ %↔ครั้ง แบบ roll นุ่มๆ */
.bar-flip-enter-active,
.bar-flip-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.bar-flip-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.bar-flip-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.mode-bar-row { display: flex; flex-direction: column; }
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

/* ── Mode detail popup ── */
.mode-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 2%;
  z-index: 200;
}
.mode-modal-box {
  background: #2A1208;
  border: 2px solid #C8982C;
  border-radius: 14px;
  padding: 20px 24px;
  width: 46%;
  max-width: 520px;
  min-width: 280px;
  box-shadow: 0 0 40px rgba(200, 152, 44, 0.4);
}

/* Ripple effect */
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(230, 180, 40, 0.18);
  transform: scale(0);
  pointer-events: none;
  animation: ripple-anim 700ms ease-out forwards;
}
@keyframes ripple-anim {
  to { transform: scale(1); opacity: 0; }
}

@media (max-width: 768px) {
  .greedy-main { padding: 16px; }
  .rank-row { height: 62px; }
  .rank-coin { width: 50px; height: 50px; }
}
</style>
