import { fireEvent, render, screen } from '@testing-library/react';
import { getFAQQuestions } from 'data';
import { AccordionUI } from 'ui';

describe('AccordionUI Component', () => {
  const questions = getFAQQuestions();

  it('should render correctly with given title and content', () => {
    const question = questions[0];

    render(
      <AccordionUI
        id={question.id}
        title={question.title}
      >
        {question.answer}
      </AccordionUI>,
    );

    expect(screen.getByText(question.title)).toBeInTheDocument();

    const contentElement = screen.getByText(question.answer);
    expect(contentElement.parentElement).toHaveStyle('max-height: 0px');
  });

  it('should answer visibility when clicked', () => {
    const question = questions[0];

    render(
      <AccordionUI
        id={question.id}
        title={question.title}
      >
        {question.answer}
      </AccordionUI>,
    );

    const titleElement = screen.getByText(question.title);
    const contentElement = screen.getByText(question.answer);

    expect(titleElement.parentElement).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(titleElement);
    expect(titleElement.parentElement).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(titleElement);
    expect(titleElement.parentElement).toHaveAttribute('aria-expanded', 'false');

    expect(contentElement.parentElement).toHaveStyle('max-height: 0px');
  });
});
