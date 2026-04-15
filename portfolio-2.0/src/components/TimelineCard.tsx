import { TimelineEntry } from './ExperienceTimeline';
import styles from './ExperienceTimeline.module.css';

export function TimelineCard({ entry, index }: { entry: TimelineEntry; index: number }) {
  const sideClass = entry.side === 'left' ? styles.left : styles.right;
  const colorClass = entry.color === 'orange' ? styles.orange : styles.gold;

  return (
    <div className={styles.cardContainer}>
      <div className={`${styles.card} ${sideClass} ${colorClass}`}>
        <div className={`${styles.dot} ${colorClass}`}></div>
        <div className={`${styles.connector} ${colorClass}`}></div>
        
        <div className={styles.cardHeader}>
          <span className={styles.dateBadge}>{entry.date}</span>
          <span className={styles.hoursPill}>{entry.hours}</span>
        </div>
        
        <h3 className={styles.title}>{entry.title}</h3>
        <p className={styles.org}>{entry.org}</p>
        
        <p className={styles.hoverDesc}>{entry.description}</p>

        <div className={styles.tagsList}>
          {entry.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}