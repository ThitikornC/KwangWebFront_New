<template>

</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
const visible = ref(false);
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

const toggleVisibility = () => {

    visible.value = window.scrollY > 200;
};

onMounted(() => {
    window.addEventListener("scroll", toggleVisibility);
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", toggleVisibility);
});
</script>

<script>
export default {
    setup() {
        return {
            visible,
            scrollToTop,
            toggleVisibility
        };
    }
};
</script>
<style scoped>
.back-to-top-wrapper[v-show="true"] {
    display: block;
}
.back-to-top-wrapper:hover .button-img {
    filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(100%) hue-rotate(90deg);
}
</style>
