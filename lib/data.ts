export const PROFILE = {
  name: 'Venugopal',
  role: 'Software Engineer',
  location: 'Tirunelveli, Tamil Nadu, India',
  relocate: 'Open to relocate',
  email: 'venugopal1027517@gmail.com',
  // Update these two with your exact profile URLs
  linkedin: 'https://www.linkedin.com/in/venugopal-annamalai/',   
  github: 'https://github.com/venu78654',
}

export const NAV = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export type Project = {
  id: string
  title: string
  kicker: string
  problem: string[]
  solution: string[]
  outcomes: string[]
  tech: string[]
}

export const PROJECTS: Project[] = [
  {
    id: 'booking',
    kicker: 'Web + React Native',
    title: 'Booking & Payments Platform',
    problem: [
      'The web and mobile UI had drifted apart, with the same components copied in both places.',
      'Booking slots had bugs: double selection and stale availability when many people booked at once.',
      'Slot times showed in the wrong local time on some devices.',
    ],
    solution: [
      'Reworked slot selection to store everything in UTC and only convert to local time when showing it.',
      'Built the payment flow as clear steps (generate QR, poll the API, confirm) so each state can recover on its own.',
      'Moved shared logic, hooks and types so web and React Native use the same code.',
    ],
    outcomes: ['No payment mismatches', 'Timezone bugs fixed', 'One shared component model'],
    tech: ['React.js', 'React Native', 'Node.js', 'Prisma', 'REST APIs', 'Tailwind CSS'],
  },
  {
    id: 'lowcode',
    kicker: 'Internal platform',
    title: 'Low-Code JSON UI Engine',
    problem: [
      'Every internal team needed custom screens, and each one had to wait in the engineering queue.',
      'Forms, tables and validation were rebuilt by hand again and again, with small differences each time.',
    ],
    solution: [
      'Built an engine where a JSON schema describes the layout, fields, bindings and actions.',
      'Added shared-memory state so any rendered component can read and write the same store.',
      'Added dynamic function resolution, so a string in the config (like "fn.saveBooking") maps to a real handler at runtime.',
    ],
    outcomes: ['40% less custom UI dev time', 'Config-first delivery', 'Reusable typed building blocks'],
    tech: ['TypeScript', 'React.js', 'Shared Memory State', 'JSON Schema'],
  },
]

export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Frontend & Mobile', items: ['React.js', 'React Native', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Material UI', 'HTML5 / CSS3', 'Responsive design'] },
  { group: 'Backend & Database', items: ['Node.js', 'REST API design', 'Prisma ORM', 'PostgreSQL', 'Relational databases'] },
  { group: 'Tools & Practices', items: ['Git / GitHub', 'CI/CD', 'Agile / Scrum', 'Payment gateways (Razorpay)', 'Performance optimization', 'Cross-platform debugging'] },
]

// Used for the resume PDF
export const SKILL_CATS = {
  frontend: SKILLS[0].items.join(', '),
  backend: SKILLS[1].items.join(', '),
  tools: SKILLS[2].items.join(', '),
}

export const EXPERIENCE = [
  {
    company: 'Gove Technologies',
    role: 'Software Engineer',
    period: 'Jul 2023 — Present',
    summary: 'Working on frontend, mobile and full-stack features for consumer and enterprise products.',
    points: [
      ['Architected', 'a JSON-driven low-code UI framework with shared-memory state and dynamic function resolution, cutting custom UI development time by 40%.'],
      ['Engineered', 'a state-machine payment pipeline (QR + REST polling) across Web and React Native with zero reconciliation discrepancies.'],
      ['Spearheaded', 'the platform-wide fix for UTC/timezone edge cases, standardizing on UTC storage and edge-only formatting.'],
      ['Optimized', 'slot-selection logic and shared component architecture to remove booking bugs and cross-platform UI drift.'],
      ['Collaborated', 'in Agile sprints and daily standups; wrote technical specs and worked with product, QA and backend engineers.'],
    ] as [string, string][],
    tags: ['React.js', 'React Native', 'Node.js', 'Prisma', 'TypeScript'],
  },
  {
    company: 'Zoho Corporation',
    role: 'Software Development Intern',
    period: 'Aug 2022',
    summary: 'Short internship at a large product company.',
    points: [
      ['Built', 'UI modules inside a large product codebase, following its engineering and review standards.'],
      ['Learned', 'how releases work at scale: code review, testing and working with cross-functional teams.'],
    ] as [string, string][],
    tags: ['JavaScript', 'HTML/CSS'],
  },
]
