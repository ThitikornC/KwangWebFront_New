import Icon from './Icon.jsx'
import { liveStatus } from '../data/mock.js'
import { tone } from '../tones.js'

export default function LiveStatus() {
  return (
    <section className="panel flex flex-col p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="panel-title">สถานการณ์ในขณะนี้</h2>
          <p className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-sky-300">
            <Icon name="pin" className="h-4 w-4" />
            {liveStatus.place}
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-300">
          <span className="h-2 w-2 animate-pulseDot rounded-full bg-emerald-400" />
          Live
        </span>
      </div>

      <div className="mt-4 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
        {liveStatus.metrics.map((metric) => {
          const t = tone(metric.tone)
          return (
            <div
              key={metric.id}
              className="flex items-center rounded-xl border border-edge bg-ink-700/55 p-3.5 transition hover:border-sky-400/25 hover:bg-ink-600/50"
            >
              <div className="flex w-full items-start gap-3">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${t.bg} ${t.text}`}>
                  <Icon name={metric.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] leading-tight text-slate-400">{metric.label}</p>
                  <p className="mt-0.5 text-lg font-semibold leading-tight text-white">{metric.value}</p>
                  <p className="text-[11px] text-slate-500">{metric.note}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
