"use client";
import { useEffect, useState } from "react";
import { analytics } from "@/lib/analytics";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  
  // Check if consent has been previously given
  useEffect(() => {
    const consentStatus = document.cookie
      .split('; ')
      .find(row => row.startsWith('consent_given='))
      ?.split('=')[1];
    
    if (consentStatus === undefined) {
      setShowBanner(true);
    }
  }, []);
  
  const acceptCookies = () => {
    // Set consent cookie
    document.cookie = "consent_given=true; max-age=31536000; path=/";
    setShowBanner(false);
    
    // Trigger analytics tracking after consent is given
    const userId = localStorage.getItem('userId') || crypto.randomUUID();
    localStorage.setItem('userId', userId);
    analytics.trackPageView(userId);
  };
  
  const rejectCookies = () => {
    document.cookie = "consent_given=false; max-age=31536000; path=/";
    setShowBanner(false);
  };
  
  if (!showBanner) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="mb-4 md:mb-0">
          We use cookies to improve your experience on our site.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={rejectCookies}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            Reject
          </button>
          <button 
            onClick={acceptCookies}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
