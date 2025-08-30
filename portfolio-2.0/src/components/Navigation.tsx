'use client'

import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link href="/" className="logo">
          Aamir Tinwala
        </Link>
        
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/activities">Activities</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  )
}