'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './HomeScroll.module.css';

interface Feature {
  index: string;
  title: string;
  line: string;
  image: string;
  href: string;
}

const FEATURED_PROJECTS: Feature[] = [
  {
    index: 'Project 01',
    title: 'STEAM ICAC — Video Codec',
    line: 'A saliency-aware H.265 codec that shrinks surveillance footage by 81% — presented at the University of Toronto.',
    image: '/Medal.png',
    href: 'https://github.com/SaiAmartya/steam-icac-2026',
  },
  {
    index: 'Project 02',
    title: 'MechMania Controller',
    line: 'A from-scratch ESP32 controller that went undefeated — first place out of twelve teams.',
    image: '/Mechmania.jpg',
    href: '/projects',
  },
  {
    index: 'Project 03',
    title: 'Waypoint',
    line: 'AI case-memory for social workers. Top 7th overall at HackCanada.',
    image: 'https://raw.githubusercontent.com/waypoint9404-ops/hackcanada/main/public/waypoint_pwa_icon_1772889865943.png',
    href: 'https://waypoint-taupe.vercel.app',
  },
];

const FEATURED_ACHIEVEMENTS: Feature[] = [
  {
    index: 'Win 01',
    title: 'MechMania — 1st Place',
    line: 'First place, undefeated, out of twelve teams building automated puck-shooting machines.',
    image: '/Mechmania.jpg',
    href: '/achievements',
  },
  {
    index: 'Win 02',
    title: 'STEAM ICAC 2026',
    line: 'Presented original computer-science research at the University of Toronto.',
    image: '/Certificate Steam.png',
    href: '/achievements',
  },
  {
    index: 'Win 03',
    title: 'HackCanada — Top 7',
    line: 'Top 7th overall at one of Canada’s national hackathons.',
    image: 'https://raw.githubusercontent.com/waypoint9404-ops/hackcanada/main/public/waypoint_pwa_icon_1772889865943.png',
    href: '/achievements',
  },
];

function Suspense({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      className={styles.suspense}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.7 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {children}
    </motion.h2>
  );
}

function FeatureRow({ f, i }: { f: Feature; i: number }) {
  const flip = i % 2 === 1;
  return (
    <motion.div
      className={`${styles.feature} ${flip ? styles.flip : ''}`}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className={styles.featureMedia}>
        <img src={f.image} alt={f.title} loading="lazy" />
      </div>
      <div className={styles.featureText}>
        <span className={styles.kicker}>{f.index}</span>
        <h3 className={styles.featureTitle}>{f.title}</h3>
        <p className={styles.featureLine}>{f.line}</p>
        <Link href={f.href} className={styles.openLink} target={f.href.startsWith('http') ? '_blank' : undefined}>
          Open →
        </Link>
      </div>
    </motion.div>
  );
}

export default function HomeScroll() {
  return (
    <div className={styles.wrap}>
      <Suspense>I build things that bridge bits&nbsp;and&nbsp;atoms.</Suspense>

      {FEATURED_PROJECTS.map((f, i) => (
        <FeatureRow key={f.title} f={f} i={i} />
      ))}

      <Suspense>But it doesn&apos;t stop at&nbsp;code.</Suspense>

      {FEATURED_ACHIEVEMENTS.map((f, i) => (
        <FeatureRow key={f.title} f={f} i={i} />
      ))}

      <motion.div
        className={styles.finale}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className={styles.finaleTitle}>There&apos;s plenty more where that came from.</h2>
        <p className={styles.finaleSub}>Go through to see everything I&apos;ve built and earned.</p>
        <div className={styles.finaleButtons}>
          <Link href="/projects" className={styles.btnPrimary}>All Projects →</Link>
          <Link href="/achievements" className={styles.btnSecondary}>All Achievements →</Link>
        </div>
      </motion.div>
    </div>
  );
}
