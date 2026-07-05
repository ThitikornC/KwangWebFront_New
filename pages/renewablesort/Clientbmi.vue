<template>
  <div class="root-bg p-4 sm:p-8 min-h-screen flex items-start sm:items-center justify-center">
    <div class="max-w-2xl w-full mx-auto">

      <!-- Main card (greedy theme) -->
      <div class="greedy-main relative overflow-hidden">
        <!-- glow blobs -->
        <div class="greedy-blob greedy-blob--tl" />
        <div class="greedy-blob greedy-blob--br" />

        <!-- Customer info / Center selector -->
        <div class="greedy-card customer-card px-4 py-3 mb-3 relative">
          <div class="selector-row flex flex-wrap items-center gap-3">
            <label class="text-sm font-bold" style="color:#E6B428; white-space:nowrap;">เลือกศูนย์:</label>
            <div ref="ddRef" class="cc-dropdown flex-1 min-w-0">
              <button type="button" class="cc-trigger" @click="dropdownOpen = !dropdownOpen">
                <span class="cc-trigger-label">{{ selectedLabel }}</span>
                <span class="cc-caret" :class="{ open: dropdownOpen }" aria-hidden="true"></span>
              </button>
              <ul v-if="dropdownOpen" class="cc-menu">
                <li
                  v-for="c in CENTERS"
                  :key="c.value"
                  class="cc-item"
                  :class="{ active: c.value === selectedCenter }"
                  @click="selectCenter(c.value)"
                >
                  {{ c.label }}
                </li>
              </ul>
            </div>
            <!-- ตัวคั่น: บังคับปุ่มลงบรรทัดใหม่เฉพาะจอมือถือ -->
            <div class="selector-break" aria-hidden="true"></div>
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
            <div class="mb-2">
              <h2 class="text-[13px] font-bold tracking-wider" style="color:#e5e7eb;">สมาร์ทแทรค(การติดตามการเจริญเติบโต)</h2>
            </div>

            <div v-for="(ind, idx) in viewIndicators" :key="ind.key" class="indicator-block" :class="{ 'indicator-divider': idx > 0 }">
              <div class="text-[13px] font-bold mb-1 text-center" style="color:#E6B428;">{{ ind.title }}</div>

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

                  <!-- ขวา: เกณฑ์อ้างอิงกรมอนามัย (ควรอยู่ที่เท่าไหร่) -->
                  <div class="advice-slot">
                    <div v-if="refFor(ind.key)" class="ref-box">
                      <div class="ref-title">{{ refFor(ind.key).title }}</div>
                      <table class="ref-table">
                        <thead>
                          <tr>
                            <th v-for="(c, ci) in refFor(ind.key).cols" :key="c" :class="{ 'ref-head-cat': ci === 0 }">{{ c }}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="row in refFor(ind.key).rows" :key="row[0]">
                            <td v-for="(cell, ci) in row" :key="ci" :class="{ 'ref-cell-cat': ci === 0 }">{{ cell }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <!-- legend กลางการ์ด (ใต้กราฟ) — โชว์ครบทุกระดับ + จำนวนคน -->
                <div class="donut-legend">
                  <div
                    v-for="item in ind.items"
                    :key="item.label"
                    class="flex items-center gap-1"
                    :style="{ opacity: item.count ? 1 : 0.45 }"
                  >
                    <span class="rounded-full flex-shrink-0" style="width:9px;height:9px;" :style="{ background: item.color }"></span>
                    <span class="text-[12px] font-semibold whitespace-nowrap" style="color:#e5e7eb;">{{ item.label }}</span>
                    <span class="text-[12px] font-bold whitespace-nowrap" style="color:#9ca3af;">{{ item.count }} คน</span>
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

// ── เกณฑ์อ้างอิง "ค่ากลาง (median)" ตามมาตรฐาน WHO 2006 / กรมอนามัยไทย ──
// ค่าโดยประมาณ ระดับใช้งานได้ — แก้ตัวเลขได้ง่ายถ้ามีตารางทางการ
const REFERENCE = {
  wa: {
    title: 'เกณฑ์ที่เหมาะสม',
    cols: ['อายุ', 'น้ำหนักควรอยู่ที่ (กก.)'],
    // [ช่วงอายุ, ชาย, หญิง] — ยุบชาย/หญิงเป็นค่าเดียว/ช่วงตอนแสดง
    rows: [
      ['2 ปี', '12.2', '11.5'],
      ['3 ปี', '14.3', '13.9'],
      ['4 ปี', '16.3', '16.1'],
      ['5 ปี', '18.3', '18.2'],
    ],
  },
  ha: {
    title: 'เกณฑ์ที่เหมาะสม',
    cols: ['อายุ', 'ส่วนสูงควรอยู่ที่ (ซม.)'],
    rows: [
      ['2 ปี', '87', '86'],
      ['3 ปี', '96', '95'],
      ['4 ปี', '103', '103'],
      ['5 ปี', '110', '109'],
    ],
  },
  wh: {
    title: 'เกณฑ์ที่เหมาะสม',
    cols: ['ส่วนสูง', 'น้ำหนักควรอยู่ที่ (กก.)'],
    rows: [
      ['85 ซม.', '11.8', '11.9'],
      ['90 ซม.', '13.0', '12.9'],
      ['95 ซม.', '14.1', '14.2'],
      ['100 ซม.', '15.6', '15.6'],
      ['105 ซม.', '17.2', '17.2'],
      ['110 ซม.', '19.0', '19.2'],
    ],
  },
}
// ยุบชาย/หญิงเป็นคอลัมน์เดียว — ต่างกันแสดงเป็นช่วง (ต่ำ–สูง) เท่ากันแสดงค่าเดียว
const fmtRange = (a, b) => {
  const x = parseFloat(a), y = parseFloat(b)
  const lo = Math.min(x, y), hi = Math.max(x, y)
  return lo === hi ? `${a}` : `${lo} - ${hi}`
}
const refFor = (key) => {
  const r = REFERENCE[key]
  if (!r) return null
  return {
    title: r.title,
    cols: r.cols,
    rows: r.rows.map(row => [row[0], fmtRange(row[1], row[2])]),
  }
}

// ── รายชื่อศูนย์ (custom dropdown แทน native select ที่ popup ล้นกรอบ) ──
const CENTERS = [
  { value: 'BMI', label: 'ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ 1' },
  { value: 'BMI_center4', label: 'ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ 2' },
  { value: 'BMI_center2', label: 'ศูนย์พัฒนาเด็กเล็กบ้านสระโคล่ 1' },
  { value: 'BMI_center5', label: 'ศูนย์พัฒนาเด็กเล็กบ้านสระโคล่ 2' },
  { value: 'BMI_center3', label: 'ศูนย์พัฒนาเด็กเล็กมหาวนาราม' },
]
const selectedCenter = ref('BMI')
const dropdownOpen = ref(false)
const ddRef = ref(null)
const selectedLabel = computed(() =>
  CENTERS.find(c => c.value === selectedCenter.value)?.label || 'เลือกศูนย์'
)
const selectCenter = (value) => {
  dropdownOpen.value = false
  if (value !== selectedCenter.value) {
    selectedCenter.value = value
    onCenterChange()
  }
}
const onDocClick = (e) => {
  if (ddRef.value && !ddRef.value.contains(e.target)) dropdownOpen.value = false
}

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

// Jump back to the V4 city view (this page is entered from V4)
const goToCity = () => navigateTo('/renewablesort/HuaroiEspressoV4')

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
  document.addEventListener('click', onDocClick)
})

