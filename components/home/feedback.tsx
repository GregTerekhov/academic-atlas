import { getFeedbackSlides, getSectionProps } from 'data';
import { getIdValues } from 'helpers';

import { SectionTemplate } from 'template';
import { CarouselUI } from 'ui';

export default function Feedback() {
  const feedbackSlides = getFeedbackSlides();
  const { Feedback } = getIdValues();
  const sectionProps = getSectionProps(undefined, Feedback);
  const mainFeedbackProps = sectionProps.homeFeedback;

  return (
    <SectionTemplate {...mainFeedbackProps}>
      <CarouselUI slides={feedbackSlides} />
    </SectionTemplate>
  );
}
