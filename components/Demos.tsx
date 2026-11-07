'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Plus, RotateCcw, Wand2 } from 'lucide-react'

/* ---------------- Slot / timezone demo ---------------- */
const SLOTS_UTC = ['2026-11-12T03:30:00Z', '2026-11-12T05:00:00Z', '2026-11-12T08:30:00Z', '2026-11-12T11:00:00Z', '2026-11-12T13:30:00Z', '2026-11-12T16:00:00Z']
const ZONES = [
  { id: 'Asia/Kolkata', label: 'IST · Tirunelveli' },
  { id: 'Asia/Dubai', label: 'GST · Dubai' },
  { id: 'America/New_York', label: 'EST · New York' },
  { id: 'Asia/Singapore', label: 'SGT · Singapore' },
]
const fmt = (iso: string, tz: string) => new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: tz, weekday: 'short' }).format(new Date(iso))
const naive = (iso: string) => { const [h, m] = iso.slice(11, 16).split(':').map(Number); const d = new Date(2026, 10, 12, h, m); return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', weekday: 'short' }).format(d) }

export function SlotDemo() {
  const [tz, setTz] = useState('Asia/Kolkata')
  const [fixed, setFixed] = useState(true)
  const [sel, setSel] = useState<string | null>(SLOTS_UTC[1])
  const [booked] = useState<string>(SLOTS_UTC[3])

  return (
    <div className="rounded-xl border border-line bg-ink2/70 p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-xs text-muted">Viewer timezone
          <select value={tz} onChange={(e) => setTz(e.target.value)} className="min-h-[36px] rounded-md border border-line bg-ink px-2 text-sm text-fg">
            {ZONES.map((z) => <option key={z.id} value={z.id}>{z.label}</option>)}
          </select>
        </label>
        <div role="radiogroup" aria-label="Slot logic version" className="ml-auto inline-flex rounded-full border border-line p-0.5 text-xs">
          {[['Before', false], ['After fix', true]].map(([l, v]) => (
            <button key={String(l)} role="radio" aria-checked={fixed === v} onClick={() => setFixed(v as boolean)} className={`min-h-[32px] rounded-full px-3 transition ${fixed === v ? (v ? 'bg-cyan/15 text-cyan-soft' : 'bg-rose-400/15 text-rose-200') : 'text-muted hover:text-fg'}`}>{l as string}</button>
          ))}
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {SLOTS_UTC.map((s) => {
          const isBooked = s === booked
          const label = fixed ? fmt(s, tz) : naive(s)
          const active = sel === s
          return (
            <li key={s}>
              <button disabled={fixed && isBooked} onClick={() => setSel(s)} aria-pressed={active}
                className={`flex min-h-[48px] w-full flex-col items-start rounded-lg border px-3 py-2 text-left font-mono text-xs transition ${active ? 'border-cyan/60 bg-cyan/10 text-fg' : 'border-line text-fg hover:border-slate-500'} ${fixed && isBooked ? 'cursor-not-allowed opacity-50 line-through' : ''}`}>
                <span className="text-sm">{label}</span>
                <span className="text-[10.5px] text-muted">{isBooked ? (fixed ? 'booked' : 'booked · still selectable') : 'available'}</span>
              </button>
            </li>
          )
        })}
      </ul>
      <AnimatePresence mode="wait">
        {sel && (
          <motion.div key={`${sel}-${tz}-${fixed}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`mt-4 flex items-start gap-2.5 rounded-lg p-3 text-xs leading-relaxed ${fixed ? 'bg-emerald-400/[0.07] text-emerald-100' : 'bg-rose-400/[0.08] text-rose-100'}`}>
            {fixed ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> : <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" />}
            <p className="font-mono">
              stored <span className="text-fg">{sel}</span> → shown <span className="text-fg">{fixed ? fmt(sel, tz) : naive(sel)}</span>
              {fixed ? ' · formatted at the edge, correct in every zone.' : ` · UTC hour rendered as local time — wrong for ${ZONES.find((z) => z.id === tz)?.label.split(' · ')[1]}.`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ---------------- JSON UI engine demo ---------------- */
type Field = { type: 'text' | 'select' | 'toggle'; id: string; label: string; options?: string[] }
type Config = { title: string; fields: Field[]; action: { label: string; onClick: string } }

const INITIAL: Config = {
  title: 'Book a session',
  fields: [
    { type: 'text', id: 'name', label: 'Full name' },
    { type: 'select', id: 'plan', label: 'Plan', options: ['Starter', 'Pro', 'Team'] },
    { type: 'toggle', id: 'remind', label: 'Send reminder' },
  ],
  action: { label: 'Submit', onClick: 'fn.submitBooking' },
}

export function JsonEngineDemo() {
  const [src, setSrc] = useState(JSON.stringify(INITIAL, null, 2))
  const [store, setStore] = useState<Record<string, unknown>>({ plan: 'Starter', remind: true })
  const [out, setOut] = useState<string | null>(null)

  const registry: Record<string, (s: Record<string, unknown>) => string> = {
    'fn.submitBooking': (s) => `submitBooking(${JSON.stringify(s)})`,
    'fn.resetForm': () => { setStore({}); return 'resetForm() → store cleared' },
  }

  const parsed = useMemo((): { ok: true; cfg: Config } | { ok: false; err: string } => {
    try {
      const c = JSON.parse(src) as Config
      if (!c || !Array.isArray(c.fields)) return { ok: false, err: 'Schema: "fields" must be an array' }
      for (const f of c.fields) if (!['text', 'select', 'toggle'].includes(f.type)) return { ok: false, err: `Schema: unknown field type "${f.type}"` }
      return { ok: true, cfg: c }
    } catch (e) { return { ok: false, err: (e as Error).message.replace(/^JSON\.parse: /, '') } }
  }, [src])

  const mutate = (fn: (c: Config) => Config) => { if (parsed.ok) { setSrc(JSON.stringify(fn(structuredClone(parsed.cfg)), null, 2)); setOut(null) } }

  return (
    <div className="grid overflow-hidden rounded-xl border border-line bg-ink2/70 lg:grid-cols-2">
      <div className="flex flex-col border-b border-line lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between border-b border-line px-4 py-2">
          <label htmlFor="cfg" className="font-mono text-[11px] uppercase tracking-widest text-muted">module.config.json — editable</label>
          <button onClick={() => { setSrc(JSON.stringify(INITIAL, null, 2)); setStore({ plan: 'Starter', remind: true }); setOut(null) }} className="grid h-8 w-8 place-items-center rounded text-muted hover:text-fg" aria-label="Reset config"><RotateCcw className="h-3.5 w-3.5" /></button>
        </div>
        <textarea id="cfg" value={src} onChange={(e) => setSrc(e.target.value)} spellCheck={false}
          className="block min-h-[300px] w-full flex-1 resize-none bg-transparent p-4 font-mono text-[12px] leading-5 text-[#CFE9F5] outline-none focus-visible:bg-white/[0.02]" />
        <div className="flex flex-wrap gap-2 border-t border-line p-3">
          <button disabled={!parsed.ok} onClick={() => mutate((c) => ({ ...c, fields: [...c.fields, { type: 'text', id: `field${c.fields.length + 1}`, label: 'Phone number' }] }))} className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-line px-3 text-xs text-fg hover:border-cyan/40 disabled:opacity-40"><Plus className="h-3.5 w-3.5" /> Add field</button>
          <button disabled={!parsed.ok} onClick={() => mutate((c) => ({ ...c, action: { label: c.action.onClick === 'fn.resetForm' ? 'Submit' : 'Reset', onClick: c.action.onClick === 'fn.resetForm' ? 'fn.submitBooking' : 'fn.resetForm' } }))} className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-line px-3 text-xs text-fg hover:border-cyan/40 disabled:opacity-40"><Wand2 className="h-3.5 w-3.5" /> Swap action fn</button>
          <button disabled={!parsed.ok} onClick={() => mutate((c) => ({ ...c, action: { ...c.action, onClick: 'fn.doesNotExist' } }))} className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-line px-3 text-xs text-fg hover:border-rose-300/40 disabled:opacity-40">Break resolver</button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="border-b border-line px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-muted">rendered output</div>
        <div className="flex-1 p-5" aria-live="polite">
          {!parsed.ok ? (
            <div className="flex items-start gap-2 rounded-lg bg-rose-400/[0.08] p-3 font-mono text-xs text-rose-100"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" />{parsed.err}</div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); const f = registry[parsed.cfg.action?.onClick]; setOut(f ? f(store) : `✗ resolver: "${parsed.cfg.action?.onClick}" is not registered`) }} className="space-y-4">
              <p className="text-base font-semibold text-fg">{parsed.cfg.title}</p>
              {parsed.cfg.fields.map((f) => (
                <motion.div key={f.id} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                  {f.type === 'text' && (<label className="block text-xs text-muted">{f.label}
                    <input value={(store[f.id] as string) ?? ''} onChange={(e) => setStore((s) => ({ ...s, [f.id]: e.target.value }))} className="mt-1.5 block min-h-[40px] w-full rounded-md border border-line bg-ink px-3 text-sm text-fg outline-none focus:border-cyan/60" /></label>)}
                  {f.type === 'select' && (<label className="block text-xs text-muted">{f.label}
                    <select value={(store[f.id] as string) ?? ''} onChange={(e) => setStore((s) => ({ ...s, [f.id]: e.target.value }))} className="mt-1.5 block min-h-[40px] w-full rounded-md border border-line bg-ink px-2 text-sm text-fg">
                      <option value="">Select…</option>{(f.options ?? []).map((o) => <option key={o}>{o}</option>)}
                    </select></label>)}
                  {f.type === 'toggle' && (<button type="button" role="switch" aria-checked={!!store[f.id]} onClick={() => setStore((s) => ({ ...s, [f.id]: !s[f.id] }))} className="flex min-h-[40px] w-full items-center justify-between text-sm text-fg">
                    {f.label}<span className={`relative h-6 w-11 rounded-full transition ${store[f.id] ? 'bg-cyan/80' : 'bg-slate2'}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${store[f.id] ? 'left-6' : 'left-1'}`} /></span></button>)}
                </motion.div>
              ))}
              <button type="submit" className="min-h-[42px] w-full rounded-md bg-fg text-sm font-semibold text-ink hover:bg-white">{parsed.cfg.action?.label ?? 'Submit'}</button>
            </form>
          )}
        </div>
        <div className="space-y-1 border-t border-line bg-ink/60 p-4 font-mono text-[11.5px] leading-5">
          <p><span className="text-blue-bright">sharedStore</span> <span className="text-muted">=</span> <span className="tok-s break-all">{JSON.stringify(store)}</span></p>
          {out && <p className={out.startsWith('✗') ? 'text-rose-200' : 'text-emerald-200'}>› {out}</p>}
        </div>
      </div>
    </div>
  )
}
