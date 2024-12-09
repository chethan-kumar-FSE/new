import InitialFeeds from '@/components/feeds/feeds';
import { feedsServices } from '@/services/feedsService';
import React from 'react';
import { cookies } from 'next/headers';
import FeedsHeader from '@/components/feeds/feedsheader/FeedsHeader';

export async function generateMetadata() {
  // read route params
  const response = await feedsServices?.getFeedsSeo({
    requestBody: {
      lang: 'en',
      type: 'home',
      item: 'home',
    },
  });
  const { meta_title, meta_description, meta_keywords } = response;

  return {
    title: meta_title,
    description: meta_description,
    keywords: meta_keywords,
    openGraph: {
      title: meta_title,
      description: meta_description,
      url: process.env.NEXT_PUBLIC_API_URL,
      images: [
        'https://www.hitzfeed.com/trends/media/images/hitzfeed-og-image.jpg',
      ],
    },
    metadataBase: new URL('https://www.hitzfeed.com/'),
    alternates: {
      canonical: '/',
    },
  };
}

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
    const initialFeedsOnLoad = await feedsServices?.getTrendingFeeds({
      requestBody: getFeedsRequestObject,
    });
    return (
      <PostsLayout>
        <FeedsHeader from={'trending'} />

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
