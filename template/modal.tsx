import { RefObject } from 'react';

import { ButtonType, IconName, IconSize, PopupID } from 'types';
import { getBackdropStyles, getModalCloseIconStyles, getModalContainerStyles } from 'helpers';

import { SvgIconUI } from 'ui';

interface IModalProps {
  id: PopupID;
  children: React.ReactNode;
  modalRef: RefObject<HTMLDivElement>;
  closeModal: () => void;
  isOpen: (id: string) => boolean;
}

export default function Modal({ closeModal, id, children, modalRef, isOpen }: IModalProps) {
  const backdropClass = getBackdropStyles();
  const containerClass = getModalContainerStyles();
  const iconClass = getModalCloseIconStyles();

  return (
    isOpen(id) && (
      <div className={backdropClass}>
        <div
          ref={modalRef}
          className={containerClass}
        >
          <button
            type={ButtonType.Button}
            className='group absolute right-6 top-6 size-[30px]'
            onClick={closeModal}
            aria-label='Кнопка закриття модального вікна'
          >
            <SvgIconUI
              id={IconName.Close}
              size={{ width: IconSize.M, height: IconSize.M }}
              className={iconClass}
              ariaHidden={false}
              ariaLabel='Закриття модалки'
            />
          </button>
          {children}
        </div>
      </div>
    )
  );
}
