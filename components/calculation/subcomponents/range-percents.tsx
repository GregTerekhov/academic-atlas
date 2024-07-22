interface IRangePercents {
  value: number;
  isChecked: boolean;
}

export default function RangePercents({ value, isChecked }: IRangePercents) {
  return (
    <div
      className={`${!isChecked ? 'text-disabled-foreground' : 'text-darkBase dark:text-whiteBase'} relative flex w-full justify-between text-xs [writing-mode:horizontal-tb]`}
    >
      <span className='inline-block w-8'>0</span>
      {value !== 0 && value !== 100 && (
        <span
          className='absolute w-8 text-center'
          style={{ left: `${value}%`, transform: 'translateX(-50%)' }}
        >
          {value}
        </span>
      )}
      {value !== 90 && <span className='inline-block w-8'>100</span>}
    </div>
  );
}
