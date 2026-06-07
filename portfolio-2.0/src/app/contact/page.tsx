'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import SkyScene from '../../components/sky/SkyScene'
import styles from './contact.module.css'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navigation />
      <SkyScene />
      <div className={styles.shell}>
        <main className={styles.page}>
          <div className={styles.head}>
            <span className={styles.tag}>// say hello</span>
            <h1 className={styles.title}>Let&apos;s Connect</h1>
            <p className={styles.subtitle}>
              Got an idea, an opportunity, or just want to talk tech?<br />
              I&apos;d love to hear from you.
            </p>
          </div>

          <div className={styles.grid}>
            {/* Left — contact info */}
            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>Reach me at</h2>

              <a href="mailto:aamirtinwala7@gmail.com" className={styles.method}>
                <span className={styles.methodIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </span>
                <div>
                  <span className={styles.methodLabel}>Email</span>
                  <span className={styles.methodValue}>aamirtinwala7@gmail.com</span>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/aamirali-tinwala" target="_blank" rel="noopener noreferrer" className={styles.method}>
                <span className={styles.methodIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"/>
                  </svg>
                </span>
                <div>
                  <span className={styles.methodLabel}>LinkedIn</span>
                  <span className={styles.methodValue}>aamirali-tinwala</span>
                </div>
              </a>

              <a href="https://github.com/Fyre-Aspect" target="_blank" rel="noopener noreferrer" className={styles.method}>
                <span className={styles.methodIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </span>
                <div>
                  <span className={styles.methodLabel}>GitHub</span>
                  <span className={styles.methodValue}>Fyre-Aspect</span>
                </div>
              </a>

              <a href="/Resume.pdf" download className={styles.method}>
                <span className={styles.methodIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-3-8v4H9v-4h6zm-6-2h6v1H9v-1zm0-2h4v1H9V8z"/>
                  </svg>
                </span>
                <div>
                  <span className={styles.methodLabel}>Resume</span>
                  <span className={styles.methodValue}>Download PDF →</span>
                </div>
              </a>
            </div>

            {/* Right — form */}
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>Send a message</h2>

              {submitStatus === 'success' && (
                <div className={styles.statusSuccess}>
                  Message sent! I&apos;ll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className={styles.statusError}>
                  Something went wrong — email me directly instead.
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required disabled={isSubmitting} placeholder="Your name" />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting} placeholder="you@example.com" />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="subject">Subject</label>
                  <input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} required disabled={isSubmitting} placeholder="What's this about?" />
                </div>

                <div className={styles.field}>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required disabled={isSubmitting} placeholder="Tell me more…" />
                </div>

                <button type="submit" className={styles.submit} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Send message →'}
                </button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
