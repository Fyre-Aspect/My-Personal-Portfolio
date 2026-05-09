import Link from 'next/link';
import styles from './ProjectPreviewStrip.module.css';

export default function ProjectPreviewStrip() {
  return (
    <section className={styles.stripWrapper}>
      <Link href="/projects" className={styles.viewAllLink}>
        View All Projects →
      </Link>
    </section>
  );
}