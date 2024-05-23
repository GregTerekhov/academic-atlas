import { Container } from 'layout';
import { SvgIconUI } from 'ui';

export default function MobileMenu({
  children,
  hasIcon,
}: Readonly<{
  children: React.ReactNode;
  hasIcon?: boolean;
}>) {
  return (
    <div className='hidden max-lg:block'>
      <Container>
        <p>MobileMenu</p>
        {children}
        {hasIcon && <SvgIconUI />}
      </Container>
    </div>
  );
}
