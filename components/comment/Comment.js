'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import CommentInput from './CommentInput';
import { useReplyingUser } from '@/context/replyingUser';
import { timeAgo } from '@/utils/timestamp';
import Timer from './Timer';
import LikeButton from './LikeButton';
import { likeService } from '@/services/likeService';
import Image from 'next/image';

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
  const { handleOnSetReplyingTo } = useReplyingUser();
  console.log('likecount', likecount);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', gap: '1.3em' }}>
        <div>
          <Image
            src={userProfileImage}
            alt="somehint"
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5em', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
            <Link
              style={{
                textDecoration: 'none',
                outline: 'none',
                color: '#0066cc',
              }}
              href={'/'}
            >
              {userName}
            </Link>
            <Timer timestamp={timestamp} />
          </div>

          <p style={{ fontSize: '12px', color: '#d2d5d9' }}>{comment}</p>
          <div>
            <button
              style={{
                color: '#fff',
                background: 'transparent',
                outline: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
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
