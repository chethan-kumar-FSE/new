'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { feedsServices } from '@/services/feedsService';
import Cookies from 'js-cookie';

function FavButton({ saveCount, articleId, newsLanguage, userSave }) {
  const [initialSaveCount, setInitialSaveCount] = useState(saveCount);
  const [initialUserSave, setInitialUserSave] = useState(userSave);
  console.log('initialUsersave', initialUserSave);

  const router = useRouter();
  const { data: session } = useSession();

  const userId = Cookies.get('userId');

  const handleOnSave = async () => {
    if (!session && !session?.user) {
      router.replace('/login');
      return;
    }

    const prevSaveCount = initialSaveCount === '' ? 0 : initialSaveCount;
    const prevUserSave = initialUserSave;

    setInitialSaveCount((prevCount) =>
      initialUserSave ? prevCount - 1 : prevCount + 1
    );
    setInitialUserSave(initialUserSave ? 0 : 1);

    try {
      const response = await feedsServices.getUpdatedSaveCount({
        requestBody: {
          articleid: articleId,
          savestatus: initialUserSave ? 0 : 1,
          userid: userId,
          lang: newsLanguage,
        },
      });

      const { count } = response;
      setInitialSaveCount(count);
    } catch (err) {
      setInitialSaveCount(prevSaveCount === 0 ? '' : prevSaveCount);
      setInitialUserSave(prevUserSave);
    }
  };
  return (
    <div onClick={handleOnSave} style={{ cursor: 'pointer' }}>
      <Image
        //
        src={
          initialUserSave
            ? 'https://www.hitzfeed.com/trends/media/images/icons/save-icon-active.svg'
            : 'https://www.hitzfeed.com/trends/media/images/icons/save-icon.svg'
        }
        width={20}
        height={20}
        alt="Save"
      />
      <p style={{ fontSize: '12px', textAlign: 'center', color: '#fff' }}>
        {initialSaveCount}
      </p>
    </div>
  );
}

export default FavButton;
