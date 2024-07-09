import { ButtonType } from 'types';

interface IPrimaryButtonProps {
  children: React.ReactNode;
  handleClick?: () => void;
  type?: ButtonType;
  isDisabled?: boolean;
  hasIcon?: boolean;
  isOnLightBackground?: boolean;
}

export default function PrimaryButton({
  children,
  handleClick,
  type = ButtonType.Button,
  isDisabled,
  hasIcon = false,
  isOnLightBackground = false,
}: IPrimaryButtonProps) {
  const buttonBackground = isOnLightBackground
    ? 'hocus:text-accentPrimary dark:hocus:text-whiteBase'
    : '';
  const disabledStyle = isDisabled
    ? 'bg-none text-disabled-foreground bg-disabled-background/50'
    : `${buttonBackground} bg-accent-lightGradient dark:bg-accent-darkGradient hocus:bg-none dark:hocus:bg-none dark:hocus:bg-whiteBase/10 hocus:bg-accentPrimary/10 hocus:outline-none hocus:ring-[2px] dark:hocus:ring-accentSecondary-darker hocus:ring-accentPrimary text-whiteBase`;

  const buttonClass = `${disabledStyle} ${hasIcon ? 'gap-x-4 md:mx-auto' : 'gap-x-0'} flex h-16 items-center justify-center rounded-[20px] text-big font-bold w-full md:w-80 lg:text-xl`;

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
