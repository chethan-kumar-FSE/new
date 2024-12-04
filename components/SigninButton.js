'use client';
import React from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

function SigninButton() {
  return (
    <button
      className="border border-[#4385f5] rounded-lg h-12 w-72 relative bg-[#4385f5] cursor-pointer overflow-hidden flex items-center justify-center"
      onClick={() => signIn('google')}
    >
      <Image
        src="https://www.hitzfeed.com/trends/media/flashcard/google-logo.png"
        width={50}
        height={50}
        alt="Google"
        className="absolute left-0 top-0"
      />
      <span className="text-sm text-[#bdc1c6] ml-14">Sign in with Google</span>
    </button>
  );
}

export default SigninButton;
