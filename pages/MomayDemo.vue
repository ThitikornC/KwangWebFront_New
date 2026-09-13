<template>
  <div class="momay-demo">
    <!-- ══════════════════ หน้าจอ (ซ่อนตอนพิมพ์) ══════════════════ -->
    <div class="app">
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
        <!-- ═════════ 01 · Choose Organization ═════════ -->
        <section v-if="step === 1" class="screen">
          <div class="cols cols-cover">
            <div class="cover">
              <!-- ภาพเปลี่ยนตามหมวดองค์กรที่เลือก (ORG_TYPES[x].photo) -->
              <Transition name="cover" mode="out-in">
                <div
                  :key="org.photo"
                  class="cover-img photo-slot"
                  :style="{ '--bg-photo': `url('${org.photo}')` }"
                />
              </Transition>
              <div class="cover-text">
                <h1 class="h-en">Same data.<br />A brighter tomorrow.</h1>
                <p class="h-th font-thai">ข้อมูลของคุณ อาจทำให้คุณมองใหม่กว่าที่เคย</p>
              </div>
            </div>

            <div>
              <div class="org-list">
                <button
                  v-for="o in ORG_TYPES"
                  :key="o.id"
                  type="button"
                  class="org-row"
                  :class="{ active: form.org === o.id }"
                  @click="pickOrg(o.id)"
                >
                  <span class="org-ic"><Ico :name="o.icon" /></span>
                  <span class="org-label">
                    <span class="org-en">{{ o.en }}</span>
                    <span class="org-th font-thai">{{ o.th }}</span>
                  </span>
                  <span v-if="form.org === o.id" class="org-go"><Ico name="arrow-right" /></span>
                </button>
              </div>
              <p class="quote-mini">
                <span class="qm">“</span>Small data.<br />Big possibilities.”
              </p>
            </div>
          </div>
        </section>

        <!-- ═════════ 02 · Quick Input ═════════ -->
        <section v-else-if="step === 2" class="screen screen-narrow">
          <h2 class="h-en">Tell us a little<br />about <span class="accent">your {{ org.subject }}</span></h2>
          <p class="h-th font-thai">บอกเราเล็กน้อยเกี่ยวกับพื้นที่ของคุณ</p>

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
        </section>

        <!-- ═════════ 03 · Select Signals ═════════ -->
        <section v-else-if="step === 3" class="screen">
          <!-- ภาพเมืองเต็มจอเป็นฉากหลังของหน้านี้ -->
          <div class="screen-photo photo-slot photo-03" />

          <h2 class="h-en">What usually changes<br />throughout the day?</h2>
          <p class="h-th font-thai">อะไรที่เปลี่ยนแปลงในแต่ละวันของพื้นที่คุณ</p>

          <div class="sig-grid">
            <button
              v-for="s in SIGNALS"
              :key="s.id"
              type="button"
              class="sig"
              :class="{ on: form.signals.includes(s.id) }"
              :style="{ '--sig': s.color }"
              @click="toggleSignal(s.id)"
            >
              <span class="sig-mark">
                <span v-if="form.signals.includes(s.id)" class="sig-check"><Ico name="check" /></span>
                <span v-else class="sig-ring" />
              </span>
              <span class="sig-ic"><Ico :name="s.icon" /></span>
              <span class="sig-en">{{ s.en }}</span>
              <span class="sig-th font-thai">{{ s.th }}</span>
            </button>
          </div>

          <h3 class="sub-q font-thai">ช่วงเวลาไหนที่มีกิจกรรมหนาแน่นที่สุด?</h3>
          <div class="peak-row">
            <button
              v-for="p in PEAKS"
              :key="p.id"
              type="button"
              class="peak font-thai"
              :class="{ on: form.peak === p.id }"
              @click="form.peak = p.id"
            >{{ p.th }}</button>
          </div>
        </section>

        <!-- ═════════ 04 · Awakening ═════════ -->
        <section v-else-if="step === 4" class="screen">
          <Transition name="stage" mode="out-in">
            <div :key="stage.en" class="stage-head">
              <h2 class="h-en center glow">{{ stage.en }}</h2>
              <p class="h-th center font-thai">{{ stage.th }}</p>
            </div>
          </Transition>

          <div class="cols cols-awaken">
            <div class="ring-wrap awakening" :class="{ ready: awakenDone }">
              <div class="ring-bg photo-slot" />

              <!-- เมืองโฮโลแกรม -->
              <svg class="holo-city" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="holoBld" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#6fe6ff" stop-opacity="0.3" />
                    <stop offset="100%" stop-color="#2f9fd6" stop-opacity="0.03" />
                  </linearGradient>
                  <pattern id="holoWin" width="4" height="5.5" patternUnits="userSpaceOnUse">
                    <rect x="1" y="1.4" width="1.7" height="2.1" fill="#bff3ff" opacity="0.26" />
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
              <span class="orbit" />

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

        <!-- ═════════ 05 · See ═════════ -->
        <section v-else-if="step === 5" class="screen screen-fill">
          <!-- ภาพเมืองช่วงพีคเป็นพื้นหลังเต็มจอของหน้านี้ -->
          <div class="screen-photo photo-slot photo-05" />

          <h2 class="h-en upper">What matters now?</h2>
          <p class="h-th font-thai">สิ่งที่น่าสนใจในตอนนี้</p>

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
              <div class="peak-cap font-thai">Peak Activity · ช่วงเวลาหน้าแน่น</div>
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
        </section>

        <!-- ═════════ 06 · Understand ═════════ -->
        <section v-else-if="step === 6" class="screen">
          <h2 class="h-en upper">Why does it matter?</h2>
          <p class="h-th font-thai">ทำไมสิ่งนี้สำคัญ</p>

          <div class="cols">
            <div class="ring-wrap relations">
              <span class="orbit slow" />
              <svg class="ring-lines web" viewBox="0 0 100 100">
                <defs>
                  <linearGradient
                    v-for="(l, i) in relationLines"
                    :key="'wg' + i"
                    :id="'mdRel' + i"
                    gradientUnits="userSpaceOnUse"
                    :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2"
                  >
                    <stop offset="0%" :stop-color="l.from" stop-opacity="0.6" />
                    <stop offset="50%" stop-color="#4fd8ff" stop-opacity="0.3" />
                    <stop offset="100%" :stop-color="l.color" stop-opacity="0.6" />
                  </linearGradient>
                  <!-- หัวลูกศรสองทาง บอกว่าปัจจัยส่งผลถึงกัน -->
                  <marker
                    id="mdArrow" viewBox="0 0 10 10" refX="8" refY="5"
                    markerWidth="5" markerHeight="5" orient="auto-start-reverse"
                  >
                    <path d="M0 1.5 L9 5 L0 8.5 Z" fill="#6fe0ff" />
                  </marker>
                </defs>

                <!-- เส้นบางพาดกลางวง แสดงว่าทุกปัจจัยโยงถึงกันหมด -->
                <line
                  v-for="(l, i) in relationLines"
                  :key="'w' + i"
                  class="ln cross"
                  :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2"
                  :stroke="`url(#mdRel${i})`"
                />

                <!-- ลูกศรโค้งสองหัวระหว่างโหนดที่ติดกัน -->
                <path
                  v-for="(a, i) in relationArcs"
                  :key="'arc' + i"
                  class="arc"
                  :d="a.d"
                  marker-start="url(#mdArrow)"
                  marker-end="url(#mdArrow)"
                />

                <!-- จุดแสงวิ่งออกจาก People ไปยังปัจจัยที่เกี่ยวข้อง -->
                <circle
                  v-for="(l, i) in leadLines"
                  :key="'ws' + i"
                  class="spark"
                  r="1"
                  :fill="l.color"
                >
                  <animateMotion
                    :path="`M ${l.x1} ${l.y1} L ${l.x2} ${l.y2}`"
                    dur="3.2s"
                    repeatCount="indefinite"
                    :begin="`${i * 0.42}s`"
                  />
                  <animate
                    attributeName="opacity"
                    dur="3.2s"
                    repeatCount="indefinite"
                    values="0;1;1;0"
                    keyTimes="0;0.14;0.82;1"
                    :begin="`${i * 0.42}s`"
                  />
                </circle>
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
                <span class="rel-val">↑ <NumTicker :value="n.value" suffix="%" /></span>
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

        <!-- ═════════ 07 · Anticipate & Simulate ═════════ -->
        <section v-else-if="step === 7" class="screen">
          <h2 class="h-en upper">What happens next?</h2>
          <p class="h-th font-thai">ถ้าจำนวนผู้ใช้พื้นที่เพิ่มขึ้น ...</p>

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
              <span>ปรับจำนวนผู้ใช้พื้นที่</span>
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
        </section>

        <!-- ═════════ 08 · Decide ═════════ -->
        <section v-else class="screen">
          <h2 class="h-en upper">Momay recommends</h2>
          <p class="h-th font-thai">ข้อเสนอแนะจาก MOMAY</p>

          <div class="cols">
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

          <div class="final-row">
            <button type="button" class="btn-outline font-thai" @click="restart">
              <Ico name="arrow-left" /> เริ่มใหม่
            </button>
            <button type="button" class="btn-next font-thai" @click="saveReport">
              บันทึกรายงานนี้ <Ico name="arrow-right" />
            </button>
          </div>
          <button type="button" class="share-link font-thai" @click="shareResult">
            {{ shareLabel }}
          </button>
        </section>
      </main>

      <!-- ── แถบปุ่มล่าง ── -->
      <nav v-if="step < TOTAL" class="nav">
        <button v-if="step > 1" type="button" class="btn-back font-thai" @click="prev">
          <Ico name="arrow-left" /> กลับ
        </button>
        <span v-else />
        <button
          type="button"
          class="btn-next font-thai"
          :disabled="!canAdvance"
          @click="next"
        >ต่อไป <Ico name="arrow-right" /></button>
      </nav>
    </div>

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
          <tr><th>สิ่งที่เปลี่ยนแปลงตามเวลา</th><td>{{ signalNames }}</td></tr>
          <tr><th>ช่วงเวลาหนาแน่น</th><td>{{ PEAK_MAP[form.peak].th }} ({{ base.peakWindow }})</td></tr>
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

      <p class="rp-foot">MOMAY Surprise · ตัวเลขทั้งหมดคำนวณจากข้อมูลที่กรอก เพื่อใช้ประกอบการตัดสินใจเบื้องต้น</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref, reactive, computed, watch, onMounted, onBeforeUnmount, defineComponent } from 'vue'
