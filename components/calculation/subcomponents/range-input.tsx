'use client';

import { AriaLabel, RangeValue, WorkType } from 'types';
import { useRangeSettings } from 'hooks';

import RangePercents from './range-percents';

interface IRangeInputProps {
  id: string;
  isChecked: boolean;
  value: number;
  workType: WorkType;
  onChange: (value: number) => void;
}

export default function RangeInput({ id, isChecked, value, workType, onChange }: IRangeInputProps) {
  const { showMinimalText, rangeInputClass, handleChange } = useRangeSettings(
    workType,
    isChecked,
    onChange,
  );

  const addTextMinimalValue = (): JSX.Element | null => {
    return showMinimalText ? (
      <span>
        <span className='hidden sm:inline'>(мінімальний)</span>
        <span className='inline sm:hidden'>(мін.)</span>
      </span>
    ) : null;
  };

  return (
    <label
      htmlFor={id}
      className='flex flex-col'
    >
      <span
        className={`${!isChecked ? 'text-disabled-foreground' : 'text-darkBase dark:text-whiteBase'} generalText mb-4 inline-block`}
      >
        Оберіть відсоток унікальності {addTextMinimalValue()}
      </span>
      <input
        type='range'
        id={id}
        step={RangeValue.STEP}
        disabled={!isChecked}
        aria-label={AriaLabel.Range}
        value={value}
        min={RangeValue.MIN}
        max={RangeValue.MAX}
        onChange={handleChange}
        className={`range-input ${rangeInputClass} ${!isChecked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        style={{ '--value': `${value}%` } as React.CSSProperties}
      />
      <RangePercents
        value={value}
        isChecked={isChecked}
      />
    </label>
  );
}
