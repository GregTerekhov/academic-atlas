import { type IStatisticItem } from 'types';
import { getFiguresTextStyles } from 'styles';

type StatisticItemProps = Omit<IStatisticItem, 'id'>;

export default function StatisticItem({
  count,
  label,
  hideOnSmallScreen,
  hideOnLargeScreen,
  showOnLargeScreen,
}: StatisticItemProps) {
  const figuresStyle = getFiguresTextStyles(
    hideOnSmallScreen,
    hideOnLargeScreen,
    showOnLargeScreen,
  );

  return (
    <p
      className={`generalText flex-col items-center justify-center max-sm:text-center ${figuresStyle}`}
    >
      <strong className='gradientText bg-accent-lightGradient font-philosopher [-webkit-background-clip:text] dark:bg-accent-darkGradient max-sm:text-3xl'>
        {count}
      </strong>{' '}
      {label}
    </p>
  );
}
