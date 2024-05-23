import { ButtonType } from 'types';
import { PrimaryButtonUI, SvgIconUI } from 'ui';

export default function Modal({
  children,
  type,
  hasIcon,
}: Readonly<{
  children: React.ReactNode;
  type: ButtonType;
  hasIcon?: boolean;
}>) {
  return (
    <div>
      <div>
        <SvgIconUI />
        <p>Modal</p>
        {children}
        <PrimaryButtonUI type={type}>{hasIcon && <SvgIconUI />}</PrimaryButtonUI>
      </div>
    </div>
  );
}
