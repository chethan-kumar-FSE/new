import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function Template2({ genreList, lang }) {
  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '1em',
        maxWidth: '440px',
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollbarWidth: 'none', // For Firefox
        msOverflowStyle: 'none', // For Internet Explorer and Edge
        paddingLeft: '1.5em',
      }}
    >
      {genreList.map(({ url_slug, id, genre_name }, index) => {
        const href = lang
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
        <div style={{ width: '120px', height: '160px', position: 'relative' }}>
          <Image
            style={{ width: '100%', height: '100%' }}
            src={`https://www.hitzfeed.com/trends/media/images/category/250x250/${urlSlug}_1.jpg`}
            alt="alternate"
          />
          <p
            style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '2px 15px',
              fontSize: '14px',
              color: '#000',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              position: 'absolute',
              minWidth: '120px',
              top: isEven ? '10%' : '80%',
              left: isEven ? '10%' : '-10%',
            }}
          >
            {genre}
          </p>
        </div>
      </Link>
    </>
  );
};
