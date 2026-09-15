import Icon from './Icon.jsx'
import { bestTimes, nearbyEvent, parking } from '../data/mock.js'

function NearbyEvent() {
  return (
    <section className="panel p-4">
      <h2 className="panel-title">
        <Icon name="leaf" className="h-[18px] w-[18px] text-emerald-400" />
        กิจกรรมใกล้คุณวันนี้
      </h2>

      <button
        type="button"
        className="mt-3.5 flex w-full items-center gap-3 rounded-xl border border-edge bg-ink-700/50 p-2.5 text-left transition hover:border-sky-400/30 hover:bg-ink-600/50"
      >
        <img
          src={nearbyEvent.image}
          alt=""
          className="h-[68px] w-[92px] shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-white">{nearbyEvent.title}</p>
          <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-400">
            <Icon name="clock" className="h-3.5 w-3.5" />
            {nearbyEvent.time}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
            <Icon name="pin" className="h-3.5 w-3.5" />
            {nearbyEvent.place}
          </p>
        </div>
        <Icon name="chevronRight" className="h-4 w-4 shrink-0 text-slate-500" />
      </button>
    </section>
  )
}

function Parking() {
  return (
    <section className="panel p-4">
      <h2 className="panel-title">
        <Icon name="car" className="h-[18px] w-[18px] text-blue-400" />
        ระบบขนส่ง / ที่จอดรถ
      </h2>

      <ul className="mt-3.5 space-y-2">
        {parking.map((lot) => (
          <li key={lot.id}>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-white/5"
            >
              <span className="flex-1 truncate text-[13px] text-slate-300">{lot.label}</span>
              <span className="shrink-0 text-[13px] font-semibold text-emerald-300">{lot.value}</span>
              <Icon name="chevronRight" className="h-4 w-4 shrink-0 text-slate-500" />
            </button>
            <div className="mx-2 h-1 overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400"
                style={{ width: `${lot.level}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function BestTimes() {
  return (
    <section className="panel p-4">
      <h2 className="panel-title">
        <Icon name="clock" className="h-[18px] w-[18px] text-sky-400" />
        ช่วงเวลาที่แนะนำ
      </h2>

      <ul className="mt-3.5 space-y-2.5">
        {bestTimes.map((slot) => (
          <li key={slot.id} className="flex items-center gap-3 text-[13px]">
            <span className="flex-1 truncate text-slate-300">{slot.label}</span>
            <span className="shrink-0 font-medium tabular-nums text-slate-400">{slot.time}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function BottomRow() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <NearbyEvent />
      <Parking />
      <BestTimes />
    </div>
  )
}
