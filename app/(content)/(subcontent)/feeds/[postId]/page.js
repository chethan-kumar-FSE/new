import InitialFeeds from '@/components/feeds/feeds';
import FeedsHeader from '@/components/feeds/feedsheader/FeedsHeader';
// import Template5 from '@/components/feeds/widgetTemplates/template-5/Template5';
import { feedsServices } from '@/services/feedsService';
import { genreService } from '@/services/genreService';
import { shuffleArray } from '@/utils/shuffleArray';
import { cookies } from 'next/headers';
import Head from 'next/head';

export const metadata = {
  title: 'Amazing Article',
  description: 'Discover the wonders of the universe in this amazing article!',
  openGraph: {
    title: 'Amazing Article',
    description:
      'Discover the wonders of the universe in this amazing article!',
    url: 'https://yourwebsite.com/amazing-article', // Replace with your article's URL
    images: [
      {
        url: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
        width: 1200,
        height: 630,
        alt: 'A beautiful view of the universe',
        type: 'image/jpeg',
      },
    ],
    siteName: 'Your Website Name', // Your website's name
  },
};

export default async function DisplayPostOnId({ params, lang }) {
  const { postId } = params;

  const cookieStore = cookies();

  const commonUserId = cookieStore.get('commonUserId')?.value;
  const feedByIdRequestBody = {
    story_id: postId,
  };

  if (commonUserId) {
    feedByIdRequestBody['user_id'] = commonUserId;
  }
  const { data: initialFeedsOnLoad } = await feedsServices.getFeedById({
    requestBody: feedByIdRequestBody,
  });
  const genreList = await genreService.getGenre({
    requestBody: { lang: lang },
  });
  const shuffledGenreList = shuffleArray(genreList);
  return (
    <div style={{ width: '100%' }}>
      <div style={{ maxWidth: '440px', margin: '0 auto' }}>
        <FeedsHeader />
        {/* <Template5 genreList={shuffledGenreList} lang={lang} /> */}
        <InitialFeeds initialFeedsOnLoad={initialFeedsOnLoad} lang={lang} />;
      </div>
    </div>
  );
}
