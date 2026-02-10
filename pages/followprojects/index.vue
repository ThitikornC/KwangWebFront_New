<script setup lang="ts">
import { ref } from 'vue';
const isOpenComponentDetail = ref(false);
</script>
<template>
    <div class="flex flex-col justify-center px-20">
        <header class="w-full flex justify-between gap-2 items-center font-inter py-2">
            <nuxt-link to="/">
                <img src="/kwang_logo2.png" class="w-20" />
            </nuxt-link>
            <div class="flex gap-4">
                <nuxt-link to="/home"
                    class="cursor-pointer flex items-center gap-2 px-4 py-2 border border-graylight rounded-full">
                    <img src="https://img.icons8.com/?size=100&id=12229&format=png&color=000000" class="w-6" />
                    COMPANY PROFILE
                </nuxt-link>
                <nuxt-link to="/products"
                    class="cursor-pointer flex items-center gap-2 px-4 py-2 border border-graylight rounded-full">
                    <img src="https://img.icons8.com/?size=100&id=GuOROHDN3mQt&format=png&color=000000" class="w-6" />
                    PRODUCT SELL
                </nuxt-link>
            </div>
        </header>
        <div class="flex flex-col items-center font-light gap-4">
            <h1 class="w-full text-header font-inter">PROJECT</h1>
            <div class="w-full flex justify-between ">
                <div class="flex justify-center items-center border border-graylight focus-within:border-reddeep px-4">
                    <input type="text" name="username" placeholder="ค้นหาด้วยโปรเจ็คของคุณ"
                        class="w-[260px] py-2  font-thai font-light focus:outline-none" autocomplete="off">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                        class="w-4 h-4 opacity-70">
                        <path fill-rule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
                <!-- <div class="border px-4 flex justify-center items-center border-graylight">
                    Sort by
                </div> -->
                <!--  -->

            </div>
            <div class="flex flex-wrap font-light font-thai gap-8 justify-center">
                <!-- card -->
                <div class="w-[300px] border p-4 rounded-lg shadow-md flex flex-col gap-2">
                    <div class="w-full flex flex-row gap-4 items-center">
                        <img src="https://store-images.s-microsoft.com/image/apps.37935.9007199266245907.b029bd80-381a-4869-854f-bac6f359c5c9.91f8693c-c75b-4050-a796-63e1314d18c9"
                            class="w-[40px] h-[40px] border rounded-sm" />
                        <span class="text-[20px]">Facebook</span>
                    </div>
                    <!-- title -->
                    <span class="text-[18px]">Facebook Project</span>
                    <div class="flex flex-col">
                        <div class="flex justify-between">
                            <span>- Detail</span>
                            <span>กำหนดการ 20 มค 2567</span>
                        </div>
                        <div class="flex justify-between">
                            <span>- Detail</span>
                            <span>กำหนดการ 20 มค 2567</span>
                        </div>
                        <div class="flex justify-between">
                            <span>- Detail</span>
                            <span>กำหนดการ 20 มค 2567</span>
                        </div>
                    </div>
                    <!-- สเกล -->
                    <span class="w-full flex justify-center text-[13px]">50%</span>
                    <div class="w-[full] h-[4px] border border-graylight rounded-full">
                        <div class="w-2/4 bg-graylight h-full"></div>
                    </div>
                    <div class="flex justify-between">
                        <button class="border px-8 rounded-sm bg-redlight text-white text-sm"
                            @click.prevent="isOpenComponentDetail = !isOpenComponentDetail">
                            รายละเอียด
                        </button>
                        <div class="flex items-center gap-2">
                            <span>
                                PHASE 1
                            </span>
                            <img src="https://i2.wp.com/hips.hearstapps.com/hmg-prod/images/justin-bieber-gettyimages-1202421980.jpg?resize=1200:*"
                                class="w-[36px] h-[36px] border rounded-sm" />
                        </div>
                    </div>
                </div>
                <!-- card -->
                <!-- card -->
                <div class="w-[300px] border p-4 rounded-lg shadow-md flex flex-col gap-2">
                    <div class="w-full flex flex-row gap-4 items-center">
                        <img src="https://store-images.s-microsoft.com/image/apps.37935.9007199266245907.b029bd80-381a-4869-854f-bac6f359c5c9.91f8693c-c75b-4050-a796-63e1314d18c9"
                            class="w-[40px] h-[40px] border rounded-sm" />
                        <span class="text-[20px]">Facebook</span>
                    </div>
                    <!-- title -->
                    <span class="text-[18px]">Facebook Project</span>
                    <div class="flex flex-col">
                        <div class="flex justify-between">
                            <span>- Detail</span>
                            <span>กำหนดการ 20 มค 2567</span>
                        </div>
                        <div class="flex justify-between">
                            <span>- Detail</span>
                            <span>กำหนดการ 20 มค 2567</span>
                        </div>
                        <div class="flex justify-between">
                            <span>- Detail</span>
                            <span>กำหนดการ 20 มค 2567</span>
                        </div>
                    </div>
                    <!-- สเกล -->
                    <span class="w-full flex justify-center text-[13px]">50%</span>
                    <div class="w-[full] h-[4px] border border-graylight rounded-full">
                        <div class="w-2/4 bg-graylight h-full"></div>
                    </div>
                    <div class="flex justify-between">
                        <button class="border px-8 rounded-sm bg-redlight text-white text-sm">
                            รายละเอียด
                        </button>
                        <div class="flex items-center gap-2">
                            <span>
                                PHASE 1
                            </span>
                            <img src="https://i2.wp.com/hips.hearstapps.com/hmg-prod/images/justin-bieber-gettyimages-1202421980.jpg?resize=1200:*"
                                class="w-[36px] h-[36px] border rounded-sm" />
                        </div>
                    </div>
                </div>
                <!-- card -->
                <!-- card -->
                <div class="w-[300px] border p-4 rounded-lg shadow-md flex flex-col gap-2">
                    <div class="w-full flex flex-row gap-4 items-center">
                        <img src="https://store-images.s-microsoft.com/image/apps.37935.9007199266245907.b029bd80-381a-4869-854f-bac6f359c5c9.91f8693c-c75b-4050-a796-63e1314d18c9"
                            class="w-[40px] h-[40px] border rounded-sm" />
                        <span class="text-[20px]">Facebook</span>
                    </div>
                    <!-- title -->
                    <span class="text-[18px]">Facebook Project</span>
                    <div class="flex flex-col">
                        <div class="flex justify-between">
                            <span>- Detail</span>
                            <span>กำหนดการ 20 มค 2567</span>
                        </div>
                        <div class="flex justify-between">
                            <span>- Detail</span>
                            <span>กำหนดการ 20 มค 2567</span>
                        </div>
                        <div class="flex justify-between">
                            <span>- Detail</span>
                            <span>กำหนดการ 20 มค 2567</span>
                        </div>
                    </div>
                    <!-- สเกล -->
                    <span class="w-full flex justify-center text-[13px]">50%</span>
                    <div class="w-[full] h-[4px] border border-graylight rounded-full">
                        <div class="w-2/4 bg-graylight h-full"></div>
                    </div>
                    <div class="flex justify-between">
                        <button class="border px-8 rounded-sm bg-redlight text-white text-sm">
                            รายละเอียด
                        </button>
                        <div class="flex items-center gap-2">
                            <span>
                                PHASE 1
                            </span>
                            <img src="https://i2.wp.com/hips.hearstapps.com/hmg-prod/images/justin-bieber-gettyimages-1202421980.jpg?resize=1200:*"
                                class="w-[36px] h-[36px] border rounded-sm" />
                        </div>
                    </div>
                </div>
                <!-- card -->
                <!-- box detail -->
                <div v-if="isOpenComponentDetail" class="border rounded-lg flex flex-row justify-center items gap-2">
                    <!-- card -->
                    <div class="w-[300px] p-4 rounded-lg flex flex-col gap-2">
                        <div class="w-full flex flex-row gap-4 items-center">
                            <img src="https://store-images.s-microsoft.com/image/apps.37935.9007199266245907.b029bd80-381a-4869-854f-bac6f359c5c9.91f8693c-c75b-4050-a796-63e1314d18c9"
                                class="w-[40px] h-[40px] border rounded-sm" />
                            <span class="text-[20px]">Facebook</span>
                        </div>
                        <!-- title -->
                        <span class="text-[18px]">Facebook Project</span>
                        <div class="flex flex-col">
                            <div class="flex justify-between">
                                <span>- Detail</span>
                                <span>กำหนดการ 20 มค 2567</span>
                            </div>
                            <div class="flex justify-between">
                                <span>- Detail</span>
                                <span>กำหนดการ 20 มค 2567</span>
                            </div>
                            <div class="flex justify-between">
                                <span>- Detail</span>
                                <span>กำหนดการ 20 มค 2567</span>
                            </div>
                        </div>
                        <!-- สเกล -->
                        <span class="w-full flex justify-center text-[13px]">50%</span>
                        <div class="w-[full] h-[4px] border border-graylight rounded-full">
                            <div class="w-2/4 bg-graylight h-full"></div>
                        </div>
                        <div class="flex justify-between">
                            <button class="border px-8 rounded-sm bg-redlight text-white text-sm"
                                @click.prevent="isOpenComponentDetail = !isOpenComponentDetail">
                                รายละเอียด
                            </button>
                            <div class="flex items-center gap-2">
                                <span>
                                    PHASE 1
                                </span>
                                <img src="https://i2.wp.com/hips.hearstapps.com/hmg-prod/images/justin-bieber-gettyimages-1202421980.jpg?resize=1200:*"
                                    class="w-[36px] h-[36px] border rounded-sm" />
                            </div>
                        </div>
                    </div>
                    <!-- card -->
                    <!-- detail from card -->
                    <div class="flex p-2 gap-2">
                        <button>
                            <img src="https://img.icons8.com/?size=100&id=100530&format=png&color=000000"
                                class="w-4 rotate-180" />
                        </button>
                        <div class="w-[300px] w-flex items-center h-full p-4 rounded-lg flex flex-col gap-2 border">
                            <span>PHASE 1</span>
                            <span class="text-topic">การออกแบบ UI</span>
                            <p >การออกแบบ UI เบื้องต้นของเฟสบุ๊คต้องเริ่มต้นยังไงในการพัฒนา
                            </p>
                            <span>กำหนดการ 20 มกราคม 2567</span>
                            <div class="flex gap-2 items-center">ผู้รับผิดชอบ จัสติน
                                <img src="https://i2.wp.com/hips.hearstapps.com/hmg-prod/images/justin-bieber-gettyimages-1202421980.jpg?resize=1200:*"
                                class="w-[36px] h-[36px] border rounded-sm" />
                            </div>
                        </div>
                        <button>
                            <img src="https://img.icons8.com/?size=100&id=100530&format=png&color=000000" class="w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>