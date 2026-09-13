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
  <div class="w-[320px] bg-transparent px-6 py-6 font-thai flex flex-col gap-4 border-r border-gray-800">
    <div class="soft-card p-4">
      <span class="font-medium text-topic text-white font-thai">คอลเลกชัน</span>
      <!-- Select type product -->
      <ul class="flex flex-col gap-4 text-detail font-extralight px-2 text-graylight mt-3">
        <li v-for="category in Catagories" :key="category.name">
          <span class="cursor-pointer font-light hover:text-reddeep" @click="">
            {{ category.name }}
          </span>
          <ul v-if="category.subcategories.length" class="mt-2">
            <li v-for="subcategory in category.subcategories" class="flex items-center gap-2">
              <input type="checkbox" :checked="subcategory.checkStatus" @input="toggleCatgorieSelection(subcategory)">
              <span class="ml-1 text-graylight">{{ subcategory.name }}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="w-11/12 border-b border-gray-800 my-4"></div>
      <span class="font-medium text-topic text-white font-thai">แบรนด์สินค้า</span>
      <ul class="flex flex-col text-detail font-extralight px-2 text-graylight mt-3">
        <li class="flex items-center gap-2" v-for="brand in Brand">
          <input type="checkbox" :checked="brand.checkStatus" @input="toggleBrandSelection(brand)" />
          <span class="ml-1 hover:text-reddeep text-graylight">{{ brand.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  border-radius: 0;
  background-color: #fff;
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
}
</style>
