import { SectionTitle } from 'types';

import { feedbackBreakpoints, getFeedbackSlides, idValues } from 'helpers';

import { SectionTemplate } from 'template';
import { CarouselUI } from 'ui';

export default function Feedback() {
  const feedbackSlides = getFeedbackSlides();

  return (
    <SectionTemplate
      title={SectionTitle.CustomerReviews}
      id={idValues.Feedback ?? ''}
    >
      <CarouselUI
        slides={feedbackSlides}
        breakpoints={feedbackBreakpoints}
      />
    </SectionTemplate>
  );
}
