import { ButtonType } from 'types';
import { getPrimaryButtonStyles } from 'helpers';

interface IPrimaryButtonProps {
  children: React.ReactNode;
  handleClick?: () => void;
  isDisabled?: boolean;
  isOnLightBackground?: boolean;
  ariaLabel?: string;
  ariaDescription?: string;
}

export default function PrimaryButton({
  children,
  handleClick,
  isDisabled,
  isOnLightBackground = false,
  ariaLabel,
  ariaDescription,
}: IPrimaryButtonProps) {
  const buttonClass = getPrimaryButtonStyles(isOnLightBackground, isDisabled);

  return (
    <>
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
      <p
        className='sr-only'
        id='telegram-bot-description'
      >
        {ariaDescription}
      </p>
    </>
  );
}
