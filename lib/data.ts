export const PROFILE = {
  name: 'Venugopal',
  role: 'Software Engineer',
  location: 'Tirunelveli, Tamil Nadu, India',
  email: 'venugopal1027517@gmail.com',
  // Update these two with your exact profile URLs
  linkedin: 'https://www.linkedin.com/in/venugopal-annamalai/',
  github: 'https://github.com/venu78654',
}

export const NAV = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'stack', label: 'Stack' },
  { id: 'experience', label: 'Experience' },
  { id: 'why', label: 'Why me' },
  { id: 'contact', label: 'Contact' },
]

export type Metric = { value: number; from?: number; prefix?: string; suffix: string; label: string; title: string; body: string; live?: boolean; word?: string }
export const METRICS: Metric[] = [
  { value: 40, suffix: '%', title: 'Reduction', label: 'custom UI dev time', body: 'Cut custom UI development time via a JSON-driven framework architecture.' },
  { value: 0, from: 99, suffix: '', title: 'Zero-Discrepancy', label: 'payment mismatches', body: 'Payment pipelines integrated across Web & Mobile using QR + REST polling.' },
  { value: 100, suffix: '%', title: 'Platform-Wide', label: 'timezone edge cases resolved', body: 'Resolved critical cross-platform UTC/timezone edge cases across every surface.' },
  { value: 0, suffix: '', word: 'Live', title: 'Production-Grade', label: 'apps in production', body: 'React.js & React Native applications serving live daily active users.', live: true },
]

export type Project = {
  note: string
  id: string
  index: string
  title: string
  kicker: string
  problem: string[]
  solution: string[]
  outcomes: string[]
  arch: { label: string; sub: string }[]
  tech: string[]
}

export const PROJECTS: Project[] = [
  {
    id: 'booking',
    index: '01',
    kicker: 'Web + React Native',
    note: 'Store time in UTC. Format it at the very last moment. Learned that one the hard way.',
    title: 'Consumer Booking & Payments Platform',
    problem: [
      'Inconsistent UI between web and mobile, with duplicated components drifting apart.',
      'Booking slot bugs — double-selection and stale availability under concurrent use.',
      'UTC display errors: slots rendered in the wrong local time across devices.',
    ],
    solution: [
      'Re-engineered slot-selection logic around a single UTC source of truth, formatting only at the edge.',
      'Built a state-machine payment pipeline (QR generation → REST polling → confirmation) with explicit, recoverable states.',
      'Unified the component architecture so Web and React Native share logic, hooks and typed contracts.',
    ],
    outcomes: ['Zero payment discrepancies', '100% timezone cases resolved', 'Single shared component model'],
    arch: [
      { label: 'Web / RN Client', sub: 'shared hooks' },
      { label: 'Slot Engine', sub: 'UTC-normalized' },
      { label: 'Payment FSM', sub: 'QR + polling' },
      { label: 'Node.js API', sub: 'REST' },
      { label: 'Prisma → SQL', sub: 'source of truth' },
    ],
    tech: ['React.js', 'React Native', 'Node.js', 'Prisma', 'REST APIs', 'Tailwind CSS'],
  },
  {
    id: 'lowcode',
    index: '02',
    kicker: 'Internal Platform',
    note: 'The hard part wasn’t the engine — it was deciding what NOT to make configurable.',
    title: 'Low-Code JSON UI Generation Engine',
    problem: [
      'Every internal team needed custom interface modules, and each one queued behind engineering.',
      'Hand-built screens repeated the same forms, tables and validation logic with subtle differences.',
    ],
    solution: [
      'Designed a JSON-driven configuration engine: a schema describes layout, fields, bindings and actions.',
      'Shared-memory state management lets any rendered component read and write a common store.',
      'Dynamic function resolution maps string references in config (e.g. "onSubmit": "fn.saveBooking") to registered handlers at runtime.',
    ],
    outcomes: ['40% less custom UI dev time', 'Config-first delivery', 'Typed, reusable primitives'],
    arch: [
      { label: 'JSON Config', sub: 'schema-validated' },
      { label: 'Parser', sub: 'type-safe nodes' },
      { label: 'Fn Resolver', sub: 'runtime registry' },
      { label: 'Shared Store', sub: 'memory state' },
      { label: 'React Renderer', sub: 'component map' },
    ],
    tech: ['TypeScript', 'React.js', 'Shared Memory State', 'JSON Schema'],
  },
]

