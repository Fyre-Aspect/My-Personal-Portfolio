'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './HeroSection.module.css';

const roles = ["Web-App Developer", "Lab Intern", "Grade 11 HS Student", "IB Student"];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];

    // Pause when a word is fully typed, then start deleting.
    if (!deleting && text === current) {
      const hold = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(hold);
    }

    // Once fully deleted, advance to the next role.
    if (deleting && text === '') {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const step = setTimeout(() => {
      setText((prev) =>
        deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
      );
    }, deleting ? 45 : 90);
    return () => clearTimeout(step);
  }, [text, deleting, roleIndex]);

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.icChip}>ATmega328P // Aamir OS v1.0</div>
        
        <div className={styles.terminalBadge}>
          $ aamir --status=available-for-hire
        </div>
        
        <h1 className={styles.mainHeading}>Aamir Tinwala</h1>
        
        <div className={styles.roleCycleWrapper}>
          <span className={styles.rolePrefix}>&gt;_</span>
          <span className={styles.roleText}>{text}</span>
          <span className={styles.typeCaret} aria-hidden="true"></span>
        </div>

        <p className={styles.bio}>
          I build practical solutions that bridge the gap between bits and atoms. 
          From AI-powered platforms to embedded microcontrollers. Exploring the bounds of what&apos;s possible.
        </p>

        <div className={styles.ctaGroup}>
          <Link href="/projects" className="cta-button primary">View My Work →</Link>
          <Link href="mailto:aamirtinwala@example.com" className="cta-button secondary">Get In Touch</Link>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statItem}>2+ Years Exp</div>
          <div className={styles.statItem}>10+ Projects</div>
          <div className={styles.statItem}>300+ Commits</div>
          <div className={styles.statItem}>100+ Volunteer Hrs</div>
        </div>
      </div>
      
      <div className={styles.scrollIndicator}>↓</div>
    </section>
  );
}
