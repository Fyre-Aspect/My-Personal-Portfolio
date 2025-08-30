'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // You can integrate with your preferred form handling service
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
                Ready to collaborate on something amazing? Let's discuss how we can work together.
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
                        <a href="mailto:aamir@example.com">aamir@example.com</a>
                      </div>
                    </div>

                    <div className="contact-method">
                      <div className="method-icon">💼</div>
                      <div>
                        <h3>LinkedIn</h3>
                        <a href="https://linkedin.com/in/aamir-tinwala" target="_blank" rel="noopener noreferrer">
                          linkedin.com/in/aamir-tinwala
                        </a>
                      </div>
                    </div>

                    <div className="contact-method">
                      <div className="method-icon">🐙</div>
                      <div>
                        <h3>GitHub</h3>
                        <a href="https://github.com/aamir-tinwala" target="_blank" rel="noopener noreferrer">
                          github.com/aamir-tinwala
                        </a>
                      </div>
                    </div>

                    <div className="contact-method">
                      <div className="method-icon">🐦</div>
                      <div>
                        <h3>Twitter</h3>
                        <a href="https://twitter.com/aamir_tinwala" target="_blank" rel="noopener noreferrer">
                          @aamir_tinwala
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contact-form-container fade-in-up-delay-2">
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <h3>Send Me a Message</h3>
                    
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
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
                      ></textarea>
                    </div>

                    <button type="submit" className="submit-button">
                      Send Message
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
                  <p>Open to taking on new freelance projects and consulting work.</p>
                </div>
                
                <div className="availability-card">
                  <h3>Full-time Opportunities</h3>
                  <div className="availability-status interested">Interested</div>
                  <p>Always interested in discussing exciting full-time opportunities.</p>
                </div>
                
                <div className="availability-card">
                  <h3>Collaborations</h3>
                  <div className="availability-status available">Available</div>
                  <p>Love collaborating on open source projects and interesting side projects.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}