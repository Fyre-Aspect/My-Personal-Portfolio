'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [typedText, setTypedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const texts = [
    "Full-Stack Developer",
    "Fitness Enthusiast", 
    "Problem Solver",
    "Tech Innovator"
  ]

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentText = texts[currentIndex]
      
      if (!isDeleting) {
        if (typedText.length < currentText.length) {
          setTypedText(currentText.slice(0, typedText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentText.slice(0, typedText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [typedText, currentIndex, isDeleting, texts])

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content fade-in-up">
          {/* Profile Image */}
          <img 
            src="/api/placeholder/200/200" 
            alt="Aamir Tinwala"
            className="profile-image"
          />
          
          {/* Main Heading */}
          <h1>Hi, I'm Aamir</h1>
          
          {/* Typing Animation */}
          <div className="typing-text fade-in-up-delay-1">
            <span>I'm a </span>
            <span style={{ color: '#60a5fa', fontWeight: '600' }}>
              {typedText}
              <span className="typing-cursor"></span>
            </span>
          </div>
          
          {/* Description */}
          <p className="hero-description fade-in-up-delay-2">
            Passionate about building exceptional digital experiences with modern technologies. 
            I combine technical expertise with the discipline and dedication I've developed 
            through structured fitness training, bringing the same commitment to progressive 
            improvement to every project I work on.
          </p>
          
          {/* CTA Buttons */}
          <div className="fade-in-up-delay-3" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="#projects"
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)'
              }}
            >
              View My Work
            </a>
            
            <a 
              href="#contact"
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                border: '2px solid #475569',
                color: '#cbd5e1',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.5)'
                e.currentTarget.style.borderColor = '#60a5fa'
                e.currentTarget.style.color = '#60a5fa'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.borderColor = '#475569'
                e.currentTarget.style.color = '#cbd5e1'
              }}
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}