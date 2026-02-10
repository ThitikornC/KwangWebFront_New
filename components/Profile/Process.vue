<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';
const textfind = ref('');
const textfix = ref('');
const textpredict = ref('');
const textcontrol = ref('');
const isEnglish = (text: string) => {
    const englishRegex = /^[A-Za-z0-9\s.,!?'"()]+$/;
    return englishRegex.test(text);
}
onMounted(() => {
    AOS.init();
});
</script>
<template>
    <div class="w-full bg-white flex justify-center font-inter">
        <div class="w-[1280px] flex flex-col items-center gap-12 py-10">
            <!-- sension mission -->
            <div class="w-1/3 h-[5px] bg-reddeep mt-10 rounded-full"></div>
            <!-- Section WORK PROCEDURE -->
            <div class="py-12 flex flex-col flex-wrap items-center" data-aos="fade-up"
                data-aos-anchor-placement="top-bottom" data-aos-duration="1200">
                <h1 class="text-header font-semibold text-reddeep">
                    WORK PROCEDURE
                </h1>
                <h2 class="text-topic text-graydeep">
                    <span class="font-thai">กระบวนการทำงาน</span>
                </h2>
                <div
                    class="pt-10 w-full max-w-[1280px] flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-20">
                    <div class="w-[300px] h-[200px] rounded-[10px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-gradient-to-t from-reddeep to-yellowoldlight text-white flex flex-col items-center justify-center cursor-pointer duration-300 ease-in hover:bg-none hover:text-yellowoldlight hover:border-4 border-yellowoldlight"
                        @mouseover="textfind = 'กำหนดขอบเขตปัญหาว่ามีเงื่อนไขข้อจำกัดและแรงผลักดันอะไรที่จะแก้ไขปัญหาครั้งนี้'"
                        @mouseleave="textfind = ''">
                        <p v-if="textfind === ''" class="text-[64px]">F</p>
                        <p class="text-detail text-center w-[160px]"
                            :class="{ 'font-inter': isEnglish(textfind), 'font-thai': !isEnglish(textfind) }">
                            {{ textfind === '' ? 'Find' : textfind }}
                        </p>
                    </div>
                    <div class="lg:mt-20 w-[300px] h-[200px] rounded-[10px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-gradient-to-t from-reddeep to-yellowoldlight text-white flex flex-col items-center justify-center cursor-pointer duration-300 ease-in hover:bg-none hover:text-yellowoldlight hover:border-4 border-yellowoldlight"
                        @mouseover="textfix = 'ย่อยปัญหาจัดความสำคัญพร้อมออกแบบวิธีการเพื่อแก้ไข'"
                        @mouseleave="textfix = ''">
                        <p v-if="textfix === ''" class="text-[64px]">F</p>
                        <p class="text-detail text-center w-[160px]"
                            :class="{ 'font-inter': isEnglish(textfix), 'font-thai': !isEnglish(textfix) }">
                            {{ textfix === '' ? 'Fix' : textfix }}
                        </p>
                    </div>
                    <div class="w-[300px] h-[200px] rounded-[10px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-gradient-to-t from-reddeep to-yellowoldlight text-white flex flex-col items-center justify-center cursor-pointer duration-300 ease-in hover:bg-none hover:text-yellowoldlight hover:border-4 border-yellowoldlight"
                        @mouseover="textpredict = 'นำผลการแก้ปัญหามาวินิฉัยพร้อมคาดการณ์เหตุการณ์ล่วงหน้า'"
                        @mouseleave="textpredict = ''">
                        <p v-if="textpredict === ''" class="text-[64px]">P</p>
                        <p class="text-detail text-center w-[160px]"
                            :class="{ 'font-inter': isEnglish(textpredict), 'font-thai': !isEnglish(textpredict) }">
                            {{ textpredict === '' ? 'Predict' : textpredict }}
                        </p>
                    </div>
                    <div class="lg:mt-20 w-[300px] h-[200px] rounded-[10px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-gradient-to-t from-reddeep to-yellowoldlight text-white flex flex-col items-center justify-center cursor-pointer duration-300 ease-in hover:bg-none hover:text-yellowoldlight hover:border-4 border-yellowoldlight"
                        @mouseover="textcontrol = 'ขั้นตอนควบคุมแผนดำเนินงานให้เป็นไปตามวัตถุประสงค์ที่กำหนดไว้'"
                        @mouseleave="textcontrol = ''">
                        <p v-if="textcontrol === ''" class="text-[64px] font-inter">C</p>
                        <p class="text-detail text-center w-[160px]"
                            :class="{ 'font-inter': isEnglish(textcontrol), 'font-thai': !isEnglish(textcontrol) }">
                            {{ textcontrol === '' ? 'Control' : textcontrol }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>