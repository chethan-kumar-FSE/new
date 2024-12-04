import { Fallback } from '@/components/Fallback';
import UserPosts from '@/components/profile/UserPosts';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
export const dynamic = 'force-dynamic'; // Force the page to be dynamic

async function page({ params }) {
  const { username } = params;

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <div className="mb-[60px] relative">
        <UserPosts username={username} />
      </div>
    </ErrorBoundary>
  );
}

export default page;
