import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import SkyScene from '../components/sky/SkyScene'
import CloudHero from '../components/home/CloudHero'
import ProjectGrid from '../components/projects/ProjectGrid'
import ExperienceTimeline from '../components/ExperienceTimeline'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <Navigation />
      <SkyScene />
      <main className={styles.dashboardWrapper}>
        <CloudHero />

        <div className={styles.contentWrapper}>
          <section className={styles.homeSection}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionTag}>// featured work</span>
              <h2 className={styles.sectionTitle}>Projects</h2>
              <p className={styles.sectionSub}>
                Hover a panel or fly through with the arrow keys — then press the
                shown keys to open it.
              </p>
              <div className={styles.legend}>
                <span><kbd>←</kbd><kbd>→</kbd><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
                <span><kbd>E</kbd> demo</span>
                <span><kbd>Q</kbd> code</span>
                <span><kbd>X</kbd> video</span>
              </div>
            </div>
            <ProjectGrid />
          </section>

          <section className={styles.homeSection}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionTag}>// the timeline</span>
              <h2 className={styles.sectionTitle}>Experience</h2>
              <p className={styles.sectionSub}>
                Competitions, internships, and the work that got me here.
              </p>
            </div>
            <ExperienceTimeline />
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
