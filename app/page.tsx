import { Container } from 'layout';
import {
  AboutUs,
  Benefits,
  Cost,
  Feedback,
  Hero,
  Performers,
  Promotions,
  ScrollController,
  ServiceOverview,
  Services,
} from 'components';

export default function Home() {
  return (
    <main>
      <Container>
        <Hero />
        <Services />
        <Cost />
        <ServiceOverview />
        <Performers />
        <AboutUs />
        <Benefits />
        <Promotions />
        <Feedback />
        <ScrollController />
      </Container>
    </main>
  );
}
