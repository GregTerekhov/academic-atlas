import React from 'react';

import { Container } from 'layout';
import {
  AboutService,
  Benefits,
  Cost,
  Feedback,
  Hero,
  Performers,
  Promotions,
  ScrollController,
  Services,
} from 'components';

export default function Home() {
  return (
    <main>
      <Container>
        <Hero />
        <Services />
        <Cost />
        <AboutService />
        <Performers />
        <Benefits />
        <Promotions />
        <Feedback />
        <ScrollController />
      </Container>
    </main>
  );
}
