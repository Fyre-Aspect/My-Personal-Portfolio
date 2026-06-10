'use client';

import dynamic from 'next/dynamic';
import styles from './SkyWorld.module.css';

/* WebGL is browser-only, so the content-page sky is loaded client-side with a
   warm golden-hour gradient fallback painted in its place until the chunk + sky
   GLB arrive. */
const SkyBackdrop = dynamic(() => import('./SkyBackdrop'), {
  ssr: false,
  loading: () => <div className={styles.fallbackWarm} aria-hidden="true" />,
});

export default function SkyBackdropMount() {
  return <SkyBackdrop />;
}
