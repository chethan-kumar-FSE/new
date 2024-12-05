import InitialFeeds from '@/components/feeds/feeds';
import { feedsServices } from '@/services/feedsService';
import React from 'react';
import { cookies } from 'next/headers';
import FeedsHeader from '@/components/feeds/feedsheader/FeedsHeader';

import PostsLayout from '@/layouts/PostsLayout';
async function Trending() {
  const cookieStore = cookies();

  const language = cookieStore.get('language')?.value;

  const getFeedsRequestObject = {
    lang: language || 'en',
    page: '1',
    last_id: '',
  };

  try {
    const initialFeedsOnLoad = await feedsServices.getTrendingFeeds({
      requestBody: getFeedsRequestObject,
    });
    return (
      <PostsLayout>
        <InitialFeeds
          initialFeedsOnLoad={initialFeedsOnLoad}
          lang={language}
          isFromTrending={true}
        />
      </PostsLayout>
    );
  } catch (err) {
    throw new Error('');
  }
}

export default Trending;
