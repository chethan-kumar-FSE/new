'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for programmatic navigation

function Client({ lang }) {
  const router = useRouter();

  useEffect(() => {
    // Set the cookie
    document.cookie = `language=${lang}; path=/; max-age=${60 * 60 * 24}`; // 1 day expiry

    // Navigate to the same URL to trigger a re-fetch of data
    router.push(window.location.href); // Use current URL
  }, [lang, router]);

  return null; // No UI rendered
}

export default Client;
