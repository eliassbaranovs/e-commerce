"use client";

import { useEffect, useCallback } from "react";
import { analytics } from "@/lib/analytics";

// Get or generate a user ID
const getUserId = () => {
  if (typeof window === "undefined") {
    return "";
  }

  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("userId", userId);
  }
  return userId;
};

export function useAnalytics() {
  // Set up event listener for page unload
  useEffect(() => {
    window.addEventListener("beforeunload", analytics.flushBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", analytics.flushBeforeUnload);
      analytics.cleanup();
    };
  }, []);

  // Create wrapped tracking functions that automatically include userId
  const trackPageView = useCallback(() => {
    const userId = getUserId();
    analytics.trackPageView(userId);
  }, []);

  const trackVideoStart = useCallback(
    (data: { videoId: string; duration: number; currentTime: number }) => {
      const userId = getUserId();
      analytics.trackVideoStart({
        ...data,
        userId,
      });
    },
    []
  );

  const trackVideoPause = useCallback(
    (data: { videoId: string; duration: number; currentTime: number }) => {
      const userId = getUserId();
      analytics.trackVideoPause({
        ...data,
        userId,
      });
    },
    []
  );

  const trackVideoComplete = useCallback(
    (data: {
      videoId: string;
      duration: number;
      watchTime: number;
      completed: boolean;
    }) => {
      const userId = getUserId();
      analytics.trackVideoComplete({
        ...data,
        userId,
      });
    },
    []
  );

  return {
    trackPageView,
    trackVideoStart,
    trackVideoPause,
    trackVideoComplete,
  };
}
