import { StatisticCount, StatisticLabel } from 'types';

import StatisticItem from './statistic-item';

export default function StatisticList() {
  return (
    <ul className='mb-8 space-y-4 md:mb-12 md:space-y-8 md:max-lg:flex md:max-lg:flex-col md:max-lg:justify-center lg:mb-20'>
      <li className='flex max-md:justify-between md:max-lg:justify-center md:max-lg:gap-x-20 lg:justify-between'>
        <StatisticItem
          count={StatisticCount.Year}
          label={StatisticLabel.Year}
        />
        <StatisticItem
          count={StatisticCount.Expert}
          label={StatisticLabel.Expert}
          showOnLargeScreen
        />
        <StatisticItem
          count={StatisticCount.Service}
          label={StatisticLabel.Service}
        />
        <StatisticItem
          count={StatisticCount.Speciality}
          label={StatisticLabel.Speciality}
          showOnLargeScreen
        />
        <StatisticItem
          count={StatisticCount.Work}
          label={StatisticLabel.Work}
          hideOnSmallScreen
        />
      </li>
      <li className='hidden text-center max-md:block'>
        <StatisticItem
          count={StatisticCount.Work}
          label={StatisticLabel.Work}
        />
      </li>
      <li className='flex max-md:justify-between md:max-lg:justify-center md:max-lg:gap-x-[134px]'>
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
