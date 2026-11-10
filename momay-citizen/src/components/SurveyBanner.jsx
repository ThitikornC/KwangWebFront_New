import Icon from './Icon.jsx'
import { asset } from '../asset.js'
import { useDashboard } from '../useDashboard.jsx'
import { SIGNAL_MAP } from '../../../utils/momaySurpriseOrganize/model.ts'

/** แถบบอกว่าหน้านี้กำลังแปลผลจากคำตอบที่กรอกมาจากหน้า MOMAY Surprise
 *  ไม่มีข้อมูลส่งมา = ไม่ขึ้นอะไรเลย หน้าทำงานเป็นข้อมูลตัวอย่างตามเดิม */
export default function SurveyBanner() {
  const { derived } = useDashboard()
  if (!derived) return null

  const facts = [
    { icon: 'people', text: `${derived.people.toLocaleString('en-US')} คน / วัน` },
    { icon: 'clock', text: `พีค${derived.peak.th} · ${derived.peak.window}` },
    { icon: 'walk', text: `ช่วงพีค ~${derived.peakPeople.toLocaleString('en-US')} คน` },
  ]

  return (
    <section className="border-b border-edge bg-sky-500/[0.07] px-4 py-3 sm:px-6">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="flex items-center gap-2 text-[13px] font-semibold text-white">
          <Icon name="sparkleStar" className="h-4 w-4 text-sky-400" fill="currentColor" strokeWidth={1.2} />
          กำลังแสดงจากข้อมูลของคุณ
        </span>

        <span className="text-[13px] text-sky-200">{derived.org.th}</span>

        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {facts.map((f) => (
            <span key={f.text} className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <Icon name={f.icon} className="h-3.5 w-3.5" />
              {f.text}
            </span>
          ))}
        </span>

        <span className="hidden flex-wrap items-center gap-1.5 md:flex">
          {derived.signals.map((id) => (
            <span key={id} className="chip">
              {SIGNAL_MAP[id]?.th ?? id}
            </span>
          ))}
        </span>

        <a
          href={asset('')}
          className="ml-auto flex items-center gap-1.5 text-[12px] font-medium text-slate-400 transition hover:text-white"
        >
          ดูข้อมูลตัวอย่างแทน
          <Icon name="arrowRight" className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
