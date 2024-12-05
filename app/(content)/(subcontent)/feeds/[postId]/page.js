import InitialFeeds from '@/components/feeds/feeds';
import FeedsHeader from '@/components/feeds/feedsheader/FeedsHeader';
import Template5 from '@/components/feeds/widgetTemplates/template-5/Template5';
import LanguageSelection from '@/components/LanguageSelection';
import { feedsServices } from '@/services/feedsService';
import { genreService } from '@/services/genreService';
import { shuffleArray } from '@/utils/shuffleArray';
import { cookies } from 'next/headers';
import PostsLayout from '@/layouts/PostsLayout';

export default async function PostById({ params }) {
  const { postId } = params;

  const cookieStore = cookies();

  const commonUserId = cookieStore.get('commonUserId')?.value;
  const language = cookieStore.get('language')?.value;

  //check if language is present and show language selection pop us for the user to set in cookies
  if (!language) {
    //isFromHome boolean value is for the design purpose based on the location its calling from.
    return <LanguageSelection isFromHome={true} />;
  }

  const feedByIdRequestBody = {
    story_id: postId,
  };

  //add userId only if commentUserId present via (login)
  if (commonUserId) {
    feedByIdRequestBody['user_id'] = commonUserId;
  }

  try {
    let [feedById, genreList] = await Promise.all([
      feedsServices.getFeedById({
        requestBody: feedByIdRequestBody,
      }),
      genreService.getGenre({
        requestBody: { lang: language },
      }),
    ]);

    let shuffledGenreList = shuffleArray(genreList);

    return (
      <PostsLayout>
        <div className="flex flex-col gap-[1em]">
          <Template5 genreList={shuffledGenreList} lang={language} />
          <InitialFeeds initialFeedsOnLoad={feedById} lang={language} />
        </div>
      </PostsLayout>
    );
  } catch (err) {}
  throw new Error('Something went wrong');
}
