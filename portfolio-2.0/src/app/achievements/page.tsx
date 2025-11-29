import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function Achievements() {
  const achievements = [
    {
      category: "Technical Development",
      description: "Building foundational programming skills and real-world development experience",
      items: [
        {
          title: "NeoDev League Hackathon - 3rd Place",
          description: "Representing Cameron Heights, our team secured 3rd place by building Shurplus, an AI-powered logistics platform for food rescue. We tackled the problem of 'Inventory Chaos' using intelligent automation agents.",
          date: "2025",
          icon: "",
          image: "/ShurPlus.png",
          growthAspect: "Technical Innovation"
        },
        {
          title: "Admin Developer at Tidal Tasks AI",
          description: "Leading administrative systems development taught me professional coding standards, project management, and how to contribute meaningfully to a tech startup as a student",
          date: "2025-Present",
          icon: "",
          image: "/Tidal Tasks.png",
          growthAspect: "Professional Development"
        },
        {
          title: "Full-Stack Portfolio Development",
          description: "Creating this portfolio from scratch using Next.js and TypeScript enhanced my problem-solving abilities and gave me confidence in modern web development",
          date: "2025-Present",
          icon: "",
          image: "/FullStack.png",
          growthAspect: "Self-Directed Learning"
        },
        {
          title: "Hardware Programming with Arduino",
          description: "Developing IoT sensors using C++ expanded my technical horizons beyond web development and taught me how software interfaces with physical hardware",
          date: "2025-Present",
          icon: "",
          image: "/Arduino Workshop.jpg",
          growthAspect: "Technical Versatility"
        },
        {
          title: "HTML Completion Course",
          description: "Mastering HTML fundamentals provided the foundation for all my web development work and taught me the importance of semantic, accessible code",
          date: "2024",
          icon: "",
          image: "/HTML.png",
          growthAspect: "Foundation Building"
        }
      ]
    },
    {
      category: "Academic Excellence",
      description: "Challenging myself with rigorous coursework and competitive academic programs",
      items: [
        {
          title: "IB Programme Candidate",
          description: "The International Baccalaureate programme is developing my critical thinking, research skills, and global perspective while preparing me for university-level work",
          date: "2023-Present",
          icon: "",
          image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/IB_LOGO.png",
          growthAspect: "Intellectual Rigor"
        },
        {
          title: "Mathematica Competition 2019",
          description: "Participating in this prestigious mathematics competition at a young age sparked my love for problem-solving and analytical thinking",
          date: "2019",
          icon: "",
          image: "/Mathmatica.jpg",
          growthAspect: "Early Achievement"
        },
        {
          title: "Gauss Math Competition Distinction",
          description: "Earning distinction in the Gauss Mathematics Competition validated my mathematical abilities and encouraged me to pursue STEM subjects more seriously",
          date: "2023",
          icon: "",
          image: "/Gauss Math.jpg",
          growthAspect: "Academic Recognition"
        }
      ]
    },
    {
      category: "Community Engagement",
      description: "Contributing to my community while developing empathy and leadership skills",
      items: [
        {
          title: "200+ Hours of Volunteer Hours",
          description: "Volunteering extensively has taught me the value of giving back, developed my empathy, and improved my organizational skills",
          date: "2023-Present",
          icon: "",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToHrK9W35tl3XoMbG1gJVMzdwmWowztb-jYQ&s",
          growthAspect: "Empathy Development"
        },
        {
          title: "Hack the Valley IX - Lyra AI Study Bot",
          description: "36 hours of intense development at my first hackathon resulted in Lyra, an AI Discord bot that revolutionizes group study sessions. Working with the Gemini API, our team built a voice-enabled study companion that answers questions in real-time, tracks focus, and generates automatic summaries and quizzes—transforming chaotic study calls into productive learning experiences",
          date: "2025",
          icon: "",
          image: "/Lyra Bot.jpg",
          growthAspect: "Innovation & Teamwork",
          link: "https://www.linkedin.com/feed/update/urn:li:activity:7381078715910479872",
          github: "https://github.com/Fyre-Aspect/LyraTutorAI"
        },
        {
          title: "University of Waterloo Internship",
          description: "Conducting soil analysis research exposed me to university-level scientific work and taught me proper research methodology and data analysis",
          date: "2024-Present",
          icon: "",
          image: "/UW Pic 2.jpg",
          growthAspect: "Research Experience"
        },
        {
          title: "Community Project Development",
          description: "Working on local technology initiatives has shown me how programming skills can directly benefit my community and solve real problems",
          date: "2023",
          icon: "",
          image: "https://www.qodo.ai/wp-content/uploads/2025/02/Top-10-Developer-Communities-You-Should-Explore-1-1024x687.png",
          growthAspect: "Social Impact"
        }
      ]
    },
    {
      category: "Personal Growth & Athletics",
      description: "Developing resilience, teamwork, and physical wellness through sports and personal challenges",
      items: [
        {
          title: "Badminton Falcon Tournament - 4th Place",
          description: "Competing at tournament level taught me how to perform under pressure, work with a doubles partner, and handle both victories and defeats gracefully",
          date: "2024",
          icon: "",
          image: "/Falcon Badminton.jpg",
          growthAspect: "Competitive Spirit"
        },
        {
          title: "WCCSAA Badminton - 5th Place",
          description: "Regional competition experience showed me the value of consistent practice, team support, and representing my school with pride",
          date: "2025",
          icon: "",
          image: "/wcssaa.png",
          growthAspect: "Team Representation"
        },
        {
          title: "Swimming Certification Completion",
          description: "Achieving all swimming levels developed my persistence, physical fitness, and water safety skills while building confidence in challenging myself",
          date: "2024",
          icon: "",
          image: "/Swimming.jpg",
          growthAspect: "Personal Achievement"
        },
        {
          title: "TDESSAA Cross Country Participant",
          description: "Training for and competing in cross country taught me mental toughness, goal-setting, and how individual effort contributes to team success",
          date: "2022-2023",
          icon: "",
          image: "/Cross Country.jpg",
          growthAspect: "Mental Resilience"
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
              <h1 className="page-title">Growth Through Achievement</h1>
              <p className="page-subtitle">
                How each milestone in my high school journey is shaping me into a well-rounded individual,
                preparing me for future challenges and opportunities
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
                <h2>The Journey of Holistic Development</h2>
                <p className="reflection-intro">
                  Each achievement represents more than just a milestone—it's a building block in my development
                  as a student, community member, and future leader. These experiences are teaching me that true
                  growth comes from challenging yourself across multiple dimensions.
                </p>
                
                <div className="growth-dimensions">
                  <div className="dimension-card">
                    <h3>Technical Mastery</h3>
                    <p>From basic HTML to leading development projects, I'm building the technical foundation needed for a career in technology while learning to work professionally.</p>
                  </div>
                  
                  <div className="dimension-card">
                    <h3>Academic Rigor</h3>
                    <p>The IB programme and mathematics competitions are preparing me for university-level thinking and teaching me how to excel in challenging academic environments.</p>
                  </div>
                  
                  <div className="dimension-card">
                    <h3>Community Leadership</h3>
                    <p>Through volunteering and mentoring, I'm discovering how to contribute meaningfully to others' lives while developing empathy and communication skills.</p>
                  </div>
                  
                  <div className="dimension-card">
                    <h3>Personal Resilience</h3>
                    <p>Athletic competitions and personal challenges are building mental toughness, teaching me to handle pressure, and showing me the value of consistent effort.</p>
                  </div>
                </div>

                <div className="future-vision">
                  <h3>Building Tomorrow's Foundation Today</h3>
                  <p>
                    These achievements aren't just about recognition—they're about becoming the kind of person who can tackle 
                    complex problems, lead teams effectively, and make a positive impact on the world. Each challenge I take on 
                    now is preparing me for the greater challenges and opportunities that lie ahead in university and beyond.
                  </p>
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