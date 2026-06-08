'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Hero content rushes toward viewer, blurs, fades.
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);
  const contentScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.35]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.32, 0.46], [1, 1, 0]);
  const contentBlur = useTransform(scrollYProgress, [0, 0.4], ['blur(0px)', 'blur(14px)']);

  // Cloud banks part and rush past.
  const frontX = useTransform(scrollYProgress, [0, 1], ['0%', '-90%']);
  const frontXRight = useTransform(scrollYProgress, [0, 1], ['0%', '90%']);
  const frontScale = useTransform(scrollYProgress, [0, 1], [1, 3.8]);
  const frontY = useTransform(scrollYProgress, [0, 1], ['0%', '55%']);

  const midX = useTransform(scrollYProgress, [0, 1], ['0%', '-55%']);
  const midXRight = useTransform(scrollYProgress, [0, 1], ['0%', '55%']);
  const midScale = useTransform(scrollYProgress, [0, 1], [1, 2.2]);

  const farScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  // KEY FIX: fade ALL clouds to 0 before the sticky section releases.
  // This prevents a visual "snap" when position:sticky unpins at 320vh.
  const cloudMasterOpacity = useTransform(scrollYProgress, [0.5, 0.8], [1, 0]);

  // Whiteout: peaks at 0.55, fully gone by 0.85.
  const whiteoutOpacity = useTransform(scrollYProgress, [0.3, 0.55, 0.85], [0, 1, 0]);
  const whiteoutScale = useTransform(scrollYProgress, [0.3, 0.85], [0.4, 3]);

  // Sun fades before clouds do.
  const sunScale = useTransform(scrollYProgress, [0, 1], [1, 1.8]);
  const sunOpacity = useTransform(scrollYProgress, [0, 0.42, 0.7], [1, 0.5, 0]);

  return (
    <div ref={ref} className={styles.scrollZone}>
      <div className={styles.sticky}>
        <motion.div className={styles.sun} style={{ scale: sunScale, opacity: sunOpacity }} />

        {/* All cloud layers share a master opacity that fades to 0 before sticky releases */}
        <motion.div style={{ opacity: cloudMasterOpacity, position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {/* Far clouds */}
          <motion.div className={styles.cloudLayer} style={{ scale: farScale }}>
            <Cloud className={styles.cloudFar} style={{ top: '16%', left: '12%' }} />
            <Cloud className={styles.cloudFar} style={{ top: '26%', right: '14%' }} />
            <Cloud className={styles.cloudFar} style={{ top: '8%', left: '46%' }} />
          </motion.div>

          {/* Mid clouds */}
          <motion.div className={styles.cloudLayer} style={{ x: midX, scale: midScale }}>
            <Cloud className={styles.cloudMid} style={{ top: '32%', left: '-8%' }} />
          </motion.div>
          <motion.div className={styles.cloudLayer} style={{ x: midXRight, scale: midScale }}>
            <Cloud className={styles.cloudMid} style={{ top: '42%', right: '-8%' }} />
          </motion.div>

          {/* Front cloud bank */}
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

        {/* Hero content */}
        <motion.div
          className={styles.content}
          style={{ y: contentY, scale: contentScale, opacity: contentOpacity, filter: contentBlur }}
        >
          <div className={styles.photoRing}>
            <img src="/Aamir Pic.jpg" alt="Aamir Tinwala" className={styles.photo} />
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

        {/* Whiteout — fly straight through a cloud */}
        <motion.div
          className={styles.whiteout}
          style={{ opacity: whiteoutOpacity, scale: whiteoutScale }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
