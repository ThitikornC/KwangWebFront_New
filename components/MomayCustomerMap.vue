<!--
  แผนที่ลูกค้า MOMAY — แผ่นประเทศไทยลอยเอียงพร้อมหมุดจังหวัด

  แยกออกมาเป็นคอมโพเนนต์เพราะมีสองหน้าที่ต้องใช้ (/home2 กับ MomayforSaleV2)
  ถ้าก๊อบโค้ดไปวางสองที่ วันหลังเพิ่มลูกค้าใหม่หนึ่งรายจะต้องไล่แก้สองแห่ง
  แล้วสุดท้ายจะลืมแก้ที่หนึ่ง กลายเป็นสองหน้าบอกจำนวนลูกค้าไม่ตรงกัน

  เปิดด้วย :open แล้วฟัง @close — ตัวคอมโพเนนต์ไม่ถือสถานะเปิด/ปิดเอง
  หน้าที่เรียกใช้จึงคุมได้ว่าจะเปิดจากปุ่มไหนหรือจาก #map
-->
<template>
  <Transition name="mapfx">
    <div v-if="open" class="lightbox lightbox--map" @click="$emit('close')">
      <div class="mapcard">
        <div class="mapcard__stage">
          <div class="thscene">
            <div class="thplane">
              <!-- ความหนาของแผ่นแผนที่ -->
              <svg v-for="n in 9" :key="`d${n}`" class="thmap thmap--depth" viewBox="0 0 400 760"
                   :style="{ '--n': n }" aria-hidden="true">
                <path :d="TH_PATH" fill="#3a0710" stroke="#5d0b18" stroke-width="2" stroke-linejoin="round" />
              </svg>

              <!-- ผิวบน -->
              <svg class="thmap thmap--top" viewBox="0 0 400 760" aria-hidden="true">
                <defs>
                  <linearGradient id="thFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#ED1B2E" stop-opacity="0.2" />
                    <stop offset="100%" stop-color="#ED1B2E" stop-opacity="0.05" />
                  </linearGradient>
                </defs>
                <path ref="mapPath" class="thmap__shape" :d="TH_PATH" fill="url(#thFill)" stroke="#ED1B2E"
                      stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
              </svg>

              <!-- หมุดลูกค้า ตั้งขึ้นจากผิวแผนที่ -->
              <button v-for="(c, i) in customerPins" :key="c.province" type="button" class="thpin"
                      :class="{ 'is-active': activePin === i }"
                      :style="{ left: `${(c.x / 400) * 100}%`, top: `${(c.y / 760) * 100}%`, '--d': `${i * 0.4}s`, '--in': `${1.9 + (c.y / 760) * 1.1}s`, '--liftn': c.lift ?? 74 }"
                      @mouseenter="activePin = i" @focus="activePin = i" @click.stop="activePin = i">
                <span class="thpin__spot" />
                <span class="thpin__beam" />
                <span class="thpin__flag font-thai">
                  <b>{{ c.province }}</b>
                  <small v-if="c.org">{{ c.org }}</small>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({ open: { type: Boolean, default: false } })
defineEmits(['close'])

const activePin = ref(0)
const mapPath = ref(null)

// วัดความยาวเส้นขอบจริงก่อน แล้วค่อยปล่อยให้เส้นวิ่งวาดทีละส่วน
watch(() => props.open, async (open) => {
  if (!open) return
  await nextTick()
  const el = mapPath.value
  if (!el) return
  el.style.setProperty('--len', el.getTotalLength())
  el.classList.add('is-drawing')
})

