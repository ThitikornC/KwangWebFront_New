<template>
  <div class="root-bg p-4 sm:p-8 min-h-screen flex items-start justify-center">
    <div class="max-w-3xl w-full mx-auto">

      <!-- Main card (greedy theme) -->
      <div class="greedy-main relative overflow-hidden">
        <!-- glow blobs -->
        <div class="greedy-blob greedy-blob--tl" />
        <div class="greedy-blob greedy-blob--br" />

        <!-- Header: ชื่อสมุด + ปุ่มกลับแดชบอร์ด -->
        <div class="greedy-card px-4 py-3 mb-3 relative z-10">
          <div class="flex flex-wrap items-center gap-3">
            <div class="flex-1 min-w-0">
              <div class="text-sm font-bold" style="color:#E6B428;">สมาร์ทแทรค</div>
            </div>
            <button type="button" class="back-btn" @click="goToDashboard">
              <span class="back-btn-arrow" aria-hidden="true"></span>
              <span>แดชบอร์ด</span>
            </button>
          </div>
        </div>

        <!-- มุมมองชั้นหนังสือ: เลือกศูนย์ + แฟ้มประจำตัวเด็กแต่ละคน -->
        <template v-if="view === 'shelf'">
          <div class="greedy-card px-4 py-3 mb-3 relative z-20">
            <div class="flex items-center gap-2">
              <label class="text-[12px] font-bold flex-shrink-0" style="color:#E6B428;">ศูนย์:</label>
              <div ref="ddCenterRef" class="cc-dropdown flex-1 min-w-0">
                <button type="button" class="cc-trigger" @click="centerOpen = !centerOpen">
                  <span class="cc-trigger-label">{{ selectedCenterLabel }}</span>
                  <span class="cc-caret" :class="{ open: centerOpen }" aria-hidden="true"></span>
                </button>
                <ul v-if="centerOpen" class="cc-menu">
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
            </div>
          </div>

          <div v-if="isLoading" class="greedy-card p-6 text-center relative z-10" style="color:#9ca3af;">
            กำลังโหลดข้อมูล...
          </div>
          <div v-else-if="students.length" class="greedy-card px-4 pt-3 pb-4 relative z-10">
            <div class="text-[13px] font-bold text-center" style="color:#E6B428;">ชั้นหนังสือสมุดพกประจำตัวเด็ก</div>
            <div class="text-[10.5px] text-center mb-3" style="color:#9ca3af;">  ทั้งหมด {{ students.length }} คน</div>
            <div class="bookshelf">
              <button
                v-for="(s, i) in students"
                :key="s.key"
                type="button"
                class="book-cover"
                :style="spineStyle(i)"
                @click="openBook(s, $event)"
              >
                <span class="cover-tag">สมุดพกสุขภาพ</span>
                <!-- ตรากลางปก: รูปเด็กถ้ามี ไม่มีก็อักษรย่อในวงทอง -->
                <span class="cover-badge">
                  <img v-if="s.photo" :src="s.photo" alt="" />
                  <template v-else>{{ initialOf(s.name) }}</template>
                </span>
                <span class="cover-name">{{ s.name }}</span>
                <span class="cover-room">{{ s.classroom }}</span>
              </button>
            </div>
          </div>
          <div v-else class="greedy-card p-6 text-center relative z-10" style="color:#9ca3af;">
            ยังไม่มีข้อมูลเด็กในศูนย์นี้
          </div>
        </template>

        <!-- มุมมองสมุดพกของเด็กที่เลือกจากชั้น -->
        <template v-else-if="selectedStudent">
          <div class="greedy-card px-4 py-2 mb-3 relative z-10 flex flex-wrap items-center gap-3">
            <button type="button" class="back-btn" @click="backToShelf">
              <span class="back-btn-arrow" aria-hidden="true"></span>
              <span>ชั้นหนังสือ</span>
            </button>
            <span class="text-[11px]" style="color:#9ca3af;">{{ selectedCenterLabel }}</span>
          </div>
          <!-- ── สมุดพก: ทุกหน้าตั้งแต่นี้ลงไปเป็นพื้นหลังกระดาษ ── -->
          <div class="book-page">
          <!-- ข้อมูลประจำตัว (หัวสมุดพก) -->
          <div class="greedy-card paper-card px-4 py-3 mb-3 relative z-10">
            <div class="flex items-center gap-3">
              <!-- รูปเด็กจากสมาร์ทแทรค — ยังไม่ถ่ายรูปจะเป็นวงอักษรย่อแทน -->
              <div v-if="selectedStudent.photo" class="book-avatar">
                <img :src="selectedStudent.photo" alt="รูปเด็ก" />
              </div>
              <div v-else class="book-avatar book-avatar--empty">{{ initialOf(selectedStudent.name) }}</div>
              <div class="flex flex-wrap gap-x-6 gap-y-1 flex-1 min-w-0">
                <div class="text-[12px]" style="color:#4A2A10;"><span style="color:#8a7355;">ชื่อ-สกุล:</span> <b style="color:#8a5a1a;">{{ selectedStudent.name }}</b></div>
                <div class="text-[12px]" style="color:#4A2A10;"><span style="color:#8a7355;">ห้องเรียน:</span> {{ selectedStudent.classroom || '-' }}</div>
                <div class="text-[12px]" style="color:#4A2A10;"><span style="color:#8a7355;">เพศ:</span> {{ genderLabel(selectedStudent.gender) }}</div>
                <div v-if="firstRecord" class="text-[12px]" style="color:#4A2A10;">
                  <span style="color:#8a7355;">เริ่มบันทึก:</span>
                  อายุ {{ ageLabel(firstRecord) }} ปี · น้ำหนัก {{ firstRecord.w }} กก. · ส่วนสูง {{ firstRecord.h }} ซม.
                </div>
              </div>
            </div>
          </div>

          <!-- แท็บ 3 ส่วนตามสมุดพกกระดาษ -->
          <div class="flex gap-1 mb-2 relative z-10">
            <button
              v-for="t in TABS"
              :key="t.key"
              type="button"
              class="tab-btn"
              :class="{ active: tab === t.key }"
              @click="tab = t.key"
            >{{ t.label }}</button>
          </div>

          <!-- ── แท็บ 1: บันทึกน้ำหนัก และส่วนสูง (ข้อมูลจริงจากสมาร์ทแทรค) ── -->
          <div v-if="tab === 'growth'" class="greedy-card paper-card px-3 py-3 relative z-10">
            <div class="text-[13px] font-bold mb-1 text-center" style="color:#8a5a1a;">บันทึกน้ำหนัก และส่วนสูง</div>
            <div class="text-[10.5px] mb-2 text-center" style="color:#8a7355;">
              ช่วงตามเกณฑ์อ้างอิงสมุดบันทึกสุขภาพ (กรมอนามัย) ตามอายุและเพศ · ผลประเมินจากสมาร์ทแทรค
            </div>

            <div v-if="!selectedStudent.records.length" class="text-[12px] py-4 text-center" style="color:#8a7355;">
              ยังไม่มีข้อมูลการชั่ง-วัด
            </div>

            <template v-else>
              <!-- กราฟการเจริญเติบโต: ค่าจริงของเด็กบนแถบช่วงตามเกณฑ์ -->
              <div v-if="growthCharts.length" class="charts-grid mb-3">
                <div v-for="ch in growthCharts" :key="ch.key" class="chart-card" :class="{ 'chart-card--wide': ch.wide }">
                  <div class="chart-title">{{ ch.title }}</div>
                  <div class="chart-plot">
                    <svg class="growth-svg" :viewBox="`0 0 ${ch.W} ${ch.H}`" role="img" :aria-label="ch.title">
                      <!-- grid + แกน y -->
                      <g v-for="t in ch.yTicks" :key="'y' + t.v">
                        <line :x1="ch.padL" :x2="ch.W - ch.padR" :y1="t.y" :y2="t.y" stroke="rgba(139,94,26,0.22)" stroke-width="1" />
                        <text :x="ch.padL - 5" :y="t.y" text-anchor="end" dominant-baseline="central" fill="#8a7355" font-size="8.5">{{ t.label }}</text>
                      </g>
                      <!-- แกน x (อายุ / ส่วนสูง) -->
                      <g v-for="t in ch.xTicks" :key="'x' + t.x">
                        <line :x1="t.x" :x2="t.x" :y1="ch.padT" :y2="ch.H - ch.padB" stroke="rgba(139,94,26,0.16)" stroke-width="1" />
                        <text :x="t.x" :y="ch.H - ch.padB + 12" text-anchor="middle" fill="#8a7355" font-size="8.5">{{ t.label }}</text>
                      </g>
                      <!-- โซนสีทุกระดับเกณฑ์ (ตัดที่เส้น SD เดียวกับสมาร์ทแทรค) -->
                      <path v-for="z in ch.zones" :key="z.label" :d="z.path" :fill="z.fill">
                        <title>{{ z.label }}</title>
                      </path>
                      <!-- เน้นขอบโซนตามเกณฑ์ (−1.5SD / +1.5SD) -->
                      <path :d="ch.normTopPath" fill="none" stroke="#059669" stroke-width="1" stroke-opacity="0.7" />
                      <path :d="ch.normBotPath" fill="none" stroke="#059669" stroke-width="1" stroke-opacity="0.7" />
                      <!-- เส้นค่าจริง -->
                      <path :d="ch.linePath" fill="none" stroke="#B5851F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <g v-for="(p, i) in ch.points" :key="'p' + i">
                        <circle :cx="p.x" :cy="p.y" r="4.5" fill="#B5851F" stroke="#321609" stroke-width="2" />
                        <!-- จุดรับ hover ใหญ่กว่าจุดจริง -->
                        <circle
                          :cx="p.x" :cy="p.y" r="12" fill="transparent" style="cursor:pointer;"
                          @mouseenter="hoverPt = { chart: ch.key, i }"
                          @mouseleave="hoverPt = null"
                        >
                          <title>{{ p.date }} · อายุ {{ p.age }} · {{ p.value }} {{ ch.unit }} (เกณฑ์ {{ p.range }}) · {{ p.stat }}</title>
                        </circle>
                      </g>
                      <!-- กำกับค่าจุดล่าสุด -->
                      <text
                        v-if="ch.points.length"
                        :x="ch.lastLabel.x" :y="ch.lastLabel.y"
                        :text-anchor="ch.lastLabel.anchor"
                        fill="#4A2A10" font-size="9.5" font-weight="800"
                        style="paint-order:stroke; stroke:rgba(243,233,210,0.9); stroke-width:2.5px;"
                      >{{ ch.points[ch.points.length - 1].value }}</text>
                    </svg>
                    <!-- tooltip -->
                    <div
                      v-if="hoverPt && hoverPt.chart === ch.key && ch.points[hoverPt.i]"
                      class="chart-tip"
                      :style="tipStyle(ch, ch.points[hoverPt.i])"
                    >
                      <div style="color:#8a7355;">{{ ch.points[hoverPt.i].date }} · อายุ {{ ch.points[hoverPt.i].age }}</div>
                      <div><b style="color:#7a2e0e;">{{ ch.points[hoverPt.i].value }} {{ ch.unit }}</b> <span style="color:#8a7355;">(เกณฑ์ {{ ch.points[hoverPt.i].range }})</span></div>
                      <div>{{ ch.points[hoverPt.i].stat }}</div>
                    </div>
                  </div>
                  <!-- ระดับเกณฑ์ของกราฟนี้ (เรียงต่ำ → สูง) -->
                  <div class="zone-legend">
                    <span v-for="z in ch.zones" :key="z.label" class="zone-key">
                      <span class="zone-swatch" :style="{ background: z.fill, borderColor: z.color }"></span>{{ z.short }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="book-table-wrap">
              <table class="book-table">
                <thead>
                  <tr>
                    <th rowspan="2">วัน/เดือน/ปี</th>
                    <th rowspan="2">อายุ<br>(ปี/เดือน)</th>
                    <th colspan="3">น้ำหนัก (กก.)</th>
                    <th colspan="3">ส่วนสูง (ซม.)</th>
                    <th rowspan="2">น้ำหนัก<br>ตามส่วนสูง</th>
                  </tr>
                  <tr>
                    <th>ช่วงตามเกณฑ์</th>
                    <th>จริง</th>
                    <th>ผล</th>
                    <th>ช่วงตามเกณฑ์</th>
                    <th>จริง</th>
                    <th>ผล</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(r, i) in selectedStudent.records" :key="i">
                    <td class="whitespace-nowrap">{{ thDate(r.date) }}</td>
                    <td class="whitespace-nowrap">{{ ageLabel(r) }}</td>
                    <td class="whitespace-nowrap">{{ refRange(r, 'w') }}</td>
                    <td class="cell-actual">{{ r.w ?? '-' }}</td>
                    <td><span class="stat-chip" :style="chipStyle(r.colorWA, r.statWA)">{{ shortStat(r.statWA) }}</span></td>
                    <td class="whitespace-nowrap">{{ refRange(r, 'h') }}</td>
                    <td class="cell-actual">{{ r.h ?? '-' }}</td>
                    <td><span class="stat-chip" :style="chipStyle(r.colorHA, r.statHA)">{{ shortStat(r.statHA) }}</span></td>
                    <td><span class="stat-chip" :style="chipStyle(r.colorWH, r.statWH)">{{ r.statWH || '-' }}</span></td>
                  </tr>
                </tbody>
              </table>
              </div>
            </template>
          </div>

          <!-- ── แท็บ 2: ผลประเมินพัฒนาการ (มฐ.1–12) ── -->
          <div v-else-if="tab === 'dev'" class="greedy-card paper-card px-3 py-3 relative z-10">
            <div class="text-[13px] font-bold mb-1 text-center" style="color:#8a5a1a;">ผลประเมินพัฒนาการเด็กปฐมวัย</div>
            <div class="text-[10.5px] mb-2 text-center" style="color:#8a7355;">
              ข้อ ๑.๑ เชื่อมผลชั่ง-วัดล่าสุดจากสมาร์ทแทรคอัตโนมัติ · ข้ออื่นรอครูประจำชั้นบันทึก
            </div>

            <div v-for="domain in DEV_STANDARDS" :key="domain.domain" class="mb-2">
              <div class="dev-domain">{{ domain.domain }}</div>
              <div v-for="std in domain.standards" :key="std.title" class="dev-std">
                <div class="dev-std-title">{{ std.title }}</div>
                <div v-for="item in std.items" :key="item" class="dev-item">
                  <span class="dev-item-name">{{ item }}</span>
                  <!-- ข้อ 1.1 ลิงค์กับสมาร์ทแทรค: โชว์ผลล่าสุดจริง -->
                  <span v-if="isGrowthItem(item) && latestRecord" class="flex flex-wrap gap-1 justify-end">
                    <span class="stat-chip" :style="chipStyle(latestRecord.colorWA, latestRecord.statWA)">{{ latestRecord.statWA }}</span>
                    <span class="stat-chip" :style="chipStyle(latestRecord.colorHA, latestRecord.statHA)">{{ latestRecord.statHA }}</span>
                  </span>
                  <span v-else class="dev-item-pending">รอประเมิน</span>
                </div>
              </div>
            </div>
          </div>

          <!-- ── แท็บ 3: ความคิดเห็นครูประจำชั้น ── -->
          <div v-else class="greedy-card paper-card px-3 py-3 relative z-10">
            <div class="text-[13px] font-bold mb-2 text-center" style="color:#8a5a1a;">ความคิดเห็นครูประจำชั้น</div>
            <div v-for="term in [1, 2]" :key="term" class="mb-3">
              <div class="dev-domain">ภาคเรียนที่ {{ term }}</div>
              <div v-for="d in COMMENT_DOMAINS" :key="d" class="comment-row">
                <span class="comment-label">{{ d }}</span>
                <span class="comment-line">รอบันทึกจากครูประจำชั้น</span>
              </div>
            </div>
          </div>
          </div>
          <!-- ── /book-page ── -->
        </template>

      </div>

      <!-- Animation เปิดสมุด: เล่มที่กดลอยมากลางจอ แล้วปกกางออกเผยหน้ากระดาษ -->
      <div v-if="opening" class="open-anim-backdrop" :class="{ go: openingGo, done: openingDone }">
        <div class="open-anim-book" :style="openAnimStyle">
          <!-- หน้าขวาของสมุดที่กางออก (กระดาษเปล่า) -->
          <div class="anim-page"></div>
          <!-- ปกหน้า (หมุนเปิดรอบสันซ้าย) — ด้านหลังปกเป็นหน้าซ้ายกระดาษเปล่า -->
          <div class="anim-flip">
            <div class="book-cover anim-cover-front" :style="spineStyle()">
              <span class="cover-tag">สมุดพกสุขภาพ</span>
              <span class="cover-badge">
                <img v-if="opening.s.photo" :src="opening.s.photo" alt="" />
                <template v-else>{{ initialOf(opening.s.name) }}</template>
              </span>
              <span class="cover-name">{{ opening.s.name }}</span>
              <span class="cover-room">{{ opening.s.classroom }}</span>
            </div>
            <div class="anim-cover-back"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// ── รายชื่อศูนย์ (ชุดเดียวกับหน้า Clientbmi) ──
const CENTERS = [
  { value: 'BMI', label: 'ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ 1' },
  { value: 'BMI_center4', label: 'ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ 2' },
  { value: 'BMI_center2', label: 'ศูนย์พัฒนาเด็กเล็กบ้านสระโคล่ 1' },
  { value: 'BMI_center5', label: 'ศูนย์พัฒนาเด็กเล็กเทศบาลหัวรอ 3' },
  { value: 'BMI_center3', label: 'ศูนย์พัฒนาเด็กเล็กมหาวนาราม' },
]

const isLoading = ref(true)
const students = ref([])
const selectedCenter = ref('BMI')
const selectedStudentKey = ref(null)

// มุมมอง: 'shelf' = ชั้นเก็บแฟ้มเด็กทุกคน · 'book' = สมุดพกของเด็กที่กดเลือก
const view = ref('shelf')

const centerOpen = ref(false)
const ddCenterRef = ref(null)

const tab = ref('growth')
const TABS = [
  { key: 'growth', label: 'น้ำหนัก-ส่วนสูง' },
  { key: 'dev', label: 'ผลประเมินพัฒนาการ' },
  { key: 'comment', label: 'ความคิดเห็นครู' },
]

const selectedCenterLabel = computed(() =>
  CENTERS.find(c => c.value === selectedCenter.value)?.label || 'เลือกศูนย์'
)
const selectedStudent = computed(() =>
  students.value.find(s => s.key === selectedStudentKey.value) || null
)
const firstRecord = computed(() => selectedStudent.value?.records[0] || null)
const latestRecord = computed(() => {
  const rs = selectedStudent.value?.records || []
  return rs.length ? rs[rs.length - 1] : null
})

const selectCenter = (value) => {
  centerOpen.value = false
  if (value !== selectedCenter.value) {
    selectedCenter.value = value
    fetchStudents()
  }
}
const onDocClick = (e) => {
  if (ddCenterRef.value && !ddCenterRef.value.contains(e.target)) centerOpen.value = false
}

// เปิดเล่มจากชั้น → เล่น animation เปิดสมุดเต็มจอก่อน แล้วค่อยเข้าหน้าข้อมูล
const opening = ref(null)     // { s, top, left, w, h, dx, dy, sc } ของเล่มที่กด
const openingGo = ref(false)
const openingDone = ref(false)  // เฟสเฟดออกหลังสมุดกางเต็มที่
let openTimer = null

const enterBook = (key) => {
  selectedStudentKey.value = key
  tab.value = 'growth'
  view.value = 'book'
}

const openBook = (s, event) => {
  if (opening.value) return
  const reduceMotion = typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const el = event && event.currentTarget
  if (reduceMotion || !el || !el.getBoundingClientRect) {
    enterBook(s.key)
    return
  }
  // จับตำแหน่งเล่มบนจอ → ลอยไปกลางจอ ขยายใหญ่ (สูง ~72% ของจอ) แล้วกางปกเป็นสองหน้า
  const r = el.getBoundingClientRect()
  // สเกลจำกัดทั้งสูงและกว้าง: ตอนกางออกสมุดกว้าง 2 เท่าของปก ต้องไม่ล้นจอ
  const sc = Math.min(
    (window.innerHeight * 0.72) / r.height,
    (window.innerWidth * 0.44) / r.width,
  )
  opening.value = {
    s,
    top: r.top,
    left: r.left,
    w: r.width,
    h: r.height,
    // เลื่อนขวาครึ่งความกว้าง(หลังขยาย) เพื่อให้สมุดที่กางสองหน้าอยู่กึ่งกลางจอ
    dx: window.innerWidth / 2 - (r.left + r.width / 2) + (r.width * sc) / 2,
    dy: window.innerHeight / 2 - (r.top + r.height / 2),
    sc,
  }
  // รอ 2 เฟรมให้ overlay วาดที่ตำแหน่งตั้งต้นก่อน ค่อยติดคลาส .go ให้ transition วิ่ง
  requestAnimationFrame(() => requestAnimationFrame(() => { openingGo.value = true }))
  // กางเสร็จ ~1.5s ค้างโชว์สองหน้า แล้วสลับไปหน้าข้อมูลพร้อมเฟด overlay ออก
  openTimer = setTimeout(() => {
    enterBook(s.key)
    openingDone.value = true
    openTimer = setTimeout(() => {
      opening.value = null
      openingGo.value = false
      openingDone.value = false
    }, 400)
  }, 1900)
}

const openAnimStyle = computed(() => {
  const o = opening.value
  if (!o) return {}
  return {
    top: `${o.top}px`,
    left: `${o.left}px`,
    width: `${o.w}px`,
    height: `${o.h}px`,
    '--dx': `${o.dx}px`,
    '--dy': `${o.dy}px`,
    '--sc': o.sc,
  }
})

const backToShelf = () => { view.value = 'shelf' }

// ปกสีม่วงล้วนทุกเล่ม (สีตกแต่ง ไม่ได้สื่อข้อมูล)
const COVER_COLOR = '#5b2d84'
const spineStyle = () => ({
  background: `linear-gradient(180deg, ${COVER_COLOR} 0%, ${COVER_COLOR} 68%, rgba(0,0,0,0.35) 100%), ${COVER_COLOR}`,
})

const fetchStudents = async () => {
  try {
    isLoading.value = true
    const res = await $fetch(`/api/bmi-students?db=${selectedCenter.value}`)
    if (res && res.success && res.data) {
      students.value = res.data.students || []
    } else {
      students.value = []
    }
  } catch (e) {
    console.error('[bmi-students] fetch error', e)
    students.value = []
  } finally {
    // เด็กที่เคยเลือกไม่อยู่ในศูนย์นี้ → ล้างและกลับชั้นหนังสือ
    if (selectedStudentKey.value && !students.value.find(s => s.key === selectedStudentKey.value)) {
      selectedStudentKey.value = null
      view.value = 'shelf'
    }
    isLoading.value = false
  }
}

const goToDashboard = () => navigateTo('/renewablesort/Clientbmi')

// ── ช่วงตามเกณฑ์ น้ำหนัก/ส่วนสูง รายเดือนอายุ (36–61 เดือน) แยกเพศ ──
// คัดจากตาราง "บันทึกน้ำหนัก และส่วนสูง" ในสมุดพกกระดาษ (เกณฑ์กรมอนามัย)
// รูปแบบ: [เดือน]: { wB/wG = น้ำหนักชาย/หญิง, hB/hG = ส่วนสูงชาย/หญิง }
const GROWTH_REF = {
  36: { wB: [12.1, 17.2], wG: [11.5, 16.5], hB: [89.4, 100.8], hG: [88.1, 99.2] },
  37: { wB: [12.2, 17.5], wG: [11.7, 16.8], hB: [90.0, 101.9], hG: [88.7, 100.0] },
  38: { wB: [12.4, 17.7], wG: [11.8, 17.0], hB: [90.5, 102.1], hG: [89.3, 100.6] },
  39: { wB: [12.5, 18.0], wG: [11.9, 17.3], hB: [91.1, 102.7], hG: [89.9, 101.3] },
  40: { wB: [12.6, 18.1], wG: [12.0, 17.5], hB: [91.6, 103.4], hG: [90.5, 102.0] },
  41: { wB: [12.7, 18.4], wG: [12.2, 17.7], hB: [92.2, 104.0], hG: [91.1, 102.7] },
  42: { wB: [12.8, 18.6], wG: [12.3, 17.9], hB: [92.7, 104.6], hG: [91.6, 103.3] },
  43: { wB: [13.0, 18.8], wG: [12.4, 18.1], hB: [93.2, 105.2], hG: [92.2, 104.0] },
  44: { wB: [13.1, 19.0], wG: [12.6, 18.4], hB: [93.8, 105.8], hG: [92.8, 104.6] },
  45: { wB: [13.2, 19.3], wG: [12.7, 18.6], hB: [94.3, 106.4], hG: [93.3, 105.1] },
  46: { wB: [13.4, 19.5], wG: [12.8, 18.7], hB: [94.8, 107.0], hG: [93.9, 105.7] },
  47: { wB: [13.5, 19.7], wG: [12.9, 18.9], hB: [95.4, 107.6], hG: [94.4, 106.3] },
  48: { wB: [13.6, 19.9], wG: [13.0, 19.2], hB: [95.9, 108.2], hG: [95.0, 106.9] },
  49: { wB: [13.7, 20.2], wG: [13.1, 19.4], hB: [96.4, 108.7], hG: [95.5, 107.5] },
  50: { wB: [13.8, 20.4], wG: [13.2, 19.6], hB: [96.9, 109.3], hG: [96.0, 108.0] },
  51: { wB: [13.9, 20.6], wG: [13.3, 19.8], hB: [97.5, 109.9], hG: [96.5, 108.6] },
  52: { wB: [14.0, 20.8], wG: [13.5, 19.9], hB: [98.0, 110.5], hG: [97.0, 109.2] },
  53: { wB: [14.1, 21.0], wG: [13.6, 20.2], hB: [98.5, 111.1], hG: [97.5, 109.8] },
  54: { wB: [14.2, 21.2], wG: [13.7, 20.3], hB: [99.0, 111.7], hG: [98.0, 110.4] },
  55: { wB: [14.4, 21.5], wG: [13.8, 20.5], hB: [99.6, 112.3], hG: [98.5, 111.0] },
  56: { wB: [14.5, 21.7], wG: [13.9, 20.7], hB: [100.1, 112.8], hG: [99.0, 111.6] },
  57: { wB: [14.7, 21.9], wG: [14.0, 21.0], hB: [100.6, 113.4], hG: [99.5, 112.1] },
  58: { wB: [14.8, 22.1], wG: [14.1, 21.2], hB: [101.1, 114.0], hG: [100.1, 112.7] },
  59: { wB: [14.9, 22.4], wG: [14.3, 21.4], hB: [101.6, 114.5], hG: [100.6, 113.3] },
  60: { wB: [15.0, 22.6], wG: [14.4, 21.7], hB: [102.0, 115.1], hG: [101.1, 113.9] },
  61: { wB: [15.1, 22.9], wG: [14.5, 22.0], hB: [102.5, 115.6], hG: [101.6, 114.5] },
}

// ช่วงตามเกณฑ์ของ record ตามอายุ(เดือน)+เพศ — นอกช่วงตารางคืน '-'
const refRange = (r, kind) => {
  const row = GROWTH_REF[r.ageTotalM]
  if (!row) return '-'
  const key = kind + (String(r.gender).toLowerCase() === 'girl' ? 'G' : 'B')
  const range = row[key]
  return range ? `${range[0]} - ${range[1]}` : '-'
}

// ── กราฟการเจริญเติบโต: จุดค่าจริงบนโซนสีครบทุกระดับเกณฑ์ ──
const CH = { W: 340, H: 190, padL: 34, padR: 12, padT: 14, padB: 26 }
const CH_WIDE = { W: 700, H: 200, padL: 36, padR: 14, padT: 14, padB: 26 }
const hoverPt = ref(null)

// ตารางอ้างอิงชุดเดียวกับแอปสมาร์ทแทรค (BMI.html · เกณฑ์กรมอนามัย 2564) ช่วง 2-6 ปี
// y = [−2SD, −1.5SD, ค่ากลาง, +1.5SD, +2SD, (+3SD เฉพาะ wh)]
const SD_REF = {
  boy: {
    wa: [
      { x: 24, y: [9.7, 10.3, 12.2, 14.4, 15.3] },
      { x: 30, y: [10.5, 11.2, 13.3, 15.7, 16.9] },
      { x: 36, y: [11.3, 12.0, 14.3, 17.0, 18.3] },
      { x: 42, y: [12.0, 12.8, 15.3, 18.2, 19.7] },
      { x: 48, y: [12.7, 13.6, 16.3, 19.4, 21.2] },
      { x: 54, y: [13.4, 14.3, 17.3, 20.7, 22.7] },
      { x: 60, y: [14.1, 15.1, 18.3, 21.9, 24.2] },
      { x: 72, y: [15.5, 16.6, 20.2, 24.5, 27.0] },
    ],
    ha: [
      { x: 24, y: [81, 82, 87, 92, 93] },
      { x: 30, y: [85, 86, 92, 97, 98] },
      { x: 36, y: [88, 90, 96, 101, 103] },
      { x: 42, y: [92, 93, 100, 105, 107] },
      { x: 48, y: [95, 96, 103, 109, 111] },
      { x: 54, y: [98, 99, 107, 113, 115] },
      { x: 60, y: [100, 102, 110, 116, 119] },
      { x: 72, y: [105, 107, 116, 123, 125] },
    ],
    wh: [
      { x: 80, y: [9.1, 9.6, 10.6, 12.0, 12.9, 14.6] },
      { x: 85, y: [10.0, 10.7, 11.8, 13.4, 14.5, 16.4] },
      { x: 90, y: [11.0, 11.8, 13.0, 14.8, 16.0, 18.2] },
      { x: 95, y: [12.1, 12.9, 14.3, 16.4, 17.7, 20.1] },
      { x: 100, y: [13.2, 14.1, 15.7, 18.0, 19.5, 22.2] },
      { x: 105, y: [14.4, 15.5, 17.3, 19.9, 21.5, 24.5] },
      { x: 110, y: [15.8, 16.9, 19.0, 22.0, 23.7, 27.0] },
      { x: 115, y: [17.2, 18.5, 20.9, 24.2, 26.1, 29.9] },
      { x: 120, y: [18.8, 20.2, 23.0, 26.7, 28.8, 33.0] },
    ],
  },
  girl: {
    wa: [
      { x: 24, y: [9.0, 9.6, 11.5, 13.7, 14.8] },
      { x: 30, y: [9.8, 10.5, 12.7, 15.2, 16.4] },
      { x: 36, y: [10.7, 11.4, 13.9, 16.7, 18.1] },
      { x: 42, y: [11.5, 12.3, 15.0, 18.1, 19.6] },
      { x: 48, y: [12.2, 13.1, 16.1, 19.5, 21.2] },
      { x: 54, y: [12.9, 13.9, 17.2, 21.0, 22.9] },
      { x: 60, y: [13.6, 14.6, 18.2, 22.3, 24.4] },
      { x: 72, y: [15.0, 16.1, 20.5, 25.5, 28.0] },
    ],
    ha: [
      { x: 24, y: [80, 81, 86, 91, 92] },
      { x: 30, y: [84, 85, 91, 96, 97] },
      { x: 36, y: [87, 89, 95, 101, 102] },
      { x: 42, y: [91, 92, 99, 105, 106] },
      { x: 48, y: [94, 95, 103, 109, 111] },
      { x: 54, y: [97, 98, 106, 113, 115] },
      { x: 60, y: [99, 101, 109, 117, 119] },
      { x: 72, y: [105, 106, 116, 123, 125] },
    ],
    wh: [
      { x: 80, y: [8.6, 9.1, 10.2, 11.5, 12.4, 14.0] },
      { x: 85, y: [9.6, 10.1, 11.4, 12.9, 13.9, 15.7] },
      { x: 90, y: [10.6, 11.2, 12.7, 14.4, 15.6, 17.7] },
      { x: 95, y: [11.7, 12.4, 14.1, 16.1, 17.4, 19.8] },
      { x: 100, y: [12.9, 13.7, 15.7, 18.0, 19.4, 22.2] },
      { x: 105, y: [14.2, 15.1, 17.4, 20.1, 21.7, 24.9] },
      { x: 110, y: [15.7, 16.7, 19.3, 22.4, 24.3, 27.8] },
      { x: 115, y: [17.3, 18.4, 21.4, 25.0, 27.1, 31.1] },
      { x: 120, y: [19.1, 20.4, 23.8, 27.9, 30.3, 34.8] },
    ],
  },
}

// โซนสีตามระดับเกณฑ์ — ตัดที่เส้น SD เดียวกับ evaluateStatus ของแอปสมาร์ทแทรค
// สีชุดเดียวกับโดนัทหน้า Clientbmi · from/to = ดัชนีเส้น SD (null = สุดขอบกราฟ)
const ZONES = {
  wa: [
    { label: 'น้ำหนักน้อย', color: '#f97316', from: null, to: 0 },
    { label: 'น้ำหนักค่อนข้างน้อย', color: '#facc15', from: 0, to: 1 },
    { label: 'น้ำหนักตามเกณฑ์', color: '#10b981', from: 1, to: 3 },
    { label: 'น้ำหนักค่อนข้างมาก', color: '#ec4899', from: 3, to: 4 },
    { label: 'น้ำหนักมาก', color: '#ef4444', from: 4, to: null },
  ],
  ha: [
    { label: 'เตี้ย', color: '#f97316', from: null, to: 0 },
    { label: 'ค่อนข้างเตี้ย', color: '#facc15', from: 0, to: 1 },
    { label: 'สูงตามเกณฑ์', color: '#10b981', from: 1, to: 3 },
    { label: 'ค่อนข้างสูง', color: '#ec4899', from: 3, to: 4 },
    { label: 'สูง', color: '#ef4444', from: 4, to: null },
  ],
  wh: [
    { label: 'ผอม', color: '#f97316', from: null, to: 0 },
    { label: 'ค่อนข้างผอม', color: '#facc15', from: 0, to: 1 },
    { label: 'สมส่วน', color: '#10b981', from: 1, to: 3 },
    { label: 'ท้วม', color: '#f472b6', from: 3, to: 4 },
    { label: 'เริ่มอ้วน', color: '#ec4899', from: 4, to: 5 },
    { label: 'อ้วน', color: '#ef4444', from: 5, to: null },
  ],
}

const AGE_TICKS = { 24: '2 ปี', 36: '3 ปี', 48: '4 ปี', 60: '5 ปี', 72: '6 ปี' }

const growthCharts = computed(() => {
  const s = selectedStudent.value
  if (!s) return []
  const g = String(s.gender).toLowerCase() === 'girl' ? 'girl' : 'boy'
  return [
    buildSDChart({ key: 'wa', title: 'น้ำหนักตามเกณฑ์อายุ (กก.)', unit: 'กก.', g, dims: CH, wide: false }),
    buildSDChart({ key: 'ha', title: 'ส่วนสูงตามเกณฑ์อายุ (ซม.)', unit: 'ซม.', g, dims: CH, wide: false }),
    buildSDChart({ key: 'wh', title: 'น้ำหนักตามส่วนสูง (กก.)', unit: 'กก.', g, dims: CH_WIDE, wide: true }),
  ].filter(Boolean)
})

function buildSDChart({ key, title, unit, g, dims: D, wide }) {
  const s = selectedStudent.value
  const isWH = key === 'wh'
  const valKey = key === 'ha' ? 'h' : 'w'      // ค่าที่วัด (แกนตั้ง)
  const axisKey = isWH ? 'h' : 'ageTotalM'     // แกนนอน: ส่วนสูง หรือ อายุ (เดือน)
  const recs = (s.records || []).filter(r => r[valKey] != null && r[axisKey] != null)
  if (!recs.length) return null

  const ref = SD_REF[g][key]
  const lo = Math.min(ref[0].x, ...recs.map(r => r[axisKey]))
  const hi = Math.max(ref[ref.length - 1].x, ...recs.map(r => r[axisKey]))

  const vals = [...ref.flatMap(p => p.y), ...recs.map(r => r[valKey])]
  let yMin = Math.min(...vals)
  let yMax = Math.max(...vals)
  const padY = (yMax - yMin) * 0.08 || 1
  yMin -= padY
  yMax += padY

  const X = x => D.padL + ((x - lo) / (hi - lo || 1)) * (D.W - D.padL - D.padR)
  const Y = v => D.padT + (1 - (v - yMin) / (yMax - yMin)) * (D.H - D.padT - D.padB)

  // เส้นขอบโซน: ดัชนี SD ใน y — null = สุดขอบกราฟ (โซนล่างสุด/บนสุด)
  const edgePts = (idx, edgeY) =>
    ref.map(p => `${X(p.x)},${idx == null ? edgeY : Y(p.y[idx])}`)
  const zones = ZONES[key].map(z => {
    const topPts = edgePts(z.to, D.padT)
    const botPts = edgePts(z.from, D.H - D.padB)
    return {
      label: z.label,
      short: shortStat(z.label),
      color: z.color,
      fill: z.color + '30',
      path: `M ${topPts.join(' L ')} L ${[...botPts].reverse().join(' L ')} Z`,
    }
  })
  // เน้นขอบเขตโซนปกติ (−1.5SD ถึง +1.5SD) ด้วยเส้นเขียว
  const normTopPath = `M ${edgePts(3).join(' L ')}`
  const normBotPath = `M ${edgePts(1).join(' L ')}`

  const linePath = recs.map((r, i) => `${i ? 'L' : 'M'} ${X(r[axisKey])} ${Y(r[valKey])}`).join(' ')
  const points = recs.map(r => ({
    x: X(r[axisKey]),
    y: Y(r[valKey]),
    value: r[valKey],
    date: thDate(r.date),
    age: ageLabel(r),
    range: sdRangeAt(ref, r[axisKey]),
    stat: (key === 'wa' ? r.statWA : key === 'ha' ? r.statHA : r.statWH) || '-',
  }))

  const yTicks = []
  for (let i = 0; i <= 3; i++) {
    const v = yMin + ((yMax - yMin) * i) / 3
    yTicks.push({ v, y: Y(v), label: Math.round(v) })
  }
  const xTicks = isWH
    ? ref.map(p => p.x).filter(h => h % 10 === 0)
        .map((h, i, arr) => ({ x: X(h), label: i === arr.length - 1 ? `${h} ซม.` : String(h) }))
    : Object.keys(AGE_TICKS).map(Number)
        .filter(m => m >= lo && m <= hi)
        .map(m => ({ x: X(m), label: AGE_TICKS[m] }))

  return {
    key, title, unit, wide, ...D,
    zones, normTopPath, normBotPath, linePath, points, yTicks, xTicks,
    lastLabel: lastPointLabel(points, D),
  }
}

// เทียบเส้นตรงหาค่าเส้น SD ดัชนี idx ที่ตำแหน่ง x (หนีบปลายตารางเหมือน getLinearInterpolation ของแอป)
function sdInterp(ref, x, idx) {
  if (x <= ref[0].x) return ref[0].y[idx]
  if (x >= ref[ref.length - 1].x) return ref[ref.length - 1].y[idx]
  for (let i = 0; i < ref.length - 1; i++) {
    if (x >= ref[i].x && x <= ref[i + 1].x) {
      const t = (x - ref[i].x) / (ref[i + 1].x - ref[i].x)
      return ref[i].y[idx] + (ref[i + 1].y[idx] - ref[i].y[idx]) * t
    }
  }
  return ref[0].y[idx]
}

// ช่วงตามเกณฑ์ (−1.5SD ถึง +1.5SD) ที่ตำแหน่ง x สำหรับ tooltip
function sdRangeAt(ref, x) {
  const a = Math.round(sdInterp(ref, x, 1) * 10) / 10
  const b = Math.round(sdInterp(ref, x, 3) * 10) / 10
  return `${a} - ${b}`
}

// ป้ายค่าจุดล่าสุด — ชิดขอบขวาให้สลับไปอยู่ซ้ายของจุด
function lastPointLabel(points, D) {
  const last = points[points.length - 1]
  const nearRight = last.x > D.W - D.padR - 24
  return {
    x: nearRight ? last.x - 8 : last.x + 8,
    y: last.y - 7,
    anchor: nearRight ? 'end' : 'start',
  }
}

// ตำแหน่ง tooltip เป็น % ของ viewBox — หนีบไม่ให้หลุดขอบ และจุดใกล้ขอบบนให้แสดงใต้จุดแทน
const tipStyle = (ch, p) => {
  const leftPct = Math.min(82, Math.max(18, (p.x / ch.W) * 100))
  const nearTop = p.y < ch.H * 0.38
  return {
    left: leftPct + '%',
    top: (p.y / ch.H) * 100 + '%',
    transform: nearTop ? 'translate(-50%, 14px)' : 'translate(-50%, calc(-100% - 12px))',
  }
}

// อายุ "ปี/เดือน" แบบสมุดพก (เช่น 3/5)
const ageLabel = (r) => {
  if (r.ageY != null && r.ageM != null) return `${r.ageY}/${r.ageM}`
  if (r.ageTotalM != null) return `${Math.floor(r.ageTotalM / 12)}/${r.ageTotalM % 12}`
  return '-'
}

const genderLabel = (g) =>
  String(g).toLowerCase() === 'girl' ? 'หญิง' : String(g).toLowerCase() === 'boy' ? 'ชาย' : '-'

// อักษรตัวแรกของชื่อ (ข้ามคำนำหน้า) ไว้แทนรูปที่ยังไม่ได้ถ่าย
const initialOf = (name) => {
  const n = String(name || '')
    .replace(/^(เด็กชาย|เด็กหญิง|ด\.ช\.|ด\.ญ\.|ดช\.|ดญ\.)\s*/, '')
    .trim()
  return n.charAt(0) || '?'
}

// วันที่ไทยแบบย่อ พ.ศ. (เช่น 22 ม.ค. 69)
const thDate = (d) => {
  if (!d) return '-'
  const dt = new Date(d)
  if (isNaN(dt.getTime())) return '-'
  return dt.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' })
}

// สีชิปผลประเมิน: ใช้คลาสสีที่แอปสมาร์ทแทรคบันทึก ก่อน fallback ตามข้อความ
const STAT_COLORS = { green: '#10b981', orange: '#f97316', red: '#ef4444' }
const chipStyle = (colorClass, label) => {
  const s = String(colorClass || '')
  let c = null
  if (s.includes('green')) c = STAT_COLORS.green
  else if (s.includes('orange')) c = STAT_COLORS.orange
  else if (s.includes('red')) c = STAT_COLORS.red
  if (!c) {
    const l = String(label || '')
    if (l.includes('ค่อนข้าง') || l === 'ท้วม' || l === 'เริ่มอ้วน') c = STAT_COLORS.orange
    else if (l.includes('ตามเกณฑ์') || l === 'สมส่วน' || l === 'สูง') c = STAT_COLORS.green
    else c = STAT_COLORS.red
  }
  return { background: c + '26', border: `1px solid ${c}`, color: c }
}

// ย่อข้อความผลให้พอดีคอลัมน์ (ตัดคำว่า น้ำหนัก/ส่วนสูง ที่ซ้ำกับหัวตาราง)
const shortStat = (label) => {
  const s = String(label || '').trim()
  if (!s) return '-'
  return s.replace(/^น้ำหนัก/, '').replace(/^ส่วนสูง/, '') || 'ตามเกณฑ์'
}

// ── โครงผลประเมินพัฒนาการ มฐ.1–12 (ตามสมุดพกกระดาษ) ──
const DEV_STANDARDS = [
  {
    domain: 'ด้านร่างกาย',
    standards: [
      { title: 'มฐ.๑ ร่างกายเจริญเติบโตตามวัยและมีสุขนิสัยที่ดี', items: ['๑.๑ มีน้ำหนักและส่วนสูงตามเกณฑ์', '๑.๒ มีสุขภาพอนามัย สุขนิสัยที่ดี', '๑.๓ รักษาความปลอดภัยของตนเองและผู้อื่น'] },
      { title: 'มฐ.๒ กล้ามเนื้อใหญ่และกล้ามเนื้อเล็กแข็งแรงใช้ได้อย่างคล่องแคล่วและประสานสัมพันธ์กัน', items: ['๒.๑ เคลื่อนไหวร่างกายอย่างคล่องแคล่วและทรงตัวได้', '๒.๒ ใช้มือ - ตา ประสานสัมพันธ์กัน'] },
    ],
  },
  {
    domain: 'ด้านอารมณ์ จิตใจ',
    standards: [
      { title: 'มฐ.๓ มีสุขภาพจิตดีและมีความสุข', items: ['๓.๑ แสดงออกทางอารมณ์ได้อย่างเหมาะสม', '๓.๒ มีความรู้สึกที่ดีต่อตนเองและผู้อื่น'] },
      { title: 'มฐ.๔ ชื่นชมและแสดงออกทางศิลปะ ดนตรี และการเคลื่อนไหว', items: ['๔.๑ สนใจ มีความสุขและแสดงออกผ่านงานศิลปะ ดนตรี และการเคลื่อนไหว', '๔.๒ แสดงออกทางด้านศิลปะ ดนตรี และการเคลื่อนไหวตามจินตนาการ'] },
    ],
  },
  {
    domain: 'ด้านสังคม',
    standards: [
      { title: 'มฐ.๕ มีคุณธรรม จริยธรรม มีจิตใจที่ดีงาม', items: ['๕.๑ ซื่อสัตย์สุจริต', '๕.๒ มีความเมตตากรุณา มีน้ำใจและช่วยเหลือแบ่งปัน', '๕.๓ มีความเห็นอกเห็นใจผู้อื่น', '๕.๔ มีความรับผิดชอบ'] },
      { title: 'มฐ.๖ มีทักษะชีวิตและปฏิบัติตนตามหลักปรัชญาของเศรษฐกิจพอเพียง', items: ['๖.๑ ช่วยเหลือตนเองในการปฏิบัติกิจวัตรประจำวัน', '๖.๒ มีวินัยในตนเอง', '๖.๓ ประหยัดและพอเพียง'] },
      { title: 'มฐ.๗ รักธรรมชาติ สิ่งแวดล้อม วัฒนธรรมและความเป็นไทย', items: ['๗.๑ ดูแลรักษาธรรมชาติและสิ่งแวดล้อม', '๗.๒ มีมารยาทตามวัฒนธรรมไทยและรักความเป็นไทย'] },
      { title: 'มฐ.๘ อยู่ร่วมกับผู้อื่นได้อย่างมีความสุขและปฏิบัติตนเป็นสมาชิกที่ดีของสังคม', items: ['๘.๑ ยอมรับความเหมือนและความแตกต่างระหว่างบุคคล', '๘.๒ มีปฏิสัมพันธ์ที่ดีกับผู้อื่น', '๘.๓ ปฏิบัติตนเบื้องต้นในการเป็นสมาชิกที่ดีของสังคม'] },
    ],
  },
  {
    domain: 'ด้านสติปัญญา',
    standards: [
      { title: 'มฐ.๙ ใช้ภาษาได้เหมาะสมกับวัย', items: ['๙.๑ สนทนาโต้ตอบและเล่าเรื่องให้ผู้อื่นเข้าใจ', '๙.๒ อ่าน เขียนภาพ และสัญลักษณ์ได้'] },
      { title: 'มฐ.๑๐ มีความสามารถในการคิดที่จะเป็นพื้นฐานในการเรียนรู้', items: ['๑๐.๑ มีความสามารถในการคิดรวบยอด', '๑๐.๒ มีความสามารถในการคิดเชิงเหตุผล', '๑๐.๓ มีความสามารถในการแก้ปัญหาและตัดสินใจ'] },
      { title: 'มฐ.๑๑ มีจินตนาการและความคิดสร้างสรรค์', items: ['๑๑.๑ ทำงานศิลปะตามจินตนาการและความคิดสร้างสรรค์', '๑๑.๒ แสดงท่าทาง/เคลื่อนไหวตามจินตนาการอย่างสร้างสรรค์'] },
      { title: 'มฐ.๑๒ มีเจตคติที่ดีต่อการเรียนรู้ และมีความสามารถในการแสวงหาความรู้ได้เหมาะสมกับวัย', items: ['๑๒.๑ มีเจตคติที่ดีต่อการเรียนรู้', '๑๒.๒ มีความสามารถในการแสวงหาความรู้'] },
    ],
  },
]

// ข้อ ๑.๑ = ตัวที่ลิงค์กับสมาร์ทแทรค (น้ำหนัก/ส่วนสูงตามเกณฑ์)
const isGrowthItem = (item) => item.startsWith('๑.๑')

const COMMENT_DOMAINS = ['ด้านร่างกาย', 'ด้านอารมณ์ - จิตใจ', 'ด้านสังคม', 'ด้านสติปัญญา']

// Poll ทุก 3 นาทีเหมือนหน้าอื่น
const POLL_INTERVAL_MS = 3 * 60 * 1000
let pollTimer = null

onMounted(() => {
  fetchStudents()
  pollTimer = setInterval(() => {
    // รีเฟรชเงียบๆ โดยคงเด็กที่เปิดสมุดอยู่ — ถ้าเด็กหายไปจากศูนย์ให้กลับชั้นหนังสือ
    $fetch(`/api/bmi-students?db=${selectedCenter.value}`).then((res) => {
      if (res && res.success && res.data) {
        students.value = res.data.students || []
        if (selectedStudentKey.value && !students.value.find(s => s.key === selectedStudentKey.value)) {
          selectedStudentKey.value = null
          view.value = 'shelf'
        }
      }
    }).catch(() => {})
  }, POLL_INTERVAL_MS)
  document.addEventListener('click', onDocClick)
})

onBeforeUnmount(() => {
  if (pollTimer) clearInterval(pollTimer)
  if (openTimer) clearTimeout(openTimer)
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

/* ── Greedy theme (เดียวกับหน้า Clientbmi) ── */
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

/* ── สมุดพก: พื้นหลังกระดาษ (ทุกหน้าตั้งแต่ข้อมูลประจำตัวลงไป) ── */
.book-page {
  background:
    repeating-linear-gradient(180deg, transparent 0 22px, rgba(139, 94, 26, 0.12) 22px 23px),
    linear-gradient(90deg, rgba(122, 46, 14, 0.25) 0 3px, rgba(139, 94, 26, 0.1) 3px 6px, transparent 6px),
    #f3e9d2;
  border: 1px solid rgba(139, 94, 26, 0.4);
  border-radius: 10px;
  padding: 10px;
  box-shadow: inset 0 0 24px rgba(120, 84, 30, 0.12);
}
/* การ์ดบนหน้ากระดาษ: เบาลง โปร่งแสงคล้ายแผ่นกระดาษซ้อน แทนกล่องน้ำตาลเข้ม */
.paper-card {
  background: rgba(255, 255, 255, 0.4) !important;
  border: 1px solid rgba(139, 94, 26, 0.35) !important;
}
.paper-card:hover { border-color: rgba(139, 94, 26, 0.6) !important; }

/* ── ปุ่มกลับแดชบอร์ด (สไตล์เดียวกับปุ่ม Espresso แต่ลูกศรชี้ซ้าย) ── */
.back-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px;
  font-size: 14px;
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
.back-btn:hover {
  background: linear-gradient(180deg, #FFD24A 0%, #E6B428 50%, #C8982C 100%);
  transform: translateY(-2px);
}
.back-btn:active { transform: translateY(0); }
.back-btn-arrow {
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-right: 10px solid #2A1208;
}

/* ── ชั้นหนังสือสมุดพก ── */
/* คาบแถว = สูงเล่ม (--bh) + ไม้กระดาน 12 — พื้นหลังวาดกระดานซ้ำทุกแถวให้เล่มยืนบนชั้น */
.bookshelf {
  --bh: 140px;   /* ความสูงเล่ม — จอมือถือปรับเพิ่มให้สัดส่วนยังเป็นปกหนังสือ */
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  column-gap: 10px;
  row-gap: 0;
  padding: 6px 10px 0;
  background: repeating-linear-gradient(
    180deg,
    transparent 0 var(--bh),
    #6b4416 var(--bh) calc(var(--bh) + 3px),
    #4a2a10 calc(var(--bh) + 3px) calc(var(--bh) + 10px),
    #2a1608 calc(var(--bh) + 10px) calc(var(--bh) + 12px)
  );
  border-radius: 6px;
}
/* ปกหนังสือ: สันซ้ายเข้ม + กรอบทองด้านใน แบบปกหนังเดินทอง */
.book-cover {
  position: relative;
  width: 104px;
  min-width: 0;   /* กัน flex item ไม่ยอมหดตาม width ที่ตั้ง เพราะ .cover-room ใช้ white-space:nowrap */
  height: var(--bh, 140px);
  margin-bottom: 12px;   /* วางบนกระดาน */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 9px 8px 8px 17px;   /* ซ้ายเผื่อสันหนังสือ 11px */
  border: 1px solid rgba(0, 0, 0, 0.45);
  border-radius: 3px 8px 8px 3px;  /* สันซ้ายเหลี่ยม ขอบเปิดหน้าขวาโค้ง */
  cursor: pointer;
  text-align: center;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    3px 4px 8px rgba(0, 0, 0, 0.55);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
/* สันหนังสือด้านซ้าย (ร่องเย็บเล่ม) */
.book-cover::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 11px;
  border-radius: 3px 0 0 3px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.2) 45%,
    rgba(255, 255, 255, 0.14) 70%,
    rgba(0, 0, 0, 0.35) 100%
  );
}
/* กรอบทองเดินเส้นด้านในปก */
.book-cover::after {
  content: '';
  position: absolute;
  inset: 5px 5px 5px 14px;
  border: 1px solid rgba(255, 224, 160, 0.5);
  border-radius: 4px;
  pointer-events: none;
}
.book-cover:hover {
  transform: translateY(-7px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.15),
    4px 10px 16px rgba(0, 0, 0, 0.6),
    0 0 12px rgba(230, 180, 40, 0.4);
}
.book-cover:focus-visible {
  outline: 2px solid #FFE896;
  outline-offset: 2px;
}
.cover-tag {
  font-size: 7.5px;
  font-weight: 700;
  letter-spacing: 0.6px;
  color: #FFE0A0;
  border-bottom: 1px solid rgba(255, 224, 160, 0.45);
  padding: 0 4px 2px;
}
/* ตรากลางปก: รูปเด็ก หรืออักษรย่อในวงทอง */
.cover-badge {
  width: 38px;
  height: 38px;
  border-radius: 9999px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid rgba(255, 224, 160, 0.8);
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.4);
  background: rgba(0, 0, 0, 0.28);
  color: #FFE0A0;
  font-size: 16px;
  font-weight: 800;
  flex-shrink: 0;
}
.cover-badge img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.cover-name {
  font-size: 10.5px;
  font-weight: 800;
  line-height: 1.3;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.cover-room {
  font-size: 8px;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
/* รูปเด็กหัวสมุดพก */
.book-avatar {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 9999px;
  overflow: hidden;
  border: 2px solid #C8982C;
  box-shadow: 0 0 10px rgba(200, 152, 44, 0.35);
}
.book-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.book-avatar--empty {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4A2A10;
  color: #E6B428;
  font-size: 22px;
  font-weight: 800;
}
/* จอมือถือ: เรียงแถวละ 2 เล่ม กว้างเต็มชั้น และสูงขึ้นตามสัดส่วนปกหนังสือ */
@media (max-width: 480px) {
  .bookshelf { --bh: 200px; column-gap: 8px; padding: 6px 6px 0; }
  .book-cover { width: calc(50% - 4px); }
  .cover-tag { font-size: 9px; }
  .cover-badge { width: 48px; height: 48px; font-size: 20px; }
  .cover-name { font-size: 12.5px; }
  .cover-room { font-size: 9.5px; }
}

/* ── Animation เปิดสมุดเต็มจอตอนกดเล่ม ── */
.open-anim-backdrop {
  position: fixed;
  inset: 0;
  z-index: 300;
  background: rgba(0, 0, 0, 0);
  transition: background 0.6s ease, opacity 0.4s ease;
}
.open-anim-backdrop.go { background: rgba(0, 0, 0, 0.78); }
/* เฟสสุดท้าย: หน้าข้อมูลสลับมาอยู่ข้างหลังแล้ว ค่อยเฟด overlay ออก */
.open-anim-backdrop.done { opacity: 0; }
/* ตัวเล่ม: เริ่มที่ตำแหน่งจริงบนชั้น → ลอยไปกลางจอ ขยายใหญ่ (--sc คำนวณจากขนาดจอ) */
.open-anim-book {
  position: fixed;
  perspective: 1600px;
  pointer-events: none;   /* กัน hover ของ .book-cover มาเลื่อนปกระหว่างกาง (backdrop ยังกันคลิกอยู่) */
  transition: transform 0.8s cubic-bezier(0.45, 0.05, 0.25, 1);
}
.go .open-anim-book { transform: translate(var(--dx), var(--dy)) scale(var(--sc)); }
/* หน้าขวาของสมุด (โผล่เมื่อปกกางออก) */
.anim-page {
  position: absolute;
  inset: 1px 1px 1px 3px;
  border-radius: 3px 7px 7px 3px;
  background:
    repeating-linear-gradient(180deg, transparent 0 13px, rgba(120, 84, 30, 0.15) 13px 14px),
    linear-gradient(90deg, rgba(80, 50, 15, 0.35) 0 2px, rgba(120, 84, 30, 0.12) 2px 5px, transparent 5px),
    #f3e9d2;
}
/* ชั้นหมุน: กางปกรอบสันซ้าย (หน่วงให้เล่มลอยถึงกลางจอก่อนค่อยเปิด) */
.anim-flip {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transform-origin: left center;
  transition: transform 0.95s cubic-bezier(0.55, 0.06, 0.28, 1);
  transition-delay: 0.55s;
}
.go .anim-flip { transform: rotateY(-178deg); }
/* ปกหน้า: ใช้สไตล์ .book-cover เดิม แต่ตรึงเต็มพื้นที่ overlay */
.anim-cover-front {
  position: absolute;
  inset: 0;
  width: auto;
  height: auto;
  margin: 0;
  backface-visibility: hidden;
  cursor: default;
}
/* ด้านในปก = หน้าซ้ายของสมุดที่กางออก (กระดาษครีมเหมือนหน้าขวา) */
.anim-cover-back {
  position: absolute;
  inset: 0;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  background:
    repeating-linear-gradient(180deg, transparent 0 13px, rgba(120, 84, 30, 0.15) 13px 14px),
    linear-gradient(270deg, rgba(80, 50, 15, 0.35) 0 2px, rgba(120, 84, 30, 0.12) 2px 5px, transparent 5px),
    #efe4c8;
  border-radius: 7px 3px 3px 7px;
}

/* ── แท็บ: ดีไซน์เป็นแท็บกระดาษเหนือหน้าสมุด ── */
.tab-btn {
  flex: 1 1 0;
  padding: 7px 6px;
  font-size: 12px;
  font-weight: 700;
  color: #8a5a1a;
  background: #e8dcc0;
  border: 1px solid rgba(139, 94, 26, 0.4);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.tab-btn:hover { border-color: #8a5a1a; }
.tab-btn.active {
  color: #2A1208;
  background: linear-gradient(180deg, #FFD24A 0%, #E6B428 100%);
  border-color: #E6B428;
}

/* ── กราฟการเจริญเติบโต ── */
.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
/* กราฟน้ำหนักตามส่วนสูง กินเต็มความกว้างสองคอลัมน์ */
.chart-card--wide { grid-column: 1 / -1; }
/* ระดับเกณฑ์ใต้กราฟแต่ละใบ */
.zone-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2px 9px;
  padding: 3px 0 4px;
}
.zone-key {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 600;
  color: #6b4a20;
  white-space: nowrap;
}
.zone-swatch {
  width: 10px;
  height: 8px;
  border-radius: 2px;
  border: 1px solid;
  flex-shrink: 0;
}
.chart-card {
  border: 1px solid rgba(139, 94, 26, 0.35);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.32);
  padding: 6px 8px 2px;
  min-width: 0;
}
.chart-title {
  font-size: 11.5px;
  font-weight: 700;
  color: #8a5a1a;
  text-align: center;
  margin-bottom: 2px;
}
.chart-plot { position: relative; }
.growth-svg {
  display: block;
  width: 100%;
  height: auto;
}
.chart-tip {
  position: absolute;
  z-index: 30;
  pointer-events: none;
  background: #f3e9d2;
  border: 1px solid #B5851F;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(90, 60, 20, 0.35);
  padding: 5px 9px;
  font-size: 10.5px;
  line-height: 1.5;
  color: #4A2A10;
  white-space: nowrap;
}
@media (max-width: 640px) {
  .charts-grid { grid-template-columns: 1fr; }
}

/* ── ตารางบันทึกน้ำหนัก-ส่วนสูง ── */
.book-table-wrap {
  overflow-x: auto;
  border: 1px solid rgba(139, 94, 26, 0.4);
  border-radius: 8px;
}
.book-table {
  width: 100%;
  min-width: 560px;
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
}
.book-table th {
  padding: 4px 6px;
  font-size: 10.5px;
  font-weight: 700;
  color: #8a5a1a;
  background: rgba(139, 94, 26, 0.18);
  border: 1px solid rgba(139, 94, 26, 0.35);
  text-align: center;
  line-height: 1.25;
}
.book-table td {
  padding: 4px 6px;
  font-size: 11.5px;
  color: #4A2A10;
  border: 1px solid rgba(139, 94, 26, 0.18);
  text-align: center;
}
.cell-actual { font-weight: 800; color: #7a2e0e !important; }
.stat-chip {
  display: inline-block;
  padding: 1px 7px;
  border-radius: 9999px;
  font-size: 10.5px;
  font-weight: 700;
  white-space: nowrap;
  line-height: 1.5;
}

/* ── ผลประเมินพัฒนาการ ── */
.dev-domain {
  font-size: 12px;
  font-weight: 800;
  color: #8a5a1a;
  background: rgba(139, 94, 26, 0.18);
  border: 1px solid rgba(139, 94, 26, 0.4);
  border-radius: 6px;
  padding: 4px 10px;
  margin-bottom: 4px;
}
.dev-std { margin-bottom: 6px; }
.dev-std-title {
  font-size: 11.5px;
  font-weight: 700;
  color: #6b4a20;
  padding: 3px 10px 2px;
}
.dev-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 3px 10px 3px 22px;
  border-bottom: 1px dashed rgba(139, 94, 26, 0.22);
}
.dev-item-name { font-size: 11.5px; color: #4A2A10; }
.dev-item-pending {
  flex-shrink: 0;
  font-size: 10.5px;
  color: #8a7355;
  border: 1px dashed rgba(138, 115, 85, 0.55);
  border-radius: 9999px;
  padding: 1px 8px;
  white-space: nowrap;
}

/* ── ความคิดเห็นครู ── */
.comment-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 5px 10px;
}
.comment-label {
  flex-shrink: 0;
  font-size: 11.5px;
  font-weight: 700;
  color: #6b4a20;
  min-width: 118px;
}
.comment-line {
  flex: 1;
  font-size: 11px;
  color: #a08050;
  border-bottom: 1px dotted rgba(138, 115, 85, 0.45);
  padding-bottom: 2px;
}

/* ── Custom dropdown (สไตล์เดียวกับ Clientbmi) ── */
.cc-dropdown { position: relative; }
.cc-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 7px 10px;
  background: #4A2A10;
  color: #e5e7eb;
  border: 1px solid #B5851F;
  border-radius: 8px;
  font-size: 12.5px;
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
  font-size: 12.5px;
  line-height: 1.3;
  cursor: pointer;
  white-space: normal;
  word-break: break-word;
}
.cc-item:hover { background: #4A2A10; }
.cc-item.active { background: #B5851F; color: #2A1208; font-weight: 700; }

@media (max-width: 640px) {
  .tab-btn { font-size: 11px; padding: 6px 4px; }
  .comment-label { min-width: 96px; }
}
</style>
