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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(!checked);
    }
  };
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
        className={`${checked ? 'bg-accent-lightGradient dark:bg-accent-darkGradient' : 'bg-transparent'} flex size-10 items-center justify-center gap-x-4 rounded border border-accentPrimary dark:border-accentSecondary-darker`}
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
