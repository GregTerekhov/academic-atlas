import { StatisticCount, StatisticLabel } from 'types';
import { getDesktopStatistics } from 'data';
import { mapArray } from 'helpers';

import StatisticItem from './statistic-item';

export default function StatisticList() {
  const statistics = getDesktopStatistics();

  return (
    <ul className='mb-8 space-y-4 md:mb-12 md:space-y-8 md:max-lg:flex md:max-lg:flex-col md:max-lg:justify-center lg:mb-20'>
      <li className='flex max-md:justify-between md:max-lg:justify-center md:max-lg:gap-x-20 lg:justify-between'>
        {mapArray(statistics, ({ id, count, label, showOnLargeScreen, hideOnSmallScreen }) => (
          <StatisticItem
            key={id}
            count={count}
            label={label}
            showOnLargeScreen={showOnLargeScreen ?? false}
            hideOnSmallScreen={hideOnSmallScreen ?? false}
          />
        ))}
      </li>
      <li className='hidden text-center max-md:block'>
        <StatisticItem
          count={StatisticCount.Work}
          label={StatisticLabel.Work}
        />
      </li>
      <li className='flex items-start max-md:justify-between md:max-lg:justify-center md:max-lg:gap-x-[134px]'>
        <StatisticItem
          count={StatisticCount.Expert}
          label={StatisticLabel.Expert}
          hideOnLargeScreen
        />
        <StatisticItem
          count={StatisticCount.Speciality}
          label={StatisticLabel.Speciality}
          hideOnLargeScreen
        />
      </li>
    </ul>
  );
}
