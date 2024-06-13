import { SectionTitle } from 'types';

import { idValues } from 'helpers';

import { SectionTemplate } from 'template';
import { CarouselUI } from 'ui';

export default function Feedback() {
  return (
    <SectionTemplate
      title={SectionTitle.CustomerReviews}
      id={idValues.Feedback ?? ''}
    >
      <CarouselUI>
        <p>Відгуки наших клієнтів</p>
      </CarouselUI>
    </SectionTemplate>
  );
}
