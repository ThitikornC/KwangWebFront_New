import Icon from './Icon.jsx'
import { header } from '../data/mock.js'

export default function TopBar({ query, onQueryChange }) {
  return (
    <header className="sticky top-0 z-30 border-b border-edge bg-ink-900/85 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Compact brand for small screens, where the sidebar is hidden */}
        <div className="flex items-center gap-2 lg:hidden">
          <img src="/MOMAY_mark.png" alt="MOMAY" className="h-7 w-auto" />
          <span className="text-sm font-semibold tracking-[0.2em] text-white">MOMAY</span>
        </div>

        <label className="relative hidden flex-1 items-center sm:flex lg:max-w-xl">
          <Icon name="search" className="absolute left-4 h-[18px] w-[18px] text-slate-400" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={header.searchPlaceholder}
            className="h-11 w-full rounded-full border border-edge bg-ink-700/70 pl-11 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20"
          />
        </label>

        <div className="ml-auto flex items-center gap-3 sm:gap-5">
          <div className="hidden items-center gap-2.5 md:flex">
            <Icon name="sun" className="h-7 w-7 text-amber-300" />
            <div className="leading-tight">
              <p className="text-[15px] font-semibold text-white">{header.weather.temp}</p>
              <p className="text-[11px] text-slate-400">{header.weather.title}</p>
              <p className="text-[10px] text-slate-500">{header.weather.note}</p>
            </div>
          </div>

          <div className="hidden h-9 w-px bg-edge sm:block" />

          <div className="text-right leading-tight">
            <p className="text-[11px] text-slate-400">{header.date}</p>
            <p className="text-lg font-semibold tracking-tight text-white sm:text-xl">{header.time}</p>
          </div>

          <button
            type="button"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-edge bg-white/5 text-slate-300 transition hover:text-white"
            aria-label="การแจ้งเตือน"
          >
            <Icon name="bell" />
            {header.notifications > 0 && (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-400 ring-2 ring-ink-900" />
            )}
          </button>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full bg-blue-600 text-white transition hover:bg-blue-500"
            aria-label="บัญชีผู้ใช้"
          >
            <Icon name="user" />
          </button>
        </div>
      </div>

      {/* Search drops to its own row on phones */}
      <label className="relative mt-3 flex items-center sm:hidden">
        <Icon name="search" className="absolute left-4 h-[18px] w-[18px] text-slate-400" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={header.searchPlaceholder}
          className="h-11 w-full rounded-full border border-edge bg-ink-700/70 pl-11 pr-4 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-400/50"
        />
      </label>
    </header>
  )
}
