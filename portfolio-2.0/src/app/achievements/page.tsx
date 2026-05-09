import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function Achievements() {
  const achievements = [
    {
      category: "Competition Wins",
      description: "Hackathons and engineering competitions where the team placed",
      items: [
        {
          title: "MechMania — 1st Place (Undefeated)",
          description: "Won First Place out of 12 teams at MechMania, an engineering competition building automated puck-shooting mechanisms. Went undefeated through a full ladder tournament. Led the conveyor belt concept and built the controller system from scratch.",
          date: "2026",
          icon: "",
          image: "/Mechmania.jpg",
          growthAspect: "Engineering"
        },
        {
          title: "HackCanada — Top 7th Overall (General Track)",
          description: "Placed Top 7th Overall at HackCanada, a national Canadian hackathon. Built Waypoint — an AI-powered case memory platform for social workers using Next.js, Auth0, Supabase, ElevenLabs, and Google Gemini.",
          date: "2025",
          icon: "",
          image: "https://raw.githubusercontent.com/waypoint9404-ops/hackcanada/main/public/waypoint_pwa_icon_1772889865943.png",
          growthAspect: "Hackathon"
        },
        {
          title: "Hack the Valley IX — Lyra AI Study Bot",
          description: "36-hour hackathon: built an AI Discord bot with voice recognition for group study sessions using Gemini API.",
          date: "2025",
          icon: "",
          image: "/Lyra Bot.jpg",
          growthAspect: "Hackathon",
          link: "https://www.linkedin.com/feed/update/urn:li:activity:7381078715910479872"
        },
        {
          title: "NeoDev League Hackathon — 3rd Place",
          description: "Built Shurplus, an AI-powered logistics platform for food rescue using intelligent automation agents.",
          date: "2025",
          icon: "",
          image: "/ShurPlus.png",
          growthAspect: "Hackathon"
        }
      ]
    },
    {
      category: "Academic Excellence",
      description: "Rigorous coursework and competitive academic programs",
      items: [
        {
          title: "Fermat Mathematics Contest — 101/150",
          description: "Scored 101 out of 150 on the Fermat Mathematics Contest, coming very close to the Distinction threshold. Nationally administered by CEMC at the University of Waterloo.",
          date: "2026",
          icon: "",
          image: "/Gauss Math.jpg",
          growthAspect: "Math"
        },
        {
          title: "IB Programme Candidate",
          description: "Enrolled in the International Baccalaureate programme with focus on critical thinking and research.",
          date: "2023-Present",
          icon: "",
          image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/IB_LOGO.png",
          growthAspect: "IB"
        },
        {
          title: "Gauss Math Competition — Distinction",
          description: "Earned distinction in the Gauss Mathematics Competition, administered by CEMC at the University of Waterloo.",
          date: "2023",
          icon: "",
          image: "/Gauss Math.jpg",
          growthAspect: "Distinction"
        },
        {
          title: "Mathematica Competition 2019",
          description: "Early participant in prestigious mathematics competition.",
          date: "2019",
          icon: "",
          image: "/Mathmatica.jpg",
          growthAspect: "Math"
        }
      ]
    },
    {
      category: "Professional & Community",
      description: "Work experience, research, and volunteer contributions",
      items: [
        {
          title: "Admin Developer at Tidal Tasks AI",
          description: "Building admin systems and contributing features for an AI-powered task management startup.",
          date: "2025-Present",
          icon: "",
          image: "/Tidal Tasks.png",
          growthAspect: "Startup"
        },
        {
          title: "University of Waterloo Internship",
          description: "Conducted soil analysis research with proper scientific methodology and MATLAB data visualization.",
          date: "2024",
          icon: "",
          image: "/UW Pic 2.jpg",
          growthAspect: "Research"
        },
        {
          title: "200+ Volunteer Hours",
          description: "Extensive volunteering across multiple organizations including food banks, animal shelters, and university campuses.",
          date: "2023-Present",
          icon: "",
          image: "/KW Humane.png",
          growthAspect: "Volunteer"
        },
        {
          title: "HTML Completion Course",
          description: "Foundational web development training covering semantic HTML and accessibility.",
          date: "2024",
          icon: "",
          image: "/HTML.png",
          growthAspect: "Certified"
        }
      ]
    },
    {
      category: "Athletics",
      description: "Competitive sports and physical development",
      items: [
        {
          title: "7th Place — WCSAA Tennis Singles",
          description: "Regional tournament placement with 2-0 match record in senior boys singles.",
          date: "2025",
          icon: "",
          image: "/wcssaa.png",
          growthAspect: "Tennis"
        },
        {
          title: "WCCSAA Badminton — 5th Place",
          description: "Regional competition as school team representative.",
          date: "2025",
          icon: "",
          image: "/wcssaa.png",
          growthAspect: "Badminton"
        },
        {
          title: "Badminton Falcon Tournament — 4th Place",
          description: "Tournament-level doubles competition representing Cameron Heights.",
          date: "2024",
          icon: "",
          image: "/Falcon Badminton.jpg",
          growthAspect: "Badminton"
        },
        {
          title: "Swimming Certification",
          description: "Completed all swimming certification levels including lifeguard training.",
          date: "2024",
          icon: "",
          image: "/Swimming.jpg",
          growthAspect: "Swimming"
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
                Milestones across tech, academics, community, and athletics
              </p>
            </div>

            <div className="achievements-content">
              {achievements.map((category, categoryIndex) => (
                <div key={categoryIndex} className={`achievement-category fade-in-up-delay-${categoryIndex + 1}`}>
                  <div className="category-header">
                    <h2 className="category-title">{category.category}</h2>
                    <p className="category-description">{category.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {category.items.map((achievement, achievementIndex) => (
                      <div 
                        key={achievementIndex} 
                        className="achievement-card text-sm"
                        id={achievement.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
                      >
                        {achievement.image && (
                          <div className="achievement-image">
                            <img
                              src={achievement.image}
                              alt={achievement.title}
                              className="card-image"
                            />
                            {achievement.icon && (
                              <div className="image-overlay">
                                <div className="achievement-icon">{achievement.icon}</div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="achievement-content">
                          <div className="achievement-header">
                            <h3 className="achievement-title">{achievement.title}</h3>
                            <span className="growth-badge">{achievement.growthAspect}</span>
                          </div>
                          
                          <p className="achievement-description">{achievement.description}</p>
                          
                          <div className="achievement-footer">
                            <span className="achievement-date">{achievement.date}</span>
                          </div>
                          {achievement.link && (
                            <div className="achievement-links">
                              <a 
                                href={achievement.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="project-link"
                              >
                                LinkedIn Post →
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}