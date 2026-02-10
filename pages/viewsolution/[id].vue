<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRuntimeConfig } from '#imports'
import axios from 'axios'

interface Solution {
  projectName: string
  description: string
  linkVideoPreview: string   // e.g. "/video/ShakeHandlounge.mp4"
  linkPresentSheet: string
}

const route = useRoute()
const config = useRuntimeConfig()
const solution = ref<Solution|null>(null)
const isLoading = ref(true)

onMounted(async () => {
  const id = route.params.id as string
  const url = `${config.public.apiURL}/solutions/${id}`
  console.log('🔗 Fetching:', url)
  try {
    const { data } = await axios.get<Solution>(url)
    console.log('✅ Got data:', data)
    solution.value = data
  } catch (err) {
    console.error('❌ Fetch error:', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="font-thai">
      <!-- Top nav -->
      <header class="mt-5 flex justify-end px-10 space-x-7">
        <a href="/home"     class="text-gray-800 font-medium hover:underline">About Us</a>
        <a href="/products" class="text-gray-800 font-medium hover:underline">Shop</a>
      </header>
      <!-- Main logo -->
      <div class="flex justify-start items-center px-20 py-4">
        <a href="/home">
          <img
            src="/kwang_logo3.png"
            alt="Kwang Unlimit Logo"
            class="h-16 md:h-20 lg:h-24 w-auto"
          />
        </a>
      </div>

    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      กำลังโหลด...
    </div>

    <div v-else class="p-6 max-w-xl mx-auto space-y-6">
      <h1 class="text-2xl font-bold">{{ solution!.projectName }}</h1>
      <!--<p>{{ solution!.description }}</p> -->

      <!-- วิดีโอ -->
      <video
        v-if="solution!.linkVideoPreview"
        :src="solution!.linkVideoPreview"
        controls
        class="w-full rounded-lg border-2 border-gray-200"
      ></video>
      <p v-else class="text-center text-gray-500">ไม่มีวิดีโอให้แสดง</p>

      <!-- ปุ่มดู Document -->
      <div class="mt-4">
        <a
          v-if="solution!.linkPresentSheet"
          :href="solution!.linkPresentSheet"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full inline-flex justify-center items-center gap-2
                px-6 py-3 bg-reddeep text-white font-thai rounded-md border border-reddeep
                hover:bg-white hover:text-reddeep transition"
        >
          ดู Document
          <img
            src="https://img.icons8.com/?size=100&id=15010&format=png&color=ffffff"
            class="h-5 group-hover:hidden"
          />
          <img
            src="https://img.icons8.com/?size=100&id=15010&format=png&color=7F181B"
            class="h-5 hidden group-hover:block"
          />
        </a>
        <p v-else class="text-center text-gray-500">ไม่มีเอกสารให้ดาวน์โหลด</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

.font-thai {
  font-family: 'Poppins', sans-serif;
}
</style>