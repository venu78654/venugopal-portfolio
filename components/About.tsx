'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import portrait from '@/public/venugopal-portrait.webp'
import { Reveal } from '@/lib/ui'

const BELIEFS = [
  ['Fix it once, properly.', 'I’d rather find the root cause than patch the same bug three times.'],
  ['If it isn’t typed, it isn’t done.', 'Types are documentation that the compiler actually checks.'],
  ['Spec before code.', 'Half the bugs I’ve prevented were caught in a one-page doc.'],
  ['Leave it a little better.', 'Every PR should make the next change easier, not harder.'],
]

const NOW = [
  ['Building', 'Web & mobile products at Gove Technologies'],
  ['Exploring', 'Next.js App Router & React Server Components'],
  ['Based in', 'Tirunelveli, India · IST (UTC+05:30)'],
  ['Open to', 'Frontend, React Native & Full-Stack roles'],
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div className="container-site grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-[420px] lg:sticky lg:top-28">
          <figure className="relative">
            <motion.div whileHover={{ rotate: 0 }} initial={{ rotate: -1.5 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="relative overflow-hidden rounded-[22px] border border-white/10 bg-navy/30 p-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
              <Image src={portrait} alt="Portrait of Venugopal, a software engineer, wearing a navy shirt" placeholder="blur" priority={false}
                sizes="(min-width: 1024px) 420px, 90vw" className="h-auto w-full rounded-2xl object-cover" />
              {/* tape */}
              <span aria-hidden="true" className="absolute -top-2 left-1/2 h-6 w-24 -translate-x-1/2 rotate-[-4deg] rounded-sm bg-[#E9E2CF]/20 backdrop-blur-sm" />
            </motion.div>
            <figcaption className="mt-4 flex items-baseline justify-between px-1">
              <span className="font-hand text-2xl text-[#F5D58A]">that’s me — Venu</span>
              <span className="font-mono text-[11px] text-muted">Tirunelveli, TN</span>
            </figcaption>
          </figure>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow mb-4">About</p>
            <h2 id="about-title" className="text-3xl font-semibold leading-[1.1] text-fg outline-none sm:text-4xl md:text-[2.75rem]">Hi, I’m Venugopal.</h2>
            <div className="mt-6 max-w-[60ch] space-y-5 text-base leading-[1.75] text-muted md:text-[17px]">
              <p>I’m a software engineer from <span className="text-fg">Tirunelveli</span>. I got into this the way a lot of us do — by breaking things until they finally made sense.</p>
              <p>These days I spend most of my time on <span className="text-fg">React and React Native</span> apps at Gove Technologies, and on the unglamorous parts behind them: payment states, booking slots, and yes, timezones. Lots of timezones.</p>
              <p>The part of the job I enjoy most is the moment a messy, cross-platform bug finally gives up its root cause. I like being the person a team can hand a hard ticket to — and not have to worry about it again.</p>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="mt-12">
            <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-muted">A few things I believe</h3>
            <ol className="divide-y divide-line border-y border-line">
              {BELIEFS.map(([t, d], i) => (
                <li key={t} className="group grid grid-cols-[2.5rem_1fr] gap-2 py-4 sm:grid-cols-[2.5rem_14rem_1fr] sm:gap-4">
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  <span className="font-medium text-fg transition group-hover:text-cyan-soft">{t}</span>
                  <span className="col-start-2 text-sm leading-relaxed text-muted sm:col-start-3">{d}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
            <dl className="rounded-2xl border border-line bg-ink2/60 p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted">Right now</p>
              </div>
              {NOW.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-3 py-1.5 text-sm">
                  <dt className="text-muted">{k}</dt><dd className="text-fg">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="font-hand text-4xl text-fg/90 sm:pb-2 sm:pr-4" aria-label="Signed, Venu">— Venu</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
