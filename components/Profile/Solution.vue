<script setup lang="ts" type="module">
import { onMounted, ref, computed, reactive, onBeforeUnmount, nextTick } from 'vue';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import dayjs from 'dayjs';
import { solutionsStore } from '~/store/solution_store';
import type { Solution } from '~/store/solution_store';
import type { Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { storage, ref as storageRef, uploadBytes, getDownloadURL } from '~/utils/firebase';
useSeoMeta({
  title: 'Kwang Unlimit',
  ogTitle: 'Kwang Unlimit',
  description: 'Welcome to New ERA ! Kwang unlimit',
  ogDescription: 'Welcome to New ERA ! Kwang unlimit',
  ogImage: '/kwang_logo.png'
});
// Pinia state
const { solutions } = storeToRefs(solutionsStore());
const typedSolutions = solutions as Ref<Solution[]>;
const runtimeConfig = useRuntimeConfig();

const showDeleteModal = ref(false);
const deleteTargetId = ref<string | null>(null);
const passwordInput = ref('');
const adminPassword = 'admin@2568'

const showEditAuthModal = ref(false)
const editPasswordInput = ref('')
const editAuthorized = ref(false)
const showEditFormModal = ref(false)

const selectedProject = ref<any>(null)

// Loading & upload state
const isLoadingSolution = ref(false);
const showUpload = ref(false);
const form = reactive({ 
  projectName: '', 
  description: '',
  date: '', 
  tag: 'lastest', 
  linkVideoPreview: '', 
  linkPresentSheet: '',
  projectType: 'Network'
});

// Track selected index for video popup
const selectedIndex = ref<number | null>(null);
const selectedCategory = ref<string>('');

// Project type options
const projectTypes = ['Network', 'Solar cell', 'Software', 'Other'];

// Video file handling
const videoFile = ref<File | null>(null);
const videoPreview = ref('');
const isUploading = ref(false);

// Auto-scroll intervals
const autoScrollIntervals: { [key: string]: number | null } = {};

// Handle file selection
function handleFileChange(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (files && files[0] && files[0].type === 'video/mp4') {
    videoFile.value = files[0];
    const reader = new FileReader();
    reader.onload = e => { videoPreview.value = e.target?.result as string; };
    reader.readAsDataURL(files[0]);
  }
}

// Handle drag & drop
function handleDrop(event: DragEvent) {
  const file = event.dataTransfer?.files[0];
  if (file && file.type === 'video/mp4') {
    videoFile.value = file;
    const reader = new FileReader();
    reader.onload = e => { videoPreview.value = e.target?.result as string; };
    reader.readAsDataURL(file);
  }
}

async function confirmDelete() {
  if (passwordInput.value !== adminPassword) {
    alert('รหัสผ่านไม่ถูกต้อง');
    return;
  }

  try {
    await axios.delete(`${runtimeConfig.public.apiURL}/solutions/${deleteTargetId.value}`);
    await fetchSolutionData();
    showDeleteModal.value = false;
    passwordInput.value = '';
  } catch (e) {
    console.error('ลบไม่สำเร็จ:', e);
  }
}

const openEditModal = (project: any) => {
  selectedProject.value = project
  showEditAuthModal.value = true
}

const confirmEditAccess = () => {
  const correctPassword = '1234'
  if (editPasswordInput.value === correctPassword) {
    selectedProject.value = { ...selectedProject.value }
    showEditAuthModal.value = false
    showEditFormModal.value = true
    editPasswordInput.value = ''
  } else {
    alert('❌ รหัสผ่านไม่ถูกต้อง')
  }
}

const submitEdit = async () => {
  try {
    await axios.put(`${runtimeConfig.public.apiURL}/solutions/${selectedProject.value.id}`, {
      projectName: selectedProject.value.projectName,
      description: selectedProject.value.description,
      linkVideoPreview: selectedProject.value.linkVideoPreview,
      date: new Date(selectedProject.value.date).toISOString(),
      linkPresentSheet: selectedProject.value.linkPresentSheet,
      type: selectedProject.value.type,
      tag: selectedProject.value.tag,
    })
    alert('อัปเดตสำเร็จแล้ว ✅')
    showEditFormModal.value = false
    await fetchSolutionData();
  } catch (err) {
    console.error('อัปเดตไม่สำเร็จ:', err)
    alert('❌ ไม่สามารถอัปเดตข้อมูลได้')
  }
}

function shareSolution(documentUrl: string) {
  if (navigator.share) {
    navigator.share({
      title: 'เอกสารโปรเจกต์ของฉัน',
      url: documentUrl,
    }).catch((err) => console.error('แชร์ไม่สำเร็จ:', err));
  } else {
    navigator.clipboard.writeText(documentUrl);
    alert('คัดลอกลิงก์แล้ว:\n' + documentUrl);
  }
}

// Remove selected file
function removeFile() {
  videoFile.value = null;
  videoPreview.value = '';
}

// Fetch solutions
async function fetchSolutionData() {
  isLoadingSolution.value = false;
  try {
    const { data } = await axios.get(`${runtimeConfig.public.apiURL}/solutions`);
    solutions.value = data;
    isLoadingSolution.value = true;
  } catch (e) {
    console.error('Fetch error:', e);
  }
}

// Format date
function formatDate(dateStr: string) {
  return dayjs(dateStr).format('D MMMM YYYY');
}

// Filter by category and sort by date (newest first)
const projectsByCategory = computed(() => {
  const categories = ['Solar cell', 'Network', 'Software'];
  const result: { [key: string]: Solution[] } = {};
  
  categories.forEach(category => {
    result[category] = solutions.value
      .filter(p => p.tag === 'lastest' && p.type === category)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });
  
  return result;
});

// Toggle video popup
function togglePopup(category: string, i: number) {
  selectedCategory.value = category;
  selectedIndex.value = selectedIndex.value === i ? null : i;
}

// Scroll functions
function scrollLeft(containerId: string) {
  // หยุด auto-scroll ก่อน
  pauseAutoScroll(containerId);
  
  const container = document.getElementById(containerId);
  if (container) {
    container.scrollBy({ left: -380, behavior: 'smooth' });
  }
  
  // เริ่ม auto-scroll ใหม่หลัง 2 วินาที
  setTimeout(() => {
    resumeAutoScroll(containerId);
  }, 2000);
}

function scrollRight(containerId: string) {
  // หยุด auto-scroll ก่อน
  pauseAutoScroll(containerId);
  
  const container = document.getElementById(containerId);
  if (container) {
    container.scrollBy({ left: 380, behavior: 'smooth' });
  }
  
  // เริ่ม auto-scroll ใหม่หลัง 2 วินาที
  setTimeout(() => {
    resumeAutoScroll(containerId);
  }, 2000);
}

async function submitForm() {
  try {
    isUploading.value = true;

    if (videoFile.value) {
      const storageReference = storageRef(storage, `videos/${Date.now()}_${videoFile.value.name}`);
      const snapshot = await uploadBytes(storageReference, videoFile.value);
      const downloadURL = await getDownloadURL(snapshot.ref);
      form.linkVideoPreview = downloadURL;
    }
    
    await axios.post(`${runtimeConfig.public.apiURL}/solutions`, { 
      ...form,
      type: form.projectType
    });

    await fetchSolutionData();
    showUpload.value = false;
    resetForm();
  } catch (e) {
    console.error('Upload error:', e);
  } finally {
    isUploading.value = false;
  }
}

// Reset form
function resetForm() {
  form.projectName = '';
  form.description = '';
  form.date = '';
  form.tag = 'lastest';
  form.linkVideoPreview = '';
  form.linkPresentSheet = '';
  form.projectType = 'Network';
  videoFile.value = null;
  videoPreview.value = '';
}

// Setup auto-scroll for a container (smooth continuous scroll)
function setupAutoScroll(containerId: string) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.log('Container not found:', containerId);
    return;
  }

  // ตรวจสอบว่ามีเนื้อหาเพียงพอที่จะเลื่อนหรือไม่
  const hasScrollableContent = container.scrollWidth > container.clientWidth;
  console.log(`${containerId} - scrollWidth: ${container.scrollWidth}, clientWidth: ${container.clientWidth}, hasScrollable: ${hasScrollableContent}`);

  if (!hasScrollableContent) {
    console.log(`${containerId} has no scrollable content, skipping auto-scroll`);
    return;
  }

  // Clear existing interval if any
  if (autoScrollIntervals[containerId]) {
    clearInterval(autoScrollIntervals[containerId]!);
  }

  // Set initial scroll position to the end
  const maxScroll = container.scrollWidth - container.clientWidth;
  container.scrollLeft = maxScroll;
  console.log(`${containerId} initial scroll set to:`, maxScroll);

  // Smooth continuous scroll - update every 30ms (scrolling LEFT)
  autoScrollIntervals[containerId] = window.setInterval(() => {
    if (!container) return;
    
    const currentScroll = container.scrollLeft;
    
    // If reached the start, jump to end without animation
    if (currentScroll <= 2) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollLeft = maxScroll;
      console.log(`${containerId} looped back to end`);
    } else {
      // Scroll LEFT by 2px for smooth continuous effect
      container.scrollLeft -= 2;
    }
  }, 30); // Update every 30ms
  
  console.log(`${containerId} auto-scroll started`);
}

