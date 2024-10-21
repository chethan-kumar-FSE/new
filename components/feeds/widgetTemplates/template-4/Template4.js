import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function Template4({ genreList, lang }) {
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
    <Link href={href} style={{ color: '#fff', textDecoration: 'none' }}>
      <Image
        src={`https://www.hitzfeed.com/trends/media/images/category/250x250/${urlSlug}_1.jpg`}
        style={{ width: '80px', height: '80px', borderRadius: '50%' }}
        alt=""
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
    </Link>
  );
};
