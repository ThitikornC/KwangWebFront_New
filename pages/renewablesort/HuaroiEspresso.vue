<template>
  <div class="root-bg p-4 sm:p-8 min-h-screen">
    <!-- Logo ลายน้ำ -->
    <div class="background-image">
      <img src="/kwang_logo.png" alt="Logo" />
    </div>

    <!-- Running Text -->
    <div class="flex justify-center flex-1 px-2 sm:px-[clamp(1rem,3vw,1.5rem)] mt-16 sm:mt-[clamp(4rem,10vw,5.625rem)] mb-4 sm:mb-[clamp(2rem,4vw,3rem)]">
      <div class="running-text w-full max-w-[min(1200px,95vw)] overflow-hidden relative text-[clamp(0.875rem,1.5vw,1.25rem)] whitespace-nowrap">
        <div class="marquee">
          <div class="marquee-content">
            <span>Espresso Platform</span>
            <span>Smart Classroom</span>
          </div>
          <div class="marquee-content">
            <span>Espresso Platform</span>
            <span>Smart Classroom</span>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto mt-4">
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <!-- Left Section - Tables -->
        <div class="space-y-3">
          <!-- Info Section -->
          <div class="neon-btn overflow-hidden" style="height: auto; padding: 16px 20px;">
            <div class="space-y-1">
              <div class="text-lg font-bold">เทศบาลตำบลหัวรอ</div>
              <div class="text-sm">Usernumber : 001</div>
              <div class="text-sm">Contractnumber :</div>
              <div class="text-sm">Date Installed : 1-11-25</div>
              <div class="text-sm">Expiration Date : 1-12-25</div>
            </div>
          </div>

          <!-- Expense Section - Card Buttons -->
          <div class="neon-btn overflow-hidden" style="height: auto; padding: 0;">
            <div class="p-3 space-y-2">
              <div 
                v-for="(expense, index) in expenses" 
                :key="index"
                @click="openExpenseLink(expense.link)"
                class="expense-card"
              >
                <div class="flex items-center gap-3">
                  <img :src="expense.icon" :alt="expense.name" class="w-10 h-10 object-contain" />
                  <span class="text-sm font-medium">{{ expense.name }}</span>
                </div>
                <span class="text-sm font-semibold text-gray-600">{{ formatNumber(expense.count) }} ครั้ง</span>
              </div>
              
              <div class="flex justify-between items-center px-3 py-2 bg-red-50 rounded-lg mt-2">
                <span class="font-semibold text-red-700">การเข้าใช้งานทั้งหมด</span>
                <span class="font-semibold text-red-700">{{ formatNumber(totalUsers) }} ครั้ง</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Section - Chart -->
        <div class="neon-btn p-4 flex flex-col justify-center items-center" style="min-height: 360px;">
          <h2 class="text-lg font-semibold text-center mb-2">จำนวนการเข้าใช้งาน</h2>
          
          <!-- Donut Chart -->
          <div class="flex justify-center mb-2">
            <div class="relative w-48 h-48">
              <svg viewBox="0 0 100 100" class="w-full h-full transform -rotate-90">
                <circle
                  v-for="(segment, index) in chartSegments"
                  :key="index"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  :stroke="segment.color"
                  stroke-width="20"
                  :stroke-dasharray="segment.dashArray"
                  :stroke-dashoffset="segment.offset"
                />
              </svg>
            </div>
          </div>

          <!-- Legend -->
            <div class="space-y-0.5">
            <div 
              v-for="(expense, index) in expenses" 
              :key="index"
              @click="openExpenseLink(expense.link)"
              class="legend-item"
            >
              <span 
                class="w-3 h-3 rounded-full flex-shrink-0" 
                :style="{ backgroundColor: expense.color }"
              ></span>
              <span class="text-xs flex-1">{{ expense.name }}</span>
              <span class="text-xs font-semibold">{{ expense.count }} ครั้ง</span>
            </div>
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
  { name: '1.ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ', icon: '/ESPRESSO_logo.png', link: '/espresso/Huaroa', count: 0, color: '#800080' },
  { name: '2.ศูนย์พัฒนาเด็กเล็กบ้านสระโคล่', icon: '/ESPRESSO_logo.png', link: '/espresso/huaroa3', count: 0, color: '#22C8F7' },
  { name: '3.ศูนย์พัฒนาเด็กเล็กมหาวนาราม', icon: '/ESPRESSO_logo.png', link: '/espresso/huaroa4', count: 0, color: '#FFD700' },
])

// Loading state
const isLoading = ref(true)

// Fetch daily users count from API
const fetchDailyUsers = async () => {
  try {
    isLoading.value = true
    const response = await $fetch('/api/daily-users')
    
    if (response.success && response.data) {
      // Update counts from API data - data is an array of results
      response.data.forEach((item) => {
        // match expense by label included in name to tolerate numbering prefix
        const expense = expenses.value.find(e => e.name.includes(item.label) || item.label.includes(e.name))
        if (expense) {
          expense.count = item.totalVisits || 0
          expense.onlineCount = item.onlineCount || 0
          expense.clients = item.clients || []
        }
      })
    }
  } catch (error) {
    console.error('Error fetching daily users:', error)
    // Keep default values on error
  } finally {
    isLoading.value = false
  }
}

