import { fireEvent, render, screen } from '@testing-library/react';
import { QuestionAnswer, QuestionTitle } from 'types';
import { getFAQQuestions } from 'data';
import { FAQList } from 'components';

jest.mock('data', () => ({
  getFAQQuestions: jest.fn(() => [
    { id: '1', title: QuestionTitle.Issue1, answer: QuestionAnswer.Answer1 },
    { id: '2', title: QuestionTitle.Issue2, answer: QuestionAnswer.Answer2 },
    { id: '3', title: QuestionTitle.Issue3, answer: QuestionAnswer.Answer3 },
    { id: '4', title: QuestionTitle.Issue4, answer: QuestionAnswer.Answer4 },
    { id: '5', title: QuestionTitle.Issue5, answer: QuestionAnswer.Answer5 },
    { id: '6', title: QuestionTitle.Issue6, answer: QuestionAnswer.Answer6 },
    { id: '7', title: QuestionTitle.Issue7, answer: QuestionAnswer.Answer7 },
    { id: '8', title: QuestionTitle.Issue8, answer: QuestionAnswer.Answer8 },
    { id: '9', title: QuestionTitle.Issue9, answer: QuestionAnswer.Answer9 },
    { id: '10', title: QuestionTitle.Issue10, answer: QuestionAnswer.Answer10 },
  ]),
}));

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(({ children }) => (
    <ul>{getFAQQuestions().map((item) => children(item))}</ul>
  )),
}));

jest.mock('ui', () => ({
  AccordionUI: jest.fn(({ id, title, children }) => (
    <li key={id}>
      <h2>{title}</h2>
      <p>{children}</p>
    </li>
  )),
}));

describe('FAQList Component', () => {
  it('should render a list of accordion items with correct titles and answers', () => {
    render(<FAQList />);

    const questions = getFAQQuestions();

    questions.forEach((question) => {
      const questionTitle = screen.getByText(question.title);
      expect(questionTitle).toBeInTheDocument();

      fireEvent.click(questionTitle);

      const answerParagraph = screen.getByText(question.answer);
      expect(answerParagraph).toBeInTheDocument();
    });
  });
});
