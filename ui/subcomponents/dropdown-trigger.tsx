'use client';

import { ButtonType, type DropdownOption, IconName, IconSize } from 'types';

import { getDropdownLabelStyles, getDropdownTriggerStyles } from 'helpers';

import SvgIcon from '../svg-icon';

interface IDropdownTriggerProps {
  isOpen: boolean;
  isOptionSelected: boolean;
  selectedLabel: DropdownOption;
  handleToggle: () => void;
}

export default function DropdownTrigger({
  isOpen,
  isOptionSelected,
  handleToggle,
  selectedLabel,
}: IDropdownTriggerProps) {
  const buttonClass = getDropdownTriggerStyles(isOptionSelected, isOpen);
  const labelClass = getDropdownLabelStyles(isOptionSelected);

  return (
    <button
      type={ButtonType.Button}
      onClick={handleToggle}
      className={buttonClass}
    >
      <span className={labelClass}>{selectedLabel}</span>
      <SvgIcon
        id={IconName.Expand}
        size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
        className={`${isOpen ? 'rotate-180' : ''} fill-whiteBase transition-transform`}
      />
    </button>
  );
}
