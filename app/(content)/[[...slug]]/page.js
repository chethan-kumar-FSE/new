import Feeds from '../(subcontent)/feeds/page';
import IndiFeeds from '../(subcontent)/feeds/[postId]/page';
import Category from '../category/page';
import { redirect } from 'next/navigation';
import Head from 'next/head';

// Function to generate metadata based on the slug
export const generateMetadata = ({ params }) => {
  const slug = params?.slug || [];

  let title = 'Default Title';
  let description = 'Default Description';
  let imageUrl = 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'; // Default image

  // Logic to customize metadata based on the slug
  if (slug.length === 1 && slug[0].includes('-p')) {
    const postId = slug[0].match(/-p(\d+)/)?.[1];
    title = `Post Page - ${postId}`;
    description = `This is the post page for post ID ${postId}.`;
    imageUrl = `https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d`; // Example for post-specific image
  } else if (slug.length === 1 && slug[0].includes('-c')) {
    const categoryId = slug[0].split('-c')[1];
    title = `Category Page - ${categoryId}`;
    description = `Explore articles in the category ${categoryId}.`;
    imageUrl = `https://example.com/images/categories/${categoryId}.jpg`; // Example for category-specific image
  }

  // Return the constructed metadata
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'Dynamic Image for Preview',
          type: 'image/jpeg',
        },
      ],
    },
  };
};

export default async function Page({ params }) {
  const slug = params?.slug || [];
  let lang = false;

  // Generate dynamic metadata based on slug
  const metadata = generateMetadata({ params });

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
