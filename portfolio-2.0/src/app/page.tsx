import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Projects from '../components/Projects'
import Extracurriculars from '../components/Extracurriculars'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="page-content">
        <Hero />
        <Stats />
        <Projects />
        <Extracurriculars />
      </main>
      <Footer />
    </>
  )
}