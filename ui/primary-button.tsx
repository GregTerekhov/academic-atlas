import { ButtonType } from 'types';
import { getPrimaryButtonStyles } from 'helpers';

interface IPrimaryButtonProps {
  children: React.ReactNode;
  handleClick?: () => void;
  isDisabled?: boolean;
  isOnLightBackground?: boolean;
}

export default function PrimaryButton({
  children,
  handleClick,
  isDisabled,
  isOnLightBackground = false,
}: IPrimaryButtonProps) {
  const buttonClass = getPrimaryButtonStyles(isOnLightBackground, isDisabled);

  return (
    <button
      type={ButtonType.Button}
      onClick={handleClick}
      className={`${buttonClass} h-16`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
