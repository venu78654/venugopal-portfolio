'use client'

import { ArrowRight, FileDown, Loader2, MapPin } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import portrait from '@/public/venugopal-portrait.webp'
import { scrollToId } from '@/lib/ui'
import { downloadResume } from '@/lib/resume'
import { PROFILE } from '@/lib/data'

export function ResumeButton({ className = '' }: { className?: string }) {
  const [busy, setBusy] = useState(false)
  return (
    <button
      onClick={async () => { setBusy(true); try { await downloadResume() } finally { setBusy(false) } }}
      className={`inline-flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-line bg-white/[0.03] px-6 text-sm font-medium text-fg transition hover:border-cyan/40 hover:bg-white/[0.06] ${className}`}
      aria-busy={busy}
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4 text-cyan-soft" />}
      Download Resume
    </button>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(26,54,93,0.6),transparent)] blur-2xl" />

      <div className="container-site relative grid items-center gap-12 pb-20 lg:grid-cols-[1.2fr_1fr] lg:pb-28">
        <div>
          <p className="mb-6 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 text-xs text-muted">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            Open to new opportunities
            <span className="text-line">·</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />Tirunelveli, {PROFILE.relocate.toLowerCase()}</span>
          </p>

          <h1 className="text-4xl font-semibold leading-[1.08] text-fg sm:text-5xl lg:text-6xl">
            Hi, I’m Venugopal. I build web and mobile apps.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            I’m a software engineer with 2+ years of experience in <span className="text-fg">React.js, React Native and Node.js</span>. I work on booking and payment flows, shared UI code and internal tools.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => scrollToId('work')} className="inline-flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-fg px-6 text-sm font-semibold text-ink transition hover:bg-white">
              View my work <ArrowRight className="h-4 w-4" />
            </button>
            <ResumeButton />
          </div>
        </div>

        <div className="mx-auto w-full max-w-[360px] lg:max-w-none">
          <div className="overflow-hidden rounded-2xl border border-line bg-navy/30 p-2">
            <Image src={portrait} alt="Portrait of Venugopal" placeholder="blur" priority sizes="(min-width: 1024px) 420px, 90vw" className="h-auto w-full rounded-xl object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
