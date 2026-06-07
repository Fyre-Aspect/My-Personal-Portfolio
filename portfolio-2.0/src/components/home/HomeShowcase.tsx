'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './HomeShowcase.module.css';

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
] as const;

interface Job {
  range: string;
  title: string;
  org: string;
  url?: string;
  description: string;
  tags: string[];
}

const EXPERIENCE: Job[] = [
  {
    range: '2024 — Present',
    title: 'Admin Developer',
    org: 'Tidal Tasks AI',
    url: 'https://tidaltasks.app',
    description:
      'Build and maintain admin systems and ship features for an AI-powered task management startup, working across a modern web stack to keep interfaces fast and usable.',
    tags: ['React', 'TypeScript', 'Firebase', 'Gemini API', 'Tailwind'],
  },
  {
    range: 'May 2026',
    title: 'CS Showcase — Saliency-Aware Codec',
    org: 'STEAM ICAC 2026 · University of Toronto',
    url: 'https://github.com/SaiAmartya/steam-icac-2026',
    description:
      'Presented a saliency-aware video codec for stationary surveillance cameras. Replaces non-salient pixels with a learned background before H.265 encoding — 81% file-size reduction on 1080p footage at 34.76 dB PSNR.',
    tags: ['Python', 'YOLOv8', 'H.265', 'OpenCV', 'PyTorch'],
  },
  {
    range: 'Apr — May 2026',
    title: 'Controller Engineer · 1st Place',
    org: 'MechMania',
    description:
      'Led the pivot to a conveyor-belt puck mechanism and built the handheld ESP32 controller end-to-end. Went undefeated through a 12-team ladder tournament to take first place.',
    tags: ['ESP32', 'C++', 'Embedded', 'Wireless Comms'],
  },
  {
    range: 'Feb 2025',
    title: 'Full-Stack Developer · Top 7 Overall',
    org: 'HackCanada — Waypoint',
    url: 'https://github.com/waypoint9404-ops/hackcanada',
    description:
      'Built Waypoint, an AI case-memory platform for social workers: voice ingestion turns field memos into structured notes, with thread-scoped RAG isolating each client and audio recaps between visits.',
    tags: ['Next.js', 'Auth0', 'Supabase', 'ElevenLabs', 'Gemini'],
  },
  {
    range: '2024',
    title: 'Soil Testing Intern',
    org: 'University of Waterloo',
    description:
      'Research experience in soil analysis — running composition tests under varied load conditions, plotting stress-strain graphs, and visualizing data in MATLAB.',
    tags: ['MATLAB', 'Data Analysis', 'Research'],
  },
];

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  url?: string;
  repo?: string;
}

const PROJECTS: Project[] = [
  {
    title: 'STEAM ICAC — Video Codec',
    description:
      'Saliency-aware H.265 codec for surveillance footage. 81% smaller files by collapsing static backgrounds to near-zero bits.',
    tags: ['Python', 'YOLOv8', 'OpenCV', 'PyTorch'],
    image: '/Medal.png',
    repo: 'https://github.com/SaiAmartya/steam-icac-2026',
  },
  {
    title: 'Waypoint',
    description:
      'AI case-memory platform for social workers with voice ingestion and thread-scoped RAG. Top 7 overall at HackCanada.',
    tags: ['Next.js', 'Supabase', 'ElevenLabs', 'Gemini'],
    image:
      'https://raw.githubusercontent.com/waypoint9404-ops/hackcanada/main/public/waypoint_pwa_icon_1772889865943.png',
    url: 'https://waypoint-taupe.vercel.app',
    repo: 'https://github.com/waypoint9404-ops/hackcanada',
  },
  {
    title: 'MechMania Controller',
    description:
      'Handheld ESP32 controller built from scratch — wireless firmware, circuit wiring, and hardware. Undefeated, 1st of 12 teams.',
    tags: ['ESP32', 'C++', 'Embedded'],
    image: '/Mechmania.jpg',
  },
  {
    title: 'LangLua',
    description:
      'Chrome extension that turns any webpage into language immersion with inline translations, audio, and Gemini quizzes.',
    tags: ['Chrome MV3', 'React', 'Gemini', 'ElevenLabs'],
    image: '/Langlua.png',
    repo: 'https://github.com/Fyre-Aspect/LangLUI',
  },
  {
    title: 'Lyra Tutor AI',
    description:
      'AI teaching assistant that joins Discord voice calls and answers questions live. Built in 36 hours at Hack the Valley.',
    tags: ['TypeScript', 'Discord API', 'Next.js'],
    image: '/Tutor Bot.png',
    repo: 'https://github.com/Fyre-Aspect/LyraTutorAI',
  },
  {
    title: 'Tidal Tasks',
    description:
      'AI task-management platform with real-time collaboration, analytics, and automated workflows. Admin development.',
    tags: ['React', 'Firebase', 'Gemini API'],
    image: '/Tidal Tasks.png',
    url: 'https://tidaltasks.app',
  },
];

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/Fyre-Aspect', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aamirali-tinwala', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:aamirtinwala7@gmail.com', icon: 'mail' },
  { label: 'Resume', href: '/Resume.pdf', icon: 'file' },
] as const;

/* ----------------------------------------------------------------------------
 * Icons
 * ------------------------------------------------------------------------- */

