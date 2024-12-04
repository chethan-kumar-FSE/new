'use client';
import React, { useEffect, useState } from 'react';
import UserPostsLoad from './UserPostsLoad';
import { userService } from '@/services/userService';
import { useUserCommonId } from '@/context/userCommonId';
import useResource from '@/hooks/useResource';
import Image from 'next/image';
import Loader from '../Loader';
import Link from 'next/link';
import UserSavedPostsLoad from './UserSavedPostsLoad';

function UserSavedPosts({ username }) {
  const { userCommonId } = useUserCommonId();
  const {
    data: userSavedPosts,
    isLoading,
    fetchData: getUserProfileSavedCards,
    error,
  } = useResource(userService?.getUserProfileSavedCards);

  useEffect(() => {
    (async () => {
      getUserProfileSavedCards({
        requestBody: {
          user_id: userCommonId,
        },
      });
    })();
  }, [userCommonId]);

  if (error) {
    throw new Error('Something went wrong !');
  }

  if (userSavedPosts?.length === 0) {
    return (
      <div className="flex flex-col mb-[60px]">
        <div className="flex flex-col justify-center items-center py-8">
          <Image
            src="https://www.hitzfeed.com/trends/media/images/icons/star-icon-active.svg"
            width={80}
            height={80}
            alt="alternate"
          />
          <p>videos Coming</p>
          <p>soon...</p>
        </div>

        <div className="text-center flex flex-col gap-4">
          <Link href="/" className="text-white font-bold no-underline">
            <b>Click here</b>
          </Link>
          <button className="bg-[#8500ff] py-3 px-4 mb-[3.5em] rounded-full text-white text-lg font-medium capitalize mx-auto">
            Check out the <br />
            top Trending and Latest Feeds
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-[60px]">
      {isLoading && (
        <div className="relative top-[50px]">
          <Loader />
        </div>
      )}
      {userSavedPosts && (
        <UserSavedPostsLoad
          initialUserSavedPosts={userSavedPosts}
          commonUserId={userCommonId}
          username={username}
        />
      )}
    </div>
  );
}

export default React.memo(UserSavedPosts);
