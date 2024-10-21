import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function page({ params }) {
  const { username } = params;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3em' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2em 0',
        }}
      >
        <Image
          src={
            'https://demo3.greynium.com/hitzfeed/images/icons/telegram-icon-large.svg'
          }
          width={80}
          height={80}
          alt="alternate"
        />
        <p>videos Coming</p>
        <p>soon...</p>
      </div>
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
        }}
      >
        <Link
          href={'/'}
          style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'none' }}
        >
          <b>Click here</b>
        </Link>
        <button
          style={{
            background: '#8500ff',
            padding: '10px 20px',
            borderRadius: '50px',
            color: '#fff',
            fontSize: '16px',
            fontWeight: '500',
            textAlign: 'center',
            display: 'inline-block',
            textTransform: 'capitalize',
            margin: '0 auto',
          }}
        >
          Check out the <br />
          top Trending and Latest Feeds
        </button>
      </div>
    </div>
  );
}

export default page;
