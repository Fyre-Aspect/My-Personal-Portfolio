'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './HeroSection.module.css';

const roles = ["Web-App Developer", "Lab Intern", "Grade 11 HS Student", "IB Student"];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const cycle = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(cycle);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.icChip}>ATmega328P // Aamir OS v1.0</div>
        
        <div className={styles.terminalBadge}>
          $ aamir --status=available-for-hire
        </div>
        
        <h1 className={styles.mainHeading}>Aamir Tinwala</h1>
        
        <div className={styles.roleCycleWrapper}>
          <div key={roleIndex} className={styles.roleText}>
            {roles[roleIndex]}
          </div>
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
