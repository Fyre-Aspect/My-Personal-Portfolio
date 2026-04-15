import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'
import ProjectPreviewStrip from '../components/ProjectPreviewStrip'
import Projects from '../components/Projects'
import Extracurriculars from '../components/Extracurriculars'
import Stats from '../components/Stats'
import Footer from '../components/Footer'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className={styles.dashboardWrapper}>
        <div className={styles.pcbGrid}></div>
        <div className={styles.contentWrapper}>
          <HeroSection />
          <Stats />
          <ProjectPreviewStrip />
          <Extracurriculars />
        </div>
      </main>
      <Footer />
    </>
  )
}