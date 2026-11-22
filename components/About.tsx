import { PROFILE } from '@/lib/data'
import { Reveal } from '@/lib/ui'

const DETAILS = [
  ['Based in', PROFILE.location],
  ['Relocation', 'Open to relocate'],
  ['Looking for', 'Frontend, React Native and full-stack roles'],
  ['Currently', 'Software Engineer at Gove Technologies'],
]

export default function About() {
  return (
    <section id="about" className="border-t border-line py-20 sm:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <p className="eyebrow mb-3">About</p>
          <h2 className="text-3xl font-semibold text-fg sm:text-4xl">A bit about me</h2>
          <div className="mt-6 max-w-[60ch] space-y-4 text-base leading-[1.75] text-muted">
            <p>I’m a software engineer from Tirunelveli. I work mostly on React and React Native apps at Gove Technologies, and on the parts behind them: payment states, booking slots and timezones.</p>
            <p>I like tracking a bug down to its real cause instead of patching around it, and writing code that the next person can pick up easily.</p>
            <p>I’m looking for a frontend, React Native or full-stack role, and I’m open to relocating for the right team.</p>
          </div>
        </Reveal>

        <Reveal>
          <dl className="card divide-y divide-line">
            {DETAILS.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 px-5 py-4 text-sm">
                <dt className="text-muted">{k}</dt>
                <dd className="text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
