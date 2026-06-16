'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import styles from './CoasterRide.module.css';

// Client-only: the ride is a WebGL canvas that reads window scroll, so it must
// never render on the server. The warm gradient fallback fills the viewport
// until the chunk + GLB arrive (and on devices without WebGL).
const CoasterRide = dynamic(() => import('./CoasterRide'), {
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

export default function CoasterRideMount() {
  const [ride, setRide] = useState(false);

  useEffect(() => {
    setRide(hasWebGL());
  }, []);

  if (!ride) return <div className={styles.fallback} aria-hidden="true" />;
  return <CoasterRide />;
}
