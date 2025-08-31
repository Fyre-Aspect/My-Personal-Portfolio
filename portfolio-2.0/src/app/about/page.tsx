import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function About() {
  return (
    <>
      <Navigation />
      <div className="page-content">
        <section className="about-section">
          <div className="container">
            <div className="about-hero fade-in-up">
              <h1 className="page-title">About Me</h1>
              <p className="page-subtitle">
                Get to know the person behind the code - my journey, values, and vision for the future
              </p>
            </div>

            <div className="about-grid">
              <div className="about-text">
                <h2>My Journey</h2>
                <p>
                  I'm <span className="page-highlight">Aamir Tinwala</span>, a 16-year-old <span className="page-highlight">full-stack developer</span> and 
                  <span className="page-highlight">Grade 11 IB student</span> from Kitchener, Ontario. My passion for <span className="page-highlight">technology</span> 
                  began early, and I've since dedicated myself to mastering both the <span className="page-highlight">art and science</span> of software development.
                </p>
                
                <p>
                  What sets me apart is my ability to balance <span className="page-highlight">academic excellence</span> with 
                  <span className="page-highlight">practical development skills</span>. As an IB Programme candidate, I've learned to approach problems with 
                  <span className="page-highlight">critical thinking</span> and <span className="page-highlight">global perspective</span>, 
                  skills that translate directly into creating <span className="page-highlight">innovative solutions</span>.
                </p>

                <h3>Education & Development</h3>
                <p>
                  Currently pursuing the <span className="page-highlight">International Baccalaureate Programme</span>, I've developed strong 
                  analytical and research skills. My academic focus includes <span className="page-highlight">Higher Level Mathematics</span>, 
                  <span className="page-highlight">Computer Science</span>, and <span className="page-highlight">Physics</span>, 
                  providing a solid foundation for my <span className="page-highlight">engineering aspirations</span>.
                </p>

                <h3>Technical Expertise</h3>
                <p>
                  My development journey spans across <span className="page-highlight">modern web technologies</span> including 
                  <span className="page-highlight">React</span>, <span className="page-highlight">Next.js</span>, 
                  <span className="page-highlight">TypeScript</span>, and <span className="page-highlight">Node.js</span>. 
                  I've also explored <span className="page-highlight">hardware programming</span> with 
                  <span className="page-highlight">Arduino</span> and <span className="page-highlight">C++</span>, 
                  demonstrating versatility beyond traditional web development.
                </p>

                <h3>Real-World Impact</h3>
                <p>
                  Through my role as <span className="page-highlight">Admin Developer</span> at 
                  <span className="page-highlight">Tidal Tasks AI</span>, I've gained valuable experience in 
                  <span className="page-highlight">startup environments</span> and <span className="page-highlight">AI integration</span>. 
                  My volunteer work at the <span className="page-highlight">KW Humane Society</span> and internship at the 
                  <span className="page-highlight">University of Waterloo</span> reflect my commitment to 
                  <span className="page-highlight">community service</span> and <span className="page-highlight">continuous learning</span>.
                </p>
              </div>

              <div className="skills-section">
                <h3>Technical Skills</h3>
                <div className="skill-category">
                  <h4>Frontend Development</h4>
                  <div className="skill-tags">
                    <span className="skill-tag">React</span>
                    <span className="skill-tag">Next.js</span>
                    <span className="skill-tag">TypeScript</span>
                    <span className="skill-tag">CSS</span>
                    <span className="skill-tag">HTML</span>
                  </div>
                </div>
                
                <div className="skill-category">
                  <h4>Backend & Database</h4>
                  <div className="skill-tags">
                    <span className="skill-tag">Node.js</span>
                    <span className="skill-tag">Firebase</span>
                    <span className="skill-tag">API Integration</span>
                  </div>
                </div>
                
                <div className="skill-category">
                  <h4>Tools & Technologies</h4>
                  <div className="skill-tags">
                    <span className="skill-tag">Git</span>
                    <span className="skill-tag">Vercel</span>
                    <span className="skill-tag">Arduino</span>
                    <span className="skill-tag">C++</span>
                    <span className="skill-tag">MATLAB</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="philosophy-section fade-in-up">
              <h2>My Philosophy</h2>
              <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                The principles that guide my approach to <span className="page-highlight">development</span>, 
                <span className="page-highlight">learning</span>, and <span className="page-highlight">life</span>
              </p>
              
              <div className="philosophy-grid">
                <div className="philosophy-card">
                  <h3>Continuous Growth</h3>
                  <p>
                    I believe in <span className="page-highlight">lifelong learning</span> and constantly pushing my boundaries. 
                    Every project, whether it succeeds or fails, is a <span className="page-highlight">learning opportunity</span> 
                    that contributes to my growth as both a developer and an individual.
                  </p>
                </div>
                
                <div className="philosophy-card">
                  <h3>Quality Over Quantity</h3>
                  <p>
                    Rather than rushing through projects, I focus on creating <span className="page-highlight">meaningful solutions</span> 
                    with <span className="page-highlight">clean code</span>, thoughtful design, and 
                    <span className="page-highlight">real-world impact</span>. Each project reflects my commitment to excellence.
                  </p>
                </div>
                
                <div className="philosophy-card">
                  <h3>Community & Collaboration</h3>
                  <p>
                    Technology is most powerful when it brings people together. Through 
                    <span className="page-highlight">open-source contributions</span>, <span className="page-highlight">volunteer work</span>, 
                    and <span className="page-highlight">mentoring peers</span>, I strive to give back to the community that has taught me so much.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}