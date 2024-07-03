import { Container } from 'layout';

interface IMobileMenuProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export default function MobileMenu({ children, isOpen }: Readonly<IMobileMenuProps>) {
  return (
    <div
      className={`bg-background-light-gradient dark:bg-background-dark-gradient fixed top-20 z-50 h-screen max-h-mobileMenu w-screen overflow-auto bg-whiteBase py-10 transition-[left] duration-500 before:fixed before:left-0 before:top-0 before:z-40 before:w-full before:content-[""] md:top-24 md:max-h-tabletMenu ${
        isOpen ? 'left-0' : '-left-full'
      }`}
    >
      <Container>{children}</Container>
    </div>
  );
}
