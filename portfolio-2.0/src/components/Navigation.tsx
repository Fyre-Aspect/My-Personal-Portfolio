'use client'
import { ThemeToggle } from './ThemeProvider'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsNavVisible(true)
      } else {
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
            <li><Link href="/" onClick={closeMenu}>Home</Link></li>
            <li><Link href="/about" onClick={closeMenu}>About</Link></li>
            <li><Link href="/projects" onClick={closeMenu}>Projects</Link></li>
            <li><Link href="/activities" onClick={closeMenu}>Experiences</Link></li>
            <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
            <li><Link href="/achievements" onClick={closeMenu}>Achievements</Link></li>
            <li><Link href="/blog" onClick={closeMenu}>Blog</Link></li>
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
            <li><Link href="/" onClick={closeMenu}>Home</Link></li>
            <li><Link href="/about" onClick={closeMenu}>About</Link></li>
            <li><Link href="/projects" onClick={closeMenu}>Projects</Link></li>
            <li><Link href="/activities" onClick={closeMenu}>Experiences</Link></li>
            <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
            <li><Link href="/achievements" onClick={closeMenu}>Achievements</Link></li>
            <li><Link href="/blog" onClick={closeMenu}>Blog</Link></li>
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