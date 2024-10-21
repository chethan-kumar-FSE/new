import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function Template5({ genreList, lang }) {
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
      {genreList.map(({ url_slug, id, genre_name }, index) => {
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

const Box = ({ urlSlug, genre, id, lang, index }) => {
  const href = lang ? `/${lang}/${urlSlug}-c${id}` : `/${urlSlug}-c${id}`;
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          width: '106px',
          position: 'relative',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '10px',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            padding: '4px', // Space between the image and the gradient
            background:
              'linear-gradient(90deg, rgb(104, 44, 130) 1.14%, rgb(252, 1, 252) 100%)',
            borderRadius: '12px', // Add some rounding to the corners
          }}
        >
          <div
            style={{
              background: 'black', // Background behind the image
              borderRadius: '10px', // Same rounding as the image
              padding: '4px', // Optional: more spacing between gradient and image
            }}
          >
            {/*  <Image
              src={`https://www.hitzfeed.com/trends/media/images/category/250x250/${urlSlug}_1.jpg`}
              alt="something"
              style={{
                width: '100%',
                height: '108px',
                borderRadius: '10px', // Round corners for the image
                display: 'block', // To ensure proper layout inside the container
              }}
            /> */}
          </div>
        </div>

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
