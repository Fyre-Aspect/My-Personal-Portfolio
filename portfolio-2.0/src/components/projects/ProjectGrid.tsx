'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { projects, type Project } from '../../data/projects';
import styles from './ProjectGrid.module.css';

// Comic-panel size pattern — repeats across the grid for varied "bento" shapes.
const SHAPES = ['big', 'wide', 'small', 'tall', 'small', 'wide', 'small', 'tall', 'small'] as const;
const TILT = ['-1.4deg', '1deg', '-0.6deg', '0.8deg', '-1deg', '0.5deg'];

const COLUMNS = 3;

interface Action {
  key: 'E' | 'Q' | 'X';
  label: string;
  href: string;
}

function actionsFor(p: Project): Action[] {
  const out: Action[] = [];
  if (p.liveUrl) out.push({ key: 'E', label: p.demoLabel || 'Live Demo', href: p.liveUrl });
  if (p.githubUrl) out.push({ key: 'Q', label: 'Code', href: p.githubUrl });
  if (p.videoUrl) out.push({ key: 'X', label: 'Video', href: p.videoUrl });
  return out;
}

export default function ProjectGrid() {
  const [active, setActive] = useState<number | null>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  const focusTile = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(projects.length - 1, i));
    setActive(clamped);
    tileRefs.current[clamped]?.focus();
  }, []);

  const openAction = useCallback((key: string) => {
    if (active === null) return;
    const action = actionsFor(projects[active]).find((a) => a.key === key.toUpperCase());
    if (action) window.open(action.href, '_blank', 'noopener,noreferrer');
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = active ?? 0;
    switch (e.key) {
      case 'ArrowRight': e.preventDefault(); focusTile(i + 1); break;
      case 'ArrowLeft': e.preventDefault(); focusTile(i - 1); break;
      case 'ArrowDown': e.preventDefault(); focusTile(i + COLUMNS); break;
      case 'ArrowUp': e.preventDefault(); focusTile(i - COLUMNS); break;
      case 'e': case 'E': case 'q': case 'Q': case 'x': case 'X':
        e.preventDefault();
        openAction(e.key);
        break;
      case 'Enter': case ' ': {
        e.preventDefault();
        const first = actionsFor(projects[i])[0];
        if (first) window.open(first.href, '_blank', 'noopener,noreferrer');
        break;
      }
    }
  };

  // Reset roving tabindex target if list changes (defensive)
  useEffect(() => {
    tileRefs.current = tileRefs.current.slice(0, projects.length);
  }, []);

  return (
    <div
      className={styles.grid}
      role="grid"
      aria-label="Projects"
      onKeyDown={onKeyDown}
    >
      {projects.map((p, i) => {
        const shape = SHAPES[i % SHAPES.length];
        const isActive = active === i;
        const acts = actionsFor(p);
        return (
          <div
            key={p.title}
            ref={(el) => { tileRefs.current[i] = el; }}
            className={`${styles.tile} ${styles[shape]} ${isActive ? styles.active : ''}`}
            style={{ ['--tilt' as string]: TILT[i % TILT.length] }}
            role="gridcell"
            tabIndex={i === (active ?? 0) ? 0 : -1}
            aria-label={`${p.title}. ${p.role}.`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => {
              const first = acts[0];
              if (first) window.open(first.href, '_blank', 'noopener,noreferrer');
            }}
          >
            <div className={styles.panelInk} aria-hidden="true" />

            <div className={styles.media}>
              {p.image ? (
                <img src={p.image} alt={p.title} loading="lazy" draggable={false} />
              ) : (
                <div className={styles.mediaFallback}>{p.title.charAt(0)}</div>
              )}
              <div className={styles.halftone} aria-hidden="true" />
            </div>

            {p.status && <span className={styles.badge}>{p.status}</span>}

            <div className={styles.label}>
              <span className={styles.role}>{p.role}</span>
              <h3 className={styles.title}>{p.title}</h3>
            </div>

            {/* Expanded panel — revealed on hover / arrow focus */}
            <div className={styles.expand}>
              <p className={styles.desc}>{p.description}</p>
              <div className={styles.tags}>
                {p.technologies.slice(0, 5).map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
              {acts.length > 0 && (
                <div className={styles.actions}>
                  {acts.map((a) => (
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
