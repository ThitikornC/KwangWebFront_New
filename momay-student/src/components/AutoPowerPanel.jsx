import { useEffect, useState } from 'react'

/**
 * แผงควบคุมเครื่องใช้ไฟฟ้าอัตโนมัติ — วางทับหน้า Student ที่ลอกมา โดยไม่แก้ไฟล์นั้นเลย
 *
 * หน้าเดิมไม่มีส่วนแสดงเรื่องพลังงาน แต่สเปกต้องการให้เห็นว่า "เปิด-ปิดเครื่องใช้ไฟฟ้า
 * ตามจำนวนคน" จึงทำเป็นแผงของตัวเองที่อ่านผังกับจำนวนคนจาก mockGateway ตรง ๆ
 * ขึ้นเฉพาะตอนมีผังที่กรอกมาจากหน้า /MomaySurpriseOrganizeV2 เท่านั้น
 *
 * นับเป็น "จุด" ไม่ใช่ % ความสว่าง — สวิตช์เครื่องใช้ไฟฟ้ามีแค่เปิดกับปิด หรี่ไม่ได้
 * เหมือนหลอดไฟ · หนึ่งโซน = หนึ่งจุดควบคุม (ไฟ แอร์ ปลั๊กในโซนนั้นตัดไปด้วยกัน)
 */

/** สถานะของจุดควบคุมหนึ่งจุด ตัดสินจากคนในโซนนั้น
 *  ว่างสนิท = ตัดไฟทั้งจุด · คนบางตา = เปิดเท่าที่จำเป็น (ไฟส่องทางเปิด แอร์ยังไม่ต้อง)
 *  เกินเกณฑ์ = เปิดครบ */
const ECO_PCT = 25

function stateOf(used, pct) {
  if (!used) return { id: 'off', label: 'ตัดไฟ', weight: 0, color: '#7e6ba8' }
  if (pct < ECO_PCT) return { id: 'eco', label: 'เปิดบางส่วน', weight: 0.5, color: '#3ad0ff' }
  return { id: 'on', label: 'เปิดครบ', weight: 1, color: '#ffd84d' }
}

const PEAK_TH = { morning: 'เช้า', midday: 'กลางวัน', evening: 'เย็น', event: 'ช่วงจัดงาน' }

