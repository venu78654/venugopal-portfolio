'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

export default function Shell({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView(); (document.querySelector('#about h2') as HTMLElement | null)?.focus() }}
        className="sr-only z-[100] rounded-md bg-fg px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      {children}
    </MotionConfig>
  )
}
