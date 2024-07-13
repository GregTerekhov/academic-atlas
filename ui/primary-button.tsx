import { ButtonType } from 'types';
import { getPrimaryButtonStyles } from 'helpers';

interface IPrimaryButtonProps {
  children: React.ReactNode;
  handleClick?: () => void;
  isDisabled?: boolean;
}

export default function PrimaryButton({ children, handleClick, isDisabled }: IPrimaryButtonProps) {
  const buttonClass = getPrimaryButtonStyles(false, isDisabled);

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
