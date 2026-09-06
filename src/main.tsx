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

// Sentry is loaded after the app has painted, not before — error
// monitoring doesn't need to be ready in the first 100ms, and this
// keeps its ~100KB+ off the critical rendering path so it can't slow
// down first paint / LCP.
const loadSentry = () => import('./lib/sentry').then((m) => m.initSentry());
if ('requestIdleCallback' in window) {
  (window as typeof window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadSentry);
} else {
  setTimeout(loadSentry, 1500);
}
