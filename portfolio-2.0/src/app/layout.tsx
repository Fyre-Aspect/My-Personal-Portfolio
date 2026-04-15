import type { Metadata } from 'next'
import { Poppins, Libre_Baskerville, IBM_Plex_Mono } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import { ThemeProvider } from '../components/ThemeProvider'
import ChatWidget from '@/components/ChatWidget'
import Analytics from '@/components/Analytics'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

const libreBaskerville = Libre_Baskerville({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aamir Tinwala - Full-Stack Developer & Young Innovator',
  description: 'Portfolio of Aamir Tinwala - 16-year-old Full-Stack Developer specializing in React, Next.js, and modern web technologies. Building the future one project at a time.',
  keywords: ['Full-Stack Developer', 'React', 'Next.js', 'TypeScript', 'Web Development', 'Young Developer'],
  authors: [{ name: 'Aamir Tinwala' }],
  openGraph: {
    title: 'Aamir Tinwala - Young Full-Stack Developer',
    description: 'Building digital experiences with modern technologies at 16',
    type: 'website',
  },
  // Add proper viewport meta tag
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light" className={`${poppins.variable} ${libreBaskerville.variable} ${ibmPlexMono.variable}`}>
      <head>
        {/* Ensure proper viewport handling */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Add font-display swap for better loading */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'Poppins-fallback';
              src: local('Arial'), local('Helvetica'), local('sans-serif');
              ascent-override: 92%;
              descent-override: 22%;
              line-gap-override: 0%;
              size-adjust: 105%;
            }
            
            /* Prevent layout shifts during font loading */
            body {
              font-family: 'Poppins-fallback', system-ui, -apple-system, sans-serif;
            }
            
            .fonts-loaded body {
              font-family: var(--font-sans), 'Poppins-fallback', system-ui, -apple-system, sans-serif;
            }
          `
        }} />
      </head>
      <body className={poppins.className}>
        <div className="global-pcb-grid"></div>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        
        {/* AI Chatbot Widget */}
        <ChatWidget />
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        
        {/* Add script to detect when fonts are loaded */}
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('fonts' in document) {
              document.fonts.ready.then(() => {
                document.documentElement.classList.add('fonts-loaded');
              });
            }
          `
        }} />
      </body>
    </html>
  )
}