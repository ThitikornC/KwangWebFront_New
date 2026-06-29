
<template>
  <div class="root-bg p-4 sm:p-8 min-h-screen">
    <!-- Logo ลายน้ำ -->
    <div class="background-image">
      <img src="/kwang_logo.png" alt="Logo" />
    </div>

    <div class="scroll-reveal flex justify-center flex-1 px-2 sm:px-[clamp(1rem,3vw,1.5rem)] mt-16 sm:mt-[clamp(4rem,10vw,5.625rem)] mb-4 sm:mb-[clamp(2rem,4vw,3rem)]">
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

      

      <!-- Parent boxes styled like the child cards (group header) -->
    <div class="tree-container">
      <!-- เทศบาลตำบลหัวรอ -->
      <div class="tree-wrapper">
        <!-- Parent Node -->
        <div class="tree-parent">
          <div @click="requestPassword('huaroaDashboard')" class="neon-btn spline-link-card flow-card parent-box cursor-pointer">
            <div class="card-content parent-card-content">
              <div>
                <div class="parent-sub">เทศบาลตำบลหัวรอ</div>
                <div class="parent-title">Usernumber : 001</div>
                <div class="parent-meta">Contractnumber :</div>
                <div class="parent-meta">Date Installed : 1-11-25</div>
                <div class="parent-meta">Expiration Date : 1-12-25</div>
              </div>
              <div class="w-full flex justify-end items-center mt-3">
                <span :class="['status-dot', isOnlineFor('หัวรอ') ? 'online' : 'offline']" title="สถานะออนไลน์"></span>
                <span class="status-label">{{ isOnlineFor('หัวรอ') ? 'Online' : 'Offline' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- เทศบาลตำบลหัวรอ (City View) -->
      <div class="tree-wrapper">
        <!-- Parent Node -->
        <div class="tree-parent">
          <div @click="requestPassword('huaroaCity')" class="neon-btn spline-link-card flow-card parent-box cursor-pointer">
            <div class="card-content parent-card-content">
              <div>
                <div class="parent-sub">เทศบาลตำบลหัวรอ (City View)</div>
                <div class="parent-title">Usernumber : 001</div>
                <div class="parent-meta">Contractnumber :</div>
                <div class="parent-meta">Date Installed : 29-06-26</div>
                <div class="parent-meta">Expiration Date : </div>
              </div>
              <div class="w-full flex justify-end items-center mt-3">
                <span :class="['status-dot', isOnlineFor('หัวรอ') ? 'online' : 'offline']" title="สถานะออนไลน์"></span>
                <span class="status-label">{{ isOnlineFor('หัวรอ') ? 'Online' : 'Offline' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- เทศบาลแม่ฮ่องสอน -->
      <div class="tree-wrapper">
        <!-- Parent Node -->
        <div class="tree-parent">
          <div @click="requestPassword('maehongson')" class="neon-btn spline-link-card flow-card parent-box cursor-pointer">
            <div class="card-content parent-card-content">
              <div>
                <div class="parent-sub">เทศบาลแม่ฮ่องสอน</div>
                <div class="parent-title">Usernumber : 002</div>
                <div class="parent-meta">Contractnumber :</div>
                <div class="parent-meta">Date Installed : 1-11-25</div>
                <div class="parent-meta">Expiration Date : 1-12-25</div>
              </div>
              <div class="w-full flex justify-end items-center mt-3">
                <span :class="['status-dot', isOnlineFor('แม่ฮ่องสอน') ? 'online' : 'offline']" title="สถานะออนไลน์"></span>
                <span class="status-label">{{ isOnlineFor('แม่ฮ่องสอน') ? 'Online' : 'Offline' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Dynamic leads: render after the static parent cards -->
      <div v-if="leadsLoading" class="text-gray-600 ml-4">Loading customers...</div>
      <template v-else>
        <div v-for="lead in leads" :key="lead.id" class="tree-wrapper">
          <div class="tree-parent">
            <div @click="openLead(lead)" class="neon-btn spline-link-card flow-card parent-box cursor-pointer">
              <div class="card-content parent-card-content">
                <div>
                  <div class="parent-sub">{{ lead.name }}</div>
                  <div class="parent-title">Usernumber : {{ pad(lead.runNumber) }}</div>
                  <div class="parent-meta">Contractnumber : {{ lead.contractNumber || '-' }}</div>
                  <div class="parent-meta">Date Installed : {{ formatDate(lead.startDate || lead.createdAt) }}</div>
                  <div class="parent-meta">Expiration Date : {{ formatDate(lead.expiryDate) }}</div>
                  <div class="parent-meta">Contact : {{ lead.contactno || '-' }}</div>
                  <div class="parent-meta">ประเภทผู้ใช้งาน : {{ typeLabel(lead.type) }}</div>
                </div>
                <div class="w-full flex justify-end items-center mt-3">
                  <span :class="['status-dot', isOnlineLead(lead) ? 'online' : 'offline']" title="สถานะออนไลน์"></span>
                  <span class="status-label">{{ isOnlineLead(lead) ? 'Online' : 'Offline' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- PDF download removed -->
  </div>
  <!-- Password Modal -->
  <teleport to="body">
    <div v-if="showPasswordModal" class="password-modal-overlay" @click.self="cancelPassword">
      <div class="password-modal">
        <h3 class="font-thai text-lg font-bold mb-3">กรุณาใส่รหัสผ่าน</h3>
        <input v-model="passwordInput" type="password" placeholder="รหัสผ่าน" class="password-input mb-3" />
        <div v-if="passwordError" class="text-red-600 mb-2">{{ passwordError }}</div>
        <div style="display:flex; justify-content:flex-end; gap:8px;">
          <button @click="cancelPassword" class="px-4 py-2 rounded bg-gray-200">ยกเลิก</button>
          <button @click="submitPassword" class="px-4 py-2 rounded bg-[#9e8c1a] text-white">ยืนยัน</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { watchEffect } from 'vue'

const projectLinks: Record<string, string> = {
  huaroaDashboard: '/renewablesort/HuaroiEspresso',
  huaroaCity: '/renewablesort/HuaroiEspressoCity',
  maehongson: '/renewablesort/MaehongsonEspresso'
}

// Per-item passwords (updated by user)
const passwords: Record<string, string> = {
  huaroaDashboard: '240124',
  huaroaCity: '240124',
  maehongson: '240124'
}

const showPasswordModal = ref(false)
const selectedKey = ref<string | null>(null)
const passwordInput = ref('')
const passwordError = ref('')

function requestPassword(key: string) {
  selectedKey.value = key
  passwordInput.value = ''
  passwordError.value = ''
  showPasswordModal.value = true
}

function submitPassword() {
  if (!selectedKey.value) return
  const expected = passwords[selectedKey.value]
  if (passwordInput.value === expected) {
    showPasswordModal.value = false
    const key = selectedKey.value
    selectedKey.value = null
    passwordInput.value = ''
    passwordError.value = ''
    openProject(key)
  } else {
    passwordError.value = 'รหัสไม่ถูกต้อง'
  }
}

function cancelPassword() {
  showPasswordModal.value = false
  selectedKey.value = null
  passwordInput.value = ''
  passwordError.value = ''
}



function openProject(key: string) {
  const url = projectLinks[key]
  if (url) window.open(url, '_blank')
}

function openLead(lead: any) {
  // Always open the canonical public URL so address stays under kwangunlimit.com
  const run = pad(lead.runNumber || 0)
  const canonical = `https://www.kwangunlimit.com/espresso/${run}`
  window.open(canonical, '_blank')
}

function isOnlineLead(lead: any) {
  return !!(lead && lead.status && String(lead.status).includes('deployed'))
}

// ----- Online status polling -----
const statusData = ref<any[]>([])
const statusLoading = ref(false)
let statusTimer: any = null

// ----- Leads (clients) -----
const leads = ref<any[]>([])
const leadsLoading = ref(true)

function pad(n: number) { return String(n).padStart(3, '0') }
function formatDate(d: string) { try { return new Date(d).toLocaleDateString('th-TH') } catch { return '-' } }
function statusDot(s: string) { return s && String(s).includes('deployed') ? 'bg-green-500' : 'bg-gray-400' }

function typeLabel(t: string) {
  if (!t) return '-'
  if (t === '1') return 'หน่วยงานราชการ'
  if (t === '2') return 'บริษัทเอกชน'
  if (t === '3') return 'ลูกค้าทั่วไป'
  return t
}

const fetchLeads = async () => {
  try {
    leadsLoading.value = true
    const res: any = await $fetch('/api/espresso')
    if (res && res.success) {
      leads.value = (res.list || []).slice().sort(
        (a: any, b: any) => Number(a.runNumber || 0) - Number(b.runNumber || 0)
      )
    }
  } catch (e) {
    console.error('fetchLeads error', e)
  } finally {
    leadsLoading.value = false
  }
}

// Fetch status from daily_page_users endpoint (per-DB online counts)
const fetchStatus = async () => {
  try {
    statusLoading.value = true
    const res: any = await $fetch('/api/daily-page-users')
    if (res && res.success) {
      // API may return an array (all DBs) or a single object when ?db= is used
      if (Array.isArray(res.data)) {
        statusData.value = res.data.map((d: any) => ({
          dbName: d.dbName,
          label: d.label,
          onlineCount: d.onlineCount ?? 0,
          clients: d.clients ?? []
        }))
      } else if (res.data && typeof res.data === 'object') {
        statusData.value = [{
          dbName: res.data.dbName,
          label: res.data.label,
          onlineCount: res.data.onlineCount ?? 0,
          clients: res.data.clients ?? []
        }]
      }
    }
  } catch (e) {
    console.error('fetchStatus error', e)
  } finally {
    statusLoading.value = false
  }
}

onMounted(() => {
  // start polling (3 minutes)
  fetchStatus()
  fetchLeads()
  statusTimer = setInterval(fetchStatus, 3 * 60 * 1000)
})

onBeforeUnmount(() => {
  if (statusTimer) clearInterval(statusTimer)
})

function isOnlineFor(keyword: string) {
  const item = statusData.value.find(d => d.label && d.label.includes(keyword))
  return item ? (Number(item.onlineCount) > 0) : false
}

onMounted(() => {
  let observer: IntersectionObserver | null = null
  const scrollElements = document.querySelectorAll('.scroll-reveal')
  scrollElements.forEach(el => {
    el.classList.remove('is-visible')
  })
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  }
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      }
    })
  }, observerOptions)
  scrollElements.forEach(el => observer!.observe(el))
  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })
})
</script>

