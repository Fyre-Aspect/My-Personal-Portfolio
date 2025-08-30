import Navigation from '../../components/Navigation'

export default function ProjectsPage() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, inventory management, and real-time order tracking. Built with performance and scalability in mind.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Docker", "AWS"],
      features: [
        "User authentication & authorization",
        "Payment processing with Stripe",
        "Real-time order tracking",
        "Admin dashboard for inventory management",
        "Responsive design for all devices"
      ],
      liveUrl: "#",
      githubUrl: "#",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Fitness Tracking App",
      description: "Mobile-responsive web app for tracking workouts, nutrition, and progress. Built with Next.js and integrated with fitness APIs for comprehensive health monitoring. Features data visualization and goal tracking.",
      technologies: ["Next.js", "TypeScript", "MongoDB", "Chart.js", "PWA", "Vercel"],
      features: [
        "Workout and exercise tracking",
        "Nutrition logging and analysis",
        "Progress visualization with charts",
        "Goal setting and achievement tracking",
        "PWA with offline capabilities"
      ],
      liveUrl: "#",
      githubUrl: "#",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Task Management System",
      description: "Collaborative project management tool with real-time updates, file sharing, and team communication features. Optimized for remote team productivity with advanced features like time tracking and reporting.",
      technologies: ["React", "Socket.io", "Express", "Redis", "AWS S3", "JWT"],
      features: [
        "Real-time collaboration",
        "File sharing and storage",
        "Time tracking and reporting",
        "Team communication tools",
        "Advanced project analytics"
      ],
      liveUrl: "#",
      githubUrl: "#",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Portfolio Website",
      description: "This very website! Built with Next.js and custom CSS, featuring smooth animations, responsive design, and optimized performance. Showcases modern web development practices and attention to detail.",
      technologies: ["Next.js", "TypeScript", "CSS", "Vercel", "Git"],
      features: [
        "Fully responsive design",
        "Smooth scroll animations",
        "SEO optimized",
        "Fast loading performance",
        "Custom CSS animations"
      ],
      liveUrl: "#",
      githubUrl: "#",
      image: "/api/placeholder/400/250"
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
                A collection of projects that showcase my skills and passion for development
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
                    <h3 className="project-title">{project.title}</h3>
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
                    
                    <div className="project-links">
                      <a href={project.liveUrl} className="project-link primary">
                        Live Demo →
                      </a>
                      <a href={project.githubUrl} className="project-link secondary">
                        View Code →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}