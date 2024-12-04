'use client';
import React, { useState } from 'react';
import { feedsServices } from '@/services/feedsService';
import Cookies from 'js-cookie';
import { notify } from '@/utils/Toast';
import useResource from '@/hooks/useResource';
import { useSessionAndConnectivity } from '@/hooks/useSessionAndConnectivity';
import { PiHeart, PiHeartFill } from 'react-icons/pi';

function LikeButton({ likeCount, userLike, articleId, newsLanguage }) {
  //extracting the session from next-auth/react
  const { fetchData: updatePostLike, error } = useResource(
    feedsServices?.updatePostLike
  );

  const { checkSessionAndConnectivity } = useSessionAndConnectivity();

  //setting the initial value for like count
  const [initialLikeCount, setInitialLikeCount] = useState(likeCount);

  //setting the intial state if user has liked the current post
  const [initialUserLike, setInitialUserLike] = useState(userLike);

  //extracting the userId from cookies
  const userId = Cookies.get('userId');

  //router instance on client side

  //tracking with initial user like and like count
  const previousUserLike = initialUserLike;
  const previousLikeCount = initialLikeCount;

  //handle on like button click
  const handleOnLike = async () => {
    //check if connection to internet , if yes, notify user
    const canProceed = checkSessionAndConnectivity();
    console.log('canporcee', canProceed);
    if (!canProceed) return;
    //state for optmistic updates to give feedback to user
    setInitialLikeCount((prevCount) =>
      initialUserLike ? prevCount - 1 : prevCount + 1
    );
    setInitialUserLike(!initialUserLike);

    //updating the post like, passing 0 for unfollowing and 1 for following
    const postLikeCount = await updatePostLike({
      requestBody: {
        articleid: articleId,
        likestatus: initialUserLike ? 0 : 1,
        userid: userId,
        lang: newsLanguage,
      },
    });

    //setting the updated count value from API response
    setInitialLikeCount(postLikeCount);
  };

  //if error notify user and set back to previous state
  if (error) {
    notify({ message: 'something went wrong!', isError: true });
    setInitialLikeCount(previousUserLike);
    setInitialUserLike(!previousLikeCount);
  }
  return (
    <div
      className="flex gap-1 flex-col cursor-pointer justify-center"
      onClick={handleOnLike}
    >
      {initialUserLike ? (
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 256 256"
          class="text-[red]"
          height="26"
          width="26"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"></path>
        </svg>
      ) : (
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 256 256"
          height="26"
          width="26"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path>
        </svg>
      )}
      <p className={`${initialLikeCount === '' ? 'text-transparent' : ''}`}>
        {initialLikeCount === '' ? 0 : initialLikeCount}
      </p>{' '}
    </div>
  );
}

export default LikeButton;
