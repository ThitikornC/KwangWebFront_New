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

        <button type="button" class="mm-btn mm-btn--ghost nav__cta" v-magnetic @click="goTo('#trusted')">SEE CUSTOMERS</button>

        <button type="button" class="nav__burger" :aria-expanded="menuOpen" aria-label="เมนู" @click="menuOpen = !menuOpen">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path v-if="!menuOpen" d="M3 6h18M3 12h18M3 18h18" />
            <path v-else d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
      </div>

      <!-- เมนูมือถือ -->
      <div class="nav__mobile" :class="{ 'is-open': menuOpen }">
        <a v-for="item in navItems" :key="`m-${item.hash}`" :href="item.hash" @click.prevent="goTo(item.hash)">
          {{ item.label }}
        </a>
        <button type="button" class="mm-btn mm-btn--solid" @click="goTo('#trusted')">SEE CUSTOMERS</button>
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

        <!-- ภาพการไหลของผู้คนฝั่งซ้าย — จางและกลืนไปกับพื้นดำ -->
        <div class="mm-hero__people" :style="{ transform: `translate3d(0, ${heroY * 0.08}px, 0)` }" />

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
            <li v-for="chip in heroChips" :key="chip.title" class="chip">
              <span class="chip__icon" v-html="chip.icon" />
              <span class="chip__label">
                <b>{{ chip.title }}</b>
                <small class="font-thai">{{ chip.note }}</small>
              </span>
            </li>
          </ul>

          <!-- ทางลัดไปเดโมของทั้งสามผลิตภัณฑ์ -->
          <div class="hero-demos">
            <button v-for="(d, i) in demoLinks" :key="d.key" type="button" class="demolink"
                    :style="{ '--accent': d.color }" v-reveal="820 + i * 90" @click="open(d.link)">
              <span class="demolink__icon" v-html="d.icon" />
              <span class="demolink__label">
                <b>{{ d.label }}</b>
                <small>
                  VIEW DEMO
                  <svg class="demolink__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
                </small>
              </span>
            </button>
          </div>
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
          <p class="lead font-thai" v-reveal="160">{{ sc.lead }}</p>

          <div v-if="sc.panel" class="brief-showcase" v-reveal="140">
            <div class="brief">
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

          <!-- คอนโซลจำลองของ MOMAY ENLIGHTENED — ผังเดียวกับแดชบอร์ดจริง -->
          <div v-else-if="sc.console" class="brief-showcase" v-reveal="140">
            <div class="brief brief--en">
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
              <div class="phone__screen">
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
                    <li v-for="(f, i) in studentFloors" :key="f.floor"
                        :class="{ 'is-open': openFloor === f.floor }" v-reveal="120 + i * 70">
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
                    <li class="phone__park" v-reveal="560">
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

            <!-- เครื่องหลัง: แท็บเล็ตแสดงรายละเอียดพื้นที่ -->
            <div class="tablet" aria-hidden="true">
              <span class="tablet__cam" />
              <div class="tablet__screen">
                <div class="phone__top">
                  <span class="phone__brand">
                    <i class="phone__avatar">M</i>
                    <b>MOMAY</b><em>STUDENT</em>
                  </span>
                  <span class="phone__meta">
                    <em>{{ clockShort }}</em>
                    <i class="phone__chip">TH</i>
                  </span>
                </div>

                <div class="tablet__cols font-thai">
                  <div class="tablet__col">
                    <span class="phone__label">บริการรายชั้น</span>
                    <ul class="phone__list">
                      <li v-for="f in studentFloors.slice(0, 4)" :key="`t-${f.floor}`" :class="{ 'is-open': f.floor === '1' }">
                        <span class="phone__row">
                          <span class="phone__mix">
                            <i v-for="c in floorMix(f)" :key="c" :style="{ background: c }" />
                          </span>
                          <span class="phone__floor">ชั้น <b>{{ f.floor }}</b></span>
                          <span class="phone__info">
                            <b :class="{ 'is-live': f.open }">{{ f.title }}</b>
                            <small>{{ floorNote(f) }}</small>
                          </span>
                          <svg class="phone__go" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div class="tablet__col">
                    <div class="zonecard">
                      <span class="zonecard__name">24-Hr Learning Commons</span>
                      <b class="zonecard__big"><span v-count="{ to: enZones[0].people }">0</span><em>/131 ที่นั่ง</em></b>
                      <span class="zonecard__bar"><i :style="{ width: Math.min(100, enZones[0].pct) + '%' }" /></span>
                      <small>เปิด 24 ชม. · ที่นั่งว่างตอนนี้</small>
                    </div>

                    <span class="phone__label">ประเภทที่นั่ง</span>
                    <ul class="phone__list">
                      <li v-for="k in seatKinds" :key="k.name">
                        <span class="phone__row">
                          <span class="phone__floor phone__floor--icon" v-html="k.icon" />
                          <span class="phone__info">
                            <b>{{ k.name }}</b>
                            <small>{{ k.note }}</small>
                          </span>
                          <span class="phone__seats"><b>{{ k.free }}<em>ว่าง</em></b></span>
                        </span>
                      </li>
                    </ul>

                    <span class="phone__cta">จองที่นั่ง</span>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

          <div class="center" v-reveal="120">
            <button type="button" class="mm-btn mm-btn--ghost mm-btn--lg" v-magnetic @click="open(sc.link)">
              {{ sc.cta }}
              <svg class="mm-btn__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
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
          กระบวนการเปลี่ยนข้อมูลให้เป็นความเข้าใจ และนำไปสู่การตัดสินใจที่ดีกว่า
        </p>

        <ol class="flow">
          <li v-for="(s, i) in steps" :key="s.title" class="flow__step" v-reveal="i * 120">
            <span class="flow__ring" :style="{ color: s.color, borderColor: s.color }">
              <span class="flow__pulse" :style="{ borderColor: s.color }" />
              <span v-html="s.icon" />
            </span>
            <svg v-if="i < steps.length - 1" class="flow__arrow" viewBox="0 0 48 16" aria-hidden="true">
              <path d="M2 8h38" stroke="#ED1B2E" stroke-width="1.6" opacity="0.55" />
              <path d="M36 3l6 5-6 5" fill="none" stroke="#ED1B2E" stroke-width="1.6" opacity="0.8" />
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

        <div class="products">
          <article v-for="(p, i) in products" :key="p.name" class="product" v-reveal="i * 140"
                   :style="{ '--accent': p.color }" @click="open(p.link)">
            <div class="product__body">
              <h3 class="product__name">{{ p.name }}</h3>
              <p class="product__tag">{{ p.tagline }}</p>
              <p class="product__note font-thai">{{ p.note }}</p>
              <span class="product__link">
                VIEW DEMO
                <svg class="mm-btn__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
              </span>
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
                  <svg viewBox="0 0 84 84" aria-hidden="true">
                    <circle cx="42" cy="42" r="39" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.4" />
                    <circle cx="42" cy="42" r="33" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1" stroke-dasharray="2 4" />
                    <g stroke="rgba(255,255,255,0.75)" stroke-width="1.6" fill="none"
                       stroke-linecap="round" stroke-linejoin="round">
                      <path :d="o.glyph" />
                    </g>
                    <path d="M42 6 L45 12 L39 12 Z" fill="rgba(255,255,255,0.6)" />
                  </svg>
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
          <span class="brand__text">
            <strong>MOMAY</strong>
            <small>BEHAVIORAL INTELLIGENCE PLATFORM</small>
          </span>
        </a>

      </div>
      <p class="mm-footer__copy">© {{ year }} Kwang Unlimit Company Limited. All rights reserved.</p>
    </footer>

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
    el.classList.add('is-in')
    if (el._count) runCount(el, 0, el._count.to, el._count.decimals || 0)
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
    el.textContent = ''
    el.classList.add('split')
    graphemes(text).forEach((g, i) => {
      const s = document.createElement('span')
      s.className = 'split__ch'
      s.style.setProperty('--i', i)
      s.style.setProperty('--step', `${step}ms`)
      if (g === ' ') {
        s.classList.add('split__ch--space')
        s.innerHTML = '&nbsp;'
      } else {
        s.textContent = g
      }
      el.appendChild(s)
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
const menuOpen = ref(false)
const docOpen = ref(false)
const contactOpen = ref(false)
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
const navItems = [
  { label: 'PRODUCTS', hash: '#products' },
  { label: 'VISION', hash: '#approach' },
  { label: 'SOLUTIONS', hash: '#solutions' },
  { label: 'CASES', hash: '#trusted' },
  { label: 'COMPANY', hash: '#contact' },
]

const heroChips = [
  {
    title: 'REAL DATA',
    note: 'ข้อมูลจริงจากหน้างาน',
    icon: `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>`,
  },
  {
    title: 'REAL BEHAVIOR',
    note: 'พฤติกรรมการใช้พื้นที่',
    icon: `<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20v-1.4A4.6 4.6 0 0 1 7.1 14h3.8a4.6 4.6 0 0 1 4.6 4.6V20"/><path d="M16 8.4a3 3 0 0 1 0 5.2"/><path d="M18 20v-1.5a4 4 0 0 0-1.6-3.2"/></svg>`,
  },
  {
    title: 'REAL INSIGHT',
    note: 'เข้าใจได้ทันที',
    icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3"/></svg>`,
  },
]

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
    title: 'FROM DATA TO INTELLIGENCE.',
    lead: 'แพลตฟอร์มที่สามารถนำข้อมูลมาสร้าง Behavioral Intelligence ตั้งแต่การมองเห็นสถานการณ์ การทำความเข้าใจรูปแบบการใช้งาน การคาดการณ์แนวโน้ม ไปจนถึงการนำเสนอข้อมูลเพื่อช่วยให้ผู้บริหารสามารถตัดสินใจและบริหารทรัพยากรได้อย่างเหมาะสม',
    cta: 'EXPLORE MOMAY ENLIGHTENED',
    link: '/momay/MomayPrototype',
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
    link: '/momay/MomayBUUStudent',
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
    link: '/momay/MomayBUU-Executive',
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
    link: '/momay/MomayPrototype',
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
    link: '/momay/MomayBUUStudent',
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
    link: '/momay/MomayBUU-Executive',
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
]

// ปุ่มใต้ Executive Brief — อ้างผลิตภัณฑ์ชุดเดียวกัน จะได้ไม่ต้องแก้ลิงก์สองที่
const demoIcons = {
  'MOMAY ENLIGHTENED': `<svg viewBox="0 0 24 24"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3.2"/></svg>`,
  'MOMAY STUDENT': `<svg viewBox="0 0 24 24"><circle cx="12" cy="7.6" r="3"/><path d="M5.5 19.5a6.5 6.5 0 0 1 13 0"/></svg>`,
  'MOMAY EXECUTIVE BRIEF': `<svg viewBox="0 0 24 24"><path d="M6 3.5h8L18.5 8v12.5h-12.5z"/><path d="M13.5 3.7V8.2H18"/><path d="M9 12.5h6M9 16h4"/></svg>`,
}

const demoLinks = products.map((p) => ({
  key: p.name,
  label: p.name.replace(/^MOMAY\s+/, ''),
  color: p.color,
  link: p.link,
  icon: demoIcons[p.name],
}))

const orgs = [
  { name: 'มหาวิทยาลัยนเรศวร', glyph: 'M42 22 v40 M30 34 h24 M34 52 h16 M42 22 l-6 8 M42 22 l6 8' },
  { name: 'มหาวิทยาลัยบูรพา', glyph: 'M42 24 L54 42 L42 60 L30 42 Z M42 32 L48 42 L42 52 L36 42 Z' },
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
  menuOpen.value = false
  if (/^https?:\/\//i.test(path)) navigateTo(path, { external: true })
  else navigateTo(path)
}
const requestDemo = () => open('/contact')
const goTo = (hash) => {
  menuOpen.value = false
  const el = document.querySelector(hash)
  if (!el) return
  smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - 72)
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

  nextTick(() => requestAnimationFrame(() => { heroReady.value = true }))
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
  .line__in--red.split .split__ch { color: transparent; }
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
.mm-btn__arrow { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.45s var(--ease); }
.mm-btn:hover .mm-btn__arrow { transform: translateX(4px); }
.mm-btn__arrow--tel { width: 16px; height: 16px; stroke-linejoin: round; }
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
  gap: 18px;
  height: 68px;
}
.brand { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; color: inherit; }
.brand__text { display: flex; flex-direction: column; line-height: 1.05; }
.brand__text strong { font-family: 'Poppins', 'Inter', sans-serif; font-size: 1.06rem; letter-spacing: 0.12em; }
.brand__text small { font-size: 0.5rem; letter-spacing: 0.16em; color: var(--muted); }
.nav__live { display: flex; align-items: center; margin-left: auto; }
.nav__live-tag { font-size: 0.5rem; padding-right: 16px; }
.navkpi {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 0 16px;
  position: relative;
}
.navkpi::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 22px;
  background: rgba(255, 255, 255, 0.09);
}
.navkpi__label { font-style: normal; font-size: 0.5rem; letter-spacing: 0.14em; color: var(--muted); }
.navkpi__value {
  font-family: 'Poppins', 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.92rem;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.navkpi__value em { font-style: normal; font-size: 0.5rem; letter-spacing: 0.08em; color: var(--muted); margin-left: 3px; }
.nav__burger { display: none; background: none; border: 0; color: #fff; padding: 6px; cursor: pointer; }
.nav__burger svg { width: 26px; height: 26px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; }
.nav__mobile {
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: 0 6vw 18px;
  background: rgba(6, 6, 10, 0.96);
  border-bottom: 1px solid var(--line);
}
.nav__mobile a {
  color: #d7d7dd;
  text-decoration: none;
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

/* ══════════════ HERO ══════════════ */
.mm-hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 100svh;
  padding: clamp(104px, 13vh, 150px) 0 clamp(70px, 9vh, 110px);
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
  background: url('/momay/hero-people.webp') right 42% / cover no-repeat;
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
  gap: clamp(28px, 4vw, 44px);
  align-items: center;
  perspective: 1400px;
}
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 0.66rem;
  letter-spacing: 0.26em;
  color: #ffb3b9;
  margin-bottom: 16px;
}
.eyebrow__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--red);
  box-shadow: 0 0 0 5px rgba(237, 27, 46, 0.16);
  animation: pulseDot 2.4s ease-in-out infinite;
}
.mm-hero__copy { text-shadow: 0 2px 18px rgba(0, 0, 0, 0.75); }
.mm-hero__title {
  font-family: 'Poppins', 'Inter', sans-serif;
  font-weight: 800;
  font-size: clamp(2.9rem, 8vw, 6.2rem);
  line-height: 0.94;
  letter-spacing: -0.025em;
  margin: 0;
}
.mm-hero__sub {
  font-family: 'Poppins', 'Inter', sans-serif;
  font-weight: 600;
  font-size: clamp(0.95rem, 1.7vw, 1.35rem);
  letter-spacing: 0.16em;
  color: #e2e2e8;
  margin: 14px 0 0;
}
.mm-hero__thai {
  color: #eaeaf0;
  font-size: clamp(0.95rem, 1.4vw, 1.12rem);
  line-height: 2;
  margin: 20px 0 0;
  word-spacing: 0.06em;
}
.mm-hero__chips {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(14px, 2.4vw, 30px);
  margin: 26px 0 0;
  padding: 0;
  list-style: none;
}
.chip { display: flex; align-items: center; gap: 11px; }
.chip__icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid rgba(237, 27, 46, 0.35);
  background: rgba(237, 27, 46, 0.08);
  color: var(--red);
  transition: transform 0.5s var(--ease), box-shadow 0.5s var(--ease);
}
.chip:hover .chip__icon { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(237, 27, 46, 0.25); }
.chip__icon :deep(svg) {
  width: 21px; height: 21px; fill: none; stroke: currentColor;
  stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round;
}
.chip__label { display: flex; flex-direction: column; line-height: 1.3; }
.chip__label b { font-size: 0.7rem; letter-spacing: 0.13em; }
.chip__label small { font-size: 0.66rem; color: var(--muted); }


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
.phone-duo { display: flex; align-items: center; justify-content: flex-end; min-width: 0; }
.phone {
  position: relative;
  width: min(252px, 100%);
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
.phone--front { z-index: 2; transform: perspective(1500px) rotateY(-11deg) rotateX(2deg) rotate(-2deg); }
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
}
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
.phone__body { overflow: auto; scrollbar-width: none; }
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
.tablet {
  position: relative;
  z-index: 1;
  width: min(430px, 100%);
  flex: none;
  margin-left: -34px;
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
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: #08080e;
  padding: 11px 11px 12px;
  overflow: hidden;
}
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
  align-content: start;
  padding-top: clamp(44px, 6.8vh, 80px);
  padding-bottom: clamp(14px, 2.2vh, 32px);
}
/* เส้นคั่นด้านบนวางทับ (z-index 3) — ยกเนื้อหาส่วนนี้ขึ้นมาไม่ให้แสงพาดตัวหนังสือ */
.section--fit .wrap { position: relative; z-index: 4; }
.section--fit .kicker { font-size: clamp(1.4rem, 3vw, 2.1rem); }
.section--fit .lead {
  margin-top: 12px;
  max-width: min(1180px, 100%);
  font-size: clamp(0.88rem, 1.08vw, 1.02rem);
  line-height: 1.95;
}
.section--fit .center { margin-top: clamp(12px, 2vh, 24px); }
.section--fit .brief-showcase { margin-top: clamp(14px, 2.2vh, 26px); }
.section--fit .brief { padding: clamp(9px, 1.05vw, 14px); }
.section--fit .brief__head { padding-bottom: 9px; }