// เส้นขอบประเทศไทยแบบลายเส้น (วาดโดยประมาณให้พอจำรูปทรงได้ ไม่ใช่แผนที่เชิงพิกัด)
const TH_PATH = 'M253.2 452.6 L252.4 457.7 L249.6 455.6 L250.3 453.0 L251.4 451.8 L253.2 452.6 Z M244.5 437.2 L244.6 438.3 L242.1 437.4 L241.2 437.9 L238.4 437.6 L237.1 430.7 L237.3 429.1 L239.3 429.6 L242.1 433.0 L243.6 435.4 L244.5 437.2 Z M50.1 638.0 L49.6 641.6 L47.6 641.5 L45.6 643.8 L44.6 644.1 L43.0 636.8 L44.9 626.5 L45.9 625.0 L47.3 627.8 L51.3 629.0 L49.6 634.9 L50.1 638.0 Z M133.0 17.2 L132.6 20.3 L133.8 20.9 L135.5 19.5 L137.6 16.0 L139.9 14.1 L142.4 13.7 L145.1 16.0 L147.9 21.1 L150.8 24.1 L152.2 24.4 L153.2 26.7 L153.3 29.0 L152.0 33.7 L149.6 39.3 L146.3 46.1 L147.4 51.8 L151.9 56.5 L157.3 59.3 L163.1 58.5 L166.1 57.1 L168.6 54.9 L170.9 53.8 L173.8 53.6 L182.9 55.2 L185.7 56.8 L186.1 59.9 L185.0 68.1 L186.4 74.0 L189.0 80.3 L189.3 86.0 L186.1 95.5 L183.5 104.4 L180.6 108.7 L178.4 111.5 L177.7 113.4 L177.9 115.2 L179.9 117.8 L182.1 121.3 L182.6 124.6 L182.4 128.6 L180.9 134.2 L175.4 146.2 L171.0 157.0 L173.3 159.2 L177.7 160.8 L180.5 162.3 L183.5 161.3 L189.9 155.0 L195.5 150.2 L202.3 145.4 L202.7 145.0 L208.7 141.5 L211.5 138.3 L212.9 134.2 L215.1 132.6 L217.8 133.5 L221.3 131.8 L225.5 127.3 L228.7 125.2 L231.0 125.5 L235.0 128.3 L240.9 133.6 L246.0 136.7 L250.6 137.7 L252.8 139.6 L252.7 142.5 L253.7 144.4 L255.8 145.2 L256.7 144.8 L256.5 143.4 L258.6 141.4 L262.9 138.7 L267.3 137.1 L271.8 136.6 L274.7 134.4 L276.6 128.9 L279.4 124.6 L281.9 122.7 L284.9 121.7 L285.7 120.4 L284.3 118.6 L284.4 116.9 L286.2 115.1 L290.0 114.3 L295.8 114.6 L302.7 116.4 L310.5 119.8 L315.7 120.9 L318.2 119.7 L323.0 124.9 L330.1 136.5 L336.2 145.3 L341.3 151.2 L346.7 155.8 L352.3 158.9 L356.4 163.2 L360.1 171.4 L357.3 182.7 L356.6 192.5 L356.9 204.4 L360.2 213.6 L366.6 220.0 L370.2 225.1 L371.3 229.0 L376.2 232.4 L385.0 235.2 L388.6 237.7 L387.2 240.0 L387.0 242.6 L388.3 245.7 L391.3 248.1 L396.2 250.1 L399.1 252.2 L400.0 254.4 L399.9 257.9 L398.8 262.8 L396.7 266.6 L393.8 269.2 L393.5 271.3 L392.7 274.4 L392.7 280.9 L394.8 285.2 L395.4 290.7 L394.3 295.2 L393.2 304.3 L393.0 307.8 L392.0 310.8 L389.4 313.7 L385.5 316.5 L380.8 318.9 L377.9 320.0 L377.2 320.5 L375.1 323.3 L372.6 325.9 L370.6 325.9 L369.2 324.6 L368.1 322.8 L367.5 319.0 L363.1 317.1 L358.3 315.9 L348.5 317.8 L340.5 318.8 L331.6 317.5 L323.2 319.2 L319.7 319.4 L315.7 319.2 L311.8 319.2 L308.1 318.6 L301.3 316.3 L298.7 316.4 L293.1 318.4 L287.4 319.8 L281.9 320.7 L273.7 324.7 L267.8 330.5 L266.1 334.5 L263.2 338.7 L259.1 345.2 L253.8 351.4 L250.2 354.2 L251.2 355.9 L250.3 357.9 L244.6 358.8 L240.1 359.2 L239.3 360.2 L239.8 372.7 L241.4 377.5 L244.3 383.2 L246.2 386.3 L247.6 395.6 L248.0 403.4 L254.3 408.4 L257.9 412.2 L260.4 415.5 L259.5 417.6 L258.0 424.0 L259.5 432.2 L268.3 449.8 L269.0 451.1 L268.0 451.2 L266.6 447.8 L262.1 442.1 L260.7 436.0 L255.5 429.2 L252.6 426.6 L251.6 428.8 L250.0 431.2 L244.8 427.7 L240.4 424.1 L236.4 417.1 L235.9 418.7 L234.9 420.2 L230.3 414.7 L225.5 410.3 L221.1 408.7 L218.5 407.2 L215.9 404.9 L210.5 402.5 L197.0 406.0 L179.8 403.2 L173.2 405.8 L170.5 404.2 L168.8 401.2 L170.4 396.1 L170.8 385.3 L172.8 377.7 L171.9 372.0 L172.9 369.3 L173.6 365.6 L170.9 364.1 L158.8 361.1 L156.2 358.8 L153.0 361.5 L138.5 363.0 L133.0 365.2 L127.9 369.5 L126.6 374.9 L129.5 378.5 L131.4 384.8 L126.2 398.4 L125.3 402.4 L127.3 419.0 L126.5 428.2 L123.7 434.3 L119.2 439.7 L117.3 449.0 L113.8 453.3 L109.0 463.1 L105.8 475.4 L103.6 481.0 L102.2 491.4 L92.5 507.2 L90.2 516.1 L86.7 519.5 L87.9 522.1 L88.1 526.6 L86.9 538.4 L86.5 548.3 L87.9 553.5 L92.6 563.9 L91.5 566.9 L91.0 571.2 L94.9 573.2 L97.7 573.8 L113.7 568.8 L119.1 570.1 L121.1 574.7 L122.4 578.7 L125.2 600.3 L126.6 604.4 L129.8 608.2 L133.3 612.2 L134.5 611.5 L134.7 610.0 L135.0 608.3 L138.1 612.4 L140.6 620.0 L149.0 660.4 L151.4 665.5 L153.4 670.9 L148.3 668.3 L146.9 659.3 L145.5 655.6 L143.7 655.0 L140.8 655.1 L140.6 653.5 L142.8 650.5 L142.4 647.0 L139.5 644.2 L134.7 646.4 L134.8 652.7 L137.0 657.6 L145.0 668.3 L147.6 672.8 L150.8 674.1 L155.4 673.4 L161.0 678.0 L165.4 682.2 L176.3 688.8 L182.9 688.1 L190.1 686.4 L194.8 686.9 L199.5 688.5 L205.2 694.0 L214.1 707.6 L228.7 718.9 L227.1 721.7 L226.5 726.0 L220.7 731.7 L219.8 735.0 L217.7 739.2 L213.7 741.4 L210.3 741.8 L208.3 741.4 L206.9 740.6 L204.5 736.6 L203.4 735.4 L202.4 735.2 L195.0 737.9 L187.9 740.9 L186.6 743.6 L184.7 746.8 L182.6 748.0 L181.0 748.3 L179.4 746.5 L176.7 744.1 L174.6 741.8 L175.1 738.2 L179.1 732.8 L179.6 729.0 L179.1 722.6 L178.0 718.9 L176.9 718.7 L174.9 718.1 L169.3 718.7 L166.6 714.5 L165.5 709.9 L163.6 708.3 L161.7 707.3 L157.5 708.9 L154.3 707.9 L143.8 703.9 L139.7 697.4 L137.5 697.2 L135.6 698.0 L134.9 699.4 L133.7 706.9 L132.8 709.2 L120.7 694.2 L112.4 688.0 L113.5 676.8 L111.0 674.6 L107.8 674.4 L105.4 671.3 L107.6 664.6 L104.3 665.9 L99.7 665.7 L96.0 663.8 L93.2 654.6 L91.4 651.8 L87.6 646.9 L82.4 646.9 L80.7 644.6 L81.1 638.6 L77.4 635.0 L72.5 632.0 L68.5 630.2 L64.3 620.6 L61.1 618.3 L58.3 616.3 L54.5 617.6 L53.2 621.1 L50.7 624.5 L47.7 624.0 L45.1 622.1 L41.8 612.5 L41.3 606.6 L42.0 595.6 L46.1 585.8 L48.3 570.0 L51.7 560.1 L54.1 556.7 L57.5 543.2 L64.3 525.8 L65.1 522.1 L66.4 517.9 L67.5 514.0 L67.8 507.8 L66.9 504.5 L66.9 502.7 L68.4 500.3 L73.2 496.4 L79.9 489.9 L87.9 480.8 L96.0 466.8 L100.1 458.6 L101.8 455.8 L103.6 454.9 L106.4 452.1 L108.3 449.0 L108.4 447.4 L104.0 432.2 L101.1 427.2 L99.6 421.3 L98.8 417.1 L97.8 413.2 L98.3 409.5 L96.7 407.2 L93.1 404.3 L89.3 400.0 L87.1 392.9 L87.1 389.0 L84.7 385.5 L83.9 381.9 L85.3 378.4 L87.2 375.5 L87.0 362.3 L86.2 358.4 L85.3 351.4 L82.8 346.1 L79.4 339.9 L75.5 334.8 L65.2 325.5 L57.9 319.3 L54.2 313.7 L49.7 307.2 L46.4 302.5 L42.2 296.6 L40.1 288.5 L38.9 279.9 L39.5 277.1 L41.5 275.2 L44.1 273.7 L46.2 273.3 L52.2 269.4 L56.3 269.7 L57.2 268.9 L57.6 267.1 L57.1 259.2 L57.3 248.7 L58.1 240.2 L59.0 234.5 L69.9 228.0 L72.2 225.2 L73.3 222.1 L73.3 219.4 L72.4 217.2 L70.7 216.1 L63.6 221.7 L62.3 220.4 L59.0 211.1 L57.6 208.3 L55.6 204.9 L53.4 200.2 L53.1 191.9 L51.5 187.9 L42.7 179.2 L38.7 174.5 L33.3 167.7 L26.9 159.6 L20.3 152.1 L17.2 147.3 L16.1 146.2 L15.7 144.4 L17.7 139.2 L16.7 134.0 L13.4 127.1 L12.0 122.8 L12.5 121.1 L10.9 120.5 L7.3 120.8 L3.7 117.6 L0.3 110.7 L0.0 109.5 L1.1 109.5 L5.4 110.7 L6.8 110.5 L9.8 109.0 L14.4 107.3 L17.1 106.7 L18.0 105.9 L18.4 104.3 L16.1 88.4 L16.5 85.1 L20.8 78.2 L20.3 71.3 L21.4 61.3 L26.2 54.5 L29.9 51.4 L31.0 46.4 L32.7 45.4 L35.7 45.8 L41.9 49.5 L44.5 49.6 L48.3 49.5 L52.3 49.3 L54.2 48.9 L67.1 45.3 L69.9 44.9 L72.7 45.4 L74.6 45.2 L76.6 43.6 L78.1 40.7 L79.7 31.4 L80.6 29.8 L82.3 28.4 L85.0 27.5 L88.2 27.6 L92.4 29.4 L95.0 29.5 L98.0 28.7 L100.5 27.5 L102.2 25.8 L102.9 23.9 L102.3 20.1 L100.4 15.4 L100.9 14.8 L104.4 15.9 L109.6 17.0 L113.5 16.8 L116.1 16.0 L118.6 13.7 L121.8 11.7 L124.9 12.1 L127.2 14.0 L133.0 17.2 Z M130.6 550.1 L130.2 550.9 L128.3 549.3 L127.0 547.6 L126.3 545.3 L129.2 545.4 L130.6 547.5 L130.6 550.1 Z M130.5 555.5 L130.7 558.3 L129.7 561.6 L125.2 563.6 L123.7 560.9 L124.1 556.8 L124.8 555.8 L129.1 556.0 L130.5 555.5 Z M110.8 705.3 L109.8 705.5 L108.0 701.6 L110.3 695.9 L112.6 702.9 L110.8 705.3 Z M58.9 636.4 L58.4 637.2 L55.9 627.9 L59.5 630.4 L58.9 636.4 Z M45.2 581.7 L42.4 582.2 L42.8 579.6 L43.5 577.9 L44.9 577.4 L45.4 580.3 L45.2 581.7 Z M82.5 653.1 L83.7 659.0 L82.0 657.8 L80.5 655.2 L80.5 651.4 L80.9 650.9 L82.5 653.1 Z'

