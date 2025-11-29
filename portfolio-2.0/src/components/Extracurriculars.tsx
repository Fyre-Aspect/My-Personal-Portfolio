export default function Extracurriculars() {
const activities = [
    {
      title: "NeoDev League Hackathon - 3rd Place",
      description: "Secured 3rd place by building <span class='page-highlight'>Shurplus</span>, an AI-powered logistics platform. This win at the <span class='page-highlight'>NeoDev League</span> demonstrates my ability to build <span class='page-highlight'>award-winning solutions</span> under pressure.",
    },
    {
      title: "Soil Testing Internship - University of Waterloo",
      description: "Working on comprehensive <span class='page-highlight'>soil analysis projects</span>, plotting <span class='page-highlight'>stress-strain graphs</span> and testing various soil compositions under different load conditions. This hands-on <span class='page-highlight'>research experience</span> strengthens my <span class='page-highlight'>analytical skills</span> and graph plotting skills on <span class='page-highlight'>MATLAB</span> and attention to detail in <span class='page-highlight'>data collection</span> and interpretation."
    },

    {
      title: "Admin Developer - Tidal Tasks AI",
      description: "Developing and maintaining <span class='page-highlight'>administrative systems</span> for <span class='page-highlight'>AI-powered task management</span> solutions. Working with <span class='page-highlight'>modern web technologies</span> to create efficient, <span class='page-highlight'>user-friendly interfaces</span> while collaborating with <span class='page-highlight'>cross-functional teams</span> in an innovative <span class='page-highlight'>AI startup environment</span>."
    },
  ]

  return (
    <section id="extracurriculars" className="extracurriculars-section">
      <div className="container">
        <h2 className="section-title fade-in-up">Recent Extracurriculars</h2>
        <p className="section-subtitle fade-in-up-delay-1">
          Beyond coding, these experiences shape my approach to <span className="page-highlight">problem-solving</span>, 
          <span className="page-highlight">collaboration</span>, and <span className="page-highlight">continuous learning</span>
        </p>
        
        <div className="activities-grid">
          {activities.map((activity, index) => (
            <div 
              key={index} 
              className={`activity-card fade-in-up-delay-${index + 1}`}
            >
              {activity.image && (
                <div className="activity-image" style={{ marginBottom: '1rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                  <img 
                    src={activity.image} 
                    alt={activity.title}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                </div>
              )}
              <h3 className="activity-title">{activity.title}</h3>
              <p className="activity-description" dangerouslySetInnerHTML={{ __html: activity.description }}></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}