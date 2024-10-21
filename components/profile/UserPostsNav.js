import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function UserPostsNav({ userName }) {
  const items = [
    {
      src: 'https://demo3.greynium.com/hitzfeed/images/icons/grid-icon.svg',
      navigateTo: `/profile/${userName}`,
    },
    {
      src: 'https://demo3.greynium.com/hitzfeed/images/icons/videos-icon.svg',
      navigateTo: `/profile/${userName}/videos`,
    },
    {
      src: 'https://demo3.greynium.com/hitzfeed/images/icons/star-icon.svg',
      navigateTo: `/profile/${userName}/saved`,
    },
  ];
  return (
    <nav style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
      {items.map((item) => {
        return (
          <Link
            key={uuidv4()}
            href={item.navigateTo}
            style={{ textAlign: 'center' }}
          >
            <Image src={item.src} width={24} height={24} alt="something" />
          </Link>
        );
      })}
    </nav>
  );
}

export default UserPostsNav;
