import { calculatePrice } from 'helpers/calculatePrice';
import {
  findSelectedObject,
  getBasePrice,
  expertiseMultiplier,
  executionTimeMultiplier,
  uniquenessMultiplier,
} from 'helpers/calculationHelper';
import { WorkType, ExpertiseArea, ExecutionTime } from 'types';

jest.mock('helpers/calculationHelper', () => ({
  getBasePrice: jest.fn(),
  expertiseMultiplier: jest.fn(),
  executionTimeMultiplier: jest.fn(),
  uniquenessMultiplier: jest.fn(),
  findSelectedObject: jest.fn(),
}));

describe('calculatePrice', () => {
  const mockFindSelectedObject = findSelectedObject as jest.Mock;
  const mockGetBasePrice = getBasePrice as jest.Mock;
  const mockExpertiseMultiplier = expertiseMultiplier as jest.Mock;
  const mockExecutionTimeMultiplier = executionTimeMultiplier as jest.Mock;
  const mockUniquenessMultiplier = uniquenessMultiplier as jest.Mock;

  it('calculates the correct price based on multipliers and base price', () => {
    mockFindSelectedObject.mockReturnValue({
      option: WorkType.Diplomas,
      basePrice: 1000,
    });
    mockGetBasePrice.mockReturnValue(1000);
    mockExpertiseMultiplier.mockReturnValue(1.2);
    mockExecutionTimeMultiplier.mockReturnValue(1.5);
    mockUniquenessMultiplier.mockReturnValue(1.2);

    expect(
      calculatePrice(
        WorkType.Diplomas,
        ExpertiseArea.ElectricalEngineering,
        ExecutionTime.Urgent,
        90,
      ),
    ).toBe(1000 * 1.2 * 1.5 * 1.2);
  });

  it('throws an error for an invalid work type', () => {
    mockFindSelectedObject.mockReturnValue(undefined);

    expect(() =>
      calculatePrice(
        WorkType.Diplomas,
        ExpertiseArea.ElectricalEngineering,
        ExecutionTime.MediumTerm,
      ),
    ).toThrow('Invalid work type selected');
  });
});
