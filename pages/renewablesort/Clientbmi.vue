<template>
  <div class="root-bg p-4 sm:p-8 min-h-screen flex items-center justify-center">
    <div class="max-w-2xl w-full mx-auto">

      <!-- Main card (greedy theme) -->
      <div class="greedy-main relative overflow-hidden">
        <!-- glow blobs -->
        <div class="greedy-blob greedy-blob--tl" />
        <div class="greedy-blob greedy-blob--br" />

        <!-- Customer info / Center selector -->
        <div class="greedy-card customer-card px-4 py-3 mb-3 relative">
          <div class="flex items-center gap-3">
            <label class="text-sm font-bold" style="color:#E6B428; white-space:nowrap;">เลือกศูนย์:</label>
            <select 
              v-model="selectedCenter" 
              @change="onCenterChange"
              class="flex-1 px-3 py-2 rounded-lg"
              style="background:#4A2A10; color:#e5e7eb; border:1px solid #B5851F; font-size:14px;"
            >
              <option value="BMI">ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ 1</option>
              <option value="BMI_center2">ศูนย์พัฒนาเด็กเล็กบ้านสระโคล่ 1</option>
              <option value="BMI_center3">ศูนย์พัฒนาเด็กเล็กมหาวนาราม</option>
              <option value="BMI_center4">ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ 2</option>
              <option value="BMI_center5">ศูนย์พัฒนาเด็กเล็กบ้านสระโคล่ 2</option>
            </select>
            <button type="button" class="city-btn" @click="goToCity">
              <span>Espresso</span>
              <span class="city-btn-arrow" aria-hidden="true"></span>
            </button>
          </div>
        </div>

        <!-- 3 โดนัทเรียงแนวตั้ง: น้ำหนัก/อายุ · ส่วนสูง/อายุ · น้ำหนัก/ส่วนสูง -->
        <div class="flex flex-col gap-1 relative z-10">
          <div v-if="isLoading" class="greedy-card p-6 text-center" style="color:#9ca3af;">
            กำลังโหลดข้อมูล...
          </div>

          <!-- กรอบเดียว รวม 3 ตัวชี้วัด -->
          <div v-else class="greedy-card px-4 py-3">
            <div class="flex justify-between items-center mb-2">
              <h2 class="text-[13px] font-bold tracking-wider" style="color:#e5e7eb;">ภาวะโภชนาการ (สมาร์ทแทรค)</h2>
              <span class="text-[10px]" style="color:#9ca3af;">นักเรียน {{ total }} คน · ผลวัดล่าสุดต่อคน</span>
            </div>

            <div v-for="(ind, idx) in viewIndicators" :key="ind.key" class="indicator-block" :class="{ 'indicator-divider': idx > 0 }">
              <div class="text-[13px] font-bold mb-1" style="color:#E6B428;">{{ ind.title }}</div>

              <div v-if="!ind.items.length" class="text-[12px] py-4 text-center" style="color:#9ca3af;">
                ยังไม่มีข้อมูล
              </div>

              <div v-else class="donut-row">
                <!-- บน: โดนัทฝั่งซ้าย · เว้นฝั่งขวาไว้ใส่คำแนะนำ -->
                <div class="donut-top">
                  <svg class="donut" viewBox="0 0 100 100" role="img" :aria-label="ind.title">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#4A2A10" stroke-width="14" />
                    <g transform="rotate(-90 50 50)">
                      <circle
                        v-for="seg in donutSegments(ind.items)"
                        :key="seg.label"
                        cx="50" cy="50" r="40" fill="none"
                        :stroke="seg.color"
                        stroke-width="14"
                        :stroke-dasharray="seg.dashArray"
                        :stroke-dashoffset="seg.offset"
                      >
                        <title>{{ seg.label }}: {{ seg.count }} คน ({{ seg.pct }}%)</title>
                      </circle>
                    </g>
                    <!-- % บนชิ้นกราฟ (เฉพาะชิ้นที่กว้างพอ ชิ้นเล็กดูจาก tooltip) -->
                    <text
                      v-for="seg in donutSegments(ind.items).filter(s => s.pct >= 6)"
                      :key="'lb-' + seg.label"
                      :x="seg.labelX" :y="seg.labelY"
                      text-anchor="middle" dominant-baseline="central"
                      fill="#ffffff" font-size="6" font-weight="800"
                      style="pointer-events:none; paint-order:stroke; stroke:rgba(0,0,0,0.45); stroke-width:1.6px;"
                    >{{ seg.pct }}%</text>
                    <text x="50" y="46" text-anchor="middle" dominant-baseline="central" fill="#ffffff" font-size="15" font-weight="800">{{ goodPct(ind.items) }}%</text>
                    <text x="50" y="60" text-anchor="middle" dominant-baseline="central" fill="#9ca3af" font-size="7.5">อยู่ในเกณฑ์</text>
                  </svg>

                  <!-- ขวา: เว้นไว้สำหรับคำแนะนำ -->
                  <div class="advice-slot flex-1"></div>
                </div>

                <!-- legend กลางการ์ด (ใต้กราฟ) — โชว์ครบทุกระดับ + จำนวนคน -->
                <div class="donut-legend">
                  <div
                    v-for="item in ind.items"
                    :key="item.label"
                    class="flex items-center gap-1.5"
                    :style="{ opacity: item.count ? 1 : 0.45 }"
                  >
                    <span class="rounded-full flex-shrink-0" style="width:8px;height:8px;" :style="{ background: item.color }"></span>
                    <span class="text-[11px] font-semibold" style="color:#e5e7eb;">{{ item.label }}</span>
                    <span class="text-[11px] font-bold" style="color:#9ca3af;">{{ item.count }} คน</span>
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

