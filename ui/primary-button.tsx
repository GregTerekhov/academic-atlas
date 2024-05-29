import { ButtonType } from 'types';

interface IPrimaryButtonProps {
  children: React.ReactNode;
  handleClick?: () => void;
  type?: ButtonType;
}

export default function PrimaryButton({
  children,
  handleClick,
  type = ButtonType.Button,
}: IPrimaryButtonProps) {
  return (
    <>
      <p>PrimaryButton</p>
      <button
        type={type}
        onClick={handleClick}
      >
        {children}
      </button>
    </>
  );
}
