'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './JourneyPlayer.module.css';

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function JourneyPlayer() {
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef<number | null>(null);
  // Track the last y we set so we can detect user-driven scroll vs our own.
  const lastSetY = useRef<number>(-1);

  const stop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastSetY.current = -1;
    setPlaying(false);
  }, []);

  const play = useCallback(() => {
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY >= maxY - 8) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    const startY = window.scrollY;
    const targetY = maxY;
    const distance = targetY - startY;
    if (distance <= 0) return;

    const duration = Math.max(5000, 26000 * (distance / Math.max(maxY, 1)));
    const startTime = performance.now();
    setPlaying(true);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const nextY = Math.round(startY + distance * easeInOutCubic(t));
      lastSetY.current = nextY;
      document.documentElement.scrollTop = nextY;
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
        lastSetY.current = -1;
        setPlaying(false);
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  // Cancel only on genuine user scroll (their scrollTop differs from what we set).
  useEffect(() => {
    if (!playing) return;

    const onScroll = () => {
      const actual = Math.round(document.documentElement.scrollTop);
      // Allow ±3px tolerance for sub-pixel rounding; only cancel on real deviation.
      if (lastSetY.current >= 0 && Math.abs(actual - lastSetY.current) > 3) {
        stop();
      }
    };

    // touchstart = user put a finger down = intent to take over
    const onTouchStart = () => stop();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('keydown', stop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('keydown', stop);
    };
  }, [playing, stop]);

  useEffect(() => () => stop(), [stop]);

  return (
    <button
      type="button"
      className={styles.player}
      onClick={() => (playing ? stop() : play())}
      aria-label={playing ? 'Stop the journey' : 'Play the journey'}
    >
      <span className={styles.icon} aria-hidden="true">
        {playing ? (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M8 5.14v13.72c0 .79.87 1.27 1.54.84l10.78-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z" />
          </svg>
        )}
      </span>
      {playing ? 'Stop' : 'Play'}
    </button>
  );
}
