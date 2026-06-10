'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import styles from './CloudHero.module.css';

/**
 * The hero intro card (photo / name / scroll cue). The atmosphere — sky and the
 * descent toward the city — is now the real WebGL scene behind everything
 * (SkyWorld), so this layer is just the content that lifts away and fades as the
 * scroll-driven camera begins its dive.
 */
export default function CloudHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 28, mass: 0.4 });

  const contentY = useTransform(p, [0, 1], ['0%', '-22%']);
  const contentScale = useTransform(p, [0, 0.8], [1, 1.2]);
  const contentOpacity = useTransform(p, [0, 0.4, 0.62], [1, 1, 0]);
  const contentBlur = useTransform(p, [0, 0.5], ['blur(0px)', 'blur(10px)']);

  return (
    <div ref={ref} className={styles.scrollZone}>
      <div className={styles.sticky}>
        <motion.div
          className={styles.content}
          style={{ y: contentY, scale: contentScale, opacity: contentOpacity, filter: contentBlur }}
        >
          <div className={styles.photoRing}>
            <img src="/Aamir%20Pic.jpg" alt="Aamir Tinwala" className={styles.photo} />
          </div>

          <div className={styles.statusBadge}>
            <span className={styles.statusDot} />
            Available for hire
          </div>

          <h1 className={styles.name}>Aamir Tinwala</h1>
          <p className={styles.role}>IB Student &nbsp;&middot;&nbsp; Part-time Available</p>

          <div className={styles.scrollCue}>
            <span>Scroll to take off</span>
            <span className={styles.chevron}>↓</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