/* พื้นที่ที่ MOMAY ลงไปแล้ว (พิกัดเป็นตำแหน่งโดยประมาณบนภาพ)
   lift = ความสูงของลำแสง — สามจังหวัดภาคเหนือตอนล่างอยู่ใกล้กัน
   ต้องไล่ความสูงกันไม่ให้ป้ายชื่อทับกัน */
const customerPins = [
  { province: 'พิษณุโลก', org: 'มหาวิทยาลัยนเรศวร', logo: '/NU_crest.png', x: 136.5, y: 199.5, lift: 74 },
  { province: 'สุโขทัย', x: 114.9, y: 190.0, lift: 124 },
  { province: 'กำแพงเพชร', x: 100.2, y: 216.5, lift: 174 },
  { province: 'ชลบุรี', org: 'มหาวิทยาลัยบูรพา', logo: '/BUU_crest.png', x: 171.8, y: 373.0, lift: 74 },
]
</script>

<style scoped>
/* หน้าที่เรียกใช้มีชุดตัวแปรของตัวเอง บางหน้าไม่มี --ease/--muted
   จึงตั้งค่าสำรองไว้ที่รากของคอมโพเนนต์ ไม่ให้ไปพึ่งของหน้าอื่น */
.lightbox--map {
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --muted: #9aa3b2;
}
.lightbox { position: fixed; inset: 0; z-index: 80; display: grid; place-items: center; background: rgba(3, 3, 6, 0.92); backdrop-filter: blur(6px); padding: 5vw; }
/* ฉากหลังเข้มกว่าเดิม (0.55 -> 0.72) เพราะคอมโพเนนต์นี้ไปเปิดบนหน้าพื้นครีมด้วย
   ค่าเดิมถูกจูนไว้กับหน้าพื้นดำ พอเอามาทับพื้นสว่างจะกลายเป็นหมอกเทา ๆ แผนที่ไม่เด่น
   บนหน้าพื้นดำค่าใหม่แทบไม่ต่าง เพราะมันเข้มอยู่แล้ว */
