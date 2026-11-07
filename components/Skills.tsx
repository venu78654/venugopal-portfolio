'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { SKILLS, type SkillCat } from '@/lib/data'
import { onSpot, SectionHead, Reveal } from '@/lib/ui'
import { CodeBlock } from './Code'

const FILTERS: { id: 'all' | SkillCat; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend & Mobile' },
  { id: 'backend', label: 'Backend / Database' },
  { id: 'tools', label: 'Tools & Practices' },
]
const CAT_LABEL: Record<SkillCat, string> = { frontend: 'frontend', backend: 'backend', tools: 'workflow' }

export default function Skills() {
  const [f, setF] = useState<'all' | SkillCat>('all')
  const list = SKILLS.filter((s) => f === 'all' || s.cat === f)
  const cats = (f === 'all' ? ['frontend', 'backend', 'tools'] : [f]) as SkillCat[]
  const code = [
    'export const stack = {',
    ...cats.flatMap((c) => {
      const names = SKILLS.filter((s) => s.cat === c).map((s) => `'${s.name.split(' (')[0]}'`)
      return [`  ${CAT_LABEL[c]}: [`, ...names.map((n) => `    ${n},`), '  ],']
    }),
    '} as const',
  ]

  return (
    <section id="stack" aria-labelledby="stack-title" className="relative border-y border-line bg-ink2/60 py-24 sm:py-32">
      <div className="container-site">
        <SectionHead id="stack" eyebrow="Stack" title="The tools I reach for." intro="Filter by layer. Nothing here is padding — I’ve used every one of these on real, shipped work." />

        <div role="tablist" aria-label="Filter skills" className="mb-8 flex flex-wrap gap-2"
          onKeyDown={(e) => {
            const i = FILTERS.findIndex((x) => x.id === f)
            if (e.key === 'ArrowRight') setF(FILTERS[(i + 1) % FILTERS.length].id)
            if (e.key === 'ArrowLeft') setF(FILTERS[(i - 1 + FILTERS.length) % FILTERS.length].id)
          }}>
          {FILTERS.map((x) => {
            const n = x.id === 'all' ? SKILLS.length : SKILLS.filter((s) => s.cat === x.id).length
            return (
              <button key={x.id} role="tab" aria-selected={f === x.id} aria-controls="skills-panel" tabIndex={f === x.id ? 0 : -1} onClick={() => setF(x.id)}
                className={`relative isolate inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition ${f === x.id ? 'border-transparent text-ink' : 'border-line text-muted hover:text-fg'}`}>
                {f === x.id && <motion.span layoutId="skill-pill" className="absolute inset-0 -z-10 rounded-full bg-fg" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                {x.label}<span className={`font-mono text-[11px] ${f === x.id ? 'text-ink/70' : 'text-muted'}`}>{n}</span>
              </button>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <motion.ul id="skills-panel" role="tabpanel" layout className="grid content-start gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((s) => (
                <motion.li key={s.name} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.25 }}
                  onPointerMove={onSpot} tabIndex={0} className="glow-border spotlight group relative rounded-xl border border-line bg-ink/70 p-4 outline-none">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-fg">{s.name}</p>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted">{CAT_LABEL[s.cat]}</span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted transition group-hover:text-cyan-soft group-focus:text-cyan-soft">{s.note}</p>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-line bg-ink">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <p className="font-mono text-xs text-muted">stack.ts</p>
                <span className="font-mono text-[11px] text-cyan-soft">{list.length} entries</span>
              </div>
              <div className="max-h-[440px] overflow-y-auto py-3 pl-2">
                <AnimatePresence mode="wait">
                  <motion.div key={f} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <CodeBlock lines={code} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
