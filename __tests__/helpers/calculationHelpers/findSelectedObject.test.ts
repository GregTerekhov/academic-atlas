import { BasePrice, WorkType } from 'types';
import { findSelectedObject } from 'helpers';
import { getWorkType } from 'data';

jest.mock('data', () => ({
  getWorkType: jest.fn(),
}));

describe('findSelectedObject', () => {
  const mockGetWorkType = getWorkType as jest.Mock;

  it('returns the correct object for a valid work type', () => {
    const mockData = [{ option: WorkType.Diplomas, basePrice: BasePrice.Diplomas }];
    mockGetWorkType.mockReturnValue(mockData);

    expect(findSelectedObject(WorkType.Diplomas)).toEqual(mockData[0]);
  });

  it('returns undefined for an invalid work type', () => {
    mockGetWorkType.mockReturnValue([]);

    expect(findSelectedObject(WorkType.Diplomas)).toBeUndefined();
  });
});