import {
  ORG_TYPES, ORG_MAP, SIGNALS, SIGNAL_MAP, PEAKS, PEAK_MAP, SCENARIOS,
  computeBaseline, simulate, rankMetrics, ringMetrics,
  headlineAlert, keyUnderstandings, recommend, constraintWarning,
  type OrgId, type SignalId, type PeakId, type ScenarioId, type InputKey,
} from '~/utils/momayDemoModel'

definePageMeta({ name: 'momay-demo', layout: false })
useHead({
  title: 'MOMAY Surprise — Demo',
  // พื้นหลังเข้มถึงขอบจอ (เอาออกเองเมื่อออกจากหน้านี้)
  style: [{ children: 'html,body{background:#030b18;}' }],
})

const TOTAL = 8

/* ─────────── icons ─────────── */

const ICONS: Record<string, string[]> = {
  landmark: ['M3 22h18', 'M6 18v-7M10 18v-7M14 18v-7M18 18v-7', 'M2.5 9 12 3.2 21.5 9H2.5Z'],
  cap: ['M22 9.5 12 4.5 2 9.5l10 5 10-5Z', 'M6 11.8V16c3.2 2.6 8.8 2.6 12 0v-4.2'],
  bed: ['M3 18v-6.5A1.5 1.5 0 0 1 4.5 10H19a2 2 0 0 1 2 2v6', 'M3 18h18', 'M3 14.5h18', 'M7.5 10V7.5A1.5 1.5 0 0 1 9 6h2.5V10'],
  building: ['M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16', 'M3 21h18', 'M15 21V10h3a2 2 0 0 1 2 2v9', 'M8 7.5h3M8 11.5h3M8 15.5h3'],
  book: ['M4 19.5A2.5 2.5 0 0 1 6.5 17H20', 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z'],
  hexagon: ['M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z'],
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
  org: 'municipality' as OrgId,
  people: 2500,
  capacity: 180,
  energy: 120000,
  signals: ['people', 'traffic', 'parking', 'energy'] as SignalId[],
  peak: 'midday' as PeakId,
  scenario: 'normal' as ScenarioId,
  delta: 20,
})

