import { PROJECTS } from '@/lib/data'
import { Reveal, SectionHead } from '@/lib/ui'

export default function Projects() {
  return (
    <section id="work" className="border-t border-line bg-ink2/60 py-20 sm:py-28">
      <div className="container-site">
        <SectionHead eyebrow="Work" title="Projects" intro="Some things I’ve worked on, with what I did and the result." />
        <div className="space-y-6">
          {PROJECTS.map((p) => (
            <Reveal key={p.id}>
              <article className="card p-6 sm:p-8">
                <p className="font-mono text-xs text-cyan-soft">{p.kicker}</p>
                <h3 className="mt-2 text-2xl font-semibold text-fg">{p.title}</h3>

                <div className={`mt-6 grid gap-8 ${p.problem ? 'md:grid-cols-2' : ''}`}>
                  {p.problem && (
                    <div>
                      <h4 className="mb-3 text-sm font-semibold text-fg">The problem</h4>
                      <ul className="space-y-2 text-sm leading-relaxed text-muted">
                        {p.problem.map((x) => <li key={x} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />{x}</li>)}
                      </ul>
                    </div>
                  )}
                  <div>
                    <h4 className="mb-3 text-sm font-semibold text-fg">What I did</h4>
                    <ul className="space-y-2 text-sm leading-relaxed text-muted">
                      {p.solution.map((x) => <li key={x} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />{x}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 border-t border-line pt-5">
                  <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg">
                    {p.outcomes.map((o) => <li key={o} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />{o}</li>)}
                  </ul>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
                    {p.tech.map((t) => <li key={t} className="chip">{t}</li>)}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
