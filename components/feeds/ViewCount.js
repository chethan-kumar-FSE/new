'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { feedsServices } from '@/services/feedsService';
import Cookies from 'js-cookie';

function ViewCount({ viewCount, currentId, newsLanguage }) {
  const [initialViewCount, setInitialViewCount] = useState(viewCount);
  const userId = Cookies.get('userId');

  useEffect(() => {
    const handlePostIDUpdate = async (event) => {
      const { postID } = event.detail;
      {
        console.log('executing', currentId, userId, newsLanguage);
      }

      // Check if the postID from the event matches the currentId
      if (postID !== currentId) return;

      try {
        const response = await feedsServices.getUpdatedViewCount({
          requestBody: {
            articleid: postID,
            viewcount: 1,
            userid: userId || 0,
            lang: newsLanguage,
          },
        });

        const { count } = response;
        setInitialViewCount(count);
      } catch (error) {
        console.error('Failed to update view count:', error);
      }
    };

    // Listen for the custom event
    window.addEventListener(`postIDUpdated-${currentId}`, handlePostIDUpdate);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener(
        `postIDUpdated-${currentId}`,
        handlePostIDUpdate
      );
    };
  }, [currentId, newsLanguage, userId]);

  return (
    <div>
      <Image
        src="https://www.hitzfeed.com/trends/media/images/icons/view-icon.svg"
        width={20}
        height={20}
        alt="View"
      />
      <p style={{ fontSize: '12px', textAlign: 'center' }}>
        {initialViewCount}
      </p>
    </div>
  );
}

export default React.memo(ViewCount);
