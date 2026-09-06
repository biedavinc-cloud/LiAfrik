import * as Sentry from '@sentry/react';

// Public client-side DSN — safe to ship in the bundle (Sentry DSNs are
// designed to be public; they only allow *sending* events, not reading
// project data). Can be overridden via VITE_SENTRY_DSN if you'd rather
// keep it out of source control.
const DSN =
  import.meta.env.VITE_SENTRY_DSN ||
  'https://cf1e6a5a625c0d32ab9138e1ff4efada@o4512032831045632.ingest.de.sentry.io/4512032839172176';

let initialized = false;

export function initSentry() {
  if (initialized) return;
  initialized = true;
  Sentry.init({
    dsn: DSN,
    environment: import.meta.env.MODE,
    // Error capture only — no performance tracing integration, which
    // keeps this deferred chunk as small as possible. Global error and
    // unhandled-rejection capture are included by default in Sentry.init.
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
      'Non-Error promise rejection captured',
    ],
  });
}

export { Sentry };
