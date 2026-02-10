<script setup lang="ts">
definePageMeta({
    layout: 'custom-product'
})
</script>
<template>
        <ShopBanner/>
        <div class="w-full h-full flex flex-col">
            <div class="flex w-full ">
                <ShopLeftMenu/>
                <ShopMainProduct/>
            </div>
        </div>
</template>