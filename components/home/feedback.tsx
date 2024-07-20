import { SectionTitle } from 'types';
import { getFeedbackSlides } from 'data';

import { feedbackBreakpoints, getIdValues } from 'helpers';

import { SectionTemplate } from 'template';
import { CarouselUI } from 'ui';

export default function Feedback() {
  const feedbackSlides = getFeedbackSlides();
  const { Feedback } = getIdValues();

  return (
    <SectionTemplate
      title={SectionTitle.CustomerReviews}
      id={Feedback ?? ''}
    >
      <CarouselUI
        slides={feedbackSlides}
        breakpoints={feedbackBreakpoints}
      />
    </SectionTemplate>
  );
}
