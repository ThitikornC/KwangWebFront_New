<!--
  MOMAY Surprise (V2) — /SurpriseV220926

  ยกมาจาก MomaySurpriseOrganize.vue ทั้งไฟล์ ต่างกันที่เดียวคือปลายทางของปุ่มกลาง
  บนหน้าผลลัพธ์ (ดู citizenHref):

    ห้องสมุด  → /momay-student/           แดชบอร์ดนักศึกษาสไตล์ 8-bit
    คณะ       → /momay-student-faculty/   มุมมองนักศึกษาของคณะ ใช้ engine ผังเดียวกับหน้านี้
    โซลาร์    → /momay-citizen/           ไม่แปลผล ใช้ข้อมูลตัวอย่าง
    ที่เหลือ  → /momay-citizen/           พร้อมคำตอบจากแบบสอบถาม

  หน้าเดิมยังทำงานเหมือนเดิมทุกอย่าง (ห้องสมุดไปหน้า CITIZEN แบบไม่แปลผล)
  แก้ตรรกะที่นั่นแล้วต้องตามมาแก้ที่นี่ด้วย — จงใจแลกความซ้ำกับการไม่กระทบหน้าที่ใช้อยู่
-->
<template>
  <div class="momay-demo" :class="org.theme ? 'theme-' + org.theme : null">
    <!-- ── ชุดไล่สีของดวงความหนาแน่น ──
         อยู่ตรงนี้ตัวเดียวเพราะผังคณะถูกวาดสองที่ (จอวิเคราะห์กับแผง 05)
         ถ้าประกาศซ้ำในแต่ละ <svg> จะได้ id ชนกันตอนสองจอซ้อนกันชั่วขณะระหว่างเปลี่ยนหน้า

         แต่ละชั้นไล่จากแกนสีจัดออกไปจนโปร่งใส ดวงที่ทับกันจึงรวมเป็นปื้นเดียว
         ไม่ใช่วงรีซ้อนกันเป็นชั้น ๆ -->
    <svg class="fac-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="facGradHot">
          <stop offset="0%" stop-color="#c8140d" stop-opacity="0.97" />
          <stop offset="14%" stop-color="#e42a12" stop-opacity="0.95" />
          <stop offset="27%" stop-color="#f44e15" stop-opacity="0.9" />
          <stop offset="42%" stop-color="#fb7a16" stop-opacity="0.82" />
          <stop offset="58%" stop-color="#fda616" stop-opacity="0.68" />
          <stop offset="74%" stop-color="#fecb1d" stop-opacity="0.47" />
          <stop offset="88%" stop-color="#ffe558" stop-opacity="0.22" />
          <stop offset="100%" stop-color="#fff3b4" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="facGradWarm">
          <stop offset="0%" stop-color="#f4520f" stop-opacity="0.94" />
          <stop offset="18%" stop-color="#fa7513" stop-opacity="0.9" />
          <stop offset="38%" stop-color="#fd9b16" stop-opacity="0.8" />
          <stop offset="58%" stop-color="#fec01d" stop-opacity="0.62" />
          <stop offset="80%" stop-color="#ffdf4b" stop-opacity="0.32" />
          <stop offset="100%" stop-color="#fff0a8" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="facGradMild">
          <stop offset="0%" stop-color="#fda516" stop-opacity="0.9" />
          <stop offset="26%" stop-color="#fec11d" stop-opacity="0.82" />
          <stop offset="55%" stop-color="#fdd93a" stop-opacity="0.62" />
          <stop offset="80%" stop-color="#feea78" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#fef7c8" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>

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
                <template v-for="o in orgList" :key="o.id">
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
                        <!-- ห้องสมุด: ข้อความนำ บอกตั้งแต่ต้นว่ากรอกแค่สามช่องก็พอ
                             ไม่ใส่ภาพซ้ำตรงนี้ เพราะภาพปกฝั่งซ้ายเป็นรูปห้องสมุดใบเดียวกันอยู่แล้ว
                             หมวดอื่นยังขึ้นหัวข้อเป็นตัวหนังสือเหมือนเดิม -->
                        <div v-if="o.id === 'library'" class="q-intro font-thai">
                          <b>เพียง 3 ข้อมูลง่าย ๆ</b>
                          <span>MOMAY จะค้นหาความสัมพันธ์และมุมมองใหม่ให้คุณ</span>
                        </div>

                        <!-- คณะ: บอกตั้งแต่ต้นเช่นกันว่ากรอกแค่สามช่องก็เริ่มได้ -->
                        <div v-else-if="o.id === 'faculty'" class="q-intro font-thai">
                          <b>บอกข้อมูลพื้นฐานของคณะ</b>
                          <span>เพียง 3 ข้อมูล เพื่อให้ MOMAY เข้าใจภาพรวมเบื้องต้น</span>
                        </div>

                        <template v-else>
                          <!-- ตัวเลขพื้นฐานของพื้นที่ -->
                          <p class="dd-title">
                            Tell us a little about <span class="accent">your {{ o.subject }}</span>
                          </p>
                          <p class="dd-sub font-thai">บอกเราเล็กน้อยเกี่ยวกับพื้นที่ของคุณ</p>
                        </template>

                        <div class="field-list">
                          <div v-for="f in fieldList" :key="f.key" class="field">
                            <span class="field-ic" :style="{ '--sig': FIELD_COLORS[f.key] }"><Ico :name="f.icon" /></span>
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

                        <!-- ── ห้องสมุด: เลือกสิ่งที่อยากให้ช่วยดู ──
                             ตารางของตัวเอง ไม่ใช่ signal กลาง เพราะห้องสมุดไม่ได้ดูจราจร/ที่จอด
                             แต่ดูที่นั่ง โซน การจองห้อง และอากาศในอาคาร -->
                        <template v-if="o.id === 'library'">
                          <p class="dd-title dd-gap font-thai">เลือกสิ่งที่ต้องการเข้าใจ</p>
                          <p class="dd-sub font-thai">คุณอยากให้ MOMAY ช่วยวิเคราะห์เรื่องใดบ้าง? (เลือกได้มากกว่า 1 ข้อ)</p>

                          <div class="foc-grid">
                            <button
                              v-for="fc in LIB_FOCUS"
                              :key="fc.id"
                              type="button"
                              class="foc"
                              :class="{ on: form.libFocus.includes(fc.id) }"
                              :style="{ '--sig': fc.color }"
                              @click="toggleFocus(fc.id)"
                            >
                              <span class="foc-ic"><Ico :name="fc.icon" /></span>
                              <span class="foc-txt">
                                <span class="foc-th font-thai">{{ fc.th }}</span>
                                <span class="foc-en">({{ fc.en }})</span>
                              </span>
                              <span v-if="form.libFocus.includes(fc.id)" class="foc-check"><Ico name="check" /></span>
                            </button>
                          </div>

                          <p class="dd-title dd-gap font-thai">ช่วงเวลาที่มีผู้ใช้มากที่สุด</p>
                          <div class="lpk-row">
                            <button
                              v-for="pk in LIB_PEAKS"
                              :key="pk.id"
                              type="button"
                              class="lpk"
                              :class="{ on: form.libPeak === pk.id }"
                              @click="form.libPeak = pk.id"
                            >
                              <span class="lpk-ic"><Ico :name="pk.icon" /></span>
                              <span class="lpk-th font-thai">{{ pk.th }}</span>
                              <span class="lpk-win">({{ pk.window }})</span>
                              <span v-if="form.libPeak === pk.id" class="lpk-check"><Ico name="check" /></span>
                            </button>
                          </div>
                        </template>

                        <!-- ── คณะ: เลือกหัวข้อที่อยากให้วิเคราะห์ ──
                             ตารางของตัวเอง ไม่ใช่ signal กลาง เพราะคณะไม่ได้ดูจราจร/ที่จอด
                             แต่ดูการเรียนการสอน การใช้พื้นที่ กิจกรรม และทรัพยากร -->
                        <template v-if="o.id === 'faculty'">
                          <p class="dd-title dd-gap font-thai">เลือกหัวข้อที่ต้องการวิเคราะห์</p>
                          <p class="dd-sub font-thai">เลือกได้มากกว่า 1 ข้อ (แนะนำ {{ FAC_FOCUS_MIN }}–{{ FAC_FOCUS_HINT_MAX }} หัวข้อ)</p>

                          <div class="foc-grid foc-grid--fac">
                            <button
                              v-for="fc in FAC_FOCUS"
                              :key="fc.id"
                              type="button"
                              class="foc"
                              :class="{ on: form.facFocus.includes(fc.id) }"
                              :style="{ '--sig': fc.color }"
                              @click="toggleFacFocus(fc.id)"
                            >
                              <span class="foc-ic"><Ico :name="fc.icon" /></span>
                              <span class="foc-txt">
                                <span class="foc-th font-thai">{{ fc.th }}</span>
                                <span class="foc-en">{{ fc.en }}</span>
                              </span>
                              <span v-if="form.facFocus.includes(fc.id)" class="foc-check"><Ico name="check" /></span>
                            </button>
                          </div>

                          <p class="dd-title dd-gap font-thai">ช่วงเวลาที่ต้องการให้เน้นเป็นพิเศษ</p>
                          <div class="lpk-row lpk-row--fac">
                            <button
                              v-for="pk in FAC_PEAKS"
                              :key="pk.id"
                              type="button"
                              class="lpk"
                              :class="{ on: form.facPeak === pk.id }"
                              @click="form.facPeak = pk.id"
                            >
                              <span class="lpk-ic"><Ico :name="pk.icon" /></span>
                              <span class="lpk-th font-thai">{{ pk.th }}</span>
                              <!-- บอกเวลาจริงไปเลย ไม่ใช่แค่ชื่อช่วง
                                   "เช้า" ของแต่ละคนไม่ตรงกัน แต่ 08:00 – 11:00 ตรงกันแน่นอน
                                   และเป็นเลขชุดเดียวกับที่จะไปโผล่ในผลลัพธ์ เพราะคิดจากฟังก์ชันเดียวกัน -->
                              <span class="lpk-time">{{ facPeakWindow(pk) }}</span>
                              <span class="lpk-win">{{ pk.en }}</span>
                              <span v-if="form.facPeak === pk.id" class="lpk-check"><Ico name="check" /></span>
                            </button>
                          </div>
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

                        <!-- ช่วงเวลาหนาแน่น — ห้องสมุดถามไปแล้วด้านบนด้วยตัวเลือกของตัวเอง -->
                        <p v-if="!ownPeakOrg(o.id)" class="dd-title dd-gap font-thai">ช่วงไหนของวันที่คนเยอะที่สุด?</p>
                        <!-- ใช้หน้าตาชุดเดียวกับของห้องสมุด: ไอคอน + ชื่อช่วง + กรอบเวลา
                             เวลาที่แสดงมาจาก PEAKS ของแต่ละหมวด จึงไม่ใช่ชุดเดียวกับห้องสมุด -->
                        <div v-if="!ownPeakOrg(o.id)" class="lpk-row">
                          <button
                            v-for="pk in PEAKS"
                            :key="pk.id"
                            type="button"
                            class="lpk"
                            :class="{ on: form.peak === pk.id }"
                            @click="form.peak = pk.id"
                          >
                            <span class="lpk-ic"><Ico :name="PEAK_ICONS[pk.id]" /></span>
                            <span class="lpk-th font-thai">{{ pk.th }}</span>
                            <span class="lpk-win">({{ pk.window }})</span>
                            <span v-if="form.peak === pk.id" class="lpk-check"><Ico name="check" /></span>
                          </button>
                        </div>

                        <!-- ปุ่มไปต่อท้ายดร๊อปดาวน์ กรอกเสร็จกดได้เลยไม่ต้องเลื่อนลงไปท้ายหน้า -->
                        <div class="dd-next" :class="{ 'dd-next--wide': ownPeakOrg(o.id) }">
                          <button
                            type="button"
                            class="btn-next font-thai"
                            :class="{ 'btn-next--grad': ownPeakOrg(o.id) }"
                            :disabled="!canAdvance"
                            @click="next"
                          >{{ ownPeakOrg(o.id) ? 'วิเคราะห์ให้เลย' : 'ต่อไป' }} <Ico name="arrow-right" /></button>
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
        <section v-else-if="step === 2" key="s2" class="screen" :class="{ 'screen-lw': isLibrary || isFaculty }">
          <!-- ครอบด้วยกล่องที่ไม่ถูกถอดออก เพื่อจองความสูงไว้ตอนสลับข้อความ
               ไม่งั้นช่วงที่โหนดเก่าออกแล้วโหนดใหม่ยังไม่เข้า หน้าจะหดแล้วเด้งกลับ -->
          <!-- ห้องสมุดใช้หัวข้อนิ่ง ความคืบหน้าไปอยู่ที่เช็กลิสต์กับแถบด้านล่างแทน
               หมวดอื่นยังสลับหัวข้อไปตามขั้นที่กำลังทำ -->
          <div v-if="isLibrary" class="lw-head">
            <h2 class="h-th-lead center font-thai">กำลังวิเคราะห์ข้อมูลของคุณ</h2>
            <p class="h-en-sub center">Awakening</p>
          </div>

          <div v-else-if="isFaculty" class="lw-head">
            <h2 class="h-th-lead center font-thai">กำลังเชื่อมโยงข้อมูล เพื่อเข้าใจคณะของคุณ...</h2>
            <p class="h-en-sub center">Awakening</p>
          </div>

          <div v-else class="stage-slot">
            <Transition name="stage" mode="out-in">
              <div :key="stage.en" class="stage-head">
                <h2 class="h-en center glow">{{ stage.en }}</h2>
                <p class="h-th center font-thai">{{ stage.th }}</p>
              </div>
            </Transition>
          </div>

          <!-- ══ ห้องสมุด: อาคารไอโซเมตริก + สายข้อมูล + ฟองไอคอนของสิ่งที่กำลังวิเคราะห์ ══
               หมวดอื่นยังใช้วงเมืองเดิม เพราะตัวชี้วัดคนละชุดกัน (จราจร ที่จอด ขยะ) -->
          <div v-if="isLibrary" class="lw">
            <ul class="lw-steps">
              <li
                v-for="(t, i) in awakenSteps"
                :key="t.th"
                :class="{ done: i < awakenAt, now: i === awakenAt }"
              >
                <span class="lw-mark">
                  <Ico v-if="i < awakenAt" name="check" />
                  <span v-else-if="i === awakenAt" class="spin" />
                  <span v-else class="hollow" />
                </span>
                <span class="lw-text font-thai">{{ t.th }}</span>
              </li>
            </ul>

            <div class="lw-art">
              <!-- ตัวอาคารเป็นภาพจริง (ไอโซเมตริกตอนกลางคืน ตัดพื้นหลังออกแล้ว) แทนที่ตึกที่เคยวาดด้วย SVG
                   สายข้อมูล/คลื่นที่ฐาน/ฟองไอคอน ยังเป็นชั้นซ้อนทับอยู่เหมือนเดิม -->
              <img class="lw-photo" src="/momay/lib-iso-building.webp" alt="" aria-hidden="true" />
              <svg class="lw-svg" viewBox="0 0 400 279" aria-hidden="true">
                <defs>
                  <!-- สายข้อมูลไล่สีคนละเส้น ให้ดูเหมือนคนละกระแสที่ไหลเข้าหาอาคาร -->
                  <linearGradient id="lwFlow1" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stop-color="#22c55e" stop-opacity="0" />
                    <stop offset="45%" stop-color="#22c55e" stop-opacity="0.85" />
                    <stop offset="100%" stop-color="#a855f7" stop-opacity="0.1" />
                  </linearGradient>
                  <linearGradient id="lwFlow2" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stop-color="#a855f7" stop-opacity="0" />
                    <stop offset="50%" stop-color="#d946ef" stop-opacity="0.85" />
                    <stop offset="100%" stop-color="#f472b6" stop-opacity="0.1" />
                  </linearGradient>
                  <linearGradient id="lwFlow3" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stop-color="#38bdf8" stop-opacity="0" />
                    <stop offset="55%" stop-color="#22d3ee" stop-opacity="0.75" />
                    <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.12" />
                  </linearGradient>
                  <radialGradient id="lwGlow" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.3" />
                    <stop offset="100%" stop-color="#38bdf8" stop-opacity="0" />
                  </radialGradient>
                </defs>

                <ellipse class="lw-shadow" cx="195" cy="182" rx="200" ry="92" fill="url(#lwGlow)" />

                <!-- วงคลื่นที่ฐาน แผ่ออกเป็นจังหวะ ให้รู้สึกว่าอาคารกำลัง "ทำงาน" อยู่ -->
                <ellipse class="lw-pulse" cx="195" cy="179" rx="145" ry="62" />
                <ellipse class="lw-pulse lw-pulse--2" cx="195" cy="179" rx="145" ry="62" />

                <!-- สายข้อมูลพาดหน้าภาพอาคาร โค้งอ้อมจากฐานซ้ายขึ้นไปทางขวาบน
                     ความทึบต่ำพอให้ดูเหมือนลำแสงที่ไหลผ่าน ไม่บังตัวตึก -->
                <g class="lw-flows">
                  <path d="M -24 172 C 22 244 118 276 208 256 C 302 236 368 172 424 108" stroke="url(#lwFlow1)" />
                  <path d="M -24 124 C 54 176 132 196 220 158 C 312 118 374 66 424 30" stroke="url(#lwFlow2)" />
                  <path d="M -24 212 C 42 266 152 286 252 260 C 340 238 390 202 424 174" stroke="url(#lwFlow3)" />
                </g>
              </svg>

              <!-- ประกายลอยขึ้นรอบอาคาร -->
              <span
                v-for="(s, i) in LW_SPARKS"
                :key="'sp' + i"
                class="lw-spark"
                :style="{
                  left: s.x + '%', bottom: s.b + '%',
                  '--sz': s.size + 'px',
                  animationDelay: s.delay + 's',
                  animationDuration: s.dur + 's',
                }"
              />

              <!-- ฟองไอคอน: สิ่งที่ MOMAY กำลังอ่านอยู่ ไล่ขึ้นมาทีละดวงตามความคืบหน้า
                   ดวงแรกขึ้นตั้งแต่วินาทีแรก ไม่งั้นช่วงเริ่มต้นภาพจะโล่งไปทั้งฝั่ง -->
              <span
                v-for="(b, i) in LW_BUBBLES"
                :key="b.icon"
                class="lw-bubble"
                :class="{ on: awakenAt * 1.4 + 1 > i }"
                :style="{ left: b.x + '%', top: b.y + '%', '--sig': b.color, '--i': i }"
              >
                <span class="lw-bubble__ring" />
                <Ico :name="b.icon" />
              </span>
            </div>

            <div class="lw-foot">
              <div class="lw-bar"><span :style="{ width: awakenPct + '%' }" /></div>
              <p class="lw-ready">Your Library MOMAY is ready.</p>
              <p class="lw-sub">From Data to New Possibilities.</p>
            </div>
          </div>

          <!-- ══ คณะ: ผังคณะไอโซเมตริกชุดเดียวกับแผง 05 กำลังถูกไล่อ่านทีละโซน ══
               เดิมหมวดนี้ตกไปใช้วงเมืองของหมวดกลาง ซึ่งเป็นตัวชี้วัดคนละชุด
               (จราจร · ที่จอดรถ · ขยะ) และเป็นโทนฟ้า ไม่ใช่เรื่องของคณะเลย -->
          <div v-else-if="isFaculty" class="lw">
            <ul class="lw-steps">
              <li
                v-for="(t, i) in awakenSteps"
                :key="t.th"
                :class="{ done: i < awakenAt, now: i === awakenAt }"
              >
                <span class="lw-mark">
                  <Ico v-if="i < awakenAt" name="check" />
                  <span v-else-if="i === awakenAt" class="spin" />
                  <span v-else class="hollow" />
                </span>
                <span class="lw-text">
                  <b>{{ t.en }}</b>
                  <span class="font-thai">{{ t.th }}</span>
                </span>
              </li>
            </ul>

            <div class="lw-art fw-art">
              <svg
                class="fw-svg"
                :viewBox="`0 0 ${facReport.campusBox.w} ${facReport.campusBox.h}`"
                aria-hidden="true"
              >
                <defs>
                  <filter id="facWakeBlur" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1.1" />
                  </filter>
                </defs>

                <polygon class="cg-base" :points="facReport.campusGround" />
                <polygon
                  v-for="(g, n) in facReport.campusStreets"
                  :key="'wst' + n"
                  class="cg-street"
                  :points="g"
                />
                <polygon
                  v-for="(g, n) in facReport.campusRoads"
                  :key="'wstr' + n"
                  class="cg-road"
                  :points="g"
                />
                <polygon
                  v-for="(g, n) in facReport.campusLanes"
                  :key="'wstl' + n"
                  class="cg-lane"
                  :points="g"
                />
                <polygon
                  v-for="(g, n) in facReport.campusCrossings"
                  :key="'wstc' + n"
                  class="cg-cross"
                  :points="g"
                />

                <!-- อาคารทยอยสว่างขึ้นตามความคืบหน้า ให้รู้สึกว่ากำลังไล่อ่านทีละย่าน -->
                <g
                  v-for="(it, i) in facReport.campusItems"
                  :key="'fi' + i"
                  class="ci fw-b"
                  :class="[
                    it.t === 'b' ? 'cb cb--t' + it.tone : 'cg-tree cg-tree--t' + it.tone,
                    { lit: (awakenAt + 1) / awakenSteps.length > i / facReport.campusItems.length },
                  ]"
                  :style="{ '--i': i }"
                >
                  <template v-if="it.t === 'b'">
                    <polygon class="cb-left" :points="it.faceLeft" />
                    <polygon v-for="(w, k) in it.winLeft" :key="'wl' + k" class="cb-win-l" :points="w" />
                    <polygon class="cb-right" :points="it.faceRight" />
                    <polygon v-for="(w, k) in it.winRight" :key="'wr' + k" class="cb-win-r" :points="w" />
                    <polygon class="cb-top" :points="it.faceTop" />
                    <polygon class="cb-roof" :points="it.roofIn" />
                    <template v-if="it.roofBox">
                      <polygon class="cb-left" :points="it.roofBox.left" />
                      <polygon class="cb-right" :points="it.roofBox.right" />
                      <polygon class="cb-top" :points="it.roofBox.top" />
                    </template>
                  </template>
                  <template v-else>
                    <ellipse class="ct-shade" :cx="it.x" :cy="it.y" :rx="it.r * 0.78" :ry="it.r * 0.4" />
                    <polygon v-if="it.trunkPts" class="ct-trunk" :points="it.trunkPts" />
                    <circle
                      v-for="(q, k) in it.puffs"
                      :key="'pf' + k"
                      :class="'ct-l' + q.l"
                      :cx="q.cx" :cy="q.cy" :r="q.r"
                    />
                  </template>
                </g>

                <!-- ความหนาแน่นเป็นคำตอบ จึงยังไม่โผล่จนกว่าจะไล่อ่านใกล้เสร็จ -->
                <g
                  class="fmap-heat fw-heat"
                  :class="{ on: awakenAt >= awakenSteps.length - 1 }"
                  filter="url(#facWakeBlur)"
                >
                  <g
                    v-for="(z, n) in facReport.campusHeat"
                    :key="'fhbz' + n"
                    class="fmap-throb"
                    :style="{ '--d': z.delay + 's' }"
                  >
                    <ellipse
                      v-for="(g, k) in z.blobs"
                      :key="'fhb' + k"
                      :cx="g.x" :cy="g.y" :rx="g.rx" :ry="g.ry"
                      :fill="`url(#facGrad${z.tier})`" :opacity="g.opacity"
                    />
                  </g>
                </g>
              </svg>

              <span
                v-for="(sp, i) in LW_SPARKS"
                :key="'fsp' + i"
                class="lw-spark"
                :style="{
                  left: sp.x + '%', bottom: sp.b + '%',
                  '--sz': sp.size + 'px',
                  animationDelay: sp.delay + 's',
                  animationDuration: sp.dur + 's',
                }"
              />
            </div>

            <div class="lw-foot">
              <div class="lw-bar"><span :style="{ width: awakenPct + '%' }" /></div>
              <p class="lw-ready">Your Faculty MOMAY is ready.</p>
              <p class="lw-sub">From Data to New Possibilities.</p>
            </div>
          </div>

          <div v-else class="cols cols-awaken">
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
              <li v-for="(t, i) in awakenSteps" :key="t.en" :class="{ done: i < awakenAt, now: i === awakenAt }">
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
            <section class="panel panel-see" :class="{ 'panel-quiet': isLibrary || isFaculty, 'panel-light': isFaculty }">
              <!-- ภาพเมืองช่วงพีคเป็นพื้นหลังของแผงนี้ -->
              <div class="screen-photo photo-slot photo-05" />

              <!-- ห้องสมุดขึ้นหัวข้อไทยนำ พร้อมป้ายบอกว่ากำลังดูแผงไหนอยู่
                   หมวดอื่นใช้หัวข้ออังกฤษนำเหมือนเดิม -->
              <div v-if="isLibrary || isFaculty" class="p-head">
                <div>
                  <h2 class="h-th-lead font-thai">เห็นภาพรวมที่สำคัญ</h2>
                  <p class="h-en-sub">SEE — What matters now?</p>
                </div>
                <span class="p-chip">{{ isFaculty ? 'Faculty Overview' : 'Library Overview' }}</span>
              </div>
              <template v-else>
                <!-- หัวข้อใช้ร่วมกันทุกหมวด เปลี่ยนเฉพาะเนื้อในของแผง -->
                <h2 class="h-en upper">What matters now?</h2>
                <p class="h-th font-thai">ตอนนี้มีอะไรที่ต้องรู้บ้าง</p>
              </template>

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

              <!-- ── ห้องสมุด: สามตัวเลขที่ตอบได้ทันทีว่าวันนี้เป็นอย่างไร ── -->
              <template v-else-if="isLibrary">
                <div class="lk-row">
                  <div class="lk">
                    <span class="lk-k font-thai">ผู้ใช้วันนี้</span>
                    <span class="lk-v"><NumTicker :value="libReport.todayPeople" comma /></span>
                    <span class="lk-u font-thai">คน</span>
                    <span class="lk-d font-thai">
                      <Ico name="arrow-up" /> {{ libReport.peopleChange }}%
                      <small>จากสัปดาห์ก่อน</small>
                    </span>
                  </div>
                  <div class="lk">
                    <span class="lk-k font-thai">อัตราการใช้ที่นั่ง</span>
                    <span class="lk-v"><NumTicker :value="libReport.seatUsePct" suffix="%" /></span>
                    <span class="lk-u font-thai">
                      ({{ nf(libReport.seatsUsed) }} / {{ nf(libReport.seats) }})
                    </span>
                  </div>
                  <div class="lk">
                    <span class="lk-k font-thai">ห้อง/พื้นที่ใช้สูงสุด</span>
                    <span class="lk-v font-thai">ชั้น {{ libReport.busyFloor }}</span>
                    <span class="lk-u font-thai">
                      <Ico name="layers" /> {{ libReport.busyFloorPct }}%
                    </span>
                  </div>
                </div>

                <!-- ความหนาแน่นรายครึ่งชั่วโมง — สีของแท่งบอกระดับ ไม่ต้องอ่านแกนก็เห็นช่วงพีค -->
                <div class="lb-chart">
                  <p class="lb-title font-thai">ความหนาแน่นผู้ใช้ตามเวลา (วันนี้)</p>
                  <div class="lb-plot">
                    <div class="lb-yaxis">
                      <span v-for="t in [100, 75, 50, 25, 0]" :key="t">{{ t }}%</span>
                    </div>
                    <div class="lb-bars">
                      <span
                        v-for="b in libReport.bars"
                        :key="b.at"
                        class="lb-bar"
                        :style="{
                          height: (b.value * 100).toFixed(1) + '%',
                          background: b.color,
                          boxShadow: `0 0 10px ${b.color}55`,
                        }"
                        :class="{ now: Math.abs(b.at - libReport.nowHour) < 0.01 }"
                      />
                    </div>
                  </div>
                  <div class="lb-xaxis">
                    <span v-for="b in libReport.bars" :key="'x' + b.at">{{ b.label }}</span>
                  </div>
                </div>

                <div class="lb-now">
                  <span class="lb-now__ic"><Ico name="bulb" /></span>
                  <p class="font-thai">
                    <b>ตอนนี้ ({{ libReport.nowLabel }})</b><br />{{ libReport.nowTh }}
                  </p>
                  <Ico name="arrow-right" />
                </div>
              </template>

              <!-- ── คณะ: สิ่งที่ MOMAY เห็น แล้วตามด้วยตัวเลขหลักสี่ช่อง ── -->
              <template v-else-if="isFaculty">
                <div class="fi">
                  <span class="fi-ic"><Ico name="bulb" /></span>
                  <div>
                    <p class="fi-k">INSIGHT จาก MOMAY</p>
                    <p class="fi-v font-thai">{{ facReport.insightTh }}</p>
                  </div>
                </div>

                <div class="lk-row lk-row--4">
                  <div class="lk">
                    <span class="lk-v"><NumTicker :value="facReport.students" comma /></span>
                    <span class="lk-u font-thai">นักศึกษา</span>
                  </div>
                  <div class="lk">
                    <span class="lk-v"><NumTicker :value="facReport.rooms" comma /></span>
                    <span class="lk-u font-thai">พื้นที่</span>
                  </div>
                  <div class="lk">
                    <span class="lk-v"><NumTicker :value="facReport.activities" comma /></span>
                    <span class="lk-u font-thai">กิจกรรม/วัน</span>
                  </div>
                  <div class="lk">
                    <span class="lk-v lk-v--sm">Peak</span>
                    <span class="lk-u lk-u--wide">{{ facReport.peakWindow }}</span>
                  </div>
                </div>

                <div class="ftabs">
                  <button
                    type="button" class="ftab" :class="{ on: facTab === 'space' }"
                    @click="facTab = 'space'"
                  ><span class="font-thai">ภาพรวมการใช้พื้นที่</span></button>
                  <button
                    type="button" class="ftab" :class="{ on: facTab === 'time' }"
                    @click="facTab = 'time'"
                  ><span class="font-thai">ตามช่วงเวลา</span></button>
                </div>

                <!-- ผังคณะไอโซเมตริก · สองชั้นแยกหน้าที่กัน
                     ชั้นเมือง = อาคาร ถนน ต้นไม้ เป็นสีกลางทั้งผัง ทำหน้าที่เป็นฉากอย่างเดียว
                     ชั้นความร้อน = ดวงไล่สีลอยทับ บอก "ย่านไหนแน่น"
                     ที่ต้องแยกเพราะถ้าระบายสีความหนาแน่นลงตัวอาคาร สีจะทำสองหน้าที่พร้อมกัน
                     (บอกทั้งประเภทพื้นที่และความหนาแน่น) คนอ่านจะแยกไม่ออกว่าสีส้มแปลว่าอะไร -->
                <div v-if="facTab === 'space'" class="fmap">
                  <svg
                    class="fmap-svg"
                    :viewBox="`0 0 ${facReport.campusBox.w} ${facReport.campusBox.h}`"
                    aria-hidden="true"
                  >
                    <!-- ขอบดวงต้องฟุ้ง ไม่งั้นอ่านเป็นแผ่นสีวางทับ ไม่ใช่ความร้อนที่แผ่ออกมา -->
                    <defs>
                      <filter id="facHeatBlur" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1.1" />
                      </filter>
                    </defs>

                    <!-- ชั้นที่ 1 · พื้นและถนน -->
                    <polygon class="cg-base" :points="facReport.campusGround" />
                    <polygon
                      v-for="(g, n) in facReport.campusStreets"
                      :key="'cst' + n"
                      class="cg-street"
                      :points="g"
                    />
                    <polygon
                      v-for="(g, n) in facReport.campusRoads"
                      :key="'cstr' + n"
                      class="cg-road"
                      :points="g"
                    />
                    <polygon
                      v-for="(g, n) in facReport.campusLanes"
                      :key="'cstl' + n"
                      class="cg-lane"
                      :points="g"
                    />
                    <polygon
                      v-for="(g, n) in facReport.campusCrossings"
                      :key="'cstc' + n"
                      class="cg-cross"
                      :points="g"
                    />

                    <!-- ชั้นที่ 2 · อาคารกับต้นไม้ วาดเรียงตามระยะลึกสลับกันไป
                         ถ้าแยกวาดทีละชนิด ต้นไม้แถวหลังจะไปทับตึกแถวหน้า -->
                    <g
                      v-for="(it, i) in facReport.campusItems"
                      :key="'ci' + i"
                      class="ci"
                      :class="it.t === 'b' ? 'cb cb--t' + it.tone : 'cg-tree cg-tree--t' + it.tone"
                      :style="{ '--i': i }"
                    >
                      <template v-if="it.t === 'b'">
                        <polygon class="cb-left" :points="it.faceLeft" />
                        <polygon v-for="(w, k) in it.winLeft" :key="'wl' + k" class="cb-win-l" :points="w" />
                        <polygon class="cb-right" :points="it.faceRight" />
                        <polygon v-for="(w, k) in it.winRight" :key="'wr' + k" class="cb-win-r" :points="w" />
                        <polygon class="cb-top" :points="it.faceTop" />
                        <polygon class="cb-roof" :points="it.roofIn" />
                        <template v-if="it.roofBox">
                          <polygon class="cb-left" :points="it.roofBox.left" />
                          <polygon class="cb-right" :points="it.roofBox.right" />
                          <polygon class="cb-top" :points="it.roofBox.top" />
                        </template>
                      </template>
                      <template v-else>
                        <ellipse class="ct-shade" :cx="it.x" :cy="it.y" :rx="it.r * 0.78" :ry="it.r * 0.4" />
                        <polygon v-if="it.trunkPts" class="ct-trunk" :points="it.trunkPts" />
                        <circle
                          v-for="(q, k) in it.puffs"
                          :key="'pf' + k"
                          :class="'ct-l' + q.l"
                          :cx="q.cx" :cy="q.cy" :r="q.r"
                        />
                      </template>
                    </g>

                    <!-- ชั้นที่ 3 · ความหนาแน่น -->
                    <g class="fmap-heat" filter="url(#facHeatBlur)">
                      <g
                        v-for="(z, n) in facReport.campusHeat"
                        :key="'hbz' + n"
                        class="fmap-throb"
                        :style="{ '--d': z.delay + 's' }"
                      >
                        <ellipse
                          v-for="(g, k) in z.blobs"
                          :key="'hb' + k"
                          :cx="g.x" :cy="g.y" :rx="g.rx" :ry="g.ry"
                          :fill="`url(#facGrad${z.tier})`" :opacity="g.opacity"
                        />
                      </g>
                    </g>

                    <!-- ชั้นที่ 4 · วงแหวนชี้ย่านที่แน่นที่สุด
                         ขึ้นเฉพาะตอนที่ไม่มีดวงความร้อนเลย เพราะถ้ามีดวง แกนแดงที่เข้มสุด
                         ก็ชี้จุดนั้นอยู่แล้วในตัว วงแหวนซ้อนทับไปจะกลายเป็นป้ายห้ามเข้า
                         บังแกนสีที่เป็นข้อมูลจริง เหลือไว้ใช้ตอนผังเย็นสนิทซึ่งไม่มีอะไรชี้ -->
                    <template v-if="!facReport.campusHeat.length">
                      <ellipse
                        class="fmap-ring-halo fmap-ring-halo--calm"
                        :cx="facReport.campusRing.x" :cy="facReport.campusRing.y" rx="11" ry="6"
                      />
                      <ellipse class="fmap-ring" :cx="facReport.campusRing.x" :cy="facReport.campusRing.y" rx="11" ry="6" />
                      <ellipse class="fmap-ring fmap-ring--2" :cx="facReport.campusRing.x" :cy="facReport.campusRing.y" rx="11" ry="6" />
                    </template>
                  </svg>

                  <!-- ป้ายไปอยู่มุมบนซ้ายซึ่งเป็นที่ว่างเสมอ (ผังเป็นทรงข้าวหลามตัด มุมจึงโล่ง)
                       เดิมผูกป้ายไว้กับพิกัดก้อนที่ร้อนที่สุด แล้วป้ายไปบังก้อนนั้นเองเวลาจุดร้อนอยู่กลางผัง -->
                  <!-- คณะที่ยังโล่งไม่มีก้อนไหนร้อน ป้ายจึงห้ามพูดว่า "หนาแน่นสูง"
                       วงแหวนยังมีประโยชน์อยู่เพราะชี้จุดที่แน่นสุดในผัง แต่ต้องเปลี่ยนคำ
                       ให้ตรงกับสิ่งที่ผังแสดงจริง ไม่งั้นป้ายเตือนภัยบนผังที่เย็นสนิท -->
                  <p class="fmap-tip font-thai" :class="{ 'fmap-tip--calm': !facReport.campusHeat.length }">
                    <i />{{ facReport.campusHeat.length ? 'พื้นที่ที่มีความหนาแน่นสูง' : 'จุดที่แน่นที่สุดในผัง' }}
                    <br /><small>{{ facReport.campusHeat.length ? facReport.peakWindow : 'ยังไม่มีพื้นที่ที่หนาแน่น' }}</small>
                  </p>

                  <!-- แถบไล่สีบอกว่าสีไหนคือหนาแน่นแค่ไหน + จำนวนพื้นที่รายประเภท -->
                  <div class="fmap-scale font-thai"><span>ต่ำ</span><i /><span>สูง</span></div>
                  <ul class="fmap-key">
                    <!-- ตัวผังเป็นสีกลางแล้ว จุดสีตรงนี้จึงกลับมาหมายถึง "ประเภทพื้นที่" ได้
                         และเป็นชุดเดียวกับสีเส้นในแผง 07 -->
                    <li v-for="z in facReport.zones" :key="'k' + z.th">
                      <i :style="{ background: z.color }" />
                      <span class="font-thai">{{ z.th }}</span>
                      <b class="font-thai">{{ z.rooms }}</b>
                    </li>
                  </ul>
                </div>

                <!-- ตามช่วงเวลา — ใช้แท่งชุดเดียวกับห้องสมุด แต่ค่ามาจากเอนจินของคณะ -->
                <div v-else class="lb-chart">
                  <div class="lb-plot">
                    <div class="lb-yaxis">
                      <span v-for="t in [100, 75, 50, 25, 0]" :key="t">{{ t }}%</span>
                    </div>
                    <div class="lb-bars">
                      <span
                        v-for="hb in facReport.hours"
                        :key="hb.at"
                        class="lb-bar fb-bar"
                        :style="{ height: (hb.value * 100).toFixed(1) + '%' }"
                        :class="{ now: Math.abs(hb.at - facReport.nowHour) < 0.01 }"
                      />
                    </div>
                  </div>
                  <div class="lb-xaxis">
                    <span v-for="hb in facReport.hours" :key="'fx' + hb.at">{{ hb.label }}</span>
                  </div>
                </div>

                <div class="lb-now">
                  <span class="lb-now__ic"><Ico name="clock" /></span>
                  <p class="font-thai">
                    <b>ตอนนี้ ({{ facReport.nowLabel }})</b><br />{{ facReport.nowTh }}
                  </p>
                </div>
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
            <section class="panel panel-relate" :class="{ 'panel-light': isFaculty }">
              <div v-if="isLibrary || isFaculty" class="p-head">
                <div>
                  <h2 class="h-th-lead font-thai">เข้าใจเหตุผล</h2>
                  <p class="h-en-sub">UNDERSTAND — Why does it matter?</p>
                </div>
                <span class="p-chip">Key Insights</span>
              </div>
              <template v-else>
                <h2 class="h-en upper">Why does it matter?</h2>
                <p class="h-th font-thai">ทำไมเรื่องนี้ถึงสำคัญ</p>
              </template>

              <!-- ── ห้องสมุด: สิ่งที่อ่านได้จากข้อมูล แล้วปิดท้ายด้วยความสัมพันธ์ที่พบ ── -->
              <div v-if="isLibrary" class="li-wrap">
                <ul class="li-list">
                  <li v-for="k in libReport.insights" :key="k.th" :style="{ '--sig': k.color }">
                    <span class="li-ic"><Ico :name="k.icon" /></span>
                    <span class="li-th font-thai">{{ k.th }}</span>
                  </li>
                </ul>

                <div class="li-rel">
                  <span class="li-rel__ic"><Ico name="chart" /></span>
                  <div>
                    <p class="li-rel__k font-thai">ความสัมพันธ์ที่พบ</p>
                    <p class="li-rel__v font-thai">{{ libReport.relationTh }}</p>
                  </div>
                </div>
              </div>

              <!-- ── คณะ: ห่วงโซ่ที่ MOMAY พบ เรียงจากต้นทาง (ตารางเรียน) ไปปลายทาง (ทรัพยากร) ── -->
              <div v-else-if="isFaculty" class="fr-wrap">
                <p class="fr-lead font-thai">ความสัมพันธ์ที่ MOMAY พบ</p>
                <p class="fr-sub font-thai">จากข้อมูลที่เชื่อมโยงกัน</p>

                <ol class="fr-grid">
                  <li
                    v-for="(rl, i) in facReport.relations"
                    :key="rl.en"
                    class="fr"
                    :class="{ 'fr--last': i === facReport.relations.length - 1 }"
                    :style="{ '--sig': rl.color }"
                  >
                    <span class="fr-ic"><Ico :name="rl.icon" /></span>
                    <span class="fr-txt">
                      <span class="fr-th font-thai">{{ rl.th }}</span>
                      <span class="fr-en">{{ rl.en }}</span>
                    </span>
                    <!-- ลูกศรชี้ไปโหนดถัดไป — ตัวสุดท้ายเป็นปลายทางจึงไม่มี -->
                    <span v-if="i < facReport.relations.length - 1" class="fr-arrow" aria-hidden="true">
                      <Ico name="arrow-down" />
                    </span>
                  </li>
                </ol>

                <div class="fr-note">
                  <span class="fr-note__ic"><Ico name="bulb" /></span>
                  <div>
                    <p class="fr-note__k font-thai">สิ่งที่อาจเกิดขึ้น</p>
                    <p class="fr-note__v font-thai">{{ facReport.mayHappenTh }}</p>
                  </div>
                </div>
              </div>

              <!-- หมวดโซลาร์: วงเดียวกัน แต่โหนดเป็นเส้นทางพลังงาน ลูกศรไหลทางเดียว -->
              <div v-else-if="isSolar" class="cols cols-relate">
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
            <section class="panel panel-sim" :class="{ 'panel-light': isFaculty }">
              <div v-if="isLibrary || isFaculty" class="p-head">
                <div>
                  <h2 class="h-th-lead font-thai">มองเห็นอนาคตและจำลองสถานการณ์</h2>
                  <p class="h-en-sub">ANTICIPATE &amp; SIMULATE — What happens next?</p>
                </div>
                <span class="p-chip">Scenario</span>
              </div>
              <template v-else>
                <!-- หัวข้อใช้ร่วมกันทุกหมวด เปลี่ยนเฉพาะเนื้อในของแผง -->
                <h2 class="h-en upper">What happens next?</h2>
                <p class="h-th font-thai">ถ้าคนใช้พื้นที่มากขึ้น จะเป็นอย่างไร</p>
              </template>

              <!-- ── ห้องสมุด: เส้นคาดการณ์ 7 วัน แล้วให้ลองปรับจำนวนคนดู ── -->
              <template v-if="isLibrary">
                <p class="lb-title font-thai">คาดการณ์จำนวนผู้ใช้ (7 วันข้างหน้า)</p>

                <div class="lf-legend">
                  <span><i style="background: #60a5fa" /> ค่าปัจจุบัน</span>
                  <span><i style="background: #e879f9" /> คาดการณ์</span>
                </div>

                <div class="lf-chart">
                  <svg :viewBox="`0 0 ${libChart.vw} ${libChart.vh}`" preserveAspectRatio="none" class="lf-svg">
                    <!-- เส้นกริดแนวนอนตามค่าบนแกน Y -->
                    <line
                      v-for="t in libChart.ticks"
                      :key="'g' + t.v"
                      class="lf-grid"
                      :x1="libChart.x0" :y1="t.y" :x2="libChart.x1" :y2="t.y"
                    />
                    <polyline class="lf-line cur" :points="libChart.curLine" />
                    <polyline class="lf-line pre" :points="libChart.preLine" />
                    <circle v-for="p in libChart.cur" :key="'c' + p.th" class="lf-dot cur" :cx="p.x" :cy="p.y" r="3.2" />
                    <circle v-for="p in libChart.pre" :key="'p' + p.th" class="lf-dot pre" :cx="p.x" :cy="p.y" r="3.2" />
                  </svg>

                  <div class="lf-yaxis">
                    <span v-for="t in [...libChart.ticks].reverse()" :key="'y' + t.v">{{ nf(t.v) }}</span>
                  </div>

                  <!-- ป้ายเตือนลอยอยู่เหนือวันที่หนักที่สุด -->
                  <div
                    v-if="libReport.atRisk"
                    class="lf-flag font-thai"
                    :style="{ left: libChart.peakLeft + '%' }"
                  >
                    เสี่ยงหนาแน่นสูง<br /><small>(คาด {{ nf(libReport.peakPredicted) }})</small>
                  </div>
                </div>

                <div class="lf-xaxis">
                  <span v-for="d in libReport.days" :key="'d' + d.th" class="font-thai">{{ d.th }}</span>
                </div>

                <p class="lb-title lb-title--gap font-thai">จำลองสถานการณ์</p>
                <div class="ls-row">
                  <button
                    v-for="sc in libReport.scenarios"
                    :key="sc.id"
                    type="button"
                    class="ls"
                    :class="{ on: libScenario === sc.id }"
                    @click="libScenario = sc.id"
                  >
                    <span class="ls-th font-thai">{{ sc.th }}</span>
                    <span class="ls-sub">{{ sc.sub }}</span>
                    <span class="ls-v font-thai">{{ nf(sc.people) }} คน/วัน</span>
                  </button>
                </div>

                <div class="lf-note">
                  <span class="lf-note__ic"><Ico :name="libScenario === 'down' ? 'arrow-down' : 'alert'" /></span>
                  <p class="font-thai">{{ libScenarioNote }}</p>
                </div>
              </template>

              <!-- ── คณะ: เลือกสถานการณ์ทางซ้าย แล้วดูเส้นความต้องการพื้นที่ทางขวา ── -->
              <template v-else-if="isFaculty">
                <p class="lb-title font-thai">ลองปรับสถานการณ์ แล้วดูว่าจะเกิดอะไรขึ้น?</p>
                <p class="fs-sub font-thai">เลือกสถานการณ์เพื่อดูผลกระทบต่อพื้นที่</p>

                <div class="fs">
                  <div class="fs-list">
                    <button
                      v-for="sc in FAC_SCENARIOS"
                      :key="sc.id"
                      type="button"
                      class="fs-opt"
                      :class="{ on: facScenario === sc.id }"
                      @click="facScenario = sc.id"
                    >
                      <span class="fs-opt__ic"><Ico :name="sc.icon" /></span>
                      <span class="fs-opt__th font-thai">{{ sc.th }}</span>
                      <Ico name="arrow-right" />
                    </button>


                    <!-- "กำหนดเอง" กางสไลเดอร์สองตัว — ตัวเลขเข้าเอนจินตัวเดียวกับการ์ดสำเร็จรูป -->
                    <div v-if="facScenario === 'custom'" class="fc">
                      <label v-for="c in FAC_CUSTOM_FIELDS" :key="c.key" class="fc-row">
                        <span class="fc-k font-thai">{{ c.th }}</span>
                        <input
                          v-model.number="facCustom[c.key]"
                          type="range" :min="FAC_CUSTOM_MIN" :max="FAC_CUSTOM_MAX" step="5"
                          class="fc-range"
                        />
                        <span class="fc-v">{{ signed(facCustom[c.key]) }}%</span>
                      </label>
                    </div>
                  </div>

                  <div class="fs-panel">
                    <div class="fs-head">
                      <div>
                        <p class="fs-head__k font-thai">ผลจำลอง (Simulation)</p>
                        <p class="fs-head__s font-thai">ความหนาแน่นพื้นที่ (Peak Space Demand)</p>
                      </div>
                      <span class="fs-delta">{{ signed(facReport.simDeltaPct) }}%</span>
                    </div>

                    <div class="fs-plot">
                      <svg :viewBox="`0 0 ${facChart.vw} ${facChart.vh}`" preserveAspectRatio="none" class="fs-svg">
                        <!-- แถบแรเงา = ช่วงที่ความต้องการล้นความจุของพื้นที่ประเภทที่ตึงที่สุด -->
                        <rect
                          class="fs-band"
                          :x="facChart.bandX" :y="facChart.y0"
                          :width="facChart.bandW" :height="facChart.y1 - facChart.y0"
                        />
                        <!-- เส้นประ = ความจุ 100% ของแต่ละประเภท เส้นที่ข้ามไปคือส่วนที่รับไม่ไหว -->
                        <line
                          class="fs-cap"
                          :x1="facChart.x0" :y1="facChart.capY" :x2="facChart.x1" :y2="facChart.capY"
                        />
                        <polyline
                          v-for="ln in facChart.lines"
                          :key="ln.th"
                          class="fs-line"
                          :points="ln.d"
                          :stroke="ln.color"
                        />
                      </svg>

                      <div class="fs-yaxis font-thai"><span>สูง</span><span>ต่ำ</span></div>

                      <!-- ป้ายเกาะมุมบนขวาซึ่งเป็นที่ว่างเสมอ (เส้นพีคอยู่กลางกราฟ)
                           เดิมเลื่อนตามจุดเริ่มแถบแล้วไปคร่อมเส้นที่กำลังไต่ขึ้นพอดี
                           ตำแหน่งที่เกิดแรงกดดันอ่านได้จากแถบแรเงาอยู่แล้ว -->
                      <div class="fs-flag font-thai">{{ facReport.pressureTh }}</div>
                    </div>

                    <div class="fs-xaxis">
                      <span v-for="x in facChart.xLabels" :key="'fxa' + x.at">{{ x.label }}</span>
                    </div>

                    <ul class="fs-legend">
                      <li v-for="ln in facChart.lines" :key="'lg' + ln.th">
                        <i :style="{ background: ln.color }" /><span class="font-thai">{{ ln.th }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </template>

              <template v-else-if="isSolar">
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
            <section class="panel panel-decide" :class="{ 'panel-light': isFaculty }">
              <div v-if="isLibrary || isFaculty" class="p-head">
                <div>
                  <h2 class="h-th-lead font-thai">ข้อเสนอแนะและทางเลือก</h2>
                  <p class="h-en-sub">DECIDE — What should we do?</p>
                </div>
                <span class="p-chip">Recommendations</span>
              </div>
              <template v-else>
                <h2 class="h-en upper">Momay recommends</h2>
                <p class="h-th font-thai">ข้อเสนอแนะจาก MOMAY</p>
              </template>

              <!-- ── ห้องสมุด: สิ่งที่ทำได้จริง กดดูรายละเอียดได้ทีละข้อ ── -->
              <div v-if="isLibrary" class="lr-wrap">
                <div
                  v-for="r in libReport.recommendations"
                  :key="r.key"
                  class="lr"
                  :class="{ open: libOpenRec === r.key }"
                  :style="{ '--sig': r.color }"
                >
                  <div class="lr-head">
                    <span class="lr-ic"><Ico :name="r.icon" /></span>
                    <div class="lr-txt">
                      <p class="lr-title font-thai">{{ r.titleTh }}</p>
                      <p class="lr-sub font-thai">{{ r.subTh }}</p>
                    </div>
                    <button
                      type="button"
                      class="lr-more font-thai"
                      @click="libOpenRec = libOpenRec === r.key ? null : r.key"
                    >
                      ดูรายละเอียด <Ico :name="libOpenRec === r.key ? 'arrow-down' : 'arrow-right'" />
                    </button>
                  </div>

                  <ul v-if="libOpenRec === r.key" class="lr-detail font-thai">
                    <li v-for="d in r.detailTh" :key="d">{{ d }}</li>
                  </ul>
                </div>

                <!-- ปลายทางของห้องสมุด: แอปฝั่งผู้ใช้ที่บอกว่าตอนนี้ควรไปนั่งตรงไหน -->
                <a class="lr-student" :href="citizenHref" @click="onStudentClick">
                  <span class="lr-student__ic"><Ico name="star" /></span>
                  <span class="lr-student__txt">
                    <b class="font-thai">MOMAY Student — สำหรับผู้ใช้ห้องสมุด</b>
                    <small class="font-thai">
                      ดูได้เลยว่าตอนนี้ควรไปที่ไหน? ว่างหรือไม่? เหมาะกับการอ่าน ทำงานกลุ่ม หรือพักผ่อน
                    </small>
                  </span>
                  <Ico name="arrow-right" />
                </a>
              </div>

              <!-- ── คณะ: ข้อเสนอเดียวที่ชัด แล้วกางเป็น ทำไม / ทำอะไร / ได้อะไร ── -->
              <div v-else-if="isFaculty" class="fd">
                <div class="fd-top">
                  <span class="fd-top__ic"><Ico name="star" /></span>
                  <div>
                    <p class="fd-top__k">MOMAY RECOMMENDS</p>
                    <p class="fd-top__v font-thai">{{ facReport.recTitleTh }}</p>
                  </div>
                </div>

                <dl class="fd-rows">
                  <div class="fd-row">
                    <dt>
                      <span class="fd-row__ic"><Ico name="question" /></span>
                      <span class="fd-row__k">WHY<small class="font-thai">ทำไมต้องทำ?</small></span>
                    </dt>
                    <dd class="font-thai">{{ facReport.whyTh }}</dd>
                  </div>
                  <div class="fd-row">
                    <dt>
                      <span class="fd-row__ic"><Ico name="grid" /></span>
                      <span class="fd-row__k">ACTION<small class="font-thai">ควรทำอะไร?</small></span>
                    </dt>
                    <dd class="font-thai">{{ facReport.actionTh }}</dd>
                  </div>
                  <div class="fd-row">
                    <dt>
                      <span class="fd-row__ic"><Ico name="chart" /></span>
                      <span class="fd-row__k">EXPECTED IMPACT<small class="font-thai">ผลที่คาดว่าจะเกิดขึ้น</small></span>
                    </dt>
                    <dd class="font-thai">{{ facReport.impactTh }}</dd>
                  </div>
                </dl>
              </div>

              <!-- หมวดโซลาร์แนะนำจากสัดส่วนกลางวัน-กลางคืน และช่วงพีคที่เลือกไว้ -->
              <div v-else-if="isSolar" class="cols">
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
            :href="hrefFor(d)"
            :type="d.contact ? 'button' : undefined"
            @click="onDemoClick(d)"
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

      <!-- ห้องสมุดวัดคนละชุดกับหมวดอื่น รายงานจึงแยกตาราง (ดู utils/.../library.ts) -->
      <template v-if="isLibrary">
        <h2>ข้อมูลที่ใช้</h2>
        <table class="rp-table">
          <tbody>
            <tr v-for="f in fieldList" :key="f.key">
              <th>{{ f.label }} {{ f.note }}</th>
              <td>{{ nf(form[f.key]) }} {{ f.unit }}</td>
            </tr>
            <tr><th>สิ่งที่ต้องการเข้าใจ</th><td>{{ libFocusNames }}</td></tr>
            <tr>
              <th>ช่วงที่มีผู้ใช้มากที่สุด</th>
              <td>{{ libPeakDef.th }} ({{ libPeakDef.window }})</td>
            </tr>
          </tbody>
        </table>

        <h2>ภาพรวมวันนี้</h2>
        <table class="rp-table">
          <tbody>
            <tr><th>ผู้ใช้วันนี้</th><td>{{ nf(libReport.todayPeople) }} คน (+{{ libReport.peopleChange }}% จากสัปดาห์ก่อน)</td></tr>
            <tr>
              <th>อัตราการใช้ที่นั่ง</th>
              <td>{{ libReport.seatUsePct }}% ({{ nf(libReport.seatsUsed) }} / {{ nf(libReport.seats) }} ที่นั่ง)</td>
            </tr>
            <tr><th>ชั้นที่ใช้งานสูงสุด</th><td>ชั้น {{ libReport.busyFloor }} — {{ libReport.busyFloorPct }}%</td></tr>
            <tr v-if="libReport.quietFloors.length">
              <th>ชั้นที่ยังรองรับได้อีก</th>
              <td>{{ libReport.quietFloors.map(f => `ชั้น ${f}`).join(' · ') }}</td>
            </tr>
          </tbody>
        </table>

        <h2>คาดการณ์ 7 วันข้างหน้า</h2>
        <table class="rp-table">
          <thead><tr><th>วัน</th><th>ค่าปัจจุบัน</th><th>คาดการณ์</th></tr></thead>
          <tbody>
            <tr v-for="d in libReport.days" :key="'rp' + d.th">
              <th>{{ d.th }}</th>
              <td>{{ nf(d.current) }} คน</td>
              <td>{{ nf(d.predicted) }} คน</td>
            </tr>
          </tbody>
        </table>
        <p class="rp-why">
          <strong>สถานการณ์ที่เลือก:</strong> {{ libScenarioDef.th }} {{ libScenarioDef.sub }}
          ({{ nf(libScenarioDef.people) }} คน/วัน) — {{ libScenarioNote }}
        </p>

        <h2>สิ่งที่ควรรู้</h2>
        <ol class="rp-list">
          <li v-for="k in libReport.insights" :key="'rpi' + k.th">{{ k.th }}</li>
        </ol>
        <p class="rp-why"><strong>ความสัมพันธ์ที่พบ:</strong> {{ libReport.relationTh }}</p>

        <h2>ข้อเสนอแนะและทางเลือก</h2>
        <ol class="rp-list">
          <li v-for="r in libReport.recommendations" :key="'rpr' + r.key">
            <strong>{{ r.titleTh }}</strong> — {{ r.subTh }}
            <em>({{ r.detailTh.join(' · ') }})</em>
          </li>
        </ol>
      </template>

      <!-- คณะก็วัดคนละชุดเช่นกัน (ดู utils/.../faculty.ts) -->
      <template v-else-if="isFaculty">
        <h2>ข้อมูลที่ใช้</h2>
        <table class="rp-table">
          <tbody>
            <tr v-for="f in fieldList" :key="f.key">
              <th>{{ f.label }} {{ f.note }}</th>
              <td>{{ nf(form[f.key]) }} {{ f.unit }}</td>
            </tr>
            <tr><th>หัวข้อที่ต้องการวิเคราะห์</th><td>{{ facFocusNames }}</td></tr>
            <tr>
              <th>ช่วงเวลาที่เน้น</th>
              <td>
                {{ facPeakDef.th }} ({{ facReport.peakWindow }})
              </td>
            </tr>
          </tbody>
        </table>

        <h2>ภาพรวมที่สำคัญ</h2>
        <p class="rp-why">{{ facReport.insightTh }}</p>
        <table class="rp-table">
          <tbody>
            <tr><th>นักศึกษา</th><td>{{ nf(facReport.students) }} คน</td></tr>
            <tr><th>ห้องเรียน / พื้นที่ที่ใช้งาน</th><td>{{ nf(facReport.rooms) }} พื้นที่</td></tr>
            <tr><th>รายวิชา / กิจกรรมต่อวัน</th><td>{{ nf(facReport.activities) }} รายการ</td></tr>
            <tr><th>ช่วงที่ความต้องการสูงสุด</th><td>{{ facReport.peakWindow }}</td></tr>
            <tr>
              <th>คนอยู่พร้อมกันตอนพีค</th>
              <td>{{ nf(facReport.peakConcurrent) }} คน (ความต้องการพื้นที่ {{ facReport.spaceLoadPct }}% ของที่มี)</td>
            </tr>
          </tbody>
        </table>

        <h2>ความหนาแน่นรายประเภทพื้นที่</h2>
        <table class="rp-table">
          <thead><tr><th>ประเภทพื้นที่</th><th>จำนวน</th><th>ความหนาแน่นเทียบพื้นที่ที่แน่นที่สุด</th></tr></thead>
          <tbody>
            <tr v-for="z in facReport.zones" :key="'rpz' + z.th">
              <th>{{ z.th }}</th>
              <td>{{ z.rooms }} พื้นที่</td>
              <td>{{ Math.round(z.load * 100) }}%</td>
            </tr>
          </tbody>
        </table>

        <h2>ความสัมพันธ์ที่พบ</h2>
        <p class="rp-why">{{ facReport.relations.map(r => r.th).join(' → ') }}</p>
        <p class="rp-why"><strong>สิ่งที่อาจเกิดขึ้น:</strong> {{ facReport.mayHappenTh }}</p>

        <h2>ผลจำลองสถานการณ์</h2>
        <p class="rp-why">
          <strong>สถานการณ์ที่เลือก:</strong> {{ FAC_SCENARIO_MAP[facScenario].th }} —
          ความต้องการพื้นที่ตอนพีค {{ signed(facReport.simDeltaPct) }}% · {{ facReport.pressureTh }}
        </p>

        <h2>ข้อเสนอแนะและทางเลือก</h2>
        <p class="rp-why"><strong>{{ facReport.recTitleTh }}</strong></p>
        <ol class="rp-list">
          <li><strong>ทำไมต้องทำ:</strong> {{ facReport.whyTh }}</li>
          <li><strong>ควรทำอะไร:</strong> {{ facReport.actionTh }}</li>
          <li><strong>ผลที่คาดว่าจะเกิดขึ้น:</strong> {{ facReport.impactTh }}</li>
        </ol>
      </template>

      <template v-else>
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
import {
  LIB_FOCUS, LIB_FOCUS_MAP, LIB_PEAKS, LIB_PEAK_MAP, LIB_PEAK_TO_ENGINE, libraryReport,
  type LibFocusId, type LibPeakId,
} from '~/utils/momaySurpriseOrganize/library'
import {
  FAC_FOCUS, FAC_FOCUS_MAP, FAC_PEAKS, FAC_PEAK_MAP, FAC_PEAK_TO_ENGINE,
  FAC_SCENARIOS, FAC_SCENARIO_MAP, facultyReport, facPeakWindow,
  type FacFocusId, type FacPeakId, type FacScenarioId,
} from '~/utils/momaySurpriseOrganize/faculty'

// ชื่อ route ต้องไม่ซ้ำกับหน้าเดิม ไม่งั้นตัวที่ลงทะเบียนทีหลังจะทับกัน แล้วหน้าเดิมกลายเป็น 404
definePageMeta({ name: 'momay-surprise-organize-v2', layout: false })
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
  // ── ไอคอนชุดห้องสมุด ──
  users: ['M16.5 20.5v-1.6a3.6 3.6 0 0 0-3.6-3.6H6.6A3.6 3.6 0 0 0 3 18.9v1.6', 'M9.8 4a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2Z', 'M21 20.5v-1.6a3.6 3.6 0 0 0-2.7-3.5', 'M15.5 4.2a3.6 3.6 0 0 1 0 7'],
  grid: ['M4 4h6.2v6.2H4V4Z', 'M13.8 4H20v6.2h-6.2V4Z', 'M4 13.8h6.2V20H4v-6.2Z', 'M13.8 13.8H20V20h-6.2v-6.2Z'],
  chair: ['M6.5 4.5h11v7.5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V4.5Z', 'M4.5 14h15', 'M7 17v3M17 17v3', 'M7 14v3h10v-3'],
  layers: ['M12 3.2 21 8l-9 4.8L3 8l9-4.8Z', 'M3 12.4 12 17.2l9-4.8', 'M3 16.6 12 21.4l9-4.8'],
  bulb: ['M9.2 18.2h5.6', 'M10 21h4', 'M12 3a6 6 0 0 1 3.6 10.8c-.6.5-.9 1-.9 1.7v.7H9.3v-.7c0-.7-.3-1.2-.9-1.7A6 6 0 0 1 12 3Z'],
  chart: ['M4 20V4', 'M4 20h16', 'M8 16.5V12M12.5 16.5V7.5M17 16.5v-6'],
  star: ['M12 3.2l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9L6.7 19.7l1.1-6L3.4 9.5l6-.8L12 3.2Z'],
  question: ['M12 21.5a9.5 9.5 0 1 1 0-19 9.5 9.5 0 0 1 0 19Z', 'M9.4 9.2a2.7 2.7 0 1 1 3.6 2.5c-.7.3-1 .9-1 1.6v.5', 'M12 17.4h.01'],
  'sun-up': ['M12 8.6a3.8 3.8 0 0 1 3.8 3.8', 'M5.5 16.5h13', 'M3 20h18', 'M12 3v2.4M5.6 6.1 7.2 7.7M18.4 6.1l-1.6 1.6', 'M8.2 12.4a3.8 3.8 0 0 1 1.1-2.7'],
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
  /** จำนวนชั้น — ถามเฉพาะห้องสมุด */
  floors: 6,
  /** จำนวนรายวิชา/กิจกรรมต่อวัน — ถามเฉพาะหมวดคณะ */
  activities: 80,
  signals: [] as SignalId[],
  peak: null as PeakId | null,
  /** ห้องสมุดมีชุดคำถามของตัวเอง: สิ่งที่อยากให้ช่วยดู และช่วงเวลาที่คนเยอะที่สุด */
  libFocus: [] as LibFocusId[],
  libPeak: null as LibPeakId | null,
  /** คณะก็มีชุดของตัวเอง: หัวข้อที่อยากให้วิเคราะห์ และช่วงเวลาที่ต้องการเน้น */
  facFocus: [] as FacFocusId[],
  facPeak: null as FacPeakId | null,
  /** สัดส่วนการใช้ไฟตอนกลางวัน (%) — ใช้เฉพาะหมวดที่เปิด dayNight */
  dayShare: 60,
  scenario: 'normal' as ScenarioId,
  delta: 20,
})

