import UserPosts from '@/components/profile/UserPosts';
import { revalidateTag } from 'next/cache';
import React, { Suspense } from 'react';
export const dynamic = 'force-dynamic'; // Force the page to be dynamic

async function page({ params }) {
  const { username } = params;

  return (
    <div>
      <UserPosts username={username} />
    </div>
  );
}

export default page;
