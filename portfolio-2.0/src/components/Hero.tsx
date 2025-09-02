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
          
          {/* Typing Animation with theme colors */}
          <div className="typing-text fade-in-up-delay-1">
            <span>I'm a </span>
            <span className="highlight-text">
              {typedText}
              <span className="typing-cursor"></span>
            </span>
          </div>
          
          {/* Description with highlighted keywords */}
          <p className="hero-description fade-in-up-delay-2">
            At <span className="highlight-keyword">16</span>, I'm passionate about building <span className="highlight-keyword">projects that matter</span>. 
            As a <span className="highlight-keyword">high school student</span>, I bring <span className="highlight-keyword">fresh perspectives</span> to development while maintaining the same 
            commitment to <span className="highlight-keyword">quality</span> and <span className="highlight-keyword">continuous learning</span> that drives me as a successful developer. Every project 
            is an opportunity to <span className="highlight-keyword">grow</span> and make a <span className="highlight-keyword">meaningful impact</span> for me.
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