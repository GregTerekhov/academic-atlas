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

interface ISearchParamProps {
  searchParams: Record<string, string> | null;
}

export default function Home({ searchParams }: ISearchParamProps) {
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
