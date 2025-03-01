export function useCookieConsent() {
  const [consentStatus, setConsentStatus] = useState<'unknown' | 'accepted' | 'rejected'>('unknown');
  
  useEffect(() => {
    // Check existing cookie
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('consent_given='))
      ?.split('=')[1];
      
    if (cookieValue === 'true') {
      setConsentStatus('accepted');
    } else if (cookieValue === 'false') {
      setConsentStatus('rejected');
    }
  }, []);
  
  const acceptCookies = useCallback(() => {
    document.cookie = "consent_given=true; max-age=31536000; path=/";
    setConsentStatus('accepted');
    // Initialize analytics
    const analytics = AnalyticsService.getInstance();
    analytics.initialize();
    analytics.trackPageView();
  }, []);
  
  const rejectCookies = useCallback(() => {
    document.cookie = "consent_given=false; max-age=31536000; path=/";
    setConsentStatus('rejected');
  }, []);
  
  return { consentStatus, acceptCookies, rejectCookies };
}