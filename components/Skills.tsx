import { SKILLS } from '@/lib/data'
import { Reveal, SectionHead } from '@/lib/ui'

export default function Skills() {
  return (
    <section id="skills" className="border-t border-line py-20 sm:py-28">
      <div className="container-site">
        <SectionHead eyebrow="Skills" title="What I work with" />
        <Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {SKILLS.map((g) => (
              <div key={g.group} className="card p-6">
                <h3 className="text-base font-semibold text-fg">{g.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => <li key={s} className="chip">{s}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