.lightbox--map { place-items: center; padding: 3vh 4vw 4vh; background: rgba(4, 4, 8, 0.72); backdrop-filter: blur(7px); }
/* เปิด: ฉากหลังค่อยเข้ม แล้วแผนที่วาดตัวเอง — ปิด: การ์ดหดลอยขึ้นแล้วจางหาย */
.mapfx-enter-active { transition: opacity 0.4s var(--ease), backdrop-filter 0.4s var(--ease); }
.mapfx-enter-from { opacity: 0; backdrop-filter: blur(0); }
.mapfx-leave-active { transition: opacity 0.42s ease, backdrop-filter 0.42s ease; }
.mapfx-leave-to { opacity: 0; backdrop-filter: blur(0); }
.mapfx-leave-active .mapcard {
  transition: transform 0.44s cubic-bezier(0.34, 0, 0.24, 1), opacity 0.4s ease 0.04s;
}
.mapfx-leave-to .mapcard { transform: translateY(-24px) scale(0.9); opacity: 0; }
.mapcard {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
  width: min(1100px, 96vw);
  max-height: 94vh;
  padding: 0;
  border: 0;
  background: none;
  box-shadow: none;
}
/* padding-top เว้นหัวไว้ให้ป้ายของหมุดที่ลำแสงสูงสุด (--lift 174px) ไม่ล้นขอบการ์ด */
.mapcard__stage { position: relative; display: grid; place-items: center; min-height: 0; padding-top: clamp(76px, 13vh, 150px); perspective: 1500px; }
.thscene {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  animation: mapSlideIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) both;
}
/* แผนที่เลื่อนลงมาจากด้านเหนือแล้วเข้าที่ */
@keyframes mapSlideIn {
  from { transform: translateY(-6%) scale(0.97); }
  to { transform: translateY(0) scale(1); }
}
.thplane {
  position: relative;
  height: min(56vh, 620px);
  aspect-ratio: 400 / 760;
  transform-style: preserve-3d;
  transform: rotateX(52deg) scale(1.5);
  transition: transform 0.9s var(--ease);
}
.thscene:hover .thplane { transform: rotateX(44deg) scale(1.52); }
.thmap { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }


