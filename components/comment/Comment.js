'use client';
import Link from 'next/link';
import React from 'react';
import { useReplyingUser } from '@/context/replyingUser';
import Timer from './Timer';
import LikeButton from './LikeButton';
import FallbackImage from '../FallbackImage';

function Comment({
  comment,
  timestamp,
  userProfileImage,
  userName,
  subCommentId,
  commentId,
  likecount,
  isLikedByCurrentUser,
  articleId,
  newsLanguage,
}) {
  //to store the replying user details later to send with an API request body
  const { handleOnSetReplyingTo } = useReplyingUser();

  return (
    <div className="flex justify-between">
      <div className="flex gap-[1.3em]">
        <div>
          <FallbackImage
            userFallback={true}
            sr={userProfileImage}
            alt="somehint"
            className={'rounded-[50%] w-[40px] h-[40px]'}
          />
        </div>
        <div className="flex gap-[0.5em] flex-col">
          <div className="flex gap-[1em] items-center">
            <Link
              className="no-underline outline-none text-[#0066cc]"
              href={'/'}
            >
              {userName}
            </Link>
            <Timer timestamp={timestamp} />
          </div>

          <p className="text-[12px] text-[#d2d5d9]">{comment}</p>
          <div>
            <button
              className="text-[#fff] bg-transparent outline-none border-none cursor-pointer text-[12px]"
              onClick={() =>
                handleOnSetReplyingTo({
                  mainCommentId: commentId,
                  username: userName,
                })
              }
            >
              reply
            </button>
          </div>
        </div>
      </div>
      <LikeButton
        isLikedByCurrentUser={isLikedByCurrentUser}
        likecount={likecount}
        articleId={articleId}
        newsLanguage={newsLanguage}
        subCommentId={subCommentId}
        commentId={commentId}
      />
    </div>
  );
}

export default React.memo(Comment);
