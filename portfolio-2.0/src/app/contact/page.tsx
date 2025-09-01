'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('https://formspree.io/f/mgvlkbdv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navigation />
      <main className="page-content">
        <section className="contact-page-section">
          <div className="container">
            <div className="contact-hero fade-in-up">
              <h1 className="page-title">Let's Connect</h1>
              <p className="page-subtitle">
                Ready to collaborate on something amazing? Let's discuss how we can work together on 
                <span className="page-highlight">innovative projects</span> and <span className="page-highlight">meaningful solutions</span>.
              </p>
            </div>

            <div className="contact-content">
              <div className="contact-grid">
                <div className="contact-info fade-in-up-delay-1">
                  <h2>Get in Touch</h2>
                  <p>
                    I'm always interested in hearing about new opportunities, interesting projects, 
                    or just connecting with fellow developers and fitness enthusiasts. Whether you 
                    have a project in mind, want to collaborate, or just want to chat about code 
                    and compound movements, I'd love to hear from you!
                  </p>

                  <div className="contact-methods">
                    <div className="contact-method">
                      <div className="method-icon">📧</div>
                      <div>
                        <h3>Email</h3>
                        <a href="mailto:aamirtinwala7@gmail.com">aamirtinwala7@gmail.com</a>
                      </div>
                    </div>

                    <div className="contact-method">
                      <div className="method-icon">💼</div>
                      <div>
                        <h3>LinkedIn</h3>
                        <a href="https://www.linkedin.com/in/aamirali-tinwala" target="_blank" rel="noopener noreferrer">
                          linkedin.com/in/aamirali-tinwala
                        </a>
                      </div>
                    </div>

                    <div className="contact-method">
                      <div className="method-icon">                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg></div>
                      <div>
                        <h3>GitHub</h3>
                        <a href="https://github.com/Fyre-Aspect" target="_blank" rel="noopener noreferrer">
                          Aamir | Fyre-Aspect
                        </a>
                      </div>
                    </div>
                      <div className="contact-method">
                      <div className="method-icon">📞</div>
                      <div>
                        <h3>Phone</h3>
                        <a href="tel:+1 2263390855" target="_blank" rel="noopener noreferrer">
                          Call Me @ 226-339-0855
                        </a>
                      </div>
                    </div>
                  </div>

                  
                </div>

                <div className="contact-form-container fade-in-up-delay-2">
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <h3>Send Me a Message</h3>
                    
                    {submitStatus === 'success' && (
                      <div className="form-status success">
                        <p>Thank you! Your message has been sent successfully. I'll get back to you soon!</p>
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="form-status error">
                        <p>Sorry, there was an error sending your message. Please try again or email me directly.</p>
                      </div>
                    )}
                    
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      ></textarea>
                    </div>

                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="availability-section fade-in-up-delay-3">
              <h2>Current Availability</h2>
              <div className="availability-cards">
                <div className="availability-card">
                  <h3>Freelance Projects</h3>
                  <div className="availability-status available">Available</div>
                  <p>Open to taking on <span className="page-highlight">new freelance projects</span> and <span className="page-highlight">consulting work</span> that align with my skills and interests.</p>
                </div>
                
                <div className="availability-card">
                  <h3>Part-time Opportunities</h3>
                  <div className="availability-status interested">Interested</div>
                  <p>Always interested in discussing exciting <span className="page-highlight">part-time opportunities</span> that offer <span className="page-highlight">learning experiences</span> and growth.</p>
                </div>
                
                <div className="availability-card">
                  <h3>Collaborations</h3>
                  <div className="availability-status available">Available</div>
                  <p>Love collaborating on <span className="page-highlight">open source projects</span> and interesting <span className="page-highlight">side projects</span> with fellow developers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}