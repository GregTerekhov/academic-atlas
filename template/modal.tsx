import { ButtonType } from 'types';

import { PrimaryButtonUI, SectionHeading, SvgIconUI } from 'ui';

export default function Modal({
  children,
  type,
  buttonTitle,
  hasIcon,
}: Readonly<{
  children: React.ReactNode;
  type: ButtonType;
  buttonTitle: string;
  hasIcon?: boolean;
}>) {
  return (
    <div>
      <div>
        <SvgIconUI />
        <p>Modal</p>
        <SectionHeading />
        {children}
        <PrimaryButtonUI type={type}>
          {hasIcon && <SvgIconUI />}
          {buttonTitle}
        </PrimaryButtonUI>
      </div>
    </div>
  );
}
