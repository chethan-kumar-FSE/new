'use client';
import InstallButton from '@/components/InstallButton';
import Loader from '@/components/Loader';
import SigninButton from '@/components/SigninButton';
import useResource from '@/hooks/useResource';
import { userService } from '@/services/userService';
import { notify } from '@/utils/Toast';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
  //getting session and status from useSession hook provided by next-auth/react to check if user currently logged in
  const { data: session, status } = useSession();

  //custom hook to handle data fetching by passing the function references to the hook
  const {
    isLoading: isLoginDetailsLoading,
    fetchData: postUserLoginDetails,
    error,
  } = useResource(userService.login);

  //intialzing the router instance
  const router = useRouter();

  //accessing the language from cookies on cline tside
  const language = Cookies.get('language');

  useEffect(() => {
    (async () => {
      try {
        //checking is there is session and user is logged in with session
        if (session && session?.user) {
          //extract properties from session's user object for further login process
          const { email, firstName, lastName, oauthId, image } = session.user;

          //using custom hook's fetching data function to send user login details
          const loginDetails = await postUserLoginDetails({
            requestBody: {
              oauth_id: oauthId,
              first_name: firstName,
              last_name: lastName,
              email: email,
              user_image: image,
            },
          });

          //extracting below properties from login resonse
          const { username, common_user_id, user_id } = loginDetails;

          // Set cookies using a separate API call
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/set-cookies`, {
            method: 'POST',
            body: JSON.stringify({
              username: username,
              commonUserId: common_user_id,
              userId: user_id,
              firstName: firstName,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          //notifying the user if user is successfully logged in
          notify({ message: "You're successfully logged in" });

          //based on the user language set in cookies , redirect once logged in
          let redirectRoute =
            language && language !== 'en' ? `/${language}` : '/';
          router.replace(redirectRoute); // Redirect to home page
        }
      } catch (err) {
        console.log('err', err);
      }
    })();
  }, [session]);

  //throwing error if something goes wrong with API call
  if (error) {
    throw new Error('Something went wrong !');
  }

  //checking is loginDetials loading , status equals to loading ar authenticated, then showing loader
  if (
    isLoginDetailsLoading ||
    status === 'loading' ||
    status === 'authenticated'
  ) {
    return <Loader />;
  }

  // Show the login form if the user is not authenticated
  return (
    <div className="text-white w-full h-screen flex justify-center items-center flex-col gap-16 bg-black">
      <div className="flex flex-col gap-12 text-center">
        <div className="flex justify-center">
          <img
            src={'/others/logo.svg'}
            width={300}
            height={100}
            alt="Logo"
            loading="eager"
          />
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold">WELCOME TO HITZFEED</h1>
          <p className="text-sm text-[#bdc1c6]">
            Sign in or create an account. It takes less than a minute!
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <SigninButton />
        <InstallButton />
        {/*  <div className="flex items-center gap-2">
          <input type="checkbox" className="accent-[#8500ff]" />
          <span className="text-xs text-[#bdc1c6]">
            Remember me on this device
          </span>
        </div> */}
      </div>

      <div className="text-xs text-[#bdc1c6] italic text-center">
        <p>By signing in or creating an account, you agree with our</p>
        <a href="#" className="text-[#0066cc]">
          Terms & Conditions
        </a>{' '}
        and{' '}
        <a href="#" className="text-[#0066cc]">
          Privacy Policy
        </a>
      </div>
    </div>
  );
}
