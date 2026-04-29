import { useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function GoogleAnalytics() {
  useEffect(() => {
    const fetchAndInitGA = async () => {
      try {
        const settingsDoc = await getDoc(doc(db, 'settings', 'global'));
        if (settingsDoc.exists()) {
          const data = settingsDoc.data();
          const measurementId = data.gaMeasurementId;

          if (measurementId && typeof measurementId === 'string' && measurementId.trim() !== '') {
            console.log('Initializing Google Analytics with ID:', measurementId);
            
            // Inject script tag
            const script = document.createElement('script');
            script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
            script.async = true;
            document.head.appendChild(script);

            // Initialize gtag
            window.dataLayer = window.dataLayer || [];
            window.gtag = function() {
              window.dataLayer.push(arguments);
            };
            window.gtag('js', new Date());
            window.gtag('config', measurementId, {
              page_path: window.location.pathname,
            });
          }
        }
      } catch (error) {
        console.error('Error initializing GA:', error);
      }
    };

    fetchAndInitGA();
  }, []);

  return null;
}
