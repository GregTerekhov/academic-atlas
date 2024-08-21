'use client';

import { AriaLabel, RangeValue } from 'types';
import { useCalculation } from 'context';
import { useRangeSettings, useRangeValue } from 'hooks';

import RangePercents from './range-percents';

import { getDisabledRangeStyles } from 'styles';

interface IRangeInputProps {
  id: string;
}

export default function RangeInput({ id }: IRangeInputProps) {
  const { showMinimalText, rangeInputClass, handleChange } = useRangeSettings();

  const { isChecked, calculationData } = useCalculation();
  useRangeValue();

  const addTextMinimalValue = (): JSX.Element | null => {
    return showMinimalText ? (
      <span>
        <span className='hidden sm:inline'>(мінімальний)</span>
        <span className='inline sm:hidden'>(мін.)</span>
      </span>
    ) : null;
  };

  const disabledClass = getDisabledRangeStyles(isChecked);

  return (
    <label
      htmlFor={id}
      className='flex flex-col'
    >
      <span className={`${disabledClass} generalText mb-4 inline-block`}>
        Оберіть відсоток унікальності {addTextMinimalValue()}
      </span>
      <input
        type='range'
        id={id}
        step={RangeValue.STEP}
        disabled={!isChecked}
        aria-label={AriaLabel.Range}
        value={calculationData.uniqueness}
        min={RangeValue.MIN}
        max={RangeValue.MAX}
        onChange={handleChange}
        className={`range-input ${rangeInputClass} ${!isChecked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        style={{ '--value': `${calculationData.uniqueness}%` } as React.CSSProperties}
      />
      <RangePercents
        value={calculationData.uniqueness}
        isChecked={isChecked}
      />
    </label>
  );
}
