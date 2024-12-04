'use client';
import { feedsServices } from '@/services/feedsService';
import { userService } from '@/services/userService';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { v4 as uuidv4 } from 'uuid';
import FallbackImage from '../FallbackImage';
import useResource from '@/hooks/useResource';
import Loader from '../Loader';

function UserPostsLoad({
  initialUserPosts = [],
  commonUserId = '',
  username = '',
}) {
  console.log('initialUserPosts', initialUserPosts);
  const [userPosts, setUserPosts] = useState([...initialUserPosts]);

  const [nextPage, setNextPage] = useState(2);
  const { ref, inView } = useInView({
    threshold: 0.7,
  });

  const {
    fetchData: getCurrentUserPosts,
    isLoading,
    error,
  } = useResource(userService?.getCurrentUserPosts);

  useEffect(() => {
    (async () => {
      if (inView) {
        const currentUserPosts = await getCurrentUserPosts({
          requestBody: {
            user_id: commonUserId,
            page: nextPage,
          },
        });

        console.log('current userpsots', currentUserPosts);
        setUserPosts((prevPosts) => [...prevPosts, ...currentUserPosts]);
        setNextPage((page) => page + 1);
      }
    })();
  }, [inView]);

  if (error) {
    console.log('Error:', error);
    throw new Error('Something went wrong !');
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {userPosts?.map(({ image_link, id }) => (
          <Link key={id} href={`/profile/${username}/${id}`}>
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
    </>
  );
}

export default UserPostsLoad;
