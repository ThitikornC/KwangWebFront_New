/*
  MOMAY STUDENT — คณะ

  นี่คือ "แอป" ที่นักศึกษาเปิดตอนยืนอยู่ในคณะ ไม่ใช่หน้ารายงานหรือสไลด์นำเสนอ
  จึงไม่มีแถบหัวข้อกำกับระยะแบบ "01 INTENT / 02 LIVE CONTEXT"
  ป้ายพวกนั้นเป็นคำอธิบายบนกระดานนำเสนอที่วางรอบ ๆ ภาพมือถือ ไม่ใช่ UI ในแอป

  ทั้ง 6 ระยะไหลต่อกันบนผืนเดียว เลือกเจตนาแล้วส่วนที่เหลือไหลตามลงไป
  เพราะนักศึกษาที่ยืนอยู่หน้าคณะไม่ได้เดินเป็นขั้น เขาเปลี่ยนใจกลางทาง
  เทียบสองที่ไปมา แล้วค่อยตัดสินใจ

  ข้อมูลความหนาแน่นทั้งหมดมาจาก facultyReport ตัวเดียวกับหน้า ORGANIZE
  (ดู lib/spaces.js) จึงไม่มีทางที่สองฝั่งจะบอกตัวเลขไม่ตรงกัน
*/

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { facultyReport } from '../../utils/momaySurpriseOrganize/faculty.ts'
import { readSurvey, backToOrganize } from './lib/survey'
import {
  buildingOf,
  photoOf,
  BUILDING_MAP,
  KIND_TH,
  walkFrom,
  districtCenter,
  INTENTS,
  INTENT_MAP,
  SPACES,
  AMENITY,
  YOU_AT,
  DISTRICT_KIND,
  rankSpaces,
  reasonsFor,
  routeSteps,
  eventsToday,
  tipsFrom,
  conditions,
  loadAt,
  freeSeats,
  crowdWord,
  hourRange,
} from './lib/spaces'
import Campus3D from './components/Campus3D'
import Icon from './components/Icon'

const SPACE_MAP = Object.fromEntries(SPACES.map(s => [s.id, s]))

