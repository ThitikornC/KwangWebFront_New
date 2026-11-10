<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { dataProductStore } from '~/store/product-store';
import { storeToRefs } from 'pinia';
import { dataComapareProductStore } from '~/store/compare_store';
import SoftButton from '~/components/SoftButton.vue';
import BentoGrid from '~/components/Design/BentoGrid.vue';
const runtimeConfig = useRuntimeConfig();
const { brandFilterValue, FilterValue, sortValue, allProducts, showProductWithFilter } = storeToRefs(dataProductStore());
const { setDefaultCatagoriesAndBand, filterProducts } = dataProductStore()
const { addProductCompare, deleteProductCompare, setDefaultCompare } = dataComapareProductStore()
const showSortDropdown = ref(false);

const fetchCCTVAllProductData = async () => {
    try {
        setDefaultCompare();
        const response = await axios.get(`${runtimeConfig.public.apiURL}/products/all`);
        allProducts.value = response.data
        isLoadingCarddata.value = true;
        filterProducts();
    } catch (error) {
        console.error('Error fetching CCTV product data:', error);
        throw error;
    }
};
const selectSortValue = (item: string) => {
    sortValue.value = item;
    showSortDropdown.value = false;
};
interface ProductInterface {
    ProductBrand: string;
    ProductCode: string;
    Color: string;
    price: number;
    quantity: number;
    image: string;
}
const products = ref<ProductInterface[]>([]);
// เพิ่มสินค้าเข้าตะกร้า
function addProduct(product: any) {
    const existingProduct = products.value.find(p => p.ProductCode === product.ProductCode);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        products.value.push({ ...product, quantity: 1 });
    }
    updateLocalStorage();
}
function updateLocalStorage() {
    const locally = useNuxtApp().$locally;
    locally.setItem('products', JSON.stringify(products.value));
}
//  setting loading skeleton
const isLoadingCarddata = ref(false)
const dropdownOpen = ref(false);
function toggleDropdown() {
    dropdownOpen.value = !dropdownOpen.value;
}
// handler reference kept in module scope so onBeforeUnmount can remove it
let productsUpdatedHandler: (() => void) | null = null;
function onCheckboxChange(event: any, product: any) {
    if (event.target.checked) {
        addProductCompare(product);
    } else if (event.target.checked === false) {
        deleteProductCompare(product)
    }
}
onMounted(async () => {
    await fetchCCTVAllProductData();
    const locally = useNuxtApp().$locally;
    const storedProducts = locally.getItem('products');
    if (storedProducts) {
        products.value = JSON.parse(storedProducts);
    }
    // listen for admin updates
    productsUpdatedHandler = () => { try { filterProducts() } catch (e) { console.warn('products-updated handler error', e) } }
    window.addEventListener('products-updated', productsUpdatedHandler)
});

onBeforeUnmount(() => {
    try {
        if (productsUpdatedHandler) window.removeEventListener('products-updated', productsUpdatedHandler)
    } catch (e) { }
})

</script>

