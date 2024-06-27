'use client';

import { IconName, IconSize } from 'types';
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
      />
      <span
        className={`inline-block h-10 w-10 rounded border border-accentPrimary-darker ${
          checked ? 'bg-accent-gradient' : 'bg-transparent'
        } flex items-center justify-center gap-x-4`}
      >
        {checked && (
          <SvgIconUI
            id={IconName.Check}
            size={{ width: IconSize.M, height: IconSize.M }}
            className='fill-whiteBase'
          />
        )}
      </span>
      <span className='generalText'>{label}</span>
    </label>
  );
}
