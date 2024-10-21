'use client';
import React, { useEffect, useState } from 'react';
import UserPostsLoad from './UserPostsLoad';
import { userService } from '@/services/userService';
import { useUserCommonId } from '@/context/userCommonId';
import useResource from '@/hooks/useResource';
import Image from 'next/image';
function UserPosts({ username }) {
  //const commonUserId = Cookies.get('commonUserId');
  // const [userPosts, setUsersPosts] = useState([]);
  const { userCommonId } = useUserCommonId();
  const {
    data: userPosts,
    isLoading,
    fetchData,
    error,
  } = useResource(userService.getCurrentUserPosts);

  useEffect(() => {
    (async () => {
      await fetchData({
        requestBody: {
          user_id: userCommonId,
          page: '1',
        },
      });
    })();
  }, [userCommonId]);

  if (error) {
    console.log('console.log', error);
  }

  if (isLoading) {
    return <p>loading...</p>;
  }

  //console.log('userposgt', userPosts);
  if (userPosts?.length === 0) {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2em 0',
          }}
        >
          <Image
            src={
              'https://demo3.greynium.com/hitzfeed/images/icons/telegram-icon-large.svg'
            }
            width={80}
            height={80}
            alt="alternate"
          />
          <p>
            You will be able to post <br />
            to HitzFeed very soon..
          </p>
        </div>
        <button
          style={{
            background: '#8500ff',
            padding: '10px 20px',
            borderRadius: '50px',
            color: '#fff',
            fontSize: '16px',
            fontWeight: '500',
            textAlign: 'center',
            display: 'inline-block',
            textTransform: 'capitalize',
          }}
        >
          Check out the top <br />
          Trending and Latest Feeds
        </button>
      </div>
    );
  }
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridRowGap: '0.6em',
        gridColumnGap: '0.6em',
        position: 'relative',
      }}
    >
      {userPosts && (
        <UserPostsLoad
          initialUserPosts={userPosts}
          commonUserId={userCommonId}
          username={username}
        />
      )}
    </div>
  );
}

export default UserPosts;