// ── สถานะข้อมูลจาก /api/bmi-summary (DB: BMI → bmi_records) ──
const isLoading = ref(true)
const total = ref(0)
const indicators = ref([])

// สี diverging (ตรวจ CVD ทุกคู่ ≥12 + contrast บนพื้น #321609 แล้ว)
// เขียว = อยู่ในเกณฑ์ · ฝั่งน้อย เหลือง→ส้ม · ฝั่งมาก ชมพู→แดง
const CLR = {
  green:  '#10b981', // อยู่ในเกณฑ์
  yellow: '#facc15', // ฝั่งน้อย (ค่อนข้าง)
  orange: '#f97316', // ฝั่งน้อย (รุนแรง)
  pinkLt: '#f472b6', // ฝั่งมาก (เบา = ท้วม)
  pink:   '#ec4899', // ฝั่งมาก (ค่อนข้าง / เริ่มอ้วน)
  red:    '#ef4444', // ฝั่งมาก (รุนแรง)
}

// ลำดับเกณฑ์เต็มของแต่ละตัวชี้วัด (ต่ำ → ปกติ → สูง) ตามเกณฑ์กรมอนามัย
// โชว์ครบทุกระดับเสมอ — ระดับที่ไม่มีเด็กจะขึ้น 0 คนใน legend
const INDICATOR_DEFS = {
  wa: [
    { label: 'น้ำหนักค่อนข้างน้อย', color: CLR.yellow },
    { label: 'น้ำหนักน้อย', color: CLR.orange },
    { label: 'น้ำหนักตามเกณฑ์', color: CLR.green, normal: true },
    { label: 'น้ำหนักค่อนข้างมาก', color: CLR.pink },
    { label: 'น้ำหนักมาก', color: CLR.red },
  ],
  ha: [
    { label: 'ค่อนข้างเตี้ย', color: CLR.yellow },
    { label: 'เตี้ย', color: CLR.orange },
    { label: 'สูงตามเกณฑ์', color: CLR.green, normal: true },
    { label: 'ค่อนข้างสูง', color: CLR.pink },
    { label: 'สูง', color: CLR.red },
  ],
  wh: [
    { label: 'ค่อนข้างผอม', color: CLR.yellow },
    { label: 'ผอม', color: CLR.orange },
    { label: 'สมส่วน', color: CLR.green, normal: true },
    { label: 'ท้วม', color: CLR.pinkLt },
    { label: 'เริ่มอ้วน', color: CLR.pink },
    { label: 'อ้วน', color: CLR.red },
  ],
}

