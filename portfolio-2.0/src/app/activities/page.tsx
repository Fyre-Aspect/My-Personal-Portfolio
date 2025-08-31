import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function ActivitiesPage() {
  const activities = [
    {
      title: "Soil Testing Internship",
      description: "Structured research experience focusing on <span class='page-highlight'>comprehensive soil analysis</span> and <span class='page-highlight'>data interpretation</span>. This disciplined approach to <span class='page-highlight'>scientific methodology</span> mirrors my methodology in software development - <span class='page-highlight'>consistent effort</span>, <span class='page-highlight'>measurable progress</span>, and <span class='page-highlight'>continuous optimization</span>.",
      details: [
        "Comprehensive soil analysis projects",
        "Stress-strain graph plotting",
        "MATLAB data visualization",
        "Research methodology application",
        "Scientific documentation practices"
      ],
      icon: "🔬"
    },
    {
      title: "KW Humane Society Volunteer",
      description: "Active volunteer contributing to <span class='page-highlight'>animal welfare</span> and <span class='page-highlight'>community outreach</span>. Believe in giving back to the community while developing <span class='page-highlight'>soft skills</span> essential for <span class='page-highlight'>collaborative work environments</span>.",
      details: [
        "Animal care and maintenance",
        "Community outreach programs",
        "Team collaboration projects",
        "Responsibility and compassion development",
        "Public communication skills"
      ],
      icon: "🐾"
    },
    {
      title: "Admin Developer - Tidal Tasks AI",
      description: "Professional development role in a <span class='page-highlight'>startup environment</span>. Leading <span class='page-highlight'>administrative systems development</span> for <span class='page-highlight'>AI-powered solutions</span>, gaining <span class='page-highlight'>real-world experience</span> with <span class='page-highlight'>modern web technologies</span>.",
      details: [
        "Administrative system development",
        "AI integration and optimization",
        "Cross-functional team collaboration",
        "Modern web technology implementation",
        "User experience design principles"
      ],
      icon: "💼"
    },
    {
      title: "Open Source Contributions",
      description: "Regular contributor to various <span class='page-highlight'>open-source projects</span>, particularly in the <span class='page-highlight'>React</span> and <span class='page-highlight'>Node.js ecosystem</span>. Committed to giving back to the <span class='page-highlight'>developer community</span> that has provided invaluable learning opportunities.",
      details: [
        "React ecosystem contributions",
        "Bug fixes and feature implementations",
        "Documentation improvements",
        "Community support and mentoring",
        "Code reviews and collaborative feedback"
      ],
      icon: "🌟"
    },
    {
      title: "Continuous Learning & Development",
      description: "Currently expanding expertise in <span class='page-highlight'>cloud architecture</span>, <span class='page-highlight'>machine learning applications</span>, and <span class='page-highlight'>advanced development patterns</span>. Always exploring <span class='page-highlight'>emerging technologies</span> to stay current in the rapidly evolving tech landscape.",
      details: [
        "Advanced React pattern studies",
        "Cloud architecture exploration",
        "Machine learning fundamentals",
        "Industry resource consumption",
        "Experimental project development"
      ],
      icon: "📚"
    },
    {
      title: "Technical Writing & Knowledge Sharing",
      description: "Share knowledge through <span class='page-highlight'>technical documentation</span>, <span class='page-highlight'>tutorials</span>, and <span class='page-highlight'>best practice guides</span>. Focus on making <span class='page-highlight'>complex concepts accessible</span> and helping other <span class='page-highlight'>young developers</span> grow.",
      details: [
        "Technical blog post creation",
        "Tutorial development and sharing",
        "Documentation improvement projects",
        "Code example demonstrations",
        "Best practice guide development"
      ],
      icon: "✍️"
    }
  ]

  return (
    <>
      <Navigation />
      <main className="page-content">
        <section className="activities-page-section">
          <div className="container">
            <div className="activities-hero fade-in-up">
              <h1 className="page-title">Beyond Code</h1>
              <p className="page-subtitle">
                Activities and interests that shape my approach to <span className="page-highlight">development</span>, 
                <span className="page-highlight">problem-solving</span>, and <span className="page-highlight">continuous growth</span> as a young professional
              </p>
            </div>

            <div className="activities-showcase">
              {activities.map((activity, index) => (
                <div 
                  key={index} 
                  className={`activity-showcase-card fade-in-up-delay-${(index % 3) + 1}`}
                >
                  <div className="activity-icon">
                    {activity.icon}
                  </div>
                  
                  <div className="activity-content">
                    <h3 className="activity-title">{activity.title}</h3>
                    <p className="activity-description" dangerouslySetInnerHTML={{ __html: activity.description }}></p>
                    
                    <div className="activity-details">
                      <h4>What I Do:</h4>
                      <ul>
                        {activity.details.map((detail, detailIndex) => (
                          <li key={detailIndex}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="philosophy-connection fade-in-up-delay-3">
              <h2>The Connection</h2>
              <p>
                These activities aren't separate from my <span className="page-highlight">development career</span> - they're integral to it. 
                The <span className="page-highlight">discipline</span> I've learned from <span className="page-highlight">structured research</span>, 
                the <span className="page-highlight">collaboration skills</span> from <span className="page-highlight">community involvement</span>, 
                and the <span className="page-highlight">continuous learning mindset</span> all contribute to making 
                me a better <span className="page-highlight">developer</span> and <span className="page-highlight">team member</span>.
              </p>
              
              <div className="connection-grid">
                <div className="connection-card">
                  <h3>Research → Code Quality</h3>
                  <p>The same <span className="page-highlight">analytical rigor</span> applied to soil testing ensures I write <span className="page-highlight">clean, well-tested code</span> consistently.</p>
                </div>
                
                <div className="connection-card">
                  <h3>Community → Collaboration</h3>
                  <p>Active participation in <span className="page-highlight">volunteer programs</span> has honed my ability to work effectively in <span className="page-highlight">diverse teams</span>.</p>
                </div>
                
                <div className="connection-card">
                  <h3>Learning → Innovation</h3>
                  <p><span className="page-highlight">Continuous learning</span> keeps me at the forefront of technology, enabling <span className="page-highlight">innovative solutions</span> to complex problems.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}