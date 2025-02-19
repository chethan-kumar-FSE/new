'use client';
import useResource from '@/hooks/useResource';
import { feedsServices } from '@/services/feedsService';
import { notify } from '@/utils/Toast';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useSessionAndConnectivity } from '@/hooks/useSessionAndConnectivity';

function FollowButton({
  userFollow,
  articleId,
  channelId,
  newsLanguage,
  updateFollowStatusOnProfileFollow,
  channelName,
}) {
  const normalizedUserFollow = Number(userFollow);

  const [initialUserFollow, setInitialUserFollow] = useState(
    normalizedUserFollow == 0 ? false : true
  );

  const { checkSessionAndConnectivity } = useSessionAndConnectivity();
  const { fetchData: updateChannelFollowStatus, error } = useResource(
    feedsServices?.updateChannelFollowStatus
  );
  useEffect(() => {
    setInitialUserFollow(normalizedUserFollow === 0 ? false : true);
  }, [normalizedUserFollow]);

  const userId = Cookies.get('userId');

  const handleOnUpdateFollow = async () => {
    const canProceed = checkSessionAndConnectivity();

    if (!canProceed) return;

    setInitialUserFollow((prevState) => !prevState);
    updateFollowStatusOnProfileFollow({
      username: channelName,
      currentFollow: initialUserFollow ? '0' : '1',
    });

    try {
      const followChannel = await updateChannelFollowStatus({
        requestBody: {
          articleid: initialUserFollow ? 0 : articleId,
          channelid: channelId,
          userid: userId,
          lang: newsLanguage,
        },
      });

      if (followChannel && !initialUserFollow) {
        const sendMailResponse = await feedsServices?.sendMailOnFollow({
          requestBody: {
            type: 'follow',
            user_id: userId,
            post_id: channelId,
            lang: newsLanguage,
            response: 'json',
          },
        });

        if (!sendMailResponse && !sendMailResponse.status) {
          throw new Error('EmailError');
        }
      }
    } catch (err) {
      console.log('Error', err.message);
    }
  };

  if (error) {
    setInitialUserFollow((prevState) => !prevState);
    notify({ message: 'Something went wrong !', isError: true });
  }
  return (
    <button
      className={`text-[12px] py-[4px] px-6 rounded-[0.5em] text-white  text-center cursor-pointer font-semibold focus:outline-none transition-all duration-200 ease-in-out 
  ${
    !initialUserFollow
      ? 'bg-[#8500ff] border-purple-500 '
      : 'border-2 border-[#8500ff] bg-[transparent]'
  }`}
      onClick={handleOnUpdateFollow}
    >
      {initialUserFollow ? 'Following' : 'Follow'}
    </button>
  );
}

export default FollowButton;
