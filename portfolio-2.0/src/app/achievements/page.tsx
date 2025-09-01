import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function Achievements() {
  const achievements = [
    {
      category: "Technical",
      items: [
        {
          title: "Admin Developer at Tidal Tasks AI",
          description: "Leading development of administrative systems for AI-powered task management platform",
          date: "2024",
          icon: "💻"
        },
        {
          title: "Full-Stack Portfolio Development",
          description: "Built and deployed personal portfolio using Next.js, TypeScript, and modern web technologies",
          date: "2024",
          icon: "🌐"
        },
        {
          title: "Hardware Programming",
          description: "Developed IoT Temperature Humidity Sensor using Arduino and C++",
          date: "2024",
          icon: "⚡"
        }
      ]
    },
    {
      category: "Academic",
      items: [
        {
          title: "IB Programme Candidate",
          description: "Currently pursuing International Baccalaureate Programme with focus on STEM subjects",
          date: "2024-Present",
          icon: "🎓"
        },
        {
          title: "Grade 11 High School Student",
          description: "Maintaining academic excellence while pursuing development projects",
          date: "2024-Present",
          icon: "📚"
        },
        {
          title: "Soil Testing Research",
          description: "Conducting comprehensive soil analysis projects at University of Waterloo internship",
          date: "2024",
          icon: "🔬"
        }
      ]
    },
    {
      category: "Community",
      items: [
        {
          title: "100+ Volunteer Hours",
          description: "Dedicated volunteer at KW Humane Society helping with animal care and community outreach",
          date: "2023-2024",
          icon: "🐾"
        },
        {
          title: "Open Source Contributor",
          description: "Contributing to open source projects and maintaining public repositories",
          date: "2023-Present",
          icon: "🔧"
        },
        {
          title: "Mentoring Peers",
          description: "Helping fellow students learn programming and development best practices",
          date: "2024-Present",
          icon: "🤝"
        }
      ]
    },
    {
      category: "Personal Development",
      items: [
        {
          title: "Engineering Mindset",
          description: "Developing systematic problem-solving approach through real-world projects",
          date: "2024",
          icon: "🛠️"
        },
        {
          title: "Continuous Learning",
          description: "Constantly expanding knowledge through online courses, documentation, and practice",
          date: "Ongoing",
          icon: "📈"
        },
        {
          title: "Work-Life Balance",
          description: "Successfully balancing academics, development work, and community involvement",
          date: "2024",
          icon: "⚖️"
        }
      ]
    }
  ]

  return (
    <>
      <Navigation />
      <main className="page-content">
        <section className="achievements-section">
          <div className="container">
            <div className="achievements-hero fade-in-up">
              <h1 className="page-title">Achievements</h1>
              <p className="page-subtitle">
                Milestones and accomplishments that mark my journey as a young developer
              </p>
            </div>

            <div className="achievements-content">
              {achievements.map((category, categoryIndex) => (
                <div key={categoryIndex} className={`achievement-category fade-in-up-delay-${categoryIndex + 1}`}>
                  <h2 className="category-title">{category.category}</h2>
                  
                  <div className="achievements-grid">
                    {category.items.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="achievement-card">
                        <div className="achievement-icon">{achievement.icon}</div>
                        <div className="achievement-content">
                          <h3 className="achievement-title">{achievement.title}</h3>
                          <p className="achievement-description">{achievement.description}</p>
                          <span className="achievement-date">{achievement.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="achievements-reflection fade-in-up-delay-3">
              <div className="reflection-content">
                <h2>Looking Forward</h2>
                <p>
                  These achievements represent just the beginning of my journey. At 16, I'm excited about 
                  the challenges ahead and committed to continuous growth in both technical skills and 
                  personal development. Each milestone teaches me something new about problem-solving, 
                  collaboration, and the impact technology can have on real-world problems.
                </p>
                <p>
                  My goal is not just to accumulate achievements, but to use each experience as a stepping 
                  stone toward becoming a developer who can make meaningful contributions to technology 
                  and society.
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