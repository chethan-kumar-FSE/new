'use client';

export function Fallback({ error, resetErrorBoundary, size = 'large' }) {
  if (size === 'small') {
    return (
      <div className="flex items-center justify-center gap-2 p-2 rounded bg-gray-900 text-gray-100 m-4">
        <span className="text-xl text-red-400">⚠️</span>
        <button
          onClick={resetErrorBoundary}
          className="px-2 py-1 text-xs text-gray-900 bg-purple-500 rounded cursor-pointer transition-colors duration-300 hover:bg-purple-400"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 rounded-lg bg-gray-800 text-gray-200 text-center shadow-lg m-4">
      <h1 className="text-xl text-red-400">Something went wrong</h1>
      {process.env.NEXT_APP_ENV === 'development' && (
        <p className="text-base text-gray-200">{error.message}</p>
      )}
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 text-sm text-gray-900 bg-purple-500 rounded cursor-pointer transition-colors duration-300 hover:bg-purple-400"
      >
        Retry
      </button>
    </div>
  );
}
