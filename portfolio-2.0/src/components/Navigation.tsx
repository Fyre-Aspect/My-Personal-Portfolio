'use client'
import { ThemeToggle } from './ThemeProvider'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY
      const scrollDifference = lastScrollY - currentScrollY

      // Show navbar when scrolling up significantly (more than 100px) or near top
      if (currentScrollY < 100) {
        setIsNavVisible(true)
      } else if (scrollDifference > 100) {
        setIsNavVisible(true)
      } else if (scrollDifference < -50) {
        // Hide when scrolling down more than 50px
        setIsNavVisible(false)
        setIsMenuOpen(false) // Close mobile menu when hiding navbar
      }

      // Add background when scrolled
      if (currentScrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', controlNavbar, { passive: true })

    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Helper function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  // Navigation links data
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/activities', label: 'Experiences' },
    { href: '/achievements', label: 'Achievements' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className={`navbar ${!isNavVisible ? 'hidden' : ''} ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <Link href="/" className="logo-container" onClick={closeMenu}>
          <img 
            src="/favicon.ico" 
            alt="Aamir Tinwala Logo" 
            className="logo-icon"
            onError={(e) => {
              // Fallback to a default icon or hide the image
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="logo">
            Aamir Tinwala
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href} 
                onClick={closeMenu}
                className={isActiveLink(link.href) ? 'active' : ''}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li><ThemeToggle /></li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button 
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  onClick={closeMenu}
                  className={isActiveLink(link.href) ? 'active' : ''}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li><ThemeToggle /></li>
          </ul>
        </div>

        {/* Overlay for mobile menu */}
        {isMenuOpen && (
          <div className="mobile-menu-overlay" onClick={closeMenu}></div>
        )}
      </div>
    </nav>
  )
}