import { render, screen } from '@testing-library/react';

import { StatisticCount, StatisticLabel } from 'types';
import { getDesktopStatistics } from 'data';

import { StatisticList } from 'components/home/subcomponents';
import StatisticItem from 'components/home/subcomponents/statistic-item';

import { getFiguresTextStyles } from 'styles';

jest.mock('data', () => ({
  getDesktopStatistics: jest.fn(),
}));

jest.mock('styles', () => ({
  getFiguresTextStyles: jest.fn(),
}));

describe('StatisticList Component', () => {
  const mockStatistics = [
    { id: '1', count: StatisticCount.Year, label: StatisticLabel.Year },
    {
      id: '2',
      count: StatisticCount.Expert,
      label: StatisticLabel.Expert,
      showOnLargeScreen: true,
    },
    { id: '3', count: StatisticCount.Service, label: StatisticLabel.Service },
    {
      id: '4',
      count: StatisticCount.Speciality,
      label: StatisticLabel.Speciality,
      showOnLargeScreen: true,
    },
    { id: '5', count: StatisticCount.Work, label: StatisticLabel.Work, hideOnSmallScreen: true },
  ];

  const mockGetDesktopStatistics = getDesktopStatistics as jest.Mock;
  const mockGetFiguresTextStyles = getFiguresTextStyles as jest.Mock;
  const mockStyles = 'mock-figures-style';

  beforeEach(() => {
    jest.clearAllMocks();

    mockGetDesktopStatistics.mockReturnValue(mockStatistics);
    mockGetFiguresTextStyles.mockReturnValue(mockStyles);
  });

  it('should render all StatisticItem components with correct props', () => {
    render(<StatisticList />);

    mockStatistics.forEach(({ count, label }) => {
      const countElements = screen.getAllByText(count);
      expect(countElements.length).toBeGreaterThan(0);

      const labelElements = screen.getAllByText(label);
      expect(labelElements.length).toBeGreaterThan(0);

      countElements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });

      labelElements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });

      countElements.forEach((element) => {
        const listItem = element.closest('p');
        expect(listItem).toHaveClass(`generalText ${mockStyles}`);
      });
    });
  });

  it('should render StatisticItem components with the correct styles based on visibility props', () => {
    render(<StatisticList />);

    expect(getFiguresTextStyles).toHaveBeenNthCalledWith(1, false, undefined, false);
    expect(getFiguresTextStyles).toHaveBeenNthCalledWith(2, false, undefined, true);
    expect(getFiguresTextStyles).toHaveBeenNthCalledWith(3, false, undefined, false);
    expect(getFiguresTextStyles).toHaveBeenNthCalledWith(4, false, undefined, true);
    expect(getFiguresTextStyles).toHaveBeenNthCalledWith(5, true, undefined, false);
  });
});

describe('StatisticItem Component', () => {
  it('should render correctly with provided props', () => {
    render(
      <StatisticItem
        count={StatisticCount.Year}
        label={StatisticLabel.Year}
        hideOnSmallScreen={false}
        hideOnLargeScreen={false}
        showOnLargeScreen={true}
      />,
    );

    const countElement = screen.getByText(StatisticCount.Year);
    const labelElement = screen.getByText(StatisticLabel.Year);

    expect(countElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();

    const listItem = countElement.closest('p');
    expect(listItem).toHaveClass('generalText mock-figures-style');
    expect(getFiguresTextStyles).toHaveBeenCalledWith(false, false, true);
  });
});
