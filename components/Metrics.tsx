'use client'

import { motion } from 'framer-motion'
import { METRICS } from '@/lib/data'
import { Counter, onSpot, Reveal } from '@/lib/ui'

function Viz({ i }: { i: number }) {
  if (i === 0) return (
    <div className="flex h-8 items-end gap-1.5" aria-hidden="true">
      {[100, 100, 60].map((h, k) => (
        <motion.span key={k} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: 0.3 + k * 0.15, duration: 0.8 }} className={`w-3 rounded-sm ${k === 2 ? 'bg-cyan' : 'bg-slate2'}`} />
      ))}
    </div>
  )
  if (i === 1) return (
    <svg viewBox="0 0 80 32" className="h-8 w-20" aria-hidden="true">
      <motion.path d="M2 16 H78" stroke="#2D3748" strokeWidth="2" fill="none" />
      <motion.path d="M2 16 C14 4, 20 28, 32 16 S 50 16, 78 16" stroke="#22D3EE" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.3 }} />
    </svg>
  )
  if (i === 2) return (
    <svg viewBox="0 0 36 36" className="h-8 w-8 -rotate-90" aria-hidden="true">
      <circle cx="18" cy="18" r="15" stroke="#2D3748" strokeWidth="3.5" fill="none" />
      <motion.circle cx="18" cy="18" r="15" stroke="#22D3EE" strokeWidth="3.5" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.2 }} />
    </svg>
  )
  return (
    <div className="flex h-8 items-end gap-[3px]" aria-hidden="true">
      {[40, 55, 45, 70, 60, 85, 75, 95].map((h, k) => (
        <motion.span key={k} className="w-1.5 rounded-sm bg-gradient-to-t from-blue to-cyan" initial={{ height: '10%' }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: 0.2 + k * 0.06, duration: 0.6 }} />
      ))}
    </div>
  )
}

export default function Metrics() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="relative border-y border-line bg-ink2/60 py-16 sm:py-20">
      <div className="container-site">
        <Reveal className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-3">Impact</p>
            <h2 id="impact-title" className="text-2xl font-semibold text-fg outline-none sm:text-3xl">A few numbers I’m proud of.</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">Measured after release, not estimated before it. Each one came from a real problem a real team was stuck on.</p>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <Reveal as="li" key={m.title} delay={i * 0.08} onPointerMove={onSpot} className="glass glow-border spotlight group relative flex h-full flex-col rounded-2xl p-6 transition-[border-color,box-shadow] duration-300 hover:shadow-[0_20px_60px_-20px_rgba(34,211,238,0.35)]">
                <div className="mb-7 flex items-start justify-between">
                  <p className="text-5xl font-semibold tracking-[-0.04em] text-fg">
                    {m.word ? (
                      <span className="inline-flex items-center gap-3">{m.word}<span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" /></span></span>
                    ) : (<><Counter to={m.value} from={m.from ?? 0} />{m.suffix && <span className="text-gradient">{m.suffix}</span>}</>)}
                  </p>
                  <Viz i={i} />
                </div>
                <h3 className="text-base font-semibold text-fg">{m.title}</h3>
                <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-cyan-soft">{m.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
