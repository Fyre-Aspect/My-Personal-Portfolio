'use client';

import { useEffect, useRef, useState } from 'react';
import { TimelineEntry } from './ExperienceTimeline';
import styles from './ExperienceTimeline.module.css';

export function TimelineCard({ entry, index }: { entry: TimelineEntry; index: number }) {
  const sideClass = entry.side === 'left' ? styles.left : styles.right;
  const colorClass = entry.color === 'orange' ? styles.orange : styles.gold;

  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Slide each card in from its own side as it climbs into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setRevealed(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.cardContainer} ref={ref}>
      <div
        className={`${styles.card} ${sideClass} ${colorClass} ${revealed ? styles.revealed : styles.hidden}`}
        style={{ transitionDelay: revealed ? `${Math.min(index, 4) * 40}ms` : '0ms' }}
      >
        <div className={`${styles.dot} ${colorClass}`}></div>
        <div className={`${styles.connector} ${colorClass}`}></div>

        <div className={styles.cardHeader}>
          <span className={styles.dateBadge}>{entry.date}</span>
          {entry.hours && <span className={styles.hoursPill}>{entry.hours}</span>}
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
