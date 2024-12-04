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

      return data;
    });
  },
  async getFeedsSeo({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        action: 'fetch-meta-details',
        requestBody,
        url: COMMON_HITZFEED_URL,
      });
      return data;
    });
  },
  async updatePostLike({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { count } = await apiClient.post({
        requestBody,
        url: 'https://users.oneindia.com/livecomments/updatepostlike',
        directFormData: true,
      });
      return count;
    });
  },
  async postDownload({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { count } = await apiClient.post({
        requestBody,
        url: 'https://users.oneindia.com/livecomments/updatepostdownload',
        directFormData: true,
      });
      return count;
    });
  },
  async getUpdatedViewCount({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { count } = await apiClient.post({
        requestBody,
        url: 'https://users.oneindia.com/livecomments/updatepostview',
        directFormData: true,
      });
      return count;
    });
  },
  async getUpdatedSaveCount({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { count } = await apiClient.post({
        requestBody,
        url: 'https://users.oneindia.com/livecomments/updatepostsave',
        directFormData: true,
      });
      return count;
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
  async getCategorySeo({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        action: 'fetch-meta-details',
        requestBody,
        url: COMMON_HITZFEED_URL,
      });
      return data;
    });
  },
  async updateChannelFollowStatus({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { status } = await apiClient.post({
        requestBody,
        url: 'https://users.oneindia.com/livecomments/updatepostfollow',
        directFormData: true,
      });
      return status;
    });
  },
  async sendMailOnFollow({ requestBody }) {
    return tryCatchWrapper(async () => {
      const response = await apiClient.post({
        action: 'index',
        page: 'flash-card-mail',
        requestBody,
        url: 'https://www.hitzfeed.com/trends/index.php',
        directFormData: true,
      });
      return response;
    });
  },
  async getTrendingFeeds({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        action: 'fetch-trending-stories',
        requestBody,
        url: COMMON_HITZFEED_URL,
      });
      return data;
    });
  },
};
