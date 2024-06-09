import { Container } from 'layout';
import {
  AboutUs,
  Cost,
  Feedback,
  Hero,
  Performers,
  Promotions,
  ScrollController,
  ServiceOverview,
  Services,
} from 'components';

interface ISearchParamProps {
  searchParams: Record<string, string> | null;
}

export default function Home({ searchParams }: ISearchParamProps) {
  return (
    <main>
      <Container>
        <Hero />
        <Services />
        <Cost params={searchParams} />
        <ServiceOverview />
        <Performers />
        <AboutUs />
        <Promotions />
        <Feedback />
        <ScrollController />
      </Container>
    </main>
  );
}
