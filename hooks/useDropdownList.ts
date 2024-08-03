'use client';

import {
  DropdownAriaId,
  ExecutionTime,
  ExpertiseArea,
  WorkType,
  type DropdownOption,
  type IDropdownProps,
} from 'types';
import { useCalculation } from 'context';
import { getExecutionTime, getExpertiseArea, getWorkType } from 'helpers';

interface IDropdownList extends IDropdownProps {
  id: number;
}

export const useDropdownList = (): IDropdownList[] => {
  const { calculationData, handleOptionChange } = useCalculation();

  const { workType, expertiseArea, executionTime } = calculationData;

  const workTypes = getWorkType();
  const expertiseAreas = getExpertiseArea();
  const executionTimes = getExecutionTime();

  const dropdownList = [
    {
      id: 1,
      label: workType,
      options: workTypes,
      onOptionSelect: (option: DropdownOption) =>
        handleOptionChange('workType', option as WorkType),
      ariaId: DropdownAriaId.WORK_TYPE,
    },
    {
      id: 2,
      label: expertiseArea,
      options: expertiseAreas,
      onOptionSelect: (option: DropdownOption) =>
        handleOptionChange('expertiseArea', option as ExpertiseArea),
      ariaId: DropdownAriaId.EXPERTISE_AREA,
    },
    {
      id: 3,
      label: executionTime,
      options: executionTimes,
      onOptionSelect: (option: DropdownOption) =>
        handleOptionChange('executionTime', option as ExecutionTime),
      ariaId: DropdownAriaId.EXECUTION_TIME,
    },
  ];

  return dropdownList;
};
