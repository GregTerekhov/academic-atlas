import { getPrimaryButtonStyles } from 'helpers/uiHelper';
import { ButtonType } from 'types';

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
