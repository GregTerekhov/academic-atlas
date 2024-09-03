import { render, screen } from '@testing-library/react';
import RangePercents from 'components/calculation/subcomponents/range-percents';
import { getDisabledRangeStyles } from 'styles';
import { RangeValue } from 'types';

jest.mock('styles', () => ({
  getDisabledRangeStyles: jest.fn(),
}));

describe('RangePercents', () => {
  const mockGetDisabledRangeStyles = getDisabledRangeStyles as jest.Mock;

  const setup = (value: number, isChecked: boolean) => {
    mockGetDisabledRangeStyles.mockReturnValue(
      isChecked ? 'text-darkBase dark:text-whiteBase' : 'text-disabled-foreground',
    );

    return render(
      <RangePercents
        value={value}
        isChecked={isChecked}
      />,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    [RangeValue.MIN, [RangeValue.MIN, RangeValue.MAX], []],
    [50, [RangeValue.MIN, 50, RangeValue.MAX], []],
    [RangeValue.PENULTIMATE, [RangeValue.MIN, RangeValue.PENULTIMATE], [RangeValue.MAX]],
  ])('renders correct values when value is %p', (value, expectedTexts, hiddenTexts) => {
    setup(value, true);

    expectedTexts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();

      hiddenTexts.forEach((text) => {
        expect(screen.queryByText(text)).toBeNull();
      });
    });
  });
});
