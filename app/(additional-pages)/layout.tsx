import { Breadcrumbs } from 'components';

interface INestedLayoutProps {
  children: React.ReactNode;
}

export default function NestedLayout({ children }: Readonly<INestedLayoutProps>) {
  return (
    <>
      <Breadcrumbs />
      {children}
    </>
  );
}
