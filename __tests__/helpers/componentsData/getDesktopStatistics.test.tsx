import { StatisticCount, StatisticLabel } from 'types';
import { getDesktopStatistics } from 'data';

describe('getDesktopStatistics', () => {
  it('should return an array of statistics items with the correct structure', () => {
    const statistics = getDesktopStatistics();

    expect(Array.isArray(statistics)).toBe(true);
    expect(statistics).toHaveLength(5);

    expect(statistics[0]).toEqual({
      id: '1',
      count: StatisticCount.Year,
      label: StatisticLabel.Year,
    });
    expect(statistics[1]).toEqual({
      id: '2',
      count: StatisticCount.Expert,
      label: StatisticLabel.Expert,
      showOnLargeScreen: true,
    });
    expect(statistics[2]).toEqual({
      id: '3',
      count: StatisticCount.Service,
      label: StatisticLabel.Service,
    });
    expect(statistics[3]).toEqual({
      id: '4',
      count: StatisticCount.Speciality,
      label: StatisticLabel.Speciality,
      showOnLargeScreen: true,
    });
    expect(statistics[4]).toEqual({
      id: '5',
      count: StatisticCount.Work,
      label: StatisticLabel.Work,
      hideOnSmallScreen: true,
    });
  });
});