// Cleanup function
function cleanupAutoScroll() {
  console.log('Cleaning up auto-scroll intervals');
  Object.entries(autoScrollIntervals).forEach(([key, interval]) => {
    if (interval !== null) {
      clearInterval(interval);
      console.log(`Cleared interval for ${key}`);
    }
  });
}

// เพิ่มฟังก์ชันสำหรับหยุด/เริ่ม auto-scroll เมื่อ hover
function pauseAutoScroll(containerId: string) {
  if (autoScrollIntervals[containerId]) {
    clearInterval(autoScrollIntervals[containerId]!);
    autoScrollIntervals[containerId] = null;
    console.log(`${containerId} auto-scroll paused`);
  }
}

function resumeAutoScroll(containerId: string) {
  // เริ่ม auto-scroll ใหม่
  setupAutoScroll(containerId);
}

onMounted(async () => {
  console.log('Component mounted');
  await fetchSolutionData();
  AOS.init();
  
  // รอให้ DOM อัพเดทและข้อมูลถูก render ก่อน
  await nextTick();
  
  // Setup auto-scroll for each category with delay
  setTimeout(() => {
    console.log('Setting up auto-scroll after data load...');
    setupAutoScroll('solarcell-container');
    setupAutoScroll('network-container');
    setupAutoScroll('software-container');
  }, 1500);
});