export default function AutoPowerPanel() {
  const [data, setData] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const layout = window.__momayLayout
    const rooms = window.__momayRooms
    if (!layout?.fromSetup || !rooms) return

    const byFloor = new Map()
    for (const r of rooms) {
      if (r.zoneType === 'parking') continue
      const pct = r._total ? Math.round((r._used / r._total) * 100) : 0
      const st = stateOf(r._used, pct)
      const f = byFloor.get(r.floor) ?? { floor: r.floor, used: 0, total: 0, points: [], live: 0 }
      f.used += r._used
      f.total += r._total
      f.points.push({ name: r.label, state: st })
      f.live += st.weight
      byFloor.set(r.floor, f)
    }

    const floors = [...byFloor.values()]
      .sort((a, b) => a.floor - b.floor)
      .map((f) => ({
        ...f,
        // จุดที่ยังจ่ายไฟอยู่ — "เปิดบางส่วน" ก็ยังนับเป็นจุดที่เปิด
        onCount: f.points.filter((p) => p.state.id !== 'off').length,
        pointCount: f.points.length,
        // ภาระไฟจริงของชั้น ถ่วงน้ำหนักไว้ เพราะจุดที่เปิดบางส่วนกินไฟไม่เท่าเปิดครบ
        loadPct: f.points.length ? Math.round((f.live / f.points.length) * 100) : 0,
      }))

    const points = floors.reduce((n, f) => n + f.pointCount, 0)
    const onPoints = floors.reduce((n, f) => n + f.onCount, 0)
    const liveLoad = floors.reduce((n, f) => n + f.live, 0)
    const avgLoad = points ? Math.round((liveLoad / points) * 100) : 0

    setData({
      autoPower: layout.autoPower,
      peak: PEAK_TH[layout.peak] ?? layout.peak,
      floors,
      points,
      onPoints,
      offPoints: points - onPoints,
      avgLoad,
      used: floors.reduce((n, f) => n + f.used, 0),
      total: floors.reduce((n, f) => n + f.total, 0),
      // ประหยัดได้ = ส่วนต่างจากการเปิดทุกจุดเต็มที่ตลอดเวลาทำการ
      saved: layout.autoPower ? Math.max(0, 100 - avgLoad) : 0,
    })
  }, [])

  if (!data) return null

  const box = {
    position: 'fixed',
    right: 14,
    bottom: 14,
    zIndex: 60,
    width: open ? 284 : 'auto',
    padding: open ? 12 : '9px 12px',
    background: '#150d2b',
    border: '2px solid #b06cff',
    borderRadius: 0,
    boxShadow: '4px 4px 0 #06030f',
    color: '#f4efff',
    fontFamily: "'Sarabun', system-ui, sans-serif",
    fontSize: 12,
    cursor: open ? 'default' : 'pointer',
  }

  if (!open) {
    return (
      <div style={box} onClick={() => setOpen(true)}>
        <span style={{ color: '#ffd84d', fontWeight: 700 }}>เครื่องใช้ไฟฟ้า</span>{' '}
        <span style={{ color: data.autoPower ? '#35f58a' : '#b7a6e8' }}>
          {data.autoPower ? `เปิด ${data.onPoints}/${data.points} จุด` : 'เปิดทุกจุด'}
        </span>
      </div>
    )
  }

  return (
    <div style={box}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
        <b style={{ color: '#ffd84d', fontSize: 13 }}>ควบคุมเครื่องใช้ไฟฟ้าอัตโนมัติ</b>
        <button
          type="button"
          onClick={() => setOpen(false)}
          style={{ border: 0, background: 'transparent', color: '#b7a6e8', cursor: 'pointer', fontSize: 14 }}
          aria-label="ย่อ"
        >
          ×
        </button>
      </div>

      {!data.autoPower ? (
        <p style={{ margin: 0, color: '#b7a6e8', lineHeight: 1.6 }}>
          ปิดอยู่ — เครื่องใช้ไฟฟ้าเปิดทุกจุดตลอดเวลาทำการ
        </p>
      ) : (
        <>
          <p style={{ margin: '0 0 9px', color: '#b7a6e8', lineHeight: 1.6 }}>
            คนตอนนี้ <b style={{ color: '#fff' }}>{data.used}</b>/{data.total} ที่นั่ง · จ่ายไฟอยู่{' '}
            <b style={{ color: '#35f58a' }}>
              {data.onPoints}/{data.points}
            </b>{' '}
            จุด
          </p>

          {data.floors.map((f) => (
            <div key={f.floor} style={{ marginBottom: 9 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ color: '#b7a6e8' }}>ชั้น {f.floor}</span>
                <span style={{ color: f.onCount ? '#ffd84d' : '#7e6ba8' }}>
                  เปิด {f.onCount}/{f.pointCount} จุด
                </span>
              </div>
              <div style={{ height: 6, background: '#2a1b4d' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${f.loadPct}%`,
                    background: f.loadPct >= 70 ? '#ff8a3d' : f.loadPct >= 35 ? '#ffd84d' : '#3ad0ff',
                  }}
                />
              </div>
              {/* บอกรายจุดด้วย ไม่งั้นเห็นแต่ตัวเลขรวมแล้วไม่รู้ว่าจุดไหนถูกตัดไฟ */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 5 }}>
                {f.points.map((p, i) => (
                  <span
                    key={`${p.name}-${i}`}
                    title={`${p.name} · ${p.state.label}`}
                    style={{
                      fontSize: 10,
                      lineHeight: 1.5,
                      padding: '1px 6px',
                      color: p.state.color,
                      border: `1px solid ${p.state.color}55`,
                      background: `${p.state.color}14`,
                    }}
                  >
                    {p.name} · {p.state.label}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <p
            style={{
              margin: '10px 0 0',
              paddingTop: 9,
              borderTop: '1px solid #2a1b4d',
              color: '#b7a6e8',
              lineHeight: 1.6,
            }}
          >
            ตัดไฟไปแล้ว <b style={{ color: '#35f58a' }}>{data.offPoints}</b> จุด · ประหยัดไฟได้ราว{' '}
            <b style={{ color: '#35f58a' }}>{data.saved}%</b> เทียบกับเปิดทุกจุดตลอด
          </p>
        </>
      )}

      <p style={{ margin: '8px 0 0', color: '#7e6ba8', fontSize: 11, lineHeight: 1.6 }}>
        คาดการณ์อิงช่วงคนหนาแน่น: <b style={{ color: '#3ad0ff' }}>{data.peak}</b>
      </p>
    </div>
  )
}
