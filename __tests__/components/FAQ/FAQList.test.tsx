/* eslint-disable jest/no-conditional-expect */
import { fireEvent, render, screen } from '@testing-library/react';

import { QuestionTitle } from 'types';
import { getFAQQuestions } from 'data';
import { FAQList } from 'components';

jest.mock('data', () => ({
  getFAQQuestions: jest.fn(() => [
    { id: 'Question 1', title: QuestionTitle.Issue1, answer: 'Answer for Question 1' },
    {
      id: 'Question 2',
      title: QuestionTitle.Issue2,
      answer: 'This is the answer with Telegram-бот for Question 2',
    },
    { id: 'Question 3', title: QuestionTitle.Issue3, answer: 'Answer for Question 3' },
    { id: 'Question 4', title: QuestionTitle.Issue4, answer: 'Answer for Question 4' },
    { id: 'Question 5', title: QuestionTitle.Issue5, answer: 'Answer for Question 5' },
    {
      id: 'Question 6',
      title: QuestionTitle.Issue6,
      answer: 'This is the answer with Telegram-бот for Question 6',
    },
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

jest.mock('components/telegram-text-link', () => jest.fn(() => <span>Telegram-бот</span>));

describe('FAQList Component', () => {
  it('renders the FAQList with correct titles', () => {
    render(<FAQList />);

    const questions = getFAQQuestions();

    questions.forEach((question) => {
      const titleElement = screen.getByText(question.title);
      expect(titleElement).toBeInTheDocument();
    });
  });

  it('renders correct answers and check TextWithLink component rendering', () => {
    render(<FAQList />);

    const checkAnswerAndTelegramLink = (title: string, shouldHaveTelegramLink: boolean) => {
      fireEvent.click(screen.getByText(title));

      const paragraphs = screen.queryAllByText(
        (_, element) => element?.tagName.toLowerCase() === 'p',
      );

      const paragraphElement = paragraphs.find((p) =>
        p.textContent?.includes(
          title.includes(QuestionTitle.Issue2) || title.includes(QuestionTitle.Issue6)
            ? 'Telegram-бот'
            : p.textContent,
        ),
      );

      expect(paragraphElement).toBeInTheDocument();

      const spanElement = paragraphElement?.querySelector('span');
      if (shouldHaveTelegramLink) {
        expect(spanElement).toBeInTheDocument();
        expect(spanElement?.textContent).toBe('Telegram-бот');
      } else {
        expect(spanElement).toBeNull();
      }
    };

    checkAnswerAndTelegramLink(QuestionTitle.Issue1, false);
    checkAnswerAndTelegramLink(QuestionTitle.Issue2, true);
    checkAnswerAndTelegramLink(QuestionTitle.Issue3, false);
    checkAnswerAndTelegramLink(QuestionTitle.Issue6, true);
  });
});
