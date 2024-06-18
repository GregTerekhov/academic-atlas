import { Breadcrumbs, ScrollController } from 'components';
import { PrimaryButtonLabel } from 'types/ui';
import { PrimaryButtonUI } from 'ui';

export default function NestedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Breadcrumbs />
      <PrimaryButtonUI>{PrimaryButtonLabel.Ordering}</PrimaryButtonUI>
      {children}
      <ScrollController />
    </>
  );
}
