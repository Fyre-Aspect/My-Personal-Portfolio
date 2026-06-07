'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import styles from './CloudHero.module.css';

function Cloud({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 220 120" fill="none" aria-hidden="true">
      <path
        d="M48 104c-24 0-34-28-12-37-3-26 33-37 47-16 8-20 44-19 49 3 26-7 41 22 21 33 8 14-4 34-20 34H48z"
        fill="currentColor"
      />
      <ellipse cx="110" cy="84" rx="96" ry="34" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

interface CloudLayerProps {
  progress: MotionValue<number>;
}

export default function CloudHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Hero content (photo + name) drifts up, scales toward the viewer, then fades.
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const contentScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.18]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45, 0.6], [1, 1, 0]);

  // Cloud banks part and rush past as you "fly" upward — different depths = parallax.
  const frontX = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);
  const frontXRight = useTransform(scrollYProgress, [0, 1], ['0%', '75%']);
  const frontScale = useTransform(scrollYProgress, [0, 1], [1, 2.6]);
  const frontY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  const midX = useTransform(scrollYProgress, [0, 1], ['0%', '-45%']);
  const midXRight = useTransform(scrollYProgress, [0, 1], ['0%', '45%']);
  const midScale = useTransform(scrollYProgress, [0, 1], [1, 1.8]);

  const farScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const farOpacity = useTransform(scrollYProgress, [0, 0.8], [0.9, 0]);

  // Sky brightens, then dissolves to reveal the themed content underneath.
  const skyOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const sunScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);

  return (
    <div ref={ref} className={styles.scrollZone}>
      <div className={styles.sticky}>
        {/* Sky gradient + sun glow */}
        <motion.div className={styles.sky} style={{ opacity: skyOpacity }}>
          <motion.div className={styles.sun} style={{ scale: sunScale }} />
        </motion.div>

        {/* Far clouds */}
        <motion.div className={styles.cloudLayer} style={{ scale: farScale, opacity: farOpacity }}>
          <Cloud className={styles.cloudFar} style={{ top: '18%', left: '12%' }} />
          <Cloud className={styles.cloudFar} style={{ top: '26%', right: '14%' }} />
          <Cloud className={styles.cloudFar} style={{ top: '8%', left: '46%' }} />
        </motion.div>

        {/* Hero content */}
        <motion.div
          className={styles.content}
          style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
        >
          <div className={styles.photoRing}>
            <img src="/Aamir Pic.jpg" alt="Aamir Tinwala" className={styles.photo} />
          </div>
          <p className={styles.kicker}>$ aamir --status=available-for-hire</p>
          <h1 className={styles.name}>Aamir Tinwala</h1>
          <p className={styles.role}>Web-App Developer &amp; Builder</p>
          <div className={styles.scrollCue}>
            <span>Scroll to take off</span>
            <span className={styles.chevron}>↓</span>
          </div>
        </motion.div>

        {/* Mid clouds */}
        <motion.div className={styles.cloudLayer} style={{ x: midX, scale: midScale }}>
          <Cloud className={styles.cloudMid} style={{ top: '34%', left: '-6%' }} />
        </motion.div>
        <motion.div className={styles.cloudLayer} style={{ x: midXRight, scale: midScale }}>
          <Cloud className={styles.cloudMid} style={{ top: '40%', right: '-6%' }} />
        </motion.div>

        {/* Front cloud bank — rushes past, framing the bottom like takeoff */}
        <motion.div className={styles.cloudLayer} style={{ x: frontX, y: frontY, scale: frontScale }}>
          <Cloud className={styles.cloudFront} style={{ bottom: '-8%', left: '-12%' }} />
        </motion.div>
        <motion.div className={styles.cloudLayer} style={{ x: frontXRight, y: frontY, scale: frontScale }}>
          <Cloud className={styles.cloudFront} style={{ bottom: '-12%', right: '-12%' }} />
        </motion.div>
        <motion.div className={styles.cloudLayer} style={{ y: frontY, scale: frontScale }}>
          <Cloud className={styles.cloudFront} style={{ bottom: '-20%', left: '28%' }} />
        </motion.div>
      </div>
    </div>
  );
}
