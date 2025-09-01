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
      title: "Personal Portfolio",
      description: "This very website! A modern, responsive portfolio showcasing my development skills and projects. Built with Next.js and custom CSS, featuring smooth animations, optimized performance, and a cozy fire theme.",
      role: "Full-Stack Developer",
      technologies: ["Next.js", "TypeScript", "CSS", "Vercel", "Git"],
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
      image: "/gumball machine.jpg",
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
      title: "Arduino Calculator",
      description: "A functional calculator built with Arduino featuring a keypad interface and LCD display. Supports basic arithmetic operations with a clean user interface and responsive button interactions.",
      role: "Embedded Developer",
      technologies: ["Arduino", "C++", "LCD Display", "Keypad", "Circuit Design"],
      features: [
        "Basic arithmetic operations",
        "LCD display interface",
        "Responsive keypad input",
        "Error handling system",
        "Clean circuit design"
      ],
      liveUrl: null,
      githubUrl: null,
      image: "/calculator png.png",
      status: "Complete - No Demo Available"
    },
    {
      title: "Personal Expense Tracker",
      description: "A comprehensive expense tracking application designed to help users manage their finances effectively. Currently in the prototyping phase with features for budget management, expense categorization, and financial insights.",
      role: "Full-Stack Developer",
      technologies: ["React", "Node.js", "MongoDB", "Chart.js", "Express"],
      features: [
        "Expense categorization system",
        "Budget tracking and alerts",
        "Financial insights dashboard",
        "Data visualization charts",
        "Secure user authentication"
      ],
      liveUrl: null,
      githubUrl: null,
      image: "/Expense Tracker.png",
      status: "Prototyping"
    },
    {
      title: "Random Quote Generator API",
      description: "An uplifting quote generator API designed to improve mood and provide daily inspiration. Currently in development with features for categorized quotes, mood-based recommendations, and daily quote delivery.",
      role: "Backend Developer",
      technologies: ["Node.js", "Express", "MongoDB", "REST API", "JWT"],
      features: [
        "Mood-based quote selection",
        "Daily inspiration delivery",
        "Quote categorization system",
        "User preference tracking",
        "RESTful API endpoints"
      ],
      liveUrl: null,
      githubUrl: null,
      image: "/Quote Gen.jpg",
      status: "In Progress"
    }
  ]

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
                    
                    {(project.liveUrl || project.githubUrl) && (
                      <div className="project-links">
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl} 
                            className="project-link primary"
                            target={project.liveUrl === "/" ? "_self" : "_blank"}
                            rel={project.liveUrl === "/" ? "" : "noopener noreferrer"}
                          >
                            {project.liveUrl === "/" ? "View Portfolio" : "Live Demo"} →
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}