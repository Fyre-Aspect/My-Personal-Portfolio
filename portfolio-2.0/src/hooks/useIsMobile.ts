'use client';

import { useSyncExternalStore } from 'react';

// Narrow viewports, plus touch devices held sideways (a phone in landscape is
// ~850px wide — wider than the breakpoint — but its short height + coarse
// pointer give it away). Keeps phones on the mobile experience in both
// orientations instead of falling back to the desktop layout when rotated.
const QUERY = '(max-width: 768px), (pointer: coarse) and (max-height: 500px)';

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
