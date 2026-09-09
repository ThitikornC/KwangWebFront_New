<template>
  <!-- MOMAY Landing — hero + เล่าเรื่องตามการเลื่อนหน้า (ไอคอนทั้งหมดเป็น inline SVG ไม่ใช้ emoji) -->
  <div class="momay-landing">
    <!-- นิยามไล่สีสำหรับเส้นคั่นแบบขอบฟ้า -->
    <svg class="defs-only" aria-hidden="true">
      <defs>
        <linearGradient id="hrLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#ED1B2E" stop-opacity="0" />
          <stop offset="22%" stop-color="#ED1B2E" stop-opacity="0.35" />
          <stop offset="50%" stop-color="#ff8a7a" stop-opacity="0.95" />
          <stop offset="78%" stop-color="#ED1B2E" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#ED1B2E" stop-opacity="0" />
        </linearGradient>
        <radialGradient id="hrGlow" cx="50%" cy="100%" r="62%">
          <stop offset="0%" stop-color="#ED1B2E" stop-opacity="0.5" />
          <stop offset="45%" stop-color="#7F181B" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#ED1B2E" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>

    <!-- แถบความคืบหน้าการเลื่อนหน้า -->
    <div class="scroll-progress" :style="{ transform: `scaleX(${scrollProgress})` }" />

    <!-- ───────────────────────── NAV ───────────────────────── -->
    <header class="nav" :class="{ 'nav--solid': scrolled }">
      <div class="wrap nav__inner">
        <a class="brand" href="#top" @click.prevent="goTo('#top')">
          <img class="brand__mark" src="/MOMAY_mark.png" alt="" aria-hidden="true" />
          <span class="brand__text">
            <strong>MOMAY</strong>
            <small>BEHAVIORAL INTELLIGENCE PLATFORM</small>
          </span>
        </a>

        <!-- ตัวเลขสดจากหน้างาน — นับขึ้นตอนเข้าหน้า แล้ววิ่งตามค่าใหม่ทุกครั้งที่ข้อมูลขยับ -->
        <div class="nav__live">
          <span class="live nav__live-tag"><i /> LIVE</span>
          <span v-for="k in kpis" :key="`nav-${k.label}`" class="navkpi">
            <i class="navkpi__label">{{ k.label }}</i>
            <b class="navkpi__value" :style="{ color: k.color }">
              <span v-count="{ to: k.value, decimals: k.decimals }">0</span><em>{{ k.unit }}</em>
            </b>
          </span>
        </div>

        <button type="button" class="mm-btn mm-btn--ghost nav__cta" v-magnetic @click="customersOpen = true">MOMAY MAP</button>
      </div>
    </header>

    <!-- ───────────────────────── HERO ───────────────────────── -->
    <section id="top" class="mm-hero">
      <!-- ฉากหลังหลายชั้น เลื่อนแบบพารัลแลกซ์ (วาดด้วย SVG ล้วน) -->
      <div class="mm-hero__bg" aria-hidden="true">
        <div class="mm-hero__glow" :style="{ transform: `translate3d(0, ${heroY * 0.25}px, 0)` }" />

        <svg class="mm-hero__grid" preserveAspectRatio="none" viewBox="0 0 1200 700"
             :style="{ transform: `translate3d(0, ${heroY * 0.12}px, 0)` }">
          <defs>
            <pattern id="gridPattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0H0V60" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
            </pattern>
            <radialGradient id="gridFade" cx="50%" cy="45%" r="62%">
              <stop offset="0%" stop-color="#fff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#fff" stop-opacity="0" />
            </radialGradient>
            <mask id="gridMask"><rect width="1200" height="700" fill="url(#gridFade)" /></mask>
          </defs>
          <rect width="1200" height="700" fill="url(#gridPattern)" mask="url(#gridMask)" />
        </svg>

        <!-- คลิปการไหลของผู้คน — ตัวไฟล์ไขว้จางหัวกับท้ายมาแล้ว วนซ้ำได้เนียนโดยไม่ต้องซ้อนชั้น -->
        <video class="mm-hero__people" :style="{ transform: `translate3d(0, ${heroY * 0.08}px, 0)` }"
               src="/momay/hero-people.mp4" poster="/momay/hero-people.webp"
               autoplay muted loop playsinline preload="auto" />

        <svg class="mm-hero__streams" viewBox="0 0 1200 700" preserveAspectRatio="none"
             :style="{ transform: `translate3d(0, ${heroY * 0.18}px, 0)` }">
          <g stroke="#ED1B2E" fill="none" stroke-width="1.2" opacity="0.5">
            <path class="stream" d="M-50 520 C 200 470, 360 560, 620 500 S 1000 430, 1260 480" />
            <path class="stream stream--2" d="M-50 580 C 240 545, 420 620, 700 560 S 1020 500, 1260 545" />
            <path class="stream stream--3" d="M-50 640 C 180 615, 430 680, 720 630 S 1040 580, 1260 615" />
          </g>
        </svg>

        <svg class="mm-hero__city mm-hero__city--far" viewBox="0 0 1200 340" preserveAspectRatio="none"
             :style="{ transform: `translate3d(0, ${heroY * 0.06}px, 0)` }">
          <path :d="skylineFar" fill="#14141f" />
        </svg>
        <svg class="mm-hero__city mm-hero__city--near" viewBox="0 0 1200 300" preserveAspectRatio="none"
             :style="{ transform: `translate3d(0, ${heroY * -0.04}px, 0)` }">
          <path :d="skylineNear" fill="#0a0a12" />
        </svg>

        <div class="mm-hero__particles">
          <span v-for="p in particles" :key="p.id" class="particle"
                :style="{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.duration, opacity: p.opacity }" />
        </div>

        <div class="mm-hero__vignette" />
      </div>

      <div class="wrap mm-hero__inner">
        <!-- ซ้าย: ข้อความ + CTA -->
        <div class="mm-hero__copy" :class="{ 'mm-hero-ready': heroReady }">
          <p class="eyebrow" v-reveal>
            <span class="eyebrow__dot" />
            BEHAVIORAL INTELLIGENCE PLATFORM
          </p>

          <!-- หัวเรื่องแยกทีละตัวอักษร ไล่ขึ้นจากใต้เส้น -->
          <h1 class="mm-hero__title">
            <span class="line"><span class="line__in" v-split="38" style="--d:120ms">SEE WHAT</span></span>
            <span class="line"><span class="line__in line__in--red" v-split="38" style="--d:420ms">MATTERS.</span></span>
          </h1>

          <p class="mm-hero__sub" v-reveal="620">BEFORE IT IS TOO LATE.</p>

          <p class="mm-hero__thai font-thai" v-reveal="580">
            เปลี่ยนข้อมูลพฤติกรรมให้กลายเป็นความเข้าใจ<br />
            เพื่อนำไปสู่การตัดสินใจที่ดีกว่า
          </p>

          <ul class="mm-hero__chips" v-reveal="720">
            <!-- จอแนวตั้งไม่มีปุ่มนี้บนแถบบน — มาอยู่ในแถวนี้แทน -->
            <li class="chip chip--cta">
              <button type="button" class="mm-btn mm-btn--ghost" v-magnetic @click="customersOpen = true">MOMAY MAP</button>
            </li>
          </ul>
        </div>

        <!-- ทางลัดไปเดโม — แถวของตัวเอง กึ่งกลางจอ ชิดขอบล่างของฮีโร่ -->
        <div class="hero-demos" :style="{ '--cols': demoCols, '--cols-sm': demoColsSm }">
          <button v-for="(d, i) in demoLinks" :key="d.key" type="button" class="demolink"
                  :style="{ '--accent': d.color, '--sweep-delay': `${i * -1.7}s` }"
                  v-reveal="820 + i * 90" @click="open(d.link)">
            <span class="demolink__icon" v-html="d.icon" />
            <span class="demolink__label">
              <b>{{ d.label }}</b>
              <small>VIEW DEMO</small>
            </span>
          </button>
        </div>
      </div>

    </section>

    <!-- เส้นโค้งคั่นระหว่าง hero กับเนื้อหา -->
    <div class="hr-space" aria-hidden="true">
      <svg viewBox="0 0 1200 90" preserveAspectRatio="none">
        <ellipse cx="600" cy="90" rx="300" ry="24" fill="url(#hrGlow)" />
        <path d="M0 62 Q 600 24 1200 62" fill="none" stroke="url(#hrLine)" stroke-width="1.7" />
      </svg>
      <span class="hr-space__star" style="--x:16%; --y:-32px; --d:0.2s" />
      <span class="hr-space__star" style="--x:41%; --y:-50px; --d:1.5s" />
      <span class="hr-space__star" style="--x:66%; --y:-40px; --d:2.4s" />
      <span class="hr-space__star" style="--x:84%; --y:-54px; --d:3.4s" />
    </div>

    <!-- ───────────── สามผลิตภัณฑ์ เรียง ENLIGHTEN → STUDENT → EXECUTIVE BRIEF ───────────── -->
    <template v-for="(sc, si) in showcases" :key="sc.id">
      <section :id="sc.id" class="section section--purpose"
               :class="{ 'section--panel': sc.panel, 'section--fit': sc.panel || sc.phone || sc.console }">
        <div class="wrap">
          <p class="kicker" v-reveal>{{ sc.kicker }}</p>
          <h2 class="h2" v-split="24">{{ sc.title }}</h2>
          <p class="lead font-thai" v-reveal="160">{{ noSplit(sc.lead) }}</p>

          <div v-if="sc.panel" class="brief-showcase brief-showcase--laptop brief-showcase--stack"
               :class="{ 'is-front': stackOpen.brief === 'front', 'is-back': stackOpen.brief === 'back' }" v-reveal="140">
            <span class="en__wordmark en__wordmark--library" aria-hidden="true">Executive <b>Libraly</b></span>
            <span class="en__wordmark en__wordmark--urban" aria-hidden="true">Executive <b>Urban City</b></span>
            <!-- แผงสรุปเป็นของจอแนวนอนเหมือนคอนโซล — ใส่กรอบโน้ตบุ๊คแบบเดียวกัน -->
            <div class="en__backframe" role="button" tabindex="0" aria-label="ขยายหน้าจอ Executive Urban"
                 :aria-pressed="stackOpen.brief === 'back'" @click="toggleStack('brief', 'back')"
                 @keydown.enter="toggleStack('brief', 'back')" @keydown.space.prevent="toggleStack('brief', 'back')">
              <img class="mockup-image mockup-image--executive" src="/momay/Excotive2.png" alt="Executive Urban dashboard" />

              <!-- แดชบอร์ดผู้บริหารระดับเมือง — ธีมสว่าง เก็บเฉพาะใจความของหน้าจริง -->
              <div class="ex" aria-hidden="true">
                <aside class="ex__side">
                  <span class="ex__logo"><i>M</i></span>
                  <ul class="ex__nav">
                    <li v-for="(n, i) in urbanNav" :key="`ex${n.label}`" :class="{ 'is-on': i === 0 }" v-html="n.icon" />
                  </ul>
                </aside>

                <div class="ex__main">
                  <div class="ex__top">
                    <span class="ex__brand">
                      <b>MOMAY EXECUTIVE</b>
                      <em class="font-thai">วิเคราะห์สถานการณ์ของเมือง แล้วคัดเฉพาะประเด็นที่มีนัยสำคัญต่อการตัดสินใจ</em>
                    </span>
                    <span class="ex__org">
                      <em>29°C</em>
                      <b>EXECUTIVE URBAN</b>
                    </span>
                  </div>

                  <!-- ═══ ประเด็นที่ควรรู้วันนี้ ═══ -->
                  <ul class="ex__cards font-thai">
                    <li v-for="c in execCards" :key="c.title" :style="{ '--c': c.color }">
                      <span class="ex__ctop">
                        <i v-html="c.icon" />
                        <em>{{ c.kind }}</em>
                      </span>
                      <b>{{ c.title }}</b>
                      <small>{{ c.note }}</small>
                      <span class="ex__tags"><i v-for="t in c.tags" :key="t">{{ t }}</i></span>
                    </li>
                    <li class="ex__quote font-thai">
                      <span>“ข้อมูลที่ดีไม่ได้แค่บอกว่าเกิดอะไรขึ้น แต่ช่วยให้เราตัดสินใจเพื่อเมืองที่ดีขึ้นได้”</span>
                      <em>— MOMAY</em>
                    </li>
                  </ul>

                  <!-- ═══ ประเด็นหลัก + ทางเลือกที่ควรพิจารณา ═══ -->
                  <div class="ex__body">
                    <div class="ex__panel font-thai">
                      <span class="ex__phead">
                        <i>01</i>
                        <b>คาดว่าปริมาณขยะจะเพิ่มสูงช่วงเช้าวันนี้ (09:00 – 10:00)</b>
                        <em>NEEDS ATTENTION</em>
                      </span>

                      <div class="ex__grid">
                        <div class="ex__stats">
                          <p>จากรูปแบบข้อมูลในอดีตและกิจกรรมที่เกิดขึ้น คาดว่าปริมาณขยะจะเพิ่มขึ้นกว่าปกติ</p>
                          <span class="ex__stat"><b>+32%</b><small>ปริมาณขยะ เทียบค่าเฉลี่ย</small></span>
                          <span class="ex__stat"><b>09:00 – 10:00</b><small>ช่วงที่คาดว่าจะสูงสุด</small></span>
                          <div class="ex__bars">
                            <i v-for="(b, i) in execBars" :key="`eb${i}`" :class="{ 'is-peak': b.peak }"
                               :style="{ height: `${b.v}%` }" />
                          </div>
                          <span class="ex__baxis"><em>06:00</em><em>10:00</em><em>14:00</em></span>
                        </div>

                        <div class="ex__map">
                          <span class="ex__mtitle">ความหนาแน่นของผู้คน (คาดการณ์)</span>
                          <div class="ex__stage">
                            <svg class="ub__base" viewBox="0 0 320 200" preserveAspectRatio="none" aria-hidden="true">
                              <path d="M-10 70C40 84 74 122 128 132S232 124 330 154" fill="none"
                                    stroke="#1d3b57" stroke-width="16" stroke-linecap="round" opacity="0.9" />
                              <g stroke="rgba(190,214,240,0.15)" fill="none" stroke-width="1.4">
                                <path d="M-10 112C48 100 96 64 168 60S276 78 330 56" />
                                <path d="M26 -10 44 210M112 -10 96 210M200 -10 214 210M276 -10 266 210" />
                              </g>
                            </svg>
                            <svg class="ub__heat" viewBox="0 0 320 200" preserveAspectRatio="none" aria-hidden="true">
                              <defs>
                                <filter id="exHeat" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB">
                                  <feGaussianBlur stdDeviation="6" />
                                  <feColorMatrix type="matrix" values="0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 0" />
                                  <feComponentTransfer>
                                    <feFuncR type="table" tableValues="0.13 0.20 0.63 0.95 1 1" />
                                    <feFuncG type="table" tableValues="0.55 0.80 0.86 0.62 0.28 0.11" />
                                    <feFuncB type="table" tableValues="0.86 0.42 0.20 0.16 0.18 0.18" />
                                    <feFuncA type="table" tableValues="0 0.2 0.44 0.64 0.78 0.88" />
                                  </feComponentTransfer>
                                </filter>
                              </defs>
                              <g filter="url(#exHeat)" fill="#fff">
                                <circle v-for="(b, i) in urbanHeat" :key="`exh${i}`"
                                        :cx="b.x" :cy="b.y" :r="b.r" :opacity="b.o" />
                              </g>
                            </svg>
                            <span v-for="pl in urbanPlaces" :key="`exp${pl.name}`" class="ub__place font-thai"
                                  :style="{ left: pl.x, top: pl.y }">{{ pl.name }}</span>
                            <ul class="ex__legend font-thai">
                              <li v-for="l in execLayers" :key="l">{{ l }}</li>
                            </ul>
                            <span class="ub__zoom"><i>+</i><i>−</i></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="ex__side2 font-thai">
                      <span class="ex__stitle">What Should You Consider?</span>
                      <ul class="ex__opts">
                        <li v-for="o in execOpts" :key="o.key" :class="{ 'is-on': o.pick }">
                          <span class="ex__okey">Option {{ o.key }}<em v-if="o.pick">แนะนำ ↓</em></span>
                          <b>{{ o.name }}</b>
                          <small>ความเสี่ยงขยะล้น <em>{{ o.risk }}</em><i v-if="o.drop">({{ o.drop }})</i></small>
                        </li>
                      </ul>
                      <span class="ex__save">บันทึกเพื่อพิจารณา →</span>
                    </div>
                  </div>

                  <!-- ═══ ภาพรวมเมืองวันนี้ + แนวโน้ม 7 วัน ═══ -->
                  <div class="ex__glance">
                    <ul class="ex__stats2 font-thai">
                      <li v-for="g in execGlance" :key="g.label">
                        <small>{{ g.label }}</small><b>{{ g.value }}</b>
                      </li>
                    </ul>
                    <ul class="ex__week font-thai">
                      <li v-for="d in execWeek" :key="d.day" :class="{ 'is-warn': d.warn }">
                        <small>{{ d.day }}</small><em>{{ d.note }}</em>
                      </li>
                    </ul>
                  </div>

                  <p class="ex__foot">
                    <b>MOMAY</b>
                    <span>EXECUTIVE URBAN</span>
                    <em class="font-thai">People × Spaces × Better Tomorrows</em>
                  </p>
                </div>
              </div>
            </div>
            <div class="laptop">
              <div class="laptop__lid">
                <span class="laptop__cam" aria-hidden="true" />
                <div class="laptop__screen">
                  <div class="laptop__stage">
                    <div class="brief brief--library-image" role="button" tabindex="0" aria-label="ขยายหน้าจอ Executive Brief"
                         :aria-pressed="stackOpen.brief === 'front'" @click="toggleStack('brief', 'front')"
                         @keydown.enter="toggleStack('brief', 'front')" @keydown.space.prevent="toggleStack('brief', 'front')">
                    <img class="mockup-image" src="/momay/Excotive_Lib.png" alt="Executive Brief library dashboard" />
                    <div class="brief__head">
                      <span class="brief__title">EXECUTIVE BRIEF</span>
                      <span class="brief__meta">
                        <em class="font-thai">{{ clock }}</em>
                        <span class="live"><i /> LIVE</span>
                      </span>
                    </div>

                    <div class="kpis">
                      <div v-for="k in kpis" :key="k.label" class="kpi">
                        <span class="kpi__label">{{ k.label }}</span>
                        <span class="kpi__value" :style="{ color: k.color }">
                          <span v-count="{ to: k.value, decimals: k.decimals }">0</span><em>{{ k.unit }}</em>
                        </span>
                        <span class="kpi__delta" :class="`is-${k.dir}`">
                          <svg v-if="k.dir !== 'flat'" viewBox="0 0 24 24" aria-hidden="true">
                            <path v-if="k.dir === 'down'" d="M12 5v14M6 13l6 6 6-6" />
                            <path v-else d="M12 19V5M6 11l6-6 6 6" />
                          </svg>
                          {{ k.delta }}
                        </span>
                      </div>
                    </div>

                    <div class="brief__row">
                      <!-- กราฟเส้น: ลากเส้นทีละนิดเมื่อเลื่อนมาถึง -->
                      <div class="panelbox">
                        <span class="panelbox__title">TODAY&apos;S STORY</span>
                        <div class="chart" v-reveal="200">
                          <svg viewBox="0 0 320 132" preserveAspectRatio="none" aria-hidden="true">
                            <defs>
                              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stop-color="#ED1B2E" stop-opacity="0.38" />
                                <stop offset="100%" stop-color="#ED1B2E" stop-opacity="0" />
                              </linearGradient>
                            </defs>
                            <g stroke="rgba(255,255,255,0.07)" stroke-width="1">
                              <line v-for="g in 4" :key="`g${g}`" x1="0" :y1="g * 26" x2="320" :y2="g * 26" />
                            </g>
                            <path class="chart__area" :d="areaPath" fill="url(#areaGrad)" />
                            <path class="chart__line" :d="linePath" fill="none" stroke="#ED1B2E" stroke-width="2.4"
                                  stroke-linecap="round" stroke-linejoin="round" />
                            <path class="chart__line chart__line--alt" :d="linePathAlt" fill="none" stroke="#56A0D3"
                                  stroke-width="1.6" stroke-dasharray="4 4" opacity="0.7" />
                          </svg>
                          <span class="chart__peakdot" :style="{ left: peakPos.left, top: peakPos.top }" />
                          <span class="chart__badge font-thai">13:00 - 15:00<br /><b>HIGH USAGE</b></span>
                          <div class="chart__axis">
                            <span v-for="t in hourTicks" :key="t">{{ t }}</span>
                          </div>
                        </div>
                      </div>

                      <!-- แถบการใช้พื้นที่รายชั้น -->
                      <div class="panelbox">
                        <span class="panelbox__title">SPACE UTILIZATION</span>
                        <ul class="bars">
                          <li v-for="(b, i) in floors" :key="b.name" v-reveal="120 + i * 90">
                            <span class="bars__name font-thai">{{ b.name }}</span>
                            <span class="bars__track"><i class="bars__fill" :style="{ '--w': b.value + '%', background: b.color }" /></span>
                            <span class="bars__val">{{ b.value }}%</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="brief__row">
                      <div class="panelbox panelbox--insight">
                        <span class="panelbox__title">AI INSIGHT</span>
                        <p class="font-thai">
                          ช่วงเวลา 13:00 - 15:00 น. เป็นช่วงที่มีการใช้งานสูงที่สุด
                          ควรเปิดพื้นที่ Collaboration Zone เพิ่มเติม
                        </p>
                      </div>
                      <div class="panelbox">
                        <span class="panelbox__title">RECOMMENDED ACTIONS</span>
                        <ul class="todo">
                          <li v-for="(a, i) in actions" :key="a" v-reveal="150 + i * 120">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <rect x="3" y="3" width="18" height="18" rx="5" />
                              <path class="todo__tick" d="M7.5 12.5l3 3 6-6.5" />
                            </svg>
                            <span class="font-thai">{{ a }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              <span class="laptop__base" aria-hidden="true"><i class="laptop__notch" /></span>
            </div>
          </div>

          <!-- คอนโซลจำลองของ MOMAY ENLIGHTENED — ผังเดียวกับแดชบอร์ดจริง -->
          <div v-else-if="sc.console" class="brief-showcase brief-showcase--laptop brief-showcase--stack"
               :class="{ 'is-front': stackOpen.enlightened === 'front', 'is-back': stackOpen.enlightened === 'back' }" v-reveal="140">
            <span class="en__wordmark en__wordmark--library" aria-hidden="true">Enlightened <b>Library</b></span>
            <span class="en__wordmark en__wordmark--urban" aria-hidden="true">Enlightened <b>Urban City</b></span>
            <!-- คอนโซลตัวนี้เป็นของจอแนวนอน — ใส่กรอบโน้ตบุ๊ค แล้วย่อผังขนาดจอคอมทั้งก้อนลงให้พอดีจอ -->
            <div class="en__backframe" role="button" tabindex="0" aria-label="ขยายหน้าจอ Enlightened Urban"
                 :aria-pressed="stackOpen.enlightened === 'back'" @click="toggleStack('enlightened', 'back')"
                 @keydown.enter="toggleStack('enlightened', 'back')" @keydown.space.prevent="toggleStack('enlightened', 'back')">
              <img class="mockup-image mockup-image--enlightened" src="/momay/Enlitened2.png" alt="Enlightened Urban dashboard" />

              <!-- แดชบอร์ดระดับเมือง — ยกผังของหน้าจริงมา เก็บเฉพาะใจความ -->
              <div class="ub" aria-hidden="true">
                <aside class="ub__side">
                  <span class="ub__logo">
                    <i>M</i>
                    <span><b>MOMAY</b><em>Enlightened</em></span>
                  </span>
                  <ul class="ub__nav font-thai">
                    <li v-for="(n, i) in urbanNav" :key="n.label" :class="{ 'is-on': i === 0 }">
                      <i v-html="n.icon" />{{ n.label }}
                    </li>
                  </ul>
                  <span class="ub__out font-thai">ออกจากระบบ</span>
                </aside>

                <div class="ub__main">
                  <div class="ub__top">
                    <b>ENLIGHTENED</b>
                    <span class="ub__temp">29°C</span>
                    <span class="ub__org">
                      <i>EU</i>
                      <span><b>ENLIGHTEN URBAN</b><em class="font-thai">แพลตฟอร์มเมืองอัจฉริยะ</em></span>
                    </span>
                  </div>

                  <!-- ═══ แถวบน: เกิดอะไรขึ้น · ผลกระทบ · แผนที่ ═══ -->
                  <div class="ub__hero">
                    <div class="ub__lead font-thai">
                      <b>ปริมาณขยะในตลาด<br />สูงกว่าปกติ <em>42%</em></b>
                      <small>ตั้งแต่เวลา 06:00 – 09:00 มีปริมาณขยะเพิ่มขึ้นจากค่าเฉลี่ยปกติ
                        เนื่องจากกิจกรรมตลาดเช้าและการสัญจรที่หนาแน่น</small>
                      <span class="ub__btn">ดูรายละเอียด →</span>
                    </div>

                    <div class="ub__impact font-thai">
                      <ul>
                        <li v-for="im in urbanImpacts" :key="im">{{ im }}</li>
                      </ul>
                      <p class="ub__cmp">เทียบกับสัปดาห์ที่ผ่านมา<b>▲ +42%</b></p>
                    </div>

                    <div class="ub__map">
                      <div class="ub__stage">
                        <!-- ฐานแผนที่: แม่น้ำ ถนนสายหลัก และบล็อกอาคาร -->
                        <svg class="ub__base" viewBox="0 0 320 200" preserveAspectRatio="none" aria-hidden="true">
                          <path d="M-10 64C40 78 74 118 128 128S232 120 330 150" fill="none"
                                stroke="#1d3b57" stroke-width="17" stroke-linecap="round" opacity="0.85" />
                          <g stroke="rgba(190,214,240,0.16)" fill="none" stroke-width="1.6">
                            <path d="M-10 108C48 96 96 60 168 56S276 74 330 52" />
                            <path d="M22 -10 40 210M108 -10 92 210M196 -10 210 210M272 -10 262 210" />
                          </g>
                          <g stroke="rgba(190,214,240,0.09)" fill="none" stroke-width="1">
                            <path d="M-10 34H330M-10 78H330M-10 132H330M-10 176H330" />
                            <path d="M60 -10 72 210M150 -10 140 210M238 -10 246 210M300 -10 296 210" />
                          </g>
                        </svg>

                        <!-- แนวถนนที่เฝ้าดู (corridor) -->
                        <svg class="ub__corridor" viewBox="0 0 320 200" preserveAspectRatio="none" aria-hidden="true">
                          <path d="M18 150C66 138 106 106 168 100S262 108 306 86" fill="none"
                                stroke="#cfe9ff" stroke-width="1.1" stroke-dasharray="6 5" opacity="0.55" />
                        </svg>

                        <!-- ชั้นความร้อน: วงขาวทับกันแล้วเบลอรวมทีเดียว จากนั้นแปลงความเข้ม
                             เป็นสีด้วยตารางไล่สี วิธีเดียวกับ heatmap ของจริง ขอบจึงกลืนกันสนิท -->
                        <svg class="ub__heat" viewBox="0 0 320 200" preserveAspectRatio="none" aria-hidden="true">
                          <defs>
                            <filter id="ubHeat" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB">
                              <feGaussianBlur stdDeviation="6" />
                              <!-- ย้ายค่า alpha (ความหนาแน่น) ไปไว้ในช่องสีทั้งสาม เพื่อให้ไล่สีตามมันได้ -->
                              <feColorMatrix type="matrix" values="0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 0" />
                              <feComponentTransfer>
                                <feFuncR type="table" tableValues="0.13 0.20 0.63 0.95 1 1" />
                                <feFuncG type="table" tableValues="0.55 0.80 0.86 0.62 0.28 0.11" />
                                <feFuncB type="table" tableValues="0.86 0.42 0.20 0.16 0.18 0.18" />
                                <feFuncA type="table" tableValues="0 0.2 0.44 0.64 0.78 0.88" />
                              </feComponentTransfer>
                            </filter>
                          </defs>
                          <g filter="url(#ubHeat)" fill="#fff">
                            <circle v-for="(b, i) in urbanHeat" :key="`hb${i}`"
                                    :cx="b.x" :cy="b.y" :r="b.r" :opacity="b.o" />
                          </g>
                        </svg>

                        <span v-for="pl in urbanPlaces" :key="pl.name" class="ub__place font-thai"
                              :style="{ left: pl.x, top: pl.y }">{{ pl.name }}</span>

                        <span class="ub__callout font-thai">ขยะสูงกว่าปกติ<b>+42%</b></span>
                        <span class="ub__chip">Chom Nan 500M Corridor</span>

                        <ul class="ub__legend font-thai">
                          <li v-for="l in urbanLayers" :key="l.name" :class="{ 'is-on': l.on }">
                            <i :style="{ background: l.color }" />{{ l.name }}
                          </li>
                        </ul>

                        <span class="ub__zoom"><i>+</i><i>−</i></span>
                        <span class="ub__full font-thai">ดูแผนที่แบบเต็มหน้าจอ ↗</span>
                      </div>
                    </div>
                  </div>

                  <!-- ═══ แถวกลาง: สาเหตุ · คาดการณ์ · จำลอง ═══ -->
                  <div class="ub__row3">
                    <div class="ub__box font-thai">
                      <ul class="ub__drivers">
                        <li v-for="d in urbanDrivers" :key="d.name">
                          <span>{{ d.name }}</span><em :style="{ color: d.color }">{{ d.delta }}</em>
                        </li>
                      </ul>
                      <p class="ub__chain"><i>↓</i><b>ปริมาณขยะเพิ่มขึ้น <em>+42%</em></b></p>
                      <ul class="ub__effects">
                        <li v-for="e in urbanEffects" :key="e">{{ e }}</li>
                      </ul>
                    </div>

                    <div class="ub__box font-thai">
                      <span class="ub__btitle"><em>วันนี้</em></span>
                      <div class="ub__plot">
                        <svg viewBox="0 0 200 52" preserveAspectRatio="none" aria-hidden="true">
                          <rect x="72" y="0" width="20" height="52" fill="rgba(237,27,46,0.16)" />
                          <path :d="ubWasteArea" fill="url(#ubWasteFill)" />
                          <path :d="ubWasteLine" fill="none" stroke="#8EA6FF" stroke-width="1.5"
                                stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
                          <defs>
                            <linearGradient id="ubWasteFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stop-color="#8EA6FF" stop-opacity="0.34" />
                              <stop offset="100%" stop-color="#8EA6FF" stop-opacity="0" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <span class="ub__peak">คาดว่าจะสูงสุด<br /><b>09:00 - 10:00</b></span>
                      </div>
                      <span class="ub__xaxis"><em>00:00</em><em>06:00</em><em>12:00</em><em>18:00</em><em>24:00</em></span>
                      <p class="ub__tip">ถ้ารูปแบบปัจจุบันยังคงดำเนินต่อไป ขยะช่วงเช้าอาจสูงกว่าปกติ 30–50% ในอีก 3 วันข้างหน้า</p>
                    </div>

                    <div class="ub__box font-thai">
                      <span class="ub__btitle"><em>SIMULATE</em></span>
                      <ul class="ub__sims">
                        <li v-for="sm in urbanSims" :key="sm.key" :class="{ 'is-on': sm.key === 'A' }">
                          <i>{{ sm.key }}</i><b>{{ sm.name }}</b>
                        </li>
                      </ul>
                      <ul class="ub__res">
                        <li v-for="r in urbanResults" :key="r.name">
                          <span>{{ r.name }}</span><em :class="r.dir">{{ r.delta }}</em>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- ═══ แถวล่าง: ข้อเสนอแนะ · ทางเลือกอื่น · สิ่งที่ควรพิจารณา ═══ -->
                  <div class="ub__row3 ub__row3--last">
                    <div class="ub__box ub__box--rec font-thai">
                      <span class="ub__btitle">ข้อเสนอแนะหลัก</span>
                      <b>ควรเพิ่มรอบเก็บขยะในช่วงเช้า 06:00 – 10:00</b>
                      <small>เพื่อรองรับปริมาณขยะที่เพิ่มขึ้นจากกิจกรรม และลดผลกระทบต่อพื้นที่สาธารณะ</small>
                      <em>คาดว่าจะลดขยะตกค้างได้ 32%</em>
                    </div>

                    <div class="ub__box font-thai">
                      <span class="ub__btitle">ทางเลือกอื่น ๆ</span>
                      <ul class="ub__alts">
                        <li v-for="a in urbanAlts" :key="a"><span>{{ a }}</span><i>ดูผลลัพธ์</i></li>
                      </ul>
                    </div>

                    <div class="ub__box font-thai">
                      <span class="ub__btitle">สิ่งที่ควรพิจารณาเพิ่มเติม</span>
                      <ul class="ub__notes">
                        <li v-for="n in urbanNotes" :key="n">{{ n }}</li>
                      </ul>
                    </div>
                  </div>

                  <p class="ub__foot">
                    <b>MOMAY</b>
                    <span>ENLIGHTEN URBAN</span>
                    <em>One Intelligence Core &#8594; A Smarter City &#8594; A Better Tomorrow</em>
                  </p>
                </div>
              </div>
            </div>
            <div class="laptop">
              <div class="laptop__lid">
                <span class="laptop__cam" aria-hidden="true" />
                <div class="laptop__screen">
                  <div class="laptop__stage">
                    <div class="brief brief--en brief--library-image" role="button" tabindex="0" aria-label="ขยายหน้าจอ Enlightened Library"
                         :aria-pressed="stackOpen.enlightened === 'front'" @click="toggleStack('enlightened', 'front')"
                         @keydown.enter="toggleStack('enlightened', 'front')" @keydown.space.prevent="toggleStack('enlightened', 'front')">
                    <img class="mockup-image" src="/momay/Enlighted_Lib.png" alt="Enlightened library dashboard" />
                    <div class="brief__head">
                      <span class="brief__title">ENLIGHTENED</span>
                      <span class="brief__meta">
                        <em class="font-thai">{{ clock }}</em>
                        <span class="live"><i /> LIVE</span>
                      </span>
                    </div>

                    <div class="en__blocks">
                      <!-- ═══ LAYER 1 (ซ้าย) ═══ -->
                      <section class="en__block en__block--green">
                        <div class="en__lhead">
                          <span class="en__lmark">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 3L6 13.5h4.6L9.8 21l7.7-10.7h-4.7z" /></svg>
                          </span>
                          <span class="en__ltitle">
                            <b>LAYER 1: Real-Time <em class="font-thai">· ทั้งอาคาร</em></b>
                            <small class="font-thai">เห็นสิ่งที่เกิดขึ้น ณ เวลาปัจจุบัน เพื่อตอบสนองและแจ้งเตือนได้ทันที</small>
                          </span>
                        </div>

                        <div class="en__row3">
                          <div class="en__box">
                            <span class="en__btitle font-thai">ความหนาแน่นของโซน</span>
                            <ul class="en__zones font-thai">
                              <li v-for="(z, i) in enZones" :key="z.code" :class="{ 'is-hot': z.hot }" v-reveal="120 + i * 60">
                                <span class="en__ring" :style="{ '--p': z.pct, '--c': z.color }">
                                  <b><span v-count="{ to: z.people }">0</span><em>คน</em></b>
                                </span>
                                <span class="en__ring" :style="{ '--p': z.pct, '--c': z.color }">
                                  <b><span v-count="{ to: z.pct }">0</span><em>%</em></b>
                                </span>
                                <span class="en__zinfo">
                                  <b :style="{ color: z.hot ? z.color : '#e8e8ee' }">{{ z.code }}<i class="en__livetag">LIVE</i></b>
                                  <small>{{ z.note }}</small>
                                </span>
                              </li>
                            </ul>
                          </div>

                          <div class="en__box en__box--center">
                            <span class="en__btitle font-thai">ระดับความหนาแน่น</span>
                            <svg class="en__gauge" viewBox="0 0 120 74" aria-hidden="true">
                              <path d="M12 62 A48 48 0 0 1 108 62" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="3.4" stroke-linecap="round" />
                              <path d="M12 62 A48 48 0 0 1 108 62" fill="none" :stroke="enGaugeColor" stroke-width="3.4" stroke-linecap="round"
                                    stroke-dasharray="150.8" :stroke-dashoffset="150.8 * (1 - enDensity / 100)" class="en__gaugearc" />
                              <circle :cx="enGaugePt.x" :cy="enGaugePt.y" r="3.4" :fill="enGaugeColor" />
                            </svg>
                            <b class="en__mpct"><span v-count="{ to: enDensity }">0</span>%</b>
                            <small class="en__mcap font-thai"><span v-count="{ to: enPeople }">0</span> คน · {{ enLevel }}</small>
                            <small class="en__mtrend font-thai">แนวโน้มเพิ่มขึ้น ↗</small>
                          </div>

                          <div class="en__box en__box--center">
                            <span class="en__btitle font-thai">แผนที่ความหนาแน่น</span>
                            <svg class="en__iso" viewBox="4 6 156 106" aria-hidden="true">
                              <!-- ผนังด้านหลังสองด้าน -->
                              <path d="M16 76 L76 46 L76 14 L16 44 Z" fill="rgba(255,255,255,0.045)" stroke="rgba(255,255,255,0.3)" stroke-width="1" />
                              <path d="M76 46 L145 70 L145 38 L76 14 Z" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.22)" stroke-width="1" />
                              <!-- ความหนาของพื้น -->
                              <path d="M16 76 L85 100 L85 107 L16 83 Z" fill="rgba(255,255,255,0.07)" />
                              <path d="M85 100 L145 70 L145 77 L85 107 Z" fill="rgba(255,255,255,0.035)" />
                              <!-- พื้นแบ่งเป็นสามโซน -->
                              <path d="M16 76 L76 46 L99 54 L39 84 Z" fill="rgba(63,163,77,0.85)" />
                              <path d="M39 84 L99 54 L122 62 L62 92 Z" fill="rgba(236,183,49,0.85)" />
                              <path d="M62 92 L122 62 L145 70 L85 100 Z" fill="rgba(237,27,46,0.85)" />
                              <g fill="none" stroke="rgba(255,255,255,0.32)" stroke-width="1">
                                <path d="M16 76 L76 46 L145 70 L85 100 Z" />
                                <path d="M39 84 L99 54M62 92 L122 62" />
                              </g>
                              <g fill="#08110b" font-size="7.5" font-weight="700">
                                <text x="40" y="70" transform="rotate(-24 40 70)">Zone A</text>
                                <text x="63" y="78" transform="rotate(-24 63 78)">Zone B</text>
                                <text x="86" y="86" transform="rotate(-24 86 86)">Zone C</text>
                              </g>
                            </svg>
                          </div>
                        </div>

                        <span class="en__strip"><i />REAL-TIME ENTRY &amp; EXIT</span>

                        <div class="en__row3 en__row3--gates">
                          <div class="en__box">
                            <ul class="en__doors font-thai">
                              <li v-for="d in enDoors" :key="d.name">
                                <span class="en__ring en__ring--sm" :style="{ '--p': 70, '--c': '#3FA34D' }">
                                  <b><span v-count="{ to: d.in }">0</span><em>เข้า</em></b>
                                </span>
                                <span class="en__ring en__ring--sm" :style="{ '--p': 45, '--c': '#56A0D3' }">
                                  <b><span v-count="{ to: d.out }">0</span><em>ออก</em></b>
                                </span>
                                <span class="en__zinfo">
                                  <b>{{ d.name }}<i class="en__livetag">LIVE</i></b>
                                  <small>ทางเข้า-ออก · เข้า {{ d.in }} · ออก {{ d.out }}</small>
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div class="en__box en__box--center">
                            <span class="en__big"><b><span v-count="{ to: enIn }">0</span></b><em class="font-thai">เข้า</em></span>
                          </div>
                          <div class="en__box en__box--center">
                            <span class="en__big en__big--out"><b><span v-count="{ to: enOut }">0</span></b><em class="font-thai">ออก</em></span>
                          </div>
                        </div>
                      </section>

                      <!-- ═══ LAYER 2 (ขวา) ═══ -->
                      <section class="en__block en__block--blue">
                        <div class="en__lhead">
                          <span class="en__lmark en__lmark--blue">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5.2a3 3 0 0 0-5.8 1 2.8 2.8 0 0 0-1.6 4.6 2.9 2.9 0 0 0 1.9 4.6A3 3 0 0 0 12 18.8z" /><path d="M12 5.2a3 3 0 0 1 5.8 1 2.8 2.8 0 0 1 1.6 4.6 2.9 2.9 0 0 1-1.9 4.6A3 3 0 0 1 12 18.8z" /></svg>
                          </span>
                          <span class="en__ltitle">
                            <b>LAYER 2: <em class="is-blue">Enlightened Systems</em></b>
                            <small class="font-thai">เรียนรู้พฤติกรรมจากข้อมูลย้อนหลัง เพื่อคาดการณ์และแนะนำล่วงหน้า · ข้อมูลสะสม 29 วัน</small>
                          </span>
                          <span class="en__pager font-thai"><i>‹</i><b>วันนี้</b><i>›</i></span>
                        </div>

                        <div class="en__row2">
                          <div class="en__box">
                            <span class="en__btitle font-thai">แนวโน้มการใช้งาน <em>· ที่นั่งรวม 228</em></span>
                            <span class="en__legend"><i class="is-blue" />4 สัปดาห์ก่อน<i class="is-green" />วันนี้</span>
                            <div class="en__plot">
                              <span class="en__yaxis"><em style="--i:0">228</em><em style="--i:1">171</em><em style="--i:2">114</em><em style="--i:3">57</em><em style="--i:4">0</em></span>
                              <span class="en__svgwrap">
                              <svg viewBox="0 0 260 96" preserveAspectRatio="none" aria-hidden="true">
                                <defs>
                                  <linearGradient id="enTrendFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stop-color="#8EC06C" stop-opacity="0.32" />
                                    <stop offset="100%" stop-color="#8EC06C" stop-opacity="0" />
                                  </linearGradient>
                                  <linearGradient id="enFadeX" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stop-color="#fff" stop-opacity="1" />
                                    <stop offset="62%" stop-color="#fff" stop-opacity="1" />
                                    <stop offset="100%" stop-color="#fff" stop-opacity="0" />
                                  </linearGradient>
                                  <mask id="enFadeMask">
                                    <rect x="0" y="0" width="125" height="96" fill="url(#enFadeX)" />
                                  </mask>
                                </defs>
                                <g stroke="rgba(255,255,255,0.05)" stroke-width="0.8">
                                  <line x1="0" y1="24" x2="260" y2="24" /><line x1="0" y1="48" x2="260" y2="48" /><line x1="0" y1="72" x2="260" y2="72" />
                                </g>
                                <line x1="0" y1="95.2" x2="260" y2="95.2" stroke="rgba(255,255,255,0.18)" stroke-width="0.9" vector-effect="non-scaling-stroke" />
                                <path :d="enTodayArea" fill="url(#enTrendFill)" mask="url(#enFadeMask)" />
                                <path :d="enPastLine" fill="none" stroke="#56A0D3" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.85" vector-effect="non-scaling-stroke" />
                                <path :d="enTodayLine" fill="none" stroke="#8EC06C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
                              </svg>
                              <i class="en__dot" :style="{ top: enTodayTop }" />
                              </span>
                            </div>
                            <div class="en__xaxis"><em>00:00</em><em>06:00</em><em>12:00</em><em>18:00</em><em>21:00</em></div>
                          </div>

                          <div class="en__box">
                            <span class="en__btitle font-thai">คาดการณ์ความหนาแน่น <em>(FORECAST)</em></span>
                            <span class="en__legend"><i class="is-green" />Real-time<i class="is-orange" />Predicted</span>
                            <div class="en__plot">
                              <span class="en__yaxis"><em style="--i:0">228</em><em style="--i:1">171</em><em style="--i:2">114</em><em style="--i:3">57</em><em style="--i:4">0</em></span>
                              <span class="en__svgwrap">
                              <svg viewBox="0 0 260 96" preserveAspectRatio="none" aria-hidden="true">
                                <g stroke="rgba(255,255,255,0.06)" stroke-width="0.8">
                                  <line x1="0" y1="24" x2="260" y2="24" /><line x1="0" y1="48" x2="260" y2="48" /><line x1="0" y1="72" x2="260" y2="72" />
                                </g>
                                <line x1="0" y1="95.2" x2="260" y2="95.2" stroke="rgba(255,255,255,0.18)" stroke-width="0.9" vector-effect="non-scaling-stroke" />
                                <path :d="enRealArea" fill="url(#enTrendFill)" mask="url(#enFadeMask)" />
                                <line x1="125" y1="0" x2="125" y2="95.2" stroke="#ECB731" stroke-width="1" stroke-dasharray="3 3" opacity="0.85" vector-effect="non-scaling-stroke" />
                                <path :d="enRealLine" fill="none" stroke="#8EC06C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
                                <path :d="enPredLine" fill="none" stroke="#ECB731" stroke-width="1.8" stroke-dasharray="5 4" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
                              </svg>
                              <i class="en__dot" :style="{ top: enRealTop }" />
                              </span>
                              <span class="en__now font-thai">ตอนนี้</span>
                              <span class="en__peak font-thai">คาดการณ์จุดพีค<br /><b>14:00 - 15:00</b></span>
                            </div>
                            <div class="en__xaxis"><em>00:00</em><em>06:00</em><em>12:00</em><em>18:00</em><em>21:00</em></div>
                          </div>

                          <div class="en__box">
                            <span class="en__btitle font-thai">พฤติกรรมการใช้งานวันนี้ <em>(TIME × CAMERA)</em></span>
                            <div class="en__heat">
                              <div v-for="r in enHeatRows" :key="r.label" class="en__heatrow">
                                <span>{{ r.label }}</span>
                                <span class="en__cells"><i v-for="(c, i) in r.cells" :key="`${r.label}${i}`" :style="{ background: c }" /></span>
                              </div>
                            </div>
                            <div class="en__xaxis en__xaxis--heat"><em>00:00</em><em>06:00</em><em>12:00</em><em>18:00</em><em>21:00</em></div>
                            <span class="en__scale font-thai">น้อย<i />มาก</span>
                          </div>

                          <div class="en__box">
                            <span class="en__btitle font-thai">การเลือกหนังสือแยกตามหมวดหมู่</span>
                            <ul class="en__bars font-thai">
                              <li v-for="b in enCompare" :key="b.label">
                                <span>{{ b.label }}</span>
                                <span class="en__track"><i :style="{ width: b.value + '%', background: b.color }" /></span>
                                <em>{{ b.value }}%</em>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </section>
                    </div>

                    <!-- ═══ พลังงานของอาคารทั้งวัน ═══ -->
                    <div class="en__block en__block--power">
                      <div class="en__phead">
                        <span class="en__chip font-thai">ทั้งอาคาร</span>
                        <span class="en__date"><i>‹</i><b>{{ enDate }}</b><i>›</i></span>
                        <span class="en__chip en__chip--ghost">Booking</span>
                      </div>
                      <div class="en__plot en__plot--power">
                        <span class="en__yaxis en__yaxis--6"><em style="--i:0">250</em><em style="--i:1">200</em><em style="--i:2">150</em><em style="--i:3">100</em><em style="--i:4">50</em><em style="--i:5">0</em></span>
                        <svg viewBox="0 0 640 62" preserveAspectRatio="none" aria-hidden="true">
                          <path :d="enPowerArea" fill="url(#enPowerFill)" />
                          <path :d="enPowerLine" fill="none" stroke="#ECB731" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
                          <line x1="0" y1="50.6" x2="640" y2="50.6" stroke="#ECB731" stroke-width="1" stroke-dasharray="5 4" opacity="0.55" vector-effect="non-scaling-stroke" />
                          <circle :cx="enPowerPeak.x" :cy="enPowerPeak.y" r="3.2" fill="#ED1B2E" />
                          <defs>
                            <linearGradient id="enPowerFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stop-color="#ECB731" stop-opacity="0.38" />
                              <stop offset="100%" stop-color="#ECB731" stop-opacity="0" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div class="en__pfoot">
                        <span class="en__xaxis en__xaxis--power"><em>00.00</em><em>06.00</em><em>12.00</em><em>18.00</em><em>24.00</em></span>
                        <span class="en__chip en__chip--ghost">Total <span v-count="{ to: enPower }">0</span> kWh</span>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              <span class="laptop__base" aria-hidden="true"><i class="laptop__notch" /></span>
            </div>
          </div>

          <div v-else class="showcase-body" :class="{ 'showcase-body--split': sc.phone }">
            <ul class="purpose-grid" :style="{ '--cols': sc.phone ? 1 : sc.cards.length }">
              <li v-for="(c, i) in sc.cards" :key="c.title" class="pcard" v-reveal:zoom="i * 90">
                <span class="pcard__glow" :style="{ background: c.color }" />
                <span class="pcard__icon" :style="{ color: c.color, borderColor: c.color + '55' }" v-html="c.icon" />
                <h3>{{ c.title }}</h3>
                <p class="font-thai">{{ c.note }}</p>
              </li>
            </ul>

            <!-- ภาพจำลองแอป MOMAY STUDENT — สองเครื่องเอียงสวนกันแบบภาพตัวอย่าง -->
            <div v-if="sc.phone" class="phone-duo" v-reveal:right="180">
            <div class="phone phone--front">
              <span class="phone__notch" aria-hidden="true" />
              <span class="phone__btn phone__btn--power" aria-hidden="true" />
              <span class="phone__btn phone__btn--vol" aria-hidden="true" />
              <div class="phone__screen phone__screen--library">
                <img class="mockup-image" src="/momay/Student_Lib.png" alt="MOMAY Student library dashboard" />
                <div class="phone__top">
                  <span class="phone__brand">
                    <i class="phone__avatar">M</i>
                    <b>MOMAY</b><em>STUDENT</em>
                  </span>
                  <span class="phone__meta">
                    <em>{{ clockShort }}</em>
                    <i class="phone__chip">TH</i>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8.6a6 6 0 1 0-12 0c0 6-2 7.4-2 7.4h16s-2-1.4-2-7.4"/><path d="M10.4 19.5a2 2 0 0 0 3.2 0"/></svg>
                  </span>
                </div>

                <div class="phone__hello font-thai">
                  <b>สวัสดีครับ 👋</b>
                  <small>วันนี้จะใช้พื้นที่ไหน?</small>
                </div>

                <div class="phone__body font-thai">
                  <span class="phone__label">บริการรายชั้น</span>
                  <ul class="phone__list">
                    <li v-for="f in studentFloors" :key="f.floor" :class="{ 'is-open': openFloor === f.floor }">
                      <button type="button" class="phone__row" @click="toggleFloor(f.floor)">
                        <span class="phone__mix">
                          <i v-for="c in floorMix(f)" :key="c" :style="{ background: c }" />
                        </span>
                        <span class="phone__floor">ชั้น <b>{{ f.floor }}</b></span>
                        <span class="phone__info">
                          <b :class="{ 'is-live': f.open }">{{ f.title }}</b>
                          <small>{{ floorNote(f) }}</small>
                        </span>
                        <svg class="phone__go" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>
                      </button>

                      <!-- กดแล้วกางดูที่นั่งของแต่ละพื้นที่ -->
                      <ul v-if="openFloor === f.floor" class="phone__zones">
                        <li v-for="z in f.zones" :key="z.name">
                          <span class="phone__zicon" :style="{ color: purposeOf(z.kind).color }" v-html="purposeOf(z.kind).icon" />
                          <span class="phone__info">
                            <b>{{ z.name }}</b>
                            <small>{{ z.hours }}</small>
                          </span>
                          <span class="phone__seats">
                            <b><span v-count="{ to: z.used }">0</span>/{{ z.total }} <em>ที่นั่ง</em></b>
                            <small>จำนวนที่ใช้งานอยู่</small>
                          </span>
                        </li>
                      </ul>
                    </li>
                    <li class="phone__park">
                      <button type="button" class="phone__row">
                        <span class="phone__kind" style="color: #56A0D3; border-color: #56A0D355">
                          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="3"/><path d="M8 12h5.5a2 2 0 1 0 0-4H8v8"/></svg>
                        </span>
                        <span class="phone__floor phone__floor--icon">
                          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 15.5h16M6.5 15.5V19H4.8v-3.5M19.2 15.5V19h-1.7v-3.5"/><path d="M5.4 15.5l1.5-4.6A2 2 0 0 1 8.8 9.5h6.4a2 2 0 0 1 1.9 1.4l1.5 4.6"/><circle cx="7.6" cy="12.9" r="0.9" fill="currentColor" stroke="none"/><circle cx="16.4" cy="12.9" r="0.9" fill="currentColor" stroke="none"/></svg>
                        </span>
                        <span class="phone__info">
                          <b>ที่จอดรถ</b>
                          <small>เช็กที่จอดว่างแบบเรียลไทม์</small>
                        </span>
                        <svg class="phone__go" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>
                      </button>
                    </li>
                  </ul>
                  <span class="phone__label">ภาพรวมวันนี้</span>
                </div>
                <div class="phone__fade" aria-hidden="true" />

                <nav class="phone__tabs font-thai">
                  <span v-for="(t, i) in phoneTabs" :key="t.label" :class="{ 'is-on': i === 0 }">
                    <i v-html="t.icon" />
                    {{ t.label }}
                  </span>
                </nav>
              </div>
            </div>


            <!-- เครื่องกลาง: ผิว 8-bit ของ MOMAY STUDENT PIXEL
                 ยกจานสี กรอบเหลี่ยม และเงาแข็งมาจาก BuuStudent8bit.jsx -->
            <div class="phone phone--pixel" aria-hidden="true">
              <span class="phone__notch" aria-hidden="true" />
              <span class="phone__btn phone__btn--power" aria-hidden="true" />
              <span class="phone__btn phone__btn--vol" aria-hidden="true" />
              <div class="phone__screen px phone__screen--library">
                <img class="mockup-image" src="/momay/Student_pixel_Lib.png" alt="MOMAY Student Pixel library dashboard" />
                <div class="px__top">
                  <span class="px__brand">
                    <i class="px__avatar">M</i>
                    <b>MOMAY</b><em>PIXEL</em>
                  </span>
                  <span class="px__time">{{ clockShort }}</span>
                </div>

                <p class="px__hello font-thai">
                  วันนี้จะมาทำอะไร<b>?</b>
                </p>

                <ul class="px__acts font-thai">
                  <li v-for="a in pixelActs" :key="a.en" :style="{ '--c': a.color }">
                    <i class="px__glyph"><span v-for="n in 9" :key="n" :class="{ 'is-on': a.bits[n - 1] === '1' }" /></i>
                    <b>{{ a.th }}</b>
                    <small>{{ a.en }}</small>
                  </li>
                </ul>

                <span class="px__label font-thai">ที่นั่งว่างตอนนี้</span>

                <ul class="px__rooms font-thai">
                  <li v-for="r in pixelRooms" :key="r.name" :style="{ '--c': r.color }">
                    <span class="px__floor">{{ r.floor }}</span>
                    <span class="px__rinfo">
                      <b>{{ r.name }}</b>
                      <small>{{ r.note }}</small>
                    </span>
                    <span class="px__meter"><i v-for="n in 8" :key="n" :class="{ 'is-on': n <= r.on }" /></span>
                    <span class="px__free">{{ r.free }}</span>
                  </li>
                </ul>

                <span class="px__cta font-thai">จองที่นั่ง</span>
              </div>
            </div>

            <!-- เครื่องขวา: แท็บเล็ตของแอปประชาชน MOMAY CITIZEN -->
            <div class="tablet" aria-hidden="true">
              <span class="tablet__cam" />
              <div class="tablet__screen cz">
                <img class="mockup-image mockup-image--citizen" src="/momay/ciztizen2.png" alt="MOMAY Citizen dashboard" />
                <aside class="cz__rail">
                  <span class="cz__logo">M</span>
                  <ul class="cz__nav">
                    <li v-for="(n, i) in czNav" :key="n" :class="{ 'is-on': i === 0 }" v-html="n" />
                  </ul>
                </aside>

                <div class="cz__main">
                  <div class="cz__top">
                    <span class="cz__search font-thai">ค้นหาสถานที่ ร้านค้า กิจกรรม…</span>
                    <span class="cz__wx">29°C</span>
                    <span class="cz__time">08:24</span>
                  </div>

                  <div class="cz__hero font-thai">
                    <b>วันนี้…<br />คุณอยากทำอะไร?</b>
                    <small>ให้ MOMAY แนะนำพื้นที่ที่เหมาะกับคุณ จากสถานการณ์จริงของเมือง</small>
                    <em>Same City<br />A Better Day</em>
                  </div>

                  <ul class="cz__cats font-thai">
                    <li v-for="(c, i) in czCats" :key="c.th" :class="{ 'is-on': i === 0 }" :style="{ '--c': c.color }">
                      <i v-html="c.icon" />
                      <b>{{ c.th }}</b>
                      <small>{{ c.note }}</small>
                    </li>
                  </ul>

                  <div class="cz__row">
                    <div class="cz__box font-thai">
                      <span class="cz__btitle">สถานการณ์ในขณะนี้<i class="live"><i />Live</i></span>
                      <ul class="cz__stats">
                        <li v-for="st in czStats" :key="st.label" :style="{ '--c': st.color }">
                          <small>{{ st.label }}</small>
                          <b>{{ st.value }}</b>
                          <em>{{ st.note }}</em>
                        </li>
                      </ul>
                    </div>

                    <div class="cz__map">
                      <div class="cz__stage">
                        <svg viewBox="0 0 320 200" preserveAspectRatio="none" aria-hidden="true">
                          <path d="M-10 78C42 92 76 128 130 138S234 130 330 158" fill="none"
                                stroke="#16405f" stroke-width="18" stroke-linecap="round" />
                          <g stroke="rgba(180,208,238,0.14)" fill="none" stroke-width="1.3">
                            <path d="M-10 116C48 104 96 68 168 64S276 82 330 60" />
                            <path d="M28 -10 46 210M114 -10 98 210M202 -10 216 210M278 -10 268 210" />
                          </g>
                        </svg>
                        <span v-for="(pn, i) in czPins" :key="`cp${i}`" class="cz__pin"
                              :style="{ left: pn.x, top: pn.y, '--c': pn.color }" />
                        <span v-for="pl in czSpots" :key="pl.name" class="cz__spot font-thai"
                              :style="{ left: pl.x, top: pl.y }">{{ pl.name }}</span>
                        <ul class="cz__legend font-thai">
                          <li v-for="l in czLegend" :key="l.name" :style="{ '--c': l.color }"><i />{{ l.name }}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <span class="cz__btitle cz__btitle--rec font-thai">MOMAY แนะนำสำหรับคุณ<em>เหมาะกับช่วงเวลานี้</em></span>
                  <ul class="cz__recs font-thai">
                    <li v-for="r in czPlaces" :key="r.name" :style="{ '--c': r.color }">
                      <span class="cz__thumb"><i v-if="r.tag">{{ r.tag }}</i></span>
                      <b>{{ r.name }}</b>
                      <small>{{ r.note }}</small>
                      <em>{{ r.time }}</em>
                    </li>
                  </ul>

                  <p class="cz__foot">
                    <b>MOMAY</b>
                    <span class="font-thai">CITIZEN · เทศบาลนครพิษณุโลก</span>
                    <em>People × Spaces × Better Tomorrows</em>
                  </p>
                </div>
              </div>
            </div>
            </div>
          </div>

          <div class="center" v-reveal="120">
            <button type="button" class="mm-btn mm-btn--lg mm-btn--section" :style="{ '--accent': sc.color }"
                    v-magnetic @click="open(sc.link)">
              {{ sc.cta }}
            </button>
          </div>
        </div>
      </section>

      <!-- เส้นคั่นระหว่างผลิตภัณฑ์ -->
      <div v-if="si < showcases.length - 1" class="hr-space" aria-hidden="true">
        <svg viewBox="0 0 1200 90" preserveAspectRatio="none">
          <ellipse cx="600" cy="90" rx="300" ry="24" fill="url(#hrGlow)" />
          <path d="M0 62 Q 600 24 1200 62" fill="none" stroke="url(#hrLine)" stroke-width="1.7" />
        </svg>
        <span class="hr-space__star" style="--x:24%; --y:-40px; --d:0.6s" />
        <span class="hr-space__star" style="--x:52%; --y:-56px; --d:1.9s" />
        <span class="hr-space__star" style="--x:76%; --y:-38px; --d:3.1s" />
      </div>
    </template>


    <!-- เส้นคั่นแบบขอบฟ้าอวกาศ -->
    <div class="hr-space" aria-hidden="true">
      <svg viewBox="0 0 1200 90" preserveAspectRatio="none">
        <ellipse cx="600" cy="90" rx="300" ry="24" fill="url(#hrGlow)" />
        <path d="M0 62 Q 600 24 1200 62" fill="none" stroke="url(#hrLine)" stroke-width="1.7" />
      </svg>
      <span class="hr-space__star" style="--x:18%; --y:-34px; --d:0s" />
      <span class="hr-space__star" style="--x:37%; --y:-52px; --d:1.4s" />
      <span class="hr-space__star" style="--x:63%; --y:-44px; --d:2.6s" />
      <span class="hr-space__star" style="--x:81%; --y:-58px; --d:3.7s" />
    </div>

    <!-- ───────────────── FROM DATA TO AWARENESS ───────────────── -->
    <section id="approach" class="section section--flow">
      <svg class="flow__waves" viewBox="0 0 1200 260" preserveAspectRatio="none" aria-hidden="true">
        <g fill="none" stroke="#ED1B2E" stroke-width="1">
          <path v-for="(w, i) in 9" :key="`w${w}`" class="wave" :style="{ '--i': i }"
                :d="`M0 ${40 + i * 22} C 220 ${10 + i * 20}, 420 ${120 + i * 16}, 660 ${70 + i * 18} S 1000 ${20 + i * 20}, 1200 ${60 + i * 18}`"
                :opacity="0.05 + i * 0.03" />
        </g>
      </svg>

      <div class="wrap">
        <p class="kicker" v-reveal>OUR APPROACH</p>
        <h2 class="h2" v-split="24">FROM DATA TO AWARENESS</h2>
        <p class="lead font-thai" v-reveal="160">
          {{ noSplit('กระบวนการเปลี่ยนข้อมูลให้เป็นความเข้าใจ และนำไปสู่การตัดสินใจที่ดีกว่า') }}
        </p>

        <ol class="flow">
          <li v-for="(s, i) in steps" :key="s.title" class="flow__step" :style="{ '--i': i }" v-reveal="i * 120">
            <span class="flow__ring" :style="{ color: s.color, borderColor: s.color }">
              <span class="flow__pulse" :style="{ borderColor: s.color }" />
              <span v-html="s.icon" />
            </span>
            <svg v-if="i < steps.length - 1" class="flow__arrow" viewBox="0 0 48 16" aria-hidden="true">
              <path class="flow__track" d="M2 8h38" stroke="#ED1B2E" stroke-width="1.6" opacity="0.35" />
              <path class="flow__spark" d="M2 8h38" :stroke="steps[i + 1].color" stroke-width="2.2" stroke-linecap="round" />
              <path class="flow__head" d="M36 3l6 5-6 5" fill="none" stroke="#ED1B2E" stroke-width="1.6" opacity="0.8" />
            </svg>
            <h3>{{ s.title }}</h3>
            <p class="font-thai">{{ s.note }}</p>
          </li>
        </ol>
      </div>
    </section>


    <!-- เส้นคั่นแบบขอบฟ้าอวกาศ -->
    <div class="hr-space" aria-hidden="true">
      <svg viewBox="0 0 1200 90" preserveAspectRatio="none">
        <ellipse cx="600" cy="90" rx="300" ry="24" fill="url(#hrGlow)" />
        <path d="M0 62 Q 600 24 1200 62" fill="none" stroke="url(#hrLine)" stroke-width="1.7" />
      </svg>
      <span class="hr-space__star" style="--x:18%; --y:-34px; --d:0s" />
      <span class="hr-space__star" style="--x:37%; --y:-52px; --d:1.4s" />
      <span class="hr-space__star" style="--x:63%; --y:-44px; --d:2.6s" />
      <span class="hr-space__star" style="--x:81%; --y:-58px; --d:3.7s" />
    </div>

    <!-- ───────────────── PRODUCTS ───────────────── -->
    <section id="products" class="section section--products">
      <div class="wrap">
        <p class="kicker" v-reveal>SEE MOMAY IN ACTION</p>
        <h2 class="h2" v-split="24">EXPLORE OUR PRODUCTS</h2>

        <div class="products" :style="{ '--cols': productCols, '--cols-md': productColsMd }">
          <article v-for="(p, i) in visibleProducts" :key="p.name" class="product" v-reveal="i * 140"
                   :style="{ '--accent': p.color, '--sweep-delay': `${i * -1.2}s` }" @click="open(p.link)">
            <div class="product__body">
              <h3 class="product__name">{{ p.name }}</h3>
              <p class="product__tag">{{ p.tagline }}</p>
              <p class="product__note font-thai">{{ p.note }}</p>
              <span class="product__link">VIEW DEMO</span>
            </div>
            <!-- ภาพประกอบ SVG: ลอยขึ้นลง วาดเส้น และไล่ขึ้นทีละชั้นเมื่อเลื่อนมาถึง -->
            <div class="product__art" v-html="p.art" />
          </article>
        </div>
      </div>
    </section>

    <!-- เส้นคั่นก่อนเข้าส่วนองค์กรที่ใช้งาน -->
    <div class="hr-space" aria-hidden="true">
      <svg viewBox="0 0 1200 90" preserveAspectRatio="none">
        <ellipse cx="600" cy="90" rx="300" ry="24" fill="url(#hrGlow)" />
        <path d="M0 62 Q 600 24 1200 62" fill="none" stroke="url(#hrLine)" stroke-width="1.7" />
      </svg>
      <span class="hr-space__star" style="--x:21%; --y:-36px; --d:0.4s" />
      <span class="hr-space__star" style="--x:46%; --y:-54px; --d:1.7s" />
      <span class="hr-space__star" style="--x:69%; --y:-42px; --d:2.9s" />
      <span class="hr-space__star" style="--x:86%; --y:-56px; --d:3.5s" />
    </div>

    <!-- ───────────────── TRUSTED BY ───────────────── -->
    <section id="trusted" class="section section--trusted">
      <div class="wrap">
        <p class="kicker" v-reveal>TRUSTED BY ORGANIZATIONS</p>

        <div class="mm-carousel" @mouseenter="pauseAuto = true" @mouseleave="pauseAuto = false">
          <button v-if="pageCount > 1" type="button" class="mm-carousel__nav mm-carousel__nav--prev" aria-label="ก่อนหน้า" @click="slide(-1)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>

          <div class="mm-carousel__viewport">
            <ul class="mm-carousel__track" :style="{ transform: `translate3d(-${page * 100}%, 0, 0)` }">
              <li v-for="(o, i) in orgs" :key="o.name" class="org" :style="{ '--per': perView }" v-reveal="(i % 8) * 60">
                <span class="org__crest">
                  <img :src="o.logo" :alt="o.name" loading="lazy" decoding="async" />
                </span>
                <span class="org__name font-thai">{{ o.name }}</span>
              </li>
            </ul>
          </div>

          <button v-if="pageCount > 1" type="button" class="mm-carousel__nav mm-carousel__nav--next" aria-label="ถัดไป" @click="slide(1)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div v-if="pageCount > 1" class="dots">
          <button v-for="d in pageCount" :key="`d${d}`" type="button" class="dot"
                  :class="{ 'is-active': page === d - 1 }" :aria-label="`หน้า ${d}`" @click="page = d - 1" />
        </div>
      </div>
    </section>


    <!-- เส้นคั่นแบบขอบฟ้าอวกาศ -->
    <div class="hr-space" aria-hidden="true">
      <svg viewBox="0 0 1200 90" preserveAspectRatio="none">
        <ellipse cx="600" cy="90" rx="300" ry="24" fill="url(#hrGlow)" />
        <path d="M0 62 Q 600 24 1200 62" fill="none" stroke="url(#hrLine)" stroke-width="1.7" />
      </svg>
      <span class="hr-space__star" style="--x:18%; --y:-34px; --d:0s" />
      <span class="hr-space__star" style="--x:37%; --y:-52px; --d:1.4s" />
      <span class="hr-space__star" style="--x:63%; --y:-44px; --d:2.6s" />
      <span class="hr-space__star" style="--x:81%; --y:-58px; --d:3.7s" />
    </div>

    <!-- ───────────────── CTA ───────────────── -->
    <section id="contact" class="section section--cta">
      <svg class="cta__city" viewBox="0 0 1200 380" preserveAspectRatio="none" aria-hidden="true">
        <g stroke="#ED1B2E" stroke-width="1" opacity="0.28">
          <path v-for="(l, i) in 14" :key="`cl${l}`" class="cta__ray" :style="{ '--i': i }"
                :d="`M${i * 92} 380 L${i * 92 + 60} 200`" />
        </g>
      </svg>

      <div class="wrap cta">
        <div class="cta__copy">
          <h2 class="h2 h2--left">
            <span class="line"><span class="line__in" v-split="22">LET&apos;S BUILD A SMARTER FUTURE</span></span>
            <span class="line"><span class="line__in line__in--red" v-split="22" style="--d:260ms">TOGETHER.</span></span>
          </h2>
          <p class="font-thai cta__thai" v-reveal="140">
            พูดคุยกับทีมงานเพื่อค้นหาวิธีที่ MOMAY<br />สามารถช่วยองค์กรของคุณได้
          </p>
          <div class="cta__actions" v-reveal="220">
            <button type="button" class="mm-btn mm-btn--solid mm-btn--lg" v-magnetic @click="contactOpen = true">
              CONTACT
              <svg class="mm-btn__arrow mm-btn__arrow--tel" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.2 3.5l2.4 4.2-2 1.9a12 12 0 0 0 6.8 6.8l1.9-2 4.2 2.4-.8 3a2 2 0 0 1-2.2 1.4C10.2 20.1 3.9 13.8 3 6.5A2 2 0 0 1 4.4 4.3z" />
              </svg>
            </button>
            <button type="button" class="mm-btn mm-btn--ghost mm-btn--lg" v-magnetic @click="docOpen = true">
              <svg class="mm-btn__doc" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 3H7.5A2.5 2.5 0 0 0 5 5.5v13A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V8z" />
                <path d="M14 3v5h5" />
                <path d="M8.6 12.5h6.8M8.6 16h4.6" />
              </svg>
              DOCUMENT
            </button>
          </div>
        </div>

        <ul class="cta__list">
          <li v-for="(b, i) in benefits" :key="b.title" v-reveal:right="i * 130">
            <span class="cta__hex" v-html="b.icon" />
            <span>
              <b>{{ b.title }}</b>
              <small class="font-thai">{{ b.note }}</small>
            </span>
          </li>
        </ul>
      </div>
    </section>

    <!-- ───────────────── FOOTER ───────────────── -->
    <footer class="mm-footer">
      <div class="wrap mm-footer__inner">
        <a class="brand" href="#top" @click.prevent="goTo('#top')">
          <img class="brand__mark" src="/MOMAY_mark.png" alt="" aria-hidden="true" />
          <span class="brand__text">
            <strong>MOMAY</strong>
            <small>BEHAVIORAL INTELLIGENCE PLATFORM</small>
          </span>
        </a>

      </div>
      <p class="mm-footer__copy">© {{ year }} Kwang Unlimit Company Limited. All rights reserved.</p>
    </footer>

    <!-- ───────────────── CUSTOMER MAP POPUP ───────────────── -->
    <Transition name="mapfx">
      <div v-if="customersOpen" class="lightbox lightbox--map" @click="customersOpen = false">
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
                <button v-for="(c, i) in customerPins" :key="c.name" type="button" class="thpin"
                        :class="{ 'is-active': activePin === i }"
                        :style="{ left: `${(c.x / 400) * 100}%`, top: `${(c.y / 760) * 100}%`, '--d': `${i * 0.4}s`, '--in': `${1.9 + (c.y / 760) * 1.1}s` }"
                        @mouseenter="activePin = i" @focus="activePin = i" @click.stop="activePin = i">
                  <span class="thpin__spot" />
                  <span class="thpin__beam" />
                  <span class="thpin__flag font-thai">
                    <b>{{ c.name }}</b>
                    <small>{{ c.province }}</small>
                  </span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Transition>

    <!-- ───────────────── CONTACT POPUP ───────────────── -->
    <Transition name="fade">
      <div v-if="contactOpen" class="lightbox lightbox--contact" @click.self="contactOpen = false">
        <div class="contactcard">
          <button type="button" class="lightbox__close contactcard__close" aria-label="ปิด" @click="contactOpen = false">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
          </button>
          <span class="contactcard__eyebrow">CONTACT</span>
          <h3 class="font-thai">พูดคุยกับทีม MOMAY</h3>
          <p class="font-thai">โทรหาเราได้โดยตรง</p>

          <a class="contactcard__tel" :href="`tel:${CONTACT.telHref}`">
            <span class="contactcard__ticon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 3.5l2.4 4.2-2 1.9a12 12 0 0 0 6.8 6.8l1.9-2 4.2 2.4-.8 3a2 2 0 0 1-2.2 1.4C10.2 20.1 3.9 13.8 3 6.5A2 2 0 0 1 4.4 4.3z" /></svg>
            </span>
            <b>{{ CONTACT.tel }}</b>
          </a>

        </div>
      </div>
    </Transition>

    <!-- ───────────────── DOCUMENT LIGHTBOX ───────────────── -->
    <Transition name="fade">
      <div v-if="docOpen" class="lightbox lightbox--doc" @click.self="docOpen = false">
        <button type="button" class="lightbox__close" aria-label="ปิด" @click="docOpen = false">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
        </button>
        <div class="lightbox__doc" @click.self="docOpen = false">
          <img :src="DOC_SRC" alt="MOMAY — Behavioral Intelligence Platform document" />
        </div>
        <a class="mm-btn mm-btn--ghost lightbox__open" :href="DOC_SRC" :download="DOC_NAME">
          ดาวน์โหลดเอกสาร
          <svg class="mm-btn__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19.5h14" /></svg>
        </a>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

