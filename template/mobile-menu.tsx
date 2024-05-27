import { ButtonType } from 'types';

import { Container } from 'layout';
import { PrimaryButtonUI } from 'ui';

export default function MobileMenu({
  children,
  isPrice,
}: Readonly<{
  children: React.ReactNode;
  isPrice?: boolean;
}>) {
  return (
    <div className='hidden max-lg:block'>
      <Container>
        <p>MobileMenu</p>
        {children}
        {isPrice && (
          <PrimaryButtonUI type={ButtonType.Button}>Розрахувати вартість</PrimaryButtonUI>
        )}
      </Container>
    </div>
  );
}
