'use client';

import {
  type DropdownOption,
  CalculationTitle,
  ExecutionTime,
  ExpertiseArea,
  PrimaryButtonLabel,
  WorkType,
} from 'types';

import { useCalculation } from 'context';
import { getExecutionTime, getExpertiseArea, getWorkType } from 'helpers';
import { useButtonDisabled, useDropdownRefs, usePlagiarismCheck } from 'hooks';

import { DropdownUI, PrimaryButtonUI } from 'ui';
import PlagiarismCheckbox from './plagiarism-checkbox';
import RangeInput from './range-input';
import ThemeInput from './theme-input';
import PriceResult from './price-result';

export default function PriceCalculator() {
  const {
    isChecked,
    rangeValue,
    hasSubmitData,
    calculationData,
    handleExecutionTimeChange,
    handleExpertiseAreaChange,
    handleWorkTypeChange,
    handleShowCostResult,
    handleCheckboxChange,
    handleRangeChange,
  } = useCalculation();
  const { shouldPlagiarismCheck } = usePlagiarismCheck(calculationData);
  const { isButtonDisabled } = useButtonDisabled(calculationData, isChecked);

  const { workTypeRef, executionTimeRef, expertiseAreaRef } = useDropdownRefs();

  const selectWorkType = (option: DropdownOption) => {
    if (typeof option === 'string') {
      handleWorkTypeChange(option as WorkType);
    }
  };
  const selectExpertiseArea = (option: DropdownOption) => {
    if (typeof option === 'string') {
      handleExpertiseAreaChange(option as ExpertiseArea);
    }
  };
  const selectExecutionTime = (option: DropdownOption) => {
    if (typeof option === 'string') {
      handleExecutionTimeChange(option as ExecutionTime);
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
          <form>
            <ul className={`${shouldPlagiarismCheck ? 'md:mb-10' : 'md:mb-20'} mb-8 space-y-6`}>
              <li>
                <DropdownUI
                  ref={workTypeRef}
                  label={calculationData.workType}
                  options={workTypes}
                  onOptionSelect={selectWorkType}
                />
              </li>
              <li>
                <DropdownUI
                  ref={expertiseAreaRef}
                  label={calculationData.expertiseArea}
                  options={expertiseAreas}
                  onOptionSelect={selectExpertiseArea}
                />
              </li>
              <li>
                <DropdownUI
                  ref={executionTimeRef}
                  label={calculationData.executionTime}
                  options={executionTimes}
                  onOptionSelect={selectExecutionTime}
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
              >
                {PrimaryButtonLabel.CostCalculation}
              </PrimaryButtonUI>
            </div>
          </form>
        </>
      )}
    </>
  );
}