useHead({
  title: 'MOMAY — Behavioral Intelligence Platform',
  meta: [
    { name: 'description', content: 'MOMAY เปลี่ยนข้อมูลพฤติกรรมการใช้พื้นที่ให้กลายเป็นความเข้าใจ เพื่อการตัดสินใจที่ดีกว่า' },
  ],
})

/* ══════════════ 1. เครื่องมือ animation ตอนเลื่อนหน้า ══════════════ */
// สังเกตการณ์ตัวเดียวใช้ร่วมกันทั้งหน้า (reveal + นับตัวเลข)
let io = null
const waiting = []
const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const observe = (el) => (io ? io.observe(el) : waiting.push(el))

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

// นับตัวเลขขึ้นจาก from → to
const runCount = (el, from, to, decimals, duration = 1400) => {
  const fmt = (n) =>
    n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  if (reduceMotion()) {
    el.textContent = fmt(to)
    return
  }
  cancelAnimationFrame(el._countRaf)
  const t0 = performance.now()
  const tick = (now) => {
    const p = Math.min(1, Math.max(0, (now - t0) / duration))
    el.textContent = fmt(from + (to - from) * easeOutCubic(p))
    el._shown = from + (to - from) * easeOutCubic(p)
    if (p < 1) el._countRaf = requestAnimationFrame(tick)
    else el._shown = to
  }
  el._countRaf = requestAnimationFrame(tick)
}

const onIntersect = (entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return
    const el = entry.target
    // รอให้เบราว์เซอร์วาดสถานะเริ่มต้น (จาง/เลื่อนลง) ก่อนหนึ่งเฟรม
    // ไม่งั้นของที่อยู่ในจอตั้งแต่เปิดหน้าจะข้ามทรานซิชันไปโผล่ทันที
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.classList.add('is-in')
      if (el._count) runCount(el, 0, el._count.to, el._count.decimals || 0)
    }))
    el._seen = true
    io.unobserve(el)
  })
}

/* ── ลูกเล่นตัวหนังสือ ─────────────────────────────────────────── */
// ตัดข้อความเป็นตัวอักษรแบบไม่ทำสระ/วรรณยุกต์ไทยหลุด
const graphemes = (text) => {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    return Array.from(new Intl.Segmenter('th', { granularity: 'grapheme' }).segment(text), (s) => s.segment)
  }
  return Array.from(text)
}

// v-split="ระยะห่างต่อตัวอักษร(ms)" — ไล่ตัวอักษรขึ้นทีละตัว
const vSplit = {
  mounted(el, binding) {
    const text = (el.textContent || '').trim()
    const step = Number(binding.value) || 30
    // สไตล์ของไฟล์นี้เป็น scoped — span ที่สร้างด้วย JS ต้องติดแอตทริบิวต์สโคปด้วย
    // ไม่งั้นกฎ .split__ch จะไม่จับ ตัวอักษรก็จะโผล่มาเฉย ๆ ไม่มีทรานซิชัน
    const scopeAttr = Array.from(el.attributes).find((a) => a.name.startsWith('data-v-'))
    el.textContent = ''
    el.classList.add('split')
    // ตัวอักษรแต่ละตัวเป็น inline-block เบราว์เซอร์จึงขึ้นบรรทัดใหม่ตรงไหนก็ได้ รวมถึงกลางคำ
    // บนจอแนวตั้งที่แคบ หัวเรื่องเลยขาดเป็น "SEE WHA / T" — ห่อทีละคำไว้ก่อน
    // บรรทัดจะตัดได้เฉพาะตรงช่องว่างเหมือนข้อความปกติ
    let i = 0
    const makeCh = () => {
      const s = document.createElement('span')
      s.className = 'split__ch'
      if (scopeAttr) s.setAttribute(scopeAttr.name, '')
      s.style.setProperty('--i', i++)
      s.style.setProperty('--step', `${step}ms`)
      return s
    }
    text.split(' ').forEach((word, wi) => {
      if (wi > 0) {
        const sp = makeCh()
        sp.classList.add('split__ch--space')
        sp.innerHTML = '&nbsp;'
        el.appendChild(sp)
      }
      if (!word) return
      const w = document.createElement('span')
      w.className = 'split__word'
      if (scopeAttr) w.setAttribute(scopeAttr.name, '')
      graphemes(word).forEach((g) => {
        const s = makeCh()
        s.textContent = g
        w.appendChild(s)
      })
      el.appendChild(w)
    })
    observe(el)
  },
  unmounted(el) { io && io.unobserve(el) },
}

