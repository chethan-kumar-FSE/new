import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers'; // Import cookies utility

export const BottomBar = async () => {
  const session = await getServerSession();

  const cookieStore = cookies(); // Access the cookies
  const userPreferredLang = cookieStore.get('language')?.value || '';
  const username =
    cookieStore.get('username')?.value || session?.user?.email.split('@')[0];
  const profileUrl = session?.user?.image;

  const isLoggedIn = session && session?.user;
  const navItems = [
    {
      iconUrl: 'https://demo3.greynium.com/hitzfeed/images/icons/home-icon.svg',
      navigateTo: `/${userPreferredLang}`,
    },
    {
      iconUrl:
        'https://demo3.greynium.com/hitzfeed/images/icons/cards-icon.svg',
      navigateTo: '',
    },
    {
      iconUrl:
        'https://demo3.greynium.com/hitzfeed/images/icons/video-icon.svg',
      navigateTo: '',
    },
    {
      iconUrl: 'https://demo3.greynium.com/hitzfeed/images/icons/news-icon.svg',
      navigateTo: '',
    },
    {
      iconUrl:
        'https://demo3.greynium.com/hitzfeed/images/icons/user-icon-white.svg',
      navigateTo: isLoggedIn ? `/profile/${username}` : '/login',
    },
  ];

  return (
    <nav
      style={{
        width: '100%',
        position: 'fixed',
        display: 'flex',
        bottom: '0px',
        padding: '1em',
        backgroundColor: '#000',
      }}
    >
      {navItems.map((navItem, index) => {
        return (
          <Link
            href={navItem.navigateTo}
            style={{ textAlign: 'center', flex: '1 0', cursor: 'pointer' }}
            key={index}
          >
            {index === navItems.length - 1 && profileUrl ? (
              <Image
                src={profileUrl}
                width={30}
                height={30}
                priority
                alt="something"
                style={{ borderRadius: '50%' }}
              />
            ) : (
              <Image
                src={navItem.iconUrl}
                width={30}
                height={30}
                priority
                alt="something"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};
