import { tryCatchWrapper } from '@/utils/tryCatchWrapper';
import { apiClient } from './apiclient';
import { COMMON_HITZFEED_URL } from '@/utils/constant';

export const genreService = {
  async getGenre({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        action: 'fetch-genre-list',
        requestBody,
        url: COMMON_HITZFEED_URL,
      });
      return data;
    });
  },
  async getFeedsOnGenre({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        action: 'fetch-stories-by-genre',
        requestBody,
        url: COMMON_HITZFEED_URL,
      });
      return data;
    });
  },
  async getGenreById({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        action: 'fetch-genre-list',
        requestBody,
        url: COMMON_HITZFEED_URL,
      });
      return data;
    });
  },
};
