'use client';
import React from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
function SigninButton() {
  return (
    <button
      style={{
        border: '1px solid #4385f5',
        borderRadius: '10px',
        height: '50px',
        position: 'relative',
        background: '#4385f5',
        width: '300px',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      onClick={() => signIn('google')}
    >
      <Image
        src="https://demo3.greynium.com/hitzfeed/images/google-logo.png"
        width={50}
        height={50}
        alt="Google"
        style={{ position: 'absolute', left: '0px', top: '0px' }}
      />
      <span style={{ fontSize: '16px', color: '#bdc1c6' }}>
        Sign in with Google
      </span>
    </button>
  );
}

export default SigninButton;
