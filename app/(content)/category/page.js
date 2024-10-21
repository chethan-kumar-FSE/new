import CategoryHeader from '@/components/category/CategoryHeader';
import CategoryIntro from '@/components/category/CategoryIntro';
import InitialFeeds from '@/components/feeds/feeds';
import { genreService } from '@/services/genreService';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

async function Category({ params, lang = 'en' }) {
  const { id } = params;
  const cookieStore = cookies();
  const commonUserId = cookieStore.get('commonUserId')?.value;

  const data = {
    feedsOnGenre: [],
    genreDataOnCatId: '',
  };
  const feedsOnGenreRequestBody = {
    lang: lang,
    page: '1',
    genre_id: id,
  };

  if (commonUserId) {
    feedsOnGenreRequestBody['user_id'] = commonUserId;
  }
  try {
    const [feedsOnGenre, genreDataOnCatId] = await Promise.all([
      genreService.getFeedsOnGenre({
        requestBody: feedsOnGenreRequestBody,
      }),
      genreService.getGenreById({
        requestBody: { lang: lang, genre_id: id },
      }),
    ]);
    data['feedsOnGenre'] = feedsOnGenre;
    const { url_slug, genre_name, genre_intro } = genreDataOnCatId[0];
    data['genreDataOnCatId'] = { url_slug, genre_name, genre_intro };
  } catch (err) {
    return redirect('/');
  }

  const feedsOnGenre = data['feedsOnGenre'];
  const { url_slug, genre_name, genre_intro } = data['genreDataOnCatId'];
  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          color: 'white',
          maxWidth: '440px',
          margin: '1em auto',
        }}
      >
        <CategoryHeader genreName={genre_name} />
        <div style={{ marginBottom: '1em', padding: '1em' }}>
          <div style={{ position: 'relative' }}>
            <Image
              src={`https://www.hitzfeed.com/trends/media/images/category/${url_slug}_2.jpg`}
              alt="image"
              style={{ width: '100%', height: '200px' }}
            />

            <p style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
              {genre_name}
            </p>
          </div>
          <CategoryIntro genreIntro={genre_intro} />
        </div>
        <InitialFeeds
          initialFeedsOnLoad={feedsOnGenre}
          isFromGenre
          genreId={id}
          lang={lang}
        />
      </div>
    </div>
  );
}

export default Category;
