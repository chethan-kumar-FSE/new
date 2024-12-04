import FallbackImage from '@/components/FallbackImage';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function Template2({ genreList, lang }) {
  return (
    <nav className="flex flex-row gap-4  overflow-x-auto overflow-y-hidden no-scrollbar">
      {genreList.map(({ url_slug, id, genre_name }, index) => {
        const href =
          lang && lang !== 'en'
            ? `/${lang}/${url_slug}-c${id}`
            : `/${url_slug}-c${id}`;
        return (
          <Box
            key={uuidv4()}
            urlSlug={url_slug}
            genre={genre_name}
            index={index}
            href={href}
          />
        );
      })}
    </nav>
  );
}

export default Template2;

const Box = ({ urlSlug, genre, href, index }) => {
  const isEven = index % 2 == 0;

  return (
    <>
      <Link href={href}>
        <div className="relative w-[120px] h-[160px] ">
          <FallbackImage
            sr={`https://www.hitzfeed.com/trends/media/images/category/250x250/${urlSlug}_1.jpg`}
            alt="alternate"
            className={' rounded-[0.5em] w-[120px] h-[160px]'}
          />
          <p
            className={`absolute bg-white rounded-full py-0.5 px-3 text-xs text-black font-bold uppercase ${
              isEven ? 'top-[10%] left-[10%]' : 'top-[80%] left-[-10%]'
            }`}
          >
            {genre}
          </p>
        </div>
      </Link>
    </>
  );
};
