import { cookies } from 'next/headers';
import InitialFeeds from '@/components/feeds/feeds';
import { feedsServices } from '@/services/feedsService';
import { genreService } from '@/services/genreService';
import Template5 from '@/components/feeds/widgetTemplates/template-5/Template5';
import { shuffleArray } from '@/utils/shuffleArray';
import FeedsHeader from '@/components/feeds/feedsheader/FeedsHeader';
import Head from 'next/head';
import LanguageSelection from '@/components/LanguageSelection';

export default async function Feeds({ lang }) {
  const cookieStore = cookies();
  const commonUserId = cookieStore.get('commonUserId')?.value;
  const userPreferredLanguage = cookieStore.get('language')?.value;

  if (!userPreferredLanguage) {
    return <LanguageSelection isFromHome={true} />;
  }

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
