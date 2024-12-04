import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import CommonHeader from '../CommonHeader';
import FallbackImage from '../FallbackImage';

function ProfileHeader({
  firstName,
  userImage,
  userName,
  totalPosts,
  totalFollowers,
}) {
  const cookieStore = cookies();
  const usernameFromCookie = cookieStore.get('username')?.value;
  console.log('userName', usernameFromCookie === userName);
  return (
    <div className="flex flex-col ">
      <CommonHeader
        shouldDisplay
        userName={userName}
        usernameFromCookie={usernameFromCookie}
      />

      <div
        className="w-full h-[220px] bg-center bg-no-repeat bg-cover flex flex-col justify-center items-center text-white gap-4 relative rounded-[0.5em]"
        style={{
          backgroundImage:
            "url('https://imagesvs.oneindia.com/trends/media/images/profile-bg.png')",
        }}
      >
        <FallbackImage
          userFallback={true}
          sr={userImage}
          alt="User Image"
          className="rounded-full border-2 border-pink-500 p-1 bg-black w-[72px] h=[72px]"
        />
        <p className="font-bold">{firstName}</p>

        <div>
          <button className="inline-block text-black font-bold text-sm py-2 px-4 rounded bg-white mr-2">
            Posts {totalPosts}
          </button>
          <button className="inline-block text-black font-bold text-sm py-2 px-4 rounded bg-white mr-2">
            Followers {totalFollowers}
          </button>

          {userName === usernameFromCookie && (
            <Link
              className="absolute top-2 right-3 inline-block text-sm text-black py-1 px-4 rounded-full bg-white font-bold"
              href={`/profile/edit`}
            >
              Edit profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
