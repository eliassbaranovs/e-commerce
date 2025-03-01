import { useState, useEffect, useCallback } from "react";
import { analytics } from "@/lib/analytics"; // Import the analytics module

export function useCookieConsent() {
  const [consentStatus, setConsentStatus] = useState<
    "unknown" | "accepted" | "rejected"
  >("unknown");

  useEffect(() => {
    // Check existing cookie
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("consent_given="))
      ?.split("=")[1];

    if (cookieValue === "true") {
      setConsentStatus("accepted");
    } else if (cookieValue === "false") {
      setConsentStatus("rejected");
    }
  }, []);

  const acceptCookies = useCallback(() => {
    document.cookie = "consent_given=true; max-age=31536000; path=/";
    setConsentStatus("accepted");

    // Use the imported analytics module directly
    // Get or create user ID for tracking
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem("userId", userId);
    }

    // Track the page view
    analytics.trackPageView(userId);
  }, []);

  const rejectCookies = useCallback(() => {
    document.cookie = "consent_given=false; max-age=31536000; path=/";
    setConsentStatus("rejected");
  }, []);

  return { consentStatus, acceptCookies, rejectCookies };
}
