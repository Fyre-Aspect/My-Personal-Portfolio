import Navigation from '../components/Navigation'
import SkyWorldMount from '../components/sky3d/SkyWorldMount'
import CloudHero from '../components/home/CloudHero'
import HomeScroll from '../components/home/HomeScroll'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <Navigation />
      <SkyWorldMount />
      <main className={styles.dashboardWrapper}>
        <CloudHero />
        <div className={styles.contentWrapper}>
          <HomeScroll />
        </div>
      </main>
    </>
  )
}