// Cleanup on unmount
onBeforeUnmount(() => {
  console.log('Component unmounting');
  cleanupAutoScroll();
});
</script>

<template>

  <div
    class="w-full flex flex-col items-center"
    data-aos="fade-up"
    data-aos-anchor-placement="top-bottom"
    data-aos-duration="1000"
  >
  <div class="background-image2">
  <img src="/kwang_logo.png" alt="Logo" />
</div>

    <!-- ตัววิ่ง -->
<div class="flex justify-center flex-1 px-[clamp(1rem,3vw,1.5rem)] mt-[clamp(4rem,10vw,5.625rem)] mb-[clamp(2rem,4vw,3rem)]">       
      <div class="running-text w-full max-w-[min(1200px,95vw)] overflow-hidden relative text-[clamp(0.875rem,1.5vw,1.25rem)] whitespace-nowrap">
          <div class="marquee">
            <div class="marquee-content">
              <span>Make tech fresh get forward</span>
              <span>EST 24/01/2024</span>
            </div>
            <div class="marquee-content">
    
              <span>Make tech fresh get forward</span>
              <span>EST 24/01/2024</span>
            </div>
          </div>
        </div>
      </div>
  <div class="w-full max-w-[min(80rem,95vw)] flex flex-col items-center gap-[clamp(1.5rem,3vw,2.5rem)] px-[clamp(1rem,3vw,1rem)]">

<div class="neon-btn flex flex-col justify-center items-center text-center mb-[clamp(0.25rem,1vw,0.25rem)]">
  <h1 class="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold text-black">OUR PROJECTS</h1>
  <h2 class="text-[clamp(1.25rem,2.5vw,1.875rem)] text-black font-thai">ผลงาน</h2>
</div>


    

      <!-- Projects by Category -->
      <div v-if="isLoadingSolution" class="w-full font-inter space-y-12">

        <!-- Solar Cell Category -->
        <div v-if="projectsByCategory['Solar cell']?.length > 0" class="w-full">
          <div class="flex items-center justify-between mb-[clamp(1rem,2vw,1.5rem)]">
            <h2 class="pt-[clamp(2rem,3vw,3rem)] text-[clamp(1rem,2vw,1.25rem)] font-semibold font-thai neon-btn whitespace-nowrap">
              ออกแบบและติดตั้งระบบโซล่าเซลล์ (Renewable energy)
            </h2>
            <span class="text-[clamp(0.875rem,1.5vw,1rem)] text-gray-600 ml-[clamp(0.5rem,2vw,1rem)] neon-btn whitespace-nowrap">
              {{ projectsByCategory['Solar cell'].length }} Projects
            </span>
          </div>

          <div class="relative">
            <div 
              id="solarcell-container"
              @mouseenter="pauseAutoScroll('solarcell-container')"
              @mouseleave="resumeAutoScroll('solarcell-container')"
              class="flex gap-[clamp(1rem,2vw,1.25rem)] overflow-x-auto scrollbar-hide scroll-smooth px-[clamp(0.5rem,1vw,0.5rem)] py-[clamp(0.75rem,2vw,1rem)]"
              style="scroll-snap-type: x mandatory;"
            >
              <div
                v-for="(project, i) in projectsByCategory['Solar cell']"
                :key="project.id"
class="relative flex-shrink-0 w-[clamp(250px,25vw,300px)] h-[clamp(350px,40vw,420px)] bg-white rounded-lg border-[6px] border-[#74640a] shadow-[1px_1px_0_#000,-8px_6px_0_#3b3305,0_0_20px_rgba(255,230,160,0.55)] overflow-hidden hover:scale-105 cursor-pointer transition-transform duration-300 z-50"
                style="scroll-snap-align: start;"
                @click="togglePopup('Solar cell', i)"
              >
                <video
                  class="h-[clamp(120px,15vw,150px)] w-full object-cover object-center pointer-events-none"
                  autoplay
                  muted
                  loop
                  playsinline
                >
                  <source :src="project.linkVideoPreview" type="video/mp4" />
                </video>

                <div class="p-[clamp(0.5rem,1.5vw,0.75rem)] flex flex-col items-center gap-[clamp(0.25rem,1vw,0.5rem)]">
                  <span class="text-[clamp(0.875rem,1.5vw,1rem)] text-graydeep">{{ formatDate(project.date) }}</span>
                  <h3 class="font-semibold text-[clamp(0.875rem,1.5vw,1rem)] leading-6 text-black my-[clamp(0.25rem,1vw,0.5rem)]">
                    Project: <span class="font-thai">{{ project.projectName }}</span>
                  </h3>
                  <div class="flex flex-col gap-y-[clamp(0.25rem,1vw,0.5rem)] w-full">
                    <nuxt-link
                      :to="`/viewsolution/${project.id}`"
