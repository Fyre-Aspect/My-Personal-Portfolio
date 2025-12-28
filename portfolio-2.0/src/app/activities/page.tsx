import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function ActivitiesPage() {
  const activities = [
    {
      title: "Soil Testing Internship - University of Waterloo",
      hours: "50+ hours",
      description: "Research experience in soil analysis, stress-strain plotting, and MATLAB data visualization under university supervision.",
      details: [
        "Comprehensive soil analysis projects",
        "Stress-strain graph plotting",
        "MATLAB data visualization",
        "Research methodology application",
        "Scientific documentation practices"
      ],
      image: "/UW Pic 1.jpg"
    },
    {
      title: "KW Humane Society Volunteer",
      hours: "15+ hours",
      description: "Animal care, facility maintenance, and community outreach support at the local humane society.",
      details: [
        "Animal care and maintenance",
        "Community outreach programs",
        "Team collaboration projects",
        "Public communication skills"
      ],
      image: "/KW.png"
    },
    {
      title: "Admin Developer - Tidal Tasks AI",
      hours: "30+ hours",
      description: "Building admin systems and features for an AI-powered task management startup.",
      details: [
        "Administrative system development",
        "AI integration and optimization",
        "Cross-functional team collaboration",
        "Modern web technology implementation"
      ],
      image: "/Tidal Tasks.png"
    },
    {
      title: "MLU File Organizer - Martin Luther University",
      hours: "50+ hours",
      description: "Document organization and administrative support in a university office environment.",
      details: [
        "Document organization and filing systems",
        "Office workflow optimization",
        "Professional communication skills",
        "Administrative task management"
      ],
      image: "/Files.png"
    },
    {
      title: "Wilfrid Laurier Distro Volunteer Assistant",
      hours: "20+ hours",
      description: "Inventory management, package handling, and logistics coordination for campus distribution.",
      details: [
        "Inventory restocking and management",
        "Supply chain coordination",
        "Package handling and distribution",
        "Workspace organization"
      ],
      image: "/Distro.jpg"
    },
    {
      title: "Jr. Band - Flute Player",
      hours: "30+ hours",
      description: "Ensemble performance and musical development through school band program.",
      details: [
        "Musical technique development",
        "Ensemble coordination and timing",
        "Performance under pressure",
        "Collaborative artistic creation"
      ],
      image: "/Band.png"
    },
    {
      title: "Tennis Team",
      hours: "90+ hours",
      description: "Competitive school tennis with tournament experience including 7th place WCSAA finish.",
      details: [
        "Strategic game planning",
        "Individual performance optimization",
        "Competitive pressure management",
        "Physical conditioning and technique"
      ],
      image: "https://www.racquetpoint.com/cdn/shop/articles/the-fastest-serves-in-tennis-history-281546.jpg?v=1731795604&width=2048"
    },
    {
      title: "Badminton Team",
      hours: "150+ hours",
      description: "School team badminton with tournament placements including 4th at Falcon Tournament.",
      details: [
        "Rapid decision-making under pressure",
        "Team strategy development",
        "Precision and technical skill refinement",
        "Competitive teamwork dynamics"
      ],
      image: "/Badminton.jpeg"
    },
    {
      title: "Swimming Lifeguard Lessons",
      hours: "80+ hours",
      description: "Complete swimming certification including lifeguard training, CPR, and first aid.",
      details: [
        "Emergency response training",
        "Water safety instruction",
        "CPR and first aid certification",
        "Teaching and communication skills"
      ],
      image: "https://i0.wp.com/blog.myswimpro.com/wp-content/uploads/2023/10/freestyle-stroke-breathing-technique-myswimpro.jpeg?fit=1500%2C1000&ssl=1"
    }
  ]

  return (
    <>
      <Navigation />
      <main className="page-content">
        <section className="activities-page-section">
          <div className="container">
            <div className="activities-hero fade-in-up">
              <h1 className="page-title">Activities</h1>
              <p className="page-subtitle">
                Volunteering, work experience, and athletics
              </p>
            </div>

            <div className="activities-grid">
              {activities.map((activity, index) => (
                <div 
                  key={index} 
                  id={activity.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
                  className={`activity-card fade-in-up-delay-${(index % 3) + 1}`}
                >
                  <div className="activity-image">
                    <img 
                      src={activity.image} 
                      alt={activity.title}
                      loading="lazy"
                    />
                    <div className="hours-badge">{activity.hours}</div>
                  </div>
                  
                  <div className="activity-content">
                    <h3 className="activity-title">{activity.title}</h3>
                    <p className="activity-description" dangerouslySetInnerHTML={{ __html: activity.description }}></p>
                    
                    <div className="activity-details">
                      <h4>Key Learning Areas:</h4>
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
              <h2>Building Versatility Through Diversity</h2>
              <p>
                Each experience represents a different facet of growth - from <span className="page-highlight">technical precision</span> in research labs 
                to <span className="page-highlight">split-second decision-making</span> on sports courts. This diversity of experiences creates a 
                <span className="page-highlight">well-rounded foundation</span> for tackling complex challenges and adapting to new environments. 
                As a student committed to <span className="page-highlight">continuous learning</span>, I actively seek opportunities that push me 
                outside my comfort zone and expand my <span className="page-highlight">skill set</span>.
              </p>
              
              <div className="connection-grid">
                <div className="connection-card">
                  <h3>Research → Analytical Thinking</h3>
                  <p>Laboratory work and data analysis have sharpened my <span className="page-highlight">critical thinking</span> and ability to draw <span className="page-highlight">evidence-based conclusions</span>.</p>
                </div>
                
                <div className="connection-card">
                  <h3>Service → Leadership & Empathy</h3>
                  <p>Volunteer work has developed my <span className="page-highlight">leadership abilities</span> and deepened my understanding of <span className="page-highlight">community impact</span>.</p>
                </div>

                
                <div className="connection-card">
                  <h3>Professional Work → Real-World Application</h3>
                  <p>Workplace experiences bridge <span className="page-highlight">academic theory</span> with <span className="page-highlight">practical implementation</span>, preparing me for future challenges.</p>
                </div>

              </div>
              
              <div className="growth-commitment">
                <h3>Commitment to Growth</h3>
                <p>
                  With over <span className="page-highlight">500+ hours</span> invested across these diverse activities, I've learned that 
                  growth comes from embracing variety. Each new challenge - whether mastering a <span className="page-highlight">flute piece</span>, 
                  organizing complex <span className="page-highlight">filing systems</span>, or developing <span className="page-highlight">emergency response skills</span> - 
                  adds another tool to my problem-solving toolkit. This breadth of experience makes me a more 
                  <span className="page-highlight">adaptable</span>, <span className="page-highlight">resilient</span>, and 
                  <span className="page-highlight">collaborative</span> student ready to tackle whatever comes next.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
