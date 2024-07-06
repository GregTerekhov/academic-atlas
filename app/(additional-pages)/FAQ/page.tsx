import type { Metadata } from 'next';
import { FAQList, HeroFAQ, OrderingFAQ } from 'components';
import { MetadataTexts } from 'types';

export const metadata: Metadata = {
  title: MetadataTexts.faq.title,
  description: MetadataTexts.faq.description,
  keywords: MetadataTexts.faq.keywords,
  // openGraph: MetadataTexts.faq.openGraph,    //FIXME: --- uncomment
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
