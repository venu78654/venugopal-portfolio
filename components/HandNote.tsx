'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/** A small handwritten margin note with a hand-drawn arrow — the kind of thing you'd scribble on a printout. */
export default function HandNote({ children, arrow = 'down-left', className = '', rotate = -3 }: { children: ReactNode; arrow?: 'down-left' | 'down-right' | 'left' | 'up-right' | 'none'; className?: string; rotate?: number }) {
  const paths: Record<string, { d: string; head: string; box: string }> = {
    'down-left': { d: 'M70 6 C 60 30, 40 40, 12 52', head: 'M12 52 l 10 -2 M12 52 l 4 -9', box: '0 0 80 60' },
    'down-right': { d: 'M8 6 C 18 30, 40 42, 68 52', head: 'M68 52 l -10 -2 M68 52 l -4 -9', box: '0 0 80 60' },
    left: { d: 'M74 22 C 54 10, 30 30, 6 24', head: 'M6 24 l 9 -5 M6 24 l 8 6', box: '0 0 80 40' },
    'up-right': { d: 'M8 54 C 20 30, 44 18, 70 8', head: 'M70 8 l -10 0 M70 8 l -3 9', box: '0 0 80 60' },
  }
  const p = paths[arrow]
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
      className={`pointer-events-none select-none font-hand text-[1.35rem] leading-tight text-[#F5D58A] ${className}`} style={{ rotate }} aria-hidden="true">
      <span className="block">{children}</span>
      {p && (
        <svg viewBox={p.box} className="mt-1 h-12 w-20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <motion.path d={p.d} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }} />
          <motion.path d={p.head} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.3 }} />
        </svg>
      )}
    </motion.div>
  )
}
