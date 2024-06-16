import { Philosopher } from 'next/font/google';
import { cookies } from 'next/headers';

import type { Metadata } from 'next';

import { DropdownProvider, MenuProvider, PopupProvider, ThemeProvider } from 'context';
import { Footer, Header } from 'layout';
import { ScrollController } from 'components';

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
        <ThemeProvider
          storageKey={THEME_STORAGE_KEY}
          startTheme={theme}
        >
          <MenuProvider>
            <PopupProvider>
              <DropdownProvider>
                <Header />
                <main className='relative space-y-8 bg-whiteBase pb-8 dark:bg-background-gradient md:space-y-16 md:pb-16 lg:space-y-[104px] lg:pb-[104px]'>
                  {children}
                  <ScrollController />
                </main>
                <Footer />
              </DropdownProvider>
            </PopupProvider>
          </MenuProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
