<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
definePageMeta({
    layout: 'custom-product'
})
const phone = ref('');
const totalPrice = ref('')
watch(phone, (newValue, oldValue) => {
    let value = newValue.replace(/\D/g, '');
    if (value.length > 3 && value.length <= 7) {
        value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    } else if (value.length > 7) {
        value = value.replace(/(\d{3})(\d{4})(\d{1,})/, '$1-$2-$3');
    }
    phone.value = value;
});
interface Color {
    colorHex: string;
    colorname: string;
}

interface ProductInterface {
    ProductBrand: string;
    ProductCode: string;
    Color: Color[];
    price: number;
    quantity: number;
    image: string;
}
const products = ref<ProductInterface[]>([]);
function increaseQuantity(product: any) {
    product.quantity++;
    updateLocalStorage();
}
function decreaseQuantity(product: any) {
    if (product.quantity > 1) {
        product.quantity--;
        updateLocalStorage();
    }
}
// เพิ่มสินค้าเข้าตะกร้า
function addProduct(product: ProductInterface) {
    const existingProduct = products.value.find(p => p.ProductCode === product.ProductCode);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        products.value.push({ ...product, quantity: 1 });
    }
    updateLocalStorage();
}

// ลบสินค้าออกจากตะกร้า
function removeProduct(productCode: string) {
    products.value = products.value.filter(p => p.ProductCode !== productCode);
    updateLocalStorage();
}
function clearCart() {
    products.value = [];
    const locally = useNuxtApp().$locally;
    locally.setItem('products', JSON.stringify([])); // เคลียร์ localStorage
}
function updateLocalStorage() {
    const locally = useNuxtApp().$locally;
    locally.setItem('products', JSON.stringify(products.value));
}
// ดึงข้อมูลจาก localStorage
onMounted(() => {
    const locally = useNuxtApp().$locally;
    const storedProducts = locally.getItem('products');
    if (storedProducts) {
        products.value = JSON.parse(storedProducts);
    }
});
</script>
<template>
    <div class=" w-full grid lg:grid-cols-2 lg:px-20">
        <!-- bill -->
        <div class="py-14 w-full flex flex-col items-center px-10">
            <h2 class="w-full font-thai text-topic font-medium text-reddeep text-center">ตะกร้าสินค้าของคุณ</h2>
            <div v-for="(product, index) in products" :key="index"
                class="w-full mt-4 flex flex-row justify-center py-4 border-b border-graylight">
                <div class="flex flex-col gap-2">
                    <div class="w-28 h-20">
                        <img :src="product.image" class="w-20 h-20 border border-graylight p-2" />
                    </div>
                    <div class="w-fit h-fit border border-graylight">
                        <button class="w-7 p-1" @click="decreaseQuantity(product)">
                            -
                        </button>
                        <span class="w-7 text-sm p-1">{{ product.quantity }}</span>
                        <button class="w-7 p-1" @click="increaseQuantity(product)">
                            +
                        </button>
                    </div>
                </div>
                <div class="w-full font-thai font-light flex flex-col justify-center">
                    <p>แบรนด์ : {{ product.ProductBrand }}</p>
                    <p>รหัสสินค้า : {{ product.ProductCode }}</p>
                    <p>สี : {{ product.Color[0].colorname}}</p>
                    <p>ราคา : {{ product.price }}</p>
                </div>
                <div class="w-full flex flex-col gap-1">
                    <span class="font-thai font-light">หมายเหตุ</span>
                    <textarea
                        class="h-full border border-graylight text-sm focus:border-redlight outline-none px-2 py-2 font-thai font-light"
                        rows="3" placeholder="กรุณารายละเอียดเพิ่มเติมของสินค้า"></textarea>
                </div>
                <button class="px-4" @click.prevent="removeProduct(product.ProductCode)">
                    <div class="w-4">
                        <img src="https://img.icons8.com/?size=100&id=11705&format=png&color=6D6E70" class="w-4" />
                    </div>
                </button>
            </div>
            <button type="button" class="px-4 py-3 font-light text-reddeep font-thai underline" @click="clearCart">
                เคลียร์ทั้งหมด
            </button>
        </div>
        <form class="py-14 px-10 w-full lg:px-20 font-thai flex flex-col">
            <h2 class="w-full font-thai text-topic font-medium text-reddeep text-center">รายละเอียดใบสั่งซื้อ</h2>
            <div class="mt-4 flex flex-col gap-1">
                <label class="text-base mb-2 font-light">ชื่อผู้ซื้อ</label>
                <input type="text" placeholder="กรุณาใส่ชื่อ - นามสกุลของคุณ"
                    class="px-4 py-3 bg-transparent w-full text-sm font-light border border-graylight focus:border-redlight outline-none" />
                <label class="text-base mb-2 font-light">เบอร์ติดต่อ</label>
                <div class="flex bg-transparent">
                    <input type="tel" id="phone" v-model="phone" placeholder="กรุณาใส่เบอร์โทรศัพท์"
                        class="px-4 py-3 bg-white w-full text-sm font-light outline-none border border-graylight focus:border-redlight" />
                </div>
                <label class="text-base mb-2 font-light">ที่อยู่สำหรับจัดส่ง</label>
                <textarea
                    class="w-full px-3 py-3 text-sm font-light outline-none border border-graylight focus:border-redlight"
                    id="w3review" rows="4" cols="50" placeholder="กรุณากรอกที่อยู่จริง"></textarea>
                <ul class="text-black mt-4 space-y-4 font-thai font-light">
                    <li class="flex flex-wrap gap-4 ">ราคารวม <span class="ml-auto font-inter">0.00</span>
                    </li>
                    <li class="flex flex-wrap gap-4">ภาษี 7% <span class="ml-auto font-inter">0.00</span>
                    </li>
                    <hr class="border-gray-300" />
                    <li class="flex flex-wrap gap-4">Total <span class="ml-auto font-inter">0.00</span>
                    </li>
                </ul>
                <button type="button"
                    class="mt-8 text-sm px-4 py-3 w-full font-light tracking-wide bg-bluedeep text-white font-thai">
                    จัดทำใบสั่งซื้อ
                </button>
            </div>
        </form>
    </div>
</template>