export default function App() {
  const survey = useMemo(() => readSurvey(window.location.search), [])

  /* engine เปิดข้อมูลแค่บางช่วงของวัน (ดู OPEN_FROM/OPEN_TO ใน faculty.ts)
     ต้องอ่านช่วงนั้นมาก่อน ไม่งั้นตอนเปิดหน้านอกเวลาทำการจะขอชั่วโมงที่ไม่มีข้อมูล
     แล้วทุกพื้นที่จะขึ้น 0% ซึ่งอ่านว่า "ว่างสนิท" ทั้งที่แปลว่า "ยังไม่เปิด" */
  const range = useMemo(() => hourRange(facultyReport(survey.input)), [survey])

  /* ชั่วโมงปัจจุบัน ตั้งครั้งเดียวตอน mount แล้วให้ผู้ใช้เลื่อนดูเวลาอื่นได้
     ถ้าปล่อยให้เดินตามนาฬิกาจริง ตัวเลขจะขยับเองระหว่างอ่าน ซึ่งน่ารำคาญกว่ามีประโยชน์ */
  const clock = useMemo(() => new Date().getHours(), [])
  const realHour = Math.min(range.max, Math.max(range.min, clock))
  const outsideHours = clock < range.min || clock > range.max
  const [hour, setHour] = useState(realHour)

  const report = useMemo(
    () => facultyReport({ ...survey.input, nowHour: hour }),
    [survey, hour],
  )

  /* --- การนำทาง (ดู useRoute ท้ายไฟล์) ---
     แอปนี้เดินทีละจอ ไม่ใช่หน้ายาวเลื่อนลงทีเดียว
     ผู้ใช้ "กดเข้า" ไปทีละชั้นแล้วย้อนออกมาได้ เหมือนแอปแผนที่ทั่วไป
     stack เก็บทางที่เดินมาจริง ปุ่มย้อนกลับจึงพากลับไปจอก่อนหน้าได้ถูก
     ไม่ใช่เดาเอาว่าจอก่อนหน้าน่าจะเป็นอะไร (ผู้ใช้เข้าหน้ารายละเอียดได้จากหลายทาง) */
  const { view, go, back, canBack, loading } = useRoute('intent')
  const screenRef = useRef(null)
  /* main ถูก mount ใหม่ทุกครั้งที่เปลี่ยนหน้า (key={view}) ref แบบธรรมดาจึงไม่พอ
     ต้องดันโหนดเข้า state เพื่อให้ ResizeObserver ผูกกับโหนดใบใหม่ */
  const [screenNode, setScreenNode] = useState(null)
  const setScreen = useCallback(el => {
    screenRef.current = el
    setScreenNode(el)
  }, [])

  /* ตัวที่เลื่อนคือกล่องเนื้อหา ไม่ใช่ทั้งหน้าต่าง (ทั้งหน้าถูกตรึงไว้)
     ถ้าไป reset window.scrollTo จะไม่มีผลอะไรเลย แล้วกล่องเนื้อหาจะค้างอยู่
     ตำแหน่งเดิมของหน้าก่อน ผู้ใช้จึงเห็นเนื้อหากลางเรื่องเหมือนแอป "เลื่อนลงไป" */
  useEffect(() => {
    if (screenRef.current) screenRef.current.scrollTop = 0
  }, [view])

  const [intent, setIntent] = useState(null)
  const [pickedId, setPickedId] = useState(null)
  const [detailTab, setDetailTab] = useState('overview')
  // กดแล้วผังถอยออกไปเห็นทั้งคณะ มุมเดียวกับที่คณบดีเห็นในหน้า ORGANIZE
  const [showAll, setShowAll] = useState(false)
  /* อาคารที่กดบนผัง — คนละเรื่องกับโซนที่เลือก
     กดอาคารคือ "ขอดูว่าในตึกนี้มีอะไรบ้าง" ยังไม่ได้เลือกโซน */
  const [openBuilding, setOpenBuilding] = useState(null)

  /* ความสูงผังยืดตามจอ จอเตี้ยผังเตี้ยลง เนื้อหาที่เหลือจะได้ไม่ตกขอบ
     ผังคือหัวใจของหน้านี้ จึงให้สัดส่วนเยอะกว่าส่วนอื่น (ราว 38% ของความสูงจอ)
     ของเดิม 26% เล็กเกินจนอาคารกับป้ายเบียดกันจนอ่านยาก */
  /* ความสูงจอจริง ณ ตอนนี้ ไม่ใช่ตอนเปิดแอป
     ของเดิมคิดครั้งเดียวตอน mount ด้วย useMemo([]) พอย่อ-ขยายหน้าต่าง
     หมุนจอ หรือแถบที่อยู่ของเบราว์เซอร์มือถือหด ผังก็ค้างความสูงเก่า
     กลายเป็นผังลอยอยู่กลางจอโดยมีที่ว่างเหลือข้างล่าง */
  const vh = useViewportH()

  /* กินความสูงที่เหลือเกือบทั้งหมด หักไว้ให้หัวแอป หัวข้อ แถบเวลา และแถบล่าง
     ผังคือหัวใจของจอนี้ ที่เหลือเลื่อนลงไปอ่านทีหลังได้ */
  const mapH = Math.max(280, Math.min(660, vh - 475))

  /* ผังบนหน้านำทางสูงกว่าหน้าผังปกติ ให้กินเต็มความยาวจอ
     หน้านี้ผู้ใช้กำลังจะออกเดิน เขาต้องเห็นทางทั้งเส้นในภาพเดียว
     ไม่ใช่เห็นครึ่งเส้นแล้วต้องเลื่อนไปเลื่อนมา ส่วนรายการขั้นตอนเลื่อนดูทีหลังได้
     หักไว้ให้หัวแอป แถบชื่อเส้นทาง และแถบล่างเท่านั้น */
  /* แผงล่างของหน้าผัง — ยุบอยู่โผล่แค่บรรทัดสภาพอากาศ ลากขึ้นดูรายละเอียดได้
     หน้านี้คำถามหลักคือ "ตอนนี้ที่ไหนว่าง" ซึ่งตอบด้วยผัง ไม่ใช่ด้วยตัวเลข
     ตัวเลขจึงรอให้ถามค่อยกาง */
  const ctxSheet = useSheet(116, Math.round(vh * 0.56))

  /* ผังหน้านี้กินเต็มพื้นที่เนื้อหา แผงล่างลอยทับอยู่ข้างบนมันอีกที
     ค่าที่คำนวณจาก vh เป็นแค่ค่าสำรองไว้ใช้เฟรมแรกก่อน ResizeObserver จะรายงานกลับมา */
  const screenH = useBoxH(screenNode)
  const contentH = screenH || Math.max(320, vh - 210)
  const ctxMapH = contentH
  const routeMapH = contentH

  /* ตัวปรับมุมกล้องสด เปิดด้วย ?tune=1 เท่านั้น
     มีไว้ให้หามุมที่ชอบได้เองโดยไม่ต้องรอแก้โค้ดทีละรอบ
     เจอมุมที่ใช่แล้วเอาตัวเลขไปใส่ TILT_DEG / TURN_DEG ใน Campus3D.jsx */
  const tuning = useMemo(
    () => new URLSearchParams(window.location.search).get('tune') === '1',
    [],
  )
  const [tilt, setTilt] = useState(49)
  const [turn, setTurn] = useState(45)

  const ranked = useMemo(
    () => (intent ? rankSpaces(report, intent, hour) : []),
    [report, intent, hour],
  )

  // ผู้ใช้ยังไม่ได้เลือกเอง ให้ยึดอันดับหนึ่งไว้ก่อน
  const current = ranked.find(r => r.space.id === pickedId) || ranked[0] || null
  const alts = ranked.filter(r => r.space.id !== current?.space.id).slice(0, 3)

  const cond = useMemo(() => conditions(report, hour), [report, hour])
  const route = useMemo(() => (current ? routeSteps(current.space) : null), [current])
  const events = useMemo(() => eventsToday(report), [report])
  const tips = useMemo(() => tipsFrom(report, hour), [report, hour])

  /* ย้อมสีตัวอาคารตามสถานะของย่าน ไม่ได้พึ่งดวงความหนาแน่นอย่างเดียว
     ดวงบอกว่า "ย่านนี้ร้อน" แต่ไม่ได้บอกว่าอาคารไหนคืออาคารไหน
     พอย้อมที่ตัวอาคาร ผู้ใช้กวาดตาครั้งเดียวก็รู้ว่าตึกไหนควรเลี่ยง */
  const districtTone = useMemo(() => {
    const out = {}
    /* หนึ่งย่านมีได้หลายโซน สีของอาคารต้องสะท้อนโซนที่แน่นที่สุดในนั้น
       ไม่ใช่โซนสุดท้ายที่บังเอิญวนมาถึง ไม่งั้นอาคารที่มีโซนแน่นอยู่จะดูว่าง */
    const worst = {}
    SPACES.forEach(sp => {
      const d = buildingOf(sp).district
      const v = loadAt(report, sp, hour)
      if (worst[d] === undefined || v > worst[d]) worst[d] = v
    })
    Object.entries(worst).forEach(([d, v]) => {
      out[d] = crowdWord(v).tone
    })
    if (current) out[buildingOf(current.space).district] = 'sel'
    return out
  }, [report, hour, current])

  /* หมุดบนแผนที่เป็นรายอาคาร ไม่ใช่รายโซน
     อาคารหนึ่งหลังมีหลายโซน ถ้าปักหมุดตามโซนจะได้หมุดซ้อนกันที่จุดเดียว
     ป้ายบนหมุดจึงบอกชื่ออาคาร และสถานะเอาโซนที่แน่นที่สุดในอาคารนั้น */
  const pins = useMemo(() => {
    const src = intent
      ? ranked
      : SPACES.map(sp => ({ space: sp, load: loadAt(report, sp, hour) }))

    /* หมุดบอกสถานะของโซนที่ "เหมาะกับโหมดที่เลือกที่สุด" ในอาคารนั้น
       ไม่ใช่โซนที่แน่นที่สุด — คนเลือก STUDY อยากรู้ว่าที่นั่งอ่านในตึกนี้ว่างไหม
       ไม่ได้อยากรู้ว่าโรงอาหารในตึกเดียวกันแน่นแค่ไหน
       src เรียงตามความเหมาะมาแล้ว ตัวแรกที่เจอของแต่ละอาคารจึงใช่เลย */
    const byBuilding = new Map()
    src.forEach((r, order) => {
      const b = buildingOf(r.space)
      if (!byBuilding.has(b.id)) byBuilding.set(b.id, { b, load: r.load, order })
    })

    const rows = [...byBuilding.values()].sort((x, y) => x.order - y.order)
    /* ขึ้นป้ายแค่อาคารที่เกี่ยวกับคำถามตอนนี้ ที่เหลือเป็นจุด
       ป้ายครบเก้าอาคารจะทับกันจนอ่านไม่ออกสักอัน และผังก็หายไปใต้ป้าย */
    const labelled = new Set(rows.slice(0, 3).map(r => r.b.id))
    if (current) labelled.add(buildingOf(current.space).id)

    return rows.map(r => ({
      id: r.b.id,
      district: r.b.district,
      label: r.b.shortTh,
      // บอกเป็นคำ ไม่ใช่เปอร์เซ็นต์ คนที่ยืนอยู่หน้าคณะอยากรู้ว่า "ไปได้ไหม"
      sub: crowdWord(r.load ?? 0).th,
      tone: crowdWord(r.load ?? 0).tone,
      showLabel: labelled.has(r.b.id),
    }))
  }, [intent, ranked, report, hour, current])

  /* ปุ่มล่างขึ้นกับจอที่อยู่ ไม่ได้ฝังไว้ในเนื้อหาของแต่ละจอ
     เพราะแถบล่างต้องตรึงอยู่กับกรอบแอป ไม่เลื่อนหนีไปกับเนื้อหา */
  /* INTENT กับ LIVE CONTEXT อยู่หน้าเดียวกัน
     เลือกเจตนาแล้วบริบทกับผังอัปเดตตรงนั้นเลย ไม่ต้องข้ามหน้าไปดู
     สองอย่างนี้เป็นคำถามกับคำตอบของกันและกัน แยกหน้าแล้วต้องเด้งไปมาเวลาเปลี่ยนใจ */
  /* จุดบอกตำแหน่งใช้ "ขั้น" ไม่ใช่รายชื่อหน้า เพราะเส้นทางมีทางแยก
     จากจอผัง กดปุ่มถัดไปจะได้หน้าแนะนำ ส่วนกดอาคารจะได้หน้าโซนในอาคาร
     สองหน้านั้นอยู่ขั้นเดียวกันในสายตาผู้ใช้ คือ "เลือกว่าจะไปไหน" */
  const STEP = { intent: 0, context: 1, building: 2, recommend: 2, detail: 3, route: 4, extra: 5 }
  const TOTAL_STEPS = 6
  const nextOf = {
    intent: intent ? () => go('context') : null,
    context: current ? () => go('recommend') : null,
    building: () => go('detail'),
    recommend: () => go('detail'),
    detail: () => go('route'),
    route: () => go('extra'),
    extra: null,
  }

  const pill = intent && (
    <span className="pill">
      <Icon name={INTENT_MAP[intent].icon} size={13} />
      {INTENT_MAP[intent].en}
    </span>
  )

  return (
    <div className="app">
      <Header
        survey={survey}
        onBack={() => (window.location.href = backToOrganize(window.location.search))}
      />

      <main className={'screen' + (loading ? ' is-loading' : '')} key={view} ref={setScreen}>
        {view === 'intent' && (
          <>
            <div className="hello">
              <p>สวัสดี</p>
              <h1>วันนี้คุณมาที่คณะเพื่ออะไร?</h1>
            </div>
            <div className="intents">
              {INTENTS.map(it => (
                <button
                  key={it.id}
                  type="button"
                  className={'intent' + (intent === it.id ? ' is-on' : '')}
                  /* กดเลือกแล้วไปจอผังทันที เนื้อหาแทนที่ทั้งจอ
                     ไม่ใช่กางบริบทต่อท้ายให้ต้องเลื่อนลงไปหา
                     และไม่ต้องกดปุ่มถัดไปซ้ำ เพราะการเลือกคือการตัดสินใจแล้ว */
                  onClick={() => {
                    setIntent(it.id)
                    setPickedId(null)
                    go('context')
                  }}
                >
                  <span className="intent__ic">
                    <Icon name={it.icon} size={20} />
                  </span>
                  <b>{it.en}</b>
                  <small>{it.th}</small>
                </button>
              ))}
            </div>
            <div className="bot">
              {/* มาสคอต MOMAY แทนไอคอนดาว การ์ดนี้เป็นเสียงของผู้ช่วย
                  ใบหน้าสื่อว่ามีใครกำลังช่วยอยู่ ชัดกว่าสัญลักษณ์ทั่วไป
                  alt ว่างเพราะข้อความข้าง ๆ บอกครบแล้ว ไม่ต้องให้อ่านซ้ำ */}
              <img className="bot__ic" src="./MOMAY_bot.png" alt="" width="40" height="40" decoding="async" />
              <p>
                <b>MOMAY ช่วยคุณได้</b>
                บอกสิ่งที่คุณต้องการ แล้ว MOMAY จะหาตัวเลือกที่เหมาะที่สุดให้คุณแบบ
                {/* คำทับศัพท์ไม่มีในพจนานุกรมตัดคำภาษาไทยของเบราว์เซอร์
                    มันจึงหาจุดตัดไม่เจอแล้วตัดกลางคำเป็น "เรี/ยลไทม์"
                    (keep-all ไม่ช่วย เพราะ Chrome ใช้กับภาษาจีน-ญี่ปุ่น-เกาหลีเท่านั้น)
                    ห่อด้วย nowrap เพื่อเอาจุดตัดข้างในออกให้หมด */}
                <span className="nb">เรียลไทม์</span>
              </p>
            </div>
          </>
        )}

        {view === 'context' && intent && (
          <div className="mapscreen">
            <div className="vhead vhead--over">
              <button type="button" className="pill pill--tap" onClick={back}>
                <Icon name={INTENT_MAP[intent].icon} size={13} />
                {INTENT_MAP[intent].en}
                <Icon name="back" size={11} />
              </button>
              <h1>{INTENT_MAP[intent].leadTh}</h1>
            </div>

            <div className="mapwrap mapwrap--fill">
              <Campus3D
                report={report}
                pins={pins}
                activeId={current ? buildingOf(current.space).id : null}
                districtTone={districtTone}
                full={showAll}
                you={YOU_AT}
                onPick={bid => {
                  setOpenBuilding(bid)
                  go('building')
                }}
                height={ctxMapH}
                tilt={tilt}
                turn={turn}
                /* หัวข้อหน้าลอยทับมุมบนของผังอยู่ กันที่ให้มันไว้ราวหนึ่งในเจ็ดของกรอบ */
                headroom={15}
              />
            </div>

            <div
              className={'sheet' + (ctxSheet.open ? ' is-open' : '')}
              style={{ height: ctxSheet.h }}
            >
              <div className="sheet__head" ref={ctxSheet.ref} role="button" aria-expanded={ctxSheet.open}>
                <i className="sheet__grab" />
                <span className="route__sum">
                  <Icon name="clock" size={16} />
                  <span>
                    <b>
                      {String(hour).padStart(2, '0')}:00 น. · คน{cond.crowd.th}
                    </b>
                    <small>
                      {ctxSheet.open ? 'แตะอาคารบนผังเพื่อดูโซนข้างใน' : 'แตะเพื่อดูสภาพและเปลี่ยนเวลา'}
                    </small>
                  </span>
                </span>
                <Icon name="back" size={15} className="sheet__chev" />
              </div>

              <div className="sheet__body">
                <TimeBar
                  hour={hour}
                  realHour={realHour}
                  range={range}
                  outside={outsideHours}
                  clock={clock}
                  onChange={setHour}
                  report={report}
                />
                <h4 className="subhead">สภาพตอนนี้</h4>
                <Conditions cond={cond} report={report} />
                <button type="button" className="seeall" onClick={() => setShowAll(v => !v)}>
                  {showAll ? 'ย่อผังกลับ' : 'ดูภาพรวมพื้นที่ทั้งหมด'}
                  <Icon name="next" size={13} />
                </button>
              </div>
            </div>
          </div>
        )}

        {view === 'building' && openBuilding && (
          <BuildingZones
            buildingId={openBuilding}
            report={report}
            hour={hour}
            intent={intent}
            onOpen={zid => {
              setPickedId(zid)
              go('detail')
            }}
          />
        )}

        {view === 'recommend' && current && (
          <>
            <div className="vhead">
              {pill}
              <h1>MOMAY แนะนำพื้นที่ที่เหมาะกับคุณตอนนี้</h1>
              <p>จากความหนาแน่น · สภาพแวดล้อม · ความใกล้ และเวลาที่คุณมี</p>
            </div>

            <BestCard
              pick={current}
              intent={intent}
              onOpen={() => go('detail')}
              onRoute={() => go('route')}
            />

            <h4 className="subhead">ตัวเลือกอื่น ๆ ที่เหมาะกับคุณ</h4>
            <div className="alts">
              {alts.map(a => (
                <button
                  key={a.space.id}
                  type="button"
                  className="alt"
                  onClick={() => {
                    setPickedId(a.space.id)
                    go('detail')
                  }}
                >
                  <span className={'alt__art art--' + a.space.tone}>
                    {photoOf(a.space) && <img src={photoOf(a.space)} alt="" loading="lazy" />}
                  </span>
                  <span className="alt__txt">
                    <b>{a.space.th}</b>
                    <small>{buildingOf(a.space).th}</small>
                    <span className={'chip chip--' + a.crowd.tone}>
                      <Icon name="crowd" size={12} />
                      คน{a.crowd.th} · {a.space.noteTh}
                    </span>
                  </span>
                  <span className="alt__walk">
                    <Icon name="walk" size={14} />
                    {a.walk.minutes} นาที
                  </span>
                </button>
              ))}
            </div>

          </>
        )}

        {view === 'detail' && current && (
          <>
            <Detail
              pick={current}
              report={report}
              hour={hour}
              tab={detailTab}
              onTab={setDetailTab}
              onBack={back}
            />
            <button type="button" className="btn" onClick={() => go('route')}>
              ดูเส้นทางไปที่นี่
              <Icon name="next" size={16} />
            </button>
          </>
        )}

        {view === 'route' && current && (
          <>
            <Route
              report={report}
              pick={current}
              route={route}
              districtTone={districtTone}
              mapH={routeMapH}
              tilt={tilt}
              turn={turn}
              onBack={back}
            />
          </>
        )}

        {view === 'extra' && current && (
          <>
            <div className="vhead">
              <h1>สิ่งที่คุณอาจสนใจเพิ่มเติม</h1>
            </div>
            <Extra
              events={events}
              tips={tips}
              report={report}
              hour={hour}
              onPick={id => {
                setPickedId(id)
                go('detail')
              }}
              currentId={current.space.id}
            />
          </>
        )}
      </main>

      {tuning && (
        <div className="tune">
          <label>
            ก้ม <b>{tilt}°</b>
            <input type="range" min="20" max="88" value={tilt} onChange={e => setTilt(+e.target.value)} />
          </label>
          <label>
            หัน <b>{turn}°</b>
            <input type="range" min="0" max="90" value={turn} onChange={e => setTurn(+e.target.value)} />
          </label>
          <span>เจอมุมที่ชอบแล้วบอกตัวเลขมา</span>
        </div>
      )}

      <NavBar
        step={STEP[view] ?? 0}
        total={TOTAL_STEPS}
        onBack={canBack ? back : null}
        onNext={nextOf[view]}
      />
    </div>
  )
}

