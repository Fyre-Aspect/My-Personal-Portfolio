'use client';

import { useScroll, useSpring, useTransform, motion } from 'framer-motion';
import styles from './SkyScene.module.css';

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

/**
 * Distant skyline silhouette. Sits at the bottom of the viewport and rises into
 * view as the page scroll nears the end — the "approaching the city" beat before
 * the from-below CityFinale takes over.
 */
function Skyline() {
  return (
    <svg
      className={styles.skyline}
      viewBox="0 0 1440 320"
      preserveAspectRatio="xMidYEnd slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bldg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d2340" />
          <stop offset="100%" stopColor="#0c1024" />
        </linearGradient>
      </defs>
      {/* Building silhouette band */}
      <path
        fill="url(#bldg)"
        d="M0 320V190h60v-40h44v60h40v-90h54v70h48v-120h40v140h60v-70h70v30h50v60h44v-150h40v170h60v-50h70v40h50v-100h44v120h60v-70h70v50h50v40h44v-90h40v110h60v-60h70v40h50v60H0z"
      />
      {/* Warm lit windows */}
      <g fill="#ffcf86" opacity="0.9">
        <rect x="74" y="170" width="6" height="9" />
        <rect x="86" y="170" width="6" height="9" />
        <rect x="210" y="120" width="6" height="9" />
        <rect x="222" y="135" width="6" height="9" />
        <rect x="210" y="150" width="6" height="9" />
        <rect x="455" y="80" width="6" height="9" />
        <rect x="467" y="95" width="6" height="9" />
        <rect x="455" y="110" width="6" height="9" />
        <rect x="700" y="130" width="6" height="9" />
        <rect x="712" y="145" width="6" height="9" />
        <rect x="945" y="100" width="6" height="9" />
        <rect x="957" y="115" width="6" height="9" />
        <rect x="945" y="130" width="6" height="9" />
        <rect x="1180" y="120" width="6" height="9" />
        <rect x="1192" y="135" width="6" height="9" />
      </g>
      <g fill="#ff9b4d" opacity="0.85">
        <rect x="98" y="160" width="6" height="9" />
        <rect x="480" y="125" width="6" height="9" />
        <rect x="725" y="160" width="6" height="9" />
        <rect x="1205" y="150" width="6" height="9" />
      </g>
    </svg>
  );
}

/**
 * Fixed backdrop for the whole page. As the visitor scrolls the journey, the sky
 * crossfades from bright day → golden hour → dusk, and a distant skyline rises in
 * the final stretch. Sits behind everything (z-index 0).
 */
export default function SkyScene() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 30, mass: 0.4 });

  // Sky crossfade: day holds, then gives way to golden hour, then dusk.
  const dayOpacity = useTransform(p, [0, 0.45, 0.7], [1, 1, 0]);
  const goldOpacity = useTransform(p, [0.4, 0.68, 0.92], [0, 1, 0.35]);
  const duskOpacity = useTransform(p, [0.6, 0.9, 1], [0, 0.85, 1]);

  // Drifting clouds thin out as we descend toward the city.
  const cloudsOpacity = useTransform(p, [0, 0.55, 0.85], [0.85, 0.5, 0]);

  // Distant skyline rises into frame and settles.
  const skylineY = useTransform(p, [0.5, 0.95], ['38%', '0%']);
  const skylineOpacity = useTransform(p, [0.5, 0.72, 0.95], [0, 0.7, 1]);

  return (
    <div className={styles.scene} aria-hidden="true">
      <motion.div className={`${styles.gradient} ${styles.day}`} style={{ opacity: dayOpacity }} />
      <motion.div className={`${styles.gradient} ${styles.gold}`} style={{ opacity: goldOpacity }} />
      <motion.div className={`${styles.gradient} ${styles.dusk}`} style={{ opacity: duskOpacity }} />

      <motion.div className={styles.clouds} style={{ opacity: cloudsOpacity }}>
        <Cloud className={styles.drift1} style={{ top: '8%', color: '#ffffff' }} />
        <Cloud className={styles.drift2} style={{ top: '24%', color: '#f4faff' }} />
        <Cloud className={styles.drift3} style={{ top: '52%', color: '#ffffff' }} />
        <Cloud className={styles.drift1} style={{ top: '70%', color: '#eef6ff' }} />
        <Cloud className={styles.drift2} style={{ top: '88%', color: '#ffffff' }} />
      </motion.div>

      <motion.div className={styles.skylineWrap} style={{ y: skylineY, opacity: skylineOpacity }}>
        <Skyline />
      </motion.div>
    </div>
  );
}
