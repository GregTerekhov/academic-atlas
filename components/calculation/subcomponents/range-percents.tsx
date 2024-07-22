import { RangeValue } from 'types';

interface IRangePercents {
  value: number;
  isChecked: boolean;
}

export default function RangePercents({ value, isChecked }: IRangePercents) {
  return (
    <div
      className={`${!isChecked ? 'text-disabled-foreground' : 'text-darkBase dark:text-whiteBase'} relative flex w-full justify-between text-xs [writing-mode:horizontal-tb]`}
    >
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
