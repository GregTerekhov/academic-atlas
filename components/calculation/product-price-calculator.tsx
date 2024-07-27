'use client';

import {
  AriaDescription,
  AriaId,
  CalculationTitle,
  DropdownAriaId,
  ExecutionTime,
  ExpertiseArea,
  PrimaryButtonLabel,
  WorkType,
} from 'types';
import { useCalculation } from 'context';
import { getExecutionTime, getExpertiseArea, getWorkType } from 'helpers';
import { useButtonDisabled, usePlagiarismCheck } from 'hooks';

import { DropdownUI, PrimaryButtonUI } from 'ui';
import { PlagiarismCheckbox, PriceResult, RangeInput, ThemeInput } from './subcomponents';

export default function PriceCalculator() {
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
                onOptionSelect={(option) =>
                  handleOptionChange('expertiseArea', option as ExpertiseArea)
                }
                ariaId={DropdownAriaId.EXPERTISE_AREA}
              />
            </li>
            <li>
              <DropdownUI
                label={calculationData.executionTime}
                options={executionTimes}
                onOptionSelect={(option) =>
                  handleOptionChange('executionTime', option as ExecutionTime)
                }
                ariaId={DropdownAriaId.EXECUTION_TIME}
              />
            </li>
            <li className='relative'>
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
        </>
      )}
    </>
  );
}
