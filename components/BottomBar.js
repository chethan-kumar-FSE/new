'use client'; // Mark this as a client component

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react'; // Client-side session hook
import { NEWS_LINKS } from '@/utils/constant';
import { LiaHomeSolid } from 'react-icons/lia';
import { RiAccountCircleLine } from 'react-icons/ri';
import { BsNewspaper } from 'react-icons/bs';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { notify } from '@/utils/Toast';

export const BottomBar = () => {
  const { data: session } = useSession(); // Get session data client-side

  const router = useRouter();
  const language = Cookies.get('language');
  const username =
    Cookies.get('username') || session?.user?.email.split('@')[0];
  const imageUrl = session?.user?.image;
  const isLoggedIn = session && session?.user;

  const navItems = [
    {
      icon: <LiaHomeSolid size={30} />,
      navigateTo: () => {
        router.push(language === 'en' ? '/' : `/${language}`);
      },
    },

    {
      icon: <BsNewspaper size={26} />,
      navigateTo: () => {
        if (!navigator.onLine) {
          notify({ message: 'Please check your connection', isError: true });
          return;
        }
        window.open(`${NEWS_LINKS[language]?.link}`, '_blank');
      },
      newTab: true,
    },
    {
      icon: <RiAccountCircleLine size={30} />,
      navigateTo: () => {
        if (!navigator.onLine) {
          // Handle the case when the user is offline
          notify({ message: 'Please check your connection', isError: true });
          return;
        } else {
          if (isLoggedIn) {
            router.push(`/profile/${username}`);
          } else {
            router.push('/login');
          }
        }
      },
    },
  ];

  return (
    <div className="w-[100%] fixed bottom-0 flex px-[4em] py-[1em] bg-black justify-between">
      {navItems.map(({ navigateTo, newTab, icon }, index, items) => {
        return (
          <div
            key={index}
            className="text-center flex cursor-pointer"
            onClick={() => navigateTo()}
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
          </div>
        );
      })}
    </div>
  );
};
