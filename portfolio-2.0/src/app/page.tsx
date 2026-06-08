import Navigation from '../components/Navigation'
import SkyScene from '../components/sky/SkyScene'
import CloudHero from '../components/home/CloudHero'
import HomeScroll from '../components/home/HomeScroll'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <Navigation />
      <SkyScene />
      <main className={styles.dashboardWrapper}>
        <CloudHero />
        <div className={styles.contentWrapper}>
          <HomeScroll />
        </div>
      </main>
    </>
  )
}
