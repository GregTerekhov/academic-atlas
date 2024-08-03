import { RangeValue } from 'types';
import { getDisabledRangeStyles } from 'styles';

interface IRangePercents {
  value: number;
  isChecked: boolean;
}

export default function RangePercents({ value, isChecked }: IRangePercents) {
  const disabledClass = getDisabledRangeStyles(isChecked);

  return (
    <div className={`${disabledClass} relative flex w-full justify-between text-xs`}>
      <span className='inline-block w-8'>{RangeValue.MIN}</span>
      {value !== RangeValue.MIN && value !== RangeValue.MAX && (
        <span
          className='absolute w-8 text-center'
          style={{ left: `${value}%`, transform: 'translateX(-50%)' }}
        >
          {value}
        </span>
      )}
      {value !== RangeValue.PENULTIMATE && (
        <span className='inline-block w-8'>{RangeValue.MAX}</span>
      )}
    </div>
  );
}
