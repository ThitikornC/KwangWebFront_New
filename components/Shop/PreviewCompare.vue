<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { dataComapareProductStore } from '~/store/compare_store';
import { dataProductStore } from '~/store/product-store';
import SoftButton from '~/components/SoftButton.vue';
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
        class="fixed z-50 py-6 w-full bottom-0 flex justify-center items-center">
        <div class="w-full max-w-[1200px] px-4 flex flex-col sm:flex-row sm:items-start gap-6 soft-card p-6">
            <div class="w-full sm:w-64 text-topic flex flex-col gap-3 text-white">
                <h3 class="font-thai font-semibold text-white">เปรียบเทียบผลิตภัณฑ์สูงสุด 4 รายการ</h3>
                <label for="type" class="block text-sm text-graylight font-thai font-light">ประเภทของสินค้า</label>
                <select id="type" class="w-full rounded border border-graylight px-3 py-2 text-sm outline-none bg-transparent text-white" v-model="catagoriesTypeCompare">
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
                <p class="text-xs text-redlight">หมายเหตุ: กรุณาเลือก Type ของสินค้าให้เหมือนกันทั้งหมด</p>
            </div>

            <div class="flex-1 flex gap-3 items-center overflow-x-auto py-2">
                <div v-for="(item, index) in productDataCompare.slice(0, 4)" :key="index" class="flex-none w-44">
                    <template v-if="item && Object.keys(item).length > 0">
                        <div class="flex flex-col items-center gap-2">
                            <div class="relative w-36 h-36 rounded-md soft-card p-2 flex justify-center items-center">
                                <button class="absolute -top-2 -left-2 bg-white/90 rounded-full p-1 shadow" @click.prevent="deleteProductCompare(item);setChecked(item.Products_id);" aria-label="ลบสินค้า">
                                    <img src="https://img.icons8.com/?size=100&id=7703&format=png&color=6D6E70" class="w-5 h-5" />
                                </button>
                                <div class="w-full h-full flex items-center justify-center">
                                    <img :src="item.image" class="max-h-full object-contain" alt="product image">
                                </div>
                            </div>
                            <div class="text-center text-white">
                                <div class="text-sm font-medium">{{ item.ProductBrand }}</div>
                                <div class="text-sm text-graylight">{{ item.ProductCode }}</div>
                                <div class="text-xs text-graylight">Type: {{ item.type }}</div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="flex flex-col items-center gap-2">
                            <div class="w-36 h-36 flex items-center justify-center rounded-md soft-card text-lg font-semibold text-gray">{{ index + 1 }}</div>
                            <span class="mt-1 text-sm text-graylight text-center">เพิ่มสินค้าที่จะเปรียบเทียบ</span>
                        </div>
                    </template>
                </div>
            </div>

            <div class="w-full sm:w-44 flex flex-col gap-2">
                <nuxt-link to="/products/compare" class="inline-block"><SoftButton>เปรียบเทียบสินค้า</SoftButton></nuxt-link>
                <button @click.prevent="isOpenCompareComponent = false" class="inline-block mt-2"><SoftButton>ยกเลิก</SoftButton></button>
            </div>
        </div>
    </div>
</template>