import { Loader2 } from 'lucide-react';

export function LoadingSpinner({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 className="w-10 h-10 text-[#2563EB] animate-spin" />
      <p className="text-slate-500 text-sm">{text}</p>
    </div>
  );
}

export function ErrorMessage({ message = 'Something went wrong. Please try again.' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-2xl">⚠️</div>
      <p className="text-slate-600 max-w-md">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="text-sm text-[#2563EB] hover:underline font-medium"
      >
        Retry
      </button>
    </div>
  );
}

export function EmptyState({ title, description, icon = '🔍' }: { title: string; description?: string; icon?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      <div className="text-5xl">{icon}</div>
      <h3 className="text-lg font-semibold text-[#172554]">{title}</h3>
      {description && <p className="text-slate-500 max-w-md text-sm">{description}</p>}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F8FC]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500">Loading...</p>
      </div>
    </div>
  );
}

