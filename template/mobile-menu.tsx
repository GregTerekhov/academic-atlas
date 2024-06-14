import { ThemeSwitcher } from 'components';
import { Container } from 'layout';

export default function MobileMenu({
  children,
  isOpen,
}: Readonly<{
  children: React.ReactNode;
  isOpen: boolean;
}>) {
  return (
    isOpen && (
      <div
        className={`max-h-mobileMenu md:max-h-tabletMenu fixed top-20 z-40 h-full w-screen overflow-auto bg-whiteBase py-10  transition-all duration-500 before:fixed before:left-0 before:top-0 before:z-40  before:w-full before:content-[""] dark:bg-background-gradient ${
          isOpen ? 'left-0' : '-left-full'
        }`}
      >
        <Container>
          {children}
        </Container>
      </div>
    )
  );
}
