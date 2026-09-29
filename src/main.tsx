import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

// Sentry is loaded well after the app has painted — error monitoring
// doesn't need to be ready in the first seconds, and its ~160KB competes
// with the app for the main thread on phones. It starts on the first user
// interaction, or 5s after the page has fully loaded, whichever comes
// first. Errors raised before it is ready are buffered and reported as
// soon as it starts, so nothing is lost.
const earlyErrors: unknown[] = [];
const bufferError = (e: ErrorEvent) => { if (earlyErrors.length < 10) earlyErrors.push(e.error ?? e.message); };
const bufferRejection = (e: PromiseRejectionEvent) => { if (earlyErrors.length < 10) earlyErrors.push(e.reason); };
window.addEventListener('error', bufferError);
window.addEventListener('unhandledrejection', bufferRejection);

const INTERACTIONS = ['pointerdown', 'keydown', 'touchstart'] as const;
let sentryStarted = false;
const startSentry = () => {
  if (sentryStarted) return;
  sentryStarted = true;
  INTERACTIONS.forEach((evt) => window.removeEventListener(evt, startSentry));
  import('./lib/sentry').then((m) => {
    m.initSentry();
    window.removeEventListener('error', bufferError);
    window.removeEventListener('unhandledrejection', bufferRejection);
    earlyErrors.forEach((err) => m.Sentry.captureException(err));
    earlyErrors.length = 0;
  });
};
INTERACTIONS.forEach((evt) => window.addEventListener(evt, startSentry, { once: true, passive: true }));
const scheduleSentry = () => setTimeout(startSentry, 5000);
if (document.readyState === 'complete') scheduleSentry();
else window.addEventListener('load', scheduleSentry, { once: true });
