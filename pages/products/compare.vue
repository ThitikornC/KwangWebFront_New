<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { dataComapareProductStore } from '~/store/compare_store';
const { productDataCompare,catagoriesTypeCompare } = storeToRefs(dataComapareProductStore());
const data1 =  ref()
definePageMeta({
    layout: 'custom-product'
})
const test = () =>{
    console.log(catagoriesTypeCompare.value)
}
onMounted(() => {
    test()
})
</script>
<template>
    <div class="w-full flex flex-col items-center py-10">
        <h1 class="font-thai text-topic">เปรียบเทียบสินค้าของคุณที่นี่</h1>
        <div class="w-full flex flex-row">
            <button class="bg-white px-3 py-2 border">เพิ่มสินค้า</button>
        </div>
        <div class="w-full flex flex-row border-y border-graylight">
            <div class="w-full flex-1 flex flex-col items-center justify-center">
                <!-- Content here -->
                <div class="w-[250px] text-topic h-[200px] flex flex-col justify-center">
                    <span class="font-thai">
                        เปรียบเทียบผลิตภัณฑ์สูงสุด 4 รายการ
                    </span>
                    <div class="w-full flex flex-col justify-center px-2">
                        <label for="type"
                            class="block text-detail text-gray-600 w-full font-thai font-light">ประเภทของสินค้า</label>
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
                </div>
                <div class="w-full flex flex-col">
                    <div class="border-t border-graylight px-4 py-2 flex justify-center">
                        Brand
                    </div>
                    <div class="border-t border-graylight px-4 py-2 flex justify-center">
                        Product Code
                    </div>
                    <div class="border-t border-graylight px-4 py-6 flex justify-center">
                        Color
                    </div>
                </div>
            </div>
            <div class="border-l border-graylight flex-1 flex flex-col items-center justify-center ">
                <!-- Content here -->
                <div class="h-[200px] flex flex-col justify-center">
                    <button class="w-[120px] h-[120px] border border-graylight rounded-[8px] hover:border-graydeep">
                        <img :src="productDataCompare[0]?.image" class="w-full rounded-[8px]"/>
                    </button>
                </div>
                <div class="w-full flex flex-col">
                    <div class="border-t border-graylight px-4 py-2 flex justify-center">
                        {{productDataCompare[0]?.ProductBrand}}
                    </div>
                    <div class="border-t border-graylight px-4 py-2 flex justify-center">
                        {{productDataCompare[0]?.ProductCode}}
                    </div>
                    <div class="border-t border-graylight px-4 py-4 flex justify-center">
                        <div class="w-10 h-10 border rounded-full">

                        </div>
                    </div>
                </div>
            </div>
            <div class="border-l border-graylight flex-1">
                <!-- Content here -->
            </div>
            <div class="border-l border-graylight flex-1">
                <!-- Content here -->
            </div>
            <div class="border-l border-graylight flex-1">
                <!-- Content here -->
            </div>
        </div>
    </div>
</template>