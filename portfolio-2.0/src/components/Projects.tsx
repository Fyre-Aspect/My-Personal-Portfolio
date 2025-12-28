export default function Projects() {
  const projects = [
    {
      title: "Tidal Tasks",
      description: "Task management app with AI-powered suggestions and real-time updates. I handle admin development and feature implementation.",
      technologies: ["React", "Gemini API", "Firebase", "TypeScript", "Tailwind CSS", "Vercel"],
      liveUrl: "https://tidaltasks.app",
      githubUrl: "https://github.com/tidaltasksai",
      role: "Admin Developer"
    },
    {
      title: "Shurplus",
      description: "Food rescue logistics platform connecting donors, volunteers, and food banks. Uses AI agents for inventory management and route optimization.",
      technologies: ["Next.js", "AI Agents", "Logistics Algorithms", "Computer Vision", "Barcode Scanning"],
      liveUrl: "https://shurplus.vercel.app",
      githubUrl: "https://github.com/Fyre-Aspect/ShurPlus-AI",
      role: "3rd Place - NeoDev Hackathon"
    },
    {
      title: "Lyra AI Tutor",
      description: "Discord bot that joins voice calls to help with group study sessions. Provides real-time Q&A, tracks focus, and generates study materials automatically.",
      technologies: ["Python", "Discord bot API3", "Gemini API", "NLP", "Voice Recognition"],
      liveUrl: "https://drive.google.com/file/d/13ddMZT3ef86wQq0UwaW_hvPqQTuHNiIc/view?usp=sharing",
      githubUrl: "https://github.com/Fyre-Aspect/LyraTutorAI",
      role: "Team Lead"
    }
  ]

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title fade-in-up">Featured Projects</h2>
        <p className="projects-subtitle fade-in-up-delay-1">
          Real projects solving real problems
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
              
              <div className="project-tech">
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