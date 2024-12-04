'use client';
import React, { useEffect, useState } from 'react';
import UserPostsLoad from './UserPostsLoad';
import { userService } from '@/services/userService';
import { useUserCommonId } from '@/context/userCommonId';
import useResource from '@/hooks/useResource';
import Image from 'next/image';
import Loader from '../Loader';

function UserPosts({ username }) {
  const { userCommonId } = useUserCommonId();
  const {
    data: userPosts,
    isLoading,
    fetchData: getCurrentUserPosts,
    error,
  } = useResource(userService?.getCurrentUserPosts);

  useEffect(() => {
    (async () => {
      await getCurrentUserPosts({
        requestBody: {
          user_id: userCommonId,
          page: '1',
        },
      });
    })();
  }, [userCommonId]);

  if (error) {
    throw new Error('Something went wrong !');
  }

  if (userPosts?.length === 0) {
    return (
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col justify-center items-center py-8">
          <Image
            src="https://www.hitzfeed.com/trends/media/images/icons/telegram-icon-large.svg"
            width={80}
            height={80}
            alt="alternate"
          />
          <p className="text-center">
            You will be able to post <br />
            to HitzFeed very soon..
          </p>
        </div>
        <button className="bg-[#8500ff] py-2.5 px-5 rounded-full text-white text-lg font-medium text-center inline-block capitalize">
          Check out the top <br />
          Trending and Latest Feeds
        </button>
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
      {userPosts && (
        <UserPostsLoad
          initialUserPosts={userPosts}
          commonUserId={userCommonId}
          username={username}
        />
      )}
    </div>
  );
}

export default UserPosts;
