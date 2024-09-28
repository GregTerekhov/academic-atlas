import { mapArray } from 'helpers';

describe('mapArray helper', () => {
  const mapFunction = (item: number) => item * 2;

  it('should return a new array with mapped elements when arrayData is a valid array', () => {
    const inputArray = [1, 2, 3];
    const result = mapArray(inputArray, mapFunction);
    expect(result).toEqual([2, 4, 6]);
  });

  it.each([
    [null, undefined],
    [null, { key: 'value' }],
    [null, 'string'],
    [null, 16],
  ])('should return %p when arrayData is %p', (expected, input) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = mapArray(input as any, mapFunction);
    expect(result).toBe(expected);
  });

  it('should handle an empty array', () => {
    const inputArray: number[] = [];

    const result = mapArray(inputArray, mapFunction);

    expect(result).toEqual([]);
  });
});
