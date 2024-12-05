import './globals.css';
import { Providers } from '@/components/providers';
import { BackdropProvider } from '@/context/backdrop';
import { Toaster } from 'react-hot-toast';
import ServiceRegister from '@/components/ServiceRegister';

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
