<script setup lang="ts">
definePageMeta({
  layout: 'cutsom-product-detail'
});
const number = ref(0);
const handleNumberplus = () =>{
  number.value = number.value +1
}
</script>
<template>
    <div class="flex flex-col items-center justify-center">
      <h1 class="text-[60px] font-thai text-reddeep">สวัสดีครับกัส</h1>
      <h1 class="text-[40px] font-thai"> {{  number }} </h1>
      <button class="btn" @click.prevent="handleNumberplus()">กด +1 </button>
    </div>
</template>
