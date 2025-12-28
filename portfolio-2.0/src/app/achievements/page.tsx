import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function Achievements() {
  const achievements = [
    {
      category: "Technical Development",
      description: "Building real projects and gaining professional experience",
      items: [
        {
          title: "NeoDev League Hackathon - 3rd Place",
          description: "Built Shurplus, an AI-powered logistics platform for food rescue using intelligent automation agents.",
          date: "2025",
          icon: "",
          image: "/ShurPlus.png",
          growthAspect: "Hackathon"
        },
        {
          title: "Admin Developer at Tidal Tasks AI",
          description: "Building admin systems and contributing features for an AI-powered task management startup.",
          date: "2025-Present",
          icon: "",
          image: "/Tidal Tasks.png",
          growthAspect: "Startup"
        },
        {
          title: "Full-Stack Portfolio Development",
          description: "Designed and built this portfolio from scratch using Next.js and TypeScript.",
          date: "2025-Present",
          icon: "",
          image: "/FullStack.png",
          growthAspect: "Web Dev"
        },
        {
          title: "Hardware Programming with Arduino",
          description: "Developed IoT sensors using C++ for hardware-software integration projects.",
          date: "2025-Present",
          icon: "",
          image: "/Arduino Workshop.jpg",
          growthAspect: "IoT"
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
      category: "Academic Excellence",
      description: "Rigorous coursework and competitive academic programs",
      items: [
        {
          title: "IB Programme Candidate",
          description: "Enrolled in the International Baccalaureate programme with focus on critical thinking and research.",
          date: "2023-Present",
          icon: "",
          image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/IB_LOGO.png",
          growthAspect: "IB"
        },
        {
          title: "Mathematica Competition 2019",
          description: "Early participant in prestigious mathematics competition.",
          date: "2019",
          icon: "",
          image: "/Mathmatica.jpg",
          growthAspect: "Math"
        },
        {
          title: "Gauss Math Competition Distinction",
          description: "Earned distinction in the Gauss Mathematics Competition.",
          date: "2023",
          icon: "",
          image: "/Gauss Math.jpg",
          growthAspect: "Distinction"
        }
      ]
    },
    {
      category: "Community Engagement",
      description: "Contributing to community through volunteer work and projects",
      items: [
        {
          title: "200+ Volunteer Hours",
          description: "Extensive volunteering across multiple organizations including food banks and animal shelters.",
          date: "2023-Present",
          icon: "",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToHrK9W35tl3XoMbG1gJVMzdwmWowztb-jYQ&s",
          growthAspect: "Volunteer"
        },
        {
          title: "Hack the Valley IX - Lyra AI Study Bot",
          description: "36-hour hackathon project: built an AI Discord bot with voice recognition for group study sessions using Gemini API.",
          date: "2025",
          icon: "",
          image: "/Lyra Bot.jpg",
          growthAspect: "Hackathon",
          link: "https://www.linkedin.com/feed/update/urn:li:activity:7381078715910479872",
          github: "https://github.com/Fyre-Aspect/LyraTutorAI"
        },
        {
          title: "University of Waterloo Internship",
          description: "Conducted soil analysis research with proper scientific methodology and MATLAB data visualization.",
          date: "2024-Present",
          icon: "",
          image: "/UW Pic 2.jpg",
          growthAspect: "Research"
        },
        {
          title: "Community Project Development",
          description: "Local technology initiatives using programming to solve community problems.",
          date: "2023",
          icon: "",
          image: "https://www.qodo.ai/wp-content/uploads/2025/02/Top-10-Developer-Communities-You-Should-Explore-1-1024x687.png",
          growthAspect: "Community"
        }
      ]
    },
    {
      category: "Athletics",
      description: "Competitive sports and physical development",
      items: [
        {
          title: "7th Place - WCSAA Tennis Singles",
          description: "Regional tournament placement with 2-0 match record in senior boys singles.",
          date: "2025",
          icon: "",
          image: "/wcssaa.png",
          growthAspect: "Tennis"
        },
        {
          title: "Badminton Falcon Tournament - 4th Place",
          description: "Tournament-level doubles competition representing Cameron Heights.",
          date: "2024",
          icon: "",
          image: "/Falcon Badminton.jpg",
          growthAspect: "Badminton"
        },
        {
          title: "WCCSAA Badminton - 5th Place",
          description: "Regional competition as school team representative.",
          date: "2025",
          icon: "",
          image: "/wcssaa.png",
          growthAspect: "Badminton"
        },
        {
          title: "Swimming Certification",
          description: "Completed all swimming certification levels including lifeguard training.",
          date: "2024",
          icon: "",
          image: "/Swimming.jpg",
          growthAspect: "Swimming"
        },
        {
          title: "TDESSAA Cross Country",
          description: "Trained and competed in regional cross country events.",
          date: "2022-2023",
          icon: "",
          image: "/Cross Country.jpg",
          growthAspect: "Running"
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

            <div className="growth-reflection fade-in-up-delay-3">
              <div className="reflection-content">
                <h2>What I'm Building Toward</h2>
                
                <div className="growth-dimensions">
                  <div className="dimension-card">
                    <h3>Technical Skills</h3>
                    <p>From HTML basics to leading hackathon projects, building a foundation for a career in tech.</p>
                  </div>
                  
                  <div className="dimension-card">
                    <h3>Academic Rigor</h3>
                    <p>IB programme and math competitions preparing me for university-level work.</p>
                  </div>
                  
                  <div className="dimension-card">
                    <h3>Community Impact</h3>
                    <p>200+ volunteer hours and community tech projects.</p>
                  </div>
                  
                  <div className="dimension-card">
                    <h3>Athletics</h3>
                    <p>Competitive tennis, badminton, swimming, and cross country.</p>
                  </div>
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