/* เอนจินและช่องกรอกต้องมีหมวด/ช่วงพีคเสมอ ระหว่างที่ผู้ใช้ยังไม่ได้เลือกจึงใช้ค่า
   ตั้งต้นแทน — หน้าผลลัพธ์เข้าไม่ได้จนกว่าจะเลือกครบ (ดู canAdvance) ค่าสำรองนี้
   จึงไม่เคยถูกแสดงเป็นคำตอบของผู้ใช้ */
const orgId = computed<OrgId>(() => form.org ?? 'municipality')

const org = computed(() => ORG_MAP[orgId.value] ?? ORG_MAP.municipality)
const isLibrary = computed(() => org.value.id === 'library')
const isFaculty = computed(() => org.value.id === 'faculty')

/* ห้องสมุดเลือกช่วงเวลาจากชุดของตัวเอง (มี "ไม่แน่ใจ" ด้วย) แล้วแปลงเป็นช่วงพีค
   ของเอนจินกลางอีกที — ตัวเลขในรายงาน PDF และลิงก์ที่แชร์จะได้เป็นชุดเดียวกัน */
const peakId = computed<PeakId>(() => {
  if (isLibrary.value) return LIB_PEAK_TO_ENGINE[form.libPeak ?? 'midday']
  if (isFaculty.value) return FAC_PEAK_TO_ENGINE[form.facPeak ?? 'midday']
  return form.peak ?? 'midday'
})

