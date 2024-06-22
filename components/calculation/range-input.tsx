'use client';

import { useEffect } from 'react';

interface IRangeInputProps {
  id: string;
  isChecked: boolean;
  value: number;
  onChange: (value: number) => void;
}

export default function RangeInput({ id, isChecked, value, onChange }: IRangeInputProps) {
  useEffect(() => {
    if (!isChecked) {
      onChange(0);
    }
  }, [isChecked, onChange]);

  return (
    <label
      htmlFor={id}
      className='flex flex-col'
    >
      <span className='generalText mb-4 inline-block'>Оберіть відсоток унікальності</span>
      <input
        type='range'
        id={id}
        step={10}
        list='percents'
        disabled={!isChecked}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`range-input ${!isChecked ? 'cursor-not-allowed' : ''} mb-2 block`}
      />
      <datalist
        id='percents'
        className='flex w-full justify-between text-xs [writing-mode:horizontal-tb]'
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
          cursor: pointer;
          -webkit-appearance: none;
        }
        .range-input::-moz-range-thumb {
          width: 32px;
          height: 32px;
          background: ${!isChecked ? '#959595' : 'linear-gradient(to right, #f8a401, #d12600)'};
          margin-top: -12px;
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
    </label>
  );
}
