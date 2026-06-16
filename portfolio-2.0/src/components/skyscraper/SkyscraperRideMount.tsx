'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import styles from './SkyscraperRide.module.css';

// Client-only: the climb is a WebGL canvas that reads window scroll, so it must
// never render on the server. The blue gradient fallback fills the viewport
// until the chunk + GLB arrive (and on devices without WebGL).
const SkyscraperRide = dynamic(() => import('./SkyscraperRide'), {
  ssr: false,
  loading: () => <div className={styles.fallback} aria-hidden="true" />,
});

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export default function SkyscraperRideMount() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(hasWebGL());
  }, []);

  if (!ready) return <div className={styles.fallback} aria-hidden="true" />;
  return <SkyscraperRide />;
}