export type SkillCat = 'frontend' | 'backend' | 'tools'
export const SKILLS: { name: string; cat: SkillCat; note: string }[] = [
  { name: 'React.js', cat: 'frontend', note: 'Hooks, context, render perf' },
  { name: 'React Native', cat: 'frontend', note: 'iOS + Android, shared logic' },
  { name: 'Next.js', cat: 'frontend', note: 'SSR, routing, SEO' },
  { name: 'TypeScript', cat: 'frontend', note: 'Typed contracts end-to-end' },
  { name: 'JavaScript (ES6+)', cat: 'frontend', note: 'Async, modules, closures' },
  { name: 'Material UI', cat: 'frontend', note: 'Theming, design systems' },
  { name: 'HTML5 / CSS3', cat: 'frontend', note: 'Semantic, accessible markup' },
  { name: 'Responsive Architecture', cat: 'frontend', note: 'Mobile-first layouts' },
  { name: 'Node.js', cat: 'backend', note: 'Service & API layer' },
  { name: 'RESTful API Design', cat: 'backend', note: 'Contracts, polling, idempotency' },
  { name: 'Prisma ORM', cat: 'backend', note: 'Schema, migrations, queries' },
  { name: 'PostgreSQL', cat: 'backend', note: 'Relational modelling' },
  { name: 'Relational Databases (RDBMS)', cat: 'backend', note: 'Normalization, indexing' },
  { name: 'Git / GitHub', cat: 'tools', note: 'PR reviews, branching' },
  { name: 'Docker', cat: 'tools', note: 'Reproducible environments' },
  { name: 'CI/CD', cat: 'tools', note: 'Automated build & deploy' },
  { name: 'Agile / Scrum', cat: 'tools', note: 'Standups, sprints, specs' },
  { name: 'Payment Gateways (Stripe/Razorpay)', cat: 'tools', note: 'QR, webhooks, reconciliation' },
  { name: 'Performance Optimization', cat: 'tools', note: 'Memoization, bundle size' },
  { name: 'Cross-Platform Debugging', cat: 'tools', note: 'Web ↔ mobile parity' },
]

export const EXPERIENCE = [
  {
    company: 'Gove Technologies',
    role: 'Software Engineer',
    period: 'Jul 2023 — Present',
    current: true,
    summary: 'Owning frontend, mobile and full-stack delivery for consumer and enterprise products.',
    points: [
      ['Architected', 'a JSON-driven low-code UI framework with shared-memory state and dynamic function resolution — cutting custom UI development time by 40%.'],
      ['Engineered', 'a state-machine payment pipeline (QR + REST polling) across Web and React Native with zero reconciliation discrepancies.'],
      ['Spearheaded', 'the platform-wide fix for UTC/timezone edge cases, standardizing on UTC storage and edge-only formatting.'],
      ['Optimized', 'slot-selection logic and shared component architecture to remove booking bugs and cross-platform UI drift.'],
      ['Collaborated', 'in Agile sprints and daily standups; authored technical specs and partnered with product, QA and backend engineers.'],
    ] as [string, string][],
    tags: ['React.js', 'React Native', 'Node.js', 'Prisma', 'TypeScript'],
  },
  {
    company: 'Zoho Corporation',
    role: 'Software Development',
    period: 'Aug 2022',
    current: false,
    summary: 'Early-career engineering experience inside one of India’s largest product companies.',
    points: [
      ['Built', 'UI modules within a large-scale product codebase, following established engineering and review standards.'],
      ['Learned', 'enterprise release discipline: code review, testing and working within cross-functional product teams.'],
    ] as [string, string][],
    tags: ['JavaScript', 'HTML/CSS', 'Product Engineering'],
  },
]
