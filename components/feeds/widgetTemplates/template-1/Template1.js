'use client';
import React from 'react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

function Template1({ genreList, lang }) {
  return (
    <nav className="grid grid-cols-3 gap-2.5">
      {genreList.map(({ url_slug, id, genre_name }) => {
        const href =
          lang && lang !== 'en'
            ? `/${lang}/${url_slug}-c${id}`
            : `/${url_slug}-c${id}`;

        return (
          <Link
            key={uuidv4()}
            className="block p-2.5 text-center text-base whitespace-nowrap overflow-hidden text-ellipsis rounded-md text-white bg-gradient-to-r from-[#8c78cf] to-[#eb3ead] no-underline"
            href={href}
          >
            {genre_name}
          </Link>
        );
      })}
    </nav>
  );
}

export default Template1;
