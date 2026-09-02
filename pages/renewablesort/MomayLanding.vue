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
          <stop offset="0%" stop-color="#ED1B2E" stop-opacity="0.42" />
          <stop offset="60%" stop-color="#7F181B" stop-opacity="0.14" />
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
          <svg class="brand__mark" viewBox="0 0 40 40" aria-hidden="true">
            <defs>
              <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ED1B2E" />
                <stop offset="100%" stop-color="#7F181B" />
              </linearGradient>
            </defs>
            <path d="M4 30 L20 6 L36 30 L28 30 L20 17 L12 30 Z" fill="url(#brandGrad)" />
            <path d="M14 34 L20 25 L26 34 Z" fill="#ED1B2E" opacity="0.55" />
          </svg>
          <span class="brand__text">
            <strong>MOMAY</strong>
            <small>BEHAVIORAL INTELLIGENCE PLATFORM</small>
          </span>
        </a>

        <nav class="nav__links">
          <!-- hover แล้วตัวหนังสือเลื่อนสลับชุดบน-ล่าง -->
          <a v-for="item in navItems" :key="item.hash" :href="item.hash" @click.prevent="goTo(item.hash)">
            <span class="mm-swap"><i>{{ item.label }}</i><i aria-hidden="true">{{ item.label }}</i></span>
          </a>
        </nav>

        <button type="button" class="mm-btn mm-btn--ghost nav__cta" v-magnetic @click="requestDemo">REQUEST DEMO</button>

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
        <button type="button" class="mm-btn mm-btn--solid" @click="requestDemo">REQUEST DEMO</button>
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
              <path d="M60 0H0V60" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="1" />
            </pattern>
            <radialGradient id="gridFade" cx="50%" cy="45%" r="62%">
              <stop offset="0%" stop-color="#fff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#fff" stop-opacity="0" />
            </radialGradient>
            <mask id="gridMask"><rect width="1200" height="700" fill="url(#gridFade)" /></mask>
          </defs>
          <rect width="1200" height="700" fill="url(#gridPattern)" mask="url(#gridMask)" />
        </svg>

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

        <!-- เงาคน มองออกไปยังเมืองข้อมูล -->
        <svg class="mm-hero__figure" viewBox="0 0 220 420" :style="{ transform: `translate3d(0, ${heroY * -0.1}px, 0)` }">
          <g fill="#04040a">
            <ellipse cx="110" cy="52" rx="30" ry="34" />
            <path d="M110 84 C 66 92, 44 126, 40 176 L 34 300 C 32 344, 40 392, 44 420 L 176 420 C 180 392, 188 344, 186 300 L 180 176 C 176 126, 154 92, 110 84 Z" />
          </g>
          <path d="M110 84 C 66 92, 44 126, 40 176 L 34 300" fill="none" stroke="#ED1B2E" stroke-width="2" opacity="0.35" />
          <path d="M110 84 C 154 92, 176 126, 180 176 L 186 300" fill="none" stroke="#ED1B2E" stroke-width="2" opacity="0.2" />
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

          <div class="mm-hero__actions" v-reveal="860">
            <button type="button" class="mm-btn mm-btn--solid mm-btn--lg" v-magnetic @click="exploreMomay">
              EXPLORE MOMAY
              <svg class="mm-btn__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
            </button>
            <button type="button" class="mm-btn mm-btn--play" @click="videoOpen = true">
              <span class="mm-btn__play">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none" /></svg>
              </span>
              WATCH VIDEO
            </button>
          </div>
        </div>

        <!-- ขวา: การ์ด Executive Brief (เอียงตามเมาส์ + ตัวเลขนับขึ้น) -->
        <div class="mm-hero__panel" v-reveal:right="240"
             :style="{ transform: `translate3d(0, ${heroY * -0.05}px, 0) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }"
             @mousemove="onTilt" @mouseleave="resetTilt">
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
                    <circle class="chart__peak" :cx="peak.x" :cy="peak.y" r="4" fill="#ED1B2E" />
                    <circle class="chart__peak-ring" :cx="peak.x" :cy="peak.y" r="4" fill="none" stroke="#ED1B2E" stroke-width="1.5" />
                  </svg>
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

    </section>

    <!-- ───────────────── แถบข้อความวิ่ง (คั่นระหว่าง hero กับเนื้อหา) ───────────────── -->
    <div class="ticker" aria-hidden="true">
      <div class="ticker__track">
        <span v-for="(t, i) in tickerLoop" :key="`t${i}`" class="ticker__item">
          {{ t }}
          <svg class="ticker__sep" viewBox="0 0 16 16"><path d="M8 1l4.5 7L8 15 3.5 8z" /></svg>
        </span>
      </div>
    </div>

    <!-- ───────────────── WHAT ARE YOU HERE TO DO ───────────────── -->
    <section id="solutions" class="section section--purpose">
      <div class="wrap">
        <p class="kicker" v-reveal>MOMAY STUDENT</p>
        <h2 class="h2" v-split="24">WHAT ARE YOU HERE TO DO?</h2>
        <p class="lead font-thai" v-reveal="160">ค้นหาพื้นที่ที่ใช่ ในบรรยากาศที่เหมาะสม ได้ง่ายและสะดวกยิ่งขึ้น</p>

        <ul class="purpose-grid">
          <li v-for="(c, i) in purposes" :key="c.title" class="pcard" v-reveal:zoom="i * 90">
            <span class="pcard__glow" :style="{ background: c.color }" />
            <span class="pcard__icon" :style="{ color: c.color, borderColor: c.color + '55' }" v-html="c.icon" />
            <h3>{{ c.title }}</h3>
            <p class="font-thai">{{ c.note }}</p>
          </li>
        </ul>

        <div class="center" v-reveal="120">
          <button type="button" class="mm-btn mm-btn--ghost mm-btn--lg" v-magnetic @click="open('/momay/MomayBUUStudent')">
            EXPLORE MOMAY STUDENT
            <svg class="mm-btn__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
    </section>


    <!-- เส้นคั่นแบบขอบฟ้าอวกาศ -->
    <div class="hr-space" aria-hidden="true">
      <svg viewBox="0 0 1200 90" preserveAspectRatio="none">
        <ellipse cx="600" cy="104" rx="680" ry="84" fill="url(#hrGlow)" />
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
        <ellipse cx="600" cy="96" rx="620" ry="70" fill="url(#hrGlow)" />
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

    <!-- ───────────────── STATS ───────────────── -->
    <section id="stats" class="section section--stats">
      <div class="wrap mm-stats">
        <div v-for="(s, i) in stats" :key="s.label" class="mm-stat" v-reveal="i * 100">
          <span class="mm-stat__num">
            <span v-count="{ to: s.value, decimals: s.decimals }">0</span>{{ s.suffix }}
          </span>
          <span class="mm-stat__label">{{ s.label }}</span>
        </div>
      </div>
    </section>

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
        <ellipse cx="600" cy="96" rx="620" ry="70" fill="url(#hrGlow)" />
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
          <button type="button" class="mm-btn mm-btn--solid mm-btn--lg" v-reveal="220" v-magnetic @click="requestDemo">
            REQUEST DEMO
            <svg class="mm-btn__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
          </button>
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
          <svg class="brand__mark" viewBox="0 0 40 40" aria-hidden="true">
            <path d="M4 30 L20 6 L36 30 L28 30 L20 17 L12 30 Z" fill="#ED1B2E" />
            <path d="M14 34 L20 25 L26 34 Z" fill="#ED1B2E" opacity="0.55" />
          </svg>
          <span class="brand__text">
            <strong>MOMAY</strong>
            <small>BEHAVIORAL INTELLIGENCE PLATFORM</small>
          </span>
        </a>

        <nav class="mm-footer__links">
          <a v-for="item in navItems" :key="`f-${item.hash}`" :href="item.hash" @click.prevent="goTo(item.hash)">
            {{ item.label }}
          </a>
          <a href="/contact" @click.prevent="open('/contact')">CONTACT</a>
        </nav>

        <div class="mm-footer__social">
          <a v-for="s in socials" :key="s.label" :href="s.href" :aria-label="s.label" :title="s.label"
             target="_blank" rel="noopener" v-html="s.icon" />
        </div>
      </div>
      <p class="mm-footer__copy">© {{ year }} Kwang Unlimit Company Limited. All rights reserved.</p>
    </footer>

    <!-- ───────────────── VIDEO LIGHTBOX ───────────────── -->
    <Transition name="fade">
      <div v-if="videoOpen" class="lightbox" @click.self="videoOpen = false">
        <button type="button" class="lightbox__close" aria-label="ปิด" @click="videoOpen = false">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
        </button>
        <video class="lightbox__video" src="/video/animation_openweb.mp4" controls autoplay playsinline />
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
    const p = Math.min(1, (now - t0) / duration)
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
const videoOpen = ref(false)
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

