import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import SkyBackdropMount from '../../components/sky3d/SkyBackdropMount'
import AchievementGrid from '../../components/achievements/AchievementGrid'
import { achievements } from '../../data/achievements'
import chrome from '../../components/comic/ComicChrome.module.css'

export default function Achievements() {
  return (
    <>
      <Navigation />
      <SkyBackdropMount />
      <div className={chrome.shell}>
        <main className={chrome.page}>
          <div className={chrome.head}>
            <span className={chrome.tag}>// the trophy case</span>
            <h1 className={chrome.title}>Achievements</h1>
            <p className={chrome.subtitle}>
              Milestones across tech, academics, community, and athletics. Hover or
              arrow-key through the panels.
            </p>
            <div className={chrome.hint}>
              <span><kbd>←</kbd><kbd>→</kbd><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
              <span><kbd>E</kbd> open link</span>
            </div>
          </div>

          {achievements.map((cat) => (
            <section key={cat.category} style={{ marginBottom: '4rem' }}>
              <h2 className={chrome.title} style={{ fontSize: 'clamp(26px, 3vw, 36px)', textAlign: 'center', marginBottom: '0.4rem' }}>
                {cat.category}
              </h2>
              <p className={chrome.subtitle} style={{ marginBottom: '2rem' }}>{cat.description}</p>
              <AchievementGrid items={cat.items} />
            </section>
          ))}
        </main>
        <Footer />
      </div>
    </>
  )
}
