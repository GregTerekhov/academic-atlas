import { RefObject } from 'react';

import { AriaLabel, ButtonType, IconName, IconSize, type IWithChildren, PopupID } from 'types';

import { BackButton } from 'components';
import { SvgIconUI } from 'ui';

import { getBackdropStyles, getModalCloseIconStyles, getModalContainerStyles } from 'styles';

interface IModalProps extends IWithChildren {
  id: PopupID;
  modalRef: RefObject<HTMLDivElement>;
  closeModal: () => void;
  isOpen: (id: string) => boolean;
  hasSubmitData: boolean;
}

export default function Modal({
  closeModal,
  id,
  children,
  modalRef,
  isOpen,
  hasSubmitData,
}: IModalProps) {
  const backdropClass = getBackdropStyles();
  const containerClass = getModalContainerStyles();
  const iconClass = getModalCloseIconStyles();

  return (
    isOpen(id) && (
      <div className={backdropClass}>
        <div
          role='dialog'
          ref={modalRef}
          className={containerClass}
        >
          {hasSubmitData && <BackButton />}
          <button
            type={ButtonType.Button}
            className='group absolute right-6 top-6 size-[30px]'
            onClick={closeModal}
            aria-label={AriaLabel.CloseButton}
          >
            <SvgIconUI
              id={IconName.Close}
              size={{ width: IconSize.M, height: IconSize.M }}
              className={iconClass}
              ariaHidden={false}
              ariaLabel={AriaLabel.CloseModal}
            />
          </button>
          {children}
        </div>
      </div>
    )
  );
}
