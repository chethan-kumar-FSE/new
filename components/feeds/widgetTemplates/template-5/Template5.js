import FallbackImage from '@/components/FallbackImage';
import Link from 'next/link';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function Template5({ genreList = [], lang = 'en' }) {
  return (
    <nav className="overflow-x-auto flex flex-row gap-4 no-scrollbar">
      {genreList?.length > 0 &&
        genreList?.map(({ url_slug, id, genre_name }, index) => {
          //return <p className="text-white">{JSON.stringify(url_slug)}</p>;
          return (
            <Box
              key={uuidv4()}
              urlSlug={url_slug}
              id={id}
              genre={genre_name}
              lang={lang}
              index={index}
            />
          );
        })}
    </nav>
  );
}

export default Template5;

const Box = ({ urlSlug, genre, id, lang }) => {
  const href =
    lang && lang !== 'en' ? `/${lang}/${urlSlug}-c${id}` : `/${urlSlug}-c${id}`;
  return (
    <Link href={href} className="no-underline ">
      <div className="w-[106px] relative text-[#fff] flex flex-col gap-[0.8em]">
        <div className="relative w-full p-[3px] bg-gradient-to-r from-[#682c82] to-[#fc01fc] rounded-[12px]">
          <div className="bg-[black] rounded-[10px] p-[4px]">
            <img
              src={`https://www.hitzfeed.com/trends/media/images/category/250x250/${urlSlug}_1.jpg`}
              alt=""
              className="w-[100%] h-[100%] rounded-[10px] block object-cover"
            />
          </div>
        </div>

        <p className="text-[12px] text-[#dadada] text-center  block  whitespace-nowrap">
          {genre}
        </p>
      </div>
    </Link>
  );
};
