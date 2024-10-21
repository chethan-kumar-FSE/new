'use client';
import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function CommentButton({ commentCount, articleId }) {
  const { data: session } = useSession();
  const router = useRouter();
  const handleOnComment = () => {
    if (!session || !session?.user) {
      router.replace('/login');
      return;
    }
    router.push(`/comment/${articleId}`);
  };

  return (
    <div style={{ cursor: 'pointer' }} onClick={handleOnComment}>
      <Image
        src="https://www.hitzfeed.com/trends/media/images/icons/comments-icon.svg"
        width={20}
        height={20}
        alt="Comments"
      />
      <p style={{ fontSize: '12px', textAlign: 'center' }}>{commentCount}</p>
    </div>
  );
}

export default CommentButton;
