export default function Stats() {
  const stats = [
    { number: '2+', label: 'Years Experience', description: 'Gained 100+ Volunteer Hours' },
    { number: '10+', label: 'Projects Completed', description: 'Building Projects that Matter' },
    { number: '300+', label: 'Commits', description: 'Projects' },

  ]

  const techStack = [
    'JavaScript',
    'Python',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Firebase',
    'MongoDB',
    'Tailwind CSS',
    'Vercel',
    'Google Cloud',
    'Oracle',
    'Snowflake',
    'Flask',
    'Vite',
    'Vue.js',
    'npm',
    'Yarn',
    'Git',
    'GitHub',
    'Jest',
    'Figma',
    'Canva',
    'Windows Terminal',
  ]

  const carouselItems = [...techStack, ...techStack]

  return (
    <section className="stats-section">
      <div className="container">
        <h2 className="section-title fade-in-up">Stats</h2>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`stat-card fade-in-up-delay-${index + 1}`}
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        <div className="tech-stack fade-in-up-delay-4">
          
          <div className="tech-stack-carousel" aria-label="Tech stack carousel">
            <div className="tech-stack-track">
              {carouselItems.map((tech, index) => (
                <span key={`${tech}-${index}`} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
