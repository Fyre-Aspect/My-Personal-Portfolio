'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getAnalytics, isSupported, logEvent, Analytics as FirebaseAnalytics } from "firebase/analytics";
import { app } from '@/lib/firebase';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [analytics, setAnalytics] = useState<FirebaseAnalytics | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      isSupported().then((supported) => {
        if (supported) {
          const instance = getAnalytics(app);
          setAnalytics(instance);
          console.log("Firebase Analytics initialized successfully");
        } else {
          console.warn("Firebase Analytics is not supported in this environment");
        }
      }).catch((err) => {
        console.error("Firebase Analytics initialization failed:", err);
      });
    }
  }, []);

  useEffect(() => {
    if (analytics && pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      
      // Log page_view event to track user navigation and engagement time per page
      logEvent(analytics, 'page_view', {
        page_path: url,
        page_title: document.title || 'Portfolio'
      });
      
      console.log(`Analytics: Page view logged for ${url}`);
    }
  }, [pathname, searchParams, analytics]);

  return null;
}
