'use client';
import CommonHeader from '@/components/CommonHeader';
import LanguageSelection from '@/components/LanguageSelection';
import { useBackdropContext } from '@/context/backdrop';
import Backdrop from '@/share/backdrop';
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { notify } from '@/utils/Toast';
import Image from 'next/image';

function Setting() {
  const { toggleBackdropStatus } = useBackdropContext();
  const [isLanguageSelectionVisible, setLanguageSelectionVisible] =
    useState(false);

  const router = useRouter();
  const btnStyle = {
    display: 'block',
    padding: '15px',
    background: '#1b1b1b',
    borderRadius: '15px',
    fontSize: '18px',
    color: '#fff',
    textAlign: 'center',
    position: 'relative',
    textTransform: 'uppercase',
    width: '100%',
    outline: 'none',
    border: '1px solid transparent',
    cursor: 'pointer',
  };

  const handleOnLogout = async () => {
    const data = await signOut({ redirect: false, callbackUrl: '/login' });
    const isCookieDeleted = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/delete-cookies`,
      {
        method: 'POST',
        body: JSON.stringify({
          cookieKeys: ['commonUserId', 'username', 'userId'],
        }),
      }
    );
    if (isCookieDeleted) {
      notify({ message: "You're logged out successfully!" });

      router.replace(data.url);
    }
  };

  const handleOnLangSelect = () => {
    toggleBackdropStatus();
    setLanguageSelectionVisible(true);
  };

  const btns = [
    {
      text: 'CHOOSE LANGUAGE',
      src: 'https://demo3.greynium.com/hitzfeed/images/icons/choose-language-1.svg',
      onclick: handleOnLangSelect,
    },
    {
      text: 'FOLLOW/UNFOLLOW',
      src: 'https://demo3.greynium.com/hitzfeed/images/icons/follow-unfollow-icon.svg',
    },
    {
      text: 'SAVED STORY',
      src: 'https://demo3.greynium.com/hitzfeed/images/icons/saved-stories.svg',
    },
    {
      text: 'LOGOUT',
      src: 'https://demo3.greynium.com/hitzfeed/images/icons/logout.svg',
      onclick: handleOnLogout,
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      {/* Common header */}
      <div style={{ margin: '1em 0em' }}>
        <CommonHeader />
      </div>
      <div
        style={{
          maxWidth: '440px',
          margin: '0 auto',
          position: 'relative',
          display: 'flex',
          gap: '3em',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            width: '100%',
            background: '#1b1b1b',
            padding: '20px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '18px',
            color: '#fff',
            alignItems: 'center',
          }}
        >
          <span>{'<'}</span>
          <span>SETTINGS</span>
          <span>
            <Image
              src="https://demo3.greynium.com/hitzfeed/images/icons/settings.svg"
              width={32}
              height={32}
              alt="alternate"
            />
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5em' }}>
          {/* Buttons */}
          {btns.map((config, index) => (
            <div style={{ width: '100%', position: 'relative' }} key={index}>
              <Image
                src={config.src}
                alt={config.text}
                width={32}
                height={32}
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  top: '10px',
                  left: '10px',
                }}
              />
              <button style={btnStyle} onClick={() => config.onclick()}>
                {config.text}
              </button>
            </div>
          ))}
        </div>
      </div>
      {isLanguageSelectionVisible && (
        <Backdrop>
          <div
            style={{
              background: '#1b1b1b',
              width: '100%',
              padding: '1em 1em',
              position: 'absolute',
              bottom: '0px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <LanguageSelection />
          </div>
        </Backdrop>
      )}
    </div>
  );
}

export default Setting;
