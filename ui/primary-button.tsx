interface IPrimaryButtonProps {
  children?: React.ReactNode;
}

export default function PrimaryButton({ children }: IPrimaryButtonProps) {
  return (
    <>
      <p>PrimaryButton</p>
      {children}
    </>
  );
}