// v-magnetic — ปุ่มไหลตามเมาส์เล็กน้อยแล้วค่อย ๆ กลับที่เดิม
const vMagnetic = {
  mounted(el) {
    if (reduceMotion()) return
    const strength = 0.16
    const cap = 10 // จำกัดระยะไม่ให้ปุ่มหนีมือ
    const clamp = (n) => Math.max(-cap, Math.min(cap, n))
    el._magMove = (e) => {
      if (window.innerWidth < 976) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${clamp((e.clientX - r.left - r.width / 2) * strength).toFixed(2)}px`)
      el.style.setProperty('--my', `${clamp((e.clientY - r.top - r.height / 2) * strength).toFixed(2)}px`)
    }
    el._magLeave = () => {
      el.style.setProperty('--mx', '0px')
      el.style.setProperty('--my', '0px')
    }
    el.addEventListener('mousemove', el._magMove)
    el.addEventListener('mouseleave', el._magLeave)
  },
  unmounted(el) {
    el.removeEventListener('mousemove', el._magMove)
    el.removeEventListener('mouseleave', el._magLeave)
  },
}

// v-reveal / v-reveal:left|right|zoom|lines="ดีเลย์(ms)"
const vReveal = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.arg) el.classList.add(`reveal--${binding.arg}`)
    const delay = Number(binding.value || 0)
    if (delay) el.style.transitionDelay = `${delay}ms`
    observe(el)
  },
  unmounted(el) {
    io && io.unobserve(el)
  },
}

// v-count="{ to, decimals }" — เริ่มนับเมื่อเลื่อนมาถึง และวิ่งตามค่าใหม่เมื่อข้อมูลอัปเดต
const vCount = {
  mounted(el, binding) {
    el._count = { to: Number(binding.value.to) || 0, decimals: Number(binding.value.decimals) || 0 }
    el.textContent = (0).toFixed(el._count.decimals)
    observe(el)
  },
  updated(el, binding) {
    const to = Number(binding.value.to) || 0
    if (!el._seen || to === el._count.to) {
      el._count.to = to
      return
    }
    const from = typeof el._shown === 'number' ? el._shown : 0
    el._count.to = to
    runCount(el, from, to, el._count.decimals, 700)
  },
  unmounted(el) {
    cancelAnimationFrame(el._countRaf)
    io && io.unobserve(el)
  },
}

/* ══════════════ 2. สถานะการเลื่อนหน้า / พารัลแลกซ์ ══════════════ */
const scrolled = ref(false)
const scrollProgress = ref(0)
const heroY = ref(0)
const heroReady = ref(false)
const docOpen = ref(false)
const contactOpen = ref(false)
const customersOpen = ref(false)
const activePin = ref(0)
const mapPath = ref(null)
/* การ์ดคู่ของแต่ละ section — '' คือกว้างเท่ากัน ส่วน 'front'/'back' คือใบที่กดให้ขยาย
   กดใบเดิมซ้ำจะกลับไปเท่ากัน จะได้เทียบสองหน้าจอข้างกันได้ด้วย */
const stackOpen = reactive({ enlightened: '', brief: '' })
const toggleStack = (key, which) => {
  stackOpen[key] = stackOpen[key] === which ? '' : which
}

/* ภาษาไทยไม่มีช่องว่างระหว่างคำ เบราว์เซอร์จึงเดาที่ตัดเองแล้วมักได้คำขาดกลางคำ
   เชื่อมอักษรไทยที่ติดกันด้วย word joiner (U+2060) เพื่อให้ขึ้นบรรทัดใหม่ได้เฉพาะตรงช่องว่างจริง */
// สระบน/ล่าง กับวรรณยุกต์ ต้องเกาะอยู่กับพยัญชนะตัวหน้า ห้ามเอา word joiner ไปคั่น
// ไม่งั้น iOS จะมองว่าเป็นเครื่องหมายลอย ๆ แล้ววาดวงกลมประจุดให้แทน หน้าจอเลยเห็นเป็นจุดดำ
const THAI_COMBINING = 'ัำ-ฺ็-๎'
const noSplit = (text) =>
  text.replace(new RegExp(`([฀-๿])(?![${THAI_COMBINING}])(?=[฀-๿])`, 'g'), '$1⁠')

// วัดความยาวเส้นขอบจริงก่อน แล้วค่อยปล่อยให้เส้นวิ่งวาดทีละส่วน
watch(customersOpen, async (open) => {
  if (!open) return
  await nextTick()
  const el = mapPath.value
  if (!el) return
  el.style.setProperty('--len', el.getTotalLength())
  el.classList.add('is-drawing')
})

// เส้นขอบประเทศไทยแบบลายเส้น (วาดโดยประมาณให้พอจำรูปทรงได้ ไม่ใช่แผนที่เชิงพิกัด)
const TH_PATH = 'M253.2 452.6 L252.4 457.7 L249.6 455.6 L250.3 453.0 L251.4 451.8 L253.2 452.6 Z M244.5 437.2 L244.6 438.3 L242.1 437.4 L241.2 437.9 L238.4 437.6 L237.1 430.7 L237.3 429.1 L239.3 429.6 L242.1 433.0 L243.6 435.4 L244.5 437.2 Z M50.1 638.0 L49.6 641.6 L47.6 641.5 L45.6 643.8 L44.6 644.1 L43.0 636.8 L44.9 626.5 L45.9 625.0 L47.3 627.8 L51.3 629.0 L49.6 634.9 L50.1 638.0 Z M133.0 17.2 L132.6 20.3 L133.8 20.9 L135.5 19.5 L137.6 16.0 L139.9 14.1 L142.4 13.7 L145.1 16.0 L147.9 21.1 L150.8 24.1 L152.2 24.4 L153.2 26.7 L153.3 29.0 L152.0 33.7 L149.6 39.3 L146.3 46.1 L147.4 51.8 L151.9 56.5 L157.3 59.3 L163.1 58.5 L166.1 57.1 L168.6 54.9 L170.9 53.8 L173.8 53.6 L182.9 55.2 L185.7 56.8 L186.1 59.9 L185.0 68.1 L186.4 74.0 L189.0 80.3 L189.3 86.0 L186.1 95.5 L183.5 104.4 L180.6 108.7 L178.4 111.5 L177.7 113.4 L177.9 115.2 L179.9 117.8 L182.1 121.3 L182.6 124.6 L182.4 128.6 L180.9 134.2 L175.4 146.2 L171.0 157.0 L173.3 159.2 L177.7 160.8 L180.5 162.3 L183.5 161.3 L189.9 155.0 L195.5 150.2 L202.3 145.4 L202.7 145.0 L208.7 141.5 L211.5 138.3 L212.9 134.2 L215.1 132.6 L217.8 133.5 L221.3 131.8 L225.5 127.3 L228.7 125.2 L231.0 125.5 L235.0 128.3 L240.9 133.6 L246.0 136.7 L250.6 137.7 L252.8 139.6 L252.7 142.5 L253.7 144.4 L255.8 145.2 L256.7 144.8 L256.5 143.4 L258.6 141.4 L262.9 138.7 L267.3 137.1 L271.8 136.6 L274.7 134.4 L276.6 128.9 L279.4 124.6 L281.9 122.7 L284.9 121.7 L285.7 120.4 L284.3 118.6 L284.4 116.9 L286.2 115.1 L290.0 114.3 L295.8 114.6 L302.7 116.4 L310.5 119.8 L315.7 120.9 L318.2 119.7 L323.0 124.9 L330.1 136.5 L336.2 145.3 L341.3 151.2 L346.7 155.8 L352.3 158.9 L356.4 163.2 L360.1 171.4 L357.3 182.7 L356.6 192.5 L356.9 204.4 L360.2 213.6 L366.6 220.0 L370.2 225.1 L371.3 229.0 L376.2 232.4 L385.0 235.2 L388.6 237.7 L387.2 240.0 L387.0 242.6 L388.3 245.7 L391.3 248.1 L396.2 250.1 L399.1 252.2 L400.0 254.4 L399.9 257.9 L398.8 262.8 L396.7 266.6 L393.8 269.2 L393.5 271.3 L392.7 274.4 L392.7 280.9 L394.8 285.2 L395.4 290.7 L394.3 295.2 L393.2 304.3 L393.0 307.8 L392.0 310.8 L389.4 313.7 L385.5 316.5 L380.8 318.9 L377.9 320.0 L377.2 320.5 L375.1 323.3 L372.6 325.9 L370.6 325.9 L369.2 324.6 L368.1 322.8 L367.5 319.0 L363.1 317.1 L358.3 315.9 L348.5 317.8 L340.5 318.8 L331.6 317.5 L323.2 319.2 L319.7 319.4 L315.7 319.2 L311.8 319.2 L308.1 318.6 L301.3 316.3 L298.7 316.4 L293.1 318.4 L287.4 319.8 L281.9 320.7 L273.7 324.7 L267.8 330.5 L266.1 334.5 L263.2 338.7 L259.1 345.2 L253.8 351.4 L250.2 354.2 L251.2 355.9 L250.3 357.9 L244.6 358.8 L240.1 359.2 L239.3 360.2 L239.8 372.7 L241.4 377.5 L244.3 383.2 L246.2 386.3 L247.6 395.6 L248.0 403.4 L254.3 408.4 L257.9 412.2 L260.4 415.5 L259.5 417.6 L258.0 424.0 L259.5 432.2 L268.3 449.8 L269.0 451.1 L268.0 451.2 L266.6 447.8 L262.1 442.1 L260.7 436.0 L255.5 429.2 L252.6 426.6 L251.6 428.8 L250.0 431.2 L244.8 427.7 L240.4 424.1 L236.4 417.1 L235.9 418.7 L234.9 420.2 L230.3 414.7 L225.5 410.3 L221.1 408.7 L218.5 407.2 L215.9 404.9 L210.5 402.5 L197.0 406.0 L179.8 403.2 L173.2 405.8 L170.5 404.2 L168.8 401.2 L170.4 396.1 L170.8 385.3 L172.8 377.7 L171.9 372.0 L172.9 369.3 L173.6 365.6 L170.9 364.1 L158.8 361.1 L156.2 358.8 L153.0 361.5 L138.5 363.0 L133.0 365.2 L127.9 369.5 L126.6 374.9 L129.5 378.5 L131.4 384.8 L126.2 398.4 L125.3 402.4 L127.3 419.0 L126.5 428.2 L123.7 434.3 L119.2 439.7 L117.3 449.0 L113.8 453.3 L109.0 463.1 L105.8 475.4 L103.6 481.0 L102.2 491.4 L92.5 507.2 L90.2 516.1 L86.7 519.5 L87.9 522.1 L88.1 526.6 L86.9 538.4 L86.5 548.3 L87.9 553.5 L92.6 563.9 L91.5 566.9 L91.0 571.2 L94.9 573.2 L97.7 573.8 L113.7 568.8 L119.1 570.1 L121.1 574.7 L122.4 578.7 L125.2 600.3 L126.6 604.4 L129.8 608.2 L133.3 612.2 L134.5 611.5 L134.7 610.0 L135.0 608.3 L138.1 612.4 L140.6 620.0 L149.0 660.4 L151.4 665.5 L153.4 670.9 L148.3 668.3 L146.9 659.3 L145.5 655.6 L143.7 655.0 L140.8 655.1 L140.6 653.5 L142.8 650.5 L142.4 647.0 L139.5 644.2 L134.7 646.4 L134.8 652.7 L137.0 657.6 L145.0 668.3 L147.6 672.8 L150.8 674.1 L155.4 673.4 L161.0 678.0 L165.4 682.2 L176.3 688.8 L182.9 688.1 L190.1 686.4 L194.8 686.9 L199.5 688.5 L205.2 694.0 L214.1 707.6 L228.7 718.9 L227.1 721.7 L226.5 726.0 L220.7 731.7 L219.8 735.0 L217.7 739.2 L213.7 741.4 L210.3 741.8 L208.3 741.4 L206.9 740.6 L204.5 736.6 L203.4 735.4 L202.4 735.2 L195.0 737.9 L187.9 740.9 L186.6 743.6 L184.7 746.8 L182.6 748.0 L181.0 748.3 L179.4 746.5 L176.7 744.1 L174.6 741.8 L175.1 738.2 L179.1 732.8 L179.6 729.0 L179.1 722.6 L178.0 718.9 L176.9 718.7 L174.9 718.1 L169.3 718.7 L166.6 714.5 L165.5 709.9 L163.6 708.3 L161.7 707.3 L157.5 708.9 L154.3 707.9 L143.8 703.9 L139.7 697.4 L137.5 697.2 L135.6 698.0 L134.9 699.4 L133.7 706.9 L132.8 709.2 L120.7 694.2 L112.4 688.0 L113.5 676.8 L111.0 674.6 L107.8 674.4 L105.4 671.3 L107.6 664.6 L104.3 665.9 L99.7 665.7 L96.0 663.8 L93.2 654.6 L91.4 651.8 L87.6 646.9 L82.4 646.9 L80.7 644.6 L81.1 638.6 L77.4 635.0 L72.5 632.0 L68.5 630.2 L64.3 620.6 L61.1 618.3 L58.3 616.3 L54.5 617.6 L53.2 621.1 L50.7 624.5 L47.7 624.0 L45.1 622.1 L41.8 612.5 L41.3 606.6 L42.0 595.6 L46.1 585.8 L48.3 570.0 L51.7 560.1 L54.1 556.7 L57.5 543.2 L64.3 525.8 L65.1 522.1 L66.4 517.9 L67.5 514.0 L67.8 507.8 L66.9 504.5 L66.9 502.7 L68.4 500.3 L73.2 496.4 L79.9 489.9 L87.9 480.8 L96.0 466.8 L100.1 458.6 L101.8 455.8 L103.6 454.9 L106.4 452.1 L108.3 449.0 L108.4 447.4 L104.0 432.2 L101.1 427.2 L99.6 421.3 L98.8 417.1 L97.8 413.2 L98.3 409.5 L96.7 407.2 L93.1 404.3 L89.3 400.0 L87.1 392.9 L87.1 389.0 L84.7 385.5 L83.9 381.9 L85.3 378.4 L87.2 375.5 L87.0 362.3 L86.2 358.4 L85.3 351.4 L82.8 346.1 L79.4 339.9 L75.5 334.8 L65.2 325.5 L57.9 319.3 L54.2 313.7 L49.7 307.2 L46.4 302.5 L42.2 296.6 L40.1 288.5 L38.9 279.9 L39.5 277.1 L41.5 275.2 L44.1 273.7 L46.2 273.3 L52.2 269.4 L56.3 269.7 L57.2 268.9 L57.6 267.1 L57.1 259.2 L57.3 248.7 L58.1 240.2 L59.0 234.5 L69.9 228.0 L72.2 225.2 L73.3 222.1 L73.3 219.4 L72.4 217.2 L70.7 216.1 L63.6 221.7 L62.3 220.4 L59.0 211.1 L57.6 208.3 L55.6 204.9 L53.4 200.2 L53.1 191.9 L51.5 187.9 L42.7 179.2 L38.7 174.5 L33.3 167.7 L26.9 159.6 L20.3 152.1 L17.2 147.3 L16.1 146.2 L15.7 144.4 L17.7 139.2 L16.7 134.0 L13.4 127.1 L12.0 122.8 L12.5 121.1 L10.9 120.5 L7.3 120.8 L3.7 117.6 L0.3 110.7 L0.0 109.5 L1.1 109.5 L5.4 110.7 L6.8 110.5 L9.8 109.0 L14.4 107.3 L17.1 106.7 L18.0 105.9 L18.4 104.3 L16.1 88.4 L16.5 85.1 L20.8 78.2 L20.3 71.3 L21.4 61.3 L26.2 54.5 L29.9 51.4 L31.0 46.4 L32.7 45.4 L35.7 45.8 L41.9 49.5 L44.5 49.6 L48.3 49.5 L52.3 49.3 L54.2 48.9 L67.1 45.3 L69.9 44.9 L72.7 45.4 L74.6 45.2 L76.6 43.6 L78.1 40.7 L79.7 31.4 L80.6 29.8 L82.3 28.4 L85.0 27.5 L88.2 27.6 L92.4 29.4 L95.0 29.5 L98.0 28.7 L100.5 27.5 L102.2 25.8 L102.9 23.9 L102.3 20.1 L100.4 15.4 L100.9 14.8 L104.4 15.9 L109.6 17.0 L113.5 16.8 L116.1 16.0 L118.6 13.7 L121.8 11.7 L124.9 12.1 L127.2 14.0 L133.0 17.2 Z M130.6 550.1 L130.2 550.9 L128.3 549.3 L127.0 547.6 L126.3 545.3 L129.2 545.4 L130.6 547.5 L130.6 550.1 Z M130.5 555.5 L130.7 558.3 L129.7 561.6 L125.2 563.6 L123.7 560.9 L124.1 556.8 L124.8 555.8 L129.1 556.0 L130.5 555.5 Z M110.8 705.3 L109.8 705.5 L108.0 701.6 L110.3 695.9 L112.6 702.9 L110.8 705.3 Z M58.9 636.4 L58.4 637.2 L55.9 627.9 L59.5 630.4 L58.9 636.4 Z M45.2 581.7 L42.4 582.2 L42.8 579.6 L43.5 577.9 L44.9 577.4 L45.4 580.3 L45.2 581.7 Z M82.5 653.1 L83.7 659.0 L82.0 657.8 L80.5 655.2 L80.5 651.4 L80.9 650.9 L82.5 653.1 Z'

// ลูกค้าที่ใช้งานจริง (พิกัดเป็นตำแหน่งโดยประมาณบนภาพ)
const customerPins = [
  { name: 'มหาวิทยาลัยนเรศวร', province: 'พิษณุโลก', logo: '/NU_crest.png', x: 136.5, y: 199.5 },
  { name: 'มหาวิทยาลัยบูรพา', province: 'ชลบุรี', logo: '/BUU_crest.png', x: 171.8, y: 373.0 },
]
const CONTACT = {
  tel: '083 954 9743',
  telHref: '+66839549743',
}
const DOC_SRC = '/momay/momay-doc.webp'
const DOC_NAME = 'MOMAY-behavioral-intelligence-platform.webp'
const vw = ref(1280)
let targetHeroY = 0
let targetProgress = 0
let smoothRaf = null

const readScroll = () => {
  const y = window.scrollY || 0
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
  scrolled.value = y > 40
  targetProgress = Math.min(1, y / max)
  targetHeroY = Math.min(y, window.innerHeight * 1.2)
}
const onScroll = () => readScroll()

// ลูป rAF เดียวค่อย ๆ ไล่ค่าเข้าหาเป้า → พารัลแลกซ์และแถบ progress ลื่นแทนที่จะกระตุกตาม scroll ดิบ
const smoothStep = () => {
  const ease = reduceMotion() ? 1 : 0.09
  const dy = targetHeroY - heroY.value
  const dp = targetProgress - scrollProgress.value
  heroY.value = Math.abs(dy) > 0.05 ? heroY.value + dy * ease : targetHeroY
  scrollProgress.value = Math.abs(dp) > 0.0004 ? scrollProgress.value + dp * Math.min(1, ease * 2.2) : targetProgress
  smoothRaf = requestAnimationFrame(smoothStep)
}

const onResize = () => {
  vw.value = window.innerWidth
  readScroll()
}

// เลื่อนไปยัง section ด้วยเส้นโค้ง ease-in-out ของเราเอง (นุ่มกว่า smooth ของเบราว์เซอร์)
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
let scrollAnimRaf = null
const smoothScrollTo = (to, duration = 950) => {
  cancelAnimationFrame(scrollAnimRaf)
  const from = window.scrollY
  const dist = to - from
  if (reduceMotion() || Math.abs(dist) < 4) {
    window.scrollTo(0, to)
    return
  }
  const t0 = performance.now()
  const step = (now) => {
    const p = Math.min(1, (now - t0) / duration)
    window.scrollTo(0, from + dist * easeInOutCubic(p))
    if (p < 1) scrollAnimRaf = requestAnimationFrame(step)
  }
  scrollAnimRaf = requestAnimationFrame(step)
}


/* ══════════════ 3. เนื้อหา ══════════════ */
const year = new Date().getFullYear()
const purposes = [
  {
    title: 'READ',
    note: 'พื้นที่อ่านหนังสือ ที่เงียบและสบาย',
    color: '#56A0D3',
    icon: `<svg viewBox="0 0 24 24"><path d="M12 6.6C10.4 5 8.4 4.3 5 4.3V18c3.4 0 5.4.7 7 2.3 1.6-1.6 3.6-2.3 7-2.3V4.3c-3.4 0-5.4.7-7 2.3z"/><path d="M12 6.6v13.7"/></svg>`,
  },
  {
    title: 'COLLABORATE',
    note: 'พื้นที่ทำงานกลุ่ม และระดมความคิด',
    color: '#8EC06C',
    icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="2.8"/><circle cx="5" cy="10.5" r="2.2"/><circle cx="19" cy="10.5" r="2.2"/><path d="M7.4 18.5A4.7 4.7 0 0 1 12 14a4.7 4.7 0 0 1 4.6 4.5"/><path d="M2 18.5a3.6 3.6 0 0 1 3.2-3.4M22 18.5a3.6 3.6 0 0 0-3.2-3.4"/></svg>`,
  },
  {
    title: 'FOCUS',
    note: 'โซนเงียบพิเศษ สำหรับการโฟกัสเต็มที่',
    color: '#ECB731',
    icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/></svg>`,
  },
  {
    title: 'CREATE WITH TECHNOLOGY',
    note: 'พื้นที่พร้อมอุปกรณ์และเทคโนโลยี',
    color: '#ED1B2E',
    icon: `<svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="3.2"/><path d="M14.6 7.6l2 2-5 5-2.6.6.6-2.6z"/><path d="M7.5 17.5h4"/></svg>`,
  },
  {
    title: 'CREATE / PRESENT',
    note: 'พื้นที่สำหรับซ้อมและนำเสนอผลงาน',
    color: '#ED1B2E',
    icon: `<svg viewBox="0 0 24 24"><path d="M8.6 7.5L4 12l4.6 4.5M15.4 7.5L20 12l-4.6 4.5M13.4 4.5l-2.8 15"/></svg>`,
  },
  {
    title: 'SOCIAL / LEARN',
    note: 'พื้นที่พักผ่อน พบปะ และเรียนรู้ร่วมกัน',
    color: '#ECB731',
    icon: `<svg viewBox="0 0 24 24"><path d="M4 8.5h12v5.8A4.7 4.7 0 0 1 11.3 19H8.7A4.7 4.7 0 0 1 4 14.3z"/><path d="M16 10h2.2a2.4 2.4 0 0 1 0 4.8H16"/><path d="M7 3.2v2.2M11 3.2v2.2"/><path d="M3 21.2h14"/></svg>`,
  },
]

/* ══════════════ คอนโซลจำลองของ ENLIGHTENED ══════════════ */
// โซนที่กล้องตรวจจับ — ตัวเลขอ้างอิงจากแดชบอร์ดจริง
const enZones = reactive([
  { code: 'ชั้น 1', people: 76, pct: 40, note: 'ความจุ 191 ที่นั่ง · เปิด 24 ชม.', color: '#ECB731', hot: true },
  { code: 'ชั้น 2', people: 52, pct: 29, note: 'ความจุ 180 ที่นั่ง', color: '#3FA34D' },
  { code: 'ชั้น 3', people: 30, pct: 26, note: 'ความจุ 117 ที่นั่ง · 6 ห้อง', color: '#3FA34D' },
  { code: 'ชั้น 4', people: 44, pct: 37, note: 'ความจุ 120 ที่นั่ง · 10 ห้อง', color: '#3FA34D' },
  { code: 'ชั้น 5', people: 21, pct: 16, note: 'ความจุ 130 ที่นั่ง · 10 ห้อง', color: '#56A0D3' },
  { code: 'ชั้น 6', people: 12, pct: 17, note: 'ความจุ 70 ที่นั่ง · 25 ห้อง', color: '#56A0D3' },
])

const enDensity = ref(7)
const enPeople = ref(41)

const enPower = ref(1284)
const enDoors = reactive([
  { name: 'ทางเข้าทิศเหนือ', in: 204, out: 98 },
  { name: 'ทางเข้าทิศใต้', in: 224, out: 157 },
])
const enIn = computed(() => enDoors.reduce((a, d) => a + d.in, 0))
const enOut = computed(() => enDoors.reduce((a, d) => a + d.out, 0))
const enCompare = [
  { label: 'นิยาย · วารสาร', value: 35, color: 'linear-gradient(90deg,#56A0D3,#7FD3FF)' },
  { label: 'ภาษาไทย', value: 28, color: 'linear-gradient(90deg,#8EC06C,#C4E59F)' },
  { label: 'ภาษาต่างประเทศ', value: 21, color: 'linear-gradient(90deg,#ECB731,#FFE08A)' },
  { label: 'วิทยาศาสตร์ · งานวิจัย', value: 16, color: 'linear-gradient(90deg,#ED1B2E,#FF7B6B)' },
]
const enRealTop = computed(() => `${((1 - enRealSeries[enRealSeries.length - 1] / SEATS) * 100).toFixed(1)}%`)
const enGaugeColor = computed(() => (enDensity.value < 25 ? '#8EC06C' : enDensity.value < 60 ? '#ECB731' : '#ED1B2E'))
const enGaugePt = computed(() => {
  const a = Math.PI * (1 - Math.min(100, Math.max(0, enDensity.value)) / 100)
  return { x: (60 + 48 * Math.cos(a)).toFixed(1), y: (62 - 48 * Math.sin(a)).toFixed(1) }
})
const enLevel = computed(() => (enDensity.value < 25 ? 'ค่อนข้างว่าง' : enDensity.value < 60 ? 'ปานกลาง' : 'หนาแน่น'))

// เส้นกราฟสร้างจากชุดตัวเลขคงที่ ทำให้ผลฝั่งเซิร์ฟเวอร์กับเบราว์เซอร์ตรงกัน
// วางเส้นบนแกนจริง: 0 อยู่ที่ก้นกราฟ ค่าสูงสุดของแกนอยู่ที่ขอบบน
// เส้นโค้งลื่น (Catmull-Rom → Bezier) ให้หน้าตาเดียวกับกราฟในการ์ด Executive Brief
const toLine = (vals, w, h, top, x0 = 0) => {
  const dx = w / (vals.length - 1)
  const pts = vals.map((v, i) => [x0 + i * dx, h - (v / top) * h])
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d
}
const SEATS = 228
const POWER_TOP = 250

const enPastSeries = [42, 38, 35, 34, 38, 48, 62, 78, 94, 108, 122, 134, 144, 150, 154, 156, 154, 150, 145, 139, 133, 126, 118, 109, 99, 88, 76, 64, 54]
const enTodaySeries = [40, 36, 34, 33, 38, 50, 66, 84, 101, 116, 130, 142, 152, 160, 166, 170, 172, 173, 172, 170, 167]
const enRealSeries = [40, 36, 34, 33, 39, 52, 70, 89, 107, 124, 139, 151, 160]
const enPredSeries = [160, 170, 180, 188, 194, 197, 193, 185, 174, 162, 150, 137, 124, 112, 100, 89, 78]
const enPowerSeries = [24, 23, 22, 21, 22, 25, 30, 41, 58, 82, 108, 140, 168, 190, 205, 194, 178, 174, 172, 168, 164, 148, 128, 108, 92, 76, 62, 49, 38, 31, 27]

const enPastLine = computed(() => toLine(enPastSeries, 260, 96, SEATS))
const enTodayLine = computed(() => toLine(enTodaySeries, 125, 96, SEATS))
const enTodayTop = computed(() => `${((1 - enTodaySeries[enTodaySeries.length - 1] / SEATS) * 100).toFixed(1)}%`)
const enRealLine = computed(() => toLine(enRealSeries, 125, 96, SEATS))
const enPredLine = computed(() => toLine(enPredSeries, 135, 96, SEATS, 125))
const enTodayArea = computed(() => `${enTodayLine.value} L125 96 L0 96 Z`)
const enRealArea = computed(() => `${enRealLine.value} L125 96 L0 96 Z`)
const enPowerLine = computed(() => toLine(enPowerSeries, 640, 62, POWER_TOP))
const enPowerArea = computed(() => `${enPowerLine.value} L640 62 L0 62 Z`)

/* ── แดชบอร์ดระดับเมือง ENLIGHTEN URBAN (กรอบที่ยังว่างของ section ENLIGHTENED) ──
   ตัวเลขคงที่ทั้งหมด เป็นภาพจำลองของหน้าจอจริง ไม่ได้ต่อข้อมูลสด */
const urbanNav = [
  { label: 'ภาพรวม', icon: `<svg viewBox="0 0 24 24"><path d="M4 11 12 4l8 7v9H4z"/></svg>` },
  { label: 'การจราจร', icon: `<svg viewBox="0 0 24 24"><path d="M4 16v-3l2-5h12l2 5v3"/><path d="M4 16h16v3H4z"/></svg>` },
  { label: 'สิ่งแวดล้อม', icon: `<svg viewBox="0 0 24 24"><path d="M20 5c0 8-5 13-12 13 0-8 5-13 12-13z"/><path d="M6 19c3-4 6-6 10-8"/></svg>` },
  { label: 'ความปลอดภัย', icon: `<svg viewBox="0 0 24 24"><path d="M12 3.5 19 6v6c0 4-3.2 7.2-7 8.5-3.8-1.3-7-4.5-7-8.5V6z"/></svg>` },
  { label: 'การมีส่วนร่วม', icon: `<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 8.4a3 3 0 0 1 0 5.2"/></svg>` },
  { label: 'รายงาน', icon: `<svg viewBox="0 0 24 24"><path d="M6 3.5h8L18.5 8v12.5h-12.5z"/><path d="M9 12.5h6M9 16h4"/></svg>` },
  { label: 'ตั้งค่า', icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"/><path d="M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7"/></svg>` },
]

/* ── แดชบอร์ดผู้บริหารระดับเมือง EXECUTIVE URBAN (กรอบที่ยังว่างของ section EXECUTIVE BRIEF) ── */
const execCards = [
  {
    kind: 'Risk ↑', color: '#e2483f',
    title: 'คาดว่าปริมาณขยะจะเพิ่มสูงช่วงเช้าวันนี้ (09:00 – 10:00)',
    note: 'จากกิจกรรมตลาดใต้ และจำนวนนักท่องเที่ยวที่เพิ่มขึ้นกว่าปกติ',
    tags: ['ขยะ', 'ตลาดใต้', 'การจัดเก็บ'],
    icon: `<svg viewBox="0 0 24 24"><path d="M6 7h12l-1 13H7z"/><path d="M9.5 7V4.5h5V7"/></svg>`,
  },
  {
    kind: 'Event ↑', color: '#e08a2b',
    title: 'กิจกรรมริมแม่น้ำน่านช่วงเย็น คาดว่ามีผู้เข้าร่วมเพิ่มขึ้น 18–24%',
    note: 'อาจส่งผลต่อการจราจร ที่จอดรถ และการดูแลความปลอดภัย',
    tags: ['กิจกรรม', 'การจราจร', 'ที่จอดรถ'],
    icon: `<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 8.4a3 3 0 0 1 0 5.2"/></svg>`,
  },
  {
    kind: 'Trend ↓', color: '#2f9e6b',
    title: 'การใช้พลังงานช่วงกลางคืน ลดลงต่อเนื่อง 4 สัปดาห์',
    note: 'จากมาตรการควบคุมการใช้งานและการปรับเวลาไฟสาธารณะ',
    tags: ['พลังงาน', 'สิ่งแวดล้อม', 'ความยั่งยืน'],
    icon: `<svg viewBox="0 0 24 24"><path d="M20 5c0 8-5 13-12 13 0-8 5-13 12-13z"/><path d="M6 19c3-4 6-6 10-8"/></svg>`,
  },
]
/* แท่งกราฟคาดการณ์ปริมาณขยะ 06:00–14:00 — แท่งพีคคือช่วง 09:00–10:00 */
const execBars = [
  { v: 26 }, { v: 34 }, { v: 30 }, { v: 46 }, { v: 58 }, { v: 96, peak: true },
  { v: 74 }, { v: 62 }, { v: 54 }, { v: 44 }, { v: 38 }, { v: 30 },
]
const execLayers = ['ผู้คน', 'ขยะ', 'การจราจร', 'ที่จอดรถ', 'กิจกรรม']
const execOpts = [
  { key: 'A', name: 'คงแผนเดิม', risk: '72%' },
  { key: 'B', name: 'ขยับเวลาเก็บขยะเร็วขึ้น 30 นาที', risk: '41%', drop: '↓ 31%', pick: true },
  { key: 'C', name: 'เพิ่มจุดเก็บขยะชั่วคราว', risk: '35%', drop: '↓ 37%' },
]
const execGlance = [
  { label: 'นักท่องเที่ยว', value: '12,480' },
  { label: 'การจราจรหลัก', value: 'ปกติ' },
  { label: 'คุณภาพอากาศ', value: 'ดี' },
  { label: 'ที่จอดรถ', value: 'ว่าง 62%' },
  { label: 'เหตุการณ์วันนี้', value: '3 กิจกรรม' },
]
const execWeek = [
  { day: 'วันนี้', note: 'ปกติ' },
  { day: 'พรุ่งนี้', note: 'ปกติ' },
  { day: 'ศุกร์', note: 'เฝ้าระวัง', warn: true },
  { day: 'เสาร์', note: 'เฝ้าระวัง', warn: true },
  { day: 'อาทิตย์', note: 'ฝนเล็กน้อย' },
  { day: 'จันทร์', note: 'ปกติ' },
  { day: 'อังคาร', note: 'ปกติ' },
]

const urbanImpacts = [
  'พื้นที่สาธารณะสกปรกเร็วขึ้น',
  'ภาระงานของเจ้าหน้าที่เพิ่มขึ้น',
  'ความพึงพอใจของประชาชนลดลง',
]
const urbanEffects = ['พื้นที่สาธารณะใช้งานยากขึ้น', 'ภาระงานเก็บขยะเพิ่มขึ้น']
const urbanLayers = [
  { name: 'ขยะ', color: '#ED1B2E', on: true },
  { name: 'ผู้คน', color: '#56A0D3', on: false },
  { name: 'การจราจร', color: '#ECB731', on: false },
  { name: 'คุณภาพอากาศ', color: '#8EC06C', on: false },
  { name: 'สภาพแวดล้อม', color: '#B9AEFF', on: false },
]
const urbanAlts = [
  'ติดตั้งถังขยะเพิ่มในจุดที่มีความหนาแน่น',
  'สื่อสารและกระตุ้นพฤติกรรมผู้ค้า/ประชาชน',
  'ปรับเส้นทางเก็บขยะเลี่ยงเวลาการเดินทาง',
]
const urbanNotes = [
  'งบประมาณและทรัพยากร',
  'การประสานงานกับผู้ค้าในตลาด',
  'ผลกระทบต่อการจราจร',
  'การติดตามผลหลังดำเนินการ',
]
const urbanSims = [
  { key: 'A', name: 'เพิ่มรอบเก็บขยะช่วงเช้า' },
  { key: 'B', name: 'จัดจุดทิ้งขยะเพิ่มเติม' },
  { key: 'C', name: 'สื่อสารและกระตุ้นพฤติกรรม' },
]
/* จุดความหนาแน่นของชั้น heatmap — พิกัดอยู่ในระบบ viewBox 320x200 ของแผนที่
   o = ความเข้มของจุดนั้น (ยิ่งซ้อนกันมาก สีจะไล่ไปทางแดงเอง ไม่ได้กำหนดสีทีละวง)
   เกาะแนว corridor เป็นหลัก แล้วแต้มกลุ่มย่อยนอกแนวไว้บ้างให้ดูเป็นเมืองจริง */
const urbanHeat = [
  { x: 30, y: 152, r: 8, o: 0.2 }, { x: 55, y: 144, r: 9, o: 0.26 },
  { x: 80, y: 132, r: 10, o: 0.32 }, { x: 104, y: 119, r: 11, o: 0.4 },
  { x: 126, y: 111, r: 12, o: 0.52 }, { x: 146, y: 105, r: 13, o: 0.68 },
  { x: 164, y: 101, r: 14, o: 0.88 }, { x: 178, y: 100, r: 14, o: 0.92 },
  { x: 194, y: 101, r: 12, o: 0.7 }, { x: 214, y: 104, r: 11, o: 0.48 },
  { x: 236, y: 106, r: 10, o: 0.36 }, { x: 260, y: 102, r: 9, o: 0.28 },
  { x: 284, y: 94, r: 8, o: 0.22 }, { x: 304, y: 87, r: 7, o: 0.16 },
  { x: 96, y: 166, r: 7, o: 0.16 }, { x: 216, y: 140, r: 7, o: 0.15 },
  { x: 252, y: 70, r: 7, o: 0.14 }, { x: 148, y: 72, r: 6, o: 0.12 },
]
const urbanPlaces = [
  { name: 'ตลาดเหนือ', x: '31%', y: '30%' },
  { name: 'สะพานเอกาทศรถ', x: '15%', y: '55%' },
  { name: 'ตลาดใต้', x: '58%', y: '72%' },
  { name: 'วัดใหญ่', x: '86%', y: '24%' },
]
const urbanDrivers = [
  { name: 'ผู้ใช้ตลาด', delta: '+38%', color: '#56A0D3' },
  { name: 'ร้านค้าเปิดเพิ่ม', delta: '+25%', color: '#8EC06C' },
  { name: 'การจราจรหนาแน่น', delta: '+30%', color: '#ECB731' },
]
const urbanResults = [
  { name: 'ปริมาณขยะตกค้าง', delta: '-32%', dir: 'is-down' },
  { name: 'เวลาทำความสะอาด', delta: '-20%', dir: 'is-down' },
  { name: 'ความพึงพอใจประชาชน', delta: '+18%', dir: 'is-up' },
]
const ubWasteSeries = [120, 150, 230, 420, 660, 720, 540, 430, 470, 400, 330, 250, 190]
const ubWasteLine = toLine(ubWasteSeries, 200, 52, 820)
const ubWasteArea = `${ubWasteLine} L200 52 L0 52 Z`
const enPowerPeak = computed(() => {
  const i = enPowerSeries.indexOf(Math.max(...enPowerSeries))
  const dx = 640 / (enPowerSeries.length - 1)
  return {
    x: Number((i * dx).toFixed(1)),
    y: Number((62 - (enPowerSeries[i] / POWER_TOP) * 62).toFixed(1)),
  }
})
const enDate = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
  .format(new Date())
  .replace(/ /g, ' - ')

// ตารางพฤติกรรมรายกล้อง — ช่วงที่ยังไม่ถึงเวลาเป็นช่องมืด
// ไล่สีของตารางพฤติกรรม: เขียวเข้ม → เขียวอ่อน → เหลือง → ส้มแดง (นุ่มกว่าแบบ hsl ตรง ๆ)
const HEAT_STOPS = [
  [26, 54, 40],
  [96, 168, 92],
  [236, 183, 49],
  [222, 92, 60],
]
const heatColor = (v) => {
  if (v < 0) return 'rgba(255,255,255,0.04)'
  const t = Math.min(0.999, Math.max(0, v)) * (HEAT_STOPS.length - 1)
  const i = Math.floor(t)
  const f = t - i
  const [r1, g1, b1] = HEAT_STOPS[i]
  const [r2, g2, b2] = HEAT_STOPS[i + 1]
  const mix = (a, b) => Math.round(a + (b - a) * f)
  return `rgb(${mix(r1, r2)} ${mix(g1, g2)} ${mix(b1, b2)})`
}
const enHeatRows = ['ชั้น 1', 'ชั้น 2', 'ชั้น 3', 'ชั้น 4', 'ชั้น 5', 'ชั้น 6'].map((label, r) => ({
  label,
  cells: Array.from({ length: 16 }, (_, c) =>
    heatColor(c > 8 ? -1 : Math.min(1, (Math.sin((c + 1) * 0.8 + r) + 1) / 2 * 0.75 + r * 0.08)),
  ),
}))

// ภาพจำลองแอป MOMAY STUDENT — ตัวเลขอ้างอิงจากแอปจริง
const studentFloors = reactive([
  {
    floor: '1', title: 'พื้นที่ให้บริการ 24 ชม.', open: true, kind: 'SOCIAL / LEARN',
    zones: [
      { name: '24-Hr Learning Commons', kind: 'SOCIAL / LEARN', hours: 'เปิด 24 ชม.', used: 37, total: 131 },
      { name: 'ห้อง 101', kind: 'FOCUS', hours: 'เปิด 24 ชม.', used: 0, total: 20 },
      { name: 'ห้อง 102', kind: 'COLLABORATE', hours: 'เปิด 24 ชม.', used: 0, total: 40 },
    ],
  },
  {
    floor: '2', title: '4 พื้นที่', kind: 'READ',
    zones: [
      { name: 'Reading Zone', kind: 'READ', hours: '08:00 - 20:00', used: 24, total: 60 },
      { name: 'Co-Working', kind: 'COLLABORATE', hours: '08:00 - 20:00', used: 18, total: 50 },
      { name: 'ห้อง 201', kind: 'FOCUS', hours: '08:00 - 20:00', used: 0, total: 40 },
      { name: 'ห้อง 202', kind: 'CREATE / PRESENT', hours: '08:00 - 20:00', used: 6, total: 30 },
    ],
  },
  {
    floor: '3', title: '4 พื้นที่', rooms: 6, kind: 'FOCUS',
    zones: [
      { name: 'Silent Zone', kind: 'FOCUS', hours: '08:00 - 20:00', used: 19, total: 45 },
      { name: 'Research Zone', kind: 'READ', hours: '08:00 - 20:00', used: 11, total: 32 },
      { name: 'ห้อง 301', kind: 'COLLABORATE', hours: 'จองล่วงหน้า', used: 0, total: 20 },
      { name: 'ห้อง 302', kind: 'CREATE WITH TECHNOLOGY', hours: 'จองล่วงหน้า', used: 4, total: 20 },
    ],
  },
  {
    floor: '4', title: '4 พื้นที่', rooms: 10, kind: 'COLLABORATE',
    zones: [
      { name: 'Focus Floor', kind: 'FOCUS', hours: '08:00 - 20:00', used: 28, total: 50 },
      { name: 'Collaboration Zone', kind: 'COLLABORATE', hours: '08:00 - 20:00', used: 22, total: 40 },
      { name: 'ห้อง 401', kind: 'CREATE / PRESENT', hours: 'จองล่วงหน้า', used: 5, total: 15 },
      { name: 'ห้อง 402', kind: 'READ', hours: 'จองล่วงหน้า', used: 0, total: 15 },
    ],
  },
  {
    floor: '5', title: '5 พื้นที่', rooms: 10, kind: 'CREATE WITH TECHNOLOGY',
    zones: [
      { name: 'Innovation Lab', kind: 'CREATE WITH TECHNOLOGY', hours: '09:00 - 18:00', used: 16, total: 40 },
      { name: 'Media Zone', kind: 'CREATE / PRESENT', hours: '09:00 - 18:00', used: 9, total: 30 },
      { name: 'Studio', kind: 'CREATE WITH TECHNOLOGY', hours: 'จองล่วงหน้า', used: 4, total: 20 },
      { name: 'ห้อง 501', kind: 'COLLABORATE', hours: 'จองล่วงหน้า', used: 0, total: 20 },
      { name: 'ห้อง 502', kind: 'SOCIAL / LEARN', hours: 'จองล่วงหน้า', used: 7, total: 20 },
    ],
  },
  {
    floor: '6', title: '6 พื้นที่', rooms: 25, kind: 'CREATE / PRESENT',
    zones: [
      { name: 'ห้องประชุม 601', kind: 'COLLABORATE', hours: 'จองล่วงหน้า', used: 8, total: 12 },
      { name: 'ห้องประชุม 602', kind: 'CREATE / PRESENT', hours: 'จองล่วงหน้า', used: 0, total: 12 },
      { name: 'ห้องประชุม 603', kind: 'COLLABORATE', hours: 'จองล่วงหน้า', used: 5, total: 12 },
      { name: 'ห้องประชุม 604', kind: 'CREATE WITH TECHNOLOGY', hours: 'จองล่วงหน้า', used: 0, total: 12 },
      { name: 'ห้องประชุม 605', kind: 'SOCIAL / LEARN', hours: 'จองล่วงหน้า', used: 3, total: 11 },
      { name: 'ห้องประชุม 606', kind: 'FOCUS', hours: 'จองล่วงหน้า', used: 0, total: 11 },
    ],
  },
])

// สีกับไอคอนของแต่ละชั้น อ้างจากการ์ดหมวดเดียวกัน จะได้เป็นภาษาเดียวกันทั้งหน้า
const purposeOf = (kind) => purposes.find((c) => c.title === kind) || purposes[0]
// สีของโซนที่มีอยู่ในชั้นนั้น (ไม่ซ้ำ) ใช้เป็นจุดบอกว่าชั้นนี้มีโซนอะไรผสมกันบ้าง
const floorMix = (f) => [...new Set(f.zones.map((z) => purposeOf(z.kind).color))].slice(0, 4)

const openFloor = ref('1')
const toggleFloor = (floor) => (openFloor.value = openFloor.value === floor ? '' : floor)

// บรรทัดสรุปของแต่ละชั้น — คิดจากที่นั่งจริงในชั้นนั้น เลยขยับตามข้อมูลไปด้วย
const floorNote = (f) => {
  const used = f.zones.reduce((a, z) => a + z.used, 0)
  const total = f.zones.reduce((a, z) => a + z.total, 0)
  return `${f.zones.length} พื้นที่ · ${used} คน · ${total} ที่นั่ง${f.rooms ? ` · ${f.rooms} ห้อง` : ''}`
}


/* ── ม็อกอัพ MOMAY STUDENT PIXEL (ผิว 8-bit) ──
   จานสีกับหน้าตายกมาจาก BuuStudent8bit.jsx · ตัวเลขคงที่ ไม่ได้ต่อข้อมูลสด
   bits = บิตแมป 3x3 ของไอคอน เขียนเป็นสตริง แล้ววาดทีละพิกเซลด้วย <span> */
const pixelActs = [
  { th: 'อ่านหนังสือ', en: 'READ',   color: '#b06cff', bits: '111101111' },
  { th: 'ทำงานกลุ่ม',  en: 'GROUP',  color: '#35f58a', bits: '101111101' },
  { th: 'ทำงานเงียบ',  en: 'FOCUS',  color: '#3ad0ff', bits: '010111010' },
  { th: 'พัก / พบปะ',  en: 'SOCIAL', color: '#ffd84d', bits: '110111011' },
]
const pixelRooms = [
  { floor: '2', name: '24-HR ZONE',  note: 'อ่านหนังสือ · เงียบ', free: 48, on: 3, color: '#35f58a' },
  { floor: '3', name: 'GROUP ROOM',  note: 'ทำงานกลุ่ม · จองได้', free: 12, on: 5, color: '#ffd84d' },
  { floor: '4', name: 'CYBERZONE',   note: 'ใช้เทคโนโลยี',        free: 5,  on: 7, color: '#ff4fd8' },
]


/* ── ม็อกอัพแอปประชาชน MOMAY CITIZEN (หน้าจอแท็บเล็ตในหมวด STUDENT) ── */
const czNav = [
  `<svg viewBox="0 0 24 24"><path d="M4 11 12 4l8 7v9H4z"/></svg>`,
  `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/></svg>`,
  `<svg viewBox="0 0 24 24"><path d="M4 6.5 9.5 4.5l5 2 5-2v13l-5 2-5-2-5.5 2z"/><path d="M9.5 4.5v13M14.5 6.5v13"/></svg>`,
  `<svg viewBox="0 0 24 24"><rect x="4" y="5.5" width="16" height="14" rx="2"/><path d="M4 10h16M9 3.5v4M15 3.5v4"/></svg>`,
  `<svg viewBox="0 0 24 24"><path d="M4 16v-3l2-5h12l2 5v3"/><path d="M4 16h16v3H4z"/></svg>`,
  `<svg viewBox="0 0 24 24"><path d="M12 5.5 14 9.5l4.5.6-3.2 3.1.8 4.4L12 15.5 7.9 17.6l.8-4.4L5.5 10l4.5-.5z"/></svg>`,
]
const czCats = [
  { th: 'ออกกำลังกาย', note: 'เดิน วิ่ง ปั่น', color: '#8EC06C',
    icon: `<svg viewBox="0 0 24 24"><circle cx="13.5" cy="5" r="2"/><path d="M11 21l2-5-3-2.5 1.5-4.5 3.5 2 3 1"/><path d="M8.5 12 6 14.5"/></svg>` },
  { th: 'กิน / ตลาด', note: 'ของอร่อยใกล้คุณ', color: '#ED1B2E',
    icon: `<svg viewBox="0 0 24 24"><path d="M7 3.5v8M7 11.5V21M5 3.5v5a2 2 0 0 0 4 0v-5"/><path d="M16.5 3.5c-1.5 1.5-2 3.5-2 5.5s1 3 2.5 3V21"/></svg>` },
  { th: 'คาเฟ่ / พักผ่อน', note: 'นั่งชิล พบเพื่อน', color: '#ECB731',
    icon: `<svg viewBox="0 0 24 24"><path d="M5 8h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M16 9.5h2a2 2 0 0 1 0 4h-2"/><path d="M4 20h13"/></svg>` },
  { th: 'เดินเล่นริมน้ำ', note: 'ชมบรรยากาศ', color: '#56A0D3',
    icon: `<svg viewBox="0 0 24 24"><path d="M12 3.5 17 11h-3.2l3.7 6H5.5l3.7-6H6z"/><path d="M12 17v4"/></svg>` },
  { th: 'กิจกรรม / Event', note: 'งานเทศกาล', color: '#B9AEFF',
    icon: `<svg viewBox="0 0 24 24"><path d="M9 18V5.5l10-2V16"/><circle cx="7" cy="18" r="2.2"/><circle cx="17" cy="16" r="2.2"/></svg>` },
]
const czStats = [
  { label: 'ความหนาแน่นผู้คน', value: 'ปกติ', note: 'ประมาณ 40%', color: '#56A0D3' },
  { label: 'คุณภาพอากาศ', value: 'ดี', note: 'PM2.5 18', color: '#8EC06C' },
  { label: 'อุณหภูมิ', value: '29°C', note: 'รู้สึกสบาย', color: '#ECB731' },
  { label: 'การจราจร', value: 'คล่องตัว', note: 'ไม่มีปัญหาหลัก', color: '#B9AEFF' },
]
const czPins = [
  { x: '22%', y: '62%', color: '#8EC06C' }, { x: '34%', y: '55%', color: '#ED1B2E' },
  { x: '46%', y: '48%', color: '#ECB731' }, { x: '58%', y: '44%', color: '#ED1B2E' },
  { x: '70%', y: '42%', color: '#56A0D3' }, { x: '82%', y: '36%', color: '#8EC06C' },
]
const czSpots = [
  { name: 'ตลาดเหนือ', x: '30%', y: '30%' },
  { name: 'สะพานเอกาทศรถ', x: '18%', y: '78%' },
  { name: 'ตลาดใต้', x: '62%', y: '72%' },
  { name: 'วัดใหญ่', x: '86%', y: '20%' },
]
const czLegend = [
  { name: 'หนาแน่นมาก', color: '#ED1B2E' },
  { name: 'ค่อนข้างหนาแน่น', color: '#ECB731' },
  { name: 'ปกติ', color: '#8EC06C' },
  { name: 'ไม่หนาแน่น', color: '#3FA34D' },
]
const czPlaces = [
  { name: 'ทางเดินริมน้ำน่าน', note: 'บรรยากาศดี คนไม่หนาแน่น', time: '4 นาที (300 ม.)', tag: 'แนะนำเลย', color: '#8EC06C' },
  { name: 'ตลาดใต้', note: 'ของอร่อยพื้นเมือง', time: '6 นาที (450 ม.)', tag: 'กำลังนิยม', color: '#ED1B2E' },
  { name: 'The River Cafe', note: 'วิวสวย นั่งสบาย', time: '8 นาที (600 ม.)', tag: '', color: '#ECB731' },
]

const seatKinds = [
  { name: 'โต๊ะเดี่ยว', note: 'โซนเงียบ · ปลั๊กทุกที่นั่ง', free: 24, icon: `<svg viewBox="0 0 24 24"><rect x="4" y="9" width="16" height="3" rx="1.2"/><path d="M6 12v7M18 12v7"/><path d="M9 9V6h6v3"/></svg>` },
  { name: 'โต๊ะกลุ่ม', note: 'นั่งได้ 4-6 คน', free: 8, icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="4.6" r="1.8"/><circle cx="12" cy="19.4" r="1.8"/><circle cx="4.6" cy="12" r="1.8"/><circle cx="19.4" cy="12" r="1.8"/></svg>` },
  { name: 'ห้องประชุม', note: 'จองล่วงหน้า 1 ชม.', free: 3, icon: `<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="14" rx="2.4"/><path d="M8 9.5h8M8 13h5"/></svg>` },
]

const phoneTabs = [
  { label: 'หน้าหลัก', icon: `<svg viewBox="0 0 24 24"><path d="M4 10.5L12 4l8 6.5V20H4z"/><path d="M9.5 20v-5.5h5V20"/></svg>` },
  { label: 'พื้นที่', icon: `<svg viewBox="0 0 24 24"><rect x="4" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6"/></svg>` },
  { label: 'แผนที่', icon: `<svg viewBox="0 0 24 24"><path d="M9 5.5L4 4v14l5 1.5 6-1.5 5 1.5V5.5L15 4z"/><path d="M9 5.5v14M15 4v14"/></svg>` },
  { label: 'แจ้งเตือน', icon: `<svg viewBox="0 0 24 24"><path d="M18 8.6a6 6 0 1 0-12 0c0 6-2 7.4-2 7.4h16s-2-1.4-2-7.4"/><path d="M10.4 19.5a2 2 0 0 0 3.2 0"/></svg>` },
  { label: 'โปรไฟล์', icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8.2" r="3.2"/><path d="M5.6 19.5a6.4 6.4 0 0 1 12.8 0"/></svg>` },
]

// สามผลิตภัณฑ์ เรียงตามสี เหลือง → เขียว → แดง (คำนิยามไทยจากเอกสารแนะนำระบบ)
const showcases = [
  {
    id: 'solutions',
    kicker: 'MOMAY ENLIGHTENED',
    title: 'FROM DATA TO AWARENESS.',
    lead: 'แพลตฟอร์มที่สามารถนำข้อมูลมาสร้าง Behavioral Intelligence ตั้งแต่การมองเห็นสถานการณ์ การทำความเข้าใจรูปแบบการใช้งาน การคาดการณ์แนวโน้ม ไปจนถึงการนำเสนอข้อมูลเพื่อช่วยให้ผู้บริหารสามารถตัดสินใจและบริหารทรัพยากรได้อย่างเหมาะสม',
    cta: 'EXPLORE MOMAY ENLIGHTENED',
    link: '/momay/MomayDemo-ByJob',
    color: '#ECB731',
    console: true,
    cards: [],
  },
  {
    id: 'student',
    kicker: 'MOMAY STUDENT',
    title: 'WHAT ARE YOU HERE TO DO?',
    lead: 'ส่วนติดต่อสำหรับผู้ใช้บริการทั่วไป โดยออกแบบจากแนวคิดว่า ระบบไม่ควรเพียงแสดงข้อมูล แต่ควรช่วยให้ผู้ใช้ตัดสินใจเลือกพื้นที่ให้เหมาะกับสิ่งที่ต้องการทำ เช่น การอ่านหนังสือ การทำงานกลุ่ม การทำงานเงียบ ๆ การใช้เทคโนโลยี การสร้างสรรค์หรือนำเสนอผลงาน และการพักหรือพบปะ โดยระบบสามารถเชื่อมโยงไปยังพื้นที่จริง ห้อง และข้อมูลการให้บริการของสถานที่นั้น ๆ',
    cta: 'EXPLORE MOMAY STUDENT',
    link: '/momay/MomayDemo-StudentPixel',
    color: '#8EC06C',
    phone: true,
    cards: purposes,
  },
  {
    id: 'brief',
    kicker: 'MOMAY EXECUTIVE BRIEF',
    title: 'ONE PAGE. ONE MINUTE. ONE BETTER DECISION.',
    lead: 'สรุปข้อมูลสำคัญขององค์กรในรูปแบบที่กระชับและนำไปใช้ประกอบการตัดสินใจได้ทันที ภายใต้แนวคิด “One Page. One Minute. One Better Decision.”',
    cta: 'EXPLORE MOMAY EXECUTIVE BRIEF',
    link: '/momay/MomayDemo-Executive',
    color: '#ED1B2E',
    panel: true,
    cards: [],
  },
]

const steps = [
  {
    title: 'FROM DATA',
    note: 'รวบรวมข้อมูลจากทุกระบบ',
    color: '#ED1B2E',
    icon: `<svg viewBox="0 0 24 24"><g fill="currentColor" stroke="none"><circle cx="6" cy="6" r="1.6"/><circle cx="12" cy="6" r="1.6"/><circle cx="18" cy="6" r="1.6"/><circle cx="6" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="18" cy="12" r="1.6"/><circle cx="6" cy="18" r="1.6"/><circle cx="12" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/></g></svg>`,
  },
  {
    title: 'TO RELATIONSHIPS',
    note: 'เชื่อมโยงข้อมูลเพื่อหาความสัมพันธ์',
    color: '#F0682A',
    icon: `<svg viewBox="0 0 24 24"><circle cx="6" cy="7" r="2.4"/><circle cx="18" cy="7" r="2.4"/><circle cx="12" cy="17" r="2.6"/><path d="M7.8 8.6l2.9 6M16.2 8.6l-2.9 6M8.4 7h7.2"/></svg>`,
  },
  {
    title: 'TO BEHAVIOR',
    note: 'เข้าใจพฤติกรรมการใช้พื้นที่',
    color: '#8EC06C',
    icon: `<svg viewBox="0 0 24 24"><path d="M12 4.5a3.2 3.2 0 0 0-3.1 2.4A3 3 0 0 0 6.2 9.6a3 3 0 0 0 .4 4.6A3.2 3.2 0 0 0 9.4 19a3 3 0 0 0 2.6-1.3z"/><path d="M12 4.5a3.2 3.2 0 0 1 3.1 2.4 3 3 0 0 1 2.7 2.7 3 3 0 0 1-.4 4.6A3.2 3.2 0 0 1 14.6 19a3 3 0 0 1-2.6-1.3z"/><path d="M12 4.5v13.2"/></svg>`,
  },
  {
    title: 'TO DECISIONS',
    note: 'สนับสนุนการตัดสินใจด้วยข้อมูลจริง',
    color: '#B06AD4',
    icon: `<svg viewBox="0 0 24 24"><rect x="4" y="4.5" width="16" height="15.5" rx="3"/><path d="M9 3.2h6v3H9z"/><path d="M8.4 12.6l2.4 2.4 4.8-5"/></svg>`,
  },
  {
    title: 'TO FORESIGHT',
    note: 'คาดการณ์แนวโน้มเพื่อเตรียมล่วงหน้า',
    color: '#2FBF9B',
    icon: `<svg viewBox="0 0 24 24"><path d="M3.5 20h17"/><path d="M6.5 20v-5M11 20v-8.5M15.5 20v-4"/><path d="M20 6.5l-5.2 5.2-3-3L6.5 13"/><path d="M16.4 6.4H20v3.6"/></svg>`,
  },
  {
    title: 'TO AWARENESS',
    note: 'สร้างความตระหนักรู้เพื่อการพัฒนา',
    color: '#56A0D3',
    icon: `<svg viewBox="0 0 24 24"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3.2"/></svg>`,
  },
]

const products = [
  {
    name: 'MOMAY ENLIGHTENED',
    tagline: 'From Data to Behavioral Intelligence.',
    note: 'แพลตฟอร์มวิเคราะห์พฤติกรรมการใช้พื้นที่ เพื่อองค์กรและเมืองที่ฉลาดขึ้น',
    color: '#ECB731',
    link: '/momay/MomayDemo-ByJob',
    art: `<svg viewBox="0 0 260 210" class="art art--city">
      <g class="float-c">
        
        <g fill="none" stroke="rgba(255,255,255,0.08)">
          <path d="M130 20 L242 84 L130 148 L18 84 Z"/>
          <path d="M130 40 L208 84 L130 128 L52 84 Z"/>
        </g>
        <g class="tower" style="--i:0"><path d="M74 96 l26 -15 26 15 v28 l-26 15 -26 -15z" fill="#ED1B2E" opacity="0.85"/><path d="M74 96 l26 15 v28 l-26 -15z" fill="#7F181B"/></g>
        <g class="tower" style="--i:1"><path d="M110 76 l26 -15 26 15 v46 l-26 15 -26 -15z" fill="#F0682A" opacity="0.8"/><path d="M110 76 l26 15 v46 l-26 -15z" fill="#8a3a12"/></g>
        <g class="tower" style="--i:2"><path d="M146 96 l26 -15 26 15 v22 l-26 15 -26 -15z" fill="#ECB731" opacity="0.85"/><path d="M146 96 l26 15 v22 l-26 -15z" fill="#8a6a13"/></g>
        <g class="tower" style="--i:3"><path d="M92 124 l26 -15 26 15 v18 l-26 15 -26 -15z" fill="#56A0D3" opacity="0.75"/><path d="M92 124 l26 15 v18 l-26 -15z" fill="#2a5a7d"/></g>
        <g class="tower" style="--i:4"><path d="M128 140 l26 -15 26 15 v14 l-26 15 -26 -15z" fill="#8EC06C" opacity="0.75"/><path d="M128 140 l26 15 v14 l-26 -15z" fill="#3e6b2a"/></g>
      </g>
      <g class="spark">
        <circle cx="86" cy="60" r="2.4" fill="#ED1B2E"/><circle cx="178" cy="52" r="2" fill="#ECB731"/>
        <circle cx="206" cy="120" r="2.2" fill="#56A0D3"/><circle cx="52" cy="118" r="2" fill="#8EC06C"/>
      </g>
    </svg>`,
  },
  {
    name: 'MOMAY STUDENT',
    tagline: 'Find the right space.',
    note: 'ช่วยให้นักศึกษาและผู้ใช้พื้นที่ เลือกที่นั่งที่ใช่ได้ง่ายและสะดวกขึ้น',
    color: '#8EC06C',
    link: '/momay/MomayDemo-StudentPixel',
    art: `<svg viewBox="0 0 220 260" class="art art--phone">
      <rect class="float-a" x="52" y="10" width="116" height="240" rx="18" fill="#111119" stroke="rgba(255,255,255,0.14)"/>
      <rect x="60" y="22" width="100" height="216" rx="12" fill="#08080f"/>
      <rect x="94" y="15" width="32" height="5" rx="2.5" fill="rgba(255,255,255,0.25)"/>
      <rect x="68" y="32" width="42" height="7" rx="3.5" fill="rgba(255,255,255,0.35)"/>
      <rect x="68" y="46" width="84" height="30" rx="6" fill="rgba(142,192,108,0.16)" stroke="rgba(142,192,108,0.5)"/>
      <rect x="75" y="55" width="34" height="5" rx="2.5" fill="rgba(255,255,255,0.5)"/>
      <rect x="75" y="64" width="52" height="4" rx="2" fill="rgba(255,255,255,0.22)"/>
      <g class="pulse-g">
        <rect x="68" y="84" width="84" height="22" rx="5" fill="rgba(255,255,255,0.05)"/>
        <rect x="68" y="112" width="84" height="22" rx="5" fill="rgba(255,255,255,0.05)"/>
        <rect x="68" y="140" width="84" height="22" rx="5" fill="rgba(255,255,255,0.05)"/>
      </g>
      <circle cx="79" cy="95" r="4" fill="#8EC06C"/><circle cx="79" cy="123" r="4" fill="#ECB731"/><circle cx="79" cy="151" r="4" fill="#ED1B2E"/>
      <rect x="90" y="92" width="46" height="5" rx="2.5" fill="rgba(255,255,255,0.3)"/>
      <rect x="90" y="120" width="38" height="5" rx="2.5" fill="rgba(255,255,255,0.3)"/>
      <rect x="90" y="148" width="52" height="5" rx="2.5" fill="rgba(255,255,255,0.3)"/>
      <rect x="68" y="172" width="84" height="46" rx="8" fill="rgba(142,192,108,0.1)" stroke="rgba(142,192,108,0.35)"/>
      <path class="draw" d="M74 205 L88 192 L102 199 L116 180 L132 188 L146 176" fill="none" stroke="#8EC06C" stroke-width="2.2" stroke-linecap="round"/>
    </svg>`,
  },
  {
    name: 'MOMAY EXECUTIVE BRIEF',
    tagline: 'One Page. One Minute. One Better Decision.',
    note: 'สรุปข้อมูลสำคัญของพื้นที่ในหน้าเดียว เพื่อการตัดสินใจที่ดีกว่า',
    color: '#ED1B2E',
    link: '/momay/MomayDemo-Executive',
    art: `<svg viewBox="0 0 260 200" class="art art--dash">
      <rect class="float-b" x="14" y="12" width="232" height="150" rx="10" fill="#101017" stroke="rgba(255,255,255,0.14)"/>
      <rect x="22" y="20" width="216" height="134" rx="6" fill="#07070d"/>
      <rect x="30" y="28" width="60" height="6" rx="3" fill="rgba(237,27,46,0.85)"/>
      <rect x="196" y="28" width="34" height="6" rx="3" fill="rgba(255,255,255,0.25)"/>
      <g class="pulse-g">
        <rect x="30" y="42" width="46" height="30" rx="5" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)"/>
        <rect x="82" y="42" width="46" height="30" rx="5" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)"/>
        <rect x="134" y="42" width="46" height="30" rx="5" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)"/>
        <rect x="186" y="42" width="44" height="30" rx="5" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)"/>
      </g>
      <rect x="36" y="52" width="24" height="7" rx="3.5" fill="#ED1B2E"/>
      <rect x="88" y="52" width="20" height="7" rx="3.5" fill="#8EC06C"/>
      <rect x="140" y="52" width="26" height="7" rx="3.5" fill="#ECB731"/>
      <rect x="192" y="52" width="22" height="7" rx="3.5" fill="#56A0D3"/>
      <rect x="30" y="80" width="128" height="66" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)"/>
      <path class="draw" d="M38 130 C 58 122, 66 100, 86 108 S 116 96, 132 112 S 146 96, 150 92" fill="none" stroke="#ED1B2E" stroke-width="2.4" stroke-linecap="round"/>
      <g fill="rgba(255,255,255,0.08)">
        <rect x="166" y="80" width="64" height="12" rx="6"/><rect x="166" y="98" width="64" height="12" rx="6"/>
        <rect x="166" y="116" width="64" height="12" rx="6"/><rect x="166" y="134" width="64" height="12" rx="6"/>
      </g>
      <g class="grow-g">
        <rect x="166" y="80" width="52" height="12" rx="6" fill="rgba(237,27,46,0.75)"/>
        <rect x="166" y="98" width="40" height="12" rx="6" fill="rgba(237,27,46,0.55)"/>
        <rect x="166" y="116" width="46" height="12" rx="6" fill="rgba(237,27,46,0.4)"/>
        <rect x="166" y="134" width="30" height="12" rx="6" fill="rgba(237,27,46,0.28)"/>
      </g>
      <path d="M96 162 h68 l10 22 h-88 z" fill="#0e0e15" stroke="rgba(255,255,255,0.12)"/>
      <rect x="70" y="184" width="120" height="6" rx="3" fill="rgba(255,255,255,0.16)"/>
    </svg>`,
  },
  {
    name: 'MOMAY STUDENT_PIXEL',
    hidden: true, // ซ่อนไว้ก่อน — ปลดเมื่อพร้อมโชว์
    tagline: 'Find your seat. 8-bit style.',
    note: 'ที่นั่งชุดเดียวกับ MOMAY STUDENT ในสกิน 8-bit ที่เปิดดูสนุกกว่า',
    color: '#C15CF0',
    link: '/momay/MomayDemo-StudentPixel',
    art: `<svg viewBox="0 0 240 220" class="art art--pixel" shape-rendering="crispEdges">
      <g class="float-a">
        <!-- ตัวเครื่อง: มุมเป็นขั้นบันไดแทนการมน ให้เข้ากับงานพิกเซล -->
        <path d="M26 18h188v8h8v160h-8v8H26v-8h-8V26h8z" fill="#160f28" stroke="rgba(193,92,240,0.55)" stroke-width="2"/>
        <path d="M38 32h164v140H38z" fill="#07050e"/>
        <!-- แถบหัวจอ -->
        <g fill="#C15CF0"><rect x="46" y="40" width="8" height="8"/><rect x="58" y="40" width="8" height="8"/><rect x="70" y="40" width="28" height="8"/></g>
        <g fill="#5FE6FF"><rect x="166" y="40" width="28" height="8"/></g>
        <!-- ตารางที่นั่ง: ว่าง/ใกล้เต็ม/เต็ม -->
        <g class="pulse-g" fill="#8EC06C">
          <rect x="46" y="60" width="12" height="12"/><rect x="64" y="60" width="12" height="12"/>
          <rect x="118" y="78" width="12" height="12"/><rect x="46" y="96" width="12" height="12"/>
          <rect x="154" y="96" width="12" height="12"/><rect x="82" y="114" width="12" height="12"/>
        </g>
        <g fill="#ECB731">
          <rect x="82" y="60" width="12" height="12"/><rect x="136" y="60" width="12" height="12"/>
          <rect x="64" y="78" width="12" height="12"/><rect x="172" y="78" width="12" height="12"/>
          <rect x="100" y="96" width="12" height="12"/><rect x="46" y="114" width="12" height="12"/>
        </g>
        <g fill="#ED1B2E">
          <rect x="100" y="60" width="12" height="12"/><rect x="46" y="78" width="12" height="12"/>
          <rect x="136" y="96" width="12" height="12"/><rect x="118" y="114" width="12" height="12"/>
        </g>
        <g fill="rgba(255,255,255,0.09)">
          <rect x="118" y="60" width="12" height="12"/><rect x="154" y="60" width="12" height="12"/>
          <rect x="172" y="60" width="12" height="12"/><rect x="82" y="78" width="12" height="12"/>
          <rect x="100" y="78" width="12" height="12"/><rect x="136" y="78" width="12" height="12"/>
          <rect x="154" y="78" width="12" height="12"/><rect x="64" y="96" width="12" height="12"/>
          <rect x="82" y="96" width="12" height="12"/><rect x="118" y="96" width="12" height="12"/>
          <rect x="172" y="96" width="12" height="12"/><rect x="64" y="114" width="12" height="12"/>
          <rect x="100" y="114" width="12" height="12"/><rect x="136" y="114" width="12" height="12"/>
          <rect x="154" y="114" width="12" height="12"/><rect x="172" y="114" width="12" height="12"/>
        </g>
        <!-- เส้นแนวโน้มแบบขั้นบันได วาดตัวเองตอนเลื่อนมาถึง -->
        <path class="draw" d="M46 156h18v-12h18v-12h18v18h18v-24h18v12h18v-18h18" fill="none"
              stroke="#5FE6FF" stroke-width="4" shape-rendering="auto"/>
      </g>
      <!-- ดาวพิกเซลรอบ ๆ -->
      <g class="spark" fill="#C15CF0">
        <rect x="10" y="52" width="5" height="5"/><rect x="222" y="86" width="5" height="5"/>
        <rect x="18" y="176" width="5" height="5"/><rect x="216" y="196" width="5" height="5"/>
      </g>
    </svg>`,
  },
]

// ตัวที่ติดธง hidden จะไม่โผล่ทั้งการ์ดและปุ่ม demo
const visibleProducts = products.filter((p) => !p.hidden)

// ปุ่มใต้ Executive Brief — อ้างผลิตภัณฑ์ชุดเดียวกัน จะได้ไม่ต้องแก้ลิงก์สองที่
const demoIcons = {
  'MOMAY ENLIGHTENED': `<svg viewBox="0 0 24 24"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3.2"/></svg>`,
  'MOMAY STUDENT': `<svg viewBox="0 0 24 24"><circle cx="12" cy="7.6" r="3"/><path d="M5.5 19.5a6.5 6.5 0 0 1 13 0"/></svg>`,
  'MOMAY EXECUTIVE BRIEF': `<svg viewBox="0 0 24 24"><path d="M6 3.5h8L18.5 8v12.5h-12.5z"/><path d="M13.5 3.7V8.2H18"/><path d="M9 12.5h6M9 16h4"/></svg>`,
  'MOMAY STUDENT_PIXEL': `<svg viewBox="0 0 24 24"><path d="M8.4 8h7.2a4.4 4.4 0 0 1 4.3 3.5l.9 4.4A2.6 2.6 0 0 1 16 17.6l-1-1.1H9l-1 1.1a2.6 2.6 0 0 1-4.8-1.7l.9-4.4A4.4 4.4 0 0 1 8.4 8z"/><path d="M7.4 11.4v2.4M6.2 12.6h2.4"/><path d="M15.6 11.9h.01M17.4 13.4h.01"/></svg>`,
}

const demoLinks = visibleProducts.map((p) => ({
  key: p.name,
  label: p.name.replace(/^MOMAY\s+/, ''),
  color: p.color,
  link: p.link,
  icon: demoIcons[p.name],
}))

// สี่ใบต่อแถวได้เฉพาะจอกว้าง พอเหลือน้อยกว่านั้นให้เรียงแถวเดียวไปเลย จะได้ไม่มีช่องว่างค้าง
const productCols = visibleProducts.length
const productColsMd = productCols >= 4 ? 2 : productCols
const demoCols = demoLinks.length
const demoColsSm = demoCols >= 4 ? 2 : demoCols

const orgs = [
  { name: 'มหาวิทยาลัยนเรศวร', logo: '/NU_crest.png' },
  { name: 'มหาวิทยาลัยบูรพา', logo: '/BUU_crest.png' },
]

const benefits = [
  {
    title: 'REAL EXPERIENCE',
    note: 'จากการใช้งานจริงในหลายองค์กร',
    icon: `<svg viewBox="0 0 24 24"><path d="M2.6 20.6h18.8"/><path d="M5.4 20.6V6.4l6.4-2.8v17"/><path d="M11.8 11.2l6.8 2.4v7"/><path d="M7.8 8.4h1.8M7.8 11.6h1.8M7.8 14.8h1.8M14.6 15.4h1.6"/></svg>`,
  },
  {
    title: 'SECURE & PRIVATE',
    note: 'ปลอดภัยตามมาตรฐานระดับองค์กร',
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2.6l8 3.2v6c0 5-3.4 8.4-8 9.6-4.6-1.2-8-4.6-8-9.6v-6z"/><rect x="9" y="11" width="6" height="5.4" rx="1.4"/><path d="M10.4 11V9.6a1.6 1.6 0 0 1 3.2 0V11"/></svg>`,
  },
  {
    title: 'EASY TO INTEGRATE',
    note: 'เชื่อมต่อกับระบบเดิมได้อย่างยืดหยุ่น',
    icon: `<svg viewBox="0 0 24 24"><path d="M10.4 13.6a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 0 0-5.7-5.7l-1.3 1.3"/><path d="M13.6 10.4a4 4 0 0 0-5.7 0l-2.8 2.8a4 4 0 0 0 5.7 5.7l1.3-1.3"/></svg>`,
  },
]


/* ══════════════ 4. Executive Brief (ตัวเลขขยับแบบ live) ══════════════ */
const hourTicks = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']

const kpis = reactive([
  { label: 'PEOPLE NOW', value: 245, decimals: 0, unit: ' คน', delta: '12%', dir: 'up', color: '#ffffff' },
  { label: 'OCCUPANCY', value: 72, decimals: 0, unit: '%', delta: '12%', dir: 'up', color: '#8EC06C' },
  { label: 'ENERGY TODAY', value: 182, decimals: 0, unit: ' kWh', delta: '8%', dir: 'down', color: '#ECB731' },
  { label: 'ENVIRONMENT', value: 28, decimals: 0, unit: '°C', delta: 'PM2.5 12 µg/m³', dir: 'flat', color: '#56A0D3' },
])

const floors = reactive([
  { name: 'ชั้น 4', value: 88, color: 'linear-gradient(90deg,#56A0D3,#7FD3FF)' },
  { name: 'ชั้น 3', value: 67, color: 'linear-gradient(90deg,#8EC06C,#C4E59F)' },
  { name: 'ชั้น 2', value: 54, color: 'linear-gradient(90deg,#ECB731,#FFE08A)' },
  { name: 'ชั้น 1', value: 38, color: 'linear-gradient(90deg,#ED1B2E,#FF7B6B)' },
  { name: 'ชั้น G', value: 22, color: 'linear-gradient(90deg,#7F181B,#ED1B2E)' },
])

const actions = [
  'เปิดพื้นที่ชั้น 2 โซนหน้าต่างเพิ่ม',
  'กระจายกิจกรรมไปยังชั้น 3',
  'ตรวจสอบระบบปรับอากาศชั้น 5',
]

const clock = ref('')
const clockShort = computed(() => clock.value.split(' | ')[0] || '')
const updateClock = () => {
  const now = new Date()
  const time = new Intl.DateTimeFormat('th-TH', {
    timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).format(now)
  const date = new Intl.DateTimeFormat('th-TH-u-ca-buddhist', {
    timeZone: 'Asia/Bangkok', day: 'numeric', month: 'short', year: 'numeric',
  }).format(now)
  clock.value = `${time} | ${date}`
}

/* ══════════════ 5. กราฟ TODAY'S STORY ══════════════ */
const W = 320
const H = 132
const seriesA = [28, 22, 30, 54, 92, 118, 96, 74, 88, 60, 40, 26, 20]
const seriesB = [18, 15, 20, 34, 52, 66, 58, 48, 54, 42, 30, 20, 16]

const toPoints = (values) => {
  const max = Math.max(...values) * 1.18
  return values.map((v, i) => ({
    x: (i / (values.length - 1)) * W,
    y: H - 10 - (v / max) * (H - 26),
  }))
}
// เส้นโค้งนุ่ม (Catmull-Rom → Bézier)
const smooth = (pts) => {
  if (!pts.length) return ''
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

const pointsA = toPoints(seriesA)
const linePath = smooth(pointsA)
const linePathAlt = smooth(toPoints(seriesB))
const areaPath = `${linePath} L ${W} ${H} L 0 ${H} Z`
const peak = pointsA.reduce((a, b) => (b.y < a.y ? b : a), pointsA[0])
const peakPos = {
  left: `${((peak.x / W) * 100).toFixed(2)}%`,
  top: `${((peak.y / H) * 100).toFixed(2)}%`,
}

/* ══════════════ 6. ฉากหลัง: เส้นขอบฟ้า + จุดข้อมูล (สุ่มแบบคงที่) ══════════════ */
const lcg = (seed) => () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296)

const makeSkyline = (seed, height, minW, maxW, minH, maxH) => {
  const rnd = lcg(seed)
  let x = 0
  let d = `M0 ${height}`
  while (x < 1200) {
    const w = minW + rnd() * (maxW - minW)
    const h = minH + rnd() * (maxH - minH)
    d += ` L${x.toFixed(0)} ${(height - h).toFixed(0)} L${(x + w).toFixed(0)} ${(height - h).toFixed(0)}`
    x += w
  }
  return `${d} L1200 ${height} Z`
}
const skylineFar = makeSkyline(7, 340, 34, 76, 60, 210)
const skylineNear = makeSkyline(29, 300, 46, 104, 40, 160)

const particles = Array.from({ length: 34 }, (_, i) => {
  const rnd = lcg(i * 977 + 13)
  return {
    id: i,
    left: `${(rnd() * 100).toFixed(2)}%`,
    top: `${(20 + rnd() * 74).toFixed(2)}%`,
    delay: `${(rnd() * 8).toFixed(2)}s`,
    duration: `${(7 + rnd() * 9).toFixed(2)}s`,
    opacity: (0.15 + rnd() * 0.5).toFixed(2),
  }
})

/* ══════════════ 7. คารูเซล TRUSTED BY ══════════════ */
const perView = computed(() => {
  let n = 2
  if (vw.value >= 1440) n = 8
  else if (vw.value >= 976) n = 6
  else if (vw.value >= 768) n = 4
  else if (vw.value >= 480) n = 3
  // มีโลโก้น้อยกว่าช่องที่แสดงได้ ก็ไม่ต้องซอยช่องทิ้งไว้
  return Math.min(n, orgs.length)
})
const pageCount = computed(() => Math.max(1, Math.ceil(orgs.length / perView.value)))
const page = ref(0)
const pauseAuto = ref(false)
// ย่อจอแล้วจำนวนหน้าลดลง ต้องดึงหน้าปัจจุบันกลับให้อยู่ในช่วง
watch(pageCount, (n) => {
  if (page.value > n - 1) page.value = n - 1
})
const slide = (dir) => {
  page.value = (page.value + dir + pageCount.value) % pageCount.value
}

/* ══════════════ 8. การนำทาง ══════════════ */
const open = (path) => {
  if (/^https?:\/\//i.test(path)) navigateTo(path, { external: true })
  else navigateTo(path)
}
const requestDemo = () => open('/contact')
const goTo = (hash) => {
  const el = document.querySelector(hash)
  if (!el) return
  smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - 72)
}

/* ══════════════ กรอบโน้ตบุ๊ค ══════════════ */
/* ผังคอนโซลออกแบบไว้ที่ความกว้างจอคอม — ย่อทั้งผังลงให้พอดีจอโน้ตบุ๊ค
   จะได้เห็นเป็นแดชบอร์ดจริงเหมือนถ่ายหน้าจอมา ไม่ใช่ผังที่ถูกบีบจนเพี้ยน
   CSS หารความยาวกันเองไม่ได้ เลยต้องวัดแล้วส่ง --k เข้าไป */
const LAPTOP_STAGE_W = 1180
let laptopRO = null
const fitLaptop = () => {
  document.querySelectorAll('.laptop').forEach((el) => {
    const screen = el.querySelector('.laptop__screen')
    if (screen && screen.clientWidth) el.style.setProperty('--k', screen.clientWidth / LAPTOP_STAGE_W)
  })
}

/* ══════════════ 9. วงจรชีวิตคอมโพเนนต์ ══════════════ */
let clockTimer = null
let driftTimer = null
let autoTimer = null

onMounted(() => {
  vw.value = window.innerWidth
  io = new IntersectionObserver(onIntersect, { rootMargin: '0px 0px 18% 0px', threshold: 0.01 })
  waiting.splice(0).forEach((el) => io.observe(el))

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  readScroll()
  heroY.value = targetHeroY
  scrollProgress.value = targetProgress
  smoothRaf = requestAnimationFrame(smoothStep)

  updateClock()
  clockTimer = setInterval(updateClock, 10000)

  // ขยับตัวเลขเล็กน้อยให้รู้สึกเป็นข้อมูลสด
  driftTimer = setInterval(() => {
    if (document.hidden) return
    kpis[0].value = 238 + Math.round(Math.random() * 16)
    kpis[1].value = 69 + Math.round(Math.random() * 7)
    kpis[2].value = 176 + Math.round(Math.random() * 12)
    kpis[3].value = 27 + Math.round(Math.random() * 2)
    enDensity.value = 5 + Math.round(Math.random() * 7)
    enPeople.value = 36 + Math.round(Math.random() * 12)
    enDoors.forEach((d) => {
      d.in += Math.round(Math.random() * 2)
      d.out += Math.round(Math.random() * 2)
    })
    enPower.value = 1270 + Math.round(Math.random() * 40)
    enZones.forEach((z) => {
      z.people = Math.max(0, z.people + Math.round((Math.random() - 0.5) * 3))
      z.pct = Math.max(1, Math.min(99, z.pct + Math.round((Math.random() - 0.5) * 4)))
    })
    // ที่นั่งในแอปนักศึกษาขยับตามด้วย ห้องเล็กเปลี่ยนช้ากว่าโซนใหญ่
    studentFloors.forEach((f) => {
      f.zones.forEach((z) => {
        const step = Math.max(1, Math.round(z.total * 0.06))
        z.used = Math.max(0, Math.min(z.total, z.used + Math.round((Math.random() - 0.5) * step * 2)))
      })
    })
  }, 4200)

  autoTimer = setInterval(() => {
    if (!pauseAuto.value && !document.hidden) slide(1)
  }, 5000)

  nextTick(() => {
    fitLaptop()
    if (window.ResizeObserver) {
      laptopRO = new ResizeObserver(fitLaptop)
      document.querySelectorAll('.laptop__screen').forEach((el) => laptopRO.observe(el))
    }
    requestAnimationFrame(() => { heroReady.value = true })
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  clearInterval(clockTimer)
  clearInterval(driftTimer)
  clearInterval(autoTimer)
  cancelAnimationFrame(smoothRaf)
  cancelAnimationFrame(scrollAnimRaf)
  io && io.disconnect()
  io = null
  laptopRO && laptopRO.disconnect()
  laptopRO = null
})
</script>

<style scoped>
/* ══════════════ ฐาน ══════════════ */
.momay-landing {
  --ink: #06060a;
  --ink2: #0a0a11;
  --panel: rgba(17, 17, 24, 0.72);
  --line: rgba(255, 255, 255, 0.09);
  --red: #ed1b2e;
  --red-deep: #7f181b;
  --txt: #f2f2f5;
  --muted: #9b9ba6;
  position: relative;
  background: var(--ink);
  color: var(--txt);
  overflow-x: clip;
}
.wrap {
  width: min(1240px, 92vw);
  margin-inline: auto;
}
.center {
  display: flex;
  justify-content: center;
  margin-top: clamp(28px, 4vw, 44px);
}
section {
  scroll-margin-top: 80px;
}

/* ══════════════ animation ตอนเลื่อนถึง ══════════════ */
/* เส้นโค้งกลางของทั้งหน้า — ออกตัวเร็ว จบช้า ทำให้ทุกอย่างรู้สึกลื่นเป็นชุดเดียวกัน */
.momay-landing {
  --ease: cubic-bezier(0.22, 1, 0.36, 1);      /* ease-out — ใช้กับ hover/ปฏิสัมพันธ์ */
  --ease-io: cubic-bezier(0.65, 0, 0.35, 1);  /* ease-in-out — ใช้กับการเฟดข้อความเข้า */
  --dur: 1.05s;
}
.reveal {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
  filter: blur(9px);
  transition: opacity var(--dur) var(--ease-io), transform var(--dur) var(--ease-io), filter var(--dur) var(--ease-io);
  will-change: opacity, transform, filter;
}
.reveal--left { transform: translate3d(-44px, 0, 0); }
.reveal--right { transform: translate3d(44px, 0, 0); }
.reveal--zoom { transform: scale(0.94) translate3d(0, 20px, 0); }
/* คืน will-change หลังเล่นจบ ไม่ให้ค้าง layer ไว้ทั้งหน้า */
.reveal.is-in { opacity: 1; transform: none; filter: blur(0); will-change: auto; }

/* ข้อความเลื่อนขึ้นจากใต้เส้น (mask reveal) */
.line { display: block; overflow: hidden; padding-bottom: 0.08em; }
.line__in {
  display: inline-block;
  transform: translate3d(0, 110%, 0);
  opacity: 0;
  transition: transform var(--dur) var(--ease-io) var(--d, 0ms), opacity var(--dur) var(--ease-io) var(--d, 0ms);
}
.line__in--red { color: var(--red); text-shadow: 0 0 40px rgba(237, 27, 46, 0.45); }
.mm-hero-ready .line__in,
.is-in .line__in { transform: none; opacity: 1; }

/* ── แยกตัวอักษร: ไล่ทีละตัวพร้อมเบลอจาง ── */
.line__in.split { transform: none; opacity: 1; }
/* ห้ามเปลี่ยน display ของตัว container — h2/p ต้องเป็น block ต่อไป ไม่งั้นจะไหลไปต่อบรรทัดเดียวกันและหลุดกึ่งกลาง */
.split__ch {
  display: inline-block;
  opacity: 0;
  transform: translate3d(0, 0.5em, 0) scale(0.94);
  filter: blur(7px);
  transition:
    opacity 0.8s var(--ease-io) calc(var(--i) * var(--step, 30ms) + var(--d, 0ms)),
    transform 0.9s var(--ease-io) calc(var(--i) * var(--step, 30ms) + var(--d, 0ms)),
    filter 0.8s var(--ease-io) calc(var(--i) * var(--step, 30ms) + var(--d, 0ms));
  will-change: opacity, transform, filter;
}
/* ในบรรทัดที่มี mask ให้ไหลขึ้นจากใต้เส้นแทน */
.line .split__ch { transform: translate3d(0, 110%, 0) rotate(5deg); filter: blur(3px); }
.split__ch--space { transform: none !important; filter: none !important; }
/* ห่อทีละคำ ไม่ให้บรรทัดตัดกลางคำเวลาที่จอแคบกว่าหัวเรื่อง */
.split__word { display: inline-block; white-space: nowrap; }
.mm-hero-ready .split__ch,
.is-in .split__ch { opacity: 1; transform: none; filter: blur(0); will-change: auto; }

/* ── ไฟวิ่งผ่านคำสีแดง ── */
@supports ((-webkit-background-clip: text) or (background-clip: text)) {
  .line__in--red.split {
    background: linear-gradient(100deg, var(--red) 0%, var(--red) 38%, #ff9b86 50%, var(--red) 62%, var(--red) 100%);
    background-size: 260% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    filter: drop-shadow(0 0 30px rgba(237, 27, 46, 0.4));
    text-shadow: none;
    animation: shine 6s ease-in-out 2.2s infinite;
  }
  .line__in--red.split .split__ch { color: var(--red); }
}

/* ══════════════ ปุ่ม ══════════════ */
.mm-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.09em;
  padding: 11px 22px;
  cursor: pointer;
  border: 1px solid transparent;
  background: transparent;
  color: var(--txt);
  transform: translate3d(var(--mx, 0px), var(--my, 0px), 0);
  transition: transform 0.55s var(--ease), background 0.4s var(--ease), box-shadow 0.5s var(--ease), color 0.35s ease;
}
.mm-btn--lg { padding: 15px 30px; font-size: 0.84rem; }
.mm-btn--solid {
  background: linear-gradient(120deg, var(--red) 0%, #ff4d3d 100%);
  color: #fff;
  box-shadow: 0 12px 34px rgba(237, 27, 46, 0.32);
}
.mm-btn--solid:hover { transform: translate3d(var(--mx, 0px), calc(var(--my, 0px) - 3px), 0); box-shadow: 0 18px 44px rgba(237, 27, 46, 0.45); }
.mm-btn--ghost { border-color: rgba(237, 27, 46, 0.65); color: #ffd9dc; }
.mm-btn--ghost:hover { background: rgba(237, 27, 46, 0.14); transform: translate3d(var(--mx, 0px), calc(var(--my, 0px) - 2px), 0); }

/* ปุ่ม MOMAY MAP บนแถบนำทาง — แสงวิ่งรอบขอบเหมือนปุ่มปิดท้ายของแต่ละผลิตภัณฑ์ */
.mm-btn.nav__cta,
.chip--cta .mm-btn {
  position: relative;
  isolation: isolate;
  border: 0;
  background: transparent;
  color: #ffe6e8;
}
.mm-btn.nav__cta::before,
.chip--cta .mm-btn::before {
  content: '';
  position: absolute;
  inset: -1.2px;
  z-index: -2;
  border-radius: inherit;
  background: conic-gradient(
    from var(--btn-a),
    rgba(255, 255, 255, 0.05) 0deg,
    rgba(255, 255, 255, 0.05) 216deg,
    var(--red) 272deg,
    #ffffff 302deg,
    var(--red) 332deg,
    rgba(255, 255, 255, 0.05) 360deg
  );
  animation: btnSweep 4.2s linear infinite;
}
.mm-btn.nav__cta::after,
.chip--cta .mm-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: rgba(10, 10, 16, 0.92);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
.mm-btn.nav__cta:hover,
.chip--cta .mm-btn:hover { background: transparent; }
.mm-btn.nav__cta:hover::before,
.chip--cta .mm-btn:hover::before { animation-duration: 1.8s; }
.mm-btn.nav__cta:hover::after,
.chip--cta .mm-btn:hover::after { background: rgba(30, 8, 12, 0.9); }
.mm-btn__arrow { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.45s var(--ease); }
.mm-btn:hover .mm-btn__arrow { transform: translateX(4px); }
.mm-btn__arrow--tel { width: 16px; height: 16px; stroke-linejoin: round; }
/* ปุ่มปิดท้ายของแต่ละผลิตภัณฑ์ — กว้างเท่ากัน ขอบเรืองแสงวิ่งรอบ */
@property --btn-a {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
.mm-btn--section {
  position: relative;
  isolation: isolate;
  justify-content: center;
  min-width: clamp(236px, 21vw, 296px);
  padding: 13px 24px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #fff;
  font-size: 0.66rem;
  letter-spacing: 0.18em;
}
.mm-btn--section::before {
  content: '';
  position: absolute;
  inset: -1.4px;
  z-index: -2;
  border-radius: inherit;
  background: conic-gradient(
    from var(--btn-a),
    rgba(255, 255, 255, 0.06) 0deg,
    rgba(255, 255, 255, 0.06) 214deg,
    var(--accent) 268deg,
    #ffffff 300deg,
    var(--accent) 332deg,
    rgba(255, 255, 255, 0.06) 360deg
  );
  animation: btnSweep 3.6s linear infinite;
}
.mm-btn--section::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: #0b0b11;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
}
.mm-btn--section:hover { transform: translate3d(var(--mx, 0px), calc(var(--my, 0px) - 2px), 0); }
.mm-btn--section:hover::before { animation-duration: 1.6s; }
.mm-btn--section:hover::after { background: #12121a; }
@keyframes btnSweep { to { --btn-a: 360deg; } }
.mm-btn:hover .mm-btn__arrow--tel { transform: rotate(-12deg) scale(1.08); }

/* ══════════════ แถบความคืบหน้า + NAV ══════════════ */
.scroll-progress {
  position: fixed;
  inset: 0 0 auto 0;
  height: 3px;
  transform-origin: 0 50%;
  background: linear-gradient(90deg, var(--red-deep), var(--red), #ff7a5c);
  z-index: 60;
}
.nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 55;
  transition: background 0.5s var(--ease), backdrop-filter 0.5s var(--ease), border-color 0.5s var(--ease);
  border-bottom: 1px solid transparent;
}
.nav--solid {
  background: rgba(6, 6, 10, 0.82);
  backdrop-filter: blur(14px);
  border-bottom-color: var(--line);
}
.nav__inner {
  display: flex;
  align-items: center;
  gap: clamp(14px, 1.5vw, 22px);
  height: 92px;
  /* ตัวหนังสือใหญ่ขึ้นเท่าตัว แถบบนจึงกินความกว้างมากกว่าเนื้อหาหน้า */
  width: min(1720px, 95vw);
}
.brand { display: inline-flex; align-items: center; gap: 13px; text-decoration: none; color: inherit; }
.brand__mark { width: auto; height: 42px; flex: none; object-fit: contain; filter: drop-shadow(0 0 12px rgba(237, 27, 46, 0.45)); transition: filter 0.45s var(--ease), transform 0.45s var(--ease); }
.brand:hover .brand__mark { filter: drop-shadow(0 0 20px rgba(237, 27, 46, 0.8)); transform: translateY(-1px) scale(1.04); }
.brand__text { display: flex; flex-direction: column; line-height: 1.05; }
.brand__text strong { font-family: 'Poppins', 'Inter', sans-serif; font-size: 2.12rem; letter-spacing: 0.09em; }
.brand__text small { font-size: 1rem; letter-spacing: 0.1em; white-space: nowrap; color: var(--muted); }
.nav__live { display: flex; align-items: center; margin-left: auto; }
.mm-btn.nav__cta { font-size: 1.1rem; letter-spacing: 0.07em; padding: 14px 28px; white-space: nowrap; }
.nav__live-tag { font-size: 1.16rem; padding-right: 20px; }
.navkpi {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 0 clamp(12px, 1.1vw, 20px);
  position: relative;
}
.navkpi::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.09);
}
.navkpi__label { font-style: normal; font-size: 1.16rem; letter-spacing: 0.06em; white-space: nowrap; color: var(--muted); }
.navkpi__value {
  font-family: 'Poppins', 'Inter', sans-serif;
  font-weight: 700;
  font-size: 2.28rem;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.navkpi__value em { font-style: normal; font-size: 1.16rem; letter-spacing: 0.06em; color: var(--muted); margin-left: 6px; }
/* ══════════════ HERO ══════════════ */
.mm-hero {
  position: relative;
  display: flex;
  align-items: stretch;
  min-height: 100svh;
  /* แถบบนสูงขึ้นตามตัวหนังสือ และเว้นขอบล่างมากขึ้นให้ปุ่มเดโมไม่ติดขอบจอ */
  padding: clamp(104px, 13vh, 158px) 0 clamp(96px, 14vh, 200px);
  overflow: hidden;
}
.mm-hero__bg { position: absolute; inset: 0; z-index: 0; }
.mm-hero__bg > * { position: absolute; will-change: transform; }
.mm-hero__glow {
  inset: -18% -10% auto -10%;
  height: 92%;
  background:
    radial-gradient(58% 52% at 22% 34%, rgba(237, 27, 46, 0.3), transparent 70%),
    radial-gradient(46% 42% at 78% 22%, rgba(127, 24, 27, 0.34), transparent 72%),
    radial-gradient(70% 60% at 50% 96%, rgba(237, 27, 46, 0.18), transparent 70%);
  filter: blur(6px);
}
.mm-hero__grid { inset: 0; width: 100%; height: 100%; opacity: 0.75; }
.mm-hero__people {
  left: auto;
  right: -3%;
  top: 4%;
  width: min(82%, 1250px);
  height: 90%;
  object-fit: cover;
  object-position: right 42%;
  opacity: 0.88;
  filter: brightness(1.3) contrast(1.04) saturate(1.12);
  mix-blend-mode: screen;
  -webkit-mask-image: radial-gradient(82% 92% at 64% 48%, #000 18%, rgba(0, 0, 0, 0.6) 60%, transparent 88%);
  mask-image: radial-gradient(72% 82% at 66% 48%, #000 10%, rgba(0, 0, 0, 0.5) 52%, transparent 84%);
}
.mm-hero__streams { inset: 0; width: 100%; height: 100%; }
.mm-hero__city { left: 0; right: 0; bottom: 0; width: 100%; }
.mm-hero__city--far { height: 46%; opacity: 0.9; }
.mm-hero__city--near { height: 34%; }
.mm-hero__vignette {
  inset: 0;
  background:
    linear-gradient(90deg, rgba(6, 6, 10, 0.72) 4%, rgba(6, 6, 10, 0.26) 44%, rgba(6, 6, 10, 0.72) 100%),
    linear-gradient(180deg, rgba(6, 6, 10, 0.9) 0%, transparent 26%, rgba(6, 6, 10, 0.94) 96%);
}
.mm-hero__particles { inset: 0; }
.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--red);
  box-shadow: 0 0 10px rgba(237, 27, 46, 0.8);
  animation: driftUp linear infinite;
}
.stream {
  stroke-dasharray: 12 220;
  animation: streamRun 9s linear infinite;
}
.stream--2 { animation-duration: 12s; animation-delay: -3s; }
.stream--3 { animation-duration: 15s; animation-delay: -6s; }

.mm-hero__inner {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  /* แถวข้อความกินที่ที่เหลือแล้วจัดกึ่งกลางในตัวมัน แถวปุ่มเดโมจึงตกไปชิดขอบล่างเสมอ */
  grid-template-rows: 1fr auto;
  gap: clamp(28px, 4vw, 44px);
  align-items: center;
  perspective: 1400px;
}
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  /* ขนาดเดียวกับ .mm-hero__sub (BEFORE IT IS TOO LATE.) */
  font-size: clamp(0.95rem, max(1.7vw, 2vh), 1.6rem);
  letter-spacing: 0.2em;
  color: #ffb3b9;
  margin-bottom: 16px;
}
.eyebrow__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--red);
  box-shadow: 0 0 0 6px rgba(237, 27, 46, 0.16);
  animation: pulseDot 2.4s ease-in-out infinite;
}
.mm-hero__copy { text-shadow: 0 2px 18px rgba(0, 0, 0, 0.75); }
.mm-hero__copy .eyebrow, .mm-hero__eyebrow { margin-bottom: clamp(12px, 2vh, 28px); }
.mm-hero__title {
  font-family: 'Poppins', 'Inter', sans-serif;
  font-weight: 800;
  font-size: clamp(2.9rem, max(8vw, 10vh), 7.4rem);
  line-height: 0.94;
  letter-spacing: -0.025em;
  margin: 0;
}
.mm-hero__sub {
  font-family: 'Poppins', 'Inter', sans-serif;
  font-weight: 600;
  font-size: clamp(0.95rem, max(1.7vw, 2vh), 1.6rem);
  letter-spacing: 0.16em;
  color: #e2e2e8;
  margin: clamp(14px, 3vh, 44px) 0 0;
}
.mm-hero__thai {
  color: #eaeaf0;
  font-size: clamp(0.95rem, max(1.4vw, 1.65vh), 1.3rem);
  line-height: 2;
  margin: clamp(18px, 3.4vh, 48px) 0 0;
  word-spacing: 0.06em;
}
.mm-hero__chips {
  display: none;
  margin: 0;
  padding: 0;
  list-style: none;
}
.chip { display: flex; align-items: center; gap: 11px; }
/* เหลือแค่ปุ่ม SEE CUSTOMERS ของจอแนวตั้ง — จอกว้างใช้ปุ่มบนแถบบนอยู่แล้ว */
.chip--cta { display: none; }


/* ══════════════ เส้นคั่นแบบขอบฟ้าอวกาศ ══════════════ */
.defs-only { position: absolute; width: 0; height: 0; overflow: hidden; }
/* กล่องสูง 0 + ลอยทับรอยต่อ เพื่อไม่ให้เกิดแถบสีดำคนละเฉดกับ section ข้างเคียง */
.hr-space {
  position: relative;
  z-index: 3;
  height: 0;
  pointer-events: none;
}
.hr-space svg {
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: clamp(-62px, -5vw, -36px);
  width: 100%;
  height: clamp(72px, 8vw, 124px);
  overflow: visible;
}
.hr-space path { filter: drop-shadow(0 0 9px rgba(237, 27, 46, 0.6)); }
.hr-space__star {
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
  opacity: 0.25;
  animation: twinkle 5.5s ease-in-out infinite;
  animation-delay: var(--d);
}

/* ══════════════ แถบข้อความวิ่ง ══════════════ */

/* ══════════════ การ์ด EXECUTIVE BRIEF ══════════════ */
.brief {
  border-radius: 18px;
  border: 1px solid var(--line);
  background: linear-gradient(160deg, rgba(20, 20, 28, 0.92), rgba(10, 10, 16, 0.94));
  box-shadow: 0 40px 90px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  padding: clamp(14px, 1.6vw, 20px);
  backdrop-filter: blur(10px);
}
.brief__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--line);
}
.brief__title { font-size: 0.72rem; font-weight: 800; letter-spacing: 0.2em; color: var(--red); }
.brief__meta { display: flex; align-items: center; gap: 12px; font-size: 0.64rem; color: var(--muted); }
.brief__meta em { font-style: normal; }
.live { display: inline-flex; align-items: center; gap: 6px; color: #ff9aa2; letter-spacing: 0.14em; }
.live i { width: 6px; height: 6px; border-radius: 50%; background: var(--red); animation: pulseDot 1.6s ease-in-out infinite; }

.kpis { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; margin-top: 12px; }
.kpi {
  border: 1px solid var(--line);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.028);
  padding: 10px 11px;
  transition: border-color 0.45s var(--ease), transform 0.45s var(--ease);
}
.kpi:hover { border-color: rgba(237, 27, 46, 0.45); transform: translateY(-2px); }
.kpi__label { display: block; font-size: 0.53rem; letter-spacing: 0.14em; color: var(--muted); }
.kpi__value { display: block; font-family: 'Poppins', 'Inter', sans-serif; font-weight: 700; font-size: clamp(1.05rem, 1.7vw, 1.45rem); line-height: 1.35; }
.kpi__value em { font-style: normal; font-size: 0.56rem; letter-spacing: 0.08em; color: var(--muted); margin-left: 3px; }
.kpi__delta { display: inline-flex; align-items: center; gap: 3px; font-size: 0.54rem; }
.kpi__delta svg { width: 10px; height: 10px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
.kpi__delta.is-up { color: #8ec06c; }
.kpi__delta.is-down { color: #ed1b2e; }
.kpi__delta.is-flat { color: var(--muted); }

.brief__row { display: grid; grid-template-columns: 1.25fr 1fr; gap: 8px; margin-top: 8px; }
.brief-showcase { max-width: 880px; margin: clamp(30px, 4vw, 52px) auto 0; }
/* การ์ดสองใบวางแยกซ้าย-ขวา ไม่ซ้อนกันแล้ว — เริ่มต้นกว้างเท่ากัน
   กดใบไหน คอลัมน์ของใบนั้นจะยืดออก อีกใบหดลงเป็นตัวอย่างข้าง ๆ */
.brief-showcase--laptop.brief-showcase--stack {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  gap: clamp(12px, 1.6vw, 28px);
  width: min(1840px, 94vw);
  max-width: none;
  /* ชุดการ์ดกว้างกว่า .wrap ที่ครอบอยู่ — margin auto จะกลายเป็น 0 แล้วล้นไปทางขวาข้างเดียว
     คิดระยะเองให้มันยื่นออกทั้งสองข้างเท่ากัน */
  margin-inline: calc((100% - min(1840px, 94vw)) / 2);
  margin-top: 0;
  perspective: 1900px;
  transition: grid-template-columns 0.85s cubic-bezier(0.16, 1, 0.3, 1);
}
/* ── กดแล้วเด้งมากลางหน้าจอ ──
   position: fixed จะยึดกับ viewport ได้ก็ต่อเมื่อไม่มีบรรพบุรุษตั้ง transform/filter/perspective
   ตัวชุดการ์ดเองมีทั้ง perspective และ filter (จาก .reveal) จึงต้องปิดทิ้งตอนเปิด */
.brief-showcase--stack.is-front,
.brief-showcase--stack.is-back {
  perspective: none;
  filter: none;
}
.brief-showcase--stack.is-front::before,
.brief-showcase--stack.is-back::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 80;
  background: rgba(4, 4, 8, 0.86);
  backdrop-filter: blur(7px);
  animation: fadeIn 0.35s ease forwards;
}
.brief-showcase--stack.is-front .laptop__stage,
.brief-showcase--stack.is-back .en__backframe {
  position: fixed;
  z-index: 90;
  left: 50%;
  top: 50%;
  /* ไม่ให้สูงเกินจอ — 880/576 คืออัตราส่วนของการ์ด */
  width: min(1240px, 94vw, calc(86vh * 880 / 576));
  transform: translate(-50%, -50%);
  filter: none;
  opacity: 1;
  box-shadow: 0 60px 140px rgba(0, 0, 0, 0.72);
}
/* บนจอกว้าง กรอบโน้ตบุ๊คถูกยุบด้วย display:contents — ลูกที่เป็นคอลัมน์จริงคือ .brief
   ส่วนบนจอแนวตั้งกรอบกลับมาเป็นกล่องจริง จึงตั้ง order ไว้ทั้งสองตัว */
.brief-showcase--stack .laptop,
.brief-showcase--stack .laptop__stage { order: 1; min-width: 0; }
.brief-showcase--stack .laptop__stage {
  container-type: inline-size;
  aspect-ratio: 880 / 576;
  overflow: hidden;
  border-radius: 18px;
  cursor: pointer;
  transform-origin: 50% 50%;
  transform: rotateY(4deg);
  transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.9s ease, opacity 0.7s ease;
}
.brief-showcase--stack .en__backframe { order: 2; }
.en__wordmark {
  position: absolute;
  z-index: 1;
  display: inline-flex;
  flex-direction: column;
  gap: 0.02em;
  font-family: 'Poppins', 'Inter', sans-serif;
  font-size: clamp(1rem, 2vw, 2.1rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.04em;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  transform-style: preserve-3d;
  text-shadow:
    1px 1px 0 rgba(255, 255, 255, 0.16),
    3px 4px 0 rgba(6, 6, 10, 0.72),
    8px 10px 18px rgba(0, 0, 0, 0.52),
    0 0 30px rgba(237, 27, 46, 0.55),
    0 0 58px rgba(237, 27, 46, 0.3);
}
/* คำแรกแดงตามแบรนด์ (เน้นให้เด่น) คำหลังขาวไว้ตัดกัน */
.en__wordmark {
  color: #ff2436;
}
.en__wordmark b {
  font-weight: 700;
  color: #f3f3f6;
  text-shadow:
    1px 1px 0 rgba(255, 255, 255, 0.22),
    3px 4px 0 rgba(56, 56, 64, 0.72),
    8px 10px 18px rgba(0, 0, 0, 0.55);
}
/* ชื่ออยู่เหนือการ์ดของตัวเอง ไม่ทับเนื้อหาข้างใน */
.en__wordmark--library {
  top: 0;
  left: 0;
  right: auto;
  align-items: flex-start;
  text-align: left;
  transform: translateY(-102%) rotateY(8deg) rotateX(3deg);
}
.en__wordmark--urban {
  top: 0;
  right: 0;
  left: auto;
  align-items: flex-end;
  text-align: right;
  transform: translateY(-102%) rotateY(-8deg) rotateX(3deg);
}
.en__backframe {
  position: relative;
  container-type: inline-size;
  min-width: 0;
  /* รูปทรงเดียวกับคอนโซลฝั่งซ้าย สองใบจะได้สูงเท่ากันเมื่อกว้างเท่ากัน */
  aspect-ratio: 880 / 576;
  overflow: hidden;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  /* พื้นทึบสีดำ จะได้บังคอนโซลที่อยู่ข้างหลังได้จริงตอนกดสลับ */
  background: linear-gradient(160deg, #0b0b0e, #040405);
  box-shadow: 0 40px 90px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.035);
  pointer-events: auto;
  cursor: pointer;
  transform-origin: 50% 50%;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  transform: rotateY(-4deg);
  transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.9s ease, border-color 0.7s ease, opacity 0.7s ease, filter 0.9s ease;
  will-change: transform;
}
.en__backframe > .mockup-image {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain ;
  object-position: center;
}
.en__backframe > .ex,
.en__backframe > .ub { display: none; }

/* ══════════════ แดชบอร์ดระดับเมือง ENLIGHTEN URBAN ══════════════ */
/* อยู่ในกรอบใบหลังของ section ENLIGHTENED — ย่อผังของหน้าจริงลงมาทั้งก้อน
   ใจความคือ เกิดอะไรขึ้น → เพราะอะไร → จะเป็นอย่างไรต่อ → ถ้าลงมือจะได้อะไร
   ส่วนที่เป็นรายละเอียดปลีกย่อยของหน้าจริงถูกตัดออก ให้ตัวหนังสือใหญ่พอจะอ่านได้ */
.ub {
  --ub-line: rgba(255, 255, 255, 0.09);
  --ub-panel: rgba(255, 255, 255, 0.03);
  --ub-dim: #93a2bd;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  /* ขนาดออกแบบคงที่ แล้วย่อ/ขยายทั้งก้อนตามความกว้างจริงของการ์ด
     (การ์ดตั้ง container-type ไว้ 100cqw จึงเท่ากับความกว้างการ์ด) */
  width: 880px;
  height: 576px;
  transform-origin: 0 0;
  transform: scale(calc(100cqw / 880px));
  display: grid;
  grid-template-columns: clamp(90px, 14.6%, 150px) minmax(0, 1fr);
  border-radius: inherit;
  overflow: hidden;
  font-size: 0.63rem;
  color: #e8ecf5;
}

/* ── แถบเมนูซ้าย ── */
.ub__side {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 10px 8px;
  border-right: 1px solid var(--ub-line);
  background: rgba(255, 255, 255, 0.022);
  min-width: 0;
}
.ub__logo { display: flex; align-items: center; gap: 5px; min-width: 0; }
.ub__logo i {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  flex: none;
  border-radius: 6px;
  font-style: normal;
  font-size: 0.655rem;
  font-weight: 800;
  color: #08101d;
  background: linear-gradient(140deg, #8ea6ff, #56a0d3);
}
.ub__logo span { display: flex; flex-direction: column; min-width: 0; }
.ub__logo b { font-size: 0.706rem; letter-spacing: 0.05em; }
.ub__logo em { font-style: normal; font-size: 0.428rem; letter-spacing: 0.04em; color: var(--ub-dim); white-space: nowrap; }

.ub__nav { display: grid; gap: 2px; margin: 2px 0 0; padding: 0; list-style: none; }
.ub__nav li {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 5px;
  border-radius: 6px;
  font-size: 0.58rem;
  color: var(--ub-dim);
  white-space: nowrap;
  overflow: hidden;
}
.ub__nav li.is-on { background: rgba(142, 166, 255, 0.18); color: #fff; box-shadow: inset 0 0 0 1px rgba(142, 166, 255, 0.34); }
.ub__nav :deep(svg) {
  width: 14px; height: 14px; flex: none; fill: none; stroke: currentColor;
  stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round;
}
.ub__out { margin-top: auto; font-size: 0.504rem; color: var(--ub-dim); }

/* ── ฝั่งเนื้อหา ── */
.ub__main { display: flex; flex-direction: column; gap: 6px; padding: 9px 11px 8px; min-width: 0; }
.ub__top { display: flex; align-items: center; gap: 7px; }
.ub__top > b { font-size: 0.882rem; letter-spacing: 0.09em; }
.ub__temp { font-size: 0.554rem; color: var(--ub-dim); }
.ub__org { display: flex; align-items: center; gap: 4px; margin-left: auto; }
.ub__org i {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-style: normal;
  font-size: 0.454rem;
  font-weight: 800;
  color: #08101d;
  background: #8ea6ff;
}
.ub__org span { display: flex; flex-direction: column; align-items: flex-end; }
.ub__org b { font-size: 0.655rem; letter-spacing: 0.03em; }
.ub__org em { font-style: normal; font-size: 0.428rem; color: var(--ub-dim); }

/* ── แถวบน: เกิดอะไรขึ้น · ผลกระทบ · แผนที่ ── */
.ub__hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.82fr) minmax(0, 1.65fr);
  gap: 7px;
  flex: 1.05;
  min-height: 0;
}
.ub__lead, .ub__impact {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: 8px 9px;
  border-radius: 8px;
  border: 1px solid var(--ub-line);
  background: var(--ub-panel);
}
.ub__eyebrow { font-size: 0.479rem; letter-spacing: 0.14em; color: var(--ub-dim); }
.ub__lead > b { font-size: 1.134rem; line-height: 1.3; }
.ub__lead > b em { font-style: normal; color: #ff6b74; }
.ub__lead small { font-size: 0.529rem; line-height: 1.45; color: var(--ub-dim); }
.ub__btn {
  align-self: flex-start;
  margin-top: 2px;
  padding: 4px 9px;
  border-radius: 999px;
  border: 1px solid rgba(142, 166, 255, 0.5);
  background: rgba(142, 166, 255, 0.14);
  font-size: 0.554rem;
  color: #cfd9ff;
}
.ub__impact ul { display: grid; gap: 3px; margin: 2px 0 0; padding: 0; list-style: none; }
.ub__impact li {
  position: relative;
  padding-left: 9px;
  font-size: 0.529rem;
  line-height: 1.42;
  color: #cfd6e6;
}
.ub__impact li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 5px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #8ea6ff;
}
.ub__cmp { margin: 4px 0 0; font-size: 0.504rem; color: var(--ub-dim); }
.ub__cmp b { display: block; font-size: 0.706rem; color: #ff6b74; }

/* ── แผนที่: ฐานเมือง + วงความร้อน ── */
.ub__map { display: flex; min-width: 0; }
.ub__stage {
  position: relative;
  flex: 1;
  min-width: 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(127, 212, 255, 0.22);
  /* พื้นเมืองกลางคืน: บล็อกอาคารเป็นหย่อมสว่างจาง ๆ บนพื้นน้ำเงินเข้ม */
  background:
    radial-gradient(56% 40% at 24% 26%, rgba(126, 166, 214, 0.1), transparent 72%),
    radial-gradient(50% 36% at 76% 70%, rgba(126, 166, 214, 0.08), transparent 74%),
    linear-gradient(158deg, #0e1a2b 0%, #070d17 100%);
}
/* ตารางบล็อกอาคารเอียงตามผังเมือง วางทับพื้นอีกชั้น */
.ub__stage::before {
  content: '';
  position: absolute;
  inset: -20%;
  background:
    repeating-linear-gradient(72deg, transparent 0 15px, rgba(190, 214, 240, 0.05) 15px 16px),
    repeating-linear-gradient(-16deg, transparent 0 19px, rgba(190, 214, 240, 0.04) 19px 20px);
  pointer-events: none;
}
.ub__base, .ub__corridor { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.ub__corridor { z-index: 1; }

/* ชั้นความร้อน — ตัวไล่สีอยู่ในฟิลเตอร์ของ SVG แล้ว ที่นี่แค่วางทับพื้นแผนที่ */
.ub__heat {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
}

.ub__place {
  position: absolute;
  z-index: 3;
  transform: translate(-50%, -50%);
  padding: 2px 5px;
  border-radius: 4px;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(6, 10, 18, 0.86);
  font-size: 0.554rem;
  color: #e8ecf5;
}
.ub__callout {
  position: absolute;
  z-index: 4;
  left: 52%;
  top: 20%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3px 8px;
  border-radius: 6px;
  white-space: nowrap;
  border: 1px solid rgba(237, 27, 46, 0.65);
  background: rgba(60, 12, 20, 0.9);
  font-size: 0.504rem;
  line-height: 1.25;
  color: #ffd9dc;
}
.ub__callout b { font-size: 0.756rem; color: #fff; }
.ub__chip {
  position: absolute;
  z-index: 4;
  left: 8px;
  top: 8px;
  padding: 3px 7px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(6, 10, 18, 0.86);
  font-size: 0.504rem;
  color: #e8ecf5;
}
.ub__legend {
  position: absolute;
  z-index: 4;
  right: 7px;
  top: 7px;
  display: grid;
  gap: 2px;
  margin: 0;
  padding: 5px 7px;
  list-style: none;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(6, 10, 18, 0.8);
}
.ub__legend li { display: flex; align-items: center; gap: 4px; font-size: 0.479rem; color: var(--ub-dim); }
.ub__legend li.is-on { color: #fff; }
.ub__legend i { width: 5px; height: 5px; border-radius: 1px; }
.ub__zoom {
  position: absolute;
  z-index: 4;
  right: 7px;
  bottom: 26px;
  display: grid;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(6, 10, 18, 0.86);
}
.ub__zoom i {
  display: grid;
  place-items: center;
  width: 16px;
  height: 15px;
  font-style: normal;
  font-size: 0.554rem;
  color: #e8ecf5;
}
.ub__zoom i + i { border-top: 1px solid rgba(255, 255, 255, 0.12); }
.ub__full {
  position: absolute;
  z-index: 4;
  right: 7px;
  bottom: 7px;
  padding: 3px 7px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(6, 10, 18, 0.86);
  font-size: 0.479rem;
  color: #cfd6e6;
}

/* ── แถวกลาง: สาเหตุ · คาดการณ์ · จำลอง ── */
.ub__row3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 7px; flex: 1.15; min-height: 0; }
.ub__box {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: 6px 8px 7px;
  border-radius: 8px;
  border: 1px solid var(--ub-line);
  background: var(--ub-panel);
}
.ub__btitle { display: flex; align-items: baseline; gap: 5px; font-size: 0.58rem; color: var(--ub-dim); }
.ub__btitle em { font-style: normal; font-size: 0.479rem; color: #8ea6ff; margin-left: auto; }

.ub__drivers, .ub__res, .ub__sims { display: grid; gap: 2px; margin: 0; padding: 0; list-style: none; }
.ub__drivers li, .ub__res li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  padding: 3px 6px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.04);
  font-size: 0.554rem;
  color: #cfd6e6;
}
.ub__drivers em, .ub__res em { font-style: normal; font-weight: 700; }
.ub__res .is-down { color: #8ec06c; }
.ub__res .is-up { color: #ffd98a; }
.ub__chain { display: flex; align-items: center; gap: 5px; margin: 0; }
.ub__chain i { font-style: normal; font-size: 0.63rem; color: var(--ub-dim); }
.ub__chain b { flex: 1; padding: 3px 6px; border-radius: 5px; border: 1px solid rgba(237, 27, 46, 0.4); background: rgba(237, 27, 46, 0.12); font-size: 0.554rem; }
.ub__chain em { font-style: normal; color: #ff6b74; }
.ub__effects { display: grid; gap: 2px; margin: 0; padding: 0; list-style: none; }
.ub__effects li { padding: 2px 6px; border-radius: 4px; background: rgba(255, 255, 255, 0.03); font-size: 0.479rem; color: var(--ub-dim); }

.ub__plot { position: relative; flex: 1; min-height: 26px; }
.ub__plot svg { display: block; width: 100%; height: 100%; }
.ub__peak {
  position: absolute;
  right: 1px;
  top: 0;
  padding: 2px 5px;
  border-radius: 4px;
  text-align: center;
  border: 1px solid rgba(236, 183, 49, 0.5);
  background: rgba(236, 183, 49, 0.16);
  font-size: 0.454rem;
  line-height: 1.35;
  color: #ffd98a;
}
.ub__xaxis { display: flex; justify-content: space-between; font-size: 0.454rem; color: var(--ub-dim); }
.ub__xaxis em { font-style: normal; }
.ub__tip {
  margin: 0;
  padding: 4px 6px;
  border-radius: 5px;
  background: rgba(236, 183, 49, 0.1);
  border: 1px solid rgba(236, 183, 49, 0.28);
  font-size: 0.454rem;
  line-height: 1.5;
  color: #e6d8b4;
}

.ub__sims li {
  display: grid;
  grid-template-columns: 16px minmax(0, 1fr);
  align-items: center;
  gap: 5px;
  padding: 3px 6px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.04);
  font-size: 0.529rem;
  color: #cfd6e6;
}
.ub__sims li.is-on { border: 1px solid rgba(142, 166, 255, 0.5); background: rgba(142, 166, 255, 0.16); color: #fff; }
.ub__sims i {
  display: grid;
  place-items: center;
  width: 16px;
  height: 16px;
  border-radius: 5px;
  font-style: normal;
  font-size: 0.454rem;
  font-weight: 700;
  color: #08101d;
  background: #8ea6ff;
}
.ub__sims b { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* แถวล่างเตี้ยกว่าสองแถวบน เพราะเป็นข้อความล้วน ไม่มีกราฟหรือแผนที่ */
.ub__row3--last { flex: 0.95; }
.ub__box--rec { border-color: rgba(236, 183, 49, 0.4); background: rgba(236, 183, 49, 0.09); }
.ub__box--rec > b { font-size: 0.63rem; line-height: 1.45; color: #fff; }
.ub__box--rec small { font-size: 0.479rem; line-height: 1.5; color: #d8ccab; }
.ub__box--rec em {
  font-style: normal;
  align-self: flex-start;
  margin-top: 2px;
  padding: 2px 7px;
  border-radius: 4px;
  background: rgba(142, 192, 108, 0.16);
  font-size: 0.479rem;
  color: #a9d98a;
}
.ub__alts, .ub__notes { display: grid; gap: 3px; margin: 0; padding: 0; list-style: none; align-content: start; }
.ub__alts li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  padding: 3px 6px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.04);
  font-size: 0.504rem;
  line-height: 1.4;
  color: #cfd6e6;
}
.ub__alts i {
  flex: none;
  font-style: normal;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid rgba(142, 166, 255, 0.45);
  font-size: 0.428rem;
  color: #cfd9ff;
}
.ub__notes li {
  position: relative;
  padding-left: 9px;
  font-size: 0.504rem;
  line-height: 1.4;
  color: var(--ub-dim);
}
.ub__notes li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 5px;
  width: 4px;
  height: 4px;
  border-radius: 1px;
  background: #8ea6ff;
}

.ub__foot {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding-top: 5px;
  border-top: 1px solid var(--ub-line);
  font-size: 0.479rem;
  color: var(--ub-dim);
}
.ub__foot b { letter-spacing: 0.12em; color: #e8ecf5; }
.ub__foot em { font-style: normal; margin-left: auto; }

/* ══════════════ แดชบอร์ดผู้บริหารระดับเมือง EXECUTIVE URBAN ══════════════ */
/* อยู่ในกรอบใบหลังของ section EXECUTIVE BRIEF — ธีมสว่างคนละโทนกับ ENLIGHTEN URBAN
   เพื่อให้แยกออกทันทีว่าเป็นคนละผลิตภัณฑ์ ไม่ใช่หน้าจอเดียวกันสองสี */
.ex {
  --ex-bg: #eef2f7;
  --ex-card: #ffffff;
  --ex-line: #dde5f0;
  --ex-ink: #1b2a3d;
  --ex-dim: #6b7c92;
  --ex-blue: #2f6bff;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  /* ขนาดออกแบบคงที่ แล้วย่อ/ขยายทั้งก้อนตามความกว้างจริงของการ์ด
     (การ์ดตั้ง container-type ไว้ 100cqw จึงเท่ากับความกว้างการ์ด) */
  width: 880px;
  height: 576px;
  transform-origin: 0 0;
  transform: scale(calc(100cqw / 880px));
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  border-radius: inherit;
  overflow: hidden;
  background: var(--ex-bg);
  font-size: 0.6rem;
  color: var(--ex-ink);
}

/* แถบไอคอนซ้าย — หน้าจริงมีชื่อเมนูด้วย แต่กรอบนี้แคบ เหลือแค่ไอคอน */
.ex__side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  padding: 9px 0;
  background: linear-gradient(180deg, #12203a, #0b1626);
}
.ex__logo i {
  display: grid;
  place-items: center;
  width: 21px;
  height: 21px;
  border-radius: 6px;
  font-style: normal;
  font-size: 0.62rem;
  font-weight: 800;
  color: #0b1626;
  background: linear-gradient(140deg, #7fb0ff, #2f6bff);
}
.ex__nav { display: grid; gap: 3px; margin: 2px 0 0; padding: 0; list-style: none; }
.ex__nav li {
  display: grid;
  place-items: center;
  width: 24px;
  height: 21px;
  border-radius: 6px;
  color: #7f93b3;
}
.ex__nav li.is-on { background: rgba(127, 176, 255, 0.2); color: #fff; }
.ex__nav :deep(svg) {
  width: 13px; height: 13px; fill: none; stroke: currentColor;
  stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round;
}

.ex__main { display: flex; flex-direction: column; gap: 6px; padding: 8px 10px 7px; min-width: 0; }
.ex__top { display: flex; align-items: flex-start; gap: 8px; }
.ex__brand { display: flex; flex-direction: column; min-width: 0; }
.ex__brand b { font-size: 0.72rem; letter-spacing: 0.06em; }
.ex__brand em { font-style: normal; font-size: 0.48rem; color: var(--ex-dim); }
.ex__org { display: flex; align-items: center; gap: 7px; margin-left: auto; white-space: nowrap; }
.ex__org em { font-style: normal; font-size: 0.5rem; color: var(--ex-dim); }
.ex__org b {
  padding: 3px 8px;
  border-radius: 999px;
  background: #12203a;
  font-size: 0.5rem;
  letter-spacing: 0.05em;
  color: #fff;
}

/* ── ประเด็นที่ควรรู้วันนี้ ── */
.ex__cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)) minmax(0, 0.72fr);
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.ex__cards > li {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  overflow: hidden;
  padding: 7px 8px;
  border-radius: 8px;
  border: 1px solid var(--ex-line);
  background: var(--ex-card);
}
.ex__ctop { display: flex; align-items: center; gap: 5px; }
.ex__ctop i {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  flex: none;
  border-radius: 6px;
  color: var(--c, #e2483f);
  background: color-mix(in srgb, var(--c, #e2483f) 14%, transparent);
}
.ex__ctop :deep(svg) {
  width: 11px; height: 11px; fill: none; stroke: currentColor;
  stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round;
}
.ex__ctop em {
  margin-left: auto;
  font-style: normal;
  padding: 2px 6px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--c, #e2483f) 12%, transparent);
  font-size: 0.44rem;
  font-weight: 700;
  color: var(--c, #e2483f);
}
.ex__cards b { font-size: 0.58rem; line-height: 1.4; }
.ex__cards small { font-size: 0.46rem; line-height: 1.4; color: var(--ex-dim); }
.ex__tags { display: flex; flex-wrap: wrap; gap: 3px; margin-top: auto; }
.ex__tags i {
  font-style: normal;
  padding: 2px 6px;
  border-radius: 999px;
  background: #eef2f8;
  font-size: 0.42rem;
  color: var(--ex-dim);
}
.ex__quote {
  justify-content: center;
  gap: 5px !important;
  background: #f5f8fc !important;
  border-style: dashed !important;
}
.ex__quote span { font-size: 0.5rem; line-height: 1.55; color: #33465f; }
.ex__quote em { font-style: normal; font-size: 0.44rem; color: var(--ex-dim); }

/* ── ประเด็นหลัก + ทางเลือก ── */
.ex__body { display: grid; grid-template-columns: minmax(0, 2.05fr) minmax(0, 1fr); gap: 6px; flex: 1; min-height: 0; }
.ex__panel, .ex__side2 {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: 7px 8px;
  border-radius: 8px;
  border: 1px solid var(--ex-line);
  background: var(--ex-card);
}
.ex__phead { display: flex; align-items: center; gap: 6px; }
.ex__phead i {
  display: grid;
  place-items: center;
  width: 19px;
  height: 17px;
  flex: none;
  border-radius: 5px;
  font-style: normal;
  font-size: 0.46rem;
  font-weight: 800;
  color: #fff;
  background: var(--ex-blue);
}
.ex__phead b { font-size: 0.6rem; line-height: 1.35; }
.ex__phead em {
  margin-left: auto;
  flex: none;
  font-style: normal;
  padding: 2px 6px;
  border-radius: 999px;
  background: rgba(226, 72, 63, 0.12);
  font-size: 0.42rem;
  font-weight: 700;
  color: #e2483f;
}
.ex__grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: 6px; flex: 1; min-height: 0; }
.ex__stats { display: flex; flex-direction: column; gap: 4px; min-width: 0; min-height: 0; }
.ex__stats p { margin: 0; font-size: 0.46rem; line-height: 1.45; color: var(--ex-dim); }
.ex__stat {
  display: flex;
  align-items: baseline;
  gap: 5px;
  padding: 3px 7px;
  border-radius: 6px;
  background: #f2f6fb;
}
.ex__stat b { font-family: 'Poppins', 'Inter', sans-serif; font-size: 0.72rem; color: var(--ex-blue); }
.ex__stat small { font-size: 0.42rem; color: var(--ex-dim); }
.ex__bars { display: flex; align-items: flex-end; gap: 2px; flex: 1; min-height: 22px; }
.ex__bars i { flex: 1; border-radius: 2px 2px 0 0; background: #b9cdea; }
.ex__bars i.is-peak { background: #e2483f; }
.ex__baxis { display: flex; justify-content: space-between; font-size: 0.42rem; color: var(--ex-dim); }
.ex__baxis em { font-style: normal; }

.ex__map { display: flex; flex-direction: column; gap: 4px; min-width: 0; min-height: 0; }
.ex__mtitle {
  padding: 3px 7px;
  border-radius: 6px;
  border: 1px solid var(--ex-line);
  background: #f7fafd;
  font-size: 0.46rem;
  color: var(--ex-dim);
}
.ex__stage {
  position: relative;
  flex: 1;
  min-height: 0;
  border-radius: 7px;
  overflow: hidden;
  background:
    radial-gradient(56% 40% at 24% 26%, rgba(126, 166, 214, 0.1), transparent 72%),
    linear-gradient(158deg, #0e1a2b 0%, #070d17 100%);
}
.ex__legend {
  position: absolute;
  z-index: 4;
  right: 5px;
  top: 5px;
  display: grid;
  gap: 1px;
  margin: 0;
  padding: 4px 6px;
  list-style: none;
  border-radius: 5px;
  background: rgba(6, 10, 18, 0.78);
}
.ex__legend li { font-size: 0.42rem; color: #cfd6e6; }

.ex__stitle { font-size: 0.56rem; font-weight: 700; }
.ex__opts { display: grid; gap: 4px; margin: 0; padding: 0; list-style: none; }
.ex__opts li {
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 4px 7px;
  border-radius: 7px;
  border: 1px solid var(--ex-line);
  background: #f8fafd;
}
.ex__opts li.is-on { border-color: var(--ex-blue); background: rgba(47, 107, 255, 0.07); }
.ex__okey { display: flex; align-items: center; gap: 5px; font-size: 0.44rem; font-weight: 700; color: var(--ex-blue); }
.ex__okey em { margin-left: auto; font-style: normal; font-size: 0.4rem; color: #2f9e6b; }
.ex__opts b { font-size: 0.52rem; line-height: 1.35; }
.ex__opts small { font-size: 0.44rem; color: var(--ex-dim); }
.ex__opts small em { font-style: normal; font-weight: 700; color: var(--ex-ink); }
.ex__opts small i { font-style: normal; margin-left: 3px; color: #2f9e6b; }
.ex__save {
  margin-top: auto;
  padding: 5px;
  border-radius: 7px;
  text-align: center;
  background: var(--ex-blue);
  font-size: 0.5rem;
  font-weight: 700;
  color: #fff;
}

/* ── ภาพรวมเมือง + แนวโน้ม 7 วัน ── */
.ex__glance { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 6px; }
.ex__stats2, .ex__week { display: grid; gap: 4px; margin: 0; padding: 0; list-style: none; }
.ex__stats2 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
.ex__week { grid-template-columns: repeat(7, minmax(0, 1fr)); }
.ex__stats2 li, .ex__week li {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
  padding: 4px 5px;
  border-radius: 7px;
  border: 1px solid var(--ex-line);
  background: var(--ex-card);
  text-align: center;
}
.ex__stats2 small, .ex__week small { font-size: 0.42rem; color: var(--ex-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ex__stats2 b { font-size: 0.56rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ex__week em { font-style: normal; font-size: 0.44rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ex__week li.is-warn { border-color: rgba(224, 138, 43, 0.5); background: rgba(224, 138, 43, 0.09); }
.ex__week li.is-warn em { color: #b96e14; }

.ex__foot {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding-top: 5px;
  border-top: 1px solid var(--ex-line);
  font-size: 0.44rem;
  color: var(--ex-dim);
}
.ex__foot b { letter-spacing: 0.12em; color: var(--ex-ink); }
.ex__foot em { font-style: normal; margin-left: auto; }

.en__backframe::before {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  background:
    linear-gradient(rgba(236, 183, 49, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(86, 160, 211, 0.05) 1px, transparent 1px);
  background-size: 34px 34px;
  mask-image: linear-gradient(135deg, transparent 12%, #000 62%, transparent 100%);
  opacity: 0.6;
  pointer-events: none;
}
.en__backframe::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(110deg, transparent 30%, rgba(236, 183, 49, 0.24) 48%, transparent 66%);
  background-size: 220% 100%;
  opacity: 0;
  pointer-events: none;
}
.en__backframe:hover,
.en__backframe:focus-visible {
  border-color: rgba(236, 183, 49, 0.5);
  box-shadow: 0 34px 80px rgba(0, 0, 0, 0.5), 0 0 34px rgba(236, 183, 49, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  outline: none;
}
.en__backframe:hover::after,
.en__backframe:focus-visible::after { animation: enFrameSweep 1.3s ease forwards; }
.brief-showcase--stack .brief {
  position: absolute;
  top: 0;
  left: 0;
  /* ขนาดออกแบบคงที่ แล้วย่อ/ขยายทั้งก้อนตามความกว้างการ์ด เหมือนฝั่งม็อกเมือง */
  width: 880px;
  height: 576px;
  overflow: hidden;
  z-index: 1;
  cursor: pointer;
  transform-origin: 0 0;
  transform: scale(calc(100cqw / 880px));
}
.brief--library-image {
  padding: 0;
  background: #05070d;
}
.brief--library-image > .mockup-image {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain ;
  object-position: center;
}
.brief--library-image > :not(.mockup-image) { display: none; }
.brief-showcase--stack .laptop__stage:focus-within,
.brief-showcase--stack .brief:focus-visible {
  outline: 1px solid rgba(236, 183, 49, 0.72);
  outline-offset: 5px;
}
/* ใบที่ถูกกดจะตั้งตรงและสว่างเต็ม ส่วนอีกใบหรี่ลงเป็นตัวอย่างข้าง ๆ */
.brief-showcase--stack.is-back .en__backframe {
  border-color: rgba(236, 183, 49, 0.42);
  box-shadow: 0 34px 86px rgba(0, 0, 0, 0.62), 0 0 44px rgba(236, 183, 49, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
.brief-showcase--stack.is-back .en__backframe::after { animation: enFrameSweep 1.1s ease forwards; }
.brief-showcase--stack.is-back .laptop__stage,
.brief-showcase--stack.is-front .en__backframe { filter: brightness(0.5) saturate(0.6); }
/* ส่วน STUDENT — การ์ดฝั่งซ้าย ภาพจำลองแอปฝั่งขวา */
.showcase-body--split {
  display: grid;
  grid-template-columns: minmax(0, max-content) minmax(0, 690px);
  justify-content: center;
  gap: clamp(24px, 4vw, 72px);
  align-items: center;
}
.showcase-body--split .purpose-grid { margin-top: 0; grid-template-columns: minmax(0, max-content); gap: 7px; }
.showcase-body--split .pcard {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-rows: auto auto;
  align-items: center;
  gap: 1px 11px;
  padding: clamp(7px, 1.1vh, 11px) 16px clamp(7px, 1.1vh, 11px) 13px;
  max-width: 420px;
  text-align: left;
}
.showcase-body--split .pcard__icon { grid-row: 1 / span 2; grid-column: 1; width: 34px; height: 34px; margin: 0; }
.showcase-body--split .pcard__icon :deep(svg) { width: 18px; height: 18px; }
.showcase-body--split .pcard h3 { grid-column: 2; align-self: end; font-size: 0.68rem; margin: 0; }
.showcase-body--split .pcard p { grid-column: 2; align-self: start; font-size: 0.72rem; line-height: 1.65; }
/* สามเครื่องในแถวเดียว — โทรศัพท์คู่กันตรงกลาง แท็บเล็ตอยู่ขวาสุด
   ย่อ --pw ลงจากตอนมีสองเครื่อง ไม่งั้นแถวนี้กว้างเกินคอลัมน์ขวาของ section */
.phone-duo { --pw: min(198px, 32vw, 42vh); display: flex; align-items: center; justify-content: center; min-width: 0; }
.phone {
  position: relative;
  width: var(--pw, 252px);
  height: calc(var(--pw, 252px) * 2.05);
  display: flex;
  flex-direction: column;
  flex: none;
  padding: 11px 10px;
  border-radius: 42px;
  background: linear-gradient(155deg, #4a4a55 0%, #23232c 18%, #101016 55%, #08080d 100%);
  box-shadow:
    0 50px 100px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(255, 255, 255, 0.09),
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    inset 0 -1px 0 rgba(255, 255, 255, 0.06);
  transition: transform 0.7s var(--ease);
}
.phone--front { z-index: 4; transform: perspective(1500px) rotateY(-13deg) rotateX(2deg) rotate(-2.5deg); }
.phone--pixel { margin-left: -26px; transform: perspective(1500px) rotateY(-5deg) rotateX(1deg) rotate(-0.5deg) scale(0.97); }
.phone-duo:hover .phone--pixel { transform: perspective(1500px) rotateY(-2deg) rotate(0deg) scale(0.99); }
.phone-duo:hover .phone--front { transform: perspective(1500px) rotateY(-6deg) rotate(-1deg); }
/* รอยบากด้านบน */
.phone__notch {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 74px;
  height: 13px;
  border-radius: 999px;
  background: #05050a;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  z-index: 2;
}
/* ปุ่มข้างเครื่อง */
.phone__btn { position: absolute; width: 2px; border-radius: 2px; background: linear-gradient(180deg, #4a4a55, #24242c); }
.phone__btn--power { right: -2px; top: 96px; height: 46px; }
.phone__btn--vol { left: -2px; top: 84px; height: 30px; box-shadow: 0 42px 0 0 #33333d; }
.phone__screen {
  position: relative;
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: #08080e;
  padding: 13px 12px 0;
  overflow: hidden;
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.phone__screen--library {
  padding: 0;
}
.phone__screen--library > .mockup-image {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.phone__screen--library > :not(.mockup-image) { display: none; }
.phone__top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.phone__brand { display: inline-flex; align-items: center; gap: 5px; font-size: 0.54rem; letter-spacing: 0.1em; }
.phone__brand b { color: #fff; }
.phone__brand em { font-style: normal; color: var(--muted); }
.phone__avatar {
  display: grid;
  place-items: center;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: rgba(142, 192, 108, 0.16);
  border: 1px solid rgba(142, 192, 108, 0.5);
  color: #8ec06c;
  font-style: normal;
  font-size: 0.5rem;
  font-weight: 700;
}
.phone__meta { display: inline-flex; align-items: center; gap: 6px; font-size: 0.5rem; color: var(--muted); }
.phone__meta em { font-style: normal; }
.phone__meta svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.phone__chip {
  font-style: normal;
  font-size: 0.42rem;
  letter-spacing: 0.06em;
  padding: 2px 5px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #dcdce2;
}
.phone__hello { margin: 14px 0 12px; display: flex; flex-direction: column; gap: 3px; }
.phone__hello b { font-size: 0.92rem; color: #fff; }
.phone__hello small { font-size: 0.58rem; color: var(--muted); }
.phone__label { display: block; font-size: 0.55rem; color: #cfcfd8; margin-bottom: 7px; }
.phone__body { flex: 1 1 auto; min-height: 0; overflow: auto; overscroll-behavior: contain; scrollbar-width: none; }
.phone__body::-webkit-scrollbar { display: none; }
.phone__list { list-style: none; margin: 0 0 12px; padding: 0; display: grid; gap: 6px; }
.phone__list > li {
  border-radius: 11px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.028);
  transition: border-color 0.4s var(--ease);
}
.phone__list > li.is-open { border-color: rgba(255, 255, 255, 0.16); }
.phone__mix {
  display: grid;
  grid-template-columns: repeat(2, 6px);
  grid-auto-rows: 6px;
  gap: 3px;
  align-content: center;
  justify-content: center;
}
.phone__mix i { display: block; width: 6px; height: 6px; border-radius: 2px; }
.phone__kind {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 7px;
  border: 1px solid currentColor;
  background: rgba(255, 255, 255, 0.03);
}
.phone__kind :deep(svg) { width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.phone__kind svg { width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.phone__row {
  display: grid;
  grid-template-columns: 22px 36px minmax(0, 1fr) 12px;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 9px;
  border: 0;
  background: none;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
}
.phone__list > li.is-open .phone__go { transform: rotate(90deg); color: #8ec06c; }
.phone__zones { list-style: none; margin: 0; padding: 0 8px 8px; display: grid; gap: 5px; }
.phone__zones li {
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr) auto;
  align-items: center;
  gap: 7px;
  padding: 6px 7px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.phone__zicon { display: grid; place-items: center; color: #8ec06c; }
.phone__zicon svg,
.phone__zicon :deep(svg) { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }
.phone__seats { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; text-align: right; }
.phone__seats b { font-size: 0.54rem; color: #8ec06c; font-variant-numeric: tabular-nums; }
.phone__seats b em { font-style: normal; font-size: 0.45rem; color: var(--muted); }
.phone__seats small { font-size: 0.42rem; color: var(--muted); }
.phone__floor { font-size: 0.5rem; color: var(--muted); }
.phone__floor b { font-size: 0.78rem; color: #fff; margin-left: 2px; }
.phone__floor--icon { display: grid; place-items: center; color: #8ec06c; }
.phone__floor--icon svg,
.phone__floor--icon :deep(svg) { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.phone__info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.phone__info b { font-size: 0.56rem; color: #e8e8ee; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.phone__info b.is-live { color: #8ec06c; }
.phone__info small { font-size: 0.47rem; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.phone__go { width: 12px; height: 12px; fill: none; stroke: rgba(255, 255, 255, 0.35); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.4s var(--ease), color 0.4s var(--ease); }
.phone__fade { height: 26px; background: linear-gradient(180deg, transparent, #08080e); }
.phone__tabs {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 2px;
  margin: 0 -12px;
  padding: 8px 6px 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
}
.phone__tabs span { display: flex; flex-direction: column; align-items: center; gap: 3px; font-size: 0.42rem; color: var(--muted); }
.phone__tabs span.is-on { color: #8ec06c; }
.phone__tabs i { display: block; }
.phone__tabs :deep(svg) { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }

/* ══════════════ คอนโซลจำลองของ ENLIGHTENED ══════════════ */
/* ══════════════ กรอบโน้ตบุ๊ค (คอนโซล ENLIGHTENED) ══════════════ */
/* จอคอม/แนวนอนไม่ต้องมีกรอบ — ยุบชิ้นส่วนกรอบทิ้งด้วย display:contents
   คอนโซลจะกลับไปเป็นลูกตรงของ .brief-showcase เหมือนก่อนมีกรอบทุกประการ */
.laptop,
.laptop__lid,
.laptop__screen { display: contents; }
/* .laptop__stage เป็นกล่องของการ์ดใบหน้า — คุมขนาดจริง ส่วนคอนโซลข้างในเป็นขนาดออกแบบคงที่ */
.laptop__stage { display: block; position: relative; }
.laptop__cam,
.laptop__base { display: none; }

.brief--en { border-color: var(--line); box-shadow: 0 40px 90px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05); }
.brief--en .brief__title { color: #ecb731; text-shadow: 0 0 20px rgba(236, 183, 49, 0.45); }
.brief--en .live { color: #ffd98a; }
.brief--en .live i { background: #ecb731; }

.en__blocks { display: grid; grid-template-columns: 1fr 1.06fr; gap: 8px; margin-top: 10px; }
.en__block {
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.018);
  box-shadow: inset 0 0 24px rgba(255, 255, 255, 0.015);
  padding: 8px 9px 9px;
}
.en__block--blue { border-color: rgba(255, 255, 255, 0.09); background: rgba(255, 255, 255, 0.015); box-shadow: inset 0 0 24px rgba(255, 255, 255, 0.012); }
.en__block--power { margin-top: 8px; border-color: rgba(255, 255, 255, 0.09); background: rgba(255, 255, 255, 0.015); box-shadow: inset 0 0 24px rgba(255, 255, 255, 0.012); }

.en__lhead { display: flex; align-items: center; gap: 7px; }
.en__lmark { display: grid; place-items: center; width: 22px; height: 22px; flex: none; border-radius: 50%; border: 1px solid rgba(255, 255, 255, 0.16); background: rgba(255, 255, 255, 0.05); color: #ecb731; }
.en__lmark--blue { border-color: rgba(86, 160, 211, 0.5); background: rgba(86, 160, 211, 0.14); color: #56a0d3; }
.en__lmark svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linejoin: round; }
.en__ltitle { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.en__ltitle b { font-size: 0.54rem; letter-spacing: 0.02em; color: #e8e8ee; }
.en__ltitle b em { font-style: normal; color: #ecb731; }
.en__ltitle b em.is-blue { color: #56a0d3; }
.en__ltitle small { font-size: 0.38rem; line-height: 1.45; color: var(--muted); }
.en__pager { display: inline-flex; align-items: center; gap: 4px; margin-left: auto; font-size: 0.38rem; color: var(--muted); }
.en__pager i { font-style: normal; padding: 1px 4px; border-radius: 4px; border: 1px solid rgba(255, 255, 255, 0.12); }
.en__pager b { padding: 2px 6px; border-radius: 5px; border: 1px solid rgba(86, 160, 211, 0.45); color: #cfe6f7; }

.en__row3 { display: grid; grid-template-columns: 1.15fr 0.82fr 1.03fr; gap: 5px; }
.en__row3--gates { grid-template-columns: 1.25fr 0.9fr 0.9fr; }
.en__row2 { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: repeat(2, minmax(0, 1fr)); gap: 5px; flex: 1; min-height: 0; }
.en__row2 .en__box { display: flex; flex-direction: column; min-height: 0; }
.en__row2 .en__plot { flex: 1; min-height: 34px; }
.en__row2 .en__plot { min-height: 40px; }
.en__row2 .en__heat { flex: 1; align-content: center; }
.en__row2 .en__cells i { height: auto; aspect-ratio: 1.4; }
.en__box {
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 9px;
  background: rgba(4, 8, 6, 0.45);
  padding: 5px 7px 6px;
  min-width: 0;
}
.en__box--center { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.en__btitle { display: block; width: 100%; font-size: 0.4rem; color: #cfcfd8; margin-bottom: 4px; }
.en__btitle em { font-style: normal; color: var(--muted); }

.en__zones { list-style: none; margin: 0; padding: 0; display: grid; gap: 3px; }
.en__zones li { display: grid; grid-template-columns: 22px 22px minmax(0, 1fr); align-items: center; gap: 5px; padding: 2px 3px; border-radius: 6px; border: 1px solid transparent; }
.en__zones li.is-hot { border-color: rgba(236, 183, 49, 0.5); background: rgba(236, 183, 49, 0.07); }
.en__ring { width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; background: conic-gradient(var(--c) calc(var(--p) * 1%), rgba(255, 255, 255, 0.08) 0); }
.en__ring b { display: grid; place-items: center; width: 17px; height: 17px; border-radius: 50%; background: #05070a; font-size: 0.4rem; line-height: 1; color: #fff; font-variant-numeric: tabular-nums; }
.en__ring b em { display: block; font-style: normal; font-size: 0.26rem; color: var(--muted); }
.en__zinfo { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.en__zinfo b { display: inline-flex; align-items: center; gap: 4px; font-size: 0.42rem; color: #e8e8ee; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.en__zinfo small { font-size: 0.34rem; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.en__livetag { font-style: normal; font-size: 0.28rem; letter-spacing: 0.06em; padding: 1px 3px; border-radius: 3px; background: rgba(63, 163, 77, 0.2); color: #8ec06c; }

.en__gauge { display: block; width: 100%; max-width: 118px; margin-top: auto; }
.en__gaugearc { transition: stroke-dashoffset 0.9s var(--ease), stroke 0.6s var(--ease); }

.en__mpct {
  position: absolute;
  left: 50%;
  top: 58%;
  transform: translate(-50%, -50%);
  font-family: 'Poppins', 'Inter', sans-serif;
  font-size: 0.92rem;
  line-height: 1;
  color: #e8e8ee;
  font-variant-numeric: tabular-nums;
}
.en__mcap { font-size: 0.42rem; color: #cfcfd8; margin-top: 2px; }
.en__mtrend { font-size: 0.34rem; color: var(--muted); margin-bottom: auto; }
.en__iso { display: block; width: 100%; max-width: 168px; height: auto; margin: auto 0; }

.en__strip { display: flex; align-items: center; justify-content: center; gap: 5px; font-size: 0.38rem; letter-spacing: 0.16em; color: #ffd98a; margin: 0; }
.en__strip i { width: 4px; height: 4px; border-radius: 50%; background: #ecb731; box-shadow: 0 0 6px rgba(236, 183, 49, 0.9); }
.en__doors { list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; }
.en__doors li { display: grid; grid-template-columns: 22px 22px minmax(0, 1fr); align-items: center; gap: 5px; padding: 3px 3px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.06); }
.en__big {
  display: grid;
  place-items: center;
  align-content: center;
  gap: 0;
  width: min(100%, 60px);
  aspect-ratio: 1;
  margin: auto 0;
  border-radius: 50%;
  border: 2px solid rgba(63, 163, 77, 0.55);
  background: rgba(63, 163, 77, 0.07);
}
.en__big b { font-family: 'Poppins', 'Inter', sans-serif; font-size: 0.74rem; color: #8ec06c; font-variant-numeric: tabular-nums; }
.en__big em { font-style: normal; font-size: 0.36rem; color: var(--muted); }
.en__big--out { border-color: rgba(86, 160, 211, 0.55); background: rgba(86, 160, 211, 0.07); }
.en__big--out b { color: #7fc4ef; }

.en__legend { display: inline-flex; align-items: center; gap: 4px; font-size: 0.32rem; color: var(--muted); margin-bottom: 2px; }
.en__legend i { width: 8px; height: 2px; border-radius: 2px; }
.en__legend i.is-blue { background: #56a0d3; }
.en__legend i.is-green { background: #3fa34d; }
.en__legend i.is-orange { background: #ecb731; }
.en__plot {
  position: relative;
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
  gap: 3px;
  min-height: 0;
}
/* แท็บเล็ตด้านหลัง */

/* ══════════════ ม็อกอัพแอปประชาชน MOMAY CITIZEN ══════════════ */
/* อยู่บนหน้าจอแท็บเล็ตของหมวด STUDENT — โทนน้ำเงินกลางคืนริมน้ำน่าน
   ย่อผังของหน้าจริงลงมา เก็บเฉพาะ: ค้นหา · หมวดกิจกรรม · สถานการณ์ตอนนี้ · แผนที่ · ที่แนะนำ */
.cz {
  --cz-line: rgba(255, 255, 255, 0.09);
  --cz-panel: rgba(255, 255, 255, 0.035);
  --cz-dim: #92a6c4;
  display: grid;
  grid-template-columns: 26px minmax(0, 1fr);
  gap: 7px;
  padding: 8px 8px 9px;
  background: linear-gradient(168deg, #0a1526 0%, #060a12 100%);
  font-size: 0.42rem;
  color: #e6ecf6;
}
.cz__rail { display: flex; flex-direction: column; align-items: center; gap: 5px; }
.cz__logo {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 6px;
  font-size: 0.5rem;
  font-weight: 800;
  color: #071018;
  background: linear-gradient(140deg, #7fd4ff, #3f8fd8);
}
.cz__nav { display: grid; gap: 3px; margin: 2px 0 0; padding: 0; list-style: none; }
.cz__nav li { display: grid; place-items: center; width: 20px; height: 18px; border-radius: 5px; color: #6f86a8; }
.cz__nav li.is-on { background: rgba(127, 212, 255, 0.18); color: #cfefff; }
.cz__nav :deep(svg) {
  width: 11px; height: 11px; fill: none; stroke: currentColor;
  stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round;
}

.cz__main { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.cz__top { display: flex; align-items: center; gap: 5px; }
.cz__search {
  flex: 1;
  min-width: 0;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid var(--cz-line);
  background: var(--cz-panel);
  font-size: 0.4rem;
  color: var(--cz-dim);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cz__wx { font-size: 0.44rem; color: #ffd98a; }
.cz__time { font-size: 0.46rem; font-weight: 700; }

/* แถบภาพริมน้ำตอนค่ำ — ไล่สีแทนรูปถ่าย ให้ไฟล์ไม่ต้องพกภาพจริง */
.cz__hero {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 9px 9px;
  border-radius: 9px;
  overflow: hidden;
  background:
    radial-gradient(70% 120% at 78% 110%, rgba(255, 196, 120, 0.32), transparent 62%),
    radial-gradient(60% 100% at 20% 0%, rgba(126, 92, 190, 0.42), transparent 66%),
    linear-gradient(170deg, #23305c 0%, #142244 42%, #0a1226 100%);
}
.cz__hero b { font-size: 0.66rem; line-height: 1.35; }
.cz__hero small { font-size: 0.38rem; line-height: 1.45; color: #c2d0e6; max-width: 60%; }
.cz__hero em {
  position: absolute;
  right: 8px;
  top: 8px;
  font-style: italic;
  font-size: 0.42rem;
  line-height: 1.35;
  text-align: right;
  color: #ffe7bd;
}

/* หมวด "จะไปทำอะไร" */
.cz__cats { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 4px; margin: 0; padding: 0; list-style: none; }
.cz__cats li {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  min-width: 0;
  padding: 5px 3px;
  border-radius: 7px;
  border: 1px solid var(--cz-line);
  background: var(--cz-panel);
  text-align: center;
}
.cz__cats li.is-on { border-color: color-mix(in srgb, var(--c, #7fd4ff) 60%, transparent); background: color-mix(in srgb, var(--c, #7fd4ff) 15%, transparent); }
.cz__cats i { color: var(--c, #7fd4ff); }
.cz__cats :deep(svg) {
  width: 13px; height: 13px; fill: none; stroke: currentColor;
  stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round;
}
.cz__cats b { font-size: 0.36rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
.cz__cats small { font-size: 0.3rem; color: var(--cz-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }

/* สถานการณ์ตอนนี้ + แผนที่ */
.cz__row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr); gap: 5px; }
.cz__box {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  padding: 6px 7px 7px;
  border-radius: 8px;
  border: 1px solid var(--cz-line);
  background: var(--cz-panel);
}
.cz__btitle { display: flex; align-items: center; gap: 5px; font-size: 0.42rem; font-weight: 700; }
.cz__btitle .live { font-style: normal; font-size: 0.32rem; }
.cz__btitle em { font-style: normal; margin-left: auto; font-size: 0.34rem; font-weight: 400; color: var(--cz-dim); }
.cz__btitle--rec { font-size: 0.46rem; }
.cz__stats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px; margin: 0; padding: 0; list-style: none; }
.cz__stats li {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 4px 5px;
  border-radius: 6px;
  border: 1px solid var(--cz-line);
  border-left: 2px solid var(--c, #7fd4ff);
  background: rgba(255, 255, 255, 0.03);
}
.cz__stats small { font-size: 0.3rem; color: var(--cz-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cz__stats b { font-size: 0.46rem; color: var(--c, #7fd4ff); }
.cz__stats em { font-style: normal; font-size: 0.28rem; color: var(--cz-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.cz__map { display: flex; min-width: 0; }
.cz__stage {
  position: relative;
  flex: 1;
  min-width: 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--cz-line);
  background:
    radial-gradient(56% 40% at 26% 24%, rgba(126, 166, 214, 0.1), transparent 72%),
    linear-gradient(158deg, #0d1a2c 0%, #060c15 100%);
}
.cz__stage svg { display: block; width: 100%; height: 100%; }
.cz__pin {
  position: absolute;
  width: 7px;
  height: 7px;
  margin: -3.5px 0 0 -3.5px;
  border-radius: 50%;
  background: var(--c, #8ec06c);
  box-shadow: 0 0 0 2px rgba(6, 12, 21, 0.85), 0 0 8px var(--c, #8ec06c);
}
.cz__spot {
  position: absolute;
  transform: translate(-50%, -50%);
  padding: 1px 4px;
  border-radius: 4px;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(6, 10, 18, 0.86);
  font-size: 0.3rem;
}
.cz__legend {
  position: absolute;
  right: 3px;
  top: 3px;
  display: grid;
  gap: 1px;
  margin: 0;
  padding: 3px 4px;
  list-style: none;
  border-radius: 5px;
  background: rgba(6, 10, 18, 0.8);
}
.cz__legend li { display: flex; align-items: center; gap: 3px; font-size: 0.26rem; color: var(--cz-dim); }
.cz__legend i { width: 4px; height: 4px; border-radius: 50%; background: var(--c, #8ec06c); }

/* ที่แนะนำสำหรับคุณ */
.cz__recs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 5px; margin: 0; padding: 0; list-style: none; }
.cz__recs li {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  padding: 5px 6px 6px;
  border-radius: 8px;
  border: 1px solid var(--cz-line);
  background: var(--cz-panel);
}
.cz__thumb {
  position: relative;
  height: 22px;
  border-radius: 5px;
  background:
    radial-gradient(70% 120% at 76% 110%, rgba(255, 196, 120, 0.3), transparent 62%),
    linear-gradient(160deg, color-mix(in srgb, var(--c, #8ec06c) 45%, #10203a), #0a1424);
}
.cz__thumb i {
  position: absolute;
  left: 3px;
  top: 3px;
  font-style: normal;
  padding: 1px 4px;
  border-radius: 999px;
  background: var(--c, #8ec06c);
  font-size: 0.26rem;
  font-weight: 700;
  color: #07121f;
}
.cz__recs b { font-size: 0.4rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cz__recs small { font-size: 0.3rem; color: var(--cz-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cz__recs em { font-style: normal; font-size: 0.3rem; color: var(--c, #8ec06c); }

.cz__foot {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: auto 0 0;
  padding-top: 5px;
  border-top: 1px solid var(--cz-line);
  font-size: 0.3rem;
  color: var(--cz-dim);
}
.cz__foot b { letter-spacing: 0.1em; color: #e6ecf6; }
.cz__foot em { font-style: normal; margin-left: auto; }

/* ══════════════ ม็อกอัพเครื่องกลาง: ผิวพิกเซล 8-bit ══════════════ */
/* ธีมนี้มีของอยู่ 4 อย่าง — จานสีจัด, มุมโค้ง 0, เงาแข็งไม่เบลอ, ฟอนต์พิกเซลเฉพาะเลข/อังกฤษ */
.phone--pixel {
  --px-bg: #16062f;
  --px-panel: #1b0940;
  --px-line: #5f2fae;
  --px-dim: #b7a6e8;
  z-index: 3;
  background: linear-gradient(155deg, #6a4aa8 0%, #33195c 18%, #1a0b32 55%, #0d0424 100%);
}
/* มุมโค้งเป็นศัตรูของธีมนี้ — บังคับเป็น 0 ทั้งหน้าจอทีเดียว ไม่ต้องไล่ลบทีละจุด */
/* บังคับมุมโค้งเป็น 0 เฉพาะของข้างใน — ตัวจอต้องคงมุมโค้ง 32px ไว้
   ไม่งั้นมุมสี่เหลี่ยมของจอจะแทงทะลุขอบโค้งของตัวเครื่องออกมา */
.px * { border-radius: 0 !important; }
.px {
  background:
    radial-gradient(115% 62% at 50% -6%, #5a23b8 0%, #2e1068 45%, var(--px-bg) 100%);
  border-color: rgba(176, 108, 255, 0.35);
  padding: 11px 11px 0;
  gap: 7px;
  overflow: hidden;
}
/* ฟอนต์พิกเซลไม่มีสระไทย จึงใช้เฉพาะตัวเลขกับอังกฤษสั้น ๆ เหมือนต้นฉบับ */
.px__brand b, .px__brand em, .px__time, .px__acts small,
.px__rinfo b, .px__floor, .px__free {
  font-family: 'Press Start 2P', 'Poppins', monospace;
  font-weight: 400;
  font-synthesis: none;
}

.px__top { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
.px__brand { display: inline-flex; align-items: center; gap: 5px; font-size: 0.4rem; color: #fff; }
.px__brand em { font-style: normal; color: #22e8ff; }
.px__avatar {
  display: grid;
  place-items: center;
  width: 15px;
  height: 15px;
  font-style: normal;
  font-size: 0.42rem;
  font-weight: 800;
  color: #16062f;
  background: #b06cff;
  box-shadow: 2px 2px 0 #ff4fd8;
}
.px__time { font-size: 0.36rem; color: var(--px-dim); }

.px__hello { font-size: 0.52rem; line-height: 1.5; color: #fff; margin: 0; }
.px__hello b { color: #35f58a; }

/* สี่เหลี่ยมกิจกรรม — ขอบนีออนหนา 2px + เงาแข็งเยื้อง 3px เหมือนสไปรต์วางบนพื้น */
.px__acts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.px__acts li {
  display: grid;
  grid-template-columns: 15px minmax(0, 1fr);
  align-items: center;
  gap: 2px 6px;
  padding: 5px 6px;
  background: var(--px-panel);
  border: 2px solid var(--c, #b06cff);
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.85);
}
.px__acts b { grid-column: 2; font-size: 0.4rem; font-weight: 700; color: #fff; }
.px__acts small { grid-column: 2; font-size: 0.28rem; color: var(--c, #b06cff); }
.px__glyph {
  grid-row: span 2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  width: 15px;
  height: 15px;
}
.px__glyph span { background: rgba(255, 255, 255, 0.08); }
.px__glyph span.is-on { background: var(--c, #b06cff); box-shadow: 0 0 4px var(--c, #b06cff); }

.px__label {
  display: block;
  font-size: 0.36rem;
  letter-spacing: 0.06em;
  color: #c9b8ff;
  border-left: 3px solid #22e8ff;
  padding-left: 5px;
}

.px__rooms { display: grid; gap: 5px; margin: 0; padding: 0; list-style: none; }
.px__rooms li {
  display: grid;
  grid-template-columns: 17px minmax(0, 1fr) auto;
  align-items: center;
  gap: 2px 6px;
  padding: 4px 5px;
  background: var(--px-panel);
  border: 2px solid var(--px-line);
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.85);
}
.px__floor {
  grid-row: span 2;
  display: grid;
  place-items: center;
  width: 17px;
  height: 17px;
  font-size: 0.42rem;
  color: #fff;
  background: var(--c, #b06cff);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.5);
}
.px__rinfo { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.px__rinfo b { font-size: 0.32rem; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.px__rinfo small { font-size: 0.3rem; color: var(--px-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.px__free { grid-column: 3; grid-row: 1; font-size: 0.46rem; color: var(--c, #b06cff); }
/* แถบวัด — บล็อกทึบเรียงกัน ไม่ใช่แถบไล่สี ให้เข้ากับความเป็นพิกเซล */
.px__meter { grid-column: 2 / -1; grid-row: 2; display: flex; gap: 2px; }
.px__meter i { flex: 1; height: 4px; background: #22104f; }
.px__meter i.is-on { background: var(--c, #b06cff); box-shadow: 0 0 5px var(--c, #b06cff); }

.px__cta {
  display: block;
  margin-top: auto;
  margin-bottom: 9px;
  padding: 7px;
  text-align: center;
  font-size: 0.42rem;
  font-weight: 800;
  color: #16062f;
  background: linear-gradient(90deg, #22e8ff 0%, #b06cff 50%, #ff4fd8 100%);
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.85);
}

.tablet {
  position: relative;
  z-index: 1;
  width: min(314px, 100%);
  flex: none;
  /* แยกออกจากคู่มือถือ ไม่ซ้อนกันแล้ว */
  margin-left: 14px;
  margin-top: 30px;
  padding: 13px 11px;
  border-radius: 26px;
  background: linear-gradient(155deg, #4a4a55 0%, #23232c 18%, #101016 55%, #08080d 100%);
  box-shadow:
    0 50px 100px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(255, 255, 255, 0.09),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transform: perspective(1500px) rotateY(13deg) rotateX(2deg) rotate(2.5deg) scale(0.94);
  transition: transform 0.7s var(--ease);
  filter: brightness(0.94);
}
.phone-duo:hover .tablet { transform: perspective(1500px) rotateY(7deg) rotate(1.5deg) scale(0.96); }
.tablet__cam {
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #05050a;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
}
.tablet__screen {
  position: relative;
  aspect-ratio: 1225 / 1284;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: #08080e;
  padding: 0;
  overflow: hidden;
}
.tablet__screen > .mockup-image {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain ;
  object-position: center;
}
.tablet__screen > .cz__rail,
.tablet__screen > .cz__main { display: none; }
.tablet__cols { display: grid; grid-template-columns: 1fr 1.05fr; gap: 11px; margin-top: 11px; }
.tablet__col { min-width: 0; }
.tablet .phone__row { cursor: default; grid-template-columns: 22px 30px minmax(0, 1fr) 10px; gap: 6px; padding: 6px 7px; }
.tablet .phone__info b { font-size: 0.54rem; }
.tablet .phone__info small { font-size: 0.45rem; }
.tablet .phone__seats b { font-size: 0.5rem; }
.tablet .phone__label { font-size: 0.5rem; }
.tablet .zonecard__name { font-size: 0.5rem; }
.tablet .phone__list { gap: 5px; margin-bottom: 8px; }

/* หน้าจอเครื่องที่สองของแอปนักศึกษา */
.zonecard {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 11px 11px;
  border-radius: 12px;
  border: 1px solid rgba(142, 192, 108, 0.35);
  background: rgba(142, 192, 108, 0.07);
  margin-bottom: 10px;
}
.zonecard__name { font-size: 0.54rem; color: #e8e8ee; }
.zonecard__big { font-family: 'Poppins', 'Inter', sans-serif; font-size: 1.05rem; line-height: 1.1; color: #8ec06c; font-variant-numeric: tabular-nums; }
.zonecard__big em { font-style: normal; font-size: 0.5rem; color: var(--muted); margin-left: 3px; }
.zonecard__bar { display: block; height: 5px; border-radius: 999px; background: rgba(255, 255, 255, 0.09); overflow: hidden; }
.zonecard__bar i { display: block; height: 100%; border-radius: 999px; background: linear-gradient(90deg, #3fa34d, #8ec06c); transition: width 1s var(--ease); }
.zonecard small { font-size: 0.45rem; color: var(--muted); }
.phone__cta {
  display: block;
  margin-top: 10px;
  padding: 8px 0;
  border-radius: 10px;
  text-align: center;
  font-size: 0.56rem;
  color: #0b1508;
  background: linear-gradient(90deg, #8ec06c, #b6dd97);
}
.en__svgwrap { position: relative; display: block; min-width: 0; height: 100%; }
.en__plot svg { display: block; width: 100%; height: 100%; min-height: 36px; }
.en__dot {
  position: absolute;
  left: 48.1%;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #8ec06c;
  box-shadow: 0 0 0 3px rgba(142, 192, 108, 0.18);
  transform: translate(-50%, -50%);
}
.en__yaxis { position: relative; height: 100%; font-size: 0.28rem; color: var(--muted); }
.en__yaxis em {
  position: absolute;
  right: 0;
  top: calc(var(--i) * 25%);
  transform: translateY(-50%);
  font-style: normal;
  line-height: 1;
  white-space: nowrap;
}
.en__yaxis--6 em { top: calc(var(--i) * 20%); }
.en__xaxis { display: flex; justify-content: space-between; font-size: 0.3rem; color: var(--muted); margin-top: 2px; padding-left: 19px; }
.en__xaxis em { font-style: normal; }
.en__xaxis--heat { padding-left: 29px; }
.en__now {
  position: absolute;
  top: -1px;
  left: 46%;
  font-size: 0.3rem;
  padding: 1px 4px;
  border-radius: 4px;
  border: 1px solid rgba(63, 163, 77, 0.6);
  background: rgba(6, 10, 8, 0.95);
  color: #8ec06c;
}
.en__peak {
  position: absolute;
  top: -2px;
  right: 0;
  font-size: 0.3rem;
  line-height: 1.35;
  text-align: center;
  padding: 2px 5px;
  border-radius: 5px;
  border: 1px solid rgba(236, 183, 49, 0.55);
  background: rgba(30, 22, 6, 0.95);
  color: #ffd98a;
}
.en__peak b { font-size: 0.34rem; }

.en__heat { display: grid; gap: 2px; }
.en__heatrow { display: grid; grid-template-columns: 26px minmax(0, 1fr); align-items: center; gap: 3px; font-size: 0.32rem; color: var(--muted); }
.en__cells { display: grid; grid-template-columns: repeat(16, minmax(0, 1fr)); gap: 1px; }
.en__cells i { display: block; height: clamp(6px, 1.1vh, 11px); border-radius: 2px; }
.en__scale { display: inline-flex; align-items: center; gap: 4px; font-size: 0.3rem; color: var(--muted); margin-top: 3px; }
.en__scale i { width: 56px; height: 5px; border-radius: 999px; background: linear-gradient(90deg, rgb(26 54 40), rgb(96 168 92), rgb(236 183 49), rgb(222 92 60)); }

.en__bars { list-style: none; margin: 0; padding: 0; display: grid; gap: 5px; align-content: center; flex: 1; }
.en__bars li { display: grid; grid-template-columns: 82px minmax(0, 1fr) 26px; align-items: center; gap: 7px; font-size: 0.38rem; color: var(--muted); }
.en__bars li span:first-child { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.en__track { height: 6px; border-radius: 999px; background: rgba(255, 255, 255, 0.07); overflow: hidden; }
.en__track i { display: block; height: 100%; border-radius: 999px; transition: width 1.2s var(--ease); }
.en__bars em { font-style: normal; text-align: right; color: #dcdce2; }

.en__phead { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.en__chip { font-size: 0.4rem; padding: 3px 7px; border-radius: 6px; border: 1px solid rgba(236, 183, 49, 0.45); color: #ffd98a; }
.en__chip--ghost { border-color: rgba(255, 255, 255, 0.14); color: var(--muted); }
.en__date { display: inline-flex; align-items: center; gap: 4px; font-size: 0.42rem; color: #e8e8ee; }
.en__date i { font-style: normal; padding: 1px 5px; border-radius: 4px; border: 1px solid rgba(236, 183, 49, 0.35); color: #ffd98a; }
.en__plot--power { min-height: clamp(48px, 6.5vh, 76px); }
.en__pfoot { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 1px; }
.en__xaxis--power { flex: 1; }

/* ══════════════ ส่วนที่ต้องจบในหนึ่งหน้าจอ ══════════════ */
.section.section--fit {
  min-height: 100svh;
  display: grid;
  /* จอสูงกว่าที่เนื้อหาต้องการ ให้เนื้อหาอยู่กลางจอ ไม่ทิ้งที่ว่างไว้ด้านล่างก้อนเดียว */
  align-content: center;
  padding-top: clamp(44px, 6.8vh, 80px);
  padding-bottom: clamp(26px, 3.6vh, 54px);
}
/* เส้นคั่นด้านบนวางทับ (z-index 3) — ยกเนื้อหาส่วนนี้ขึ้นมาไม่ให้แสงพาดตัวหนังสือ */
.section--fit .wrap { position: relative; z-index: 4; }
.section--fit .lead {
  margin-top: 12px;
  max-width: min(1180px, 100%);
  /* balance ทำให้สองบรรทัดยาวเท่ากันจนคำท้ายตกบรรทัด ใช้ pretty ให้ไล่เต็มบรรทัดแทน */
  text-wrap: pretty;
}
.section--fit .center { margin-top: clamp(10px, 1.5vh, 20px); }
.section--fit .brief-showcase { margin-top: clamp(14px, 2.2vh, 26px); }
/* ชุดการ์ดคู่ต้องเว้นที่เหนือการ์ดไว้ให้ชื่อของแต่ละใบ ไม่งั้นชื่อไปชนคำบรรยายของ section */
.section--fit .brief-showcase--laptop.brief-showcase--stack,
.brief-showcase--laptop.brief-showcase--stack { margin-top: clamp(112px, 11vw, 176px); }
.section--fit .brief { padding: clamp(9px, 1.05vw, 14px); }
.section--fit .brief__head { padding-bottom: 9px; }

/* การ์ด Executive Brief */
/* การ์ดสรุปผู้บริหาร: ยืดเนื้อหาในการ์ดตามความสูงจอ จะได้ไม่เหลือที่ว่างแนวตั้ง */
.section--panel .chart svg { height: clamp(74px, 14vh, 190px); }
.section--fit .kpis { margin-top: clamp(10px, 1.6vh, 20px); gap: clamp(8px, 1vh, 14px); }
.section--fit .kpi { padding: clamp(10px, 1.5vh, 20px) clamp(11px, 1vw, 16px); }
.section--fit .brief__row { margin-top: clamp(8px, 1.2vh, 16px); gap: clamp(8px, 1vh, 14px); }
.section--fit .panelbox { padding: clamp(9px, 1.3vh, 18px) clamp(10px, 1vw, 15px); }
.section--fit .bars { gap: clamp(6px, 1.1vh, 14px); }
.section--fit .panelbox--insight { min-height: clamp(52px, 9vh, 120px); }

/* คอนโซล ENLIGHTENED */
.section--fit .en__blocks { margin-top: clamp(5px, 0.8vh, 9px); }
.section--fit .en__zones { gap: 2px; }
.section--fit .en__cells i { height: clamp(6px, 1.1vh, 11px); }
.section--fit .en__row2 .en__plot { min-height: clamp(26px, 3.1vh, 44px); }
.section--fit .en__plot--power { min-height: clamp(26px, 3.6vh, 58px); }
.section--fit .en__gauge { max-width: clamp(84px, 11.5vh, 108px); }
.section--fit .en__big { width: min(100%, 54px); }

/* ส่วน STUDENT — การ์ดฝั่งซ้ายกับจอมือถือ */
.section--fit .showcase-body { margin-top: clamp(16px, 2.6vh, 30px); }
.section--fit .purpose-grid { margin-top: 0; gap: clamp(7px, 0.9vh, 10px); }
.section--fit .pcard h3 { font-size: 0.68rem; }
.section--fit .pcard p { font-size: 0.72rem; color: #dcdce2; }
.section--fit .showcase-body--split { gap: clamp(16px, 2.4vw, 34px); }
.section--fit .phone { padding: 9px 8px; border-radius: 38px; }
.section--fit .phone__screen { padding: 20px 10px 0; border-radius: 30px; }
.section--fit .phone__hello { margin: clamp(7px, 1.2vh, 13px) 0 clamp(7px, 1.1vh, 11px); }
.section--fit .phone__hello b { font-size: 0.82rem; }
.section--fit .phone__list { gap: 5px; margin-bottom: 8px; }
.section--fit .phone__list li { padding: clamp(5px, 0.8vh, 8px) 8px; }
.section--fit .phone__fade { height: 16px; }
.section--fit .phone__tabs { margin: 0 -10px; padding: 6px 5px 8px; }

/* จอเตี้ยมาก — ย่อหัวเรื่องลงอีกให้เนื้อหายังอยู่ครบในหน้าเดียว */
@media (max-height: 860px) {
  .section.section--fit { padding-top: clamp(22px, 3.8vh, 58px); padding-bottom: clamp(20px, 3vh, 44px); }
  .section--fit .kicker { font-size: clamp(1.15rem, 2.4vw, 1.7rem); }
  .section--fit .h2 { font-size: clamp(0.92rem, 1.6vw, 1.3rem); }
  .section--fit .lead { font-size: 0.86rem; line-height: 1.8; margin-top: 9px; }
  .section--fit .pcard h3 { font-size: 0.68rem; }
  .section--fit .pcard p { font-size: 0.68rem; }
  /* คอนโซลแน่นที่สุด — ย่อกราฟกับเกจลงอีกขั้น */
  .section--fit .en__powerchart svg { height: 26px; }
  .section--fit .en__meter svg { max-width: 88px; }
  .section--fit .en__mpct { font-size: 0.86rem; }
  .section--fit .en__gauge { max-width: 92px; }
  .section--fit .en__iso { max-width: 120px; }
  .section--fit .en__zones li { padding: 1px 3px; }
  .section--fit .en__zinfo small { display: none; }
  .section--fit .en__ltitle small { display: none; }
  .section--fit .en__lhead { margin-bottom: 3px; }
  .section--fit .en__box { padding: 4px 6px 5px; }
  .section--fit .en__doors li { padding: 2px 3px; }
  .section--fit .en__blocks { margin-top: 6px; }
  .section--fit .en__block { gap: 3px; padding: 5px 6px 6px; }
  .section--fit .en__row2 .en__plot { min-height: 26px; }
  .section--fit .en__plot--power { min-height: 30px; }
  .section--fit .en__pfoot em { font-size: 0.28rem; }
  .section--fit .en__zinfo small { display: none; }
  .section--fit .en__scale { display: none; }
  .section--fit .en__inout { padding-top: 5px; }
  .section--fit .en__io { padding: 4px 5px; }
}
.hero-demos {
  display: grid;
  grid-template-columns: repeat(var(--cols, 4), minmax(0, 1fr));
  gap: clamp(18px, 2.2vw, 34px);
  width: min(calc(430px * var(--cols, 4)), 100%);
  margin: clamp(24px, 4.2vh, 60px) auto 0;
}
.demolink {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(14px, 1.4vw, 22px);
  position: relative;
  isolation: isolate;
  padding: clamp(18px, 1.8vh, 27px) clamp(22px, 2vw, 36px);
  border: 0;
  border-radius: 999px;
  background: transparent;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(10px);
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.45s var(--ease), transform 0.45s var(--ease), box-shadow 0.45s var(--ease);
}
/* แสงวิ่งรอบขอบตลอดเวลา ไล่จังหวะกันทีละปุ่ม */
.demolink::before {
  content: '';
  position: absolute;
  inset: -1.4px;
  z-index: -2;
  border-radius: inherit;
  background: conic-gradient(
    from var(--btn-a),
    rgba(255, 255, 255, 0.06) 0deg,
    rgba(255, 255, 255, 0.06) 214deg,
    var(--accent) 268deg,
    #ffffff 300deg,
    var(--accent) 332deg,
    rgba(255, 255, 255, 0.06) 360deg
  );
  animation: btnSweep 3.6s linear infinite;
  animation-delay: var(--sweep-delay, 0s);
}
.demolink::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background:
    radial-gradient(72% 140% at 12% 50%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%),
    #0b0b11;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
  transition: background 0.45s var(--ease);
}
.demolink:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 44px rgba(0, 0, 0, 0.5), 0 0 26px -6px color-mix(in srgb, var(--accent) 55%, transparent);
}
.demolink:hover::before { animation-duration: 1.6s; }
.demolink:hover::after {
  background:
    radial-gradient(72% 140% at 12% 50%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 72%),
    #12121a;
}
.demolink__icon {
  display: grid;
  place-items: center;
  width: clamp(52px, 3.8vw, 66px);
  height: clamp(52px, 3.8vw, 66px);
  flex: none;
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--accent) 55%, transparent);
  background: radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--accent) 26%, transparent), rgba(255, 255, 255, 0.03));
  color: var(--accent);
  transition: transform 0.5s var(--ease), box-shadow 0.5s var(--ease), border-color 0.5s var(--ease);
}
.demolink:hover .demolink__icon {
  border-color: var(--accent);
  box-shadow: 0 0 18px -2px color-mix(in srgb, var(--accent) 75%, transparent);
  transform: scale(1.06);
}
.demolink__icon :deep(svg) {
  width: clamp(28px, 2.1vw, 36px); height: clamp(28px, 2.1vw, 36px); fill: none; stroke: currentColor;
  stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round;
}
.demolink__label { display: flex; flex-direction: column; gap: 3px; line-height: 1.3; }
.demolink__label b {
  font-family: 'Poppins', 'Inter', sans-serif;
  /* ขนาดเดียวกับ .mm-hero__sub (BEFORE IT IS TOO LATE.) */
  font-size: clamp(0.95rem, max(1.7vw, 2vh), 1.6rem);
  font-weight: 700;
  letter-spacing: 0.11em;
  color: var(--accent);
  white-space: nowrap;
}
.demolink__label small {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: clamp(0.8rem, max(1.15vw, 1.35vh), 1.1rem);
  letter-spacing: 0.13em;
  color: var(--muted);
  transition: color 0.35s var(--ease);
}
.demolink:hover .demolink__label small { color: #fff; }
.demolink__arrow {
  width: 12px;
  height: 12px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.35s var(--ease);
}
.demolink:hover .demolink__arrow { transform: translateX(3px); }
.panelbox {
  border: 1px solid var(--line);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.024);
  padding: 11px 12px 12px;
}
.panelbox__title { display: block; font-size: 0.53rem; letter-spacing: 0.16em; color: var(--muted); margin-bottom: 9px; }
.panelbox--insight p { font-size: 0.66rem; line-height: 1.8; color: #cfcfd8; margin: 0; }

.chart { position: relative; }
.chart svg { display: block; width: 100%; height: clamp(86px, 11vh, 118px); overflow: visible; }
.chart__line { stroke-dasharray: 700; stroke-dashoffset: 700; }
.chart__area { opacity: 0; }
.chart__peakdot {
  position: absolute;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #ed1b2e;
  box-shadow: 0 0 0 3px rgba(237, 27, 46, 0.22);
  transform: translate(-50%, -50%);
  opacity: 0;
}
.chart__peakdot::after {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 1.5px solid #ed1b2e;
  opacity: 0;
}
.chart.is-in .chart__line { animation: drawLine 2s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
.chart.is-in .chart__line--alt { animation-duration: 2.6s; animation-delay: 0.15s; }
.chart.is-in .chart__area { animation: fadeIn 1s ease 1.1s forwards; }
.chart.is-in .chart__peakdot { animation: fadeIn 0.4s ease 1.5s forwards; }
.chart.is-in .chart__peakdot::after { animation: ringOut 2.2s ease 1.6s infinite; }
.chart__badge {
  position: absolute;
  top: -4px;
  right: 6%;
  font-size: 0.5rem;
  line-height: 1.5;
  text-align: center;
  color: #ffd7d9;
  background: rgba(237, 27, 46, 0.16);
  border: 1px solid rgba(237, 27, 46, 0.45);
  border-radius: 8px;
  padding: 4px 8px;
}
.chart__badge b { color: #fff; letter-spacing: 0.08em; }
.chart__axis { display: flex; justify-content: space-between; font-size: 0.46rem; color: rgba(255, 255, 255, 0.35); margin-top: 6px; }

.bars { list-style: none; margin: 0; padding: 0; display: grid; gap: 7px; }
.bars li { display: grid; grid-template-columns: 34px 1fr 30px; align-items: center; gap: 8px; font-size: 0.56rem; color: var(--muted); }
.bars__track { height: 6px; border-radius: 999px; background: rgba(255, 255, 255, 0.07); overflow: hidden; }
.bars__fill { display: block; height: 100%; width: 0; border-radius: 999px; transition: width 1.4s var(--ease) 0.15s; }
.bars li.is-in .bars__fill { width: var(--w); }
.bars__val { text-align: right; color: #dcdce2; }

.todo { list-style: none; margin: 0; padding: 0; display: grid; gap: 7px; }
.todo li { display: flex; align-items: flex-start; gap: 7px; font-size: 0.62rem; line-height: 1.6; color: #cfcfd8; }
.todo svg { width: 14px; height: 14px; flex: none; margin-top: 1px; fill: none; stroke: #8ec06c; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.todo svg rect { stroke: rgba(142, 192, 108, 0.45); }
.todo__tick { stroke-dasharray: 22; stroke-dashoffset: 22; }
.todo li.is-in .todo__tick { animation: drawTick 0.55s ease 0.25s forwards; }

/* ══════════════ หัวข้อ section ══════════════ */
/* ระยะจากเส้นคั่นถึงหัวข้อเท่ากันกับส่วนที่จบในหน้าเดียว */
.section { position: relative; padding: clamp(44px, 6.8vh, 80px) 0 clamp(56px, 7.5vw, 96px); }
/* สลับลำดับความเด่น: ป้ายสีแดงเป็นตัวใหญ่ หัวข้อสีขาวเป็นตัวเล็กอยู่ใต้ */
.kicker {
  text-align: center;
  font-family: 'Poppins', 'Inter', sans-serif;
  font-weight: 800;
  font-size: clamp(1.4rem, 3vw, 2.1rem);
  line-height: 1.1;
  letter-spacing: 0.06em;
  color: var(--red);
  text-shadow: 0 0 38px rgba(237, 27, 46, 0.35);
  margin: 0 0 10px;
}
.h2 {
  text-align: center;
  font-family: 'Poppins', 'Inter', sans-serif;
  font-weight: 700;
  font-size: clamp(1.05rem, 2.1vw, 1.75rem);
  letter-spacing: 0.13em;
  color: #e8e8ee;
  margin: 0;
}
/* หัวข้อปิดท้าย (ไม่มีป้ายแดงคู่) ยังเป็นตัวใหญ่เหมือนเดิม */
.h2--left {
  text-align: left;
  font-weight: 800;
  font-size: clamp(1.3rem, 4.2vw, 3.1rem);
  letter-spacing: -0.01em;
  color: var(--txt);
}
.lead {
  text-align: center;
  color: #eaeaf0;
  margin: 16px auto 0;
  max-width: 68ch;
  line-height: 1.95;
  font-size: clamp(0.88rem, 1.08vw, 1.02rem);
  text-wrap: balance;
  word-spacing: 0.06em;
}

/* ══════════════ การ์ด PURPOSE ══════════════ */
.section--purpose { background: linear-gradient(180deg, var(--ink) 0%, var(--ink2) 100%); }
.purpose-grid {
  list-style: none;
  margin: clamp(30px, 4vw, 52px) 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(var(--cols, 6), minmax(0, 1fr));
  gap: 12px;
}
.pcard {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.012));
  padding: 22px 16px 20px;
  text-align: center;
  transition: transform 0.6s var(--ease), border-color 0.5s ease, box-shadow 0.6s var(--ease);
}
.pcard:hover { transform: translateY(-8px); border-color: rgba(255, 255, 255, 0.22); box-shadow: 0 26px 60px rgba(0, 0, 0, 0.55); }
.pcard__glow {
  position: absolute;
  inset: auto -30% -60% -30%;
  height: 120px;
  filter: blur(46px);
  opacity: 0.12;
  transition: opacity 0.6s var(--ease);
}
.pcard:hover .pcard__glow { opacity: 0.32; }
.pcard__icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  margin: 0 auto 16px;
  border-radius: 50%;
  border: 1px solid currentColor;
  background: rgba(255, 255, 255, 0.03);
  transition: transform 0.6s var(--ease);
}
.pcard:hover .pcard__icon { transform: scale(1.1) rotate(-4deg); }
.pcard__icon :deep(svg) { width: 26px; height: 26px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.pcard h3 { position: relative; font-size: 0.86rem; font-weight: 800; letter-spacing: 0.09em; margin: 0 0 9px; }
.pcard p { position: relative; font-size: 0.84rem; line-height: 1.85; color: #dcdce2; margin: 0; }

/* ══════════════ FLOW ══════════════ */
.section--flow { background: var(--ink2); overflow: hidden; }
.flow__waves { position: absolute; inset: auto 0 0 0; width: 100%; height: 46%; opacity: 0.7; }
.wave { stroke-dasharray: 6 10; animation: waveRun 14s linear infinite; animation-delay: calc(var(--i) * -1.1s); }
.flow {
  list-style: none;
  margin: clamp(34px, 4.6vw, 60px) 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 10px;
  --ring: clamp(58px, 6vw, 76px);
  --flow-gap: 10px;
}
.flow__step { position: relative; text-align: center; }
.flow__ring {
  position: relative;
  display: grid;
  place-items: center;
  width: var(--ring);
  height: var(--ring);
  margin: 0 auto 16px;
  border-radius: 50%;
  border: 1.5px solid currentColor;
  background: rgba(6, 6, 10, 0.7);
  transition: transform 0.55s var(--ease), box-shadow 0.55s var(--ease);
}
.flow__step:hover .flow__ring { transform: translateY(-5px); box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.03); }
.flow__ring :deep(svg) { width: 28px; height: 28px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.flow__pulse {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1px solid currentColor;
  opacity: 0;
}
.flow__step.is-in .flow__pulse { animation: ringOut 2.8s ease-out infinite; }
/* ลูกศรอยู่กึ่งกลางช่องว่างระหว่างวงพอดี และตรงกลางวงในแนวตั้ง */
.flow__arrow {
  position: absolute;
  top: calc(var(--ring) / 2 - 8px);
  left: calc(100% + var(--flow-gap) / 2);
  transform: translateX(-50%);
  width: clamp(24px, 3vw, 44px);
  height: 16px;
  fill: none;
}
/* เส้นลูกศรวาดครั้งแรกตอนเลื่อนมาถึง */
.flow__track, .flow__head { stroke-dasharray: 44; stroke-dashoffset: 44; }
.flow__step.is-in .flow__track,
.flow__step.is-in .flow__head { animation: drawTick 0.7s ease 0.35s forwards; }

/* แสงวิ่งจากสเต็ปหนึ่งไปอีกสเต็ป ไล่ทีละขั้นแล้ววนใหม่ */
.flow__spark {
  stroke-dasharray: 7 37;
  stroke-dashoffset: 44;
  opacity: 0;
  filter: drop-shadow(0 0 4px currentColor);
}
.flow__step.is-in .flow__spark { animation: sparkRun 7.2s linear infinite; }
/* วงแหวนสว่างขึ้นเมื่อแสงมาถึงสเต็ปนั้น */
.flow__step.is-in .flow__ring { animation: stepLit 7.2s ease-in-out infinite; }
/* สายธารแสงวิ่งรอบวงกลมตอนแสงมาถึง */
@property --ring-a {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
.flow__ring::after {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: conic-gradient(
    from var(--ring-a),
    transparent 0deg,
    transparent 238deg,
    currentColor 300deg,
    #ffffff 332deg,
    transparent 360deg
  );
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3.5px), #000 calc(100% - 3.5px));
  mask: radial-gradient(farthest-side, transparent calc(100% - 3.5px), #000 calc(100% - 3.5px));
  opacity: 0;
  pointer-events: none;
}
.flow__step.is-in .flow__ring::after { animation: ringStream 7.2s linear infinite; }
@keyframes ringStream {
  0% { --ring-a: -46deg; opacity: 0; }
  1.5% { opacity: 1; }
  11% { --ring-a: 134deg; opacity: 1; }
  14% { --ring-a: 150deg; opacity: 0; }
  100% { --ring-a: 150deg; opacity: 0; }
}

/* ไล่จังหวะทีละสเต็ป */
.flow__step:nth-child(1).is-in .flow__ring { animation-delay: 0s; }
.flow__step:nth-child(1).is-in .flow__ring::after { animation-delay: 0s; }
.flow__step:nth-child(2).is-in .flow__ring { animation-delay: 1.05s; }
.flow__step:nth-child(2).is-in .flow__ring::after { animation-delay: 1.05s; }
.flow__step:nth-child(3).is-in .flow__ring { animation-delay: 2.1s; }
.flow__step:nth-child(3).is-in .flow__ring::after { animation-delay: 2.1s; }
.flow__step:nth-child(4).is-in .flow__ring { animation-delay: 3.15s; }
.flow__step:nth-child(4).is-in .flow__ring::after { animation-delay: 3.15s; }
.flow__step:nth-child(5).is-in .flow__ring { animation-delay: 4.2s; }
.flow__step:nth-child(5).is-in .flow__ring::after { animation-delay: 4.2s; }
.flow__step:nth-child(6).is-in .flow__ring { animation-delay: 5.25s; }
.flow__step:nth-child(6).is-in .flow__ring::after { animation-delay: 5.25s; }
.flow__step:nth-child(1).is-in .flow__spark { animation-delay: 0.82s; }
.flow__step:nth-child(2).is-in .flow__spark { animation-delay: 1.87s; }
.flow__step:nth-child(3).is-in .flow__spark { animation-delay: 2.92s; }
.flow__step:nth-child(4).is-in .flow__spark { animation-delay: 3.97s; }
.flow__step:nth-child(5).is-in .flow__spark { animation-delay: 5.02s; }
@keyframes sparkRun {
  0% { stroke-dashoffset: 44; opacity: 0; }
  1% { opacity: 1; }
  7% { stroke-dashoffset: 0; opacity: 1; }
  9% { opacity: 0; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}
@keyframes stepLit {
  0%, 100% { box-shadow: none; transform: translateY(0); }
  3% { box-shadow: 0 0 22px -2px currentColor, 0 0 0 5px rgba(255, 255, 255, 0.04); transform: translateY(-3px); }
  11% { box-shadow: 0 0 12px -4px currentColor; transform: translateY(0); }
  16% { box-shadow: none; }
}
.flow__step h3 { font-size: 0.86rem; font-weight: 800; letter-spacing: 0.08em; margin: 0 0 8px; }
.flow__step p { font-size: 0.79rem; line-height: 1.8; color: var(--muted); margin: 0; text-wrap: balance; }

/* ══════════════ PRODUCTS ══════════════ */
.section--products { background: linear-gradient(180deg, var(--ink2) 0%, var(--ink) 100%); }
.products { display: grid; grid-template-columns: repeat(var(--cols, 4), minmax(0, 1fr)); gap: clamp(12px, 1.6vw, 20px); margin-top: clamp(30px, 4vw, 52px); }
/* สี่ใบเรียงแถวเดียวได้เฉพาะจอกว้าง ที่แคบกว่านั้นตัดเป็นสองแถว */
@media (max-width: 1240px) {
  .products { grid-template-columns: repeat(var(--cols-md, 2), minmax(0, 1fr)); }
}
/* การ์ด: ภาพใหญ่เต็มการ์ด ข้อความวางทับแบบอาร์ต ๆ */
.product {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 400px;
  padding: clamp(20px, 2.2vw, 28px);
  border: 1px solid var(--line);
  border-radius: 18px;
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.01));
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.65s var(--ease), border-color 0.5s ease, box-shadow 0.65s var(--ease);
}
.product::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(102deg, rgba(6, 6, 10, 0.94) 20%, rgba(6, 6, 10, 0.66) 52%, rgba(6, 6, 10, 0.12) 86%),
    linear-gradient(180deg, rgba(6, 6, 10, 0.8) 0%, transparent 34%);
  pointer-events: none;
  transition: opacity 0.5s var(--ease);
}
.product:hover::before { opacity: 0.86; }
.product::after {
  content: '';
  position: absolute;
  inset: auto -20% -55% -20%;
  height: 180px;
  background: var(--accent);
  filter: blur(60px);
  opacity: 0.1;
  transition: opacity 0.45s ease;
}
.product:hover { transform: translateY(-10px); border-color: rgba(255, 255, 255, 0.2); box-shadow: 0 34px 70px rgba(0, 0, 0, 0.6); }
.product:hover::after { opacity: 0.26; }
.product__body { position: relative; z-index: 2; display: flex; flex-direction: column; flex: 1; }
.product__note { flex: 1; }
.product__name { font-family: 'Poppins', 'Inter', sans-serif; font-weight: 800; font-size: 0.94rem; letter-spacing: 0.06em; color: var(--accent); margin: 0 0 12px; }
.product__tag { font-size: 0.84rem; font-weight: 600; line-height: 1.55; margin: 0 0 10px; max-width: 17ch; }
.product__note { font-size: 0.79rem; line-height: 1.85; color: var(--muted); margin: 0; max-width: 24ch; }
.product__art {
  position: absolute;
  right: -6%;
  bottom: -7%;
  width: 92%;
  z-index: 0;
  opacity: 0.92;
  pointer-events: none;
  transition: transform 0.7s var(--ease), opacity 0.5s var(--ease);
}
.product:hover .product__art { transform: scale(1.05) translateY(-6px); opacity: 1; }
.product__art :deep(svg) { width: 100%; height: auto; }
/* ปุ่ม VIEW DEMO — กรอบเด่น วางกึ่งกลางการ์ด */
.product__link {
  position: relative;
  z-index: 1;
  align-self: center;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  isolation: isolate;
  margin-top: 20px;
  padding: 12px 28px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  white-space: nowrap;
  color: #fff;
  transition: color 0.45s var(--ease), box-shadow 0.5s var(--ease), transform 0.5s var(--ease);
}
/* ขอบแสงวิ่งชุดเดียวกับปุ่มอื่นทั้งหน้า */
.product__link::before {
  content: '';
  position: absolute;
  inset: -1.4px;
  z-index: -2;
  border-radius: inherit;
  background: conic-gradient(
    from var(--btn-a),
    rgba(255, 255, 255, 0.06) 0deg,
    rgba(255, 255, 255, 0.06) 214deg,
    var(--accent) 268deg,
    #ffffff 300deg,
    var(--accent) 332deg,
    rgba(255, 255, 255, 0.06) 360deg
  );
  animation: btnSweep 3.6s linear infinite;
  animation-delay: var(--sweep-delay, 0s);
}
.product__link::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: #0b0b11;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
  transition: background 0.45s var(--ease);
}
.product:hover .product__link {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.5), 0 0 24px -8px var(--accent);
}
.product:hover .product__link::before { animation-duration: 1.6s; }
.product:hover .product__link::after { background: #14141c; }
.product__art :deep(.float-a) { animation: floaty 6.5s ease-in-out infinite; }
.product__art :deep(.float-b) { animation: floaty 7.5s ease-in-out infinite 0.4s; }
.product__art :deep(.float-c) { animation: floaty 8.5s ease-in-out infinite 0.8s; }
.product__art :deep(.pulse-g) { animation: softPulse 3.4s ease-in-out infinite; }
.product__art :deep(.spark) { animation: softPulse 2.6s ease-in-out infinite; }
.product__art :deep(.draw) { stroke-dasharray: 300; stroke-dashoffset: 300; }
.product.is-in .product__art :deep(.draw) { animation: drawLine 1.8s ease 0.5s forwards; }
.product__art :deep(.grow-g rect) { transform-origin: 166px 0; transform: scaleX(0); }
.product.is-in .product__art :deep(.grow-g rect) { animation: growX 1s var(--ease) 0.6s forwards; }
.product__art :deep(.tower) { opacity: 0; transform: translateY(16px); }
.product.is-in .product__art :deep(.tower) { animation: riseUp 0.75s var(--ease) forwards; animation-delay: calc(var(--i, 0) * 0.13s + 0.35s); }

/* ══════════════ TRUSTED ══════════════ */
.section--trusted { background: var(--ink); }
.mm-carousel { position: relative; display: flex; align-items: center; gap: 10px; margin-top: clamp(24px, 3vw, 40px); }
.mm-carousel__viewport { flex: 1; overflow: hidden; }
.mm-carousel__track { display: flex; justify-content: center; list-style: none; margin: 0; padding: 8px 0; transition: transform 0.9s var(--ease); }
.org { flex: 0 0 calc(100% / var(--per)); max-width: 240px; display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 0 6px; }
.org__crest {
  display: grid;
  place-items: center;
  width: clamp(72px, 7.4vw, 104px);
  aspect-ratio: 1;
  transition: transform 0.55s var(--ease), filter 0.55s var(--ease);
  filter: brightness(0) invert(1) drop-shadow(0 0 12px rgba(255, 255, 255, 0.35));
}
.org:hover .org__crest { transform: translateY(-4px) scale(1.06); filter: brightness(0) invert(1) drop-shadow(0 0 20px rgba(255, 255, 255, 0.65)); }
.org__crest img { width: 100%; height: 100%; object-fit: contain; }
.org__name { font-size: 0.79rem; line-height: 1.6; text-align: center; color: var(--muted); }
.mm-carousel__nav {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  flex: none;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.02);
  color: #d7d7dd;
  cursor: pointer;
  transition: background 0.4s var(--ease), border-color 0.4s var(--ease), transform 0.45s var(--ease);
}
.mm-carousel__nav:hover { background: rgba(237, 27, 46, 0.14); border-color: rgba(237, 27, 46, 0.5); transform: scale(1.08); }
.mm-carousel__nav svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; }
.dots { display: flex; justify-content: center; gap: 7px; margin-top: 22px; }
.dot { width: 7px; height: 7px; border-radius: 50%; border: 0; background: rgba(255, 255, 255, 0.2); cursor: pointer; transition: background 0.45s var(--ease), width 0.45s var(--ease); }
.dot.is-active { background: var(--red); width: 20px; border-radius: 999px; }

/* ══════════════ CTA ══════════════ */
.section--cta {
  position: relative;
  overflow: hidden;
  background-color: var(--ink);
}
/* ชั้นภาพเมือง — ดันความสว่าง/ความอิ่มสีขึ้นให้ภาพแจ่ม */
.section--cta::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background: url('/momay/cta-bg.webp') center 58% / cover no-repeat;
  filter: saturate(1.32) contrast(1.1) brightness(1.42);
}
/* ม่านบาง ๆ เฉพาะฝั่งข้อความ ให้อ่านออกแต่ยังเห็นเมืองชัด */
.section--cta::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    linear-gradient(100deg, rgba(6, 6, 10, 0.78) 4%, rgba(6, 6, 10, 0.42) 38%, rgba(6, 6, 10, 0.16) 70%, rgba(6, 6, 10, 0.02) 100%),
    linear-gradient(180deg, rgba(6, 6, 10, 0.86) 0%, transparent 24%, transparent 66%, var(--ink) 100%);
}
/* จอใหญ่: ตรึงภาพให้เลื่อนช้ากว่าเนื้อหาเล็กน้อย */
@media (min-width: 976px) and (hover: hover) {
  .section--cta::before { background-attachment: fixed; }
}
.cta__city { position: absolute; inset: auto 0 0 0; z-index: 1; width: 100%; height: 62%; opacity: 0.6; }
.cta__ray { stroke-dasharray: 4 12; animation: waveRun 9s linear infinite; animation-delay: calc(var(--i) * -0.6s); }
.cta { position: relative; z-index: 4; display: grid; grid-template-columns: 1.05fr 0.95fr; gap: clamp(26px, 4vw, 56px); align-items: center; }
.cta__copy { position: relative; z-index: 1; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9), 0 0 26px rgba(0, 0, 0, 0.85), 0 0 52px rgba(0, 0, 0, 0.6); }
/* ม่านนุ่ม ๆ เฉพาะหลังก้อนข้อความ ให้ตัวหนังสืออยู่หน้าสีแดงชัด ๆ โดยไม่ทำให้ภาพเมืองมืดทั้งหมด */
.cta__copy::before {
  content: '';
  position: absolute;
  inset: -12% -34% -10% -14%;
  z-index: -1;
  background:
    radial-gradient(56% 40% at 38% 24%, rgba(5, 5, 9, 0.62), rgba(5, 5, 9, 0.3) 60%, transparent 82%),
    radial-gradient(70% 58% at 30% 60%, rgba(5, 5, 9, 0.5), rgba(5, 5, 9, 0.2) 58%, transparent 80%);
  pointer-events: none;
}
.cta__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; }
.mm-btn__doc { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.cta__thai { color: #c9c9d2; line-height: 1.9; font-size: clamp(0.82rem, 1.2vw, 0.96rem); margin: 20px 0 28px; }
.cta__list {
  list-style: none;
  margin: 0;
  padding: clamp(18px, 2.2vw, 28px);
  display: grid;
  gap: 16px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: rgba(10, 10, 16, 0.82);
  backdrop-filter: blur(10px);
}
.cta__list li { display: flex; align-items: center; gap: 14px; }
.cta__list b { display: block; font-size: 0.84rem; letter-spacing: 0.1em; }
.cta__list small { display: block; font-size: 0.78rem; color: var(--muted); margin-top: 5px; }
.cta__hex {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  flex: none;
  color: var(--red);
  background: rgba(237, 27, 46, 0.1);
  border: 1px solid rgba(237, 27, 46, 0.35);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}
.cta__hex :deep(svg) { width: 21px; height: 21px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }

/* ══════════════ FOOTER ══════════════ */
.mm-footer { border-top: 1px solid var(--line); background: var(--ink); padding: 34px 0 26px; }
.mm-footer__inner { display: flex; align-items: center; flex-wrap: wrap; gap: 18px; }
.mm-footer__copy { text-align: center; font-size: 0.6rem; color: rgba(255, 255, 255, 0.32); margin: 24px 0 0; }

/* ══════════════ LIGHTBOX ══════════════ */
.lightbox { position: fixed; inset: 0; z-index: 80; display: grid; place-items: center; background: rgba(3, 3, 6, 0.92); backdrop-filter: blur(6px); padding: 5vw; }
/* เอกสาร MOMAY — เลื่อนดูได้ทั้งแนวตั้ง/แนวนอนบนจอเล็ก */
.lightbox--doc {
  place-items: center;
  padding: clamp(26px, 4vw, 56px) 4vw clamp(78px, 8vw, 104px);
  background: rgba(3, 3, 6, 0.9);
  backdrop-filter: blur(16px);
}
.lightbox__doc {
  display: grid;
  place-items: center;
  max-width: min(1200px, 92vw);
  max-height: min(76vh, 800px);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 40px 110px rgba(0, 0, 0, 0.72);
  overflow: hidden;
}
.lightbox__doc img {
  display: block;
  max-width: 100%;
  max-height: min(76vh, 800px);
  width: auto;
  height: auto;
  object-fit: contain;
}
.lightbox__open {
  position: absolute;
  left: 50%;
  bottom: 26px;
  transform: translateX(-50%);
  text-decoration: none;
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(12px);
  color: #fff;
}
.lightbox__open:hover { background: rgba(237, 27, 46, 0.24); border-color: rgba(237, 27, 46, 0.6); }
/* ป๊อปอัปแผนที่ลูกค้า */
.lightbox--map { place-items: center; padding: 3vh 4vw 4vh; background: rgba(4, 4, 8, 0.55); backdrop-filter: blur(7px); }
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
.mapcard__stage { position: relative; display: grid; place-items: center; min-height: 0; padding-top: clamp(10px, 2vh, 26px); perspective: 1500px; }
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
  height: min(67vh, 730px);
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
  height: 74px;
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
  transform: rotateX(-52deg) translate(-50%, -74px);
  transition: border-color 0.35s var(--ease), background 0.35s var(--ease);
  pointer-events: none;
}
.thpin__flag b { font-size: 0.68rem; color: #fff; }
.thpin__flag small { font-size: 0.58rem; color: var(--muted); }
.thpin:hover .thpin__flag, .thpin.is-active .thpin__flag { border-color: rgba(255, 255, 255, 0.6); background: rgba(20, 20, 26, 0.98); }
@keyframes beamGrow {
  0% { height: 0; opacity: 0; }
  100% { height: 74px; opacity: 0.85; }
}
@keyframes beamPulse {
  0%, 100% { opacity: 0.55; height: 66px; }
  50% { opacity: 1; height: 80px; }
}


@media (max-width: 767px) {
  /* เดิมย่อความสูงเฉพาะ .thmap ทำให้แผนที่กับพิกัดหมุด (คิดเป็น % ของ .thplane) คนละสเกล
     หมุดเลยตกไปอยู่ใต้ตำแหน่งจริง — ต้องย่อทั้งแผ่นแทน แผนที่กับหมุดจะได้ขยับไปด้วยกัน */
  .thplane { height: min(44vh, 360px); }
  /* ป้ายชื่อลอยเหนือหมุด 74px — เว้นหัวไว้ให้พอ ไม่งั้นไปทับหัวเรื่อง */
  .mapcard__stage { padding-top: clamp(58px, 10vh, 92px); }
  .thpin__flag { padding: 5px 9px; }
  .thpin__flag b { font-size: 0.6rem; }
  .thpin__flag small { font-size: 0.52rem; }
}

.lightbox--contact { padding: 5vw; }
.contactcard {
  position: relative;
  width: min(420px, 92vw);
  padding: clamp(22px, 3vw, 32px);
  border-radius: 20px;
  border: 1px solid var(--line);
  background: linear-gradient(160deg, rgba(22, 22, 30, 0.96), rgba(10, 10, 16, 0.97));
  box-shadow: 0 40px 90px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  text-align: center;
}
.contactcard__close { top: 12px; right: 12px; width: 32px; height: 32px; }
.contactcard__close svg { width: 15px; height: 15px; }
.contactcard__eyebrow { display: block; font-size: 0.6rem; letter-spacing: 0.22em; color: var(--red); }
.contactcard h3 { font-size: 1.05rem; color: #fff; margin: 10px 0 6px; }
.contactcard p { font-size: 0.86rem; line-height: 1.9; color: #cfcfd8; margin: 0 0 18px; }
.contactcard__tel {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 13px 22px;
  border-radius: 999px;
  border: 1px solid rgba(237, 27, 46, 0.55);
  background: rgba(237, 27, 46, 0.1);
  color: #fff;
  text-decoration: none;
  transition: background 0.4s var(--ease), transform 0.4s var(--ease);
}
.contactcard__tel:hover { background: rgba(237, 27, 46, 0.2); transform: translateY(-2px); }
.contactcard__tel b { font-family: 'Poppins', 'Inter', sans-serif; font-size: 1.35rem; letter-spacing: 0.06em; }
.contactcard__ticon { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: var(--red); color: #fff; }
.contactcard__ticon svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linejoin: round; }
.contactcard__row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  font-size: 0.84rem;
  color: #dcdce2;
  text-decoration: none;
}
.contactcard__row svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linejoin: round; }
.contactcard__row:hover { color: #fff; }
.contactcard__note { display: block; margin-top: 14px; font-size: 0.76rem; color: var(--muted); }
.lightbox__close { position: absolute; top: 22px; right: 26px; width: 40px; height: 40px; display: grid; place-items: center; border-radius: 50%; border: 1px solid rgba(255, 255, 255, 0.16); background: rgba(255, 255, 255, 0.07); backdrop-filter: blur(10px); color: #fff; cursor: pointer; transition: background 0.3s ease, transform 0.3s ease; }
.lightbox__close:hover { background: rgba(255, 255, 255, 0.14); transform: rotate(90deg); }
.lightbox__close svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ══════════════ keyframes ══════════════ */
@keyframes drawLine { to { stroke-dashoffset: 0; } }
@keyframes drawTick { to { stroke-dashoffset: 0; } }
@keyframes fadeIn { to { opacity: 1; } }
@keyframes growX { to { transform: scaleX(1); } }
@keyframes riseUp { to { opacity: 1; transform: translateY(0); } }
@keyframes floaty { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
@keyframes softPulse { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
@keyframes pulseDot { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.35); opacity: 0.55; } }
@keyframes ringOut { 0% { transform: scale(0.92); opacity: 0.5; } 70% { transform: scale(1.22); opacity: 0; } 100% { opacity: 0; } }
@keyframes driftUp { 0% { transform: translateY(14px); } 50% { transform: translateY(-16px); } 100% { transform: translateY(14px); } }
@keyframes streamRun { to { stroke-dashoffset: -1160; } }
@keyframes waveRun { to { stroke-dashoffset: -320; } }
@keyframes twinkle { 0%, 100% { opacity: 0.18; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.6); } }
@keyframes shine { 0%, 100% { background-position: 130% 0; } 50% { background-position: -30% 0; } }
@keyframes enFrameSweep { from { background-position: 120% 0; opacity: 0; } 30% { opacity: 1; } to { background-position: -30% 0; opacity: 0; } }

/* ══════════════ responsive ══════════════ */
/* จอแคบกว่า ~1024px สองคอลัมน์จะบีบจนม็อกอ่านไม่ออก — เรียงลงมาทีละใบแทน */
@media (max-width: 1023px) {
  .brief-showcase--laptop.brief-showcase--stack,
  .brief-showcase--stack.is-front,
  .brief-showcase--stack.is-back {
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(46px, 8vw, 78px);
    margin-top: clamp(52px, 9vw, 84px);
  }
  .brief-showcase--stack .en__wordmark { display: none; }
}
/* เบราว์เซอร์เต็มจอบนโน้ตบุ๊กเหลือความสูงจริงไม่ถึง 900px — หัวเรื่องที่ผูกกับความกว้าง
   อย่างเดียวจะดันแถวปุ่มเดโมตกขอบล่าง บล็อกนี้ผูกกับความสูงจอด้วยแล้วบีบระยะลง */
@media (orientation: landscape) and (max-height: 900px) and (min-width: 976px) {
  .mm-hero { padding: clamp(100px, 13vh, 130px) 0 clamp(64px, 8vh, 96px); }
  .mm-hero__title { font-size: clamp(2.6rem, min(7.4vw, 13vh), 6rem); }
  .mm-hero__inner { gap: clamp(16px, 2.6vh, 30px); }
  .mm-hero__sub { margin-top: clamp(10px, 2.2vh, 24px); }
  .mm-hero__thai { margin-top: clamp(12px, 2.4vh, 26px); line-height: 1.8; }
  .mm-hero__copy .eyebrow { margin-bottom: clamp(10px, 1.8vh, 22px); }
  .hero-demos { margin-top: clamp(14px, 2.6vh, 34px); }
}


/* ตัวหนังสือบนแถบบนใหญ่ขึ้นเท่าตัว ที่บนแถบจึงหมดเร็วกว่าเดิม —
   พอไม่พอก็ปล่อยตัวเลขสดทีละใบ แล้วค่อยตัดชื่อรองใต้โลโก้ */
@media (max-width: 1500px) { .navkpi:last-child { display: none; } }
@media (max-width: 1300px) { .navkpi:nth-last-child(-n+2) { display: none; } }
@media (max-width: 1150px) { .brand__text small { display: none; } }

/* iPad: คงจำนวนคอลัมน์เท่าจอคอม แค่ย่อระยะ/ตัวอักษรลงให้พอดี */
@media (max-width: 1100px) {
  .purpose-grid { gap: 9px; }
  .pcard { padding: 18px 11px 16px; }
  .pcard__icon { width: 46px; height: 46px; margin-bottom: 12px; }
  .pcard__icon :deep(svg) { width: 22px; height: 22px; }
  .pcard h3 { font-size: 0.74rem; letter-spacing: 0.06em; }
  .pcard p { font-size: 0.7rem; }
  .flow__step h3 { font-size: 0.72rem; letter-spacing: 0.05em; }
  .flow__step p { font-size: 0.7rem; }
  .product__name { font-size: 0.84rem; }
  .product__tag { font-size: 0.78rem; }
  .product__note { font-size: 0.72rem; }
  .product__link { padding: 9px 18px; font-size: 0.64rem; letter-spacing: 0.12em; }
  .navkpi { padding: 0 11px; }
  .navkpi:nth-last-child(-n+3) { display: none; }
}
@media (max-width: 975px) {
  .nav__live, .nav__cta { display: none; }
  .showcase-body--split { grid-template-columns: minmax(0, 1fr); }
  .showcase-body--split .phone { margin-top: 4px; }
  .mm-hero { min-height: auto; }
  .mm-hero__inner { grid-template-columns: minmax(0, 1fr); }
  .product { min-height: 350px; }
  .cta { grid-template-columns: minmax(0, 1fr); }
  .mm-footer__inner { justify-content: center; }
}
/* แนวนอนบนแท็บเล็ต/มือถือ: ใช้เลย์เอาต์เดียวกับคอม แค่ย่อขนาดตามความสูงจอ */
@media (orientation: landscape) and (min-width: 660px) and (max-width: 1100px) {
  .nav__live { display: flex; }
  .nav__cta { display: inline-flex; }
  .showcase-body--split { grid-template-columns: minmax(0, max-content) minmax(0, 1fr); gap: clamp(14px, 2.4vw, 30px); }
  .showcase-body--split .phone { margin-top: 0; }
  .mm-hero { min-height: 100svh; }
  .cta { grid-template-columns: 1.05fr 0.95fr; }
  .mm-footer__inner { justify-content: space-between; }
  .purpose-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .flow { grid-template-columns: repeat(6, minmax(0, 1fr)); }
  .flow__arrow { display: block; }
  .products { grid-template-columns: repeat(var(--cols-md, 2), minmax(0, 1fr)); }
  .navkpi { padding: 0 9px; }
  .navkpi:nth-last-child(-n+3) { display: none; }
  /* จอเตี้ย บีบระยะหัวท้ายลงให้เนื้อหาจบในหน้าเดียวเหมือนบนคอม */
  .section.section--fit { padding-top: clamp(14px, 2.6vh, 34px); padding-bottom: clamp(12px, 2.2vh, 30px); }
  .section--fit .lead { margin-top: 8px; }
  .section--fit .center { margin-top: clamp(6px, 1.2vh, 14px); }
}

/* มือถือ: ตัดเป็นหลายแถวให้เห็นครบทุกใบในจอเดียว ไม่ต้องเลื่อนซ้ายขวา */
@media (max-width: 767px) {
  .purpose-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
  .flow { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 26px 10px; }
  /* ลูกศรยังอยู่ แต่ตัวท้ายแถวไม่ต้องมี เพราะตัวถัดไปขึ้นแถวใหม่ */
  .flow__arrow { display: block; }
  .flow__step:nth-child(3n) .flow__arrow { display: none; }
  .products { grid-template-columns: minmax(0, 1fr); }
  .product { min-height: 340px; }
  .product__art { width: 88%; right: -6%; }
  .brief__row { grid-template-columns: minmax(0, 1fr); }
  .kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .pcard { padding: 16px 10px 14px; }
  .pcard h3 { font-size: 0.74rem; }
  .pcard p, .flow__step p { font-size: 0.7rem; }
  .flow__step h3 { font-size: 0.72rem; }
}
@media (max-width: 479px) {
  .purpose-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .flow { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .flow__step:nth-child(3n) .flow__arrow { display: block; }
  .flow__step:nth-child(2n) .flow__arrow { display: none; }
  .product { min-height: 330px; }
  .product__art { width: 92%; right: -6%; }
}

/* ══════════════ จอแนวตั้ง ══════════════ */
/* บนจอแนวตั้ง ตัวจำกัดจริงคือความกว้าง ไม่ใช่ความสูง
   กฎที่ย่อขนาดตามความสูง (vh) และเลย์เอาต์หลายคอลัมน์ของคอม จึงกลายเป็นล้นขอบและอ่านไม่ออก
   บล็อกนี้คลี่ทุกอย่างเป็นคอลัมน์เดียว แล้วคืนขนาดตัวอักษรให้อ่านได้ */
@media (orientation: portrait) and (max-width: 1023px) {
  /* คำไทยที่ต่อกันยาว ๆ ถูกยึดไว้ด้วย word-joiner จาก noSplit()
     พอบรรทัดสั้นกว่าคำ มันเลยทะลุออกนอกจอ — ยอมให้ตัดได้เมื่อไม่มีทางอื่น */
  .lead,
  .mm-hero__thai,
  .cta__thai,
  .pcard p,
  .product__note,
  .en__ltitle small { overflow-wrap: break-word; }

  /* section ที่บังคับ "จบในหนึ่งหน้าจอ" ก็เจอปัญหาเดียวกับฮีโร่ — เนื้อหาสั้นกว่าจอ
     พอจัดกึ่งกลางเลยลอยห่างจากเส้นโค้งด้านบนไปมาก ให้ชิดบนแล้วสูงเท่าเนื้อหาแทน */
  .section.section--fit {
    min-height: auto;
    align-content: start;
    padding-top: clamp(52px, 7vh, 84px);
    padding-bottom: clamp(40px, 6vh, 72px);
  }

  /* ───────── HERO ───────── */
  .mm-hero {
    min-height: auto;
    padding: 0 0 clamp(40px, 6vh, 72px);
  }
  /* เดิมคือ max(8vw, 10vh) — บนจอแนวตั้ง 10vh ชนะเสมอ ตัวอักษรเลยกว้างเกินจอ */
  .mm-hero__title { font-size: clamp(1.95rem, 13.5vw, 5rem); }
  .mm-hero__copy .eyebrow { margin-bottom: clamp(12px, 2.4vh, 24px); }
  .eyebrow { font-size: clamp(0.86rem, 3.4vw, 1.25rem); letter-spacing: 0.1em; gap: 8px; }
  .mm-hero__sub {
    font-size: clamp(0.86rem, 3.4vw, 1.25rem);
    letter-spacing: 0.11em;
    margin-top: clamp(16px, 3.4vh, 30px);
  }
  .mm-hero__thai {
    font-size: clamp(0.78rem, 3vw, 1rem);
    line-height: 1.8;
    margin-top: clamp(16px, 3.2vh, 30px);
  }
  .mm-hero__chips {
    display: block;
    margin-top: clamp(20px, 4vh, 38px);
  }
  .chip--cta { display: flex; }
  .chip--cta .mm-btn { width: 100%; justify-content: center; padding: 11px 12px; font-size: 0.66rem; }
  /* สี่ปุ่มในแถวเดียวแคบเกินไป — ตัดเป็นสองแถว ทรงปุ่มยังเป็นเม็ดยาเหมือนเดิม */
  .hero-demos {
    grid-template-columns: repeat(var(--cols-sm, 2), minmax(0, 1fr));
    gap: 7px;
    margin: clamp(18px, 3.7vh, 34px) 0 0;
  }
  .demolink { gap: 6px; padding: 8px 10px 8px 7px; }
  .demolink__icon { width: clamp(24px, 6.4vw, 32px); height: clamp(24px, 6.4vw, 32px); }
  .demolink__icon :deep(svg) { width: clamp(13px, 3.5vw, 18px); height: clamp(13px, 3.5vw, 18px); }
  .demolink__label { gap: 1px; min-width: 0; }
  .demolink__label b {
    font-size: clamp(0.5rem, 2.2vw, 0.64rem);
    letter-spacing: 0.04em;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .demolink__label small { font-size: clamp(0.4rem, 1.8vw, 0.52rem); letter-spacing: 0.08em; }

  /* ───────── หัวข้อประจำ section ───────── */
  .kicker { font-size: clamp(1.15rem, 5.4vw, 1.9rem); }
  .h2 { font-size: clamp(0.92rem, 3.7vw, 1.5rem); letter-spacing: 0.1em; }
  /* ตัวไทยเล็กลง คำจะพอดีบรรทัดโดยไม่ต้องหักกลางคำ */
  .lead { font-size: clamp(0.74rem, 2.7vw, 0.9rem); line-height: 1.75; }

  /* ───────── ส่วน STUDENT ───────── */
  .showcase-body--split .purpose-grid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
  .showcase-body--split .pcard { max-width: none; }
  .section--fit .showcase-body--split .pcard h3 { font-size: 0.76rem; }
  .section--fit .showcase-body--split .pcard p { font-size: 0.72rem; }
  .phone-duo { justify-content: center; }

  /* ───────── CTA ───────── */
  .h2--left { font-size: clamp(1.3rem, 6.2vw, 2.4rem); }
  /* ปุ่มสองใบเรียงกันแล้วล้นขอบ — ให้ยืดเต็มแถว ถ้าไม่พอก็ตกลงมาเป็นอีกแถวเต็มความกว้าง */
  .cta__actions .mm-btn { flex: 1 1 200px; justify-content: center; }
}

/* มือถือแคบ: สามใบเรียงแถวเดียวทำให้ชื่อผลิตภัณฑ์โดนตัด — เรียงลงมาทีละใบแทน */
@media (orientation: portrait) and (max-width: 560px) {
  .hero-demos {
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
  }
  .demolink { justify-content: flex-start; gap: 9px; padding: 9px 14px 9px 9px; }
  .demolink__icon { width: 32px; height: 32px; }
  .demolink__icon :deep(svg) { width: 17px; height: 17px; }
  /* ขนาดเดียวกับ .mm-hero__sub ของจอแนวตั้ง */
  .demolink__label b { font-size: clamp(0.86rem, 3.4vw, 1.25rem); letter-spacing: 0.06em; }
  .demolink__label small { font-size: clamp(0.68rem, 2.7vw, 0.98rem); }
}

/* จอแนวตั้งเท่านั้นที่ใส่กรอบโน้ตบุ๊ค — คอนโซลเป็นผังของจอแนวนอน
   บนจอแนวตั้งจึงต้องย่อทั้งก้อนใส่กรอบ แทนที่จะบีบผังจนเพี้ยน */
@media (orientation: portrait) and (max-width: 1023px) {
  /* ══════════════ กรอบโน้ตบุ๊ค (คอนโซล ENLIGHTENED) ══════════════ */
  /* ปลุกชิ้นส่วนกรอบที่ถูกยุบด้วย display:contents ไว้กลับมา */
  .laptop,
  .laptop__lid,
  .laptop__screen,
  .laptop__stage { display: block; }
  .laptop__cam { display: block; }
  .laptop__base { display: block; }
  /* คอนโซลเป็นของจอแนวนอน จึงวางไว้ในโน้ตบุ๊คแทนที่จะลอยเปล่า ๆ
     จอเป็น 16:10 จริง ส่วนผังข้างในคงขนาดจอคอมไว้แล้วย่อทั้งก้อนด้วย --k ที่ JS วัดให้ */
  .laptop {
    --k: 1;
    width: min(100%, 1080px, calc((100svh - 380px) * 1.6));
    margin-inline: auto;
  }
  .laptop__lid {
    position: relative;
    display: block;
    padding: 15px 13px 15px;
    border-radius: 16px 16px 7px 7px;
    background: linear-gradient(155deg, #4a4a55 0%, #23232c 16%, #101016 52%, #08080d 100%);
    box-shadow:
      0 50px 100px rgba(0, 0, 0, 0.7),
      0 0 0 1px rgba(255, 255, 255, 0.09),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
  .laptop__cam {
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #05050a;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
  }
  .laptop__screen {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: #07070c;
  }
  /* เวทีขนาดจอคอม (1180 x 738 = 16:10 พอดี) ย่อลงมาทั้งก้อน */
  .laptop__stage {
    position: absolute;
    top: 0;
    left: 0;
    width: 1180px;
    height: 738px;
    transform: scale(var(--k));
    transform-origin: 0 0;
  }
  /* ฐานเครื่องกับแป้นพิมพ์ */
  .laptop__base {
    position: relative;
    display: block;
    height: 13px;
    margin: 0 -3%;
    border-radius: 0 0 11px 11px;
    background: linear-gradient(180deg, #3d3d47 0%, #22222a 44%, #131319 100%);
    box-shadow: 0 24px 36px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.16);
  }
  .laptop__notch {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 13%;
    height: 5px;
    border-radius: 0 0 7px 7px;
    background: #0d0d13;
    box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.08);
  }
  .brief-showcase--laptop { max-width: 1080px; }

  /* ══════════════ ผังแผงสรุปผู้บริหารในเวที ══════════════ */
  /* ค่าที่อิง vh ทั้งหมดต้องตรึงเป็น px เวทีถึงจะหน้าตาเดิมไม่ว่าจอสูงเท่าไหร่
     แล้วให้สองแถวล่างยืดเก็บที่ว่างจนเต็มจอ 16:10 พอดี */
  .laptop__stage .brief {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 14px;
    border: 0;
    border-radius: 0;
    box-shadow: none;
  }
  /* กฎมือถือ (kpis 2 คอลัมน์, brief__row เรียงลง) ต้องไม่มีผลในเวที เพราะเวทีกว้าง 1180 เสมอ */
  .laptop__stage .kpis { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 14px; gap: 12px; }
  .laptop__stage .brief__row { grid-template-columns: 1.25fr 1fr; }
  .laptop__stage .kpi { padding: 16px 14px; }
  .laptop__stage .brief__row { flex: 1; min-height: 0; margin-top: 12px; gap: 12px; }
  .laptop__stage .panelbox { display: flex; flex-direction: column; min-height: 0; padding: 14px 14px 15px; }
  .laptop__stage .chart { flex: 1; min-height: 0; display: flex; flex-direction: column; }
  .laptop__stage .chart svg { flex: 1; height: auto; min-height: 0; }
  .laptop__stage .bars { align-content: center; flex: 1; gap: 12px; }
  .laptop__stage .todo { align-content: center; flex: 1; }
  .laptop__stage .panelbox--insight { min-height: 0; }
  .laptop__stage .panelbox--insight p { margin-block: auto; }

  /* ══════════════ ผังคอนโซลในเวทีของโน้ตบุ๊ค ══════════════ */
  /* เวทีเป็นผืนขนาดคงที่ 1180x738 แล้วย่อทั้งก้อน ผังข้างในจึงต้องไม่ขยับตามขนาดหน้าต่างจริง
     วางไว้ท้ายสุดเพื่อทับกฎที่อิง vh/ความกว้างจอทั้งหมด */
  .laptop__stage .brief--en { padding: 13px; }
  .laptop__stage .en__blocks { flex: 1; min-height: 0; margin-top: 9px; }
  .laptop__stage .en__block { gap: 5px; padding: 8px 9px 9px; }
  .laptop__stage .en__lhead { margin-bottom: 0; }
  .laptop__stage .en__ltitle small,
  .laptop__stage .en__zinfo small { display: block; }
  .laptop__stage .en__box { padding: 5px 7px 6px; }
  /* LAYER 1 ไม่มีอะไรยืดเหมือน .en__row2 ของ LAYER 2 — ให้แถวบนกินที่ว่างที่เหลือ */
  .laptop__stage .en__row3 { flex: 1; min-height: 0; }
  .laptop__stage .en__row3--gates { flex: 0 0 auto; }
  .laptop__stage .en__zones { gap: 3px; }
  .laptop__stage .en__zones li { padding: 2px 3px; }
  .laptop__stage .en__doors li { padding: 3px; }
  .laptop__stage .en__cells i { height: auto; aspect-ratio: 1.4; }
  .laptop__stage .en__row2 .en__plot { min-height: 40px; }
  .laptop__stage .en__plot--power { min-height: 58px; }
  .laptop__stage .en__gauge { max-width: 118px; }
  .laptop__stage .en__iso { max-width: 168px; }
  .laptop__stage .en__mpct { font-size: 0.92rem; }
  .laptop__stage .en__big { width: min(100%, 60px); }
  .laptop__stage .en__scale { display: inline-flex; }
  .laptop__stage .en__pfoot em { font-size: 0.3rem; }
}

/* มือถือแนวตั้ง: แคบเกินกว่าจะวางของคู่กันได้ ต้องคลี่เป็นแถวเดียวทั้งหมด */
@media (orientation: portrait) and (max-width: 767px) {
  /* แท็บเล็ตด้านหลังเป็นภาพประกอบล้วน (aria-hidden) และกว้าง 430px
     บนจอแคบมันดันเครื่องหน้าหลุดออกไปนอกจอทั้งเครื่อง — ตัดออก เหลือมือถือเครื่องเดียว */
  /* จอแคบเหลือสองเครื่อง (แท็บเล็ตถูกซ่อน) — ย่อลงให้ทั้งคู่อยู่ในจอ ไม่ล้นขอบ */
  .phone-duo { --pw: min(210px, 47vw); }
  .phone--pixel { margin-left: -34px; }
  .phone-duo .tablet { display: none; }
  .phone--front { transform: perspective(1500px) rotateY(-4deg) rotate(-1deg); }
}

/* จอแนวตั้งที่แถบบนไม่มีอะไรอยู่ข้างโลโก้แล้ว — เอาตัวเลขสดขึ้นมาเป็นแถวที่สองเต็มความกว้าง */
@media (orientation: portrait) and (max-width: 975px) {
  .nav__inner {
    flex-wrap: wrap;
    height: auto;
    gap: 0;
    padding: 13px 0 9px;
  }
  .nav__live {
    display: flex;
    flex: 1 0 100%;
    margin: 9px 0 0;
    padding-top: 9px;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
  }
  /* ป้าย LIVE กินที่ไปเปล่า ๆ — ตัดออกให้ตัวเลขทั้งสี่ได้ความกว้างเต็ม */
  .nav__live-tag { display: none; }
  .navkpi,
  .navkpi:last-child,
  .navkpi:nth-last-child(-n+2),
  .navkpi:nth-last-child(-n+3) { display: flex; flex: 1; min-width: 0; gap: 3px; padding: 0 7px; }
  .navkpi:first-child { padding-left: 0; }
  .navkpi:first-child::before { display: none; }
  .navkpi__label { font-size: 0.56rem; letter-spacing: 0.02em; }
  .navkpi__value { font-size: 1.12rem; }
  .navkpi__value em { font-size: 0.56rem; margin-left: 3px; }
  /* แถบบนสูงขึ้นเพราะมีอีกแถว — ดันเนื้อหา hero ลงมาให้พ้น */
  .mm-hero { padding-top: clamp(140px, 16vh, 168px); }
}

/* เคารพการตั้งค่า "ลดการเคลื่อนไหว" ของผู้ใช้ */
@media (prefers-reduced-motion: reduce) {
  .momay-landing *,
  .momay-landing :deep(*) {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
  .reveal, .line__in, .split__ch { opacity: 1 !important; transform: none !important; filter: none !important; }
  .bars__fill { width: var(--w) !important; }
  .chart__line, .chart__area, .chart__peakdot, .todo__tick { stroke-dashoffset: 0 !important; opacity: 1 !important; }
  .product__art :deep(.tower) { opacity: 1 !important; transform: none !important; }
  .product__art :deep(.grow-g rect) { transform: scaleX(1) !important; }
}

</style>
