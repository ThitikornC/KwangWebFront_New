<script setup lang="ts">
import { onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';
onMounted(() => {
    AOS.init();
});
</script>
<template>
    <div class="w-full bg-white flex flex-col items-center ">
        <div class="w-full flex flex-col items-center pt-14">
            <div class="bg-white w-full px-4 pt-16 pb-16" id="faq">
                <div class="w-full flex flex-col items-center pb-10">
                    <h1 class="text-header text-center text-reddeep font-semibold">PARTNER</h1>
                    <!-- <h2 class="text-4xl font-bold text-center">Happy Customers</h2> -->
                    <p class="pt-6 pb-8 text-graydeep max-w-2xl text-center m-auto font-thai text-topic">
                        พันธมิตร
                    </p>
                </div>
                <div data-aos="zoom-in" 
                    data-aos-duration="1000"
                    class="mx-auto w-full max-w-4xl bg-white justify-center items-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-10">
                    <a target="_blank" href="">
                        <img alt="" class="h-24  mx-auto" src="/bangjak_logo.png">
                    </a>
                    <a target="_blank" href="">
                        <img alt="" class="h-24  mx-auto" src="/nu_logo.png">
                    </a>
                    <a target="_blank" href="">
                        <img alt="" class="h-24  mx-auto" src="/phnu-logo.png">
                        
                    </a>
                    <a target="_blank" href="">
                        <img alt="" class="h-24  mx-auto" src="/NU_BEC_Logo.png">
                    </a>
                    <a target="_blank" href="">
                        <img alt="" class="h-24  mx-auto" src="/HNU_logo.png">
                    </a>
                    <a target="_blank" href="">
                        <img alt="" class="h-20  mx-auto" src="/sgtech.jpg">
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>