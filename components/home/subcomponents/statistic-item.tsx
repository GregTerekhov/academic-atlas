import { IStatisticItem } from 'types';

type StatisticItemProps = Omit<IStatisticItem, 'id'>;

export default function StatisticItem({
  count,
  label,
  hideOnSmallScreen,
  hideOnLargeScreen,
  showOnLargeScreen,
}: StatisticItemProps) {
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
      <strong className='font-philosopher gradientText'>{count}</strong> {label}
    </p>
  );
}
