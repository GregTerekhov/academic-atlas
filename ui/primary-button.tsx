import { AriaDescription, AriaId, ButtonType } from 'types';
import { getPrimaryButtonStyles } from 'helpers';

import AriaDescriptionText from './aria-description';

interface IPrimaryButtonProps {
  children: React.ReactNode;
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