// รวมข้อมูลจาก API เข้ากับลำดับเกณฑ์เต็ม — เติม 0 ให้ระดับที่ไม่มีเด็ก
const viewIndicators = computed(() =>
  indicators.value.map((ind) => {
    const defs = INDICATOR_DEFS[ind.key] || []
    const counts = Object.fromEntries((ind.items || []).map(i => [i.label, i.count]))
    const items = defs.map(d => ({
      label: d.label, color: d.color, normal: !!d.normal, count: counts[d.label] || 0,
    }))
    // เผื่อ label แปลกที่ไม่อยู่ในเกณฑ์มาตรฐาน — ต่อท้ายด้วยสีเทา
    for (const i of (ind.items || [])) {
      if (!defs.find(d => d.label === i.label)) {
        items.push({ label: i.label, color: '#8a8175', normal: false, count: i.count })
      }
    }
    return { key: ind.key, title: ind.title, items }
  })
)

const selectedCenter = ref('BMI')

const fetchSummary = async (dbName = selectedCenter.value) => {
  try {
    const res = await $fetch(`/api/bmi-summary?db=${dbName}`)
    if (res && res.success && res.data) {
      total.value = res.data.total || 0
      indicators.value = res.data.indicators || []
    }
  } catch (e) {
    console.error('[bmi-summary] fetch error', e)
  } finally {
    isLoading.value = false
  }
}

const onCenterChange = () => {
  isLoading.value = true
  fetchSummary(selectedCenter.value)
}

// Jump to the City View dashboard for this center
const goToCity = () => navigateTo('/renewablesort/HuaroiEspressoCity')

// ── โดนัท: แปลง items -> ส่วนโค้ง (r=40, C≈251.3) เว้นช่อง 2px ระหว่างชิ้น ──
const C = 2 * Math.PI * 40
const donutSegments = (items) => {
  const totalCount = items.reduce((s, i) => s + i.count, 0)
  if (!totalCount) return []
  const visible = items.filter(i => i.count > 0)
  const gap = visible.length > 1 ? 2 : 0
  let pos = 0
  return visible.map((item) => {
    const len = (item.count / totalCount) * C
    const drawn = Math.max(len - gap, 0.5)
    // จุดกึ่งกลางชิ้น (มุมเริ่มที่ 12 นาฬิกา) สำหรับวางตัวเลข % บนวงแหวน
    const midAngle = ((pos + len / 2) / C) * 2 * Math.PI - Math.PI / 2
    const seg = {
      label: item.label,
      count: item.count,
      pct: Math.round((item.count / totalCount) * 100),
      color: item.color,
      dashArray: `${drawn} ${C - drawn}`,
      offset: -(pos + gap / 2),
      labelX: 50 + 40 * Math.cos(midAngle),
      labelY: 50 + 40 * Math.sin(midAngle),
    }
    pos += len
    return seg
  })
}

// สัดส่วน "อยู่ในเกณฑ์" (ระดับปกติ สีเขียว) โชว์กลางโดนัท
const goodPct = (items) => {
  const t = items.reduce((s, i) => s + i.count, 0)
  const g = items.filter(i => i.normal).reduce((s, i) => s + i.count, 0)
  return t ? Math.round((g / t) * 100) : 0
}

// Jump to the City View dashboard for this center
// const goToCity = () => navigateTo('/renewablesort/HuaroiEspressoCity')

// Poll ทุก 3 นาทีเหมือนหน้าอื่น
const POLL_INTERVAL_MS = 3 * 60 * 1000
let pollTimer = null

