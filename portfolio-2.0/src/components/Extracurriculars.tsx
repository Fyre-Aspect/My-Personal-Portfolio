export default function Extracurriculars() {
  const activities = [
    {
      title: "Push-Pull-Legs Training",
      description: "Structured 6-day training split focusing on progressive overload and compound movements. This disciplined approach to fitness mirrors my methodology in software development - consistent effort, measurable progress, and continuous optimization."
    },
    {
      title: "Open Source Contributions",
      description: "Active contributor to various open-source projects, particularly in the React and Node.js ecosystem. Believe in giving back to the developer community that has taught me so much."
    },
    {
      title: "Tech Community Involvement",
      description: "Regular participant in local developer meetups and hackathons. Enjoy collaborating with other developers and staying current with emerging technologies and best practices."
    },
    {
      title: "Continuous Learning",
      description: "Currently expanding expertise in cloud architecture (AWS), machine learning applications, and advanced React patterns. Always exploring new technologies to stay ahead in the rapidly evolving tech landscape."
    }
  ]

  return (
    <section id="extracurriculars" className="extracurriculars-section">
      <div className="container">
        <h2 className="section-title fade-in-up">Beyond Code</h2>
        
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