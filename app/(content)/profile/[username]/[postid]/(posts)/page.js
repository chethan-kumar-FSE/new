'use client';
import InitialFeeds from '@/components/feeds/feeds';
import Loader from '@/components/Loader';
import { useUserCommonId } from '@/context/userCommonId';
import useResource from '@/hooks/useResource';
import { userService } from '@/services/userService';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CommonHeader from '@/components/CommonHeader';

function UserPost({ params }) {
  // const { postid } = params;
  const router = useRouter();
  const { username, postid } = params;
  console.log('aprams', params);

  const {
    isLoading,
    error,
    data: userPost,
    fetchData,
  } = useResource(userService.getPostByUserId);
  const { userCommonId } = useUserCommonId();
  useEffect(() => {
    (async () => {
      fetchData({
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
        <div className="relative top-[100px]">
          <Loader />
        </div>
      )}
      {userPost?.length > 0 && (
        <InitialFeeds
          initialFeedsOnLoad={userPost}
          isFromUserProf={true}
          userCommonId={userCommonId}
          currentPostId={postid}
        />
      )}
    </>
  );
}

export default UserPost;
