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
 * A flat 2D vector skyline that sits along the bottom of the viewport and rises
 * into view as the page scroll nears the end — a calm "arriving at the city at
 * dusk" beat. Two silhouette rows (a hazy back row + a crisp front row) plus
 * scattered warm lit windows give it depth without any WebGL.
 */
function Skyline() {
  return (
    <svg
      className={styles.skyline}
      viewBox="0 0 1440 340"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bldgBack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2f55" />
          <stop offset="100%" stopColor="#241d3c" />
        </linearGradient>
        <linearGradient id="bldgFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d1733" />
          <stop offset="100%" stopColor="#0b0a1c" />
        </linearGradient>
      </defs>

      {/* Hazy back row — shorter, softer, set behind the front row */}
      <path
        fill="url(#bldgBack)"
        opacity="0.78"
        d="M0 340V220h70v-34h54v54h60v-78h64v60h70v-44h74v64h60v-90h66v110h74v-60h70v40h64v-70h74v90h60v-50h70v66h64v-40h74v60h60v-80h66v100h74v-58h70V340H0z"
      />

      {/* Crisp front row — taller hero towers */}
      <path
        fill="url(#bldgFront)"
        d="M0 340V210h60v-46h44v66h40v-100h54v82h48v-140h40v160h60v-84h70v44h50v74h44v-170h40v190h60v-64h70v48h50v-118h44v140h60v-84h70v60h50v50h44v-104h40v126h60v-72h70v50h50v74h44V340H0z"
      />

      {/* Warm lit windows scattered on the front towers */}
      <g fill="#ffd08a">
        <rect x="74" y="186" width="6" height="9" />
        <rect x="86" y="200" width="6" height="9" />
        <rect x="210" y="100" width="6" height="9" />
        <rect x="222" y="120" width="6" height="9" />
        <rect x="210" y="140" width="6" height="9" />
        <rect x="455" y="70" width="6" height="9" />
        <rect x="467" y="92" width="6" height="9" />
        <rect x="455" y="114" width="6" height="9" />
        <rect x="700" y="120" width="6" height="9" />
        <rect x="712" y="146" width="6" height="9" />
        <rect x="945" y="96" width="6" height="9" />
        <rect x="957" y="120" width="6" height="9" />
        <rect x="945" y="144" width="6" height="9" />
        <rect x="1180" y="110" width="6" height="9" />
        <rect x="1192" y="132" width="6" height="9" />
        <rect x="1300" y="150" width="6" height="9" />
      </g>
      <g fill="#ff9b4d">
        <rect x="98" y="176" width="6" height="9" />
        <rect x="480" y="118" width="6" height="9" />
        <rect x="725" y="170" width="6" height="9" />
        <rect x="1205" y="156" width="6" height="9" />
        <rect x="1315" y="180" width="6" height="9" />
      </g>
    </svg>
  );
}

/**
 * Fixed flat backdrop for content pages. The sky starts bright and warm at the
 * top — so the dark page headers stay readable — and as the visitor scrolls it
 * crossfades through golden hour into dusk, while a 2D skyline rises in along
 * the bottom. Pure CSS/SVG, no WebGL, so content pages stay light. (z-index 0.)
 */
export default function SkyScene() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 30, mass: 0.4 });

  // Sky crossfade: a bright readable top holds, then golden hour, then dusk.
  const dayOpacity = useTransform(p, [0, 0.45, 0.72], [1, 1, 0]);
  const goldOpacity = useTransform(p, [0.38, 0.66, 0.92], [0, 1, 0.45]);
  const duskOpacity = useTransform(p, [0.6, 0.9, 1], [0, 0.8, 1]);

  // Drifting clouds thin out as we descend toward the city.
  const cloudsOpacity = useTransform(p, [0, 0.55, 0.85], [0.85, 0.5, 0]);

  // Distant skyline rises into frame and settles in the final stretch.
  const skylineY = useTransform(p, [0.5, 0.96], ['42%', '0%']);
  const skylineOpacity = useTransform(p, [0.5, 0.74, 0.96], [0, 0.75, 1]);

  return (
    <div className={styles.scene} aria-hidden="true">
      <motion.div className={`${styles.gradient} ${styles.day}`} style={{ opacity: dayOpacity }} />
      <motion.div className={`${styles.gradient} ${styles.gold}`} style={{ opacity: goldOpacity }} />
      <motion.div className={`${styles.gradient} ${styles.dusk}`} style={{ opacity: duskOpacity }} />

      <motion.div className={styles.clouds} style={{ opacity: cloudsOpacity }}>
        <Cloud className={styles.drift1} style={{ top: '8%', color: '#ffffff' }} />
        <Cloud className={styles.drift2} style={{ top: '22%', color: '#fff3e6' }} />
        <Cloud className={styles.drift3} style={{ top: '40%', color: '#ffffff' }} />
        <Cloud className={styles.drift1} style={{ top: '62%', color: '#ffe9d6' }} />
      </motion.div>

      <motion.div className={styles.skylineWrap} style={{ y: skylineY, opacity: skylineOpacity }}>
        <Skyline />
      </motion.div>
    </div>
  );
}
