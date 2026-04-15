import Link from 'next/link';
import styles from './ProjectPreviewStrip.module.css';

export default function ProjectPreviewStrip() {
  return (
    <section className={styles.stripWrapper}>
      <div className={styles.cardsContainer}>
        {/* Tidal Tasks Card */}
        <Link href="https://github.com/Fyre-Aspect/TidalTasks" className={styles.card} target="_blank" rel="noopener noreferrer">
          <h3 className={styles.cardTitle}>Tidal Tasks</h3>
          <p className={styles.cardDesc}>
            AI task management platform. Real-time collab & analytics.
          </p>
        </Link>
        
        {/* Shurplus Card */}
        <Link href="https://github.com/Fyre-Aspect/Shurplus" className={styles.card} target="_blank" rel="noopener noreferrer">
          <h3 className={styles.cardTitle}>Shurplus</h3>
          <p className={styles.cardDesc}>
            Food rescue logistics. AI-powered inventory & routing.
          </p>
        </Link>
      </div>
      
      <Link href="/projects" className={styles.viewAllLink}>
        View All Projects →
      </Link>
    </section>
  );
}