'use client';

import { IconName, IconSize } from 'types';
import { getCheckboxStyles } from 'helpers';

import { SvgIconUI } from 'ui';

interface IPlagiarismCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function PlagiarismCheckbox({
  id,
  label,
  checked,
  onChange,
}: IPlagiarismCheckboxProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(!checked);
    }
  };

  const checkboxClass = getCheckboxStyles(checked);

  return (
    <label
      htmlFor={id}
      className='flex cursor-pointer items-center gap-x-2'
    >
      <input
        type='checkbox'
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className='hidden'
        aria-hidden='true'
      />
      <span
        role='checkbox'
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={checkboxClass}
      >
        {checked && (
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
