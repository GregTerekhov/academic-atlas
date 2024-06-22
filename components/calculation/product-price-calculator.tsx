'use client';

import { useState } from 'react';

import {
  CalculationTitle,
  ExecutionTime,
  ExpertiseArea,
  PrimaryButtonLabel,
  WorkType,
} from 'types';

import { getExecutionTime, getExpertiseArea, getWorkType } from 'helpers';

import { DropdownUI, PrimaryButtonUI } from 'ui';
import PlagiarismCheckbox from './plagiarism-checkbox';
import RangeInput from './range-input';
import ThemeInput from './theme-input';
import PriceResult from './price-result';

export default function PriceCalculator() {
  const [hasSubmitData, setHasSubmitData] = useState(false);
  const [shouldPlagiarismCheck, setShouldPlagiarismCheck] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [rangeValue, setRangeValue] = useState(0);

  const handleCostClick = () => {
    setHasSubmitData(true);
  };
  const handleRangeChange = (value: number) => {
    setRangeValue(value);
  };

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const workTypes = getWorkType();
  const expertiseArea = getExpertiseArea();
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
                  label={WorkType.Default}
                  options={workTypes}
                />
              </li>
              <li>
                <DropdownUI
                  label={ExpertiseArea.Default}
                  options={expertiseArea}
                />
              </li>
              <li>
                <DropdownUI
                  label={ExecutionTime.Default}
                  options={executionTimes}
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
                  onChange={handleRangeChange}
                />
              </div>
            )}
            <div className='md:flex md:items-center md:justify-center'>
              <PrimaryButtonUI
                handleClick={handleCostClick}
                isDisabled={!isChecked}
              >
                {PrimaryButtonLabel.CostCalculation}
              </PrimaryButtonUI>
              <PrimaryButtonUI handleClick={() => setShouldPlagiarismCheck(true)}>
                {PrimaryButtonLabel.CostCalculation}
              </PrimaryButtonUI>
            </div>
          </form>
        </>
      )}
    </>
  );
}
