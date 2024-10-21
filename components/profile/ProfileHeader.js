import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CommonHeader from '../CommonHeader';

function ProfileHeader({
  firstName,
  userImage,
  userName,
  totalPosts,
  totalFollowers,
}) {
  const cookieStore = cookies();

  const usernameFromCookie = cookieStore.get('username')?.value;
  console.log('username---postging', userName, usernameFromCookie);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
      <div style={{ position: 'relative' }}>
        <CommonHeader />
        {userName === usernameFromCookie && (
          <Link
            style={{
              position: 'absolute',
              display: 'block',
              right: '0px',
              top: '0px',
            }}
            href={'/setting'}
          >
            <Image
              src="https://demo3.greynium.com/hitzfeed/images/icons/settings.svg"
              width={30}
              height={30}
              alt="alternate"
            />
          </Link>
        )}
      </div>
      <div
        style={{
          width: '100%',
          height: '220px',
          background: "url('https://picsum.photos/200/300') center no-repeat",
          backgroundSize: 'cover', // Add this line to ensure the image covers the div
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          gap: '1em',
          position: 'relative',
        }}
      >
        <p>{firstName}</p>
        <Image
          src={userImage}
          alt="something"
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            border: '2px solid #fd01cb',
            padding: '4px',
            backgroundColor: '#000',
          }}
        />{' '}
        <div>
          <button
            style={{
              color: '#000',
              fontWeight: 'bold',
              fontSize: '15px',
              display: 'inline-block',
              padding: '5px 10px',
              borderRadius: '3px',
              background: '#fff',
              textDecoration: 'none',
              margin: '0 5px',
            }}
          >
            Posts {totalPosts}
          </button>
          <button
            style={{
              color: '#000',
              fontWeight: 'bold',
              fontSize: '15px',
              display: 'inline-block',
              padding: '5px 10px',
              borderRadius: '3px',
              background: '#fff',
              textDecoration: 'none',
              margin: '0 5px',
            }}
          >
            Followers {totalFollowers}
          </button>

          {userName === usernameFromCookie && (
            <Link
              style={{
                display: 'inline-block',
                fontSize: '14px',
                color: '#000',
                padding: '2px 10px',
                borderRadius: '15px',
                background: '#fff',
                position: 'absolute',
                top: '10px',
                right: '20px',
                fontWeight: 'bold',
              }}
              href={`/profile/edit`}
            >
              {' '}
              Edit profile{' '}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
