'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
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

export default function CloudHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 28, mass: 0.4 });

  const contentY = useTransform(p, [0, 1], ['0%', '-22%']);
  const contentScale = useTransform(p, [0, 0.8], [1, 1.25]);
  const contentOpacity = useTransform(p, [0, 0.4, 0.6], [1, 1, 0]);
  const contentBlur = useTransform(p, [0, 0.5], ['blur(0px)', 'blur(10px)']);

  const frontX = useTransform(p, [0, 1], ['0%', '-90%']);
  const frontXRight = useTransform(p, [0, 1], ['0%', '90%']);
  const frontScale = useTransform(p, [0, 1], [1, 3.8]);
  const frontY = useTransform(p, [0, 1], ['0%', '55%']);
  const midX = useTransform(p, [0, 1], ['0%', '-55%']);
  const midXRight = useTransform(p, [0, 1], ['0%', '55%']);
  const midScale = useTransform(p, [0, 1], [1, 2.2]);
  const farScale = useTransform(p, [0, 1], [1, 1.5]);
  const cloudMasterOpacity = useTransform(p, [0.55, 0.85], [1, 0]);
  const whiteoutOpacity = useTransform(p, [0.35, 0.6, 0.9], [0, 1, 0]);
  const whiteoutScale = useTransform(p, [0.35, 0.9], [0.4, 3]);
  const sunScale = useTransform(p, [0, 1], [1, 1.8]);
  const sunOpacity = useTransform(p, [0, 0.45, 0.72], [1, 0.5, 0]);

  return (
    <div ref={ref} className={styles.scrollZone}>
      <div className={styles.sticky}>
        <motion.div className={styles.sun} style={{ scale: sunScale, opacity: sunOpacity }} />

        <motion.div style={{ opacity: cloudMasterOpacity, position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <motion.div className={styles.cloudLayer} style={{ scale: farScale }}>
            <Cloud className={styles.cloudFar} style={{ top: '16%', left: '12%' }} />
            <Cloud className={styles.cloudFar} style={{ top: '26%', right: '14%' }} />
            <Cloud className={styles.cloudFar} style={{ top: '8%', left: '46%' }} />
          </motion.div>
          <motion.div className={styles.cloudLayer} style={{ x: midX, scale: midScale }}>
            <Cloud className={styles.cloudMid} style={{ top: '32%', left: '-8%' }} />
          </motion.div>
          <motion.div className={styles.cloudLayer} style={{ x: midXRight, scale: midScale }}>
            <Cloud className={styles.cloudMid} style={{ top: '42%', right: '-8%' }} />
          </motion.div>
          <motion.div className={styles.cloudLayer} style={{ x: frontX, y: frontY, scale: frontScale }}>
            <Cloud className={styles.cloudFront} style={{ bottom: '-10%', left: '-14%' }} />
          </motion.div>
          <motion.div className={styles.cloudLayer} style={{ x: frontXRight, y: frontY, scale: frontScale }}>
            <Cloud className={styles.cloudFront} style={{ bottom: '-14%', right: '-14%' }} />
          </motion.div>
          <motion.div className={styles.cloudLayer} style={{ y: frontY, scale: frontScale }}>
            <Cloud className={styles.cloudFront} style={{ bottom: '-24%', left: '26%' }} />
          </motion.div>
        </motion.div>

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

        <motion.div
          className={styles.whiteout}
          style={{ opacity: whiteoutOpacity, scale: whiteoutScale }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