function SocialIcon({ name }: { name: string }) {
  const common = { width: 22, height: 22, fill: 'currentColor' as const };
  switch (name) {
    case 'github':
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'mail':
      return (
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 6L2 7" />
        </svg>
      );
    case 'file':
      return (
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3" />
        </svg>
      );
    default:
      return null;
  }
}

function ArrowIcon() {
  return (
    <svg className={styles.arrow} width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

/* ----------------------------------------------------------------------------
 * Component
 * ------------------------------------------------------------------------- */

export default function HomeShowcase() {
  const [active, setActive] = useState<string>('about');

  // On-scroll section highlighting for the sticky nav.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.inner}>
        {/* ---------- Sticky intro sidebar ---------- */}
        <header className={styles.sidebar}>
          <div className={styles.sidebarTop}>
            <p className={styles.chip}>ATmega328P // Aamir OS v1.0</p>
            <h1 className={styles.name}>Aamir Tinwala</h1>
            <h2 className={styles.role}>Web-App Developer &amp; Builder</h2>
            <p className={styles.tagline}>
              I build practical solutions that bridge the gap between bits and
              atoms — from AI-powered platforms to embedded microcontrollers.
            </p>

            <nav className={styles.nav} aria-label="In-page sections">
              <ul>
                {SECTIONS.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={`${styles.navLink} ${active === id ? styles.navActive : ''}`}
                    >
                      <span className={styles.navLine} />
                      <span className={styles.navText}>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <ul className={styles.socials}>
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                >
                  <SocialIcon name={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </header>

        {/* ---------- Scrollable content ---------- */}
        <main className={styles.content}>
          {/* About */}
          <section id="about" className={styles.section} aria-label="About">
            <h3 className={styles.mobileHeading}>About</h3>
            <div className={styles.prose}>
              <p>
                I&apos;m a developer and builder who likes shipping things that
                actually work — whether that&apos;s an AI platform under a
                hackathon deadline or a microcontroller talking to hardware I
                wired myself. I&apos;m currently a Grade 11 IB student balancing
                competitive math, research, and a steady stream of side projects.
              </p>
              <p>
                Right now I&apos;m an <strong>Admin Developer at Tidal Tasks AI</strong>,
                shipping features for an AI task-management startup. Recently I
                presented a <strong>saliency-aware video codec</strong> at STEAM
                ICAC 2026 (University of Toronto) and took{' '}
                <strong>1st place at MechMania</strong> building the controller
                from scratch.
              </p>
              <p>
                Outside of code you&apos;ll find me at hackathons, on the tennis
                court, or logging volunteer hours across the community.
              </p>
            </div>
          </section>

          {/* Experience */}
          <section id="experience" className={styles.section} aria-label="Experience">
            <h3 className={styles.mobileHeading}>Experience</h3>
            <ol className={styles.list}>
              {EXPERIENCE.map((job) => {
                const Card = (
                  <>
                    <div className={styles.cardGlow} aria-hidden="true" />
                    <p className={styles.range}>{job.range}</p>
                    <div className={styles.cardBody}>
                      <h4 className={styles.cardTitle}>
                        {job.title} <span className={styles.at}>·</span>{' '}
                        <span className={styles.org}>{job.org}</span>
                        {job.url && <ArrowIcon />}
                      </h4>
                      <p className={styles.cardDesc}>{job.description}</p>
                      <ul className={styles.tagRow}>
                        {job.tags.map((t) => (
                          <li key={t} className={styles.tag}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                );
                return (
                  <li key={job.title} className={styles.card}>
                    {job.url ? (
                      <a className={styles.cardLink} href={job.url} target="_blank" rel="noopener noreferrer">
                        {Card}
                      </a>
                    ) : (
                      <div className={styles.cardLink}>{Card}</div>
                    )}
                  </li>
                );
              })}
            </ol>
            <Link href="/activities" className={styles.moreLink}>
              View Full Experience <ArrowIcon />
            </Link>
          </section>

          {/* Projects */}
          <section id="projects" className={styles.section} aria-label="Projects">
            <h3 className={styles.mobileHeading}>Projects</h3>
            <ol className={styles.list}>
              {PROJECTS.map((p) => {
                const href = p.url || p.repo;
                const Card = (
                  <>
                    <div className={styles.cardGlow} aria-hidden="true" />
                    <div className={styles.thumb}>
                      <img src={p.image} alt={p.title} loading="lazy" />
                    </div>
                    <div className={styles.cardBody}>
                      <h4 className={styles.cardTitle}>
                        {p.title}
                        {href && <ArrowIcon />}
                      </h4>
                      <p className={styles.cardDesc}>{p.description}</p>
                      <ul className={styles.tagRow}>
                        {p.tags.map((t) => (
                          <li key={t} className={styles.tag}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                );
                return (
                  <li key={p.title} className={`${styles.card} ${styles.projectCard}`}>
                    {href ? (
                      <a className={styles.cardLink} href={href} target="_blank" rel="noopener noreferrer">
                        {Card}
                      </a>
                    ) : (
                      <div className={styles.cardLink}>{Card}</div>
                    )}
                  </li>
                );
              })}
            </ol>
            <Link href="/projects" className={styles.moreLink}>
              View All Projects <ArrowIcon />
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
}
