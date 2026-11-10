import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ text = 'Loading...', size = 'md' }: LoadingSpinnerProps) {
  const sizeClass = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-12 h-12' : 'w-9 h-9';
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <Loader2 className={`${sizeClass} text-black animate-spin`} />
      {text && <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">{text}</p>}
    </div>
  );
}

export function ErrorMessage({ message = 'Something went wrong. Please try again.', onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-xl border border-zinc-200">
        ⚠️
      </div>
      <p className="text-zinc-700 max-w-md text-sm">{message}</p>
      {onRetry ? (
        <button
          onClick={onRetry}
          className="text-xs uppercase tracking-wider text-black underline font-semibold mt-1"
        >
          Try Again
        </button>
      ) : (
        <button
          onClick={() => window.location.reload()}
          className="text-xs uppercase tracking-wider text-black underline font-semibold mt-1"
        >
          Reload Page
        </button>
      )}
    </div>
  );
}

export function EmptyState({ title, description, icon = '✦', action }: { title: string; description?: string; icon?: string; action?: { label: string; onClick: () => void } }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm">
      <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center text-xl text-black border border-zinc-200">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-black">{title}</h3>
      {description && <p className="text-zinc-500 max-w-md text-xs leading-relaxed">{description}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="btn-primary text-xs py-2.5 px-5 mt-2"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-zinc-400 text-xs uppercase tracking-widest font-semibold">Loading Talvia Consultancy...</p>
      </div>
    </div>
  );
}
