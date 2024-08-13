import { cookies } from 'next/headers';

import { type Viewport } from 'next';
import { type IWithChildren } from 'types';

import { Footer, Header } from 'layout';
import { ProviderWrapper, ScrollController } from 'components';

import { mulish, philosopher } from './fonts';
import './globals.css';

const THEME_STORAGE_KEY = 'theme-preference';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<IWithChildren>) {
  const theme = cookies().get(THEME_STORAGE_KEY)?.value;

  return (
    <html
      lang='uk'
      className={`${theme} ${mulish.className} ${philosopher.variable}`}
      style={{ colorScheme: theme }}
    >
      <body>
        <ProviderWrapper
          theme={theme}
          storageKey={THEME_STORAGE_KEY}
        >
          <Header />
          <main className='relative'>
            {children}
            <ScrollController />
          </main>
          <Footer />
        </ProviderWrapper>
      </body>
    </html>
  );
}
