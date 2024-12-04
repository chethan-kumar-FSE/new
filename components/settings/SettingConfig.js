'use client';
import { useBackdropContext } from '@/context/backdrop';
import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { notify } from '@/utils/Toast';
import Image from 'next/image';

function SettingConfig() {
  const { toggleBackdropStatus } = useBackdropContext();

  const router = useRouter();

  const handleOnLogout = async () => {
    try {
      const data = await signOut({ redirect: false, callbackUrl: '/login' });
      const isCookieDeleted = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/delete-cookies`,
        {
          method: 'POST',
          body: JSON.stringify({
            cookieKeys: ['commonUserId', 'username', 'userId', 'firstName'],
          }),
        }
      );
      if (isCookieDeleted) {
        notify({ message: "You're logged out successfully!" });

        router.replace(data.url);
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  const handleOnLangSelect = () => {
    toggleBackdropStatus({ boolVal: true });
  };

  const handleOnFollowUnfollow = () => {
    const date = Date.now();
    router.push(`/setting/channels?refresh=${date}`);
  };
  const btns = [
    {
      text: 'CHOOSE LANGUAGE',
      src: '	https://www.hitzfeed.com/trends/media/flashcard/choose-language-1.svg',
      onclick: handleOnLangSelect,
    },
    {
      text: 'FOLLOW/UNFOLLOW',
      src: '	https://www.hitzfeed.com/trends/media/flashcard/follow-unfollow-icon.svg',
      onclick: handleOnFollowUnfollow,
    },
    /* {
      text: 'SAVED STORY',
      src: 'https://demo3.greynium.com/hitzfeed/images/icons/saved-stories.svg',
    }, */
    {
      text: 'LOGOUT',
      src: 'https://www.hitzfeed.com/trends/media/flashcard/logout.svg',
      onclick: handleOnLogout,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Buttons */}
      {btns.map((config, index) => (
        <div className="w-full relative" key={index}>
          <Image
            src={config.src}
            alt={config.text}
            width={32}
            height={32}
            className="absolute z-10 top-2 left-2"
          />
          <button
            className="w-full p-[15px] bg-[#1b1b1b] text-white rounded-[10px] cursor-pointer hover:bg-[#8500ff] hover:text-white"
            onClick={() => config.onclick()}
          >
            {config.text}
          </button>
        </div>
      ))}
    </div>
  );
}

export default SettingConfig;
