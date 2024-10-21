'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { feedsServices } from '@/services/feedsService';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
function LikeButton({ likeCount, userLike, articleId, newsLanguage }) {
  const { data: session } = useSession();

  const [initialLikeCount, setInitialLikeCount] = useState(likeCount);
  const [initialUserLike, setInitialUserLike] = useState(userLike);

  const userId = Cookies.get('userId');
  const router = useRouter();

  const handleOnLike = async () => {
    if (!session || !session?.user) {
      router.replace('/login');
      return;
    }
    const previousUserLike = initialUserLike;
    const previousLikeCount = initialLikeCount;

    setInitialLikeCount((prevCount) =>
      initialUserLike ? prevCount - 1 : prevCount + 1
    );
    setInitialUserLike(!initialUserLike);
    try {
      const response = await feedsServices.updatePostLike({
        requestBody: {
          articleid: articleId,
          likestatus: initialUserLike ? 0 : 1,
          userid: userId,
          lang: newsLanguage,
        },
      });
      const { count } = response;
      setInitialLikeCount(count);
    } catch (err) {
      setInitialLikeCount(previousUserLike);
      setInitialUserLike(!previousLikeCount);
    }
  };
  return (
    <div style={{ cursor: 'pointer' }} onClick={handleOnLike}>
      <Image
        src={
          initialUserLike
            ? 'https://www.hitzfeed.com/trends/media/images/icons/like-icon-active.svg'
            : ' https://www.hitzfeed.com/trends/media/images/icons/like-icon.svg'
        }
        width={20}
        height={20}
        alt="Like"
      />
      <p style={{ fontSize: '12px', textAlign: 'center' }}>
        {initialLikeCount}
      </p>
    </div>
  );
}

export default LikeButton;