<style scoped>
.font-thai {
  font-family: 'Roboto', sans-serif;
}
.scroll-reveal {
  opacity: 0;
  transform: translateY(60px);
  transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
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
.spline-link-card {
  width: 100%;
  max-width: 250px;
  height: auto;
  min-height: 0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 12px;
}
@media (min-width: 640px) {
  .spline-link-card {
    width: 250px;
    min-height: 80px;
    padding: 0 20px;
  }
}
.spline-link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}
.card-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  width: 100%;
  gap: 12px;
}
@media (min-width: 640px) {
  .card-content {
    padding: 0 12px;
    gap: 16px;
  }
}
.card-content span {
  font-weight: 600;
  font-size: 13px;
  text-align: center;
}
@media (min-width: 640px) {
  .card-content span {
    font-size: 16px;
  }
}
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
/* Flow column styles */
.flow-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
  padding-top: 6px;
}
.card-row {
  display: flex;
  justify-content: center;
  width: 100%;
}
.flow-card {
  width: 100%;
  max-width: 320px;
  height: auto;
  display: flex;
  align-items: center;
  padding: 0 14px;
  border-radius: 10px;
}
/* arrows removed - keep styles if needed later */
.arrow { display: none; }

/* Tree Structure Styles */
.tree-container { 
  display: flex; 
  flex-wrap: wrap;
  justify-content: flex-start; 
  gap: 40px;
  margin-top: 20px;
  padding: 20px 20px 40px;
  padding-left: clamp(16px, 4vw, 60px);
  max-width: min(1200px, 95vw);
  margin-left: auto;
  margin-right: auto;
}

