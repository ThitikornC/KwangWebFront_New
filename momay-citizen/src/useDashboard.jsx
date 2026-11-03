import { createContext, useContext, useMemo } from 'react'
import { deriveDashboard, readSurvey, crowdLevel } from './survey.js'
import {
  bestTimes as mockBestTimes,
  crowdZones as mockZones,
  liveStatus,
  parking as mockParking,
  recommendations as mockRecommendations,
} from './data/mock.js'

const DashboardContext = createContext(null)

const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

/** ป้ายตัวเลขบนการ์ด "สถานการณ์ในขณะนี้" */
function buildMetrics(d) {
  if (!d) return liveStatus.metrics

  const tiles = [
    {
      id: 'crowd',
      icon: 'people',
      tone: 'sky',
      label: 'ความหนาแน่นผู้คน',
      value: d.crowd.label,
      note: `(ประมาณ ${Math.round(d.metrics.people)}%)`,
    },
    {
      id: 'air',
      icon: 'leaf',
      tone: 'emerald',
      label: 'คุณภาพอากาศ',
      value: d.air.label,
      note: `PM2.5 ${d.air.pm} µg/m³`,
    },
    // ไม่มีคำถามไหนในแบบสอบถามที่ผูกกับอุณหภูมิ ค่านี้จึงคงที่
    { id: 'temp', icon: 'thermo', tone: 'rose', label: 'อุณหภูมิ', value: '29°C', note: 'รู้สึกสบาย' },
  ]

  if (d.has('traffic')) {
    tiles.push({
      id: 'traffic',
      icon: 'car',
      tone: d.traffic.tone,
      label: 'การจราจร',
      value: d.traffic.label,
      note: `รถช่วงพีค ~${d.peakVehicles.toLocaleString('en-US')} คัน`,
    })
  }
  if (d.has('parking')) {
    tiles.push({
      id: 'parking',
      icon: 'parking',
      tone: d.parkingFree >= 35 ? 'emerald' : 'amber',
      label: 'ที่จอดรถ',
      value: `ว่าง ${d.parkingFree}%`,
      note: `ใช้ไป ${Math.round(d.metrics.parking)}% ของที่มี`,
    })
  }
  if (d.has('energy')) {
    tiles.push({
      id: 'energy',
      icon: 'bolt',
      tone: 'amber',
      label: 'การใช้ไฟในพื้นที่',
      value: `${Math.round(d.metrics.energy)}%`,
      note: 'เทียบกำลังที่มี',
    })
  }
  if (d.has('waste')) {
    tiles.push({
      id: 'waste',
      icon: 'trash',
      tone: d.metrics.waste >= 85 ? 'rose' : 'sky',
      label: 'ปริมาณขยะ',
      value: `${Math.round(d.metrics.waste)}%`,
      note: 'เทียบกำลังที่เก็บไหว',
    })
  }

  return tiles
}

/** ลานจอดรถ — คงสัดส่วนความต่างของแต่ละลานไว้ แล้วเลื่อนทั้งชุดตามที่ว่างจริง */
function buildParking(d) {
  if (!d || !d.has('parking')) return mockParking

  const avg = mockParking.reduce((sum, lot) => sum + lot.level, 0) / mockParking.length
  const scale = d.parkingFree / avg

  return mockParking.map((lot) => {
    const level = clamp(Math.round(lot.level * scale), 2, 99)
    return { ...lot, level, value: `ว่าง ${level}%` }
  })
}

/** ช่วงเวลาที่แนะนำ = ช่วงที่คนน้อยที่สุดก่อน พร้อมบอกว่าช่วงไหนคือช่วงพีคของพื้นที่ */
function buildBestTimes(d) {
  if (!d) return mockBestTimes

  return d.windows.map((w) => ({
    id: w.id,
    label: w.th,
    sub: w.isPeak ? `${w.level.label} · ช่วงพีค` : w.level.label,
    color: w.level.color,
    time: w.window,
  }))
}

/** วงความหนาแน่นบนแผนที่ — แต่ละย่านมีน้ำหนักของตัวเอง คูณกับความหนาแน่นรวม */
function buildZones(d) {
  if (!d) return mockZones

  return mockZones.map((zone) => {
    const pct = d.metrics.people * zone.weight
    const level = crowdLevel(pct)
    return { ...zone, level: level.id, value: `${level.label} (${Math.round(pct)}%)` }
  })
}

/** การ์ดแนะนำ — ป้ายบนการ์ดมาจากความหนาแน่นจริงของย่านนั้น ที่เงียบสุดขึ้นก่อน */
function buildRecommendations(d) {
  if (!d) return mockRecommendations

  const zoneById = Object.fromEntries(buildZones(d).map((z) => [z.id, z]))
  const withCrowd = mockRecommendations.map((item) => {
    const zone = zoneById[item.zone]
    const pct = zone ? d.metrics.people * zone.weight : d.metrics.people
    return { ...item, crowdPct: pct, crowd: crowdLevel(pct) }
  })

  const sorted = [...withCrowd].sort((a, b) => a.crowdPct - b.crowdPct)
  const quietest = sorted[0]?.id
  const busiest = sorted[sorted.length - 1]?.id

  return sorted.map((item) => ({
    ...item,
    badge:
      item.id === quietest
        ? { label: 'แนะนำเลย', icon: item.icon, tone: 'emerald' }
        : item.id === busiest
          ? { label: 'กำลังนิยม', icon: 'fire', tone: 'rose' }
          : null,
  }))
}

export function DashboardProvider({ children }) {
  const value = useMemo(() => {
    const search = typeof window === 'undefined' ? '' : window.location.search
    const survey = readSurvey(search)
    const derived = survey ? deriveDashboard(survey) : null

    return {
      derived,
      metrics: buildMetrics(derived),
      parking: buildParking(derived),
      bestTimes: buildBestTimes(derived),
      zones: buildZones(derived),
      recommendations: buildRecommendations(derived),
    }
  }, [])

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

export const useDashboard = () => useContext(DashboardContext)
