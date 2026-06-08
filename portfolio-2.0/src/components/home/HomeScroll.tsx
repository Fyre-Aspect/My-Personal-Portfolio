'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import styles from './HomeScroll.module.css';
import CityFinale from './CityFinale';

function CloudShape({ className, style }: { className?: string; style?: React.CSSProperties }) {
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

interface Feature {
  index: string;
  title: string;
  line: string;
  image?: string;
  mediaBg?: string;
  mediaLabel?: string;
  href: string;
  external?: boolean;
}

const FEATURED_PROJECTS: Feature[] = [
  {
    index: 'Project 01',
    title: 'STEAM ICAC 2026',
    line: 'Saliency-aware H.265 codec that shrinks surveillance footage by 81%. Presented at the University of Toronto.',
    image: '/Medal.png',
    href: 'https://github.com/SaiAmartya/steam-icac-2026',
    external: true,
  },
  {
    index: 'Project 02',
    title: 'MechMania Controller',
    line: 'Built a wireless ESP32 controller from scratch - firmware, hardware, circuit - and went undefeated through a 12-team tournament.',
    image: '/Mechmania.jpg',
    href: '/projects',
  },
  {
    index: 'Project 03',
    title: 'Waypoint',
    line: 'AI case-memory for social workers. Voice memos become structured notes, RAG isolates each client thread. Top 7 at HackCanada.',
    image: 'https://raw.githubusercontent.com/waypoint9404-ops/hackcanada/main/public/waypoint_pwa_icon_1772889865943.png',
    href: 'https://waypoint-taupe.vercel.app',
    external: true,
  },
];

const FEATURED_ACHIEVEMENTS: Feature[] = [
  {
    index: 'Achievement 01',
    title: 'WCCSAA Badminton - 5th Place',
    line: 'Regional badminton competition representing the school. Competed at the WCCSAA level as part of the school team.',
    image: '/wcssaa.png',
    href: '/achievements',
  },
  {
    index: 'Achievement 02',
    title: 'KW Humane Society Volunteer',
    line: 'Part of 200+ volunteer hours across Kitchener-Waterloo. Helped care for animals and support adoption programs at the KW Humane Society.',
    image: '/KW.png',
    href: '/achievements',
  },
  {
    index: 'Achievement 03',
    title: 'Food Distribution Volunteer',
    line: 'Regular volunteer at local food distribution programs, helping sort and deliver food packages to families across the KW region.',
    image: '/Distro.jpg',
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
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.72, ease: 'easeOut' }}
    >
      <div className={styles.featureMedia} style={f.mediaBg ? { background: f.mediaBg } : undefined}>
        {f.image && <img src={f.image} alt={f.title} loading="lazy" />}
        {!f.image && f.mediaLabel && (
          <div className={styles.mediaOverlay}>
            {f.mediaLabel.split('·').map((s, idx) => (
              <span key={idx}>{s.trim()}</span>
            ))}
          </div>
        )}
      </div>
      <div className={styles.featureText}>
        <span className={styles.kicker}>{f.index}</span>
        <h3 className={styles.featureTitle}>{f.title}</h3>
        <p className={styles.featureLine}>{f.line}</p>
        <Link
          href={f.href}
          className={styles.openLink}
          target={f.external ? '_blank' : undefined}
          rel={f.external ? 'noopener noreferrer' : undefined}
        >
          Open
        </Link>
      </div>
    </motion.div>
  );
}

export default function HomeScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'end start'],
  });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 30, mass: 0.4 });

  const cloud1X = useTransform(p, [0, 1], ['-8%', '8%']);
  const cloud2X = useTransform(p, [0, 1], ['6%', '-6%']);
  const cloud3X = useTransform(p, [0, 1], ['-4%', '4%']);
  const cloudY1 = useTransform(p, [0, 1], ['0%', '20%']);
  const cloudY2 = useTransform(p, [0, 1], ['0%', '-15%']);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <motion.div className={`${styles.cloudDeco} ${styles.cloudDeco1}`} style={{ x: cloud1X, y: cloudY1 }} aria-hidden="true">
        <CloudShape />
      </motion.div>
      <motion.div className={`${styles.cloudDeco} ${styles.cloudDeco2}`} style={{ x: cloud2X, y: cloudY2 }} aria-hidden="true">
        <CloudShape />
      </motion.div>
      <motion.div className={`${styles.cloudDeco} ${styles.cloudDeco3}`} style={{ x: cloud3X }} aria-hidden="true">
        <CloudShape />
      </motion.div>

      <Suspense>Some things I&apos;ve built.</Suspense>

      {FEATURED_PROJECTS.map((f, i) => (
        <FeatureRow key={f.title} f={f} i={i} />
      ))}

      <Suspense>Beyond the&nbsp;code.</Suspense>

      {FEATURED_ACHIEVEMENTS.map((f, i) => (
        <FeatureRow key={f.title} f={f} i={i} />
      ))}

      <CityFinale />
    </div>
  );
}
