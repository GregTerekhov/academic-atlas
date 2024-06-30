import { ButtonType } from 'types';

interface IPrimaryButtonProps {
  children: React.ReactNode;
  handleClick?: () => void;
  type?: ButtonType;
  isDisabled?: boolean;
  width?: string;
  hasIcon?: boolean;
}

export default function PrimaryButton({
  children,
  handleClick,
  type = ButtonType.Button,
  isDisabled,
  width = 'w-80',
  hasIcon = false,
}: IPrimaryButtonProps) {
  const disabledStyle = isDisabled
    ? 'bg-none text-disabled-foreground bg-disabled-background/50'
    : 'bg-accent-gradient hocus:bg-none hocus:bg-whiteBase/10 hocus:outline-none hocus:ring-[2px] hocus:ring-accentPrimary-darker text-whiteBase';

  const buttonClass = `${width} ${disabledStyle} ${hasIcon ? 'gap-x-4 md:mx-auto' : 'gap-x-0'} flex h-16 items-center justify-center rounded-[20px] text-big font-bold max-md:w-full lg:text-xl`;

  return (
    <button
      type={type}
      onClick={handleClick}
      className={buttonClass}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
