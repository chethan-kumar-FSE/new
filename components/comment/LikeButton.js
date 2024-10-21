import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { commentService } from '@/services/commentService';
import Image from 'next/image';

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
  const [isLiked, setIsLiked] = useState(isLikedByCurrentUser);

  const handleOnLikeButton = async () => {
    console.log('executing');
    const previousLikeCount = initialLikeCount;
    const previousIsLikedByCurrentUser = isLikedByCurrentUser;

    setInitialLikeCount(isLiked ? initialLikeCount - 1 : initialLikeCount + 1);
    setIsLiked(!isLiked);

    try {
      const response = await commentService.updateCommentLike({
        requestBody: {
          likestatus: isLiked ? 0 : 1,
          articleid: articleId,
          user_id: userId,
          parent_comment_id: subCommentId ? commentId : 0,
          commentid: subCommentId ? subCommentId : commentId,
          lang: newsLanguage,
        },
      });
      console.log('response', response);
      const { like_count } = response;
      setInitialLikeCount(like_count);
    } catch (err) {
      console.log('err', err);
      setInitialLikeCount(previousLikeCount);
      setIsLiked(previousIsLikedByCurrentUser);
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.3em',
        alignItems: 'center',
      }}
    >
      <Image
        src={
          isLiked
            ? '	https://www.hitzfeed.com/trends/media/images/icons/like-icon-active.svg'
            : 'https://www.hitzfeed.com/trends/media/images/icons/like-icon.svg'
        }
        width={20}
        height={20}
        alt="something"
        onClick={handleOnLikeButton}
        style={{ cursor: 'pointer' }}
      />
      <span style={{ fontSize: '12px', color: '#d2d5d9' }}>
        {initialLikeCount}
      </span>
    </div>
  );
}

export default LikeButton;
