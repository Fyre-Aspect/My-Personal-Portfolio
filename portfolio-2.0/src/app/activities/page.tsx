import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import SkyscraperRideMount from '../../components/skyscraper/SkyscraperRideMount'
import ExperienceTimeline from '../../components/ExperienceTimeline'
import chrome from '../../components/comic/ComicChrome.module.css'

export default function ActivitiesPage() {
  return (
    <>
      <Navigation />
      <SkyscraperRideMount />
      <div className={chrome.shell}>
        <main className={chrome.page}>
          <div className={chrome.head}>
            <span className={chrome.tag}>Beyond the classroom</span>
            <h1 className={chrome.title}>Experiences</h1>
            <p className={chrome.subtitle}>
              A scroll up the tower through everything I&apos;ve done beyond the
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
