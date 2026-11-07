'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, ArrowLeftRight, Layers } from 'lucide-react'
import { SectionHead, Reveal, onSpot } from '@/lib/ui'
import { CodeBlock } from './Code'

const LOG = [
  { t: '09:14', s: 'repro', m: 'Slot shows 4:30 AM for IST users', c: 'text-rose-200' },
  { t: '09:41', s: 'trace', m: 'new Date(local) parsed server-side as UTC', c: 'text-amber-200' },
  { t: '10:22', s: 'fix', m: 'Store UTC · format at edge · add tz tests', c: 'text-cyan-soft' },
  { t: '11:05', s: 'verify', m: 'Web + iOS + Android parity ✓', c: 'text-emerald-200' },
  { t: '11:06', s: 'debt', m: '0 new TODOs · 0 hacks', c: 'text-emerald-200' },
]

const HOOK = [
  "const Ctx = createContext<BookingState | null>(null)",
  "",
  "export function useBooking() {",
  "  const ctx = useContext(Ctx)",
  "  if (!ctx) throw new Error('No BookingProvider')",
  "  return ctx // fully typed, reusable everywhere",
  "}",
]

export default function Why() {
  return (
    <section id="why" aria-labelledby="why-title" className="relative overflow-hidden border-y border-line bg-ink2/60 py-24 sm:py-32">
            <div className="container-site relative">
        <SectionHead id="why" eyebrow="Why work with me" title={<>Hand me <span className="scribble">the hard ticket.</span></>} />

        <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:grid-rows-2">
          <Reveal className="lg:row-span-2">
            <article onPointerMove={onSpot} className="glass glow-border spotlight relative flex h-full flex-col rounded-3xl p-7 sm:p-9">
              <ShieldCheck className="h-6 w-6 text-cyan-soft" aria-hidden="true" />
              <h3 className="mt-6 text-2xl font-semibold text-fg sm:text-3xl">The Safe Pair of Hands</h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">Solves complex bugs independently without creating technical debt. Reproduce, trace to root cause, fix it once, verify on every platform — then leave the code cleaner than I found it.</p>
              <div className="mt-8 flex flex-1 flex-col justify-center rounded-xl border border-line bg-ink/80 p-5 font-mono text-[12px]">
                <p className="mb-3 text-[11px] uppercase tracking-widest text-muted">incident.log</p>
                <ol className="space-y-2.5">
                  {LOG.map((l, i) => (
                    <motion.li key={l.t} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.18 }} className="grid grid-cols-[3rem_3.5rem_1fr] gap-2 leading-5">
                      <span className="text-muted">{l.t}</span><span className={l.c}>{l.s}</span><span className="text-fg/90">{l.m}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>
              <ol className="mt-5 grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
                {['reproduce', 'root-cause', 'verify everywhere'].map((x, i) => (
                  <li key={x} className="rounded-lg border border-line px-2 py-2.5 text-muted"><span className="text-cyan-soft">0{i + 1}</span> {x}</li>
                ))}
              </ol>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article onPointerMove={onSpot} className="glass glow-border spotlight relative h-full rounded-3xl p-7 sm:p-8">
              <ArrowLeftRight className="h-6 w-6 text-cyan-soft" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-semibold text-fg">Bridge Between Tech &amp; Business</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">Builds code that directly reduces delivery times and boosts conversions. I measure success in shipped outcomes, not lines changed.</p>
              <div className="mt-6 space-y-3" aria-label="Custom UI delivery time, before and after the JSON engine">
                {[['Before', 100, 'bg-slate2'], ['After', 60, 'bg-gradient-to-r from-blue to-cyan']].map(([l, w, c]) => (
                  <div key={l as string} className="grid grid-cols-[3.5rem_1fr_3rem] items-center gap-3 font-mono text-xs">
                    <span className="text-muted">{l}</span>
                    <div className="h-2 rounded-full bg-white/[0.04]"><motion.div className={`h-2 rounded-full ${c}`} initial={{ width: 0 }} whileInView={{ width: `${w}%` }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.3 }} /></div>
                    <span className="text-right text-fg">{l === 'After' ? '−40%' : 'base'}</span>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.16}>
            <article onPointerMove={onSpot} className="glass glow-border spotlight relative h-full rounded-3xl p-7 sm:p-8">
              <Layers className="h-6 w-6 text-cyan-soft" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-semibold text-fg">Clean Code &amp; Architecture Standard</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">Reusable custom hooks, typed contexts and modular scalability — so the next engineer moves faster, not slower.</p>
              <div className="mt-5 rounded-xl border border-line bg-ink/80 py-3 pl-1"><CodeBlock lines={HOOK} className="!text-[11.5px] !leading-5" /></div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