const org = computed(() => ORG_MAP[form.org] ?? ORG_MAP.municipality)
const fieldList = computed(() => [org.value.fields.people, org.value.fields.capacity, org.value.fields.energy])

/** เปลี่ยนประเภทองค์กร → เติมค่าตั้งต้นชุดใหม่ (ถ้าผู้ใช้ยังไม่ได้แก้เอง) */
const touched = ref(false)
function pickOrg(id: OrgId) {
  if (form.org === id) return
  form.org = id
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
  org: form.org,
  people: form.people,
  capacity: form.capacity,
  energy: form.energy,
  signals: form.signals,
  peak: form.peak,
}))

const base = computed(() => computeBaseline(inputs.value))
const sim = computed(() => simulate(inputs.value, base.value, form.delta, form.scenario))

const loadSignals = computed(() => form.signals.filter(s => s !== 'people'))
const topRanked = computed(() => rankMetrics(base.value.metrics, loadSignals.value).slice(0, 2))
const alert = computed(() => headlineAlert(rankMetrics(base.value.metrics, loadSignals.value)))
const insights = computed(() => keyUnderstandings(form.signals))
const rec = computed(() => recommend(sim.value.metrics, loadSignals.value))
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

const HOLO_GROUND_Y = 132

/** ตึกในเส้นขอบฟ้า: [x, กว้าง, สูง, มีเสาอากาศ] */
const HOLO_BUILDINGS: { x: number; w: number; h: number; mast?: number }[] = [
  { x: 0, w: 13, h: 26 },
  { x: 15, w: 9, h: 43 },
  { x: 26, w: 15, h: 21 },
  { x: 43, w: 11, h: 52, mast: 10 },
  { x: 56, w: 17, h: 33 },
  { x: 75, w: 10, h: 63, mast: 13 },
  { x: 87, w: 14, h: 39 },
  { x: 103, w: 12, h: 29 },
  { x: 117, w: 16, h: 49, mast: 8 },
  { x: 135, w: 9, h: 25 },
  { x: 146, w: 14, h: 43 },
  { x: 162, w: 11, h: 33 },
  { x: 175, w: 15, h: 23 },
  { x: 192, w: 8, h: 37 },
]

