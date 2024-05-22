import { Breadcrumbs } from 'components';

export default function NestedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Breadcrumbs />
      {children}
    </div>
  );
}
