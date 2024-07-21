'use client';

import { type DropdownOption, ButtonType, DropdownAriaId, IconName, IconSize } from 'types';

import { getDropdownIconStyles, getDropdownLabelStyles, getDropdownTriggerStyles } from 'helpers';

import SvgIcon from '../svg-icon';

interface IDropdownTriggerProps {
  isOpen: boolean;
  isOptionSelected: boolean;
  selectedLabel: DropdownOption;
  handleToggle: () => void;
  ariaId: DropdownAriaId;
}

export default function DropdownTrigger({
  isOpen,
  isOptionSelected,
  handleToggle,
  selectedLabel,
  ariaId,
}: IDropdownTriggerProps) {
  const buttonClass = getDropdownTriggerStyles(isOptionSelected, isOpen);
  const labelClass = getDropdownLabelStyles(isOptionSelected);
  const iconClass = getDropdownIconStyles(isOptionSelected, isOpen);

  return (
    <button
      id={`${ariaId}-trigger`}
      type={ButtonType.Button}
      onClick={handleToggle}
      className={buttonClass}
      aria-haspopup='listbox'
      aria-expanded={isOpen}
      aria-controls={`${ariaId}-list`}
    >
      <span className={labelClass}>{selectedLabel}</span>
      <SvgIcon
        id={IconName.Expand}
        size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
        className={iconClass}
      />
    </button>
  );
}
