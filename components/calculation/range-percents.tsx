interface IRangePercents {
  value: number;
  isChecked: boolean;
}

export default function RangePercents({ value, isChecked }: IRangePercents) {
  return (
    <datalist
      id='percents'
      className={`${!isChecked ? 'text-disabled-foreground' : ''} flex w-full justify-between text-xs [writing-mode:horizontal-tb]`}
    >
      <option
        value='0'
        label='0'
      ></option>
      {value !== 0 && value !== 100 && (
        <option
          value={value.toString()}
          label={`${value.toString()}%`}
        ></option>
      )}
      <option
        value='100'
        label='100'
      ></option>
    </datalist>
  );
}
