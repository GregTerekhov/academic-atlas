import { ILegalInfoArticle } from 'types';
import { getPolicyArticles } from 'data';

describe('getPolicyArticles', () => {
  it('should return an array of legal info articles', () => {
    const articles: ILegalInfoArticle[] = getPolicyArticles();

    expect(Array.isArray(articles)).toBe(true);

    expect(articles).toHaveLength(4);

    expect(articles[0]).toMatchObject({
      id: expect.any(Number),
      article: expect.any(String),
      paragraph: expect.any(Object),
    });

    expect(articles[0].paragraph.one).toEqual({
      title: expect.any(String),
      subItems: expect.arrayContaining([
        {
          id: expect.any(String),
          textField: expect.any(String),
        },
      ]),
    });
  });
});
