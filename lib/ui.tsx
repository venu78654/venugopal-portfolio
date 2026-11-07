'use client'

import { motion, useInView, animate } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from 'react'

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  // move focus for keyboard + screen reader users
  const heading = el.querySelector<HTMLElement>('h2, h1')
  if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }) }
}

export function onSpot(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export function Reveal({ children, delay = 0, className = '', y = 18, as = 'div', ...rest }: { children: ReactNode; delay?: number; className?: string; y?: number; as?: 'div' | 'li' | 'article' } & Record<string, unknown>) {
  const M = (as === 'li' ? motion.li : as === 'article' ? motion.article : motion.div) as typeof motion.div
  return (
    <M
      {...rest}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  )
}

export function Counter({ to, from = 0, duration = 1.6 }: { to: number; from?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(from)
  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVal(to); return }
    const c = animate(from, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setVal(Math.round(v)) })
    return () => c.stop()
  }, [inView, from, to, duration])
  return <span ref={ref} className="tabular-nums">{val}</span>
}

export function SectionHead({ eyebrow, title, intro, id }: { eyebrow: string; title: ReactNode; intro?: string; id: string }) {
  return (
    <Reveal className="mb-12 max-w-2xl md:mb-16">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 id={`${id}-title`} className="text-3xl font-semibold leading-[1.1] text-fg outline-none sm:text-4xl md:text-[2.75rem]">{title}</h2>
      {intro && <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{intro}</p>}
    </Reveal>
  )
}

export const GithubIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>
)
export const LinkedinIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>
)
