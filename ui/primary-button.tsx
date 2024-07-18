import { ButtonType } from 'types';
import { getPrimaryButtonStyles } from 'helpers';

interface IPrimaryButtonProps {
  children: React.ReactNode;
  handleClick?: () => void;
  isDisabled?: boolean;
  isOnLightBackground?: boolean;
  ariaLabel?: string;
}

export default function PrimaryButton({
  children,
  handleClick,
  isDisabled,
  isOnLightBackground = false,
  ariaLabel,
}: IPrimaryButtonProps) {
  const buttonClass = getPrimaryButtonStyles(isOnLightBackground, isDisabled);

  return (
    <button
      aria-describedby='primary-button-description'
      aria-label={ariaLabel}
      type={ButtonType.Button}
      onClick={handleClick}
      className={`${buttonClass} h-16`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
