import React, { useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { checkConnectionAndNotify } from '@/utils/network';
import { notify } from '@/utils/Toast';
import { useRouter } from 'next/navigation';
function useSessionAndConnectivity() {
  const { data: session } = useSession();
  const router = useRouter();
  const checkSessionAndConnectivity = useCallback(() => {
    if (session?.user) return true;
    if (!checkConnectionAndNotify(notify)) return;

    router.push('/login');
    return false;
  }, [session, router]);

  return { checkSessionAndConnectivity };
}

export { useSessionAndConnectivity };
