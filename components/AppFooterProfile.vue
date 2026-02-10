<template>
    <div class="w-full bg-white flex flex-col items-center pt-12">
        <div class="w-[100px] h-[5px] bg-reddeep rounded-full"></div>
    </div>
    <footer class="z-10 relative flex flex-col space-y-10 justify-center p-12">
        <nav class="flex justify-center flex-wrap gap-6 text-graydeep font-medium">
            <a class="hover:text-black" href="/home">Home</a>
            <!-- <a class="hover:text-black" href="#">About</a>
            <a class="hover:text-black" href="#">Services</a>
            <a class="hover:text-black" href="#">Media</a> -->
            <a class="hover:text-black" href="/solutions">Solutions</a>
            <a class="hover:text-black" href="/products">Shop</a>
        </nav>
        <div class=" flex justify-center space-x-5">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="w-[30px]">
                <img src="https://img.icons8.com/?size=100&id=21746&format=png&color=000000" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
            </a>
            <a href="https://messenger.com" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/fluent/30/000000/twitter.png" />
            </a>
        </div>
        <p class="text-center text-graydeep font-medium">&copy; 2024 Kwang Unlimit Company Ltd. All rights reservered.
        </p>
        <!-- <p class="text-center text-graydeep font-medium font-thai gap-2">
            <nuxtLink to="">นโยบายรักษาข้อมูลส่วนบุคคล</nuxtLink>
            <nuxtLink to=""> นโยบายรักษาข้อมูลส่วนบุคคล</nuxtLink>
        </p> -->
        <div class="absolute bottom-0 left-0 h-[200px] w-full border-b"
            style="background-image: linear-gradient(to right top, rgba(255, 215, 0, 0.2) 0%, transparent 50%, transparent 100%); border-color: rgba(255, 215, 0, 0.2);">
        </div>
        <div class="absolute bottom-0 right-0 h-[200px] w-full"
            style="background-image: linear-gradient(to left top, rgba(220, 38, 38, 0.2) 0%, transparent 50%, transparent 100%); border-color: rgba(255, 215, 0, 0.2);">
        </div>
    </footer>
</template>