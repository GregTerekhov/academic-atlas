import { Breadcrumbs, ScrollController } from 'components';
import { PrimaryButtonUI } from 'ui';

export default function NestedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Breadcrumbs />
      <PrimaryButtonUI>Замовити</PrimaryButtonUI>
      {children}
      <ScrollController />
    </>
  );
}
