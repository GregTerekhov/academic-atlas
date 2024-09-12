import { StatisticCount, StatisticLabel } from 'types';
import { getDesktopStatistics } from 'data';

describe('getDesktopStatistics', () => {
  it('should return an array of statistics items with the correct structure', () => {
    const statistics = getDesktopStatistics();

    expect(Array.isArray(statistics)).toBe(true);
    expect(statistics).toHaveLength(5);

    expect(statistics).toEqual([
      {
        id: '1',
        count: StatisticCount.Year,
        label: StatisticLabel.Year,
      },
      {
        id: '2',
        count: StatisticCount.Expert,
        label: StatisticLabel.Expert,
        showOnLargeScreen: true,
      },
      {
        id: '3',
        count: StatisticCount.Service,
        label: StatisticLabel.Service,
      },
      {
        id: '4',
        count: StatisticCount.Speciality,
        label: StatisticLabel.Speciality,
        showOnLargeScreen: true,
      },
      {
        id: '5',
        count: StatisticCount.Work,
        label: StatisticLabel.Work,
        hideOnSmallScreen: true,
      },
    ]);
  });
});
