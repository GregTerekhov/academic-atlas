import { roundPriceToInterval } from 'helpers';

describe('roundPriceToInterval', () => {
  it.each([
    [1234, 1250],
    [1276, 1300],
    [1205, 1200],
    [1200, 1200],
  ])('rounds %d to %d', (inputPrice, expectedPrice) => {
    expect(roundPriceToInterval(inputPrice)).toBe(expectedPrice);
  });
});