.tree-wrapper {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  width: 320px;
  max-width: 100%;
}

.tree-parent {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;
  position: relative;
  flex: 1 1 auto;
}

/* เอาเส้นออก */
.tree-parent::after {
  display: none;
}

.tree-children {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding-left: 40px;
  margin-top: 0;
  position: relative;
}

/* เอาเส้นออก */
.tree-children::before {
  display: none;
}

.child-card {
  cursor: pointer;
  position: relative;
  z-index: 1;
}

/* เอาเส้นออก */
.child-card::before {
  display: none;
}

/* เอาเส้นออก */
.tree-line-vertical {
  display: none;
}

/* Parent header */
.parent-box {
  width: 100%;
  max-width: 360px;
  height: 100%;
  min-height: 200px;
  padding: 12px 16px;
  border-radius: 10px;
  border: 2px solid #74640a;
  align-items: stretch;
}
.parent-card-content {
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4px;
  height: 100%;
}
/* High-specificity width lock so all cards are equal regardless of content */
.spline-link-card.parent-box {
  width: 100%;
  max-width: 320px;
  min-height: 200px;
}
.parent-title { font-weight: 700; font-size: 16px; }
.parent-sub { font-weight: 800; font-size: 20px; }
.parent-meta { font-size: 14px; color: #2b2b2b; line-height: 1.4; }

/* compact logo inside cards */
.card-content img { width: 40px !important; height: 40px !important; }
.card-content span { font-size: 15px; font-weight: 600; }

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
  .neon-btn {
    border-width: 2px;
    padding: 8.4px 19.6px;
    font-size: 0.7rem;
  }
  .tree-container {
    padding: 15px 10px;
    padding-left: 20px;
    justify-content: center;
    gap: 16px;
  }

  /* increase top spacing on mobile */
  .root-bg {
    padding-top: 3.5rem;
  }
  .tree-parent {
    margin-bottom: 16px;
  }
  .tree-children {
    gap: 12px;
    padding-left: 25px;
  }
  .parent-box {
    width: 90%;
    max-width: 340px;
    padding: 14px 18px;
  }
  .parent-title { font-size: 15px; }
  .parent-sub { font-size: 14px; }
  .parent-meta { font-size: 12px; }
  .flow-card {
    width: 100%;
    max-width: none;
    height: auto;
    padding: 12px 14px;
    align-items: flex-start;
  }
  .card-content .status-dot { transform: translateY(-6px); }
  .card-content img {
    width: 32px !important;
    height: 32px !important;
  }
  .card-content span {
    font-size: 13px;
  }
}
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

