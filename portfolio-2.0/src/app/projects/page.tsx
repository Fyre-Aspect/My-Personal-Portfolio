import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function ProjectsPage() {
const projects = [
  {
    title: "Tidal Tasks",
    description: "A comprehensive task management platform with real-time collaboration, advanced project tracking, and team productivity features. Built with modern web technologies for seamless user experience and optimal performance.",
    role: "Admin Developer",
    technologies: ["React", "Node.js", "TypeScript", "Tailwind CSS", "Gemini API", "Firebase"],
    features: [
      "Real-time task collaboration",
      "Advanced project analytics",
      "Team productivity dashboard",
      "Automated workflow management",
      "Cross-platform synchronization"
    ],
    liveUrl: "https://tidaltasks.app",
    githubUrl: null,
    image: "/Tidal Tasks.png",
    status: null
  },
  {
    title: "Lyra AI Tutor",
    description: "An intelligent AI study companion built during Hack the Valley IX that revolutionizes group learning sessions. Lyra joins Discord voice calls to provide real-time assistance, keeps discussions focused, and automatically generates study materials. Built in 36 hours with the Gemini API to solve the chaos of group study sessions.",
    role: "Full-Stack Developer & Team Lead",
    technologies: [, "Discord.py", "Gemini API", "Natural Language Processing", "Voice Recognition", "AI/ML"],
    features: [
      "Real-time voice Q&A and explanations",
      "Intelligent focus tracking and redirection",
      "Automatic summary generation",
      "AI-powered note-taking system",
      "Dynamic quiz creation from discussions",
      "Multi-user voice channel support"
    ],
    liveUrl: "https://drive.google.com/file/d/13ddMZT3ef86wQq0UwaW_hvPqQTuHNiIc/view?usp=sharing",
    githubUrl: "https://github.com/Fyre-Aspect/LyraTutorAI",
    image: "Tutor Bot.png",
    status: null,
    demoLabel: "Watch Demo"
  },
  {
    title: "Shurplus",
    description: "An end-to-end automated logistics platform that acts like a 'Facebook Marketplace' for food rescue. Built to solve the 'Inventory Chaos' faced by food banks, Shurplus connects donors, volunteers, and food banks in one AI-powered dashboard. Features intelligent Inventory Management Agents and Networking Agents to optimize food rescue operations.",
    role: "Full-Stack Developer",
    technologies: ["Next.js", "AI Agents", "Logistics Algorithms", "Computer Vision", "Barcode Scanning"],
    features: [
      "Inventory Management Agents for FoodBanks",
      "Networking Agent for route optimization",
      "Barcode scanning & image recognition",
      "Real-time donor-volunteer connection",
      "Automated expiry tracking"
    ],
    liveUrl: "https://shurplus.vercel.app",
    githubUrl: "https://github.com/Fyre-Aspect/ShurPlus-AI",
    videoUrl: "https://drive.google.com/file/d/1FZ8oS6N8X4uBfk2XLDgoTzGiVSs1T8UM/view",
    image: "/Shurplus.png",
    status: "Hackathon Win",
    demoLabel: "View Demo"
  },
  {
    title: "CatBot",
    description: "A personalized easy tutor chatbot designed to teach hard concepts in simple terms. It links videos with similar concepts to enhance learning. Built to provide accessible education through AI.",
    role: "Full-Stack Developer",
    technologies: ["AI", "Chatbot", "Gemini API", "Next.js", "Firebase", "TypeScript", "Vercel"],
    features: [
      "Personalized tutoring",
      "Simplified concept explanation",
      "Video resource linking",
      "Interactive chat interface"
    ],
    liveUrl: "https://catgpt-nine.vercel.app",
    githubUrl: "https://github.com/Fyre-Aspect/CatBot",
    image: "/CatBot.png",
    status: null
  },
  {
    title: "Personal Portfolio",
    description: "This very website! A modern, responsive portfolio showcasing my development skills and projects. Built with Next.js and custom CSS, featuring smooth animations, optimized performance, and a cozy fire theme.",
    role: "Full-Stack Developer",
    technologies: ["Next.js", "TypeScript", "CSS", "Vercel", "Git", "Gemini API", "AI"],
    features: [
      "Fully responsive design",
      "Custom CSS animations",
      "Dark/light theme toggle",
      "SEO optimized",
      "Fast loading performance"
    ],
    liveUrl: "https://aamirtinwalapersonal-portfolio.vercel.app",
    githubUrl: "https://github.com/Fyre-Aspect/My-Personal-Portfolio",
    image: "/Website.png",
    status: null
  },
  {
    title: "Arduino Calculator",
    description: "A fully functional physical calculator built with Arduino Uno featuring a 4x4 matrix keypad and 16x2 LCD display. Performs all basic arithmetic operations (addition, subtraction, multiplication, division) with real-time input feedback and result display. Features custom circuit design and efficient algorithm implementation for reliable calculations.",
    role: "Embedded Systems Developer",
    technologies: ["Arduino", "C++", "LCD Display", "Matrix Keypad", "Circuit Design", "Embedded Programming"],
    features: [
      "Full arithmetic operations support",
      "Real-time LCD display feedback",
      "4x4 matrix keypad interface",
      "Efficient calculation algorithms",
      "Error handling and validation",
      "Custom circuit board design",
      "Optimized memory management"
    ],
    liveUrl: null,
    githubUrl: "https://github.com/Fyre-Aspect/Arduino-Calculator",
    image: "/DemoCalc.gif",
    status: null
  },
  {
    title: "Arduino Joystick Controlled Tetris Game",
    description: "An interactive Arduino-based Tetris game controlled with a joystick. Features classic Tetris gameplay mechanics, score tracking, and responsive controls. Demonstrates embedded programming and game development skills.",
    role: "Embedded Developer",
    technologies: ["Arduino", "C++", "LED Matrix", "JavaScript", "Vercel"],
    features: [
      "Classic Tetris gameplay",
      "Joystick control interface",
      "Real-time score tracking",
      "LED matrix display",
      "Responsive game mechanics"
    ],
    liveUrl: "https://arduino-tetris-game.vercel.app",
    githubUrl: "https://github.com/Fyre-Aspect/Arduino-Tetris-Game",
    image: "/Tetris_logo.png",
    status: null
  },
  {
    title: "Gumball Machine Arduino",
    description: "A team-led engineering project creating an automated gumball dispenser using Arduino. Features coin detection, motor control, and user interaction systems. Developed as part of the Engineering Club at school.",
    role: "Team Lead",
    technologies: ["Arduino", "C++", "Sensors", "Motors", "3D Printing"],
    features: [
      "Automated coin detection",
      "Precise motor control system",
      "User-friendly interface",
      "Robust mechanical design",
      "Real-time feedback systems"
    ],
    liveUrl: null,
    githubUrl: "https://github.com/Fyre-Aspect/Gumball-Machine",
    image: "/Gumball Machine.jpg",
    status: null
  },
  {
    title: "Temperature Humidity Logger",
    description: "An Arduino-based environmental monitoring system that logs temperature and humidity data. Features real-time data collection, storage capabilities, and comprehensive environmental tracking for various applications.",
    role: "IoT Developer",
    technologies: ["Arduino", "C++", "DHT Sensor", "Data Logging", "Serial Communication"],
    features: [
      "Real-time data monitoring",
      "Automated data logging",
      "Sensor calibration system",
      "Serial data output",
      "Environmental trend analysis"
    ],
    liveUrl: null,
    githubUrl: "https://github.com/Fyre-Aspect/Temperature-Humidity-Sensor",
    image: "/tempsensor.png",
    status: null
  },
  {
    title: "Simon Says Game",
    description: "An Arduino-based IoT built simon says game made for quicker reflexes and progressive difficulty.",
    role: "IoT Developer",
    technologies: ["Arduino", "C++", "Buttons", "Data Logging", "Serial Communication", "LED Lights"],
    features: [
      "Real-time data monitoring",
      "Automated difficulty increase",
      "difficulty calibration system",
      "Serial data output",
      "High Score tracking"
    ],
    liveUrl: null,
    githubUrl: null,
    image: "/Simon Says.gif",
    status: null
  }
];


  return (
    <>
      <Navigation />
      <main className="page-content">
        <section className="projects-page-section">
          <div className="container">
            <div className="projects-hero fade-in-up">
              <h1 className="page-title">My Projects</h1>
              <p className="page-subtitle">
                A collection of coding projects that showcase my journey in software development, 
                from embedded systems to web applications
              </p>
            </div>

            <div className="projects-showcase">
              {projects.map((project, index) => (
                <div 
                  key={index} 
                  id={project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
                  className={`project-showcase-card fade-in-up-delay-${(index % 3) + 1}`}
                >
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                  </div>
                  
                  <div className="project-content">
                    <div className="project-header">
                      <h3 className="project-title">{project.title}</h3>
                      {project.role && (
                        <span className="project-role">{project.role}</span>
                      )}
                    </div>
                    
                    {project.status && (
                      <div className="project-status">
                        <span className={`status-badge ${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {project.status}
                        </span>
                      </div>
                    )}
                    
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-features">
                      <h4>Key Features:</h4>
                      <ul>
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="project-tech">
                      <h4>Technologies:</h4>
                      <div className="tech-tags">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {(project.liveUrl || project.githubUrl || (project as any).videoUrl) && (
                      <div className="project-links">
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl} 
                            className="project-link primary"
                            target={project.liveUrl === "/" ? "_self" : "_blank"}
                            rel={project.liveUrl === "/" ? "" : "noopener noreferrer"}
                          >
                            {project.demoLabel || (project.liveUrl === "/" ? "View Portfolio" : "Live Demo")} →
                          </a>
                        )}
                        {(project as any).videoUrl && (
                          <a 
                            href={(project as any).videoUrl} 
                            className="project-link secondary"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Watch Video →
                          </a>
                        )}
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl} 
                            className="project-link secondary"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Code →
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* View More on GitHub Card */}
            <div className="github-cta-card fade-in-up">
              <div className="github-cta-content">
                <div className="github-cta-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div className="github-cta-text">
                  <h3>Want to see more?</h3>
                  <p>Check out my GitHub for additional projects, experiments, and open-source contributions.</p>
                </div>
                <a 
                  href="https://github.com/Fyre-Aspect" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="github-cta-button"
                >
                  View More on GitHub →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}