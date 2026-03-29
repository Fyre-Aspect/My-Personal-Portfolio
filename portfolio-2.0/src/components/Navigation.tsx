'use client'
import { ThemeToggle } from './ThemeProvider'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { GlassEffect, GlassFilter } from './ui/liquid-glass'

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
    <>
      <GlassFilter />
      <nav className={`glass-navbar ${!isNavVisible ? 'hidden' : ''} ${isScrolled ? 'scrolled' : ''}`}>
        <GlassEffect 
          className="rounded-2xl px-4 py-2 hover:rounded-3xl w-full max-w-6xl mx-auto"
          style={{
            boxShadow: isScrolled 
              ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.15)"
              : "0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="glass-nav-content">
            <Link href="/" className="glass-logo-container" onClick={closeMenu}>
              <img 
                src="/favicon.ico" 
                alt="Aamir Tinwala Logo" 
                className="glass-logo-icon"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="glass-logo">
                Aamir Tinwala
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <ul className="glass-nav-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    onClick={closeMenu}
                    className={`glass-nav-link ${isActiveLink(link.href) ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li><ThemeToggle /></li>
            </ul>

            {/* Mobile Hamburger Button */}
            <button 
              className="glass-mobile-menu-btn"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              <span className={`glass-hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
              <span className={`glass-hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
              <span className={`glass-hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            </button>
          </div>
        </GlassEffect>

        {/* Mobile Navigation Menu */}
        <div className={`glass-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <GlassEffect className="rounded-2xl p-4 mt-2 mx-4">
            <ul className="glass-mobile-nav-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    onClick={closeMenu}
                    className={`glass-nav-link ${isActiveLink(link.href) ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li><ThemeToggle /></li>
            </ul>
          </GlassEffect>
        </div>

        {/* Overlay for mobile menu */}
        {isMenuOpen && (
          <div className="glass-mobile-menu-overlay" onClick={closeMenu}></div>
        )}
      </nav>
    </>
  )
}