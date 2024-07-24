import { RemoveScroll } from 'react-remove-scroll';

import { Container } from 'layout';

interface IMobileMenuProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export default function MobileMenu({ children, isOpen }: Readonly<IMobileMenuProps>) {
  return (
    <RemoveScroll
      forwardProps
      enabled={isOpen}
    >
      <div
        className={`scroll fixed top-20 z-50 h-full  w-screen overflow-auto bg-whiteBase bg-background-light-gradient pb-52 pt-10 transition-[left] duration-500 before:fixed before:left-0 before:top-0 before:w-full before:content-[""] dark:bg-background-dark-gradient md:top-24 md:max-h-tabletMenu ${
          isOpen ? 'left-0' : '-left-full'
        }`}
      >
        <Container>{children}</Container>
      </div>
    </RemoveScroll>
  );
}
