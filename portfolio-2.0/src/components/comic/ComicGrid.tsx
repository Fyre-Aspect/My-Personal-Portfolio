'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ComicGrid.module.css';
import { claimIfNone, engage, isEngaged, release } from './gridFocus';

export interface ComicAction {
  key: 'E' | 'Q' | 'X';
  label: string;
  href: string;
}

export interface ComicItem {
  title: string;
  subtitle: string;
  badge?: string | null;
  image?: string | null;
  description: string;
  tags: string[];
  actions: ComicAction[];
}

const SHAPES = ['big', 'wide', 'small', 'tall', 'small', 'wide', 'small', 'tall', 'small'] as const;
const TILT = ['-1.4deg', '1deg', '-0.6deg', '0.8deg', '-1deg', '0.5deg'];
const COLUMNS = 3;

export default function ComicGrid({ items }: { items: ComicItem[] }) {
  // Keyboard focus only — hover expansion is handled natively by CSS :hover,
  // so it collapses the moment the pointer leaves.
  const [focused, setFocused] = useState<number | null>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const idRef = useRef<symbol>(Symbol('comic-grid'));

  // Claim keyboard control on mount; release on unmount.
  useEffect(() => {
    const id = idRef.current;
    claimIfNone(id);
    return () => release(id);
  }, []);

  // Window-level key handling so arrows work without clicking in first.
  useEffect(() => {
    const id = idRef.current;

    const moveTo = (i: number) => {
      const clamped = Math.max(0, Math.min(items.length - 1, i));
      setFocused(clamped);
      const el = tileRefs.current[clamped];
      el?.focus({ preventScroll: false });
    };

    const onKey = (e: KeyboardEvent) => {
      if (!isEngaged(id)) return;
      const i = focused ?? 0;
      switch (e.key) {
        case 'ArrowRight': e.preventDefault(); moveTo(focused === null ? 0 : i + 1); break;
        case 'ArrowLeft': e.preventDefault(); moveTo(focused === null ? 0 : i - 1); break;
        case 'ArrowDown': e.preventDefault(); moveTo(focused === null ? 0 : i + COLUMNS); break;
        case 'ArrowUp': e.preventDefault(); moveTo(focused === null ? 0 : i - COLUMNS); break;
        case 'e': case 'E': case 'q': case 'Q': case 'x': case 'X': {
          if (focused === null) return;
          const action = items[focused].actions.find((a) => a.key === e.key.toUpperCase());
          if (action) { e.preventDefault(); window.open(action.href, '_blank', 'noopener,noreferrer'); }
          break;
        }
        case 'Enter': case ' ': {
          if (focused === null) return;
          const first = items[focused].actions[0];
          if (first) { e.preventDefault(); window.open(first.href, '_blank', 'noopener,noreferrer'); }
          break;
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focused, items]);

  return (
    <div
      className={styles.grid}
      role="grid"
      aria-label="Cards"
      onMouseEnter={() => engage(idRef.current)}
    >
      {items.map((item, i) => {
        const shape = SHAPES[i % SHAPES.length];
        return (
          <div
            key={item.title}
            ref={(el) => { tileRefs.current[i] = el; }}
            className={`${styles.tile} ${styles[shape]} ${focused === i ? styles.focused : ''}`}
            style={{ ['--tilt' as string]: TILT[i % TILT.length] }}
            role="gridcell"
            tabIndex={i === (focused ?? 0) ? 0 : -1}
            aria-label={`${item.title}. ${item.subtitle}.`}
            onMouseEnter={() => engage(idRef.current)}
            onFocus={() => { engage(idRef.current); setFocused(i); }}
            onClick={() => {
              const first = item.actions[0];
              if (first) window.open(first.href, '_blank', 'noopener,noreferrer');
            }}
          >
            <div className={styles.panelInk} aria-hidden="true" />

            <div className={styles.media}>
              {item.image ? (
                <img src={item.image} alt={item.title} loading="lazy" draggable={false} />
              ) : (
                <div className={styles.mediaFallback}>{item.title.charAt(0)}</div>
              )}
              <div className={styles.halftone} aria-hidden="true" />
            </div>

            {item.badge && <span className={styles.badge}>{item.badge}</span>}

            <div className={styles.label}>
              <span className={styles.role}>{item.subtitle}</span>
              <h3 className={styles.title}>{item.title}</h3>
            </div>

            <div className={styles.expand}>
              <p className={styles.desc}>{item.description}</p>
              <div className={styles.tags}>
                {item.tags.slice(0, 5).map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
              {item.actions.length > 0 && (
                <div className={styles.actions}>
                  {item.actions.map((a) => (
                    <a
                      key={a.key}
                      className={styles.action}
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <kbd>{a.key}</kbd> {a.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
