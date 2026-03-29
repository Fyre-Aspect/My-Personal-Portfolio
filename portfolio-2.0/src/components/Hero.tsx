// Add this to your Hero.tsx component

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [typedText, setTypedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const texts = [
    "Developer",
    "Lab Assistant",
    "Grade 11 Student", 
    "IB Programme",
  ]

  // Fix mobile viewport height issues
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    // Also set on load for initial render
    window.addEventListener('load', setVH);
    
    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
      window.removeEventListener('load', setVH);
    };
  }, []);

  // Typing animation effect
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
            loading="eager"
            width="200"
            height="200"
          />
          
          {/* Main Heading */}
          <h1>Hey, I'm Aamir</h1>
          <p className="hero-subtitle">hire me pls</p>
          
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
            I'm 16 and in Grade 11 (IB candidate). I build things that matter, recent projects: <span className="highlight-keyword">Shurplus</span> (food rescue app, 3rd at NeoDev Hackathon), <span className="highlight-keyword">Lyra AI Tutor</span> (Discord study bot), and an admin software engineer at <span className="highlight-keyword">Tidal Tasks</span>. I care about clean design and shipping work I'm proud of.
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