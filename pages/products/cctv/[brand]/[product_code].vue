<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { cartDataStore } from '~/store/cart_store';
const cartStore = cartDataStore()
definePageMeta({
  layout: 'cutsom-product-detail'
});
const route = useRoute()
const runtimeConfig = useRuntimeConfig();
const isLoadindProductData = ref(false)
const fetchCCTVProductData = async () => {
  try {
    const response = await axios.get(`${runtimeConfig.public.apiURL}/products/CCTV/${route.params.brand}/${route.params.product_code}`);
    products.value = response.data
    console.log(response.data);
    isLoadindProductData.value = true;
    return;
  } catch (error) {
    console.error('Error fetching CCTV product data:', error);
    throw error; // ส่ง error กลับไปยัง caller หรือจัดการต่อไป
  }
};
const selectDetail = ref({
  "len":"",
  "Color":""
}) 
const products = ref(
  {
    "Products_id": "",
    "ProductBrand": "Test",
    "ProductCode": "",
    "type": "",
    "price": 0,
    "salePercent": 0,
    "dateSell": "",
    "Keyfeature": "",
    "DataSheetLink": "",
    "Color": [
      {
        "colorname": "",
        "colorHex": ""
      }
    ],
    "len": [
      {
        "lenSize": ""
      }
    ],
    "image": '/Image.png', // Example image
    "images": [],
    "tag": {
      "ICT64": true,
      "Dome": true
    }
  }
);
const quantity = ref(1)
const addItemToCart = (productID: string, quantity: number) => {
  // cartStore.addToCart(productID, 1);
};

onMounted(async () => {
  await fetchCCTVProductData();
})
</script>

<template>
  <div class="flex flex-col w-full items-center">
    <div class="w-full max-w-[1280px] py-8 px-4 flex justify-center items-center">
      <!-- more free and premium Tailwind CSS components at https://tailwinduikit.com/ -->
      <div class="px-4 flex flex-col bg-gray-100 justify-start items-start w-full space-y-9">
        <div class="flex justify-start flex-col items-start space-y-2">
        </div>
        <div
          class="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
          <div
            class="xl:w-3/5 flex flex-col sm:flex-row xl:flex-col justify-center items-center py-7 sm:py-0 xl:py-10 px-10 border border-graylight rounded-[8px]">
            <div>
              <!-- Loading state -->
              <div v-if="isLoadindProductData">
                <div class="carousel w-full">
                  <div v-for="(image, index) in products.images" :key="index" :id="'item' + (index + 1)"
                    class="carousel-item w-full flex justify-center">
                    <img :src="image" class="h-[400px] w-[400px] object-cover object-center p-2 m" />
                  </div>
                </div>
                <div class="flex w-full justify-center gap-4 py-5">
                  <a v-for="(image, index) in products.images" :key="index" :href="'#item' + (index + 1)">
                    <img :src="image"
                      class="h-[120px] w-[120px] object-cover object-center border border-graylight rounded-[4px] p-4" />
                  </a>
                </div>
              </div>
              <!-- Loaded state with skeleton screen -->
              <div v-else class="mt-6 sm:mt-0 xl:my-10 xl:px-20 w-52 sm:w-96 xl:w-auto p-20 skeleton rounded-[0px]">
                <div class="h-[400px] w-[400px]"></div>
              </div>
            </div>
          </div>
          <!-- กล่องขวา -->
          <div class="px-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5 justify-center">
            <div class="flex flex-col gap-4 items-center py-2">
              <h1 v-if="isLoadindProductData" class="leading-normal text-black font-black text-topic w-full">{{
                products.ProductBrand }}</h1>
              <span v-else class="leading-normal w-full skeleton h-[30px] rounded-[0px]">
              </span>
              <h1 v-if="isLoadindProductData" class="leading-normal text-grayblack font-black text-header w-full">{{
                products.ProductCode }}</h1>
              <span v-else class="leading-normal w-full skeleton h-[60px] rounded-[0px]">
              </span>
              <div v-if="isLoadindProductData" class="w-full flex flex-col gap-4">
                <h2 class="text-topic leading-normal text-black font-thai">ราคา {{ products.price }} บาท</h2>
              </div>
              <span v-else class="leading-normal w-full skeleton h-[30px] rounded-[0px]">
              </span>
              <div class="w-full flex flex-col gap-4">
                <span class="font-thai">
                  สีตัวเลือก:
                </span>
                <div v-if="isLoadindProductData" >
                  <button v-for="(color, index) in products.Color" :key="index" class="flex flex-col items-center">
                    <div
                      :style="{ backgroundColor: color.colorHex }"
                      class="w-12 h-12 rounded-full shadow-md border border-graylight">
                    </div>
                    <div class="text-[16px] pt-2 text-center">
                      {{ color.colorname  }}
                    </div>
                  </button>
                </div>
                <span v-else class="leading-normal w-full skeleton h-10 rounded-[0px]">
                </span>
              </div>
              <div class="w-full flex flex-col gap-4">
                <span class="font-thai">
                  เลนส์ตัวเลือก:
                </span>
                <div class="flex gap-4">
                  <button v-for="(len, index) in products.len"
                    class="px-4 h-10 rounded-[8px] bg-graylight shadow text-black font-thai flex justify-center items-center">
                    {{ len.lenSize }}
                  </button>
                </div>
              </div>
              <div class="w-full flex flex-col">
                <div class="flex justify-center">
                  <button @click.prevent="quantity -= 1"
                    class="bg-white rounded-l border text-graydeep hover:bg-graylight active:bg-graylight disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-4" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <div
                    class="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
                    {{ quantity }}
                  </div>
                  <button @click.prevent="quantity += 1"
                    class="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-4" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <button @click.prevent="addItemToCart(products.Products_id, quantity)"
                  class="font-thai py-2 px-4 bg-reddeep text-white rounded hover:bg-black disabled:opacity-50 mt-4 w-full flex items-center justify-center">
                  เพิ่มลงในตะกร้า
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full flex flex-col items-center gap-4">
          <div class="w-full flex justify-between">
            <p class="text-topic font-thai text-reddeep">
              Key Feature
            </p>
          </div>
          <div class="border border-graylight w-full px-4 rounded-[4px] py-2 flex flex-col text-detail"
            style="white-space: pre-line;">
            {{ products.Keyfeature }}
          </div>
          <div>
            <nuxtLink :to="products.DataSheetLink"
              class="px-4 py-2 bg-reddeep text-white flex items-center gap-2 rounded-[4px] font-semibold">
              Datasheet
              <img src="https://img.icons8.com/?size=100&id=2957&format=png&color=ffffff" class="h-[20px]" />
            </nuxtLink>
          </div>
        </div>
        <!-- Relative Product -->
        
      </div>
    </div>
    <!--  -->
  </div>
</template>
