<script setup>
</script>
<template>
    <div class="font-inter w-full">
        <AppHeaderProfile/>
        <div class="w-screen">
            <backtotop/>
        <lineContact/>
        </div>
        <div class="w-screen overflow-hidden">
            <slot></slot>
        </div>
        <!-- <AppFooterProfile/>-->
    </div>
</template>