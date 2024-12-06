'use client'; // Mark this as a client component

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react'; // Client-side session hook
import { NEWS_LINKS } from '@/utils/constant';
import { LiaHomeSolid } from 'react-icons/lia';
import { RiAccountCircleLine } from 'react-icons/ri';
import { BsNewspaper } from 'react-icons/bs';
import Cookies from 'js-cookie';

export const BottomBar = () => {
  const { data: session } = useSession(); // Get session data client-side

  const language = Cookies.get('language');
  const username =
    Cookies.get('username') || session?.user?.email.split('@')[0];
  const imageUrl = session?.user?.image;
  const isLoggedIn = session && session?.user;

  console.log('printing', language, username, imageUrl, isLoggedIn);

  const navItems = [
    {
      icon: <LiaHomeSolid size={30} />,
      navigateTo: language === 'en' ? '/' : `/${language}`,
    },

    {
      icon: <BsNewspaper size={26} />,
      navigateTo: `${NEWS_LINKS[language]?.link}`,
      newTab: true,
    },
    {
      icon: <RiAccountCircleLine size={30} />,
      navigateTo: isLoggedIn ? `/profile/${username}` : '/login',
    },
  ];

  return (
    <nav className="w-[100%] fixed bottom-0 flex px-[4em] py-[1em] bg-black justify-between">
      {navItems.map(({ navigateTo, newTab, icon }, index, items) => {
        return (
          <Link
            href={navigateTo}
            key={index}
            className="text-center flex cursor-pointer"
            target={newTab && '_blank'}
          >
            {index === items.length - 1 && isLoggedIn && imageUrl ? (
              <Image
                src={imageUrl}
                width={30}
                height={30}
                priority
                alt="profile"
                className="rounded-full"
              />
            ) : (
              <span className="text-[#fff]">{icon}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};
