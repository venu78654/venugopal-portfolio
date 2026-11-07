'use client'

import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV } from '@/lib/data'
import { scrollToId } from '@/lib/ui'

export default function Header() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [open])

  const go = (id: string) => { setOpen(false); scrollToId(id) }

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? 'border-b border-line bg-ink/75 backdrop-blur-xl' : 'border-b border-transparent'}`}>
      <div className="container-site flex h-16 items-center justify-between">
        <button onClick={() => go('top')} className="group flex items-center gap-2.5 rounded-md font-mono text-sm text-fg" aria-label="Venugopal — back to top">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-navy/40 text-cyan-soft transition-colors group-hover:border-cyan/50">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m4 6 8 12 8-12" /></svg>
          </span>
          <span className="font-medium">venugopal<span className="text-muted">.dev</span></span>
        </button>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-ink/40 p-1 backdrop-blur">
            {NAV.map((n) => (
              <li key={n.id}>
                <button onClick={() => go(n.id)} aria-current={active === n.id ? 'true' : undefined}
                  className={`relative isolate rounded-full px-3.5 py-1.5 text-sm transition-colors ${active === n.id ? 'text-fg' : 'text-muted hover:text-fg'}`}>
                  {active === n.id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-slate2/80 ring-1 ring-white/10" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => go('contact')} className="hidden rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink transition hover:bg-white sm:inline-flex">Let’s talk</button>
          <button onClick={() => setOpen((o) => !o)} className="grid h-11 w-11 place-items-center rounded-lg border border-line text-fg md:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-nav" aria-label="Mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-line md:hidden">
            <ul className="container-site flex flex-col py-3">
              {NAV.map((n, i) => (
                <motion.li key={n.id} initial={{ x: -8, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.03 }}>
                  <button onClick={() => go(n.id)} className="flex w-full items-center justify-between py-3 text-left text-base text-fg">
                    {n.label}<span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
      <motion.div aria-hidden="true" className="absolute bottom-[-1px] left-0 right-0 h-px origin-left bg-gradient-to-r from-blue via-cyan to-cyan-soft" style={{ scaleX: progress }} />
    </header>
  )
}
