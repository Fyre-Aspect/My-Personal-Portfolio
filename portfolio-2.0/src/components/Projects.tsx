export default function Projects() {
  const projects = [
    {
      title: "Portfolio Website",
      description: "This very website! Built to showcase my journey as a young developer, featuring modern design principles, smooth animations, and responsive layouts. Created to demonstrate my technical skills and passion for web development while still in high school.",
      technologies: ["Next.js", "TypeScript", "CSS", "Vercel"],
      liveUrl: "#",
      githubUrl: "https://github.com/Fyre-Aspect/My-Personal-Portfolio",
      motivation: "To establish my digital presence and showcase my growth as a developer"
    },
    {
      title: "Tidal Tasks",
      description: "A comprehensive task management application where I serve as the admin developer. This project showcases my ability to work with modern web technologies and AI integration. Built to help users organize their workflow efficiently with intelligent task suggestions and real-time updates.",
      technologies: ["React", "Gemini API", "Firebase", "TypeScript", "Tailwind CSS", "Vercel"],
      liveUrl: "https://tidaltasks.app",
      githubUrl: "https://github.com/tidaltasksai",
      motivation: "To help out in a startup environment and gain real-world experience as an admin developer",
      role: "Admin Developer"
    },
    {
      title: "Temperature Humidity Sensor",
      description: "An IoT project that demonstrates my versatility beyond web development. Built a smart environmental monitoring system using Arduino and C++, showcasing my ability to work with hardware and embedded systems programming at a young age.",
      technologies: ["C++", "Arduino", "DHT Sensor", "LCD Display", "Electronics"],
      liveUrl: "#",
      githubUrl: "https://github.com/Fyre-Aspect/Temperature-Humidity-Sensor",
      motivation: "To explore hardware programming and understand the intersection of software and physical systems"
    }
  ]

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title fade-in-up">Featured Projects</h2>
        <p className="projects-subtitle fade-in-up-delay-1">
          Building meaningful projects that solve real problems and showcase my growth as a young developer
        </p>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`project-card fade-in-up-delay-${index + 1}`}
            >
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                {project.role && (
                  <span className="project-role">{project.role}</span>
                )}
              </div>
              
              <p className="project-description">{project.description}</p>
              
              <div className="project-motivation">
                <h4>Purpose </h4>
                <p>{project.motivation}</p>
              </div>
              
              <div className="project-tech">
                <h4>Tech Stack:</h4>
                <div className="tech-tags">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="project-links">
                <a href={project.liveUrl} className="project-link">
                  View Project →
                </a>
                <a href={project.githubUrl} className="project-link">
                  Source Code →
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="projects-cta fade-in-up-delay-3">
          <p>These projects represent my journey from curiosity to capability, each one teaching me valuable lessons about development, problem-solving, and the impact technology can have.</p>
        </div>
      </div>
    </section>
  )
}