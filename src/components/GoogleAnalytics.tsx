import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    const fetchAndInitGA = async () => {
      try {
        const settingsDoc = await getDoc(doc(db, 'settings', 'global'));
        if (settingsDoc.exists()) {
          const data = settingsDoc.data();
          const measurementId = data.gaMeasurementId;

          if (measurementId && typeof measurementId === 'string' && measurementId.trim() !== '') {
            // Only inject script once
            if (!document.getElementById('ga-script')) {
              const script = document.createElement('script');
              script.id = 'ga-script';
              script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
              script.async = true;
              document.head.appendChild(script);

              window.dataLayer = window.dataLayer || [];
              window.gtag = function() {
                window.dataLayer.push(arguments);
              };
              window.gtag('js', new Date());
            }

            // Send page view on every location change
            window.gtag('config', measurementId, {
              page_path: location.pathname + location.search,
            });
          }
        }
      } catch (error) {
        console.error('Error initializing GA:', error);
      }
    };

    fetchAndInitGA();
  }, [location.pathname, location.search]);

  return null;
}
