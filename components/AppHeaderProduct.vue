<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import { dataProductStore } from '~/store/product-store';
const { productSearch } = storeToRefs(dataProductStore());
const searchQuery = ref('');
const searchComponentIsOpen = ref(false);
const searchResults = ref<SearchResult[]>([]);
const runtimeConfig = useRuntimeConfig();
const isLoadingDataForSearch = ref(false)
interface SearchResult {
    image: string;
    ProductBrand: string;
    ProductCode: string;
    type: string;
}
const fetchDataForSearch = async () => {
    try {
        const response = await axios.get(`${runtimeConfig.public.apiURL}/products/all/${searchQuery.value}`);
        productSearch.value = response.data;
        isLoadingDataForSearch.value = true; // Set loading state to true after data is fetched
    } catch (error) {
        console.error('Error fetching search product data:', error);
        throw error;
    }
};

const handleSearch = async () => {
    isLoadingDataForSearch.value = false; // Reset loading state before fetching data
    await fetchDataForSearch();
    if (isLoadingDataForSearch.value) { // Check loading state after data is fetched
        if (searchQuery.value) {
            const filteredResults = productSearch.value.filter(item =>
                item.ProductBrand.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                item.ProductCode.toLowerCase().includes(searchQuery.value.toLowerCase())
            );
            searchResults.value = filteredResults.slice(0, 5);
        }
    }
};

</script>
<template>
    <header class="w-full font-inter tracking-wide relative">
        <!--  -->
        <section class="bg-white w-full flex justify-center border-b border-graylight " v-if="!searchComponentIsOpen">
            <div class="relative w-full max-w-[1280px] flex flex-col xl:flex-row items-center justify-between">
                <div class="w-full flex justify-center">
                    <nuxt-link to="/"><img src="/kwang_logo2.png" class="h-[70px]" /></nuxt-link>
                </div>
                <div class="w-full flex justify-center">
                    <ul class="flex gap-4 text-black font-light text-detail font-thai">
                        <!-- <li>
                            <NuxtLink to="/products/new">
                                <span class="font-thai  border-none hover:border border-gray px-3 py-1 rounded-full hover:bg-graylight/50">หน้าเเรก</span>
                            </NuxtLink>
                        </li> -->
                        <li>
                            <NuxtLink to="/products">
                                <span class="font-thai border-none hover:border border-gray px-3 py-1 rounded-full hover:bg-graylight/50">สินค้าทั้งหมด</span>
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/products/contact">
                                <span class="font-thai border-none hover:border border-gray px-3 py-1 rounded-full hover:bg-graylight/50">ติดต่อ</span>
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/products/compare">
                                <span class="font-thai border-none hover:border border-gray px-3 py-1 rounded-full hover:bg-graylight/50">เปรียบเทียบ</span>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
                <!-- โซนค้นหาเก่า -->
                <div class="w-full flex gap-2 justify-center ">
                    <div class="w-[40px] flex justify-end items-center gap-2">
                        <button @click.prevent="handleSearch" @focus="searchComponentIsOpen = true" class="border border-graylight p-2 rounded-[4px] hover:border-reddeep">
                            <img src="https://img.icons8.com/?size=100&id=59878&format=png&color=000000" class="w-[20px]" />
                        </button>
                    </div>
                    <div class="w-[40px] flex justify-end items-center gap-2 border border-graylight p-2 rounded-[4px] hover:border-reddeep">
                        <!-- <a href="/products/compare" class="flex items-center gap-2">
                            <span class="font-thai text-black">เปรียบเทียบ</span>
                        </a> -->
                        <a href="/products/cart" class="flex items-center gap-2">
                            <img src="https://img.icons8.com/?size=100&id=5hmLU5efq3jw&format=png&color=000000"
                                class="w-[20px]" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <!-- โซนค้นหาใหม่ -->
        <section v-else class="w-full relative h-[70px] flex bg-reddeep">
            <div class="w-full relative flex flex-col items-center justify-center">
                <div class="w-full relative max-w-[960px] flex justify-between px-10">
                    <input type="text" placeholder=" กรุณาพิมพ์สินค้าที่ต้องการค้นหา"
                        class="font-thai font-extralight text-topic w-full z-10 px-3 py-2 bg-transparent text-white text-sm focus:border-reddeep outline-none"
                        v-model="searchQuery" @input="handleSearch" />
                    <button @click.prevent="searchQuery = ''; searchComponentIsOpen = false">
                        <img src="https://img.icons8.com/?size=100&id=6483&format=png&color=ffffff" class="w-[40px]" />
                    </button>
                </div>
                <div class="w-full relative max-w-[960px] flex justify-between">
                    <div v-if="searchResults.length > 0"
                        class="absolute z-20 p-2 border border-graylight bg-white w-full mt-2 flex flex-col gap-2">
                        <nuxtLink :to="`/products/${item.type}/${item.ProductBrand}/${item.ProductCode}`"
                            @click.prevent="searchComponentIsOpen = false" v-for="(item, index) in searchResults"
                            :key="index"
                            class="group flex cursor-pointer items-center border border-white p-2 rounded-[4px] hover:bg-reddeep">
                            <img :src="item.image"
                                class="w-[50px] h-[50px] object-scale-down object-center bg-white rounded-[2px]" />
                            <div class="ml-4 flex flex-col group-hover:text-white">
                                <span>{{ item.ProductBrand }}</span>
                                <span>{{ item.ProductCode }}</span>
                            </div>
                        </nuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </header>
</template>

<style scoped>
input::placeholder {
    color: white;
}
</style>
