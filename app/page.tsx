import type { Metadata } from 'next';

import {
  AboutUs,
  Cost,
  Feedback,
  Hero,
  Performers,
  Promotions,
  ServiceOverview,
  Services,
} from 'components';
import { MetadataTexts } from 'types';

export const metadata: Metadata = {
  title: MetadataTexts.home.title,
  description: MetadataTexts.home.description,
  keywords: MetadataTexts.home.keywords,
  // openGraph: MetadataTexts.home.openGraph,    //FIXME: --- uncomment
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Cost />
      <ServiceOverview />
      <Performers />
      <AboutUs />
      <Promotions />
      <Feedback />
    </>
  );
}
