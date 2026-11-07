import { PROFILE, EXPERIENCE, PROJECTS, SKILLS } from './data'

// Generates a single-column, text-based (ATS-parsable) PDF entirely in the browser.
export async function downloadResume() {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const W = doc.internal.pageSize.getWidth()
  const H = doc.internal.pageSize.getHeight()
  const M = 48
  let y = M

  const ensure = (h: number) => { if (y + h > H - M) { doc.addPage(); y = M } }
  const text = (s: string, size = 10, style: 'normal' | 'bold' = 'normal', gap = 4, indent = 0) => {
    doc.setFont('helvetica', style); doc.setFontSize(size)
    const lines = doc.splitTextToSize(s, W - M * 2 - indent) as string[]
    for (const l of lines) { ensure(size + gap); doc.text(l, M + indent, y); y += size + gap }
  }
  const heading = (s: string) => {
    y += 8; ensure(24)
    doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(20, 40, 80)
    doc.text(s.toUpperCase(), M, y); y += 5
    doc.setDrawColor(180, 190, 205); doc.line(M, y, W - M, y); y += 14
    doc.setTextColor(20, 20, 20)
  }
  const bullet = (s: string) => {
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10)
    const lines = doc.splitTextToSize(s, W - M * 2 - 14) as string[]
    lines.forEach((l, i) => { ensure(14); if (i === 0) doc.text('•', M + 2, y); doc.text(l, M + 14, y); y += 14 })
  }

  doc.setTextColor(10, 10, 10)
  text(PROFILE.name.toUpperCase(), 20, 'bold', 6)
  text('Software Engineer — React.js · React Native · Node.js', 11, 'normal', 6)
  text(`${PROFILE.email}  |  ${PROFILE.location}  |  ${PROFILE.linkedin.replace('https://', '')}  |  ${PROFILE.github.replace('https://', '')}`, 9, 'normal', 4)

  heading('Summary')
  text('Software Engineer with 2+ years of experience architecting low-code UI frameworks, resilient payment pipelines, and scalable enterprise products across Web and Mobile. Known for high ownership: solving complex cross-platform bugs independently without creating technical debt, and writing code that directly reduces delivery time.', 10, 'normal', 4)

  heading('Experience')
  for (const e of EXPERIENCE) {
    ensure(30)
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10.5)
    doc.text(`${e.role}, ${e.company}`, M, y)
    doc.setFont('helvetica', 'normal'); doc.text(e.period.replace('—', '-'), W - M, y, { align: 'right' })
    y += 15
    for (const [v, rest] of e.points) bullet(`${v} ${rest}`)
    y += 6
  }

  heading('Selected Projects')
  for (const p of PROJECTS) {
    text(`${p.title} (${p.kicker})`, 10.5, 'bold', 5)
    for (const s of p.solution) bullet(s)
    text(`Tech: ${p.tech.join(', ')}`, 9.5, 'normal', 4)
    y += 6
  }

  heading('Key Achievements')
  bullet('40% reduction in custom UI development time via JSON-driven framework architecture.')
  bullet('Zero-discrepancy payment pipelines integrated across Web & Mobile (QR + REST polling).')
  bullet('100% platform-wide resolution of critical cross-platform UTC/timezone edge cases.')
  bullet('Production-grade React.js & React Native applications serving live daily active users.')

  heading('Technical Skills')
  const by = (c: string) => SKILLS.filter((s) => s.cat === c).map((s) => s.name).join(', ')
  text(`Frontend & Mobile: ${by('frontend')}`, 10, 'normal', 5)
  text(`Backend & Data: ${by('backend')}`, 10, 'normal', 5)
  text(`Tools & Workflow: ${by('tools')}`, 10, 'normal', 5)

  doc.setProperties({ title: `${PROFILE.name} — Resume`, subject: 'Software Engineer Resume', author: PROFILE.name, keywords: 'React, React Native, Node.js, TypeScript, Prisma, PostgreSQL' })
  doc.save('Venugopal_Software_Engineer_Resume.pdf')
}
