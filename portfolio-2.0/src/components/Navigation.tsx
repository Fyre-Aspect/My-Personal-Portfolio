'use client'

export default function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <a href="#home" className="logo">
          Aamir Tinwala
        </a>
        
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#extracurriculars">Activities</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}