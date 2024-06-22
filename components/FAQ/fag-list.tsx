import Container from 'layout/container';
import { QuestionAnswer, QuestionTitle } from 'types';

import { AccordionUI } from 'ui';

interface IQuestions {
  id: string;
  title: QuestionTitle;
  answer: QuestionAnswer;
}

export default function FAQList() {
  const questions: IQuestions[] = [
    {
      id: 'TeamPaper 1',
      title: QuestionTitle.Team1,
      answer: QuestionAnswer.Team1,
    },
    {
      id: 'TeamPaper 2',
      title: QuestionTitle.Team2,
      answer: QuestionAnswer.Team2,
    },
    {
      id: 'TeamPaper 3',
      title: QuestionTitle.Team3,
      answer: QuestionAnswer.Team3,
    },
    {
      id: 'TeamPaper 4',
      title: QuestionTitle.Team4,
      answer: QuestionAnswer.Team4,
    },
    {
      id: 'TeamPaper 5',
      title: QuestionTitle.Team5,
      answer: QuestionAnswer.Team5,
    },
    {
      id: 'TeamPaper 6',
      title: QuestionTitle.Team6,
      answer: QuestionAnswer.Team6,
    },
    {
      id: 'TeamPaper 7',
      title: QuestionTitle.Team7,
      answer: QuestionAnswer.Team7,
    },
    {
      id: 'TeamPaper 8',
      title: QuestionTitle.Team8,
      answer: QuestionAnswer.Team8,
    },
    {
      id: 'TeamPaper 9',
      title: QuestionTitle.Team9,
      answer: QuestionAnswer.Team9,
    },
    {
      id: 'TeamPaper 10',
      title: QuestionTitle.Team10,
      answer: QuestionAnswer.Team10,
    },
  ];

  return (
    <Container>
      <ul className='space-y-4 md:space-y-6 lg:space-y-8'>
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