<template>
    <div class="w-full h-full font-thai px-10 py-8 flex flex-col gap-6 page-hero-bg grain-overlay">
        <div class="py-2 w-full flex justify-between">
            <div class="flex flex-row gap-2 text-sm">
                <span v-for="item in brandFilterValue"
                    class="border border-graylight rounded-full px-3 py-2 hover:border-graydeep cursor-pointer font-light">
                    {{ item }}
                </span>
                <span v-for="item in FilterValue"
                    class="border border-graylight rounded-full px-3 py-2 hover:border-graydeep cursor-pointer font-light">
                    {{ item }}
                </span>
                <span class="border border-graylight rounded-full px-3 py-2 hover:border-graydeep cursor-pointer"
                    @click.prevent="FilterValue = []; brandFilterValue = []; setDefaultCatagoriesAndBand(); filterProducts();">
                    ล้างทั้งหมด
                </span>
            </div>
            <div class="relative inline-block text-left">
                <button
                    class="w-[160px] font-thai text-sm border bg-white border-graylight px-3 py-2 rounded-full flex justify-center items-center gap-2 hover:border-reddeep"
                    @click="toggleDropdown">
                    {{ sortValue }}
                    <img src="https://img.icons8.com/?size=100&id=70819&format=png&color=000000" class="w-[14px]" />
                </button>
                <div v-if="dropdownOpen"
                    class="absolute z-20 right-0 mt-2 w-[160px] bg-white border border-reddeep shadow-lg text-sm font-light">
                    <ul>
                        <li @click="selectSortValue('เก่า - ใหม่'); dropdownOpen = false; filterProducts();"
                            class="p-2 hover:bg-reddeep hover:text-white cursor-pointer">
                            เก่า - ใหม่
                        </li>
                        <li @click="selectSortValue('ใหม่ - เก่า'); dropdownOpen = false; filterProducts();"
                            class="p-2 hover:bg-reddeep hover:text-white cursor-pointer">
                            ใหม่ - เก่า
                        </li>
                        <li @click="selectSortValue('ราคาต่ำ - ราคาสูง'); dropdownOpen = false; filterProducts()"
                            class="p-2 hover:bg-reddeep hover:text-white cursor-pointer">
                            ราคาต่ำ - ราคาสูง
                        </li>
                        <li @click="selectSortValue('ราคาสูง - ราคาต่ำ'); dropdownOpen = false; filterProducts()"
                            class="p-2 hover:bg-reddeep hover:text-white cursor-pointer">
                            ราคาสูง - ราคาต่ำ
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- hero + card สินค้า -->
        <div class="w-full pt-6">
            <!-- hero: show first product prominently -->
            <div v-if="showProductWithFilter && showProductWithFilter.length > 0" class="w-full mb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 card-hero p-8 flex flex-col justify-between">
                    <div>
                        <h2 class="display-heading text-4xl text-white">{{ showProductWithFilter[0].ProductBrand }}</h2>
                        <p class="text-graylight mt-2">{{ showProductWithFilter[0].ProductCode }}</p>
                    </div>
                    <div class="flex items-center justify-between pt-6">
                        <div>
                            <div class="text-topic text-white text-2xl">ราคา {{ showProductWithFilter[0].price }} บาท</div>
                        </div>
                        <div>
                            <button class="cta-pill">Get Started</button>
                        </div>
                    </div>
                </div>
                <div class="lg:col-span-1">
                    <div class="soft-card p-4">
                        <img :src="showProductWithFilter[0].image" class="w-full h-48 object-cover rounded-md" />
                        <div class="pt-3">
                            <h4 class="text-topic text-white">Visual Depth</h4>
                            <p class="text-graylight text-sm">มิติความลึกที่ไม่รบกวนสายตา</p>
                        </div>
                    </div>
                </div>
            </div>

            <BentoGrid cols="3" gap="6" class="w-full justify-center">
                <div v-if="isLoadingCarddata === false" class="w-full flex justify-center items-center gap-5">
                    <div class="rounded-md h-10 w-10 border-4 border-t-4 border-reddeep animate-spin"></div>
                    <span class="text-topic ">Loading</span>
                </div>
                <!-- card -->
                <div v-else v-for="(product, index) in showProductWithFilter" :key="index"
                    class="relative group w-[340px] soft-card overflow-hidden max-w-sm cursor-pointer hover:shadow-soft-3d"
                    @mouseenter="product.showCompare = true" @mouseleave="product.showCompare = false">
                    <div class="w-full relative">
                        <img class="w-full h-[280px] p-6 object-contain bg-graylight/40"
                            :src="product.image" alt="Product Image" />
                        <!-- เมื่อ hover ให้มันโผล่ขึ้นมา -->
                        <div v-if="product.showCompare"
                            class="absolute top-2 right-2 flex items-center justify-center gap-2 px-2 py-1">
                            <input type="checkbox"
                                @input="onCheckboxChange($event, product); if (product.checked === true) { product.checked = false } else { product.checked = true };"
                                :checked="product.checked" />
                            <span class="font-light font-thai">เปรียบเทียบ</span>
                        </div>
                        <div class="absolute right-2 bottom-2 gap-2">
                            <!-- <div> สี </div> -->
                            <div v-for="(color, index) in product.Color" :key="index"
                                :style="{ backgroundColor: color.colorHex }"
                                class="w-8 h-8 rounded-full border border-graylight">
                            </div>
                        </div>

                    </div>
                        <div class="py-3 px-4 flex flex-col gap-1">
                        <h3 class="text-topic display-heading text-black">{{ product.ProductBrand }}</h3>
                        <h3 class="text-lg font-normal text-black">{{ product.ProductCode }}</h3>
                        <div class="flex gap-2">
                            <span class="font-thai text-detail text-black">ราคา {{ product.price }} บาท</span>
                        </div>
                        <div class="w-full flex items-center justify-between pt-2">
                            <div class="w-[160px]">
                                <SoftButton>
                                  <nuxt-link class="w-full block text-center" :to="`/products/${product.type}/${product.ProductBrand}/${product.ProductCode}`">ดูรายละเอียด</nuxt-link>
                                </SoftButton>
                            </div>
                            <div class="w-[160px]">
                                <SoftButton @click.prevent="addProduct(product)">เพิ่มลงตะกร้า</SoftButton>
                            </div>
                        </div>
                    </div>
                </div>
                
                </BentoGrid>
        </div>
    </div>
    <!-- Preview before compare product and push data to stage -->
    <ShopPreviewCompare />
</template>

<style scoped>
.line-through-italic {
    position: relative;
    display: inline-block;
}

.line-through-italic::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 1px;
    background-color: #7F181B;
    transform: rotate(-15deg);
    /* ปรับค่า degree ตามที่ต้องการ */
}

input[type="checkbox"] {
    -webkit-appearance: none;
    /* ลบสไตล์เริ่มต้นของ browser */
    -moz-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border: 1px solid #000;
    /* ขอบสีดำ */
    border-radius: 0;
    /* ทำให้ไม่มีมุมโค้ง */
    background-color: #fff;
    /* พื้นหลังสีขาว */
    cursor: pointer;
    position: relative;
}

input[type="checkbox"]:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 10px;
    border: solid #000;
    border-width: 0 2px 2px 0;
    transform: translate(-50%, -50%) rotate(45deg);
    /* จัดให้อยู่ตรงกลางและหมุนเพื่อสร้างเครื่องหมายเช็กถูก */
}
</style>
