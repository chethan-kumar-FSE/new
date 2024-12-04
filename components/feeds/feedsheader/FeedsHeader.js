import CommonHeader from '@/components/CommonHeader';
import NavLink from '@/components/NavLink';
import { cookies } from 'next/headers';
import React from 'react';

function FeedsHeader() {
  const cookieStore = cookies();
  const language = cookieStore.get('language')?.value;
  return (
    <div className="text-center flex gap-[0.5em]  flex-col">
      <CommonHeader />

      <nav className="grid grid-cols-2">
        <NavLink
          href={language === 'en' ? '/' : `/${language}`}
          linkName={'Feeds'}
          keyName={'feeds'}
          // navLinkPattern={navLinkPattern}
        />
        <NavLink
          href={language === 'en' ? '/trending' : `/${language}/trending`}
          linkName={'Trending'}
          keyName={'trending'}
          // navLinkPattern={navLinkPattern}
        />
      </nav>
    </div>
  );
}

export default FeedsHeader;
