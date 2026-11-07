import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Caveat } from 'next/font/google'
import './globals.css'

const sans = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })
const hand = Caveat({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-hand', display: 'swap' })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://venugopal.dev'
const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Venugopal — Software Engineer · React, React Native, Node.js',
  description: 'Software Engineer from Madurai specializing in React.js, React Native and Node.js. Low-code UI frameworks, resilient payment pipelines and scalable enterprise products.',
  authors: [{ name: 'Venugopal' }],
  keywords: ['Venugopal', 'Software Engineer', 'React', 'React Native', 'Next.js', 'Node.js', 'Frontend Developer', 'Madurai'],
  icons: { icon: `${base}/favicon.svg` },
  openGraph: {
    title: 'Venugopal — Software Engineer',
    description: 'Engineering high-impact web & mobile applications with React, React Native and Node.js.',
    images: [`${base}/og.jpg`],
    type: 'website',
  },
}

export const viewport: Viewport = { themeColor: '#0D1117', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${hand.variable}`}>
      <body>{children}</body>
    </html>
  )
}
