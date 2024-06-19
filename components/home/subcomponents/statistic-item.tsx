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
  const getFiguresTextStyle = () => {
    switch (true) {
      case hideOnSmallScreen:
        return 'hidden md:flex';
      case hideOnLargeScreen:
        return 'hidden max-lg:flex';
      case showOnLargeScreen:
        return 'hidden lg:flex';

      default:
        return '';
    }
  };

  const figuresStyle = getFiguresTextStyle();

  return (
    <p className={`generalText flex flex-col items-center justify-center ${figuresStyle}`}>
      <strong className='bg-accent-gradient bg-clip-text text-6xl leading-130 tracking-[2px] text-transparent md:text-7xl lg:text-8xl'>
        {count}
      </strong>{' '}
      {label}
    </p>
  );
}
