'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import styles from './CityFinale.module.css';

/**
 * The arrival. A sticky, scroll-driven "looking up from the street" canyon: two
 * skyscraper walls rise and lean in toward a sliver of dusk sky while the closing
 * call-to-action settles into the middle of the city. Mirrors the hero's
 * sticky-scrollZone format so the whole page reads as one continuous descent.
 */
export default function CityFinale() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });

  // Walls rise from the street and the canyon pushes in toward the viewer.
  const wallsY = useTransform(p, [0, 0.55], ['55%', '0%']);
  const wallsOpacity = useTransform(p, [0, 0.4], [0, 1]);
  const canyonScale = useTransform(p, [0.2, 1], [1, 1.12]);

  // Stars in the sky sliver fade in once the walls frame them.
  const skyGlow = useTransform(p, [0.3, 0.7], [0, 1]);

  // Closing message arrives last, settled in the heart of the city.
  const ctaOpacity = useTransform(p, [0.5, 0.82], [0, 1]);
  const ctaY = useTransform(p, [0.5, 0.82], [60, 0]);

  return (
    <div ref={ref} className={styles.scrollZone}>
      <div className={styles.sticky}>
        <motion.div className={styles.skyGap} style={{ opacity: skyGlow }} aria-hidden="true">
          <span className={styles.star} style={{ top: '14%', left: '44%' }} />
          <span className={styles.star} style={{ top: '22%', left: '56%' }} />
          <span className={styles.star} style={{ top: '8%', left: '50%' }} />
          <span className={styles.star} style={{ top: '30%', left: '48%' }} />
          <span className={styles.moon} />
        </motion.div>

        <motion.div className={styles.canyon} style={{ scale: canyonScale }}>
          <motion.div
            className={`${styles.wall} ${styles.wallLeft}`}
            style={{ y: wallsY, opacity: wallsOpacity }}
            aria-hidden="true"
          >
            <span className={`${styles.neon} ${styles.neonA}`} />
          </motion.div>
          <motion.div
            className={`${styles.wall} ${styles.wallRight}`}
            style={{ y: wallsY, opacity: wallsOpacity }}
            aria-hidden="true"
          >
            <span className={`${styles.neon} ${styles.neonB}`} />
          </motion.div>
          <div className={styles.street} aria-hidden="true" />
        </motion.div>

        <motion.div className={styles.cta} style={{ opacity: ctaOpacity, y: ctaY }}>
          <span className={styles.arrived}>You&apos;ve arrived</span>
          <h2 className={styles.title}>There&apos;s plenty more where that came from.</h2>
          <p className={styles.sub}>See everything I&apos;ve built, won, and done.</p>
          <div className={styles.buttons}>
            <Link href="/projects" className={styles.btnPrimary}>All Projects</Link>
            <Link href="/achievements" className={styles.btnSecondary}>All Achievements</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
