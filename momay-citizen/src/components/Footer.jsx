import { footer } from '../data/mock.js'

export default function Footer() {
  return (
    <footer className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-edge px-5 py-5 sm:px-6">
      <div className="flex items-center gap-2.5">
        <img src="/MOMAY_mark.png" alt="" className="h-7 w-auto" />
        <span className="text-sm font-semibold tracking-[0.22em] text-white">MOMAY</span>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="grid h-8 w-8 place-items-center rounded-full border border-edge bg-white/5 text-[10px] font-semibold text-amber-300">
          PSL
        </div>
        <div className="leading-tight">
          <p className="text-[12px] text-slate-300">{footer.org}</p>
          <p className="text-[10px] text-slate-500">{footer.orgEn}</p>
        </div>
      </div>

      <div className="hidden items-center gap-2 text-[12px] text-slate-400 md:flex">
        {footer.words.map((word, index) => (
          <span key={word} className="flex items-center gap-2">
            {index > 0 && <span className="text-slate-600">×</span>}
            {word}
          </span>
        ))}
      </div>

      <p className="ml-auto text-[12px] italic text-slate-400">{footer.quote}</p>
    </footer>
  )
}
