import type { Metadata } from 'next';
import { FAQList, HeroFAQ, OrderingFAQ } from 'components';
import { MetadataTexts } from 'types';

export const metadata: Metadata = {
  title: MetadataTexts.faq.title,
  description: MetadataTexts.faq.description,
  keywords: MetadataTexts.faq.keywords,
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
