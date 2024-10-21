import { apiClient } from './apiclient';
import { tryCatchWrapper } from '@/utils/tryCatchWrapper';
import { COMMON_HITZFEED_URL } from '@/utils/constant';

export const feedsServices = {
  async getFeeds({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        action: 'fetch-stories',
        requestBody,
        url: COMMON_HITZFEED_URL,
      });
      return data;
    });
  },
  async getFeedById({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        action: 'fetch-story-details',
        requestBody,
        url: COMMON_HITZFEED_URL,
      });
      return { data };
    });
  },
  async getFeedsSeo({ requestBody }) {
    return tryCatchWrapper(async () => {
      const response = await apiClient.post({
        action: 'fetch-meta-details',
        requestBody,
        url: COMMON_HITZFEED_URL,
      });
      return response;
    });
  },
  async updatePostLike({ requestBody }) {
    return tryCatchWrapper(async () => {
      const response = await apiClient.post({
        requestBody,
        url: 'https://users.oneindia.com/livecomments/updatepostlike',
        directFormData: true,
      });
      return response;
    });
  },
  async postDownload({ requestBody }) {
    return tryCatchWrapper(async () => {
      const response = await apiClient.post({
        requestBody,
        url: 'https://users.oneindia.com/livecomments/updatepostdownload',
        directFormData: true,
      });
      return response;
    });
  },
  async getUpdatedViewCount({ requestBody }) {
    return tryCatchWrapper(async () => {
      const response = await apiClient.post({
        requestBody,
        url: 'https://users.oneindia.com/livecomments/updatepostview',
        directFormData: true,
      });
      return response;
    });
  },
  async getUpdatedSaveCount({ requestBody }) {
    return tryCatchWrapper(async () => {
      const response = await apiClient.post({
        requestBody,
        url: 'https://users.oneindia.com/livecomments/updatepostsave',
        directFormData: true,
      });
      return response;
    });
  },
  async getUpdatedShareCount({ requestBody }) {
    return tryCatchWrapper(async () => {
      const response = await apiClient.post({
        requestBody,
        url: 'https://users.oneindia.com/livecomments/updatepostshare',
        directFormData: true,
      });
      return response;
    });
  },
};
