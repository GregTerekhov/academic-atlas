'use client';

import { forwardRef, ReactNode, Ref, useImperativeHandle } from 'react';

import { ButtonType, DropdownOption, IconName, IconSize, IDropdownRef } from 'types';

import { getDropdownLabelStyles, getDropdownTriggerStyles } from 'helpers';
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
  const {
    isDropdownOpen,
    dropdownRef,
    selectedLabel,
    isOptionSelected,
    toggleDropdown,
    resetSelectedLabel,
    handleOptionClick,
  } = useDropdown({ label, onOptionSelect });

  useImperativeHandle(ref, () => ({
    resetSelectedLabel,
  }));

  const dropdownTriggerClass = getDropdownTriggerStyles(isOptionSelected, isDropdownOpen);
  const dropdownLabelClass = getDropdownLabelStyles(isOptionSelected);

  return (
    <div
      className='relative'
      ref={dropdownRef}
    >
      <button
        type={ButtonType.Button}
        onClick={toggleDropdown}
        className={dropdownTriggerClass}
      >
        <span className={dropdownLabelClass}>{selectedLabel as ReactNode}</span>
        <SvgIcon
          id={IconName.Expand}
          size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
          className={`${isDropdownOpen ? 'rotate-180' : ''} fill-whiteBase transition-transform`}
        />
      </button>
      {isDropdownOpen && (
        <div className='absolute z-10 max-h-[248px] w-full overflow-hidden rounded-b-lg ring-[2px] ring-accentPrimary lg:max-h-[314px]'>
          <CustomScroll className='max-h-[248px]'>
            {/* FIXME: --- fix height*/}
            <ul className='w-full space-y-6 rounded-b-lg bg-whiteBase p-4 text-sm dark:bg-background-gradient max-md:leading-130 md:text-base lg:text-medium'>
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
