import { tryCatchWrapper } from '@/utils/tryCatchWrapper';
import { apiClient } from './apiclient';
import { COMMON_HITZFEED_URL } from '@/utils/constant';

export const channelService = {
  async getChannels({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        requestBody,
        url: COMMON_HITZFEED_URL,
        action: 'fetch-channel-list',
      });
      return data;
    });
  },
  async getUserFollowingChannelIDs({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        requestBody,
        url: COMMON_HITZFEED_URL,
        action: 'fetch-user-following-channels',
      });
      return data;
    });
  },
};
