// 'use client';

// // import { useImperativeHandle } from 'react';

// import { ButtonType, DropdownAriaId, DropdownOption } from 'types';
// import { getDropdownBoxStyles, getDropdownOptionsListStyles } from 'helpers';
// import { useDropdown } from 'hooks';

// import { MappedListTemplate } from 'template';
// import CustomScroll from './custom-scroll';
// import { DropdownTrigger } from './subcomponents';

// interface IOption {
//   typeId: string;
//   option: DropdownOption;
// }

// interface IDropdownProps {
//   label: DropdownOption;
//   options: IOption[];
//   onOptionSelect: (option: DropdownOption) => void;
//   ariaId: DropdownAriaId;
// }

// // export interface DropdownRef {
// //   resetSelectedLabel: () => void;
// // }

// // const Dropdown = forwardRef<DropdownRef, IDropdownProps>(
// //   ({ label, options, onOptionSelect, ariaId }, ref) => {
// export default function Dropdown({ label, options, onOptionSelect, ariaId }: IDropdownProps) {
//   const {
//     isDropdownOpen,
//     dropdownRef,
//     selectedLabel,
//     isOptionSelected,
//     toggleDropdown,
//     handleOptionClick,
//     // resetSelectedLabel,
//   } = useDropdown({ label, onOptionSelect });

//   // useImperativeHandle(ref, () => ({
//   //   resetSelectedLabel,
//   // }));

//   const wrapperClass = getDropdownBoxStyles();
//   const listClass = getDropdownOptionsListStyles();

//   return (
//     <div
//       className='relative'
//       ref={dropdownRef}
//     >
//       <DropdownTrigger
//         isOpen={isDropdownOpen}
//         isOptionSelected={isOptionSelected}
//         selectedLabel={selectedLabel}
//         handleToggle={toggleDropdown}
//         ariaId={ariaId}
//       />
//       {isDropdownOpen && (
//         <div
//           id={`${ariaId}-list`}
//           role='listbox'
//           aria-labelledby={`${ariaId}-trigger`}
//           className={wrapperClass}
//         >
//           <CustomScroll className='max-h-[248px]'>
//             <MappedListTemplate<IOption>
//               items={options}
//               className={listClass}
//             >
//               {({ typeId, option }) => (
//                 <li key={typeId}>
//                   <button
//                     type={ButtonType.Button}
//                     onClick={() => handleOptionClick(option)}
//                     role='option'
//                     aria-selected={isOptionSelected}
//                     className='text-start text-darkBase hover:text-accentPrimary dark:text-whiteBase dark:hover:text-accentSecondary'
//                   >
//                     {option}
//                   </button>
//                 </li>
//               )}
//             </MappedListTemplate>
//           </CustomScroll>
//         </div>
//       )}
//     </div>
//   );
// }
// // );

// // Dropdown.displayName = 'DropdownUI';

// // export default Dropdown;
