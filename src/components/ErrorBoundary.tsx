import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches rendering errors anywhere in the tree below it and shows a
 * graceful fallback instead of a blank white page. This is a class
 * component because React error boundaries currently require the
 * componentDidCatch lifecycle — there is no hook equivalent.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('LiAfrik: uncaught render error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen grid place-items-center px-4 bg-cloud-50">
          <div className="max-w-md text-center">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-liafrik-600 to-cyanx-500 grid place-items-center shadow-glow-blue mb-6">
              <RefreshCw className="h-7 w-7 text-white" />
            </div>
            <h1 className="font-display text-2xl font-bold text-ink mb-2">
              Something went wrong
            </h1>
            <p className="text-ink-muted mb-8">
              An unexpected error occurred. Please try reloading the page — if it keeps happening, our team has been notified.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 rounded-full bg-liafrik-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-liafrik-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4" /> Reload
              </button>
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-cloud-300 text-ink-soft px-5 py-2.5 text-sm font-semibold hover:bg-white transition-colors"
              >
                <Home className="h-4 w-4" /> Go home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