/* เส้นขอบวาดตัวเองทีละส่วนตอนเปิด (--len ตั้งจากความยาวเส้นจริง) */
.thmap__shape { fill-opacity: 0; }
.thmap__shape.is-drawing {
  stroke-dasharray: var(--len, 6000);
  stroke-dashoffset: var(--len, 6000);
  animation: drawLine 2.1s ease-in-out 0.15s forwards, fillIn 0.9s ease 1.75s forwards,
    mapGlow 3.6s ease-in-out 2.1s infinite;
}
@keyframes drawLine {
  to { stroke-dashoffset: 0; }
}
@keyframes fillIn {
  from { fill-opacity: 0; }
  to { fill-opacity: 1; }
}
/* วาดเส้นจบแล้วค่อยติดไฟเรืองขึ้นมา แล้วเต้นเบา ๆ ต่อ */
@keyframes mapGlow {
  0% { filter: drop-shadow(0 0 2px rgba(237, 27, 46, 0.25)); }
  22% { filter: drop-shadow(0 0 26px rgba(237, 27, 46, 0.95)) drop-shadow(0 0 60px rgba(237, 27, 46, 0.45)); }
  60% { filter: drop-shadow(0 0 16px rgba(237, 27, 46, 0.6)) drop-shadow(0 0 44px rgba(237, 27, 46, 0.28)); }
  100% { filter: drop-shadow(0 0 24px rgba(237, 27, 46, 0.85)) drop-shadow(0 0 56px rgba(237, 27, 46, 0.4)); }
}

