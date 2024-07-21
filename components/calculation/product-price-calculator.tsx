'use client';

import {
  type DropdownOption,
  AriaDescription,
  AriaId,
  CalculationTitle,
  DropdownAriaId,
  ExecutionTime,
  ExpertiseArea,
  PrimaryButtonLabel,
  WorkType,
} from 'types';

import { useCalculation, useMenu } from 'context';
import { getExecutionTime, getExpertiseArea, getWorkType } from 'helpers';
import { useButtonDisabled, useDropdownRefs, usePlagiarismCheck } from 'hooks';

import { DropdownUI, PrimaryButtonUI } from 'ui';
import { PlagiarismCheckbox, PriceResult, RangeInput, ThemeInput } from './subcomponents';

export default function PriceCalculator() {
  const { registerDropdownRefs } = useMenu();
  const {
    isChecked,
    rangeValue,
    hasSubmitData,
    calculationData,
    handleOptionChange,
    handleShowCostResult,
    handleCheckboxChange,
    handleRangeChange,
  } = useCalculation();
  const { shouldPlagiarismCheck } = usePlagiarismCheck(calculationData);
  const { isButtonDisabled } = useButtonDisabled(calculationData, isChecked);

  const { workTypeRef, executionTimeRef, expertiseAreaRef } = useDropdownRefs(registerDropdownRefs);

  const selectWorkType = (option: DropdownOption) => {
    if (typeof option === 'string') {
      handleOptionChange('workType', option as WorkType);
    }
  };
  const selectExpertiseArea = (option: DropdownOption) => {
    if (typeof option === 'string') {
      handleOptionChange('expertiseArea', option as ExpertiseArea);
    }
  };
  const selectExecutionTime = (option: DropdownOption) => {
    if (typeof option === 'string') {
      handleOptionChange('executionTime', option as ExecutionTime);
    }
  };

  const workTypes = getWorkType();
  const expertiseAreas = getExpertiseArea();
  const executionTimes = getExecutionTime();

  return (
    <>
      {hasSubmitData ? (
        <PriceResult />
      ) : (
        <>
          <h2 className='mb-8 !text-xl text-darkBase dark:text-whiteBase md:mb-10 md:!text-3xl'>
            {CalculationTitle.CalculationForm}
          </h2>
          <div>
            <ul className={`${shouldPlagiarismCheck ? 'md:mb-10' : 'md:mb-20'} mb-8 space-y-6`}>
              <li>
                <DropdownUI
                  ref={workTypeRef}
                  label={WorkType.Default}
                  options={workTypes}
                  onOptionSelect={selectWorkType}
                  ariaId={DropdownAriaId.WORK_TYPE}
                />
              </li>
              <li>
                <DropdownUI
                  ref={expertiseAreaRef}
                  label={ExpertiseArea.Default}
                  options={expertiseAreas}
                  onOptionSelect={selectExpertiseArea}
                  ariaId={DropdownAriaId.EXPERTISE_AREA}
                />
              </li>
              <li>
                <DropdownUI
                  ref={executionTimeRef}
                  label={ExecutionTime.Default}
                  options={executionTimes}
                  onOptionSelect={selectExecutionTime}
                  ariaId={DropdownAriaId.EXECUTION_TIME}
                />
              </li>
              <li>
                <ThemeInput />
              </li>
            </ul>
            {shouldPlagiarismCheck && (
              <div className='mb-8 space-y-6'>
                <PlagiarismCheckbox
                  id='checkbox'
                  label='Наявність перевірки на плагіат'
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <RangeInput
                  id='range'
                  value={rangeValue}
                  isChecked={isChecked}
                  workType={calculationData.workType ?? ''}
                  onChange={handleRangeChange}
                />
              </div>
            )}
            <div className='md:flex md:items-center md:justify-center'>
              <PrimaryButtonUI
                handleClick={handleShowCostResult}
                isDisabled={isButtonDisabled}
                isOnLightBackground
                ariaId={AriaId.CostOutput}
                ariaDescription={AriaDescription.CostOutput}
              >
                {PrimaryButtonLabel.CostCalculation}
              </PrimaryButtonUI>
            </div>
          </div>
        </>
      )}
    </>
  );
}
