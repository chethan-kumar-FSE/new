import { tryCatchWrapper } from '@/utils/tryCatchWrapper';
import { apiClient } from './apiclient';
import { COMMON_HITZFEED_URL } from '@/utils/constant';
export const locationService = {
  async getCountries() {
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        action: 'fetch-country-list',
        url: COMMON_HITZFEED_URL,
      });
      return data;
    });
  },
  async getStates({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        action: 'fetch-state-list',
        requestBody,
        url: COMMON_HITZFEED_URL,
      });
      return data;
    });
  },
  async getCities({ requestBody }) {
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        action: 'fetch-city-list',
        requestBody,
        url: COMMON_HITZFEED_URL,
      });
      return data;
    });
  },
};
