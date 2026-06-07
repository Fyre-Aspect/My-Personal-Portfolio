'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { projects } from '../../data/projects';
import styles from './ProjectCarousel.module.css';

const COUNT = projects.length;

// Slide variants — enters from the side you're heading toward, exits the other way.
const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 340 : -340,
    opacity: 0,
    scale: 0.92,
    rotateY: dir > 0 ? 8 : -8,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -340 : 340,
    opacity: 0,
    scale: 0.92,
    rotateY: dir > 0 ? -8 : 8,
  }),
};

function wrap(index: number) {
  return ((index % COUNT) + COUNT) % COUNT;
}

export default function ProjectCarousel() {
  // [activeIndex, direction]
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const active = wrap(index);
  const project = projects[active];

  const paginate = useCallback((step: number) => {
    setState(([i]) => [i + step, step]);
  }, []);

  const goTo = useCallback(
    (target: number) => {
      setState(([i]) => {
        const current = wrap(i);
        return [target, target > current ? 1 : target < current ? -1 : 0];
      });
    },
    []
  );

  // Arrow-key navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        paginate(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paginate]);

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    const power = info.offset.x + info.velocity.x * 0.25;
    if (power < -80) paginate(1);
    else if (power > 80) paginate(-1);
  };

  const href = project.liveUrl || project.githubUrl || project.videoUrl || undefined;

  return (
    <div className={styles.carousel}>
      <div className={styles.counter}>
        <span className={styles.counterActive}>
          {String(active + 1).padStart(2, '0')}
        </span>
        <span className={styles.counterTotal}>/ {String(COUNT).padStart(2, '0')}</span>
      </div>

      <div className={styles.stage}>
        <button
          className={`${styles.navBtn} ${styles.prev}`}
          onClick={() => paginate(-1)}
          aria-label="Previous project"
        >
          <Chevron dir="left" />
        </button>

        <div className={styles.cardViewport}>
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.article
              key={active}
              className={styles.card}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 320, damping: 32 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.25 },
                rotateY: { duration: 0.3 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={onDragEnd}
            >
              <div className={styles.cardImage}>
                {project.image ? (
                  <img src={project.image} alt={project.title} draggable={false} />
                ) : (
                  <div className={styles.imageFallback}>{project.title.charAt(0)}</div>
                )}
                {project.status && <span className={styles.badge}>{project.status}</span>}
              </div>

              <div className={styles.cardBody}>
                <span className={styles.role}>{project.role}</span>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.desc}>{project.description}</p>

                <div className={styles.tags}>
                  {project.technologies.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>

                <div className={styles.links}>
                  {project.liveUrl && (
                    <a className={`${styles.link} ${styles.primary}`} href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      {project.demoLabel || 'Live Demo'} →
                    </a>
                  )}
                  {project.videoUrl && (
                    <a className={styles.link} href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                      Watch Video →
                    </a>
                  )}
                  {project.githubUrl && (
                    <a className={styles.link} href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      View Code →
                    </a>
                  )}
                  {!href && <span className={styles.noLink}>Case study coming soon</span>}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <button
          className={`${styles.navBtn} ${styles.next}`}
          onClick={() => paginate(1)}
          aria-label="Next project"
        >
          <Chevron dir="right" />
        </button>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Select project">
        {projects.map((p, i) => (
          <button
            key={p.title}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={p.title}
            aria-selected={i === active}
            role="tab"
          />
        ))}
      </div>

      <p className={styles.hint}>
        <kbd>←</kbd> <kbd>→</kbd> arrow keys, drag, or swipe to explore
      </p>
    </div>
  );
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === 'left' ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}
