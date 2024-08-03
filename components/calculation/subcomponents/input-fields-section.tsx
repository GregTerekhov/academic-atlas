'use client';

import { mapArray } from 'helpers';
import { useDropdownList } from 'hooks';

import { DropdownUI } from 'ui';
import ThemeInput from './theme-input';

interface IInputFieldsProps {
  shouldPlagiarismCheck: boolean;
}

export default function InputFields({ shouldPlagiarismCheck }: IInputFieldsProps) {
  const dropdownList = useDropdownList();

  return (
    <ul className={`${shouldPlagiarismCheck ? 'md:mb-10' : 'md:mb-20'} mb-8 space-y-6`}>
      {mapArray(dropdownList, ({ id, label, options, onOptionSelect, ariaId }) => (
        <li key={id}>
          <DropdownUI
            label={label}
            options={options}
            onOptionSelect={onOptionSelect}
            ariaId={ariaId}
          />
        </li>
      ))}
      <li className='relative'>
        <ThemeInput />
      </li>
    </ul>
  );
}
