import { StatisticCount, StatisticLabel } from 'types';

interface IStatisticItemProps {
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
}: IStatisticItemProps) {
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
      <strong className='gradientText'>{count}</strong> {label}
    </p>
  );
}
