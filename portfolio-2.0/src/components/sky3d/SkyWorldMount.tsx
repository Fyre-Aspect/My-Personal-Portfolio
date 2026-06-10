'use client';

import dynamic from 'next/dynamic';
import styles from './SkyWorld.module.css';

/* WebGL is browser-only, so the scene is loaded client-side with a day-to-dusk
   gradient fallback painted in its place until the chunk + GLBs arrive. */
const SkyWorld = dynamic(() => import('./SkyWorld'), {
  ssr: false,
  loading: () => <div className={styles.fallback} aria-hidden="true" />,
});

export default function SkyWorldMount() {
  return <SkyWorld />;
}
