import * as Sentry from '@sentry/react';

// Public client-side DSN — safe to ship in the bundle (Sentry DSNs are
// designed to be public; they only allow *sending* events, not reading
// project data). Can be overridden via VITE_SENTRY_DSN if you'd rather
// keep it out of source control.
const DSN =
  import.meta.env.VITE_SENTRY_DSN ||
  'https://cf1e6a5a625c0d32ab9138e1ff4efada@o4512032831045632.ingest.de.sentry.io/4512032839172176';

export function initSentry() {
  Sentry.init({
    dsn: DSN,
    environment: import.meta.env.MODE,
    // Keep this update-to-date with the app version if/when one is set.
    integrations: [Sentry.browserTracingIntegration()],
    // Trace a small sample of transactions in production, all of them in dev.
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
    // Don't spam Sentry with noisy, non-actionable browser extension errors.
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
      'Non-Error promise rejection captured',
    ],
  });
}

export { Sentry };
