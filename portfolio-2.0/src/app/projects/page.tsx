import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import SkyBackdropMount from '../../components/sky3d/SkyBackdropMount'
import ProjectGrid from '../../components/projects/ProjectGrid'
import chrome from '../../components/comic/ComicChrome.module.css'

export default function ProjectsPage() {
  return (
    <>
      <Navigation />
      <SkyBackdropMount />
      <div className={chrome.shell}>
        <main className={chrome.page}>
          <div className={chrome.head}>
            <span className={chrome.tag}>The lineup</span>
            <h1 className={chrome.title}>Projects</h1>
            <p className={chrome.subtitle}>
              Hover a panel or fly through with the arrow keys. Hit the shown
              keys to open it up.
            </p>
            <div className={chrome.hint}>
              <span><kbd>←</kbd><kbd>→</kbd><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
              <span><kbd>E</kbd> demo</span>
              <span><kbd>Q</kbd> code</span>
              <span><kbd>X</kbd> video</span>
            </div>
          </div>

          <ProjectGrid />

          <div className={chrome.cta}>
            <h3>Want to see more?</h3>
            <p>Check out my GitHub for additional projects, experiments, and open-source contributions.</p>
            <a href="https://github.com/Fyre-Aspect" target="_blank" rel="noopener noreferrer" className={chrome.ctaBtn}>
              View More on GitHub →
            </a>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
