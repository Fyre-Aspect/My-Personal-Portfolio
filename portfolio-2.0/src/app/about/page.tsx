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
                Get to know the person behind the projects - my journey, passions, and vision for making a difference
              </p>
            </div>

            <div className="about-grid">
              <div className="about-text">
                <h2>My Story</h2>
                <p>
                  I'm <span className="page-highlight">Aamir Tinwala</span>, a 16-year-old <span className="page-highlight">creative problem-solver</span> and 
                  <span className="page-highlight">Grade 11 IB student</span> from Kitchener, Ontario. 
                </p>
                
                <p>
                  What defines me is my <span className="page-highlight">multidisciplinary approach</span> to learning and growth. 
                  As an IB Programme candidate, I've cultivated <span className="page-highlight">critical thinking</span>, 
                  <span className="page-highlight">cultural awareness</span>, and <span className="page-highlight">ethical reasoning</span> 
                  that shape how I approach every project and interaction.
                </p>

                <h3>Academic Excellence & Leadership</h3>
                <p>
                  Currently excelling in the <span className="page-highlight">International Baccalaureate Programme</span>, 
                  with Higher Level courses in <span className="page-highlight">Mathematics</span>, 
                  <span className="page-highlight">Chemistry</span>, and <span className="page-highlight">Physics</span>. 
                  Beyond academics, I actively participate in <span className="page-highlight">student leadership</span>, 
                  <span className="page-highlight">school teams</span>, and <span className="page-highlight">peer mentoring</span> programs.
                </p>

                <h3>Professional & Volunteer Experience</h3>
                <p>
                  My experience as <span className="page-highlight">Admin Developer</span> at 
                  <span className="page-highlight">Tidal Tasks AI</span> taught me about <span className="page-highlight">startup dynamics</span>, 
                  <span className="page-highlight">project management</span>, and <span className="page-highlight">client communication</span>. 
                  My volunteer work at the <span className="page-highlight">KW Humane Society</span> and internship at the 
                  <span className="page-highlight">University of Waterloo</span> reflect my commitment to 
                  <span className="page-highlight">community impact</span> and <span className="page-highlight">research exploration</span>.
                </p>

                <h3>Beyond the Classroom</h3>
                <p>
                  I'm passionate about <span className="page-highlight"> playing sports</span>, 
                  <span className="page-highlight">working out</span>, and finding ways to pass time efficiently. Whether it's through developing solutions, 
                  participating in <span className="page-highlight">events</span>, or engaging in<span className="page-highlight">community outreach</span>, I believe in using my skills for positive impact.
                </p>
              </div>

              <div className="skills-section">
                <h3>Core Competencies</h3>
                
                <div className="skill-category">
                  <h4>Technical Skills</h4>
                  <div className="skill-tags">
                    <span className="skill-tag">Web Development</span>
                    <span className="skill-tag">Data Analysis</span>
                    <span className="skill-tag">System Design</span>
                    <span className="skill-tag">Research Methods</span>
                    <span className="skill-tag">Digital Tools</span>
                  </div>
                </div>
                
                <div className="skill-category">
                  <h4>Leadership & Communication</h4>
                  <div className="skill-tags">
                    <span className="skill-tag">Project Management</span>
                    <span className="skill-tag">Team Collaboration</span>
                    <span className="skill-tag">Mentoring</span>
                    <span className="skill-tag">Cross-cultural Communication</span>
                  </div>
                </div>
                
                <div className="skill-category">
                  <h4>Creative & Analytical</h4>
                  <div className="skill-tags">
                    <span className="skill-tag">Design Thinking</span>
                    <span className="skill-tag">Strategic Planning</span>
                    <span className="skill-tag">Problem Solving</span>
                    <span className="skill-tag">Creative Writing</span>
                    <span className="skill-tag">Visual Design</span>
                  </div>
                </div>

                <div className="skill-category">
                  <h4>Languages</h4>
                  <div className="skill-tags">
                    <span className="skill-tag">English (Native)</span>
                    <span className="skill-tag">French (Conversational)</span>
                    <span className="skill-tag">Gujarati (Native)</span>
                    <span className="skill-tag">Hindi (Understandable)</span>
                    <span className="skill-tag">Gujarati (Understandable)</span>
                    <span className='skill-tag'>Arabic (Amatuer)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="philosophy-section fade-in-up">
              <h2>My Values & Vision</h2>
              <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                The principles that guide my approach to <span className="page-highlight">learning</span>, 
                <span className="page-highlight">leadership</span>, and <span className="page-highlight">life</span>
              </p>
              
              <div className="philosophy-grid">
                <div className="philosophy-card">
                  <h3>Lifelong Learning</h3>
                  <p>
                    I believe knowledge has no boundaries. Whether it's mastering <span className="page-highlight">new technologies</span>, 
                    understanding <span className="page-highlight">different cultures</span>, or exploring 
                    <span className="page-highlight">interdisciplinary connections</span>, I approach every opportunity with curiosity and dedication.
                  </p>
                </div>
                
                <div className="philosophy-card">
                  <h3>Purpose-Driven Innovation</h3>
                  <p>
                    I focus on creating solutions that matter. Whether developing an app, leading a school initiative, or 
                    volunteering in my community, I ask: "How can this make a <span className="page-highlight">positive difference</span>?" 
                    Impact drives everything I do.
                  </p>
                </div>
                
                <div className="philosophy-card">
                  <h3>Collaboration & Empathy</h3>
                  <p>
                    The best solutions emerge from <span className="page-highlight">diverse perspectives</span> and 
                    <span className="page-highlight">genuine collaboration</span>. I strive to listen actively, 
                    understand different viewpoints, and create <span className="page-highlight">inclusive environments</span> 
                    where everyone can contribute their best work.
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