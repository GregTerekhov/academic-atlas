'use client';

import { IconName, IconSize } from 'types';
import { useCalculation } from 'context';

import { SvgIconUI } from 'ui';

import { getCheckboxStyles } from 'styles';

interface IPlagiarismCheckboxProps {
  id: string;
  label: string;
}

export default function PlagiarismCheckbox({ id, label }: IPlagiarismCheckboxProps) {
  const { handleCheckboxChange, isChecked } = useCalculation();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCheckboxChange(!isChecked);
    }
  };

  const checkboxClass = getCheckboxStyles(isChecked);

  return (
    <label
      htmlFor={id}
      className='inline-flex cursor-pointer items-center gap-x-2'
    >
      <input
        type='checkbox'
        id={id}
        checked={isChecked}
        onChange={(e) => handleCheckboxChange(e.target.checked)}
        className='hidden'
        aria-hidden='true'
      />
      <span
        role='checkbox'
        aria-checked={isChecked}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={checkboxClass}
      >
        {isChecked && (
          <SvgIconUI
            id={IconName.Check}
            size={{ width: IconSize.M, height: IconSize.M }}
            className='fill-whiteBase'
            ariaHidden={false}
          />
        )}
      </span>
      <span className='generalText text-darkBase dark:text-whiteBase'>{label}</span>
    </label>
  );
}
