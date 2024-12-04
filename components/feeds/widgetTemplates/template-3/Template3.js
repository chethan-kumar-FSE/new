import FallbackImage from '@/components/FallbackImage';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function Template3({ genreList, lang }) {
  return (
    <nav className="overflow-x-auto flex flex-row gap-4  no-scrollbar">
      {genreList.map(({ url_slug, id, genre_name }) => {
        const href =
          lang && lang !== 'en'
            ? `/${lang}/${url_slug}-c${id}`
            : `/${url_slug}-c${id}`;
        return (
          <Box
            key={uuidv4()}
            urlSlug={url_slug}
            id={id}
            genre={genre_name}
            href={href}
          />
        );
      })}
    </nav>
  );
}

export default Template3;

const Box = ({ urlSlug, genre, href }) => {
  return (
    <Link href={href} className="no-underline">
      <div className="relative w-[80px] rounded-lg text-white">
        <FallbackImage
          sr={`https://www.hitzfeed.com/trends/media/images/category/250x250/${urlSlug}_1.jpg`}
          alt="someting"
          className="rounded-[50%] "
          width={109}
          height={109}
        />
        <p className="text-xs text-[#dadada] text-center py-3.5 h-[35px] overflow-hidden whitespace-nowrap text-ellipsis">
          {genre}
        </p>
      </div>
    </Link>
  );
};
