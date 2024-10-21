import { tryCatchWrapper } from '@/utils/tryCatchWrapper';
import { apiClient } from './apiclient';
import { COMMON_HITZFEED_URL } from '@/utils/constant';

export const langService = {
  async getLanguages() {
    return tryCatchWrapper(async () => {
      const { data } = await apiClient.post({
        action: 'languages',
        url: COMMON_HITZFEED_URL,
      });
      return data;
    });
  },
  /*  async setLangOnCookies({ requestBody }) {
    return tryCatchWrapper(async () => {
      return apiClient.post({
        requestBody,
        nextUrl: 'http://oneindia.greynium.com:3000/api/setlanguage',
      });
    });
  }, */
};
