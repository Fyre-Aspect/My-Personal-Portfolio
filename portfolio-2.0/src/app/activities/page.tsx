import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import SkyscraperRideMount from '../../components/skyscraper/SkyscraperRideMount'
import ExperienceTimeline from '../../components/ExperienceTimeline'
import chrome from '../../components/comic/ComicChrome.module.css'
import local from './activities.module.css'

export default function ActivitiesPage() {
  return (
    <>
      <Navigation />
      <SkyscraperRideMount />
      <div className={chrome.shell}>
        <main className={chrome.page}>
          <div className={`${chrome.head} ${local.cyberHead}`}>
            <span className={chrome.tag}>// beyond the classroom — going up</span>
            <h1 className={chrome.title}>Experiences</h1>
            <p className={chrome.subtitle}>
              Scroll to climb the tower — each floor is something I&apos;ve done beyond
              the classroom, newest first. Hover any card to read the full story.
            </p>
          </div>

          <ExperienceTimeline />
        </main>
        <Footer />
      </div>
    </>
  )
}