/* ความหนาของแผ่นค่อยดันตัวขึ้นมาหลังเส้นวาดเสร็จ */
.thmap--depth {
  transform: translateZ(calc(var(--n) * -3px));
  opacity: calc(1 - var(--n) * 0.055);
  animation: depthRise 0.7s var(--ease) both;
  animation-delay: calc(1.65s + var(--n) * 0.045s);
}
.thmap--depth path { filter: none; }
@keyframes depthRise {
  from { transform: translateZ(0); opacity: 0; }
  to { transform: translateZ(calc(var(--n) * -3px)); opacity: calc(1 - var(--n) * 0.055); }
}

.thpin {
  /* ความสูงลำแสง — --liftn (ตัวเลขเปล่า) มาจาก inline style ของแต่ละหมุด
     คูณหน่วยตรงนี้ จอเล็กจะได้ย่อทั้งชุดลงพร้อมแผนที่ */
  --lift-unit: 1px;
  --lift: calc(var(--liftn, 74) * var(--lift-unit));
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  transform-style: preserve-3d;
}
@keyframes pinIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
/* จุดบนผิวแผนที่ */
.thpin__spot,
.thpin__flag { animation: pinIn 0.55s var(--ease) both; animation-delay: var(--in, 0.4s); }
/* พื้นที่กดของหมุด (ตัวปุ่มเองกว้าง 0 เพื่อวางพิกัดให้แม่น) */
.thpin::before { content: ''; position: absolute; left: -14px; top: -14px; width: 28px; height: 28px; border-radius: 50%; }
.thpin__spot {
  position: absolute;
  left: -5px;
  top: -5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.95), 0 0 26px rgba(255, 255, 255, 0.45);
}
/* ลำแสงพุ่งขึ้นจากพื้น */
.thpin__beam {
  position: absolute;
  left: -1.5px;
  bottom: 0;
  width: 3px;
  height: var(--lift);
  border-radius: 3px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.9));
  transform-origin: bottom center;
  transform: rotateX(-52deg);
  animation: beamGrow 0.6s var(--ease) both var(--in, 0.4s),
    beamPulse 2.6s ease-in-out infinite calc(var(--in, 0.4s) + 0.6s);
}
/* ป้ายชื่อ ตั้งฉากกับจอเสมอ */
.thpin__flag {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
  white-space: nowrap;
  padding: 7px 11px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(12, 12, 18, 0.96);
  transform-origin: bottom left;
  transform: rotateX(-52deg) translate(-50%, calc(var(--lift) * -1));
  transition: border-color 0.35s var(--ease), background 0.35s var(--ease);
  pointer-events: none;
}
.thpin__flag b { font-size: 0.68rem; color: #fff; }
.thpin__flag small { font-size: 0.58rem; color: var(--muted); }
.thpin:hover .thpin__flag, .thpin.is-active .thpin__flag { border-color: rgba(255, 255, 255, 0.6); background: rgba(20, 20, 26, 0.98); }
@keyframes beamGrow {
  0% { height: 0; opacity: 0; }
  100% { height: var(--lift); opacity: 0.85; }
}
@keyframes beamPulse {
  0%, 100% { opacity: 0.55; height: calc(var(--lift) * 0.89); }
  50% { opacity: 1; height: calc(var(--lift) * 1.08); }
}


@media (max-width: 767px) {
  /* เดิมย่อความสูงเฉพาะ .thmap ทำให้แผนที่กับพิกัดหมุด (คิดเป็น % ของ .thplane) คนละสเกล
     หมุดเลยตกไปอยู่ใต้ตำแหน่งจริง — ต้องย่อทั้งแผ่นแทน แผนที่กับหมุดจะได้ขยับไปด้วยกัน */
  .thplane { height: min(44vh, 360px); }
  /* แผนที่เล็กลงมาก ลำแสงต้องย่อตาม ไม่งั้นป้ายชื่อลอยพ้นการ์ดไปเลย */
  .thpin { --lift-unit: 0.75px; }
  /* ป้ายชื่อลอยเหนือหมุดตาม --lift — เว้นหัวไว้ให้พอ ไม่งั้นไปทับหัวเรื่อง */
  .mapcard__stage { padding-top: clamp(112px, 18vh, 150px); }
  .thpin__flag { padding: 5px 9px; }
  .thpin__flag b { font-size: 0.6rem; }
  .thpin__flag small { font-size: 0.52rem; }
}
</style>
