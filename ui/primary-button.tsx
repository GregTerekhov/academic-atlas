import { AriaDescription, AriaId, ButtonType, type IWithChildren } from 'types';
import { getPrimaryButtonStyles } from 'helpers';

import AriaDescriptionText from './aria-description';

interface IPrimaryButtonProps extends IWithChildren {
  ariaDescription: AriaDescription;
  ariaId: AriaId;
  handleClick?: () => void;
  isDisabled?: boolean;
  isOnLightBackground?: boolean;
}

export default function PrimaryButton({
  children,
  ariaDescription,
  ariaId,
  handleClick,
  isDisabled,
  isOnLightBackground = false,
}: IPrimaryButtonProps) {
  const buttonClass = getPrimaryButtonStyles(isOnLightBackground, isDisabled);

  return (
    <>
      <button
        aria-describedby={ariaId}
        type={ButtonType.Button}
        onClick={handleClick}
        className={`${buttonClass} h-16`}
        disabled={isDisabled}
        aria-disabled={isDisabled}
      >
        {children}
      </button>
      <AriaDescriptionText
        id={ariaId}
        description={ariaDescription}
      />
    </>
  );
}
