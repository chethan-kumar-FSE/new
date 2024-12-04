import CategoryHeader from '@/components/category/CategoryHeader';
import CategoryIntro from '@/components/category/CategoryIntro';
import FallbackImage from '@/components/FallbackImage';
import InitialFeeds from '@/components/feeds/feeds';
import LanguageSelection from '@/components/LanguageSelection';
import { genreService } from '@/services/genreService';
import { cookies } from 'next/headers';
import React from 'react';
import PostsLayout from '@/layouts/PostsLayout';

async function Category({ params }) {
  const { categoryId } = params;
  const cookieStore = cookies();
  const language = cookieStore.get('language')?.value;

  //if language is not present language selection pop up , isFromHome is boolean value for conditional styling
  if (!language) {
    return <LanguageSelection isFromHome={true} />;
  }

  const commonUserId = cookieStore.get('commonUserId')?.value;

  const feedsOnGenreRequestBody = {
    lang: language,
    page: '1',
    genre_id: categoryId,
  };

  //add commonUserId to request body if only present in cookies
  if (commonUserId) {
    feedsOnGenreRequestBody['user_id'] = commonUserId;
  }

  try {
    //fetch feeds based on genre and genre data on categoryId : categoryId
    const [feedsOnGenre, genreDataOnCatId] = await Promise.all([
      genreService.getFeedsOnGenre({
        requestBody: feedsOnGenreRequestBody,
      }),
      genreService.getGenreById({
        requestBody: { lang: language, genre_id: categoryId },
      }),
    ]);

    const { url_slug, genre_name, genre_intro } = genreDataOnCatId[0];

    return (
      <PostsLayout className={'text-[#fff]'}>
        <div className="flex flex-col gap-4">
          <CategoryHeader genreName={genre_name} />

          <div className="flex flex-col gap-[0.8em]">
            <div className="relative">
              <FallbackImage
                sr={`https://www.hitzfeed.com/trends/media/images/category/${url_slug}_2.jpg`}
                alt="image"
                className={'w-[100%] h-[200px] rounded-[0.5em]'}
              />

              <p className="absolute bottom-[10px] left-[10px]">{genre_name}</p>
            </div>
            <CategoryIntro genreIntro={genre_intro} />
          </div>
          <InitialFeeds
            initialFeedsOnLoad={feedsOnGenre}
            isFromGenre
            genreId={categoryId}
            lang={language}
          />
        </div>
      </PostsLayout>
    );
  } catch (err) {
    throw new Error('');
  }
}

export default Category;
