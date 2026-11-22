import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const sans = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://venugopal.dev'
const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Venugopal — Software Engineer · React, React Native, Node.js',
  description: 'Software Engineer from Tirunelveli, open to relocate. I work with React.js, React Native and Node.js.',
  authors: [{ name: 'Venugopal' }],
  keywords: ['Venugopal', 'Software Engineer', 'React', 'React Native', 'Next.js', 'Node.js', 'Frontend Developer', 'Tirunelveli'],
  icons: { icon: `${base}/favicon.svg` },
  openGraph: {
    title: 'Venugopal — Software Engineer',
    description: 'Web and mobile apps with React, React Native and Node.js.',
    images: [`${base}/og.jpg`],
    type: 'website',
  },
}

export const viewport: Viewport = { themeColor: '#0D1117', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