/* การ์ด Executive Brief */
.section--panel .chart svg { height: clamp(60px, 8.5vh, 104px); }

/* คอนโซล ENLIGHTENED */
.section--fit .en__blocks { margin-top: clamp(5px, 0.8vh, 9px); }
.section--fit .en__zones { gap: 2px; }
.section--fit .en__cells i { height: clamp(6px, 1.1vh, 11px); }
.section--fit .en__row2 .en__plot { min-height: clamp(28px, 3.4vh, 46px); }
.section--fit .en__plot--power { min-height: clamp(30px, 4.2vh, 64px); }
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
.section--fit .phone__body { max-height: clamp(210px, 39vh, 440px); }
.section--fit .phone__hello { margin: clamp(7px, 1.2vh, 13px) 0 clamp(7px, 1.1vh, 11px); }
.section--fit .phone__hello b { font-size: 0.82rem; }
.section--fit .phone__list { gap: 5px; margin-bottom: 8px; }
.section--fit .phone__list li { padding: clamp(5px, 0.8vh, 8px) 8px; }
.section--fit .phone__fade { height: 16px; }
.section--fit .phone__tabs { margin: 0 -10px; padding: 6px 5px 8px; }

/* จอเตี้ยมาก — ย่อหัวเรื่องลงอีกให้เนื้อหายังอยู่ครบในหน้าเดียว */
@media (max-height: 860px) {
  .section.section--fit { padding-top: clamp(22px, 3.8vh, 58px); padding-bottom: clamp(8px, 1.3vh, 22px); }
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  max-width: min(660px, 100%);
  margin-top: 30px;
}
.demolink {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 13px 9px 10px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: linear-gradient(160deg, rgba(20, 20, 28, 0.9), rgba(10, 10, 16, 0.92));
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.45s var(--ease), transform 0.45s var(--ease);
}
.demolink:hover { border-color: var(--accent); transform: translateY(-3px); }
.demolink__icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 12px;
  border: 1px solid var(--accent);
  background: rgba(255, 255, 255, 0.04);
  color: var(--accent);
  transition: transform 0.5s var(--ease), box-shadow 0.5s var(--ease);
}
.demolink:hover .demolink__icon { box-shadow: 0 8px 20px rgba(0, 0, 0, 0.45); }
.demolink__icon :deep(svg) {
  width: 19px; height: 19px; fill: none; stroke: currentColor;
  stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round;
}
.demolink__label { display: flex; flex-direction: column; gap: 2px; line-height: 1.3; }
.demolink__label b {
  font-family: 'Poppins', 'Inter', sans-serif;
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.11em;
  color: var(--accent);
  white-space: nowrap;
}
.demolink__label small {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.52rem;
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
  font-size: clamp(1.5rem, 3.5vw, 2.5rem);
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
  line-height: 2;
  font-size: clamp(0.94rem, 1.35vw, 1.12rem);
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
.flow__arrow path { stroke-dasharray: 44; stroke-dashoffset: 44; }
.flow__step.is-in .flow__arrow path { animation: drawTick 0.7s ease 0.35s forwards; }
.flow__step h3 { font-size: 0.86rem; font-weight: 800; letter-spacing: 0.08em; margin: 0 0 8px; }
.flow__step p { font-size: 0.79rem; line-height: 1.8; color: var(--muted); margin: 0; text-wrap: balance; }

/* ══════════════ PRODUCTS ══════════════ */
.section--products { background: linear-gradient(180deg, var(--ink2) 0%, var(--ink) 100%); }
.products { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(12px, 1.6vw, 20px); margin-top: clamp(30px, 4vw, 52px); }
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
  margin-top: 20px;
  padding: 11px 26px;
  border: 2px solid var(--accent);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  white-space: nowrap;
  color: var(--accent);
  transition: background 0.45s var(--ease), color 0.45s var(--ease),
              box-shadow 0.5s var(--ease), transform 0.5s var(--ease);
}
.product:hover .product__link {
  background: var(--accent);
  color: #08080d;
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.5);
}
.product:hover .product__link .mm-btn__arrow { transform: translateX(5px); }
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
.org__crest { display: block; width: clamp(66px, 7vw, 98px); transition: transform 0.55s var(--ease), filter 0.55s var(--ease); filter: grayscale(1) opacity(0.78); }
.org:hover .org__crest { transform: translateY(-4px) scale(1.06); filter: grayscale(0) opacity(1); }
.org__crest svg { width: 100%; height: auto; }
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
    linear-gradient(100deg, rgba(6, 6, 10, 0.88) 6%, rgba(6, 6, 10, 0.44) 42%, rgba(6, 6, 10, 0.08) 100%),
    linear-gradient(180deg, rgba(6, 6, 10, 0.86) 0%, transparent 24%, transparent 66%, var(--ink) 100%);
}
/* จอใหญ่: ตรึงภาพให้เลื่อนช้ากว่าเนื้อหาเล็กน้อย */
@media (min-width: 976px) and (hover: hover) {
  .section--cta::before { background-attachment: fixed; }
}
.cta__city { position: absolute; inset: auto 0 0 0; z-index: 1; width: 100%; height: 62%; opacity: 0.6; }
.cta__ray { stroke-dasharray: 4 12; animation: waveRun 9s linear infinite; animation-delay: calc(var(--i) * -0.6s); }
.cta { position: relative; z-index: 2; display: grid; grid-template-columns: 1.05fr 0.95fr; gap: clamp(26px, 4vw, 56px); align-items: center; }
.cta__copy { text-shadow: 0 2px 20px rgba(0, 0, 0, 0.7); }
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

