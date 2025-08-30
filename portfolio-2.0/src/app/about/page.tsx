import Navigation from '../../components/Navigation'

export default function About() {
  return (
    <>
      <Navigation />
      <main className="page-content">
        <section className="about-section">
          <div className="container">
            <div className="about-hero fade-in-up">
              <h1 className="page-title">About Me</h1>
              <p className="page-subtitle">
                Passionate developer, fitness enthusiast, and continuous learner
              </p>
            </div>

            <div className="about-content">
              <div className="about-grid">
                <div className="about-text fade-in-up-delay-1">
                  <h2>My Journey</h2>
                  <p>
                    With over 5 years of experience in full-stack development, I've had the privilege 
                    of working on diverse projects ranging from startup MVPs to enterprise-level applications. 
                    My journey began with a curiosity for how things work and evolved into a passion for 
                    creating digital solutions that make a difference.
                  </p>
                  
                  <p>
                    What sets me apart is my unique approach to development, inspired by my dedication 
                    to fitness and structured training. Just as I follow a disciplined Push-Pull-Legs 
                    routine in the gym, I bring the same methodical approach to software development - 
                    focusing on progressive overload, consistency, and continuous improvement.
                  </p>

                  <h3>Technical Expertise</h3>
                  <p>
                    I specialize in modern web technologies including React, Next.js, Node.js, and 
                    TypeScript. My experience spans across frontend development, backend architecture, 
                    database design, and cloud deployment. I'm passionate about writing clean, 
                    maintainable code and following best practices.
                  </p>
                </div>

                <div className="skills-section fade-in-up-delay-2">
                  <h3>Skills & Technologies</h3>
                  
                  <div className="skill-category">
                    <h4>Frontend</h4>
                    <div className="skill-tags">
                      <span className="skill-tag">React</span>
                      <span className="skill-tag">Next.js</span>
                      <span className="skill-tag">TypeScript</span>
                      <span className="skill-tag">CSS/SCSS</span>
                      <span className="skill-tag">JavaScript</span>
                    </div>
                  </div>

                  <div className="skill-category">
                    <h4>Backend</h4>
                    <div className="skill-tags">
                      <span className="skill-tag">Node.js</span>
                      <span className="skill-tag">Express</span>
                      <span className="skill-tag">PostgreSQL</span>
                      <span className="skill-tag">MongoDB</span>
                      <span className="skill-tag">Redis</span>
                    </div>
                  </div>

                  <div className="skill-category">
                    <h4>Tools & Cloud</h4>
                    <div className="skill-tags">
                      <span className="skill-tag">AWS</span>
                      <span className="skill-tag">Docker</span>
                      <span className="skill-tag">Git</span>
                      <span className="skill-tag">CI/CD</span>
                      <span className="skill-tag">Linux</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="philosophy-section fade-in-up-delay-3">
                <h2>Philosophy & Values</h2>
                <div className="philosophy-grid">
                  <div className="philosophy-card">
                    <h3>Continuous Improvement</h3>
                    <p>
                      Like progressive overload in fitness, I believe in constantly challenging 
                      myself to learn new technologies and improve my craft.
                    </p>
                  </div>
                  
                  <div className="philosophy-card">
                    <h3>Quality Over Quantity</h3>
                    <p>
                      I focus on writing clean, maintainable code that stands the test of time 
                      rather than rushing to deliver subpar solutions.
                    </p>
                  </div>
                  
                  <div className="philosophy-card">
                    <h3>Collaboration</h3>
                    <p>
                      Great software is built by great teams. I value open communication, 
                      knowledge sharing, and collective problem-solving.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}