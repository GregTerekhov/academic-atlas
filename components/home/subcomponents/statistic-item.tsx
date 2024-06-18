import { StatisticCount, StatisticLabel } from 'types';

interface IStatisticItem {
  count: StatisticCount;
  label: StatisticLabel;
  hideOnSmallScreen?: boolean;
  hideOnLargeScreen?: boolean;
  showOnLargeScreen?: boolean;
}

export default function StatisticItem({
  count,
  label,
  hideOnSmallScreen,
  hideOnLargeScreen,
  showOnLargeScreen,
}: IStatisticItem) {
  return (
    <p
      className={`flex flex-col items-center justify-center ${hideOnSmallScreen ? 'hidden md:flex' : ''} ${hideOnLargeScreen ? 'hidden max-lg:flex' : ''} ${showOnLargeScreen ? 'hidden lg:flex' : ''} generalText`}
    >
      <strong className='bg-accent-gradient bg-clip-text text-6xl leading-130 tracking-[2px] text-transparent md:text-7xl lg:text-8xl'>
        {count}
      </strong>{' '}
      {label}
    </p>
  );
}
