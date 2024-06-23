import { RefObject } from 'react';

import { ButtonType, IconName, IconSize } from 'types';
import { SvgIconUI } from 'ui';

interface IModalProps {
  children: React.ReactNode;
  closeModal: () => void;
  modalRef: RefObject<HTMLDivElement>;
  isOpen: boolean;
}

export default function Modal({ closeModal, children, modalRef, isOpen }: IModalProps) {
  return (
    isOpen && (
      <div className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-darkBase/75 transition-colors'>
        <div
          ref={modalRef}
          className='relative rounded-[20px] border-2 border-solid border-accentPrimary bg-whiteBase p-14 dark:bg-background-gradient dark:text-whiteBase lg:w-[752px]'
        >
          <button
            type={ButtonType.Button}
            className='group absolute right-6 top-6 h-[30px] w-[30px]'
            onClick={closeModal}
          >
            <SvgIconUI
              id={IconName.Close}
              size={{ width: IconSize.M, height: IconSize.M }}
              className='fill-darkBase group-hover:fill-accentPrimary group-focus:fill-accentPrimary dark:fill-whiteBase'
            />
          </button>
          {children}
        </div>
      </div>
    )
  );
}
