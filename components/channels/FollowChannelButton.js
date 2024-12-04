'use client';
import { channelService } from '@/services/channelService';
import { feedsServices } from '@/services/feedsService';
import Cookies from 'js-cookie';
import React, { useState } from 'react';

function FollowChannelButton({ channelId, followStatus }) {
  //setting the initial channel following lists by logged in user
  const [isChannelFollowing, setIsChannelFollowing] = useState(
    followStatus === 'Follow' ? false : true
  );

  //extracting userId and language from cookies
  const userId = Cookies.get('userId');
  const language = Cookies.get('language');

  //handling on following channel button click
  const handleOnFollowChannel = async () => {
    //keeping track of the current values to be used when API call fails
    const prevStatus = isChannelFollowing;

    //optmistic update to give user immediate feedback
    setIsChannelFollowing(!prevStatus);
    try {
      const channelFollowStatus = await feedsServices.updateChannelFollowStatus(
        {
          requestBody: {
            articleid: isChannelFollowing ? 0 : channelId,
            channelid: channelId,
            userid: userId,
            lang: language,
          },
        }
      );
      if (channelFollowStatus) {
        console.log('yes correct', channelFollowStatus);
      }

      /*  if (channelFollowStatus) {
        // Fetch the updated following list
        const userFollowingChannelIds =
          await channelService.getUserFollowingChannelIDs({
            requestBody: {
              user_id: commonUserId,
            },
          });
        console.log('get channel IDs', userFollowingChannelIds);

        // Update following list and following status
        //setFollowingList(userFollowingChannelIds);
        setIsChannelFollowing(
          userFollowingChannelIds.includes(String(channelId))
        );
      } */
    } catch (error) {
      //setting back to initial status if API call fails
      setIsChannelFollowing(prevStatus);
      console.error('Failed to update follow status:', error);
    }
  };

  return (
    <button
      className={`w-[110px] px-5 py-1 rounded-full text-center text-[15px] cursor-pointer 
      ${
        isChannelFollowing
          ? 'border-[#8200ff] border-[1px] text-[#fff] bg-transparent'
          : 'bg-[#8200ff] text-[#fff] border-[#8200ff]'
      }`}
      onClick={handleOnFollowChannel}
    >
      {/* checking if current channel is being followed and showing text based on that */}
      {isChannelFollowing ? 'Following' : 'Follow'}
    </button>
  );
}

export default FollowChannelButton;
