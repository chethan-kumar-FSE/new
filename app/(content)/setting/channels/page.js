import Channel from '@/components/channels/Channel';
import ChannelHeader from '@/components/channels/ChannelHeader';
import CommonHeader from '@/components/CommonHeader';
import { channelService } from '@/services/channelService';
import { cookies } from 'next/headers';
import React from 'react';
import PostsLayout from '@/layouts/PostsLayout';

async function Channels() {
  const cookieStore = cookies();
  const commonUserId = cookieStore.get('commonUserId')?.value;

  try {
    const channelFollowingData =
      await channelService?.getUserFollowingChannelIDs({
        requestBody: {
          user_id: commonUserId,
        },
      });
    //console.log('intiailfolwing', new Date(), channelFollowingData);

    return (
      <PostsLayout>
        <CommonHeader shouldDisplay />
        <ChannelHeader />
        <div className="flex flex-col relative gap-4">
          {channelFollowingData?.map(
            ({
              channel_id,
              channel_name,
              channel_logo,
              channel_key,
              status,
            }) => {
              return (
                <Channel
                  channelId={channel_id}
                  channelImage={channel_logo}
                  channelName={channel_name}
                  channelKey={channel_key}
                  followStatus={status}
                  //userChannels={channelFollowingData}
                />
              );
            }
          )}
        </div>
      </PostsLayout>
    );
  } catch (err) {
    throw new Error('');
  }
}

export default Channels;
