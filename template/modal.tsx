import { RefObject } from 'react';

import { ButtonType, IconName, IconSize, PopupID } from 'types';
import { SvgIconUI } from 'ui';

interface IModalProps {
  children: React.ReactNode;
  closeModal: () => void;
  modalRef: RefObject<HTMLDivElement>;
  isOpen: (id: string) => boolean;
  id: PopupID;
}

export default function Modal({ closeModal, id, children, modalRef, isOpen }: IModalProps) {
  return (
    isOpen(id) && (
      <div className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-disabled-background/50 transition-colors dark:bg-darkBase/75'>
        <div
          ref={modalRef}
          className='bg-background-light-gradient dark:bg-background-dark-gradient relative rounded-[20px] border-2 border-solid border-accentPrimary bg-whiteBase p-14 dark:text-whiteBase lg:w-[752px]'
        >
          <button
            type={ButtonType.Button}
            className='group absolute right-6 top-6 size-[30px]'
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
