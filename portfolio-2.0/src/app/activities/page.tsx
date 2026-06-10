import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import SkyBackdropMount from '../../components/sky3d/SkyBackdropMount'
import ExperienceTimeline from '../../components/ExperienceTimeline'
import chrome from '../../components/comic/ComicChrome.module.css'

export default function ActivitiesPage() {
  return (
    <>
      <Navigation />
      <SkyBackdropMount />
      <div className={chrome.shell}>
        <main className={chrome.page}>
          <div className={chrome.head}>
            <span className={chrome.tag}>// beyond the classroom</span>
            <h1 className={chrome.title}>Experiences</h1>
            <p className={chrome.subtitle}>
              A timeline of everything I&apos;ve done beyond the classroom. Hover any
              card to read the full story.
            </p>
          </div>

          <ExperienceTimeline />
        </main>
        <Footer />
      </div>
    </>
  )
}
