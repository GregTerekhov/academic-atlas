import { SectionTemplate } from 'template';
import { SectionTitle } from 'types/sectionTitle';
import { CarouselUI } from 'ui';

export default function Feedback() {
  return (
    <SectionTemplate title={SectionTitle.CustomerReviews}>
      <CarouselUI>
        <p>Відгуки наших клієнтів</p>
      </CarouselUI>
    </SectionTemplate>
  );
}
