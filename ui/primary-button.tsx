import { ButtonType } from 'types';

interface IPrimaryButtonProps {
  children: React.ReactNode;
  type?: ButtonType;
}

export default function PrimaryButton({ children, type = ButtonType.Button }: IPrimaryButtonProps) {
  return (
    <>
      <p>PrimaryButton</p>
      <button type={type}>{children}</button>
    </>
  );
}
