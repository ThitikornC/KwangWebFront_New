<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios';
import dayjs from 'dayjs'; // Import dayjs
import { storeToRefs } from 'pinia'
import { solutionsStore } from '~/store/solution_store'
const { solutions, sol_type_Network, sol_type_Software, sol_type_Solarcell, sol_type_Other } = storeToRefs(solutionsStore())
const runtimeConfig = useRuntimeConfig();
const fetchSolutionData = async () => {
    try {
        const response = await axios.get(`${runtimeConfig.public.apiURL}/solutions`);
        solutions.value = response.data; // Assign fetched data to solutions in the store
        console.log('Success fetching solution data!')
    } catch (error) {
        console.error('Error fetching solutions:', error);
    }
}

const formatDate = (dateStr: string) => {
    return dayjs(dateStr).format('D MMMM YYYY'); // Format date as 1 January 2000
};

definePageMeta({
    layout: 'custom'
})
// Computed property for filtered solutions based on selected types
const filteredSolutions = computed(() => {
    return solutions.value.filter((project) => {
        if (project.type === 'Network') return sol_type_Network.value;
        if (project.type === 'SolarCell') return sol_type_Solarcell.value;
        if (project.type === 'Software') return sol_type_Software.value;
        if (project.type === 'Other') return sol_type_Other.value;
        return true; // Default to true if no match (should not happen if types are correctly filtered)
    });
});
onMounted(async () => {
    await fetchSolutionData();
})
</script>
<template>
    <SolutionTypeGroup />
    <!-- การ์ดแสดงงานต่างๆ -->
    <div class="w-full flex flex-col items-center font-inter">
        <div class="sm:w-[450px] md:w-[748px] lg:w-[946px] xl:w-[1280px]">
            <div class="grid justify-center md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
                <!-- Loop through each project -->
                <div v-for="(project, index) in filteredSolutions" :key="index"
                    class="w-[360px] sm:w-[400px] bg-white rounded-lg border-2 border-reddeep shadow-md overflow-hidden hover:scale-105 cursor-pointer">
                    <video class="h-[300px] w-full object-cover pointer-events-none" autoplay muted loop>
                        <source :src="project.linkVideoPreview" type="video/mp4">
                    </video>
                    <div class="p-3 flex flex-col items-center gap-2">
                        <span class="text-sm text-graydeep">{{ formatDate(project.date) }}</span>
                        <h3 class="font-semibold text-topic leading-6 text-reddeep my-2">Project : <span
                                class="font-thai">{{ project.projectName }}</span></h3>
                        <div class="">
                            <a :href="project.linkPresentSheet" target="_blank" rel="noopener noreferrer"
                                class="bg-reddeep w-full px-4 py-2 font-thai text-white rounded-[4px] border border-reddeep flex gap-2 hover:bg-white hover:text-reddeep group">
                                ดู Document
                                <img src="https://img.icons8.com/?size=100&id=15010&format=png&color=ffffff"
                                    class="w-[18px] group-hover:hidden" />
                                <img src="https://img.icons8.com/?size=100&id=15010&format=png&color=7F181B"
                                    class="w-[18px] hidden group-hover:block" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
