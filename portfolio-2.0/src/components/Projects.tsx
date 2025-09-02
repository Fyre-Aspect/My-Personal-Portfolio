export default function Projects() {
  const projects = [
    {
      title: "Portfolio Website",
      description: "This very website! Built to showcase my journey as a <span class='page-highlight'>young developer</span>, featuring <span class='page-highlight'>modern design principles</span>, <span class='page-highlight'>smooth animations</span>, and <span class='page-highlight'>responsive layouts</span>. Created to demonstrate my <span class='page-highlight'>technical skills</span> and passion for <span class='page-highlight'>web development</span> while still in <span class='page-highlight'>high school</span>.",
      technologies: ["Next.js", "TypeScript", "CSS", "Vercel"],
      liveUrl: "#",
      githubUrl: "https://github.com/Fyre-Aspect/My-Personal-Portfolio",
      motivation: "To establish my <span class='page-highlight'>digital presence</span> and showcase my growth as a developer"
    },
    {
      title: "Tidal Tasks",
      description: "A comprehensive <span class='page-highlight'>task management application</span> where I serve as the <span class='page-highlight'>admin developer</span>. This project showcases my ability to work with <span class='page-highlight'>modern web technologies</span> and <span class='page-highlight'>AI integration</span>. Built to help users organize their workflow efficiently with <span class='page-highlight'>intelligent task suggestions</span> and <span class='page-highlight'>real-time updates</span>.",
      technologies: ["React", "Gemini API", "Firebase", "TypeScript", "Tailwind CSS", "Vercel"],
      liveUrl: "https://tidaltasks.app",
      githubUrl: "https://github.com/tidaltasksai",
      motivation: "To help out in a <span class='page-highlight'>startup environment</span> and gain <span class='page-highlight'>real-world experience</span> as an admin developer",
      role: "Admin Developer"
    },
    {
      title: "Temperature Humidity Sensor",
      description: "An <span class='page-highlight'>IoT project</span> that demonstrates my versatility beyond <span class='page-highlight'>web development</span>. Built a smart <span class='page-highlight'>environmental monitoring system</span> using <span class='page-highlight'>Arduino</span> and <span class='page-highlight'>C++</span>, showcasing my ability to work with <span class='page-highlight'>hardware</span> and <span class='page-highlight'>embedded systems programming</span> at a young age.",
      technologies: ["C++", "Arduino", "DHT Sensor", "LCD Display", "Electronics"],
      liveUrl: "#",
      githubUrl: "https://github.com/Fyre-Aspect/Temperature-Humidity-Sensor",
      motivation: "To explore <span class='page-highlight'>hardware programming</span> and understand the intersection of <span class='page-highlight'>software and physical systems</span>"
    }
  ]

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title fade-in-up">Featured Projects</h2>
        <p className="projects-subtitle fade-in-up-delay-1">
          Building <span className="page-highlight">meaningful projects</span> that solve <span className="page-highlight">real problems</span> and showcase my growth as a <span className="page-highlight">young developer</span>
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
              
              <p className="project-description" dangerouslySetInnerHTML={{ __html: project.description }}></p>
              
              <div className="project-motivation">
                <h4>Purpose</h4>
                <p dangerouslySetInnerHTML={{ __html: project.motivation }}></p>
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
      </div>
    </section>
  )
}