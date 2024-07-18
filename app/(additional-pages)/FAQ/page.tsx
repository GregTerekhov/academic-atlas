import type { Metadata } from 'next';

import { MetadataTexts } from 'helpers';
import { FAQList, HeroFAQ, OrderingFAQ } from 'components';

const { faq } = MetadataTexts;
const { title, description, keywords } = faq;

export const metadata: Metadata = {
  title,
  description,
  keywords,
  // openGraph,    //FIXME: --- uncomment
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
