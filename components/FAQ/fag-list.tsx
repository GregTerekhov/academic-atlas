import { IQuestions } from 'types';
import { getFAQQuestions } from 'helpers';

import { Container } from 'layout';
import { MappedListTemplate } from 'template';
import { AccordionUI } from 'ui';

export default function FAQList() {
  const questions = getFAQQuestions();

  return (
    <Container>
      <MappedListTemplate<IQuestions>
        items={questions}
        className='space-y-4 pb-8 md:space-y-6 md:pb-16 lg:space-y-8 lg:pb-[104px]'
      >
        {({ id, title, answer }) => (
          <AccordionUI
            key={id}
            title={title}
            id={id}
          >
            {answer}
          </AccordionUI>
        )}
      </MappedListTemplate>
    </Container>
  );
}
