<script setup lang="ts">
import { onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';
onMounted(() => {
    AOS.init();
});
</script>
<template>
    <div class="w-full flex flex-col items-center font-inter pb-[clamp(2rem,4vw,3.5rem)]">
        <!-- sension mission -->
       

        <div class="w-full mt-[clamp(1.5rem,3vw,2rem)]">
            <!-- animation slide up -->
            <section id="features" class="relative block px-[clamp(1rem,3vw,1.5rem)] py-[clamp(1rem,2vw,1.5rem)]">
              <!--  <div aria-hidden="true"
                    class="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40">
                    <div class="blur-[106px] h-56 bg-gradient-to-br to-bluelight from-bluesky"></div>
                    <div class="blur-[106px] h-32 bg-gradient-to-r from-yellowold to-redlight"></div>
                </div>
                -->
                <div class="neon-btn relative mx-auto max-w-[min(80rem,90vw)] text-center">
                    <span
                        class="my-[clamp(0.75rem,2vw,0.75rem)] flex flex-col sm:flex-row sm:items-center sm:justify-center tracking-wider text-[clamp(1.5rem,3vw,2.5rem)] gap-[clamp(0.5rem,1vw,0.5rem)]">
                        <!-- <span class="font-medium">What is</span> -->
                        <span class="font-bold text-black">MISSION</span>
                    </span>
                    <h2 class="block font-thai text-black text-[clamp(1.25rem,2.5vw,1.875rem)]">
                        ภารกิจ
                    </h2>
                </div>
                <div
                    class="relative mx-auto max-w-[min(88rem,95vw)] z-10 grid grid-cols-1 gap-[clamp(1.5rem,3vw,2.5rem)] pt-[clamp(2rem,4vw,3.5rem)] sm:grid-cols-2 lg:grid-cols-3">
<div class="neon-btn rounded-md p-[clamp(1.5rem,3vw,2rem)] shadow flex flex-col justify-center items-center text-center h-[clamp(14rem,20vw,16rem)]" 
     data-aos="fade-up" data-aos-duration="1000">

   <h3 class="mt-[clamp(1rem,2vw,1.5rem)] text-black font-bold text-[clamp(1rem,2vw,1.25rem)]">TECHNICAL REPRESENTATIVE</h3>
    
    <p class="mt-[clamp(0.75rem,1.5vw,1rem)] font-normal leading-relaxed tracking-wide text-black font-thai text-[clamp(0.875rem,1.5vw,1rem)]">
        ตัวแทนด้านเทคนิคที่นำเสนอข้อมูลเชิงเทคนิคให้เข้าใจง่ายและน่าสนใจสำหรับทุกกลุ่มผู้ฟัง
    </p>

</div>

                     <div class="neon-btn rounded-md p-[clamp(1.5rem,3vw,2rem)] shadow flex flex-col justify-center items-center text-center h-[clamp(14rem,20vw,16rem)]" 
     data-aos="fade-up" data-aos-duration="1000">    
                        <h3 class="mt-[clamp(1rem,2vw,1.5rem)] text-black font-bold text-[clamp(1rem,2vw,1.25rem)]">ADAPT, AND TEST</h3>
    <p class="mt-[clamp(0.75rem,1.5vw,1rem)] font-normal leading-relaxed tracking-wide text-black font-thai text-[clamp(0.875rem,1.5vw,1rem)]">
                           ปรับตัว และทดสอบ โดยยึดความพึงพอใจของลูกค้าเป็นหลัก
                        </p>
                    </div>


  <div class="neon-btn rounded-md p-[clamp(1.5rem,3vw,2rem)] shadow flex flex-col justify-center items-center text-center h-[clamp(14rem,20vw,16rem)] gap-[clamp(0.5rem,1vw,0.5rem)]"
     data-aos="fade-up" data-aos-duration="1000">

    <h3 class="text-black font-bold text-[clamp(1rem,2vw,1.25rem)]">
        FOCUS ON CONTINUOUSLY IMPROVING BUSINESS COMPETITIVENESS
    </h3>

    <p class="font-normal leading-relaxed tracking-wide text-black font-thai text-[clamp(0.875rem,1.5vw,1rem)]">
        วางแผน ปรับเปลียน ทดสอบ โดยยึดความพึงพอใจของผู้บริโภคเป็นหลัก
    </p>

</div>

                </div>
            </section>
            <section class="mt-[clamp(1rem,2vw,1rem)] relative block px-[clamp(1rem,3vw,1.5rem)] py-[clamp(1rem,2vw,1.5rem)]">
                <!-- ตกแต่ง -->
<div class="neon-btn relative mx-auto max-w-[min(80rem,90vw)] text-center border-2 p-[clamp(1.5rem,3vw,2.5rem)] rounded flex flex-col justify-center items-center gap-[clamp(1rem,2vw,1.5rem)] mt-[clamp(1rem,2vw,1.25rem)]">

    <!-- Label / Title -->
    <h3 class="text-black font-bold text-[clamp(1rem,2vw,1.25rem)]">
        IMPACT PARTNER
    </h3>

    <!-- Description -->
    <p class="font-normal leading-relaxed tracking-wide text-black font-thai text-[clamp(0.875rem,1.5vw,1rem)]">
        ความร่วมมือในการออกแบบแผนการ ดำเนินการ
        ตั้งแต่เริ่มต้นโดยเฉพาะโครงการดิจิทัลให้บรรลุเป้าหมายระยะยาวกับผู้ที่เกี่ยวข้อง
    </p>
    
</div>


            </section>
        </div>
    </div>
</template>
<style scoped>
/* ซ่อน scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.neon-btn {
  background: linear-gradient(180deg, #f8f6f0 0%, #fffef8 45%, #fff8e8 55%, #f5f0e5 100%);
  color: #000000;
  border: 6px solid #74640a;
border-radius: 10px; /* ทำเป็นวงรี/วงกลมเต็มสำหรับปุ่มสั้น */
  box-shadow:
  0 0 15px rgba(255, 248, 220, 0.5),
  0 0 25px rgba(255, 240, 180, 0.4),
  0 0px 20px rgba(199, 174, 103, 0.8),
  0 0px 20px rgba(204, 161, 69, 0.6),
  inset 0 0 30px rgba(255, 210, 120, 0.9),
  inset 0 0 10px rgba(255, 230, 160, 0.8),
  inset 0 0 50px rgba(255, 240, 200, 0.705),
  inset 0 0 90px rgba(255, 252, 240, 1),
  1px 1px 0 #000,
  -8px 6px  #3b3305,
  0 0 20px rgba(255,230,160,0.55);
  font-weight: 700;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 1px 1px 0 #000, -8px 6px  #3b3305, 0 0 20px rgba(255,230,160,0.55);

  position: relative;
  padding: 16px 40px;
  transform: translateZ(0);
  transition: all 0.3s ease;
}


</style>