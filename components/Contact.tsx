'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Mail, Calendar, Copy, Check, MessageSquare, ArrowUpRight } from 'lucide-react'
import { PROFILE, NAV } from '@/lib/data'
import { GithubIcon, LinkedinIcon, scrollToId, Reveal } from '@/lib/ui'
import { downloadResume } from '@/lib/resume'

const MAILTO = `mailto:${PROFILE.email}`
const SCHEDULE = `mailto:${PROFILE.email}?subject=${encodeURIComponent('Quick chat — 15 minutes?')}&body=${encodeURIComponent('Hi Venugopal,\n\nI came across your portfolio and would love to set up a quick chat.\n\nA few times that work for me:\n- \n- \n\nThanks!')}`

type Line = { id: number; kind: 'in' | 'out'; body: ReactNode }
const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" className="text-cyan-soft underline decoration-cyan/40 underline-offset-4 hover:decoration-cyan">{children}</a>
)

const QUICK = ['contact', 'email', 'linkedin', 'github', 'schedule', 'resume']

export default function Contact() {
  const [lines, setLines] = useState<Line[]>([])
  const [val, setVal] = useState('')
  const [hist, setHist] = useState<string[]>([])
  const [hi, setHi] = useState(-1)
  const [copied, setCopied] = useState(false)
  const idr = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  const push = (kind: Line['kind'], body: ReactNode) => setLines((l) => [...l, { id: idr.current++, kind, body }])

  useEffect(() => {
    push('out', <span className="text-muted">Welcome. Type <span className="text-fg">help</span> to see commands, or <span className="text-fg">contact</span> to reach me.</span>)
  }, [])
  useEffect(() => { bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' }) }, [lines])

  const copy = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); setCopied(true); setTimeout(() => setCopied(false), 1800); return true } catch { return false }
  }

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    push('in', raw)
    setHist((h) => [raw, ...h].slice(0, 20)); setHi(-1)
    const out = (b: ReactNode) => push('out', b)
    switch (cmd) {
      case 'help':
        out(<div className="grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-0.5">{[
          ['contact', 'all the ways to reach me'], ['email', 'open a new email'], ['linkedin', 'open LinkedIn'], ['github', 'open GitHub'],
          ['schedule', 'propose a quick chat'], ['resume', 'download ATS resume (PDF)'], ['whoami', 'short intro'], ['copy', 'copy email to clipboard'], ['clear', 'clear the terminal'],
        ].flatMap(([c, d]) => [<span key={c} className="text-cyan-soft">{c}</span>, <span key={c + 'd'} className="text-muted">{d}</span>])}</div>); break
      case 'contact':
        out(<div className="space-y-0.5">
          <p><span className="text-muted">email    </span> <A href={MAILTO}>{PROFILE.email}</A></p>
          <p><span className="text-muted">linkedin </span> <A href={PROFILE.linkedin}>{PROFILE.linkedin.replace('https://www.', '')}</A></p>
          <p><span className="text-muted">github   </span> <A href={PROFILE.github}>{PROFILE.github.replace('https://', '')}</A></p>
          <p><span className="text-muted">chat     </span> <A href={SCHEDULE}>schedule a 15-min call</A></p>
          <p className="pt-1 text-muted">Usually replies within 24 hours · IST (UTC+05:30)</p>
        </div>); break
      case 'email': case 'mail':
        window.location.href = MAILTO
        out(<span>Opening your mail app… if nothing happens, write to <A href={MAILTO}>{PROFILE.email}</A></span>); break
      case 'linkedin':
        window.open(PROFILE.linkedin, '_blank', 'noopener,noreferrer'); out(<span>→ <A href={PROFILE.linkedin}>{PROFILE.linkedin}</A></span>); break
      case 'github':
        window.open(PROFILE.github, '_blank', 'noopener,noreferrer'); out(<span>→ <A href={PROFILE.github}>{PROFILE.github}</A></span>); break
      case 'schedule': case 'chat':
        window.location.href = SCHEDULE
        out(<span>Drafting a meeting request… or <A href={SCHEDULE}>click here</A> to propose times.</span>); break
      case 'resume': case 'cv':
        out(<span className="text-muted">Generating ATS-optimized PDF…</span>)
        downloadResume().then(() => out(<span className="text-emerald-200">✓ Venugopal_Software_Engineer_Resume.pdf downloaded</span>)); break
      case 'whoami':
        out(<span>Venugopal — Software Engineer (React.js, React Native, Node.js) in Madurai, India. I own hard problems end to end and ship them clean.</span>); break
      case 'copy':
        copy().then((ok) => out(ok ? <span className="text-emerald-200">✓ copied {PROFILE.email}</span> : <span>Clipboard blocked — select it here: <span className="select-all text-fg">{PROFILE.email}</span></span>)); break
      case 'clear': setLines([]); break
      case 'sudo hire venugopal': case 'hire': out(<span className="text-emerald-200">Permission granted. Run <span className="text-fg">schedule</span> to proceed.</span>); break
      default: out(<span><span className="text-rose-200">command not found:</span> {cmd}. Try <span className="text-fg">help</span>.</span>)
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden pt-24 sm:pt-32">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 rotate-180" />
      <div className="container-site relative grid gap-12 pb-20 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <Reveal>
          <p className="eyebrow mb-4">Say hello</p>
          <h2 id="contact-title" className="text-4xl font-semibold leading-[1.05] text-fg outline-none sm:text-5xl">Have a hard problem?<br /><span className="text-gradient">Let’s ship it.</span></h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">I’m open to full-time Frontend, React Native and Full-Stack roles. I read every message myself and usually reply within a day. Type a command in the terminal, or just use the links below.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={MAILTO} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-fg px-6 text-sm font-semibold text-ink transition hover:bg-white"><Mail className="h-4 w-4" />Email me</a>
            <a href={SCHEDULE} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-line px-6 text-sm font-medium text-fg transition hover:border-cyan/40 hover:bg-white/[0.04]"><Calendar className="h-4 w-4 text-cyan-soft" />Schedule a quick chat</a>
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-line bg-ink2/60 p-2 pl-4">
            <span className="min-w-0 flex-1 select-all truncate font-mono text-sm text-fg">{PROFILE.email}</span>
            <button onClick={copy} className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-lg bg-white/[0.05] px-3 text-xs text-fg hover:bg-white/[0.09]" aria-live="polite">
              {copied ? <><Check className="h-3.5 w-3.5 text-emerald-300" />Copied</> : <><Copy className="h-3.5 w-3.5" />Copy</>}
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]" onClick={() => inputRef.current?.focus()}>
            <div className="flex items-center gap-2 border-b border-line bg-ink2/80 px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" aria-hidden="true" /><span className="h-3 w-3 rounded-full bg-[#FEBC2E]" aria-hidden="true" /><span className="h-3 w-3 rounded-full bg-[#28C840]" aria-hidden="true" />
              <p className="ml-3 font-mono text-xs text-muted">guest@venugopal: ~/contact</p>
            </div>
            <div ref={bodyRef} className="h-[300px] overflow-y-auto bg-ink2/90 p-4 font-mono text-[12.5px] leading-6 sm:h-[320px]" role="log" aria-live="polite" aria-label="Terminal output">
              {lines.map((l) => (
                <motion.div key={l.id} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} className={l.kind === 'in' ? 'mt-2 text-fg' : 'text-fg/90'}>
                  {l.kind === 'in' ? <><span className="text-emerald-300">➜</span> <span className="text-cyan-soft">~</span> {l.body}</> : l.body}
                </motion.div>
              ))}
              <form onSubmit={(e) => { e.preventDefault(); run(val); setVal('') }} className="mt-2 flex items-center gap-2">
                <span className="text-emerald-300" aria-hidden="true">➜</span><span className="text-cyan-soft" aria-hidden="true">~</span>
                <label htmlFor="term" className="sr-only">Terminal command</label>
                <input id="term" ref={inputRef} value={val} onChange={(e) => setVal(e.target.value)} autoComplete="off" autoCapitalize="off" spellCheck={false} placeholder="type 'contact' and press Enter"
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowUp') { e.preventDefault(); const n = Math.min(hi + 1, hist.length - 1); if (hist[n]) { setHi(n); setVal(hist[n]) } }
                    if (e.key === 'ArrowDown') { e.preventDefault(); const n = hi - 1; setHi(n); setVal(n >= 0 ? hist[n] : '') }
                    if (e.key === 'Tab' && val) { const m = [...QUICK, 'help', 'whoami', 'copy', 'clear'].find((c) => c.startsWith(val.toLowerCase())); if (m && m !== val) { e.preventDefault(); setVal(m) } }
                  }}
                  className="min-w-0 flex-1 bg-transparent text-fg caret-cyan outline-none placeholder:text-[#8A97A9]" />
              </form>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-line bg-ink2/80 p-3">
              {QUICK.map((q) => (
                <button key={q} onClick={(e) => { e.stopPropagation(); run(q) }} className="min-h-[36px] rounded-md border border-line px-3 font-mono text-xs text-fg transition hover:border-cyan/50 hover:text-cyan-soft">{q}</button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <footer className="relative border-t border-line">
        <div className="container-site flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-sm text-fg">venugopal<span className="text-muted">.dev</span></p>
            <p className="mt-1 text-xs text-muted">Designed and built by hand in Madurai — no templates. Next.js, Tailwind CSS &amp; Framer Motion.</p>
            <p className="mt-1 text-xs text-muted">© {new Date().getFullYear()} Venugopal</p>
          </div>
          <nav aria-label="Footer"><ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {NAV.slice(0, 6).map((n) => <li key={n.id}><button onClick={() => scrollToId(n.id)} className="text-muted hover:text-fg">{n.label}</button></li>)}
          </ul></nav>
          <div className="flex items-center gap-2">
            {[[PROFILE.linkedin, 'LinkedIn', <LinkedinIcon />], [PROFILE.github, 'GitHub', <GithubIcon />], [MAILTO, 'Email', <Mail className="h-4 w-4" />]].map(([h, l, ic]) => (
              <a key={l as string} href={h as string} target={(h as string).startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" aria-label={l as string} className="grid h-11 w-11 place-items-center rounded-lg border border-line text-muted transition hover:border-cyan/40 hover:text-fg">{ic as ReactNode}</a>
            ))}
          </div>
        </div>
      </footer>
    </section>
  )
}

export function FloatingContact() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => {
      const c = document.getElementById('contact')
      const nearContact = c ? c.getBoundingClientRect().top < window.innerHeight * 0.7 : false
      setShow(window.scrollY > window.innerHeight * 0.6 && !nearContact)
    }
    on(); window.addEventListener('scroll', on, { passive: true }); return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }}
          onClick={() => { scrollToId('contact'); setTimeout(() => document.getElementById('term')?.focus({ preventScroll: true }), 700) }}
          className="group fixed bottom-5 right-5 z-40 inline-flex min-h-[52px] items-center gap-2 rounded-full border border-cyan/30 bg-ink/85 pl-4 pr-5 text-sm font-medium text-fg shadow-[0_10px_40px_-8px_rgba(34,211,238,0.55)] backdrop-blur-xl transition hover:border-cyan/60 sm:bottom-8 sm:right-8"
          aria-label="Contact Venugopal">
          <span className="relative grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-blue to-cyan text-ink"><MessageSquare className="h-3.5 w-3.5" /></span>
          <span className="hidden sm:inline">Let’s talk</span><ArrowUpRight className="h-4 w-4 text-cyan-soft transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