/** เส้นพื้นแนวนอน — ถี่ใกล้ขอบฟ้า ห่างเมื่อเข้าใกล้ผู้ชม */
const HOLO_GROUND = [1, 2, 3, 4, 5, 6, 7].map(i => HOLO_GROUND_Y + i * i * 1.3)

/** เส้นพื้นแนวลึก พุ่งเข้าหาจุดรวมสายตากลางภาพ */
const HOLO_RAYS = Array.from({ length: 13 }, (_, i) => 100 + (i - 6) * 46)

/** ลำดับรอบวง: People บนสุด แล้วไล่ตามเข็มนาฬิกาตามแบบที่ออกแบบไว้ */
const RING_ORDER: SignalId[] = ['people', 'energy', 'waste', 'events', 'traffic', 'parking']
const ringRank = (id: SignalId) => {
  const i = RING_ORDER.indexOf(id)
  return i < 0 ? RING_ORDER.length : i
}

/** หน้า 04 — โชว์ทุก signal ที่ระบบเชื่อมโยงได้ */
const awakenNodes = computed(() =>
  placeOnRing(RING_ORDER.map(id => ({ id, value: 0 })), 31),
)

/** หน้า 06 — People เป็นจุดนำที่ 12 นาฬิกา ตามด้วย signal ที่เลือก */
const relationNodes = computed(() => {
  const items: { id: SignalId; value: number }[] = [
    { id: 'people', value: base.value.metrics.people },
    ...ringMetrics(base.value.metrics, loadSignals.value)
      .map(r => ({ id: r.id, value: r.value }))
      .sort((a, b) => ringRank(a.id) - ringRank(b.id)),
  ]
  return placeOnRing(items, items.length <= 3 ? 30 : 34)
})

interface RelLine {
  x1: number; y1: number; x2: number; y2: number
  /** สีต้นทาง–ปลายทาง ใช้ไล่เฉดให้เห็นทิศของความสัมพันธ์ */
  from: string; color: string
  /** เส้นที่ออกจาก People (โหนดนำ) */
  lead: boolean
}

/** รัศมีวงโหนดในหน่วย viewBox (%) — ใช้ตัดปลายเส้นให้หยุดที่ขอบวง หัวลูกศรจะได้ไม่ถูกบัง */
const REL_R_LEAD = 14.4
const REL_R_NODE = 12.9

const relationLines = computed<RelLine[]>(() => {
  const ns = relationNodes.value
  const out: RelLine[] = []
  for (let i = 0; i < ns.length; i++) {
    for (let j = i + 1; j < ns.length; j++) {
      const a = ns[i]
      const b = ns[j]
      const dx = b.x - a.x
      const dy = b.y - a.y
      const len = Math.hypot(dx, dy) || 1
      const ux = dx / len
      const uy = dy / len
      const ra = (i === 0 ? REL_R_LEAD : REL_R_NODE)
      const rb = REL_R_NODE
      out.push({
        x1: a.x + ux * ra, y1: a.y + uy * ra,
        x2: b.x - ux * rb, y2: b.y - uy * rb,
        from: a.def.color, color: b.def.color,
        lead: i === 0,
      })
    }
  }
  return out
})