/* หน้า "โซนในอาคาร" — ปลายทางของการกดอาคารบนผัง
   แสดงทุกโซนในตึกนั้นพร้อมสถานะ เรียงตามว่าเหมาะกับโหมดที่เลือกแค่ไหน
   ที่ต้องมีหน้านี้คั่น เพราะหนึ่งอาคารมีหลายโซนคนละประเภท กดตึกแล้วกระโดด
   ไปโซนใดโซนหนึ่งเลยจะเป็นการตัดสินใจแทนผู้ใช้ */
function BuildingZones({ buildingId, report, hour, intent, onOpen }) {
  const b = BUILDING_MAP[buildingId]
  const zones = SPACES.filter(z => z.building === buildingId)
    .map(z => {
      const load = loadAt(report, z, hour)
      return {
        z,
        load,
        free: freeSeats(z, load),
        crowd: crowdWord(load),
        walk: walkFrom(YOU_AT, districtCenter(b.district)),
        fit: intent ? z.fits[intent] ?? 0 : 0,
      }
    })
    .sort((x, y) => y.fit - x.fit || x.load - y.load)

  const worst = zones.reduce((m, r) => Math.max(m, r.load), 0)
  const w = crowdWord(worst)

  return (
    <>
      <div className="vhead">
        <h1>{b.th}</h1>
        <p>
          ในอาคารนี้มี {zones.length} โซน · ตอนนี้โดยรวม
          <b className={'txt--' + w.tone}> {w.th}</b> · เดิน {zones[0]?.walk.minutes} นาที
        </p>
      </div>

      <div className="alts">
        {zones.map(r => (
          <button key={r.z.id} type="button" className="alt" onClick={() => onOpen(r.z.id)}>
            <span className={'alt__art art--' + r.z.tone}>
              {photoOf(r.z) && <img src={photoOf(r.z)} alt="" loading="lazy" />}
            </span>
            <span className="alt__txt">
              <b>{r.z.th}</b>
              <small>{KIND_TH[r.z.kind]}</small>
              <span className={'chip chip--' + r.crowd.tone}>
                <Icon name="seat" size={12} />
                คน{r.crowd.th} · ว่าง {r.free} ที่
              </span>
            </span>
            <span className="alt__walk">
              <Icon name="next" size={14} />
            </span>
          </button>
        ))}
      </div>
    </>
  )
}

