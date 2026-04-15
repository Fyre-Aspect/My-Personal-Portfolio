import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import ExperienceTimeline from '../../components/ExperienceTimeline'

export default function ActivitiesPage() {
  return (
    <>
      <Navigation />
      <main className="page-content" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <section className="activities-page-section">
          <div className="container">
            <div className="activities-hero fade-in-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h1 className="page-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Experiences</h1>
              <p className="page-subtitle" style={{ color: 'var(--muted-foreground)' }}>
                A timeline of everything I've done beyond the classroom
              </p>
            </div>
            
            <ExperienceTimeline />

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
