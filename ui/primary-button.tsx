import { ButtonType } from 'types';

interface IPrimaryButtonProps {
  children: React.ReactNode;
  handleClick?: () => void;
  type?: ButtonType;
  hasIcon?: boolean;
  isDisabled?: boolean;
}

export default function PrimaryButton({
  children,
  handleClick,
  type = ButtonType.Button,
  isDisabled,
}: IPrimaryButtonProps) {
  console.log('THIS LOG IN CONSOLE');

  const disabledStyle = isDisabled
    ? 'bg-none text-[#959595] bg-[#2F2F2F80]'
    : 'hover:border-[2.4px] hover:border-solid hover:from-[#FEFEFE1A] hover:to-[#FEFEFE1A]';

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`rounded-[20px] bg-gradient-to-r from-[#D12600] to-[#F8A401] p-[16px] lg:px-[20px] lg:py-[10px] ${disabledStyle}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