/* ผังเต็มหน้าจอ — ใช้ตอนอยากดูทางละเอียด
   ปิดด้วยปุ่มหรือปุ่ม Escape ผังข้างในลากเลื่อนได้เหมือนเดิม */
function MapFull({ report, pick, route, districtTone, tilt, turn, onClose }) {
  const [h, setH] = useState(() => (typeof window !== 'undefined' ? window.innerHeight - 96 : 600))

  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose()
    const onResize = () => setH(window.innerHeight - 96)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [onClose])

  return (
    <div className="mapfull" role="dialog" aria-label={'ผังเส้นทางไป ' + pick.space.th}>
      <div className="mapfull__bar">
        <b>เส้นทางไป {pick.space.th}</b>
        <button type="button" className="route__ic" onClick={onClose} aria-label="ปิด">
          <Icon name="back" size={15} />
        </button>
      </div>
      <Campus3D
        report={report}
        pins={[
          {
            id: buildingOf(pick.space).id,
            district: buildingOf(pick.space).district,
            label: pick.space.th,
            tone: 'go',
            showLabel: true,
          },
        ]}
        activeId={buildingOf(pick.space).id}
        route={route}
        you={YOU_AT}
        districtTone={{ ...districtTone, [buildingOf(pick.space).district]: 'sel' }}
        height={h}
        tilt={tilt}
        turn={turn}
      />
      <p className="mapfull__hint">ลากเพื่อเลื่อนผัง · กด Esc หรือปุ่มมุมบนเพื่อปิด</p>
    </div>
  )
}

/* แถบล่าง จุดบอกว่าอยู่ตรงไหนของเส้นทาง และปุ่มวงกลมไปต่อ
   ปุ่มไปต่อถูก "ปิด" เมื่อยังเลือกสิ่งที่จำเป็นไม่ครบ ไม่ใช่ "ซ่อน"
   ผู้ใช้จะได้เห็นว่ามีขั้นถัดไปอยู่ แค่ยังไปไม่ได้ */
/* ซ่อนปุ่มไปต่อไว้ก่อนตามที่สั่ง — ทุกหน้าเดินต่อด้วยการกดสิ่งที่อยู่ในหน้าอยู่แล้ว
   (กดอาคารบนผัง กดโซน กดปุ่มดูเส้นทาง) ปุ่มนี้จึงซ้ำซ้อน
   อยากเอากลับมาเมื่อไหร่เปลี่ยนค่านี้เป็น true พอ */
