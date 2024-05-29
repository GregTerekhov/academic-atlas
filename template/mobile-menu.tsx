import { ThemeSwitcher } from 'components';
import { Container } from 'layout';

export default function MobileMenu({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='hidden max-lg:block'>
      <Container>
        <p>MobileMenu</p>
        {children}
        <ThemeSwitcher />
      </Container>
    </div>
  );
}
