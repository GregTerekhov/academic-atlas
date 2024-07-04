import { cookies } from 'next/headers';

import type { Metadata } from 'next';

import { Footer, Header } from 'layout';
import { ProviderWrapper, ScrollController } from 'components';
import { mulish, philosopher } from './fonts';

import './globals.css';

export const metadata: Metadata = {
  title: 'Academic Atlas',
  description:
    "Professional writing services for master's theses, course papers, lab reports, and scientific articles. Get instant cost estimates based on type, specialty, deadline, and uniqueness percentage. High-quality, original work tailored to your academic needs.",
  icons: {
    icon: [
      {
        type: 'image/svg+xml',
        url: 'images/icon.svg',
        // sizes: '48x48', //TOFIX: заготовка для адаптива. хотя похоже, что сво-во media не работает как стили, и адаптив здесь не применить
      },
    ],
  },
};

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
          <main className='relative bg-background-light-gradient dark:bg-background-dark-gradient'>
            {children}
            <ScrollController />
          </main>
          <Footer />
        </ProviderWrapper>
      </body>
    </html>
  );
}
