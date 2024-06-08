'use client';

import { ReactNode, useState } from 'react';

import { ButtonType, IconName, IconSize } from 'types';
import { useDropdown } from 'helpers';

import SvgIcon from './svg-icon';
import CustomScroll from './custom-scroll';

interface IOption<T> {
  typeId: string;
  option: T; // FIXME:-- possibly you should change this type to an appropriate common type for option's arrays after creating these types into /types/components.ts
}

interface IDropdownProps<T> {
  label: T; // FIXME:-- possibly you should change this type to an appropriate common type for labels after creating these types into /types/components.ts
  options: IOption<T>[];
}

export default function Dropdown<T>({ label, options }: IDropdownProps<T>) {
  const [selectedLabel, setSelectedLabel] = useState<T>(label);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const { isOpened, dropdownRef, toggleDropdown } = useDropdown();

  const handleOptionClick = (option: T) => {
    setSelectedLabel(option);
    setIsOptionSelected(true);
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
        className={`${isOptionSelected ? 'border-transparent bg-accent-gradient text-base font-bold text-whiteBase md:text-medium lg:text-lg' : 'gradient-border text-sm text-darkBase dark:bg-darkBase dark:text-whiteBase md:text-base lg:text-big'} flex w-full items-center justify-between rounded-lg p-2 hocus:border-transparent hocus:outline-none hocus:ring-[2.4px] hocus:ring-accentPrimary md:px-4 md:py-3`}
      >
        {/* TODO--- border colour for dropdown's button: border-accentPrimary-darker */}
        {selectedLabel as ReactNode}
        <SvgIcon
          id={IconName.Expand}
          size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
          className={`${isOpened ? 'rotate-180' : ''} ${isOptionSelected ? 'fill-whiteBase' : 'dark:fill-whiteBase'} transition-transform`}
        />
      </button>
      {isOpened && (
        <CustomScroll className='absolute  w-full border-[2.4px] border-accentPrimary'>
          <ul className=' space-y-6 rounded-b-lg  bg-whiteBase p-4 text-sm dark:bg-background-gradient md:text-base lg:text-medium'>
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
      )}
    </div>
  );
}
