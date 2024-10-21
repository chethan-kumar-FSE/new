import { tryCatchWrapper } from '@/utils/tryCatchWrapper';
import { apiClient } from './apiclient';
import { COMMON_HITZFEED_URL } from '@/utils/constant';

export const userService = {
  async login({ requestBody }) {
    console.log('commongurl', COMMON_HITZFEED_URL);
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        action: 'login',
        requestBody,
        url: COMMON_HITZFEED_URL,
      });
      return data;
    });
  },

  async getUserProfileBySecureUserId({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        action: 'search-user',
        requestBody,
        url: COMMON_HITZFEED_URL,
      });
      return data;
    });
  },

  async getUserProfileData({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        action: 'get-user-profile-data',
        requestBody,
        url: COMMON_HITZFEED_URL,
      });
      return data;
    });
  },

  async getCurrentUserPosts({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        action: 'get-user-profile-data-cards',
        requestBody,
        url: COMMON_HITZFEED_URL,
      });
      return data;
    });
  },

  async getPostByUserId({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        action: 'fetch-story-details',
        requestBody,
        url: COMMON_HITZFEED_URL,
      });
      return data;
    });
  },

  async getUserDetails({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        action: 'get-user-details',
        requestBody,
        url: COMMON_HITZFEED_URL,
      });
      return data;
    });
  },

  async updateUserDetails({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        action: 'update-user-details',
        requestBody,
        url: COMMON_HITZFEED_URL,
      });
      return data;
    });
  },
};
