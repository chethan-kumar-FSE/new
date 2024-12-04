import React from 'react';
import FollowChannelButton from './FollowChannelButton';
import Link from 'next/link';
import FallbackImage from '../FallbackImage';

function Channel({
  channelId,
  channelImage,
  channelName,
  channelKey,
  followStatus,
  //commonUserId,
  //initialFollowingChannelIDs,
}) {
  return (
    <div className="flex justify-between w-[100%]">
      <div className="flex gap-[1em]">
        <div>
          {/* FallbackImage component to handle fallback image if URL fails to load from S3 */}
          <FallbackImage
            sr={
              channelImage.startsWith('https')
                ? channelImage
                : `https://www.hitzfeed.com/trends/media/channel_image/${channelImage}`
            }
            alt="channel_image"
            className={'w-[40px] h-[40px] rounded-[50%]'}
            userFallback={true} //to check if its an user icon based image
          />
        </div>

        <div className="flex flex-col gap-[0.3em]">
          <p className="text-[#fff]">{channelName}</p>
          <Link
            className="no-underline text-[#0066cc] text-[12px]"
            href={`/${channelName}`}
          >
            {channelKey}
          </Link>
        </div>
      </div>
      <div>
        <FollowChannelButton
          channelId={channelId}
          followStatus={followStatus}
          // initialFollowingChannelIDs={initialFollowingChannelIDs}
        />
      </div>
    </div>
  );
}

export default Channel;