/** หมวดที่เปิดให้เลือกในหน้านี้ — หมวดที่เหลือยังอยู่ในโมเดล รอเปิดทีหลัง */
const VISIBLE_ORGS: OrgId[] = ['municipality', 'faculty', 'library']
const orgList = computed(() => ORG_TYPES.filter(o => VISIBLE_ORGS.includes(o.id)))

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

/** ไอคอนประจำช่วงเวลาของหมวดทั่วไป — PEAKS ในโมเดลเก็บแค่ชื่อกับกรอบเวลา ไม่มีไอคอน */
const PEAK_ICONS: Record<PeakId, string> = {
  morning: 'sun-up',
  midday: 'sun',
  evening: 'moon',
  event: 'calendar',
}

/** สีประจำช่องกรอก — ให้ไอคอนแต่ละช่องแยกกันด้วยสายตา ไม่ใช่เทาเหมือนกันหมด */
const FIELD_COLORS: Record<InputKey, string> = {
  people: '#38bdf8',
  capacity: '#f59e0b',
  floors: '#a855f7',
  activities: '#c084fc',
  energy: '#fbbf24',
}

/** หมวดที่ถามช่วงเวลาด้วยชุดตัวเลือกของตัวเองไปแล้ว — ไม่ต้องถามด้วยชุดกลางซ้ำ
    และเป็นหมวดที่จบการกรอกในดร๊อปดาวน์เดียว ปุ่มท้ายจึงเป็น "วิเคราะห์ให้เลย" */
const OWN_PEAK_ORGS: OrgId[] = ['library', 'faculty']
const ownPeakOrg = (id: OrgId) => OWN_PEAK_ORGS.includes(id)

const ALL_INPUTS: InputKey[] = ['people', 'capacity', 'energy']
/** บางหมวดให้กรอกไม่ครบสามช่อง (เช่นโซลาร์กรอกแค่ค่าไฟ) */
const fieldList = computed(() => (org.value.inputs ?? ALL_INPUTS).map(k => org.value.fields[k]))

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
    form.floors = f.floors.default
    form.activities = f.activities.default
  }
}

function toggleSignal(id: SignalId) {
  const i = form.signals.indexOf(id)
  if (i >= 0) form.signals.splice(i, 1)
  else form.signals.push(id)
}

function toggleFocus(id: LibFocusId) {
  const i = form.libFocus.indexOf(id)
  if (i >= 0) form.libFocus.splice(i, 1)
  else form.libFocus.push(id)
}

/** หัวข้อที่คณะอยากให้วิเคราะห์ — กดติด/กดออกได้ทุกใบ เหมือนตารางของหมวดอื่น
    เดิมล็อกไว้ไม่เกินสี่ข้อ แล้วใบที่ห้าขึ้นไปกดแล้วเงียบ ซึ่งกดแล้วรู้สึกเหมือนปุ่มเสีย
    จำนวนที่แนะนำเลยย้ายไปเป็นคำอธิบายใต้หัวข้อแทน ส่วนขั้นต่ำสองข้อคุมด้วยปุ่มไปต่อ
    (ดู canAdvance) ด้วยวิธีเดียวกับที่ห้องสมุดคุมขั้นต่ำหนึ่งข้อ */