class="bg-[#74640a] w-full px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.5rem,1.5vw,0.5rem)] font-thai text-white rounded-[4px] border flex gap-[clamp(0.25rem,1vw,0.5rem)] justify-center hover:bg-white hover:text-[#74640a] group text-[clamp(0.75rem,1.25vw,0.875rem)]"
                    >
                      Document
                      <img
                        src="https://img.icons8.com/?size=100&id=15010&format=png&color=ffffff"
                        class="w-[18px] group-hover:hidden"
                      />
                      <img
                        src="https://img.icons8.com/?size=100&id=15010&format=png&color=7F181B"
                        class="w-[18px] hidden group-hover:block"
                      />
                    </nuxt-link>
                    <a
                      @click.stop="() => shareSolution(project.linkPresentSheet)"
                      href="#"
                      class="bg-blue-100 w-full px-4 py-2 font-thai text-blue-800 rounded-md border border-blue-600 flex items-center justify-center gap-2 hover:bg-blue-200 transition duration-200"
                    >
                      แชร์
                      <img
                        src="https://img.icons8.com/ios-filled/24/1e3a8a/share.png"
                        class="w-5 h-5"
                        alt="แชร์"
                      />
                    </a>
                  </div>
                  <button
                    @click.stop="() => { showDeleteModal = true; deleteTargetId = project.id }"
                    class="absolute bottom-1 left-2 p-1 bg-white rounded-full hover:bg-red-100"
                  >
                    <img src="https://img.icons8.com/ios-glyphs/30/fa314a/trash.png" alt="Delete" class="w-5 h-5" />
                  </button>
                  <button
                    @click.stop="openEditModal(project)"
                    class="absolute bottom-1 left-11 p-1 bg-white rounded-full hover:bg-red-100"
                  >
                    ✏️
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Scroll Right Button -->
            <button
              @click="scrollRight('solarcell-container')"
