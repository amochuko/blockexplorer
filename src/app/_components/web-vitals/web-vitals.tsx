'use client';
import { useReportWebVitals } from 'next/web-vitals';


// Send app metrics to service report
export function WebVitals() {
  
  useReportWebVitals((m) => {
    console.log(m);
    const url = String(process.env.DOMAIN_HOST);

    const body = JSON.stringify(m);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      fetch(url, { body, method: 'POST', keepalive: true });
    }
  });
}
