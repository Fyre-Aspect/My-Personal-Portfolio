'use client'
import { ThemeToggle } from './ThemeProvider'
import Link from 'next/link'
import { useState } from 'react'


export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link href="/" className="logo">
          Aamir Tinwala
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="nav-links">
            <li><Link href="/" onClick={closeMenu}>Home</Link></li>
            <li><Link href="/about" onClick={closeMenu}>About</Link></li>
            <li><Link href="/projects" onClick={closeMenu}>Projects</Link></li>
            <li><Link href="/activities" onClick={closeMenu}>Experiences</Link></li>
            <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
            <li><Link href="/achievements"onClick={closeMenu}>Achievements</Link></li>
            <li><Link href="/blog"onClick={closeMenu}>Blog</Link></li>
            <li><ThemeToggle /></li>  {/* Add this line */}
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
            <li><Link href="/achievements"onClick={closeMenu}>Achievements</Link></li>
            <li><Link href="/blog"onClick={closeMenu}>Blog</Link></li>
            <li><ThemeToggle /></li>  {/* Add this line */}
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