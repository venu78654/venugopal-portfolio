'use client'

import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, FileDown, Loader2, MapPin } from 'lucide-react'
import { useState } from 'react'
import HeroTerminal from './HeroTerminal'
import { scrollToId } from '@/lib/ui'
import { downloadResume } from '@/lib/resume'
import Image from 'next/image'
import portrait from '@/public/venugopal-portrait.webp'
import HandNote from './HandNote'
import { PROFILE } from '@/lib/data'

const ease = [0.22, 1, 0.36, 1] as const
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }

export function ResumeButton({ className = '' }: { className?: string }) {
  const [busy, setBusy] = useState(false)
  return (
    <button
      onClick={async () => { setBusy(true); try { await downloadResume() } finally { setBusy(false) } }}
      className={`group inline-flex min-h-[48px] whitespace-nowrap items-center justify-center gap-2 rounded-full border border-line bg-white/[0.03] px-6 text-sm font-medium text-fg transition hover:border-cyan/40 hover:bg-white/[0.06] ${className}`}
      aria-busy={busy}
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4 text-cyan-soft transition group-hover:-translate-y-0.5" />}
      Download Resume <span className="text-muted">(ATS-Optimized)</span>
    </button>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(26,54,93,0.6),transparent)] blur-2xl" />

      <div className="container-site relative grid items-center gap-14 pb-20 lg:grid-cols-[1.08fr_1fr] lg:gap-12 lg:pb-28">
        <motion.div variants={{ show: { transition: { staggerChildren: 0.08 } } }} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] py-1 pl-1 pr-4 text-xs text-muted">
            <span className="relative">
              <Image src={portrait} alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover object-top" priority />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink bg-emerald-400" />
            </span>
            <span><span className="text-fg">Venugopal</span> · open to new opportunities</span>
            <span className="hidden h-3 w-px bg-line sm:block" />
            <span className="hidden items-center gap-1 sm:inline-flex"><MapPin className="h-3 w-3" />{PROFILE.location.split(',')[0]}, IN</span>
          </motion.div>

          <motion.h1 variants={item} className="text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.04em] text-fg sm:text-6xl lg:text-[4.1rem]">
            Engineering <span className="scribble">High-Impact</span> Web &amp; Mobile Applications.
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Software Engineer (<span className="text-fg">React.js, React Native, Node.js</span>) with 2+ years of experience architecting low-code UI frameworks, resilient payment pipelines, and scalable enterprise products.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button onClick={() => scrollToId('work')} className="group relative inline-flex min-h-[48px] whitespace-nowrap items-center justify-center gap-2 rounded-full bg-fg px-6 text-sm font-semibold text-ink shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_8px_30px_-10px_rgba(34,211,238,0.45)] transition hover:bg-white">
              View Interactive Work <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
            <ResumeButton />
          </motion.div>

          <motion.dl variants={item} className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6">
            {[['2+ yrs', 'shipping to production'], ['Web, iOS, Android', 'one shared mindset'], ['End to end', 'UI → API → DB']].map(([a, b]) => (
              <div key={a}><dt className="sr-only">{b}</dt><dd className="text-sm font-medium text-fg">{a}</dd><dd className="mt-1 text-xs text-muted">{b}</dd></div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.25, ease }}>
          <div className="relative">
            <HandNote arrow="down-right" rotate={-4} className="absolute -top-16 left-2 hidden lg:block">three slices of my real work. click a tab</HandNote>
            <HeroTerminal />
          </div>
        </motion.div>
      </div>

      <div className="container-site relative hidden pb-10 lg:block">
        <button onClick={() => scrollToId('impact')} className="inline-flex items-center gap-2 font-mono text-xs text-muted transition hover:text-fg"><ArrowDown className="h-3.5 w-3.5 animate-bounce" /> scroll</button>
      </div>
    </section>
  )
}
