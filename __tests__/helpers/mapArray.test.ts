import { mapArray } from 'helpers';

describe('mapArray helper', () => {
  it('should return a new array with mapped elements when arrayData is a valid array', () => {
    const inputArray = [1, 2, 3];
    const mapFunction = (item: number) => item * 2;

    const result = mapArray(inputArray, mapFunction);

    expect(result).toEqual([2, 4, 6]);
  });

  it('should return null when arrayData is undefined', () => {
    const mapFunction = (item: number) => item * 2;
    const result = mapArray(undefined, mapFunction);

    expect(result).toBeNull();
  });

  it('should return null when arrayData is not array', () => {
    const mapFunction = (item: number) => item * 2;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = mapArray({ key: 'value' } as any, mapFunction);
    expect(result).toBeNull();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result2 = mapArray('string' as any, mapFunction);
    expect(result2).toBeNull();
  });

  it('should handle an empty array', () => {
    const inputArray: number[] = [];
    const mapFunction = (item: number) => item * 2;

    const result = mapArray(inputArray, mapFunction);

    expect(result).toEqual([]);
  });
});
