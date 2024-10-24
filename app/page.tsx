import type { Metadata } from 'next';

import { MetadataTexts } from 'data';

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

const { home } = MetadataTexts;
const { title, description, openGraph } = home;

export const metadata: Metadata = {
  title,
  description,
  openGraph,
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
