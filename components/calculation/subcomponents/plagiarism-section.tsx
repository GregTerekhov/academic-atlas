'use client';

import { useCalculation } from 'context';

import PlagiarismCheckbox from './plagiarism-checkbox';
import RangeInput from './range-input';

export default function PlagiarismSection() {
  const { isChecked, rangeValue, calculationData, handleCheckboxChange, handleRangeValueChange } =
    useCalculation();

  return (
    <div className='mb-8 space-y-6'>
      <PlagiarismCheckbox
        id='checkbox'
        label='Наявність перевірки на плагіат'
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <RangeInput
        id='range'
        value={rangeValue}
        isChecked={isChecked}
        workType={calculationData.workType ?? ''}
        onChange={handleRangeValueChange}
      />
    </div>
  );
}
