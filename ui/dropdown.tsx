'use client';

import { forwardRef, Ref, useImperativeHandle } from 'react';

import { ButtonType, DropdownOption, IDropdownRef } from 'types';

import { useDropdown } from 'hooks';

import { MappedListTemplate } from 'template';
import CustomScroll from './custom-scroll';
import { DropdownTrigger } from './subcomponents';
interface IOption {
  typeId: string;
  option: DropdownOption;
}

interface IDropdownProps {
  label: DropdownOption;
  options: IOption[];
  onOptionSelect: (option: DropdownOption) => void;
}

function Dropdown(
  { label, options, onOptionSelect }: IDropdownProps,
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

  return (
    <div
      className='relative'
      ref={dropdownRef}
    >
      <DropdownTrigger
        isOpen={isDropdownOpen}
        isOptionSelected={isOptionSelected}
        selectedLabel={selectedLabel}
        handleToggle={toggleDropdown}
      />
      {isDropdownOpen && (
        <div className='absolute z-10 max-h-[248px] w-full overflow-hidden rounded-b-lg ring-[2px] ring-accentPrimary lg:max-h-[314px]'>
          <CustomScroll className='max-h-[248px]'>
            {/* FIXME: --- fix height*/}
            <MappedListTemplate<IOption>
              items={options}
              className='bg-background-light-gradient dark:bg-background-dark-gradient w-full space-y-6 rounded-b-lg bg-whiteBase p-4 text-sm max-md:leading-130 md:text-base lg:text-medium'
            >
              {({ typeId, option }) => (
                <li key={typeId}>
                  <button
                    type={ButtonType.Button}
                    onClick={() => handleOptionClick(option)}
                    className='hover:text-accentPrimary'
                  >
                    {option}
                  </button>
                </li>
              )}
            </MappedListTemplate>
          </CustomScroll>
        </div>
      )}
    </div>
  );
}

export default forwardRef(Dropdown);
