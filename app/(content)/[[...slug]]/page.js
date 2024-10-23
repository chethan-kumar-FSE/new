import Feeds from '../(subcontent)/feeds/page';
import IndiFeeds from '../(subcontent)/feeds/[postId]/page';
import Category from '../category/page';
import { redirect } from 'next/navigation';
import Head from 'next/head';
import { feedsServices } from '@/services/feedsService';

// Function to generate metadata based on the slug
export const generateMetadata = async ({ params }) => {
  const slug = params?.slug || [];

  let title;
  let description;
  let imageUrl; // Default image
  let category = 'Meme';
  const siteUrl = process.env.NEXT_PUBLIC_API_URL;
  let keywords;
  let ogUrl;

  const response = await feedsServices.getFeedsSeo({
    requestBody: {
      lang: 'en',
      type: 'home',
      item: 'home',
    },
  });

  const { meta_title, meta_description, meta_keywords } = response.data;

  (title = meta_title), (description = meta_description);
  keywords = meta_keywords;
  imageUrl =
    'https://www.hitzfeed.com/trends/media/images/hitzfeed-og-image.jpg';
  ogUrl = siteUrl;

  // Logic to customize metadata based on the slug
  if (slug.length === 1 && slug[0].includes('-p')) {
    const postId = slug[0].match(/-p(\d+)/)?.[1];
    const response = await feedsServices.getFeedById({
      requestBody: {
        story_id: postId,
      },
    });
    const { news_title, id, url_string, share_image_link } = response.data[0];
    category = 'Meme';

    title = `${news_title} ${category} Quote Card - Hitzfeed`;
    (description = `${news_title} ${category} Quotes on Cards: Check the ${news_title} ${category} quotes in the form of flashcards at Hitzfeed.`),
      (ogUrl = `${siteUrl}/${url_string}-p${id}/`);
    (keywords = `${title} ${category} quote on card, ${title} ${category} quote card, ${title}, ${category} quote cards, trending quote cards, latest ${category} quote cards, trending ${category} quote cards`),
      (imageUrl = `https://imagesvs.oneindia.com/webp/trends${share_image_link}`);
  } else if (slug.length === 1 && slug[0].includes('-c')) {
    const categoryName = slug[0].split('-c')[0];

    const response = await feedsServices.getCategorySeo({
      requestBody: {
        lang: 'en',
        type: 'category',
        item: categoryName,
      },
    });
    const { meta_title, meta_description, meta_keywords } = response.data;
    title = `${meta_title} Category - Hitzfeed`;
    description = meta_description;
    keywords = meta_keywords;
    imageUrl = `https://www.hitzfeed.com/trends/media/images/category/250x250/${categoryName}_1.jpg`;
    // Example for category-specific image
  }

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
};

export default async function Page({ params }) {
  const slug = params?.slug || [];
  let lang = false;

  // Generate dynamic metadata based on slug
  const metadata = await generateMetadata({ params });

  // Check if the first slug segment is a language prefix (2 characters long)
  if (slug[0]?.length === 2) {
    lang = true;
    // Call the API to set the language cookie
    //return <Feeds lang={slug[0]} />;
  }

  // Handle routes based on `lang` and `slug`
  if (!lang) {
    if (slug.length === 0 || (slug.length === 1 && !slug[0])) {
      return (
        <>
          <Head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <meta property="og:title" content={metadata.openGraph.title} />
            <meta
              property="og:description"
              content={metadata.openGraph.description}
            />
            <meta
              property="og:image"
              content={metadata.openGraph.images[0].url}
            />
          </Head>
          <Feeds lang={undefined} />
        </>
      );
    }

    if (slug.length === 1 && slug[0].includes('-p')) {
      const postId = slug[0].match(/-p(\d+)/)?.[1];
      return (
        <>
          <Head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <meta property="og:title" content={metadata.openGraph.title} />
            <meta
              property="og:description"
              content={metadata.openGraph.description}
            />
            <meta
              property="og:image"
              content={metadata.openGraph.images[0].url}
            />
          </Head>
          <IndiFeeds params={{ postId }} />
        </>
      );
    }

    if (slug.length === 1 && slug[0].includes('-c')) {
      const categoryId = slug[0].split('-c')[1];
      return (
        <>
          <Head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <meta property="og:title" content={metadata.openGraph.title} />
            <meta
              property="og:description"
              content={metadata.openGraph.description}
            />
            <meta
              property="og:image"
              content={metadata.openGraph.images[0].url}
            />
          </Head>
          <Category params={{ id: categoryId }} />
        </>
      );
    }
  }

  if (lang) {
    if (slug.length === 1 || (slug.length === 1 && !slug[0])) {
      return (
        <>
          <Head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <meta property="og:title" content={metadata.openGraph.title} />
            <meta
              property="og:description"
              content={metadata.openGraph.description}
            />
            <meta
              property="og:image"
              content={metadata.openGraph.images[0].url}
            />
          </Head>
          <Feeds lang={slug[0]} />
        </>
      );
    }
    if (slug.length === 2 && slug[1].includes('-p')) {
      const postId = slug[1].match(/-p(\d+)/)?.[1];
      return (
        <>
          <Head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <meta property="og:title" content={metadata.openGraph.title} />
            <meta
              property="og:description"
              content={metadata.openGraph.description}
            />
            <meta
              property="og:image"
              content={metadata.openGraph.images[0].url}
            />
          </Head>
          <IndiFeeds params={{ postId }} lang={slug[0]} />
        </>
      );
    }

    if (slug.length === 2 && slug[1].includes('-c')) {
      const categoryId = slug[1].split('-c')[1];
      return (
        <>
          <Head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <meta property="og:title" content={metadata.openGraph.title} />
            <meta
              property="og:description"
              content={metadata.openGraph.description}
            />
            <meta
              property="og:image"
              content={metadata.openGraph.images[0].url}
            />
          </Head>
          <Category params={{ id: categoryId }} lang={slug[0]} />
        </>
      );
    }
  }

  return redirect('/');
}
