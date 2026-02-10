<script setup lang="ts">
import { solutionsStore  } from '~/store/solution_store'
import { storeToRefs } from 'pinia';
const {handleMenuSelectNetwork,handleMenuSelectSolarcell,handleMenuSelectSoftware,handleMenuSelectOther} = solutionsStore()
const {sol_type_Network,sol_type_Solarcell,sol_type_Software,sol_type_Other} = storeToRefs(solutionsStore())
</script>

<template>
    <div class="w-full flex flex-col items-center font-inter py-14">
        <div class="size-11/12 md:w-[768px] lg:w-[976px] xl:w-[1280px] flex flex-col items-center gap-8">
            <div class="w-full h-[200px] bg-reddeep rounded-[8px] flex items-center justify-end">
                <img src="/city.jfif" alt="Image" class="w-full h-full object-cover rounded-[8px]">
            </div>
            <div class="w-[100px] h-[5px] bg-reddeep rounded-full"></div>
            <div class="w-full flex flex-col items-center gap-4">
                <h1 class="text-header text-reddeep font-bold">PROJECTS</h1>
                <h2 class="text-topic font-thai text-graydeep">ประเภท</h2>
            </div>
            <div class="flex flex-wrap justify-center gap-4 md:gap-[24px]">
                <button @click="handleMenuSelectNetwork()">
                    <div :class="['flex flex-col items-center justify-center rounded-[8px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] font-semibold gap-4 bg-cover bg-center w-[180px] sm:w-[200px] md:w-[300px] h-[100px] sm:h-[150px] md:h-[200px] hover:-translate-y-3 duration-300', sol_type_Network ? 'border-4 border-redlight' : '']" style="background-image: url('/solution/Networksystem/networksystemai.jfif')">
                        <p class="text-topic text-white text-shadow">Network</p>
                    </div>
                </button>
                <button @click="handleMenuSelectSolarcell()">
                    <div :class="['flex flex-col items-center justify-center rounded-[8px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] font-semibold gap-4 bg-cover bg-center w-[180px] sm:w-[200px] md:w-[300px] h-[100px] sm:h-[150px] md:h-[200px] hover:-translate-y-3 duration-300', sol_type_Solarcell ? 'border-4 border-redlight' : '']" style="background-image: url('/solution/Solarsystem/solarsystemai.jfif')">
                        <p class="text-topic text-white text-shadow">Solar cell</p>
                    </div>
                </button>
                <button @click="handleMenuSelectSoftware()">
                    <div :class="['flex flex-col items-center justify-center rounded-[8px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] font-semibold gap-4 bg-cover bg-center w-[180px] sm:w-[200px] md:w-[300px] h-[100px] sm:h-[150px] md:h-[200px] hover:-translate-y-3 duration-300', sol_type_Software ? 'border-4 border-redlight' : '']" style="background-image: url('/solution/Softwaresystem/Softwaresystemai.jfif')">
                        <p class="text-topic text-white text-shadow">Software</p>
                    </div>
                </button>
                <button @click="handleMenuSelectOther()">
                    <div :class="['flex flex-col items-center justify-center rounded-[8px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] font-semibold gap-4 bg-cover bg-center w-[180px] sm:w-[200px] md:w-[300px] h-[100px] sm:h-[150px] md:h-[200px] hover:-translate-y-3 duration-300', sol_type_Other ? 'border-4 border-redlight' : '']" style="background-image: url('/solution/Other/othersystem.jfif')">
                        <p class="text-topic text-white text-shadow">Other</p>
                    </div>
                </button>
            </div>
            <div class="w-full">
                <p class="text-topic text-reddeep font-thai">
                    <span>งานทั้งหมด</span>
                    <!-- <span v-if="sol_type_Network" class="font-inter font-semibold"> Network </span>
                    <span v-if="sol_type_Solarcell" class="font-inter font-semibold"> Solar Cell </span>
                    <span v-if="sol_type_Software" class="font-inter font-semibold"> Software </span>
                    <span v-if="sol_type_Other" class="font-inter font-semibold"> Other </span> -->
                </p>
            </div>
        </div>
    </div>
</template>


<style scoped>
.text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
