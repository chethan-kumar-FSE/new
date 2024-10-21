import { useUserCommonId } from '@/context/userCommonId';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function Template3({ genreList, lang }) {
  return (
    <nav
      style={{
        maxWidth: '440px',
        overflowX: 'auto',
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        scrollbarWidth: 'none', // For Firefox
        msOverflowStyle: 'none', // For Internet Explorer and Edge
        gap: '1em',
        paddingLeft: '1.5em',
      }}
    >
      {genreList.map(({ url_slug, id, genre_name }) => {
        const href = lang
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
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          width: '80px',
          position: 'relative',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '10px',
        }}
      >
        <Image
          src={`https://www.hitzfeed.com/trends/media/images/category/250x250/${urlSlug}_1.jpg`}
          alt="someting"
          style={{ width: '100%', height: '108px', borderRadius: '10px' }}
        />
        <p
          style={{
            fontSize: '15px',
            color: '#dadada',
            textAlign: 'center',
            padding: '12px 0',
            display: 'block',
            height: '35px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {genre}
        </p>
      </div>
    </Link>
  );
};
