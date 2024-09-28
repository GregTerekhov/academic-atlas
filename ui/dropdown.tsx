'use client';

import { ButtonType, type IOption, type IDropdownProps } from 'types';
import { useDropdown } from 'hooks';

import { MappedListTemplate } from 'template';
import CustomScroll from './custom-scroll';
import { DropdownTrigger } from './subcomponents';

import { getDropdownBoxStyles, getDropdownOptionsListStyles } from 'styles';

export default function Dropdown({ label, options, onOptionSelect, ariaId }: IDropdownProps) {
  const {
    isDropdownOpen,
    dropdownRef,
    selectedLabel,
    isOptionSelected,
    toggleDropdown,
    handleOptionClick,
  } = useDropdown({ label, onOptionSelect });

  const wrapperClass = getDropdownBoxStyles();
  const listClass = getDropdownOptionsListStyles();

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
        ariaId={ariaId}
      />
      {isDropdownOpen && (
        <div
          id={`${ariaId}-list`}
          role='listbox'
          aria-labelledby={`${ariaId}-trigger`}
          className={wrapperClass}
        >
          <CustomScroll className='max-h-[248px]'>
            <MappedListTemplate<IOption>
              items={options}
              className={listClass}
            >
              {({ typeId, option }) => (
                <li key={typeId}>
                  <button
                    type={ButtonType.Button}
                    onClick={() => handleOptionClick(option)}
                    role='option'
                    aria-selected={isOptionSelected}
                    className='text-start text-darkBase hover:text-accentPrimary dark:text-whiteBase dark:hover:text-accentSecondary'
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
