import { getFAQQuestions } from 'helpers';

import { Container } from 'layout';
import { AccordionUI } from 'ui';

export default function FAQList() {
  const questions = getFAQQuestions();

  return (
    <Container>
      <ul className='space-y-4 pb-8 md:space-y-6 md:pb-16 lg:space-y-8 lg:pb-[104px]'>
        {Array.isArray(questions) &&
          questions.map(({ id, title, answer }) => (
            <AccordionUI
              key={id}
              title={title}
            >
              {answer}
            </AccordionUI>
          ))}
      </ul>
    </Container>
  );
}
