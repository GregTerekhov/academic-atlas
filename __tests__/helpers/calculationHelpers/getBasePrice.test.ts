import { BasePrice, WorkType } from 'types';
import { getBasePrice } from 'helpers';

describe('getBasePrice', () => {
  it('getBasePrice should return correct price for a valid work type', () => {
    const basePrice = getBasePrice(WorkType.BachelorTheses);
    expect(basePrice).toBe(BasePrice.BachelorAndMasterTheses);
  });

  it('getBasePrice should throw an error for an invalid work type', () => {
    expect(() => getBasePrice(WorkType.Default)).toThrow('Invalid work type selected');
  });
});
