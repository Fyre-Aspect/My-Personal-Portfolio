'use client';

import { useCallback, useRef, useState } from 'react';
import type { AchievementItem } from '../../data/achievements';
import styles from '../projects/ProjectGrid.module.css';

const SHAPES = ['big', 'wide', 'small', 'tall', 'small', 'wide', 'small', 'tall', 'small'] as const;
const TILT = ['-1.4deg', '1deg', '-0.6deg', '0.8deg', '-1deg', '0.5deg'];

const COLUMNS = 3;

export default function AchievementGrid({ items }: { items: AchievementItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  const focusTile = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(items.length - 1, i));
    setActive(clamped);
    tileRefs.current[clamped]?.focus();
  }, [items.length]);

  const openLink = useCallback(() => {
    if (active === null) return;
    const link = items[active].link;
    if (link) window.open(link, '_blank', 'noopener,noreferrer');
  }, [active, items]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = active ?? 0;
    switch (e.key) {
      case 'ArrowRight': e.preventDefault(); focusTile(i + 1); break;
      case 'ArrowLeft': e.preventDefault(); focusTile(i - 1); break;
      case 'ArrowDown': e.preventDefault(); focusTile(i + COLUMNS); break;
      case 'ArrowUp': e.preventDefault(); focusTile(i - COLUMNS); break;
      case 'e': case 'E': case 'Enter': case ' ':
        e.preventDefault();
        openLink();
        break;
    }
  };

  return (
    <div className={styles.grid} role="grid" aria-label="Achievements" onKeyDown={onKeyDown}>
      {items.map((a, i) => {
        const shape = SHAPES[i % SHAPES.length];
        const isActive = active === i;
        return (
          <div
            key={a.title}
            ref={(el) => { tileRefs.current[i] = el; }}
            className={`${styles.tile} ${styles[shape]} ${isActive ? styles.active : ''}`}
            style={{ ['--tilt' as string]: TILT[i % TILT.length] }}
            role="gridcell"
            tabIndex={i === (active ?? 0) ? 0 : -1}
            aria-label={`${a.title}. ${a.growthAspect}.`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => { if (a.link) window.open(a.link, '_blank', 'noopener,noreferrer'); }}
          >
            <div className={styles.panelInk} aria-hidden="true" />

            <div className={styles.media}>
              {a.image ? (
                <img src={a.image} alt={a.title} loading="lazy" draggable={false} />
              ) : (
                <div className={styles.mediaFallback}>{a.title.charAt(0)}</div>
              )}
              <div className={styles.halftone} aria-hidden="true" />
            </div>

            <span className={styles.badge}>{a.growthAspect}</span>

            <div className={styles.label}>
              <span className={styles.role}>{a.date}</span>
              <h3 className={styles.title}>{a.title}</h3>
            </div>

            <div className={styles.expand}>
              <p className={styles.desc}>{a.description}</p>
              <div className={styles.tags}>
                <span className={styles.tag}>{a.growthAspect}</span>
                <span className={styles.tag}>{a.date}</span>
              </div>
              {a.link && (
                <div className={styles.actions}>
                  <a
                    className={styles.action}
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <kbd>E</kbd> {a.linkLabel || 'View'}
                  </a>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
