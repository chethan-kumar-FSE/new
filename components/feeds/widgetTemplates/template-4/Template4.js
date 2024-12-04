import FallbackImage from '@/components/FallbackImage';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function Template4({ genreList, lang }) {
  return (
    <nav className="overflow-x-auto flex flex-row gap-4  no-scrollbar">
      {genreList.map(({ url_slug, id, genre_name }) => {
        const href =
          lang && lang !== 'en'
            ? `/${lang}/${url_slug}-c${id}`
            : `/${url_slug}-c${id}`;
        return (
          <Circle
            key={uuidv4()}
            href={href}
            urlSlug={url_slug}
            genre={genre_name}
          />
        );
      })}
    </nav>
  );
}

export default Template4;

const Circle = ({ href, urlSlug, genre }) => {
  return (
    <Link href={href} className="no-underline text-white">
      <div className="relative w-[90px] h-[108px] rounded-[0.3em] overflow-hidden">
        <FallbackImage
          sr={`https://www.hitzfeed.com/trends/media/images/category/250x250/${urlSlug}_1.jpg`}
          alt={genre}
          className="object-cover w-full h-full"
        />
      </div>
      <p className="text-xs text-[#dadada] text-center py-3.5 h-[35px] overflow-hidden whitespace-nowrap text-ellipsis">
        {genre}
      </p>
    </Link>
  );
};
