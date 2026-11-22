'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV } from '@/lib/data'
import { scrollToId } from '@/lib/ui'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => { setOpen(false); scrollToId(id) }

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${scrolled || open ? 'border-line bg-ink/80 backdrop-blur' : 'border-transparent'}`}>
      <div className="container-site flex h-16 items-center justify-between">
        <button onClick={() => go('top')} className="font-mono text-sm font-medium text-fg" aria-label="Back to top">
          venugopal<span className="text-muted">.dev</span>
        </button>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            {NAV.map((n) => (
              <li key={n.id}><button onClick={() => go(n.id)} className="text-muted transition-colors hover:text-fg">{n.label}</button></li>
            ))}
          </ul>
        </nav>

        <button onClick={() => setOpen((o) => !o)} className="grid h-11 w-11 place-items-center rounded-lg border border-line text-fg md:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line md:hidden">
          <ul className="container-site flex flex-col py-2">
            {NAV.map((n) => (
              <li key={n.id}><button onClick={() => go(n.id)} className="w-full py-3 text-left text-base text-fg">{n.label}</button></li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
