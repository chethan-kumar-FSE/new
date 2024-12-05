import { cookies } from 'next/headers';
import InitialFeeds from '@/components/feeds/feeds';
import { feedsServices } from '@/services/feedsService';
import { genreService } from '@/services/genreService';
import Template5 from '@/components/feeds/widgetTemplates/template-5/Template5';
import { shuffleArray } from '@/utils/shuffleArray';
import FeedsHeader from '@/components/feeds/feedsheader/FeedsHeader';
import LanguageSelection from '@/components/LanguageSelection';

import PostsLayout from '@/layouts/PostsLayout';

export default function Feeds() {
  const cookieStore = cookies();

  const commonUserId = cookieStore.get('commonUserId')?.value;
  const language = cookieStore.get('language')?.value;

  //check if language is present and show language selection pop us for the user to set in cookies
  if (!language) {
    //if language is not present language selection pop up , isFromHome is boolean value for conditional styling
    return <LanguageSelection isFromHome={true} />;
  }

  const getFeedsRequestObject = {
    lang: language,
    page: '1',
    last_id: '',
  };

  // if common user id is present then add use_id property to the request object
  if (commonUserId) {
    getFeedsRequestObject['user_id'] = commonUserId;
  }
  return execute();

  async function execute() {
    try {
      const [initialFeedsOnLoad, genreList] = await Promise.all([
        feedsServices.getFeeds({
          requestBody: getFeedsRequestObject,
        }),
        genreService.getGenre({
          requestBody: { lang: language || 'en' },
        }),
      ]);

      let shuffledGenreList = shuffleArray(genreList);

      return (
        <PostsLayout>
          <div className="flex flex-col gap-4">
            <FeedsHeader />
            <Template5 genreList={shuffledGenreList} lang={language} />

            <InitialFeeds
              initialFeedsOnLoad={initialFeedsOnLoad}
              lang={language}
            />
          </div>
        </PostsLayout>
      );
    } catch (err) {
      throw new Error('');
    }
  }
}
