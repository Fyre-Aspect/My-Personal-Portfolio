import styles from './SkyScene.module.css';

function Cloud({ className, style }: { className?: string; style?: React.CSSProperties }) {
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

/**
 * Fixed sky-gradient backdrop with slowly drifting clouds. Sits behind page
 * content (z-index 0) so the whole page feels like it lives in the sky.
 */
export default function SkyScene() {
  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.gradient} />
      <Cloud className={styles.drift1} style={{ top: '8%', color: '#ffffff' }} />
      <Cloud className={styles.drift2} style={{ top: '24%', color: '#f4faff' }} />
      <Cloud className={styles.drift3} style={{ top: '52%', color: '#ffffff' }} />
      <Cloud className={styles.drift1} style={{ top: '70%', color: '#eef6ff' }} />
      <Cloud className={styles.drift2} style={{ top: '88%', color: '#ffffff' }} />
    </div>
  );
}
