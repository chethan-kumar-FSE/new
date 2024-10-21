'use client';
import SigninButton from '@/components/SigninButton';
import useResource from '@/hooks/useResource';
import { langService } from '@/services/langService';
import { userService } from '@/services/userService';
import { notify } from '@/utils/Toast';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
  const { data: session, status } = useSession();
  const {
    data: loginData,
    isLoading: isLoginDetailsLoading,
    fetchData: postUserLoginDetails,
  } = useResource(userService.login);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (session && session?.user) {
        const { email, firstName, lastName, oauthId, image } = session.user;

        const startTime = performance.now(); // Start time before API calls

        // Call the login API

        const loginResponse = await postUserLoginDetails({
          requestBody: {
            oauth_id: oauthId,
            first_name: firstName,
            last_name: lastName,
            email: email,
            user_image: image,
          },
        });

        console.log('loginResponse', loginResponse);

        const { username, common_user_id, user_id } = loginResponse;

        // Set cookies using a separate API call
        const cookieStartTime = performance.now(); // Start time for cookie API call
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/set-cookies`, {
          method: 'POST',
          body: JSON.stringify({
            username: username,
            commonUserId: common_user_id,
            userId: user_id,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const cookieEndTime = performance.now(); // End time for cookie API call
        console.log(
          'Time taken to set cookies:',
          cookieEndTime - cookieStartTime,
          'ms'
        );

        const endTime = performance.now(); // End time after all API calls
        console.log('Total API Response Time:', endTime - startTime, 'ms');

        notify({ message: "You're successfully logged in" });
        router.replace('/'); // Redirect to home page
      }
    })();
  }, [session]);

  if (
    isLoginDetailsLoading ||
    status === 'loading' ||
    status === 'authenticated'
  ) {
    return (
      <p
        style={{
          fontSize: '20px',
          color: 'white',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
        }}
      >
        loading..
      </p>
    );
  }

  // Show the login form if the user is not authenticated
  return (
    <div
      style={{
        color: '#fff',
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '4em',
        background: 'black',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3em',
          textAlign: 'center',
        }}
      >
        <div>
          <Image
            src={'https://demo3.greynium.com/hitzfeed/images/hitzfeed-logo.png'}
            width={100}
            height={100}
            alt="Logo"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5em' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
            WELCOME TO HITZFEED
          </h1>
          <p style={{ fontSize: '14px', color: '#bdc1c6' }}>
            Sign in or create an account. It takes less than a minute!
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2em' }}>
        <SigninButton />
        <div>
          <input type="checkbox" />{' '}
          <span style={{ fontSize: '12px', color: '#bdc1c6' }}>
            Remember me on this device
          </span>
        </div>
      </div>
      <div
        style={{
          fontSize: '12px',
          color: '#bdc1c6',
          fontStyle: 'italic',
          textAlign: 'center',
        }}
      >
        <p>By signing in or creating an account, you agree with our</p>
        <a href="#" style={{ color: '#0066cc' }}>
          Terms & Conditions
        </a>{' '}
        and{' '}
        <a href="#" style={{ color: '#0066cc' }}>
          Privacy Policy
        </a>
      </div>
    </div>
  );
}
