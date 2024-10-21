import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function CommonHeader() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Link href={'/'}>
        <Image
          src="https://demo3.greynium.com/hitzfeed/images/hitzfeed-hor-logo.png"
          width={93}
          height={20}
          alt="something"
        />
      </Link>
    </div>
  );
}

export default CommonHeader;
