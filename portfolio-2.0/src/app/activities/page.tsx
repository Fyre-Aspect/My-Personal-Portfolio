import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import CoasterRideMount from '../../components/coaster/CoasterRideMount'
import ExperienceTimeline from '../../components/ExperienceTimeline'
import chrome from '../../components/comic/ComicChrome.module.css'

export default function ActivitiesPage() {
  return (
    <>
      <Navigation />
      <CoasterRideMount />
      <div className={chrome.shell}>
        <main className={chrome.page}>
          <div className={chrome.head}>
            <span className={chrome.tag}>// beyond the classroom — buckle up</span>
            <h1 className={chrome.title}>Experiences</h1>
            <p className={chrome.subtitle}>
              Scroll to ride first-person through everything I&apos;ve done beyond the
              classroom — newest first. Hover any card to read the full story.
            </p>
          </div>

          <ExperienceTimeline />
        </main>
        <Footer />
      </div>
    </>
  )
}