const FAC_FOCUS_MIN = 2
/** จำนวนที่แนะนำ — ใช้เขียนคำอธิบายอย่างเดียว ไม่ได้บังคับ */
const FAC_FOCUS_HINT_MAX = 4
function toggleFacFocus(id: FacFocusId) {
  const i = form.facFocus.indexOf(id)
  if (i >= 0) form.facFocus.splice(i, 1)
  else form.facFocus.push(id)
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

/* ─────────── ห้องสมุด: ผลวิเคราะห์ของหน้า 05–08 ───────────
   คนละเอนจินกับหมวดอื่น (ดู utils/momaySurpriseOrganize/library.ts) */

/** เวลาจริงของเครื่อง — เก็บเป็น ref เพราะฝั่งเซิร์ฟเวอร์กับฝั่งเบราว์เซอร์คนละนาฬิกา
    ปล่อยให้เรนเดอร์ครั้งแรกใช้ช่วงพีคไปก่อน แล้วค่อยเปลี่ยนเป็นเวลาจริงตอน mount */
const nowHour = ref<number | null>(null)

const libPeakDef = computed(() => LIB_PEAK_MAP[form.libPeak ?? 'midday'])

const libReport = computed(() =>
  libraryReport({
    people: form.people,
    seats: form.capacity,
    floors: form.floors,
    focus: form.libFocus,
    peak: form.libPeak ?? 'midday',
    nowHour: nowHour.value ?? undefined,
  }),
)

const libFocusNames = computed(() =>
  form.libFocus.map(f => LIB_FOCUS_MAP[f].th).join(' · ') || '—',
)

/** สถานการณ์ที่กำลังดูอยู่ในแผง 07 — ตั้งต้นที่ "ผู้ใช้เพิ่มขึ้น" เพราะเป็นกรณีที่ต้องเตรียมตัว */
const libScenario = ref<'normal' | 'up' | 'down'>('up')
const libScenarioDef = computed(
  () => libReport.value.scenarios.find(s => s.id === libScenario.value) ?? libReport.value.scenarios[0],
)

/** ข้อความสรุปใต้การ์ดสถานการณ์ — อ้างชั้นจริงที่คำนวณได้ ไม่ใช่ข้อความสำเร็จรูป */
const libScenarioNote = computed(() => {
  const r = libReport.value
  const busy = [r.busyFloor, ...(r.busyFloor2 ? [r.busyFloor2] : [])].join('-')
  const quiet = r.quietFloors.map(f => `ชั้น ${f}`).join(' และ')
  const window = libPeakDef.value.window

  if (libScenario.value === 'up') {
    return (
      `หากผู้ใช้เพิ่มขึ้น 20% ชั้น ${busy} จะเต็ม 100% ในช่วง ${window}` +
      (quiet ? ` แนะนำเปิดพื้นที่ใน${quiet} และกระจายกิจกรรมบางส่วนไปยังโซนอื่น` : ' ควรเริ่มจำกัดเวลานั่งต่อรอบ')
    )
  }
  if (libScenario.value === 'down') {
    return (
      `หากผู้ใช้ลดลง 20% ชั้น ${busy} จะเหลือราว ${Math.round(r.busyFloorPct * 0.8)}% ` +
      (quiet ? `สามารถรวมผู้ใช้ไว้ชั้นเดียวแล้วปิดระบบของ${quiet}เพื่อลดค่าไฟ` : 'สามารถลดรอบเปิดบางโซนลงได้')
    )
  }
  return (
    `ในวันปกติ ชั้น ${busy} จะหนาแน่นราว ${r.busyFloorPct}% ในช่วง ${window} ` +
    (quiet ? `ขณะที่${quiet}ยังรับผู้ใช้ได้อีกมาก` : 'ส่วนที่เหลือยังรับได้')
  )
})

/** ข้อเสนอแนะที่กางรายละเอียดอยู่ */
const libOpenRec = ref<LibFocusId | null>(null)

/* เส้นคาดการณ์ 7 วัน — คำนวณพิกัดใน viewBox ที่นี่ ไม่ปล่อยให้เทมเพลตคิดเลข */
const libChart = computed(() => {
  const r = libReport.value
  const vw = 340
  const vh = 148
  const x0 = 8
  const x1 = 332
  const y0 = 10
  const y1 = 130

  const n = r.days.length
  const px = (i: number) => (n <= 1 ? (x0 + x1) / 2 : x0 + ((x1 - x0) * i) / (n - 1))
  const py = (v: number) => y1 - (y1 - y0) * (v / r.chartMax)
  const pts = (key: 'current' | 'predicted') =>
    r.days.map((d, i) => ({ th: d.th, x: px(i), y: py(d[key]) }))

  const cur = pts('current')
  const pre = pts('predicted')
  const line = (ps: { x: number; y: number }[]) =>
    ps.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

  const peakIdx = r.days.reduce((best, d, i) => (d.predicted > r.days[best].predicted ? i : best), 0)

  return {
    vw, vh, x0, x1,
    cur, pre,
    curLine: line(cur),
    preLine: line(pre),
    ticks: r.chartTicks.map(v => ({ v, y: py(v) })),
    // ป้ายเตือนเป็น HTML ที่ลอยทับ svg จึงต้องคิดตำแหน่งเป็น % ของความกว้างแผง
    // บีบไว้ไม่ให้ชิดขอบ ไม่งั้นครึ่งหนึ่งของป้ายจะล้นออกนอกแผงตอนเรียง 4 คอลัมน์
    peakLeft: Math.min(82, Math.max(14, (px(peakIdx) / vw) * 100)),
  }
})

/* ─────────── คณะ: ผลวิเคราะห์ของหน้า 05–08 ───────────
   คนละเอนจินกับหมวดอื่นเช่นกัน (ดู utils/momaySurpriseOrganize/faculty.ts) */

const facPeakDef = computed(() => FAC_PEAK_MAP[form.facPeak ?? 'midday'])

/** สถานการณ์ที่กำลังดูในแผง 07 — ตั้งต้นที่ "นักศึกษาเพิ่ม" เพราะเป็นกรณีที่คณะต้องเตรียมตัว */
const facScenario = ref<FacScenarioId>('students')

/** ตัวเลขของสถานการณ์ "กำหนดเอง" (% ที่เพิ่มขึ้น) — การ์ดใบสุดท้ายกางสไลเดอร์สองตัวนี้ */
const facCustom = reactive({ people: 10, activity: 10 })
const FAC_CUSTOM_MIN = -20
const FAC_CUSTOM_MAX = 50
const FAC_CUSTOM_FIELDS = [
  { key: 'people' as const, th: 'จำนวนนักศึกษา' },
  { key: 'activity' as const, th: 'จำนวนกิจกรรม' },
]

const facReport = computed(() =>
  facultyReport({
    students: form.people,
    rooms: form.capacity,
    activities: form.activities,
    focus: form.facFocus,
    peak: form.facPeak ?? 'midday',
    scenario: facScenario.value,
    custom: facCustom,
    nowHour: nowHour.value ?? undefined,
  }),
)

const facFocusNames = computed(() =>
  form.facFocus.map(f => FAC_FOCUS_MAP[f].th).join(' · ') || '—',
)

/** แท็บของแผง 05 — ภาพรวมรายประเภทพื้นที่ หรือดูตามช่วงเวลา */
const facTab = ref<'space' | 'time'>('space')

/* เส้นจำลองของแผง 07 — คิดพิกัดใน viewBox ที่นี่ ไม่ปล่อยให้เทมเพลตคิดเลข
   แกน Y ยืดตามค่าสูงสุดที่เกิดขึ้นจริง โดยมีพื้นอย่างน้อย 1.15 เท่าของความจุ
   เพื่อให้เส้นประ 100% อยู่ในกรอบเสมอ — เดิมล็อกไว้ที่ 1.4 เท่า พอสถานการณ์ดันค่าเกิน
   ยอดเส้นจะถูกตัดจนแบน อ่านเป็นกราฟที่ค้างอยู่ แทนที่จะเป็นยอดที่พุ่งเลยความจุ */
const FAC_Y_FLOOR = 1.15

const facChart = computed(() => {
  const r = facReport.value
  const peakValue = Math.max(
    FAC_Y_FLOOR,
    ...r.series.flatMap(se => se.points.map(pt => pt.value)),
  )
  const yMax = peakValue * 1.08
  const vw = 320
  const vh = 150
  const x0 = 6
  const x1 = 314
  const y0 = 8
  const y1 = 132

  const hours = r.hours
  const t0 = hours[0]?.at ?? 8
  const t1 = hours[hours.length - 1]?.at ?? 18
  const px = (t: number) => (t1 === t0 ? (x0 + x1) / 2 : x0 + ((x1 - x0) * (t - t0)) / (t1 - t0))
  const py = (v: number) => y1 - (y1 - y0) * Math.min(v / yMax, 1)

  return {
    vw, vh, x0, x1, y0, y1,
    lines: r.series.map(se => ({
      th: se.th,
      color: se.color,
      d: se.points.map(pt => `${px(pt.at).toFixed(1)},${py(pt.value).toFixed(1)}`).join(' '),
    })),
    // แถบแรเงาคลุมช่วงที่เส้นของประเภทที่ตึงที่สุดอยู่เหนือความจุ
    bandX: px(r.pressureFrom),
    bandW: Math.max(6, px(r.pressureTo) - px(r.pressureFrom)),
    // เส้นประ 100% = ความจุของประเภทนั้น เส้นที่ขึ้นเหนือเส้นนี้คือส่วนที่รับไม่ไหว
    capY: py(1),
    xLabels: [t0, (t0 + t1) / 2 - 1, (t0 + t1) / 2 + 1, t1 - 1, t1]
      .map(t => ({ at: t, left: ((px(t) - x0) / (x1 - x0)) * 100, label: `${Math.round(t)}:00` })),
  }
})

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

/* ── ห้องสมุด: ชุดของตัวเอง สี่ขั้น เล่าด้วยคำที่ตรงกับสิ่งที่ห้องสมุดสนใจ ── */
const LIB_AWAKEN_STEPS = [
  { en: 'Connecting your data ...',     th: 'กำลังเชื่อมโยงข้อมูลของคุณ...' },
  { en: 'Reading occupancy ...',        th: 'กำลังวิเคราะห์ความหนาแน่นผู้ใช้ และการใช้พื้นที่...' },
  { en: 'Detecting usage patterns ...', th: 'กำลังตรวจหารูปแบบการใช้งาน ในแต่ละช่วงเวลา...' },
  { en: 'Simulating options ...',       th: 'กำลังจำลองสถานการณ์ และหาทางเลือกที่ดีกว่า...' },
]

/** ชั้นของอาคารไอโซเมตริก — ค่า y คือระดับพื้นของแต่ละชั้นใน viewBox 400×360 */

/** ประกายที่ลอยขึ้นรอบอาคาร — กระจายด้วยมุมทองให้ไม่จับกลุ่มเป็นแถว */
const LW_SPARKS = Array.from({ length: 18 }, (_, i) => {
  const a = (i * 137.5) % 360
  return {
    x: 18 + (a / 360) * 64,
    b: 6 + ((i * 29) % 46),
    size: 2 + (i % 3),
    delay: ((i % 9) * 0.55).toFixed(2),
    dur: (4.6 + (i % 5) * 0.7).toFixed(1),
  }
})

/** ฟองไอคอนรอบอาคาร — ตำแหน่งเป็น % ของกล่องภาพ เรียงเป็นส่วนโค้งทางขวา */
const LW_BUBBLES = [
  { icon: 'users',    color: '#38bdf8', x: 72, y: 14 },
  { icon: 'book',     color: '#a855f7', x: 86, y: 31 },
  { icon: 'leaf',     color: '#22c55e', x: 90, y: 51 },
  { icon: 'calendar', color: '#f43f5e', x: 80, y: 70 },
  { icon: 'bolt',     color: '#f59e0b', x: 66, y: 85 },
]

/* ── คณะ: สี่ขั้น เล่าด้วยคำที่ตรงกับสิ่งที่คณะสนใจ ── */
const FAC_AWAKEN_STEPS = [
  { en: 'Connecting your faculty ...', th: 'กำลังเชื่อมโยงข้อมูลของคณะ...' },
  { en: 'Finding relationships ...',   th: 'กำลังหาความสัมพันธ์ระหว่างตารางเรียนกับการใช้พื้นที่...' },
  { en: 'Detecting patterns ...',      th: 'กำลังตรวจหารูปแบบการใช้พื้นที่ในแต่ละช่วงเวลา...' },
  { en: 'Simulating possibilities ...', th: 'กำลังจำลองสถานการณ์ที่อาจเกิดขึ้น...' },
]

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

/** ขั้นตอนที่ใช้จริงของหมวดนี้ — ห้องสมุดมีสี่ขั้น หมวดอื่นห้าขั้น */
const awakenSteps = computed(() =>
  isLibrary.value ? LIB_AWAKEN_STEPS : isFaculty.value ? FAC_AWAKEN_STEPS : AWAKEN_STEPS,
)
const awakenPct = computed(() =>
  Math.min(100, (awakenAt.value / awakenSteps.value.length) * 100),
)

const awakenDone = computed(() => awakenAt.value >= awakenSteps.value.length)
const stage = computed(() => {
  const st = AWAKEN_STAGES[Math.min(awakenAt.value, AWAKEN_STAGES.length - 1)]
  // ขั้นสุดท้ายเรียกชื่อหมวดด้วย ให้รู้สึกว่าเป็น MOMAY ของคณะนี้จริง ๆ ไม่ใช่ตัวกลาง ๆ
  if (isFaculty.value && awakenAt.value >= AWAKEN_STAGES.length - 1) {
    return { ...st, en: 'Your Faculty MOMAY is ready.', core: ['FACULTY', 'READY'] }
  }
  return st
})
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
  // จำนวนขั้นต่างกันตามหมวด แต่เวลารวมเท่ากัน จังหวะต่อขั้นจึงคิดจากชุดที่ใช้จริง
  const total = awakenSteps.value.length
  awakenTimer = setInterval(() => {
    if (awakenAt.value >= total) {
      stopAwaken()
      return
    }
    awakenAt.value += 1
    // ครบทุกขั้น (= ครบ 20 วินาที) แล้วพาไปหน้าผลลัพธ์เอง ไม่ต้องกดต่อไป
    if (awakenAt.value >= total) {
      stopAwaken()
      launchToResult()
    }
  }, AWAKEN_TOTAL_MS / total)
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
    if (!form.org) return false
    if (!fieldList.value.every(f => form[f.key] > 0)) return false
    // ห้องสมุดตอบชุดของตัวเอง: ต้องเลือกสิ่งที่อยากให้ช่วยดูอย่างน้อยหนึ่งข้อ และช่วงเวลา
    if (isLibrary.value) return form.libFocus.length > 0 && !!form.libPeak
    // คณะต้องเลือกหัวข้ออย่างน้อยสองข้อ ผลลัพธ์จึงจะเล่าความสัมพันธ์ระหว่างเรื่องได้
    if (isFaculty.value) return form.facFocus.length >= FAC_FOCUS_MIN && !!form.facPeak
    if (!form.peak) return false
    return org.value.dailyChanges === false || loadSignals.value.length > 0
  }
  if (step.value === 2) return awakenAt.value >= awakenSteps.value.length
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
    // พาธจริงมาจาก citizenHref ด้านล่าง เพราะต้องพ่วงข้อมูลที่ผู้ใช้กรอกไปด้วย
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

/* หมวดที่แดชบอร์ดประชาชนแปลผลไม่ได้ — โซลาร์เป็นพื้นที่เฉพาะทาง ตัวชี้วัดของหน้า
   CITIZEN (ความหนาแน่นย่าน จราจร ที่จอดรถเมือง) อ่านจากหมวดนี้ไม่ได้
   ส่วนห้องสมุดมีหน้าของตัวเองแล้ว (STUDENT) จึงไม่ต้องอยู่ในนี้ */
const CITIZEN_EXCLUDED: OrgId[] = ['solar']

/** สิ่งที่ห้องสมุดเลือกดู → signal ของเอนจินกลาง
    หน้า CITIZEN/STUDENT อ่านพารามิเตอร์ชุดเดิม จึงต้องแปลงก่อนส่งไป */
const FOCUS_TO_SIGNAL: Record<LibFocusId, SignalId> = {
  occupancy: 'people',
  space: 'people',
  booking: 'events',
  energy: 'energy',
  environment: 'waste',
}

/** หัวข้อที่คณะเลือก → signal ของเอนจินกลาง (ใช้เหตุผลเดียวกับ FOCUS_TO_SIGNAL) */
const FAC_FOCUS_TO_SIGNAL: Record<FacFocusId, SignalId> = {
  learning: 'people',
  space: 'people',
  activity: 'events',
  resources: 'events',
  environment: 'waste',
  energy: 'energy',
}

const engineSignals = computed<SignalId[]>(() => {
  if (isLibrary.value) return [...new Set(form.libFocus.map(f => FOCUS_TO_SIGNAL[f]))]
  if (isFaculty.value) return [...new Set(form.facFocus.map(f => FAC_FOCUS_TO_SIGNAL[f]))]
  return form.signals
})

/** คำตอบจากแบบสอบถามในรูปแบบ query string — ใช้ชื่อพารามิเตอร์ชุดเดียวกับ shareUrl */
const surveyQuery = computed(() =>
  new URLSearchParams({
    o: String(form.org ?? ''),
    p: String(form.people),
    c: String(form.capacity),
    e: String(form.energy),
    f: String(form.floors),
    s: engineSignals.value.join(','),
    fo: form.libFocus.join(','),
    k: peakId.value,
    lk: form.libPeak ?? '',
    ac: String(form.activities),
    ff: form.facFocus.join(','),
    fk: form.facPeak ?? '',
  }).toString(),
)

/** ปลายทางของปุ่มกลาง — ห้องสมุดไปหน้า STUDENT ที่เหลือไปหน้า CITIZEN
    ทั้งสองหน้าแปลผลจากคำตอบชุดเดียวกัน */
const citizenHref = computed(() => {
  if (!form.org) return '/momay-citizen/'
  if (form.org === 'library') return `/momay-student/?${surveyQuery.value}`
  // คณะมีหน้า STUDENT ของตัวเอง (แอป React ที่ momay-student-faculty/)
  // ส่งคำตอบชุดเดียวกันไปด้วย หน้านั้นจึงคำนวณจาก facultyReport ตัวเดียวกับที่นี่
  if (form.org === 'faculty') return `/momay-student-faculty/?${surveyQuery.value}`
  if (CITIZEN_EXCLUDED.includes(form.org)) return '/momay-citizen/'
  return `/momay-citizen/?${surveyQuery.value}`
})

function hrefFor(d: DemoLink) {
  if (d.contact) return undefined
  return d.key === 'citizen' ? citizenHref.value : d.link
}

/** กุญแจผังห้องสมุดของหน้า STUDENT — เดิมหน้านี้เคยเขียนผังรายโซนลงไป
    ตอนนี้ไม่มีตัวกรอกผังแล้ว ผังเก่าที่ค้างอยู่ในเครื่องจะบังคำตอบชุดใหม่ที่ส่งไปทาง URL
    จึงล้างทิ้งก่อนเปลี่ยนหน้า ให้ STUDENT ใช้ผังตั้งต้น + คำตอบล่าสุดแทน */
const LIB_STORAGE_KEY = 'momay:library-setup'

function clearLibrarySetup() {
  if (!process.client) return
  try {
    localStorage.removeItem(LIB_STORAGE_KEY)
  } catch {
    // เบราว์เซอร์ปิด storage ไว้ — ไม่มีผังค้างอยู่แล้ว ไปต่อได้เลย
  }
}

/** ปุ่มข้างเปิดฟอร์มติดต่อ · ปุ่มกลางพาไปหน้า CITIZEN/STUDENT */
function onDemoClick(d: DemoLink) {
  if (d.contact) return openContact(d)
  if (d.key === 'citizen' && isLibrary.value) clearLibrarySetup()
}

/** การ์ด MOMAY Student ในแผง 08 — ปลายทางเดียวกับปุ่มกลาง */
function onStudentClick() {
  clearLibrarySetup()
}

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
    f: String(form.floors),
    s: form.signals.join(','),
    fo: form.libFocus.join(','),
    k: peakId.value,
    lk: form.libPeak ?? '',
    ac: String(form.activities),
    ff: form.facFocus.join(','),
    fk: form.facPeak ?? '',
    fs: facScenario.value,
    fcp: String(facCustom.people),
    fca: String(facCustom.activity),
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
  // อุ่นแคชภาพของหมวดที่เปิดใช้ กดสลับแล้วภาพขึ้นทันทีไม่วูบ
  orgList.value.forEach(o => { new Image().src = o.photo })
  // ผลของห้องสมุดอ้างเวลาจริง ("ตอนนี้ 13:00") — ตั้งหลัง mount เพื่อไม่ให้ชนกับฝั่งเซิร์ฟเวอร์
  nowHour.value = new Date().getHours()

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
  num('p', 'people'); num('c', 'capacity'); num('e', 'energy'); num('f', 'floors')
  num('ac', 'activities')

  const s = q.get('s')
  if (s) {
    const ids = s.split(',').filter(x => x in SIGNAL_MAP) as SignalId[]
    if (ids.length) form.signals = ids
  }

  const fo = q.get('fo')
  if (fo) {
    const ids = fo.split(',').filter(x => x in LIB_FOCUS_MAP) as LibFocusId[]
    if (ids.length) form.libFocus = ids
  }

  const k = q.get('k') as PeakId | null
  if (k && PEAK_MAP[k]) form.peak = k

  const lk = q.get('lk') as LibPeakId | null
  if (lk && LIB_PEAK_MAP[lk]) form.libPeak = lk

  const ff = q.get('ff')
  if (ff) {
    const ids = ff.split(',').filter(x => x in FAC_FOCUS_MAP) as FacFocusId[]
    if (ids.length) form.facFocus = ids
  }

  const fk = q.get('fk') as FacPeakId | null
  if (fk && FAC_PEAK_MAP[fk]) form.facPeak = fk

  const fs = q.get('fs') as FacScenarioId | null
  if (fs && FAC_SCENARIO_MAP[fs]) facScenario.value = fs

  const customNum = (key: string, target: 'people' | 'activity') => {
    const v = Number(q.get(key))
    if (Number.isFinite(v)) {
      facCustom[target] = Math.min(FAC_CUSTOM_MAX, Math.max(FAC_CUSTOM_MIN, Math.round(v / 5) * 5))
    }
  }
  if (q.has('fcp')) customNum('fcp', 'people')
  if (q.has('fca')) customNum('fca', 'activity')

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
    else awakenAt.value = awakenSteps.value.length
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
</style>

