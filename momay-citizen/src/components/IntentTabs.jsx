import Icon from './Icon.jsx'
import { intents } from '../data/mock.js'
import { tone } from '../tones.js'

export default function IntentTabs({ active, onSelect }) {
  return (
    <section className="relative">
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 py-4 sm:px-6">
        {intents.map((intent) => {
          const isActive = intent.id === active
          const t = tone(intent.tone)
          return (
            <button
              key={intent.id}
              type="button"
              onClick={() => onSelect(intent.id)}
              className={[
                'group flex min-w-[126px] flex-1 flex-col items-center gap-1.5 rounded-2xl border px-3 py-3.5 transition',
                isActive
                  ? 'border-cyan-400/50 bg-cyan-500/10 shadow-[0_0_0_1px_rgba(34,211,238,0.28),0_18px_36px_-22px_rgba(34,211,238,0.8)]'
                  : 'border-edge bg-ink-800/60 hover:border-sky-400/30 hover:bg-ink-700/70',
              ].join(' ')}
            >
              <Icon name={intent.icon} className={`h-6 w-6 ${isActive ? 'text-cyan-300' : t.text}`} />
              <span className="whitespace-nowrap text-[13px] font-semibold text-white">{intent.label}</span>
              <span className="whitespace-nowrap text-[11px] text-slate-400">{intent.sub}</span>
            </button>
          )
        })}
      </div>

      <button
        type="button"
        className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-edge bg-ink-800/90 text-slate-300 backdrop-blur transition hover:text-white xl:grid"
        aria-label="เลื่อนดูหมวดถัดไป"
      >
        <Icon name="chevronRight" className="h-4 w-4" />
      </button>
    </section>
  )
}
