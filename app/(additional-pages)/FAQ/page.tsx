import type { Metadata } from 'next';

import { MetadataTexts } from 'data';

import { FAQList, HeroFAQ, OrderingFAQ } from 'components';

const { faq } = MetadataTexts;
const { title, description, openGraph, canonicalUrl } = faq;

export const metadata: Metadata = {
  title,
  description,
  openGraph,
  alternates: {
    canonical: canonicalUrl,
  },
};

export default function Faq() {
  return (
    <>
      <HeroFAQ />
      <FAQList />
      <OrderingFAQ />
    </>
  );
}