const SHOW_NEXT = false

function NavBar({ step, total, onBack, onNext }) {
  return (
    <div className="nav">
      {onBack ? (
        /* ไอคอนอย่างเดียว คู่กับปุ่มไปต่อที่เป็นวงกลมอยู่แล้ว
           ความหมายของลูกศรย้อนกลับชัดพอโดยไม่ต้องมีคำกำกับ
           ชื่อสำหรับโปรแกรมอ่านหน้าจออยู่ที่ aria-label */
        <button type="button" className="nav__back" onClick={onBack} aria-label="ย้อนกลับ">
          <Icon name="back" size={16} />
        </button>
      ) : (
        <span />
      )}
      <span className="nav__dots">
        {Array.from({ length: total }, (_, i) => i).map(i => (
          <i key={i} className={i === step ? 'is-on' : undefined} />
        ))}
      </span>
      {SHOW_NEXT ? (
        <button
          type="button"
          className="nav__next"
          onClick={onNext || undefined}
          disabled={!onNext}
          aria-label="ไปต่อ"
        >
          <Icon name="next" size={18} />
        </button>
      ) : (
        /* ที่ว่างกว้างเท่าปุ่มเดิม เพื่อให้จุดบอกขั้นตอนยังอยู่กึ่งกลางจอ */
        <span className="nav__gap" />
      )}
    </div>
  )
}

/* ─────────────────────────── ส่วนประกอบ ─────────────────────────── */

/* แถบหัวแอป — โลโก้ซ้าย ค้นหาและโปรไฟล์ขวา เหมือนแอปทั่วไป
   ปุ่มกลับไปมุมมองคณะซ่อนอยู่ในเมนูโปรไฟล์ ไม่เอามาเกะกะแถบหัว
   เพราะผู้ใช้จริงของแอปนี้คือนักศึกษา ไม่ใช่คนที่กำลังดูเดโมสองฝั่ง */
function Header({ survey, onBack }) {
  return (
    <header className="hd">
      <div className="hd__bar">
        <div className="hd__brand">
          <img className="hd__logo" src="./MOMAY_logo.png" alt="MOMAY ENLIGHTENMENT" />
          <b>STUDENT</b>
        </div>
        <button type="button" className="hd__ic" aria-label="ค้นหาพื้นที่">
          <Icon name="search" size={18} />
        </button>
        <button type="button" className="hd__av" onClick={onBack} title="ดูมุมมองของคณะ">
          <Icon name="users" size={16} />
        </button>
      </div>
      {!survey.cameFromOrganize && (
        <p className="hd__note">
          กำลังใช้ข้อมูลตัวอย่าง — เปิดจากหน้า MOMAY Surprise (คณะ) เพื่อดูผลจากตัวเลขที่คุณกรอกเอง
        </p>
      )}
    </header>
  )
}

/* หัวข้อในแอปเป็นประโยคที่พูดกับผู้ใช้ ไม่ใช่ชื่อระยะของกระบวนการ
   ผู้ใช้ไม่ได้สนใจว่าตัวเองอยู่ "ขั้นที่ 3" เขาสนใจว่าตอนนี้แอปกำลังบอกอะไร */
