import { QuestionAnswer, QuestionTitle, WorkTitle } from 'types';

import { AccordionUI } from 'ui';

interface IQuestions {
  id: string;
  title: QuestionTitle;
  answer: QuestionAnswer;
  workTitle: WorkTitle;
}

interface IFAQItemProps {
  workTitle: WorkTitle;
}

export default function FAQItem({ workTitle }: IFAQItemProps) {
  const questions: IQuestions[] = [
    {
      id: 'TeamPaper 1',
      title: QuestionTitle.Team1,
      answer: QuestionAnswer.Team1,
      workTitle: WorkTitle.TeamPapers,
    },
    {
      id: 'TeamPaper 2',
      title: QuestionTitle.Team2,
      answer: QuestionAnswer.Team2,
      workTitle: WorkTitle.TeamPapers,
    },
    {
      id: 'TeamPaper 3',
      title: QuestionTitle.Team3,
      answer: QuestionAnswer.Team3,
      workTitle: WorkTitle.TeamPapers,
    },
    {
      id: 'TeamPaper 4',
      title: QuestionTitle.Team4,
      answer: QuestionAnswer.Team4,
      workTitle: WorkTitle.TeamPapers,
    },
    {
      id: 'TeamPaper 5',
      title: QuestionTitle.Team5,
      answer: QuestionAnswer.Team5,
      workTitle: WorkTitle.TeamPapers,
    },
    {
      id: 'TeamPaper 6',
      title: QuestionTitle.Team6,
      answer: QuestionAnswer.Team6,
      workTitle: WorkTitle.TeamPapers,
    },
  ];

  const filteredQuestions = questions.filter((question) => question.workTitle === workTitle);

  return (
    <>
      {Array.isArray(filteredQuestions) &&
        filteredQuestions.map(({ id, title, answer }) => (
          <AccordionUI
            key={id}
            title={title}
          >
            {answer}
          </AccordionUI>
        ))}
    </>
  );
}