/** ยิงจุดแสงเฉพาะเส้นที่ออกจาก People ไม่ให้ภาพรกเกินไป */
const leadLines = computed(() => relationLines.value.filter(l => l.lead))

/** ลูกศรโค้งสองหัวระหว่างโหนดที่อยู่ติดกันรอบวง (โก่งออกนอกวง) */
const relationArcs = computed(() => {
  const ns = relationNodes.value
  const n = ns.length
  if (n < 2) return [] as { d: string; color: string }[]

  return ns.map((a, i) => {
    const b = ns[(i + 1) % n]
    const dx = b.x - a.x
    const dy = b.y - a.y
    const len = Math.hypot(dx, dy) || 1
    const ux = dx / len
    const uy = dy / len
    const ra = (a.id === 'people' ? REL_R_LEAD : REL_R_NODE) + 1
    const rb = (b.id === 'people' ? REL_R_LEAD : REL_R_NODE) + 1

    const ax = a.x + ux * ra
    const ay = a.y + uy * ra
    const bx = b.x - ux * rb
    const by = b.y - uy * rb

    // ดันจุดควบคุมออกจากศูนย์กลางให้เส้นโก่งอ้อมนอกวง
    const mx = (ax + bx) / 2
    const my = (ay + by) / 2
    const od = Math.hypot(mx - 50, my - 50) || 1
    const cx = 50 + ((mx - 50) / od) * (od + 10)
    const cy = 50 + ((my - 50) / od) * (od + 10)

    return { d: `M ${ax} ${ay} Q ${cx} ${cy} ${bx} ${by}`, color: b.def.color }
  })
})

/* ─────────── หน้า 04: ลำดับการวิเคราะห์ ─────────── */

const AWAKEN_STEPS = [
  { en: 'Connecting your data ...', th: 'เชื่อมโยงข้อมูลของคุณ' },
  { en: 'Finding relationships ...', th: 'ค้นหาความสัมพันธ์' },
  { en: 'Detecting patterns ...', th: 'ตรวจจับรูปแบบ' },
  { en: 'Simulating possibilities ...', th: 'จำลองความเป็นไปได้' },
  { en: 'Your MOMAY is ready ...', th: 'MOMAY ของคุณพร้อมแล้ว' },
]

/** หัวเรื่อง + ข้อความกลางวง เปลี่ยนตามขั้นที่กำลังทำ และเปลี่ยนอีกครั้งเมื่อเสร็จ */
const AWAKEN_STAGES = [
  { en: 'Connecting your data...',      th: 'กำลังเชื่อมโยงข้อมูลของคุณ',  core: ['READING', 'SIGNALS'] },
  { en: 'Finding relationships...',     th: 'กำลังค้นหาความสัมพันธ์',      core: ['FINDING', 'RELATIONSHIPS'] },
  { en: 'Detecting patterns...',        th: 'กำลังตรวจจับรูปแบบ',          core: ['DETECTING', 'PATTERNS'] },
  { en: 'Simulating possibilities...',  th: 'กำลังจำลองความเป็นไปได้',     core: ['SIMULATING', 'SCENARIOS'] },
  { en: 'Your MOMAY is ready.',         th: 'MOMAY ของคุณพร้อมแล้ว กดต่อไปเพื่อดูผลลัพธ์', core: ['MOMAY', 'READY'] },
]

const awakenAt = ref(0)
const awakenDone = computed(() => awakenAt.value >= AWAKEN_STEPS.length)
const stage = computed(() => AWAKEN_STAGES[Math.min(awakenAt.value, AWAKEN_STAGES.length - 1)])
let awakenTimer: ReturnType<typeof setInterval> | null = null

function stopAwaken() {
  if (awakenTimer) clearInterval(awakenTimer)
  awakenTimer = null
}

function startAwaken() {
  stopAwaken()
  awakenAt.value = 0
  awakenTimer = setInterval(() => {
    if (awakenAt.value >= AWAKEN_STEPS.length) stopAwaken()
    else awakenAt.value += 1
  }, 850)
}

watch(step, s => (s === 4 ? startAwaken() : stopAwaken()))
onBeforeUnmount(stopAwaken)

/* ─────────── การเดินหน้า ─────────── */

const progressPct = computed(() => (step.value / TOTAL) * 100)
const sliderPct = computed(() => ((form.delta + 20) / 60) * 100)

