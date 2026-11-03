import { useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { useDashboard } from '../useDashboard.jsx'
import { tone } from '../tones.js'

function Card({ item, saved, onToggleSave }) {
  const t = tone(item.tone)
  const badgeTone = item.badge ? tone(item.badge.tone) : null

  return (
    <article className="group w-[272px] shrink-0 snap-start overflow-hidden rounded-2xl border border-edge bg-ink-800/70 shadow-panel transition hover:-translate-y-1 hover:border-sky-400/35 sm:w-auto">
      <div className="relative h-[110px] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/10 to-transparent" />

        {item.badge && (
          <span
            className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white ${
              item.badge.tone === 'rose' ? 'bg-rose-500' : 'bg-emerald-500'
            }`}
          >
            <Icon name={item.badge.icon} className="h-3.5 w-3.5" strokeWidth={2} />
            {item.badge.label}
          </span>
        )}

        <button
          type="button"
          onClick={onToggleSave}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-ink-900/60 text-white backdrop-blur transition hover:bg-ink-900/85"
          aria-label={saved ? 'นำออกจากรายการโปรด' : 'บันทึกลงรายการโปรด'}
          aria-pressed={saved}
        >
          <Icon
            name="heart"
            className={`h-[18px] w-[18px] ${saved ? 'text-rose-400' : 'text-white'}`}
            fill={saved ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      <div className="p-3.5">
        <div className="flex items-start gap-2.5">
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${t.bg} ${t.text}`}>
            <Icon name={item.icon} className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-[14px] font-semibold text-white">{item.title}</h3>
            <p className="truncate text-[11px] text-slate-400">{item.subtitle}</p>
          </div>
        </div>

        <p className="mt-3 flex items-center gap-1.5 text-[12px] text-slate-300">
          <Icon name="walk" className="h-4 w-4 text-slate-400" />
          {item.distance}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.crowd && (
            <span
              className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium"
              style={{ color: item.crowd.color, backgroundColor: `${item.crowd.color}1f` }}
            >
              <Icon name="people" className="h-3.5 w-3.5" strokeWidth={2} />
              {item.crowd.label}
            </span>
          )}
          {item.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>

        <button
          type="button"
          className="mt-3.5 ml-auto flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-blue-500"
        >
          ไปเลย
          <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </article>
  )
}

export default function Recommendations() {
  const { recommendations } = useDashboard()
  const trackRef = useRef(null)
  const [saved, setSaved] = useState(() => new Set())

  const toggleSave = (id) =>
    setSaved((current) => {
      const next = new Set(current)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const scrollBy = (direction) =>
    trackRef.current?.scrollBy({ left: direction * 296, behavior: 'smooth' })

  return (
    <section className="relative">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-1">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          <Icon name="sparkleStar" className="h-5 w-5 text-sky-400" fill="currentColor" strokeWidth={1.2} />
          MOMAY แนะนำสำหรับคุณ
        </h2>
        <p className="text-[12px] text-slate-400">จากสถานการณ์ปัจจุบัน เหมาะกับช่วงเวลานี้</p>
        <button
          type="button"
          className="ml-auto flex items-center gap-1.5 text-[12px] font-medium text-sky-300 transition hover:text-sky-200"
        >
          ดูทั้งหมด
          <Icon name="arrowRight" className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible xl:grid-cols-4"
      >
        {recommendations.map((item) => (
          <Card
            key={item.id}
            item={item}
            saved={saved.has(item.id)}
            onToggleSave={() => toggleSave(item.id)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollBy(1)}
        className="absolute -right-2 top-[58%] grid h-9 w-9 place-items-center rounded-full border border-edge bg-ink-800/90 text-slate-300 backdrop-blur transition hover:text-white sm:hidden"
        aria-label="เลื่อนดูการ์ดถัดไป"
      >
        <Icon name="chevronRight" className="h-4 w-4" />
      </button>
    </section>
  )
}
