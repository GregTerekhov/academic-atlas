import { QuestionTitle, QuestionAnswer } from 'types';
import { getFAQQuestions } from 'data';

describe('getFAQQuestions', () => {
  it('should return an array of FAQ questions with the correct structure', () => {
    const questions = getFAQQuestions();

    expect(questions).toBeDefined();
    expect(Array.isArray(questions)).toBe(true);
    expect(questions).toHaveLength(10);

    questions.forEach((question) => {
      expect(question).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          answer: expect.any(String),
        }),
      );

      expect(Object.values(QuestionTitle)).toContain(question.title);
      expect(Object.values(QuestionAnswer)).toContain(question.answer);
    });
  });
});
