import Feeds from '../(subcontent)/feeds/page';
import PostById from '../(subcontent)/feeds/[postId]/page';
import Category from '../category/page';
import { notFound } from 'next/navigation';
import Head from 'next/head';
import { feedsServices } from '@/services/feedsService';
import Trending from '../(subcontent)/trending/page';
import { LANGUAGES } from '@/utils/constant';
import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from '@/components/Fallback';
import { Suspense } from 'react';
import Loader from '@/components/Loader';

export const generateMetadata = async ({ index, slug }) => {
  let title;
  let description;
  let imageUrl;
  const siteUrl = process.env.NEXT_PUBLIC_API_URL;
  let keywords;
  let ogUrl;

  //if slug's length equals to index then return FeedsSeo
  if (slug?.length === index) {
    try {
      //fetching feeds seo data
      const homeSeoData = await feedsServices?.getFeedsSeo({
        requestBody: {
          lang: 'en',
          type: 'home',
          item: 'home',
        },
      });

      const { meta_title, meta_description, meta_keywords } = homeSeoData;

      title = meta_title;
      description = meta_description;
      keywords = meta_keywords;
      imageUrl =
        'https://www.hitzfeed.com/trends/media/images/hitzfeed-og-image.jpg';
      ogUrl = siteUrl;

      return metaObject({ title, description, ogUrl, imageUrl, keywords });
    } catch (err) {
      console.log(err);
    }
  }

  //extract post id if reg ex matches the condition
  let postId = slug[index]?.match(/-p(\d+)/)?.[1];
  if (postId) {
    try {
      const feedById = await feedsServices?.getFeedById({
        requestBody: {
          story_id: postId,
        },
      });

      const { news_title, id, url_string, share_image_link, item_category } =
        feedById[0];

      title = `${news_title} ${item_category} Quote Card - Hitzfeed`;
      description = `${news_title} ${item_category} Quotes on Cards: Check the ${news_title} ${item_category} quotes in the form of flashcards at Hitzfeed.`;
      ogUrl = `${siteUrl}/${url_string}-p${id}/`;
      keywords = `${title} ${item_category} quote on card, ${title} ${item_category} quote card, ${title}, ${item_category} quote cards, trending quote cards, latest ${item_category} quote cards, trending ${item_category} quote cards`;
      imageUrl = `https://imagesvs.oneindia.com/webp/trends${share_image_link}`;

      return metaObject({ title, description, ogUrl, keywords, imageUrl });
    } catch (err) {
      console.log(err);
    }
  }

  //checking if its a catgory page
  if (slug[index]?.includes('-c')) {
    try {
      const categoryName = slug[index]?.split('-c')[0];
      const categorySeoData = await feedsServices?.getCategorySeo({
        requestBody: {
          lang: 'en',
          type: 'category',
          item: categoryName,
        },
      });

      const { id, meta_title, meta_description, meta_keywords } =
        categorySeoData;

      title = `${meta_title} Category - Hitzfeed`;
      description = meta_description;
      keywords = meta_keywords;
      ogUrl = `${siteUrl}/${categoryName}-c${id}/`;

      imageUrl = `https://www.hitzfeed.com/trends/media/images/category/250x250/${categoryName}_1.jpg`;

      return metaObject({ title, description, keywords, ogUrl });
    } catch (err) {
      console.log(err);
    }
  }
};

// -c is for category
// -p is for posts

//function to return common SEO data for Feeds, Category , FeedsById
function metaObject({ title, description, keywords, ogUrl, imageUrl }) {
  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: ogUrl,
      images: [imageUrl],
    },
    metadataBase: new URL('https://www.hitzfeed.com/'),
    alternates: {
      canonical: '/',
    },
  };
}

export default async function Page({ params }) {
  const slug = params?.slug || [];

  //setting flag variable to check if language is present
  let isLanguagePresent = false;

  //check if language is present as two charactes in the URL
  if (slug[0]?.length === 2) {
    //if not present in the language list then throw the error
    if (!LANGUAGES?.includes(slug[0])) {
      return notFound();
    }

    isLanguagePresent = true;
  }

  let componentToRender = null;

  //based on the language presence access the index value from slug
  let index = isLanguagePresent ? 1 : 0;

  const metadata = await generateMetadata({ index, slug });
  console.log('meta-data', metadata);

  //check if slug has langauge and trending
  if (slug?.length === 2 && slug[1] === 'trending') {
    return (
      <Suspense fallback={<Loader />}>
        <ErrorBoundary FallbackComponent={Fallback}>
          <Trending />;
        </ErrorBoundary>
      </Suspense>
    );
  }

  // Handle routes based on `lang` and `slug`
  if (slug?.length === index || (slug?.length === index && !slug[0])) {
    componentToRender = <Feeds />;
  }

  //checking if postId is valid based on the reg exp
  const postId = slug[index]?.match(/-p(\d+)/)?.[1];

  if (postId) {
    componentToRender = <PostById params={{ postId }} />;
  }

  //extract and check if the categoryName matches the condition
  if (slug[index]?.includes('-c')) {
    const categoryId = slug[index]?.split('-c')[1];
    componentToRender = <Category params={{ categoryId }} />;
  }

  //if componentToRender is null then return notfound since no if check was matched
  if (!componentToRender) {
    return notFound();
  }

  return (
    <>
      {/* if meta data present only returning Head component to appear in the SEO */}
      <Head>
        <title>{metadata?.title}</title>
        <meta name="description" content={metadata?.description} />
        <meta property="og:title" content={metadata?.openGraph?.title} />
        <meta
          property="og:description"
          content={metadata?.openGraph?.description}
        />
        <meta property="og:image" content={metadata?.openGraph?.images[0]} />
      </Head>

      <ErrorBoundary FallbackComponent={Fallback}>
        {componentToRender}
      </ErrorBoundary>
    </>
  );
}
