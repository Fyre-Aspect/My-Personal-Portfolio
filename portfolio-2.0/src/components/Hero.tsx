// Add this to your Hero.tsx component

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
            // Add explicit dimensions to prevent layout shift
            width="200"
            height="200"
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
            I'm <span className="highlight-keyword">16</span> and in <span className="highlight-keyword">Grade 11</span> (IB candidate). I like building things people can actually use.
            I've worked as an <span className="highlight-keyword">Admin Developer</span> on <span className="highlight-keyword">Tidal Tasks</span> (task management), built <span className="highlight-keyword">Shurplus</span>
            (food rescue logistics — <span className="highlight-keyword">3rd place</span> at a hackathon), and led <span className="highlight-keyword">Lyra AI Tutor</span> (a <span className="highlight-keyword">Discord</span> study bot).
            I care about simple, clear experiences — and shipping projects I'm proud to show.
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