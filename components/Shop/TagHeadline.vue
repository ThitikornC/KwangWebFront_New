<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()

</script>
<template>
    <div class="w-full py-3 flex justify-center font-inter bg-white border-b border-graylight">
        <div class="w-full max-w-[1280px] flex items-center justify-between text-detail">
            <div class="text-black text-lg font-medium">
                <span v-if="$route.params.brand">{{ $route.params.brand }}</span>
                <span v-if="$route.params.product_code" class="text-gray-600"> / {{ $route.params.product_code }}</span>
            </div>
            <div class="text-sm text-gray-600">
                <!-- space for breadcrumb or actions -->
            </div>
        </div>
    </div>
</template>