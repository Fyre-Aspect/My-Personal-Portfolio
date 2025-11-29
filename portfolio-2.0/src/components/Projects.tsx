export default function Projects() {
  const projects = [
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
      title: "Shurplus",
      description: "An end-to-end <span class='page-highlight'>automated logistics platform</span> that acts like a 'Facebook Marketplace' for food rescue. Built to solve the 'Inventory Chaos' faced by food banks, Shurplus connects donors, volunteers, and food banks in one <span class='page-highlight'>AI-powered dashboard</span>.",
      technologies: ["Next.js", "AI Agents", "Logistics Algorithms", "Computer Vision", "Barcode Scanning"],
      liveUrl: "https://shurplus.vercel.app",
      githubUrl: "https://github.com/Fyre-Aspect/ShurPlus-AI",
      motivation: "To solve <span class='page-highlight'>food insecurity</span> through <span class='page-highlight'>intelligent automation</span> and efficient logistics.",
      role: "Full-Stack Developer"
    },
    {
      title: "Lyra AI Tutor",
      description: "An <span class='page-highlight'>intelligent AI study companion</span> that revolutionizes group learning sessions. Lyra joins Discord voice calls to provide <span class='page-highlight'>real-time assistance</span>, keeps discussions focused, and automatically generates study materials.",
      technologies: ["Python", "Discord.py", "Gemini API", "NLP", "Voice Recognition"],
      liveUrl: "https://drive.google.com/file/d/13ddMZT3ef86wQq0UwaW_hvPqQTuHNiIc/view?usp=sharing",
      githubUrl: "https://github.com/Fyre-Aspect/LyraTutorAI",
      motivation: "To transform chaotic <span class='page-highlight'>group study sessions</span> into productive <span class='page-highlight'>learning experiences</span>.",
      role: "Team Lead"
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