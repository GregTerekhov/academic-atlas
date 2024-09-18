import { getIdValues } from 'helpers';
import { Paths, SectionTitle } from 'types';

describe('getIdValues', () => {
  it('should return correct id values based on Paths and SectionTitle', () => {
    const result = getIdValues();

    const expected = {
      Main: SectionTitle.Hero,
      Services: 'services',
      Cost: 'cost',
      Overview: 'overview',
      AboutUs: SectionTitle.AboutUs,
      Promotions: SectionTitle.Promotions,
      Feedback: 'feedback',
      FAQ: Paths.FAQ,
      Offer: Paths.Offer,
      Policy: Paths.Policy,
      Partnership: Paths.Partnership,
    };

    expect(result).toEqual(expected);
  });
});
