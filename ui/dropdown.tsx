'use client';

import { forwardRef, ReactNode, Ref, useImperativeHandle, useState } from 'react';

// import { ButtonType, IconName, IconSize, IDropdownRef } from 'types';
import { ButtonType, DropdownOption, IconName, IconSize, IDropdownRef } from 'types';

import { useDropdown } from 'hooks';

import SvgIcon from './svg-icon';
import CustomScroll from './custom-scroll';

interface IOption {
  typeId: string;
  option: DropdownOption;
}
// interface IOption<T> {
//   typeId: string;
//   option: T;
// }

interface IDropdownProps {
  label: DropdownOption;
  options: IOption[];
  onOptionSelect: (option: DropdownOption) => void;
}
// interface IDropdownProps<T> {
//   label: T;
//   options: IOption<T>[];
//   onOptionSelect: (option: T) => void;
// }

function Dropdown(
  // function Dropdown<T>(
  { label, options, onOptionSelect }: IDropdownProps,
  // { label, options, onOptionSelect }: IDropdownProps<T>,
  ref: Ref<IDropdownRef | null>,
) {
  // const [selectedLabel, setSelectedLabel] = useState<T>(label);
  const [selectedLabel, setSelectedLabel] = useState<DropdownOption>(label);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const { isDropdownOpen, dropdownRef, toggleDropdown } = useDropdown();

  useImperativeHandle(ref, () => ({
    resetSelectedLabel: () => {
      setSelectedLabel(label);
      setIsOptionSelected(false);
    },
  }));

  // const handleOptionClick = (option: T) => {
  const handleOptionClick = (option: DropdownOption) => {
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
        className={`${isOptionSelected ? 'border-none bg-accent-gradient' : 'border-accentPrimary-darker dark:bg-darkBase'} flex h-10 w-full items-center justify-between border border-solid px-2 hocus:border-transparent hocus:outline-none hocus:ring-[2px] hocus:ring-accentPrimary md:h-12 md:px-4 ${isDropdownOpen ? 'rounded-t-lg' : 'rounded-lg'}`}
      >
        <span
          className={
            isOptionSelected
              ? 'text-base font-bold text-whiteBase md:text-medium lg:text-lg'
              : 'text-sm text-darkBase dark:text-whiteBase max-md:leading-130 md:text-base lg:text-big'
          }
        >
          {selectedLabel as ReactNode}
        </span>
        <SvgIcon
          id={IconName.Expand}
          size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
          className={`${isDropdownOpen ? 'rotate-180' : ''} fill-whiteBase transition-transform`}
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

export default forwardRef(Dropdown);
