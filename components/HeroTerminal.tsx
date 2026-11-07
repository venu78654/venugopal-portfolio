'use client'

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { highlight } from './Code'

type S = { status: string; orderId: string | null; attempts: number; amount: number; paidAt: string | null }
const STEPS: { event: string | null; line: number; state: S; log: string }[] = [
  { event: null, line: -1, log: 'machine ready', state: { status: 'idle', orderId: null, attempts: 0, amount: 1499, paidAt: null } },
  { event: 'CREATE_ORDER', line: 4, log: 'POST /orders → 201', state: { status: 'creating', orderId: 'ord_8F2K', attempts: 0, amount: 1499, paidAt: null } },
  { event: 'QR_READY', line: 5, log: 'QR rendered (web + native)', state: { status: 'awaiting', orderId: 'ord_8F2K', attempts: 0, amount: 1499, paidAt: null } },
  { event: 'POLL', line: 6, log: 'GET /orders/ord_8F2K → pending', state: { status: 'polling', orderId: 'ord_8F2K', attempts: 1, amount: 1499, paidAt: null } },
  { event: 'POLL', line: 6, log: 'GET /orders/ord_8F2K → pending', state: { status: 'polling', orderId: 'ord_8F2K', attempts: 2, amount: 1499, paidAt: null } },
  { event: 'PAID', line: 7, log: 'verified ✓ amount matches ledger', state: { status: 'confirmed', orderId: 'ord_8F2K', attempts: 2, amount: 1499, paidAt: '2026-11-07T04:00:00Z' } },
]

const CODE = [
  "// one source of truth for web + native",
  "function reducer(s: State, e: Event) {",
  "  switch (e.type) {",
  "    // explicit, recoverable transitions",
  "    case 'CREATE_ORDER': return { ...s, status: 'creating' }",
  "    case 'QR_READY': return { ...s, status: 'awaiting' }",
  "    case 'POLL': return { ...s, attempts: s.attempts + 1 }",
  "    case 'PAID': return { ...s, paidAt: toUTC(e.ts) }",
  "    default: return s",
  "  }",
  "}",
]

export default function HeroTerminal() {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [logs, setLogs] = useState<{ id: number; t: string; e: string | null }[]>([{ id: 0, t: STEPS[0].log, e: null }])
  const idRef = useRef(1)

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => {
      const next = (step + 1) % STEPS.length
      setStep(next)
      setLogs((l) => (next === 0 ? [{ id: idRef.current++, t: STEPS[0].log, e: null }] : [...l, { id: idRef.current++, t: STEPS[next].log, e: STEPS[next].event }].slice(-4)))
    }, step === STEPS.length - 1 ? 3200 : 1700)
    return () => clearTimeout(t)
  }, [step, playing])

  const reset = () => { setStep(0); setLogs([{ id: idRef.current++, t: STEPS[0].log, e: null }]) }

  // 3D tilt
  const mx = useMotionValue(0), my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 18 })
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  const s = STEPS[step].state
  const prev = STEPS[(step - 1 + STEPS.length) % STEPS.length].state
  const done = s.status === 'confirmed'

  return (
    <div className="relative [perspective:1400px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div aria-hidden="true" className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] bg-[radial-gradient(closest-side,rgba(34,211,238,0.08),rgba(59,130,246,0.06)_55%,transparent)] blur-2xl" />
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} className="glass relative overflow-hidden rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),0_0_0_1px_rgba(103,232,249,0.08)]">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-line bg-ink2/70 px-4 py-2.5">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" /><span className="h-3 w-3 rounded-full bg-[#FEBC2E]" /><span className="h-3 w-3 rounded-full bg-[#28C840]" />
          </div>
          <p className="font-mono text-xs text-muted">usePaymentMachine.ts</p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPlaying((p) => !p)} className="grid h-8 w-8 place-items-center rounded-md text-muted transition hover:bg-white/5 hover:text-fg" aria-label={playing ? 'Pause live demo' : 'Play live demo'}>
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>
            <button onClick={reset} className="grid h-8 w-8 place-items-center rounded-md text-muted transition hover:bg-white/5 hover:text-fg" aria-label="Restart live demo"><RotateCcw className="h-3.5 w-3.5" /></button>
          </div>
        </div>

        {/* code */}
        <div className="bg-ink2/80 px-1 py-4 sm:px-3">
          <pre className="overflow-x-auto font-mono text-[11.5px] leading-6 sm:text-[12.5px]" aria-label="Payment state machine reducer code"><code>
            {CODE.map((l, i) => {
              const on = STEPS[step].line === i
              return (
                <div key={i} className="relative flex pr-4">
                  {on && <motion.span layoutId="hl" className="absolute inset-0 -z-0 rounded border-l-2 border-cyan bg-cyan/[0.09]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span className="relative mr-4 w-6 shrink-0 select-none text-right text-[#7D8A9C]" aria-hidden="true">{i + 1}</span>
                  <span className="relative min-w-0 whitespace-pre-wrap break-words sm:whitespace-pre">{highlight(l)}</span>
                </div>
              )
            })}
          </code></pre>
        </div>

        {/* live state + log */}
        <div className="grid border-t border-line sm:grid-cols-[1.05fr_1fr]">
          <div className="border-b border-line p-4 sm:border-b-0 sm:border-r" aria-live="polite">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted">state</p>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[11px] ${done ? 'bg-emerald-400/10 text-emerald-300' : 'bg-cyan/10 text-cyan-soft'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${done ? 'bg-emerald-300' : 'animate-pulse bg-cyan-soft'}`} />{s.status}
              </span>
            </div>
            <div className="font-mono text-[12px] leading-6">
              {(Object.keys(s) as (keyof S)[]).map((k) => {
                const changed = step !== 0 && s[k] !== prev[k]
                const v = s[k]
                return (
                  <div key={k} className="flex gap-2">
                    <span className="text-blue-bright">{k}:</span>
                    <motion.span key={`${k}-${String(v)}`} initial={changed ? { backgroundColor: 'rgba(34,211,238,0.28)' } : false} animate={{ backgroundColor: 'rgba(34,211,238,0)' }} transition={{ duration: 1.1 }}
                      className={`truncate rounded px-1 ${typeof v === 'string' ? 'tok-s' : typeof v === 'number' ? 'tok-n' : 'text-muted'}`}>
                      {v === null ? 'null' : typeof v === 'string' ? `'${v}'` : v}
                    </motion.span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="p-4">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted">events</p>
            <ul className="space-y-1.5 font-mono text-[11.5px]">
              <AnimatePresence initial={false}>
                {logs.map((l) => (
                  <motion.li key={l.id} layout initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex gap-2 leading-5">
                    <span className="text-cyan-soft" aria-hidden="true">›</span>
                    <span className="min-w-0">{l.e && <span className="mr-1.5 text-fg">{l.e}</span>}<span className="text-muted">{l.t}</span></span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
        {/* step track */}
        <div className="flex gap-1 border-t border-line bg-ink2/60 px-4 py-3" aria-hidden="true">
          {STEPS.map((_, i) => <span key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= step ? 'bg-gradient-to-r from-blue to-cyan' : 'bg-slate2'}`} />)}
        </div>
      </motion.div>
    </div>
  )
}
