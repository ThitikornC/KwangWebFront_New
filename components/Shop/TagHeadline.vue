<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()

</script>
<template>
    <div class="w-full py-3 flex justify-center font-inter bg-white border-b border-graylight">
        <div class="w-full max-w-[1280px] flex justify-between text-white text-detail">
            <div class="text-black">
                <span v-if="$route.params.brand">{{ $route.params.brand }}</span>
                <span v-if="$route.params.product_code"> / {{ $route.params.product_code }}</span>
            </div>
        </div>
    </div>
</template>