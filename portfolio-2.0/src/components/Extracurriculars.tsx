export default function Extracurriculars() {
const activities = [
    {
      title: "Soil Testing Internship - University of Waterloo",
      description: "Working on comprehensive soil analysis projects, plotting stress-strain graphs and testing various soil compositions under different load conditions. This hands-on research experience strengthens my analytical skills and graph plotting skills on MatLab and attention to detail in data collection and interpretation."
    },
    {
      title: "Volunteer - KW Humane Society",
      description: "Dedicated volunteer helping with animal care, shelter maintenance, and community outreach programs. This experience has taught me compassion, responsibility, and the importance of giving back to the community while working in team-oriented environments."
    },
    {
      title: "Admin Developer - Tidal Tasks AI",
      description: "Developing and maintaining administrative systems for AI-powered task management solutions. Working with modern web technologies to create efficient, user-friendly interfaces while collaborating with cross-functional teams in an innovative AI startup environment."
    },
  ]

  return (
    <section id="extracurriculars" className="extracurriculars-section">
      <div className="container">
        <h2 className="section-title fade-in-up">Recent Extracurriculars
        </h2>
        
        <div className="activities-grid">
          {activities.map((activity, index) => (
            <div 
              key={index} 
              className={`activity-card fade-in-up-delay-${index + 1}`}
            >
              <h3 className="activity-title">{activity.title}</h3>
              <p className="activity-description">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}