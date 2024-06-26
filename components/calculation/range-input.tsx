'use client';

import { useEffect } from 'react';

import { Uniqueness, WorkType } from 'types';
import RangePercents from './range-percents';

interface IRangeInputProps {
  id: string;
  isChecked: boolean;
  value: number;
  workType: WorkType;
  onChange: (value: number) => void;
}

export default function RangeInput({ id, isChecked, value, workType, onChange }: IRangeInputProps) {
  const shouldChooseHigherUniqueness = [
    WorkType.Abstracts,
    WorkType.BachelorTheses,
    WorkType.Diplomas,
  ].includes(workType);

  useEffect(() => {
    if (isChecked) {
      if (value < Uniqueness.Standard && workType === WorkType.TeamPapers) {
        onChange(Uniqueness.Standard);
      } else if (value < Uniqueness.Higher && shouldChooseHigherUniqueness) {
        onChange(Uniqueness.Higher);
      }
    } else {
      onChange(Uniqueness.Zero);
    }
  }, [isChecked, onChange, shouldChooseHigherUniqueness, value, workType]);

  const addTextMinimalValue = () => {
    const isShowMinimal =
      isChecked &&
      (value === Uniqueness.Standard ||
        (shouldChooseHigherUniqueness && value === Uniqueness.Higher));
    return isShowMinimal ? <span>(мінімальний)</span> : null;
  };

  return (
    <label
      htmlFor={id}
      className='flex flex-col'
    >
      <span className='generalText mb-4 inline-block'>
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
        onChange={(e) => onChange(Number(e.target.value))}
        className={`range-input ${!isChecked ? 'cursor-not-allowed' : ''} mb-2 block`}
      />
      <RangePercents value={value} />
      <style jsx>{`
        .range-input {
          height: 12px;
          background: linear-gradient(to right, #f8a401, #f8a401) no-repeat;
          border-radius: 10px;
          outline: none;
          -webkit-appearance: none;
          background-size:
            ${(value / 100) * 100}% 100%,
            100% 100%;
          background-image: linear-gradient(to right, #f8a401, #f8a401),
            linear-gradient(
              to right,
              rgba(47, 47, 47, 0.5) ${(value / 100) * 100}%,
              rgba(47, 47, 47, 0.5) ${(value / 100) * 100}%
            );
        }
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
