<template>
  <div class="min-h-screen bg-gray-100 py-4 px-3">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-xl font-bold text-center text-gray-800 mb-4">สรุปรายรับ-รายจ่าย</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <!-- Left Section - Tables -->
        <div class="space-y-3">
          <!-- Income Section -->
          <div class="bg-white rounded-md shadow-sm overflow-hidden">
            <div class="bg-green-500 text-white px-3 py-1.5 text-sm font-semibold">
              รายรับ
            </div>
            <table class="w-full text-sm">
              <tbody>
                <tr class="border-b border-gray-200">
                  <td class="px-3 py-1.5 text-gray-700">ค่าจ้าง</td>
                  <td class="px-3 py-1.5 text-right text-gray-700">฿{{ formatNumber(income.salary) }}</td>
                </tr>
                <tr class="border-b border-gray-200">
                  <td class="px-3 py-1.5 text-gray-700">รายได้เพิ่มเติม</td>
                  <td class="px-3 py-1.5 text-right text-gray-700">฿{{ formatNumber(income.additional) }}</td>
                </tr>
                <tr class="bg-green-50">
                  <td class="px-3 py-1.5 font-semibold text-green-700">รายได้ทั้งหมด</td>
                  <td class="px-3 py-1.5 text-right font-semibold text-green-700">฿{{ formatNumber(totalIncome) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Expense Section -->
          <div class="bg-white rounded-md shadow-sm overflow-hidden">
            <div class="bg-red-500 text-white px-3 py-1.5 text-sm font-semibold">
              รายจ่าย
            </div>
            <table class="w-full text-sm">
              <tbody>
                <tr v-for="(expense, index) in expenses" :key="index" class="border-b border-gray-200">
                  <td class="px-3 py-1.5 text-gray-700 flex items-center gap-1.5">
                    <span 
                      class="w-2.5 h-2.5 rounded-full inline-block" 
                      :style="{ backgroundColor: expense.color }"
                    ></span>
                    {{ expense.name }}
                  </td>
                  <td class="px-3 py-1.5 text-right text-gray-700">฿{{ formatNumber(expense.amount) }}</td>
                </tr>
                <tr class="bg-red-50">
                  <td class="px-3 py-1.5 font-semibold text-red-700">ค่าใช้จ่ายทั้งหมด</td>
                  <td class="px-3 py-1.5 text-right font-semibold text-red-700">฿{{ formatNumber(totalExpenses) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Remaining Section -->
          <div class="bg-white rounded-md shadow-sm overflow-hidden">
            <div class="bg-blue-500 text-white px-3 py-1.5 text-sm font-semibold">
              เงินที่เหลือ
            </div>
            <table class="w-full text-sm">
              <tbody>
                <tr>
                  <td class="px-3 py-1.5 text-gray-700">รายได้ลบค่าใช้จ่าย</td>
                  <td class="px-3 py-1.5 text-right font-semibold" :class="remaining >= 0 ? 'text-green-600' : 'text-red-600'">
                    ฿{{ formatNumber(remaining) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Right Section - Chart -->
        <div class="bg-white rounded-md shadow-sm p-4">
          <h2 class="text-base font-semibold text-center text-gray-800 mb-3">รายจ่าย</h2>
          
          <!-- Donut Chart -->
          <div class="flex justify-center mb-4">
            <div class="relative w-44 h-44">
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
          <div class="space-y-1">
            <div 
              v-for="(expense, index) in expenses" 
              :key="index"
              class="flex items-center gap-2"
            >
              <span 
                class="w-3 h-3 rounded-full flex-shrink-0" 
                :style="{ backgroundColor: expense.color }"
              ></span>
              <span class="text-gray-700 text-xs">{{ expense.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Income data
const income = ref({
  salary: 4000,
  additional: 0
})

// Expense data with colors
const expenses = ref([
  { name: 'ที่พัก (ค่าเช่า ค่าผ่อน ภาษี ประกัน)', amount: 1500, color: '#22C8F7' },
  { name: 'ของชำ', amount: 500, color: '#22C55E' },
  { name: 'การโดยสาร', amount: 300, color: '#9CA3AF' },
  { name: 'ยูทิลิตี้', amount: 200, color: '#EAB308' },
  { name: 'อาหาร ท่องเที่ยว ความบันเทิง', amount: 150, color: '#EF4444' },
  { name: 'การศึกษา', amount: 100, color: '#A855F7' }
])

// Computed values
const totalIncome = computed(() => {
  return income.value.salary + income.value.additional
})

const totalExpenses = computed(() => {
  return expenses.value.reduce((sum, expense) => sum + expense.amount, 0)
})

const remaining = computed(() => {
  return totalIncome.value - totalExpenses.value
})

// Chart segments calculation
const chartSegments = computed(() => {
  const circumference = 2 * Math.PI * 40 // r = 40
  let cumulativeOffset = 0
  
  return expenses.value.map((expense) => {
    const percentage = expense.amount / totalExpenses.value
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
/* Additional custom styles if needed */
</style>
