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
  /** Render the image contained (with padding) rather than cropped — for logos. */
  logo?: boolean;
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

const FEATURED_EXPERIENCES: Feature[] = [
  {
    index: 'Experience 01',
    title: 'UWaterloo Geothermal Lab',
    line: 'Research assistant at the University of Waterloo geothermal lab — soil heat-conduction testing that ties straight into my thermodynamics studies.',
    image: '/UW Pic 1.jpg',
    href: '/activities',
  },
  {
    index: 'Experience 02',
    title: 'Tidal Tasks — Co-Founder',
    line: 'Co-founded an AI task-management startup. Led the mobile rework, shipped features, and ran the social channels.',
    image: '/Tidal Tasks.png',
    href: '/activities',
  },
  {
    index: 'Experience 03',
    title: 'Global Heart Sync — Advisor',
    line: 'Volunteer advisor reshaping how the platform structures its app to draw in and retain a younger audience.',
    image: '/Global Heart Sync.png',
    mediaBg: 'linear-gradient(135deg, #f6fbff 0%, #e6f1ff 100%)',
    logo: true,
    href: '/activities',
  },
];

/* Drives a scroll-linked 3D entrance: the element flies up out of depth and
   settles flat as it reaches the middle of the viewport — the same "coming
   toward you" language as the cloud dive, so the page reads as one descent. */
function useDepthEntrance(amount = 1) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.5 });
  const opacity = useTransform(p, [0, 0.6], [0, 1]);
  const y = useTransform(p, [0, 1], [110 * amount, 0]);
  const z = useTransform(p, [0, 1], [-260 * amount, 0]);
  const rotateX = useTransform(p, [0, 1], [14 * amount, 0]);
  const scale = useTransform(p, [0, 1], [0.9, 1]);
  return { ref, style: { opacity, y, z, rotateX, scale } as const };
}

function Suspense({ children }: { children: React.ReactNode }) {
  const { ref, style } = useDepthEntrance(1.1);
  return (
    <div ref={ref} className={styles.suspenseStage}>
      <motion.h2 className={styles.suspense} style={style}>
        {children}
      </motion.h2>
    </div>
  );
}

function FeatureRow({ f, i }: { f: Feature; i: number }) {
  const flip = i % 2 === 1;
  const { ref, style } = useDepthEntrance(1);
  return (
    <div ref={ref} className={styles.featureStage}>
      <motion.div className={`${styles.feature} ${flip ? styles.flip : ''}`} style={style}>
        <div
          className={`${styles.featureMedia} ${f.logo ? styles.logoMedia : ''}`}
          style={f.mediaBg ? { background: f.mediaBg } : undefined}
        >
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
    </div>
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

      <Suspense>Stuff I&apos;ve actually <em>shipped</em>.</Suspense>

      {FEATURED_PROJECTS.map((f, i) => (
        <FeatureRow key={f.title} f={f} i={i} />
      ))}

      <Suspense>Where I&apos;ve put in the <em>work</em>.</Suspense>

      {FEATURED_EXPERIENCES.map((f, i) => (
        <FeatureRow key={f.title} f={f} i={i} />
      ))}

      <CityFinale />
    </div>
  );
}