let pollTimer = null
// Fetch data on mount and poll every 5 minutes
onMounted(() => {
  fetchDailyUsers()
  pollTimer = setInterval(fetchDailyUsers, 5 * 60 * 1000)
})

onBeforeUnmount(() => {
  if (pollTimer) clearInterval(pollTimer)
})

// Open expense link
const openExpenseLink = (link) => {
  if (link) window.open(link, '_blank')
}



// Computed values
const totalIncome = computed(() => {
  return income.value.salary + income.value.additional
})

const totalUsers = computed(() => {
  return expenses.value.reduce((sum, expense) => sum + (Number(expense.count) || 0), 0)
})

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

// Format number with commas
const formatNumber = (num) => {
  return num.toLocaleString('th-TH')
}
</script>

<style scoped>
.root-bg {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background: transparent !important;
}
.root-bg::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: -1;
  background: radial-gradient(circle at 30% 40%, #ebd09e, #251f03);
  opacity: 0.6;
  animation: floatBg 30s linear infinite;
}
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

/* Logo ลายน้ำ */
.background-image {
  position: fixed;
  top: 55%;
  left: 75%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 1400px;
  height: auto;
  opacity: 0.3;
  z-index: 1;
  pointer-events: none;
}
.background-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}

.neon-btn {
  background: linear-gradient(180deg, #f8f6f0 0%, #fffef8 45%, #fff8e8 55%, #f5f0e5 100%);
  color: #000000;
  border: 3px solid #74640a;
  border-radius: 12px;
  box-shadow: 1px 1px 0 #000, -6px 4px #3b3305, 0 0 16px rgba(255,230,160,0.45);
  font-weight: 700;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  transform: translateZ(0);
  transition: all 0.3s ease;
  z-index: 10;
}

/* Expense Card Buttons */
.expense-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: linear-gradient(180deg, #f8f6f0 0%, #fffef8 45%, #fff8e8 55%, #f5f0e5 100%);
  border: 2px solid #74640a;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 1px 1px 0 #000, -3px 2px #3b3305;
}
.expense-card:hover {
  transform: translateY(-2px);
  box-shadow: 1px 1px 0 #000, -4px 4px #3b3305, 0 0 12px rgba(255,230,160,0.5);
}
.expense-card-selected {
  background: linear-gradient(180deg, #ffe8a0 0%, #ffd54f 50%, #ffca28 100%);
  border-color: #f57c00;
  box-shadow: 1px 1px 0 #000, -4px 4px #b45309, 0 0 16px rgba(255,200,80,0.6);
  transform: scale(1.02);
}

/* Legend Items */
.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.legend-item:hover {
  background: rgba(255, 230, 160, 0.3);
}
.legend-item-selected {
  background: rgba(255, 200, 80, 0.4);
  font-weight: 600;
}

/* Running Text */
.running-text {
  background: linear-gradient(180deg, #f8f6f0 0%, #fff8e8 50%, #f5f0e5 100%);
  color: #000;
  border: 6px solid #74640a;
  border-radius: 9999px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 15px 20px;
  box-shadow: 1px 1px 0 #000, -8px 6px #3b3305, 0 0 20px rgba(255,230,160,0.55);
  text-shadow: 0 1px 0 rgba(255,255,255,0.4), 0 -1px 0 rgba(0,0,0,0.15), 0 0 6px rgba(255,230,160,0.55);
  overflow: hidden;
  position: relative;
  z-index: 50;
}
.marquee { 
  display: flex; 
  min-width: 300%; 
  animation: marquee 30s linear infinite; 
}
.marquee-content { 
  display: flex; 
  align-items: center; 
  margin-right: 2rem; 
}
.marquee span {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  padding: 0.5rem 2rem;
  background: linear-gradient(180deg, #f8f6f0 0%, #fff8e8 50%, #f5f0e5 100%);
  font-weight: 700;
  text-transform: uppercase;
  border: 2px solid #000;
  border-radius: 6px;
  box-shadow: 2px 2px 0 #000, -1px -1px 0 #000, 0 0 6px rgba(255,230,160,0.55);
  margin-right: 1rem;
}
@keyframes marquee { 
  0% { transform: translateX(0); } 
  100% { transform: translateX(-50%); } 
}

@media (max-width: 768px) {
  .running-text {
    border-width: 3px;
    padding: 10px 15px;
    font-size: 0.75rem;
    border-radius: 20px;
  }
  .marquee span {
    padding: 0.4rem 1rem;
    border-width: 1px;
    border-radius: 4px;
    font-size: 0.65rem;
    margin-right: 0.6rem;
  }
}

/* Chart segment animation */
.chart-segment-selected {
  stroke-width: 24 !important;
  filter: drop-shadow(0 0 8px rgba(255,200,80,0.8));
}

@media (max-width: 768px) {
  .neon-btn {
    border-width: 2px;
  }
  .expense-card {
    padding: 8px 10px;
  }
}

/* Password modal styles removed */
</style>
