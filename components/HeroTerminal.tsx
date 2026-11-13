'use client'


import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { highlight } from './Code'


/**
 * Three small windows into the work I actually do day to day:
 *  1. the config-driven rule engine (every rule shares one memory object)
 *  2. the React Native booking UI (slot states, UTC → local, discounts, group bookings)
 *  3. the QR + polling payment flow
 * Same terminal, three tabs. It plays on its own; click a tab to jump.
 */


type V = string | number | boolean | null
type S = Record<string, V>
type Step = { event: string | null; line: number; state: S; log: string }
type Scene = { id: string; tab: string; path: string; aria: string; code: string[]; steps: Step[] }


const SCENES: Scene[] = [
  {
    id: 'rules',
    tab: 'rules.js',
    path: 'rules/searchCustomer.rule.js',
    aria: 'Rule engine: a search rule reading and writing the shared memory object',
    code: [
      "// each rule reads/writes one shared memory object",
      "async executeRawQueryTable(headers, input, mem) {",
      "  const { MerchantID, TenantID } =",
      "    mem.headerValidationRuleOutput[0]",
      "  const where = buildFilters(input.filter)",
      "  const page = paginate(input.limit, input.page)",
      "  const query = toBase64(select + where + page)",
      "  const out = await EmptyRule.execute({ query }, mem)",
      "  mem.searchCustomerRuleOutput = out.data",
      "  return generateServiceOutput(out.data, 200)",
      "}",
    ],
    steps: [
      { event: null, line: -1, log: 'rule chain loaded from config', state: { rule: 'searchCustomer', tenant: null, filter: null, limit: null, rows: null, status: 'idle' } },
      { event: 'HEADERS', line: 3, log: 'headerValidationRule ✓ → mem', state: { rule: 'searchCustomer', tenant: 'T-07', filter: null, limit: null, rows: null, status: 'scoped' } },
      { event: 'FILTER', line: 4, log: '[true, null] → (= true OR IS NULL)', state: { rule: 'searchCustomer', tenant: 'T-07', filter: 'IsParentBooking', limit: null, rows: null, status: 'building' } },
      { event: 'PAGE', line: 5, log: 'LIMIT 10 OFFSET 0 (was ignored before)', state: { rule: 'searchCustomer', tenant: 'T-07', filter: 'IsParentBooking', limit: 10, rows: null, status: 'building' } },
      { event: 'QUERY', line: 7, log: 'raw query (base64) → 200', state: { rule: 'searchCustomer', tenant: 'T-07', filter: 'IsParentBooking', limit: 10, rows: 10, status: 'fetched' } },
      { event: 'NEXT_RULE', line: 8, log: 'next rule reads mem.searchCustomerRuleOutput', state: { rule: 'searchCustomer', tenant: 'T-07', filter: 'IsParentBooking', limit: 10, rows: 10, status: 'done' } },
    ],
  },
  {
    id: 'booking',
    tab: 'SlotGrid.tsx',
    path: 'booking/SlotGrid.tsx · React Native',
    aria: 'Booking UI: slot states, UTC to local time, discount ribbon and group bookings',
    code: [
      "// one slot card, four states, web + native",
      "const status = slot.isBooked ? 'booked'",
      "  : slot.isLocked ? 'locked'",
      "  : selected.has(slot.id) ? 'selected' : 'open'",
      "const discount = getDiscount(slot, customer)",
      "<SlotCard status={status} time={toLocal(slot.utc)}>",
      "  {discount > 0 && <Ribbon>{discount}% OFF</Ribbon>}",
      "</SlotCard>",
      "// group booking: one parent, many child slots",
      "const total = sum(children.map((c) => c.PaidAmount))",
    ],
    steps: [
      { event: null, line: -1, log: 'GET /slots → 24 slots', state: { slot: '18:00', utc: '12:30Z', status: 'open', discount: 0, children: 0 } },
      { event: 'RENDER', line: 5, log: 'stored 12:30Z → shown 18:00 IST', state: { slot: '18:00', utc: '12:30Z', status: 'open', discount: 0, children: 0 } },
      { event: 'TAP', line: 3, log: 'tap → selected', state: { slot: '18:00', utc: '12:30Z', status: 'selected', discount: 0, children: 0 } },
      { event: 'DISCOUNT', line: 4, log: 'customer category → 20% off', state: { slot: '18:00', utc: '12:30Z', status: 'selected', discount: 20, children: 0 } },
      { event: 'RIBBON', line: 6, log: 'ribbon fits on one line, no overlap', state: { slot: '18:00', utc: '12:30Z', status: 'selected', discount: 20, children: 0 } },
      { event: 'GROUP', line: 9, log: 'parent #1042 · 3 child slots locked', state: { slot: '18:00', utc: '12:30Z', status: 'locked', discount: 20, children: 3 } },
    ],
  },
  {
    id: 'payments',
    tab: 'usePayment.ts',
    path: 'payments/usePaymentMachine.ts',
    aria: 'Payment state machine reducer code',
    code: [
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
    ],
    steps: [
      { event: null, line: -1, log: 'machine ready', state: { status: 'idle', orderId: null, attempts: 0, amount: 1499, paidAt: null } },
      { event: 'CREATE_ORDER', line: 4, log: 'POST /orders → 201', state: { status: 'creating', orderId: 'ord_8F2K', attempts: 0, amount: 1499, paidAt: null } },
      { event: 'QR_READY', line: 5, log: 'QR rendered (web + native)', state: { status: 'awaiting', orderId: 'ord_8F2K', attempts: 0, amount: 1499, paidAt: null } },
      { event: 'POLL', line: 6, log: 'GET /orders/ord_8F2K → pending', state: { status: 'polling', orderId: 'ord_8F2K', attempts: 1, amount: 1499, paidAt: null } },
      { event: 'POLL', line: 6, log: 'GET /orders/ord_8F2K → pending', state: { status: 'polling', orderId: 'ord_8F2K', attempts: 2, amount: 1499, paidAt: null } },
      { event: 'PAID', line: 7, log: 'verified ✓ amount matches ledger', state: { status: 'confirmed', orderId: 'ord_8F2K', attempts: 2, amount: 1499, paidAt: '2026-11-07T04:00:00Z' } },
    ],
  },
]


