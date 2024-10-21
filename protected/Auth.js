// app/components/Auth.js

'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Auth({ children }) {
  const { status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    // Redirect to the login page if the user is unauthenticated
    router.replace('/login');
  }

  if (status === 'loading') {
    return <div>Loading...</div>; // Loading state
  }

  return children; // Render the protected content
}
