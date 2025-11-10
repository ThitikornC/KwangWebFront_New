<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { dataComapareProductStore } from '~/store/compare_store';
import { dataProductStore } from '~/store/product-store';
const { showProductWithFilter } = storeToRefs(dataProductStore());
const { isOpenCompareComponent, productDataCompare,catagoriesTypeCompare } = storeToRefs(dataComapareProductStore());
const { deleteProductCompare } = dataComapareProductStore()
const setChecked = (Products_id: string) => {
    const found = showProductWithFilter.value.find((element) => element.Products_id === Products_id);
    if (found) {
        found.checked = false; // Set checked to false
    }
};
</script>
<template>
    <div v-if="isOpenCompareComponent"
        class="fixed z-50 py-10 w-full bg-white bottom-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-t border-graylight flex justify-center items-center">
        <div class="w-[1280px] flex flex-row justify-center">
            <div class="w-[250px] h-[180px] text-topic flex flex-col gap-2">
                <span class="font-thai">
                    เปรียบเทียบผลิตภัณฑ์สูงสุด 4 รายการ
                </span>
                <div class="w-full">
                    <label for="type"
                        class="block text-detail text-gray-600 w-full font-thai font-light mb">ประเภทของสินค้า
                    </label>
                    <select class="select rounded-none outline-none border-graylight" v-model="catagoriesTypeCompare">
                        <option value="Accesscontrol">Accesscontrol</option>
                        <option value="Airsolarcell">Air Solarcell</option>
                        <option value="CCTV">CCTV</option>
                        <option value="InterActive">Interactive</option>
                        <option value="Inverter">Inverter</option>
                        <option value="Ledwall">Ledwall</option>
                        <option value="Networkswitch">Networkswitch</option>
                        <option value="Recorder">Recorder</option>
                        <option value="Solarcell">Solarcell</option>
                    </select>
                </div>
                <div class="w-[200px] font-thai text-[14px] text-redlight">
                    <span>หมายเหตุ กรุณาเลือก Type ของสินค้าให้เหมือนกันทั้งหมด</span>
                </div>
            </div>
            <div class="flex flex-nowrap gap-2 font-thai">
                <div v-for="(item, index) in productDataCompare.slice(0, 4)" :key="index"
                    class="flex w-[180px] h-[180px] rounded-sm">
                    <template v-if="item && Object.keys(item).length > 0">
                        <div class="flex flex-col items-center gap">
                            <div 
                                class="relative w-[140px] h-[140px] border border-graylight bg-graylight/50 p-4 flex justify-center items-center">
                                <button class="absolute top-1 left-1"
                                    @click.prevent="deleteProductCompare(item);setChecked(item.Products_id);">
                                    <img src="https://img.icons8.com/?size=100&id=7703&format=png&color=6D6E70"
                                        class="w-[28px] hover:scale-105" />
                                </button>
                                <div class="w-full h-full flex items-center justify-center">
                                    <img :src="item.image" class="h-full">
                                </div>
                            </div>
                            <span v-if="item" class="mt-1 w-full text-sm font-light text-black text-center">
                                {{ item.ProductBrand }}
                            </span>
                            <span v-if="item"  class="w-full text-sm font-light text-black text-center">
                                {{ item.ProductCode }}
                            </span>
                            <span class="w-full text-sm font-light text-black text-center">
                                Type : {{ item.type }}
                            </span>
                        </div>
                    </template>
                    <template v-else>
                        <div class="flex flex-col items-center gap-2">
                            <div
                                class="w-[140px] h-[140px] flex items-center justify-center border bg-graylight/50 border-graylight font-inter text-header text-gray font-semibold">
                                {{ index + 1 }}
                            </div>
                            <span class="mt-1 w-full text-sm font-light text-black text-center">
                                    เพิ่มสินค้าที่จะเปรียบเทียบ
                            </span>
                        </div>
                    </template>
                </div>
            </div>
            <div class="w-[200px] flex flex-col gap-2 h-full">
                <nuxt-link to="/products/compare" class="text-white bg-gray font-thai px-2 py-4 font-light text-center cursor-pointer">เปรียบเทียบสินค้า</nuxt-link>
                <button @click.prevent="isOpenCompareComponent = false"
                    class="text-black bg-white border border-transparent font-thai px-2 py-4 font-normal hover:border-black">
                    ยกเลิก
                </button>
            </div>
        </div>
    </div>
</template>