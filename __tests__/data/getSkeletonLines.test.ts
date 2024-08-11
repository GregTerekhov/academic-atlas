import { getSkeletonLines } from 'data';

describe('getSkeletonLines function', () => {
  it('should return the correct skeleton lines', () => {
    const lines = getSkeletonLines();

    expect(lines).toHaveLength(5);

    expect(lines[0]).toEqual({
      id: 'line1',
      className: 'mb-5 h-8 md:mb-7 md:h-12 md:w-[396px] lg:mb-9 lg:h-[60px] lg:w-[546px]',
    });
  });
});
