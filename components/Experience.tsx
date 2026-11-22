import { EXPERIENCE } from '@/lib/data'
import { Reveal, SectionHead } from '@/lib/ui'

export default function Experience() {
  return (
    <section id="experience" className="border-t border-line bg-ink2/60 py-20 sm:py-28">
      <div className="container-site">
        <SectionHead eyebrow="Experience" title="Where I’ve worked" />
        <div className="space-y-6">
          {EXPERIENCE.map((e) => (
            <Reveal key={e.company}>
              <article className="card p-6 sm:p-8">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-xl font-semibold text-fg">{e.company}</h3>
                  <p className="font-mono text-xs text-cyan-soft">{e.period}</p>
                </div>
                <p className="mt-1 text-sm text-muted">{e.role}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-fg/90">{e.summary}</p>
                <ul className="mt-4 space-y-3 border-t border-line pt-5">
                  {e.points.map(([v, rest]) => (
                    <li key={v} className="flex gap-3 text-sm leading-relaxed">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                      <p className="text-muted"><strong className="font-semibold text-fg">{v}</strong> {rest}</p>
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                  {e.tags.map((t) => <li key={t} className="chip">{t}</li>)}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
