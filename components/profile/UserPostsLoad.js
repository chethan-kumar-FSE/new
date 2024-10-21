'use client';
import { feedsServices } from '@/services/feedsService';
import { userService } from '@/services/userService';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { v4 as uuidv4 } from 'uuid';

function UserPostsLoad({
  initialUserPosts = [],
  commonUserId = '',
  username = '',
}) {
  console.log('initialUserPosts', initialUserPosts);
  const [userPosts, setUserPosts] = useState([...initialUserPosts]);

  const [nextPage, setNextPage] = useState(2);
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  useEffect(() => {
    (async () => {
      if (inView) {
        const currentUserPosts = await userService.getCurrentUserPosts({
          requestBody: {
            user_id: commonUserId,
            page: nextPage,
          },
        });
        setUserPosts((prevPosts) => [...prevPosts, ...currentUserPosts]);
        setNextPage((page) => page + 1);
      }
    })();
  }, [inView, nextPage, commonUserId]);

  return (
    <>
      {userPosts?.map(({ image_link, id }) => {
        return (
          <Link key={uuidv4()} href={`/profile/${username}/${id}`}>
            <Image
              src={`https://imagesvs.oneindia.com/webp/trends${image_link}`}
              style={{ width: '100%', height: '100px' }}
              alt=""
            />
          </Link>
        );
      })}

      <div
        ref={ref}
        style={{
          height: '100px',
          background: 'transparent',
          width: '10px',
          position: 'absolute',
          bottom: '30%',
        }}
      ></div>
    </>
  );
}

export default UserPostsLoad;
