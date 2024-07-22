'use client';

import { ThemeVariants, WorkType } from 'types';

import { useTheme } from 'context';
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
  const { showMinimalText, handleChange } = useRangeSettings(workType, isChecked, onChange);

  const { theme } = useTheme();

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
        step={10}
        list='percents'
        disabled={!isChecked}
        aria-label='Поле для обирання відсотка унікальності роботи'
        value={value}
        min={0}
        max={100}
        onChange={handleChange}
        className={`range-input h-3 appearance-none rounded-[10px] outline-none ${!isChecked ? 'cursor-not-allowed' : ''} mb-2 block`}
        style={{
          background:
            theme === ThemeVariants.DARK
              ? `linear-gradient(to right, #f8a401 ${value}%, rgba(47, 47, 47, 0.5) ${value}%)`
              : `linear-gradient(to right, #007cee ${value}%, rgba(27, 27, 27, 0.1) ${value}%)`,
        }}
      />
      <RangePercents
        value={value}
        isChecked={isChecked}
      />
    </label>
  );
}