@media (max-width: 768px) {
  .background-image { display: none; }
  .marquee { min-width: 200%; animation-duration: 20s; }
}

/* Extra small screens tweaks */
@media (max-width: 420px) {
  .scroll-reveal { margin-top: 0.5rem !important; padding-left: 8px; padding-right: 8px; }
  .running-text {
    border-width: 2px;
    padding: 8px 10px;
    font-size: 0.65rem;
    border-radius: 14px;
  }
  .marquee { min-width: 150%; animation-duration: 14s; }
  .marquee-content { margin-right: 0.8rem; }
  .marquee span { padding: 0.25rem 0.6rem; font-size: 0.62rem; margin-right: 0.4rem; }
  .tree-container { padding: 12px 12px 28px; padding-left: 12px; gap: 18px; justify-content: center; }
  .root-bg { padding-top: 3rem; }
  .parent-box { width: 100%; max-width: 100%; padding: 16px 18px; }
  .spline-link-card, .flow-card { padding: 0 12px; }
  .card-content .status-dot { transform: translateY(-6px); }
  .card-content { gap: 8px; }
  .parent-sub { font-size: 15px; }
  .parent-title { font-size: 14px; }
  .parent-meta { font-size: 11px; }
  .background-image { display: none; }
}

@media (min-width: 1024px) {
  .spline-link-card { max-width: 320px; min-height: 70px; }
  .flow-card { max-width: 360px; }
  .tree-container { gap: 48px; }
}
.flipbook-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 20px;
  overflow: visible;
  background: transparent !important;
}
.flipbook {
  width: 100%;
  max-width: 600px;
  height: 450px;
  overflow: visible !important;
  background: transparent !important;
}
.flipbook :deep(.viewport) {
  width: 100% !important;
  height: 100% !important;
  overflow: visible !important;
  background: transparent !important;
}
.flipbook :deep(.bounding-box) {
  overflow: visible !important;
  background: transparent !important;
}
.flipbook :deep(canvas) {
  background: transparent !important;
}
.flipbook :deep(.stf__item),
.flipbook :deep(.stf__block),
.flipbook :deep(.stf__wrapper) {
  background: transparent !important;
}
.flipbook :deep(div) {
  background-color: transparent !important;
}
.flipbook :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
@media (max-width: 768px) {
  .flipbook {
    height: 200px;
    max-width: 300px;
  }
}
.pdf-download-bar {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 100;
}
.pdf-download-btn {
  padding: 12px 28px;
  background: #f8f6f0;
  color: #251f03;
  border-radius: 24px;
  font-weight: 700;
  border: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
  font-size: 18px;
}
.pdf-download-btn:hover {
  transform: scale(1.08) rotate(-2deg);
  box-shadow: 0 6px 24px rgba(255, 200, 80, 0.25);
  background: #ffe8a0;
  transition: transform 0.2s cubic-bezier(.4,2,.3,1), box-shadow 0.2s, background 0.2s;
}
@media (max-width: 768px) {
  .pdf-download-bar {
    right: 12px;
    bottom: 12px;
  }
  .pdf-download-btn {
    padding: 10px 18px;
    font-size: 15px;
  }
}

/* Password modal styles */
.password-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 120;
}
.password-modal {
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.25);
}
.password-input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

/* Status cards styling */
.status-badge { display: inline-block; min-width: 34px; text-align: center; padding: 2px 8px; border-radius: 999px; background:#f3f3f3; color:#111; }
.status-badge.status-online { background: #1db954; color: #fff; }
.client-chip { display:flex; align-items:center; gap:8px; padding:6px 8px; background: #fffef8; border:1px solid #ddd; border-radius:8px; font-size:12px; }
.client-id { max-width:120px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.status-dot { width:14px; height:14px; border-radius:50%; display:inline-block; margin-left:8px; }
.status-dot.online { background:#1db954; box-shadow:0 0 6px rgba(29,185,84,0.35); }
.status-dot.offline { background:#bbb; }

.status-label { margin-left:8px; font-weight:700; font-size:14px; color:#111; }
</style>