const canAdvance = computed(() => {
  if (step.value === 2) return form.people > 0 && form.capacity > 0 && form.energy > 0
  if (step.value === 3) return loadSignals.value.length > 0
  if (step.value === 4) return awakenAt.value >= AWAKEN_STEPS.length
  return true
})

const STEP_TAGS = [
  'Let your data<br>explain MOMAY.',
  'Just a few numbers.<br>A lot more insights.',
  'Choose what matters.<br>MOMAY connects the rest.',
  'Turning your data<br>into new perspectives.',
  'From data to insight.<br>In seconds.',
  'See the bigger picture.',
  'What if?<br>See tomorrow, today.',
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
function prev() {
  step.value = Math.max(1, step.value - 1)
  scrollTop()
}
function restart() {
  step.value = 1
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
    o: form.org,
    p: String(form.people),
    c: String(form.capacity),
    e: String(form.energy),
    s: form.signals.join(','),
    k: form.peak,
    sc: form.scenario,
    d: String(form.delta),
    step: '8',
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

  if (q.has('d')) {
    const d = Number(q.get('d'))
    if (Number.isFinite(d)) form.delta = Math.min(40, Math.max(-20, Math.round(d / 5) * 5))
  }

  const st = Number(q.get('step'))
  if (Number.isFinite(st) && st >= 1 && st <= TOTAL) {
    step.value = st
    if (st === 4) startAwaken()
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

  min-height: 100dvh;
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
  content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(79, 216, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(79, 216, 255, 0.05) 1px, transparent 1px);
  background-size: 48px 48px;
  -webkit-mask-image: radial-gradient(90% 65% at 50% 0%, #000 0%, transparent 78%);
  mask-image: radial-gradient(90% 65% at 50% 0%, #000 0%, transparent 78%);
}

.app { position: relative; z-index: 1; display: flex; flex-direction: column; min-height: 100dvh; }
.brand-bar, .progbar, .nav { flex: none; }
.body { flex: 1 1 auto; padding: 0 18px; display: flex; flex-direction: column; }
.screen { flex: 1 1 auto; padding-bottom: 8px; }

/* หน้าที่ต้องกระจายเนื้อหาให้เต็มความสูงจอ (ระยะว่างไปอยู่ที่ margin auto) */
.screen-fill { display: flex; flex-direction: column; }
.screen-fill .flag { margin-top: 18px; }
.screen-fill .peak-badge { margin-top: auto; }
.screen-fill .tiles { margin-top: auto; }

/* ── แบรนด์ ── */
.brand-bar { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; padding: 16px 18px 12px; }
.logo { display: flex; align-items: baseline; gap: 7px; }
.logo-main { font-weight: 800; font-size: 15px; letter-spacing: 0.08em; }
.logo-script {
  font-family: 'Great Vibes', cursive;
  font-size: 23px;
  line-height: 1;
  background: linear-gradient(95deg, #ff8ad4 0%, #a78bfa 45%, #4fd8ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.tag { font-size: 9.5px; line-height: 1.45; text-align: right; color: var(--dim); max-width: 150px; }

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
.list-title { margin: 22px 0 12px; font-size: 13px; font-weight: 700; letter-spacing: 0.02em; }

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
.screen-photo { position: fixed; inset: 0; z-index: -1; pointer-events: none; opacity: 0.5; }
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
.ring-wrap.relations { max-width: 360px; }
/* วงหน้า 04 ใช้เมืองโฮโลแกรม SVG อย่างเดียว ไม่ใช้ภาพถ่าย */
.ring-bg { position: absolute; inset: 6%; border-radius: 50%; opacity: 0.55; }

/* ── เมืองโฮโลแกรมในวง ── */
.holo-city {
  position: absolute; inset: 6%; width: 88%; height: 88%;
  border-radius: 50%; overflow: hidden; pointer-events: none;
  opacity: 0.6;
}
.holo-grid line { stroke: rgba(79, 216, 255, 0.13); stroke-width: 0.45; }
.holo-bld rect { stroke: rgba(120, 232, 255, 0.34); stroke-width: 0.45; }
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
.ring-lines .arc { fill: none; stroke: rgba(111, 224, 255, 0.65); stroke-width: 0.6; }

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
  font-size: 21px; font-weight: 700; letter-spacing: 0.02em;
  color: #ffffff; text-align: center; white-space: nowrap;
  text-shadow: 0 0 22px rgba(79, 216, 255, 0.55), 0 2px 14px rgba(0, 0, 0, 0.85);
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
  padding: 8px 15px 8px calc(var(--dot) / 2 + 13px);
  border-radius: 999px;
  background: rgba(5, 16, 31, 0.86);
  border: 1px solid color-mix(in srgb, var(--sig) 52%, transparent);
  box-shadow:
    0 0 20px color-mix(in srgb, var(--sig) 20%, transparent),
    inset 0 0 20px rgba(4, 14, 28, 0.55);
  line-height: 1.25;
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
.node-label { font-size: 12px; font-weight: 600; color: #eaf5ff; white-space: nowrap; }
.node-val { font-size: 12px; font-weight: 700; color: var(--sig); }

/* ── หน้า 06: โหนดเป็นวงกลม มีไอคอน ชื่อ และตัวเลขอยู่ในวง ── */
.rel-node {
  --bub: 84px;
  position: absolute; transform: translate(-50%, -50%);
  display: grid; place-content: center; justify-items: center; gap: 1px;
  width: var(--bub); height: var(--bub); border-radius: 50%;
  background: radial-gradient(closest-side, rgba(6, 20, 38, 0.96), rgba(5, 14, 28, 0.88));
  border: 2px solid var(--sig);
  box-shadow:
    0 0 22px color-mix(in srgb, var(--sig) 40%, transparent),
    inset 0 0 22px color-mix(in srgb, var(--sig) 12%, transparent);
  color: var(--sig);
  animation: nodeIn 0.55s cubic-bezier(0.2, 0.9, 0.3, 1.3) backwards;
  animation-delay: calc(var(--i, 0) * 0.09s);
}
.rel-node.lead { --bub: 96px; }
.rel-node :deep(.ic) { width: 24px; height: 24px; }
.rel-node.lead :deep(.ic) { width: 28px; height: 28px; }
.rel-label { font-size: 12px; font-weight: 600; color: #eaf5ff; white-space: nowrap; }
.rel-val { font-size: 13px; font-weight: 800; color: var(--sig); white-space: nowrap; }
.rel-node.lead .rel-label { font-size: 13px; }
.rel-node.lead .rel-val { font-size: 15px; }

.awakening .node-dot { animation: nodeGlow 2.4s ease-in-out infinite; animation-delay: calc(var(--i, 0) * 0.2s); }
@keyframes nodeGlow {
  0%, 100% { opacity: 0.6; box-shadow: 0 0 8px color-mix(in srgb, var(--sig) 25%, transparent); }
  50% { opacity: 1; box-shadow: 0 0 20px color-mix(in srgb, var(--sig) 65%, transparent); }
}
/* วิเคราะห์เสร็จ — ทุกโหนดสว่างค้าง วงโคจรหมุนเร็วขึ้นสั้น ๆ */
.ring-wrap.ready .node-dot {
  animation: none; opacity: 1;
  box-shadow: 0 0 24px color-mix(in srgb, var(--sig) 70%, transparent);
}
.ring-wrap.ready .core-halo { border-color: rgba(52, 211, 153, 0.45); box-shadow: inset 0 0 40px rgba(52, 211, 153, 0.18); }

/* หัวเรื่องเปลี่ยนข้อความแบบเฟด */
.stage-head { min-height: 76px; }
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
.flag-en { font-size: 12.5px; font-weight: 700; line-height: 1.45; color: #ffc9c9; }
.flag-th { margin-top: 5px; font-size: 10.5px; line-height: 1.6; color: #e4a9a9; }

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
  padding: 10px 6px; border-radius: 10px; font-size: 11.5px; cursor: pointer;
  background: rgba(10, 25, 44, 0.55); border: 1px solid var(--line); color: var(--muted);
}
.scn-tab.on { border-color: var(--brand); color: #dcefff; background: rgba(23, 66, 116, 0.55); }

.slider-box { margin-top: 18px; padding: 15px; border-radius: 14px; background: var(--card); border: 1px solid var(--line); }
.slider-head {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  font-size: 11.5px; color: var(--muted);
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

.table-wrap { margin-top: 16px; border-radius: 14px; overflow-x: auto; background: var(--card); border: 1px solid var(--line); }
.sim-table { width: 100%; border-collapse: collapse; font-size: 11.5px; white-space: nowrap; }
.sim-table th, .sim-table td { padding: 10px 11px; text-align: right; }
.sim-table th:first-child, .sim-table td:first-child { text-align: left; }
.sim-table thead th { font-size: 10px; font-weight: 600; color: var(--dim); background: rgba(6, 18, 34, 0.7); }
.sim-table tbody tr + tr { border-top: 1px solid rgba(66, 133, 199, 0.14); }
.sim-table tbody td { font-variant-numeric: tabular-nums; color: #d6e7f8; }
.sim-table td.over { color: var(--danger); font-weight: 700; }
.sim-table td.up { color: var(--good); }
.sim-table td.down { color: #7fb6ff; }
.cell-ic { display: inline-grid; place-items: center; vertical-align: -4px; margin-right: 7px; color: var(--sig); }
.cell-ic :deep(.ic) { width: 14px; height: 14px; }

/* ── 08 ── */
.reco { display: flex; gap: 12px; margin-top: 20px; align-items: flex-start; }
.pill { flex: none; padding: 4px 10px; border-radius: 7px; font-size: 9.5px; font-weight: 800; letter-spacing: 0.05em; }
.pill.priority { background: rgba(34, 197, 94, 0.18); color: #6ee7a0; border: 1px solid rgba(34, 197, 94, 0.4); }
.pill.critical { background: rgba(240, 82, 82, 0.18); color: #ff9d9d; border: 1px solid rgba(240, 82, 82, 0.45); }
.pill.watch { background: rgba(62, 160, 255, 0.16); color: #8ecbff; border: 1px solid var(--line-on); }
.reco-en { font-size: 14px; font-weight: 800; line-height: 1.35; }
.reco-th { margin-top: 6px; font-size: 11px; line-height: 1.6; color: var(--muted); }

.why { display: flex; gap: 12px; margin-top: 20px; align-items: flex-start; }
.why-k { flex: none; font-size: 12px; font-weight: 800; color: var(--brand); }
.why-en { font-size: 11.5px; line-height: 1.5; color: #c6dbf0; }
.why-th { margin-top: 5px; font-size: 10.5px; line-height: 1.6; color: var(--dim); }

.impacts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 9px; }
.impact {
  display: flex; flex-direction: column; align-items: center; gap: 7px; text-align: center;
  padding: 13px 7px; border-radius: 12px; font-size: 9.5px; line-height: 1.35;
  background: var(--card); border: 1px solid var(--line);
}
.impact.good { color: #6ee7a0; border-color: rgba(34, 197, 94, 0.32); }
.impact.warn { color: #ff9d9d; border-color: rgba(240, 82, 82, 0.32); }

.closing {
  display: flex; gap: 12px; align-items: center; margin-top: 20px; padding: 16px;
  border-radius: 14px; background: rgba(23, 66, 116, 0.36); border: 1px solid var(--line-on);
}
.closing-ic { color: #6ee7a0; }
.closing p { font-size: 12px; line-height: 1.55; color: #d6e7f8; }

.final-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 26px; }
.share-link {
  display: block; width: 100%; margin: 16px 0 30px; padding: 6px;
  font-size: 11.5px; color: var(--brand); text-decoration: underline; text-underline-offset: 3px; cursor: pointer;
}

/* ── ปุ่ม / แถบล่าง ── */
.nav {
  position: sticky; bottom: 0; z-index: 5;
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 16px 18px 22px;
  background: linear-gradient(180deg, rgba(3, 11, 24, 0) 0%, var(--bg) 46%);
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

.btn-back { display: inline-flex; align-items: center; gap: 7px; font-size: 12.5px; color: var(--muted); cursor: pointer; }
.btn-back:hover { color: #cfe3f7; }
.btn-back :deep(.ic) { width: 15px; height: 15px; }

/* ── แนวนอน / จอกว้าง ── */
@media (min-width: 900px) {
  .brand-bar, .progbar, .nav { max-width: 1040px; margin-inline: auto; width: 100%; }
  .body { max-width: 1040px; margin-inline: auto; width: 100%; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: start; margin-top: 22px; }
  .cols-cover { align-items: stretch; }
  .cols-awaken { align-items: center; }
  .cover { margin: 0; height: 100%; }
  .cover-img { height: 100%; min-height: 330px; }
  .h-en { font-size: 34px; }
  .h-en.upper { font-size: 28px; }
  .sig-grid { grid-template-columns: repeat(6, 1fr); }
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
  .rel-node { --bub: 66px; }
  .rel-node.lead { --bub: 76px; }
  .rel-node :deep(.ic) { width: 18px; height: 18px; }
  .rel-label { font-size: 10px; }
  .rel-val { font-size: 11px; }
  .stage-head { min-height: 0; }
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

/* เคารพการตั้งค่าลดการเคลื่อนไหวของเครื่อง */
@media (prefers-reduced-motion: reduce) {
  .momay-demo *, .momay-demo *::before, .momay-demo *::after {
    animation-duration: 0.001s !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001s !important;
  }
}

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
