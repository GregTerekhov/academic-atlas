import { Container } from 'layout';
import { Breadcrumbs, ScrollController } from 'components';

export default function NestedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Container>
        <Breadcrumbs />
        {children}
        <ScrollController />
      </Container>
    </main>
  );
}
