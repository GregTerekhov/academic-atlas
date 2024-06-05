'use client';

import { ButtonType, IconName, IconSize } from 'types';

import { useDropdown } from 'helpers';

import SvgIcon from './svg-icon';

interface IDropdownProps {
  label: string;
  options: string[];
}

export default function Dropdown({ label, options }: IDropdownProps) {
  const { isOpened, dropdownRef, toggleDropdown } = useDropdown();

  return (
    <div
      className='relative'
      ref={dropdownRef}
    >
      <button
        type={ButtonType.Button}
        onClick={toggleDropdown}
        className='gradient-border flex w-full items-center justify-between rounded-lg p-2 text-sm hocus:border-transparent hocus:outline-none hocus:ring-[2.4px] hocus:ring-accentPrimary dark:bg-darkBase dark:text-whiteBase md:px-4 md:py-3 md:text-base lg:text-big'
      >
        {label}
        <SvgIcon
          id={IconName.Expand}
          size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
          className={`${isOpened ? 'rotate-180' : ''} transition-transform dark:fill-whiteBase`}
        />
      </button>
      {isOpened && (
        <ul className='bg-background-gradient absolute z-20 w-full space-y-6 rounded-b-lg border-[2.4px] border-accentPrimary p-4 text-sm md:text-base lg:text-medium'>
          {Array.isArray(options) && options.map((option) => <li key={option}>{option}</li>)}
        </ul>
      )}
    </div>
  );
}
