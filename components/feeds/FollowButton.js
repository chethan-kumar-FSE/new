'use client';
import useResource from '@/hooks/useResource';
import { feedsServices } from '@/services/feedsService';
import { notify } from '@/utils/Toast';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useSessionAndConnectivity } from '@/hooks/useSessionAndConnectivity';

function FollowButton({ userFollow, articleId, channelId, newsLanguage }) {
  //setting true or false boolean value based on the userFollow value
  const [initialUserFollow, setInitialUserFollow] = useState(
    userFollow == 0 ? false : true
  );

  const { checkSessionAndConnectivity } = useSessionAndConnectivity();
  const { fetchData: updateChannelFollowStatus, error } = useResource(
    feedsServices?.updateChannelFollowStatus
  );

  const userId = Cookies.get('userId');

  const handleOnUpdateFollow = async () => {
    //checking if connection to online , if yes notify user
    const canProceed = checkSessionAndConnectivity();

    if (!canProceed) return;
    //used for optimistic updates to give immediate user feedback
    setInitialUserFollow((prevState) => !prevState);
    try {
      //include articleid when its being followed , on unfollow pass articleId as 0
      const followChannel = await updateChannelFollowStatus({
        requestBody: {
          articleid: initialUserFollow ? 0 : articleId,
          channelid: channelId,
          userid: userId,
          lang: newsLanguage,
        },
      });
      //send main if only response status is true and initialUserFollow is false
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

        //throwing error if there is an Error with sending an email
        if (!sendMailResponse && !sendMailResponse.status) {
          throw new Error('EmailError');
        }
      }
    } catch (err) {
      console.log('Error', err.message);
    }
  };

  if (error) {
    console.log('Error:', error.message);
    //if something goes with update follow status API then toggle to initial status
    setInitialUserFollow((prevState) => !prevState);
    notify({ message: 'Something went wrong !', isError: true });
  }
  return (
    <button
      className={`text-[12px] py-[4px] px-6 rounded-[0.5em] text-white  text-center cursor-pointer font-semibold focus:outline-none transition-all duration-200 ease-in-out 
    ${
      initialUserFollow
        ? 'border-2 border-[ bg-[#8500ff] border-purple-500 '
        : 'border-2 border-[#8500ff] bg-[transparent]'
    }`}
      onClick={handleOnUpdateFollow}
    >
      {/* based on the userFollow status showing following and unfollowing status */}
      {initialUserFollow ? 'Following' : 'Follow'}
    </button>
  );
}

export default FollowButton;
