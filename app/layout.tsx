import { Philosopher } from 'next/font/google';

import type { Metadata } from 'next';

import { Footer, Header } from 'layout';

import './globals.css';
import { ScrollController } from 'components/index';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='uk'>
      <body className={philosopher.className}>
        <Header />
        <main className='relative space-y-8 pb-8 md:space-y-16 md:pb-16 lg:space-y-[104px] lg:pb-[104px]'>
          {children}
          <ScrollController />
        </main>
        <Footer />
      </body>
    </html>
  );
}
