'use client';

import { DropdownAriaId, ExecutionTime, ExpertiseArea, WorkType } from 'types';
import { useCalculation } from 'context';
import { getExecutionTime, getExpertiseArea, getWorkType } from 'helpers';

import { DropdownUI } from 'ui';
import ThemeInput from './theme-input';

interface IInputFieldsProps {
  shouldPlagiarismCheck: boolean;
}

export default function InputFields({ shouldPlagiarismCheck }: IInputFieldsProps) {
  const { calculationData, handleOptionChange } = useCalculation();

  const workTypes = getWorkType();
  const expertiseAreas = getExpertiseArea();
  const executionTimes = getExecutionTime();

  return (
    <ul className={`${shouldPlagiarismCheck ? 'md:mb-10' : 'md:mb-20'} mb-8 space-y-6`}>
      <li>
        <DropdownUI
          label={calculationData.workType}
          options={workTypes}
          onOptionSelect={(option) => handleOptionChange('workType', option as WorkType)}
          ariaId={DropdownAriaId.WORK_TYPE}
        />
      </li>
      <li>
        <DropdownUI
          label={calculationData.expertiseArea}
          options={expertiseAreas}
          onOptionSelect={(option) => handleOptionChange('expertiseArea', option as ExpertiseArea)}
          ariaId={DropdownAriaId.EXPERTISE_AREA}
        />
      </li>
      <li>
        <DropdownUI
          label={calculationData.executionTime}
          options={executionTimes}
          onOptionSelect={(option) => handleOptionChange('executionTime', option as ExecutionTime)}
          ariaId={DropdownAriaId.EXECUTION_TIME}
        />
      </li>
      <li className='relative'>
        <ThemeInput />
      </li>
    </ul>
  );
}
