'use client';
import { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import i18nextConfig from '../next-i18next.config';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });
 
// export const metadata: Metadata = {
//   title: 'Chatbot UI',
//   description: 'Welcome to Chatbot',
// };

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const currentLocale = i18nextConfig.i18n.defaultLocale;
  const queryClient = new QueryClient();
  return (
    <html lang={currentLocale}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Chatbot UI"></meta>
      </head>
      <body>
        <div className={inter.className}>
          <Toaster />
            {/* <QueryClientProvider client={queryClient}> */}
              {children}
            {/* </QueryClientProvider> */}
        </div>
      </body>
    </html>
  );
}
