import type { Metadata } from 'next';

import { MetadataTexts } from 'data';

import { FAQList, HeroFAQ, OrderingFAQ } from 'components';

const { faq } = MetadataTexts;
const { title, description, openGraph } = faq;

export const metadata: Metadata = {
  title,
  description,
  openGraph,
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