// เอียงการ์ด Executive Brief ตามเมาส์
const tilt = reactive({ x: 0, y: 0 })
const onTilt = (e) => {
  if (vw.value < 976 || reduceMotion()) return
  const r = e.currentTarget.getBoundingClientRect()
  tilt.y = ((e.clientX - r.left) / r.width - 0.5) * 9
  tilt.x = (0.5 - (e.clientY - r.top) / r.height) * 7
}
const resetTilt = () => {
  tilt.x = 0
  tilt.y = 0
}

/* ══════════════ 3. เนื้อหา ══════════════ */
const year = new Date().getFullYear()
const navItems = [
  { label: 'PRODUCTS', hash: '#products' },
  { label: 'VISION', hash: '#approach' },
  { label: 'SOLUTIONS', hash: '#solutions' },
  { label: 'CASES', hash: '#trusted' },
  { label: 'RESOURCES', hash: '#stats' },
  { label: 'COMPANY', hash: '#contact' },
]

// แถบข้อความวิ่ง — วนสองรอบเพื่อให้ต่อกันแบบไม่มีรอยต่อ
const tickerWords = [
  'BEHAVIORAL INTELLIGENCE',
  'REAL-TIME DATA',
  'SPACE UTILIZATION',
  'AI INSIGHT',
  'BETTER DECISIONS',
  'FROM DATA TO AWARENESS',
]
const tickerLoop = [...tickerWords, ...tickerWords]

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
    name: 'MOMAY + EXECUTIVE BRIEF',
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
  {
    name: 'MOMAY PLATFORM',
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
]

