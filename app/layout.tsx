import React from 'react';
import { Philosopher } from 'next/font/google';

import type { Metadata } from 'next';
import './globals.css';

import { Footer, Header } from 'layout';

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
        {children}

        <Footer />
      </body>
    </html>
  );
}
