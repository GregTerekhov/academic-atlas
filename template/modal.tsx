import { SvgIconUI } from 'ui';

export default function Modal({
  children,
  hasIcon,
}: Readonly<{
  children: React.ReactNode;
  hasIcon?: boolean;
}>) {
  return (
    <div>
      <div>
        <SvgIconUI />
        <p>Modal</p>
        {children}
        {hasIcon && <SvgIconUI />}
      </div>
    </div>
  );
}
