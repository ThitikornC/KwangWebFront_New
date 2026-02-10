<script setup>
</script>
<template>
    <div class="font-inter">
        <lineContact/>
        <backtotop/>
        <div class="">
            <AppHeaderProduct/>
            <slot></slot>
            <!-- <ShopRelatedProduct/> -->
        </div>
        <div class="border-t border-graylight">
            <AppFooterProduct/>
        </div>
    </div>
</template>