const DONE = new Set(['done', 'confirmed', 'locked'])


export default function HeroTerminal() {
  const reduce = useReducedMotion()
  const [scene, setScene] = useState(0)
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const idRef = useRef(1)
  const first = (sc: number) => [{ id: idRef.current++, t: SCENES[sc].steps[0].log, e: null as string | null }]
  const [logs, setLogs] = useState<{ id: number; t: string; e: string | null }[]>([{ id: 0, t: SCENES[0].steps[0].log, e: null }])

  const STEPS = SCENES[scene].steps
  const CODE = SCENES[scene].code


  useEffect(() => {
    if (!playing) return
    const last = step === STEPS.length - 1
    const t = setTimeout(() => {
      if (last) {
        // finished this file → move on to the next tab
        const ns = (scene + 1) % SCENES.length
        setScene(ns); setStep(0); setLogs(first(ns))
        return
      }
      const next = step + 1
      setStep(next)
      setLogs((l) => [...l, { id: idRef.current++, t: STEPS[next].log, e: STEPS[next].event }].slice(-4))
    }, last ? 3200 : 1700)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, scene, playing])


  const reset = () => { setStep(0); setLogs(first(scene)) }
  const openScene = (i: number) => { setScene(i); setStep(0); setLogs(first(i)) }


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
  const prev = STEPS[Math.max(0, step - 1)].state
  const status = String(s.status ?? '')
  const done = step === STEPS.length - 1 && DONE.has(status)


  return (
    <div className="relative [perspective:1400px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div aria-hidden="true" className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] bg-[radial-gradient(closest-side,rgba(34,211,238,0.08),rgba(59,130,246,0.06)_55%,transparent)] blur-2xl" />
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} className="glass relative overflow-hidden rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),0_0_0_1px_rgba(103,232,249,0.08)]">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-line bg-ink2/70 px-4 py-2.5">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" /><span className="h-3 w-3 rounded-full bg-[#FEBC2E]" /><span className="h-3 w-3 rounded-full bg-[#28C840]" />
          </div>
          <p className="truncate px-2 font-mono text-xs text-muted">{SCENES[scene].path}</p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPlaying((p) => !p)} className="grid h-8 w-8 place-items-center rounded-md text-muted transition hover:bg-white/5 hover:text-fg" aria-label={playing ? 'Pause live demo' : 'Play live demo'}>
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>
            <button onClick={reset} className="grid h-8 w-8 place-items-center rounded-md text-muted transition hover:bg-white/5 hover:text-fg" aria-label="Restart live demo"><RotateCcw className="h-3.5 w-3.5" /></button>
          </div>
        </div>


        {/* file tabs */}
        <div role="tablist" aria-label="Pieces of my work" className="flex overflow-x-auto border-b border-line bg-ink2/50">
          {SCENES.map((sc, i) => {
            const on = i === scene
            return (
              <button key={sc.id} role="tab" aria-selected={on} aria-controls="hero-terminal-panel" onClick={() => openScene(i)}
                className={`relative shrink-0 border-r border-line px-4 py-2 font-mono text-[11.5px] transition ${on ? 'bg-ink2/80 text-fg' : 'text-muted hover:bg-white/[0.03] hover:text-fg'}`}>
                {on && <motion.span layoutId="tab" className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue to-cyan" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                {sc.tab}
              </button>
            )
          })}
        </div>


        {/* code */}
        <div id="hero-terminal-panel" role="tabpanel" className="bg-ink2/80 px-1 py-4 sm:px-3">
          <AnimatePresence mode="wait" initial={false}>
            <motion.pre key={SCENES[scene].id} initial={reduce ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
              className="overflow-x-auto font-mono text-[11.5px] leading-6 sm:text-[12.5px]" aria-label={SCENES[scene].aria}><code>
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
            </code></motion.pre>
          </AnimatePresence>
        </div>


        {/* live state + log */}
        <div className="grid border-t border-line sm:grid-cols-[1.05fr_1fr]">
          <div className="border-b border-line p-4 sm:border-b-0 sm:border-r" aria-live="polite">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{scene === 0 ? 'shared memory' : 'state'}</p>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[11px] ${done ? 'bg-emerald-400/10 text-emerald-300' : 'bg-cyan/10 text-cyan-soft'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${done ? 'bg-emerald-300' : 'animate-pulse bg-cyan-soft'}`} />{status}
              </span>
            </div>
            <div className="font-mono text-[12px] leading-6">
              {Object.keys(s).map((k) => {
                const changed = step !== 0 && s[k] !== prev[k]
                const v = s[k]
                return (
                  <div key={`${scene}-${k}`} className="flex gap-2">
                    <span className="text-blue-bright">{k}:</span>
                    <motion.span key={`${k}-${String(v)}`} initial={changed ? { backgroundColor: 'rgba(34,211,238,0.28)' } : false} animate={{ backgroundColor: 'rgba(34,211,238,0)' }} transition={{ duration: 1.1 }}
                      className={`truncate rounded px-1 ${typeof v === 'string' ? 'tok-s' : typeof v === 'number' ? 'tok-n' : 'text-muted'}`}>
                      {v === null ? 'null' : typeof v === 'string' ? `'${v}'` : String(v)}
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
