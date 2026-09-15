<template>
  <div class="momay-demo">
    <!-- ══════════════════ หน้าจอ (ซ่อนตอนพิมพ์) ══════════════════ -->
    <div class="app" :class="{ 'app-wide': step === TOTAL }">
      <!-- ── แถบแบรนด์ ── -->
      <header class="brand-bar">
        <div class="logo">
          <span class="logo-main">MOMAY</span><span class="logo-script">Surprise</span>
        </div>
        <div class="tag" v-html="stepTag" />
      </header>

      <!-- ── progress (ไม่แสดงหน้าแรก) ── -->
      <div v-if="step > 1" class="progbar">
        <div class="track">
          <div class="fill" :style="{ width: progressPct + '%' }" />
          <div class="diamond" :style="{ left: progressPct + '%' }" />
        </div>
        <div class="count">{{ step }} / {{ TOTAL }}</div>
      </div>

      <main class="body">
        <!-- out-in: หน้าเก่าต้องออกให้สุดก่อนหน้าใหม่เข้า ไม่งั้นสองหน้าซ้อนกันแล้วความสูงเด้ง -->
        <Transition name="warp" mode="out-in">
        <!-- ═════════ 01 · Choose Organization ═════════ -->
        <section v-if="step === 1" key="s1" class="screen">
          <div class="cols cols-cover">
            <div class="cover">
              <!-- ภาพเปลี่ยนตามหมวดองค์กรที่เลือก (ORG_TYPES[x].photo) -->
              <Transition name="cover" mode="out-in">
                <div
                  :key="coverPhoto"
                  class="cover-img photo-slot"
                  :style="{ '--bg-photo': `url('${coverPhoto}')` }"
                />
              </Transition>
              <div class="cover-text">
                <h1 class="h-en">Same data.<br />A brighter tomorrow.</h1>
                <p class="h-th font-thai">ข้อมูลของคุณ อาจทำให้คุณมองใหม่กว่าที่เคย</p>
              </div>
            </div>

            <div class="org-col">
              <div class="org-list">
                <template v-for="o in ORG_TYPES" :key="o.id">
                  <button
                    type="button"
                    class="org-row"
                    :class="{ active: form.org === o.id, open: openOrg === o.id }"
                    @click="pickOrg(o.id)"
                  >
                    <span class="org-ic"><Ico :name="o.icon" /></span>
                    <span class="org-label">
                      <span class="org-en">{{ o.en }}</span>
                      <span class="org-th font-thai">{{ o.th }}</span>
                    </span>
                    <span v-if="form.org === o.id" class="org-go">
                      <Ico :name="openOrg === o.id ? 'arrow-down' : 'arrow-right'" />
                    </span>
                  </button>

                  <!-- ── ดร๊อปดาวน์กรอกข้อมูล (ยุบหน้า 02 + 03 เดิมมาไว้ตรงนี้) ── -->
                  <Transition name="dd">
                    <div v-if="openOrg === o.id" class="dd">
                      <div class="dd-inner">
                        <!-- ตัวเลขพื้นฐานของพื้นที่ -->
                        <p class="dd-title">
                          Tell us a little about <span class="accent">your {{ o.subject }}</span>
                        </p>
                        <p class="dd-sub font-thai">บอกเราเล็กน้อยเกี่ยวกับพื้นที่ของคุณ</p>

                        <div class="field-list">
                          <div v-for="f in fieldList" :key="f.key" class="field">
                            <span class="field-ic"><Ico :name="f.icon" /></span>
                            <div class="field-main">
                              <div class="field-label font-thai">
                                {{ f.label }}<br /><span class="field-note">{{ f.note }}</span>
                              </div>
                              <div class="field-input">
                                <input
                                  :value="displayValue(f.key)"
                                  inputmode="numeric"
                                  class="font-thai"
                                  @focus="focusedKey = f.key"
                                  @blur="focusedKey = null"
                                  @input="onNumInput(f.key, $event)"
                                />
                                <span class="field-unit font-thai">{{ f.unit }}</span>
                              </div>
                              <div class="field-hint font-thai">{{ f.hint }}</div>
                            </div>
                          </div>
                        </div>

                        <!-- โซลาร์: แบ่งสัดส่วนการใช้ไฟกลางวัน-กลางคืน
                             กลางวัน = ช่วงที่แผงผลิตไฟได้ ยิ่งใช้ตอนกลางวันมาก โซลาร์ยิ่งช่วยได้มาก -->
                        <template v-if="o.dayNight">
                          <p class="dd-title dd-gap font-thai">สัดส่วนการใช้ไฟกลางวันกับกลางคืน</p>
                          <p class="dd-sub font-thai">ตามพฤติกรรมส่วนใหญ่ของคุณ</p>

                          <div class="dn">
                            <span class="dn-ic dn-sun"><Ico name="sun" /></span>
                            <div class="dn-rail" :style="{ '--f': dnFraction }">
                              <span class="dn-num dn-num-day">{{ form.dayShare }} %</span>
                              <span class="dn-num dn-num-night">{{ 100 - form.dayShare }} %</span>
                              <input
                                v-model.number="form.dayShare"
                                type="range" :min="DN_MIN" :max="DN_MAX" step="5"
                                class="dn-input"
                                aria-label="สัดส่วนการใช้ไฟกลางวัน"
                              />
                            </div>
                            <span class="dn-ic dn-moon"><Ico name="moon" /></span>
                          </div>
                          <div class="dn-ends font-thai"><span>กลางวัน</span><span>กลางคืน</span></div>
                        </template>

                        <!-- สิ่งที่เปลี่ยนแปลงระหว่างวัน — บางหมวด (เช่นโซลาร์) ไม่ต้องถาม
                             ส่วนช่วงพีคด้านล่างยังถามทุกหมวด -->
                        <template v-if="o.dailyChanges !== false">
                        <p class="dd-title dd-gap">What usually changes<br />throughout the day?</p>
                        <p class="dd-sub font-thai">อะไรบ้างที่เปลี่ยนไปในแต่ละช่วงของวัน</p>

                        <div class="sig-grid">
                          <button
                            v-for="sg in SIGNALS"
                            :key="sg.id"
                            type="button"
                            class="sig"
                            :class="{ on: form.signals.includes(sg.id) }"
                            :style="{ '--sig': sg.color }"
                            @click="toggleSignal(sg.id)"
                          >
                            <span class="sig-mark">
                              <span v-if="form.signals.includes(sg.id)" class="sig-check"><Ico name="check" /></span>
                              <span v-else class="sig-ring" />
                            </span>
                            <span class="sig-ic"><Ico :name="sg.icon" /></span>
                            <span class="sig-en">{{ sg.en }}</span>
                            <span class="sig-th font-thai">{{ sg.th }}</span>
                          </button>
                        </div>
                        </template>

                        <!-- ช่วงเวลาหนาแน่น -->
                        <p class="dd-title dd-gap font-thai">ช่วงไหนของวันที่คนเยอะที่สุด?</p>
                        <div class="peak-row">
                          <button
                            v-for="pk in PEAKS"
                            :key="pk.id"
                            type="button"
                            class="peak font-thai"
                            :class="{ on: form.peak === pk.id }"
                            @click="form.peak = pk.id"
                          >{{ pk.th }}</button>
                        </div>

                        <!-- ปุ่มไปต่อท้ายดร๊อปดาวน์ กรอกเสร็จกดได้เลยไม่ต้องเลื่อนลงไปท้ายหน้า -->
                        <div class="dd-next">
                          <button
                            type="button"
                            class="btn-next font-thai"
                            :disabled="!canAdvance"
                            @click="next"
                          >ต่อไป <Ico name="arrow-right" /></button>
                        </div>
                      </div>
                    </div>
                  </Transition>
                </template>
              </div>
              <p class="quote-mini">
                <span class="qm">“</span>Small data.<br />Big possibilities.”
              </p>
            </div>
          </div>
        </section>

        <!-- ═════════ 02 · Awakening ═════════ -->
        <section v-else-if="step === 2" key="s2" class="screen">
          <!-- ครอบด้วยกล่องที่ไม่ถูกถอดออก เพื่อจองความสูงไว้ตอนสลับข้อความ
               ไม่งั้นช่วงที่โหนดเก่าออกแล้วโหนดใหม่ยังไม่เข้า หน้าจะหดแล้วเด้งกลับ -->
          <div class="stage-slot">
            <Transition name="stage" mode="out-in">
              <div :key="stage.en" class="stage-head">
                <h2 class="h-en center glow">{{ stage.en }}</h2>
                <p class="h-th center font-thai">{{ stage.th }}</p>
              </div>
            </Transition>
          </div>

          <div class="cols cols-awaken">
            <div class="ring-wrap awakening" :class="{ ready: awakenDone, launch: launching }">
              <div class="ring-bg photo-slot" />

              <!-- โดมโฮโลแกรมกลางวง + อนุภาคเรืองแสง -->
              <div class="holo-dome">
                <span class="dome-core" />
                <span class="dome-arc" />
                <span class="dome-arc a2" />
                <span
                  v-for="(pt, i) in HOLO_PARTICLES"
                  :key="'pt' + i"
                  class="particle"
                  :style="{
                    left: pt.x + '%', top: pt.y + '%',
                    width: pt.size + 'px', height: pt.size + 'px',
                    animationDelay: pt.delay + 's',
                  }"
                />
              </div>

              <!-- เมืองโฮโลแกรม -->
              <svg class="holo-city" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="holoBld" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#6fe6ff" stop-opacity="0.1" />
                    <stop offset="100%" stop-color="#2f9fd6" stop-opacity="0.01" />
                  </linearGradient>
                  <pattern id="holoWin" width="4" height="5.5" patternUnits="userSpaceOnUse">
                    <rect x="1" y="1.4" width="1.7" height="2.1" fill="#bff3ff" opacity="0.16" />
                  </pattern>
                  <!-- จางลงที่ขอบวง ให้เป็นฉากหลังไม่แย่งสายตา -->
                  <radialGradient id="holoFade" cx="0.5" cy="0.58" r="0.55">
                    <stop offset="0%" stop-color="#fff" stop-opacity="1" />
                    <stop offset="62%" stop-color="#fff" stop-opacity="0.7" />
                    <stop offset="100%" stop-color="#fff" stop-opacity="0" />
                  </radialGradient>
                  <mask id="holoMask">
                    <rect x="0" y="0" width="200" height="200" fill="url(#holoFade)" />
                  </mask>
                </defs>

                <g mask="url(#holoMask)">
                  <!-- พื้นกริดเปอร์สเปกทีฟ -->
                  <g class="holo-grid">
                    <line v-for="y in HOLO_GROUND" :key="'gy' + y" x1="0" :y1="y" x2="200" :y2="y" />
                    <line v-for="x in HOLO_RAYS" :key="'gx' + x" :x1="x" y1="200" x2="100" :y2="HOLO_GROUND_Y" />
                  </g>

                  <!-- ตึก -->
                  <g class="holo-bld">
                    <template v-for="b in HOLO_BUILDINGS" :key="'b' + b.x">
                      <line
                        v-if="b.mast"
                        :x1="b.x + b.w / 2" :y1="HOLO_GROUND_Y - b.h"
                        :x2="b.x + b.w / 2" :y2="HOLO_GROUND_Y - b.h - b.mast"
                      />
                      <rect :x="b.x" :y="HOLO_GROUND_Y - b.h" :width="b.w" :height="b.h" fill="url(#holoBld)" />
                      <rect :x="b.x" :y="HOLO_GROUND_Y - b.h" :width="b.w" :height="b.h" fill="url(#holoWin)" stroke="none" />
                    </template>
                  </g>

                  <!-- เงาสะท้อนใต้พื้น -->
                  <g class="holo-bld holo-reflect">
                    <rect
                      v-for="b in HOLO_BUILDINGS"
                      :key="'r' + b.x"
                      :x="b.x" :y="HOLO_GROUND_Y"
                      :width="b.w" :height="b.h * 0.4"
                      fill="url(#holoBld)"
                    />
                  </g>
                </g>

                <!-- ลำแสงสแกนกวาดขึ้นลง -->
                <rect class="holo-scan" x="0" y="0" width="200" height="12" mask="url(#holoMask)" />
              </svg>
              <span class="radar" style="animation-delay: 0s" />
              <span class="radar" style="animation-delay: 1.2s" />
              <span class="radar" style="animation-delay: 2.4s" />
              <!-- orbit เป็นกล่องสี่เหลี่ยมที่หมุน กรอบนอกของมันจะพองตอนหมุนถึง 45°
                   ถ้าปล่อยไว้จะไปดันความสูงเอกสาร ทำให้สกรอลล์บาร์เกิด-หายเป็นจังหวะจนหน้าเด้งเอง
                   จึงครอบด้วยกล่องตัดขอบ (วงกลมหมุนอยู่กับที่ ไม่มีอะไรถูกตัดให้เห็น) -->
              <span class="orbit-shell"><span class="orbit" /></span>

              <svg class="ring-lines" viewBox="0 0 100 100">
                <defs>
                  <!-- เส้นต่อเนื่อง ไล่จางจากศูนย์กลางไปเข้มที่โหนด -->
                  <linearGradient
                    v-for="(n, i) in awakenNodes"
                    :key="'g' + n.id"
                    :id="'mdAw' + i"
                    gradientUnits="userSpaceOnUse"
                    x1="50" y1="50" :x2="n.x" :y2="n.y"
                  >
                    <stop offset="0%" :stop-color="n.def.color" stop-opacity="0.06" />
                    <stop offset="55%" :stop-color="n.def.color" stop-opacity="0.32" />
                    <stop offset="100%" :stop-color="n.def.color" stop-opacity="0.8" />
                  </linearGradient>
                </defs>

                <line
                  v-for="(n, i) in awakenNodes"
                  :key="'l' + n.id"
                  class="ln"
                  x1="50" y1="50" :x2="n.x" :y2="n.y"
                  :stroke="`url(#mdAw${i})`"
                />

                <!-- จุดแสงวิ่งตามเส้นอย่างต่อเนื่อง -->
                <circle
                  v-for="(n, i) in awakenNodes"
                  :key="'s' + n.id"
                  class="spark"
                  r="1.15"
                  :fill="n.def.color"
                >
                  <animateMotion
                    :path="`M 50 50 L ${n.x} ${n.y}`"
                    dur="2.8s"
                    repeatCount="indefinite"
                    :begin="`${i * 0.34}s`"
                  />
                  <animate
                    attributeName="opacity"
                    dur="2.8s"
                    repeatCount="indefinite"
                    values="0;1;1;0"
                    keyTimes="0;0.14;0.82;1"
                    :begin="`${i * 0.34}s`"
                  />
                </circle>
              </svg>

              <div class="ring-core">
                <span class="core-halo" />
                <span class="core-en">{{ stage.core[0] }}</span>
                <span class="core-en">{{ stage.core[1] }}</span>
              </div>

              <div
                v-for="(n, i) in awakenNodes"
                :key="n.id"
                class="ring-node"
                :class="{ flip: n.x < 49.5 }"
                :style="{ left: n.x + '%', top: n.y + '%', '--sig': n.def.color, '--i': i }"
              >
                <span class="node-pill"><span class="node-label">{{ n.def.en }}</span></span>
                <span class="node-dot"><Ico :name="n.def.icon" /></span>
              </div>
            </div>

            <ul class="await-list">
              <li v-for="(t, i) in AWAKEN_STEPS" :key="t.en" :class="{ done: i < awakenAt, now: i === awakenAt }">
                <span class="await-mark">
                  <Ico v-if="i < awakenAt" name="check" />
                  <span v-else-if="i === awakenAt" class="spin" />
                  <span v-else class="hollow" />
                </span>
                <span class="await-text">
                  <span class="await-en">{{ t.en }}</span>
                  <span class="await-th font-thai">{{ t.th }}</span>
                </span>
              </li>
            </ul>
          </div>
        </section>

        <!-- ═════════ 03 · Result — รวม See / Understand / Simulate / Decide ไว้หน้าเดียว ═════════ -->
        <section v-else key="s3" class="screen screen-result">
          <div class="panels">
            <!-- ── แผง 01 · See ── -->
            <section class="panel panel-see">
              <!-- ภาพเมืองช่วงพีคเป็นพื้นหลังของแผงนี้ -->
              <div class="screen-photo photo-slot photo-05" />

              <!-- หัวข้อใช้ร่วมกันทุกหมวด เปลี่ยนเฉพาะเนื้อในของแผง -->
              <h2 class="h-en upper">What matters now?</h2>
              <p class="h-th font-thai">ตอนนี้มีอะไรที่ต้องรู้บ้าง</p>

              <template v-if="isSolar">
                <!-- ไล่ที่มาของตัวเลขให้เห็นทีละขั้น จากค่าไฟที่กรอกมา -->
                <div class="sol-chain">
                  <div class="sol-row">
                    <span class="sol-k font-thai">ค่าไฟ / เดือน</span>
                    <span class="sol-v"><NumTicker :value="form.energy" comma /> <i class="font-thai">บาท</i></span>
                  </div>
                  <div class="sol-row">
                    <span class="sol-k font-thai">คิดเป็นไฟที่ใช้ / เดือน</span>
                    <span class="sol-v"><NumTicker :value="Math.round(plan.kwhPerMonth)" comma /> <i>kWh</i></span>
                  </div>
                  <div class="sol-row sol-strong">
                    <span class="sol-k font-thai">เฉลี่ยต่อวัน</span>
                    <span class="sol-v"><NumTicker :value="Math.round(plan.kwhPerDay)" comma /> <i>kWh</i></span>
                  </div>
                  <div class="sol-row sol-day">
                    <span class="sol-k font-thai"><Ico name="sun" /> กลางวัน {{ form.dayShare }}%</span>
                    <span class="sol-v">{{ kw(plan.dayKwh) }} <i>kWh</i></span>
                  </div>
                  <div class="sol-row sol-night">
                    <span class="sol-k font-thai"><Ico name="moon" /> กลางคืน {{ 100 - form.dayShare }}%</span>
                    <span class="sol-v">{{ kw(plan.nightKwh) }} <i>kWh</i></span>
                  </div>
                </div>

                <div class="peak-badge">
                  <div>
                    <div class="peak-time">{{ plan.peakWindow }}</div>
                    <div class="peak-cap font-thai">
                      {{ plan.peakOnSun ? 'ช่วงคนเยอะอยู่ในเวลาแดด แผงจ่ายตรงได้' : 'ช่วงคนเยอะอยู่นอกเวลาแดด ต้องดึงจากแบต' }}
                    </div>
                  </div>
                  <span class="peak-chip"><Ico :name="plan.peakOnSun ? 'sun' : 'moon'" /></span>
                </div>

                <div class="tiles tiles-2">
                  <div class="tile" style="--sig: #fbbf24; --i: 0">
                    <div class="tile-head">
                      <span class="tile-chip"><Ico name="solar" /></span><span>Solar</span>
                    </div>
                    <div class="tile-val">{{ kw(plan.kwp) }}<span class="tile-u">kWp</span></div>
                    <div class="tile-cap font-thai">แผงที่ต้องติด จากแดด {{ SOLAR.sunHours }} ชม./วัน</div>
                  </div>
                  <div class="tile" style="--sig: #60a5fa; --i: 1">
                    <div class="tile-head">
                      <span class="tile-chip"><Ico name="battery" /></span><span>Battery</span>
                    </div>
                    <div class="tile-val">{{ kw(plan.batteryKwh) }}<span class="tile-u">kWh</span></div>
                    <div class="tile-cap font-thai">แบตสำหรับไฟกลางคืน</div>
                  </div>
                </div>

                <p class="quote-mini font-thai">
                  <span class="qm">“</span>คิดที่ {{ SOLAR.tariff }} บาท/หน่วย<br />และแดดเต็มที่ {{ SOLAR.sunHours }} ชม./วัน”
                </p>
              </template>

              <template v-else>
              <div v-if="alert" class="flag">
                <span class="flag-ic"><Ico name="alert" /></span>
                <div>
                  <p class="flag-en">{{ alert.en }}</p>
                  <p class="flag-th font-thai">{{ alert.th }}</p>
                </div>
              </div>

              <div class="peak-badge">
                <div>
                  <div class="peak-time">{{ base.peakWindow }}</div>
                  <div class="peak-cap font-thai">ช่วงที่คนเยอะที่สุดของวัน</div>
                </div>
                <span class="peak-chip"><Ico name="clock" /></span>
              </div>

              <div class="tiles">
                <div class="tile" style="--sig: #34d399; --i: 0">
                  <div class="tile-head">
                    <span class="tile-chip"><Ico name="user" /></span><span>People</span>
                  </div>
                  <div class="tile-val"><NumTicker :value="form.people" comma /></div>
                  <div class="tile-cap font-thai">คน / วัน</div>
                </div>
                <div
                  v-for="(r, i) in topRanked"
                  :key="r.id"
                  class="tile"
                  :style="{ '--sig': r.def.color, '--i': i + 1 }"
                >
                  <div class="tile-head">
                    <span class="tile-chip"><Ico :name="r.def.icon" /></span><span>{{ r.def.en }}</span>
                  </div>
                  <div class="tile-val"><NumTicker :value="r.value" suffix="%" /></div>
                  <div class="tile-cap font-thai">{{ r.def.metricTh }}</div>
                </div>
              </div>

              <p class="quote-mini">
                <span class="qm">“</span>When more people come,<br />things are connected.”
              </p>
              </template>
            </section>

            <!-- ── แผง 02 · Understand ── -->
            <section class="panel panel-relate">
              <h2 class="h-en upper">Why does it matter?</h2>
              <p class="h-th font-thai">ทำไมเรื่องนี้ถึงสำคัญ</p>

              <!-- หมวดโซลาร์: วงเดียวกัน แต่โหนดเป็นเส้นทางพลังงาน ลูกศรไหลทางเดียว -->
              <div v-if="isSolar" class="cols cols-relate">
                <div class="ring-wrap relations sol-ring">
                  <svg class="ring-lines web" viewBox="0 0 100 100">
                    <defs>
                      <marker
                        id="mdSol" viewBox="0 0 10 10" refX="10" refY="5"
                        markerUnits="userSpaceOnUse" markerWidth="4.4" markerHeight="4.4" orient="auto"
                      >
                        <path d="M0 1.4 L10 5 L0 8.6 Z" fill="#6fe0ff" />
                      </marker>
                      <marker
                        id="mdSolWarm" viewBox="0 0 10 10" refX="10" refY="5"
                        markerUnits="userSpaceOnUse" markerWidth="4.4" markerHeight="4.4" orient="auto"
                      >
                        <path d="M0 1.4 L10 5 L0 8.6 Z" fill="#41e0a3" />
                      </marker>
                    </defs>

                    <!-- เส้นจางด้านหลังก่อน แล้วค่อยวาดเส้นทางเดินพลังงานทับ -->
                    <line
                      v-for="(l, i) in solarWeb"
                      :key="'sw' + i"
                      class="rel-arrow web"
                      :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2"
                    />

                    <line
                      v-for="(l, i) in solarArrows"
                      :key="'sa' + i"
                      class="rel-arrow"
                      :class="l.tone"
                      :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2"
                      :marker-end="`url(#${l.tone === 'near' ? 'mdSolWarm' : 'mdSol'})`"
                    />
                    <line
                      v-for="(l, i) in solarArrows"
                      :key="'sf' + i"
                      class="rel-flow"
                      :class="l.tone"
                      :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2"
                      path-length="100"
                      :style="{ animationDelay: (i * 0.34).toFixed(2) + 's' }"
                    />
                  </svg>

                  <div
                    v-for="(n, i) in solarNodes"
                    :key="n.id"
                    class="rel-node"
                    :style="{ left: n.x + '%', top: n.y + '%', '--sig': n.color, '--i': i }"
                  >
                    <Ico :name="n.icon" />
                    <span class="rel-label font-thai">{{ n.th }}</span>
                    <span class="rel-val">{{ n.val }}</span>
                  </div>
                </div>

                <div>
                  <h3 class="list-title">Key Understandings</h3>
                  <ol class="insight-list">
                    <li v-for="(k, i) in solarInsights" :key="k.en">
                      <span class="num">{{ i + 1 }}</span>
                      <span>
                        <span class="ins-en">{{ k.en }}</span>
                        <span class="ins-th font-thai">{{ k.th }}</span>
                      </span>
                    </li>
                  </ol>
                </div>
              </div>

              <div v-else class="cols cols-relate">
                <div class="ring-wrap relations">
                  <svg class="ring-lines web" viewBox="0 0 100 100">
                    <defs>
                      <!-- หัวลูกศรสองทาง: เขียวสำหรับเส้นที่ออกจาก People ที่เหลือฟ้า -->
                      <marker
                        id="mdArrow" viewBox="0 0 10 10" refX="10" refY="5"
                        markerUnits="userSpaceOnUse"
                        markerWidth="4.4" markerHeight="4.4" orient="auto-start-reverse"
                      >
                        <path d="M0 1.4 L10 5 L0 8.6 Z" fill="#6fe0ff" />
                      </marker>
                      <marker
                        id="mdArrowLead" viewBox="0 0 10 10" refX="10" refY="5"
                        markerUnits="userSpaceOnUse"
                        markerWidth="4.8" markerHeight="4.8" orient="auto-start-reverse"
                      >
                        <path d="M0 1.4 L10 5 L0 8.6 Z" fill="#41e0a3" />
                      </marker>
                      <marker
                        id="mdArrowWeb" viewBox="0 0 10 10" refX="10" refY="5"
                        markerUnits="userSpaceOnUse"
                        markerWidth="3.4" markerHeight="3.4" orient="auto-start-reverse"
                      >
                        <path d="M0 1.4 L10 5 L0 8.6 Z" fill="#5f89ab" />
                      </marker>
                    </defs>

                    <!-- ลูกศรตรงสองหัว วางอยู่ในช่องว่างระหว่างวง -->
                    <line
                      v-for="(l, i) in arrowLines"
                      :key="'w' + i"
                      class="rel-arrow"
                      :class="l.tone"
                      :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2"
                      :marker-start="`url(#${l.tone === 'near' ? 'mdArrowLead' : l.tone === 'web' ? 'mdArrowWeb' : 'mdArrow'})`"
                      :marker-end="`url(#${l.tone === 'near' ? 'mdArrowLead' : l.tone === 'web' ? 'mdArrowWeb' : 'mdArrow'})`"
                    />

                    <!-- ข้อมูลวิ่งไปตามเส้น -->
                    <line
                      v-for="(l, i) in flowLines"
                      :key="'fl' + i"
                      class="rel-flow"
                      :class="l.tone"
                      :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2"
                      path-length="100"
                      :style="{ animationDelay: (i * 0.28).toFixed(2) + 's' }"
                    />
                  </svg>
                  <div
                    v-for="(n, i) in relationNodes"
                    :key="n.id"
                    class="rel-node"
                    :class="{ lead: n.id === 'people' }"
                    :style="{ left: n.x + '%', top: n.y + '%', '--sig': n.def.color, '--i': i }"
                  >
                    <Ico :name="n.def.icon" />
                    <span class="rel-label">{{ n.def.en }}</span>
                    <span class="rel-val" :style="{ color: valueTone[n.id] }">↑ <NumTicker :value="n.value" suffix="%" /></span>
                  </div>
                </div>

                <div>
                  <h3 class="list-title">Key Understandings</h3>
                  <ol class="insight-list">
                    <li v-for="(k, i) in insights" :key="k.en">
                      <span class="num">{{ i + 1 }}</span>
                      <span>
                        <span class="ins-en">{{ k.en }}</span>
                        <span class="ins-th font-thai">{{ k.th }}</span>
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            <!-- ── แผง 03 · Anticipate & Simulate ── -->
            <section class="panel panel-sim">
              <!-- หัวข้อใช้ร่วมกันทุกหมวด เปลี่ยนเฉพาะเนื้อในของแผง -->
              <h2 class="h-en upper">What happens next?</h2>
              <p class="h-th font-thai">ถ้าคนใช้พื้นที่มากขึ้น จะเป็นอย่างไร</p>

              <template v-if="isSolar">
                <div class="slider-box">
                  <div class="slider-head font-thai">
                    <span>เลื่อนเพื่อเพิ่ม-ลดค่าไฟ</span>
                    <span class="slider-bubble">{{ signed(form.delta) }}%</span>
                  </div>
                  <div class="slider-rail" :style="{ '--p': sliderPct + '%' }">
                    <input v-model.number="form.delta" type="range" min="-20" max="40" step="5" class="slider" />
                  </div>
                  <div class="slider-ends"><span>-20%</span><span>+40%</span></div>
                </div>

                <div class="table-wrap">
                  <table class="sim-table">
                    <thead>
                      <tr>
                        <th class="font-thai">Metric</th>
                        <th>Current</th>
                        <th>{{ signed(form.delta) }}% Scenario</th>
                        <th>Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><span class="cell-ic" style="--sig: #fbbf24"><Ico name="bolt" /></span><span class="font-thai">ค่าไฟ/เดือน</span></td>
                        <td>{{ nf(form.energy) }}</td>
                        <td>{{ nf(Math.round(form.energy * (1 + form.delta / 100))) }}</td>
                        <td :class="deltaTone(form.delta)">{{ signed(form.delta) }}% {{ arrow(form.delta) }}</td>
                      </tr>
                      <tr>
                        <td><span class="cell-ic" style="--sig: #38bdf8"><Ico name="clock" /></span><span class="font-thai">ไฟ/วัน</span></td>
                        <td>{{ nf(Math.round(plan.kwhPerDay)) }}</td>
                        <td>{{ nf(Math.round(planNext.kwhPerDay)) }}</td>
                        <td :class="deltaTone(form.delta)">{{ signed(form.delta) }}% {{ arrow(form.delta) }}</td>
                      </tr>
                      <tr>
                        <td><span class="cell-ic" style="--sig: #fbbf24"><Ico name="solar" /></span>Solar</td>
                        <td>{{ kw(plan.kwp) }}</td>
                        <td>{{ kw(planNext.kwp) }}</td>
                        <td :class="deltaTone(form.delta)">{{ signed(form.delta) }}% {{ arrow(form.delta) }}</td>
                      </tr>
                      <tr>
                        <td><span class="cell-ic" style="--sig: #60a5fa"><Ico name="battery" /></span>Battery</td>
                        <td>{{ kw(plan.batteryKwh) }}</td>
                        <td>{{ kw(planNext.batteryKwh) }}</td>
                        <td :class="deltaTone(form.delta)">{{ signed(form.delta) }}% {{ arrow(form.delta) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="flag">
                  <span class="flag-ic"><Ico name="alert" /></span>
                  <div>
                    <p class="flag-en">Every baht on the bill scales the whole system.</p>
                    <p class="flag-th font-thai">
                      ค่าไฟ {{ signed(form.delta) }}% → แผงเป็น {{ kw(planNext.kwp) }} kWp
                      และแบตเป็น {{ kw(planNext.batteryKwh) }} kWh
                    </p>
                  </div>
                </div>
              </template>

              <template v-else>
              <div class="scn-tabs">
                <button
                  v-for="sc in SCENARIOS"
                  :key="sc.id"
                  type="button"
                  class="scn-tab"
                  :class="{ on: form.scenario === sc.id }"
                  @click="form.scenario = sc.id"
                >{{ sc.en }}</button>
              </div>

              <div class="slider-box">
                <div class="slider-head font-thai">
                  <span>เลื่อนเพื่อเพิ่ม-ลดจำนวนคน</span>
                  <span class="slider-bubble">{{ signed(form.delta) }}%</span>
                </div>
                <div class="slider-rail" :style="{ '--p': sliderPct + '%' }">
                  <input
                    v-model.number="form.delta"
                    type="range"
                    min="-20"
                    max="40"
                    step="5"
                    class="slider"
                  />
                </div>
                <div class="slider-ends"><span>-20%</span><span>+40%</span></div>
              </div>

              <div class="table-wrap">
                <table class="sim-table">
                  <thead>
                    <tr>
                      <th class="font-thai">Metric</th>
                      <th>Current</th>
                      <th>{{ signed(form.delta) }}% Scenario</th>
                      <th>Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span class="cell-ic" style="--sig: #34d399"><Ico name="user" /></span>People</td>
                      <td>{{ nf(form.people) }}</td>
                      <td>{{ nf(sim.peopleCount) }}</td>
                      <td :class="deltaTone(peopleChange)">{{ signed(peopleChange) }}% {{ arrow(peopleChange) }}</td>
                    </tr>
                    <tr v-for="r in simRows" :key="r.id">
                      <td>
                        <span class="cell-ic" :style="{ '--sig': r.def.color }"><Ico :name="r.def.icon" /></span>{{ r.def.en }}
                      </td>
                      <td>{{ pct(r.current) }}</td>
                      <td :class="{ over: r.next >= 100 }">{{ pct(r.next) }}</td>
                      <td :class="deltaTone(r.change)">{{ signed(r.change) }}% {{ arrow(r.change) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div v-if="warning" class="flag">
                <span class="flag-ic"><Ico name="alert" /></span>
                <div>
                  <p class="flag-en">{{ warning.en }}</p>
                  <p class="flag-th font-thai">{{ warning.th }}</p>
                </div>
              </div>
              </template>
            </section>

            <!-- ── แผง 04 · Decide ── -->
            <section class="panel panel-decide">
              <h2 class="h-en upper">Momay recommends</h2>
              <p class="h-th font-thai">ข้อเสนอแนะจาก MOMAY</p>

              <!-- หมวดโซลาร์แนะนำจากสัดส่วนกลางวัน-กลางคืน และช่วงพีคที่เลือกไว้ -->
              <div v-if="isSolar" class="cols">
                <div>
                  <div class="reco">
                    <span class="pill" :class="solarRec.badge.toLowerCase()">{{ solarRec.badge }}</span>
                    <div>
                      <p class="reco-en">{{ solarRec.titleEn }}</p>
                      <p class="reco-th font-thai">{{ solarRec.titleTh }}</p>
                    </div>
                  </div>

                  <div class="why">
                    <span class="why-k">Why?</span>
                    <div>
                      <p class="why-en">{{ solarRec.whyEn }}</p>
                      <p class="why-th font-thai">{{ solarRec.whyTh }}</p>
                    </div>
                  </div>

                  <div class="more-recs">
                    <h3 class="list-title font-thai">ค่าไฟที่ประหยัดได้</h3>
                    <div class="sol-chain">
                      <div class="sol-row sol-day">
                        <span class="sol-k font-thai"><Ico name="sun" /> กลางวัน แผงจ่ายตรง</span>
                        <span class="sol-v">{{ nf(Math.round(plan.daySaving)) }} <i class="font-thai">บาท/เดือน</i></span>
                      </div>
                      <div class="sol-row sol-night">
                        <span class="sol-k font-thai"><Ico name="moon" /> กลางคืน ผ่านแบต</span>
                        <span class="sol-v">{{ nf(Math.round(plan.nightSaving)) }} <i class="font-thai">บาท/เดือน</i></span>
                      </div>
                      <div class="sol-row sol-strong">
                        <span class="sol-k font-thai">รวมต่อเดือน</span>
                        <span class="sol-v">{{ nf(Math.round(plan.daySaving + plan.nightSaving)) }} <i class="font-thai">บาท</i></span>
                      </div>
                      <div class="sol-row sol-strong">
                        <span class="sol-k font-thai">รวมต่อปี</span>
                        <span class="sol-v">{{ nf(Math.round((plan.daySaving + plan.nightSaving) * 12)) }} <i class="font-thai">บาท</i></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="list-title">Expected Impact</h3>
                  <div class="impacts">
                    <div v-for="im in solarRec.impacts" :key="im.th" class="impact" :class="im.tone">
                      <Ico :name="im.dir === 'up' ? 'arrow-up' : 'arrow-down'" />
                      <span class="font-thai">{{ im.th }}</span>
                    </div>
                  </div>

                  <div class="closing">
                    <span class="closing-ic"><Ico name="leaf" /></span>
                    <p>“Small changes today<br />create a better tomorrow.”</p>
                  </div>
                </div>
              </div>

              <div v-else class="cols">
                <div>
                  <div class="reco">
                    <span class="pill" :class="rec.badge.toLowerCase()">{{ rec.badge }}</span>
                    <div>
                      <p class="reco-en">{{ rec.titleEn }}</p>
                      <p class="reco-th font-thai">{{ rec.titleTh }}</p>
                    </div>
                  </div>

                  <div class="why">
                    <span class="why-k">Why?</span>
                    <div>
                      <p class="why-en">{{ rec.whyEn }}</p>
                      <p class="why-th font-thai">{{ rec.whyTh }}</p>
                    </div>
                  </div>

                  <!-- ปัจจัยอื่นที่ล้นขีดความสามารถพร้อมกัน (ไม่ได้มีแค่ตัวที่หนักที่สุด) -->
                  <div v-if="moreRecs.length" class="more-recs">
                    <h3 class="list-title font-thai">เรื่องอื่นที่ต้องจัดการพร้อมกัน</h3>
                    <div v-for="m in moreRecs" :key="m.key" class="more-rec">
                      <span class="pill" :class="m.badge.toLowerCase()">{{ m.badge }}</span>
                      <div>
                        <p class="more-en">{{ m.titleEn }}</p>
                        <p class="more-th font-thai">{{ m.titleTh }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="list-title">Expected Impact</h3>
                  <div class="impacts">
                    <div v-for="im in rec.impacts" :key="im.th" class="impact" :class="im.tone">
                      <Ico :name="im.dir === 'up' ? 'arrow-up' : 'arrow-down'" />
                      <span class="font-thai">{{ im.th }}</span>
                    </div>
                  </div>

                  <div class="closing">
                    <span class="closing-ic"><Ico name="leaf" /></span>
                    <p>“Small changes today<br />create a better tomorrow.”</p>
                  </div>
                </div>
              </div>

            </section>
          </div>
        </section>
        </Transition>
      </main>

      <!-- ประกายพุ่งออกจากกลางวงตอนส่งต่อไปหน้าผลลัพธ์ -->
      <div
        v-if="launching"
        class="warp-fx"
        :style="{ '--wx': warpAt.x + 'px', '--wy': warpAt.y + 'px' }"
        aria-hidden="true"
      >
        <span class="warp-sheet" />
        <span class="warp-origin">
          <span class="warp-burst" />
          <span class="warp-ring" />
          <span class="warp-ring r2" />
          <span class="warp-ring r3" />
        </span>
      </div>

      <!-- ── แถบปุ่มล่าง — มีเฉพาะหน้าผลลัพธ์
           หน้า 01 ใช้ปุ่มในดร๊อปดาวน์ · หน้า 02 ไม่มีปุ่ม เพราะเด้งเองเมื่อวิเคราะห์ครบเวลา ── -->
      <nav v-if="step === TOTAL" class="nav">
        <!-- ทางไปเดโมตัวอื่น — ปุ่มกลางเด่นกว่าอีกสองปุ่ม -->
        <div class="demo-row">
          <!-- ปุ่มกลางพาไปดูเดโมจริง สองปุ่มข้างเปิดฟอร์มขอให้ติดต่อกลับแทน -->
          <component
            :is="d.contact ? 'button' : 'a'"
            v-for="(d, i) in DEMO_LINKS"
            :key="d.key"
            class="demolink"
            :class="{ 'demolink--lead': d.lead }"
            :style="{ '--accent': d.color, '--sweep-delay': `${i * -1.7}s` }"
            :href="d.contact ? undefined : d.link"
            :type="d.contact ? 'button' : undefined"
            @click="d.contact && openContact(d)"
          >
            <span class="demolink__icon" v-html="d.icon" />
            <span class="demolink__label">
              <b>{{ d.label }}</b>
              <small class="font-thai">{{ d.cta }}</small>
            </span>
          </component>
        </div>

        <div class="nav-inner">
          <button type="button" class="btn-back font-thai" @click="restart">
            <Ico name="arrow-left" /> เริ่มใหม่
          </button>

          <div class="nav-actions">
            <button type="button" class="share-link font-thai" @click="shareResult">
              {{ shareLabel }}
            </button>
            <button type="button" class="btn-next font-thai" @click="saveReport">
              บันทึกรายงานนี้ <Ico name="arrow-right" />
            </button>
          </div>
        </div>
      </nav>
    </div>

    <!-- ══════════════════ ฟอร์มขอให้ติดต่อกลับ ══════════════════ -->
    <Transition name="ct">
      <div v-if="contactOpen" class="ct-mask" @click.self="closeContact">
        <div class="ct-card" role="dialog" aria-modal="true" aria-labelledby="ct-title">
          <button type="button" class="ct-x" aria-label="ปิด" @click="closeContact">
            <Ico name="close" />
          </button>

          <template v-if="contactState === 'done'">
            <p class="ct-done-ic"><Ico name="check" /></p>
            <h3 id="ct-title" class="ct-title font-thai">ได้รับข้อมูลแล้ว</h3>
            <p class="ct-sub font-thai">ทีมงานจะติดต่อกลับโดยเร็วที่สุด ขอบคุณครับ</p>
            <button type="button" class="ct-submit font-thai" @click="closeContact">ปิด</button>
          </template>

          <template v-else>
            <h3 id="ct-title" class="ct-title font-thai">ให้เราติดต่อกลับ</h3>
            <p class="ct-sub font-thai">
              สนใจ <b>{{ contactFor?.label }}</b> — ฝากข้อมูลไว้ แล้วเราจะติดต่อกลับไป
            </p>

            <form class="ct-form" @submit.prevent="submitContact">
              <label class="ct-field">
                <span class="ct-label font-thai">ชื่อ</span>
                <input v-model="contactForm.name" class="font-thai" type="text" autocomplete="name" placeholder="ชื่อ - นามสกุล" />
              </label>

              <label class="ct-field">
                <span class="ct-label font-thai">หน่วยงาน</span>
                <input v-model="contactForm.org" class="font-thai" type="text" autocomplete="organization" placeholder="ชื่อหน่วยงาน / บริษัท" />
              </label>

              <label class="ct-field">
                <span class="ct-label font-thai">เบอร์โทร</span>
                <input v-model="contactForm.phone" class="font-thai" type="tel" inputmode="tel" autocomplete="tel" placeholder="08X-XXX-XXXX" />
              </label>

              <p v-if="contactError" class="ct-err font-thai">{{ contactError }}</p>

              <button
                type="submit"
                class="ct-submit font-thai"
                :disabled="!contactValid || contactState === 'sending'"
              >
                {{ contactState === 'sending' ? 'กำลังส่ง...' : 'ส่งข้อมูล' }}
              </button>
            </form>
          </template>
        </div>
      </div>
    </Transition>

    <!-- ══════════════════ รายงานสำหรับบันทึกเป็น PDF ══════════════════ -->
    <div class="report">
      <h1 class="rp-title">MOMAY Surprise — รายงานผลวิเคราะห์</h1>
      <p class="rp-sub">{{ org.en }} · {{ org.th }} — สร้างเมื่อ {{ reportDate }}</p>

      <h2>ข้อมูลที่ใช้</h2>
      <table class="rp-table">
        <tbody>
          <tr v-for="f in fieldList" :key="f.key">
            <th>{{ f.label }} {{ f.note }}</th>
            <td>{{ nf(form[f.key]) }} {{ f.unit }}</td>
          </tr>
          <tr><th>สิ่งที่เปลี่ยนไปในแต่ละช่วงของวัน</th><td>{{ signalNames }}</td></tr>
          <tr><th>ช่วงที่คนเยอะที่สุด</th><td>{{ PEAK_MAP[peakId].th }} ({{ base.peakWindow }})</td></tr>
        </tbody>
      </table>

      <h2>สถานะปัจจุบัน</h2>
      <table class="rp-table">
        <thead><tr><th>ปัจจัย</th><th>ปัจจุบัน</th><th>{{ scenarioLabel }} {{ signed(form.delta) }}%</th><th>เปลี่ยนแปลง</th></tr></thead>
        <tbody>
          <tr>
            <th>ผู้ใช้พื้นที่ (คน/วัน)</th>
            <td>{{ nf(form.people) }}</td>
            <td>{{ nf(sim.peopleCount) }}</td>
            <td>{{ signed(peopleChange) }}%</td>
          </tr>
          <tr v-for="r in simRows" :key="r.id">
            <th>{{ r.def.en }} — {{ r.def.metricTh }}</th>
            <td>{{ pct(r.current) }}</td>
            <td>{{ pct(r.next) }}</td>
            <td>{{ signed(r.change) }}%</td>
          </tr>
        </tbody>
      </table>

      <h2>สิ่งที่ควรรู้</h2>
      <ol class="rp-list">
        <li v-for="k in insights" :key="k.en">{{ k.th }} <em>({{ k.en }})</em></li>
      </ol>

      <h2>ข้อเสนอแนะ [{{ rec.badge }}]</h2>
      <p class="rp-reco">{{ rec.titleTh }}</p>
      <p class="rp-why"><strong>เหตุผล:</strong> {{ rec.whyTh }}</p>
      <p class="rp-impact"><strong>ผลที่คาดหวัง:</strong> {{ rec.impacts.map(i => i.th).join(' · ') }}</p>

      <template v-if="moreRecs.length">
        <h2>เรื่องอื่นที่ต้องจัดการพร้อมกัน</h2>
        <ol class="rp-list">
          <li v-for="m in moreRecs" :key="m.key">[{{ m.badge }}] {{ m.titleTh }} <em>({{ m.whyTh }})</em></li>
        </ol>
      </template>

      <p class="rp-foot">MOMAY Surprise · ตัวเลขทั้งหมดคำนวณจากข้อมูลที่กรอกไว้ ใช้เป็นแนวทางประกอบการตัดสินใจเบื้องต้น</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref, reactive, computed, watch, onMounted, onBeforeUnmount, defineComponent } from 'vue'
import {
  ORG_TYPES, ORG_MAP, SIGNALS, SIGNAL_MAP, PEAKS, PEAK_MAP, SCENARIOS,
  computeBaseline, simulate, rankMetrics, ringMetrics,
  SOLAR, solarPlan, solarAdvice,
  headlineAlert, keyUnderstandings, recommend, recommendAll, constraintWarning,
  type OrgId, type SignalId, type PeakId, type ScenarioId, type InputKey,
} from '~/utils/momaySurpriseOrganize/model'

definePageMeta({ name: 'momay-surprise-organize', layout: false })
useHead({
  title: 'MOMAY Surprise — Organize',
  // พื้นหลังเข้มถึงขอบจอ (เอาออกเองเมื่อออกจากหน้านี้)
  style: [{ children: 'html,body{background:#030b18 !important;}' }],
})

const TOTAL = 3

/* ─────────── icons ─────────── */

const ICONS: Record<string, string[]> = {
  landmark: ['M3 22h18', 'M6 18v-7M10 18v-7M14 18v-7M18 18v-7', 'M2.5 9 12 3.2 21.5 9H2.5Z'],
  cap: ['M22 9.5 12 4.5 2 9.5l10 5 10-5Z', 'M6 11.8V16c3.2 2.6 8.8 2.6 12 0v-4.2'],
  bed: ['M3 18v-6.5A1.5 1.5 0 0 1 4.5 10H19a2 2 0 0 1 2 2v6', 'M3 18h18', 'M3 14.5h18', 'M7.5 10V7.5A1.5 1.5 0 0 1 9 6h2.5V10'],
  building: ['M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16', 'M3 21h18', 'M15 21V10h3a2 2 0 0 1 2 2v9', 'M8 7.5h3M8 11.5h3M8 15.5h3'],
  book: ['M4 19.5A2.5 2.5 0 0 1 6.5 17H20', 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z'],
  hexagon: ['M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z'],
  hospital: ['M4.5 21V6.2A2 2 0 0 1 6.5 4.2h11a2 2 0 0 1 2 2V21', 'M2.5 21h19', 'M12 8.4v6.4M8.8 11.6h6.4'],
  sun: ['M12 7.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Z', 'M12 2.2v2.2M12 19.6v2.2M2.2 12h2.2M19.6 12h2.2', 'M5.2 5.2 6.8 6.8M17.2 17.2l1.6 1.6M18.8 5.2 17.2 6.8M6.8 17.2 5.2 18.8'],
  battery: ['M3 8.6h13.5a1.6 1.6 0 0 1 1.6 1.6v3.6a1.6 1.6 0 0 1-1.6 1.6H3a1.6 1.6 0 0 1-1.6-1.6v-3.6A1.6 1.6 0 0 1 3 8.6Z', 'M20.4 10.8v2.4', 'M5 11v2M8.6 11v2M12.2 11v2'],
  moon: ['M20.6 14.4A8.7 8.7 0 0 1 9.6 3.4 8.7 8.7 0 1 0 20.6 14.4Z'],
  solar: ['M3.2 15.6 5.7 7.3A1.7 1.7 0 0 1 7.3 6.1h9.4a1.7 1.7 0 0 1 1.6 1.2l2.5 8.3H3.2Z', 'M4.7 11.5h14.6', 'M11.4 6.1v9.5M15 6.1l1.5 9.5M9 6.1 7.5 15.6', 'M12 18.2v2.4', 'M8.6 20.6h6.8'],
  user: ['M20 21v-1.8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4V21', 'M12 3.2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z'],
  car: ['M3 13.5 4.6 8.4A2 2 0 0 1 6.5 7h11a2 2 0 0 1 1.9 1.4L21 13.5V18H3v-4.5Z', 'M3 13.5h18', 'M6.5 18v1.5M17.5 18v1.5', 'M6.8 15.7h.01M17.2 15.7h.01'],
  parking: ['M5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13A2.5 2.5 0 0 1 5.5 3Z', 'M9.3 17.5v-11h3.6a3.2 3.2 0 0 1 0 6.4H9.3'],
  bolt: ['M13.5 2.5 4.5 14h6.2l-1.2 7.5L19.5 10h-6.2l.2-7.5Z'],
  trash: ['M3.5 6.5h17', 'M8.5 6.5V4.2h7v2.3', 'M6 6.5 7.1 20a1.5 1.5 0 0 0 1.5 1.4h6.8a1.5 1.5 0 0 0 1.5-1.4L18 6.5', 'M10.2 11v6M13.8 11v6'],
  calendar: ['M5 4.5h14A1.5 1.5 0 0 1 20.5 6v13A1.5 1.5 0 0 1 19 20.5H5A1.5 1.5 0 0 1 3.5 19V6A1.5 1.5 0 0 1 5 4.5Z', 'M3.5 9.5h17', 'M8 2.5v4M16 2.5v4'],
  check: ['M20 6.5 9.4 17.5 4 12.2'],
  alert: ['M12 21.5a9.5 9.5 0 1 1 0-19 9.5 9.5 0 0 1 0 19Z', 'M12 7.2v6', 'M12 16.6h.01'],
  clock: ['M12 21.5a9.5 9.5 0 1 1 0-19 9.5 9.5 0 0 1 0 19Z', 'M12 6.8V12l3.4 2'],
  leaf: ['M11 20.5A7.5 7.5 0 0 1 9.6 6C15.6 4.8 17.2 4.2 19.3 1.6c1 2.1 2.1 4.4 2.1 8.4 0 5.8-5 10.5-10.4 10.5Z', 'M2.5 21.5c0-3.2 1.9-5.7 5.3-6.4'],
  close: ['M6.5 6.5 17.5 17.5', 'M17.5 6.5 6.5 17.5'],
  'arrow-right': ['M4.5 12h14', 'M13 6.2 18.8 12 13 17.8'],
  'arrow-left': ['M19.5 12h-14', 'M11 6.2 5.2 12 11 17.8'],
  'arrow-up': ['M12 19.5v-14', 'M5.8 11.5 12 5.2l6.2 6.3'],
  'arrow-down': ['M12 4.5v14', 'M5.8 12.5 12 18.8l6.2-6.3'],
}

/** ตัวเลขวิ่งขึ้นเวลาค่าเปลี่ยน */
const NumTicker = defineComponent({
  props: {
    value: { type: Number, default: 0 },
    suffix: { type: String, default: '' },
    comma: { type: Boolean, default: false },
    dur: { type: Number, default: 750 },
  },
  setup(props) {
    const shown = ref(0)
    let raf = 0
    const run = (to: number) => {
      cancelAnimationFrame(raf)
      const from = shown.value
      const t0 = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / props.dur)
        shown.value = from + (to - from) * (1 - Math.pow(1 - p, 3))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    watch(() => props.value, run, { immediate: true })
    onBeforeUnmount(() => cancelAnimationFrame(raf))
    return () => {
      const n = Math.round(shown.value)
      return h('span', (props.comma ? n.toLocaleString('en-US') : String(n)) + props.suffix)
    }
  },
})

const Ico = (props: { name: string }) =>
  h(
    'svg',
    {
      class: 'ic',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': 1.7,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    (ICONS[props.name] ?? []).map(d => h('path', { d })),
  )
;(Ico as any).props = ['name']

/* ─────────── state ─────────── */

const step = ref(1)

const form = reactive({
  // เปิดหน้ามาต้องยังไม่มีอะไรถูกเลือกไว้ให้ ทั้งประเภทองค์กร สัญญาณ และช่วงพีค
  // ผู้ใช้เป็นคนเลือกเองทั้งหมด (ตัวเลขในช่องกรอกจะเติมให้ตอนเลือกหมวดแล้ว)
  org: null as OrgId | null,
  people: 2500,
  capacity: 180,
  energy: 120000,
  signals: [] as SignalId[],
  peak: null as PeakId | null,
  /** สัดส่วนการใช้ไฟตอนกลางวัน (%) — ใช้เฉพาะหมวดที่เปิด dayNight */
  dayShare: 60,
  scenario: 'normal' as ScenarioId,
  delta: 20,
})

/* เอนจินและช่องกรอกต้องมีหมวด/ช่วงพีคเสมอ ระหว่างที่ผู้ใช้ยังไม่ได้เลือกจึงใช้ค่า
   ตั้งต้นแทน — หน้าผลลัพธ์เข้าไม่ได้จนกว่าจะเลือกครบ (ดู canAdvance) ค่าสำรองนี้
   จึงไม่เคยถูกแสดงเป็นคำตอบของผู้ใช้ */
const orgId = computed<OrgId>(() => form.org ?? 'municipality')
const peakId = computed<PeakId>(() => form.peak ?? 'midday')

const org = computed(() => ORG_MAP[orgId.value] ?? ORG_MAP.municipality)

/* ก่อนผู้ใช้เลือกหมวด ภาพปกใช้ภาพเมืองกลาง ๆ จะได้ไม่สื่อว่าเลือกหมวดไหนไว้ให้แล้ว */
const coverPhoto = computed(() => (form.org ? org.value.photo : '/momay/org-other.webp'))
/** ช่วงของสไลเดอร์กลางวัน-กลางคืน */
const DN_MIN = 20
const DN_MAX = 80
/** ปุ่มของ input[type=range] วิ่งบนช่วง DN_MIN..DN_MAX ไม่ใช่ 0..100
    ถ้าเอาเปอร์เซ็นต์ดิบไปวาดแถบสี รอยต่อสีจะไม่ตรงกับปุ่ม (ที่ 60 เยื้องไป 23px)
    จึงส่งเป็นสัดส่วนการเดินทางของปุ่ม 0..1 แล้วให้ CSS คิดตำแหน่งจริงจากค่านี้ */
const dnFraction = computed(() => (form.dayShare - DN_MIN) / (DN_MAX - DN_MIN))

/** หมวดโซลาร์เล่าเรื่องคนละแบบกับหมวดอื่น แผงแรกของหน้าผลลัพธ์จึงใช้ชุดตัวเลขของตัวเอง */
const isSolar = computed(() => org.value.id === 'solar')
const plan = computed(() => solarPlan(form.energy, form.dayShare, peakId.value))
/** ระบบที่ต้องติด ถ้าค่าไฟขึ้น-ลงตามสไลเดอร์หน้า 03 */
const planNext = computed(() =>
  solarPlan(form.energy * (1 + form.delta / 100), form.dayShare, peakId.value),
)
const solarRec = computed(() => solarAdvice(plan.value, form.dayShare))

/* ── วงความสัมพันธ์ของหมวดโซลาร์ — เส้นทางพลังงานจากแดดไปถึงโหลด ──
   เรียงตามเข็มนาฬิกาจาก 12 นาฬิกา ลูกศรหัวเดียวเพราะพลังงานไหลทางเดียว */
const solarNodes = computed(() => {
  const p = plan.value
  // เล่าเป็นภาษาคนซื้อ — ตัดศัพท์เชิงหน่วยออก ใช้ % แทนหน่วยไฟที่ปลายทาง
  // ป้ายต้องสั้นพอจะอยู่ในวงกลมตอนแผงแคบ (จอ 1024 ป้ายยาวจะล้นออกนอกวง)
  const items = [
    { id: 'sun',   icon: 'sun',      th: 'แดด',           color: '#fbbf24', val: `${SOLAR.sunHours} ชม./วัน` },
    { id: 'panel', icon: 'solar',    th: 'แผงโซลาร์',     color: '#f59e0b', val: `${kw(p.kwp)} kWp` },
    { id: 'inv',   icon: 'bolt',     th: 'อินเวอร์เตอร์', color: '#38bdf8', val: `${kw(p.kwp)} kW` },
    { id: 'day',   icon: 'building', th: 'ใช้กลางวัน',    color: '#34d399', val: `${form.dayShare}%` },
    { id: 'night', icon: 'battery',  th: 'ใช้กลางคืน',    color: '#60a5fa', val: `${100 - form.dayShare}%` },
  ]
  const R = 33
  return items.map((it, i) => {
    const a = (-90 + (360 / items.length) * i) * (Math.PI / 180)
    return { ...it, x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) }
  })
})

/** โซ่การไหล: แดด→แผง→อินเวอร์เตอร์→โหลดกลางวัน และแยกไป แบต→โหลดกลางคืน */
const SOLAR_FLOW: [number, number, string][] = [
  [0, 1, 'link'],
  [1, 2, 'link'],
  [2, 3, 'near'],
  [2, 4, 'far'],
]
/** รัศมีโหนดของวงโซลาร์ — ต้องตรงกับความกว้าง % ของ .sol-ring .rel-node ใน CSS */
const SOL_R_NODE = 14.2

/** ตัดเส้นให้เริ่ม-จบที่ขอบวงกลมของโหนด ไม่ใช่จุดศูนย์กลาง */
function segment(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = b.x - a.x, dy = b.y - a.y
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len, uy = dy / len
  return {
    x1: a.x + ux * SOL_R_NODE, y1: a.y + uy * SOL_R_NODE,
    x2: b.x - ux * SOL_R_NODE, y2: b.y - uy * SOL_R_NODE,
  }
}

const solarArrows = computed(() =>
  SOLAR_FLOW.map(([ia, ib, tone]) => ({ ...segment(solarNodes.value[ia], solarNodes.value[ib]), tone })),
)

/** เส้นจางด้านหลัง — คู่ที่เหลือทั้งหมดที่ไม่ได้อยู่บนทางเดินพลังงาน
    ไม่ใส่หัวลูกศร เพราะไม่ใช่การไหลจริง มีไว้ให้วงดูเชื่อมกันทั้งวง */
const solarWeb = computed(() => {
  const ns = solarNodes.value
  const used = new Set(SOLAR_FLOW.map(([a, b]) => `${Math.min(a, b)}-${Math.max(a, b)}`))
  const out: { x1: number; y1: number; x2: number; y2: number }[] = []
  for (let i = 0; i < ns.length; i++) {
    for (let j = i + 1; j < ns.length; j++) {
      if (used.has(`${i}-${j}`)) continue
      out.push(segment(ns[i], ns[j]))
    }
  }
  return out
})

/** Key Understandings ของหมวดโซลาร์ */
const solarInsights = computed(() => {
  const p = plan.value
  return [
    {
      en: 'The sun only works a few hours a day.',
      th: `แดดแรงพอจะใช้งานได้จริงแค่ราว ${SOLAR.sunHours} ชั่วโมงต่อวัน แผงจึงต้องใหญ่พอจะเก็บไฟให้ทันในช่วงนั้น`,
    },
    {
      en: 'Power used during the day is the cheapest power.',
      th: `ไฟที่ใช้ตอนกลางวัน ${form.dayShare}% รับจากแผงได้ทันที ไม่ต้องเก็บ จึงถูกที่สุด`,
    },
    {
      en: 'Power used at night has to be stored first.',
      th: `ไฟที่ใช้ตอนกลางคืน ${100 - form.dayShare}% ต้องเก็บไว้ก่อน ยิ่งใช้กลางคืนมาก ยิ่งต้องลงทุนกับแบตมาก`,
    },
    {
      en: p.peakOnSun
        ? 'Your busiest hours fall while the sun is up.'
        : 'Your busiest hours fall after the sun goes down.',
      th: p.peakOnSun
        ? `ช่วงที่คนเยอะที่สุด ${p.peakWindow} ตรงกับเวลาที่แดดยังอยู่ แผงรับได้เอง`
        : `ช่วงที่คนเยอะที่สุด ${p.peakWindow} เลยเวลาแดดไปแล้ว ต้องใช้ไฟที่เก็บไว้`,
    },
  ]
})

/** ทศนิยมตามขนาดตัวเลข — เลขเล็กต้องเห็นทศนิยม เลขใหญ่ไม่ต้อง */
const kw = (v: number) => (v >= 100 ? Math.round(v).toLocaleString('en-US') : v.toFixed(1))

const ALL_INPUTS: InputKey[] = ['people', 'capacity', 'energy']
/** บางหมวดให้กรอกไม่ครบสามช่อง (เช่นโซลาร์กรอกแค่ค่าไฟ) */
const fieldList = computed(() =>
  (org.value.inputs ?? ALL_INPUTS).map(k => org.value.fields[k]),
)

/** หมวดที่กางดร๊อปดาวน์กรอกข้อมูลอยู่ — เริ่มต้นกางของหมวดที่เลือกไว้ให้เลย */
const openOrg = ref<OrgId | null>(form.org)

/** เปลี่ยนประเภทองค์กร → เติมค่าตั้งต้นชุดใหม่ (ถ้าผู้ใช้ยังไม่ได้แก้เอง)
    กดซ้ำที่หมวดเดิม = พับดร๊อปดาวน์เก็บ */
const touched = ref(false)
function pickOrg(id: OrgId) {
  if (form.org === id) {
    openOrg.value = openOrg.value === id ? null : id
    return
  }
  form.org = id
  openOrg.value = id
  if (!touched.value) {
    const f = ORG_MAP[id].fields
    form.people = f.people.default
    form.capacity = f.capacity.default
    form.energy = f.energy.default
  }
}

function toggleSignal(id: SignalId) {
  const i = form.signals.indexOf(id)
  if (i >= 0) form.signals.splice(i, 1)
  else form.signals.push(id)
}

/* ─────────── การกรอกตัวเลข ─────────── */

const nf = (n: number) => Math.round(n || 0).toLocaleString('en-US')
const pct = (n: number) => `${Math.round(n)}%`
const signed = (n: number) => `${n > 0 ? '+' : ''}${Math.round(n)}`
const arrow = (n: number) => (n > 0 ? '▲' : n < 0 ? '▼' : '')
const deltaTone = (n: number) => (n > 0 ? 'up' : n < 0 ? 'down' : '')

/** ระหว่างพิมพ์แสดงเลขดิบ (คอมมาไม่ดีดเคอร์เซอร์) พอออกจากช่องค่อยใส่คอมมา */
const focusedKey = ref<InputKey | null>(null)
const displayValue = (k: InputKey) => (focusedKey.value === k ? String(form[k]) : nf(form[k]))

function onNumInput(k: InputKey, e: Event) {
  const el = e.target as HTMLInputElement
  const digits = el.value.replace(/[^\d]/g, '')
  const n = Number(digits)
  touched.value = true
  form[k] = Number.isFinite(n) ? n : 0
  if (el.value !== digits) el.value = digits
}

/* ─────────── ผลคำนวณ ─────────── */

const inputs = computed(() => ({
  org: orgId.value,
  people: form.people,
  capacity: form.capacity,
  energy: form.energy,
  signals: form.signals,
  peak: peakId.value,
}))

const base = computed(() => computeBaseline(inputs.value))
const sim = computed(() => simulate(inputs.value, base.value, form.delta, form.scenario))

const loadSignals = computed(() => form.signals.filter(s => s !== 'people'))
const topRanked = computed(() => rankMetrics(base.value.metrics, loadSignals.value).slice(0, 2))
const alert = computed(() => headlineAlert(rankMetrics(base.value.metrics, loadSignals.value)))
const insights = computed(() => keyUnderstandings(form.signals))
const recs = computed(() => recommendAll(sim.value.metrics, loadSignals.value))
const rec = computed(() => recs.value[0])
/** ปัจจัยอื่นที่ล้นขีดความสามารถพร้อมกัน — แสดงต่อจากข้อเสนอแนะหลัก */
const moreRecs = computed(() => recs.value.slice(1))
const warning = computed(() => constraintWarning(sim.value.metrics, loadSignals.value))

const peopleChange = computed(() => (sim.value.growth - 1) * 100)

const simRows = computed(() =>
  ringMetrics(base.value.metrics, loadSignals.value).map(r => ({
    id: r.id,
    def: r.def,
    current: r.value,
    next: sim.value.metrics[r.id],
    change: sim.value.metrics[r.id] - r.value,
  })),
)

const scenarioLabel = computed(() => SCENARIOS.find(s => s.id === form.scenario)?.en ?? '')
const signalNames = computed(() => form.signals.map(s => SIGNAL_MAP[s].th).join(' · ') || '—')

/* ─────────── วงความสัมพันธ์ ─────────── */

interface Node { id: string; x: number; y: number; value: number; def: typeof SIGNALS[number] }

function placeOnRing(items: { id: SignalId; value: number }[], radius: number): Node[] {
  const n = items.length || 1
  return items.map((it, i) => {
    const a = (-90 + (360 / n) * i) * (Math.PI / 180)
    return {
      id: it.id,
      value: it.value,
      def: SIGNAL_MAP[it.id],
      x: 50 + radius * Math.cos(a),
      y: 50 + radius * Math.sin(a),
    }
  })
}

/* ─────────────────────────── เมืองโฮโลแกรม (SVG) ───────────────────────────
   วาดบนกริดสี่เหลี่ยมจัตุรัส 200×200 (พอดีวงกลม ไม่ถูกซูม)
   ระดับพื้น y = 132 · ตึกวาดขึ้นจากพื้น · เงาสะท้อนทิ้งลงใต้พื้น            */

const HOLO_GROUND_Y = 152

/** ตึกในเส้นขอบฟ้า: [x, กว้าง, สูง, มีเสาอากาศ] */
const HOLO_BUILDINGS: { x: number; w: number; h: number; mast?: number }[] = [
  { x: 0, w: 13, h: 16 },
  { x: 15, w: 9, h: 26 },
  { x: 26, w: 15, h: 13 },
  { x: 43, w: 11, h: 31, mast: 7 },
  { x: 56, w: 17, h: 20 },
  { x: 75, w: 10, h: 38, mast: 9 },
  { x: 87, w: 14, h: 23 },
  { x: 103, w: 12, h: 17 },
  { x: 117, w: 16, h: 29, mast: 6 },
  { x: 135, w: 9, h: 15 },
  { x: 146, w: 14, h: 26 },
  { x: 162, w: 11, h: 20 },
  { x: 175, w: 15, h: 14 },
  { x: 192, w: 8, h: 22 },
]

/** เส้นพื้นแนวนอน — ถี่ใกล้ขอบฟ้า ห่างเมื่อเข้าใกล้ผู้ชม */
const HOLO_GROUND = [1, 2, 3, 4, 5, 6].map(i => HOLO_GROUND_Y + i * i * 1.3)

/** เส้นพื้นแนวลึก พุ่งเข้าหาจุดรวมสายตากลางภาพ */
const HOLO_RAYS = Array.from({ length: 13 }, (_, i) => 100 + (i - 6) * 46)

/** ลำดับรอบวง: People บนสุด แล้วไล่ตามเข็มนาฬิกาตามแบบที่ออกแบบไว้ */
const RING_ORDER: SignalId[] = ['people', 'energy', 'waste', 'events', 'traffic', 'parking']
const ringRank = (id: SignalId) => {
  const i = RING_ORDER.indexOf(id)
  return i < 0 ? RING_ORDER.length : i
}

/** หน้า 02 — โชว์ทุก signal ที่ระบบเชื่อมโยงได้ */
/** หน้า 02 มี Events ด้วย ลำดับจึงต่างจากหน้า 04: Traffic อยู่บนซ้าย Parking อยู่ล่างซ้าย */
const AWAKEN_ORDER: SignalId[] = ['people', 'energy', 'waste', 'events', 'parking', 'traffic']
const awakenNodes = computed(() =>
  placeOnRing(AWAKEN_ORDER.map(id => ({ id, value: 0 })), 29),
)

/** จุดอนุภาคในโดมโฮโลแกรม — กระจายด้วยมุมทองให้ไม่จับกลุ่ม */
const HOLO_PARTICLES = Array.from({ length: 24 }, (_, i) => {
  const a = (i * 137.5 * Math.PI) / 180
  const r = 7 + (i % 8) * 2.6
  return {
    x: 50 + r * Math.cos(a),
    y: 50 + r * Math.sin(a) * 0.82,
    size: 2 + (i % 3),
    delay: ((i % 9) * 0.42).toFixed(2),
  }
})

/** หน้า 04 — People เป็นจุดนำที่ 12 นาฬิกา ตามด้วย signal ที่เลือก */
const relationNodes = computed(() => {
  const items: { id: SignalId; value: number }[] = [
    { id: 'people', value: base.value.metrics.people },
    ...ringMetrics(base.value.metrics, loadSignals.value)
      .map(r => ({ id: r.id, value: r.value }))
      .sort((a, b) => ringRank(a.id) - ringRank(b.id)),
  ]
  return placeOnRing(items, items.length <= 3 ? 31 : 34)
})

interface RelLine {
  x1: number; y1: number; x2: number; y2: number
  /** near = People↔เพื่อนบ้าน (เขียว) · far = People↔ตัวไกล (ฟ้าหนา)
      link = คู่ล่างสุด (ฟ้า) · web = เส้นทแยงด้านหลัง (จาง) */
  tone: 'near' | 'far' | 'link' | 'web'
}

/** รัศมีวงโหนดในหน่วย viewBox (%) — ใช้ตัดปลายเส้นให้หยุดที่ขอบวง หัวลูกศรจะได้ไม่ถูกบัง
    ต้องตรงกับความกว้าง % ของ .rel-node ใน CSS (26% / lead 29%) บวกระยะเผื่อหัวลูกศร */
const REL_R_LEAD = 14.2
const REL_R_NODE = 12.7

/**
 * เส้นเชื่อมตามแบบ
 *  · People ต่อกับทุกตัว — คู่ที่อยู่ติดกันเป็นเขียว คู่ที่อยู่ไกลเป็นฟ้าเส้นหนา
 *  · คู่ล่างสุดที่ติดกัน เป็นฟ้าเส้นปกติ
 *  · คู่ทแยงที่ไม่เกี่ยวกับ People เป็นเส้นจางบาง ไขว้กันอยู่ด้านหลัง
 */
const arrowLines = computed<RelLine[]>(() => {
  const ns = relationNodes.value
  const n = ns.length
  if (n < 2) return []

  const out: RelLine[] = []
  const link = (ia: number, ib: number, tone: RelLine['tone']) => {
    const a = ns[ia]
    const b = ns[ib]
    const dx = b.x - a.x
    const dy = b.y - a.y
    const len = Math.hypot(dx, dy) || 1
    const ux = dx / len
    const uy = dy / len
    const ra = ia === 0 ? REL_R_LEAD : REL_R_NODE
    const rb = ib === 0 ? REL_R_LEAD : REL_R_NODE
    out.push({
      x1: a.x + ux * ra, y1: a.y + uy * ra,
      x2: b.x - ux * rb, y2: b.y - uy * rb,
      tone,
    })
  }

  // เส้นจางด้านหลังก่อน แล้วค่อยวาดเส้นเด่นทับ
  for (let i = 1; i < n; i++) {
    for (let j = i + 2; j < n; j++) {
      if (i === 1 && j === n - 1) continue
      link(i, j, 'web')
    }
  }

  const mid = Math.floor(n / 2)
  if (mid >= 1 && mid + 1 <= n - 1) link(mid, mid + 1, 'link')

  for (let j = 1; j < n; j++) {
    link(0, j, j === 1 || j === n - 1 ? 'near' : 'far')
  }

  return out
})

/** ยิงจุดแสงบนเส้นที่ออกจาก People */
/** เส้นที่ให้ข้อมูลวิ่ง — เว้นเส้นทแยงจางด้านหลังไว้ให้เงียบ */
const flowLines = computed(() => arrowLines.value.filter(l => l.tone !== 'web'))

/** สีตัวเลข: ตัวที่ตึงตัวที่สุดเป็นแดง รองลงมาเป็นส้ม ที่เหลือเขียว (People เขียวเสมอ) */
const valueTone = computed<Record<string, string>>(() => {
  const tone: Record<string, string> = { people: '#34d399' }
  rankMetrics(base.value.metrics, loadSignals.value).forEach((r, i) => {
    tone[r.id] = i === 0 ? '#f05252' : i === 1 ? '#fbbf24' : '#34d399'
  })
  return tone
})

/* ─────────── หน้า 02: ลำดับการวิเคราะห์ ─────────── */

const AWAKEN_STEPS = [
  { en: 'Connecting your data ...', th: 'กำลังเชื่อมข้อมูลของคุณเข้าด้วยกัน' },
  { en: 'Finding relationships ...', th: 'ดูว่าเรื่องไหนเกี่ยวกับเรื่องไหน' },
  { en: 'Detecting patterns ...', th: 'มองหารูปแบบที่เกิดซ้ำ ๆ' },
  { en: 'Simulating possibilities ...', th: 'ลองจำลองสถานการณ์ที่อาจเกิดขึ้น' },
  { en: 'Your MOMAY is ready ...', th: 'MOMAY ของคุณพร้อมแล้ว' },
]

/** หัวเรื่อง + ข้อความกลางวง เปลี่ยนตามขั้นที่กำลังทำ และเปลี่ยนอีกครั้งเมื่อเสร็จ */
const AWAKEN_STAGES = [
  { en: 'Connecting your data...',      th: 'กำลังเชื่อมข้อมูลของคุณเข้าด้วยกัน',  core: ['READING', 'SIGNALS'] },
  { en: 'Finding relationships...',     th: 'กำลังดูว่าเรื่องไหนเกี่ยวกับเรื่องไหน',      core: ['FINDING', 'RELATIONSHIPS'] },
  { en: 'Detecting patterns...',        th: 'กำลังมองหารูปแบบที่เกิดซ้ำ ๆ',          core: ['DETECTING', 'PATTERNS'] },
  { en: 'Simulating possibilities...',  th: 'กำลังลองจำลองสถานการณ์',     core: ['SIMULATING', 'SCENARIOS'] },
  { en: 'Your MOMAY is ready.',         th: 'MOMAY ของคุณพร้อมแล้ว กำลังพาไปดูผลลัพธ์', core: ['MOMAY', 'READY'] },
]

/** เวลารวมของหน้าวิเคราะห์ 20 วินาที — หาร 5 ขั้นเท่า ๆ กัน */
const AWAKEN_TOTAL_MS = 20000

/** จังหวะส่งต่อไปหน้าผลลัพธ์ — โชว์ ready ค้างไว้ก่อน แล้วยิงแฟลชค่อยตัดหน้า */
const HOLD_READY_MS = 750
const WARP_MS = 620

const launching = ref(false)
/** ใจกลางวง ณ ตอนยิงแฟลช — ไม่ใช้กลางจอ เพราะวงอยู่คอลัมน์ซ้าย แฟลชจะไม่ตรงกับภาพ */
const warpAt = reactive({ x: 0, y: 0 })
let launchTimers: ReturnType<typeof setTimeout>[] = []

function stopLaunch() {
  launchTimers.forEach(clearTimeout)
  launchTimers = []
  launching.value = false
}

const awakenAt = ref(0)
const awakenDone = computed(() => awakenAt.value >= AWAKEN_STEPS.length)
const stage = computed(() => AWAKEN_STAGES[Math.min(awakenAt.value, AWAKEN_STAGES.length - 1)])
let awakenTimer: ReturnType<typeof setInterval> | null = null

function stopAwaken() {
  if (awakenTimer) clearInterval(awakenTimer)
  awakenTimer = null
}

/** ครบ 5 ขั้นแล้ว: ค้างให้เห็นวงสว่างเต็มดวงสักพัก → ยิงแฟลช → ตัดเข้าหน้าผลลัพธ์ */
function launchToResult() {
  stopLaunch()
  launchTimers.push(setTimeout(() => {
    const ring = document.querySelector('.ring-wrap.awakening')
    if (ring) {
      const r = ring.getBoundingClientRect()
      warpAt.x = r.left + r.width / 2
      warpAt.y = r.top + r.height / 2
    } else {
      warpAt.x = window.innerWidth / 2
      warpAt.y = window.innerHeight / 2
    }
    launching.value = true
    launchTimers.push(setTimeout(() => {
      if (step.value === 2) next()
      // ปล่อยให้แฟลชค้างคลุมรอยต่อไว้จนหน้าใหม่เข้าที่
      launchTimers.push(setTimeout(() => (launching.value = false), 260))
    }, WARP_MS))
  }, HOLD_READY_MS))
}

function startAwaken() {
  stopAwaken()
  awakenAt.value = 0
  awakenTimer = setInterval(() => {
    if (awakenAt.value >= AWAKEN_STEPS.length) {
      stopAwaken()
      return
    }
    awakenAt.value += 1
    // ครบทุกขั้น (= ครบ 20 วินาที) แล้วพาไปหน้าผลลัพธ์เอง ไม่ต้องกดต่อไป
    if (awakenAt.value >= AWAKEN_STEPS.length) {
      stopAwaken()
      launchToResult()
    }
  }, AWAKEN_TOTAL_MS / AWAKEN_STEPS.length)
}

watch(step, s => {
  if (s === 2) startAwaken()
  else { stopAwaken(); stopLaunch() }
})
onBeforeUnmount(() => { stopAwaken(); stopLaunch() })

/* ─────────── การเดินหน้า ─────────── */

const progressPct = computed(() => (step.value / TOTAL) * 100)
const sliderPct = computed(() => ((form.delta + 20) / 60) * 100)

const canAdvance = computed(() => {
  // หน้าแรกรวมทุกอย่างที่ต้องกรอกไว้ในดร๊อปดาวน์แล้ว จึงตรวจครบทั้งชุดที่นี่
  if (step.value === 1) {
    // ต้องเลือกหมวดองค์กรและช่วงพีคเองก่อน ไม่มีค่าไหนถูกติ๊กไว้ให้ตั้งแต่เปิดหน้า
    if (!form.org || !form.peak) return false
    const needSignals = org.value.dailyChanges !== false
    return fieldList.value.every(f => form[f.key] > 0) && (!needSignals || loadSignals.value.length > 0)
  }
  if (step.value === 2) return awakenAt.value >= AWAKEN_STEPS.length
  return true
})

/* ทางไปเดโมตัวอื่น — ลิงก์ชุดเดียวกับหน้าขาย
   ปุ่มกลาง (Citizen / Student) เป็นตัวเด่น อีกสองปุ่มเป็นช่องทางคุยรายละเอียด */
type DemoLink = {
  key: string
  label: string
  cta: string
  color: string
  icon: string
  /** ปุ่มที่พาไปหน้าอื่น */
  link?: string
  /** ปุ่มที่เปิดฟอร์มขอให้ติดต่อกลับแทนการลิงก์ */
  contact?: boolean
  /** ปุ่มเด่นกลางแถว */
  lead?: boolean
}

const DEMO_LINKS: DemoLink[] = [
  {
    key: 'enlightened',
    label: 'MOMAY ENLIGHTENED',
    cta: 'พูดคุยรายละเอียด',
    color: '#ECB731',
    // สองปุ่มข้างไม่พาไปไหน แต่เปิดฟอร์มขอข้อมูลติดต่อเพื่อให้ทีมติดต่อกลับ
    contact: true,
    icon: `<svg viewBox="0 0 24 24"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3.2"/></svg>`,
  },
  {
    key: 'citizen',
    label: 'MOMAY CITIZEN / STUDENT',
    cta: 'คลิ๊กเพื่อดู',
    color: '#4ADE80',
    // แดชบอร์ดประชาชน (React) ที่ build ไว้ใน public/momay-citizen
    link: '/momay-citizen/',
    lead: true,
    icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="7.6" r="3"/><path d="M5.5 19.5a6.5 6.5 0 0 1 13 0"/></svg>`,
  },
  {
    key: 'executive',
    label: 'MOMAY EXECUTIVE BRIEF',
    cta: 'พูดคุยรายละเอียด',
    color: '#ED1B2E',
    contact: true,
    icon: `<svg viewBox="0 0 24 24"><path d="M6 3.5h8L18.5 8v12.5h-12.5z"/><path d="M13.5 3.7V8.2H18"/><path d="M9 12.5h6M9 16h4"/></svg>`,
  },
]

/* ─────────── ฟอร์มขอให้ติดต่อกลับ ─────────── */

const contactOpen = ref(false)
const contactFor = ref<{ key: string; label: string } | null>(null)
const contactForm = reactive({ name: '', org: '', phone: '' })
const contactState = ref<'idle' | 'sending' | 'done'>('idle')
const contactError = ref('')

const contactValid = computed(() =>
  contactForm.name.trim() !== '' &&
  contactForm.org.trim() !== '' &&
  contactForm.phone.replace(/[\s-]/g, '').length >= 9,
)

function openContact(d: { key: string; label: string }) {
  contactFor.value = { key: d.key, label: d.label }
  contactState.value = 'idle'
  contactError.value = ''
  contactOpen.value = true
}

function closeContact() {
  contactOpen.value = false
}

async function submitContact() {
  if (!contactValid.value || contactState.value === 'sending') return
  contactState.value = 'sending'
  contactError.value = ''
  try {
    await $fetch('/api/momay-contact', {
      method: 'POST',
      body: {
        name: contactForm.name.trim(),
        org: contactForm.org.trim(),
        phone: contactForm.phone.trim(),
        source: contactFor.value?.key ?? '',
        sourceLabel: contactFor.value?.label ?? '',
        orgType: form.org ?? '',
      },
    })
    contactState.value = 'done'
    contactForm.name = ''
    contactForm.org = ''
    contactForm.phone = ''
  } catch (e: any) {
    contactState.value = 'idle'
    contactError.value = e?.data?.statusMessage || e?.statusMessage || 'ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่'
  }
}

const STEP_TAGS = [
  'Let your data<br>explain MOMAY.',
  'Turning your data<br>into new perspectives.',
  'From insight<br>to action.',
]
const stepTag = computed(() => STEP_TAGS[step.value - 1] ?? '')

function scrollTop() {
  if (process.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}
function next() {
  if (!canAdvance.value) return
  step.value = Math.min(TOTAL, step.value + 1)
  scrollTop()
}
function restart() {
  step.value = 1
  openOrg.value = form.org
  scrollTop()
}

/* ─────────── บันทึก PDF / แชร์ผลลัพธ์ ─────────── */

const reportDate = ref('')
function saveReport() {
  reportDate.value = new Date().toLocaleString('th-TH', { dateStyle: 'long', timeStyle: 'short' })
  setTimeout(() => window.print(), 60)
}

const shareLabel = ref('แชร์ผลลัพธ์')
let shareTimer: ReturnType<typeof setTimeout> | null = null

const shareUrl = computed(() => {
  if (!process.client) return ''
  const q = new URLSearchParams({
    o: orgId.value,
    p: String(form.people),
    c: String(form.capacity),
    e: String(form.energy),
    s: form.signals.join(','),
    k: peakId.value,
    sc: form.scenario,
    d: String(form.delta),
    dn: String(form.dayShare),
    step: '3',
  })
  return `${window.location.origin}${window.location.pathname}?${q.toString()}`
})

async function shareResult() {
  const url = shareUrl.value
  try {
    if (navigator.share) {
      await navigator.share({ title: 'MOMAY Surprise', text: rec.value.titleTh, url })
      return
    }
    await navigator.clipboard.writeText(url)
    shareLabel.value = 'คัดลอกลิงก์แล้ว ✓'
  } catch {
    shareLabel.value = url
  }
  if (shareTimer) clearTimeout(shareTimer)
  shareTimer = setTimeout(() => (shareLabel.value = 'แชร์ผลลัพธ์'), 2600)
}

/* ─────────── อ่านค่าจากลิงก์ที่แชร์มา ─────────── */

onMounted(() => {
  // อุ่นแคชภาพของทุกหมวด กดสลับแล้วภาพขึ้นทันทีไม่วูบ
  ORG_TYPES.forEach(o => { new Image().src = o.photo })

  const q = new URLSearchParams(window.location.search)
  if (![...q.keys()].length) return

  const o = q.get('o') as OrgId | null
  if (o && ORG_MAP[o]) form.org = o

  const num = (key: string, target: InputKey) => {
    const v = Number(q.get(key))
    if (Number.isFinite(v) && v > 0) {
      form[target] = v
      touched.value = true
    }
  }
  num('p', 'people'); num('c', 'capacity'); num('e', 'energy')

  const s = q.get('s')
  if (s) {
    const ids = s.split(',').filter(x => x in SIGNAL_MAP) as SignalId[]
    if (ids.length) form.signals = ids
  }

  const k = q.get('k') as PeakId | null
  if (k && PEAK_MAP[k]) form.peak = k

  const sc = q.get('sc') as ScenarioId | null
  if (sc && SCENARIOS.some(x => x.id === sc)) form.scenario = sc

  if (q.has('dn')) {
    const dn = Number(q.get('dn'))
    if (Number.isFinite(dn)) form.dayShare = Math.min(80, Math.max(20, Math.round(dn / 5) * 5))
  }

  if (q.has('d')) {
    const d = Number(q.get('d'))
    if (Number.isFinite(d)) form.delta = Math.min(40, Math.max(-20, Math.round(d / 5) * 5))
  }

  openOrg.value = form.org

  const st = Number(q.get('step'))
  if (Number.isFinite(st) && st >= 1 && st <= TOTAL) {
    step.value = st
    if (st === 2) startAwaken()
    else awakenAt.value = AWAKEN_STEPS.length
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
</style>

<style scoped>
.momay-demo {
  --bg: #030b18;
  --bg2: #071628;
  --card: rgba(10, 25, 44, 0.72);
  --line: rgba(66, 133, 199, 0.22);
  --line-on: rgba(80, 170, 255, 0.55);
  --text: #e6f0fb;
  --muted: #8ba5c4;
  --dim: #6b8098;
  --brand: #3ea0ff;
  --cyan: #4fd8ff;
  --danger: #f05252;
  --good: #22c55e;

  /* svh = ความสูง viewport ตอนแถบเบราว์เซอร์แสดงอยู่ (เล็กสุด) เป็นค่าคงที่
     ต่างจาก dvh ที่เปลี่ยนตามแถบยุบ/กาง ทำให้ความสูงหน้าขยับแล้วสกรอลล์กระตุก */
  min-height: 100vh;
  min-height: 100svh;
  color: var(--text);
  font-family: 'Inter', sans-serif;
  background:
    radial-gradient(120% 80% at 50% -10%, #123156 0%, transparent 60%),
    radial-gradient(90% 60% at 90% 110%, #0b2b4a 0%, transparent 55%),
    linear-gradient(180deg, var(--bg2) 0%, var(--bg) 55%);
  background-color: var(--bg);
  -webkit-font-smoothing: antialiased;
}

/* กริดเรืองแสงจาง ๆ ทับพื้นหลัง ให้ดูเป็นจอวิเคราะห์ข้อมูล */
.momay-demo::before {
  content: ''; position: fixed; top: 0; left: 0; z-index: 0; pointer-events: none;
  width: 100vw; height: 100vh; height: 100lvh;
  background-image:
    linear-gradient(rgba(79, 216, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(79, 216, 255, 0.05) 1px, transparent 1px);
  background-size: 48px 48px;
  -webkit-mask-image: radial-gradient(90% 65% at 50% 0%, #000 0%, transparent 78%);
  mask-image: radial-gradient(90% 65% at 50% 0%, #000 0%, transparent 78%);
}

.app {
  position: relative; z-index: 1;
  display: flex; flex-direction: column;
  min-height: 100vh;
  min-height: 100svh;
}
.brand-bar, .progbar, .nav { flex: none; }
/* flex-shrink ต้องเป็น 0 ทั้งคู่ ไม่งั้นเนื้อหาที่สูงกว่าจอจะถูกบีบให้พอดีจอ
   ทำให้ความสูงเอกสารไม่โต → เลื่อนหน้าลงไม่ได้และเนื้อหาท้ายโดนตัด */
.body { flex: 1 0 auto; padding: 0 18px; display: flex; flex-direction: column; }
.screen { flex: 1 0 auto; padding-bottom: 8px; }

/* หน้าที่ต้องกระจายเนื้อหาให้เต็มความสูงจอ (ระยะว่างไปอยู่ที่ margin auto) */
.screen-fill { display: flex; flex-direction: column; }
.screen-fill .flag { margin-top: 18px; }
.screen-fill .peak-badge { margin-top: auto; }
.screen-fill .tiles { margin-top: auto; }

/* หน้า 07 · 08 — เนื้อหาไหลต่อจากหัวข้อเลย ไม่ดันด้วยช่องว่าง
   ความสูงมาจากขนาดตัวหนังสือและระยะในการ์ดแทน */
.fill-sim .flag { margin-top: 20px; }

/* หน้า 08 — เกลี่ยช่องว่างเช่นกัน และให้ปุ่มบันทึกกว้างกว่าปุ่มเริ่มใหม่ */
.fill-decide > .cols { margin-top: 22px; }
/* auto จะยุบเหลือ 0 เมื่อเนื้อหายาวกว่าจอ จึงต้องมีระยะขั้นต่ำกันปุ่มติดการ์ด */
.fill-decide > .final-row { margin-top: auto; padding-top: 26px; }
.fill-decide .closing { margin-top: 24px; }
.final-row .btn-outline { flex: 0 0 auto; }
.final-row .btn-next { flex: 1 1 auto; justify-content: center; }

/* ── แบรนด์ ── */
.brand-bar { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 14px 18px 10px; overflow: visible; }
.logo { display: flex; align-items: baseline; gap: 9px; overflow: visible; }
.logo-main { font-weight: 800; font-size: 18px; letter-spacing: 0.08em; }
.logo-script {
  font-family: 'Great Vibes', cursive;
  font-size: 31px;
  /* Great Vibes มีหางตัวอักษรยาว ถ้า line-height ชิดเกินหาง p จะโดนตัด */
  line-height: 1.45;
  padding: 0 3px 4px;
  /* ไล่เฉดหลัก + แถบแสงขาวคาดกลาง แล้วเลื่อนตำแหน่งพื้นหลังให้แสงกวาดผ่านตัวอักษร */
  background-image: linear-gradient(
    100deg,
    #ff8ad4 0%,
    #c78bfa 16%,
    #4fd8ff 32%,
    #ffffff 44%,
    #eaf9ff 50%,
    #4fd8ff 62%,
    #a78bfa 80%,
    #ff8ad4 100%
  );
  background-size: 300% 100%;
  background-position: 140% 0;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 9px rgba(130, 190, 255, 0.35));
  animation: logoShine 5s ease-in-out infinite;
}
@keyframes logoShine {
  0% { background-position: 140% 0; }
  45% { background-position: -40% 0; }
  100% { background-position: -40% 0; }
}
.tag { font-size: 10.5px; line-height: 1.45; text-align: right; color: var(--dim); max-width: 160px; }

/* ── progress ── */
.progbar { display: flex; align-items: center; gap: 12px; padding: 0 18px 18px; }
.track { position: relative; flex: 1; height: 2px; border-radius: 2px; background: rgba(90, 140, 190, 0.2); }
.fill { position: absolute; inset: 0 auto 0 0; border-radius: 2px; background: linear-gradient(90deg, #1868b8, var(--cyan)); box-shadow: 0 0 10px rgba(79, 216, 255, 0.55); transition: width 0.45s ease; }
.diamond { position: absolute; top: 50%; width: 7px; height: 7px; background: #d7f2ff; transform: translate(-50%, -50%) rotate(45deg); box-shadow: 0 0 10px var(--cyan); transition: left 0.45s ease; }
.count { font-size: 11px; color: var(--muted); font-variant-numeric: tabular-nums; }

/* ── หัวข้อ ── */
.h-en { font-size: 26px; font-weight: 800; line-height: 1.18; letter-spacing: -0.01em; }
.h-en.upper { text-transform: uppercase; font-size: 23px; letter-spacing: 0.01em; }
.h-en.center, .h-th.center { text-align: center; }
.h-en .accent { color: var(--brand); }
.h-th { margin-top: 7px; font-size: 13px; color: var(--muted); }
.sub-q { margin: 26px 0 12px; font-size: 14px; font-weight: 500; }
.list-title { margin: 24px 0 13px; font-size: 14px; font-weight: 700; letter-spacing: 0.02em; }

.ic { width: 20px; height: 20px; flex: none; }

/* ── 01 hero ── */
.cover { position: relative; margin: 4px 0 20px; border-radius: 18px; overflow: hidden; border: 1px solid var(--line); }
/* ── ช่องภาพพื้นหลัง — เปลี่ยนรูปได้ที่ --bg-photo ของแต่ละช่อง ──
   ถ้าลบ --bg-photo ออก จะกลับไปใช้พื้นไล่เฉดสำรองอัตโนมัติ
   ─────────────────────────────────────────────────────────────── */
.photo-slot {
  --bg-photo: none;
  background-image: var(--bg-photo), var(--photo-fallback);
  background-size: cover, auto;
  background-position: center, center;
  background-repeat: no-repeat, no-repeat;
  --photo-fallback:
    radial-gradient(80% 120% at 30% 0%, rgba(38, 108, 182, 0.34) 0%, transparent 62%),
    radial-gradient(70% 100% at 88% 100%, rgba(79, 216, 255, 0.16) 0%, transparent 60%),
    linear-gradient(160deg, #0c2340 0%, #061426 100%);
}

.cover-img {
  height: 190px;
  --bg-photo: url('/momay/demo-bg-01.webp');
}
/* สลับภาพตอนเปลี่ยนหมวดองค์กร */
.cover-enter-active, .cover-leave-active { transition: opacity 0.35s ease; }
.cover-enter-from, .cover-leave-to { opacity: 0; }

/* ภาพเมืองเต็มจอเป็นฉากหลังของหน้า — คลุมผ้ามืดให้เนื้อหายังอ่านง่าย */
.screen-photo {
  position: fixed; top: 0; left: 0; z-index: -1; pointer-events: none;
  width: 100vw;
  /* ใช้ lvh (ความสูง viewport ตอนแถบเบราว์เซอร์ยุบ = ใหญ่สุด) ไม่ใช่ inset:0
     ความสูงจึงคงที่ ภาพไม่ถูกคำนวณ cover ใหม่ตอนแถบที่อยู่ยุบ/กาง = ไม่ดิ้น */
  height: 100vh;
  height: 100lvh;
  opacity: 0.5;
}
.screen-photo.photo-03 { --bg-photo: url('/momay/demo-bg-03.webp'); }
.screen-photo.photo-05 { --bg-photo: url('/momay/demo-bg-05.webp'); opacity: 1; }
.screen-photo::after {
  content: ''; position: absolute; inset: 0;
  background:
    linear-gradient(180deg, rgba(3, 11, 24, 0.9) 0%, rgba(3, 11, 24, 0.58) 40%, rgba(3, 11, 24, 0.9) 100%);
}
/* หน้า 05 — เปิดช่วงกลางให้เมืองสว่างชัดเป็นแถบ ส่วนบน-ล่างมืดให้ตัวหนังสืออ่านออก */
.screen-photo.photo-05::after {
  background: linear-gradient(
    180deg,
    rgba(3, 11, 24, 0.97) 0%,
    rgba(3, 11, 24, 0.93) 24%,
    rgba(3, 11, 24, 0.3) 42%,
    rgba(3, 11, 24, 0.28) 58%,
    rgba(3, 11, 24, 0.82) 72%,
    rgba(3, 11, 24, 0.95) 88%,
    rgba(3, 11, 24, 0.98) 100%
  );
}
.cover-text { position: absolute; inset: auto 0 0 0; padding: 18px 18px 20px; background: linear-gradient(180deg, transparent, rgba(3, 11, 24, 0.92) 62%); }

/* ── 01 รายการองค์กร ── */
.org-list { display: flex; flex-direction: column; gap: 9px; }
.org-row {
  display: flex; align-items: center; gap: 14px; width: 100%;
  padding: 13px 15px; border-radius: 14px; text-align: left; cursor: pointer;
  background: rgba(10, 25, 44, 0.6); border: 1px solid var(--line);
  transition: border-color 0.2s, background 0.2s;
}
.org-row:hover { border-color: var(--line-on); }
.org-row.active {
  border-color: var(--brand);
  background: linear-gradient(92deg, rgba(28, 86, 152, 0.6), rgba(12, 38, 68, 0.5));
  box-shadow: 0 0 0 1px rgba(62, 160, 255, 0.28), 0 8px 26px rgba(20, 90, 180, 0.22);
}
.org-ic { color: #bcd8f5; }
.org-label { display: flex; flex-direction: column; gap: 2px; flex: 1; }
.org-en { font-size: 13.5px; font-weight: 600; }
.org-th { font-size: 10.5px; color: var(--dim); }
.org-go { color: var(--brand); }
.org-row.active .org-ic { color: #eaf6ff; }

/* ── ดร๊อปดาวน์กรอกข้อมูลใต้หมวดที่เลือก (หน้า 01) ── */
/* ใช้ grid-template-rows 1fr→0fr ย่อ/ขยายได้โดยไม่ต้องล็อกความสูงไว้ล่วงหน้า */
.dd { display: grid; grid-template-rows: 1fr; }
.dd-enter-active, .dd-leave-active { transition: grid-template-rows 0.34s ease, opacity 0.26s ease; }
.dd-enter-from, .dd-leave-to { grid-template-rows: 0fr; opacity: 0; }
/* min-height: 0 จำเป็นกับลูก grid ไม่งั้นเนื้อหาดันความสูงไว้จนย่อไม่ลง */
/* กรอบการ์ดของดร๊อปดาวน์ ให้เห็นชัดว่าเป็นชุดเดียวกับหมวดที่เลือกอยู่ */
.dd-inner {
  overflow: hidden; min-height: 0;
  padding: 14px; border-radius: 14px;
  /* พื้นหลังยกโทนให้สว่างกว่าพื้นหน้าชัดเจน การ์ดข้างในจะได้ดูลอยอยู่บนแผง */
  background: linear-gradient(180deg, rgba(21, 52, 89, 0.72), rgba(13, 34, 60, 0.72));
  border: 1px solid rgba(62, 160, 255, 0.34);
  box-shadow: inset 0 1px 0 rgba(130, 195, 255, 0.1), 0 12px 30px rgba(2, 10, 22, 0.5);
}
.dd-inner > .dd-title:first-child { margin-top: 0; }
.dd-title { margin-top: 13px; font-size: 12px; font-weight: 700; line-height: 1.35; color: #dcecfb; }
.dd-title.dd-gap { margin-top: 16px; }
.dd-title .accent { color: var(--brand); }
.dd-sub { margin-top: 3px; font-size: 10px; color: var(--dim); }
.dd .field-list { margin-top: 8px; gap: 8px; }
.dd .sig-grid { margin-top: 8px; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.dd .peak-row { margin-top: 8px; gap: 7px; }

/* ในดร๊อปดาวน์บีบทุกอย่างให้เตี้ยลง — ป้ายกำกับกับช่องกรอกอยู่บรรทัดเดียวกัน */
.dd .field { padding: 9px 11px; gap: 9px; align-items: center; }
.dd .field-ic { margin-top: 0; }
.dd .field-ic :deep(.ic) { width: 17px; height: 17px; }
.dd .field-main { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; column-gap: 10px; }
.dd .field-label { font-size: 11px; line-height: 1.35; }
.dd .field-note { font-size: 9px; }
.dd .field-input { margin: 0; gap: 7px; }
.dd .field-input input { flex: none; width: 104px; padding: 6px 10px; border-radius: 8px; font-size: 14px; text-align: right; }
.dd .field-unit { font-size: 9.5px; }
.dd .field-hint { grid-column: 1 / -1; margin-top: 4px; font-size: 9px; }

.dd .sig { padding: 10px 5px 9px; gap: 3px; border-radius: 11px; }
.dd .sig-ic :deep(.ic) { width: 19px; height: 19px; }
.dd .sig-en { font-size: 10.5px; }
.dd .sig-th { font-size: 8.5px; }
.dd .sig-mark { top: 6px; right: 6px; }
.dd .sig-check { width: 14px; height: 14px; }
.dd .sig-ring { width: 13px; height: 13px; }
.dd .peak { padding: 7px 12px; font-size: 11px; border-radius: 9px; }
.dd-next { display: flex; justify-content: flex-end; margin-top: 14px; }
.dd-next .btn-next { padding: 9px 20px; font-size: 12.5px; }

.quote-mini { margin: 20px 2px 4px; font-size: 12.5px; line-height: 1.7; color: #b9cfe6; }
.qm { color: var(--brand); font-size: 19px; font-weight: 700; margin-right: 3px; }

/* ── 02 ฟิลด์กรอกข้อมูล ── */
.field-list { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
.field { display: flex; gap: 14px; padding: 15px; border-radius: 16px; background: var(--card); border: 1px solid var(--line); }
.field-ic { color: #9ec6ee; margin-top: 3px; }
.field-main { flex: 1; min-width: 0; }
.field-label { font-size: 12.5px; line-height: 1.45; color: #c9dcf0; }
.field-note { font-size: 10.5px; color: var(--dim); }
.field-input { display: flex; align-items: center; gap: 10px; margin: 9px 0 7px; }
.field-input input {
  flex: 1; min-width: 0; padding: 9px 13px; border-radius: 10px;
  background: rgba(4, 13, 26, 0.9); border: 1px solid rgba(70, 140, 210, 0.32);
  color: #dff1ff; font-size: 19px; font-weight: 700; letter-spacing: 0.01em;
}
.field-input input:focus { outline: none; border-color: var(--brand); box-shadow: 0 0 0 3px rgba(62, 160, 255, 0.16); }
.field-unit { font-size: 11px; color: var(--muted); white-space: nowrap; }
.field-hint { font-size: 10.5px; color: var(--dim); }

/* ── 03 signal ── */
.sig-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 24px; }
.sig {
  position: relative; display: flex; flex-direction: column; align-items: center; gap: 5px;
  padding: 16px 6px 13px; border-radius: 14px; cursor: pointer;
  background: rgba(10, 25, 44, 0.55); border: 1px solid var(--line);
  transition: border-color 0.2s, background 0.2s;
}
.sig.on { border-color: var(--brand); background: rgba(23, 66, 116, 0.5); }
.sig-ic { color: var(--sig); }
.sig-ic :deep(.ic) { width: 24px; height: 24px; }
.sig-en { font-size: 12px; font-weight: 600; }
.sig-th { font-size: 9.5px; color: var(--dim); }
.sig.on .sig-th { color: var(--muted); }
.sig-mark { position: absolute; top: 8px; right: 8px; }
.sig-check { display: grid; place-items: center; width: 17px; height: 17px; border-radius: 50%; background: var(--brand); color: #04101f; }
.sig-check :deep(.ic) { width: 11px; height: 11px; stroke-width: 3.4; }
.sig-ring { display: block; width: 15px; height: 15px; border-radius: 50%; border: 1.5px solid rgba(120, 160, 200, 0.45); }

.peak-row { display: flex; flex-wrap: wrap; gap: 8px; }
.peak {
  padding: 9px 15px; border-radius: 10px; font-size: 12px; cursor: pointer;
  background: rgba(10, 25, 44, 0.55); border: 1px solid var(--line); color: var(--muted);
}
.peak.on { border-color: var(--brand); color: #dcefff; background: rgba(23, 66, 116, 0.5); }

/* ── วงความสัมพันธ์ (04 / 06) ── */
/* วงเต็มความกว้างเนื้อหา เผื่อที่ให้ป้ายชื่อของโหนดฝั่งขวาไม่ล้นขอบจอ */
.ring-wrap { position: relative; width: 100%; max-width: 404px; margin: 22px auto; aspect-ratio: 1; }
.ring-wrap.relations { max-width: 404px; }
/* วงหน้า 04 — ภาพเมืองอยู่ในวงกลม ขอบไล่จางกลืนพื้นหลัง */
.ring-bg {
  position: absolute; inset: 0; border-radius: 50%;
  --bg-photo: url('/momay/demo-bg-04.webp');
  opacity: 0.62;
  -webkit-mask-image: radial-gradient(closest-side, #000 58%, rgba(0, 0, 0, 0.35) 86%, transparent 100%);
  mask-image: radial-gradient(closest-side, #000 58%, rgba(0, 0, 0, 0.35) 86%, transparent 100%);
}

/* ── โดมโฮโลแกรมกลางวง ── */
.holo-dome { position: absolute; inset: 0; pointer-events: none; }
.holo-dome > * { position: absolute; }
.dome-core {
  left: 50%; top: 50%; width: 130px; height: 130px;
  transform: translate(-50%, -50%); border-radius: 50%;
  background: radial-gradient(closest-side,
    rgba(150, 240, 255, 0.34), rgba(70, 175, 240, 0.16) 48%, transparent 100%);
  animation: domePulse 4.2s ease-in-out infinite;
}
.dome-arc {
  left: 50%; top: 50%; width: 168px; height: 168px;
  transform: translate(-50%, -50%); border-radius: 50%;
  border: 1px solid rgba(130, 225, 255, 0.22);
  border-bottom-color: transparent; border-right-color: transparent;
  animation: spin 18s linear infinite;
}
.dome-arc.a2 {
  width: 210px; height: 210px;
  border-color: rgba(130, 225, 255, 0.14);
  border-top-color: transparent; border-left-color: transparent;
  animation-duration: 26s; animation-direction: reverse;
}
.particle {
  border-radius: 50%; background: #cdf4ff;
  box-shadow: 0 0 8px rgba(140, 230, 255, 0.95);
  animation: particleFloat 5s ease-in-out infinite;
}
@keyframes domePulse {
  0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.07); }
}
@keyframes particleFloat {
  0%, 100% { opacity: 0; transform: translateY(6px); }
  35%, 65% { opacity: 0.95; transform: translateY(-4px); }
}

/* ── เมืองโฮโลแกรมในวง ── */
.holo-city {
  position: absolute; inset: 6%; width: 88%; height: 88%;
  border-radius: 50%; overflow: hidden; pointer-events: none;
  opacity: 0.62;
}
.holo-grid line { stroke: rgba(79, 216, 255, 0.13); stroke-width: 0.45; }
.holo-bld rect { stroke: rgba(120, 232, 255, 0.45); stroke-width: 0.5; }
.holo-bld line { stroke: rgba(150, 240, 255, 0.42); stroke-width: 0.45; }
.holo-reflect { opacity: 0.18; }
.holo-scan {
  fill: rgba(120, 232, 255, 0.1);
  animation: holoScan 7s ease-in-out infinite;
}
@keyframes holoScan {
  0%, 100% { transform: translateY(4px); opacity: 0; }
  18% { opacity: 1; }
  82% { opacity: 1; }
  50% { transform: translateY(184px); }
}
.ring-lines { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
/* เส้นเชื่อมต่อเนื่อง ไล่เฉดสีตามโหนด ไม่ใช้เส้นประ */
.ring-lines .ln { stroke-width: 0.55; stroke-linecap: round; }
.ring-lines.web .ln { stroke-width: 0.45; }
.ring-lines .ln.cross { stroke-dasharray: 2 2.4; opacity: 0.65; }
.ring-lines .rel-arrow { stroke-linecap: butt; }
.ring-lines .rel-arrow { shape-rendering: geometricPrecision; }
.ring-lines .rel-arrow.near { stroke: #41e0a3; stroke-width: 0.8; }
.ring-lines .rel-arrow.far  { stroke: #6fe0ff; stroke-width: 1; }
.ring-lines .rel-arrow.link { stroke: #6fe0ff; stroke-width: 0.8; }
.ring-lines .rel-arrow.web  { stroke: #5f89ab; stroke-width: 0.55; opacity: 0.75; }

/* ประกายข้อมูลวิ่งไปตามเส้น — pathLength=100 ทำให้ยาวเท่ากันทุกเส้นไม่ว่าเส้นจริงจะสั้นยาวแค่ไหน */
.ring-lines .rel-flow {
  fill: none; stroke-linecap: round;
  stroke-dasharray: 10 90; stroke-dashoffset: 100;
  animation: relFlow 2.6s linear infinite;
}
.ring-lines .rel-flow.near { stroke: #b9ffe4; stroke-width: 0.8; }
.ring-lines .rel-flow.far  { stroke: #d6f7ff; stroke-width: 1; }
.ring-lines .rel-flow.link { stroke: #d6f7ff; stroke-width: 0.8; }
@keyframes relFlow {
  0% { stroke-dashoffset: 100; opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}

/* จุดแสงข้อมูลวิ่งไปตามเส้น */
.ring-lines .spark { filter: drop-shadow(0 0 1.6px currentColor); }

/* คลื่นเรดาร์แผ่ออกจากศูนย์กลาง */
.radar {
  position: absolute; left: 50%; top: 50%; border-radius: 50%;
  border: 1px solid rgba(79, 216, 255, 0.4); transform: translate(-50%, -50%);
  animation: radar 3.6s ease-out infinite; pointer-events: none;
}
@keyframes radar {
  0% { width: 12%; height: 12%; opacity: 0.85; }
  100% { width: 94%; height: 94%; opacity: 0; }
}

/* วงโคจรเส้นประ + จุดเดินรอบวง */
/* กันไม่ให้กรอบของ .orbit ที่หมุนอยู่ไปเพิ่มพื้นที่สกรอลล์ของหน้า */
.orbit-shell { position: absolute; inset: 0; border-radius: 50%; overflow: hidden; pointer-events: none; }
.orbit {
  position: absolute; inset: 5%; border-radius: 50%;
  border: 1px dashed rgba(79, 216, 255, 0.2);
  animation: spin 28s linear infinite; pointer-events: none;
}
.orbit.slow { inset: 2%; animation-duration: 46s; animation-direction: reverse; }
.orbit::before {
  content: ''; position: absolute; top: -4px; left: 50%; margin-left: -4px;
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--cyan); box-shadow: 0 0 14px var(--cyan);
}

.ring-core {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  font-size: 20px; font-weight: 300; letter-spacing: 0.16em;
  color: #eaf9ff; text-align: center; white-space: nowrap;
  text-shadow:
    0 0 10px rgba(170, 240, 255, 0.9),
    0 0 26px rgba(79, 216, 255, 0.6),
    0 2px 16px rgba(0, 0, 0, 0.8);
}
.core-en { position: relative; z-index: 1; }
.core-halo {
  position: absolute; z-index: 0; left: 50%; top: 50%; width: 178px; height: 178px;
  transform: translate(-50%, -50%); border-radius: 50%;
  border: 1px solid rgba(79, 216, 255, 0.26);
  /* ฉากมืดบาง ๆ ให้ตัวหนังสือกลางวงอ่านออกแม้มีเมืองอยู่ข้างหลัง */
  background: radial-gradient(closest-side, rgba(3, 11, 24, 0.88), rgba(3, 11, 24, 0.35) 72%, rgba(3, 11, 24, 0));
  box-shadow: inset 0 0 34px rgba(79, 216, 255, 0.16), 0 0 26px rgba(79, 216, 255, 0.1);
  animation: breathe 3.4s ease-in-out infinite;
}
@keyframes breathe {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.75; }
  50% { transform: translate(-50%, -50%) scale(1.08); opacity: 1; }
}

/* กล่องของโหนด = วงไอคอนพอดี (ป้ายชื่อลอยออกไปข้าง ๆ แบบ absolute)
   เพื่อให้จุดกึ่งกลางโหนดตรงกับปลายเส้นเชื่อมพอดี */
.ring-node {
  --dot: 52px;
  position: absolute; transform: translate(-50%, -50%);
  display: block; line-height: 0;
  /* ป้ายชื่อต้องไม่ตัดบรรทัดแม้โหนดอยู่ชิดขอบวง */
  white-space: nowrap;
  animation: nodeIn 0.55s cubic-bezier(0.2, 0.9, 0.3, 1.3) backwards;
  animation-delay: calc(var(--i, 0) * 0.09s);
}
/* แคปซูลชื่อ — ยื่นออกไปทางขวา ซ้อนอยู่ใต้วงไอคอน */
.node-pill {
  position: absolute; left: 50%; top: 50%; z-index: 1;
  transform: translateY(-50%);
  display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 1px;
  padding: 8px 13px 8px calc(var(--dot) / 2 + 12px);
  border-radius: 999px;
  background: rgba(5, 16, 31, 0.86);
  border: 1px solid color-mix(in srgb, var(--sig) 52%, transparent);
  box-shadow:
    0 0 20px color-mix(in srgb, var(--sig) 20%, transparent),
    inset 0 0 20px rgba(4, 14, 28, 0.55);
  line-height: 1.25;
}
/* โหนดฝั่งซ้าย (Parking / Traffic) ให้ป้ายชื่ออยู่ทางซ้ายของไอคอน ชี้ออกนอกวง */
.ring-node.flip .node-pill {
  left: auto; right: 50%;
  align-items: flex-end;
  padding: 8px calc(var(--dot) / 2 + 12px) 8px 13px;
}
@keyframes nodeIn {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.55); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}
.node-dot {
  position: relative; z-index: 2;
  display: grid; place-items: center;
  width: var(--dot); height: var(--dot); border-radius: 50%;
  color: var(--sig); background: rgba(4, 14, 28, 0.94);
  border: 1.5px solid var(--sig); box-shadow: 0 0 16px color-mix(in srgb, var(--sig) 45%, transparent);
}
.node-dot :deep(.ic) { width: calc(var(--dot) * 0.5); height: calc(var(--dot) * 0.5); }
.node-label { font-size: 11.5px; font-weight: 600; color: #eaf5ff; white-space: nowrap; }
.node-val { font-size: 12px; font-weight: 700; color: var(--sig); }

/* ── หน้า 06: โหนดเป็นวงกลม มีไอคอน ชื่อ และตัวเลขอยู่ในวง ── */
.rel-node {
  position: absolute; transform: translate(-50%, -50%);
  display: grid; place-content: center; justify-items: center; gap: 1px;
  /* คิดเป็น % ของกรอบวง ต้องตรงกับ REL_R_NODE / REL_R_LEAD ในสคริปต์ */
  width: 23%; height: 23%; border-radius: 50%;
  background: radial-gradient(closest-side, rgba(6, 20, 38, 0.96), rgba(5, 14, 28, 0.88));
  border: 2px solid var(--sig);
  box-shadow:
    0 0 22px color-mix(in srgb, var(--sig) 40%, transparent),
    inset 0 0 22px color-mix(in srgb, var(--sig) 12%, transparent);
  color: var(--sig);
  animation: nodeIn 0.55s cubic-bezier(0.2, 0.9, 0.3, 1.3) backwards;
  animation-delay: calc(var(--i, 0) * 0.09s);
}
.rel-node.lead { width: 26%; height: 26%; }
.rel-node :deep(.ic) { width: 25px; height: 25px; stroke-width: 2.2; }
.rel-node.lead :deep(.ic) { width: 29px; height: 29px; stroke-width: 2.2; }
.rel-label { font-size: 12px; font-weight: 600; color: #eaf5ff; white-space: nowrap; }
.rel-val { font-size: 13px; font-weight: 800; color: var(--sig); white-space: nowrap; }
.rel-node.lead .rel-label { font-size: 13px; }
.rel-node.lead .rel-val { font-size: 15px; }

/* ไล่ไฮไลต์ทีละไอคอนวนไปเรื่อย ๆ — 6 โหนด × 2.2s = ครบรอบ 13.2s
   ช่วงที่เป็นของตัวเอง = 1/6 แรกของไทม์ไลน์ (≈16.7%) แล้วส่งต่อให้ตัวถัดไป */
.awakening .node-dot {
  animation: nodeTurn 13.2s ease-in-out infinite;
  animation-delay: calc(var(--i, 0) * 2.2s);
}
@keyframes nodeTurn {
  0% { transform: scale(1); opacity: 0.6; box-shadow: 0 0 8px color-mix(in srgb, var(--sig) 25%, transparent); }
  4% { transform: scale(1.22); opacity: 1; box-shadow: 0 0 28px color-mix(in srgb, var(--sig) 75%, transparent); }
  13% { transform: scale(1.22); opacity: 1; box-shadow: 0 0 28px color-mix(in srgb, var(--sig) 75%, transparent); }
  17%, 100% { transform: scale(1); opacity: 0.6; box-shadow: 0 0 8px color-mix(in srgb, var(--sig) 25%, transparent); }
}

/* แสงวิ่งรอบขอบวงของไอคอนที่กำลังถูกไฮไลต์
   conic-gradient หมุนรอบตัว + mask เจาะกลางให้เหลือเฉพาะวงแหวนบาง ๆ */
.awakening .node-dot::after {
  content: ''; position: absolute; inset: -4px; border-radius: 50%;
  pointer-events: none; opacity: 0;
  background: conic-gradient(from 0deg,
    transparent 0deg 232deg,
    color-mix(in srgb, var(--sig) 55%, transparent) 300deg,
    color-mix(in srgb, var(--sig) 90%, #ffffff) 352deg,
    transparent 360deg);
  -webkit-mask: radial-gradient(closest-side, transparent calc(100% - 3.5px), #000 calc(100% - 3px));
  mask: radial-gradient(closest-side, transparent calc(100% - 3.5px), #000 calc(100% - 3px));
  animation: sweepSpin 1.1s linear infinite, sweepOn 13.2s linear infinite;
  animation-delay: 0s, calc(var(--i, 0) * 2.2s);
}
@keyframes sweepSpin { to { transform: rotate(1turn); } }
@keyframes sweepOn {
  0% { opacity: 0; }
  4% { opacity: 1; }
  14% { opacity: 1; }
  17%, 100% { opacity: 0; }
}
/* วิเคราะห์เสร็จ — ทุกโหนดสว่างค้าง วงโคจรหมุนเร็วขึ้นสั้น ๆ */
.ring-wrap.ready .node-dot {
  animation: none; opacity: 1; transform: none;
  box-shadow: 0 0 24px color-mix(in srgb, var(--sig) 70%, transparent);
}
.ring-wrap.ready .node-dot::after { animation: none; opacity: 0; }
.ring-wrap.ready .core-halo { border-color: rgba(52, 211, 153, 0.45); box-shadow: inset 0 0 40px rgba(52, 211, 153, 0.18); }

/* ─────────── ส่งต่อจากหน้าวิเคราะห์ไปหน้าผลลัพธ์ ───────────
   ลำดับ: วงสว่างเต็มดวง (ready) → ชาร์จพลัง (launch) → แฟลชพุ่งออก → ตัดหน้า  */

/* ชาร์จพลัง: วงโคจรเร่งรอบ ฮาโลกลางวงขยายสว่าง โหนดกระพือพร้อมกัน */
.ring-wrap.launch .orbit { animation-duration: 1.1s; }
.ring-wrap.launch .core-halo {
  animation: launchHalo 620ms cubic-bezier(0.3, 0, 0.2, 1) forwards;
  border-color: rgba(150, 235, 255, 0.8);
}
@keyframes launchHalo {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  55% { transform: translate(-50%, -50%) scale(0.82); opacity: 1; box-shadow: 0 0 70px rgba(150, 235, 255, 0.75); }
  100% { transform: translate(-50%, -50%) scale(2.1); opacity: 0; box-shadow: 0 0 90px rgba(150, 235, 255, 0.9); }
}
.ring-wrap.launch .node-dot {
  animation: launchNode 620ms cubic-bezier(0.3, 0, 0.2, 1) forwards;
  animation-delay: calc(var(--i, 0) * 32ms);
}
@keyframes launchNode {
  0% { transform: scale(1); }
  40% { transform: scale(1.3); box-shadow: 0 0 34px color-mix(in srgb, var(--sig) 90%, transparent); }
  100% { transform: scale(0.2); opacity: 0; }
}
/* จุดแสงบนเส้นวิ่งรัวขึ้น เหมือนข้อมูลถูกดูดเข้าศูนย์กลาง */
.ring-wrap.launch .rel-flow { animation-duration: 0.5s; }

/* แฟลชเต็มจอ — คลุมรอยต่อระหว่างสองหน้าไว้ด้วย */
.warp-fx {
  position: fixed; inset: 0; z-index: 40; pointer-events: none; overflow: hidden;
}
/* กล่องขนาดศูนย์ที่ใจกลางวง — ลูกทุกตัววางทับจุดนี้แล้วถอยครึ่งตัวเองด้วย translate
   (ใช้ grid + place-items ไม่ได้ เพราะ track จะกางออกไปทางขวาล่างตามตัวที่ใหญ่สุด
    ทำให้กลุ่มแฟลชเยื้องจากใจกลางวงไปครึ่งหนึ่งของวงคลื่น) */
.warp-origin { position: absolute; left: var(--wx); top: var(--wy); width: 0; height: 0; }
.warp-origin > * { position: absolute; left: 0; top: 0; }
/* แผ่นขาวจาง ๆ วาบเดียว ไล่จางจากจุดเดียวกับวงคลื่น */
.warp-sheet {
  position: absolute; inset: 0;
  background: radial-gradient(46% 62% at var(--wx) var(--wy), rgba(214, 245, 255, 0.92), rgba(120, 210, 255, 0.35) 46%, transparent 74%);
  animation: warpSheet 880ms ease-out forwards;
}
@keyframes warpSheet {
  0% { opacity: 0; }
  32% { opacity: 1; }
  100% { opacity: 0; }
}
/* แกนแสงพุ่งจากกลางจอ */
.warp-burst {
  width: 14px; height: 14px; border-radius: 50%;
  background: radial-gradient(closest-side, #ffffff, #a6ecff 42%, rgba(79, 216, 255, 0) 72%);
  animation: warpBurst 620ms cubic-bezier(0.32, 0, 0.2, 1) forwards;
}
@keyframes warpBurst {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
  18% { opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(190); opacity: 0; }
}
/* วงคลื่นสามชั้นแผ่ตามออกไป */
.warp-ring {
  width: 130px; height: 130px; border-radius: 50%;
  border: 2px solid rgba(165, 236, 255, 0.9);
  box-shadow: 0 0 26px rgba(79, 216, 255, 0.5), inset 0 0 26px rgba(79, 216, 255, 0.35);
  animation: warpRing 700ms cubic-bezier(0.22, 0.7, 0.2, 1) forwards;
}
.warp-ring.r2 { animation-delay: 90ms; border-color: rgba(120, 220, 255, 0.65); }
.warp-ring.r3 { animation-delay: 180ms; border-color: rgba(90, 200, 255, 0.45); }
@keyframes warpRing {
  0% { transform: translate(-50%, -50%) scale(0.2); opacity: 0; }
  22% { opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(16); opacity: 0; }
}

/* สลับหน้า — หน้าเก่าถูกดูดเข้าไปแล้วเบลอหาย หน้าใหม่คลี่ออกมาจากด้านใน */
.warp-enter-active { transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.2, 0.8, 0.25, 1), filter 0.4s ease; }
.warp-leave-active { transition: opacity 0.26s ease, transform 0.26s ease, filter 0.26s ease; }
.warp-enter-from { opacity: 0; transform: scale(0.94); filter: blur(9px); }
.warp-leave-to { opacity: 0; transform: scale(1.18); filter: blur(12px); }

/* หัวเรื่องเปลี่ยนข้อความแบบเฟด */
.stage-slot { position: relative; height: 104px; }
.stage-head { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; }
.h-en.glow { text-shadow: 0 0 26px rgba(79, 216, 255, 0.35); }
.stage-enter-active, .stage-leave-active { transition: opacity 0.16s ease, transform 0.16s ease; }
.stage-enter-from { opacity: 0; transform: translateY(8px); }
.stage-leave-to { opacity: 0; transform: translateY(-8px); }

.await-list { display: flex; flex-direction: column; gap: 11px; margin-top: 8px; }
.await-list li { display: grid; grid-template-columns: 20px 1fr; gap: 10px; align-items: center; opacity: 0.42; transition: opacity 0.3s; }
.await-list li.done, .await-list li.now { opacity: 1; }
.await-mark { display: grid; place-items: center; color: var(--good); }
.await-mark :deep(.ic) { width: 16px; height: 16px; stroke-width: 3; }
.hollow { width: 15px; height: 15px; border-radius: 50%; border: 1.5px solid rgba(120, 160, 200, 0.45); }
.spin { width: 15px; height: 15px; border-radius: 50%; border: 1.7px solid rgba(120, 160, 200, 0.3); border-top-color: var(--cyan); animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.await-text { display: flex; flex-direction: column; gap: 2px; }
.await-en { font-size: 12.5px; }
.await-th { font-size: 10px; color: var(--dim); }

/* ── 05 ── */
.flag {
  display: flex; gap: 11px; padding: 14px; margin-top: 18px; border-radius: 14px;
  background: rgba(190, 40, 50, 0.14); border: 1px solid rgba(240, 82, 82, 0.42);
}
.flag-ic { color: var(--danger); margin-top: 1px; }
.flag-en { font-size: 13.5px; font-weight: 700; line-height: 1.45; color: #ffc9c9; }
.flag-th { margin-top: 6px; font-size: 11.5px; line-height: 1.6; color: #e4a9a9; }

/* แถบเวลาพีค — ลอยชิดขวาบนภาพเมืองที่เป็นฉากหลังเต็มจอ */
.peak-badge {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  width: fit-content; min-width: 66%; margin-left: auto;
  padding: 11px 13px; border-radius: 12px;
  background: rgba(4, 14, 28, 0.8); border: 1px solid var(--line-on); backdrop-filter: blur(6px);
}
.peak-time { font-size: 15px; font-weight: 800; color: #eaf6ff; }
.peak-cap { font-size: 9.5px; color: var(--muted); margin-top: 2px; }
.peak-chip { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 9px; background: rgba(34, 197, 94, 0.16); color: var(--good); }

.tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 9px; margin-top: 14px; }
.tile {
  position: relative; overflow: hidden;
  padding: 11px 10px 12px; border-radius: 13px;
  background: linear-gradient(160deg, color-mix(in srgb, var(--sig) 10%, transparent), rgba(8, 20, 37, 0.85));
  border: 1px solid color-mix(in srgb, var(--sig) 48%, transparent);
  box-shadow: 0 0 18px color-mix(in srgb, var(--sig) 12%, transparent);
  animation: tileIn 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.2) backwards;
  animation-delay: calc(var(--i, 0) * 0.1s);
}
@keyframes tileIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
.tile-head { display: flex; align-items: center; gap: 7px; font-size: 10.5px; font-weight: 600; color: #e3eefb; }
/* กล่องไอคอนสีประจำ signal ตามตัวอย่าง */
.tile-chip {
  display: grid; place-items: center; flex: none;
  width: 22px; height: 22px; border-radius: 7px;
  background: color-mix(in srgb, var(--sig) 20%, transparent);
  color: var(--sig);
}
.tile-chip :deep(.ic) { width: 13px; height: 13px; }
.tile-val { margin-top: 9px; font-size: 22px; font-weight: 800; line-height: 1.1; color: var(--sig); }
.tile-cap { margin-top: 4px; font-size: 8.5px; line-height: 1.4; color: var(--muted); }

/* ── 06 ── */
.insight-list { display: flex; flex-direction: column; gap: 12px; }
.insight-list li { display: flex; gap: 11px; align-items: flex-start; }
.num {
  display: grid; place-items: center; flex: none; width: 19px; height: 19px; margin-top: 1px;
  border-radius: 50%; background: rgba(62, 160, 255, 0.16); border: 1px solid var(--line-on);
  font-size: 10px; font-weight: 700; color: var(--brand);
}
.ins-en { display: block; font-size: 12px; line-height: 1.45; }
.ins-th { display: block; margin-top: 3px; font-size: 10px; line-height: 1.5; color: var(--dim); }

/* ── 07 ── */
.scn-tabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 20px; }
.scn-tab {
  padding: 13px 8px; border-radius: 11px; font-size: 13px; cursor: pointer;
  background: rgba(10, 25, 44, 0.55); border: 1px solid var(--line); color: var(--muted);
}
.scn-tab.on { border-color: var(--brand); color: #dcefff; background: rgba(23, 66, 116, 0.55); }

/* ── สไลเดอร์แบ่งสัดส่วนไฟกลางวัน-กลางคืน (หน้า 01 หมวดโซลาร์) ── */
.dn { display: flex; align-items: center; gap: 12px; margin-top: 12px; }
.dn-ic { flex: none; display: grid; place-items: center; }
.dn-ic :deep(.ic) { width: 30px; height: 30px; stroke-width: 1.6; }
/* กลางวัน = เหลืองส้มแบบแดด · กลางคืน = ฟ้าครามแบบกลางคืน */
.dn-sun { color: #fbbf24; filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.55)); }
.dn-moon { color: #93c5fd; filter: drop-shadow(0 0 10px rgba(147, 197, 253, 0.45)); }

.dn-rail {
  position: relative; flex: 1; min-width: 0; height: 26px;
  display: flex; align-items: center;
  border-radius: 999px;
  /* ปุ่มวิ่งได้แค่ในช่วง (ความกว้าง - ขนาดปุ่ม) และจุดกึ่งกลางปุ่มเริ่มที่รัศมีปุ่ม
     --pos จึงเป็นตำแหน่งกึ่งกลางปุ่มจริง ใช้ร่วมกันทั้งรอยต่อสีและตัวเลข */
  --tw: 34px;
  --pos: calc(var(--tw) / 2 + (100% - var(--tw)) * var(--f));
  /* ไล่สีแบ่งครึ่งตรงตำแหน่งปุ่มพอดี ซ้าย = กลางวัน ขวา = กลางคืน */
  background: linear-gradient(
    90deg,
    #f59e0b 0%, #fbbf24 calc(var(--pos) - 1px),
    rgba(255, 255, 255, 0.85) var(--pos),
    #3b82f6 calc(var(--pos) + 1px), #1e40af 100%
  );
  border: 1px solid rgba(120, 170, 220, 0.35);
  box-shadow: inset 0 1px 4px rgba(2, 10, 22, 0.45);
}
/* ตัวเลขวางกลางแต่ละฝั่ง ขยับตามตำแหน่งปุ่ม */
.dn-num {
  position: absolute; top: 50%; transform: translate(-50%, -50%);
  font-size: 12px; font-weight: 800; white-space: nowrap; pointer-events: none;
  text-shadow: 0 1px 2px rgba(2, 10, 22, 0.35);
}
/* ปกติวางกลางฝั่งของตัวเอง แต่ต้องกันไม่ให้ไปซ้อนปุ่มลากตอนสัดส่วนสุดขอบ
   (เช่น 85/15 ฝั่งกลางคืนแคบมากจนเลขไปทับปุ่ม) จึงบีบตำแหน่งด้วย clamp */
.dn-num-day {
  left: clamp(22px, calc(var(--pos) / 2), calc(var(--pos) - 36px));
  color: #3b2500;
}
.dn-num-night {
  left: clamp(calc(var(--pos) + 36px), calc(var(--pos) + (100% - var(--pos)) / 2), calc(100% - 22px));
  color: #eaf3ff;
}

/* input จริงวางทับโปร่งใส ปุ่มลากคือ thumb ของมัน */
.dn-input {
  -webkit-appearance: none; appearance: none;
  position: absolute; inset: 0; width: 100%; height: 100%;
  margin: 0; background: transparent; cursor: pointer;
}
.dn-input::-webkit-slider-thumb {
  -webkit-appearance: none; width: 34px; height: 34px; border-radius: 50%;
  background: #f8fafc; border: 3px solid #ffffff;
  box-shadow: 0 3px 10px rgba(2, 10, 22, 0.55);
}
.dn-input::-moz-range-thumb {
  width: 34px; height: 34px; border-radius: 50%;
  background: #f8fafc; border: 3px solid #ffffff;
  box-shadow: 0 3px 10px rgba(2, 10, 22, 0.55);
}
.dn-ends {
  display: flex; justify-content: space-between;
  margin: 12px 42px 0; font-size: 10.5px; color: var(--dim);
}

.slider-box { margin-top: 20px; padding: 18px; border-radius: 14px; background: var(--card); border: 1px solid var(--line); }
.slider-head {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  font-size: 13px; color: var(--muted);
}
.slider-rail { position: relative; padding-top: 16px; }
.slider-bubble {
  padding: 3px 11px; border-radius: 7px; background: var(--brand);
  color: #04101f; font-size: 11px; font-weight: 800; white-space: nowrap;
}
.slider {
  -webkit-appearance: none; appearance: none; width: 100%; height: 4px; margin: 0 0 8px;
  border-radius: 3px; background: linear-gradient(90deg, var(--cyan) var(--p), rgba(90, 140, 190, 0.22) var(--p));
  cursor: pointer;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%;
  background: #eaf7ff; border: 2px solid var(--brand); box-shadow: 0 0 12px rgba(79, 216, 255, 0.65);
}
.slider::-moz-range-thumb {
  width: 16px; height: 16px; border-radius: 50%;
  background: #eaf7ff; border: 2px solid var(--brand); box-shadow: 0 0 12px rgba(79, 216, 255, 0.65);
}
.slider-ends { display: flex; justify-content: space-between; font-size: 10px; color: var(--dim); }

/* ── แผง 01 ของหมวดโซลาร์: ไล่ที่มาของตัวเลข + ขนาดระบบ ── */
.sol-chain {
  margin-top: 14px; padding: 4px 2px;
  border-radius: 13px; background: var(--card); border: 1px solid var(--line);
}
.sol-row {
  display: flex; align-items: center; justify-content: space-between; gap: 10px;
  padding: 9px 13px; font-size: 12px;
}
.sol-row + .sol-row { border-top: 1px solid rgba(66, 133, 199, 0.14); }
.sol-k { display: flex; align-items: center; gap: 7px; color: var(--muted); min-width: 0; }
.sol-k :deep(.ic) { width: 15px; height: 15px; flex: none; }
.sol-v { font-weight: 800; color: #dceaf9; white-space: nowrap; font-variant-numeric: tabular-nums; }
.sol-v i { font-style: normal; font-weight: 600; font-size: 10.5px; color: var(--dim); margin-left: 3px; }
/* บรรทัดสรุปต่อวัน = จุดตั้งต้นของการแบ่งกลางวัน-กลางคืน */
.sol-strong .sol-k { color: #cfe3f7; }
.sol-strong .sol-v { color: #eaf6ff; }
.sol-day .sol-k { color: #fbbf24; }
.sol-night .sol-k { color: #93c5fd; }

/* สองการ์ดผลลัพธ์ ไม่ใช่สามเหมือนหมวดอื่น */
/* ค่า 26% ต้องตรงกับ SOL_R_NODE ในสคริปต์ (ครึ่งหนึ่ง + เผื่อหัวลูกศร) */
.sol-ring .rel-node { width: 26%; height: 26%; }
.sol-ring .rel-node :deep(.ic) { width: 17px; height: 17px; }
.panel .sol-ring .rel-node :deep(.ic) { width: 15px; height: 15px; }

.tiles-2 { grid-template-columns: 1fr 1fr; }
.tile-u { margin-left: 4px; font-size: 12px; font-weight: 700; color: var(--muted); }

.table-wrap { margin-top: 16px; border-radius: 14px; overflow-x: auto; background: var(--card); border: 1px solid var(--line); }
.sim-table { width: 100%; border-collapse: collapse; font-size: 13px; white-space: nowrap; }
.sim-table th, .sim-table td { padding: 14px 12px; text-align: right; }
.sim-table th:first-child, .sim-table td:first-child { text-align: left; }
.sim-table thead th { font-size: 11px; font-weight: 600; color: var(--dim); background: rgba(6, 18, 34, 0.7); }
.sim-table tbody tr + tr { border-top: 1px solid rgba(66, 133, 199, 0.14); }
.sim-table tbody td { font-variant-numeric: tabular-nums; color: #d6e7f8; }
/* เน้นคอลัมน์ผลจำลอง (คอลัมน์ที่ 3) ให้เด่นกว่าค่าปัจจุบัน */
.sim-table th:nth-child(3), .sim-table td:nth-child(3) {
  background: rgba(62, 160, 255, 0.12);
  box-shadow: inset 1px 0 0 rgba(62, 160, 255, 0.28), inset -1px 0 0 rgba(62, 160, 255, 0.28);
}
.sim-table tbody td:nth-child(3) { color: #eaf6ff; font-weight: 700; }
.sim-table thead th:nth-child(3) { color: #9fd2ff; font-weight: 700; }
/* ค่าที่ล้น 100% ยังต้องเป็นสีแดง แม้อยู่ในคอลัมน์ที่ถูกเน้น (ต้องชนะกฎ :nth-child ด้านบน) */
.sim-table tbody td.over, .sim-table tbody td.over:nth-child(3) { color: var(--danger); font-weight: 700; }
.sim-table td.up { color: var(--good); }
.sim-table td.down { color: #7fb6ff; }
.cell-ic { display: inline-grid; place-items: center; vertical-align: -4px; margin-right: 7px; color: var(--sig); }

/* จอแคบ: บีบระยะและตัวอักษรให้ตารางพอดีความกว้าง ไม่ต้องเลื่อนแนวนอน */
@media (max-width: 439px) {
  .sim-table { font-size: 11.5px; }
  .sim-table th, .sim-table td { padding: 11px 5px; }
  .sim-table thead th { font-size: 9.5px; }
  .cell-ic { margin-right: 5px; }
  .cell-ic :deep(.ic) { width: 12px; height: 12px; }
}
.cell-ic :deep(.ic) { width: 14px; height: 14px; }

/* ── 08 ── */
.reco { display: flex; gap: 12px; margin-top: 20px; align-items: flex-start; }
.pill { flex: none; padding: 4px 10px; border-radius: 7px; font-size: 9.5px; font-weight: 800; letter-spacing: 0.05em; }
.pill.priority { background: rgba(34, 197, 94, 0.18); color: #6ee7a0; border: 1px solid rgba(34, 197, 94, 0.4); }
.pill.critical { background: rgba(240, 82, 82, 0.18); color: #ff9d9d; border: 1px solid rgba(240, 82, 82, 0.45); }
.pill.watch { background: rgba(62, 160, 255, 0.16); color: #8ecbff; border: 1px solid var(--line-on); }
.reco-en { font-size: 15.5px; font-weight: 800; line-height: 1.35; }
.reco-th { margin-top: 7px; font-size: 12px; line-height: 1.6; color: var(--muted); }

.more-recs { margin-top: 18px; }
.more-rec { display: flex; gap: 10px; align-items: flex-start; margin-top: 10px; }
.more-en { font-size: 12.5px; font-weight: 700; line-height: 1.4; }
.more-th { margin-top: 4px; font-size: 11px; line-height: 1.55; color: var(--muted); }

.why { display: flex; gap: 12px; margin-top: 20px; align-items: flex-start; }
.why-k { flex: none; font-size: 12px; font-weight: 800; color: var(--brand); }
.why-en { font-size: 12.5px; line-height: 1.5; color: #c6dbf0; }
.why-th { margin-top: 6px; font-size: 11.5px; line-height: 1.6; color: var(--dim); }

.impacts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 9px; }
.impact {
  display: flex; flex-direction: column; align-items: center; gap: 5px; text-align: center;
  padding: 14px 7px; border-radius: 12px; font-size: 10px; line-height: 1.35;
  background: var(--card); border: 1px solid var(--line);
}
.impact.good { color: #6ee7a0; border-color: rgba(34, 197, 94, 0.32); }
.impact.warn { color: #ff9d9d; border-color: rgba(240, 82, 82, 0.32); }

.closing {
  display: flex; gap: 12px; align-items: center; margin-top: 20px; padding: 16px;
  border-radius: 14px; background: rgba(23, 66, 116, 0.36); border: 1px solid var(--line-on);
}
.closing-ic { color: #6ee7a0; }
.closing p { font-size: 13.5px; line-height: 1.55; color: #d6e7f8; }

.final-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 26px; }
.share-link {
  display: block; width: 100%; margin: 16px 0 30px; padding: 6px;
  font-size: 11.5px; color: var(--brand); text-decoration: underline; text-underline-offset: 3px; cursor: pointer;
}

/* ── หน้า 03 · ผลลัพธ์ 4 แผงในหน้าเดียว ── */
.screen-result { padding-bottom: 24px; }
.panels { display: grid; grid-template-columns: 1fr; gap: 14px; margin-top: 4px; }
.panel {
  position: relative; overflow: hidden;
  display: flex; flex-direction: column;
  padding: 15px 14px 17px; border-radius: 18px;
  background: linear-gradient(180deg, rgba(21, 52, 89, 0.5), rgba(10, 28, 50, 0.62));
  border: 1px solid var(--line);
  box-shadow: 0 12px 30px rgba(2, 10, 22, 0.4);
}
/* ภาพประกอบเดิมเคยเป็นพื้นหลังเต็มจอ — ขังไว้ในแผงของตัวเองแทน */
.panel > .screen-photo { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.4; z-index: 0; }
.panel > *:not(.screen-photo) { position: relative; z-index: 1; }

/* เนื้อหาเดิมออกแบบไว้เต็มจอ — ย่อให้พอดีความกว้างแผง */
.panel .h-en, .panel .h-en.upper { font-size: 17px; }
.panel .h-th { margin-top: 5px; font-size: 11px; }
.panel .cols { display: block; margin-top: 0; }
.panel .list-title { margin: 16px 0 10px; font-size: 12.5px; }
.panel .quote-mini { margin: 14px 0 0; font-size: 11.5px; }

.panel .flag { margin-top: 12px; }
.panel .flag-en { font-size: 12px; }
.panel .flag-th { font-size: 10.5px; margin-top: 4px; }
.panel .peak-badge { margin-top: 12px; }
.panel-see .peak-badge { margin-top: auto; }
.panel-sim .flag { margin-top: auto; }
.panel .peak-time { font-size: 14px; }
.panel .peak-cap { font-size: 9px; }
.panel .tiles { margin-top: 12px; gap: 7px; }
.panel .tile { padding: 11px 8px 12px; }
.panel .tile-head { font-size: 9.5px; gap: 5px; }
.panel .tile-chip { width: 21px; height: 21px; }
.panel .tile-val { margin-top: 6px; font-size: 19px; }
.panel .tile-cap { font-size: 8px; }

.panel .ring-wrap, .panel .ring-wrap.relations { max-width: 250px; margin: 8px auto 0; }
.panel .rel-node :deep(.ic) { width: 18px; height: 18px; }
.panel .rel-node.lead :deep(.ic) { width: 21px; height: 21px; }
.panel .rel-label, .panel .rel-node.lead .rel-label { font-size: 10px; }
.panel .rel-val, .panel .rel-node.lead .rel-val { font-size: 11px; }
.panel .insight-list { gap: 9px; }
.panel .ins-en { font-size: 11px; }
.panel .ins-th { font-size: 9.5px; }
.panel .num { flex: none; }

.panel .scn-tabs { margin-top: 14px; gap: 6px; }
.panel .scn-tab { font-size: 10.5px; padding: 8px 4px; }
.panel .slider-box { margin-top: 12px; padding: 13px; }
.panel .slider-head { font-size: 11.5px; }
.panel .slider-bubble { font-size: 10.5px; padding: 3px 10px; }
.panel .table-wrap { margin-top: 12px; }
.panel .sim-table { font-size: 11px; }
.panel .sim-table th, .panel .sim-table td { padding: 8px 7px; }
.panel .sim-table thead th { font-size: 9.5px; }
.panel .cell-ic { margin-right: 5px; }
.panel .cell-ic :deep(.ic) { width: 12px; height: 12px; }

.panel .reco { margin-top: 12px; gap: 9px; }
.panel .reco-en { font-size: 13.5px; }
.panel .reco-th { font-size: 11px; margin-top: 5px; }
.panel .pill { font-size: 8.5px; padding: 3px 8px; }
.panel .why { margin-top: 14px; gap: 9px; }
.panel .more-recs { margin-top: 14px; }
.panel .more-rec { gap: 8px; margin-top: 8px; }
.panel .more-en { font-size: 11px; }
.panel .more-th { font-size: 9.5px; margin-top: 3px; }
.panel .why-k { font-size: 11.5px; }
.panel .why-en { font-size: 11px; }
.panel .why-th { font-size: 10px; }
.panel .impacts { gap: 6px; }
.panel .impact { font-size: 9px; padding: 11px 5px; }
.panel .closing { margin-top: 14px; padding: 12px; gap: 9px; }
.panel .closing p { font-size: 11.5px; }

/* ── ปุ่ม / แถบล่าง ── */
/* ชุดปุ่มจบงานของหน้าสุดท้าย วางชิดขวาในแถบล่างคู่กับปุ่มกลับ */
.nav-inner { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.nav-actions { display: flex; align-items: center; justify-content: flex-end; gap: 12px; flex-wrap: wrap; }
.nav-actions .share-link { width: auto; margin: 0; padding: 6px 2px; }
.nav-actions .btn-outline, .nav-actions .btn-next { flex: none; }

.nav {
  /* ไม่ใช้ sticky — แถบที่ยึดขอบล่าง viewport จะขยับตามแถบที่อยู่ของเบราว์เซอร์มือถือ
     ที่ยุบ/กางตลอดเวลา ทำให้ปุ่มเลื่อนขึ้นลงเอง ปล่อยให้อยู่ท้ายเนื้อหาแทน
     (.app สูงอย่างน้อย 100svh + .body ยืดเต็ม ปุ่มจึงอยู่ก้นจอเองเมื่อเนื้อหาสั้น) */
  position: relative; z-index: 5;
  padding: 16px 18px 22px;
  /* ห้ามใช้ backdrop-filter ที่นี่ — บน element ที่เป็น sticky เบราว์เซอร์ต้อง
     คำนวณเบลอใหม่ทุกเฟรมที่เลื่อน ทำให้แถบสั่นขึ้นลง ใช้เฉดทึบแทน */
  background: linear-gradient(180deg, rgba(3, 11, 24, 0) 0%, rgba(3, 11, 24, 0.97) 38%, var(--bg) 100%);
}
.btn-next {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 11px 22px; border-radius: 999px; cursor: pointer;
  font-size: 13px; font-weight: 700; color: #eaf7ff;
  background: linear-gradient(95deg, #1d6ecd, #3390f2);
  box-shadow: 0 8px 26px rgba(29, 110, 205, 0.38);
  transition: opacity 0.2s, transform 0.15s;
}
.btn-next:hover { transform: translateY(-1px); }
.btn-next:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
.btn-next :deep(.ic) { width: 15px; height: 15px; }
/* ปุ่มรองแบบมีกรอบ (หน้า 08) */
.btn-outline {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 11px 22px; border-radius: 999px; cursor: pointer;
  font-size: 13px; font-weight: 600; color: #cfe3f7;
  background: rgba(10, 25, 44, 0.7); border: 1px solid var(--line-on);
  transition: border-color 0.2s, color 0.2s;
}
.btn-outline:hover { border-color: var(--brand); color: #eaf7ff; }
.btn-outline :deep(.ic) { width: 15px; height: 15px; }

/* ── แถบล่างหน้าผลลัพธ์: ตัวหนังสือและปุ่มใหญ่ขึ้น ──
   เพดานอยู่ที่ราว 19px (จากเดิม 13px) — เคยลองสองเท่าเต็มแล้วใหญ่เกินเนื้อหา
   และผูกกับความกว้างจอด้วย clamp เพราะจอ 1024 แผงกว้างแค่ ~238px

   เจาะจงที่ .nav เท่านั้น เพราะ .btn-next ถูกใช้เป็นปุ่ม "ต่อไป" ในหน้า 01 ด้วย */
.nav .btn-back {
  gap: clamp(7px, 0.7vw, 11px);
  font-size: clamp(13px, 1.15vw, 18px);
}
.nav .btn-back :deep(.ic) {
  width: clamp(15px, 1.35vw, 21px);
  height: clamp(15px, 1.35vw, 21px);
}

.nav-actions { gap: clamp(12px, 1.2vw, 18px); }
.nav-actions .share-link {
  padding: clamp(6px, 0.6vw, 9px) 4px;
  font-size: clamp(13px, 1.2vw, 19px);
  text-underline-offset: clamp(3px, 0.3vw, 5px);
}
.nav-actions .btn-next {
  gap: clamp(8px, 0.8vw, 12px);
  padding: clamp(11px, 1vw, 15px) clamp(22px, 2vw, 32px);
  font-size: clamp(13px, 1.2vw, 19px);
}
.nav-actions .btn-next :deep(.ic) {
  width: clamp(15px, 1.4vw, 22px);
  height: clamp(15px, 1.4vw, 22px);
}

/* ── แถวปุ่มไปเดโมตัวอื่น (ท้ายหน้าผลลัพธ์) ── */
/* --btn-a ต้องประกาศเป็น @property ถึงจะ animate มุมของ conic-gradient ได้ */
@property --btn-a {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
@keyframes btnSweep { to { --btn-a: 360deg; } }

.demo-row {
  display: grid;
  /* ช่องกลางกว้างกว่าอีกสองช่อง ปุ่มเด่นตั้งแต่ระดับเลย์เอาต์ ไม่ใช่แค่ scale */
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.06fr) minmax(0, 1fr);
  align-items: center;
  gap: 16px;
  max-width: 1040px;
  margin: 0 auto 18px;
  width: 100%;
}
.demolink {
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  /* ปุ่มสองข้างเป็น <button> จึงต้องบังคับให้สืบทอดฟอนต์และสีเหมือน <a> */
  font: inherit; color: inherit;
  position: relative; isolation: isolate;
  display: flex; align-items: center; justify-content: center; gap: 13px;
  padding: 14px 18px;
  border: 0; border-radius: 999px;
  background: transparent;
  box-shadow: 0 14px 30px rgba(2, 10, 22, 0.45);
  text-decoration: none; text-align: left; cursor: pointer;
  transition: transform 0.45s var(--ease), box-shadow 0.45s var(--ease);
}
/* ปุ่มข้าง: ขอบนิ่ง ๆ ไม่มีแสงวิ่ง — แสงวิ่งสงวนไว้ให้ปุ่มกลางตัวเดียว */
.demolink::before {
  content: ''; position: absolute; inset: -1.2px; z-index: -2; border-radius: inherit;
  background: linear-gradient(
    120deg,
    color-mix(in srgb, var(--accent) 45%, transparent),
    rgba(255, 255, 255, 0.05) 55%,
    color-mix(in srgb, var(--accent) 30%, transparent)
  );
}
.demolink::after {
  content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
  background:
    radial-gradient(72% 140% at 12% 50%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%),
    #08182c;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
  transition: background 0.45s var(--ease);
}
/* ปุ่มข้างไม่ขยับตอน hover — เปลี่ยนแค่ความสว่างของพื้นให้รู้ว่ากดได้ */
.demolink:hover::after {
  background:
    radial-gradient(72% 140% at 12% 50%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 72%),
    #0d1b2e;
}
.demolink__icon {
  display: grid; place-items: center; flex: none;
  width: 44px; height: 44px; border-radius: 50%;
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
  width: 24px; height: 24px; fill: none; stroke: currentColor;
  stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round;
}
.demolink__label { display: flex; flex-direction: column; gap: 3px; line-height: 1.3; min-width: 0; }
.demolink__label b {
  font-size: 14px; font-weight: 800; letter-spacing: 0.09em;
  color: var(--accent); white-space: nowrap;
}
.demolink__label small { font-size: 11.5px; letter-spacing: 0.06em; text-align: center; color: var(--muted); transition: color 0.35s var(--ease); }
.demolink:hover .demolink__label small { color: #eaf6ff; }

/* ── ปุ่มกลาง — ตัวหลักของแถว ──
   เน้นหลายชั้นพร้อมกัน: ช่องกว้างกว่า (ที่ .demo-row) · สเกลใหญ่กว่า ·
   พื้นเรืองสีเข้มกว่า · ขอบหนากว่าและแสงวิ่งเร็วกว่า · มีจังหวะหายใจเบา ๆ */
.demolink--lead {
  padding: 14px 18px;
  transform: scale(1.02);
  animation: leadPulse 2.8s ease-in-out infinite;
}
@keyframes leadPulse {
  0%, 100% {
    box-shadow: 0 18px 40px rgba(2, 10, 22, 0.55),
                0 0 26px -10px color-mix(in srgb, var(--accent) 70%, transparent);
  }
  50% {
    box-shadow: 0 20px 46px rgba(2, 10, 22, 0.6),
                0 0 44px -6px color-mix(in srgb, var(--accent) 90%, transparent);
  }
}
/* แสงวิ่งรอบขอบ — มีเฉพาะปุ่มกลาง */
.demolink--lead::before {
  inset: -2.4px;
  background: conic-gradient(
    from var(--btn-a),
    rgba(255, 255, 255, 0.06) 0deg,
    rgba(255, 255, 255, 0.06) 214deg,
    var(--accent) 268deg,
    #ffffff 300deg,
    var(--accent) 332deg,
    rgba(255, 255, 255, 0.06) 360deg
  );
  animation: btnSweep 2.2s linear infinite;
}
.demolink--lead::after {
  background:
    radial-gradient(78% 150% at 14% 50%, color-mix(in srgb, var(--accent) 34%, transparent), transparent 74%),
    #0b2033;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14);
}
.demolink--lead:hover { transform: scale(1.02) translateY(-2px); }
.demolink--lead .demolink__icon {
  width: 46px; height: 46px;
  border-width: 2px;
  box-shadow: 0 0 20px -4px color-mix(in srgb, var(--accent) 80%, transparent);
}
.demolink--lead .demolink__icon :deep(svg) { width: 25px; height: 25px; stroke-width: 1.8; }
.demolink--lead .demolink__label b {
  font-size: 14.5px; letter-spacing: 0.095em;
  color: #ffffff;
  text-shadow: 0 0 18px color-mix(in srgb, var(--accent) 85%, transparent);
}
.demolink--lead .demolink__label small { font-size: 11.5px; font-weight: 600; color: #dff3e6; }

/* เครื่องเคลื่อนไหวปิดอยู่ → ยังต้องเด่นด้วยเงาคงที่ */
@media (prefers-reduced-motion: reduce) {
  .demolink--lead {
    animation: none;
    box-shadow: 0 20px 46px rgba(2, 10, 22, 0.6),
                0 0 38px -6px color-mix(in srgb, var(--accent) 85%, transparent);
  }
}

/* จอกลาง: ยังเรียงสามปุ่ม แต่ชื่อยาวขึ้นหลังเติม MOMAY — หดตัวอักษรกันชื่อล้นปุ่ม */
@media (min-width: 821px) and (max-width: 1080px) {
  .demo-row { gap: 12px; }
  .demolink { gap: 10px; padding: 13px 14px; }
  .demolink__icon { width: 40px; height: 40px; }
  .demolink--lead .demolink__icon { width: 42px; height: 42px; }
  .demolink__label b { font-size: 12px; letter-spacing: 0.05em; }
  .demolink--lead .demolink__label b { font-size: 12.5px; letter-spacing: 0.055em; }
  .demolink__label small { font-size: 10.5px; }
}

/* จอแคบ: สามปุ่มเรียงกันไม่ไหว ให้ซ้อนลงมาเป็นแถวเดียว */
@media (max-width: 820px) {
  .demo-row { grid-template-columns: 1fr; gap: 11px; }
  .demolink--lead, .demolink--lead:hover { transform: none; }
}

.btn-back { display: inline-flex; align-items: center; gap: 7px; font-size: 12.5px; color: var(--muted); cursor: pointer; }
.btn-back:hover { color: #cfe3f7; }
.btn-back :deep(.ic) { width: 15px; height: 15px; }

/* ── แนวนอน / จอกว้าง ── */
@media (min-width: 900px) {
  .brand-bar, .progbar, .nav-inner { max-width: 1040px; margin-inline: auto; width: 100%; }
  .body { max-width: 1040px; margin-inline: auto; width: 100%; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: start; margin-top: 22px; }
  .cols-cover { align-items: stretch; }
  .cols-awaken { align-items: center; }
  .cover { margin: 0; height: 100%; }
  .cover-img { height: 100%; min-height: 330px; }
  /* หน้า 01 — ดร๊อปดาวน์ทำให้คอลัมน์ขวายาวมาก ภาพจึงตรึงไว้ด้านบนแทนการยืดตามทั้งคอลัมน์ */
  .cols-cover > .cover { position: sticky; top: 14px; align-self: start; height: min(76svh, 620px); }
  /* คอลัมน์ขวาสูงเท่าภาพปกแล้วสกรอลล์ในตัวเอง หน้าจึงไม่ยืดยาวตามดร๊อปดาวน์ที่กางออก */
  .cols-cover > .org-col {
    height: min(76svh, 620px);
    overflow-y: auto;
    overscroll-behavior: contain;
    padding-right: 10px; margin-right: -10px;
    scrollbar-width: thin;
    scrollbar-color: rgba(110, 170, 235, 0.45) transparent;
  }
  .cols-cover > .org-col::-webkit-scrollbar { width: 8px; }
  .cols-cover > .org-col::-webkit-scrollbar-track { background: rgba(6, 18, 34, 0.5); border-radius: 4px; }
  .cols-cover > .org-col::-webkit-scrollbar-thumb { background: rgba(110, 170, 235, 0.45); border-radius: 4px; }
  .cols-cover > .org-col::-webkit-scrollbar-thumb:hover { background: rgba(140, 195, 250, 0.6); }
  .h-en { font-size: 34px; }
  .h-en.upper { font-size: 28px; }
  .sig-grid { grid-template-columns: repeat(6, 1fr); }
  .stage-slot { height: 116px; }
  /* หน้ากรอกข้อมูล — ช่องเรียงลงมาเสมอ อยู่กลางจอ ไม่ยืดเต็มความกว้าง */
  .screen-narrow { max-width: 560px; margin-inline: auto; }
  .ring-wrap { margin-top: 6px; max-width: 380px; }
  .sim-table { font-size: 13px; }
  .sim-table th, .sim-table td { padding: 13px 16px; }
}

/* มือถือ/แท็บเล็ตแนวนอน — บีบระยะให้เห็นเนื้อหาได้มากขึ้นในความสูงที่จำกัด */
@media (orientation: landscape) and (max-height: 560px) {
  .brand-bar { padding: 10px 16px 8px; }
  .progbar { padding-bottom: 12px; }
  .h-en { font-size: 21px; }
  .h-en.upper { font-size: 19px; }
  .cover-img { height: 128px; }
  .peak-badge { margin-top: 24px; }
  .ring-wrap { max-width: 268px; margin: 12px auto; }
  .ring-node { --dot: 42px; }
  .node-label { font-size: 11.5px; }
  .ring-core { font-size: 16px; }
  .core-halo { width: 130px; height: 130px; }
  .rel-node { width: 26%; height: 26%; }
  .rel-node.lead { width: 29%; height: 29%; }
  .rel-node :deep(.ic) { width: 22px; height: 22px; }
  .rel-label { font-size: 10px; }
  .rel-val { font-size: 11px; }
  .stage-slot { height: 74px; }
  .field-list { gap: 10px; margin-top: 14px; max-width: 520px; }
  .screen-narrow { max-width: 520px; margin-inline: auto; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start; margin-top: 14px; }
  .cols-cover { align-items: stretch; }
  .cols-awaken { align-items: center; }
  .cover { margin: 0; height: 100%; }
  .cover-img { height: 100%; min-height: 150px; }
  .sig-grid { grid-template-columns: repeat(6, 1fr); }
  .nav { padding: 10px 16px 14px; }
}

/* ── แท็บเล็ต / จอใหญ่ — ขยายตัวหนังสือและองค์ประกอบให้ได้สัดส่วนกับจอ ── */
@media (min-width: 1000px) {
  .brand-bar, .progbar, .nav-inner, .body { max-width: 1120px; }

  .h-en { font-size: 33px; }
  .h-en.upper { font-size: 30px; }
  .h-th { font-size: 14px; }
  .tag { font-size: 12px; max-width: 200px; }
  .list-title { font-size: 16px; }

  /* 01 */
  .org-row { padding: 16px 18px; }
  .org-en { font-size: 15px; }
  .org-th { font-size: 12px; }
  .quote-mini { font-size: 14px; }
  .dd-title { font-size: 13px; }
  .dd-sub { font-size: 11px; }

  /* 02 */
  .screen-narrow { max-width: 640px; }
  .field { padding: 18px; }
  .field-label { font-size: 14px; }
  .field-note { font-size: 12px; }
  .field-input input { font-size: 22px; padding: 12px 15px; }
  .field-unit { font-size: 12.5px; }
  .field-hint { font-size: 12px; }

  /* 03 */
  .sig { padding: 20px 10px 16px; }
  .sig-en { font-size: 13.5px; }
  .sig-th { font-size: 11px; }
  .sub-q { font-size: 16px; }
  .peak { font-size: 13.5px; padding: 11px 18px; }

  /* บีบช่องหัวข้อกับแถบบนให้แคบลง = ทั้งวงและรายการขยับขึ้นไปทางหัวจอ
     โดยไม่ต้องย่อขนาดวง (ขนาดวงคุมด้วย .cols-awaken ด้านล่าง) */
  .stage-slot { height: 78px; }
  .brand-bar { padding-top: 10px; padding-bottom: 6px; }
  .progbar { padding-bottom: 12px; }

  /* 04 · 06 */
  .ring-wrap { max-width: 100%; margin: 0 auto; }
  .ring-wrap.relations { max-width: 100%; }

  /* หน้า 04 · 06 — คอลัมน์กว้างตามเนื้อหาจริงแล้วจัดทั้งคู่ไว้กลางจอ
     (1fr 1fr ทำให้วงกลมยืดเต็มครึ่งซ้ายส่วนข้อความสั้นกว่าคอลัมน์ขวา ภาพเลยเทซ้าย)
     align-items: center ทำให้ข้อความอยู่ระดับกลางวงพอดี */
  .cols-awaken, .cols-relate {
    /* คอลัมน์ขวาเป็น auto = กว้างเท่าข้อความจริง ไม่ล็อกความกว้างตายตัว
       ไม่งั้นจะเหลือที่ว่างท้ายคอลัมน์ แล้วกลุ่มภาพดูเทไปทางซ้าย */
    grid-template-columns: minmax(0, 520px) auto;
    justify-content: center;
    align-items: center;
    gap: 46px;
  }
  /* วงกินพื้นที่แนวตั้งที่เหลือให้มากที่สุด แต่ไม่เกินจนตกขอบล่าง
     240px = แถบแบรนด์ + progress + ช่องหัวข้อ + ระยะหายใจบน-ล่าง
     (ด้านของวง = ความกว้างคอลัมน์ซ้าย เพราะ aspect-ratio 1) */
  .cols-awaken { grid-template-columns: minmax(0, min(620px, 100svh - 240px)) auto; }
  .cols-awaken > .await-list,
  .cols-relate > div:last-child { max-width: 460px; }
  .ring-core { font-size: 33px; }
  .core-halo { width: 280px; height: 280px; }
  .ring-node { --dot: 60px; }
  .node-label { font-size: 14.5px; }
  .await-list { gap: 15px; }
  .await-list li { grid-template-columns: 22px 1fr; gap: 13px; }
  .await-mark :deep(.ic) { width: 19px; height: 19px; }
  .hollow, .spin { width: 18px; height: 18px; }
  .await-en { font-size: 17px; }
  .await-th { font-size: 13px; }
  .rel-label { font-size: 14px; }
  .rel-val { font-size: 15px; }
  .rel-node.lead .rel-label { font-size: 15px; }
  .rel-node.lead .rel-val { font-size: 17px; }
  .ins-en { font-size: 14px; }
  .ins-th { font-size: 11.5px; }

  /* 05 */
  .flag-en { font-size: 15px; }
  .flag-th { font-size: 12.5px; }
  .peak-time { font-size: 17px; }
  .peak-cap { font-size: 11px; }
  .tile { padding: 16px 14px 17px; }
  .tile-head { font-size: 12px; }
  .tile-chip { width: 26px; height: 26px; }
  .tile-val { font-size: 28px; }
  .tile-cap { font-size: 10.5px; }

  /* 07 */
  .scn-tab { font-size: 14px; padding: 14px 10px; }
  .slider-head { font-size: 14px; }
  .slider-bubble { font-size: 12.5px; padding: 4px 13px; }
  .sim-table { font-size: 14.5px; }
  .sim-table th, .sim-table td { padding: 16px 18px; }
  .sim-table thead th { font-size: 12px; }

  /* 08 */
  .reco-en { font-size: 18px; }
  .reco-th { font-size: 13px; }
  .why-k { font-size: 14px; }
  .why-en { font-size: 14px; }
  .why-th { font-size: 12.5px; }
  .impact { font-size: 11.5px; padding: 18px 10px; }
  .closing p { font-size: 15px; }
  .share-link { font-size: 13px; }

  /* ปุ่ม — ไม่ให้ปุ่มบันทึกยืดเต็มความกว้างจนเสียสัดส่วน */
  .btn-next, .btn-outline { font-size: 14.5px; padding: 13px 26px; }
  .final-row .btn-next { flex: 0 1 auto; min-width: 320px; }

  /* จอสูงมาก: หัวข้ออยู่บน แล้วเนื้อหาหลักลอยกึ่งกลางพื้นที่ที่เหลือ
     ไม่ปล่อยให้กองอยู่ครึ่งบนแล้วเหลือช่องว่างท้ายหน้า */
  .screen:not(.screen-fill) { display: flex; flex-direction: column; }
  .screen:not(.screen-fill) > .cols { margin-top: auto; margin-bottom: auto; }
  /* หน้าวิเคราะห์ไม่ลอยกึ่งกลาง — ให้วงขึ้นไปชิดหัวเรื่อง ช่องว่างที่เหลือไปกองด้านล่างแทน */
  .screen > .cols-awaken { margin-top: 0; margin-bottom: auto; }
  .screen-narrow > .field-list { margin-top: auto; margin-bottom: auto; }
  .screen > .sig-grid { margin-top: auto; }
  .screen > .peak-row { margin-bottom: auto; }
}

/* ── หน้าผลลัพธ์: 2 แผงต่อแถวบนจอกลาง และ 4 แผงเรียงข้างกันบนจอกว้าง ── */
@media (min-width: 700px) {
  .panels { grid-template-columns: 1fr 1fr; }
}
/* iPad Mini แนวนอน (1024) ต้องได้ 4 แผงเรียงข้างกันแล้ว ไม่ใช่ 2×2 */
@media (min-width: 1000px) {
  .panels { grid-template-columns: repeat(4, 1fr); gap: 12px; }
  .app-wide .brand-bar, .app-wide .progbar, .app-wide .nav-inner, .app-wide .body { max-width: 1460px; }
  .panel { padding: 16px 13px 18px; }
  .panel .ring-wrap, .panel .ring-wrap.relations { max-width: 100%; }

  /* พอเรียง 4 คอลัมน์ แผงจะแคบกว่าตอน 2 คอลัมน์มาก
     ไทล์ที่ถูกขยายไว้ในบล็อก 1000px ด้านบนจึงล้นจนชื่อโดน overflow ของ .tile ตัดหัวท้าย
     วางชื่อไว้ใต้ไอคอนแทนการวางข้าง ๆ ชื่อจะได้ความกว้างเต็มการ์ด */
  /* การ์ดกว้างแค่ ~64px — ถ้าไม่บีบระยะแนวตั้ง การ์ดจะสูงเกือบสองเท่าของความกว้าง ดูเป็นแท่ง
     มุมโค้งก็ต้องเล็กลงตามขนาดการ์ด ไม่งั้นดูบวมเกินกรอบ */
  .panel .tiles { gap: 6px; }
  .panel .tile { padding: 9px 8px 10px; border-radius: 10px; }
  .panel .tile-head { flex-direction: column; align-items: flex-start; gap: 4px; font-size: 10px; }
  .panel .tile-chip { width: 19px; height: 19px; border-radius: 6px; }
  .panel .tile-chip :deep(.ic) { width: 11px; height: 11px; }
  .panel .tile-val { margin-top: 4px; font-size: 17px; }
  .panel .tile-cap { margin-top: 2px; font-size: 8px; line-height: 1.35; }

  /* โหนดในวงความสัมพันธ์: ไอคอน + ชื่อ + ตัวเลข ซ้อนกันสูงเกือบเท่าเส้นผ่านศูนย์กลาง
     แถวตัวเลขจึงไปอยู่ช่วงล่างที่คอร์ดของวงกลมแคบ แล้วล้นออกนอกขอบวง
     ย่อไอคอนกับตัวอักษรให้กองข้อความสั้นลง ทุกแถวจะขยับเข้าใกล้กลางวงที่กว้างกว่า */
  .panel .rel-node :deep(.ic) { width: 14px; height: 14px; }
  .panel .rel-node.lead :deep(.ic) { width: 16px; height: 16px; }
  .panel .rel-label, .panel .rel-node.lead .rel-label { font-size: 9px; }
  .panel .rel-val, .panel .rel-node.lead .rel-val { font-size: 9.5px; }

  /* ตารางมี 4 คอลัมน์ (Metric · Current · Scenario · Change) แต่แผงกว้างแค่ ~238px
     ค่าเดิมทำให้ตารางกว้างเกินจนคอลัมน์ Change หลุดออกนอกกรอบ เห็นไม่ครบ
     บีบระยะ + ให้หัวคอลัมน์ตัดบรรทัดได้ ตารางจะพอดีกรอบโดยไม่ต้องเลื่อนแนวนอน */
  .panel .sim-table { font-size: 10.5px; }
  .panel .sim-table th, .panel .sim-table td { padding: 7px 4px; }
  .panel .sim-table thead th { font-size: 8.5px; white-space: normal; line-height: 1.3; }
  .panel .cell-ic { margin-right: 4px; }
  .panel .cell-ic :deep(.ic) { width: 11px; height: 11px; }

  /* แผงทั้งแถวสูงเท่ากันเสมอ พอแผงคำแนะนำยาวขึ้น (เช่นเลื่อนไป +40% แล้วมีเรื่องต้องจัดการเพิ่ม)
     แผงอื่นจะถูกยืดตาม แล้ว margin-top: auto ที่ดันเนื้อหาไปชิดก้นแผงจะเปิดช่องโหว่กลางการ์ด
     ให้เนื้อหาเรียงชิดบนแทน ช่องว่างที่เหลือไปกองท้ายการ์ดเป็นก้อนเดียว */
  .panel-see .peak-badge { margin-top: 12px; }
  .panel-sim .flag { margin-top: 12px; }
}

/* เคารพการตั้งค่าลดการเคลื่อนไหวของเครื่อง */
@media (prefers-reduced-motion: reduce) {
  .momay-demo *, .momay-demo *::before, .momay-demo *::after {
    animation-duration: 0.001s !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001s !important;
  }
}

/* ══════════════ ฟอร์มขอให้ติดต่อกลับ ══════════════ */
.ct-mask {
  position: fixed; inset: 0; z-index: 90;
  display: grid; place-items: center;
  padding: 20px;
  background: rgba(2, 8, 18, 0.74);
  backdrop-filter: blur(6px);
}
.ct-card {
  position: relative;
  width: min(420px, 100%);
  padding: 28px 24px 24px;
  border: 1px solid rgba(120, 180, 255, 0.22);
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(10, 22, 44, 0.98), rgba(5, 12, 26, 0.98));
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.6);
  text-align: center;
}
.ct-x {
  position: absolute; top: 12px; right: 12px;
  display: grid; place-items: center;
  width: 32px; height: 32px;
  border: 0; border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: #93a4be; cursor: pointer;
  transition: color 0.2s, background 0.2s;
}
.ct-x:hover { color: #fff; background: rgba(255, 255, 255, 0.12); }
.ct-x svg { width: 16px; height: 16px; }
.ct-title { margin: 0; font-size: 20px; font-weight: 600; color: #fff; }
.ct-sub { margin: 8px 0 0; font-size: 13px; line-height: 1.7; color: #93a4be; }
.ct-sub b { color: #cfe0ff; font-weight: 600; }
.ct-form { margin-top: 20px; display: grid; gap: 13px; text-align: left; }
.ct-field { display: grid; gap: 6px; }
.ct-label { font-size: 12px; color: #93a4be; }
.ct-field input {
  height: 44px;
  padding: 0 14px;
  border: 1px solid rgba(120, 180, 255, 0.2);
  border-radius: 12px;
  background: rgba(4, 11, 24, 0.9);
  color: #eaf1ff; font-size: 14px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.ct-field input::placeholder { color: #5b6b85; }
.ct-field input:focus {
  border-color: rgba(79, 216, 255, 0.55);
  box-shadow: 0 0 0 3px rgba(79, 216, 255, 0.14);
}
.ct-err { margin: 0; font-size: 12px; color: #ff8d9b; }
.ct-submit {
  margin-top: 4px; height: 46px;
  border: 0; border-radius: 999px;
  background: linear-gradient(90deg, #2f7dff, #4fd8ff);
  color: #04121f; font-size: 14px; font-weight: 600;
  cursor: pointer;
  transition: filter 0.2s, opacity 0.2s;
}
.ct-submit:hover:not(:disabled) { filter: brightness(1.08); }
.ct-submit:disabled { opacity: 0.45; cursor: not-allowed; }
.ct-done-ic {
  display: grid; place-items: center;
  width: 54px; height: 54px; margin: 0 auto 14px;
  border-radius: 999px;
  background: rgba(74, 222, 128, 0.14);
  color: #4ade80;
}
.ct-done-ic svg { width: 26px; height: 26px; }

.ct-enter-active, .ct-leave-active { transition: opacity 0.25s ease; }
.ct-enter-active .ct-card, .ct-leave-active .ct-card { transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1); }
.ct-enter-from, .ct-leave-to { opacity: 0; }
.ct-enter-from .ct-card, .ct-leave-to .ct-card { transform: translateY(14px) scale(0.97); }

/* ── รายงาน PDF ── */
.report { display: none; }

@media print {
  .momay-demo { background: #fff !important; color: #111; min-height: 0; }
  .momay-demo::before { display: none; }
  .app { display: none !important; }
  .report { display: block; padding: 0; font-family: 'Kanit', sans-serif; color: #111; }
  .rp-title { font-size: 20px; font-weight: 700; }
  .rp-sub { margin-top: 4px; font-size: 11px; color: #555; }
  .report h2 { margin: 18px 0 7px; font-size: 13px; font-weight: 700; border-bottom: 1px solid #bbb; padding-bottom: 4px; }
  .rp-table { width: 100%; border-collapse: collapse; font-size: 11px; }
  .rp-table th, .rp-table td { border: 1px solid #ccc; padding: 5px 8px; text-align: left; }
  .rp-table thead th { background: #eee; }
  .rp-list { margin-left: 18px; font-size: 11px; line-height: 1.7; }
  .rp-reco { font-size: 13px; font-weight: 700; }
  .rp-why, .rp-impact { margin-top: 6px; font-size: 11px; line-height: 1.65; }
  .rp-foot { margin-top: 22px; font-size: 9px; color: #777; }
  @page { margin: 14mm; }
}
</style>
