'use client';

import { useEffect, useState } from 'react';

import { WorkType } from 'types';
import { couldChooseUniqueness, getMinimalUniqueness } from 'helpers';

import RangePercents from './range-percents';

interface IRangeInputProps {
  id: string;
  isChecked: boolean;
  value: number;
  workType: WorkType;
  onChange: (value: number) => void;
}

export default function RangeInput({ id, isChecked, value, workType, onChange }: IRangeInputProps) {
  const [showMinimalText, setShowMinimalText] = useState(false);
  const couldChooseHigherUniqueness = couldChooseUniqueness(workType);
  const minimalUniqueness = getMinimalUniqueness(workType);

  useEffect(() => {
    setShowMinimalText(isChecked && couldChooseHigherUniqueness);
  }, [isChecked, couldChooseHigherUniqueness]);

  const addTextMinimalValue = (): JSX.Element | null => {
    return showMinimalText ? <span>(мінімальний)</span> : null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
    setShowMinimalText(newValue <= minimalUniqueness);
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
        value={value}
        min={0}
        max={100}
        onChange={handleChange}
        className={`range-input h-3 appearance-none rounded-[10px] outline-none ${!isChecked ? 'cursor-not-allowed' : ''} mb-2 block`}
        style={{
          background: `linear-gradient(to right, #f8a401 ${value}%, rgba(47, 47, 47, 0.5) ${value}%)`,
        }}
      />
      <RangePercents
        value={value}
        isChecked={isChecked}
      />
      <style jsx>{`
        .range-input::-webkit-slider-thumb {
          width: 32px;
          height: 32px;
          background: ${!isChecked ? '#959595' : 'linear-gradient(to right, #f8a401, #d12600)'};
          border-radius: 50%;
          margin-top: -12px;
          cursor: ${!isChecked ? 'not-allowed' : 'pointer'};
          -webkit-appearance: none;
        }
        .range-input::-moz-range-thumb {
          width: 32px;
          height: 32px;
          background: ${!isChecked ? '#959595' : 'linear-gradient(to right, #f8a401, #d12600)'};
          margin-top: -12px;
          border-radius: 50%;
          cursor: ${!isChecked ? 'not-allowed' : 'pointer'};
        }
      `}</style>
    </label>
  );
}
