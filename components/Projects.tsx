'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { PROJECTS, type Project } from '@/lib/data'
import { onSpot, Reveal, SectionHead } from '@/lib/ui'
import { SlotDemo, JsonEngineDemo } from './Demos'
import HandNote from './HandNote'

const TABS = ['Problem', 'Solution', 'Architecture', 'Live demo'] as const
type Tab = (typeof TABS)[number]

function Arch({ p }: { p: Project }) {
  return (
    <ol className="flex flex-col gap-2 md:flex-row md:items-stretch md:gap-0">
      {p.arch.map((n, i) => (
        <li key={n.label} className="flex flex-col items-stretch md:flex-1 md:flex-row md:items-center">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="rounded-lg border border-line bg-ink2/80 px-3 py-3 md:flex-1">
            <p className="font-mono text-[10.5px] text-muted">0{i + 1}</p>
            <p className="mt-1 text-sm font-medium text-fg">{n.label}</p>
            <p className="font-mono text-[11px] text-cyan-soft">{n.sub}</p>
          </motion.div>
          {i < p.arch.length - 1 && (
            <div className="relative mx-auto h-5 w-px overflow-hidden bg-slate2 md:mx-0 md:h-px md:w-6 md:shrink-0" aria-hidden="true">
              <motion.span className="absolute left-0 top-0 h-2 w-px bg-cyan md:h-px md:w-2" animate={{ x: [0, 0], y: [0, 0], opacity: [0, 1, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.25 }} />
            </div>
          )}
        </li>
      ))}
    </ol>
  )
}

function ProjectCard({ p, defaultOpen }: { p: Project; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const [tab, setTab] = useState<Tab>('Problem')
  const panelId = `panel-${p.id}`

  return (
    <article onPointerMove={onSpot} className="glass glow-border spotlight relative rounded-3xl">
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-xs text-muted">
              <span className="text-cyan-soft">{p.index}</span><span className="h-px w-8 bg-line" /><span>{p.kicker}</span>
            </div>
            <h3 className="text-2xl font-semibold text-fg sm:text-3xl">{p.title}</h3>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
              {p.tech.map((t) => <li key={t} className="rounded-full border border-line bg-white/[0.03] px-3 py-1 font-mono text-[11.5px] text-fg/90">{t}</li>)}
            </ul>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:max-w-xs lg:justify-end">
              {p.outcomes.map((o) => <li key={o} className="flex items-center gap-2 text-sm text-fg"><span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />{o}</li>)}
            </ul>
            <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls={panelId}
              className="mt-2 inline-flex min-h-[44px] items-center gap-2 self-start rounded-full border border-line px-5 text-sm font-medium text-fg transition hover:border-cyan/50 hover:bg-white/[0.04] lg:self-end">
              {open ? 'Collapse case study' : 'Explore case study'}
              <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div id={panelId} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
              <div className="mt-8 border-t border-line pt-6">
                <div role="tablist" aria-label={`${p.title} details`} className="mb-6 flex flex-wrap gap-1"
                  onKeyDown={(e) => {
                    const i = TABS.indexOf(tab)
                    if (e.key === 'ArrowRight') setTab(TABS[(i + 1) % TABS.length])
                    if (e.key === 'ArrowLeft') setTab(TABS[(i - 1 + TABS.length) % TABS.length])
                  }}>
                  {TABS.map((t) => (
                    <button key={t} role="tab" id={`${p.id}-tab-${t}`} aria-selected={tab === t} aria-controls={`${p.id}-tp`} tabIndex={tab === t ? 0 : -1} onClick={() => setTab(t)}
                      className={`relative isolate shrink-0 rounded-full px-4 py-2 text-sm transition ${tab === t ? 'text-ink' : 'text-muted hover:text-fg'}`}>
                      {tab === t && <motion.span layoutId={`tab-${p.id}`} className="absolute inset-0 -z-10 rounded-full bg-fg" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                      {t === 'Live demo' && <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle ${tab === t ? 'bg-ink' : 'bg-cyan'}`} />}{t}
                    </button>
                  ))}
                </div>
                <div id={`${p.id}-tp`} role="tabpanel" aria-labelledby={`${p.id}-tab-${tab}`}>
                  <AnimatePresence mode="wait">
                    <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                      {(tab === 'Problem' || tab === 'Solution') && (
                        <ul className="grid gap-3 md:grid-cols-3">
                          {(tab === 'Problem' ? p.problem : p.solution).map((x, i) => (
                            <li key={i} className="rounded-xl border border-line bg-ink2/60 p-5">
                              <p className={`mb-3 font-mono text-[11px] ${tab === 'Problem' ? 'text-rose-200' : 'text-emerald-200'}`}>{tab === 'Problem' ? 'issue' : 'fix'}_{String(i + 1).padStart(2, '0')}</p>
                              <p className="text-sm leading-relaxed text-fg/90">{x}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                      {tab === 'Architecture' && <Arch p={p} />}
                      {tab === 'Live demo' && (p.id === 'booking' ? <SlotDemo /> : <JsonEngineDemo />)}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {tab !== 'Live demo' ? (
                    <button onClick={() => setTab('Live demo')} className="inline-flex items-center gap-1.5 text-sm text-cyan-soft hover:text-fg">Try the interactive demo <ArrowRight className="h-4 w-4" /></button>
                  ) : <span />}
                  <p className="max-w-md pr-2 font-hand text-xl leading-snug text-[#F5D58A] sm:-rotate-1 sm:text-right"><span className="sr-only">Lesson learned: </span>{p.note}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-24 sm:py-32">
      <div className="container-site">
        <SectionHead id="work" eyebrow="Selected work" title={<>Two projects I’d happily <span className="scribble">walk you through.</span></>} intro="For each one: what was broken, what I changed, how it’s wired together — and a small working demo you can actually play with." />
        <div className="space-y-6">
          {PROJECTS.map((p, i) => <Reveal key={p.id} delay={i * 0.05}><ProjectCard p={p} defaultOpen={i === 0} /></Reveal>)}
        </div>
      </div>
    </section>
  )
}
