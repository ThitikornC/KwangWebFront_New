<script setup lang="ts">
import { ref } from 'vue';
import { dataProductStore } from '~/store/product-store';
import { storeToRefs } from 'pinia';
const { Catagories, Brand, FilterValue, brandFilterValue } = storeToRefs(dataProductStore())
const { filterProducts } = dataProductStore()
const toggleBrandSelection = (brand: { name: string; checkStatus: boolean }) => {
  brand.checkStatus = !brand.checkStatus;
  if (brand.checkStatus) {
    brandFilterValue.value.push(brand.name);
  } else {
    const index = brandFilterValue.value.indexOf(brand.name);
    if (index > -1) {
      brandFilterValue.value.splice(index, 1);
    }
  }
  filterProducts();
};
const toggleCatgorieSelection = (category: { name: string; checkStatus: boolean }) => {
  category.checkStatus = !category.checkStatus;
  if (category.checkStatus) {
    FilterValue.value.push(category.name);
  } else {
    const index = FilterValue.value.indexOf(category.name);
    if (index > -1) {
      FilterValue.value.splice(index, 1);
    }
  }
  filterProducts();
};
</script>

<template>
  <div class="w-[320px] bg-white px-6 py-6 font-thai flex flex-col gap-4 border-r border-graylight">
    <span class="font-medium text-topic text-blackdeep font-thai">คอลเลกชัน</span>
    <!-- Select type product -->
    <ul class="flex flex-col gap-4 text-detail font-extralight px-2 text-black">
      <li v-for="category in Catagories" :key="category.name">
        <span class="cursor-pointer font-light" @click="">
          {{ category.name }}
        </span>
        <ul v-if="category.subcategories.length" class="mt-2">
          <li v-for="subcategory in category.subcategories" class="flex items-center gap-2">
            <input type="checkbox" :checked="subcategory.checkStatus" @input="toggleCatgorieSelection(subcategory)">
            <span>{{ subcategory.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="w-11/12 border-b border-graylight"></div>
    <span class="font-medium text-topic text-blackdeep font-thai">แบรนด์สินค้า</span>
    <ul class="flex flex-col text-detail font-extralight px-2 text-black">
      <li class="flex items-center gap-2" v-for="brand in Brand">
        <input type="checkbox" :checked="brand.checkStatus" @input="toggleBrandSelection(brand)" />
        <span>{{ brand.name }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
input[type="checkbox"] {
  -webkit-appearance: none;
  /* ลบสไตล์ default ของ browser */
  -moz-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid #D7D7D8;
  /* ขอบสีดำ */
  border-radius: 0;
  /* ทำให้ไม่มีความโค้ง */
  background-color: #fff;
  /* พื้นหลังสีขาว */
  cursor: pointer;
  position: relative;
}
input[type="checkbox"]:checked {
  background-color: #7F181B;
  /* พื้นหลังสีดำเมื่อถูกเลือก */
}
input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 9px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: translate(-50%, -50%) rotate(45deg);
  /* สร้างเครื่องหมายลูกศร */
}
</style>