onBeforeUnmount(() => {
  if (pollTimer) clearInterval(pollTimer)
  document.removeEventListener('click', onDocClick)
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
  justify-content: center;   /* โดนัท + ตาราง จับคู่กันไว้กลาง */
  flex-wrap: wrap;           /* แคบเกินไปก็ห่อบรรทัดเอง (มือถือ) */
  gap: 16px 48px;
  width: 100%;
}
/* ขนาดโดนัทล็อกเท่ากันทุกใบ (aspect-ratio 1 + flex 0 0 กันโดนยืด) */
.donut {
  width: 160px;
  height: 160px;
  aspect-ratio: 1 / 1;
  flex: 0 0 160px;
  display: block;
}
/* คำอธิบายสี — จัดกึ่งกลางการ์ด เรียงต่อกัน ตัดขึ้นบรรทัดใหม่ได้ */
.donut-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 3px 10px;
  width: 100%;
  padding-top: 8px;   /* = ระยะด้านล่าง (indicator-block padding) ให้ legend อยู่กึ่งกลางระหว่างเส้น */
  border-top: 1px solid rgba(181, 133, 31, 0.25);
}
/* ที่ว่างฝั่งขวา = ตารางเกณฑ์อ้างอิงกรมอนามัย */
.advice-slot { min-height: 10px; align-self: center; display: flex; justify-content: center; }
.ref-box {
  width: 260px;
  max-width: 100%;
  background: rgba(74, 42, 16, 0.35);
  border: 1px solid rgba(181, 133, 31, 0.4);
  border-radius: 8px;
  padding: 6px 8px;
}
.ref-title {
  font-size: 10.5px;
  font-weight: 700;
  color: #E6B428;
  margin-bottom: 4px;
  line-height: 1.2;
}
.ref-table {
  width: 100%;
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
}
.ref-table th,
.ref-table td {
  padding: 2px 6px;
  font-size: 11px;
  text-align: right;
  color: #e5e7eb;
}
.ref-table th {
  font-weight: 700;
  color: #9ca3af;
  border-bottom: 1px solid rgba(181, 133, 31, 0.3);
}
.ref-head-cat,
.ref-cell-cat { text-align: left; color: #cbb98f; }
.ref-table tbody tr + tr td { border-top: 1px solid rgba(181, 133, 31, 0.12); }
/* ── Custom dropdown เลือกศูนย์ (คุมความกว้าง/สี/ตำแหน่งเอง อยู่ในกรอบ) ── */
.cc-dropdown { position: relative; }
.cc-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 9px 12px;
  background: #4A2A10;
  color: #e5e7eb;
  border: 1px solid #B5851F;
  border-radius: 8px;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
}
.cc-trigger:hover { border-color: #E6B428; }
.cc-trigger-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cc-caret {
  flex-shrink: 0;
  width: 0; height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #E6B428;
  transition: transform 0.15s ease;
}
.cc-caret.open { transform: rotate(180deg); }
.cc-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 60;
  margin: 0;
  padding: 4px;
  list-style: none;
  background: #2A1208;
  border: 1px solid #B5851F;
  border-radius: 8px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.55);
  max-height: 280px;
  overflow-y: auto;
}
.cc-item {
  padding: 8px 10px;
  border-radius: 6px;
  color: #e5e7eb;
  font-size: 14px;
  line-height: 1.3;
  cursor: pointer;
  white-space: normal;   /* ขึ้นบรรทัดใหม่ได้ ให้เห็นชื่อเต็ม ไม่โดน ... ตัด */
  word-break: break-word;
}
.cc-item:hover { background: #4A2A10; }
.cc-item.active { background: #B5851F; color: #2A1208; font-weight: 700; }

/* ตัวคั่นบังคับขึ้นบรรทัดใหม่ — โชว์เฉพาะจอมือถือ */
.selector-break { display: none; }
@media (max-width: 640px) {
  .selector-break { display: block; flex-basis: 100%; height: 0; }
  .selector-row { justify-content: center; }  /* ปุ่ม Espresso อยู่กลางเมื่อ wrap ลงบรรทัดใหม่ */
  .cc-trigger, .cc-item { font-size: 12px; }   /* ย่อฟอนต์ให้เห็นชื่อเต็ม */
  .city-btn {
    padding: 6px 14px;
    font-size: 13px;
    gap: 4px;
  }
}
@media (max-width: 480px) {
  .donut { width: 140px; height: 140px; flex-basis: 140px; }
  .ref-box { max-width: 100%; }
}
</style>
