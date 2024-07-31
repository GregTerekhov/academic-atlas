import { type IWithChildren } from 'types';
import { getMobileMenuContainerStyles } from 'helpers';

import { Container } from 'layout';
import { BackButton } from 'components';

interface IMobileMenuProps extends IWithChildren {
  isOpen: boolean;
}

export default function MobileMenu({ children, isOpen }: Readonly<IMobileMenuProps>) {
  const containerClass = getMobileMenuContainerStyles(isOpen);

  return (
    <div className={containerClass}>
      <Container>
        <BackButton />
        {children}
      </Container>
    </div>
  );
}
