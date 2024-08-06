import { TelegramScenario, type IQuestions } from 'types';
import { getFAQQuestions } from 'data';

import { Container } from 'layout';
import { MappedListTemplate } from 'template';
import { AccordionUI } from 'ui';
import TextWithLink from '../telegram-text-link';

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
            {id === 'Question 2' || id === 'Question 6' ? (
              <TextWithLink
                order={TelegramScenario.Order}
                textWithLink={answer}
              />
            ) : (
              <>{answer}</>
            )}
          </AccordionUI>
        )}
      </MappedListTemplate>
    </Container>
  );
}
