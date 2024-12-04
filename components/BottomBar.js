import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers'; // Import cookies utility
import { NEWS_LINKS } from '@/utils/constant';
import { LiaHomeSolid } from 'react-icons/lia';
import { RiAccountCircleLine } from 'react-icons/ri';
import { BsNewspaper } from 'react-icons/bs';

export const BottomBar = async () => {
  const session = await getServerSession();

  const cookieStore = cookies(); // Access the cookies
  const language = cookieStore.get('language')?.value || '';
  const username =
    cookieStore.get('username')?.value || session?.user?.email.split('@')[0];
  const profileUrl = session?.user?.image;

  const isLoggedIn = session && session?.user;

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
    <nav className="w-[100%] fixed bottom-0 flex px-[4em] py-[1em] bg-black justify-between ">
      {navItems.map(({ navigateTo, newTab, icon }, index, items) => {
        return (
          <Link
            href={navigateTo}
            key={index}
            className="text-center flex cursor-pointer"
            target={newTab && '_blank'}
          >
            {index === items.length - 1 && profileUrl ? (
              <Image
                src={profileUrl}
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
