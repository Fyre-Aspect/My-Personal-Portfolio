'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import styles from './CityFinale.module.css';

/**
 * The arrival. The two real skyscrapers and the dusk sky are now the WebGL scene
 * behind the page (SkyWorld) — by the time this section pins, the camera has
 * descended into the canyon between the towers. This layer just lands the
 * closing call-to-action in the heart of the city, with a soft vignette so the
 * text stays legible over the sunset.
 */
export default function CityFinale() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });

  const vignetteOpacity = useTransform(p, [0.2, 0.7], [0, 1]);
  const ctaOpacity = useTransform(p, [0.5, 0.82], [0, 1]);
  const ctaY = useTransform(p, [0.5, 0.82], [60, 0]);

  return (
    <div ref={ref} className={styles.scrollZone}>
      <div className={styles.sticky}>
        <motion.div className={styles.legibility} style={{ opacity: vignetteOpacity }} aria-hidden="true" />

        <motion.div className={styles.cta} style={{ opacity: ctaOpacity, y: ctaY }}>
          <span className={styles.arrived}>You&apos;ve arrived</span>
          <h2 className={styles.title}>There&apos;s <em>plenty more</em> where that came from.</h2>
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
