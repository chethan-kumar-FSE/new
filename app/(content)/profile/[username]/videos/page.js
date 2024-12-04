import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Page({ params }) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col justify-center items-center py-8">
        <Image
          src="https://www.hitzfeed.com/trends/media/images/icons/video-icon-large.svg"
          width={80}
          height={80}
          alt="alternate"
        />
        <p>videos Coming</p>
        <p>soon...</p>
      </div>

      <div className="text-center flex flex-col gap-4">
        <Link href="/" className="text-white font-bold no-underline">
          <b>Click here</b>
        </Link>
        <button className="bg-[#8500ff] py-3 px-4 mb-[3.5em] rounded-full text-white text-lg font-medium capitalize mx-auto">
          Check out the <br />
          top Trending and Latest Feeds
        </button>
      </div>
    </div>
  );
}

export default Page;
