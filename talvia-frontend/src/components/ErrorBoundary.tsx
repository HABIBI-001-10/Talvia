import { Component, type ErrorInfo, type ReactNode } from 'react';
import TalviaLogo from './TalviaLogo';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Production-ready React Error Boundary for TALVIA.
 * Gracefully captures rendering errors, prevents blank white screens,
 * hides raw technical traces from visitors, and offers recovery actions.
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error('[TALVIA ErrorBoundary] Uncaught render error:', error, errorInfo);
    }
  }

  private handleTryAgain = (): void => {
    this.setState({ hasError: false });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16"
        >
          <div className="mb-6">
            <TalviaLogo variant="dark" className="h-10 md:h-12" showTagline />
          </div>

          <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-[#C59B4E] border border-amber-200/80 mb-5 shadow-sm">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Something went wrong
          </h1>

          <p className="text-slate-600 max-w-md text-sm sm:text-base mb-8 leading-relaxed">
            We encountered an unexpected issue while loading this page. Please try again or return to the homepage to continue exploring our admissions guidance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={this.handleTryAgain}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-[#141824] hover:bg-[#1E2638] text-white shadow-sm transition-colors cursor-pointer"
            >
              Try Again
            </button>
            <a
              href="/"
              className="px-6 py-2.5 rounded-xl font-semibold text-sm border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 bg-white shadow-sm transition-colors"
            >
              Go to Homepage
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
