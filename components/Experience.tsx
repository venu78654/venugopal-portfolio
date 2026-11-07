'use client'

import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown, Users, FileText, Repeat, GitPullRequest } from 'lucide-react'
import { EXPERIENCE } from '@/lib/data'
import { SectionHead, Reveal, onSpot } from '@/lib/ui'

const WAYS = [
  { icon: Repeat, t: 'Agile / Scrum', d: 'Sprint planning, estimation, retros' },
  { icon: Users, t: 'Daily standups', d: 'Clear blockers, early risk flags' },
  { icon: FileText, t: 'Technical specs', d: 'Written before code, reviewed by peers' },
  { icon: GitPullRequest, t: 'Cross-functional', d: 'Product, QA, design & backend' },
]

export default function Experience() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true, 1: true })

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 sm:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-[0.8fr_1.4fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead id="experience" eyebrow="Experience" title="Ownership, end to end." intro="I like owning a problem all the way — from the first spec to the support ticket after release — and keeping the team in the loop as I go." />
          <Reveal>
            <ul className="grid grid-cols-2 gap-3">
              {WAYS.map(({ icon: I, t, d }) => (
                <li key={t} className="rounded-xl border border-line p-4">
                  <I className="mb-3 h-4 w-4 text-cyan-soft" aria-hidden="true" />
                  <p className="text-sm font-medium text-fg">{t}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{d}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <ol ref={ref} className="relative space-y-6 pl-8 sm:pl-12">
          <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-slate2 sm:left-[11px]" />
          <motion.span aria-hidden="true" style={{ scaleY: fill }} className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-cyan via-blue to-blue/0 sm:left-[11px]" />
          {EXPERIENCE.map((e, i) => (
            <Reveal as="li" key={e.company} delay={i * 0.08} className="relative">
              <span aria-hidden="true" className={`absolute -left-8 top-7 grid h-[15px] w-[15px] place-items-center rounded-full border sm:-left-12 sm:h-[23px] sm:w-[23px] ${e.current ? 'border-cyan/60 bg-ink' : 'border-line bg-ink'}`}>
                <span className={`h-[7px] w-[7px] rounded-full sm:h-[9px] sm:w-[9px] ${e.current ? 'bg-cyan shadow-[0_0_12px_2px_rgba(34,211,238,0.7)]' : 'bg-slate-500'}`} />
              </span>
              <article onPointerMove={onSpot} className="glass glow-border spotlight relative rounded-2xl p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <p className="font-mono text-xs text-cyan-soft">{e.period}</p>
                  {e.current && <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 font-mono text-[10.5px] text-emerald-300">current</span>}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-fg sm:text-2xl">{e.company}</h3>
                <p className="mt-1 text-sm text-muted">{e.role}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-fg/90">{e.summary}</p>
                <button onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))} aria-expanded={!!open[i]} aria-controls={`exp-${i}`} className="mt-5 inline-flex min-h-[40px] items-center gap-1.5 text-sm text-cyan-soft hover:text-fg">
                  {open[i] ? 'Hide highlights' : 'Show highlights'} <ChevronDown className={`h-4 w-4 transition-transform ${open[i] ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open[i] && (
                    <motion.div id={`exp-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <ul className="mt-3 space-y-3 border-t border-line pt-5">
                        {e.points.map(([v, rest]) => (
                          <li key={v + rest.slice(0, 10)} className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-relaxed">
                            <span className="mt-[9px] h-1 w-3 rounded-full bg-gradient-to-r from-blue to-cyan" aria-hidden="true" />
                            <p className="text-muted"><strong className="font-semibold text-fg">{v}</strong> {rest}</p>
                          </li>
                        ))}
                      </ul>
                      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                        {e.tags.map((t) => <li key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-fg/90">{t}</li>)}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
