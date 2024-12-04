'use client';
import { userService } from '@/services/userService';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { v4 as uuidv4 } from 'uuid';
import FallbackImage from '../FallbackImage';
import { convertToMilliseconds } from '@/utils/dateToMilli';
import useResource from '@/hooks/useResource';
import Loader from '../Loader';

function UserSavedPostsLoad({ initialUserSavedPosts = [], commonUserId = '' }) {
  console.log('initialUserPosts', initialUserSavedPosts);

  const {
    fetchData: getUserProfileSavedCards,
    isLoading,
    error,
    data: userProfileSavedCardsData,
  } = useResource(userService?.getUserProfileSavedCards);

  const [userSavedPosts, setUserSavedPosts] = useState([
    ...initialUserSavedPosts,
  ]);

  const [isEnded, setIsEnded] = useState(false);
  const [lastPostAddedOnTime, setLastPostAddedOnTime] = useState(
    initialUserSavedPosts[initialUserSavedPosts?.length - 1]?.timestamp
  );

  const { ref, inView } = useInView({
    threshold: 0.7,
  });

  useEffect(() => {
    (async () => {
      console.log('executn');

      if (inView && !isEnded) {
        //if (error) return;
        const currentUserSavedPosts = await getUserProfileSavedCards({
          requestBody: {
            user_id: commonUserId,
            timestamp: lastPostAddedOnTime,
          },
        });

        if (!currentUserSavedPosts || !currentUserSavedPosts?.length) {
          setIsEnded(true);
          return;
        }

        setUserSavedPosts((prevPosts) => [
          ...prevPosts,
          ...currentUserSavedPosts,
        ]);
        setLastPostAddedOnTime(
          currentUserSavedPosts[currentUserSavedPosts.length - 1]?.timestamp
        );
        // }
      }
    })();
  }, [inView]);

  return (
    <div className="relative mb-[60px]">
      <div className="grid grid-cols-3 gap-2">
        {userSavedPosts?.map(({ image_link, id }) => (
          //`/profile/${username}/saved/${id}`
          <Link key={id} href={`/`}>
            <div className="relative">
              <FallbackImage
                sr={`https://imagesvs.oneindia.com/webp/trends${image_link}`}
                className="w-full h-[100px] object-cover rounded-lg"
                alt="User Post"
              />
            </div>
          </Link>
        ))}
      </div>
      {isLoading && (
        <div className="relative top-[22px]">
          <Loader />
        </div>
      )}

      <div
        ref={ref}
        className="h-[100px] w-[50px] bg-transparent absolute bottom-[30%]"
      ></div>
    </div>
  );
}

export default React.memo(UserSavedPostsLoad);
