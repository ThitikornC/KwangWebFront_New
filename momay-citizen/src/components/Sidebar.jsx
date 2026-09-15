import Icon from './Icon.jsx'
import { navItems } from '../data/mock.js'
import { asset } from '../asset.js'

export default function Sidebar({ active, onSelect }) {
  return (
    <aside className="relative sticky top-0 hidden h-screen w-[150px] shrink-0 flex-col border-r border-edge bg-ink-900/80 backdrop-blur lg:flex">
      {/* Faint temple silhouette behind the nav, as in the design */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] opacity-[0.14]"
        style={{
          backgroundImage: `url(${asset('momay/demo-bg-04.webp')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'linear-gradient(to top, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
        }}
      />

      <div className="relative px-4 pb-6 pt-7 text-center">
        <img src={asset("MOMAY_mark.png")} alt="" className="mx-auto h-11 w-auto" />
        <p className="mt-2 text-[15px] font-semibold tracking-[0.28em] text-white">MOMAY</p>
        <p className="text-[11px] font-medium tracking-[0.34em] text-sky-300/80">CITIZEN</p>
        <p className="mt-3 text-[10px] font-semibold tracking-[0.2em] text-slate-300">SEE &amp; ACT</p>
        <p className="mt-1 text-[9px] leading-relaxed text-slate-500">
          A Smarter Phitsanulok
          <br />
          For a Happier You
        </p>
      </div>

      <nav className="relative flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive = item.id === active
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={[
                'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] transition',
                isActive
                  ? 'bg-blue-600/90 font-semibold text-white shadow-[0_10px_26px_-12px_rgba(59,130,246,0.9)]'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-100',
              ].join(' ')}
            >
              <Icon name={item.icon} className="h-[18px] w-[18px]" />
              {item.label}
            </button>
          )
        })}
      </nav>

      <p className="relative px-4 pb-6 text-[10px] leading-relaxed text-slate-500">
        Better People
        <br />
        Brighter Phitsanulok
      </p>
    </aside>
  )
}
