'use client'

import { useState } from 'react'
import { Mail, Copy, Check } from 'lucide-react'
import { PROFILE, NAV } from '@/lib/data'
import { GithubIcon, LinkedinIcon, scrollToId } from '@/lib/ui'
import { ResumeButton } from './Hero'

const MAILTO = `mailto:${PROFILE.email}`

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch {}
  }

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line pt-20 sm:pt-28">
      <div className="container-site pb-20">
        <p className="eyebrow mb-3">Contact</p>
        <h2 className="text-3xl font-semibold text-fg sm:text-4xl">Get in touch</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          I’m open to full-time Frontend, React Native and Full-Stack roles, and I’m willing to relocate. Send me an email and I’ll get back to you.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={MAILTO} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-fg px-6 text-sm font-semibold text-ink transition hover:bg-white"><Mail className="h-4 w-4" />Email me</a>
          <ResumeButton />
        </div>

        <div className="mt-6 flex max-w-md items-center gap-3 rounded-xl border border-line bg-ink2/60 p-2 pl-4">
          <span className="min-w-0 flex-1 select-all truncate font-mono text-sm text-fg">{PROFILE.email}</span>
          <button onClick={copy} className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-lg bg-white/[0.05] px-3 text-xs text-fg hover:bg-white/[0.09]" aria-live="polite">
            {copied ? <><Check className="h-3.5 w-3.5 text-emerald-300" />Copied</> : <><Copy className="h-3.5 w-3.5" />Copy</>}
          </button>
        </div>
      </div>

      <footer className="border-t border-line">
        <div className="container-site flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-sm text-fg">venugopal<span className="text-muted">.dev</span></p>
            <p className="mt-1 text-xs text-muted">© {new Date().getFullYear()} Venugopal · {PROFILE.location}</p>
          </div>
          <nav aria-label="Footer"><ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {NAV.map((n) => <li key={n.id}><button onClick={() => scrollToId(n.id)} className="text-muted hover:text-fg">{n.label}</button></li>)}
          </ul></nav>
          <div className="flex items-center gap-2">
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-lg border border-line text-muted transition hover:text-fg"><LinkedinIcon /></a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-lg border border-line text-muted transition hover:text-fg"><GithubIcon /></a>
            <a href={MAILTO} aria-label="Email" className="grid h-11 w-11 place-items-center rounded-lg border border-line text-muted transition hover:text-fg"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
      </footer>
    </section>
  )
}
