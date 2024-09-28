import { type IWithChildren } from 'types';
import { Breadcrumbs } from 'components';

export default function NestedLayout({ children }: Readonly<IWithChildren>) {
  return (
    <>
      <Breadcrumbs />
      {children}
    </>
  );
}