const stats = [
  { value: 20, decimals: 0, suffix: '+', label: 'ORGANIZATIONS TRUST US' },
  { value: 50, decimals: 0, suffix: '+', label: 'SPACES CONNECTED' },
  { value: 1, decimals: 0, suffix: 'M+', label: 'BEHAVIORS ANALYZED' },
  { value: 99.9, decimals: 1, suffix: '%', label: 'SYSTEM RELIABILITY' },
  { value: 24, decimals: 0, suffix: '/7', label: 'REAL-TIME MONITORING' },
]

const orgs = [
  { name: 'มหาวิทยาลัยนเรศวร', glyph: 'M42 22 v40 M30 34 h24 M34 52 h16 M42 22 l-6 8 M42 22 l6 8' },
  { name: 'มหาวิทยาลัยบูรพา', glyph: 'M42 24 L54 42 L42 60 L30 42 Z M42 32 L48 42 L42 52 L36 42 Z' },
]

const benefits = [
  {
    title: 'REAL EXPERIENCE',
    note: 'จากการใช้งานจริงในหลายองค์กร',
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2.6l2.8 1.7 3.2.3 1 3.1 2.1 2.5-1.6 2.8-.4 3.2-3.1.9-2.6 2-3-1.3-3 1.3-2.6-2-3.1-.9-.4-3.2L1.7 10.2 3.8 7.7l1-3.1 3.2-.3z"/><path d="M8.8 12.2l2.2 2.2 4.4-4.6"/></svg>`,
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

const socials = [
  {
    label: 'Website',
    href: 'https://www.kwangunlimit.com',
    icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.7 3.9 5.7 3.9 9S14.6 21.3 12 21c-2.6-.3-3.9-3-3.9-9S9.4 5.7 12 3z"/></svg>`,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 10.5V17M8 7.4v.1M12 17v-3.8a2.2 2.2 0 0 1 4.4 0V17"/></svg>`,
  },
  {
    label: 'Email',
    href: 'mailto:contact@kwangunlimit.com',
    icon: `<svg viewBox="0 0 24 24"><rect x="2.8" y="5" width="18.4" height="14" rx="3"/><path d="M3.6 7.2l8.4 6 8.4-6"/></svg>`,
  },
  {
    label: 'Phone',
    href: 'tel:+6655000000',
    icon: `<svg viewBox="0 0 24 24"><path d="M7.2 3.5l2.4 4.2-2 1.9a12 12 0 0 0 6.8 6.8l1.9-2 4.2 2.4-.8 3a2 2 0 0 1-2.2 1.4C10.2 20.1 3.9 13.8 3 6.5A2 2 0 0 1 4.4 4.3z"/></svg>`,
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
const exploreMomay = () => open('/renewablesort/momay')
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
  io = new IntersectionObserver(onIntersect, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 })
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

/* ── hover แล้วตัวหนังสือสลับชุด ── */
.mm-swap { display: inline-flex; flex-direction: column; height: 1.15em; overflow: hidden; }
.mm-swap i {
  flex: 0 0 1.15em;
  height: 1.15em;
  font-style: normal;
  line-height: 1.15em;
  transition: transform 0.55s var(--ease);
}
.nav__links a:hover .mm-swap i { transform: translateY(-1.15em); }

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
.mm-btn--play { color: var(--txt); }
.mm-btn--play:hover { color: #fff; }
.mm-btn__play {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #fff;
  transition: border-color 0.4s var(--ease), box-shadow 0.5s var(--ease), transform 0.5s var(--ease);
}
.mm-btn__play svg { width: 15px; height: 15px; }
.mm-btn--play:hover .mm-btn__play {
  border-color: var(--red);
  box-shadow: 0 0 0 7px rgba(237, 27, 46, 0.12);
  transform: scale(1.09);
}
.mm-btn__arrow { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.45s var(--ease); }
.mm-btn:hover .mm-btn__arrow { transform: translateX(4px); }

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
  position: fixed;
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
.brand__mark { width: 34px; height: 34px; flex: none; }
.brand__text { display: flex; flex-direction: column; line-height: 1.05; }
.brand__text strong { font-family: 'Poppins', 'Inter', sans-serif; font-size: 1.06rem; letter-spacing: 0.12em; }
.brand__text small { font-size: 0.5rem; letter-spacing: 0.16em; color: var(--muted); }
.nav__links { display: flex; gap: 26px; margin-left: auto; }
.nav__links a {
  font-size: 0.72rem;
  letter-spacing: 0.13em;
  font-weight: 600;
  color: #d7d7dd;
  text-decoration: none;
  position: relative;
  padding: 6px 0;
}
.nav__links a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1.5px;
  width: 0;
  background: var(--red);
  transition: width 0.3s ease;
}
.nav__links a:hover { color: #fff; }
.nav__links a:hover::after { width: 100%; }
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
.mm-hero__grid { inset: 0; width: 100%; height: 100%; }
.mm-hero__streams { inset: 0; width: 100%; height: 100%; }
.mm-hero__city { left: 0; right: 0; bottom: 0; width: 100%; }
.mm-hero__city--far { height: 46%; opacity: 0.9; }
.mm-hero__city--near { height: 34%; }
.mm-hero__figure {
  left: 28%;
  bottom: 0;
  width: clamp(150px, 17vw, 250px);
  height: auto;
  transform-origin: 50% 100%;
  opacity: 0.94;
}
.mm-hero__vignette {
  inset: 0;
  background:
    linear-gradient(90deg, rgba(6, 6, 10, 0.9) 4%, rgba(6, 6, 10, 0.42) 44%, rgba(6, 6, 10, 0.8) 100%),
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
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.04fr);
  gap: clamp(28px, 4vw, 60px);
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
  color: var(--muted);
  font-size: clamp(0.86rem, 1.3vw, 1rem);
  line-height: 1.85;
  margin: 20px 0 0;
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
.mm-hero__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; margin-top: 30px; }


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
.ticker {
  position: relative;
  overflow: hidden;
  padding: 15px 0;
  border-block: 1px solid var(--line);
  background: linear-gradient(90deg, rgba(237, 27, 46, 0.07), rgba(255, 255, 255, 0.02), rgba(237, 27, 46, 0.07));
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}
.ticker__track {
  display: flex;
  width: max-content;
  animation: tickerRun 36s linear infinite;
}
.ticker:hover .ticker__track { animation-play-state: paused; }
.ticker__item {
  display: inline-flex;
  align-items: center;
  gap: 24px;
  padding-right: 24px;
  font-family: 'Poppins', 'Inter', sans-serif;
  font-weight: 700;
  font-size: clamp(0.78rem, 1.5vw, 1.02rem);
  letter-spacing: 0.17em;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.4);
}
.ticker__item:nth-child(2n) { color: rgba(237, 27, 46, 0.78); }
.ticker__sep { width: 10px; height: 10px; flex: none; fill: var(--red); opacity: 0.75; }

/* ══════════════ การ์ด EXECUTIVE BRIEF ══════════════ */
.mm-hero__panel { transform-style: preserve-3d; transition: transform 0.6s var(--ease); }
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
.chart__peak, .chart__peak-ring { opacity: 0; }
.chart.is-in .chart__line { animation: drawLine 2s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
.chart.is-in .chart__line--alt { animation-duration: 2.6s; animation-delay: 0.15s; }
.chart.is-in .chart__area { animation: fadeIn 1s ease 1.1s forwards; }
.chart.is-in .chart__peak { animation: fadeIn 0.4s ease 1.5s forwards; }
.chart.is-in .chart__peak-ring { animation: peakRing 2.2s ease 1.6s infinite; }
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
.section { position: relative; padding: clamp(64px, 9vw, 118px) 0; }
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
.lead { text-align: center; color: var(--muted); margin: 14px auto 0; max-width: 62ch; line-height: 1.9; font-size: clamp(0.82rem, 1.2vw, 0.98rem); }

/* ══════════════ การ์ด PURPOSE ══════════════ */
.section--purpose { background: linear-gradient(180deg, var(--ink) 0%, var(--ink2) 100%); }
.purpose-grid {
  list-style: none;
  margin: clamp(30px, 4vw, 52px) 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
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
.pcard p { position: relative; font-size: 0.79rem; line-height: 1.8; color: var(--muted); margin: 0; }

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
  min-height: 380px;
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
  right: -7%;
  bottom: -4%;
  width: 84%;
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

/* ══════════════ STATS ══════════════ */
.section--stats { padding: clamp(44px, 6vw, 74px) 0; border-block: 1px solid var(--line); background: rgba(255, 255, 255, 0.015); }
.mm-stats { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 18px; text-align: center; }
.mm-stat { position: relative; }
/* ขีดแบ่งคอลัมน์ — จางหัวท้ายให้กลืนกับพื้นดำ */
.mm-stat + .mm-stat::before {
  content: '';
  position: absolute;
  top: 50%;
  left: -9px;
  transform: translateY(-50%);
  width: 1px;
  height: 64%;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.18) 45%, rgba(237, 27, 46, 0.35) 55%, transparent);
}
.mm-stat__num {
  display: block;
  font-family: 'Poppins', 'Inter', sans-serif;
  font-weight: 800;
  font-size: clamp(1.7rem, 3.4vw, 2.9rem);
  color: var(--red);
  text-shadow: 0 0 34px rgba(237, 27, 46, 0.35);
  line-height: 1.15;
}
.mm-stat__label { display: block; font-size: 0.6rem; letter-spacing: 0.13em; color: var(--muted); margin-top: 8px; }

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
.mm-footer__links { display: flex; flex-wrap: wrap; gap: 18px; margin-inline: auto; }
.mm-footer__links a { font-size: 0.64rem; letter-spacing: 0.12em; color: var(--muted); text-decoration: none; transition: color 0.25s ease; }
.mm-footer__links a:hover { color: #fff; }
.mm-footer__social { display: flex; gap: 9px; }
.mm-footer__social a {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--line);
  color: var(--muted);
  transition: color 0.4s var(--ease), border-color 0.4s var(--ease), transform 0.45s var(--ease);
}
.mm-footer__social a:hover { color: #fff; border-color: rgba(237, 27, 46, 0.6); transform: translateY(-3px); }
.mm-footer__social :deep(svg) { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.mm-footer__copy { text-align: center; font-size: 0.6rem; color: rgba(255, 255, 255, 0.32); margin: 24px 0 0; }

/* ══════════════ LIGHTBOX ══════════════ */
.lightbox { position: fixed; inset: 0; z-index: 80; display: grid; place-items: center; background: rgba(3, 3, 6, 0.92); backdrop-filter: blur(6px); padding: 5vw; }
.lightbox__video { width: min(1000px, 92vw); max-height: 82vh; border-radius: 14px; border: 1px solid var(--line); background: #000; }
.lightbox__close { position: absolute; top: 22px; right: 26px; width: 40px; height: 40px; display: grid; place-items: center; border-radius: 50%; border: 1px solid var(--line); background: rgba(255, 255, 255, 0.05); color: #fff; cursor: pointer; }
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
@keyframes peakRing { 0% { r: 4; opacity: 0.9; } 100% { r: 13; opacity: 0; } }
@keyframes ringOut { 0% { transform: scale(0.92); opacity: 0.5; } 70% { transform: scale(1.22); opacity: 0; } 100% { opacity: 0; } }
@keyframes driftUp { 0% { transform: translateY(14px); } 50% { transform: translateY(-16px); } 100% { transform: translateY(14px); } }
@keyframes streamRun { to { stroke-dashoffset: -1160; } }
@keyframes waveRun { to { stroke-dashoffset: -320; } }
@keyframes twinkle { 0%, 100% { opacity: 0.18; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.6); } }
@keyframes tickerRun { to { transform: translate3d(-50%, 0, 0); } }
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
  .mm-stat__label { font-size: 0.55rem; letter-spacing: 0.1em; }
}
@media (max-width: 975px) {
  .nav__links, .nav__cta { display: none; }
  .nav__burger { display: block; margin-left: auto; }
  .nav__mobile { display: flex; max-height: 0; overflow: hidden; padding-block: 0; transition: max-height 0.4s ease, padding 0.4s ease; }
  .nav__mobile.is-open { max-height: 420px; padding-bottom: 18px; }
  .mm-hero { min-height: auto; }
  .mm-hero__inner { grid-template-columns: minmax(0, 1fr); }
  .mm-hero__figure { display: none; }
  .mm-hero__panel { transform: none !important; }
  .product { min-height: 350px; }
  .cta { grid-template-columns: minmax(0, 1fr); }
  .mm-footer__inner { justify-content: center; }
  .mm-footer__links { margin-inline: 0; justify-content: center; }
}
/* มือถือ: ตัดเป็นหลายแถวให้เห็นครบทุกใบในจอเดียว ไม่ต้องเลื่อนซ้ายขวา */
@media (max-width: 767px) {
  .purpose-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
  .flow { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 26px 10px; }
  .flow__arrow { display: none; }
  .products { grid-template-columns: minmax(0, 1fr); }
  .product { min-height: 330px; }
  .product__art { width: 76%; right: -6%; }
  .mm-stats { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px 10px; }
  .mm-stat + .mm-stat::before { left: -5px; }
  .mm-stat:nth-child(3n + 1)::before { display: none; }
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
  .mm-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .mm-stat:nth-child(3n + 1)::before { display: block; }
  .mm-stat:nth-child(2n + 1)::before { display: none; }
  .product { min-height: 320px; }
  .product__art { width: 82%; }
  .mm-stat__num { font-size: 1.6rem; }
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
  .chart__line, .chart__area, .chart__peak, .todo__tick { stroke-dashoffset: 0 !important; opacity: 1 !important; }
  .product__art :deep(.tower) { opacity: 1 !important; transform: none !important; }
  .product__art :deep(.grow-g rect) { transform: scaleX(1) !important; }
}
</style>
