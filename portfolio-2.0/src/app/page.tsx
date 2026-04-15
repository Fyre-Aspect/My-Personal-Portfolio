import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'
import ProjectPreviewStrip from '../components/ProjectPreviewStrip'
import Projects from '../components/Projects'
import Extracurriculars from '../components/Extracurriculars'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="page-content">
        <HeroSection />
        <ProjectPreviewStrip />
        <Extracurriculars />
      </main>
      <Footer />
    </>
  )
}