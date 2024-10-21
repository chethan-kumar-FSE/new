import { cookies } from 'next/headers';
import InitialFeeds from '@/components/feeds/feeds';
import { feedsServices } from '@/services/feedsService';
import { genreService } from '@/services/genreService';
import Template5 from '@/components/feeds/widgetTemplates/template-5/Template5';
import { shuffleArray } from '@/utils/shuffleArray';
import FeedsHeader from '@/components/feeds/feedsheader/FeedsHeader';
import Head from 'next/head';
/* export const metadata = {
    title: 'boomm',
    description: 'boomless',
  }; */

/* async function getSeo() {
  console.log('exuintg');
  try {
    const seoData = await feedsServices.getFeedsSeo({
      requestBody: {
        lang: 'en',
        type: 'home',
        item: 'home',
      },
    });

    console.log('callingseo', seoData);
    return seoData;
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return {}; // Return an empty object or default values if needed
  }
} */

/* export async function generateMetadata() {
  console.log('Eicnadkslnfalsk');
  try {
    const metaData = await getSeo();
    console.log(
      'metadatanjaksjdfnaksdjfnaksjfdbkjasbdkfasbfkjasbfkjasnfdnaskdfnasjdfnkjasdf',
      metaData
    );

    const {
      meta_title,
      meta_description,
      meta_keywords,
      canonical_url,
      h1_tag,
      h2_tag,
    } = metaData;

    return {
      title: meta_title || 'Default Title',
      description: meta_description || 'Default Description',
      keywords: meta_keywords || 'Default Keywords',
      openGraph: {
        title: meta_title || 'Default Title',
        description: meta_description || 'Default Description',
        url: canonical_url || 'https://default.url',
        type: 'website',
        image: `${canonical_url}/default-image.jpg`,
      },
      twitter: {
        card: 'summary_large_image',
        title: meta_title || 'Default Title',
        description: meta_description || 'Default Description',
        image: `${canonical_url}/default-image.jpg`,
      },
      canonical: canonical_url || 'https://default.url',
      h1: h1_tag || 'Default H1',
      h2: h2_tag || 'Default H2',
    };
  } catch (error) {
    console.error('Failed to generate metadata:', error);
    return {
      title: 'Default Title',
      description: 'Default Description',
      keywords: 'Default Keywords',
      openGraph: {
        title: 'Default Title',
        description: 'Default Description',
        url: 'https://default.url',
        type: 'website',
        image: 'https://default.url/default-image.jpg',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Default Title',
        description: 'Default Description',
        image: 'https://default.url/default-image.jpg',
      },
      canonical: 'https://default.url',
      h1: 'Default H1',
      h2: 'Default H2',
    };
  }
} */

export default async function Feeds({ lang }) {
  const cookieStore = cookies();
  const commonUserId = cookieStore.get('commonUserId')?.value;
  const userPreferredLanguage = lang || 'en';

  /* const seoData = await feedsServices.getFeedsSeo({
    requestBody: {
      lang: 'en',
      type: 'home',
      item: 'home',
    },
  });

  console.log('callingseo', seoData); */

  const getFeedsRequestObject = {
    lang: userPreferredLanguage,
    page: '1',
    last_id: '',
  };

  // if common user id is present then add use_id property to the request object
  if (commonUserId) {
    getFeedsRequestObject['user_id'] = commonUserId;
  }

  const [initialFeedsOnLoad, genreList] = await Promise.all([
    feedsServices.getFeeds({
      requestBody: getFeedsRequestObject,
    }),
    genreService.getGenre({
      requestBody: { lang: userPreferredLanguage },
    }),
  ]);

  const shuffledGenreList = shuffleArray(genreList);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ maxWidth: '440px', margin: '1em auto' }}>
        <FeedsHeader />
        <Template5 genreList={shuffledGenreList} lang={lang} />
        <InitialFeeds initialFeedsOnLoad={initialFeedsOnLoad} lang={lang} />
      </div>
    </div>
  );
}

// utils/generateMetadata.js
