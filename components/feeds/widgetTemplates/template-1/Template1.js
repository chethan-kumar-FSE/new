'use client';
import React from 'react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

function Template1({ genreList, lang }) {
  return (
    <nav
      style={{
        display: 'grid',
        maxWidth: '440px',
        gridTemplateColumns: '32% 32% 32%',
        gridGap: '10px',
      }}
    >
      {genreList.map(({ url_slug, id, genre_name }) => {
        const href = lang
          ? `/${lang}/${url_slug}-c${id}`
          : `/${url_slug}-c${id}`;

        return (
          <Link
            key={uuidv4()}
            style={{
              background: '#fff',
              color: '#000',
              display: 'block',
              padding: '10px',
              textAlign: 'center',
              fontSize: '15px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              borderRadius: '5px',
              textDecoration: 'none',
              backgroundImage: 'linear-gradient(to right, #8c78cf, #eb3ead)',
              color: '#fff',
            }}
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
