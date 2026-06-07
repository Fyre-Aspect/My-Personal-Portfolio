'use client';
import { useEffect, useRef } from 'react';
import styles from './CursorSpotlight.module.css';

/**
 * A soft accent-colored glow that trails the cursor across the home dashboard.
 * Signature "premium portfolio" touch — disabled on touch devices and when the
 * user prefers reduced motion. Sits above the PCB grid but below page content.
 */
export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    const el = ref.current;
    if (!el) return;
 
    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;1
    let curX = targetX;
    let curY = targetY;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      el.style.opacity = '1';
    };
    const onLeave = () => {
      el.style.opacity = '0';
    };

    const tick = () => {
      // Ease toward the cursor for a smooth, weighted trail.
      curX += (targetX - curX) * 0.15;
      curY += (targetY - curY) * 0.15;
      el.style.setProperty('--x', `${curX}px`);
      el.style.setProperty('--y', `${curY}px`);
      raf = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <div ref={ref} className={styles.spotlight} aria-hidden="true" />;
}
