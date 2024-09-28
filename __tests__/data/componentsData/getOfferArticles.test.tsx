import { ILegalInfoArticle } from 'types';
import { getOfferArticles } from 'data';

describe('getOfferArticles', () => {
  it('should return an array of legal info articles', () => {
    const articles: ILegalInfoArticle[] = getOfferArticles();

    expect(Array.isArray(articles)).toBe(true);

    expect(articles).toHaveLength(13);

    expect(articles[0]).toMatchObject({
      id: expect.any(Number),
      article: expect.any(String),
      paragraph: expect.any(Object),
    });

    expect(articles[0].paragraph.one).toEqual(expect.any(String));
    expect(articles[0].paragraph.seven).toEqual({
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
