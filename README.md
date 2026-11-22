# Venugopal — Developer Portfolio

Personal portfolio for **Venugopal**, Software Engineer (React.js · React Native · Node.js), built with
**Next.js 15 (App Router)**, **Tailwind CSS** and a little **Framer Motion**. It exports to a fully static site, so it
runs anywhere: GitHub Pages, Vercel, Netlify or any static host.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static output in ./out
npm start          # serve ./out locally
```

Requires Node.js 18.18+ (20 LTS recommended).

## Where to edit things

| What | File |
| --- | --- |
| Name, email, LinkedIn, GitHub | `lib/data.ts` → `PROFILE` |
| Projects, skills, experience | `lib/data.ts` |
| About text and details box | `components/About.tsx` |
| Resume PDF content | `lib/resume.ts` (generated in the browser) |
| Photo | `public/venugopal-portrait.webp` (keep the same filename, 4:5 ratio) |
| Colors, fonts | `tailwind.config.js`, `app/layout.tsx` |
| SEO title / description | `app/layout.tsx` → `metadata` |

## Project structure

```
app/            layout (fonts, metadata) + page + global styles
components/     one file per section (Hero, About, Projects, …)
lib/            content (data.ts), resume generator, UI helpers
public/         photo, favicon, OG image
.github/        GitHub Pages deploy workflow
```

## Deploying

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for step-by-step GitHub Pages and Vercel instructions.
