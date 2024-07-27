import { getMobileMenuContainerStyles } from 'helpers';
import { Container } from 'layout';

interface IMobileMenuProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export default function MobileMenu({ children, isOpen }: Readonly<IMobileMenuProps>) {
  const containerClass = getMobileMenuContainerStyles(isOpen);

  return (
    <div className={containerClass}>
      <Container>{children}</Container>
    </div>
  );
}
