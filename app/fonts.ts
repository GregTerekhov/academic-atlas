import { Mulish, Philosopher } from 'next/font/google';

export const philosopher = Philosopher({
  subsets: ['cyrillic'],
  weight: ['400', '700'],
  fallback: ['system-ui', 'arial'],
  variable: '--font-philosopher',
});

export const mulish = Mulish({
  subsets: ['cyrillic'],
  weight: ['400', '700'],
  fallback: ['system-ui', 'arial'],
  variable: '--font-mulish',
});
