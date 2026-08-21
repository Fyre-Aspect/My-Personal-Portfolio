'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(max-width: 768px)';

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

// SSR renders the desktop layout (server snapshot is false); the real value
// takes over right after hydration and tracks live viewport resizes.
export function useIsMobile(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
}
