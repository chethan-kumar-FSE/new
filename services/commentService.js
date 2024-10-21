import { tryCatchWrapper } from '@/utils/tryCatchWrapper';
import { apiClient } from './apiclient';

export const commentService = {
  async getComments({ articleId, userId }) {
    return tryCatchWrapper(async () => {
      const response = await apiClient.get({
        url: `https://users.oneindia.com/livecomments/commentslist?articleid=${articleId}&userid=${userId}`,
      });
      return response;
    });
  },
  async postComment({ requestBody }) {
    return tryCatchWrapper(async () => {
      const response = await apiClient.post({
        url: 'https://users.oneindia.com/livecomments/save-comments',
        requestBody,
        directFormData: true,
      });
      console.log('commmetn-reooky', response);
      return response;
    });
  },
  async updateCommentLike({ requestBody }) {
    return tryCatchWrapper(async () => {
      const response = await apiClient.post({
        requestBody,
        url: 'https://users.oneindia.com/livecomments/updatelikes',
        directFormData: true,
      });
      return response;
    });
  },
};
