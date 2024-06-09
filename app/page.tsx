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

export default function Home({ searchParams }: any) {
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
