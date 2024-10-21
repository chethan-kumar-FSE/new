'use client';
import InitialFeeds from '@/components/feeds/feeds';
import { useUserCommonId } from '@/context/userCommonId';
import useResource from '@/hooks/useResource';
import { userService } from '@/services/userService';
import React, { useEffect, useState } from 'react';

function UserPost({ params }) {
  const { postid } = params;
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
  }, [fetchData, postid]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {userPost.length > 0 && (
        <InitialFeeds
          initialFeedsOnLoad={userPost}
          isFromUserProf={true}
          userCommonId={userCommonId}
        />
      )}
    </>
  );
}

export default UserPost;