function Section({ title, sub, action, children }) {
  return (
    <section className="sec">
      {title && (
        <div className="sec__hd">
          <div>
            <h2>{title}</h2>
            {sub && <p>{sub}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

function TimeBar({ hour, realHour, range, outside, clock, onChange, report }) {
  const [open, setOpen] = useState(outside)
  const d = new Date()
  const dateTh = d.toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'short' })
  const hh = h => String(h).padStart(2, '0') + ':00'
  return (
    <div className="tbar">
      <div className="tbar__now">
        <Icon name="clock" size={16} />
        <span>
          วันนี้ {dateTh} · <b>{hh(hour)} น.</b>
        </span>
        <button type="button" className="tbar__reset" onClick={() => setOpen(v => !v)}>
          {open ? 'เสร็จแล้ว' : 'เปลี่ยนเวลา'}
        </button>
      </div>
      {/* ตัวเลื่อนเวลาซ่อนไว้จนกว่าจะกด — ปกติผู้ใช้ดูของ "ตอนนี้"
          การโชว์ตัวเลื่อนตลอดทำให้เหมือนต้องตั้งค่าอะไรก่อนถึงจะใช้ได้ */}
      {open && (
        <>
          <input
            className="tbar__range"
            type="range"
            min={range.min}
            max={range.max}
            step={1}
            value={hour}
            onChange={e => onChange(Number(e.target.value))}
            aria-label="เลือกเวลาที่จะดู"
          />
          <div className="tbar__scale">
            <span>{hh(range.min)}</span>
            <span>ช่วงพีคของคณะ {report.peakWindow}</span>
            <span>{hh(range.max)}</span>
          </div>
          {hour !== realHour && (
            <button type="button" className="tbar__back" onClick={() => onChange(realHour)}>
              กลับมาที่เวลาตอนนี้
            </button>
          )}
        </>
      )}
      {outside && (
        <p className="tbar__outside">
          ตอนนี้ {hh(clock)} น. อยู่นอกเวลาทำการของคณะ ({hh(range.min)}–{hh(range.max)} น.)
          — กำลังแสดงภาพของ {hh(realHour)} น. เลื่อนเพื่อดูเวลาอื่นได้
        </p>
      )}
    </div>
  )
}

/* แถวเดียวสามค่า ไม่ใช่การ์ดสามใบ
   การ์ดใบใหญ่กินความสูงไปมากโดยที่ข้อมูลมีแค่คำเดียวกับตัวเลข
   ความสูงที่ประหยัดได้เอาไปให้ผังซึ่งเป็นเนื้อหาหลักของจอนี้ */
function Conditions({ cond, report }) {
  const pm = cond.pm25 <= 25 ? 'ดี' : cond.pm25 <= 50 ? 'ปานกลาง' : 'แย่'
  return (
    <div className="cond">
      <div className="cond__row">
        <Stat icon="crowd" label="คนในคณะ" value={cond.crowd.th} tone={cond.crowd.tone} />
        <Stat icon="temp" label="อุณหภูมิ" value={`${cond.tempC}°C`} tone="warm" />
        <Stat icon="leaf" label="PM2.5" value={`${cond.pm25} ${pm}`} tone="ok" />
      </div>
      <p className="cond__note">
        ความหนาแน่นมาจากข้อมูลชุดเดียวกับหน้าคณะ (ความต้องการพื้นที่ {report.spaceLoadPct}% ของที่มี)
        · อุณหภูมิและ PM2.5 เป็นข้อมูลจำลอง ยังไม่ได้ต่อเซ็นเซอร์จริง
      </p>
    </div>
  )
}

function Stat({ icon, label, value, tone }) {
  return (
    <div className="stat">
      <span className={'stat__ic stat__ic--' + (tone || 'none')}>
        <Icon name={icon} size={15} />
      </span>
      <span className="stat__txt">
        <small>{label}</small>
        <b>{value}</b>
      </span>
    </div>
  )
}

function BestCard({ pick, intent, onOpen, onRoute }) {
  const reasons = reasonsFor(pick, intent)
  return (
    <article className="best">
      <div className={'best__art art--' + pick.space.tone}>
        {photoOf(pick.space) && (
          <img src={photoOf(pick.space)} alt="" loading="lazy" decoding="async" />
        )}
        <span className="best__tag">แนะนำที่สุด</span>
        <button type="button" className="best__fav" aria-label="บันทึกไว้">
          <Icon name="heart" size={15} />
        </button>
      </div>
      <div className="best__body">
        <div className="best__top">
          <div>
            <h3>{pick.space.th}</h3>
            <p className="best__where">{buildingOf(pick.space).th}</p>
          </div>
          <span className="best__walk">
            <b>{pick.walk.minutes} นาที</b>
            <small>({pick.walk.meters} เมตร)</small>
          </span>
        </div>

        <div className="best__meta">
          <span className={'chip chip--' + pick.crowd.tone}>
            <Icon name="crowd" size={12} />
            {pick.crowd.th} {Math.round(pick.load * 100)}%
          </span>
          <span className="chip">
            <Icon name="seat" size={12} />ว่าง {pick.free} ที่
          </span>
        </div>

        <ul className="reasons">
          {reasons.map((r, i) => (
            <li key={i} className={r.ok ? 'is-ok' : 'is-warn'}>
              <Icon name={r.ok ? 'check' : 'alert'} size={14} />
              {r.th}
            </li>
          ))}
        </ul>

        <button type="button" className="btn btn--ghost" onClick={onOpen}>
          ดูรายละเอียดก่อน
        </button>
        <button type="button" className="btn" onClick={onRoute}>
          ดูเส้นทางไปที่นี่
          <Icon name="next" size={16} />
        </button>
      </div>
    </article>
  )
}

function Detail({ pick, report, hour, tab, onTab, onBack }) {
  const { space } = pick
  const hours = report.hours.map(h => ({
    at: h.at,
    label: h.label,
    value: loadAt(report, space, h.at),
  }))
  const peak = Math.max(...hours.map(h => h.value), 0.01)

  return (
    <div className="detail">
      <div className={'detail__art art--' + space.tone}>
        {photoOf(space) && <img src={photoOf(space)} alt="" decoding="async" />}
        <button type="button" className="art__ic art__ic--l" onClick={onBack} aria-label="ย้อนกลับ">
          <Icon name="back" size={15} />
        </button>
        <button type="button" className="art__ic art__ic--r" aria-label="บันทึกไว้">
          <Icon name="heart" size={15} />
        </button>
        <span className="detail__count">
          {space.outdoor ? 'พื้นที่กลางแจ้ง' : 'พื้นที่ในอาคาร'}
        </span>
      </div>

      <h3>{space.th}</h3>
      <p className="best__where">{buildingOf(space).th}</p>

      <div className="tabs">
        {[
          ['overview', 'ภาพรวม'],
          ['load', 'ความหนาแน่น'],
          ['amen', 'สิ่งอำนวยความสะดวก'],
        ].map(([id, th]) => (
          <button
            key={id}
            type="button"
            className={'tab' + (tab === id ? ' is-on' : '')}
            onClick={() => onTab(id)}
          >
            {th}
          </button>
        ))}
      </div>

      {/* ทั้งสามแท็บถูกเรนเดอร์ไว้ซ้อนกันในช่องกริดเดียว กล่องจึงสูงเท่าแท็บที่สูงที่สุดเสมอ
          ถ้าเรนเดอร์เฉพาะแท็บที่เลือก ความสูงจะเปลี่ยนทุกครั้งที่สลับแท็บ
          แล้วปุ่ม "ดูเส้นทางไปที่นี่" ข้างล่างก็จะกระโดดหนีนิ้วที่กำลังจะกด */}
      <div className="panes">
      <div className={'pane' + (tab === 'overview' ? ' is-on' : '')}>
          <p className="pane__lead">{space.noteTh}</p>
          <div className="kv">
            <div>
              <small>ที่นั่งทั้งหมด</small>
              <b>{space.seats} ที่</b>
            </div>
            <div>
              <small>ว่างตอนนี้</small>
              <b>{pick.free} ที่</b>
            </div>
            <div>
              <small>ระดับเสียง</small>
              <b>{space.quiet >= 0.8 ? 'เงียบมาก' : space.quiet >= 0.5 ? 'เงียบปานกลาง' : 'คุยกันได้'}</b>
            </div>
            <div>
              <small>ระยะเดิน</small>
              <b>
                {pick.walk.minutes} นาที · {pick.walk.meters} ม.
              </b>
            </div>
          </div>
          <h4 className="subhead">เหมาะสำหรับ</h4>
          <div className="tagrow">
            {space.suitTh.map(t => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
      </div>

      <div className={'pane' + (tab === 'load' ? ' is-on' : '')}>
          <p className="pane__lead">ความหนาแน่นตอนนี้</p>
          <div className={'nowbig nowbig--' + pick.crowd.tone}>
            <b>{pick.crowd.th}</b>
            <span>{Math.round(pick.load * 100)}%</span>
          </div>
          <div className="chart">
            {hours.map(h => (
              <div
                key={h.at}
                className={'bar' + (h.at === hour ? ' is-now' : '')}
                style={{ '--v': Math.max(0.04, h.value / peak) }}
                title={`${h.label} · ${Math.round(h.value * 100)}%`}
              >
                <i />
              </div>
            ))}
          </div>
          <div className="chart__axis">
            {hours
              .filter((_, i) => i % 3 === 0)
              .map(h => (
                <span key={h.at}>{h.at}</span>
              ))}
          </div>
          <div className="legend">
            <span className="dot dot--ok" />ไม่หนาแน่น
            <span className="dot dot--mid" />ปานกลาง
            <span className="dot dot--hot" />หนาแน่น
          </div>
      </div>

      <div className={'pane' + (tab === 'amen' ? ' is-on' : '')}>
          <div className="amen">
            {space.amenities.map(a => (
              <div key={a} className="amen__it">
                <Icon name={AMENITY[a].icon} size={17} />
                <span>{AMENITY[a].th}</span>
              </div>
            ))}
          </div>
      </div>
      </div>
    </div>
  )
}

/* tilt/turn ต้องรับเป็น prop ไม่ใช่อ่านจากขอบเขตนอก
   ตอนเพิ่มตัวปรับมุมผมใส่ tilt={tilt} ให้ Campus3D ทุกจุดด้วย sed
   รวมถึงจุดนี้ซึ่งอยู่คนละคอมโพเนนต์ หน้าเส้นทางจึงพังทั้งหน้า */
function Route({ report, pick, route, districtTone, mapH, tilt, turn, onBack }) {
  /* ขยายเต็มจอ — ผังในหน้ายังต้องเหลือที่ให้ขั้นตอนข้างล่าง
     พอผู้ใช้อยากดูทางละเอียดก็กดขยาย ไม่ต้องเลือกอย่างใดอย่างหนึ่งตั้งแต่แรก */
  const [big, setBig] = useState(false)
  /* ค่าตั้งต้นคือยุบ เพราะสิ่งแรกที่ผู้ใช้อยากเห็นบนหน้านี้คือ "ทางไปยังไง"
     ไม่ใช่รายการขั้นตอนเป็นตัวหนังสือ */
  const vh = useViewportH()
  const sheet = useSheet(132, Math.round(vh * 0.62))
  /* mapH ที่ส่งมาคือพื้นที่เนื้อหาทั้งก้อน หน้านี้มีแถบชื่อเส้นทางกินไปส่วนหนึ่ง
     จึงต้องวัดแถบนั้นแล้วหักออก ไม่งั้นผังจะยาวเกินจนดันแถบล่างตกขอบ */
  const [hdNode, setHdNode] = useState(null)
  const hdH = useBoxH(hdNode)
  const open = sheet.open

  return (
    <div className="route">
      <div className="route__hd" ref={setHdNode}>
        <button type="button" className="route__ic" onClick={onBack} aria-label="ย้อนกลับ">
          <Icon name="back" size={15} />
        </button>
        <b>เส้นทางไป {pick.space.th}</b>
        <button
          type="button"
          className="route__ic"
          onClick={() => setBig(true)}
          aria-label="ขยายผังเต็มจอ"
        >
          <Icon name="grid" size={15} />
        </button>
      </div>

      {/* เป็น div ไม่ใช่ button เพราะข้างในมีหมุดที่เป็นปุ่มอยู่แล้ว
          ปุ่มซ้อนปุ่มเป็น HTML ที่ไม่ถูกต้อง และเบราว์เซอร์จะจัดการการกดให้มั่ว */}
      <div
        className="mapwrap mapwrap--route"
        role="button"
        tabIndex={0}
        onClick={() => setBig(true)}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setBig(true)}
      >
        <Campus3D
          report={report}
          pins={[
            {
              id: buildingOf(pick.space).id,
              district: buildingOf(pick.space).district,
              label: pick.space.th,
              tone: 'go',
              // ต้องสั่งให้ขึ้นป้าย ไม่งั้นปลายทางจะเป็นแค่จุด ไม่รู้ว่าจะไปไหน
              showLabel: true,
            },
          ]}
          activeId={buildingOf(pick.space).id}
          route={route}
          you={YOU_AT}
          /* ส่งสถานะของทุกอาคารไป ไม่ใช่แค่ปลายทาง
             ถ้าส่งแค่ปลายทาง อาคารที่เหลือจะเป็นสีเทาเปล่าทั้งผัง
             ผู้ใช้จะไม่เห็นว่าระหว่างทางผ่านย่านที่คนแน่นหรือเปล่า */
          districtTone={{ ...districtTone, [buildingOf(pick.space).district]: 'sel' }}
          height={Math.max(300, mapH - hdH)}
          tilt={tilt}
          turn={turn}
        />
        <span className="mapwrap__zoom">
          <Icon name="search" size={13} />
          แตะเพื่อขยาย
        </span>
      </div>

      {big && (
        <MapFull
          report={report}
          pick={pick}
          route={route}
          districtTone={districtTone}
          tilt={tilt}
          turn={turn}
          onClose={() => setBig(false)}
        />
      )}

      <div
        className={'sheet' + (open ? ' is-open' : '')}
        style={{ height: sheet.h }}
      >
        {/* กดตรงไหนของหัวแผงก็กาง/ยุบได้ ไม่ต้องเล็งขีดเล็ก ๆ */}
        <div className="sheet__head" ref={sheet.ref} role="button" aria-expanded={open}>
          <i className="sheet__grab" />
          <span className="route__sum">
            <Icon name="walk" size={16} />
            <span>
              <b>
                {route.total.minutes} นาที ({route.total.meters} เมตร)
              </b>
              <small>
                {open ? 'เส้นทางเดินในคณะ' : `${route.legs.length} ขั้นตอน · แตะเพื่อดู`}
              </small>
            </span>
          </span>
          <Icon name="back" size={15} className="sheet__chev" />
        </div>

        <div className="sheet__body">
          <ol className="legs">
            {route.legs.map((l, i) => (
              <li key={i}>
                <span className={'legs__th art--' + pick.space.tone}>
                  {photoOf(pick.space) && <img src={photoOf(pick.space)} alt="" loading="lazy" />}
                </span>
                <span className="legs__t">{l.th}</span>
                <span className="legs__m">{l.min} นาที</span>
              </li>
            ))}
          </ol>
        </div>

        <button type="button" className="btn">
          เริ่มนำทาง
          <Icon name="next" size={16} />
        </button>
      </div>
    </div>
  )
}

function Extra({ events, tips, report, hour, onPick, currentId }) {
  const nearby = SPACES.filter(s => s.id !== currentId)
    .map(s => {
      const load = loadAt(report, s, hour)
      return { space: s, load, free: freeSeats(s, load), crowd: crowdWord(load) }
    })
    .sort((a, b) => a.load - b.load)
    .slice(0, 3)

  return (
    <div className="extra">
      <h4 className="subhead">
        กิจกรรมในคณะวันนี้
        <a href="#events">ดูทั้งหมด</a>
      </h4>
      <ul className="events">
        {events.map((e, i) => (
          <li key={i}>
            <span className="events__ic">
              <Icon name="pin" size={14} />
            </span>
            <div>
              <b>{e.th}</b>
              <small>
                {e.whenTh} · {e.whereTh}
              </small>
            </div>
          </li>
        ))}
      </ul>

      <h4 className="subhead">
        พื้นที่ใกล้เคียงที่คุณอาจสนใจ
        <a href="#nearby">ดูทั้งหมด</a>
      </h4>
      <div className="alts">
        {nearby.map(n => (
          <button key={n.space.id} type="button" className="alt" onClick={() => onPick(n.space.id)}>
            <span className={'alt__art art--' + n.space.tone}>
              {photoOf(n.space) && <img src={photoOf(n.space)} alt="" loading="lazy" />}
            </span>
            <span className="alt__txt">
              <b>{n.space.th}</b>
              <small>{buildingOf(n.space).th}</small>
              <span className={'chip chip--' + n.crowd.tone}>
                <Icon name="seat" size={12} />ว่าง {n.free} ที่
              </span>
            </span>
            <span className="alt__walk">
              <Icon name="next" size={14} />
            </span>
          </button>
        ))}
      </div>

      <h4 className="subhead">เคล็ดลับจาก MOMAY</h4>
      <ul className="tips">
        {tips.map((t, i) => (
          <li key={i} className={'tip tip--' + t.tone}>
            <Icon name={t.icon} size={16} />
            <span>{t.th}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Footer({ survey }) {
  return (
    <footer className="ft">
      <div className="ft__l">
        <b>
          MOMAY <span>STUDENT</span>
        </b>
        <small>Behavioral Intelligence for a Better Student Day</small>
      </div>
      <p className="ft__r">
        Same Intelligence. Different Experience.
        <a href={backToOrganize(window.location.search)}>ดูมุมมองของคณะ</a>
      </p>
    </footer>
  )
}


/* ── เส้นทางของแอป ──
   แต่ละจอมี URL ของตัวเอง (#/context, #/detail ...) ไม่ใช่แค่สลับคอมโพเนนต์ในหน้าเดียว
   ที่ต้องเป็น URL จริงเพราะสามอย่าง:
     - กดแล้วรู้สึกเหมือนเปลี่ยนหน้า ไม่ใช่เนื้อหาเปลี่ยนเฉย ๆ
     - ปุ่มย้อนกลับของเบราว์เซอร์และปัดย้อนบนมือถือใช้ได้ตามที่ผู้ใช้คาด
     - ส่งลิงก์ให้เพื่อนเปิดตรงหน้านั้นได้

   ใช้ hash ไม่ใช่ pathname เพราะแอปนี้ถูก build เป็นไฟล์สแตติกวางใน public/ ของ Nuxt
   ถ้าใช้ pathname แล้วผู้ใช้กด refresh กลางทาง เซิร์ฟเวอร์จะหาไฟล์ตามพาธนั้นไม่เจอ */
function useRoute(initial) {
  const read = () => (window.location.hash.replace(/^#\/?/, '') || initial)
  const [view, setView] = useState(read)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const onHash = () => {
      const next = read()
      setView(v => {
        if (v === next) return v
        /* หน่วงสั้น ๆ ให้เห็นว่ากำลังเปลี่ยนหน้า
           ถ้าเปลี่ยนทันทีจะกะพริบจนไม่รู้ว่ากดติดหรือเปล่า */
        setLoading(true)
        setTimeout(() => setLoading(false), 170)
        return next
      })
    }
    window.addEventListener('hashchange', onHash)
    if (!window.location.hash) window.location.replace('#/' + initial)
    return () => window.removeEventListener('hashchange', onHash)
  }, [initial])

  return {
    view,
    loading,
    /* ดูจากจอที่อยู่ ไม่ใช่ตัวนับที่เราบวกเอง
       ถ้านับเอง พอผู้ใช้กด back ของเบราว์เซอร์ ตัวนับจะไม่ลดตาม
       ปุ่มย้อนกลับในแอปก็จะค้างโชว์ทั้งที่อยู่หน้าแรกแล้ว */
    canBack: view !== initial,
    go: v => {
      window.location.hash = '#/' + v
    },
    // สั่ง history.back() ไม่ใช่ setView ตรง ๆ ประวัติจะได้ไม่งอกเป็นใบซ้อนใบ
    back: () => window.history.back(),
  }
}


/* ── แผงล่างที่ลากได้ ──
   มีสองระดับ: โผล่แค่บรรทัดสรุป กับกางเต็ม
   ลากขึ้น-ลงได้ด้วยนิ้ว ปล่อยแล้วดีดไปหาระดับที่ใกล้กว่า
   ที่ต้องมีทั้งลากและแตะ เพราะบนมือถือคนลาก ส่วนบนเดสก์ท็อปคนคลิก
   ถ้ามีแค่ลาก เมาส์จะใช้ยาก ถ้ามีแค่แตะ นิ้วจะรู้สึกว่าแผงไม่ตอบสนอง */
/* ความสูงจอที่อัปเดตจริงเมื่อจอเปลี่ยน
   ใช้ visualViewport ถ้ามี เพราะบนมือถือมันคือพื้นที่ที่มองเห็นจริง
   ต่างจาก innerHeight ที่ยังนับแถบที่อยู่ของเบราว์เซอร์รวมไปด้วย */
function useViewportH() {
  const read = () =>
    typeof window === 'undefined' ? 800 : Math.round(window.visualViewport?.height || window.innerHeight)
  const [h, setH] = useState(read)
  useEffect(() => {
    const on = () => setH(read())
    window.addEventListener('resize', on)
    window.visualViewport?.addEventListener('resize', on)
    // orientationchange ยิงก่อนขนาดจอเปลี่ยนจริง เลยต้องรออีกเฟรม
    const onRot = () => setTimeout(on, 250)
    window.addEventListener('orientationchange', onRot)
    on()
    return () => {
      window.removeEventListener('resize', on)
      window.visualViewport?.removeEventListener('resize', on)
      window.removeEventListener('orientationchange', onRot)
    }
  }, [])
  return h
}

/* วัดความสูงของกล่องจริง ๆ แทนที่จะเดาจากความสูงจอลบตัวเลขคงที่
   ตัวเลขที่เดาไว้ (จอ - 210) ไม่มีทางตรงกับความจริงทุกจอ
   เพราะหัวแอปกับแถบล่างสูงไม่เท่ากันเมื่อฟอนต์หรือ safe-area เปลี่ยน
   ผลคือผังเหลือที่ว่างใต้แผงเป็นร้อยพิกเซลโดยไม่มีอะไรอยู่ตรงนั้น */
function useBoxH(node) {
  const [h, setH] = useState(0)
  useEffect(() => {
    if (!node) return
    const read = () => setH(node.clientHeight)
    read()
    const ro = new ResizeObserver(read)
    ro.observe(node)
    return () => ro.disconnect()
  }, [node])
  return h
}

function useSheet(minH, maxH) {
  const [h, setH] = useState(minH)
  /* เก็บ element ไว้ใน state ไม่ใช่ใน ref เพราะ hook นี้ถูกเรียกจาก App
     ซึ่ง mount ครั้งเดียว ถ้าใช้ ref ธรรมดา effect จะรันตอนที่จอยังไม่ถูก render
     ได้ null แล้วไม่รันอีกเลย listener จึงไม่เคยผูก แผงก็ลากไม่ได้
     callback ref ที่เขียนลง state ทำให้ effect รันใหม่ตอน element โผล่จริง */
  const [node, setNode] = useState(null)
  const ref = useCallback(el => setNode(el), [])
  const drag = useRef(null)
  /* ต้องอ่านความสูงปัจจุบันของ "แผง" ตอนเริ่มลาก ไม่ใช่ของหัวแผง
     ref ชี้ไปที่หัวแผงเพราะนั่นคือที่ที่นิ้วจับ แต่ความสูงที่ลากคือของแผงทั้งก้อน
     ใช้ค่าจาก state แทนการวัด DOM จะได้ไม่หยิบผิดตัว */
  const hRef = useRef(minH)
  hRef.current = h

  useEffect(() => setH(v => Math.min(Math.max(v, minH), maxH)), [minH, maxH])

  useEffect(() => {
    const el = node
    if (!el) return
    const onDown = e => {
      drag.current = { y: e.clientY, h0: hRef.current, moved: 0 }
      el.setPointerCapture?.(e.pointerId)
    }
    const onMove = e => {
      const d = drag.current
      if (!d) return
      const dy = d.y - e.clientY
      d.moved = Math.max(d.moved, Math.abs(dy))
      setH(Math.min(maxH, Math.max(minH, d.h0 + dy)))
    }
    const onUp = e => {
      const d = drag.current
      drag.current = null
      el.releasePointerCapture?.(e.pointerId)
      if (!d) return
      // ขยับน้อยกว่านี้ถือว่าตั้งใจแตะ ไม่ใช่ลาก
      if (d.moved < 6) {
        setH(v => (v > (minH + maxH) / 2 ? minH : maxH))
        return
      }
      setH(v => (v > (minH + maxH) / 2 ? maxH : minH))
    }
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
    }
  }, [minH, maxH, node])

  return { h, ref, open: h > (minH + maxH) / 2, dragging: !!drag.current }
}
