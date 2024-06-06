import { ButtonType } from 'types';

interface IPrimaryButtonProps {
  children: React.ReactNode;
  handleClick?: () => void;
  type?: ButtonType;
  hasIcon?: boolean;
  isDisabled?: boolean;
  width?: string;
}

export default function PrimaryButton({
  children,
  handleClick,
  type = ButtonType.Button,
  isDisabled,
  width = 'w-[320px]',
}: IPrimaryButtonProps) {
  //FIXME: переменная применяется для определения стиля в случае, если кнопка отключена (disabled=true). В таком случае у кнопки нет поведения ховера.
  //FIXME: accent - gradient и background - gradient tailwind.config не работают как цвет рамки из - за особенностей работы градиента в tailwind в целом.как фон работает только accent - gradient, background - gradient - не рабоатет.в качестве альтернативы предлагаю оставить цвет рамки при ховере однотонной.
  const disabledStyle = isDisabled
    ? 'bg-none text-disabled-foreground bg-disabled-background'
    : 'hover:border-[2.4px] hover:border-solid hover:border-accentPrimary-darker hover:from-whiteBase/10 hover:to-whiteBase/10';

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${width} to-accentPrimary-default h-16 rounded-[20px] bg-gradient-to-r from-accentPrimary-darker ${disabledStyle}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