/* ══════════════ responsive ══════════════ */
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
  .navkpi__value { font-size: 0.82rem; }
  .navkpi:last-child { display: none; }
}
@media (max-width: 975px) {
  .nav__live, .nav__cta { display: none; }
  .nav__burger { display: block; margin-left: auto; }
  .nav__mobile { display: flex; max-height: 0; overflow: hidden; padding-block: 0; transition: max-height 0.4s ease, padding 0.4s ease; }
  .nav__mobile.is-open { max-height: 420px; padding-bottom: 18px; }
  .showcase-body--split { grid-template-columns: minmax(0, 1fr); }
  .showcase-body--split .phone { margin-top: 4px; }
  .mm-hero { min-height: auto; }
  .mm-hero__inner { grid-template-columns: minmax(0, 1fr); }
  .product { min-height: 350px; }
  .cta { grid-template-columns: minmax(0, 1fr); }
  .mm-footer__inner { justify-content: center; }
}
/* มือถือ: ตัดเป็นหลายแถวให้เห็นครบทุกใบในจอเดียว ไม่ต้องเลื่อนซ้ายขวา */
@media (max-width: 767px) {
  .purpose-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
  .flow { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 26px 10px; }
  .flow__arrow { display: none; }
  .products { grid-template-columns: minmax(0, 1fr); }
  .product { min-height: 340px; }
  .product__art { width: 88%; right: -6%; }
  .brief__row { grid-template-columns: minmax(0, 1fr); }
  .kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .mm-hero__chips { gap: 14px 18px; }
  .pcard { padding: 16px 10px 14px; }
  .pcard h3 { font-size: 0.74rem; }
  .pcard p, .flow__step p { font-size: 0.7rem; }
  .flow__step h3 { font-size: 0.72rem; }
}
@media (max-width: 479px) {
  .purpose-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .flow { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .product { min-height: 330px; }
  .product__art { width: 92%; right: -6%; }
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
