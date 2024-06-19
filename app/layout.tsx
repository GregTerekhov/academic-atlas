import { Philosopher } from 'next/font/google';
import { cookies } from 'next/headers';

import type { Metadata } from 'next';

import { Footer, Header } from 'layout';
import { ProviderWrapper, ScrollController } from 'components';

import './globals.css';

const philosopher = Philosopher({
  subsets: ['latin'],
  weight: ['400', '700'],
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: 'Academic Atlas',
  description:
    "Professional writing services for master's theses, course papers, lab reports, and scientific articles. Get instant cost estimates based on type, specialty, deadline, and uniqueness percentage. High-quality, original work tailored to your academic needs.",
};

const THEME_STORAGE_KEY = 'theme-preference';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = cookies().get(THEME_STORAGE_KEY)?.value;

  return (
    <html
      lang='uk'
      className={theme}
      style={{ colorScheme: theme }}
    >
      <body className={philosopher.className}>
        <ProviderWrapper
          theme={theme}
          storageKey={THEME_STORAGE_KEY}
        >
          <Header />
          <main className='relative bg-whiteBase dark:bg-background-gradient'>
            {children}
            <ScrollController />
          </main>
          <Footer />
        </ProviderWrapper>
      </body>
    </html>
  );
}
