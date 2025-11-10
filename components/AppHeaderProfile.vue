<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { onMounted, onBeforeUnmount } from 'vue';
const router = useRouter();
const currentHoverIndex = ref<number | null>(null);
const selectedMenuIndex = ref<number | null>(null);
const toggleMenu = ref(false);
const menuItems = [
  { name: 'Home', link: '/home#home' },
  { name: 'Value Proposition', link: '/valueProposition' },
  { name: 'Process', link: '/process' },
  { name: 'Partner', link: '/partner' },
  { name: 'Contact', link: '/contact' },
  {
    name: 'Product',
    link: '/product',
    subMenu: [
      { name: 'audiovisual', link: '/product/audiovisual' },
      { name: 'smartcity', link: '/product/smartcity' },
      
    ]
  },
];

const handleSubMenuClick = (sub: { name: string; link: string }) => {
  dropdownIndex.value = null;

  if (sub.name === 'audiovisual') {
    window.open('https://drive.google.com/file/d/1_JdHWtFznrXJOVUqBwBgVWMXm5Bo064i/view?usp=sharing', '_blank');
  } else if (sub.name === 'smartcity') {
    window.open('https://drive.google.com/file/d/1kcMEvh7DcNaCLB6_UZut3jkPFV9LgaJi/view?usp=sharing', '_blank');
  } else {
    router.push(sub.link);
  }
};



const dropdownIndex = ref<number | null>(null);

// toggle dropdown
const toggleDropdown = (index: number) => {
  dropdownIndex.value = dropdownIndex.value === index ? null : index;
};

// click outside to close
const handleClickOutside = (event: MouseEvent) => {
  const dropdowns = document.querySelectorAll('.dropdown-container');
  const clickedInside = Array.from(dropdowns).some((el) => el.contains(event.target as Node));
  if (!clickedInside) dropdownIndex.value = null;
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const setHoverIndex = (index: number | null) => {
  currentHoverIndex.value = index;
};
const setSelectedMenuIndex = (index: number) => {
  selectedMenuIndex.value = index;
  if (menuItems[index].link.startsWith('#')) {
    scrollToSection(menuItems[index].link);
  } else {
    router.push(menuItems[index].link);
  }
};
const scrollToSection = (link: string) => {
  const section = link.substring(1); // Remove the '#' character
  const element = document.getElementById(section);
  if (element) {
    setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
};
</script>
<template>
  <header class="bg-white px-4 mx-auto max-w-7xl sm:px-6 font-inter">
    <div class="relative pt-6 pb-8">
      <nav class="relative flex items-center justify-between sm:h-10 md:justify-center">
        <div class="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
          <div class="flex items-center justify-between w-full md:w-auto">
            <div class="">
              <nuxt-link to="/"><img src="/kwang_logo2.png" class="w-[100px] mt-1" /></nuxt-link>
            </div>
    
          </div>
        </div>
      </nav>
    </div>
  </header>
  <header v-if="toggleMenu">
    <div class="fixed z-[1000] bg-reddeep top-0 right-0 bottom-0 h-full w-4/6 slide-up shadow-lg p-4 flex flex-col items-center">
      <button class="btn bg-graydeep text-white" @click.prevent="toggleMenu = !toggleMenu;">ปิด</button>
      <ul class="flex flex-col gap-4">
        <li v-for="(item, index) in menuItems" class="text-white" @click.prevent="setSelectedMenuIndex(index)">
          {{ item.name }}
        </li>
      </ul>
     
    </div>
  </header>

</template>
<style scoped>
@keyframes slideUp {
  0% {
    transform: translateX(20%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-up {
  animation: slideUp 0.5s ease-in;
}

/* Ensure no hover breaks */
.dropdown-container {
  position: relative;
}

</style>