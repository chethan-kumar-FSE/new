'use client';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { commentService } from '@/services/commentService';
import { notify } from '@/utils/Toast';
import useResource from '@/hooks/useResource';

function LikeButton({
  likecount,
  isLikedByCurrentUser,
  articleId,
  newsLanguage,
  subCommentId,
  commentId,
}) {
  const userId = Cookies.get('userId');
  const [initialLikeCount, setInitialLikeCount] = useState(likecount);
  const { fetchData: updateCommentLike, error } = useResource(
    commentService?.updateCommentLike
  );
  const [isLiked, setIsLiked] = useState(isLikedByCurrentUser);

  //tracking the inital like count and is liked by currrent user
  const previousLikeCount = initialLikeCount;
  const previousIsLikedByCurrentUser = isLikedByCurrentUser;

  const handleOnLikeButton = async () => {
    //used for optimistic updates for giving immediate user feedback
    setInitialLikeCount(isLiked ? initialLikeCount - 1 : initialLikeCount + 1);
    setIsLiked(!isLiked);

    //use 0 while unliking and 1 while liking it
    //if liking for replied message , then send subcomment id else send commentid
    const commentLikeCount = await updateCommentLike({
      requestBody: {
        likestatus: isLiked ? 0 : 1,
        articleid: articleId,
        user_id: userId,
        parent_comment_id: subCommentId ? commentId : 0,
        commentid: subCommentId ? subCommentId : commentId,
        lang: newsLanguage,
      },
    });
    setInitialLikeCount(commentLikeCount);
  };

  //if liking the comment API fails then notify user
  if (error) {
    setInitialLikeCount(previousLikeCount);
    setIsLiked(previousIsLikedByCurrentUser);
    notify({ message: 'Something went wrong', isError: true });
  }
  return (
    <div
      className="flex flex-col gap-[0.3em] items-center"
      onClick={handleOnLikeButton}
    >
      {isLiked ? (
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 256 256"
          height="26"
          width="26"
          xmlns="http://www.w3.org/2000/svg"
          class="text-[red]"
        >
          <path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"></path>
        </svg>
      ) : (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 256 256"
          height="26"
          width="26"
          class="text-[white]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path>
        </svg>
      )}
      <span className="text-[12px] text-[#d2d5d9]">{initialLikeCount}</span>
    </div>
  );
}

export default LikeButton;
