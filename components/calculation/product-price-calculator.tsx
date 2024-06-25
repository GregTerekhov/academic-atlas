'use client';

import { CalculationTitle, PrimaryButtonLabel } from 'types';

import { useCalculation } from 'context';
import {
  // calculatePrice,
  getExecutionTime,
  getExpertiseArea,
  getWorkType,
  useButtonDisabled,
  usePlagiarismCheck,
  usePlagiarismInputs,
  useSubmitData,
} from 'helpers';

import { DropdownUI, PrimaryButtonUI } from 'ui';
import PlagiarismCheckbox from './plagiarism-checkbox';
import RangeInput from './range-input';
import ThemeInput from './theme-input';
import PriceResult from './price-result';

export default function PriceCalculator() {
  const {
    calculationData,
    handleExecutionTimeChange,
    handleExpertiseAreaChange,
    handleWorkTypeChange,
  } = useCalculation();
  const { shouldPlagiarismCheck } = usePlagiarismCheck(calculationData);
  const { isChecked, rangeValue, handleCheckboxChange, handleRangeChange } =
    usePlagiarismInputs(calculationData);
  const { isButtonDisabled } = useButtonDisabled(calculationData, isChecked);
  const { hasSubmitData, handleCostClick } = useSubmitData();

  const workTypes = getWorkType();
  const expertiseAreas = getExpertiseArea();
  const executionTimes = getExecutionTime();

  // // Проміжковий приклад використання функції CalculatePrice
  // const selectedWorkType = WorkType.Abstracts;
  // const selectedExpertiseArea = ExpertiseArea.CultureAndArt;
  // const selectedExecutionTime = ExecutionTime.LongTerm;

  // const finalPrice = calculatePrice(
  //   selectedWorkType,
  //   selectedExpertiseArea,
  //   selectedExecutionTime,
  //   90,
  // );
  // console.log(`Final Price: ${finalPrice}`);

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
                  label={calculationData.workType}
                  // defaultLabel={WorkType.Default}  // FIXME: --- back to default values when calculation menu (or modal) is closed
                  options={workTypes}
                  onOptionSelect={handleWorkTypeChange}
                />
              </li>
              <li>
                <DropdownUI
                  label={calculationData.expertiseArea}
                  // defaultLabel={ExpertiseArea.Default} // FIXME: --- back to default values when calculation menu (or modal) is closed
                  options={expertiseAreas}
                  onOptionSelect={handleExpertiseAreaChange}
                />
              </li>
              <li>
                <DropdownUI
                  label={calculationData.executionTime}
                  // defaultLabel={ExecutionTime.Default} // FIXME: --- back to default values when calculation menu (or modal) is closed
                  options={executionTimes}
                  onOptionSelect={handleExecutionTimeChange}
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
                handleClick={handleCostClick}
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