<style scoped>
.momay-demo {
  /* ตัวคูณขนาดตัวหนังสือทั้งหน้า — ปรับที่เดียวได้ทั้งหน้า
     หน้านี้มีการประกาศ font-size กว่าสองร้อยจุด ถ้าไล่แก้ทีละค่าจะพลาดง่าย
     และครั้งหน้าที่อยากปรับก็ต้องไล่ใหม่ทั้งหมดอีกรอบ
     คูณเฉพาะตัวอักษรที่เล็กกว่า 20px ซึ่งเป็นตัวอักษรใช้งานจริงที่อ่านยาก
     ส่วนหัวเรื่องใหญ่ปล่อยไว้ เพราะมันพอดีอยู่แล้วและถ้าโตอีกจะล้นกรอบ */
  --fs: 1.14;

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
.logo-main { font-weight: 800; font-size: calc(18px * var(--fs)); letter-spacing: 0.08em; }
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
.tag { font-size: calc(10.5px * var(--fs)); line-height: 1.45; text-align: right; color: var(--dim); max-width: 160px; }

/* ── progress ── */
.progbar { display: flex; align-items: center; gap: 12px; padding: 0 18px 18px; }
.track { position: relative; flex: 1; height: 2px; border-radius: 2px; background: rgba(90, 140, 190, 0.2); }
.fill { position: absolute; inset: 0 auto 0 0; border-radius: 2px; background: linear-gradient(90deg, #1868b8, var(--cyan)); box-shadow: 0 0 10px rgba(79, 216, 255, 0.55); transition: width 0.45s ease; }
.diamond { position: absolute; top: 50%; width: 7px; height: 7px; background: #d7f2ff; transform: translate(-50%, -50%) rotate(45deg); box-shadow: 0 0 10px var(--cyan); transition: left 0.45s ease; }
.count { font-size: calc(11px * var(--fs)); color: var(--muted); font-variant-numeric: tabular-nums; }

/* ── หัวข้อ ── */
.h-en { font-size: 26px; font-weight: 800; line-height: 1.18; letter-spacing: -0.01em; }
.h-en.upper { text-transform: uppercase; font-size: 23px; letter-spacing: 0.01em; }
.h-en.center, .h-th.center { text-align: center; }
.h-en .accent { color: var(--brand); }
.h-th { margin-top: 7px; font-size: calc(13px * var(--fs)); color: var(--muted); }
.sub-q { margin: 26px 0 12px; font-size: calc(14px * var(--fs)); font-weight: 500; }
.list-title { margin: 24px 0 13px; font-size: calc(14px * var(--fs)); font-weight: 700; letter-spacing: 0.02em; }

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
.org-en { font-size: calc(13.5px * var(--fs)); font-weight: 600; }
.org-th { font-size: calc(10.5px * var(--fs)); color: var(--dim); }
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
.dd-title { margin-top: 13px; font-size: calc(12px * var(--fs)); font-weight: 700; line-height: 1.35; color: #dcecfb; }
.dd-title.dd-gap { margin-top: 16px; }
.dd-title .accent { color: var(--brand); }
.dd-sub { margin-top: 3px; font-size: calc(10px * var(--fs)); color: var(--dim); }
.dd .field-list { margin-top: 8px; gap: 8px; }
.dd .sig-grid { margin-top: 8px; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.dd .lpk-row { margin-top: 8px; gap: 7px; }

/* ในดร๊อปดาวน์บีบทุกอย่างให้เตี้ยลง — ป้ายกำกับกับช่องกรอกอยู่บรรทัดเดียวกัน */
.dd .field { padding: 9px 11px; gap: 9px; align-items: center; }
.dd .field-ic { margin-top: 0; }
.dd .field-ic :deep(.ic) { width: 17px; height: 17px; }
.dd .field-main { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; column-gap: 10px; }
.dd .field-label { font-size: calc(11px * var(--fs)); line-height: 1.35; }
.dd .field-note { font-size: calc(9px * var(--fs)); }
.dd .field-input { margin: 0; gap: 7px; }
.dd .field-input input { flex: none; width: 104px; padding: 6px 10px; border-radius: 8px; font-size: calc(14px * var(--fs)); text-align: right; }
.dd .field-unit { font-size: calc(9.5px * var(--fs)); }
.dd .field-hint { grid-column: 1 / -1; margin-top: 4px; font-size: calc(9px * var(--fs)); }

.dd .sig { padding: 10px 5px 9px; gap: 3px; border-radius: 11px; }
.dd .sig-ic :deep(.ic) { width: 19px; height: 19px; }
.dd .sig-en { font-size: calc(10.5px * var(--fs)); }
.dd .sig-th { font-size: calc(8.5px * var(--fs)); }
.dd .sig-mark { top: 6px; right: 6px; }
.dd .sig-check { width: 14px; height: 14px; }
.dd .sig-ring { width: 13px; height: 13px; }
.dd .peak { padding: 7px 12px; font-size: calc(11px * var(--fs)); border-radius: 9px; }
.dd-next { display: flex; justify-content: flex-end; margin-top: 14px; }
.dd-next .btn-next { padding: 9px 20px; font-size: calc(12.5px * var(--fs)); }

.quote-mini { margin: 20px 2px 4px; font-size: calc(12.5px * var(--fs)); line-height: 1.7; color: #b9cfe6; }
.qm { color: var(--brand); font-size: calc(19px * var(--fs)); font-weight: 700; margin-right: 3px; }

/* ── 02 ฟิลด์กรอกข้อมูล ── */
.field-list { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
.field { display: flex; gap: 14px; padding: 15px; border-radius: 16px; background: var(--card); border: 1px solid var(--line); }
.field-ic { color: #9ec6ee; margin-top: 3px; }
.field-main { flex: 1; min-width: 0; }
.field-label { font-size: calc(12.5px * var(--fs)); line-height: 1.45; color: #c9dcf0; }
.field-note { font-size: calc(10.5px * var(--fs)); color: var(--dim); }
.field-input { display: flex; align-items: center; gap: 10px; margin: 9px 0 7px; }
.field-input input {
  flex: 1; min-width: 0; padding: 9px 13px; border-radius: 10px;
  background: rgba(4, 13, 26, 0.9); border: 1px solid rgba(70, 140, 210, 0.32);
  color: #dff1ff; font-size: calc(19px * var(--fs)); font-weight: 700; letter-spacing: 0.01em;
}
.field-input input:focus { outline: none; border-color: var(--brand); box-shadow: 0 0 0 3px rgba(62, 160, 255, 0.16); }
.field-unit { font-size: calc(11px * var(--fs)); color: var(--muted); white-space: nowrap; }
.field-hint { font-size: calc(10.5px * var(--fs)); color: var(--dim); }

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
.sig-en { font-size: calc(12px * var(--fs)); font-weight: 600; }
.sig-th { font-size: calc(9.5px * var(--fs)); color: var(--dim); }
.sig.on .sig-th { color: var(--muted); }
.sig-mark { position: absolute; top: 8px; right: 8px; }
.sig-check { display: grid; place-items: center; width: 17px; height: 17px; border-radius: 50%; background: var(--brand); color: #04101f; }
.sig-check :deep(.ic) { width: 11px; height: 11px; stroke-width: 3.4; }
.sig-ring { display: block; width: 15px; height: 15px; border-radius: 50%; border: 1.5px solid rgba(120, 160, 200, 0.45); }
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
.node-label { font-size: calc(11.5px * var(--fs)); font-weight: 600; color: #eaf5ff; white-space: nowrap; }
.node-val { font-size: calc(12px * var(--fs)); font-weight: 700; color: var(--sig); }

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
.rel-label { font-size: calc(12px * var(--fs)); font-weight: 600; color: #eaf5ff; white-space: nowrap; }
.rel-val { font-size: calc(13px * var(--fs)); font-weight: 800; color: var(--sig); white-space: nowrap; }
.rel-node.lead .rel-label { font-size: calc(13px * var(--fs)); }
.rel-node.lead .rel-val { font-size: calc(15px * var(--fs)); }

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
.await-en { font-size: calc(12.5px * var(--fs)); }
.await-th { font-size: calc(10px * var(--fs)); color: var(--dim); }

/* ── 05 ── */
.flag {
  display: flex; gap: 11px; padding: 14px; margin-top: 18px; border-radius: 14px;
  background: rgba(190, 40, 50, 0.14); border: 1px solid rgba(240, 82, 82, 0.42);
}
.flag-ic { color: var(--danger); margin-top: 1px; }
.flag-en { font-size: calc(13.5px * var(--fs)); font-weight: 700; line-height: 1.45; color: #ffc9c9; }
.flag-th { margin-top: 6px; font-size: calc(11.5px * var(--fs)); line-height: 1.6; color: #e4a9a9; }

/* แถบเวลาพีค — ลอยชิดขวาบนภาพเมืองที่เป็นฉากหลังเต็มจอ */
.peak-badge {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  width: fit-content; min-width: 66%; margin-left: auto;
  padding: 11px 13px; border-radius: 12px;
  background: rgba(4, 14, 28, 0.8); border: 1px solid var(--line-on); backdrop-filter: blur(6px);
}
.peak-time { font-size: calc(15px * var(--fs)); font-weight: 800; color: #eaf6ff; }
.peak-cap { font-size: calc(9.5px * var(--fs)); color: var(--muted); margin-top: 2px; }
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
.tile-head { display: flex; align-items: center; gap: 7px; font-size: calc(10.5px * var(--fs)); font-weight: 600; color: #e3eefb; }
/* กล่องไอคอนสีประจำ signal ตามตัวอย่าง */
.tile-chip {
  display: grid; place-items: center; flex: none;
  width: 22px; height: 22px; border-radius: 7px;
  background: color-mix(in srgb, var(--sig) 20%, transparent);
  color: var(--sig);
}
.tile-chip :deep(.ic) { width: 13px; height: 13px; }
.tile-val { margin-top: 9px; font-size: 22px; font-weight: 800; line-height: 1.1; color: var(--sig); }
.tile-cap { margin-top: 4px; font-size: calc(8.5px * var(--fs)); line-height: 1.4; color: var(--muted); }

/* ── 06 ── */
.insight-list { display: flex; flex-direction: column; gap: 12px; }
.insight-list li { display: flex; gap: 11px; align-items: flex-start; }
.num {
  display: grid; place-items: center; flex: none; width: 19px; height: 19px; margin-top: 1px;
  border-radius: 50%; background: rgba(62, 160, 255, 0.16); border: 1px solid var(--line-on);
  font-size: calc(10px * var(--fs)); font-weight: 700; color: var(--brand);
}
.ins-en { display: block; font-size: calc(12px * var(--fs)); line-height: 1.45; }
.ins-th { display: block; margin-top: 3px; font-size: calc(10px * var(--fs)); line-height: 1.5; color: var(--dim); }

/* ── 07 ── */
.scn-tabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 20px; }
.scn-tab {
  padding: 13px 8px; border-radius: 11px; font-size: calc(13px * var(--fs)); cursor: pointer;
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
  font-size: calc(12px * var(--fs)); font-weight: 800; white-space: nowrap; pointer-events: none;
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
  margin: 12px 42px 0; font-size: calc(10.5px * var(--fs)); color: var(--dim);
}

.slider-box { margin-top: 20px; padding: 18px; border-radius: 14px; background: var(--card); border: 1px solid var(--line); }
.slider-head {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  font-size: calc(13px * var(--fs)); color: var(--muted);
}
.slider-rail { position: relative; padding-top: 16px; }
.slider-bubble {
  padding: 3px 11px; border-radius: 7px; background: var(--brand);
  color: #04101f; font-size: calc(11px * var(--fs)); font-weight: 800; white-space: nowrap;
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
.slider-ends { display: flex; justify-content: space-between; font-size: calc(10px * var(--fs)); color: var(--dim); }

/* ── แผง 01 ของหมวดโซลาร์: ไล่ที่มาของตัวเลข + ขนาดระบบ ── */
.sol-chain {
  margin-top: 14px; padding: 4px 2px;
  border-radius: 13px; background: var(--card); border: 1px solid var(--line);
}
.sol-row {
  display: flex; align-items: center; justify-content: space-between; gap: 10px;
  padding: 9px 13px; font-size: calc(12px * var(--fs));
}
.sol-row + .sol-row { border-top: 1px solid rgba(66, 133, 199, 0.14); }
.sol-k { display: flex; align-items: center; gap: 7px; color: var(--muted); min-width: 0; }
.sol-k :deep(.ic) { width: 15px; height: 15px; flex: none; }
.sol-v { font-weight: 800; color: #dceaf9; white-space: nowrap; font-variant-numeric: tabular-nums; }
.sol-v i { font-style: normal; font-weight: 600; font-size: calc(10.5px * var(--fs)); color: var(--dim); margin-left: 3px; }
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
.tile-u { margin-left: 4px; font-size: calc(12px * var(--fs)); font-weight: 700; color: var(--muted); }

.table-wrap { margin-top: 16px; border-radius: 14px; overflow-x: auto; background: var(--card); border: 1px solid var(--line); }
.sim-table { width: 100%; border-collapse: collapse; font-size: calc(13px * var(--fs)); white-space: nowrap; }
.sim-table th, .sim-table td { padding: 14px 12px; text-align: right; }
.sim-table th:first-child, .sim-table td:first-child { text-align: left; }
.sim-table thead th { font-size: calc(11px * var(--fs)); font-weight: 600; color: var(--dim); background: rgba(6, 18, 34, 0.7); }
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
  .sim-table { font-size: calc(11.5px * var(--fs)); }
  .sim-table th, .sim-table td { padding: 11px 5px; }
  .sim-table thead th { font-size: calc(9.5px * var(--fs)); }
  .cell-ic { margin-right: 5px; }
  .cell-ic :deep(.ic) { width: 12px; height: 12px; }
}
.cell-ic :deep(.ic) { width: 14px; height: 14px; }

/* ── 08 ── */
.reco { display: flex; gap: 12px; margin-top: 20px; align-items: flex-start; }
.pill { flex: none; padding: 4px 10px; border-radius: 7px; font-size: calc(9.5px * var(--fs)); font-weight: 800; letter-spacing: 0.05em; }
.pill.priority { background: rgba(34, 197, 94, 0.18); color: #6ee7a0; border: 1px solid rgba(34, 197, 94, 0.4); }
.pill.critical { background: rgba(240, 82, 82, 0.18); color: #ff9d9d; border: 1px solid rgba(240, 82, 82, 0.45); }
.pill.watch { background: rgba(62, 160, 255, 0.16); color: #8ecbff; border: 1px solid var(--line-on); }
.reco-en { font-size: calc(15.5px * var(--fs)); font-weight: 800; line-height: 1.35; }
.reco-th { margin-top: 7px; font-size: calc(12px * var(--fs)); line-height: 1.6; color: var(--muted); }

.more-recs { margin-top: 18px; }
.more-rec { display: flex; gap: 10px; align-items: flex-start; margin-top: 10px; }
.more-en { font-size: calc(12.5px * var(--fs)); font-weight: 700; line-height: 1.4; }
.more-th { margin-top: 4px; font-size: calc(11px * var(--fs)); line-height: 1.55; color: var(--muted); }

.why { display: flex; gap: 12px; margin-top: 20px; align-items: flex-start; }
.why-k { flex: none; font-size: calc(12px * var(--fs)); font-weight: 800; color: var(--brand); }
.why-en { font-size: calc(12.5px * var(--fs)); line-height: 1.5; color: #c6dbf0; }
.why-th { margin-top: 6px; font-size: calc(11.5px * var(--fs)); line-height: 1.6; color: var(--dim); }

.impacts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 9px; }
.impact {
  display: flex; flex-direction: column; align-items: center; gap: 5px; text-align: center;
  padding: 14px 7px; border-radius: 12px; font-size: calc(10px * var(--fs)); line-height: 1.35;
  background: var(--card); border: 1px solid var(--line);
}
.impact.good { color: #6ee7a0; border-color: rgba(34, 197, 94, 0.32); }
.impact.warn { color: #ff9d9d; border-color: rgba(240, 82, 82, 0.32); }

.closing {
  display: flex; gap: 12px; align-items: center; margin-top: 20px; padding: 16px;
  border-radius: 14px; background: rgba(23, 66, 116, 0.36); border: 1px solid var(--line-on);
}
.closing-ic { color: #6ee7a0; }
.closing p { font-size: calc(13.5px * var(--fs)); line-height: 1.55; color: #d6e7f8; }

.final-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 26px; }
.share-link {
  display: block; width: 100%; margin: 16px 0 30px; padding: 6px;
  font-size: calc(11.5px * var(--fs)); color: var(--brand); text-decoration: underline; text-underline-offset: 3px; cursor: pointer;
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
.panel .h-en, .panel .h-en.upper { font-size: calc(17px * var(--fs)); }
.panel .h-th { margin-top: 5px; font-size: calc(11px * var(--fs)); }
.panel .cols { display: block; margin-top: 0; }
.panel .list-title { margin: 16px 0 10px; font-size: calc(12.5px * var(--fs)); }
.panel .quote-mini { margin: 14px 0 0; font-size: calc(11.5px * var(--fs)); }

.panel .flag { margin-top: 12px; }
.panel .flag-en { font-size: calc(12px * var(--fs)); }
.panel .flag-th { font-size: calc(10.5px * var(--fs)); margin-top: 4px; }
.panel .peak-badge { margin-top: 12px; }
.panel-see .peak-badge { margin-top: auto; }
.panel-sim .flag { margin-top: auto; }
.panel .peak-time { font-size: calc(14px * var(--fs)); }
.panel .peak-cap { font-size: calc(9px * var(--fs)); }
.panel .tiles { margin-top: 12px; gap: 7px; }
.panel .tile { padding: 11px 8px 12px; }
.panel .tile-head { font-size: calc(9.5px * var(--fs)); gap: 5px; }
.panel .tile-chip { width: 21px; height: 21px; }
.panel .tile-val { margin-top: 6px; font-size: calc(19px * var(--fs)); }
.panel .tile-cap { font-size: calc(8px * var(--fs)); }

.panel .ring-wrap, .panel .ring-wrap.relations { max-width: 250px; margin: 8px auto 0; }
.panel .rel-node :deep(.ic) { width: 18px; height: 18px; }
.panel .rel-node.lead :deep(.ic) { width: 21px; height: 21px; }
.panel .rel-label, .panel .rel-node.lead .rel-label { font-size: calc(10px * var(--fs)); }
.panel .rel-val, .panel .rel-node.lead .rel-val { font-size: calc(11px * var(--fs)); }
.panel .insight-list { gap: 9px; }
.panel .ins-en { font-size: calc(11px * var(--fs)); }
.panel .ins-th { font-size: calc(9.5px * var(--fs)); }
.panel .num { flex: none; }

.panel .scn-tabs { margin-top: 14px; gap: 6px; }
.panel .scn-tab { font-size: calc(10.5px * var(--fs)); padding: 8px 4px; }
.panel .slider-box { margin-top: 12px; padding: 13px; }
.panel .slider-head { font-size: calc(11.5px * var(--fs)); }
.panel .slider-bubble { font-size: calc(10.5px * var(--fs)); padding: 3px 10px; }
.panel .table-wrap { margin-top: 12px; }
.panel .sim-table { font-size: calc(11px * var(--fs)); }
.panel .sim-table th, .panel .sim-table td { padding: 8px 7px; }
.panel .sim-table thead th { font-size: calc(9.5px * var(--fs)); }
.panel .cell-ic { margin-right: 5px; }
.panel .cell-ic :deep(.ic) { width: 12px; height: 12px; }

.panel .reco { margin-top: 12px; gap: 9px; }
.panel .reco-en { font-size: calc(13.5px * var(--fs)); }
.panel .reco-th { font-size: calc(11px * var(--fs)); margin-top: 5px; }
.panel .pill { font-size: calc(8.5px * var(--fs)); padding: 3px 8px; }
.panel .why { margin-top: 14px; gap: 9px; }
.panel .more-recs { margin-top: 14px; }
.panel .more-rec { gap: 8px; margin-top: 8px; }
.panel .more-en { font-size: calc(11px * var(--fs)); }
.panel .more-th { font-size: calc(9.5px * var(--fs)); margin-top: 3px; }
.panel .why-k { font-size: calc(11.5px * var(--fs)); }
.panel .why-en { font-size: calc(11px * var(--fs)); }
.panel .why-th { font-size: calc(10px * var(--fs)); }
.panel .impacts { gap: 6px; }
.panel .impact { font-size: calc(9px * var(--fs)); padding: 11px 5px; }
.panel .closing { margin-top: 14px; padding: 12px; gap: 9px; }
.panel .closing p { font-size: calc(11.5px * var(--fs)); }

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
  font-size: calc(13px * var(--fs)); font-weight: 700; color: #eaf7ff;
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
  font-size: calc(13px * var(--fs)); font-weight: 600; color: #cfe3f7;
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
  font-size: calc(14px * var(--fs)); font-weight: 800; letter-spacing: 0.09em;
  color: var(--accent); white-space: nowrap;
}
.demolink__label small { font-size: calc(11.5px * var(--fs)); letter-spacing: 0.06em; text-align: center; color: var(--muted); transition: color 0.35s var(--ease); }
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
  font-size: calc(14.5px * var(--fs)); letter-spacing: 0.095em;
  color: #ffffff;
  text-shadow: 0 0 18px color-mix(in srgb, var(--accent) 85%, transparent);
}
.demolink--lead .demolink__label small { font-size: calc(11.5px * var(--fs)); font-weight: 600; color: #dff3e6; }

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
  .demolink__label b { font-size: calc(12px * var(--fs)); letter-spacing: 0.05em; }
  .demolink--lead .demolink__label b { font-size: calc(12.5px * var(--fs)); letter-spacing: 0.055em; }
  .demolink__label small { font-size: calc(10.5px * var(--fs)); }
}

/* จอแคบ: สามปุ่มเรียงกันไม่ไหว ให้ซ้อนลงมาเป็นแถวเดียว */
@media (max-width: 820px) {
  .demo-row { grid-template-columns: 1fr; gap: 11px; }
  .demolink--lead, .demolink--lead:hover { transform: none; }
}

.btn-back { display: inline-flex; align-items: center; gap: 7px; font-size: calc(12.5px * var(--fs)); color: var(--muted); cursor: pointer; }
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
  .sim-table { font-size: calc(13px * var(--fs)); }
  .sim-table th, .sim-table td { padding: 13px 16px; }
}

/* มือถือ/แท็บเล็ตแนวนอน — บีบระยะให้เห็นเนื้อหาได้มากขึ้นในความสูงที่จำกัด */
@media (orientation: landscape) and (max-height: 560px) {
  .brand-bar { padding: 10px 16px 8px; }
  .progbar { padding-bottom: 12px; }
  .h-en { font-size: 21px; }
  .h-en.upper { font-size: calc(19px * var(--fs)); }
  .cover-img { height: 128px; }
  .peak-badge { margin-top: 24px; }
  .ring-wrap { max-width: 268px; margin: 12px auto; }
  .ring-node { --dot: 42px; }
  .node-label { font-size: calc(11.5px * var(--fs)); }
  .ring-core { font-size: calc(16px * var(--fs)); }
  .core-halo { width: 130px; height: 130px; }
  .rel-node { width: 26%; height: 26%; }
  .rel-node.lead { width: 29%; height: 29%; }
  .rel-node :deep(.ic) { width: 22px; height: 22px; }
  .rel-label { font-size: calc(10px * var(--fs)); }
  .rel-val { font-size: calc(11px * var(--fs)); }
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
  .h-th { font-size: calc(14px * var(--fs)); }
  .tag { font-size: calc(12px * var(--fs)); max-width: 200px; }
  .list-title { font-size: calc(16px * var(--fs)); }

  /* 01 */
  .org-row { padding: 16px 18px; }
  .org-en { font-size: calc(15px * var(--fs)); }
  .org-th { font-size: calc(12px * var(--fs)); }
  .quote-mini { font-size: calc(14px * var(--fs)); }
  .dd-title { font-size: calc(13px * var(--fs)); }
  .dd-sub { font-size: calc(11px * var(--fs)); }

  /* 02 */
  .screen-narrow { max-width: 640px; }
  .field { padding: 18px; }
  .field-label { font-size: calc(14px * var(--fs)); }
  .field-note { font-size: calc(12px * var(--fs)); }
  .field-input input { font-size: 22px; padding: 12px 15px; }
  .field-unit { font-size: calc(12.5px * var(--fs)); }
  .field-hint { font-size: calc(12px * var(--fs)); }

  /* 03 */
  .sig { padding: 20px 10px 16px; }
  .sig-en { font-size: calc(13.5px * var(--fs)); }
  .sig-th { font-size: calc(11px * var(--fs)); }
  .sub-q { font-size: calc(16px * var(--fs)); }
  .peak { font-size: calc(13.5px * var(--fs)); padding: 11px 18px; }

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
  .node-label { font-size: calc(14.5px * var(--fs)); }
  .await-list { gap: 15px; }
  .await-list li { grid-template-columns: 22px 1fr; gap: 13px; }
  .await-mark :deep(.ic) { width: 19px; height: 19px; }
  .hollow, .spin { width: 18px; height: 18px; }
  .await-en { font-size: calc(17px * var(--fs)); }
  .await-th { font-size: calc(13px * var(--fs)); }
  .rel-label { font-size: calc(14px * var(--fs)); }
  .rel-val { font-size: calc(15px * var(--fs)); }
  .rel-node.lead .rel-label { font-size: calc(15px * var(--fs)); }
  .rel-node.lead .rel-val { font-size: calc(17px * var(--fs)); }
  .ins-en { font-size: calc(14px * var(--fs)); }
  .ins-th { font-size: calc(11.5px * var(--fs)); }

  /* 05 */
  .flag-en { font-size: calc(15px * var(--fs)); }
  .flag-th { font-size: calc(12.5px * var(--fs)); }
  .peak-time { font-size: calc(17px * var(--fs)); }
  .peak-cap { font-size: calc(11px * var(--fs)); }
  .tile { padding: 16px 14px 17px; }
  .tile-head { font-size: calc(12px * var(--fs)); }
  .tile-chip { width: 26px; height: 26px; }
  .tile-val { font-size: 28px; }
  .tile-cap { font-size: calc(10.5px * var(--fs)); }

  /* 07 */
  .scn-tab { font-size: calc(14px * var(--fs)); padding: 14px 10px; }
  .slider-head { font-size: calc(14px * var(--fs)); }
  .slider-bubble { font-size: calc(12.5px * var(--fs)); padding: 4px 13px; }
  .sim-table { font-size: calc(14.5px * var(--fs)); }
  .sim-table th, .sim-table td { padding: 16px 18px; }
  .sim-table thead th { font-size: calc(12px * var(--fs)); }

  /* 08 */
  .reco-en { font-size: calc(18px * var(--fs)); }
  .reco-th { font-size: calc(13px * var(--fs)); }
  .why-k { font-size: calc(14px * var(--fs)); }
  .why-en { font-size: calc(14px * var(--fs)); }
  .why-th { font-size: calc(12.5px * var(--fs)); }
  .impact { font-size: calc(11.5px * var(--fs)); padding: 18px 10px; }
  .closing p { font-size: calc(15px * var(--fs)); }
  .share-link { font-size: calc(13px * var(--fs)); }

  /* ปุ่ม — ไม่ให้ปุ่มบันทึกยืดเต็มความกว้างจนเสียสัดส่วน */
  .btn-next, .btn-outline { font-size: calc(14.5px * var(--fs)); padding: 13px 26px; }
  .final-row .btn-next { flex: 0 1 auto; min-width: 320px; }

  /* จอสูงมาก: หัวข้ออยู่บน แล้วเนื้อหาหลักลอยกึ่งกลางพื้นที่ที่เหลือ
     ไม่ปล่อยให้กองอยู่ครึ่งบนแล้วเหลือช่องว่างท้ายหน้า */
  .screen:not(.screen-fill) { display: flex; flex-direction: column; }
  .screen:not(.screen-fill) > .cols { margin-top: auto; margin-bottom: auto; }
  /* หน้าวิเคราะห์ไม่ลอยกึ่งกลาง — ให้วงขึ้นไปชิดหัวเรื่อง ช่องว่างที่เหลือไปกองด้านล่างแทน */
  .screen > .cols-awaken { margin-top: 0; margin-bottom: auto; }
  .screen-narrow > .field-list { margin-top: auto; margin-bottom: auto; }
  .screen > .sig-grid { margin-top: auto; }
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
  .panel .tile-head { flex-direction: column; align-items: flex-start; gap: 4px; font-size: calc(10px * var(--fs)); }
  .panel .tile-chip { width: 19px; height: 19px; border-radius: 6px; }
  .panel .tile-chip :deep(.ic) { width: 11px; height: 11px; }
  .panel .tile-val { margin-top: 4px; font-size: calc(17px * var(--fs)); }
  .panel .tile-cap { margin-top: 2px; font-size: calc(8px * var(--fs)); line-height: 1.35; }

  /* โหนดในวงความสัมพันธ์: ไอคอน + ชื่อ + ตัวเลข ซ้อนกันสูงเกือบเท่าเส้นผ่านศูนย์กลาง
     แถวตัวเลขจึงไปอยู่ช่วงล่างที่คอร์ดของวงกลมแคบ แล้วล้นออกนอกขอบวง
     ย่อไอคอนกับตัวอักษรให้กองข้อความสั้นลง ทุกแถวจะขยับเข้าใกล้กลางวงที่กว้างกว่า */
  .panel .rel-node :deep(.ic) { width: 14px; height: 14px; }
  .panel .rel-node.lead :deep(.ic) { width: 16px; height: 16px; }
  .panel .rel-label, .panel .rel-node.lead .rel-label { font-size: calc(9px * var(--fs)); }
  .panel .rel-val, .panel .rel-node.lead .rel-val { font-size: calc(9.5px * var(--fs)); }

  /* ตารางมี 4 คอลัมน์ (Metric · Current · Scenario · Change) แต่แผงกว้างแค่ ~238px
     ค่าเดิมทำให้ตารางกว้างเกินจนคอลัมน์ Change หลุดออกนอกกรอบ เห็นไม่ครบ
     บีบระยะ + ให้หัวคอลัมน์ตัดบรรทัดได้ ตารางจะพอดีกรอบโดยไม่ต้องเลื่อนแนวนอน */
  .panel .sim-table { font-size: calc(10.5px * var(--fs)); }
  .panel .sim-table th, .panel .sim-table td { padding: 7px 4px; }
  .panel .sim-table thead th { font-size: calc(8.5px * var(--fs)); white-space: normal; line-height: 1.3; }
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

/* ══════════════ ห้องสมุด · หน้า 01–03 ══════════════ */

/* หมวดที่เลือกไว้ไล่สีม่วง→น้ำเงินตามแบบ และมีลูกศรชี้ต่อไปทางขวา */
.org-row.active {
  background: linear-gradient(95deg, rgba(109, 40, 217, 0.55), rgba(30, 64, 175, 0.5));
  border-color: rgba(167, 139, 250, 0.7);
  box-shadow: 0 0 0 1px rgba(167, 139, 250, 0.3), 0 10px 28px rgba(76, 29, 149, 0.3);
}
.org-row.active .org-ic { color: #ede9fe; }

/* ปุ่มไปต่อของห้องสมุดเต็มความกว้างและไล่สีเหมือนแบบ ไม่ใช่ปุ่มเล็กชิดขวา */
.dd-next--wide { display: block; }
.btn-next--grad {
  width: 100%; justify-content: center;
  padding: 14px 22px; font-size: calc(13.5px * var(--fs));
  background: linear-gradient(95deg, #7c3aed, #3b82f6 55%, #2563eb);
  box-shadow: 0 10px 30px rgba(99, 54, 221, 0.38);
}

/* ข้อความนำของช่องกรอก — มีขีดสีคั่นซ้ายแทนการใช้ภาพ */
.q-intro {
  display: grid; gap: 5px;
  padding: 2px 0 2px 13px;
  border-left: 2px solid var(--brand);
}
.q-intro b { font-size: calc(15px * var(--fs)); font-weight: 700; color: #eaf6ff; }
.q-intro span { font-size: calc(11.5px * var(--fs)); line-height: 1.6; color: var(--dim); }

/* ไอคอนช่องกรอกเป็นกล่องสีประจำช่อง ไม่ใช่เส้นเทาลอย ๆ */
.field-ic {
  display: grid; place-items: center; flex: none; align-self: flex-start;
  width: 38px; height: 38px; border-radius: 11px;
  background: color-mix(in srgb, var(--sig, #9ec6ee) 18%, transparent);
  color: var(--sig, #9ec6ee);
  margin-top: 0;
}
.field-ic :deep(.ic) { width: 21px; height: 21px; }

/* ══════════════ ห้องสมุด · หน้า 04 กำลังวิเคราะห์ ══════════════ */

.lw-head { margin-bottom: clamp(14px, 2.4vw, 26px); }
.lw-head .center { text-align: center; }
.lw-head .h-th-lead { font-size: clamp(19px, 2.4vw, 28px); }
.lw-head .h-en-sub { font-size: clamp(11px, 1.2vw, 14px); margin-top: 6px; }

/* เช็กลิสต์ซ้าย · ภาพขวา · แถบความคืบหน้าพาดเต็มความกว้างด้านล่าง */
.screen-lw { display: flex; flex-direction: column; }
.lw {
  display: grid; gap: clamp(16px, 3vw, 36px);
  grid-template-columns: 1fr;
  align-items: center;
  /* flex-grow + align-content ทำให้ช่องว่างที่เหลือถูกเกลี่ยบน-ล่าง แทนที่จะค้างไว้ใต้สุด */
  flex: 1 0 auto; align-content: center;
}
.lw-foot { grid-column: 1 / -1; margin-top: clamp(18px, 4vh, 44px); }

.lw-steps { display: flex; flex-direction: column; gap: clamp(12px, 1.8vw, 20px); list-style: none; margin: 0; }
.lw-steps li {
  display: grid; grid-template-columns: 30px 1fr; gap: 14px; align-items: center;
  opacity: 0.4; transition: opacity 0.35s;
}
.lw-steps li.done, .lw-steps li.now { opacity: 1; }
.lw-mark {
  display: grid; place-items: center; width: 30px; height: 30px; border-radius: 50%;
  background: rgba(34, 197, 94, 0.16); color: var(--good);
}
.lw-steps li:not(.done) .lw-mark { background: rgba(120, 160, 200, 0.12); }
.lw-mark :deep(.ic) { width: 17px; height: 17px; stroke-width: 3; }
/* ขั้นที่กำลังทำ = วงหมุน · ขั้นที่ยังไม่ถึง = วงกลมกลวง */
.lw-mark .spin {
  width: 17px; height: 17px; border-radius: 50%;
  border: 2px solid rgba(110, 231, 183, 0.3); border-top-color: var(--good);
  animation: lwSpin 0.9s linear infinite;
}
@keyframes lwSpin { to { transform: rotate(360deg); } }
.lw-mark .hollow { width: 15px; height: 15px; border-radius: 50%; border: 1.6px solid rgba(120, 160, 200, 0.4); }
.lw-text { font-size: clamp(14px, 1.7vw, 19px); line-height: 1.6; color: #d8e6f7; }

/* ── ภาพอาคาร ── */
.lw-art { position: relative; width: 100%; max-width: 440px; margin: 0 auto; aspect-ratio: 1200 / 838; }
.lw-svg { position: absolute; inset: 0; width: 100%; height: 100%; }

/* ภาพอาคารไอโซเมตริก — ไฟล์ตัดพื้นหลังออกแล้ว (อัลฟาโปร่ง) จึงไม่ต้องมาสก์ขอบช่วย */
.lw-photo {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: contain;
  filter: saturate(1.06) contrast(1.04) drop-shadow(0 0 26px rgba(56, 189, 248, 0.22));
  animation: lwPhotoIn 0.9s ease both;
}
@keyframes lwPhotoIn {
  from { opacity: 0; transform: scale(0.94); }
  to { opacity: 1; transform: none; }
}

/* คลื่นที่ฐาน */
.lw-pulse {
  fill: none; stroke: rgba(94, 234, 212, 0.5); stroke-width: 1.4;
  transform-origin: 195px 179px;
  animation: lwPulse 3.6s ease-out infinite;
}
.lw-pulse--2 { animation-delay: -1.8s; }
@keyframes lwPulse {
  0% { transform: scale(0.45); opacity: 0; }
  25% { opacity: 0.75; }
  100% { transform: scale(1.35); opacity: 0; }
}

/* ประกายลอยขึ้น */
.lw-spark {
  position: absolute; width: var(--sz); height: var(--sz); border-radius: 50%;
  background: #a5f3fc; box-shadow: 0 0 8px rgba(103, 232, 249, 0.9);
  opacity: 0; pointer-events: none;
  animation: lwRise linear infinite;
}
@keyframes lwRise {
  0% { transform: translateY(0); opacity: 0; }
  18% { opacity: 0.95; }
  75% { opacity: 0.55; }
  100% { transform: translateY(-190px); opacity: 0; }
}
/* สายข้อมูลเป็นริบบิ้นยาว ค่อย ๆ ไหลเข้าหาอาคาร ไม่ใช่เส้นประสั้น ๆ */
.lw-flows path {
  fill: none; stroke-width: 2.2; stroke-linecap: round;
  stroke-dasharray: 700 300;
  filter: drop-shadow(0 0 6px rgba(139, 92, 246, 0.55));
  animation: lwFlow 7.5s linear infinite;
}
.lw-flows path:nth-child(2) { animation-delay: -2.5s; }
.lw-flows path:nth-child(3) { animation-delay: -5s; }
@keyframes lwFlow { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }

.lw-bubble {
  position: absolute; transform: translate(-50%, -50%) scale(0.6);
  display: grid; place-items: center;
  width: clamp(42px, 11%, 62px); aspect-ratio: 1; border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--sig) 88%, #fff), var(--sig));
  color: #06131f;
  box-shadow: 0 0 20px color-mix(in srgb, var(--sig) 55%, transparent);
  opacity: 0; transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.4);
  transition-delay: calc(var(--i) * 0.08s);
}
.lw-bubble.on { opacity: 1; transform: translate(-50%, -50%) scale(1); }
.lw-bubble :deep(.ic) { position: relative; z-index: 1; width: 52%; height: 52%; stroke-width: 2; }

/* วงคลื่นรอบฟอง แผ่ออกทีละจังหวะ — มีเฉพาะดวงที่ขึ้นมาแล้ว */
.lw-bubble__ring {
  position: absolute; inset: 0; border-radius: 50%;
  border: 1.5px solid var(--sig); opacity: 0;
}
.lw-bubble.on .lw-bubble__ring {
  animation: lwRing 2.8s ease-out infinite;
  animation-delay: calc(var(--i) * 0.45s);
}
@keyframes lwRing {
  0% { transform: scale(1); opacity: 0.7; }
  70% { transform: scale(1.9); opacity: 0; }
  100% { transform: scale(1.9); opacity: 0; }
}

/* ลอยขึ้นลงเบา ๆ คนละจังหวะ ไม่ให้ดูเป็นไอคอนแปะนิ่ง */
.lw-bubble.on { animation: lwFloat 5.2s ease-in-out infinite; animation-delay: calc(var(--i) * 0.6s); }
@keyframes lwFloat {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, calc(-50% - 7px)) scale(1); }
}

/* ── แถบความคืบหน้า ── */
.lw-bar {
  height: 6px; border-radius: 999px; overflow: hidden;
  background: rgba(120, 160, 200, 0.16);
}
.lw-bar > span {
  display: block; height: 100%; border-radius: 999px;
  background: linear-gradient(90deg, #22d3ee, #6366f1, #d946ef);
  transition: width 0.6s cubic-bezier(0.3, 0.9, 0.3, 1);
}
.lw-ready {
  margin-top: clamp(12px, 1.8vw, 18px); text-align: center;
  font-size: clamp(20px, 2.6vw, 30px); font-weight: 700; color: #eaf6ff;
}
.lw-sub { margin-top: 6px; text-align: center; font-size: clamp(12px, 1.35vw, 16px); color: var(--dim); }

@media (min-width: 820px) {
  .lw { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); }
  .lw-art { margin: 0; max-width: 560px; }
}

/* ══════════════ ห้องสมุด ══════════════ */

/* แผงของห้องสมุดเป็นกราฟแท่งเต็มความกว้าง ภาพเมืองด้านหลังทำให้สีของแท่งขุ่น
   อ่านระดับความหนาแน่นไม่ออก — แผงนี้จึงเป็นพื้นทึบล้วนตามแบบ ไม่มีภาพประกอบ */
.panel-quiet > .screen-photo { display: none; }

/* ── 01 · เลือกสิ่งที่ต้องการเข้าใจ ── */
.foc-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; margin-top: 12px; }
.foc {
  position: relative; display: flex; align-items: center; gap: 10px; text-align: left;
  padding: 13px 30px 13px 12px; border-radius: 13px; cursor: pointer;
  background: rgba(10, 25, 44, 0.55); border: 1px solid var(--line);
  transition: border-color 0.2s, background 0.2s;
}
.foc.on {
  border-color: color-mix(in srgb, var(--sig) 62%, transparent);
  background: color-mix(in srgb, var(--sig) 13%, rgba(10, 25, 44, 0.6));
}
.foc-ic {
  display: grid; place-items: center; flex: none; width: 30px; height: 30px;
  border-radius: 9px; color: var(--sig);
  background: color-mix(in srgb, var(--sig) 18%, transparent);
}
.foc-ic :deep(.ic) { width: 17px; height: 17px; }
.foc-txt { display: grid; gap: 2px; min-width: 0; }
.foc-th { font-size: calc(11.5px * var(--fs)); font-weight: 600; color: #e3eefb; }
.foc-en { font-size: calc(9.5px * var(--fs)); color: var(--dim); }
.foc-check {
  position: absolute; top: 9px; right: 9px;
  display: grid; place-items: center; width: 16px; height: 16px;
  border-radius: 50%; background: var(--sig); color: #04101f;
}
.foc-check :deep(.ic) { width: 10px; height: 10px; stroke-width: 3.6; }

/* ── 01 · ช่วงเวลาที่มีผู้ใช้มากที่สุด ── */
.lpk-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-top: 10px; }
.lpk {
  position: relative; display: flex; flex-direction: column; align-items: center; gap: 3px;
  padding: 12px 8px; border-radius: 12px; cursor: pointer;
  background: rgba(10, 25, 44, 0.55); border: 1px solid var(--line); color: var(--muted);
}
.lpk.on { border-color: var(--brand); color: #dcefff; background: rgba(23, 66, 116, 0.5); }
.lpk-ic :deep(.ic) { width: 19px; height: 19px; }
.lpk-th { font-size: calc(11.5px * var(--fs)); font-weight: 600; }
.lpk-win { font-size: calc(9px * var(--fs)); color: var(--dim); }
.lpk.on .lpk-win { color: var(--muted); }
/* กรอบเวลาเป็นข้อมูลที่ใช้ตัดสินใจจริง จึงเด่นกว่าชื่อภาษาอังกฤษที่อยู่ล่างสุด
   ใช้ตัวเลขความกว้างเท่ากันทุกหลัก เลขจะได้ไม่ขยับตอนสลับช่วง */
.lpk-time {
  font-size: calc(10.5px * var(--fs));
  font-weight: 600;
  color: var(--cyan);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.01em;
}
.lpk.on .lpk-time { color: #9ee9ff; }
.lpk-check {
  position: absolute; top: 7px; right: 7px;
  display: grid; place-items: center; width: 15px; height: 15px;
  border-radius: 50%; background: var(--brand); color: #04101f;
}
.lpk-check :deep(.ic) { width: 9px; height: 9px; stroke-width: 3.6; }

/* ── หัวแผง: ไทยนำ + ป้ายชื่อแผง ── */
.p-head { display: flex; align-items: flex-start; gap: 10px; }
.p-head > div { flex: 1; min-width: 0; }
.h-th-lead { font-size: calc(16px * var(--fs)); font-weight: 700; line-height: 1.3; color: #eaf6ff; }
.h-en-sub { margin-top: 3px; font-size: calc(9.5px * var(--fs)); letter-spacing: 0.05em; line-height: 1.4; color: var(--dim); }
.p-chip {
  flex: none; padding: 5px 10px; border-radius: 999px; font-size: calc(9px * var(--fs)); white-space: nowrap;
  background: rgba(62, 160, 255, 0.14); border: 1px solid var(--line-on); color: #9ecbff;
}

/* ── 05 · ตัวเลขหลักสามช่อง ── */
.lk-row { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-top: 16px; }
.lk {
  display: grid; align-content: start; gap: 2px;
  padding: 11px 10px 12px; border-radius: 12px;
  background: rgba(8, 20, 37, 0.8); border: 1px solid var(--line-on);
}
.lk-k { font-size: calc(9px * var(--fs)); line-height: 1.35; color: var(--muted); }
/* ตัวเลขเป็นพระเอกของการ์ด จึงบีบ line-height ให้ชิด ไม่ให้มีช่องว่างคั่นกับหน่วย */
.lk-v { margin-top: 2px; font-size: 24px; font-weight: 800; line-height: 1.05; color: #eaf6ff; }
.lk-u { display: flex; align-items: center; gap: 4px; font-size: calc(9.5px * var(--fs)); color: var(--dim); }
.lk-u :deep(.ic) { width: 11px; height: 11px; }
/* ตัวเลขเทียบสัปดาห์ก่อนอยู่บรรทัดเดียวกัน ไม่ตัดคำลงไปดันการ์ดให้สูงกว่าเพื่อน */
.lk-d {
  display: flex; align-items: baseline; flex-wrap: wrap; gap: 0 4px; margin-top: 4px;
  font-size: calc(10px * var(--fs)); color: var(--good);
}
.lk-d :deep(.ic) { width: 10px; height: 10px; align-self: center; }
.lk-d small { font-size: calc(8.5px * var(--fs)); color: var(--dim); }

/* ── 05 · กราฟความหนาแน่นรายวัน ── */
.lb-title { margin-top: 20px; font-size: calc(11.5px * var(--fs)); font-weight: 600; color: #cfe0ff; }
.lb-title--gap { margin-top: 24px; }
.lb-chart { margin-top: 10px; margin-bottom: 16px; }
.lb-plot { display: flex; gap: 8px; height: 132px; }
.lb-yaxis {
  display: flex; flex-direction: column; justify-content: space-between;
  flex: none; font-size: calc(8.5px * var(--fs)); color: var(--dim);
}
/* แท่งวางบนเส้นฐานเดียวกัน ความสูงเป็น % ของกรอบ จึงต้องชิดล่าง */
.lb-bars {
  flex: 1; display: flex; align-items: flex-end; gap: 2px;
  padding-bottom: 1px; border-bottom: 1px solid var(--line);
}
.lb-bar {
  flex: 1; min-height: 3px; border-radius: 3px 3px 0 0;
  animation: lbBar 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.2) backwards;
}
/* แท่งของชั่วโมงปัจจุบันเรืองขึ้นเฉย ๆ — เดิมใช้กรอบขาวแล้วอ่านเป็นกล่องแปลกปลอมกลางกราฟ */
.lb-bar.now { filter: brightness(1.35); }
@keyframes lbBar { from { height: 0 !important; } }
.lb-xaxis {
  display: flex; gap: 2px; margin-top: 5px; padding-left: 30px;
  font-size: calc(8.5px * var(--fs)); color: var(--dim);
}
.lb-xaxis span { flex: 1; text-align: center; white-space: nowrap; }

/* การ์ดนี้เป็นการ์ดมืดปกติ ไม่ใช่กล่องเตือนสีเหลือง — เน้นด้วยไอคอนหลอดไฟพอ
   ไม่งั้นจะแย่งความสำคัญไปจากกราฟด้านบนที่เป็นพระเอกของแผง */
/* ดันลงไปชิดก้นแผง — แผงทั้งสี่สูงเท่ากัน ถ้าปล่อยไว้แผงนี้จะเหลือที่ว่างค้างข้างล่าง */
.lb-now {
  display: flex; align-items: center; gap: 11px; margin-top: auto;
  padding: 13px; border-radius: 13px;
  background: rgba(8, 20, 37, 0.8); border: 1px solid var(--line);
}
.lb-now__ic {
  display: grid; place-items: center; flex: none; width: 30px; height: 30px;
  border-radius: 9px; background: rgba(251, 191, 36, 0.16); color: #fbbf24;
}
.lb-now__ic :deep(.ic) { width: 17px; height: 17px; }
.lb-now p { flex: 1; min-width: 0; font-size: calc(10.5px * var(--fs)); line-height: 1.6; color: var(--dim); }
.lb-now b { font-size: calc(11px * var(--fs)); color: #ffe9b0; }
.lb-now > :deep(.ic) { flex: none; width: 15px; height: 15px; color: var(--muted); }

/* ── 06 · ข้อสังเกต + ความสัมพันธ์ที่พบ ── */
/* กล่อง "ความสัมพันธ์ที่พบ" ลงไปชิดก้นแผงด้วยเหตุผลเดียวกับ .lb-now */
.li-wrap { display: flex; flex-direction: column; flex: 1; margin-top: 18px; }
.li-list { display: flex; flex-direction: column; gap: 11px; margin-bottom: 14px; }
.li-list li {
  display: flex; align-items: flex-start; gap: 11px;
  padding: 12px; border-radius: 13px;
  background: rgba(8, 20, 37, 0.7); border: 1px solid var(--line);
}
.li-ic {
  display: grid; place-items: center; flex: none; width: 28px; height: 28px;
  border-radius: 9px; color: var(--sig);
  background: color-mix(in srgb, var(--sig) 18%, transparent);
}
.li-ic :deep(.ic) { width: 16px; height: 16px; }
.li-th { font-size: calc(11px * var(--fs)); line-height: 1.65; color: #d8e6f7; }

.li-rel {
  display: flex; align-items: flex-start; gap: 11px; margin-top: auto;
  padding: 13px; border-radius: 13px;
  background: rgba(62, 160, 255, 0.1); border: 1px solid var(--line-on);
}
.li-rel__ic { flex: none; color: var(--brand); }
.li-rel__k { font-size: calc(11px * var(--fs)); font-weight: 700; color: #9ecbff; }
.li-rel__v { margin-top: 5px; font-size: calc(10.5px * var(--fs)); line-height: 1.7; color: #cfe0ff; }

/* ── 07 · เส้นคาดการณ์ 7 วัน ── */
.lf-legend { display: flex; gap: 14px; margin-top: 8px; font-size: calc(9.5px * var(--fs)); color: var(--muted); }
.lf-legend span { display: flex; align-items: center; gap: 5px; }
.lf-legend i { width: 8px; height: 8px; border-radius: 50%; }

.lf-chart { position: relative; margin-top: 8px; }
/* svg ยืดตามความกว้างแผง ส่วนความสูงคงที่ เส้นจึงไม่แบนลงบนจอแคบ */
.lf-svg { display: block; width: 100%; height: 150px; overflow: visible; }
.lf-grid { stroke: rgba(120, 160, 200, 0.16); stroke-width: 1; }
.lf-line { fill: none; stroke-width: 2; stroke-linejoin: round; stroke-linecap: round; }
.lf-line.cur { stroke: #60a5fa; }
.lf-line.pre { stroke: #e879f9; }
.lf-dot.cur { fill: #60a5fa; }
.lf-dot.pre { fill: #e879f9; }
/* ตัวเลขแกน Y ลอยทับมุมซ้ายของกราฟ ไม่กินความกว้างของเส้น
   เส้นกริดบนสุดอยู่ที่ y=10 และล่างสุดที่ y=130 ของ viewBox สูง 148 ที่ถูกยืดเป็น 150px
   จึงเลื่อนลงมาชดเชยครึ่งบรรทัด ตัวเลขจะได้อยู่กึ่งกลางเส้นพอดี */
.lf-yaxis {
  position: absolute; left: 0; top: 5px; height: 122px;
  display: flex; flex-direction: column; justify-content: space-between;
  font-size: calc(8.5px * var(--fs)); color: var(--dim); pointer-events: none;
}
/* ป้ายเตือนขึ้นบรรทัดเองด้วย <br> แล้ว ถ้าปล่อยให้ตัดคำตามความกว้างแผง
   ตอนเรียง 4 คอลัมน์มันจะถูกบีบจนเป็นแท่งสูงพาดทับเส้นกราฟ */
.lf-flag {
  position: absolute; top: -2px; transform: translateX(-50%); white-space: nowrap;
  padding: 6px 10px; border-radius: 10px; text-align: center; line-height: 1.35;
  font-size: calc(9.5px * var(--fs)); font-weight: 700; color: #ffd9d9;
  background: rgba(190, 40, 50, 0.9); border: 1px solid rgba(240, 82, 82, 0.6);
}
.lf-flag small { font-size: calc(8.5px * var(--fs)); font-weight: 500; opacity: 0.85; }
.lf-xaxis { display: flex; margin-top: 4px; font-size: calc(9px * var(--fs)); color: var(--dim); }
.lf-xaxis span { flex: 1; text-align: center; }

/* ── 07 · การ์ดสถานการณ์ ── */
.ls-row { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-top: 10px; }
.ls {
  display: grid; gap: 3px; padding: 12px 9px; border-radius: 12px; cursor: pointer;
  background: rgba(10, 25, 44, 0.55); border: 1px solid var(--line); color: var(--muted);
}
.ls.on { border-color: var(--brand); background: rgba(23, 66, 116, 0.55); color: #dcefff; }
.ls-th { font-size: calc(11.5px * var(--fs)); font-weight: 600; }
.ls-sub { font-size: calc(13px * var(--fs)); font-weight: 800; color: #eaf6ff; }
.ls-v { font-size: calc(9px * var(--fs)); color: var(--dim); }
.ls.on .ls-v { color: var(--muted); }

.lf-note {
  display: flex; align-items: flex-start; gap: 11px; margin-top: 14px;
  padding: 13px; border-radius: 13px;
  background: rgba(8, 20, 37, 0.7); border: 1px solid var(--line);
}
.lf-note__ic { flex: none; color: var(--brand); }
.lf-note p { font-size: calc(10.5px * var(--fs)); line-height: 1.7; color: #cfe0ff; }

/* ── 08 · ข้อเสนอแนะ ── */
.lr-wrap { display: flex; flex-direction: column; gap: 9px; margin-top: 18px; }
.lr {
  border-radius: 13px; overflow: hidden;
  background: rgba(8, 20, 37, 0.7); border: 1px solid var(--line);
  transition: border-color 0.2s;
}
.lr.open { border-color: color-mix(in srgb, var(--sig) 55%, transparent); }
.lr-head { display: flex; align-items: center; gap: 10px; padding: 11px; }
.lr-ic {
  display: grid; place-items: center; flex: none; width: 28px; height: 28px;
  border-radius: 8px; color: var(--sig);
  background: color-mix(in srgb, var(--sig) 18%, transparent);
}
.lr-ic :deep(.ic) { width: 16px; height: 16px; }
.lr-txt { flex: 1; min-width: 0; }
.lr-title { font-size: calc(11px * var(--fs)); font-weight: 700; line-height: 1.35; color: #e3eefb; }
.lr-sub { margin-top: 2px; font-size: calc(9.5px * var(--fs)); line-height: 1.5; color: var(--dim); }
/* ปุ่มเล็กและไม่ตัดคำ ไม่งั้นมันกินความกว้างจนชื่อข้อเสนอแนะถูกบีบขึ้นบรรทัดใหม่ */
.lr-more {
  flex: none; display: flex; align-items: center; gap: 4px; white-space: nowrap;
  padding: 6px 9px; border-radius: 8px; font-size: calc(9px * var(--fs)); cursor: pointer;
  background: rgba(62, 160, 255, 0.12); border: 1px solid var(--line-on); color: #9ecbff;
}
.lr-more :deep(.ic) { width: 10px; height: 10px; }
.lr-detail {
  display: flex; flex-direction: column; gap: 6px;
  padding: 0 11px 12px 49px; font-size: calc(9.5px * var(--fs)); line-height: 1.6; color: #cfe0ff;
}
.lr-detail li { list-style: disc; }

/* การ์ดปลายทาง — เด่นกว่ารายการข้างบน เพราะเป็นสิ่งที่ให้กดต่อจริง */
.lr-student {
  display: flex; align-items: center; gap: 12px; margin-top: 5px;
  padding: 14px 13px; border-radius: 14px; text-decoration: none;
  background: linear-gradient(105deg, rgba(124, 58, 237, 0.4), rgba(59, 130, 246, 0.34));
  border: 1px solid rgba(167, 139, 250, 0.5);
  box-shadow: 0 0 22px rgba(124, 58, 237, 0.2);
}
.lr-student__ic {
  display: grid; place-items: center; flex: none; width: 32px; height: 32px;
  border-radius: 10px; background: rgba(255, 255, 255, 0.16); color: #ffe9b0;
}
.lr-student__txt { flex: 1; display: grid; gap: 3px; min-width: 0; }
.lr-student__txt b { font-size: calc(11.5px * var(--fs)); color: #fff; }
.lr-student__txt small { font-size: calc(9.5px * var(--fs)); line-height: 1.55; color: #ddd6fe; }
.lr-student > :deep(.ic) { flex: none; width: 16px; height: 16px; color: #ddd6fe; }

/* ตั้งแต่ 1000px หน้าผลลัพธ์วาง 4 แผงเรียงข้างกัน แผงจึงเหลือกว้างแค่ ~238px บน iPad Mini
   แต่บล็อก 640px ขยาย .lk-v เป็น 28px กับ .h-th-lead เป็น 19px ไว้ตอนที่แผงยังเต็ม/ครึ่งความกว้าง
   ค่าเดิมจึงใหญ่เกินการ์ด — ไล่ขนาดตามความกว้างจอ แล้วไปบรรจบค่าเดิมพอดีที่ 1320px จะได้ไม่กระโดดตอนข้ามช่วง */
@media (min-width: 1000px) and (max-width: 1320px) {
  .panel .p-head { gap: 7px; }
  .panel .p-head .h-th-lead { font-size: clamp(13px, calc(1.88vw - 5.75px), 19px); }
  .panel .p-chip { padding: 4px 7px; font-size: calc(8px * var(--fs)); }

  .panel .lk { padding: 9px 7px 10px; }
  .panel .lk-v { font-size: clamp(17px, calc(3.44vw - 17.38px), 28px); }
  /* "(368 / 450)" เป็นบรรทัดที่ตัดคำไม่ได้ จึงต้องย่อตามการ์ดด้วย */
  .panel .lk-u { gap: 3px; font-size: clamp(8.2px, calc(0.41vw + 4.14px), 9.5px); }
  .panel .lk-u :deep(.ic) { width: 9px; height: 9px; }

  .panel .lb-plot { height: clamp(100px, 10vw, 132px); }
  .panel .ls { padding: 10px 7px; }

  /* ความสูงของทั้งแถวมาจากแผงข้อเสนอแนะที่ยาวที่สุด บน iPad Mini (สูง 768px) จึงยาวเกินจอ
     ตัวการหลักคือปุ่ม "ดูรายละเอียด" ที่ nowrap กินกว้าง ~94px จากเนื้อที่การ์ด ~194px
     เหลือให้ข้อความแค่ ~52px ทุกบรรทัดเลยตัดคำเป็น 3-4 บรรทัด
     ย่อปุ่มเหลือหัวลูกศร — ข้อความยังอยู่ใน DOM ให้ screen reader อ่านได้เหมือนเดิม */
  .panel .lr-more { gap: 0; padding: 6px; font-size: 0; }
  .panel .lr-more :deep(.ic) { width: 13px; height: 13px; }

  /* บีบระยะแนวตั้งของการ์ดย่อย และเลิกดันท้ายแผงด้วย margin-top: auto
     (เหตุผลเดียวกับ .peak-badge ในบล็อก 1000px ด้านบน — ช่องว่างควรไปกองท้ายการ์ด ไม่เปิดเป็นช่องโหว่กลางแผง) */
  .panel { padding: 13px 11px 15px; }
  .panel .lk-row { margin-top: 12px; }
  .panel .lb-title { margin-top: 14px; }
  .panel .lb-chart { margin-bottom: 12px; }
  .panel .lb-now { margin-top: 12px; gap: 9px; padding: 10px; }
  .panel .lb-now__ic { width: 26px; height: 26px; }
  .panel .li-wrap { margin-top: 13px; }
  .panel .li-list { gap: 8px; margin-bottom: 10px; }
  .panel .li-list li { gap: 9px; padding: 9px; }
  .panel .li-ic { width: 24px; height: 24px; }
  .panel .li-rel { margin-top: 10px; gap: 9px; padding: 10px; }
  .panel .ls-row { margin-top: 8px; }
  .panel .lf-note { margin-top: 11px; gap: 9px; padding: 10px; }
  .panel .lr-wrap { margin-top: 13px; gap: 7px; }
  .panel .lr-head { gap: 8px; padding: 9px; }
  .panel .lr-student { margin-top: 4px; gap: 9px; padding: 10px; }
  .panel .lr-student__ic { width: 27px; height: 27px; }
}

@media (min-width: 640px) {
  /* คงไว้ 2 คอลัมน์ตามแบบ — 3 คอลัมน์แล้วชื่อไทยยาว ๆ อย่าง "ความหนาแน่นผู้ใช้" จะตัดคำ */
  /* ช่วงเวลาเรียงเต็มแถวเสมอ ห้องสมุดมีสามช่วง หมวดอื่นมีสี่ช่วง จึงไม่ล็อกจำนวนคอลัมน์ */
  .lpk-row { grid-template-columns: repeat(auto-fit, minmax(128px, 1fr)); }
  .h-th-lead { font-size: calc(19px * var(--fs)); }
  .lk-v { font-size: 28px; }
}


/* ══════════════ หมวดคณะ ══════════════ */

/* ── ชุดสีม่วงของหมวดคณะ ──
   ทับเฉพาะตัวแปรสี ทุกบล็อกที่อ้าง var(--brand) / var(--line) จึงเปลี่ยนตามเองทั้งหน้า
   โดยไม่ต้องเขียนกฎซ้ำต่อคอมโพเนนต์ */
.momay-demo.theme-violet {
  --bg: #08061a;
  --bg2: #150f31;
  --card: rgba(24, 18, 52, 0.72);
  --line: rgba(139, 110, 220, 0.24);
  --line-on: rgba(167, 139, 250, 0.58);
  --text: #ece7fb;
  --muted: #a99cc9;
  --dim: #8478a6;
  --brand: #a78bfa;
  --cyan: #c4b5fd;
  background:
    radial-gradient(120% 80% at 50% -10%, #2c1f63 0%, transparent 60%),
    radial-gradient(90% 60% at 90% 110%, #1d1445 0%, transparent 55%),
    linear-gradient(180deg, var(--bg2) 0%, var(--bg) 55%);
  background-color: var(--bg);
}
.momay-demo.theme-violet::before {
  background-image:
    linear-gradient(rgba(167, 139, 250, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(167, 139, 250, 0.06) 1px, transparent 1px);
}
.theme-violet .p-chip,
.theme-violet .lk,
.theme-violet .li-rel {
  background: rgba(167, 139, 250, 0.14);
  border-color: var(--line-on);
  color: #cfc2fb;
}
.theme-violet .lk-v { color: #f2ecff; }

/* จุดที่ฝังสีฟ้าไว้ตรง ๆ (ไม่ได้อ้าง var) ต้องทับเป็นรายตัว
   ไล่จากหน้า 01 (แถวหมวด · การ์ดกรอกข้อมูล · ปุ่ม) ไปถึงแผงผลลัพธ์และแถบความคืบหน้า */
.theme-violet .panel {
  background: linear-gradient(180deg, rgba(38, 28, 74, 0.55), rgba(20, 14, 44, 0.66));
}
.theme-violet .org-row { background: rgba(24, 18, 52, 0.6); }
.theme-violet .org-row.active {
  background: linear-gradient(92deg, rgba(91, 52, 178, 0.62), rgba(40, 26, 84, 0.5));
  box-shadow: 0 0 0 1px rgba(167, 139, 250, 0.3), 0 8px 26px rgba(109, 60, 210, 0.24);
}
.theme-violet .org-ic { color: #d3c5f8; }
.theme-violet .org-row.active .org-ic { color: #f6f1ff; }
.theme-violet .dd-inner {
  background: linear-gradient(180deg, rgba(50, 36, 96, 0.72), rgba(30, 21, 62, 0.72));
  border-color: rgba(167, 139, 250, 0.36);
  box-shadow: inset 0 1px 0 rgba(196, 181, 253, 0.12), 0 12px 30px rgba(6, 4, 20, 0.5);
}
.theme-violet .field-ic { color: #c0acf0; }
.theme-violet .btn-next {
  background: linear-gradient(95deg, #6d3cd2, #9061f0);
  box-shadow: 0 8px 26px rgba(109, 60, 210, 0.4);
}
.theme-violet .btn-next--grad {
  background: linear-gradient(95deg, #7c3aed, #a855f7 55%, #8b5cf6);
  box-shadow: 0 10px 30px rgba(124, 58, 237, 0.42);
}
.theme-violet .fill {
  background: linear-gradient(90deg, #6d3cd2, var(--cyan));
  box-shadow: 0 0 10px rgba(196, 181, 253, 0.5);
}
.theme-violet .diamond { background: #ede9fe; }

/* ── 01 · ตารางหัวข้อของคณะ ──
   หกหัวข้อ สองคอลัมน์ ใช้การ์ด .foc กับเครื่องหมายถูก .foc-check ชุดเดียวกับหมวดอื่น
   จึงไม่มีกฎของตัวเองนอกจากจำนวนคอลัมน์ */
.foc-grid--fac { grid-template-columns: repeat(2, minmax(0, 1fr)); }

/* สี่ช่วงเวลาของคณะวางเป็น 2 + 2 — ล็อกสองคอลัมน์ไว้ทุกความกว้าง
   เคยเป็นห้าช่วงวางสามคอลัมน์ พอตัด "ไม่แน่ใจ" ออกเหลือสี่ ถ้ายังล็อกสามคอลัมน์
   จะได้ 3 + 1 แล้วใบสุดท้ายเหลือโดดอยู่แถวล่าง
   สองคอลัมน์ยังตรงกับตารางหัวข้อ .foc-grid--fac ที่อยู่เหนือขึ้นไปด้วย */
.lpk-row--fac { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }

/* ── 05 · กล่อง INSIGHT เปิดแผง ── */
.fi {
  display: flex; align-items: flex-start; gap: 11px; margin-top: 16px;
  padding: 13px; border-radius: 13px;
  background: rgba(167, 139, 250, 0.12); border: 1px solid var(--line-on);
}
.fi-ic {
  display: grid; place-items: center; flex: none; width: 30px; height: 30px;
  border-radius: 9px; color: #f0abfc; background: rgba(240, 171, 252, 0.16);
}
.fi-ic :deep(.ic) { width: 17px; height: 17px; }
.fi-k { font-size: calc(9px * var(--fs)); font-weight: 700; letter-spacing: 0.08em; color: #d8b4fe; }
.fi-v { margin-top: 5px; font-size: calc(11px * var(--fs)); line-height: 1.7; color: #ede4ff; }

/* ตัวเลขหลักของคณะมีสี่ช่อง — ช่องสุดท้ายเป็นกรอบเวลาจึงตัวเล็กกว่าเพื่อน
   สี่ช่องเรียงแถวเดียวไม่ได้ในหน้าผลลัพธ์: แผงกว้างราว 340px เมื่อเรียงสี่แผงข้างกัน
   "2,500" ที่ 24px กินไปแล้ว ~62px จากช่องละ ~58px เลขจึงชนกันเป็น "2,50035"
   วางเป็น 2x2 แล้วย่อตัวเลขลง ทุกช่องจึงอ่านออกครบทุกความกว้าง */
.lk-row--4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.lk-row--4 .lk-v { font-size: calc(19px * var(--fs)); }
.lk-v--sm { font-size: calc(15px * var(--fs)); }
.lk-u--wide { font-size: calc(9px * var(--fs)); white-space: nowrap; }

/* ── 05 · แท็บสลับมุมมอง ── */
.ftabs {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; margin-top: 16px;
  padding: 4px; border-radius: 11px;
  background: rgba(8, 6, 26, 0.6); border: 1px solid var(--line);
}
.ftab {
  padding: 8px 6px; border: 0; border-radius: 8px; cursor: pointer;
  font-size: calc(10.5px * var(--fs)); color: var(--muted); background: transparent;
  transition: background 0.2s, color 0.2s;
}
.ftab.on { color: #f2ecff; background: rgba(167, 139, 250, 0.22); }

/* ── 05 · ผังคณะไอโซเมตริก ──
   ทั้งย่านเป็นสีกลาง ไม่ได้ระบายตามความหนาแน่น ความหนาแน่นอยู่ที่ชั้นดวงไล่สีต่างหาก
   อาคารสามหน้าใช้สีชุดเดียวกัน ต่างกันแค่ความสว่างตามทิศแสง จึงอ่านเป็นทรงกล่อง
   โดยไม่ต้องมีเส้นขอบ (เส้นขอบที่ขนาดเล็กขนาดนี้จะกลายเป็นตารางหนาทึบ)

   ค่าตั้งต้นเป็นโทนมืดสำหรับจอวิเคราะห์ ส่วน .panel-light ทับเป็นโทนสว่างอีกที */
.fmap { position: relative; margin-top: 12px; }
.fmap-svg { display: block; width: 100%; height: auto; overflow: visible; }
.fac-defs { position: absolute; width: 0; height: 0; overflow: hidden; }

.ci { animation: fmapUp 0.42s cubic-bezier(0.2, 0.9, 0.3, 1.2) backwards; animation-delay: calc(var(--i) * 9ms); }
@keyframes fmapUp { from { opacity: 0; transform: translateY(7px); } }

/* พื้นผัง · ทางเท้า · ผิวถนน · เส้นแบ่งเลน · ทางม้าลาย
   ทุกชั้นต่างกันทีละนิดเดียว รวมกันแล้วอ่านออกว่าเป็นถนน
   แต่ไม่มีชั้นไหนเด่นพอจะแย่งสายตาไปจากดวงความหนาแน่นซึ่งเป็นเนื้อหาจริงของผัง */
.cg-base { fill: #241e3c; }
.cg-street { fill: #2c2648; }
.cg-road { fill: #262042; }
.cg-lane { fill: #433b66; }
.cg-cross { fill: #4a4270; }

/* ขอบดาดฟ้าสว่างกว่าหลังคานิดเดียว อ่านเป็นขอบกันตก ถ้าต่างมากจะกลายเป็นกรอบทึบ
   หน้าต่างต้องหรี่กว่าผนังที่มันอยู่ และหน้าขวาหรี่กว่าหน้าซ้ายตามทิศแสงเดิม
   ถ้าให้หน้าต่างสองหน้าสีเท่ากัน มุมตึกจะแบนหายไป */
.cb-top { fill: #4c4370; }
.cb-left { fill: #332c52; }
.cb-right { fill: #241e3c; }
.cb-roof { fill: #554b7d; }
.cb-win-l { fill: #221c3a; }
.cb-win-r { fill: #191430; }
/* เฉดอาคารสี่แบบ ให้ย่านไม่เป็นสีเดียวกันทั้งผัง */
.cb--t1 .cb-top { fill: #554a7d; }
.cb--t1 .cb-left { fill: #3a3159; }
.cb--t1 .cb-roof { fill: #5e5289; }
.cb--t2 .cb-top { fill: #443c66; }
.cb--t2 .cb-left { fill: #2e2749; }
.cb--t2 .cb-roof { fill: #4d4373; }
.cb--t3 .cb-top { fill: #5b5089; }
.cb--t3 .cb-left { fill: #3f3663; }

/* ขอบดาดฟ้า: หลังคาที่ร่นเข้ามาหนึ่งชั้น อ่านเป็นขอบกันตกรอบหลังคา
   สว่างกว่าหลังคานิดเดียว ถ้าต่างมากจะกลายเป็นกรอบทึบรอบตึกทุกหลัง */
.cb-roof { fill: rgba(255, 255, 255, 0.05); }

/* หน้าต่างต้องหรี่กว่าผนังที่มันอยู่ ไม่ใช่สีเดียวกันทั้งสองหน้า
   ไม่งั้นมุมตึกจะแบนหายไปเพราะสองหน้ามาบรรจบกันด้วยค่าความสว่างเท่ากัน */
.cb-win-l { fill: #221c3c; }
.cb-win-r { fill: #191431; }
.cb--t3 .cb-roof { fill: #665a96; }

/* ต้นไม้: l0 เนื้อพุ่ม · l1 เงาล่างขวา · l2 ไฮไลต์บนซ้าย
   ทิศแสงต้องตรงกับผนังอาคาร (สว่างบนซ้าย เงาล่างขวา) ไม่งั้นต้นไม้จะดูหลุดจากฉาก */
/* ฉากกลางคืนต้องหรี่สีเขียวลงมาก ไม่งั้นต้นไม้จะสดกว่าทั้งเมืองจนดูแปะทับ
   และเจือม่วงเข้าไปนิดให้อยู่ในแสงเดียวกับอาคาร */
.ct-shade { fill: rgba(0, 0, 0, 0.22); }
.ct-trunk { fill: #1e1930; }
.ct-l0 { fill: #29543f; }
.ct-l1 { fill: #1e4130; }
.ct-l2 { fill: #356b4f; }
.cg-tree--t1 .ct-l0 { fill: #244b3a; }
.cg-tree--t1 .ct-l1 { fill: #1a3a2d; }
.cg-tree--t1 .ct-l2 { fill: #2f6146; }
.cg-tree--t2 .ct-l0 { fill: #2d5c45; }
.cg-tree--t2 .ct-l1 { fill: #224a38; }
.cg-tree--t2 .ct-l2 { fill: #3a7355; }

/* ชั้นความหนาแน่น — บนพื้นมืดใช้ screen ดวงจึงสว่างขึ้นมาจากเมืองที่มืด */
.fmap-heat { mix-blend-mode: screen; }

/* จังหวะเต้นของย่านที่แน่น
   ตั้งใจให้เป็นการ "หายใจ" ช้า ๆ ไม่ใช่ไฟกะพริบ — คาบ 2.8 วิ ราว 0.36 ครั้ง/วินาที
   ห่างจากเกณฑ์เสี่ยงชักของ WCAG (3 ครั้ง/วินาที) อยู่มาก และไม่ดับสนิทในจังหวะต่ำ
   ผังจึงอ่านได้ตลอดเวลา ไม่ใช่มีข้อมูลเป็นช่วง ๆ

   animation อยู่ที่ระดับกลุ่ม opacity ของกลุ่มจึงไปคูณกับของแต่ละดวง
   ค่าความจางรายดวงที่คำนวณมาไม่ถูกทับ และทั้งย่านเต้นเป็นก้อนเดียวไม่บิดเบี้ยว */
.fmap-throb {
  transform-box: fill-box;
  transform-origin: center;
  animation: facThrob 2.8s ease-in-out infinite;
  animation-delay: var(--d, 0s);
}
@keyframes facThrob {
  0%, 100% { opacity: 0.72; transform: scale(0.97); }
  50% { opacity: 1; transform: scale(1.04); }
}

/* ผู้ที่ตั้งค่าลดการเคลื่อนไหวต้องเห็นผังนิ่ง และต้องเห็นที่ความเข้มเต็ม
   ไม่ใช่ค้างที่จังหวะจาง ไม่งั้นเท่ากับได้ข้อมูลอ่อนกว่าคนอื่น */
@media (prefers-reduced-motion: reduce) {
  .fmap-throb { animation: none; opacity: 1; transform: none; }
}

/* เส้นขาวรองใต้วงแหวน ให้วงแหวนไม่จมหายไปกับดาดฟ้าที่แดงจัด
   บนผังที่เย็น ดาดฟ้าเป็นสีอ่อนอยู่แล้ว เส้นรองสีขาวจะกลืนหาย จึงสลับเป็นสีเข้มแทน */
.fmap-ring-halo { fill: none; stroke: rgba(255, 255, 255, 0.9); stroke-width: 2; }
.fmap-ring-halo--calm { stroke: rgba(70, 60, 110, 0.3); }

/* วงแหวนบนก้อนที่ร้อนที่สุด — แผ่ออกเป็นจังหวะ ให้ตาไปหยุดที่จุดกระจุก */
.fmap-ring {
  fill: none; stroke: #fff; stroke-width: 0.9;
  transform-box: fill-box; transform-origin: center;
  animation: fmapRing 2.4s ease-out infinite;
}
.fmap-ring--2 { animation-delay: -1.2s; }
@keyframes fmapRing {
  0% { opacity: 0.85; transform: scale(0.5); }
  100% { opacity: 0; transform: scale(1.5); }
}

/* ป้ายจุดหนาแน่นสูง อยู่มุมบนซ้ายของผัง ซึ่งเป็นที่ว่างเสมอ */
.fmap-tip {
  position: absolute; top: 0; left: 0;
  max-width: 142px;
  padding: 5px 9px; border-radius: 9px;
  font-size: calc(9px * var(--fs)); line-height: 1.5; color: #fff;
  background: rgba(60, 22, 96, 0.88); border: 1px solid rgba(196, 181, 253, 0.5);
  box-shadow: 0 6px 18px rgba(4, 2, 16, 0.5);
  backdrop-filter: blur(2px);
}
.fmap-tip i {
  display: inline-block; width: 6px; height: 6px; margin-right: 5px;
  border-radius: 50%; background: #ef4444; box-shadow: 0 0 6px #ef4444;
}
.fmap-tip small { display: block; margin-left: 11px; color: #d8b4fe; }
/* ไม่มีอะไรร้อน ป้ายก็ไม่ควรเป็นสีเตือนภัย */
.fmap-tip--calm i { background: #a5b4fc; box-shadow: 0 0 6px rgba(165, 180, 252, 0.7); }

.fmap-scale { display: flex; align-items: center; gap: 7px; margin-top: 8px; font-size: calc(8.5px * var(--fs)); color: var(--dim); }
/* แถบนี้ต้องใช้สีชุดเดียวกับดวงบนผัง (ดู facGrad* ในเทมเพลต)
   ของเดิมไล่จากฟ้า-เขียว ซึ่งเป็นสีที่ผังไม่เคยแสดงเลย เพราะพื้นที่ไม่แน่นคือ
   "ไม่มีดวง" ไม่ใช่ "ดวงสีฟ้า" แถบจึงต้องเริ่มจากสีอาคารแล้วไล่ไปเหลือง-ส้ม-แดง */
.fmap-scale i {
  flex: 1; height: 5px; border-radius: 3px;
  background: linear-gradient(90deg, #4c4370, #fecb1d 28%, #fda616 48%, #fb7a16 66%, #f44e15 82%, #c8140d);
}
.panel-light .fmap-scale i {
  background: linear-gradient(90deg, #dfe4ec, #fecb1d 28%, #fda616 48%, #fb7a16 66%, #f44e15 82%, #c8140d);
}

.fmap-key {
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 5px 10px;
  margin-top: 9px; list-style: none;
}
.fmap-key li { display: flex; align-items: center; gap: 6px; font-size: calc(9px * var(--fs)); color: var(--muted); }
.fmap-key i { flex: none; width: 7px; height: 7px; border-radius: 2px; }
.fmap-key span { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.fmap-key b { flex: none; font-weight: 700; color: #ddd3f5; }

/* แท่งรายชั่วโมงของคณะไม่ได้ไล่สีตามค่าเหมือนห้องสมุด — ใช้สีเดียวของธีม */
.fb-bar { background: linear-gradient(180deg, #c4b5fd, #7c3aed); }

/* ── 02 · ผังคณะในหน้าวิเคราะห์ ──
   ใช้ก้อนชุดเดียวกับแผง 05 แต่เริ่มจากหรี่ แล้วทยอยสว่างตามความคืบหน้า
   อัตราส่วนล็อกไว้เท่ากรอบผัง (272 x 161.6) ภาพจะได้ไม่ยืดตอนคอลัมน์กว้างขึ้น */
.fw-art { aspect-ratio: 272 / 162; display: grid; place-items: center; }
.fw-svg { width: 100%; height: auto; overflow: visible; }
/* ก้อนที่ยังไม่ถูกอ่านต้องยัง "เห็นเป็นผัง" อยู่ ไม่ใช่จางจนหาย
   ไม่งั้นช่วงต้นภาพจะเหลือก้อนเดียวลอยอยู่กลางจอ ดูเหมือนภาพโหลดไม่ขึ้น */
/* ปื้นความหนาแน่นเป็นคำตอบ จึงยังไม่โผล่จนกว่าจะไล่อ่านใกล้เสร็จ */
.fw-heat { opacity: 0; transition: opacity 0.9s ease; }
.fw-heat.on { opacity: 1; }

/* อาคารเป็นสีกลางแล้ว การ "ถูกอ่านแล้ว" จึงบอกด้วยความสว่าง ไม่ใช่ความอิ่มสี */
.fw-b { opacity: 0.45; transition: opacity 0.5s ease; }
.fw-b.lit { opacity: 1; animation: fwPulse 2.6s ease-in-out infinite; animation-delay: calc(var(--i) * 0.12s); }
@keyframes fwPulse { 50% { filter: brightness(1.3); } }

/* เครื่องหมายถูกและแถบความคืบหน้าของหน้าวิเคราะห์ยังเป็นเขียว/ฟ้าที่ฝังไว้ตรง ๆ */
.theme-violet .lw-mark { background: rgba(167, 139, 250, 0.18); color: var(--brand); }
.theme-violet .lw-steps li:not(.done) .lw-mark { background: rgba(139, 110, 220, 0.14); }
.theme-violet .lw-mark .spin { border-color: rgba(196, 181, 253, 0.3); border-top-color: var(--brand); }
.theme-violet .lw-mark .hollow { border-color: rgba(167, 139, 250, 0.4); }
.theme-violet .lw-bar { background: rgba(139, 110, 220, 0.18); }
.theme-violet .lw-bar > span { background: linear-gradient(90deg, #6d3cd2, #a855f7, #e879f9); }

/* หมวดคณะโชว์ชื่อขั้นตอนเป็นอังกฤษนำ ไทยตาม เหมือนเช็กลิสต์ของหมวดกลาง */
.lw-text b { display: block; font-size: clamp(13px, 1.5vw, 17px); font-weight: 700; color: #f2ecff; }
.lw-text b + span { display: block; margin-top: 3px; font-size: clamp(11px, 1.2vw, 14px); color: var(--dim); }

/* ── 06 · ห่วงโซ่ความสัมพันธ์ ── */
.fr-wrap { display: flex; flex-direction: column; flex: 1; margin-top: 18px; }
.fr-lead { font-size: calc(13px * var(--fs)); font-weight: 700; color: #f2ecff; }
.fr-sub { margin-top: 3px; font-size: calc(10px * var(--fs)); color: var(--dim); }
.fr-grid {
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 12px; margin-top: 13px; list-style: none;
}
.fr {
  position: relative; display: flex; align-items: center; gap: 10px;
  padding: 12px 10px; border-radius: 13px;
  background: rgba(20, 14, 44, 0.7); border: 1px solid var(--line);
}
.fr-ic {
  display: grid; place-items: center; flex: none; width: 28px; height: 28px;
  border-radius: 9px; color: var(--sig);
  background: color-mix(in srgb, var(--sig) 20%, transparent);
}
.fr-ic :deep(.ic) { width: 16px; height: 16px; }
.fr-txt { display: grid; gap: 2px; min-width: 0; }
.fr-th { font-size: calc(10.5px * var(--fs)); font-weight: 600; line-height: 1.4; color: #e8e0fb; }
.fr-en { font-size: calc(8.5px * var(--fs)); color: var(--dim); }
/* ลูกศรห้อยใต้การ์ด ชี้ลงไปการ์ดที่อยู่ใต้มันในคอลัมน์เดียวกัน
   ตาราง 2x2 อ่านเป็นสองสาย: ตารางเรียน↓ความต้องการพื้นที่ · การเคลื่อนย้าย↓การใช้ทรัพยากร
   การ์ดแถวล่างจึงไม่มีลูกศร (ตัวที่ 3 ถูกซ่อนไว้ ส่วนตัวที่ 4 ไม่ได้เรนเดอร์ตั้งแต่แรก) */
.fr-arrow {
  position: absolute; left: 50%; bottom: -11px; transform: translateX(-50%);
  display: grid; place-items: center; color: var(--line-on);
}
.fr-arrow :deep(.ic) { width: 13px; height: 13px; }
.fr:nth-child(3) .fr-arrow { display: none; }

.fr-note {
  display: flex; align-items: flex-start; gap: 11px; margin-top: auto; padding-top: 14px;
}
.fr-note > div {
  flex: 1; min-width: 0;
}
.fr-note__ic {
  display: grid; place-items: center; flex: none; width: 28px; height: 28px;
  border-radius: 9px; color: #f0abfc; background: rgba(240, 171, 252, 0.16);
}
.fr-note__ic :deep(.ic) { width: 16px; height: 16px; }
.fr-note__k { font-size: calc(11px * var(--fs)); font-weight: 700; color: #d8b4fe; }
.fr-note__v { margin-top: 5px; font-size: calc(10.5px * var(--fs)); line-height: 1.7; color: #ddd3f5; }

/* ── 07 · เลือกสถานการณ์ + เส้นจำลอง ── */
.fs-sub { margin-top: 3px; font-size: calc(10px * var(--fs)); color: var(--dim); }
.fs { display: grid; gap: 12px; margin-top: 12px; }
.fs-list { display: flex; flex-direction: column; gap: 7px; }
.fs-opt {
  display: flex; align-items: center; gap: 9px; text-align: left; cursor: pointer;
  padding: 10px; border-radius: 11px;
  background: rgba(20, 14, 44, 0.7); border: 1px solid var(--line); color: var(--muted);
  transition: border-color 0.2s, background 0.2s, color 0.2s;
}
.fs-opt.on { border-color: var(--line-on); background: rgba(167, 139, 250, 0.2); color: #f2ecff; }
.fs-opt__ic { display: grid; place-items: center; flex: none; width: 24px; height: 24px; border-radius: 7px; background: rgba(167, 139, 250, 0.16); }
.fs-opt__ic :deep(.ic) { width: 14px; height: 14px; }
.fs-opt__th { flex: 1; min-width: 0; font-size: calc(10.5px * var(--fs)); font-weight: 600; }
.fs-opt > :deep(.ic) { flex: none; width: 13px; height: 13px; opacity: 0.6; }

.fs-panel {
  padding: 12px; border-radius: 14px;
  background: rgba(8, 6, 26, 0.7); border: 1px solid var(--line);
}
.fs-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
.fs-head__k { font-size: calc(11px * var(--fs)); font-weight: 700; color: #f2ecff; }
.fs-head__s { margin-top: 3px; font-size: calc(9px * var(--fs)); line-height: 1.5; color: var(--dim); }
.fs-delta { flex: none; font-size: 22px; font-weight: 800; line-height: 1; color: #f472b6; }

.fs-plot { position: relative; margin-top: 10px; }
.fs-svg { display: block; width: 100%; height: 132px; overflow: visible; }
.fs-band { fill: rgba(244, 114, 182, 0.14); }
.fs-cap { stroke: rgba(167, 139, 250, 0.4); stroke-width: 1; stroke-dasharray: 4 4; }
.fs-line {
  fill: none; stroke-width: 2; stroke-linejoin: round; stroke-linecap: round;
  /* เส้นวิ่งเข้ามาจากซ้ายตอนเปลี่ยนสถานการณ์ ให้เห็นว่าค่าถูกคิดใหม่ */
  animation: fsDraw 0.65s ease-out backwards;
}
@keyframes fsDraw { from { opacity: 0; transform: translateY(6px); } }
.fs-yaxis {
  position: absolute; top: 0; bottom: 0; left: 0;
  display: flex; flex-direction: column; justify-content: space-between;
  font-size: calc(8px * var(--fs)); color: var(--dim); pointer-events: none;
}
/* ป้ายช่วงที่ล้นความจุ ลอยที่มุมบนขวาของกราฟ */
.fs-flag {
  position: absolute; top: 2px; right: 2px;
  max-width: 116px;
  padding: 4px 7px; border-radius: 7px;
  font-size: calc(7.5px * var(--fs)); line-height: 1.45; text-align: right; color: #ffe4f1;
  background: rgba(88, 20, 58, 0.9); border: 1px solid rgba(244, 114, 182, 0.5);
}
.fs-xaxis { display: flex; justify-content: space-between; margin-top: 5px; font-size: calc(8px * var(--fs)); color: var(--dim); }
.fs-legend {
  display: flex; flex-wrap: wrap; gap: 6px 12px; margin-top: 10px;
  list-style: none; font-size: calc(8.5px * var(--fs)); color: var(--muted);
}
.fs-legend li { display: flex; align-items: center; gap: 5px; }
.fs-legend i { width: 7px; height: 7px; border-radius: 50%; }

/* สไลเดอร์ของสถานการณ์ "กำหนดเอง" — เกาะอยู่ใต้การ์ดใบสุดท้าย ไม่ใช่กล่องลอยแยก */
.fc {
  display: flex; flex-direction: column; gap: 9px;
  margin-top: -2px; padding: 11px 10px;
  border: 1px solid var(--line-on); border-top: 0;
  border-radius: 0 0 11px 11px;
  background: rgba(167, 139, 250, 0.1);
}
.fc-row { display: flex; align-items: center; gap: 9px; cursor: pointer; }
.fc-k { flex: none; width: 76px; font-size: calc(9.5px * var(--fs)); color: #ddd3f5; }
.fc-v { flex: none; width: 36px; text-align: right; font-size: calc(10px * var(--fs)); font-weight: 700; color: #f2ecff; }
.fc-range {
  flex: 1; min-width: 0; height: 4px; padding: 0; cursor: pointer;
  appearance: none; -webkit-appearance: none;
  border-radius: 3px; background: rgba(139, 110, 220, 0.3);
}
.fc-range::-webkit-slider-thumb {
  appearance: none; -webkit-appearance: none;
  width: 13px; height: 13px; border-radius: 50%; border: 0; cursor: pointer;
  background: var(--brand); box-shadow: 0 0 8px rgba(167, 139, 250, 0.7);
}
.fc-range::-moz-range-thumb {
  width: 13px; height: 13px; border-radius: 50%; border: 0; cursor: pointer;
  background: var(--brand); box-shadow: 0 0 8px rgba(167, 139, 250, 0.7);
}

/* ── 08 · ข้อเสนอแนะของคณะ ── */
.fd { display: flex; flex-direction: column; flex: 1; gap: 12px; margin-top: 18px; }
.fd-top {
  display: flex; align-items: flex-start; gap: 11px;
  padding: 13px; border-radius: 13px;
  background: rgba(167, 139, 250, 0.14); border: 1px solid var(--line-on);
}
.fd-top__ic {
  display: grid; place-items: center; flex: none; width: 30px; height: 30px;
  border-radius: 9px; color: #f0abfc; background: rgba(240, 171, 252, 0.18);
}
.fd-top__ic :deep(.ic) { width: 17px; height: 17px; }
.fd-top__k { font-size: calc(9px * var(--fs)); font-weight: 700; letter-spacing: 0.08em; color: #d8b4fe; }
.fd-top__v { margin-top: 5px; font-size: calc(13px * var(--fs)); font-weight: 700; line-height: 1.5; color: #f6f1ff; }

.fd-rows { display: flex; flex-direction: column; gap: 12px; }
.fd-row { display: flex; align-items: flex-start; gap: 11px; }
.fd-row dt { display: flex; align-items: flex-start; gap: 9px; flex: none; width: 118px; }
.fd-row__ic {
  display: grid; place-items: center; flex: none; width: 26px; height: 26px;
  border-radius: 8px; color: var(--brand); background: rgba(167, 139, 250, 0.16);
}
.fd-row__ic :deep(.ic) { width: 15px; height: 15px; }
.fd-row__k {
  display: grid; gap: 2px; min-width: 0;
  font-size: calc(9px * var(--fs)); font-weight: 700; letter-spacing: 0.06em; color: #cfc2fb;
}
.fd-row__k small { font-size: calc(8.5px * var(--fs)); font-weight: 500; letter-spacing: 0; color: var(--dim); }
.fd-row dd { flex: 1; min-width: 0; font-size: calc(10.5px * var(--fs)); line-height: 1.75; color: #ddd3f5; }

/* สถานการณ์อยู่ซ้าย กราฟอยู่ขวา ได้เฉพาะตอนแผงยังกินความกว้างเต็มหน้า
   ตั้งแต่ 1000px ขึ้นไปหน้าผลลัพธ์เรียงสี่แผงข้างกัน แผงเหลือกว้างราว 340px
   แบ่งสองคอลัมน์ตรงนั้นจะเหลือฝั่งซ้าย ~130px ชื่อสถานการณ์ตัดคำเป็นสามบรรทัด */
@media (min-width: 640px) and (max-width: 999px) {
  .fs { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); align-items: start; }
}

/* เรียงสี่แผงข้างกันแล้วแต่ละแผงแคบมาก — คืนทุกอย่างเป็นคอลัมน์เดียวและย่อระยะลง */
@media (min-width: 1000px) and (max-width: 1320px) {
  .panel .fs { grid-template-columns: minmax(0, 1fr); }
  .panel .fr-grid { grid-template-columns: minmax(0, 1fr); }
  /* คอลัมน์เดียวแล้วห่วงโซ่กลับมาเป็นสายเดียว 1→2→3→4 ลูกศรตัวที่ 3 จึงต้องกลับมา */
  .panel .fr:nth-child(3) .fr-arrow { display: grid; }
  .panel .lk-row--4 .lk-v { font-size: calc(17px * var(--fs)); }
  .panel .fd-row { flex-direction: column; gap: 7px; }
  .panel .fd-row dt { width: auto; }
  .panel .fi { margin-top: 12px; gap: 9px; padding: 10px; }
  .panel .ftabs { margin-top: 12px; }
  .panel .fr-wrap, .panel .fd { margin-top: 13px; }
}


/* บนพื้นขาว อาคารเป็นเทาอมม่วงอ่อน และปื้นความร้อนใช้ multiply
   เพื่อให้ทับลงบนหลังคาแล้วยังเห็นทรงอาคารอยู่ (screen จะฟอกจนขาวหาย) */
/* ── ผังบนการ์ดขาว ──
   เมืองเป็นเทาอ่อนเกือบขาว เพื่อให้ดวงความหนาแน่นเป็นสิ่งเดียวที่มีสีในภาพ
   ตาจึงวิ่งไปที่จุดร้อนทันทีโดยไม่ต้องมีอะไรชี้ */
.panel-light .cg-base { fill: #f2f4f8; }
.panel-light .cg-street { fill: #e4e8ef; }
.panel-light .cg-road { fill: #d5dae3; }
.panel-light .cg-lane { fill: #f3f5f9; }
.panel-light .cg-cross { fill: #f7f9fc; }

.panel-light .cb-top { fill: #f4f6f9; }
.panel-light .cb-left { fill: #d3dae5; }
.panel-light .cb-right { fill: #b2bbca; }
.panel-light .cb-roof { fill: #fbfcfd; }
/* หน้าต่างบนพื้นขาวใช้ฟ้าอมเทา อ่านเป็นกระจก ถ้าใช้เทาล้วนจะดูเป็นรูดำ */
.panel-light .cb-win-l { fill: #aab8cb; }
.panel-light .cb-win-r { fill: #8d9bb1; }

.panel-light .cb--t1 .cb-top { fill: #f2efe8; }
.panel-light .cb--t1 .cb-left { fill: #d8d2c5; }
.panel-light .cb--t1 .cb-right { fill: #b9b2a3; }
.panel-light .cb--t1 .cb-roof { fill: #faf8f3; }
.panel-light .cb--t1 .cb-win-l { fill: #b3ab9b; }
.panel-light .cb--t1 .cb-win-r { fill: #978f7f; }

.panel-light .cb--t2 .cb-top { fill: #eef2f7; }
.panel-light .cb--t2 .cb-left { fill: #ccd5e2; }
.panel-light .cb--t2 .cb-right { fill: #a9b4c5; }
.panel-light .cb--t2 .cb-roof { fill: #f7fafd; }
.panel-light .cb--t2 .cb-win-l { fill: #a3b2c7; }
.panel-light .cb--t2 .cb-win-r { fill: #8695ac; }

.panel-light .cb--t3 .cb-top { fill: #fafbfd; }
.panel-light .cb--t3 .cb-left { fill: #dde3ec; }
.panel-light .cb--t3 .cb-right { fill: #bcc5d2; }

.panel-light .cb-roof { fill: rgba(255, 255, 255, 0.3); }
/* บนพื้นขาว หน้าต่างเป็นเทาอมฟ้า ให้อ่านเป็นกระจกไม่ใช่รูดำ */
.panel-light .cb-win-l { fill: #a9b6c9; }
.panel-light .cb-win-r { fill: #8d9bb1; }
.panel-light .cb--t3 .cb-roof { fill: #ffffff; }
.panel-light .cb--t3 .cb-win-l { fill: #b4c0d0; }
.panel-light .cb--t3 .cb-win-r { fill: #97a3b6; }

.panel-light .ct-shade { fill: rgba(90, 105, 120, 0.14); }
.panel-light .ct-trunk { fill: #8a7256; }
.panel-light .ct-l0 { fill: #57b25b; }
.panel-light .ct-l1 { fill: #3f9247; }
.panel-light .ct-l2 { fill: #83cf76; }
.panel-light .cg-tree--t1 .ct-l0 { fill: #4aa554; }
.panel-light .cg-tree--t1 .ct-l1 { fill: #35863f; }
.panel-light .cg-tree--t1 .ct-l2 { fill: #74c46c; }
.panel-light .cg-tree--t2 .ct-l0 { fill: #66bf62; }
.panel-light .cg-tree--t2 .ct-l1 { fill: #4da14e; }
.panel-light .cg-tree--t2 .ct-l2 { fill: #93d982; }

/* บนพื้นขาวใช้ normal ไม่ใช่ multiply — ไล่สีมีอัลฟาในตัวอยู่แล้ว
   ถ้าคูณซ้ำแกนสีแดงจะคล้ำจนดูเป็นคราบ ไม่ใช่ความร้อน */
.panel-light .fmap-heat { mix-blend-mode: normal; }

/* ══════════════ แผง 05–08 ของคณะ: การ์ดพื้นขาว ══════════════
   ตามแบบที่ออกไว้ — แผงผลลัพธ์เป็นการ์ดกระดาษสีขาววางบนพื้นม่วงเข้มของหน้า
   ชั้นแรกคือทับตัวแปรสีทั้งชุดที่ตัวการ์ด ทุกกฎที่อ้าง var() จึงพลิกเป็นโทนสว่างเอง
   ชั้นที่สองคือจุดที่ฝังสีเข้มไว้ตรง ๆ ต้องไล่ทับเป็นรายตัว */
.panel-light {
  --card: #ffffff;
  --line: rgba(76, 46, 140, 0.14);
  --line-on: rgba(124, 58, 237, 0.34);
  --text: #241c42;
  --muted: #6d6490;
  /* เทาอมม่วงของโทนมืดอ่อนเกินไปบนพื้นขาว — ตัวหนังสือรองขนาด 8–10px
     ได้คอนทราสต์แค่ ~3.4:1 ซึ่งต่ำกว่าเกณฑ์ 4.5:1 ของตัวอักษรขนาดปกติ
     ค่านี้ให้ ~5.9:1 บนพื้นขาว โดยยังอ่านเป็นตัวหนังสือรองอยู่ */
  --dim: #665f85;
  --brand: #7c3aed;
  --cyan: #8b5cf6;

  color: var(--text);
  background: #fff;
  border-color: rgba(76, 46, 140, 0.16);
  box-shadow: 0 14px 34px rgba(6, 3, 24, 0.42);
}
.theme-violet .panel-light { background: #fff; }

/* หัวแผง */
.panel-light .h-th-lead { color: #1d1636; }
.panel-light .h-en-sub { color: var(--dim); }
.theme-violet .panel-light .p-chip {
  background: rgba(124, 58, 237, 0.1); border-color: rgba(124, 58, 237, 0.28); color: #6d28d9;
}

/* 05 · กล่อง INSIGHT + ตัวเลขหลัก */
.panel-light .fi { background: #f5f1ff; border-color: rgba(124, 58, 237, 0.2); }
.panel-light .fi-ic { background: rgba(192, 38, 211, 0.12); color: #a21caf; }
.panel-light .fi-k { color: #7e22ce; }
.panel-light .fi-v { color: #2c2250; }
.theme-violet .panel-light .lk {
  background: #f7f5ff; border-color: rgba(124, 58, 237, 0.16); color: var(--muted);
}
.theme-violet .panel-light .lk-v { color: #1d1636; }
.panel-light .lk-k, .panel-light .lk-u { color: var(--muted); }

/* 05 · แท็บ */
.panel-light .ftabs { background: #f1edfb; border-color: rgba(124, 58, 237, 0.14); }
.panel-light .ftab { color: var(--muted); }
.panel-light .ftab.on { color: #2c2250; background: #fff; box-shadow: 0 1px 4px rgba(40, 20, 90, 0.16); }

/* 05 · ผังไอโซเมตริก — ก้อนยังเป็นสีความหนาแน่นเดิม เปลี่ยนแค่ของประกอบ */
.panel-light .fmap-ring { stroke: #3b2a63; }
.panel-light .fmap-tip {
  color: #fff; background: rgba(46, 16, 74, 0.92); border-color: rgba(124, 58, 237, 0.4);
}
.panel-light .fmap-tip small { color: #d8b4fe; }
.panel-light .fmap-key b { color: #2c2250; }

/* 05 · แท่งรายชั่วโมง + กล่อง "ตอนนี้" */
.panel-light .lb-title { color: #4c3f7a; }
.panel-light .fb-bar { background: linear-gradient(180deg, #a78bfa, #6d28d9); }
.panel-light .lb-now { background: #f7f5ff; border-color: rgba(124, 58, 237, 0.16); }
.panel-light .lb-now__ic { background: rgba(217, 119, 6, 0.14); color: #b45309; }
.panel-light .lb-now p { color: var(--muted); }
.panel-light .lb-now b { color: #8a5a00; }

/* 06 · ห่วงโซ่ความสัมพันธ์ */
.panel-light .fr-lead { color: #1d1636; }
.panel-light .fr { background: #f7f5ff; border-color: rgba(76, 46, 140, 0.14); }
.panel-light .fr-th { color: #2c2250; }
.panel-light .fr-arrow { color: rgba(124, 58, 237, 0.5); }
.panel-light .fr-note__ic { background: rgba(192, 38, 211, 0.12); color: #a21caf; }
.panel-light .fr-note__k { color: #7e22ce; }
.panel-light .fr-note__v { color: var(--muted); }

/* 07 · สถานการณ์ + กราฟ */
.panel-light .fs-opt { background: #f7f5ff; border-color: rgba(76, 46, 140, 0.14); color: var(--muted); }
.panel-light .fs-opt.on {
  background: #efe7ff; border-color: rgba(124, 58, 237, 0.42); color: #2c2250;
}
.panel-light .fs-opt__ic { background: rgba(124, 58, 237, 0.13); color: #6d28d9; }
.panel-light .fs-panel { background: #faf9ff; border-color: rgba(76, 46, 140, 0.13); }
.panel-light .fs-head__k { color: #1d1636; }
.panel-light .fs-delta { color: #db2777; }
.panel-light .fs-band { fill: rgba(236, 72, 153, 0.12); }
.panel-light .fs-cap { stroke: rgba(76, 46, 140, 0.3); }
.panel-light .fs-flag {
  color: #fff; background: rgba(131, 24, 67, 0.92); border-color: rgba(236, 72, 153, 0.5);
}
/* เส้นบนพื้นขาวต้องเข้มขึ้น ไม่งั้นสีนีออนเดิมจะจาง — หรี่ลงด้วยฟิลเตอร์ทีเดียวทุกเส้น
   จะได้ไม่ต้องแยกชุดสีสองชุดใน faculty.ts */
.panel-light .fs-line { filter: brightness(0.82) saturate(1.25); }
.panel-light .fs-legend i, .panel-light .fmap-key i { filter: brightness(0.86) saturate(1.2); }

/* 07 · สไลเดอร์ของ "กำหนดเอง" */
.panel-light .fc { background: #efe7ff; border-color: rgba(124, 58, 237, 0.34); }
.panel-light .fc-k { color: #4c3f7a; }
.panel-light .fc-v { color: #2c2250; }
.panel-light .fc-range { background: rgba(124, 58, 237, 0.22); }

/* 08 · ข้อเสนอแนะ */
.panel-light .fd-top { background: #f5f1ff; border-color: rgba(124, 58, 237, 0.24); }
.panel-light .fd-top__ic { background: rgba(192, 38, 211, 0.12); color: #a21caf; }
.panel-light .fd-top__k { color: #7e22ce; }
.panel-light .fd-top__v { color: #1d1636; }
.panel-light .fd-row__ic { background: rgba(124, 58, 237, 0.12); color: #6d28d9; }
.panel-light .fd-row__k { color: #4c3f7a; }
.panel-light .fd-row__k small { color: var(--dim); }
.panel-light .fd-row dd { color: #3b3160; }

/* ══════════════ จบหมวดคณะ ══════════════ */

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
.ct-sub { margin: 8px 0 0; font-size: calc(13px * var(--fs)); line-height: 1.7; color: #93a4be; }
.ct-sub b { color: #cfe0ff; font-weight: 600; }
.ct-form { margin-top: 20px; display: grid; gap: 13px; text-align: left; }
.ct-field { display: grid; gap: 6px; }
.ct-label { font-size: calc(12px * var(--fs)); color: #93a4be; }
.ct-field input {
  height: 44px;
  padding: 0 14px;
  border: 1px solid rgba(120, 180, 255, 0.2);
  border-radius: 12px;
  background: rgba(4, 11, 24, 0.9);
  color: #eaf1ff; font-size: calc(14px * var(--fs));
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.ct-field input::placeholder { color: #5b6b85; }
.ct-field input:focus {
  border-color: rgba(79, 216, 255, 0.55);
  box-shadow: 0 0 0 3px rgba(79, 216, 255, 0.14);
}
.ct-err { margin: 0; font-size: calc(12px * var(--fs)); color: #ff8d9b; }
.ct-submit {
  margin-top: 4px; height: 46px;
  border: 0; border-radius: 999px;
  background: linear-gradient(90deg, #2f7dff, #4fd8ff);
  color: #04121f; font-size: calc(14px * var(--fs)); font-weight: 600;
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
  .rp-sub { margin-top: 4px; font-size: calc(11px * var(--fs)); color: #555; }
  .report h2 { margin: 18px 0 7px; font-size: calc(13px * var(--fs)); font-weight: 700; border-bottom: 1px solid #bbb; padding-bottom: 4px; }
  .rp-table { width: 100%; border-collapse: collapse; font-size: calc(11px * var(--fs)); }
  .rp-table th, .rp-table td { border: 1px solid #ccc; padding: 5px 8px; text-align: left; }
  .rp-table thead th { background: #eee; }
  .rp-list { margin-left: 18px; font-size: calc(11px * var(--fs)); line-height: 1.7; }
  .rp-reco { font-size: calc(13px * var(--fs)); font-weight: 700; }
  .rp-why, .rp-impact { margin-top: 6px; font-size: calc(11px * var(--fs)); line-height: 1.65; }
  .rp-foot { margin-top: 22px; font-size: calc(9px * var(--fs)); color: #777; }
  @page { margin: 14mm; }
}
</style>
