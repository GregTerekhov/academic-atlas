'use client';

import { ReactNode, useState } from 'react';

import { ButtonType, IconName, IconSize } from 'types';

import { useDropdown } from 'helpers';

import SvgIcon from './svg-icon';
import CustomScroll from './custom-scroll';

interface IOption<T> {
  typeId: string;
  option: T;
}

interface IDropdownProps<T> {
  label: T;
  options: IOption<T>[];
  onOptionSelect: (option: T) => void;
}

export default function Dropdown<T>({ label, options, onOptionSelect }: IDropdownProps<T>) {
  const [selectedLabel, setSelectedLabel] = useState<T>(label);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const { isDropdownOpen, dropdownRef, toggleDropdown } = useDropdown();

  const handleOptionClick = (option: T) => {
    setSelectedLabel(option);
    setIsOptionSelected(true);
    onOptionSelect(option);
    toggleDropdown();
  };

  return (
    <div
      className='relative'
      ref={dropdownRef}
    >
      <button
        type={ButtonType.Button}
        onClick={toggleDropdown}
        className={`${isOptionSelected ? 'border-transparent bg-accent-gradient text-base font-bold text-whiteBase md:text-medium lg:text-lg' : 'border-accentPrimary-darker text-sm text-darkBase dark:bg-darkBase dark:text-whiteBase md:text-base lg:text-big'} flex h-10 w-full items-center justify-between border border-solid px-2 hocus:border-transparent hocus:outline-none hocus:ring-[2px] hocus:ring-accentPrimary md:h-12 md:px-4 ${isDropdownOpen ? 'rounded-t-lg' : 'rounded-lg'}`}
      >
        {selectedLabel as ReactNode}
        <SvgIcon
          id={IconName.Expand}
          size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
          className={`${isDropdownOpen ? 'rotate-180' : ''} ${isOptionSelected ? 'fill-whiteBase' : 'dark:fill-whiteBase'} transition-transform`}
        />
      </button>
      {isDropdownOpen && (
        <div className='absolute z-10 max-h-[248px] w-full overflow-hidden rounded-b-lg ring-[2px] ring-accentPrimary lg:max-h-[314px]'>
          <CustomScroll className='max-h-[248px]'>
            {' '}
            {/* FIXME: --- fix height*/}
            <ul className='w-full space-y-6 rounded-b-lg bg-whiteBase p-4 text-sm dark:bg-background-gradient md:text-base lg:text-medium'>
              {Array.isArray(options) &&
                options.map(({ typeId, option }) => (
                  <li key={typeId}>
                    <button
                      type={ButtonType.Button}
                      onClick={() => handleOptionClick(option)}
                      className='hover:text-accentPrimary'
                    >
                      {option as ReactNode}
                    </button>
                  </li>
                ))}
            </ul>
          </CustomScroll>
        </div>
      )}
    </div>
  );
}
