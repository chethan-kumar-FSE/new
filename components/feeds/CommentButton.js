'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSessionAndConnectivity } from '@/hooks/useSessionAndConnectivity';
import { BsChat } from 'react-icons/bs';

function CommentButton({ commentCount, articleId }) {
  //extracting session data from next-auth/react

  const { checkSessionAndConnectivity } = useSessionAndConnectivity();
  //instance of router on client side
  const router = useRouter();

  //handling on comment button clcik
  const handleOnComment = () => {
    //checking if internet connection and notify user if not

    const canProceed = checkSessionAndConnectivity();
    if (!canProceed) return;
    //route to comment/article id based on the post
    router.push(`/comment/${articleId}`);
  };

  return (
    <div
      className="flex gap-1 flex-col cursor-pointer justify-center"
      onClick={handleOnComment}
    >
      {/* <img
        src="/feedicons/comments-icon.svg"
        className="w-[20px] h-[20px]"
        alt="Comments"
      /> */}
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 16 16"
        height="24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"></path>
      </svg>{' '}
      <p className={`${commentCount === '' ? 'text-transparent' : ''}`}>
        {commentCount === '' ? 0 : commentCount}
      </p>{' '}
    </div>
  );
}

export default CommentButton;
