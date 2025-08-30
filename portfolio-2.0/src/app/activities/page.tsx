import Navigation from '../../components/Navigation'

export default function ActivitiesPage() {
  const activities = [
    {
      title: "Push-Pull-Legs Training",
      description: "Structured 6-day training split focusing on progressive overload and compound movements. This disciplined approach to fitness mirrors my methodology in software development - consistent effort, measurable progress, and continuous optimization.",
      details: [
        "6 days per week training schedule",
        "Focus on compound movements",
        "Progressive overload principles",
        "Strength and muscle building",
        "Disciplined approach to improvement"
      ],
      icon: "💪"
    },
    {
      title: "Open Source Contributions",
      description: "Active contributor to various open-source projects, particularly in the React and Node.js ecosystem. Believe in giving back to the developer community that has taught me so much.",
      details: [
        "Regular contributions to React ecosystem",
        "Bug fixes and feature implementations",
        "Documentation improvements",
        "Community support and mentoring",
        "Code reviews and feedback"
      ],
      icon: "🌟"
    },
    {
      title: "Tech Community Involvement",
      description: "Regular participant in local developer meetups and hackathons. Enjoy collaborating with other developers and staying current with emerging technologies and best practices.",
      details: [
        "Local developer meetup attendance",
        "Hackathon participation",
        "Tech conference presentations",
        "Networking with industry professionals",
        "Knowledge sharing sessions"
      ],
      icon: "🤝"
    },
    {
      title: "Continuous Learning",
      description: "Currently expanding expertise in cloud architecture (AWS), machine learning applications, and advanced React patterns. Always exploring new technologies to stay ahead in the rapidly evolving tech landscape.",
      details: [
        "AWS certification pursuits",
        "Machine learning course completion",
        "Advanced React pattern studies",
        "Industry blog and resource consumption",
        "Experimental project development"
      ],
      icon: "📚"
    },
    {
      title: "Fitness Coaching & Mentoring",
      description: "Helping friends and colleagues develop their own fitness routines and achieve their health goals. Apply the same principles of progressive improvement and consistent effort.",
      details: [
        "Personal training guidance",
        "Workout plan development",
        "Nutrition advice and support",
        "Goal setting and tracking",
        "Motivation and accountability"
      ],
      icon: "🏋️"
    },
    {
      title: "Technical Writing",
      description: "Share knowledge through technical blog posts, tutorials, and documentation. Focus on making complex concepts accessible and helping other developers grow.",
      details: [
        "Technical blog post writing",
        "Tutorial creation and sharing",
        "Documentation improvement projects",
        "Code example demonstrations",
        "Best practice guides"
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
                Activities and interests that shape my approach to development and life
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
                    <p className="activity-description">{activity.description}</p>
                    
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
                These activities aren't separate from my development career - they're integral to it. 
                The discipline I've learned from structured fitness training, the collaboration skills 
                from community involvement, and the continuous learning mindset all contribute to making 
                me a better developer and team member.
              </p>
              
              <div className="connection-grid">
                <div className="connection-card">
                  <h3>Discipline → Code Quality</h3>
                  <p>The same discipline that gets me to the gym 6 days a week ensures I write clean, well-tested code consistently.</p>
                </div>
                
                <div className="connection-card">
                  <h3>Community → Collaboration</h3>
                  <p>Active participation in tech communities has honed my ability to work effectively in diverse teams.</p>
                </div>
                
                <div className="connection-card">
                  <h3>Learning → Innovation</h3>
                  <p>Continuous learning keeps me at the forefront of technology, enabling innovative solutions to complex problems.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}