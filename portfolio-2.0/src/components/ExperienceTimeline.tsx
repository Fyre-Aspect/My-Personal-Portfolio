'use client';
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

export default function ExperienceTimeline() {
  return (
    <section className={styles.timelineWrapper}>
      <div className={styles.spine}></div>
      {timelineData.map((entry, index) => (
        <TimelineCard key={index} entry={entry} index={index} />
      ))}
    </section>
  );
}