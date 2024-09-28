'use client';

import { ButtonType, IconName, IconSize, type IDropdownTriggerProps } from 'types';

import SvgIcon from '../svg-icon';

import { getDropdownIconStyles, getDropdownLabelStyles, getDropdownTriggerStyles } from 'styles';

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
      onClick={(e: React.MouseEvent | React.KeyboardEvent) => handleToggle(e)}
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
