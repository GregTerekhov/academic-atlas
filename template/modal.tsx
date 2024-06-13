import { RefObject } from 'react';
import { IconName, IconSize } from 'types/ui';
import { SvgIconUI } from 'ui';

interface IModalProps {
  children: React.ReactNode;
  title?: string;
  closeModal: () => void;
  modalRef?: RefObject<HTMLDivElement>;
  isOpen: boolean;
}

export default function Modal({ closeModal, children, title, modalRef, isOpen }: IModalProps) {
  return (
    isOpen && (
      <div className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-darkBase/75 transition-colors'>
        <div
          ref={modalRef}
          className='relative rounded-[20px] border-[2.4px] border-solid border-accentPrimary bg-whiteBase p-14 dark:bg-background-gradient dark:text-whiteBase  lg:w-[752px]'
        >
          <button
            type='button'
            className='group absolute right-6 top-6 h-[30px] w-[30px] cursor-pointer'
            onClick={closeModal}
          >
            <SvgIconUI
              id={IconName.Close}
              size={{ width: IconSize.M, height: IconSize.M }}
              className='fill-darkBase group-hover:fill-accentPrimary group-focus:fill-accentPrimary dark:fill-whiteBase'
            />
          </button>
          <h2>{title}</h2>
          {children}
        </div>
      </div>
    )
  );
}
