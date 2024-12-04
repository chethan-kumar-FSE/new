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
    <div className="flex flex-col gap-[0.3em] items-center">
      <img
        src={
          isLiked
            ? '/feedicons/like-icon-active.svg'
            : '/feedicons/like-icon.svg'
        }
        alt="something"
        onClick={handleOnLikeButton}
        className="w-[20px] h-[20px] cursor-pointer"
      />
      <span className="text-[12px] text-[#d2d5d9]">{initialLikeCount}</span>
    </div>
  );
}

export default LikeButton;
