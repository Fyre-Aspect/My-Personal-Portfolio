export default function Stats() {
  const stats = [
    { number: '2+', label: 'Years Experience', description: 'Gained 100+ Volunteer Hours' },
    { number: '20+', label: 'Projects Completed', description: 'Building Projects that Matter' },
    { number: '50+', label: 'Commits', description: 'Github Repos' },
    { number: '100%', label: 'Commitment', description: 'To continuous improvement' }
  ]

  return (
    <section className="stats-section">
      <div className="container">
        <h2 className="section-title fade-in-up">By The Numbers</h2>
        
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
      </div>
    </section>
  )
}