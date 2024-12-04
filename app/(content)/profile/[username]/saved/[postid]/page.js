'use client';
import InitialFeeds from '@/components/feeds/feeds';
import Loader from '@/components/Loader';
import { useUserCommonId } from '@/context/userCommonId';
import useResource from '@/hooks/useResource';
import { userService } from '@/services/userService';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CommonHeader from '@/components/CommonHeader';

function UserSavedPost({ params }) {
  // const { postid } = params;
  const router = useRouter();
  const { postid } = params;
  console.log('aprams', params);

  const {
    isLoading,
    error,
    data: userSavedPost,
    fetchData: getPostByUserId,
  } = useResource(userService?.getPostByUserId);
  const { userCommonId } = useUserCommonId();
  useEffect(() => {
    (async () => {
      getPostByUserId({
        requestBody: {
          story_id: postid,
        },
      });
    })();
  }, [postid]);

  if (error) {
    throw new Error();
  }

  return (
    <>
      <CommonHeader shouldDisplay />
      {isLoading && (
        <div className="relative top-[200px]">
          <Loader />
        </div>
      )}
      {userSavedPost?.length > 0 && (
        <InitialFeeds
          initialFeedsOnLoad={userSavedPost}
          isFromSaved={true}
          userCommonId={userCommonId}
        />
      )}
    </>
  );
}

export default UserSavedPost;
