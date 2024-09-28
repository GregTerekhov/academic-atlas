import { type IWithChildren } from 'types';

import { Container } from 'layout';
import { BackButton } from 'components';

import { getMobileMenuContainerStyles } from 'styles';

interface IMobileMenuProps extends IWithChildren {
  isOpen: boolean;
}

export default function MobileMenu({ children, isOpen }: Readonly<IMobileMenuProps>) {
  const containerClass = getMobileMenuContainerStyles(isOpen);

  return (
    <div
      className={containerClass}
      data-testid='mobile-menu'
    >
      <Container>
        <BackButton />
        {children}
      </Container>
    </div>
  );
}
