'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="h-screen flex justify-center items-center bg-gray-900 text-white font-sans">
      <div className="p-8 m-4 md:p-12 bg-gray-800 rounded-lg shadow-lg max-w-lg w-full text-center">
        <div className="text-9xl font-bold text-red-500 tracking-tight animate-bounce">
          404
        </div>
        <div className="text-3xl md:text-4xl font-semibold mt-5">
          Oops! Page Not Found
        </div>
        <div className="text-lg text-gray-400 mt-3 mb-5">
          The page you're looking for doesn't exist or has been moved.
        </div>
        <button
          onClick={() => router.replace('/')}
          className="px-6 py-3 text-lg bg-red-500 text-white rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-red-600 transform hover:scale-105 focus:outline-none"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
