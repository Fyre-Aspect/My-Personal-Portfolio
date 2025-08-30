'use client'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              AT
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-slate-300 hover:text-white transition-colors">Home</a>
              <a href="#about" className="text-slate-300 hover:text-white transition-colors">About</a>
              <a href="#projects" className="text-slate-300 hover:text-white transition-colors">Projects</a>
              <a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact</a>
            </div>
            <div className="md:hidden">
              <button className="text-slate-300 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {children}
      </div>

      {/* Scroll to Top Button */}
      <button
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 opacity-90 hover:opacity-100"
        onClick={scrollToTop}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </>
  )
}