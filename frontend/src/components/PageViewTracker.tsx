'use client';

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";
import { usePathname } from "next/navigation";

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track if consent is already given
    const consentGiven = document.cookie
      .split('; ')
      .find(row => row.startsWith('consent_given='))
      ?.split('=')[1];
      
    if (consentGiven === 'true') {
      // Get or generate user ID
      let userId = '';
      
      if (typeof window !== 'undefined') {
        userId = localStorage.getItem('userId') || crypto.randomUUID();
        localStorage.setItem('userId', userId);
      }

      // Track page view
      analytics.trackPageView(userId);
    }
    
    // Setup beforeunload listener
    const handleBeforeUnload = () => {
      analytics.flushBeforeUnload();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      analytics.flush();
    };
  }, [pathname]); // Re-track when route changes

  return null;
}
