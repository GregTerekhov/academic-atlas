// 'use client';

// // import { useRef } from 'react';

// import {
//   // type DropdownOption,
//   AriaDescription,
//   AriaId,
//   // ButtonType,
//   CalculationTitle,
//   DropdownAriaId,
//   ExecutionTime,
//   ExpertiseArea,
//   PrimaryButtonLabel,
//   WorkType,
// } from 'types';
// import { useCalculation } from 'context';
// import { getExecutionTime, getExpertiseArea, getWorkType } from 'helpers';
// import { useButtonDisabled, usePlagiarismCheck } from 'hooks';

// import { DropdownUI, PrimaryButtonUI } from 'ui';
// import { PlagiarismCheckbox, PriceResult, RangeInput, ThemeInput } from './subcomponents';
// // import { DropdownRef } from 'ui/dropdown';

// export default function PriceCalculator() {
//   // const workTypeDropdownRef = useRef<DropdownRef>(null);
//   // const expertiseAreaDropdownRef = useRef<DropdownRef>(null);
//   // const executionTimeDropdownRef = useRef<DropdownRef>(null);

//   const {
//     isChecked,
//     rangeValue,
//     hasSubmitData,
//     calculationData,
//     handleOptionChange,
//     handleShowCostResult,
//     handleCheckboxChange,
//     handleRangeChange,
//     // resetCalculation,
//   } = useCalculation();
//   const { shouldPlagiarismCheck } = usePlagiarismCheck(calculationData);
//   const { isButtonDisabled } = useButtonDisabled(calculationData, isChecked);

//   // const selectWorkType = (option: DropdownOption) => {
//   //   if (typeof option === 'string') {
//   //     handleOptionChange('workType', option as WorkType);
//   //   }
//   // };
//   // const selectExpertiseArea = (option: DropdownOption) => {
//   //   if (typeof option === 'string') {
//   //     handleOptionChange('expertiseArea', option as ExpertiseArea);
//   //   }
//   // };
//   // const selectExecutionTime = (option: DropdownOption) => {
//   //   if (typeof option === 'string') {
//   //     handleOptionChange('executionTime', option as ExecutionTime);
//   //   }
//   // };

//   // const handleResetAll = () => {
//   //   resetCalculation();
//   //   workTypeDropdownRef.current?.resetSelectedLabel();
//   //   expertiseAreaDropdownRef.current?.resetSelectedLabel();
//   //   executionTimeDropdownRef.current?.resetSelectedLabel();
//   // };

//   // const isDisabled =
//   //   calculationData.workType === WorkType.Default ||
//   //   calculationData.expertiseArea === ExpertiseArea.Default ||
//   //   calculationData.executionTime === ExecutionTime.Default ||
//   //   calculationData?.theme === '';

//   const workTypes = getWorkType();
//   const expertiseAreas = getExpertiseArea();
//   const executionTimes = getExecutionTime();

//   return (
//     <>
//       {hasSubmitData ? (
//         <PriceResult />
//       ) : (
//         <>
//           <h2 className='mb-8 !text-xl text-darkBase dark:text-whiteBase md:mb-10 md:!text-3xl'>
//             {CalculationTitle.CalculationForm}
//           </h2>
//           <div>
//             <ul className={`${shouldPlagiarismCheck ? 'md:mb-10' : 'md:mb-20'} mb-8 space-y-6`}>
//               <li>
//                 <DropdownUI
//                   // ref={workTypeDropdownRef}
//                   label={calculationData.workType}
//                   // label={WorkType.Default}
//                   options={workTypes}
//                   // onOptionSelect={selectWorkType}
//                   onOptionSelect={(option) => handleOptionChange('workType', option as WorkType)}
//                   ariaId={DropdownAriaId.WORK_TYPE}
//                 />
//               </li>
//               <li>
//                 <DropdownUI
//                   // ref={expertiseAreaDropdownRef}
//                   label={calculationData.expertiseArea}
//                   options={expertiseAreas}
//                   // onOptionSelect={selectExpertiseArea}
//                   onOptionSelect={(option) =>
//                     handleOptionChange('expertiseArea', option as ExpertiseArea)
//                   }
//                   ariaId={DropdownAriaId.EXPERTISE_AREA}
//                 />
//               </li>
//               <li>
//                 <DropdownUI
//                   // ref={executionTimeDropdownRef}
//                   label={calculationData.executionTime}
//                   options={executionTimes}
//                   // onOptionSelect={selectExecutionTime}
//                   onOptionSelect={(option) =>
//                     handleOptionChange('executionTime', option as ExecutionTime)
//                   }
//                   ariaId={DropdownAriaId.EXECUTION_TIME}
//                 />
//               </li>
//               <li className='relative'>
//                 <ThemeInput />
//               </li>
//               {/* <li className='text-end'>
//                 <button
//                   type={ButtonType.Button}
//                   onClick={handleResetAll}
//                   className='generalText text-darkBase hover:text-accentPrimary dark:text-whiteBase dark:hover:text-accentSecondary'
//                 >
//                   Скинути значення
//                 </button>
//               </li> */}
//             </ul>
//             {shouldPlagiarismCheck && (
//               <div className='mb-8 space-y-6'>
//                 <PlagiarismCheckbox
//                   id='checkbox'
//                   label='Наявність перевірки на плагіат'
//                   checked={isChecked}
//                   onChange={handleCheckboxChange}
//                 />
//                 <RangeInput
//                   id='range'
//                   value={rangeValue}
//                   isChecked={isChecked}
//                   workType={calculationData.workType ?? ''}
//                   onChange={handleRangeChange}
//                 />
//               </div>
//             )}
//             <div className='md:flex md:items-center md:justify-center'>
//               <PrimaryButtonUI
//                 handleClick={handleShowCostResult}
//                 isDisabled={isButtonDisabled}
//                 isOnLightBackground
//                 ariaId={AriaId.CostOutput}
//                 ariaDescription={AriaDescription.CostOutput}
//               >
//                 {PrimaryButtonLabel.CostCalculation}
//               </PrimaryButtonUI>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }
