import { cookies } from 'next/headers';

import { Footer, Header } from 'layout';
import { ProviderWrapper, ScrollController } from 'components';
import { mulish, philosopher } from './fonts';

import './globals.css';

const THEME_STORAGE_KEY = 'theme-preference';

interface IRootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<IRootLayoutProps>) {
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
