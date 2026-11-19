import { hero } from '../data/mock.js'

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={hero.image}
        alt="เมืองพิษณุโลกยามค่ำคืน"
        className="h-[230px] w-full object-cover sm:h-[280px] lg:h-[300px]"
      />

      {/* Left-to-right scrim keeps the Thai headline readable over the photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />

      <div className="absolute inset-0 flex items-center px-5 sm:px-8">
        <div className="max-w-xl animate-floatIn">
          <p className="text-3xl font-semibold text-white drop-shadow sm:text-[38px]">{hero.eyebrow}</p>
          <h1 className="text-3xl font-bold leading-tight text-white drop-shadow sm:text-[40px]">
            {hero.title}
          </h1>
          <div className="mt-3 space-y-1 text-[13px] leading-relaxed text-slate-300 sm:text-sm">
            {hero.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 hidden text-right lg:block">
        <p className="font-script text-3xl leading-tight text-white/95">
          {hero.script[0]}
          <br />
          {hero.script[1]}
        </p>
        <p className="mt-3 text-[11px] leading-relaxed text-slate-300">
          {hero.place[0]}
          <br />
          {hero.place[1]}
        </p>
      </div>
    </section>
  )
}
