import { ButtonType } from 'types';

interface IPrimaryButtonProps {
  type: ButtonType;
  children: React.ReactNode;
}

export default function PrimaryButton({ type, children }: IPrimaryButtonProps) {
  return (
    <>
      <p>PrimaryButton</p>
      <button type={type}>{children}</button>
    </>
  );
}
