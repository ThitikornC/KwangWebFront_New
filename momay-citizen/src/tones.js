// Tone -> tailwind classes. Keys match the `tone` field used across mock.js,
// and the strings are written out in full so Tailwind's scanner keeps them.
export const tones = {
  cyan: { text: 'text-cyan-300', bg: 'bg-cyan-500/15', ring: 'ring-cyan-400/30', dot: '#22d3ee' },
  emerald: { text: 'text-emerald-300', bg: 'bg-emerald-500/15', ring: 'ring-emerald-400/30', dot: '#10b981' },
  rose: { text: 'text-rose-300', bg: 'bg-rose-500/15', ring: 'ring-rose-400/30', dot: '#f43f5e' },
  amber: { text: 'text-amber-300', bg: 'bg-amber-500/15', ring: 'ring-amber-400/30', dot: '#f59e0b' },
  sky: { text: 'text-sky-300', bg: 'bg-sky-500/15', ring: 'ring-sky-400/30', dot: '#38bdf8' },
  violet: { text: 'text-violet-300', bg: 'bg-violet-500/15', ring: 'ring-violet-400/30', dot: '#a78bfa' },
  blue: { text: 'text-blue-300', bg: 'bg-blue-500/15', ring: 'ring-blue-400/30', dot: '#3b82f6' },
  slate: { text: 'text-slate-300', bg: 'bg-slate-500/15', ring: 'ring-slate-400/30', dot: '#94a3b8' },
}

export const tone = (name) => tones[name] ?? tones.slate