onMounted(() => {
  fetchSummary()
  pollTimer = setInterval(fetchSummary, POLL_INTERVAL_MS)
})

onBeforeUnmount(() => {
  if (pollTimer) clearInterval(pollTimer)
})
</script>

<style scoped>
.root-bg {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background: #000000 !important;
}

/* ── Greedy theme (เดียวกับหน้า HuaroiEspressoV3) ── */
.greedy-main {
  background: #2A1208;
  border: 2px solid #C8982C;
  border-radius: 16px;
  padding: 12px 16px;
  box-shadow: 0 0 32px rgba(200, 152, 44, 0.4);
  color: #ffffff;
}
@media (min-width: 640px) {
  .greedy-main { padding: 14px 16px; }
}

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

.greedy-card {
  background: #321609;
  border: 2px solid #B5851F;
  border-radius: 12px;
  transition: border-color 0.3s ease;
}
.greedy-card:hover { border-color: #E6B428; }

/* ── Selector + Espresso Button ── */
.city-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 22px;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.3px;
  color: #2A1208;
  background: linear-gradient(180deg, #f7f6f4 0%, #f7f6f4 50%, #f7f6f4 0%);
  border: 1px solid #f7f6f4;
  border-radius: 9999px;
  cursor: pointer;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.55),
    inset 0 -2px 4px rgba(120, 80, 0, 0.3),
    0 5px 10px rgba(0, 0, 0, 0.45);
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}
.city-btn:hover {
  background: linear-gradient(180deg, #FFD24A 0%, #E6B428 50%, #C8982C 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.55),
    inset 0 -2px 4px rgba(120, 80, 0, 0.3),
    0 7px 14px rgba(0, 0, 0, 0.5),
    0 0 16px rgba(230, 180, 40, 0.5);
  transform: translateY(-2px);
}
.city-btn:active {
  transform: translateY(0);
  box-shadow:
    inset 0 2px 5px rgba(120, 80, 0, 0.5),
    0 1px 2px rgba(0, 0, 0, 0.4);
}
.city-btn-arrow {
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 12px solid #2A1208;
  transition: transform 0.15s ease;
}
.city-btn:hover .city-btn-arrow { transform: translateX(3px); }

/* ── บล็อกตัวชี้วัดในกรอบเดียว: คั่นด้วยเส้นบางแทนการ์ดแยก ── */
.indicator-block { padding: 8px 0; }
.indicator-divider {
  border-top: 1px solid rgba(181, 133, 31, 0.3);
  margin-top: 2px;
}

/* ── การ์ดโดนัท: บน = กราฟซ้าย + พื้นที่คำแนะนำขวา · ล่าง = legend กลางการ์ด ── */
.donut-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
.donut-top {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}
/* ขนาดโดนัทล็อกเท่ากันทุกใบ (aspect-ratio 1 + flex 0 0 กันโดนยืด) */
.donut {
  width: 120px;
  height: 120px;
  aspect-ratio: 1 / 1;
  flex: 0 0 120px;
  display: block;
}
/* คำอธิบายสี — จัดกึ่งกลางการ์ด เรียงต่อกัน ตัดขึ้นบรรทัดใหม่ได้ */
.donut-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 4px 14px;
  width: 100%;
  padding-top: 4px;
  border-top: 1px solid rgba(181, 133, 31, 0.25);
}
/* ที่ว่างฝั่งขวา สำหรับใส่คำแนะนำภายหลัง */
.advice-slot { min-height: 10px; align-self: stretch; }
@media (max-width: 768px) {
  .customer-card { flex-wrap: wrap; }
  .city-btn {
    padding: 6px 14px;
    font-size: 13px;
    gap: 4px;
    order: 3;
    width: 100%;
    margin-top: 8px;
  }
}
@media (max-width: 480px) {
  .donut-top { flex-direction: column; align-items: center; }
  .donut { width: 140px; height: 140px; flex-basis: 140px; }
}
</style>
