'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [typedText, setTypedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const texts = [
    "Full-Stack Developer",
    "Grade 11 Highschool Student", 
    "IB Programme Candidate",
    "Engineering Enthusiast",
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
            src="/Aamir Pic.jpg" 
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
             At 16, I'm passionate about building projects that matter. 
            As a high school student, I bring fresh perspectives to development while maintaining the same 
            commitment to quality and continuous learning that drives me as a successful developer. Every project 
            is an opportunity to grow and make a meaningful impact for me.
          </p>
          
          {/* CTA Buttons */}
          <div className="fade-in-up-delay-3" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              href="/projects"
              className="cta-button primary"
            >
              View My Work
            </Link>
            
            <Link 
              href="/contact"
              className="cta-button secondary"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}