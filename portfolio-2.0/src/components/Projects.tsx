export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, inventory management, and real-time order tracking.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Docker"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Fitness Tracking App",
      description: "Mobile-responsive web app for tracking workouts, nutrition, and progress. Built with Next.js and integrated with fitness APIs for comprehensive health monitoring.",
      technologies: ["Next.js", "TypeScript", "MongoDB", "Chart.js", "PWA"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Task Management System",
      description: "Collaborative project management tool with real-time updates, file sharing, and team communication features. Optimized for remote team productivity.",
      technologies: ["React", "Socket.io", "Express", "Redis", "AWS S3"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ]

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title fade-in-up">Featured Projects</h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`project-card fade-in-up-delay-${index + 1}`}
            >
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="project-tech">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="project-links">
                <a href={project.liveUrl} className="project-link">
                  Live Demo →
                </a>
                <a href={project.githubUrl} className="project-link">
                  GitHub →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}