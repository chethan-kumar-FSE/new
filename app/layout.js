import './globals.css';
import { Providers } from '@/components/providers';
import { BackdropProvider } from '@/context/backdrop';
import { Toaster } from 'react-hot-toast';
import ServiceRegister from '@/components/ServiceRegister';

export const metadata = {
  title:
    'Latest Cards, Images, Flashcards, Short Videos, Polls On Trending News and Events - HitzFeed',
  description:
    'Get all the breaking stories in the form of flashcards, short videos, polls on viral news, sports, entertainment, health, spiritual events along with latest quotes and memes at HitzFeed.',
  keywords:
    'breaking news flashcards, cards on latest news, trending videos today, short videos, latest news on flash cards, latest polls today, trending memes on social media, latest quotes and memes, spiritual tips, health tips videos, sports news cards, cricket news videos, polls, viral news cards,',
  openGraph: {
    title:
      'Latest Cards, Images, Flashcards, Short Videos, Polls On Trending News and Events - HitzFeed',
    description:
      'Get all the breaking stories in the form of flashcards, short videos, polls on viral news, sports, entertainment, health, spiritual events along with latest quotes and memes at HitzFeed.',
    url: process.env.NEXT_PUBLIC_API_URL,
    images: [
      'https://www.hitzfeed.com/trends/media/images/hitzfeed-og-image.jpg',
    ],
  },
  alternates: {
    canonical: 'https:/www.htizfeed.com/',
  },
};
export const viewport = {
  themeColor: '#000', // Correct place for themeColor
};
export default function RootLayout({ children }) {
  return (
    <BackdropProvider>
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
        </head>
        <body>
          <Providers>
            <ServiceRegister />
            {children}

            <Toaster position="bottom-center" reverseOrder={false} />
          </Providers>
        </body>
      </html>
    </BackdropProvider>
  );
}
