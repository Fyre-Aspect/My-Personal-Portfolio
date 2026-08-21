'use client';
import { useCallback, useRef, useState } from 'react';
import styles from './ExperienceTimeline.module.css';
import { TimelineCard } from './TimelineCard';
import { experiences, type ExperienceEntry } from '../data/experiences';

export interface TimelineEntry extends ExperienceEntry {
  side: 'left' | 'right';
}

// Compute left/right side derived from index
const timelineData: TimelineEntry[] = experiences.map((item, index) => ({
  ...item,
  side: index % 2 === 0 ? 'left' : 'right'
}));

const pad = (n: number) => String(n).padStart(2, '0');

export default function ExperienceTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);
  const [active, setActive] = useState(0);

  // On phones the track scrolls horizontally (snap carousel); keep the
  // "n / total" readout pointing at whichever card sits nearest the centre
  // of the scrollport. Desktop never scrolls the track, so this never fires.
  const onScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      ticking.current = false;
      const track = trackRef.current;
      if (!track) return;
      const mid = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      for (const child of Array.from(track.children)) {
        const el = child as HTMLElement;
        if (el.dataset.card === undefined) continue;
        const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = Number(el.dataset.card);
        }
      }
      setActive(best);
    });
  }, []);

  return (
    <section className={styles.timelineWrapper}>
      <div className={styles.mobileBar}>
        <span className={styles.mobileCounter} aria-hidden="true">
          <span className={styles.mobileCounterActive}>{pad(active + 1)}</span>
          {' / '}
          {pad(timelineData.length)}
        </span>
        <span className={styles.mobileHint}>swipe the timeline →</span>
      </div>

      <div className={styles.track} ref={trackRef} onScroll={onScroll}>
        <div className={styles.spine}></div>
        {timelineData.map((entry, index) => (
          <TimelineCard key={index} entry={entry} index={index} />
        ))}
      </div>
    </section>
  );
}
