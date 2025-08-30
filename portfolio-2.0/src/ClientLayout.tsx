'use client'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        
        {/* Scroll to Top Button */}
        <button
          className="scroll-top"
          onClick={scrollToTop}
          title="Scroll to top"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>
      </body>
    </html>
  )
}