'use client'

import { Fragment, type ReactElement } from 'react'

const KW = new Set(['const','let','function','return','switch','case','default','type','export','import','from','if','else','await','async','new','interface','extends'])
// Tiny, dependency-free highlighter for the code snippets on the page
export function highlight(line: string) {
  const re = /(\/\/.*$)|('[^']*'|"[^"]*"|`[^`]*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)(?=\s*\()|([A-Za-z_$][\w$]*)|(\s+)|(.)/g
  const out: ReactElement[] = []
  let m: RegExpExecArray | null; let i = 0
  while ((m = re.exec(line))) {
    const [t, c, s, n, f, w] = m
    let cls = 'tok-p'
    if (c) cls = 'tok-c'; else if (s) cls = 'tok-s'; else if (n) cls = 'tok-n'; else if (f) cls = KW.has(f) ? 'tok-k' : 'tok-f'; else if (w) cls = KW.has(w) ? 'tok-k' : 'text-fg'
    out.push(<span key={i++} className={cls}>{t}</span>)
  }
  return <Fragment>{out}</Fragment>
}

export function CodeBlock({ lines, className = '' }: { lines: string[]; className?: string }) {
  return (
    <pre className={`overflow-x-auto pr-3 font-mono text-[12.5px] leading-6 ${className}`}><code>
      {lines.map((l, i) => (
        <div key={i} className="flex"><span className="mr-4 w-5 shrink-0 select-none text-right text-[#7D8A9C]" aria-hidden="true">{i + 1}</span><span className="min-w-0 whitespace-pre-wrap break-words sm:whitespace-pre">{highlight(l)}</span></div>
      ))}
    </code></pre>
  )
}
