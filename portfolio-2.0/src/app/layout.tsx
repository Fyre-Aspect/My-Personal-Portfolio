import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aamir Tinwala - Full-Stack Developer & Fitness Enthusiast',
  description: 'Portfolio of Aamir Tinwala - Full-Stack Developer specializing in React, Next.js, and modern web technologies. Combining technical expertise with disciplined fitness training.',
  keywords: ['Full-Stack Developer', 'React', 'Next.js', 'TypeScript', 'Web Development', 'Fitness'],
  authors: [{ name: 'Aamir Tinwala' }],
  openGraph: {
    title: 'Aamir Tinwala - Full-Stack Developer',
    description: 'Building digital experiences with modern technologies while maintaining peak performance',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}