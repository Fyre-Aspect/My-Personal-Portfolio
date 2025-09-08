import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en">
      <head>
        {/* Ensure proper viewport handling */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        {/* Add font-display swap for better loading */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'Inter-fallback';
              src: local('Arial'), local('Helvetica'), local('sans-serif');
              ascent-override: 90%;
              descent-override: 22%;
              line-gap-override: 0%;
              size-adjust: 107%;
            }
            
            /* Prevent layout shifts during font loading */
            body {
              font-family: 'Inter-fallback', system-ui, -apple-system, sans-serif;
            }
            
            .fonts-loaded body {
              font-family: 'Inter', 'Inter-fallback', system-ui, -apple-system, sans-serif;
            }
          `
        }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        
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