class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white hover:bg-[#74640a] text-[#74640a] hover:text-white border-2 border-[#74640a] rounded-full p-3 shadow-lg transition-all duration-300 z-[100]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
        </div>

        <!-- Software Category -->
        <div v-if="projectsByCategory['Software']?.length > 0" class="w-full">
          <div class="flex items-center justify-between mb-[clamp(1rem,2vw,1.5rem)]">
            <h2 class="pt-[clamp(2rem,3vw,3rem)] text-[clamp(1rem,2vw,1.25rem)] font-semibold font-thai neon-btn whitespace-nowrap">
              ซอฟต์แวร์ (Software)
            </h2>
            <span class="text-[clamp(0.875rem,1.5vw,1rem)] text-gray-600 ml-[clamp(0.5rem,2vw,1rem)] neon-btn whitespace-nowrap">
              {{ projectsByCategory['Software'].length }} Projects
            </span>
          </div>
          
          <div class="relative">
            <div 
              id="software-container"
              @mouseenter="pauseAutoScroll('software-container')"
              @mouseleave="resumeAutoScroll('software-container')"
              class="flex gap-[clamp(1rem,2vw,1.25rem)] overflow-x-auto scrollbar-hide scroll-smooth px-[clamp(0.5rem,1vw,0.5rem)] py-[clamp(0.75rem,2vw,1rem)]"
              style="scroll-snap-type: x mandatory;"
            >
              <div
                v-for="(project, i) in projectsByCategory['Software']"
                :key="project.id"
class="relative flex-shrink-0 w-[clamp(250px,25vw,300px)] h-[clamp(350px,40vw,420px)] bg-white rounded-lg border-[6px] border-[#74640a] shadow-[1px_1px_0_#000,-8px_6px_0_#3b3305,0_0_20px_rgba(255,230,160,0.55)] overflow-hidden hover:scale-105 cursor-pointer transition-transform duration-300 z-50"
                style="scroll-snap-align: start;"
                @click="togglePopup('Software', i)"
              >
                <video
                  class="h-[clamp(120px,15vw,150px)] w-full object-cover object-center pointer-events-none"
                  autoplay
                  muted
                  loop
                  playsinline
                >
                  <source :src="project.linkVideoPreview" type="video/mp4" />
                </video>
                <div class="p-[clamp(0.5rem,1.5vw,0.75rem)] flex flex-col items-center gap-[clamp(0.25rem,1vw,0.5rem)]">
                  <span class="text-[clamp(0.875rem,1.5vw,1rem)] text-graydeep">{{ formatDate(project.date) }}</span>
                  <h3 class="font-semibold text-[clamp(0.875rem,1.5vw,1rem)] leading-6 text-black my-[clamp(0.25rem,1vw,0.5rem)]">
                    Project: <span class="font-thai">{{ project.projectName }}</span>
                  </h3>
                  <div class="flex flex-col gap-y-[clamp(0.25rem,1vw,0.5rem)] w-full">
                    <nuxt-link
                      :to="`/viewsolution/${project.id}`"
class="bg-[#74640a] w-full px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.5rem,1.5vw,0.5rem)] font-thai text-white rounded-[4px] border flex gap-[clamp(0.25rem,1vw,0.5rem)] justify-center hover:bg-white hover:text-[#74640a] group text-[clamp(0.75rem,1.25vw,0.875rem)]"
                    >
                      Document
                      <img
                        src="https://img.icons8.com/?size=100&id=15010&format=png&color=ffffff"
                        class="w-[18px] group-hover:hidden"
                      />
                      <img
                        src="https://img.icons8.com/?size=100&id=15010&format=png&color=7F181B"
                        class="w-[18px] hidden group-hover:block"
                      />
                    </nuxt-link>
                    <a
                      @click.stop="() => shareSolution(project.linkPresentSheet)"
                      href="#"
                      class="bg-blue-100 w-full px-4 py-2 font-thai text-blue-800 rounded-md border border-blue-600 flex items-center justify-center gap-2 hover:bg-blue-200 transition duration-200"
                    >
                      แชร์
                      <img
                        src="https://img.icons8.com/ios-filled/24/1e3a8a/share.png"
                        class="w-5 h-5"
                        alt="แชร์"
                      />
                    </a>
                  </div>
                  <button
                    @click.stop="() => { showDeleteModal = true; deleteTargetId = project.id }"
                    class="absolute bottom-1 left-2 p-1 bg-white rounded-full hover:bg-red-100"
                  >
                    <img src="https://img.icons8.com/ios-glyphs/30/fa314a/trash.png" alt="Delete" class="w-5 h-5" />
                  </button>
                  <button
                    @click.stop="openEditModal(project)"
                    class="absolute bottom-1 left-11 p-1 bg-white rounded-full hover:bg-red-100"
                  >
                    ✏️
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Scroll Right Button -->
            <button
              @click="scrollRight('software-container')"
class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white hover:bg-[#74640a] text-[#74640a] hover:text-white border-2 border-[#74640a] rounded-full p-3 shadow-lg transition-all duration-300 z-[100]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Network Category -->
        <div v-if="projectsByCategory['Network']?.length > 0" class="w-full">
          <div class="flex items-center justify-between mb-[clamp(1rem,2vw,1.5rem)]">
            <h2 class="pt-[clamp(2rem,3vw,3rem)] text-[clamp(1rem,2vw,1.25rem)] font-semibold font-thai neon-btn whitespace-nowrap">
              ออกแบบและติดตั้งไอทีเน็ตเวิร์ค (IT Network)
            </h2>
            <span class="text-[clamp(0.875rem,1.5vw,1rem)] text-gray-600 ml-[clamp(0.5rem,2vw,1rem)] neon-btn whitespace-nowrap">
              {{ projectsByCategory['Network'].length }} Projects
            </span>
          </div>
          
          <div class="relative">
            <div 
              id="network-container"
              @mouseenter="pauseAutoScroll('network-container')"
              @mouseleave="resumeAutoScroll('network-container')"
              class="flex gap-[clamp(1rem,2vw,1.25rem)] overflow-x-auto scrollbar-hide scroll-smooth px-[clamp(0.5rem,1vw,0.5rem)] py-[clamp(0.75rem,2vw,1rem)]"
              style="scroll-snap-type: x mandatory;"
            >
              <div
                v-for="(project, i) in projectsByCategory['Network']"
                :key="project.id"
class="relative flex-shrink-0 w-[clamp(250px,25vw,300px)] h-[clamp(350px,40vw,420px)] bg-white rounded-lg border-[6px] border-[#74640a] shadow-[1px_1px_0_#000,-8px_6px_0_#3b3305,0_0_20px_rgba(255,230,160,0.55)] overflow-hidden hover:scale-105 cursor-pointer transition-transform duration-300 z-50"
                style="scroll-snap-align: start;"
                @click="togglePopup('Network', i)"
              >
                <video
                  class="h-[clamp(120px,15vw,150px)] w-full object-cover object-center pointer-events-none"
                  autoplay
                  muted
                  loop
                  playsinline
                >
                  <source :src="project.linkVideoPreview" type="video/mp4" />
                </video>
                <div class="p-[clamp(0.5rem,1.5vw,0.75rem)] flex flex-col items-center gap-[clamp(0.25rem,1vw,0.5rem)]">
                  <span class="text-[clamp(0.875rem,1.5vw,1rem)] text-graydeep">{{ formatDate(project.date) }}</span>
                  <h3 class="font-semibold text-[clamp(0.875rem,1.5vw,1rem)] leading-6 text-black my-[clamp(0.25rem,1vw,0.5rem)]">
                    Project: <span class="font-thai">{{ project.projectName }}</span>
                  </h3>
                  <div class="flex flex-col gap-y-[clamp(0.25rem,1vw,0.5rem)] w-full">
                    <nuxt-link
                      :to="`/viewsolution/${project.id}`"
class="bg-[#74640a] w-full px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.5rem,1.5vw,0.5rem)] font-thai text-white rounded-[4px] border flex gap-[clamp(0.25rem,1vw,0.5rem)] justify-center hover:bg-white hover:text-[#74640a] group text-[clamp(0.75rem,1.25vw,0.875rem)]"
                    >
                      Document
                      <img
                        src="https://img.icons8.com/?size=100&id=15010&format=png&color=ffffff"
                        class="w-[18px] group-hover:hidden"
                      />
                      <img
                        src="https://img.icons8.com/?size=100&id=15010&format=png&color=7F181B"
                        class="w-[18px] hidden group-hover:block"
                      />
                    </nuxt-link>
                    <a
                      @click.stop="() => shareSolution(project.linkPresentSheet)"
                      href="#"
                      class="bg-blue-100 w-full px-4 py-2 font-thai text-blue-800 rounded-md border border-blue-600 flex items-center justify-center gap-2 hover:bg-blue-200 transition duration-200"
                    >
                      แชร์
                      <img
                        src="https://img.icons8.com/ios-filled/24/1e3a8a/share.png"
                        class="w-5 h-5"
                        alt="แชร์"
                      />
                    </a>
                  </div>
                  <button
                    @click.stop="() => { showDeleteModal = true; deleteTargetId = project.id }"
                    class="absolute bottom-1 left-2 p-1 bg-white rounded-full hover:bg-red-100"
                  >
                    <img src="https://img.icons8.com/ios-glyphs/30/fa314a/trash.png" alt="Delete" class="w-5 h-5" />
                  </button>
                  <button
                    @click.stop="openEditModal(project)"
                    class="absolute bottom-1 left-11 p-1 bg-white rounded-full hover:bg-red-100"
                  >
                    ✏️
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Scroll Right Button -->
            <button
              @click="scrollRight('network-container')"
class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white hover:bg-[#74640a] text-[#74640a] hover:text-white border-2 border-[#74640a] rounded-full p-3 shadow-lg transition-all duration-300 z-[100]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          

        </div>

      </div>
      
      <div v-else class="skeleton w-10/12 h-48"></div>
    </div>

    <!-- Teleported Modals -->
    <teleport to="body">
      <!-- Video Popup Modal -->
      <div
        v-if="selectedIndex !== null && selectedCategory"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        @click.self="() => { selectedIndex = null; selectedCategory = '' }"
      >
        <div class="bg-white p-6 rounded-lg w-[80vw] max-w-[800px] aspect-video shadow-lg overflow-hidden relative">
          <button
            @click="() => { selectedIndex = null; selectedCategory = '' }"
            class="absolute top-1 right-2 text-gray-600 hover:text-gray-900 z-10 text-2xl"
          >
            ✕
          </button>
          <video
            :src="projectsByCategory[selectedCategory][selectedIndex].linkVideoPreview"
            controls
            autoplay
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Edit Auth Modal -->
      <div v-if="showEditAuthModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg w-full max-w-sm">
          <h3 class="text-lg font-medium mb-2">ยืนยันการแก้ไข</h3>
          <p class="mb-4 text-sm">กรุณากรอกรหัสผ่านเพื่อเข้าสู่การแก้ไขโปรเจกต์</p>
          <input
            v-model="editPasswordInput"
            type="password"
            placeholder="รหัสผ่าน"
            class="w-full border p-2 rounded mb-4"
          />
          <div class="flex justify-end gap-2">
            <button @click="showEditAuthModal = false" class="px-4 py-2 border rounded hover:bg-gray-100">ยกเลิก</button>
            <button @click="confirmEditAccess" class="px-4 py-2 bg-reddeep text-white rounded hover:bg-red-700">ยืนยัน</button>
          </div>
        </div>
      </div>

      <!-- Delete confirmation modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="showDeleteModal = false">
        <div class="bg-white p-6 rounded-lg w-full max-w-sm">
          <h3 class="text-lg font-medium mb-2">ยืนยันการลบ</h3>
          <p class="mb-4 text-sm">กรุณากรอกรหัสผ่านเพื่อยืนยันการลบโปรเจกต์</p>
          <input
            v-model="passwordInput"
            type="password"
            placeholder="รหัสผ่าน"
            class="w-full border p-2 rounded mb-4"
          />
          <div class="flex justify-end gap-2">
            <button @click="showDeleteModal = false" class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">ยกเลิก</button>
            <button @click="confirmDelete" class="px-4 py-2 bg-reddeep text-white rounded hover:bg-red-700">ยืนยันลบ</button>
          </div>
        </div>
      </div>

      <!-- Edit Form Modal -->
      <div v-if="showEditFormModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-xl w-[90%] max-w-xl shadow-xl space-y-6 text-gray-800 max-h-[90vh] overflow-y-auto">
          <h2 class="text-2xl font-bold border-b pb-2 text-gray-700">🛠 แก้ไขข้อมูลโปรเจกต์</h2>

          <div class="grid gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">ชื่อโปรเจกต์:</label>
              <input v-model="selectedProject.projectName" class="w-full px-3 py-2 border rounded-md" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">คำอธิบาย:</label>
              <textarea v-model="selectedProject.description" rows="3" class="w-full px-3 py-2 border rounded-md"></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">ลิงก์วิดีโอ:</label>
              <input v-model="selectedProject.linkVideoPreview" type="url" class="w-full px-3 py-2 border rounded-md" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">วันที่:</label>
              <input type="date" v-model="selectedProject.date" class="w-full px-3 py-2 border rounded-md" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">ลิงก์เอกสาร:</label>
              <input v-model="selectedProject.linkPresentSheet" type="url" class="w-full px-3 py-2 border rounded-md" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">ประเภท:</label>
              <select v-model="selectedProject.type" class="w-full px-3 py-2 border rounded-md">
                <option v-for="type in projectTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">แท็ก:</label>
              <input v-model="selectedProject.tag" class="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>

          <div class="flex justify-end gap-4 pt-6">
            <button
              @click="showEditFormModal = false"
              class="flex items-center gap-1 px-4 py-2 text-red-600 hover:text-white hover:bg-red-600 border border-red-600 rounded-md transition"
            >
              ❌ ยกเลิก
            </button>
            <button
              @click="submitEdit"
              class="flex items-center gap-1 px-4 py-2 text-red-600 hover:text-white hover:bg-red-600 border border-red-600 rounded-md transition"
            >
              💾 บันทึก
            </button>
          </div>
        </div>
        
      </div>
      
      <!-- Hidden Upload Button - Fixed Bottom Right -->
      <button 
        @click="showUpload = true" 
        class="fixed bottom-6 right-6 w-12 h-12 bg-[#74640a] hover:bg-[#f8f6f0] text-white hover:text-[#74640a] rounded-full shadow-lg opacity-20 hover:opacity-100 transition-all duration-300 flex items-center justify-center z-50 border-2 border-transparent hover:border-[#74640a]"
        title="Upload New Project"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
      
      <!-- Upload Modal -->
      <div v-if="showUpload" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="showUpload = false">
        <div class="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h3 class="text-lg font-medium mb-4">Upload Solution</h3>
          <form @submit.prevent="submitForm" class="space-y-3">
            <!-- Project Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <input 
                v-model="form.projectName" 
                placeholder="Project Name" 
                required 
                class="w-full border p-2 rounded" 
              />
            </div>
            
            <!-- Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input 
                v-model="form.date" 
                type="date" 
                required 
                class="w-full border p-2 rounded" 
              />
            </div>
            
            <!-- Project Type -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
              <select 
                v-model="form.projectType" 
                class="w-full border p-2 rounded"
              >
                <option v-for="type in projectTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                v-model="form.description" 
                placeholder="คำอธิบายโปรเจกต์" 
                class="w-full border p-2 rounded resize-none"
                rows="3"
                required
              ></textarea>
            </div>
            
            <!-- Tag -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tag</label>
              <input 
                v-model="form.tag" 
                placeholder="Tag" 
                class="w-full border p-2 rounded" 
              />
            </div>
            
            <!-- Video Upload -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Video</label>
              <div class="border p-3 rounded">
                <!-- File upload -->
                <div v-if="!videoFile && !form.linkVideoPreview" class="flex flex-col space-y-2">
                  <div class="flex items-center">
                    <label for="videoUpload" class="flex-1 cursor-pointer bg-gray-100 py-2 px-3 rounded text-center hover:bg-gray-200">
                      เลือกไฟล์วิดีโอ MP4
                    </label>
                    <span class="mx-2">หรือ</span>
                    <input 
                      v-model="form.linkVideoPreview" 
                      placeholder="Video URL" 
                      class="flex-1 border p-2 rounded" 
                    />
                  </div>
                  <input 
                    id="videoUpload" 
                    type="file" 
                    accept="video/mp4" 
                    @change="handleFileChange" 
                    class="hidden" 
                  />
                  <p class="text-xs text-gray-500">*อัพโหลดไฟล์ MP4 หรือ วางลิงก์วิดีโอ</p>
                </div>
                
                <!-- File preview -->
                <div v-if="videoFile" class="flex flex-col space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-sm truncate max-w-[300px]">{{ videoFile.name }}</span>
                    <button 
                      type="button" 
                      @click="removeFile" 
                      class="text-red-600 hover:text-red-800"
                    >
                      ✕
                    </button>
                  </div>
                  <video 
                    v-if="videoPreview" 
                    :src="videoPreview" 
                    controls 
                    class="w-full h-32 object-cover" 
                  />
                </div>
                
                <!-- URL preview -->
                <div v-else-if="form.linkVideoPreview" class="flex flex-col space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-sm truncate max-w-[300px]">URL: {{ form.linkVideoPreview }}</span>
                    <button 
                      type="button" 
                      @click="form.linkVideoPreview = ''" 
                      class="text-red-600 hover:text-red-800"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Document URL -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Document URL</label>
              <input 
                v-model="form.linkPresentSheet" 
                placeholder="Document URL" 
                class="w-full border p-2 rounded" 
              />
            </div>
            
            <!-- Form actions -->
            <div class="flex justify-end gap-2 pt-2">
              <button 
                type="button" 
                @click="showUpload = false" 
                class="px-5 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                ยกเลิก
              </button>
              <button 
                type="submit" 
                class="px-5 py-2 bg-reddeep text-white rounded hover:bg-red-700 flex items-center"
                :disabled="isUploading"
              >
                <span v-if="isUploading" class="mr-2">
                  <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                {{ isUploading ? 'กำลังอัพโหลด...' : 'บันทึก' }}
              </button>
            </div>
          </form>
        </div>
          <!-- Actions -->
    
      </div>
      
    </teleport>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
.font-roboto {
  font-family: 'Roboto', sans-serif !important;
}
.running-text {
  background: linear-gradient(180deg, #f8f6f0 0%, #fff8e8 50%, #f5f0e5 100%);
  color: #000;
  border: clamp(4px, 0.5vw, 6px) solid #74640a;
  border-radius: 9999px;
  font-weight: 700;
  text-transform: uppercase;
  padding: clamp(10px, 1.5vw, 15px) clamp(15px, 2vw, 20px);
  box-shadow:
    0 0 5px rgba(255,248,220,0.25),
    0 0 10px rgba(255,240,180,0.2),
    inset 0 10px 16px rgba(239,187,91,0.68),
    inset 0 10px 16px rgba(255,220,140,0.55),
    inset 0 0 45px rgba(255,235,180,0.45),
    inset 0 0 80px rgba(255,250,230,1);
  text-shadow: 0 1px 0 rgba(255,255,255,0.4), 0 -1px 0 rgba(0,0,0,0.15), 0 0 6px rgba(255,230,160,0.55);
  box-shadow: 1px 1px 0 #000, clamp(-6px, -0.8vw, -8px) clamp(4px, 0.6vw, 6px) #3b3305, 0 0 20px rgba(255,230,160,0.55);
  overflow: hidden;
  position: relative;
  z-index: 50;
}

/* ลดขนาด 70% สำหรับมือถือ */
@media (max-width: 768px) {
  .running-text {
    border-width: 3px;
    padding: 7px 10px;
    font-size: 0.7rem;
  }
  
  /* ป้องกัน text wrap */
  .whitespace-nowrap {
    white-space: nowrap !important;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/* --- ส่วน marquee, scroll-reveal และอื่นๆ เหมือนเดิม --- */

.marquee { display: flex; min-width: 300%; animation: marquee 30s linear infinite; }
.marquee-content { display: flex; align-items: center; margin-right: 2rem; }
.marquee img { max-height: 40px; display: inline-block; vertical-align: middle; margin-right: 1rem; }
.marquee span {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  padding: clamp(0.375rem, 1vw, 0.5rem) clamp(1.25rem, 2.5vw, 2rem);
  background: linear-gradient(180deg, #f8f6f0 0%, #fff8e8 50%, #f5f0e5 100%);
  font-weight: 700;
  text-transform: uppercase;
  border: clamp(1.5px, 0.25vw, 2px) solid #000;
  border-radius: clamp(4px, 0.6vw, 6px);
  box-shadow: 2px 2px 0 #000, -1px -1px 0 #000, 0 0 6px rgba(255,230,160,0.55);
  margin-right: clamp(0.75rem, 1.5vw, 1rem);
  font-size: clamp(0.75rem, 1.25vw, 0.875rem);
}

@media (max-width: 768px) {
  .marquee span {
    padding: 0.26rem 0.875rem;
    border-width: 1px;
    border-radius: 3px;
    font-size: 0.525rem;
    margin-right: 0.525rem;
  }
}

.running-text-container { justify-content: flex-start; padding-left: 25px; padding-right: 0; }
.running-text { max-width: 1280px; width: auto; }

@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.neon-btn {
  background: linear-gradient(180deg, #f8f6f0 0%, #fffef8 45%, #fff8e8 55%, #f5f0e5 100%);
  color: #000000;
  border: clamp(4px, 0.5vw, 6px) solid #74640a;
  border-radius: 9999px;
  box-shadow:
    inset 0 0 90px rgba(255, 252, 240, 1),
    1px 1px 0 #000,
    clamp(-6px, -0.8vw, -8px) clamp(4px, 0.6vw, 6px) #3b3305,
    0 0 20px rgba(255,230,160,0.55);
  font-weight: 700;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  padding: clamp(12px, 1.5vw, 16px) clamp(28px, 4vw, 40px);
  transform: translateZ(0);
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .neon-btn {
    border-width: 3px;
    padding: 8.4px 19.6px;
    font-size: 0.7rem;
  }
}
.background-image2 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  max-width: none;
  height: auto;
  opacity: 0.1;
  z-index: 999999; /* 🔥 สูงสุดในโปรเจกต์ */
  pointer-events: none;
}


.root-bg {
  position: relative; /* เพื่อให้ absolute ของ background-image อิง container */
}


.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>