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
